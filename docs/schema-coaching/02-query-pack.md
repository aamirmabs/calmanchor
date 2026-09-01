# 02 - Query Pack

The SQL each user story implies. One or more queries per story, with the expected result and what a failure means. These queries are also candidates for the application's real data layer - keep them.

How to run:
- If a live Supabase instance is available, run the queries against it (psql, supabase CLI, or the SQL editor).
- Otherwise, trace each query statically against lib/db.ts, services/seed.ts and any migrations, and mark the register accordingly.
- RLS checks (S04) need TWO test users to prove isolation.

## S01 - First-launch onboarding
```sql
-- onboarding completion is derived from profile existence
SELECT COUNT(*) FROM profiles WHERE user_id = auth.uid();
-- expected: 0 before onboarding, 1 after. Failure means: no profile concept, or no user_id linkage.
```

## S02 - Google sign-in only
```sql
-- no password columns may exist
SELECT column_name FROM information_schema.columns WHERE table_name = 'users';
-- expected: NO password/password_hash column. Failure: a password column exists.
-- user identity is resolvable:
SELECT id FROM users WHERE google_identity = '<google-sub>';
-- expected: one row. Failure: no google identity column or no stable internal id.
```

## S03 - Research profile
```sql
SELECT age_band, gender, ethnicity, treatment_status, referral_source
FROM profiles WHERE user_id = auth.uid();
-- expected: all five columns present, nullable. Failure: missing research columns.
-- PII separation check:
SELECT column_name FROM information_schema.columns WHERE table_name = 'users';
-- expected: identity columns (email, display name) exist SEPARATELY from research columns.
```

## S04 - Data isolation (RLS)
```sql
-- as user A:
SELECT COUNT(*) FROM journal_entries;            -- expected: only A's rows
SELECT COUNT(*) FROM exercise_sessions;          -- expected: only A's rows
SELECT COUNT(*) FROM checkins;                   -- expected: only A's rows
SELECT COUNT(*) FROM tags WHERE user_id IS NOT NULL; -- expected: only A's custom tags
-- as user B: same queries must return only B's rows.
-- failure: any query returns another user's rows, or errors without a policy.
```

## S05 - Delete my data
```sql
-- cascade check (after deleting user A):
SELECT COUNT(*) FROM journal_entries WHERE user_id = 'A';   -- 0
SELECT COUNT(*) FROM exercise_sessions WHERE user_id = 'A'; -- 0
SELECT COUNT(*) FROM checkins WHERE user_id = 'A';          -- 0
SELECT COUNT(*) FROM profiles WHERE user_id = 'A';          -- 0
-- failure: orphaned rows remain, or delete fails on FK.
```

## S06 - Browse the chapters
```sql
SELECT order_index, title, page_range, content_group, colour_token
FROM chapters ORDER BY order_index;
-- expected: 20 rows, ordered, with all five fields. Failure: missing fields, wrong count, or no ordering.
```

## S07 - View the workbook PDF
```sql
-- the PDF is storage, not a table. Verify:
-- 1. the repo contains no PDF (git ls-files | grep -i pdf must be empty or assets only)
-- 2. a documents/chapters mapping exists to compute PDF page ranges
SELECT order_index, title, page_range FROM chapters;  -- page_range drives the PDF jump
-- expected: chapters carry page ranges. Failure: no anchor data, or the PDF is in the repo.
```

## S08 - Exercise catalogue by category
```sql
SELECT category, COUNT(*) FROM exercises GROUP BY category ORDER BY category;
-- expected: the categories breathing/somatic/sensory/voice/mindful/crisis, each > 0,
-- and the TOTAL matches the actual count in the seed file (never a commit message).
-- failure: missing categories, or total mismatch with the seed file.
```

## S09 - Guided exercise instructions
```sql
SELECT title, steps, duration_minutes FROM exercises WHERE id = '<id>';
-- expected: ordered steps present (array or child rows), duration nullable.
-- failure: no steps column/table.
```

## S10 - No forced sequence
```sql
-- verify no ordering constraints: no exercise FK to another exercise,
-- no trigger enforcing completion order. Static check of schema + code.
-- failure: any dependency column/trigger exists.
```

## S11 - Crisis exercises are just exercises
```sql
SELECT id, title, category FROM exercises WHERE exercise_type = 'crisis';
-- expected: rows exist (from Tools for the Bad Days), in the normal catalogue.
-- failure: no crisis rows, or a separate crisis table/feature exists.
```

## S12 - Start a guided exercise
```sql
INSERT INTO exercise_sessions (user_id, exercise_id, started_at)
VALUES (auth.uid(), '<exercise>', now());
-- expected: succeeds. Second insert for the same day with a different start time also succeeds.
-- failure: any uniqueness constraint on (user, day, exercise).
```

## S13 - Complete with confirmation
```sql
UPDATE exercise_sessions
SET ended_at = now(), duration_minutes = 12, distress_after = 5, helpfulness = 7
WHERE id = '<session>' AND user_id = auth.uid();
-- expected: succeeds; duration may be computed rather than stored.
-- failure: no ended_at/duration column, or update blocked by RLS.
```

## S14 - Distress before and after
```sql
SELECT distress_before, distress_after FROM exercise_sessions WHERE id = '<session>';
-- expected: both columns exist, smallint 0-10, nullable.
-- failure: columns missing or named mood_before/mood_after (the evidence-backed names are distress_*).
```

