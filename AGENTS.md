# CalmAnchor — Project Context for AI Agents

## What This Project Is

CalmAnchor is a digital companion application for CPTSD (Complex PTSD) self-management. It takes an existing clinically reviewed paper-based toolkit and turns it into an interactive web and mobile application.

The source material is the **Bella & Wolf CPTSD Toolkit** — a 118-page peer-created workbook covering nervous system regulation, survival responses (fight/flight/freeze/fawn), the Window of Tolerance, self-soothing strategies, inner child work, grounding exercises, and crisis planning.

## Core Application Functions

1. **Private Diary** — users log thoughts, reflections, and daily notes. Personal, private, never shared.
2. **Educational Content** — interactive guided exercises explaining trauma concepts (nervous system states, survival responses, regulation techniques) with an embedded PDF viewer for the toolkit.
3. **Toolkit Browser** — browse the full CPTSD toolkit by section, with tracking for completed exercises and mood logging.

**Important:** This is a single-user, private application. There are NO clinician dashboards, NO data sharing, NO multi-user requirements. The Jenkinson bid originally mentioned clinician-facing features — that assumption was incorrect and has been dropped.

## People

| Person | Role |
|---|---|
| **Aamir Abbas** | Project lead, supervisor |
| **Kimberley Hajee** | MSc Psychology student — wrote the activity book (the Bella & Wolf toolkit adaptation) |
| **Sue Brown** | Variable Hours Tutor-AAC — AI and art integration collaborator |
| **Jerome Carson** | Professor of Psychology — project supervision |
| **Anchal Garg** | Co-applicant on Jenkinson bid, computing support |
| **Kashif Butt** | Former developer — stepped down 13 Jun 2026. Designed Figma screens and initial workflow. Assets handed over on GitHub. |

## Funding

- **Jenkinson Award JA27017** — £10,000
- **Cost code:** CAB-J-1-2612 (subjective code TBC)
- **Period:** Aug 2026 — Jul 2027
- **3 Ryley Student Internships** approved
- **Spend authority:** research_projects@greatermanchester.ac.uk
- **Lead school:** School of Arts & Creative Technologies / Computing
- **OpenCode Go** subscription ($10/month) — usage limits per model (see oh-my-openagent config)

## What Already Exists

### Design
- `design-system/calm-anchor-design-system.html` + `.css` + `.js` — Complete design system with 35+ components, trauma-informed color palette (light + dark mode), CSS custom properties, form controls, navigation, feedback/overlays, content components, actions, data display. Built with Tailwind conventions.
- `calm-anchor-color-system-v3.html` — Original color token specification (in Design/ folder on OneDrive)

### Assets
- Figma screens (registration, login, Pause & Support screen)
- App code (early stage) — both zipped in GitHub repo
- **GitHub:** https://github.com/university-of-greater-manchester/cptsd_figma_design_and_app_code (Aamir has admin access)

### Documentation
- Full CPTSD toolkit PDF: `Documentation/toolkit_compressed.pdf` (in OneDrive project folder)
- Jenkinson bid document, budget profile, outcome letter
- Intern job description: `Intern JDs/intern-jd.docx`

### Project folders
- **OneDrive:** `C:\Users\aamye\OneDrive - University of Greater Manchester\9 - Projects\CalmAnchor (PTSD App)\`
- **WSL dev:** `~/code/calmanchor/`
- **Linear project:** CalmAnchor (PTSD App) — task tracking

## What We're Building

A full-stack application:
- **Frontend:** Next.js with TypeScript, Tailwind CSS (using the design system above)
- **Backend:** API routes in Next.js or separate backend
- **Database:** PostgreSQL (or similar relational DB)
- **Authentication:** Supabase Auth (or similar)
- **Deployment:** Vercel/AWS for web, App Store + Google Play for mobile (shared backend)
- **PDF viewer:** Embedded toolkit browser with section navigation
- **Tracking:** Mood logging, exercise history, trigger patterns

## Tech Preferences

These are preferences, not mandates. The intern or developer should use what they're proficient with:
- JavaScript/TypeScript ecosystem
- Next.js / React for web
- Tailwind for styling (design system already uses Tailwind conventions)
- Supabase for auth and database
- The design system CSS tokens should be the single source of truth for all styling

## Current Status (Jun 2026)

- Kashif Butt stepped down — all assets handed over
- Intern job description drafted, awaiting Sam Johnson's review
- Aamir has a candidate in mind (MSc supervisee)
- Design system being actively expanded (HTML/CSS component library)
- OpenCode agent (oh-my-openagent) configured with optimized model mapping for OpenCode Go
- No working code yet — design phase

## Working With This Project

- Open the design system HTML in a browser to see all components
- All colors, spacing, typography are CSS custom properties — use them, don't override
- The toolkit PDF is the clinical source of truth — app features should map to toolkit sections
- Keep the app private, single-user, no data sharing
- UK spellings throughout (colour, centre, organise, programme)
