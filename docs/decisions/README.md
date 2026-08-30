# Decisions (ADR)

Architectural Decision Records for the Calm Anchor app. One file per decision; numbering is stable
(`ADR-NNN`). Follow the ADR shape in `docs/schema-coaching/templates/ADR.md` when writing a new entry —
copy the format and headings; do not edit the template itself (it is project-lead-owned).

## Status values

`proposed` → `accepted` → `superseded by ADR-NNN` (never deleted).

## How to record a decision

1. Copy the template into a new file `docs/decisions/ADR-NNN-<short-slug>.md`.
2. Fill in context, decision, rationale, consequences, implementation notes.
3. Cross-reference any source decision in `docs/schema-coaching/05-decision-log.md` (e.g. D08).
4. Add one line to this index's register table (append-only, one row per new ADR).

## Register (append-only)

| ADR | Title | Status | Date | Author |
|---|---|---|---|---|
| ADR-001 | Toolkit PDF read source | accepted | 2026-08-30 | Amirreza |

> Remaining known candidate ADRs (shape from `schema-coaching/templates/ADR.md`, not yet written):
> - **ADR-002** Auth — anonymous (`lib/auth.ts`) vs Google-only (S01/S02), + `users`/`profiles` tables
> - **ADR-003** RLS strategy — content vs user-data tables (source: D08)
> - **ADR-004** Journal entry deletion — soft vs hard delete (source: S22)
> - **ADR-005** Research export — free-text inclusion policy (source: S27)

## Next-up

The next ADR to write is **auth** (ADR-002): the repo currently uses silent anonymous sign-in
(`lib/auth.ts`), but `docs/schema-coaching/01-user-stories.md` S01/S02 require **Google-only** sign-in with
a `users` table + `google_identity` reference and no password columns. Record the resolution here rather than
silently choosing a side (per D01/D09).
