-- 0002_alignment_journal_prompts.sql
-- Renames journal_prompts -> prompts (contract S23 names the table `prompts`).
-- Aligns journal_entries columns with the contract (S19/S23): no chapter_id, no mood_after.
-- Applied by the student; not yet run (schema is live in Supabase project).

begin;

-- Rename prompts table ---------------------------------------------------------
alter table if exists journal_prompts rename to prompts;
alter table if exists prompt_id_seq rename to prompts_id_seq;  -- handles sequence rename if present

-- Align journal_entries columns with the contract ------------------------------
alter table if exists journal_entries
  drop column if exists mood_after,
  drop column if exists chapter_id;

alter table if exists journal_entries
  add column if not exists updated_at timestamptz default now(),
  alter column body set not null;

-- Prompt FK point at the renamed table ----------------------------------------
-- (journal_entries.prompt_id references prompts(id); name unchanged, table now `prompts`.)

commit;
