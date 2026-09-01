# Calm Anchor — Documentation Index

This is the entry point for all documentation. Use it to find what you need; each folder owns one concern, consistent with the project's one-concern-per-file approach. Project-lead-owned docs are marked and left untouched.

## Navigation

| Path | Purpose | Owner |
|---|---|---|
| [`product/technical-specification.md`](product/technical-specification.md) | The original product specification (Core 7 + 2, source-material mapping). | Project lead |
| [`schema-coaching/`](schema-coaching/README.md) | Requirements contract + coaching protocol: user stories, query pack, status register, metrics evidence, decision log, FAQ. **Read this before schema/auth work.** | Project lead |
| [`ui/`](ui/README.md) | UI/UX design docs — ASCII diagrams for navigation, screen wireframes, and user flows. Built bottom-up and cross-referenced to routes + design-system tokens. | Student |
| [`decisions/`](decisions/README.md) | Architectural Decision Records (ADRs). One file per decision, format per `schema-coaching/templates/ADR.md`. | Student |
| [`progress/`](progress/README.md) | Milestone plan + status, and the open-questions register. Append-only. | Student |

## Reading order

1. `AGENTS.md` (repo root) — project context and people.
2. `docs/product/technical-specification.md` — what the product is.
3. `docs/schema-coaching/README.md` → `AGENT.md` → `01-user-stories.md` — the requirements contract.
4. `docs/schema-coaching/02-query-pack.md` + `03-schema-status.md` — how each story is verified and its current state.
5. `docs/ui/` — how the app is being designed.
6. `docs/decisions/` + `docs/progress/` — what was decided and where we are.

## Rules of engagement

- **One concern per file.** Don't append unrelated content to an existing doc.
- **Decisions go in ADRs** (`docs/decisions/`), following the template.
- **Status and open questions are append-only registers** — add rows, never rewrite history.
- **Templates:** ADR format lives in `docs/schema-coaching/templates/ADR.md` (lead-owned); copy the shape into `docs/decisions/`.
