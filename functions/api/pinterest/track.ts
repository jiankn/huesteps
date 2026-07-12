import {
  classifyDevice,
  hmacHex,
  isAutomatedUserAgent,
  noContent,
  normalizeNetwork,
  pinterestReferrer,
  type AnalyticsEnv,
  type PagesHandler,
} from '../../lib/analytics';

interface TrackPayload {
  path?: unknown;
  landingPath?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  pinId?: unknown;
  sessionId?: unknown;
}

interface RequestWithCf extends Request {
  cf?: { country?: string };
}

const MAX_BODY_BYTES = 8_192;
const MAX_PATH_LENGTH = 512;
const MAX_CONTENT_LENGTH = 160;
const MAX_CAMPAIGN_LENGTH = 160;
const MAX_PIN_ID_LENGTH = 100;
const SAFE_SESSION = /^[a-zA-Z0-9_-]{16,128}$/;
const ASSET_EXTENSION = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp4|pdf|png|svg|webp|woff2?|xml)$/i;

const cleanPath = (value: unknown): string | null => {
  if (typeof value !== 'string' || value.length < 1 || value.length > MAX_PATH_LENGTH) return null;
  let pathname: string;
  try {
    pathname = new URL(value, 'https://huesteps.invalid').pathname;
  } catch {
    return null;
  }
  if (!pathname.startsWith('/')) return null;
  const lower = pathname.toLowerCase();
  if (
    lower === '/admin' ||
    lower.startsWith('/admin/') ||
    lower === '/api' ||
    lower.startsWith('/api/') ||
    lower.startsWith('/_astro/') ||
    ASSET_EXTENSION.test(lower)
  ) {
    return null;
  }
  return pathname;
};

const cleanContent = (value: unknown): string => {
  if (typeof value !== 'string') return '(not set)';
  const normalized = value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, MAX_CONTENT_LENGTH);
  return normalized || '(not set)';
};

const cleanDimension = (value: unknown, maxLength: number): string => {
  if (typeof value !== 'string') return '(not set)';
  const normalized = value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, maxLength);
  return normalized || '(not set)';
};

const cleanCountry = (value: string | undefined): string =>
  value && /^[A-Z]{2}$/.test(value) ? value : 'XX';

/** Tracking is intentionally fail-closed for analytics and never blocks a content page. */
export const onRequestPost: PagesHandler<AnalyticsEnv> = async ({ request, env, waitUntil }) => {
  if (request.headers.get('sec-gpc') === '1' || request.headers.get('dnt') === '1') return noContent();

  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') return noContent();
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) return noContent();
    } catch {
      return noContent();
    }
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  if (isAutomatedUserAgent(userAgent)) return noContent();

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) return noContent();
  const announcedLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(announcedLength) && announcedLength > MAX_BODY_BYTES) return noContent();

  let payload: TrackPayload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return noContent();
    payload = JSON.parse(body) as TrackPayload;
  } catch {
    return noContent();
  }

  const path = cleanPath(payload.path ?? payload.landingPath);
  const sourceIsPinterest =
    typeof payload.utmSource === 'string' && payload.utmSource.trim().toLowerCase() === 'pinterest';
  const referrer = typeof payload.referrer === 'string' ? payload.referrer : undefined;
  if (!path || (!sourceIsPinterest && !pinterestReferrer(referrer))) return noContent();
  if (typeof payload.sessionId !== 'string' || !SAFE_SESSION.test(payload.sessionId)) return noContent();

  const rawIp = request.headers.get('cf-connecting-ip');
  const network = rawIp ? normalizeNetwork(rawIp) : null;
  const salt = env.PINTEREST_IP_HASH_SALT;
  if (!network || typeof salt !== 'string' || new TextEncoder().encode(salt).byteLength < 32) return noContent();

  try {
    const occurredAt = Math.floor(Date.now() / 1_000);
    const [visitorHash, sessionHash] = await Promise.all([
      hmacHex(salt, `visitor:${network}`),
      hmacHex(salt, `session:${payload.sessionId}`),
    ]);
    const country = cleanCountry((request as RequestWithCf).cf?.country);
    const device = classifyDevice(userAgent);
    const content = cleanContent(payload.utmContent);
    const campaign = cleanDimension(payload.utmCampaign, MAX_CAMPAIGN_LENGTH);
    const pinId = cleanDimension(payload.pinId, MAX_PIN_ID_LENGTH);

    await env.ANALYTICS_DB.prepare(
      `INSERT OR IGNORE INTO pinterest_events
        (occurred_at, visitor_hash, session_hash, landing_path, utm_campaign, utm_content, pin_id, country, device)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(occurredAt, visitorHash, sessionHash, path, campaign, content, pinId, country, device)
      .run();

    // Pages has no cron trigger. Low-frequency opportunistic cleanup enforces the 400-day window.
    if (crypto.getRandomValues(new Uint16Array(1))[0] < 328) {
      const cutoff = occurredAt - 400 * 86_400;
      waitUntil(
        env.ANALYTICS_DB.prepare('DELETE FROM pinterest_events WHERE occurred_at < ?')
          .bind(cutoff)
          .run()
          .then(() => undefined)
          .catch(() => undefined),
      );
    }
  } catch {
    // Measurement failure must never affect the visitor's content request.
  }

  return noContent();
};
