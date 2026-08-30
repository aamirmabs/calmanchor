-- ============================================================
-- ROW LEVEL SECURITY — run AFTER schema.sql (drops wipe policies)
-- ============================================================

-- content: public read, no public write
alter table chapters enable row level security;
create policy "public read" on chapters for select using (true);
alter table exercises enable row level security;
create policy "public read" on exercises for select using (true);
alter table checklist_items enable row level security;
create policy "public read" on checklist_items for select using (true);
alter table prompts enable row level security;
create policy "public read" on prompts for select using (true);
alter table documents enable row level security;
create policy "public read" on documents for select using (true);

-- users: own rows only (identity is PII)
alter table users enable row level security;
create policy "users own rows only" on users
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- user-data: own rows only
alter table checkins enable row level security;
create policy "own rows only" on checkins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table journal_entries enable row level security;
create policy "own rows only" on journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table exercise_sessions enable row level security;
create policy "own rows only" on exercise_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table checklist_progress enable row level security;
create policy "own rows only" on checklist_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table crisis_plan enable row level security;
create policy "own rows only" on crisis_plan
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table settings enable row level security;
create policy "own rows only" on settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table profiles enable row level security;
create policy "own rows only" on profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- tags: system tags readable by all, user tags owner-only
alter table tags enable row level security;
create policy "tags read" on tags for select using (user_id is null or auth.uid() = user_id);
-- S16: users may only create their OWN tags; system tags (user_id null)
-- are seeded via service role, which bypasses RLS
create policy "tags write" on tags for insert with check (auth.uid() = user_id);

-- junction tables: owner via parent
alter table exercise_session_tags enable row level security;
create policy "session tags own" on exercise_session_tags
  for all using (auth.uid() = (select s.user_id from exercise_sessions s where s.id = session_id))
  with check (auth.uid() = (select s.user_id from exercise_sessions s where s.id = session_id));
alter table journal_entry_tags enable row level security;
create policy "entry tags own" on journal_entry_tags
  for all using (auth.uid() = (select j.user_id from journal_entries j where j.id = entry_id))
  with check (auth.uid() = (select j.user_id from journal_entries j where j.id = entry_id));
