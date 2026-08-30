/// <reference types="node" />
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================
// 1. CHAPTERS – page anchors only (20 chapters)
// ============================================================
const chaptersData = [
  {
    order_index: 1,
    title: "Introduction & For You",
    page_range: "1–6",
    content_group: "learn",
    colour_token: "neutral",
  },
  {
    order_index: 2,
    title: "The Nervous System & Dysregulation",
    page_range: "9–12",
    content_group: "learn",
    colour_token: "ns",
  },
  {
    order_index: 3,
    title: "The Survival Responses",
    page_range: "13–16",
    content_group: "learn",
    colour_token: "sr",
  },
  {
    order_index: 4,
    title: "Window of Tolerance",
    page_range: "18–21",
    content_group: "learn",
    colour_token: "window",
  },
  {
    order_index: 5,
    title: "Self-Soothing Strategies That Actually Work",
    page_range: "23–32",
    content_group: "practice",
    colour_token: "soothe",
  },
  {
    order_index: 6,
    title: "The Wood, the Fire, and the Water",
    page_range: "37–38",
    content_group: "practice",
    colour_token: "element",
  },
  {
    order_index: 7,
    title: "The Anatomy of Compassion",
    page_range: "40–46",
    content_group: "reflect",
    colour_token: "compass",
  },
  {
    order_index: 8,
    title: "My Inner Child & Me",
    page_range: "48–50",
    content_group: "reframe",
    colour_token: "child",
  },
  {
    order_index: 9,
    title: "The Stuff Your Brain Tells You That Isn’t True",
    page_range: "52–56",
    content_group: "reframe",
    colour_token: "thought",
  },
  {
    order_index: 10,
    title: "Understanding Triggers & Flashbacks",
    page_range: "58–62",
    content_group: "learn",
    colour_token: "trigger",
  },
  {
    order_index: 11,
    title: "Rebuilding Trust in Your Gut After Trauma",
    page_range: "66–68",
    content_group: "reframe",
    colour_token: "intuition",
  },
  {
    order_index: 12,
    title: "Reclaiming Identity After Trauma",
    page_range: "72–78",
    content_group: "reframe",
    colour_token: "identity",
  },
  {
    order_index: 13,
    title: "Attachments, Relationships & Boundaries",
    page_range: "79–80",
    content_group: "relationships",
    colour_token: "attach",
  },
  {
    order_index: 14,
    title: "Thoughts, Feelings, Actions",
    page_range: "82–86",
    content_group: "reframe",
    colour_token: "cbt",
  },
  {
    order_index: 15,
    title: "Who You Think You Are vs. Who You Truly Are",
    page_range: "87–90",
    content_group: "reframe",
    colour_token: "esteem",
  },
  {
    order_index: 16,
    title: "What Helped Me Heal / EMDR",
    page_range: "91–94",
    content_group: "reflect",
    colour_token: "heal",
  },
  {
    order_index: 17,
    title: "Letting Go of the Familiar Pain",
    page_range: "95–97",
    content_group: "reflect",
    colour_token: "release",
  },
  {
    order_index: 18,
    title: "Making Safety Real / Safe Space",
    page_range: "99–101",
    content_group: "practice",
    colour_token: "safe",
  },
  {
    order_index: 19,
    title: "Tools for the Bad Days",
    page_range: "103–113",
    content_group: "crisis",
    colour_token: "crisis",
  },
  {
    order_index: 20,
    title: "Crisis Plan & Final Words",
    page_range: "114–118",
    content_group: "crisis",
    colour_token: "final",
  },
];

