export interface AnalyticsEnv {
  ANALYTICS_DB: D1Database;
  PINTEREST_IP_HASH_SALT: string;
  ADMIN_ANALYTICS_TOKEN: string;
}

export interface FunctionContext<Env = AnalyticsEnv> {
  request: Request;
  env: Env;
  waitUntil(promise: Promise<unknown>): void;
}

export type PagesHandler<Env = AnalyticsEnv> = (
  context: FunctionContext<Env>,
) => Response | Promise<Response>;

const textEncoder = new TextEncoder();

export const jsonResponse = (body: unknown, status = 200, authenticated = false): Response => {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store, max-age=0',
    'x-content-type-options': 'nosniff',
  });
  if (authenticated) headers.set('vary', 'Authorization');
  return new Response(JSON.stringify(body), { status, headers });
};

export const errorResponse = (
  code: string,
  message: string,
  status: number,
  authenticated = false,
): Response => jsonResponse({ error: { code, message } }, status, authenticated);

export const noContent = (): Response =>
  new Response(null, {
    status: 204,
    headers: {
      'cache-control': 'no-store, max-age=0',
      'x-content-type-options': 'nosniff',
    },
  });

export const constantTimeEqual = async (left: string, right: string): Promise<boolean> => {
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest('SHA-256', textEncoder.encode(left)),
    crypto.subtle.digest('SHA-256', textEncoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftDigest);
  const rightBytes = new Uint8Array(rightDigest);
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }
  return difference === 0;
};

export const hmacHex = async (secret: string, value: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const normalizeIpv4 = (input: string): string | null => {
  const pieces = input.split('.');
  if (pieces.length !== 4) return null;
  const octets = pieces.map((piece) => {
    if (!/^\d{1,3}$/.test(piece)) return Number.NaN;
    return Number(piece);
  });
  if (octets.some((value) => !Number.isInteger(value) || value < 0 || value > 255)) return null;
  return octets.join('.');
};

const expandIpv6 = (input: string): number[] | null => {
  let address = input.toLowerCase();
  const zoneIndex = address.indexOf('%');
  if (zoneIndex >= 0) address = address.slice(0, zoneIndex);

  if (address.includes('.')) {
    const lastColon = address.lastIndexOf(':');
    const ipv4 = normalizeIpv4(address.slice(lastColon + 1));
    if (!ipv4) return null;
    const octets = ipv4.split('.').map(Number);
    address = `${address.slice(0, lastColon)}:${((octets[0] << 8) | octets[1]).toString(16)}:${((octets[2] << 8) | octets[3]).toString(16)}`;
  }

  if ((address.match(/::/g) ?? []).length > 1) return null;
  const hasCompression = address.includes('::');
  const [leftPart, rightPart = ''] = address.split('::');
  const left = leftPart ? leftPart.split(':') : [];
  const right = rightPart ? rightPart.split(':') : [];
  if (!hasCompression && left.length !== 8) return null;
  const missing = 8 - left.length - right.length;
  if ((hasCompression && missing < 1) || (!hasCompression && missing !== 0)) return null;
  const groups = [...left, ...Array.from({ length: Math.max(0, missing) }, () => '0'), ...right];
  if (groups.length !== 8 || groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null;
  return groups.map((group) => Number.parseInt(group, 16));
};

/** IPv4 is retained at /32. IPv6 is deliberately reduced to a /64 network. */
export const normalizeNetwork = (input: string): string | null => {
  const ipv4 = normalizeIpv4(input.trim());
  if (ipv4) return `v4:${ipv4}/32`;

  const groups = expandIpv6(input.trim());
  if (!groups) return null;

  const isMappedIpv4 =
    groups.slice(0, 5).every((group) => group === 0) && groups[5] === 0xffff;
  if (isMappedIpv4) {
    const mapped = `${groups[6] >> 8}.${groups[6] & 255}.${groups[7] >> 8}.${groups[7] & 255}`;
    return `v4:${mapped}/32`;
  }

  return `v6:${groups.slice(0, 4).map((group) => group.toString(16).padStart(4, '0')).join(':')}::/64`;
};

export const isPinterestHostname = (hostname: string): boolean => {
  const normalized = hostname.toLowerCase().replace(/\.$/, '');
  return (
    normalized === 'pinterest.com' ||
    normalized.endsWith('.pinterest.com') ||
    normalized === 'pin.it' ||
    normalized.endsWith('.pin.it')
  );
};

export const pinterestReferrer = (value: string | undefined): boolean => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && isPinterestHostname(url.hostname);
  } catch {
    return false;
  }
};

export const classifyDevice = (userAgent: string): 'mobile' | 'tablet' | 'desktop' | 'other' => {
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return 'tablet';
  if (/mobi|iphone|ipod|android/i.test(userAgent)) return 'mobile';
  if (/windows|macintosh|linux|cros/i.test(userAgent)) return 'desktop';
  return 'other';
};

export const isAutomatedUserAgent = (userAgent: string): boolean =>
  !userAgent ||
  /bot|crawler|spider|slurp|preview|pinterestbot|facebookexternalhit|headless|lighthouse|pagespeed|wget|curl/i.test(
    userAgent,
  );

