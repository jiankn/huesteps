import {
  constantTimeEqual,
  errorResponse,
  jsonResponse,
  type AnalyticsEnv,
  type PagesHandler,
} from '../../lib/analytics';

type RangeKey = 'realtime' | 'day' | 'week' | 'month' | 'quarter' | 'half' | 'year';

interface Period {
  currentStart: number;
  currentEnd: number;
  previousStart: number;
  previousEnd: number;
}

interface CountRow {
  unique_ips?: number;
  previous_unique_ips?: number;
  sessions?: number;
}

interface TrendRow {
  bucket?: string;
  unique_ips?: number;
  sessions?: number;
}

interface BreakdownRow {
  value?: string;
  unique_ips?: number;
  sessions?: number;
}

const VALID_RANGES = new Set<RangeKey>(['realtime', 'day', 'week', 'month', 'quarter', 'half', 'year']);
const MONTHLY_TARGET = 100_000;

const epochSeconds = (date: Date): number => Math.floor(date.getTime() / 1_000);
const utcDate = (year: number, month: number, day = 1): Date => new Date(Date.UTC(year, month, day));

const startOfUtcDay = (now: Date): Date => utcDate(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

const periodFor = (range: RangeKey, now: Date): Period => {
  const nowMs = now.getTime();
  let currentStart: Date;
  let previousStart: Date;
  let previousBoundary: Date;

  switch (range) {
    case 'realtime':
      currentStart = new Date(nowMs - 60 * 60_000);
      previousStart = new Date(nowMs - 120 * 60_000);
      previousBoundary = currentStart;
      break;
    case 'day': {
      currentStart = startOfUtcDay(now);
      previousStart = new Date(currentStart.getTime() - 86_400_000);
      previousBoundary = currentStart;
      break;
    }
    case 'week': {
      const dayStart = startOfUtcDay(now);
      const mondayOffset = (dayStart.getUTCDay() + 6) % 7;
      currentStart = new Date(dayStart.getTime() - mondayOffset * 86_400_000);
      previousStart = new Date(currentStart.getTime() - 7 * 86_400_000);
      previousBoundary = currentStart;
      break;
    }
    case 'month':
      currentStart = utcDate(now.getUTCFullYear(), now.getUTCMonth());
      previousStart = utcDate(now.getUTCFullYear(), now.getUTCMonth() - 1);
      previousBoundary = currentStart;
      break;
    case 'quarter': {
      const quarterMonth = Math.floor(now.getUTCMonth() / 3) * 3;
      currentStart = utcDate(now.getUTCFullYear(), quarterMonth);
      previousStart = utcDate(now.getUTCFullYear(), quarterMonth - 3);
      previousBoundary = currentStart;
      break;
    }
    case 'half': {
      const halfMonth = now.getUTCMonth() < 6 ? 0 : 6;
      currentStart = utcDate(now.getUTCFullYear(), halfMonth);
      previousStart = utcDate(now.getUTCFullYear(), halfMonth - 6);
      previousBoundary = currentStart;
      break;
    }
    case 'year':
      currentStart = utcDate(now.getUTCFullYear(), 0);
      previousStart = utcDate(now.getUTCFullYear() - 1, 0);
      previousBoundary = currentStart;
      break;
  }

  const elapsed = nowMs - currentStart.getTime();
  const previousEnd = Math.min(previousStart.getTime() + elapsed, previousBoundary.getTime());
  return {
    currentStart: epochSeconds(currentStart),
    // SQL uses exclusive upper bounds; include events recorded in this same second.
    currentEnd: epochSeconds(now) + 1,
    previousStart: epochSeconds(previousStart),
    previousEnd: Math.floor(previousEnd / 1_000) + 1,
  };
};

const bucketExpression = (range: RangeKey): string => {
  if (range === 'realtime') {
    return "strftime('%Y-%m-%dT%H:', occurred_at, 'unixepoch') || printf('%02d', (CAST(strftime('%M', occurred_at, 'unixepoch') AS INTEGER) / 5) * 5) || ':00Z'";
  }
  if (range === 'day') return "strftime('%Y-%m-%dT%H:00:00Z', occurred_at, 'unixepoch')";
  if (range === 'year') return "strftime('%Y-%m-01', occurred_at, 'unixepoch')";
  return "strftime('%Y-%m-%d', occurred_at, 'unixepoch')";
};

const bearerToken = (request: Request): string | null => {
  const value = request.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(value);
  return match?.[1]?.trim() || null;
};

const numberValue = (value: unknown): number => {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
};

const iso = (seconds: number): string => new Date(seconds * 1_000).toISOString();

const mapBreakdown = (rows: BreakdownRow[] | undefined) =>
  (rows ?? []).map((row) => ({
    value: String(row.value ?? '(not set)'),
    uniqueIps: numberValue(row.unique_ips),
    sessions: numberValue(row.sessions),
  }));

export const onRequestGet: PagesHandler<AnalyticsEnv> = async ({ request, env }) => {
  const suppliedToken = bearerToken(request);
  const expectedToken = env.ADMIN_ANALYTICS_TOKEN;
  if (
    !suppliedToken ||
    typeof expectedToken !== 'string' ||
    expectedToken.length < 24 ||
    !(await constantTimeEqual(suppliedToken, expectedToken))
  ) {
    return errorResponse('unauthorized', 'A valid admin bearer token is required.', 401, true);
  }

  const requestedRange = new URL(request.url).searchParams.get('range') ?? 'month';
  if (!VALID_RANGES.has(requestedRange as RangeKey)) {
    return errorResponse('invalid_range', 'Range must be realtime, day, week, month, quarter, half, or year.', 400, true);
  }
  const range = requestedRange as RangeKey;
  const now = new Date();
  const period = periodFor(range, now);
  const monthPeriod = periodFor('month', now);
  const last60 = epochSeconds(new Date(now.getTime() - 60 * 60_000));
  const last15 = epochSeconds(new Date(now.getTime() - 15 * 60_000));
  const last5 = epochSeconds(new Date(now.getTime() - 5 * 60_000));
  const nowExclusive = epochSeconds(now) + 1;
  const comparisonStart = range === 'year' ? period.currentEnd : period.previousStart;
  const comparisonEnd = range === 'year' ? period.currentEnd : period.previousEnd;
  const scanStart = range === 'year' ? period.currentStart : period.previousStart;

  const metricsStatement = env.ANALYTICS_DB.prepare(
    `SELECT
       COUNT(DISTINCT CASE WHEN occurred_at >= ? AND occurred_at < ? THEN visitor_hash END) AS unique_ips,
       COUNT(DISTINCT CASE WHEN occurred_at >= ? AND occurred_at < ? THEN visitor_hash END) AS previous_unique_ips,
       SUM(CASE WHEN occurred_at >= ? AND occurred_at < ? THEN 1 ELSE 0 END) AS sessions
     FROM pinterest_events
     WHERE occurred_at >= ? AND occurred_at < ?`,
  ).bind(
    period.currentStart,
    period.currentEnd,
    comparisonStart,
    comparisonEnd,
    period.currentStart,
    period.currentEnd,
    scanStart,
    period.currentEnd,
  );

  const realtimeStatement = env.ANALYTICS_DB.prepare(
    `SELECT
       COUNT(DISTINCT CASE WHEN occurred_at >= ? THEN visitor_hash END) AS last5,
       COUNT(DISTINCT CASE WHEN occurred_at >= ? THEN visitor_hash END) AS last15,
       COUNT(DISTINCT visitor_hash) AS last60
     FROM pinterest_events
     WHERE occurred_at >= ? AND occurred_at < ?`,
  ).bind(last5, last15, last60, nowExclusive);

  const trendStatement = env.ANALYTICS_DB.prepare(
    `SELECT ${bucketExpression(range)} AS bucket,
       COUNT(DISTINCT visitor_hash) AS unique_ips,
       COUNT(*) AS sessions
     FROM pinterest_events
     WHERE occurred_at >= ? AND occurred_at < ?
     GROUP BY bucket
     ORDER BY bucket ASC`,
  ).bind(period.currentStart, period.currentEnd);

  const breakdown = (column: 'landing_path' | 'utm_content' | 'country' | 'device') =>
    env.ANALYTICS_DB.prepare(
      `SELECT ${column} AS value,
         COUNT(DISTINCT visitor_hash) AS unique_ips,
         COUNT(*) AS sessions
       FROM pinterest_events
       WHERE occurred_at >= ? AND occurred_at < ?
       GROUP BY ${column}
       ORDER BY unique_ips DESC, sessions DESC
       LIMIT 10`,
    ).bind(period.currentStart, period.currentEnd);

  const monthStatement = env.ANALYTICS_DB.prepare(
    `SELECT COUNT(DISTINCT visitor_hash) AS unique_ips
     FROM pinterest_events
     WHERE occurred_at >= ? AND occurred_at < ?`,
  ).bind(monthPeriod.currentStart, monthPeriod.currentEnd);

  try {
    const results = await env.ANALYTICS_DB.batch([
      metricsStatement,
      realtimeStatement,
      trendStatement,
      breakdown('landing_path'),
      breakdown('utm_content'),
      breakdown('country'),
      breakdown('device'),
      monthStatement,
    ]);

    const metrics = (results[0].results?.[0] ?? {}) as CountRow;
    const realtime = (results[1].results?.[0] ?? {}) as Record<string, unknown>;
    const trendRows = (results[2].results ?? []) as unknown as TrendRow[];
    const month = (results[7].results?.[0] ?? {}) as CountRow;
    const uniqueIps = numberValue(metrics.unique_ips);
    // Pseudonymous event identifiers are retained for 400 days. That is enough for
    // every matched comparison except year over year, so do not expose a partial
    // prior-year count as if it were comparable.
    const previousUniqueIps = range === 'year' ? 0 : numberValue(metrics.previous_unique_ips);
    const sessions = numberValue(metrics.sessions);
    const currentMonth = numberValue(month.unique_ips);
    const changePct = previousUniqueIps > 0 ? ((uniqueIps - previousUniqueIps) / previousUniqueIps) * 100 : null;

    const monthEnd = utcDate(now.getUTCFullYear(), now.getUTCMonth() + 1);
    const monthStart = utcDate(now.getUTCFullYear(), now.getUTCMonth());
    const totalMonthSeconds = (monthEnd.getTime() - monthStart.getTime()) / 1_000;
    const elapsedMonthSeconds = Math.max(1, now.getTime() / 1_000 - monthStart.getTime() / 1_000);
    const remainingDays = Math.max(1, (monthEnd.getTime() - now.getTime()) / 86_400_000);
    const forecast = Math.round(currentMonth * (totalMonthSeconds / elapsedMonthSeconds));

    return jsonResponse(
      {
        range,
        timezone: 'UTC',
        generatedAt: now.toISOString(),
        period: {
          currentStart: iso(period.currentStart),
          currentEnd: iso(period.currentEnd),
          previousStart: iso(period.previousStart),
          previousEnd: iso(period.previousEnd),
          comparison: 'matched_elapsed',
        },
        metrics: {
          uniqueIps,
          previousUniqueIps,
          changePct,
          sessions,
        },
        goal: {
          target: MONTHLY_TARGET,
          current: currentMonth,
          progressPct: Math.min(100, (currentMonth / MONTHLY_TARGET) * 100),
          remaining: Math.max(0, MONTHLY_TARGET - currentMonth),
          requiredDaily: Math.ceil(Math.max(0, MONTHLY_TARGET - currentMonth) / remainingDays),
          forecast,
        },
        realtime: {
          last5: numberValue(realtime.last5),
          last15: numberValue(realtime.last15),
          last60: numberValue(realtime.last60),
        },
        trend: trendRows.map((row) => ({
          bucket: String(row.bucket ?? ''),
          label: String(row.bucket ?? ''),
          uniqueIps: numberValue(row.unique_ips),
          sessions: numberValue(row.sessions),
        })),
        breakdowns: {
          landingPages: mapBreakdown(results[3].results as unknown as BreakdownRow[]),
          contents: mapBreakdown(results[4].results as unknown as BreakdownRow[]),
          countries: mapBreakdown(results[5].results as unknown as BreakdownRow[]),
          devices: mapBreakdown(results[6].results as unknown as BreakdownRow[]),
        },
      },
      200,
      true,
    );
  } catch (error) {
    console.error('Pinterest analytics query failed.', error);
    return errorResponse('analytics_unavailable', 'Pinterest analytics is temporarily unavailable.', 503, true);
  }
};