// ============================================================
// 2. EXERCISES – only from pages 23–34 and 99–113
//    Six categories (workbook 'Regulation Through …' headings):
//    body, breath, voice, mind, senses, somatic
// ============================================================
const exercisesData = [
  // ---- Pages 23–34 (Self-Soothing) ----
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "body",
    category: "body",
    title: "Hand on Chest & Slow Breath",
    steps: [
      "Place your hand on your heart",
      "Take a slow breath",
      "Feel the warmth and pressure",
      "Communicate to your body: \"I'm here, I'm safe\"",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "breath",
    category: "breath",
    title: "Gentle Inhale & Exhale",
    steps: [
      "Breathe naturally, noticing the in-and-out rhythm without holding or forcing",
      "Imagine your breath as a wave rising and falling – soft, steady, flowing",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "breath",
    category: "breath",
    title: "Counting on the Outbreath",
    steps: [
      "Exhale gently while silently counting to 3 or 4",
      "Focus on the release rather than the inhale",
      "Helps the body feel the letting-go without chest pressure",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "breath",
    category: "breath",
    title: "Breath & Movement Combo",
    steps: [
      "Raise your arms slowly as you inhale",
      "Lower as you exhale",
      "Or rock your body while breathing",
      "Keeps your nervous system engaged and grounded",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "voice",
    category: "voice",
    title: "Humming",
    steps: [
      "Gently hum a lullaby or soft tone for 30 seconds",
      "Feel the vibration soothing the vagus nerve",
    ],
    duration_minutes: 1,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "voice",
    category: "voice",
    title: 'Vagal Toning ("Voo" Sounds)',
    steps: [
      'Make a deep "voo" sound with your mouth in an open O shape',
      "Low frequency activates the parasympathetic nervous system",
    ],
    duration_minutes: 1,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "voice",
    category: "voice",
    title: "Singing Softly",
    steps: [
      "Sing something slow and familiar",
      "Regulates breath, voice, and emotion all at once – helps restore rhythm if your system feels stuck or flat",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "voice",
    category: "voice",
    title: "Reading Aloud in a Soothing Tone",
    steps: [
      "Pick something gentle – poetry, a favourite paragraph, or a calming script",
      "Reading aloud helps slow the mind, regulate breath, and anchor attention",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "ground",
    category: "senses",
    title: "5-4-3-2-1 Grounding",
    steps: [
      "Find 5 things you can see",
      "Find 4 things you can touch",
      "Find 3 things you can hear",
      "Find 2 things you can smell",
      "Find 1 thing you can taste",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "body",
    category: "body",
    title: "Tapping / EFT",
    steps: [
      "Gently tap on acupressure points (side of hand, eyebrow, under the eye)",
      "Name what you are feeling while tapping",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "body",
    category: "body",
    title: "Rocking or Swaying",
    steps: [
      "Gently rock side to side or forward/backward",
      "Mimics the motion babies associate with safety and comfort",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "body",
    category: "body",
    title: "Stretching or Yoga (Cat-Cow / Child's Pose)",
    steps: [
      "Cat-Cow: move the spine with the breath, connecting movement to inhale and exhale",
      "Child's Pose: ground the body and create a sense of protection",
      "These gentle movements help release physical tension",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Butterfly Hug",
    steps: [
      "Cross your arms over your chest, hands on opposite shoulders",
      "Gently tap left-right-left-right",
      "Breathe slowly while doing this",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Self-Holding",
    steps: [
      "Wrap your arms around yourself, OR place one hand on your heart and the other on your belly",
      "Hold gently and breathe",
      "Say internally: \"I'm here. I've got you.\"",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Shake It Out",
    steps: [
      "Stand and shake your arms, legs, hands",
      "Let your body release excess energy",
      "Move how your body wants to",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Pendulation",
    steps: [
      "Notice an area in your body that feels tight",
      "Now find an area that feels neutral",
      "Gently go back and forth in your attention",
      "Teaches your nervous system that distress does not last forever",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Orienting",
    steps: [
      "Gently turn your head to look around the room",
      "Let your eyes land on something interesting or comforting",
      "Name what you see to tell your nervous system: you are safe now",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Tension-Release Sequence",
    steps: [
      "Tense one muscle group at a time (fists, shoulders, legs)",
      "Then slowly release",
      "Notice the contrast",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "somatic",
    category: "somatic",
    title: "Grounding Through Contact",
    steps: [
      "Sit with your feet flat on the floor and press them gently down",
      "Feel the support of the floor, your chair, and the space around you",
      "Say aloud: \"I feel the ground under me. I'm supported.\"",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Smell Something Grounding",
    steps: [
      "Choose a calming scent (lavender, citrus, pine)",
      "Inhale slowly and notice the effect on your body",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Cold Water Immersion",
    steps: [
      "Splash cold water on your face",
      "Or immerse your face in cold water",
      "Or gently rub ice cubes on your wrists/face/neck",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Weighted Blanket",
    steps: [
      "Deep pressure stimulation can lower heart rate and cortisol levels",
      "Use during rest or when trying to down-regulate from stress or shutdown",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Nature Sounds, Brown Noise, or Familiar Low TV",
    steps: [
      "Use consistent, calming background noise to reduce sensory overwhelm",
      "Signals safety to the nervous system, especially when scattered or overstimulated",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Mindful Body Scan",
    steps: [
      "Notice each part of your body in turn, from toes to head, without judgement",
      "Pay attention to sensations, tension, or comfort",
      "This quiet awareness grounds your nervous system",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "senses",
    category: "senses",
    title: "Tactile Objects",
    steps: [
      "A fidget toy or textured material helps focus attention on the senses",
      "Grounds the body in the present and distracts from dysregulation",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "mind",
    category: "mind",
    title: "What's True Right Now?",
    steps: [
      "Use this when thoughts spiral",
      "Ask yourself: what is true in this moment?",
      "Anchor in observable facts, e.g. \"I am safe in this room\", \"I have options\"",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    exercise_type: "journal",
    category: "mind",
    title: "Gentle Journaling: \"What Does This Part of Me Need?\"",
    steps: [
      "Instead of trying to silence discomfort, get curious",
      "Write to or from the part of you that feels afraid, angry, or sad",
      "You might discover needs you hadn't realised were present",
    ],
    duration_minutes: null,
  },
  // ---- Pages 99–113 (Tools for the Bad Days) ----
  {
    chapter_title: "Making Safety Real / Safe Space",
    exercise_type: "senses",
    category: "senses",
    title: "How to Build a Safe Space",
    steps: [
      "Design a real, imagined, or in-between space that feels grounded, soothed, and in control",
      "Visual: what do you see (light, colours, natural elements, familiar objects)?",
      "Touch/sound/scent/taste: pick textures, sounds, scents and tastes that calm you",
      "Emotional tone/body sense: how do you feel here; how does your body respond?",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "breath",
    category: "breath",
    title: "Box Breathing (4-4-4-4)",
    steps: [
      "Inhale for 4 seconds",
      "Hold for 4 seconds",
      "Exhale for 4 seconds",
      "Hold for 4 seconds",
      "Repeat 4–6 times",
    ],
    duration_minutes: 4,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "breath",
    category: "breath",
    title: 'The "Factory Reset"',
    steps: [
      "Inhale deeply through the nose until lungs feel full",
      'Add a second, sharp "catch-up" inhale (sniff/gulp)',
      "Exhale fully through the mouth or nose",
      "Optional: combine with cold water on hands/face/neck",
      "Repeat 2–3 times",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "senses",
    category: "senses",
    title: "Emergency Care Package",
    steps: [
      "Create a basket with items for visual, auditory, tactile, smell, taste, and cognitive regulation",
      'Add a letter from your "okay self" to your "struggling self"',
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "somatic",
    category: "somatic",
    title: "The Balloon Release",
    steps: [
      "Picture your thought as a balloon",
      "Name the feeling clearly",
      "Inflate the balloon with it",
      "Watch it float away",
      'Repeat: "I can let this go, even if just for now"',
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "selfkind",
    category: "mind",
    title: "What Would I Say To A Friend?",
    steps: [
      "When you are being hard on yourself, pause",
      'Ask: "If my friend felt this way, what would I say to them?"',
      "Say that to yourself out loud",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "crisis",
    category: "mind",
    title: "The Distress Tolerance Jar",
    steps: [
      "Fill a jar with coping ideas on slips of paper",
      "Pick one in a moment of crisis",
      "Examples: cold water splash, scream into a pillow, count backwards, smell something strong, pet an animal",
    ],
    duration_minutes: null,
  },
  {
    chapter_title: "Tools for the Bad Days",
    exercise_type: "somatic",
    category: "mind",
    title: "Safe Place Visualisation",
    steps: [
      "Close your eyes and imagine a place where you feel completely safe",
      "Engage all your senses: see, hear, smell, feel",
      "Visit this place whenever you feel overwhelmed",
      "Keep a physical reminder (photo, texture) to recall it",
    ],
    duration_minutes: null,
  },
];

// ============================================================
// 3. JOURNAL PROMPTS – exactly 3 gentle prompts
// ============================================================
const journalPromptsData = [
  {
    chapter_title: "My Inner Child & Me",
    prompt_text:
      "Write a letter to your younger self. Speak with kindness, understanding, and honesty. What would you want them to know? What comfort, reassurance, or wisdom could you offer?",
  },
  {
    chapter_title: "Self-Soothing Strategies That Actually Work",
    prompt_text:
      "What does this part of me need right now? Instead of trying to silence discomfort, get curious. Write to or from the part of you that feels afraid, angry, or sad.",
  },
  {
    chapter_title: "The Anatomy of Compassion",
    prompt_text:
      "If I treated myself like someone I love, what would I say or do right now?",
  },
];

// ============================================================
// 4. SEED FUNCTION – clears and re-inserts
// ============================================================
async function seed() {
  console.log("🌱 Seeding Calm Anchor (revised plan)...");

  // ---- Clear existing data (preserve tables but empty them) ----
  await supabase
    .from("prompts")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase
    .from("exercises")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase
    .from("chapters")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  // checklist_items and checklist_progress are left untouched (empty by default)

  // ---- Insert chapters ----
  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .insert(chaptersData)
    .select("id, title");

  if (chaptersError) {
    console.error("❌ Failed to insert chapters:", chaptersError.message);
    throw chaptersError;
  }

  const chapterMap: Record<string, string> = {};
  for (const ch of chapters) {
    chapterMap[ch.title] = ch.id;
  }
  console.log(`✅ Inserted ${chapters.length} chapters`);

  // ---- Insert exercises ----
  const exercisesToInsert = exercisesData.map((ex) => ({
    chapter_id: chapterMap[ex.chapter_title],
    exercise_type: ex.exercise_type,
    category: ex.category, // <-- new column
    title: ex.title,
    steps: ex.steps,
    duration_minutes: ex.duration_minutes,
  }));

  const { error: exercisesError } = await supabase
    .from("exercises")
    .insert(exercisesToInsert);

  if (exercisesError) {
    console.error("❌ Failed to insert exercises:", exercisesError.message);
    throw exercisesError;
  }
  console.log(`✅ Inserted ${exercisesToInsert.length} exercises`);

  // ---- Insert journal prompts ----
  const promptsToInsert = journalPromptsData.map((p) => ({
    chapter_id: chapterMap[p.chapter_title],
    prompt_text: p.prompt_text,
  }));

  const { error: promptsError } = await supabase
    .from("prompts")
    .insert(promptsToInsert);

  if (promptsError) {
    console.error("❌ Failed to insert journal prompts:", promptsError.message);
    throw promptsError;
  }
  console.log(`✅ Inserted ${promptsToInsert.length} journal prompts`);

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seed script failed:", err);
  process.exit(1);
});
