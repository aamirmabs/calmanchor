import { supabase } from "./supabase";
import { getCurrentUserId } from "./auth";

// ============================================================
// TYPES
// ============================================================
export interface MoodLogInput {
  phase?: string;
  exercise_id?: string | null;
  score?: number;
  note?: string;
}

export interface JournalEntryInput {
  chapter_id?: string | null;
  prompt_id?: string | null;
  body: string;
  mood_after?: number;
}

export interface CheckinInput {
  ns_state?: string;
  survival_response?: string;
  triggers?: string[];
  note?: string;
}

export interface SessionInput {
  exercise_id?: string | null;
  started_at?: Date;
  ended_at?: Date | null;
  duration_minutes?: number;
  mood_before?: number;
  mood_after?: number;
  notes?: string;
}

// ============================================================
// MOOD LOGS
// ============================================================
export async function saveMoodLog(entry: MoodLogInput) {
  const { error } = await supabase.from("mood_logs").insert(entry);
  if (error) throw error;
}

export async function getMoodLogs() {
  const { data, error } = await supabase
    .from("mood_logs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ============================================================
// JOURNAL ENTRIES
// ============================================================
export async function saveJournalEntry(entry: JournalEntryInput) {
  const { error } = await supabase.from("journal_entries").insert(entry);
  if (error) throw error;
}

export async function getJournalEntries() {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*, chapters(title), journal_prompts(prompt_text)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ============================================================
// CHECKINS
// ============================================================
export async function saveCheckin(entry: CheckinInput) {
  const { error } = await supabase.from("checkins").insert(entry);
  if (error) throw error;
}

export async function getCheckins() {
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ============================================================
// SESSIONS
// ============================================================
export async function saveSession(entry: SessionInput) {
  const { error } = await supabase.from("sessions").insert(entry);
  if (error) throw error;
}

export async function getSessions() {
  const { data, error } = await supabase
    .from("sessions")
    .select("*, exercises(title, category)")
    .order("started_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ============================================================
// EXERCISES (public content — no user_id needed)
// ============================================================
export async function getExercisesByCategory(category: string) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("category", category)
    .order("title");
  if (error) throw error;
  return data;
}

export async function getAllExercises() {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("category", { ascending: true })
    .order("title", { ascending: true });
  if (error) throw error;
  return data;
}

// ============================================================
// CHAPTERS (public — navigation anchors)
// ============================================================
export async function getChapters() {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .order("order_index");
  if (error) throw error;
  return data;
}
