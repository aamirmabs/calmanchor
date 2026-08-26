# Calm Anchor — Development Progress

## Milestone 1: Project Setup & Architecture

**Due: Sun 30 Aug** ·

---

### Completed

#### 1. Project Initialization

- **Expo scaffold with TypeScript** — initialized via `create-expo-app` in a temp directory, merged into the existing `calmanchor` repo to preserve Aamir's `design-system/` and `docs/` folders.
- **Expo Router** — file-based navigation configured. Entry point set to `expo-router/entry` in `package.json`. App screens live in `app/`.

#### 2. Dependencies Installed

- `expo-router`, `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler` — navigation and screen management.
- `@supabase/supabase-js`, `react-native-url-polyfill`, `@react-native-async-storage/async-storage` — Supabase client with React Native support.
- `@types/node`, `dotenv` — dev dependencies for the seed script (runs in Node, not React Native).

#### 3. Supabase Client & Auth

- **`lib/supabase.ts`** — creates the Supabase client using environment variables from `.env`. Uses `AsyncStorage` as the auth storage adapter so sessions persist across app restarts.
- **`lib/auth.ts`** — single function `getCurrentUserId()` that silently signs in anonymously on first launch and returns the UUID on subsequent launches. No login screen, no user input. Every screen calls this to scope data.

#### 4. Database Schema (Supabase)

- **Content tables** — `chapters` (20 page anchors), `exercises` (28 exercises from pages 23–34 and 99–113), `journal_prompts` (3 diary prompts). No RLS on content tables (public read).
- **User-data tables** — `checkins`, `mood_logs`, `journal_entries`, `sessions`, `settings`, `checklist_progress`, `crisis_plan`. All have `user_id` defaulting to `auth.uid()`. RLS enabled with "own rows only" policy on every table.
- **`category` column** added to `exercises` table via `ALTER TABLE` — maps to the 5 exercise categories (breath, voice, senses, somatic, mind) from the scope doc.

#### 5. Seed Script

- **`services/seed.ts`** — TypeScript script that runs against Supabase via `npx ts-node`. Inserts 20 chapter anchors, 28 exercises (from workbook pages 23–34 and 99–113 only), and 3 journal prompts. Uses batch inserts (4 database calls total). Requires `dotenv/config` and `@types/node` to run in Node.

#### 6. Data Access Layer

- **`lib/db.ts`** — abstraction layer between screens and Supabase. Every screen imports functions like `saveMoodLog()`, `getJournalEntries()`, `getAllExercises()` from here instead of importing `supabase` directly. This isolates the data source — when local SQLite replaces Supabase as the primary store (M3), only this file's internals change, not every screen. RLS handles user scoping server-side, so inserts do not pass `user_id` explicitly.

#### 7. Design Tokens

- **`theme/tokens.ts`** — all 60+ CSS custom properties from Aamir's design system (`calm-anchor-design-system.css`) ported to a TypeScript object with `light` and `dark` variants. Includes surfaces, text, nervous system states, survival responses, exercise types, mood scale, semantic status, interaction scales, warm gold (dark mode co-primary), plus spacing, radius, typography (system fonts for M1), animation, and z-index scales.
- **`theme/ThemeContext.tsx`** — React Context provider that reads the system color scheme on launch, provides `colors`, `mode`, and `toggleTheme()` to the entire app. Context API avoids prop drilling through the component tree.

---

### Remaining (M1)

- [ ] Bundle `toolkit.pdf` as `assets/toolkit.pdf`, install `react-native-pdf` + `react-native-blob-util`
- [ ] Navigation shell — 5 tabs (Toolkit, Diary, Exercises, Portfolio, Dashboard) + persistent Crisis FAB
- [ ] Crisis FAB with UK contacts (Samaritans 116 123, Shout 85258, NHS 111)
- [ ] Wrap root layout in `ThemeProvider`
- [ ] Verify app runs on iOS simulator and Android emulator
- [ ] Open draft PR against `main`

---

## Milestone 2: Core App End to End

**Due: Sun 6 Sep** · 30% of payment

### Tasks

