# Progress — Changelog

Append-only record of changes (decisions + progress). Newest first. Never edit or delete a past entry.

## 2026-08-30 — Schema verifier + live results

- **New `services/verify-schema.ts`** — runs the `docs/schema-coaching/02-query-pack.md` checks against
  live Supabase. `npm run verify` (Engine A, read-only) and `npm run verify:rls` (adds S04/S05 two-user
  isolation + cascade test). Engine B (introspection) activates when `SUPABASE_DB_URL` is set.
- Installed `postgres` (dev) for Engine B.
- **Live run (Engine A): 20 checks, 20 PASS.** Recorded in `docs/schema-coaching/03-schema-status.md`
  (S01,S02,S03,S06,S07,S08,S09,S11,S14,S15,S16,S19,S20,S23,S25 PASS; S04/S05 BLOCKED pending `--rls`;
  S26/S27/S29 + sequence stories UNTESTED, Engine B).
- Details: chapters=20, exercises=35 (breathing=3,somatic=11,sensory=8,voice=4,mindful=2,crisis=7),
  prompts=3, system tags=grounding/anxious/mood.

## 2026-08-30 — Dev-build / EAS decision (M1-17 → resolved by M1-18)

- **Decision:** stay on **Expo SDK 57** and use a **dev build via EAS cloud build** (no local Android SDK /
  Java needed). Recorded in `milestones/m1-project-setup.md` (M1-18) — resolved the M1-17 BLOCKED row.
- Installed `expo-dev-client@~57.0.16` (SDK 57 kept; pre-existing `react`/`react-dom` peer skew resolved
  with `--legacy-peer-deps`).
- Created `eas.json` with `development` (APK, developmentClient), `preview`, `production`.
- Toolkit PDF wiring landed: public-read `toolkit` bucket + `EXPO_PUBLIC_TOOLKIT_PDF_URL` +
  `lib/toolkit.ts` seam + `app/toolkit.tsx` (`react-native-pdf`, `source={{uri,cache:true}}`).
- `.env` gained `SUPABASE_SERVICE_ROLE_KEY` and `EXPO_PUBLIC_TOOLKIT_PDF_URL` (user-only, gitignored).
- **Pending (interactive, user-only):** `npx eas login` → `npx eas init` (adds `extra.eas.projectId`) →
  `npx eas build --profile development --platform android` → install APK; then `npx expo start --dev-client`.

## 2026-08-30 — Query-pack compliance pass (schema + seed corrections)

### Progress — hard-fail fixes (S05, S29)
- **S05 (delete my data):** every user-data FK now `on delete cascade` (checkins, journal_entries,
  exercise_sessions, checklist_progress, crisis_plan, settings, tags, junction tables) so delete-user
  cascades cleanly and no orphans remain.
- **S29 (offline-ready timestamps):** `created_at` + `updated_at` added to every user-data table —
  `exercise_sessions` (both, previously neither), `checkins` (+updated_at), `checklist_progress`
  (+created_at), `settings` (+created_at), `tags` (+updated_at). `journal_entries`, `profiles`,
  `crisis_plan` already had both.

### Progress — S11 crisis filter (decision: satisfy both filters)
- All 7 "Tools for the Bad Days" exercises now have **`exercise_type = 'crisis'`** AND
  **`category = 'crisis'`**. This satisfies S11's `WHERE exercise_type = 'crisis'` query *and* S08's
  `GROUP BY category` grouping — same set, both filters work, no separate crisis table/feature.
- Also fixed: "The Balloon Release" was mis-categorised `somatic` — it's a bad-days exercise, now
  `category = 'crisis'`.

### Progress — system tags (S16/S20)
- `services/seed.ts` now seeds system tags (`user_id` null): **grounding, anxious, mood** (D03 keeps
  "mood" only as a journal tag). Satisfies the INSERT…SELECT queries that attach `name = 'grounding'`/
  `'anxious'` system tags.

### Fix — RLS hole (S16)
- `tags` write policy tightened: `for insert with check (auth.uid() = user_id)` only — lets users create
  only *their* private tags, not global (system) tags. System tags are seeded via the service role
  (bypasses RLS).

### Fix — `documents` drop statement
- Added `drop table if exists documents cascade;` so the script re-runs cleanly.

### Progress — CHECK constraints (prevent test friction, recommended)
- `exercises.category` CHECK in the 6 contract names; `distress_before`/`distress_after`/`helpfulness`
  CHECK 0–10.

### Notes (accepted, not breaking — for the record)
- **5-4-3-2-1 Grounding** lives under "Mind" on workbook p.26 but is seeded `sensory` — acceptable
  contract mapping, noted. Its exercise is otherwise identical.
- **Chapter page ranges** in the seed differ from the workbook's own contents page for some chapters
  (e.g. Ch2 9–12 vs 8–14). Count (20) is right; mapping differs. Open item for Aamir — see
  `07-questions-for-aamir.md`.

## 2026-08-30 — RLS decision + contract alignment (ADR-003)

### Decision — RLS on all tables, difference in the policy (`docs/decisions/ADR-003-rls-strategy.md`)
- **Accepted (Amirreza, 2026-08-30):** `row level security` is enabled on **every** table. Content tables
  get a public-read policy (`for select using (true)`); user-data tables get own-rows-only
  (`auth.uid() = user_id`); `users` own-rows; `tags` public-read for system tags + owner for user tags;
  junction tables resolve owner via the parent row.
