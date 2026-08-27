# 06 - FAQ

Anticipated questions from the student, answered. If a question is not answered here, ask rather than assume, and add the answer to this file.

## The stories mention 20 chapters and about 26 exercises. Earlier I counted differently.

Count from the workbook and the seed file, not from commit messages or conversation. The workbook (Bella and Wolf toolkit) contains 20 chapter anchors and roughly 26 exercises across six categories (breathing, somatic, sensory, voice, mindful, crisis). If your count from the seed file differs, the file is the truth and the register should note it.

## Why distress and helpfulness instead of mood?

See 04-wellbeing-metrics.md. Short version: single-item "mood" is ambiguous and psychometrically weak; SUDS-style distress ratings are the established momentary measure in the PTSD/exposure literature, and momentary ratings are more accurate than retrospective recall. "Mood" remains available as a journal tag.

## Do I need a mood_logs table?

No. The product explicitly excludes mood tracking dashboards (decision D03). Wellbeing metrics live on exercise_sessions (distress_before, distress_after, helpfulness). A separate mood_logs table was part of an earlier scaffold and is not required by any story. Remove it or justify it in a decision-log entry.

## What about the three prompts in the seed?

The three seeded prompts could not be traced to the workbook - they may be an agent artefact. Story S23 requires prompts to be grounded in the workbook's actual reflection questions (for example "What do you think the purpose of this exercise was?"). Ungrounded prompts should be removed or replaced with workbook-grounded ones.

## Is offline storage part of M1?

No. The architecture is Supabase-first; offline/local storage (Expo SQLite, Drizzle, Async Storage) is deferred to a later milestone. What M1 must do is keep the schema offline-ready: timestamps on every user-data table (S29) and append-only behavioural records (D05).

## Why no forced single-device login?

Enforcing one active session requires token-invalidation infrastructure and cannot work offline. The append-only model keeps records correct across devices without it. If single-session enforcement is ever needed, it becomes its own decision-log entry.

## Can content really be read without signing in?

Yes - story S07 and decision D08. The workbook PDF, chapter catalogue, and exercise instructions are supporting material and public-read. Everything user-specific (sessions, journal, check-ins, tags, profile) is owner-only behind RLS. Record the final RLS decision in an ADR.

## Who owns the register updates?

The agent updates 03-schema-status.md at the end of every coaching session. The student reviews it and brings open questions to supervision. History is append-only.

## Can the agent write schema changes?

Yes, with one gate: you (the student) must articulate the gap and the fix in your own words, and explicitly approve, before the agent implements (decision D11). The agent never changes the schema on its own initiative.

## Is there a deadline for the register to be green?

No. The register is a working document, not a report card. Stories move from UNTESTED to PASS over time; the order is prioritised by severity (anything breaking data isolation or the bad-days/crisis path first).

## Why does the export exclude journal bodies and notes?

Free text can identify the author (style, named people, specific events). The anonymised research export (S27) excludes identity columns AND free text by default. If free text is ever needed for research, that becomes a separate ethical review decision - not a schema default.

## The design system has pre/post exercise mood scales. Do I use them?

Yes, as the visual scale for the distress ratings (0-10). The design language stays; the metric name and meaning follow the evidence (04). If you need a second dimension, valence/arousal sliders are the evidence-backed option (Russell, 1980 - see references).
