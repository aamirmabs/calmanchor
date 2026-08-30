# M1 — Project Setup & Architecture

**Deliverable:** Repository, app scaffold, database schema, design-system integration, workbook content mapped to screens
**Due:** Sun 30 Aug · **Payment:** 20% · **Status:** IN_PROGRESS

## Task register

| Date | ID | Task | Status | Evidence | Notes |
|---|---|---|---|---|---|
| 2026-08-30 | M1-01 | Repo + Expo + Router scaffold; `app/` + entry | DONE | `package.json`, `app/_layout.tsx` | create-expo-app merged to preserve `design-system/` + `docs/`. |
| 2026-08-30 | M1-02 | Supabase client + silent anonymous auth | DONE | `lib/supabase.ts`, `lib/auth.ts` | Single seam; no auth UI. |
| 2026-08-30 | M1-03 | Schema: content + user-data tables, RLS | DONE | live Supabase; RLS owner-only | Pre-alignment shape. Superseded by M1-10/M1-11/M1-12. |
| 2026-08-30 | M1-04 | Seed: 20 chapters, 3 prompts | DONE | `services/seed.ts` | — |
| 2026-08-30 | M1-05 | Data-access layer `lib/db.ts` | DONE | `lib/db.ts` | Screens import here, never `supabase` directly. |
| 2026-08-30 | M1-06 | Design tokens + ThemeContext | DONE | `theme/tokens.ts`, `theme/ThemeContext.tsx` | 60+ tokens, light/dark. |
| 2026-08-30 | M1-07 | Reconcile exercise category taxonomy (5 → 6) | DONE | `services/seed.ts` (verified 6 distinct) | Added `body`; 26 → 35 exercises. |
| 2026-08-30 | M1-08 | Drop `mood_logs`/`mood_*`; add `distress_*/helpfulness` | IN_PROGRESS | `lib/db.ts` edited; migration `0001` written | Migration not yet applied. |
| 2026-08-30 | M1-09 | Renames: `sessions`→`exercise_sessions`, `journal_prompts`→`prompts`, journal cols | IN_PROGRESS | `lib/db.ts` + migration `0002` | Not yet applied. |
| 2026-08-30 | M1-10 | Add missing tables: `users`, `profiles`, `tags` + junctions, `documents` | IN_PROGRESS | migration `0003` + `lib/db.ts` fns | Not yet applied. |
| 2026-08-30 | M1-11 | Toolkit PDF from Storage (ADR-001), `lib/toolkit.ts` | TODO | ADR-001 accepted | PDF removed from repo; `.gitignore` excludes `*.pdf`. |
| 2026-08-30 | M1-12 | Apply migrations + run seed against Supabase | TODO | — | Do together; seed must confirm 20/35/3. |
| 2026-08-30 | M1-13 | 5-tab nav shell + ThemeProvider wrap | TODO | — | Toolkit, Diary, Exercises, Portfolio, Dashboard. |
| 2026-08-30 | M1-14 | Crisis FAB (UK contacts + crisis exercises) | TODO | — | Static contacts + queried crisis category. |
| 2026-08-30 | M1-15 | Verify iOS + Android; open draft PR | TODO | — | — |

## Summary

- **DONE:** 7 · **IN_PROGRESS:** 3 · **TODO:** 5 · **BLOCKED:** 0

> Migration/seed application (M1-12) and nav shell (M1-13+) are the remaining M1 blockers.
> See `../06-changelog.md` for the schema-alignment details, `../07-questions-for-aamir.md` for open items.
