CREATE TABLE IF NOT EXISTS pinterest_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at INTEGER NOT NULL,
  visitor_hash TEXT NOT NULL CHECK(length(visitor_hash) = 64),
  session_hash TEXT NOT NULL CHECK(length(session_hash) = 64),
  landing_path TEXT NOT NULL,
  utm_campaign TEXT NOT NULL DEFAULT '(not set)',
  utm_content TEXT NOT NULL DEFAULT '(not set)',
  pin_id TEXT NOT NULL DEFAULT '(not set)',
  country TEXT NOT NULL DEFAULT 'XX' CHECK(length(country) = 2),
  device TEXT NOT NULL CHECK(device IN ('mobile', 'tablet', 'desktop', 'other')),
  UNIQUE(session_hash)
);

CREATE INDEX IF NOT EXISTS idx_pinterest_events_time_visitor
  ON pinterest_events(occurred_at, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_pinterest_events_time_landing
  ON pinterest_events(occurred_at, landing_path, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_pinterest_events_time_content
  ON pinterest_events(occurred_at, utm_content, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_pinterest_events_time_country
  ON pinterest_events(occurred_at, country, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_pinterest_events_time_device
  ON pinterest_events(occurred_at, device, visitor_hash);
