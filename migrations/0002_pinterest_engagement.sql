CREATE TABLE IF NOT EXISTS pinterest_engagement_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at INTEGER NOT NULL,
  session_hash TEXT NOT NULL CHECK(length(session_hash) = 64),
  landing_path TEXT NOT NULL,
  current_path TEXT NOT NULL,
  recipe_slug TEXT NOT NULL,
  event_name TEXT NOT NULL CHECK(event_name IN (
    'tutorial_started',
    'step_completed',
    'step_4_reached',
    'tutorial_completed',
    'fix_opened',
    'related_recipe_clicked',
    'progress_resumed'
  )),
  step_number INTEGER NOT NULL DEFAULT 0 CHECK(step_number >= 0 AND step_number <= 20),
  utm_content TEXT NOT NULL DEFAULT '(not set)',
  UNIQUE(session_hash, recipe_slug, event_name, step_number)
);

CREATE INDEX IF NOT EXISTS idx_pinterest_engagement_time_event
  ON pinterest_engagement_events(occurred_at, event_name, session_hash);
CREATE INDEX IF NOT EXISTS idx_pinterest_engagement_time_recipe
  ON pinterest_engagement_events(occurred_at, recipe_slug, session_hash);
