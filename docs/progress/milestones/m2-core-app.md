# M2 — Core App End to End

**Deliverable:** Patient journal and toolkit browser functional on both platforms
**Due:** Sun 6 Sep · **Payment:** 30% · **Status:** TODO

## Task register

| Date | ID | Task | Status | Evidence | Notes |
|---|---|---|---|---|---|
| — | M2-01 | Toolkit tab — PDF viewer (`react-native-pdf`), chapter nav list from `chapters`, tap chapter → jump to page | TODO | — | Uses `lib/toolkit.ts` (ADR-001). |
| — | M2-02 | Diary tab — show 3 seeded prompts, create/view entries via `saveJournalEntry`/`getJournalEntries` | TODO | — | Prompt table is now `prompts`, not `journal_prompts`. |
| — | M2-03 | Exercises tab — list grouped by 6 categories (`breathing, somatic, sensory, voice, mindful, crisis`), detail screen with steps + duration | TODO | — | Category taxonomy finalised in M1-07 (contract S08 names). |
| — | M2-04 | Exercise session flow — start → timer/steps → pre/post distress → helpfulness → `saveSession` | TODO | — | Session table is `exercise_sessions`; fields `distress_before/after`, `helpfulness`. |
| — | M2-05 | Trigger tracker — within Diary, log triggers (timestamp, trigger name, ns_state, survival_response, note) | TODO | — | — |
| — | M2-06 | Cross-platform QA — iOS + Android, safe areas, keyboard, back behavior | TODO | — | — |

## Status values

`TODO / IN_PROGRESS / DONE / BLOCKED` — see `../README.md`.