- [ ] **Toolkit tab** — PDF viewer with `react-native-pdf`, chapter navigation list from seeded `chapters` table, tap chapter → jump to page
- [ ] **Diary tab** — display 3 seeded prompts, create/view journal entries, call `saveJournalEntry()` / `getJournalEntries()` from `lib/db.ts`
- [ ] **Exercises tab** — list exercises grouped by category (breath, voice, senses, somatic, mind), tap exercise → detail screen with steps and duration
- [ ] **Exercise session flow** — start exercise → timer/step display → pre/post mood log → save session via `saveSession()`
- [ ] **Trigger tracker** — within Diary, log trigger events (timestamp, trigger name, ns_state, survival_response, note)
- [ ] **Cross-platform QA** — test on both iOS and Android, verify safe areas, keyboard handling, navigation back behavior

---

## Milestone 3: Full Feature Set

**Due: Sun 13 Sep** · 30% of payment

### Tasks

- [ ] **Dashboard (Pattern Dashboard)** — 4 descriptive charts: trigger frequency, response distribution, exercise effectiveness, time-of-day patterns. Source data from `checkins`, `sessions`, `mood_logs` via `lib/db.ts`
- [ ] **Daily check-in** — home screen card: select ns_state, survival_response, add triggers, save via `saveCheckin()`
- [ ] **Streaks and stats** — session count, current streak, window-of-tolerance percentage from `sessions` table
- [ ] **Portfolio tab** — favourited exercises, safe-space notes, custom strategies (new tables: `favourites`, `safe_space_notes`, `custom_strategies`)
- [ ] **Remaining workbook sections** — educational content for Learn, Reframe, Relationships groups
- [ ] **Checklists** — activate `checklist_items` / `checklist_progress` tables, UI for self-assessment lists
- [ ] **Offline-first** — install `expo-sqlite` + `drizzle-orm`, local cache as primary store, swap `lib/db.ts` internals from Supabase to SQLite. Supabase becomes opt-in backup.
- [ ] **Onboarding workflow** — 7 gentle, skippable intro steps (supporting feature)

---

## Milestone 4: Store Readiness

**Due: Sun 20 Sep** · 20% of payment

### Tasks

- [ ] **Visual QA** — walk through every screen in light and dark mode, verify all design tokens render correctly
- [ ] **Cross-platform QA** — iOS safe areas, Android hardware back button, status bar, navigation stack behavior
- [ ] **Custom fonts** — load Cabinet Grotesk (display) and Satoshi (body) via `expo-font`
- [ ] **App Store assets** — icon (1024x1024), splash screen, screenshots (iPhone, iPad, Android), description, privacy policy
- [ ] **Play Store assets** — feature graphic, screenshots, content rating, data safety section
- [ ] **Build and submit** — EAS Build, test release builds, submit to App Store Connect and Google Play Console
- [ ] **Data export** — user-initiated CSV export of diary, triggers, portfolio (supporting feature)
- [ ] **Documentation** — README, architecture overview, known limitations

---

## File Structure (current)

```
calmanchor/
  app/
    _layout.tsx            Root layout (Stack navigator, will wrap ThemeProvider)
    index.tsx              Home screen placeholder
  lib/
    auth.ts                Silent anonymous auth — getCurrentUserId()
    supabase.ts            Supabase client setup with AsyncStorage
    db.ts                  Data access layer — all screens import here, never supabase directly
  theme/
    tokens.ts              60+ design tokens (light + dark) from design system CSS
    ThemeContext.tsx        React Context for theme — avoids prop drilling, provides toggleTheme()
  services/
    seed.ts                One-time seed script — 20 chapters, 28 exercises, 3 prompts
  assets/                  Icons, splash images, toolkit.pdf (pending)
  design-system/           Aamir's original design system files (untouched)
  docs/                    Aamir's project documentation (untouched)
  .env                     Supabase URL + anon key (not committed)
```

## Key Decisions

| Decision                           | Rationale                                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Supabase anonymous auth            | No login screen, no user input. One function call gives a UUID. Isolated to `lib/auth.ts` — if auth model changes, only one file changes.        |
| `lib/db.ts` abstraction            | Screens never import `supabase` directly. When local SQLite becomes primary (M3), only `lib/db.ts` internals change.                             |
| PDF as bundled asset               | Scope doc says "embedded PDF viewer." Workbook stays a PDF; app makes it navigable. Chapters are page anchors, not content storage.              |
| System fonts for M1                | Custom fonts (Cabinet Grotesk, Satoshi) are M4 polish. M1 proves architecture, not typography.                                                   |
| Context API for theme              | Avoids prop drilling through component tree. `useTheme()` hook gives any screen access to colors and toggle.                                     |
| Exercise categories from scope doc | body, breath, voice, mind, senses, somatic — matches the Self-Soothing Exercise Menu definition, not the generic types from the original schema. |
