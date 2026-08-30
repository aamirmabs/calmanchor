# M3 — Full Feature Set

**Deliverable:** Mood tracking, educational content, remaining workbook sections, offline-first behaviour
**Due:** Sun 13 Sep · **Payment:** 30% · **Status:** TODO

## Task register

| Date | ID | Task | Status | Evidence | Notes |
|---|---|---|---|---|---|
| — | M3-01 | Dashboard (Pattern Dashboard) — 4 descriptive charts: trigger frequency, response distribution, exercise effectiveness, time-of-day patterns | TODO | — | Source `checkins`, `exercise_sessions`, raw distress/helpfulness — **no user-facing mood trend** (S26/D03). |
| — | M3-02 | Daily check-in — home card: ns_state, survival_response, triggers → `saveCheckin` | TODO | — | — |
| — | M3-03 | Streaks/stats — session count, streak, window-of-tolerance % from `exercise_sessions` | TODO | — | — |
| — | M3-04 | Portfolio tab — favourited exercises, safe-space notes, custom strategies (new tables: `favourites`, `safe_space_notes`, `custom_strategies`) | TODO | — | — |
| — | M3-05 | Remaining workbook sections — educational content for Learn, Reframe, Relationships groups | TODO | — | — |
| — | M3-06 | Checklists — activate `checklist_items`/`checklist_progress`, self-assessment UI | TODO | — | — |
| — | M3-07 | Offline-first — `expo-sqlite` + `drizzle-orm`, local cache primary; swap `lib/db.ts` internals; Supabase opt-in backup | TODO | — | The `lib/db.ts` seam keeps screens unchanged. |
| — | M3-08 | Onboarding — 7 gentle, skippable steps (supporting feature) | TODO | — | — |
| — | M3-09 | Export (supporting) — user CSV export of diary, triggers, portfolio | TODO | — | — |

## Status values

`TODO / IN_PROGRESS / DONE / BLOCKED` — see `../README.md`.
