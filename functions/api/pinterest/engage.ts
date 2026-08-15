import {
  ensurePinterestEngagementSchema,
  hmacHex,
  isAutomatedUserAgent,
  noContent,
  type AnalyticsEnv,
  type PagesHandler,
} from '../../lib/analytics';

interface EngagementPayload {
  eventName?: unknown;
  recipeSlug?: unknown;
  stepNumber?: unknown;
  sessionId?: unknown;
  landingPath?: unknown;
  currentPath?: unknown;
  utmContent?: unknown;
}

const MAX_BODY_BYTES = 4_096;
const MAX_PATH_LENGTH = 512;
const MAX_CONTENT_LENGTH = 160;
const SAFE_SESSION = /^[a-zA-Z0-9_-]{16,128}$/;
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_EVENTS = new Set([
  'tutorial_started',
  'step_completed',
  'step_4_reached',
  'tutorial_completed',
  'fix_opened',
  'related_recipe_clicked',
  'progress_resumed',
]);

const cleanPath = (value: unknown): string | null => {
  if (typeof value !== 'string' || value.length < 1 || value.length > MAX_PATH_LENGTH) return null;
  try {
    const pathname = new URL(value, 'https://huesteps.invalid').pathname;
    return pathname.startsWith('/') && !pathname.startsWith('/api/') && !pathname.startsWith('/admin')
      ? pathname
      : null;
  } catch {
    return null;
  }
};

const cleanContent = (value: unknown): string => {
  if (typeof value !== 'string') return '(not set)';
  const normalized = value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, MAX_CONTENT_LENGTH);
  return normalized || '(not set)';
};

/** Records only allow-listed actions belonging to an existing Pinterest landing session. */
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

  if (isAutomatedUserAgent(request.headers.get('user-agent') ?? '')) return noContent();
  if (!(request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))) return noContent();
  const announcedLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(announcedLength) && announcedLength > MAX_BODY_BYTES) return noContent();

  let payload: EngagementPayload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return noContent();
    payload = JSON.parse(body) as EngagementPayload;
  } catch {
    return noContent();
  }

  const eventName = typeof payload.eventName === 'string' ? payload.eventName : '';
  const recipeSlug = typeof payload.recipeSlug === 'string' ? payload.recipeSlug : '';
  const stepNumber = payload.stepNumber === undefined ? 0 : Number(payload.stepNumber);
  const landingPath = cleanPath(payload.landingPath);
  const currentPath = cleanPath(payload.currentPath);
  if (
    !VALID_EVENTS.has(eventName)
    || !SAFE_SLUG.test(recipeSlug)
    || recipeSlug.length > 100
    || !Number.isInteger(stepNumber)
    || stepNumber < 0
    || stepNumber > 20
    || !landingPath
    || !currentPath
    || typeof payload.sessionId !== 'string'
    || !SAFE_SESSION.test(payload.sessionId)
  ) return noContent();

  const salt = env.PINTEREST_IP_HASH_SALT;
  if (typeof salt !== 'string' || new TextEncoder().encode(salt).byteLength < 32) return noContent();

  try {
    const occurredAt = Math.floor(Date.now() / 1_000);
    const sessionHash = await hmacHex(salt, `session:${payload.sessionId}`);
    const landing = await env.ANALYTICS_DB.prepare(
      'SELECT landing_path FROM pinterest_events WHERE session_hash = ? LIMIT 1',
    ).bind(sessionHash).first<{ landing_path?: string }>();
    if (!landing?.landing_path || landing.landing_path !== landingPath) return noContent();

    await ensurePinterestEngagementSchema(env.ANALYTICS_DB);

    await env.ANALYTICS_DB.prepare(
      `INSERT OR IGNORE INTO pinterest_engagement_events
        (occurred_at, session_hash, landing_path, current_path, recipe_slug, event_name, step_number, utm_content)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        occurredAt,
        sessionHash,
        landingPath,
        currentPath,
        recipeSlug,
        eventName,
        stepNumber,
        cleanContent(payload.utmContent),
      )
      .run();

    if (crypto.getRandomValues(new Uint16Array(1))[0] < 328) {
      const cutoff = occurredAt - 400 * 86_400;
      waitUntil(
        env.ANALYTICS_DB.prepare('DELETE FROM pinterest_engagement_events WHERE occurred_at < ?')
          .bind(cutoff)
          .run()
          .then(() => undefined)
          .catch(() => undefined),
      );
    }
  } catch {
    // Measurement failure must never affect the tutorial.
  }

  return noContent();
};