- Resolves the project lead's concern about "some tables RLS, some not" — the split lives in the policy,
  not in whether RLS is on.

### Decision — `users` table + service-role seed (sub-points of ADR-003)
- A `public.users` table mirrors `auth.users` (`id` PK→FK, `email`, `display_name`, `google_identity`
  unique, no password columns). All user-data FKs now reference `users(id)`. A `handle_new_user` trigger
  auto-creates the row on signup + one-time backfill. Satisfies S02/S27's `FROM users` queries and fixes
  the earlier split-brain (some FKs pointed at `auth.users`, some at a would-be parallel table).
- `services/seed.ts` now uses `SUPABASE_SERVICE_ROLE_KEY` (server-only, bypasses RLS) so content inserts
  still work under strict RLS. `lib/supabase.ts` unchanged (anon key for the client).

### Progress — exercise categories aligned to contract (S08)
- Renamed the seed's categories to the contract set: `body→somatic`, `breath→breathing`,
  `senses→sensory`, `mind→mindful`, and "Tools for the Bad Days" exercises → `crisis`.
- Final distribution (verified from file): `breathing=3, somatic=12, sensory=8, voice=4, mindful=2, crisis=6`
  = **35 exercises**, 6 distinct contract categories, no leftover old names. `npx tsc --noEmit` passes.
- Seed **not yet run** against Supabase (by user) — waiting on `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

## 2026-08-30 — Schema alignment & seed corrections

### Decision — toolkit read source (`docs/decisions/ADR-001-toolkit-source.md`)
- **Accepted (Amirreza, 2026-08-30):** the workbook PDF is read from **Supabase Storage (public-read)** via a URL and cached on-device by `react-native-pdf` — **not committed to the repo**. The `assets/toolkit_compressed.pdf` file is removed and `.gitignore` excludes `*.pdf`. Seam: a new `lib/toolkit.ts` (same discipline as `lib/auth.ts`/`lib/db.ts`).

### Progress — mood removed, evidence-based metrics added (NOT a decision)
- **`lib/db.ts`:** removed `MoodLogInput`, `saveMoodLog`, `getMoodLogs`; removed `mood_before`/`mood_after` from `SessionInput`; added `distress_before`/`distress_after`/`helpfulness` (0–10) and `note`. Per `04-wellbeing-metrics.md` (D04).
- **Migration `0001_alignment_exercise_sessions.sql`:** renames `sessions` → `exercise_sessions`; drops `mood_before`/`mood_after`; adds `distress_before`/`distress_after`/`helpfulness` (smallint 0–10); drops `mood_logs`. Not yet applied (live Supabase).
- Matches S26/D03 (no mood dashboard, no `mood_logs`).

### Progress — table/column renames
- **`lib/db.ts`:** `saveSession`/`getSessions` target `exercise_sessions`; `getJournalEntries` joins `prompts` (not `journal_prompts`); `JournalEntryInput` drops `chapter_id`/`mood_after` (keeps `body`, `prompt_id`).
- **Migration `0002_alignment_journal_prompts.sql`:** renames `journal_prompts` → `prompts`; drops `journal_entries.mood_after`/`chapter_id`; adds `updated_at`, sets `body not null`.
- Matches S19/S23 (journal_entries shape) and S23 (table named `prompts`).

### Progress — missing tables
- **Migration `0003_missing_tables.sql`:** adds `users` (google_identity ref, no password columns), `profiles` (research fields only, separated identity), `tags` (system + user), `exercise_session_tags`, `journal_entry_tags`, `documents` (storage anchor). RLS: owner-only on all user-data tables (S04).
- **`lib/db.ts`:** added `getCurrentProfile`, `saveProfile`, `getSystemTags`, `createUserTag`. Not yet applied (live Supabase).

### Seed fixes (`services/seed.ts` — edited, NOT run)
- **6 categories** (was 5): added `body`. Reassigned body-family exercises — Hand on Chest & Slow Breath, Tapping/EFT, Rocking or Swaying — plus new **Stretching or Yoga (Cat-Cow / Child's Pose)**.
- **Added 9 missing workbook exercises** (verified against `toolkit_compressed.pdf` pages 23–34 + 99–113):
  - mind: "What's True Right Now?", "Gentle Journaling: What Does This Part of Me Need?"
  - senses: Weighted Blanket, Nature Sounds / Brown Noise / Low TV, Mindful Body Scan, Tactile Objects
  - somatic: Grounding Through Contact
  - senses: How to Build a Safe Space (from Making Safety Real)
- **Count:** 26 → **35 exercises**. Distinct categories (verified): `body, breath, mind, senses, somatic, voice`.
- Renamed seed's `journal_prompts` → `prompts` (delete + insert calls).
- `npx tsc --noEmit` passes. **Seed not executed against Supabase.**

## 2026-08-30 — Docs restructure (progress folder)

- Split the monolithic `01-milestone-tracker.md` into per-phase registers under `milestones/` + `01-overview.md`, mirroring the `docs/schema-coaching/` format (one concern per file, stable IDs, append-only registers, status legend).
