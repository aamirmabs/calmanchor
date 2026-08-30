-- 0003_missing_tables.sql
-- Adds the tables the contract requires that were missing: users/profiles (S01-S03),
-- tags + junction tables (S16/S20), and a documents anchor for PDF storage (S07).
-- RLS: owner-only on every user-data table (S04), content-like tables public-read.
-- Applied by the student; not yet run (schema is live in Supabase project).

begin;

-- users -----------------------------------------------------------------------
-- Supabase Auth already owns auth.users. This is our stable internal reference.
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  google_identity text unique,          -- OAuth sub; no password columns (S02)
  created_at timestamptz default now()
);

-- profiles --------------------------------------------------------------------
-- Research fields only, separated from identity (S03, D07). No email/name here.
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  age_band text,                        -- ONS bands, nullable
  gender text,                          -- nullable
  ethnicity text,                       -- ONS categories, nullable
  treatment_status text,                -- optional
  referral_source text,                 -- optional
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- tags ------------------------------------------------------------------------
-- System tags are shared (user_id null). User tags are private (owner-only RLS).
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  user_id uuid references public.users(id) on delete cascade,  -- null = system tag
  created_at timestamptz default now()
);

-- exercise_session_tags --------------------------------------------------------
create table if not exists public.exercise_session_tags (
  session_id uuid not null references public.exercise_sessions(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (session_id, tag_id),
  created_at timestamptz default now()
);

-- journal_entry_tags -----------------------------------------------------------
create table if not exists public.journal_entry_tags (
  entry_id uuid not null references public.journal_entries(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (entry_id, tag_id),
  created_at timestamptz default now()
);

-- documents --------------------------------------------------------------------
-- Metadata anchor for the PDF in private Storage (S07). No PDF bytes here.
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  storage_path text not null,           -- bucket/object path
  bucket text not null,
  created_at timestamptz default now()
);

-- RLS: owner-only on every user-data table (S04) --------------------------------
alter table public.profiles enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'profiles own rows') then
    create policy "profiles own rows" on public.profiles
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

alter table public.tags enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'tags' and policyname = 'tags owner-only') then
    -- owner can manage own tags; system tags (user_id null) are readable by all
    create policy "tags owner-only" on public.tags
      for all using (user_id is null or auth.uid() = user_id)
      with check (user_id is null or auth.uid() = user_id);
  end if;
end $$;

alter table public.exercise_session_tags enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'exercise_session_tags' and policyname = 'session_tags owner-only') then
    create policy "session_tags owner-only" on public.exercise_session_tags
      for all using (auth.uid() = (select s.user_id from public.exercise_sessions s where s.id = session_id))
      with check (auth.uid() = (select s.user_id from public.exercise_sessions s where s.id = session_id));
  end if;
end $$;

commit;
