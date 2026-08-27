# 05 - Decision Log

The reasoning behind the product decisions encoded in the user stories. Written so that the student (and their agent) can see WHY the requirements are what they are - and so that future changes start from the rationale, not from a re-litigation of the past.

Format follows the ADR pattern: context, decision, rationale, consequences. Decisions here are the project lead's; the student's own decisions (RLS, auth details) belong in their own ADRs using templates/ADR.md.

---

## D01 - The workbook is the source of truth

- Context: product opinions accumulate faster than evidence. Some early assumptions (12 sections, 5 exercises, crisis-as-feature) conflicted with the actual workbook.
- Decision: the Bella and Wolf CPTSD Toolkit is the clinical source of truth. Where any requirement or opinion conflicts with the workbook, the workbook wins.
- Rationale: the app is a digital companion for a clinical resource; drifting from it means drifting from the intervention itself.
- Consequences: content counts come from the workbook (20 chapters, ~26 exercises in 6 categories). Agent and student must flag conflicts in the register rather than silently choose.

## D02 - Google sign-in only

- Context: different auth providers capture different data shapes; username/password adds credential management for a single-user wellbeing app.
- Decision: Google is the ONLY sign-in method. No username/password, no other providers. Internal UUID per user. Profile research fields collected at onboarding.
- Rationale: one auth path = one data shape; Google profile gives identity without password management.
- Consequences: the users table needs a google identity reference and stable internal id; no password columns. Session persistence (up to 90 days) is service-layer work in a later milestone.

## D03 - No mood dashboard, ever

- Context: initial student schema included mood_logs and moods on sessions; the design system includes pre/post exercise mood scales.
- Decision: wellbeing metrics are stored raw (distress before/after, helpfulness) but NEVER aggregated into user-facing trend graphs.
- Rationale: confronting vulnerable users with visualised mood trends can increase rumination and distress (see 04-wellbeing-metrics.md).
- Consequences: no aggregation views/endpoints for the UI; research uses the raw records. "Mood" survives only as a journal tag.

## D04 - Exercise metrics are evidence-based

- Context: "track mood before/after" is ambiguous; single-item mood is psychometrically weak.
- Decision: exercise sessions record distress before (0-10), distress after (0-10), helpfulness (0-10, post only), times, duration, tags, optional note.
- Rationale: SUDS-derived momentary distress is the established measure in the PTSD/exposure literature; helpfulness captures intervention response; EMA-style in-app ratings beat retrospective recall (references in 04).
- Consequences: schema columns are distress_before, distress_after, helpfulness. Renaming or adding metric columns requires a decision-log entry.

## D05 - Append-only behavioural records

- Context: multi-device and offline sync were open questions.
- Decision: all behavioural records (sessions, journal entries, check-ins) are append-only inserts with timestamps. No uniqueness constraints on (user, day) or (user, exercise, day). Edits: journal entries editable until end of the next calendar day, then locked; single-entry delete allowed. Last-write-wins for the rare edit conflict.
- Rationale: append-only eliminates merge conflicts entirely; matches the workbook's free-log philosophy; keeps schema offline-ready.
- Consequences: no sessions table or forced single-device logout in MVP (deferred - requires token-invalidation infrastructure and contradicts offline direction). Every user-data table carries created_at/updated_at (S29).

## D06 - Journal and exercise sessions are separate entities

- Context: it was briefly unclear whether completing an exercise created a journal entry.
- Decision: journal entries are independent plain-text notes the user can create at any time. Exercise completion writes to exercise_sessions only.
- Rationale: journaling is voluntary reflection; forcing a journal entry on every exercise would add friction (the app reduces effort, per product direction).
- Consequences: no required session_id FK on journal entries; prompt_id is optional and grounded in workbook reflection questions only.

## D07 - Research profile fields, PII separated

- Context: research export must never leak identity.
- Decision: profiles carry age band, gender, ethnicity (ONS), treatment status (optional), referral source (optional). Identity (email, display name, Google identity) lives separately. Anonymised export excludes all identity columns and free text (journal bodies, notes) by default.
- Rationale: demographic covariates are the research payload; PII is liability. Exact age is PII-adjacent; bands are the norm.
- Consequences: the export query (S27) must be writable without touching PII columns. User-facing export is out of scope; "delete all my data" is supported (S05).

## D08 - Content is public-read; user data is owner-only

- Context: RLS strategy was delegated to the student with an ADR requirement.
- Decision (project lead's position): content tables (chapters, exercises, prompts) are readable without authentication - the workbook PDF and catalogue are supporting material, not private data. ALL user-data tables enforce owner-only RLS.
- Rationale: the PDF must be viewable before sign-in (story S07); user data is the sensitive part.
- Consequences: the student records the final RLS decision in an ADR (templates/ADR.md), including whether content tables get RLS with public policies or no RLS at all, and why.

## D09 - The coaching loop is coaching, not grading

- Context: the student builds the app with an agent; a verdict document would grade the student.
- Decision: the schema-coaching pack is a working protocol: stories + queries + register + Socratic coaching. No scores delivered to the student. The student articulates the gap and approves the fix before the agent implements it.
- Rationale: the internship is a learning project; the register gives the supervisor progress visibility without a grade.
- Consequences: AGENT.md encodes the rules. The register is the meeting artifact.

## D10 - Workbook PDF out of the repository

- Context: the full clinical PDF was committed to a public repository.
- Decision: the PDF is never committed to git; it lives in private Supabase storage; the repo carries metadata and anchors only.
- Rationale: licensing and clinical-content exposure; git history retains deleted files.
- Consequences: story S28; the repository will transfer to the University of Greater Manchester organisation and become private in due course.

## D11 - Agent may implement after articulation and approval

- Context: should the student's agent write schema fixes itself?
- Decision: the agent may implement a fix AFTER the student has articulated the gap in their own words and explicitly approved the approach. This is a standing project rule, not a trial.
- Rationale: the student remains the decision-maker and learns the reasoning; the agent removes mechanical friction.
- Consequences: AGENT.md session protocol includes the articulation gate.