## S15 - Helpfulness rating
```sql
SELECT helpfulness FROM exercise_sessions WHERE id = '<session>';
-- expected: exists, smallint 0-10, nullable.
```

## S16 - Tags on sessions
```sql
-- system tag attach:
INSERT INTO exercise_session_tags (session_id, tag_id) SELECT '<s>', id FROM tags WHERE name = 'grounding' AND user_id IS NULL;
-- custom tag create + attach:
INSERT INTO tags (user_id, name) VALUES (auth.uid(), 'my tag') RETURNING id;
-- expected: both succeed; custom tag rows carry user_id.
-- failure: no tags tables, or custom tags without user_id (would become global).
```

## S17 - Session history
```sql
SELECT es.id, e.title, es.started_at, es.duration_minutes
FROM exercise_sessions es JOIN exercises e ON e.id = es.exercise_id
WHERE es.user_id = auth.uid()
ORDER BY es.started_at DESC;
-- expected: own sessions only, newest first. Failure: missing join columns, or RLS missing.
```

## S18 - Multiple sessions per day
```sql
SELECT COUNT(*) FROM exercise_sessions
WHERE user_id = auth.uid() AND started_at::date = CURRENT_DATE;
-- insert a second session same day: must succeed.
-- failure: any uniqueness constraint on (user, day) or (user, exercise, day).
```

## S19 - Plain-text journal entry
```sql
INSERT INTO journal_entries (user_id, body, created_at) VALUES (auth.uid(), 'note', now());
SELECT body, created_at FROM journal_entries WHERE user_id = auth.uid() ORDER BY created_at DESC;
-- expected: insert + read work, independent of any exercise session.
-- failure: entry coupled to a session (e.g. required session_id FK).
```

## S20 - Journal tags
```sql
INSERT INTO journal_entry_tags (entry_id, tag_id) SELECT '<e>', id FROM tags WHERE name = 'anxious' AND user_id IS NULL;
-- expected: succeeds. Custom tags follow the S16 pattern.
```

## S21 - Limited edit window
```sql
-- schema check only: created_at and updated_at exist on journal_entries.
SELECT created_at, updated_at FROM journal_entries WHERE id = '<e>';
-- the 24h-window enforcement is app-level; the schema must not contradict it
-- (no trigger that allows edits forever, no missing timestamps).
-- failure: no timestamps.
```

## S22 - Delete a single entry
```sql
DELETE FROM journal_entries WHERE id = '<e>' AND user_id = auth.uid();
-- expected: succeeds, no cascade to other entries.
-- failure: FK blocks delete, or delete cascades to unrelated records.
```

## S23 - Prompted journaling
```sql
SELECT id, prompt_text, chapter_id FROM prompts;
-- expected: every row traceable to the workbook (grounding check - no invented prompts).
INSERT INTO journal_entries (user_id, body, prompt_id, created_at)
VALUES (auth.uid(), 'note', '<prompt>', now());
-- expected: prompt_id nullable FK, insert with and without prompt both succeed.
-- failure: prompts exist that cannot be traced to the workbook, or prompt_id is required.
```

## S24 - Unlimited entries per day
```sql
SELECT COUNT(*) FROM journal_entries WHERE user_id = auth.uid() AND created_at::date = CURRENT_DATE;
-- insert two entries same day: both succeed.
-- failure: any uniqueness constraint on (user, day).
```

## S25 - Check-in
```sql
INSERT INTO checkins (user_id, ns_state, survival_response, triggers, note)
VALUES (auth.uid(), 'dysregulated', 'fight', ARRAY['crowds'], 'optional note');
-- expected: succeeds; all optional fields nullable; array type for triggers.
-- failure: missing table/columns, or non-nullable optionals.
```

## S26 - No mood dashboard
```sql
-- static check: no aggregation view exists for user-facing trends.
SELECT table_name FROM information_schema.views WHERE table_schema = 'public';
-- expected: no mood-trend/chart view. Storing raw metrics is enough.
```

## S27 - Anonymised research export
```sql
-- the export query must select ONLY non-PII columns:
SELECT u.id, p.age_band, p.gender, p.ethnicity, p.treatment_status, p.referral_source,
       es.exercise_id, es.started_at, es.distress_before, es.distress_after, es.helpfulness,
       j.created_at, c.ns_state, c.survival_response
FROM users u
LEFT JOIN profiles p ON p.user_id = u.id
LEFT JOIN exercise_sessions es ON es.user_id = u.id
LEFT JOIN journal_entries j ON j.user_id = u.id
LEFT JOIN checkins c ON c.user_id = u.id;
-- expected: NO email, display name, google identity, journal body, or note columns in the result.
-- failure: the query cannot be written without PII, or PII columns are mixed into research tables.
```

## S28 - Workbook not in the repository
```sql
-- not SQL - git check:
-- git ls-files | grep -iE '\.pdf$'   must NOT list the toolkit PDF
-- failure: toolkit_compressed.pdf (or similar) committed anywhere in history.
```

## S29 - Offline-ready timestamps
```sql
SELECT table_name FROM information_schema.columns
WHERE column_name IN ('created_at','updated_at') AND table_schema='public';
-- expected: journal_entries, exercise_sessions, checkins, tags, profiles all listed.
-- failure: any user-data table missing either timestamp.
```
