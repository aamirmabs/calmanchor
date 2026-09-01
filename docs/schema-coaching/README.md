# docs/schema-coaching

A schema-coaching pack for the Calm Anchor app: user stories, a query pack, and an agent protocol that helps you validate the Supabase schema against the product requirements.

## What this folder is

The application's requirements were captured through interviews with the project lead. They are expressed here as user stories with acceptance criteria and the data operations each story implies. The purpose is NOT to grade your schema. The purpose is to give you (and your agent) a structured way to check, story by story, whether the schema can support what the app must do - and to fix what it cannot.

## The workbook is the source of truth

The Bella and Wolf CPTSD Toolkit is the clinical source of truth for this product. Where any requirement in this folder, or any opinion expressed in conversation, conflicts with the workbook, the workbook wins. If you find a conflict, note it in the status register rather than silently choosing a side.

## The loop

Run this repeatedly. Each run is one session of the coaching loop:

1. Read this README, then AGENT.md, then the status register (03-schema-status.md).
2. Read the user stories (01-user-stories.md) and the query pack (02-query-pack.md).
3. Map each story to the schema files (lib/db.ts, services/seed.ts, any SQL migrations).
4. Verify each story against the schema: run its queries if a live Supabase instance is available, otherwise trace them statically. Record evidence.
5. Where a story fails, work with the student: they articulate the gap, propose the fix, approve it - then the agent may implement it.
6. Update the register. Append-only. Never delete history.
7. End with a "next up" list: failing stories ordered by severity.

## Files

| File | Purpose |
|---|---|
| AGENT.md | The coaching protocol for the student's agent. Read this first. |
| 01-user-stories.md | The requirements contract: stories, acceptance criteria, schema implications. |
| 02-query-pack.md | The SQL each story implies, with expected results and failure meanings. |
| 03-schema-status.md | The living register: per-story status, evidence, history. The agent's memory. |
| 04-wellbeing-metrics.md | The evidence base for the wellbeing metrics in the schema (distress, helpfulness). |
| 05-decision-log.md | The reasoning behind the product decisions encoded in the stories. |
| 06-FAQ.md | Answers to anticipated questions. |
| templates/ADR.md | Template for recording architectural decisions (RLS, auth, and anything else). |

## Rules of engagement

- No verdicts, no scores. Coaching only.
- The student articulates the fix in their own words before the agent proposes one.
- The agent may implement a fix ONLY after the student has articulated it correctly and explicitly approved it.
- Never invent requirements. If a story or decision seems wrong, flag it in the register's questions section.
- Count from files, never from commit messages or chat summaries.
- When in doubt, ask. Do not assume.
- Briefing status: stories in 01-user-stories.md are marked [BRIEFED] or [NOT YET BRIEFED]. NOT YET BRIEFED items were decided by the project lead but not yet discussed with the student in supervision - treat them as requirements to be understood, not agreed items, and add them to the register's open questions.
