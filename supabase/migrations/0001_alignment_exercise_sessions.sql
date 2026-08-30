-- 0001_alignment_exercise_sessions.sql
-- Aligns exercise sessions with the wellbeing-metrics contract (04-wellbeing-metrics.md, D04).
-- Replaces generic mood_* columns with evidence-back SUDS-derived distress + helpfulness.
-- Drops the now-unused mood_logs table (S26 / D03: no mood tracking, no mood dashboard).
--
-- Run AFTER 0003 if it doesn't exist yet (ordering in live project may differ).
-- Applied by the student; not yet run (schema is live in Supabase project).

begin;

-- Rename generic sessions table to the contract name: exercise_sessions ---------
alter table if exists sessions rename to exercise_sessions;

-- Generalise: drop mood columns, add evidence-based metrics --------------------
alter table if exists exercise_sessions
  drop column if exists mood_before,
  drop column if exists mood_after;

alter table if exists exercise_sessions
  add column if not exists distress_before smallint,
  add column if not exists distress_after smallint,
  add column if not exists helpfulness smallint;
-- 0-10 scale, nullable; enforced at the app layer.

-- No mood_logs table ------------------------------------------------------------
drop table if exists mood_logs;

commit;
