# ADR-003 - Row-level security: on all tables, difference in the policy

Status: accepted
Date: 2026-08-30
Author: Amirreza

## Context

The schema had **some tables with RLS and some without**: content tables (`chapters`, `exercises`,
`documents`, …) had no RLS (public read by omission), while user-data tables had owner-only policies.
The project lead flagged this mixed state as fragile: because the danger is deciding *whether* RLS is
on per table, future tables risk being forgotten and silently exposed.

The requirement contract (D08) states content is public-read and user data is owner-only — so the
*intended* split is real, but implementing it as "RLS on some, off on others" is the wrong mechanism.

A second, coupled problem: content tables are seeded once. If RLS is enabled with only a public *read*
policy, the anon key can still read but can **no longer insert** into content tables. The current
`services/seed.ts` uses the anon key, so its content inserts would fail once RLS is on.

## Decision

1. **Enable RLS on every table** — content and user-data alike. The difference between public content
   and private user data is expressed **in the policy**, not in whether RLS is on.
   - Content tables (`chapters`, `exercises`, `checklist_items`, `prompts`, `documents`): policy = public
     read (`for select using (true)`). No public write — inserts require the service role.
   - User-data tables: policy = own rows only (`auth.uid() = user_id`), matching S04.
   - `users`: own rows only (identity is PII).
   - `tags`: system tags (`user_id` null) readable by all; user tags owner-only.
   - Junction tables (`exercise_session_tags`, `journal_entry_tags`): owner resolved via the parent row.
2. **Seed with the service role** — `services/seed.ts` now uses `SUPABASE_SERVICE_ROLE_KEY`
   (server-only, bypasses RLS) instead of the anon key. Content inserts keep working; the key is never
   shipped to the client (`lib/supabase.ts` continues to use the anon key).
3. **Add a `users` table** (`public.users`) that mirrors `auth.users` — the stable identity owner for
   every user-data FK. It carries `id` (PK, FK to `auth.users`), `email`, `display_name`, and
   `google_identity` (unique, for Google sign-in per S02), and **no password columns**. A trigger
   (`handle_new_user`) auto-creates a `users` row on auth signup, and an initial backfill covers existing
   users. This satisfies S02 ("stable internal UUID + Google identity reference") and S27 (research export
   joins `FROM users`), and resolves the earlier split-brain where some tables pointed at `auth.users`
   and others at a would-be parallel table.

## Rationale

- Satisfies D08 (content public-read, user data owner-only) **and** the lead's concern, because RLS is
  uniformly on — the split lives in the policy, so no table can be accidentally left unprotected.
- Satisfies S04 (data isolation) with owner-only policies on every user-data table.
- Service-role seeding is the standard Supabase pattern: RLS stays strict, and the one-time content
  population bypasses it via an elevated server credential that never reaches the app.
- Aligns with the schema-coaching query pack, which queries `users` directly (S02 `google_identity`,
  S27 `FROM users`). The `users` table is the single stable identity owner; Google identity is
  additionally resolvable via Supabase's `auth.identities` (satisfies S02 without a password column).

## Consequences

- **No table can be added without an explicit RLS decision** — good, but requires discipline on future
  tables: every new table must `enable row level security` and get a policy in the same migration.
- The seed must run with the service role key, which is server-only. Documented so the key is never
  placed in `EXPO_PUBLIC_*` or shipped to the client.
- Content tables are effectively read-only to the client (`for select`); any real write to content
  (e.g. future admin edits) must go through the service role or a `SECURITY DEFINER` function.

## Implementation notes

- Applied in the Supabase SQL Editor (not via the `supabase/migrations/` folder, which is deprecated in
  favour of direct SQL editor edits for this stage).
- `services/seed.ts`: `createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)` with
  `autoRefreshToken: false, persistSession: false`.
- `.env` (gitignored) must carry `SUPABASE_SERVICE_ROLE_KEY`. Never use `EXPO_PUBLIC_` for it.
- `lib/supabase.ts` unchanged — still the anon key for the client.
