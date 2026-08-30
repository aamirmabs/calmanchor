import { supabase } from "./supabase";
import { getCurrentUserId } from "./auth";

// ============================================================
// TYPES
// ============================================================
export interface JournalEntryInput {
  prompt_id?: string | null;
  body: string;
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
  distress_before?: number;
  distress_after?: number;
  helpfulness?: number;
  note?: string;
}

export interface ProfileInput {
  age_band?: string;
  gender?: string;
  ethnicity?: string;
  treatment_status?: string;
  referral_source?: string;
}

export interface TagInput {
  name: string;
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
    .select("*, prompts(prompt_text)")
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
// EXERCISE SESSIONS
// ============================================================
export async function saveSession(entry: SessionInput) {
  const { error } = await supabase.from("exercise_sessions").insert(entry);
  if (error) throw error;
}

export async function getSessions() {
  const { data, error } = await supabase
    .from("exercise_sessions")
    .select("*, exercises(title, category)")
    .order("started_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ============================================================
// PROFILE (research fields — separately stored, never identity)
// ============================================================
export async function getCurrentProfile() {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, age_band, gender, ethnicity, treatment_status, referral_source")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function saveProfile(entry: ProfileInput) {
  const userId = await getCurrentUserId();
  const { error } = await supabase
    .from("profiles")
    .upsert({ user_id: userId, ...entry }, { onConflict: "user_id" });
  if (error) throw error;
}

// ============================================================
// TAGS (system tags shared; user tags are private)
// ============================================================
export async function getSystemTags() {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .is("user_id", null)
    .order("name");
  if (error) throw error;
  return data;
}

export async function createUserTag(entry: TagInput) {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("tags")
    .insert({ user_id: userId, name: entry.name })
    .select()
    .single();
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
