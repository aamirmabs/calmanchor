# Progress — Changelog

Append-only record of changes (decisions + progress). Newest first. Never edit or delete a past entry.

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
