# Open Questions for Aamir

Append-only register. The student brings these to supervision. Anything ambiguous, unresolved, or
where two source documents conflict goes here — never silently choose a side (per D01).

## Register (append-only)

| Date | Question | Reason / source | Status |
|---|---|---|---|
| 2026-08-30 | **Chapter page ranges:** seed page ranges differ from the workbook's own contents page (e.g. Ch2 9–12 vs PDF 8–14; Ch5 23–32 vs 23–34; Ch1 1–6 vs 3–6). Count is 20 (correct) but the range mapping differs, and `page_range` drives the PDF jump (S07). Align to the contents page, or confirm the custom split (e.g. Window of Tolerance as its own chapter; Crisis Plan & Final Words merged) is intentional? | S07 vs `toolkit_compressed.pdf` p.7 + seed `page_range` | Open |
| 2026-08-30 | **Auth direction:** repo uses silent anonymous sign-in (`lib/auth.ts`) but `docs/schema-coaching/01-user-stories.md` S01/S02 require **Google-only** sign-in with `users` + `google_identity`. Which is current? | S01/S02 vs `AGENTS.md` + `auth.ts` | Open |
| 2026-08-30 | **Apple/Android vs PWA:** scope doc describes a Next.js PWA (web, Vercel, no app stores); the offer/email and roster ask for React Native + iOS/Android + store submission. Which platform? | scope doc architecture vs project ask | Open |
| 2026-08-30 | **Workbook PDF in git history:** `dca63f9` (pushed to `origin/feature/m1-scaffold` + `upstream`) still contains the PDF. Leave (D10: repo becomes private) or rewrite history (force-push)? | S28 vs ADR-001. Deleted from working tree; history still holds it. | Open |
