# ADR-001 - Toolkit PDF read source

Status: accepted
Date: 2026-08-30
Author: Amirreza

## Context

Calm Anchor's Interactive Toolkit Browser must open and read the Bella & Wolf workbook PDF
(`assets/toolkit_compressed.pdf`). Two options were on the table when we reached M1:

1. **Bundle the PDF as a repo asset** and read it locally with `react-native-pdf`. Simple, offline-first,
   but it puts the clinical PDF in git — and once committed it stays in history forever, even if deleted
   later. This conflicts with story S28 ("workbook not in the repository") and decision D10 (the repo will
   transfer to the University of Greater Manchester organisation and become private).
2. **Serve the PDF from Supabase Storage** (public-read bucket) via a URL, and let `react-native-pdf`
   read and cache it on-device (`source={{ uri, cache: true }}`). Keeps the clinical content out of git,
   matches S07 ("viewable without signing in") and D08 ("content is public-read"), and requires no
   transcription — it is still the workbook PDF, just not committed.

Constraint #1 from the earlier plan (PDF bundling vs S28) was reviewed by the project lead and, for the
current stage, is acceptable to proceed. However the read source still needs a firm decision so the
implementation is not ambiguous.

## Decision

The Toolkit PDF is **read from Supabase Storage via a public-read URL**, fetched by `lib/toolkit.ts`
(this is the "how to read it" seam, the same discipline as `lib/auth.ts` and `lib/db.ts`), passed to
`react-native-pdf` in the Toolkit screen, and **cached on-device** via the viewer's `cache: true` for
offline reads after first load.

The workbook PDF is **never committed to the repository**. The `assets/toolkit_compressed.pdf` file is not
tracked and is excluded (via `.gitignore`) from git history going forward.

## Rationale

- Satisfies S28 (no clinical PDF in the repo) and D10 (repo transfer + privacy) at the source, rather
  than trying to purge history later.
- Satisfies S07 and D08: the catalogue and workbook are supporting material, readable without sign-in.
- The seam (`lib/toolkit.ts`) isolates the source, exactly like `lib/auth.ts` and `lib/db.ts` already do.
  If the storage location/viewer changes later, only this file changes.
- React Native PDF's `cache: true` gives offline-once-loaded behaviour for free, so the bundled-PDF
  convenience is mostly preserved.

## Consequences

- No clinical PDF in git history. The file lives only in the Supabase Storage bucket.
- The Toolkit browser depends on a network call on first load (cached thereafter). This is the recognised
  trade-off against the fully-bundled approach, and is acceptable because the Crisis FAB — the offline
  safety path — does **not** depend on the PDF.
- Storage bucket is (or is decided to be) public-read. If it must be protected (signed URLs), the decision
  changes to "signed-URL read path" and this ADR is updated — log it if so.

## Implementation notes

- Supabase Storage bucket name: `toolkit` (public-read), object: `toolkit_compressed.pdf`.
- `lib/toolkit.ts` exports `TOOLKIT_PDF_URL` (or a `getToolkitPdfUrl()` helper).
- Toolkit screen passes `source={{ uri: TOOLKIT_PDF_URL, cache: true }}` to `react-native-pdf`.
- `.gitignore` must include `assets/*.pdf` (or the full `assets/toolkit_compressed.pdf`)
  so the workbook is never staged.
- Source of truth for content counts remains the workbook (`docs/.../toolkit_compressed.pdf`),
  per the coaching rule "count from files."
