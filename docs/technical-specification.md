# CalmAnchor — Technical Specification

## Document Information
- **Version:** 1.0
- **Date:** June 2026
- **Status:** Finalised
- **Audience:** Human developers, project supervisors, AI agents, and student interns
- **Project Lead:** Aamir Abbas
- **Project Coordinator:** Anchal Garg
- **Toolkit Author:** Kimberley Hajee
- **Funded by:** Jenkinson Award JA27017

---

## Table of Contents

1. [Project Charter](#1-project-charter)
2. [The Source Material: Toolkit Mapping](#2-the-source-material-toolkit-mapping)
3. [Core Features (The Core 7 + 2)](#3-core-features-the-core-7--2)
4. [User Flows](#4-user-flows)
5. [Technical Architecture](#5-technical-architecture)
6. [Out of Scope & Why](#6-out-of-scope--why)
7. [Appendices](#7-appendices)

---

## 1. Project Charter

### 1.1 What We Are Building

CalmAnchor is a digital companion application for **Complex PTSD (CPTSD) self-management**. It transforms the clinically-reviewed *Bella & Wolf CPTSD Toolkit* (by Kimberley Hajee) into an interactive, accessible web application. The toolkit is a 120-page peer-created workbook covering nervous system regulation, survival responses, and practical grounding exercises. The app does not replace the book — it serves it, making it usable in real-time when the user is dysregulated, overwhelmed, or in crisis.

### 1.2 Why We Are Building It

The toolkit is rich with clinical content, but paper-based workbooks have critical limitations in real-world use:

- **Accessibility during crisis:** When a user is dissociated or panicking, they cannot flip through 118 pages to find the right grounding exercise.
- **Personalisation:** Paper cannot learn which exercises work for the individual.
- **Tracking:** Paper cannot show patterns over time ("I tend to freeze on Sunday evenings").
- **Portability:** Users cannot always carry a physical workbook.

The app solves these problems by making the toolkit **interactive, searchable, and trackable** — while keeping the user's data completely private and local.

### 1.3 Who It Is For

- **Single-user, private application.** No multi-user support, no clinician dashboards, no data sharing.
- **Trauma-informed users:** People who are learning to manage their nervous system, recognise survival responses, and build self-soothing skills.
- **Self-managed:** The app is a companion, not a clinical tool. It does not diagnose, prescribe, or replace therapy.

### 1.4 Guiding Principles

These principles must be respected in every design and development decision:

1. **Trauma-Informed Design:** Every screen, colour, word, and interaction must be designed for a dysregulated nervous system. No pressure, no guilt, no "progress" metrics that shame.
2. **No Clinical Advice:** The app does not diagnose, recommend treatment, or provide medical advice. It is a digital version of a workbook.
3. **No AI / No Machine Learning:** No predictive analytics, no sentiment analysis, no adaptive algorithms. The app is deterministic and user-controlled.
4. **No Physiological Monitoring:** No heart rate, HRV, sleep, or biometric tracking. The app does not turn into a medical device.
5. **Single-User, Private, No Data Sharing:** All data belongs to the user. No cloud sync, no clinician dashboards, no analytics.
6. **Offline-First for Crisis:** The app must function fully offline. A user in crisis may not have internet.
7. **UK English:** All content uses UK spelling (colour, centre, organise, programme).
8. **Source Material is Truth:** Every feature must map directly to a chapter or exercise in the toolkit. The app does not invent content.
9. **User Agency Always:** The user is always in control. No automatic notifications, no "should" statements. Every exercise has a "skip" option.
10. **Simple, Straightforward Data Export:** Export to CSV or Excel only. No complex formats, no proprietary data locks.

### 1.5 The Core 7 + 2

The MVP consists of **7 core features** and **2 supporting features**:

**Core Features:**
1. Interactive Toolkit Browser
2. Private Reflection Diary
3. Self-Soothing Exercise Menu
4. Crisis Grounding Widget
5. Manual Trigger & State Tracker
6. User Portfolio
7. Pattern Dashboard

**Supporting Features:**
8. Onboarding Workflow
9. Simple Data Export (CSV/Excel)

---

## 2. The Source Material: Toolkit Mapping

### 2.1 Toolkit Overview

The *Bella & Wolf CPTSD Toolkit* (120 pages, © 2025) is a peer-created workbook written by Kimberley Hajee. It is clinically informed but not clinical — it is lived experience, written as a compassionate companion. The book covers:

- Nervous system regulation
- Survival responses (fight, flight, freeze, fawn)
- The Window of Tolerance
- Self-soothing strategies (body, breath, voice, mind, senses)
- Somatic therapy exercises
- Trigger and flashback understanding
- Inner child work
- Identity and values exploration
- Crisis planning

### 2.2 Chapter Breakdown

| Chapter                                     | Pages   | Core Content                                          | App Feature                                |
| ------------------------------------------- | ------- | ----------------------------------------------------- | ------------------------------------------ |
| Introduction & Disclaimer                   | 3–7     | Author's story, crisis support contacts               | Onboarding, Crisis Widget                  |
| The Nervous System & Dysregulation          | 8–14    | ANS basics, survival responses, Window of Tolerance   | Onboarding, Exercise Menu, Trigger Tracker |
| The Survival Response                       | 17–22   | Personal survival map, Window of Tolerance visualiser | Exercise Menu, Trigger Tracker             |
| Self-Soothing Strategies That Actually Work | 23–34   | Voice, mind, body, breath, senses exercises           | Self-Soothing Exercise Menu, Crisis Widget |
| From Survival to Self-Kindness              | 35–46   | Self-compassion, inner critic                         | Diary, Portfolio                           |
| The Door to Your Inner Child                | 47–50   | Inner child visualisation, safe space                 | Exercise Menu, Diary                       |
| From Wounds to Words                        | 51–56   | Journaling, narrative work                            | Diary                                      |
| When Thoughts Aren't the Whole Story        | 57–64   | Triggers, flashbacks, central cycle                   | Trigger Tracker, Pattern Dashboard         |
| Beneath the Noise                           | 65–70   | Body signals, intuition                               | Trigger Tracker, Pattern Dashboard         |
| From Inner Signals to Inner Self            | 71–80   | Self-connection, embodiment                           | Exercise Menu, Diary                       |
| From Connection to Cognition                | 81–86   | Mind-body integration                                 | Exercise Menu, Diary                       |
| Who You Think You Are vs Who You Truly Are  | 87–90   | Identity, values, self-esteem                         | Diary, Portfolio                           |
| Finding Support Where You Are               | 91–94   | EMDR, therapy, support                                | Onboarding (informational)                 |
| Letting Go of Familiar Pain                 | 95–98   | Releasing survival patterns                           | Diary, Portfolio                           |
| Making Safety Real                          | 99–101  | Safe space builder, sensory checklist                 | Exercise Menu, Portfolio                   |
| Tools for the Bad Days                      | 103–113 | Crisis grounding, 5-4-3-2-1, box breathing            | Crisis Widget, Exercise Menu               |
| Crisis Plan                                 | 114–115 | Emergency contacts, action plan                       | Crisis Widget, Portfolio                   |
| A Letter to the Tired, Trying You           | 116     | Compassionate closing                                 | Onboarding                                 |

### 2.3 Feature ↔ Chapter Matrix

**Interactive Toolkit Browser:**
- Serves: All chapters
- Provides: PDF viewer with section navigation, bookmarks, exercise tracking

**Private Reflection Diary:**
- Serves: From Wounds to Words (51–56), From Survival to Self-Kindness (35–46), Letting Go of Familiar Pain (95–98)
- Provides: Digital journaling with prompts, state tagging, and private notes

**Self-Soothing Exercise Menu:**
- Serves: Self-Soothing Strategies (23–34), Making Safety Real (99–101), Tools for the Bad Days (103–113)
- Provides: Guided digital versions of exercises, timer, haptic/audio cues

**Crisis Grounding Widget:**
- Serves: Tools for the Bad Days (103–113), Crisis Plan (114–115), Introduction (crisis contacts)
- Provides: One-tap grounding, always accessible, offline

**Manual Trigger & State Tracker:**
- Serves: When Thoughts Aren't the Whole Story (57–64), The Survival Response (17–22)
- Provides: User-initiated logging of triggers, context, and survival responses

**User Portfolio:**
- Serves: Self-Soothing Strategies (23–34), Making Safety Real (99–101), Crisis Plan (114–115)
- Provides: Personalised collection of favourite exercises, strategies, and safe space

**Pattern Dashboard:**
- Serves: When Thoughts Aren't the Whole Story (57–64), The Survival Response (17–22)
- Provides: Visual charts of trigger frequency, exercise effectiveness, and state patterns

---

## 3. Core Features (The Core 7 + 2)

### 3.1 Feature 1: Interactive Toolkit Browser

#### Purpose & Why
The toolkit is 120 pages. When a user wants to find a specific exercise or re-read a chapter, they need to be able to navigate quickly without scrolling through the entire document. The browser makes the book digitally searchable and navigable.

#### What It Does
- Embeds the full toolkit PDF in the application
- Provides a chapter-level navigation sidebar
- Allows users to bookmark specific pages or exercises
- Tracks which sections the user has viewed (optional, user-controlled)
- Includes a search function for finding keywords (e.g., "box breathing")
- Remembers the last-read position

#### Toolkit Mapping
- All chapters (pages 3–118)
- Specifically: Self-Soothing Strategies (23–34), Tools for the Bad Days (103–113), Crisis Plan (114–115)

#### User Flow
1. User opens the Toolkit Browser
2. Sidebar shows all chapters (expandable sections)
3. User clicks a chapter → PDF viewer jumps to that page
4. User can bookmark the page or mark it as "visited"
5. Search bar allows keyword search across the PDF

#### Logic & Rules
- PDF is stored locally (offline-first)
- Bookmarks are user-managed, not automatic
- "Visited" tracking is optional and can be turned off in Settings
- No pressure to complete sections — no progress bars, no completion percentages

#### Data & Privacy
- PDF is bundled with the app or downloaded once on first use
- Bookmarks and visited state stored locally
- No analytics on which pages are read most

#### UI/UX Notes
- Use the design system colours (trauma-informed palette — warm, grounding tones)
- Navigation sidebar should be collapsible to maximise reading space
- Font size adjustable for accessibility
- High contrast mode available

---

### 3.2 Feature 2: Private Reflection Diary

#### Purpose & Why
The toolkit repeatedly asks users to reflect, journal, and write to their inner child. The diary provides a safe, private, digital space for these reflections. It is not a "daily journal" — it is a trauma-informed space for processing, with gentle prompts and no pressure to write every day.

#### What It Does
- Provides three core prompts (from the toolkit): "What happened?", "What did I do?", "How does it feel now?"
- Allows free-form text entries alongside the prompts
- Tags each entry with the user's current nervous system state (optional): Fight, Flight, Freeze, Fawn, or Regulated
- Shows a chronological list of entries (private, never shared)
- Entries are editable and deletable

#### Toolkit Mapping
- From Wounds to Words (51–56): Journaling prompts
- From Survival to Self-Kindness (35–46): Self-compassion reflections
- The Door to Your Inner Child (47–50): Writing to the inner child
- Letting Go of Familiar Pain (95–98): Reflections on releasing patterns

#### User Flow
1. User opens the Diary
2. Optional: Select current nervous system state (or skip)
3. User sees the three prompts and free-form text area
4. User writes as much or as little as they want
5. User saves the entry
6. Entry appears in the chronological list
7. User can edit or delete any entry at any time

#### Logic & Rules
- No mandatory fields — all prompts are optional
- No "daily streak" or "you haven't written in X days" messaging
- No word count goals
- State tagging is optional but encouraged for pattern tracking
- Entries are encrypted at rest if possible (or at minimum stored locally)

#### Data & Privacy
- All entries stored locally on the user's device
- No cloud sync, no backup to external servers
- Exportable as CSV/Excel via the Export feature
- User can delete all diary data at any time

#### UI/UX Notes
- Calm, non-clinical language ("Reflections" not "Journal Entries")
- Soft, muted background
- Large text area with comfortable padding
- "Take your time" or "You can come back to this" microcopy
- No timestamps on the entry list (to reduce pressure — or show date only, not time)

---

### 3.3 Feature 3: Self-Soothing Exercise Menu

#### Purpose & Why
The toolkit contains dozens of self-soothing exercises across five categories (voice, mind, body, breath, senses) and somatic therapy techniques. The Exercise Menu digitises these into guided, interactive experiences that users can access in seconds, not minutes. The goal is: when the user needs to regulate, they can find the right tool instantly.

#### What It Does
- Organises exercises into five categories: Body, Breath, Voice, Mind, Senses
- Each exercise includes: description, instructions, duration, and a "How This Helps" explanation
- Some exercises include guided timers (e.g., box breathing with a visual countdown)
- Some exercises include audio cues (e.g., humming guidance, gentle prompts)
- Users can mark exercises as "favourite" to add to their Portfolio
- Users can rate effectiveness after completing an exercise ("Did this help?" — Yes / Somewhat / No)

#### Toolkit Mapping
- Self-Soothing Strategies That Actually Work (23–34):
  - Regulation Through Voice: Humming, Vagal Toning, Singing, Reading Aloud (p. 25)
  - Regulation Through Mind: 5-4-3-2-1 Grounding, "What's True Right Now?", Gentle Journaling (p. 26)
  - Regulation Through Body: Tapping, Rocking, Stretching, Hand on Chest (p. 27)
  - Regulation Through Breath: Gentle Inhale & Exhale, Counting on Outbreath, Humming on Exhale (p. 28)
  - Regulation Through Senses: Smell, Weighted Blanket, Nature Sounds, Cold Water, Tactile Objects (p. 29)
- Somatic Therapy (p. 30–31): Orienting, Tension-Release, Butterfly Hug, Self-Holding, Grounding Through Contact, Shake It Out, Pendulation
- Making Safety Real (p. 99–101): Safe Space Visualisation
- Tools for the Bad Days (p. 103–113): 5-4-3-2-1 Grounding, Box Breathing

#### User Flow
1. User opens the Exercise Menu
2. Sees five category cards (Body, Breath, Voice, Mind, Senses) + Somatic Therapy
3. User selects a category → sees list of exercises
4. User selects an exercise → sees description and instructions
5. User taps "Start" → enters guided mode (timer, audio, visual cues as appropriate)
6. After exercise, user is asked: "Did this help?" (optional rating)
7. User can tap "Add to Portfolio" to save for quick access

#### Logic & Rules
- All exercises are optional — no mandatory completion
- Timer can be paused or skipped
- Audio cues are optional and can be muted
- Each exercise has a "What to expect" note so the user knows what they are about to do
- Exercises that involve movement or sound include a "Private / Public" note (e.g., "This exercise involves humming — you may want to be somewhere private")

#### Data & Privacy
- Exercise ratings stored locally
- Portfolio saved locally
- No analytics on which exercises are used most

#### UI/UX Notes
- Category cards use the design system colour palette
- Each exercise has a calm, descriptive icon (not clinical or cartoonish)
- Guided mode uses minimal text, maximum visual/audio support
- Timer uses a gentle circle animation (not a harsh countdown)
- "Add to Portfolio" button is prominent but not pushy

---

### 3.4 Feature 4: Crisis Grounding Widget

#### Purpose & Why
When a user is dysregulated, they need help in seconds, not minutes. The Crisis Widget is a persistent, one-tap feature that bypasses all navigation and launches grounding exercises immediately. It is designed for the moment when the user cannot think clearly, cannot navigate menus, and just needs to be grounded.

#### What It Does
- Always accessible from the app's main screen and via a persistent button
- Launches one of three crisis tools:
  1. **5-4-3-2-1 Grounding** — Guided sensory grounding with a timer and visual checklist
  2. **Box Breathing** — Visual breathing guide (4-4-4-4) with a gentle animation
  3. **Quick Reset** — A pre-loaded combination of the user's top-rated exercises from their Portfolio
- Includes a "Crisis Contacts" panel (Samaritans, Shout, NHS) — always visible but not intrusive
- Works completely offline

#### Toolkit Mapping
- Tools for the Bad Days (p. 103–113): 5-4-3-2-1 Grounding, Box Breathing
- Crisis Plan (p. 114–115): Emergency contacts, action plan
- Introduction (p. 3–7): Crisis support contacts (Samaritans, Shout, Mind)
- The Window of Tolerance (p. 18–19): Quick reset techniques

#### User Flow
1. User taps the Crisis Widget (or opens the app during crisis)
2. Screen immediately shows three options: Ground, Breathe, My Quick Reset
3. User selects one → enters full-screen guided mode
4. Guided mode is minimal, high-contrast, and distraction-free
5. After exercise, user can rate effectiveness or return to the app
6. Crisis contacts are always visible at the bottom of the screen

#### Logic & Rules
- The Crisis Widget is **never** hidden. It is always one tap away.
- The widget does not require login or setup.
- It works offline.
- No "log in to access crisis support" — ever.
- The "My Quick Reset" option pulls from the user's highest-rated exercises in their Portfolio.
- If the user has no Portfolio, "My Quick Reset" shows a default set: 5-4-3-2-1, Box Breathing, Hand on Chest.

#### Data & Privacy
- Crisis usage is not logged or tracked. No analytics.
- The app does not notify anyone when the user accesses crisis support.
- Crisis contacts are static text (no auto-dial to prevent accidental calls).

#### UI/UX Notes
- High-contrast, large buttons
- Minimal text, maximum visual support
- Gentle, calming animation (not clinical or robotic)
- No "Are you sure?" confirmation dialogs — every tap is immediate
- No ads, no pop-ups, no distractions in crisis mode

---

### 3.5 Feature 5: Manual Trigger & State Tracker

#### Purpose & Why
The toolkit asks users to understand their triggers, survival responses, and the "central cycle" (trigger → response → flashback → disconnection → shame → grounding → reconnection). The Trigger Tracker helps users log this information manually, building self-awareness over time. This is **not** automatic detection — it is user-initiated logging, which is safe, empowering, and trauma-informed.

#### What It Does
- Provides a simple form for logging a trigger event:
  - **What happened?** (free text, optional)
  - **When did it happen?** (date and time, auto-filled, editable)
  - **Where were you?** (free text, optional — e.g., "at work", "in bed")
  - **What was your environment?** (free text, optional — e.g., "loud noise", "argument")
  - **What was your survival response?** (select one: Fight, Flight, Freeze, Fawn, or "I'm not sure")
  - **Intensity:** (Low, Medium, High)
  - **What helped?** (select from Portfolio or free text)
- Shows a chronological list of logged triggers
- Allows editing and deletion

#### Toolkit Mapping
- When Thoughts Aren't the Whole Story (p. 57–64): Triggers, flashbacks, central cycle
- The Survival Response (p. 17–22): Survival responses, Window of Tolerance
- The Nervous System & Dysregulation (p. 8–14): Fight, Flight, Freeze, Fawn

#### User Flow
1. User opens the Trigger Tracker
2. Taps "Log a Trigger" (or uses the quick-access button from Home)
3. Fills in the form (all fields optional)
4. Selects survival response and intensity
5. Saves the entry
6. Entry appears in the chronological list
7. User can edit or delete any entry

#### Logic & Rules
- All fields are optional — the user can log as little or as much as they want
- No "daily log" pressure — log when you want to, not when the app tells you to
- Time and date are auto-filled but editable
- Survival response is selected from the four toolkit categories (plus "I'm not sure")
- Intensity is a simple 3-level scale (Low, Medium, High)
- "What helped?" links to the Portfolio for quick selection

#### Data & Privacy
- All entries stored locally
- No cloud sync, no external sharing
- Exportable via the Export feature
- User can delete all trigger data at any time

#### UI/UX Notes
- Form is simple, not overwhelming — one field at a time if possible
- Large, clear buttons for survival response selection
- No red or alarming colours — the form should feel neutral, not clinical
- "You don't have to log everything" microcopy
- Optional: "This is just for you — no one else sees this"

---

### 3.6 Feature 6: User Portfolio

#### Purpose & Why
The toolkit has dozens of exercises, but each user will find that only a handful work for them. The Portfolio allows users to build their own personalised toolkit — a collection of their favourite exercises, strategies, and safe space notes. This is their "go-to" list for quick access during difficult moments.

#### What It Does
- Users can "star" or "favourite" exercises from the Exercise Menu
- Users can add notes to each favourited exercise (e.g., "This helps me at work", "Do this before bed")
- Users can add custom entries (e.g., "Call my sister", "Walk the dog", "Make tea")
- Users can create custom categories (e.g., "Work", "Bedtime", "Crisis", "Morning")
- The Portfolio is the source for the "My Quick Reset" in the Crisis Widget
- Users can reorder items by priority

#### Toolkit Mapping
- Self-Soothing Strategies (p. 23–34): Users build their own menu from the book's strategies
- Making Safety Real (p. 99–101): Safe space notes, sensory preferences
- Crisis Plan (p. 114–115): User's personalised action plan
- Tools for the Bad Days (p. 103–113): User's preferred crisis tools

#### User Flow
1. User completes an exercise in the Exercise Menu
2. Taps "Add to Portfolio" (or stars it)
3. User can add a personal note and assign to a category
4. User opens Portfolio → sees all saved items
5. User can reorder, edit, or delete items
6. Crisis Widget pulls from the top-rated items for "My Quick Reset"

#### Logic & Rules
- Portfolio items are user-managed — the app does not auto-add anything
- Custom entries are free text — the user can add anything that helps them
- Categories are user-created — the app provides defaults ("Crisis", "Daily", "Work", "Sleep") but the user can rename or add more
- The top 3 items in the Portfolio are used for "My Quick Reset" in the Crisis Widget
- If the user has fewer than 3 items, the default exercises (5-4-3-2-1, Box Breathing, Hand on Chest) fill the gaps

#### Data & Privacy
- Portfolio stored locally
- No external sharing
- Exportable via the Export feature

#### UI/UX Notes
- Portfolio is designed like a "comfort box" — warm, personal, not clinical
- Each item shows the exercise name, a small icon, and the user's note
- Drag-and-drop reordering (or simple up/down arrows)
- "This is your personal toolkit — no one else sees this" microcopy

---

### 3.7 Feature 7: Pattern Dashboard

#### Purpose & Why
The toolkit encourages self-awareness and understanding of one's nervous system. The Pattern Dashboard provides gentle, visual insights from the user's manual logs — helping them see patterns like "I tend to freeze on Sunday evenings" or "Box breathing helps me 80% of the time." This is **not** predictive AI — it is simple, descriptive statistics from the user's own data.

#### What It Does
- Shows four simple charts:
  1. **Trigger Frequency** — How often triggers are logged over time (bar chart, weekly or monthly)
  2. **Survival Response Distribution** — Pie chart showing how often each response (Fight, Flight, Freeze, Fawn) is logged
  3. **Exercise Effectiveness** — Bar chart showing which exercises have the highest "Yes, this helped" ratings
  4. **Time-of-Day Patterns** — Heat map or bar chart showing when triggers are most commonly logged
- All data is from the user's manual logs only — no automatic detection, no external data
- Time range is selectable (last 7 days, 30 days, 90 days, all time)
- "No data" state is friendly and non-judgmental ("You haven't logged any triggers yet — that's okay. When you do, they'll show up here.")

#### Toolkit Mapping
- When Thoughts Aren't the Whole Story (p. 57–64): Understanding triggers and patterns
- The Survival Response (p. 17–22): Mapping your nervous system states
- The Window of Tolerance (p. 18–19): Expanding your window through awareness

#### User Flow
1. User opens the Dashboard
2. Sees four chart sections
3. Can tap each chart to expand or see more detail
4. Can select time range from a dropdown
5. Can tap "Export" to download the underlying data

#### Logic & Rules
- Dashboard only shows data from manual user logs — no automatic data collection
- No "alerts" or "warnings" — the dashboard is purely descriptive, not diagnostic
- No trends are framed as "good" or "bad" — language is neutral (e.g., "You logged Freeze 5 times this week" not "You froze too often")
- If the user has no data, the dashboard shows a calm, encouraging message
- Charts are simple and clear — no complex statistical terms

#### Data & Privacy
- All data is from local storage only
- No external analytics, no tracking
- Exportable via the Export feature

#### UI/UX Notes
- Charts use soft, calming colours from the design system
- No red or alarming colours for "high" values
- Labels are simple: "Fight", "Flight", "Freeze", "Fawn" — not clinical terms
- "This is your data, your patterns" messaging
- "Take what helps, leave what doesn't" — the user can ignore the dashboard if they don't find it useful

---

### 3.8 Feature 8: Onboarding Workflow

#### Purpose & Why
The toolkit is a 120-page book. The app is a digital companion. The Onboarding Workflow gently introduces the user to both — explaining how the app supports the book, and guiding them to their first exercise. It is not a tutorial or a "how to use the app" — it is a warm, welcoming introduction that acknowledges the user's nervous system and gives them control.

#### What It Does
- **Step 1: Welcome** — A warm message: "This is CalmAnchor. It's a companion to the toolkit. It doesn't replace the book — it makes it easier to use."
- **Step 2: How It Works** — Brief explanation of the three main areas: Toolkit, Exercises, and Reflections. No pressure to use all of them.
- **Step 3: The Nervous System (Optional)** — A simple, interactive explanation of the Window of Tolerance and the four survival responses. The user can skip this if they already know it.
- **Step 4: Your First Exercise** — Gentle suggestion: "Would you like to try a quick exercise?" (5-4-3-2-1 or Box Breathing). The user can skip.
- **Step 5: Your Portfolio** — Brief explanation: "You can save your favourite exercises here, so you can find them quickly."
- **Step 6: Crisis Support** — "If you need help right now, the Crisis Widget is always here." Shows the Crisis Widget and explains it.
- **Step 7: You're Ready** — "Take your time. There's no pressure to do everything. Come back when you're ready."

#### Toolkit Mapping
- Introduction (p. 3–7): The tone, the crisis contacts, the author's message
- The Nervous System & Dysregulation (p. 8–14): The Window of Tolerance, survival responses
- Tools for the Bad Days (p. 103–113): The grounding exercises

#### User Flow
1. User opens the app for the first time
2. Sees the welcome screen — warm, non-clinical language
3. Swipes or taps through each step (can skip any step, can exit at any time)
4. Each step is 1–2 sentences, not a wall of text
5. Final step: "You're ready" with a button to start using the app
6. Onboarding can be revisited from Settings at any time

#### Logic & Rules
- Every step is skippable — the user can exit onboarding at any time
- Onboarding does not require login, registration, or personal data
- No "daily reminder" setup — the app does not push notifications
- The Window of Tolerance step is interactive (a simple visual slider showing the zone) but not a quiz
- No "test" or "assessment" — onboarding is informational, not evaluative

#### Data & Privacy
- No data collected during onboarding
- No registration, no email, no phone number
- User can use the app anonymously

#### UI/UX Notes
- Each step is a full-screen, calm, uncluttered screen
- Use the design system warm colours (not bright, not clinical)
- Large, clear "Next" and "Skip" buttons
- No progress bar (avoids "you're X% done" pressure)
- Soft animations between steps (gentle fade, not slides)

---

### 3.9 Feature 9: Simple Data Export

#### Purpose & Why
The user's data belongs to them. The Export feature allows them to take their diary entries, trigger logs, and exercise ratings out of the app at any time. This is simple, transparent, and trauma-informed — it gives the user control over their own information.

#### What It Does
- Provides two export options:
  1. **Diary Entries** — Exported as CSV or Excel with columns: Date, State, Prompt 1, Prompt 2, Prompt 3, Free Text
  2. **Trigger Logs** — Exported as CSV or Excel with columns: Date, Time, What Happened, Where, Environment, Survival Response, Intensity, What Helped
  3. **Portfolio** — Exported as CSV or Excel with columns: Exercise Name, Category, User Note, Rating
- Export is initiated by the user — no automatic backups
- Files are saved to the user's device (Downloads folder)
- No external cloud, no email sending, no server upload

#### Toolkit Mapping
- All chapters — the export is a data feature, not a content feature

#### User Flow
1. User opens Settings
2. Taps "Export My Data"
3. Selects which data to export (Diary, Triggers, Portfolio, or All)
4. Selects format: CSV or Excel
5. Taps "Export" → file is saved to device
6. User receives a confirmation message

#### Logic & Rules
- Export is user-initiated only — no automatic or scheduled exports
- No cloud upload, no external server — the file is generated locally and saved locally
- Data is exported in plain text (not encrypted) — the user can open it in any spreadsheet
- No password protection on the exported file — the user manages their own security

#### Data & Privacy
- Export is purely local — no network request
- The app does not retain a copy of the exported file
- User can delete the app data after exporting if they wish

#### UI/UX Notes
- Clear explanation: "Your data will be saved to your device as a file. No one else can see it."
- Simple checkboxes for selecting what to export
- "Download" button is large and clear
- No complex export settings (no date range, no filters — export everything)

---

## 4. User Flows

### 4.1 Onboarding Flow

```
[App Opened for First Time]
    ↓
[Welcome Screen]
    ↓ (User can skip entire onboarding)
[How It Works]
    ↓ (User can skip)
[The Nervous System (Optional)]
    ↓ (User can skip)
[Your First Exercise (Optional)]
    ↓ (User can skip)
[Your Portfolio (Optional)]
    ↓ (User can skip)
[Crisis Support]
    ↓ (User can skip)
[You're Ready]
    ↓
[Main App Screen]
```

### 4.2 Daily Use Flow

```
[User Opens App]
    ↓
[Main Screen]
    ↓ (User selects one of:)
[Toolkit Browser] ← User reads a chapter or finds an exercise
[Exercise Menu] ← User does a guided exercise
[Diary] ← User writes a reflection
[Trigger Tracker] ← User logs a trigger
[Portfolio] ← User reviews their favourite tools
[Dashboard] ← User reviews their patterns
```

### 4.3 Crisis Flow

```
[User is Dysregulated / Opens App in Crisis]
    ↓
[User Taps Crisis Widget (or opens app directly to Crisis mode)]
    ↓
[Select: Ground / Breathe / My Quick Reset]
    ↓
[Full-Screen Guided Exercise]
    ↓
[Optional: Rate Effectiveness]
    ↓
[Return to Main Screen]
```

### 4.4 Pattern Review Flow

```
[User Opens App]
    ↓
[User Navigates to Dashboard]
    ↓
[User Reviews Charts]
    ↓ (User can:)
[Select Time Range] ← 7 days, 30 days, 90 days, all time
[Export Data] ← Export to CSV/Excel
```

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer              | Technology                       | Rationale                                                                           |
| ------------------ | -------------------------------- | ----------------------------------------------------------------------------------- |
| **Frontend**       | Next.js (React), TypeScript      | Modern, well-supported, good for PWAs, excellent for single-page apps               |
| **Styling**        | Tailwind CSS                     | Matches the existing design system (HTML/CSS/JS), consistent utility-first approach |
| **Database**       | PostgreSQL (via Supabase)        | Relational, robust, good for structured data (diary entries, triggers, etc.)        |
| **Authentication** | Supabase Auth (or similar)       | Simple, secure, easy to integrate. Note: Single-user only                           |
| **Storage**        | Local-first (IndexedDB / SQLite) | Offline-first, no external dependency for crisis moments                            |
| **PDF Viewer**     | PDF.js or similar                | Open-source, embeddable, works offline with bundled PDF                             |
| **Export**         | Client-side CSV/Excel generation | No server processing, no external API                                               |
| **Hosting**        | Vercel / Static hosting          | Simple, fast, cost-effective for static/PWA apps                                    |
| **Mobile**         | PWA (Progressive Web App)        | Cross-platform (iOS, Android), installable, offline-capable                         |

### 5.2 Data Model (Simplified)

```
User (single user, no multi-user)
├── id: UUID
├── created_at: timestamp
└── settings: JSON (theme, font_size, etc.)

DiaryEntry
├── id: UUID
├── user_id: UUID
├── created_at: timestamp
├── updated_at: timestamp
├── nervous_system_state: ENUM (fight, flight, freeze, fawn, regulated, null)
├── prompt_1: TEXT (What happened?)
├── prompt_2: TEXT (What did I do?)
├── prompt_3: TEXT (How does it feel now?)
└── free_text: TEXT

TriggerLog
├── id: UUID
├── user_id: UUID
├── created_at: timestamp
├── updated_at: timestamp
├── what_happened: TEXT
├── where: TEXT
├── environment: TEXT
├── survival_response: ENUM (fight, flight, freeze, fawn, not_sure)
├── intensity: ENUM (low, medium, high)
└── what_helped: TEXT

ExerciseRating
├── id: UUID
├── user_id: UUID
├── exercise_id: STRING
├── created_at: timestamp
├── rating: ENUM (yes, somewhat, no)
└── note: TEXT

PortfolioItem
├── id: UUID
├── user_id: UUID
├── type: ENUM (exercise, custom)
├── exercise_id: STRING (nullable)
├── custom_name: TEXT (nullable)
├── custom_note: TEXT
├── category: STRING
├── order: INTEGER
└── created_at: timestamp

AppSettings
├── theme: ENUM (light, dark, auto)
├── font_size: ENUM (small, medium, large)
├── crisis_widget_position: ENUM (bottom_right, bottom_left)
├── onboarding_completed: BOOLEAN
└── data_retention: ENUM (forever, 30_days, 90_days, 1_year)
```

### 5.3 Privacy & Security

- **Local-First Architecture:** All data is stored in the browser (IndexedDB/SQLite) first. Supabase is used for backup/sync only if the user explicitly opts in.
- **No External Analytics:** No Google Analytics, no Mixpanel, no telemetry.
- **No Third-Party Data Sharing:** No data is shared with clinicians, researchers, or any external party.
- **Data Retention:** User can set data retention (e.g., auto-delete after 1 year) or keep forever.
- **Encryption:** Data at rest is encrypted using the browser's built-in encryption (if possible) or at minimum protected by device-level security.
- **Export & Delete:** User can export all data and delete all app data at any time.

### 5.4 Offline Strategy

- **Bundled PDF:** The toolkit PDF is bundled with the app or downloaded once on first use. It is cached for offline use.
- **Offline Exercises:** All exercise content, timers, and audio cues are bundled and work offline.
- **Offline Diary:** Users can write diary entries offline. They are synced when the connection returns (if sync is enabled).
- **Offline Trigger Tracker:** Users can log triggers offline.
- **Offline Crisis Widget:** The Crisis Widget is fully functional offline — this is the highest priority.

---

## 6. Out of Scope & Why

The following features were considered but explicitly rejected for the MVP. They are documented here so that future developers or agents understand the rationale.

### 6.1 AI / Machine Learning

**What was proposed:**
- Real-time dysregulation detection using AI
- Predictive symptom tracking
- Adaptive sequencing (AI deciding which therapy phase the user is in)
- NLP sentiment analysis via text/speech
- Context-aware algorithms (environment mapping)
- Multimodal analysis with machine learning

**Why rejected:**
- **Clinical risk:** AI making decisions about a user's mental state is dangerous without medical oversight.
- **Regulatory complexity:** AI-powered mental health apps face strict FDA/CE regulations.
- **Trauma-inappropriateness:** Predictive algorithms can feel invasive and controlling — exactly the opposite of what a trauma-informed app should do.
- **User agency:** The user must always be in control of their own data and their own healing process. AI removes agency.
- **MVP scope:** These are research-level features, not MVP features.

### 6.2 Physiological Monitoring

**What was proposed:**
- Heart rate variability (HRV) tracking
- Vagal efficiency monitoring
- Sleep stage tracking (REM/deep/light)
- Electrodermal activity (EDA)
- Respiratory rate monitoring
- Weighted coherence tracking
- Nocturnal arousal detection

**Why rejected:**
- **Medical device classification:** These features would classify the app as a medical device, requiring FDA/CE approval.
- **Hardware dependency:** Requires wearable devices (Apple Watch, Garmin, Oura Ring) — not all users have these.
- **Accuracy concerns:** Consumer-grade wearables are not accurate enough for clinical-grade monitoring.
- **False positives:** Inaccurate data could cause distress or false reassurance.
- **MVP scope:** These are advanced biofeedback features, not MVP.

### 6.3 Sleep & Self-Reported Metrics

**What was proposed:**
- Sleep duration and quality tracking
- Self-reported mood metrics
- Energy level tracking
- Daily check-ins

**Why rejected:**
- **Scope creep:** Sleep tracking adds a whole new domain (sleep science) that is not core to the toolkit.
- **User burden:** Daily check-ins can become burdensome and guilt-inducing ("I didn't log my sleep again").
- **Not in the toolkit:** The toolkit does not focus on sleep tracking — it focuses on nervous system regulation and grounding.
- **MVP scope:** The app is about the toolkit, not about general wellness tracking.

### 6.4 Gamification

**What was proposed:**
- Badges for completing exercises
- Points for logging triggers
- Streaks for daily use
- Leaderboards or social sharing

**Why rejected:**
- **Trauma-inappropriateness:** Gamification can feel infantilising and patronising.
- **Guilt-inducing:** Streaks and badges create pressure ("I missed a day, I failed").
- **Not in the toolkit:** The toolkit is compassionate, not competitive. Healing is not a game.
- **User agency:** The user should not be "rewarded" for doing trauma work — they should be supported.

### 6.5 Multi-User / Social Features

**What was proposed:**
- Clinician dashboards
- Data sharing with therapists
- Peer support groups
- Social sharing of progress

**Why rejected:**
- **Privacy first:** The app is explicitly single-user. The user's data is their own.
- **Scope:** Adding multi-user features requires authentication, authorisation, data sharing agreements, and GDPR compliance far beyond the MVP.
- **Not in the toolkit:** The toolkit is a private, individual workbook.
- **Clinical risk:** Sharing data with clinicians requires medical-grade security and compliance.

---

## 7. Appendices

### Appendix A: Glossary

| Term                                     | Definition                                                                                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CPTSD**                                | Complex Post-Traumatic Stress Disorder — a condition resulting from prolonged, repeated trauma, often in childhood or in interpersonal relationships.                   |
| **ANS**                                  | Autonomic Nervous System — the part of the nervous system that controls automatic bodily functions like heart rate, breathing, and digestion.                           |
| **Sympathetic Nervous System (SNS)**     | The "gas pedal" of the ANS. Activates fight, flight, or freeze responses when the brain detects a threat.                                                               |
| **Parasympathetic Nervous System (PNS)** | The "brake pedal" of the ANS. Promotes rest, digestion, and recovery after the threat has passed.                                                                       |
| **Fight Response**                       | A survival response where the body prepares to confront a threat. May show as anger, defensiveness, or tension.                                                         |
| **Flight Response**                      | A survival response where the body prepares to escape. May show as anxiety, restlessness, or avoidance.                                                                 |
| **Freeze Response**                      | A survival response where the body immobilises. May show as numbness, dissociation, or inability to move/speak.                                                         |
| **Fawn Response**                        | A survival response where the body attempts to appease the threat. May show as people-pleasing, boundarylessness, or compliance.                                        |
| **Window of Tolerance**                  | The zone where the nervous system is regulated — calm, alert, present, able to think clearly and feel emotions without being overwhelmed.                               |
| **Hyperarousal**                         | Being above the Window of Tolerance — fight, flight, or fawn states. Characterised by anxiety, anger, restlessness, or overwhelm.                                       |
| **Hypoarousal**                          | Being below the Window of Tolerance — freeze or shutdown states. Characterised by numbness, disconnection, or exhaustion.                                               |
| **Somatic Therapy**                      | A body-based approach to healing that focuses on physical sensations, movement, and nervous system regulation.                                                          |
| **Grounding**                            | Techniques that bring awareness back to the present moment, often using the five senses.                                                                                |
| **Dissociation**                         | A disconnection from the present moment, thoughts, feelings, or body. Common in trauma survivors.                                                                       |
| **Trigger**                              | A stimulus (internal or external) that reminds the nervous system of past trauma, activating a survival response.                                                       |
| **Flashback**                            | An intense re-experiencing of past trauma. Can be visual, emotional, somatic, or dissociative.                                                                          |
| **Vagus Nerve**                          | A major nerve that connects the brain to the body and plays a key role in the parasympathetic nervous system. Stimulation (e.g., humming, cold water) can promote calm. |
| **Inner Child**                          | A psychological concept representing the child-like part of the self that may hold unmet needs from childhood.                                                          |
| **EMDR**                                 | Eye Movement Desensitisation and Reprocessing — a therapy for trauma that involves bilateral stimulation (e.g., eye movements) while processing traumatic memories.     |
| **PWA**                                  | Progressive Web App — a web application that can be installed on a device and works offline.                                                                            |
| **HRV**                                  | Heart Rate Variability — the variation in time between heartbeats. (Note: Not used in this app.)                                                                        |
| **EDA**                                  | Electrodermal Activity — a measure of skin conductance, often used as a stress indicator. (Note: Not used in this app.)                                                 |

### Appendix B: UK Crisis Support Contacts

These contacts are hardcoded into the app and displayed in the Crisis Widget:

| Service                | Contact               | Hours            |
| ---------------------- | --------------------- | ---------------- |
| **Samaritans**         | 116 123               | 24/7             |
| **Shout (Textline)**   | Text "SHOUT" to 85258 | 24/7             |
| **Mind Infoline**      | 0300 123 3393         | 9am–6pm, Mon–Fri |
| **NHS 111**            | 111                   | 24/7             |
| **Emergency Services** | 999                   | 24/7             |

**Note:** These are UK-based contacts. The app is designed for UK users. If the app is used internationally, the user should be prompted to add local emergency contacts.

### Appendix C: Toolkit Section Index

| Section                                     | Pages   | Key Exercises                                                                                                                                                    |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Introduction & Disclaimer                   | 3–7     | Crisis contacts, author's story                                                                                                                                  |
| The Nervous System & Dysregulation          | 8–14    | ANS basics, survival responses overview                                                                                                                          |
| The Survival Response                       | 17–22   | Nervous system map ( Fight/Flight/Freeze/Fawn ), Window of Tolerance                                                                                             |
| Self-Soothing Strategies That Actually Work | 23–34   | Voice (humming, vagal toning), Mind (5-4-3-2-1), Body (tapping, rocking), Breath (gentle breathing, box breathing), Senses (scent, cold water, weighted blanket) |
| Somatic Therapy                             | 30–31   | Orienting, tension-release, butterfly hug, self-holding, grounding through contact, shake it out, pendulation                                                    |
| From Survival to Self-Kindness              | 35–46   | Self-compassion reflections                                                                                                                                      |
| The Door to Your Inner Child                | 47–50   | Inner child visualisation, safe space                                                                                                                            |
| From Wounds to Words                        | 51–56   | Journaling prompts, narrative work                                                                                                                               |
| When Thoughts Aren't the Whole Story        | 57–64   | Trigger mapping, flashback understanding, central cycle                                                                                                          |
| Beneath the Noise                           | 65–70   | Body signals, intuition                                                                                                                                          |
| From Inner Signals to Inner Self            | 71–80   | Self-connection, embodiment                                                                                                                                      |
| From Connection to Cognition                | 81–86   | Mind-body integration                                                                                                                                            |
| Who You Think You Are vs Who You Truly Are  | 87–90   | Identity, values, self-esteem                                                                                                                                    |
| Finding Support Where You Are               | 91–94   | EMDR, therapy reflections                                                                                                                                        |
| Letting Go of Familiar Pain                 | 95–98   | Releasing survival patterns                                                                                                                                      |
| Making Safety Real                          | 99–101  | Safe space builder, sensory checklist                                                                                                                            |
| Tools for the Bad Days                      | 103–113 | 5-4-3-2-1 grounding, box breathing, crisis tools                                                                                                                 |
| Crisis Plan                                 | 114–115 | Emergency contacts, action plan                                                                                                                                  |
| A Letter to the Tired, Trying You           | 116     | Compassionate closing                                                                                                                                            |
| Notes                                       | 117     | Blank pages for user notes                                                                                                                                       |
| Final Words                                 | 118     | Closing                                                                                                                                                          |

### Appendix D: Design System References

The app uses the existing `calm-anchor-design-system.html/css/js` files. Key references:

- **Colour palette:** Trauma-informed (warm, grounding, calming — see `calm-anchor-color-system-v3.html`)
- **Typography:** Accessible, readable fonts (see design system)
- **Components:** All UI components (buttons, forms, navigation, cards, modals) must use the design system components
- **Form controls:** Use the design system form controls (not browser defaults)
- **Feedback/Overlays:** Use the design system feedback components (not custom alerts)
- **Dark mode:** The design system supports dark mode — the app must respect user preference
- **CSS custom properties:** All colours, spacing, and typography are CSS variables — do not hardcode values

### Appendix E: UK English Spelling Guide

All content in the app must use UK English spelling:

| UK                                | US         | Context                             |
| --------------------------------- | ---------- | ----------------------------------- |
| colour                            | color      | UI text                             |
| centre                            | center     | UI text                             |
| organise                          | organize   | UI text                             |
| programme                         | program    | UI text (except "computer program") |
| behaviour                         | behavior   | UI text                             |
| favourite                         | favorite   | UI text                             |
| recognise                         | recognize  | UI text                             |
| defence                           | defense    | UI text                             |
| practice (noun) / practise (verb) | practice   | UI text                             |
| counselling                       | counseling | UI text                             |
| travelled                         | traveled   | UI text                             |

### Appendix F: Trauma-Informed Design Checklist

Every feature and screen must pass this checklist:

- [ ] **No pressure language:** No "you should", "you must", "you need to". Use "you can", "if you'd like", "when you're ready".
- [ ] **Optional everything:** Every field, every exercise, every prompt is optional. No mandatory actions.
- [ ] **No guilt:** No "you missed a day", "you haven't logged in", "your streak is broken".
- [ ] **User agency:** The user is always in control. No automatic actions, no unexpected notifications.
- [ ] **Calm colours:** Use warm, grounding, muted colours. No bright reds, no clinical whites.
- [ ] **Large, clear buttons:** Especially in crisis mode. No small tap targets.
- [ ] **Minimal text in crisis:** Crisis screens use visuals, not paragraphs.
- [ ] **Skip available:** Every screen, every step, every prompt has a "skip" or "not now" option.
- [ ] **No diagnostic language:** The app does not diagnose, label, or assess the user.
- [ ] **Privacy first:** Every screen reminds the user that their data is private and theirs alone.
- [ ] **Offline capable:** Critical features work without internet.
- [ ] **Accessibility:** Supports screen readers, large fonts, high contrast, and reduced motion.
- [ ] **No clinical tone:** The app's voice is warm, compassionate, and peer-like — not clinical or authoritative.

### Appendix G: Quick Reference for Agents

If you are an AI agent working on this project, here is the essential context:

- **This is a single-user, private CPTSD companion app.** No multi-user, no sharing, no clinician dashboards.
- **The app serves the toolkit, it does not replace it.** Every feature maps to a chapter or exercise in the book.
- **No AI, no machine learning, no physiological monitoring.** These are explicitly out of scope.
- **The core features are the Core 7 + 2.** See Section 3 for full specifications.
- **Tech stack:** Next.js, TypeScript, Tailwind CSS, Supabase (PostgreSQL), PWA.
- **Design system:** `calm-anchor-design-system.html/css/js` — use it, don't override it.
- **All data is private and local.** No cloud sync unless user explicitly opts in.
- **UK English throughout.** Use the spelling guide in Appendix E.
- **Trauma-informed design is mandatory.** Use the checklist in Appendix F.
- **Offline-first for crisis.** The Crisis Widget must work without internet.
- **If you are unsure about a feature, refer to the toolkit.** The book is the source of truth.

---

**End of Document**

---

*Document maintained by: Project Lead (Aamir Abbas)*
*Project Coordinator: Anchal Garg*
*Technical specification authored by: Sisyphus (AI Orchestrator)*
*Toolkit content authored by: Kimberley Hajee*
*Project funded by: Jenkinson Award JA27017*
*University of Greater Manchester, School of Arts & Creative Technologies / Computing*
