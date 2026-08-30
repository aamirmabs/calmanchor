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
| 2026-08-30 | M1-07 | Reconcile exercise categories to contract 6 (`breathing, somatic, sensory, voice, mindful, crisis`) | DONE | `services/seed.ts` (verified 6 distinct) | Final: 3/12/8/4/2/6 = 35 exercises. |
| 2026-08-30 | M1-08 | Drop `mood_logs`/`mood_*`; add `distress_*/helpfulness` | DONE | SQL editor schema (replaced migrations) | Applied by user; `mood_logs` gone. |
| 2026-08-30 | M1-09 | Renames: `sessions`→`exercise_sessions`, `journal_prompts`→`prompts`, journal cols | DONE | SQL editor schema | Applied by user. |
| 2026-08-30 | M1-10 | Add `users`, `profiles`, `tags` + junctions, `documents` + RLS + trigger | DONE | SQL editor schema + ADR-003 | Applied by user; all-tables RLS. |
| 2026-08-30 | M1-11 | Toolkit PDF from Storage (ADR-001), `lib/toolkit.ts` | IN_PROGRESS | ADR-001 accepted | PDF removed from repo; `.gitignore` excludes `*.pdf`. Guide written: public-read `toolkit` bucket + `EXPO_PUBLIC_TOOLKIT_PDF_URL` + `lib/toolkit.ts` seam + `react-native-pdf` (`source={{uri,cache:true}}`). Pending: dashboard bucket/upload + `.env` (user-only). |
| 2026-08-30 | M1-12 | Run seed against Supabase (service role) | IN_PROGRESS | `services/seed.ts` uses `SUPABASE_SERVICE_ROLE_KEY` | Seed updated: system tags (`grounding`,`anxious`,`mood`, user_id null) + 8 crisis `exercise_type` rows. Blocked on `SUPABASE_SERVICE_ROLE_KEY` in `.env`; must confirm 20/35/3/3. |
| 2026-08-30 | M1-13 | 5-tab nav shell + ThemeProvider wrap | TODO | — | Toolkit, Diary, Exercises, Portfolio, Dashboard. |
| 2026-08-30 | M1-14 | Crisis FAB (UK contacts + crisis exercises) | TODO | — | Static contacts + queried crisis category. |
| 2026-08-30 | M1-15 | Verify iOS + Android; open draft PR | TODO | — | NOTE: `react-native-pdf`+`react-native-blob-util` are NOT in Expo Go → toolkit screen needs a dev build, not Expo Go. See SDK note below. |
| 2026-08-30 | M1-16 | Schema saved to `supabase/schema.sql` + `supabase/rls.sql`; syntax fix (`on conflict`); S05 cascade + S29 timestamps + S11 crisis type + S16 system tags | DONE | `supabase/schema.sql`, `supabase/rls.sql`, `services/seed.ts` | Static trace vs query pack: 28/29 SQL stories pass (S04 needs live 2-user run; S28 = git check). Fixed missing `on` in backfill; added `tags_system_name_key` unique partial index. RLS split out (drops wipe policies). |
| 2026-08-30 | M1-17 | Expo SDK compat (Expo Go "project too new" error) | BLOCKED | `package.json` expo `~57.0.16` | Project = SDK 57; store Expo Go stops at SDK 54. Decision pending — see SDK note below. |

## Summary

- **DONE:** 8 · **IN_PROGRESS:** 3 · **TODO:** 4 · **BLOCKED:** 1

> Migration/seed application (M1-12, needs service-role key) and nav shell (M1-13+) are the remaining M1 blockers.
> See `../06-changelog.md` for the schema-alignment details, `../07-questions-for-aamir.md` for open items.

### Expo SDK note (M1-15 / M1-17)

Project is **Expo SDK 57**. Per Expo's compatibility doc, **store Expo Go stops at SDK 54** — so the store
Expo Go app cannot open this project ("Project is incompatible with this version of Expo Go").
Separately, **`react-native-pdf` and `react-native-blob-util` are native modules not bundled in Expo Go**,
so the toolkit PDF screen needs a **development build** regardless of SDK version. Options recorded for
decision (downgrade vs. dev build) — DO NOT downgrade without resolving the native-module issue first.
