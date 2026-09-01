# CalmAnchor — UI/UX: Navigation Shell & Information Architecture

> **Status:** Draft · **Milestone:** M1 (Navigation shell)
> **Design source of truth:** `design-system/calm-anchor-design-system.css`
> **Rendering baseline:** Expo Router (`app/` = file-based routes)
> **Convention:** every diagram block maps to a route file and a design-system component/token. See annotations at the bottom.

This document is the FIRST of a `docs/ui/` series. It defines the single root shell that every
other flow (exercise session, check-in, crisis, portfolio, export) hangs off. All other flow
diagrams assume the shell below.

---

## 1. High-Level Information Architecture

The app is a 5-tab single-user companion. One persistent element (the **Crisis FAB**) floats above
every tab at all times. There are no login screens, no clinician views, no multi-user — confirm
with `AGENTS.md`.

```
                      ┌─────────────────────────────────────────────┐
                      │                CALMANCHOR ROOT              │
                      │         (app/_layout.tsx — root Stack)      │
                      └────────────────────────────┬────────────────┘
                                                   │
                     ┌─────────────────────────────┴─────────────────────────────┐
                     │  Stack screens (not tabs) — pushed over the tab shell      │
                     │  [crisis/*] [exercise/*] [diary/*] [onboarding/*] [settings]│
                     └─────────────────────────────┬─────────────────────────────┘
                                                   │
               ┌───────────────────────────────────┴───────────────────────────────────┐
               │                        TAB SHELL  (app/(tabs)/_layout.tsx)           │
               │                      5 bottom tabs + Crisis FAB (always shown)        │
               └───────────────────────────────────┬───────────────────────────────────┘
                                                   │
   ┌───────────────┬───────────────┬───────────────┼───────────────┬───────────────┐
   ▼               ▼               ▼               ▼               ▼               ▼
 [ DASHBOARD ]  [ TOOLKIT ]     [ EXERCISES ]    [ DIARY ]       [ PORTFOLIO ]   [ CRISIS FAB ]─┐
   home / index   PDF viewer      self-sooth        reflections     personal        covers all   │
   check-in       chapters        menu              journaling      toolkit        tabs, always │
   "read me"      (M2)            by category       prompts         (favourites)    one tap     │
   triggers       (M3)            (M2)              (M2)            (M3)            away        │
```

**Key decisions:**
- **Dashboard = home**. The daily check-in card lives here (M3). It greets the user with no
  pressure — no streak, no "X days missed".
- **Crisis FAB is above the tab bar** (higher z-index than the tabs), never hidden, no login, no
  confirmation dialog. Bypasses all navigation when tapped.
- **Toolkit/Diary/Exercises/Portfolio** are the four "work" tabs per `docs/progress/01-overview.md`. Dashboard is
  the reflection/home tab.

---

## 2. Route Tree (Expo Router)

```
app/
├─ _layout.tsx                 Root: ThemeProvider + Stack + StatusBar
│                              ├─ (tabs)          → tab shell (default/initial)
│                              ├─ crisis          → stack modal, full-screen
│                              ├─ exercise        → stack
│                              ├─ diary           → stack
│                              └─ onboarding      → stack (M3, from Settings)
│
├─ (tabs)/
│  ├─ _layout.tsx              Tabs navigator + <CrisisFab/> overlay
│  ├─ index.tsx                Dashboard (ROOT tab — the app's home)
│  ├─ toolkit.tsx              Toolkit (PDF + chapter nav)          M2
│  ├─ exercises.tsx            Exercise Menu (category list)        M2
│  ├─ diary.tsx                Diary (prompts list)                 M2
│  └─ portfolio.tsx            Portfolio (personal toolkit)         M3
│
├─ crisis/
│  ├─ _layout.tsx              Minimal full-screen (no tab bar, no header)
│  ├─ index.tsx                Landing: Ground / Breathe / Quick Reset
│  ├─ ground.tsx               5-4-3-2-1 sensory grounding
│  ├─ breathe.tsx              Box breathing (4-4-4-4)
│  └─ reset.tsx                "My Quick Reset" (top-rated from Portfolio)
│
├─ exercise/
│  ├─ _layout.tsx
│  ├─ [id].tsx                 Exercise detail (desc, steps, duration)
│  └─ session/[id].tsx         Guided session view (timer / steps)   M2
│
├─ diary/
│  ├─ _layout.tsx
│  ├─ new.tsx                  Compose entry (3 prompts + free text)
│  └─ [id].tsx                 View / edit / delete entry
│
└─ onboarding/
   ├─ _layout.tsx
   └─ index.tsx               7-step welcome carousel (skippable)   M3
```

**NOTE:** Settings + Export (M3/M4) are pushed as stack screens from Dashboard (cog) — they are
NOT tabs. Keep the 5-tab contract stable.

---

## 3. The Shell — Screen Anatomy (every tab)

Each tab is wrapped in the same `AppShell` component. Rendered top-to-bottom. The Crisis FAB is
outside the tab bar scroll region so it never moves.

```
┌───────────────────────────────────────────────────────────────┐
│  ▲ StatusBar (expo-status-bar, style="auto")                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  HEADER (app-topbar)                 [surface]           │ │
│  │  Title (app-title)         ...      (cog→Settings, ⌘M)  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  BODY (app-body) — flex:1, scrollable                 │ │
│  │                                                        │ │
│  │     <ScreenContent/>   ← each tab renders its content  │ │
│  │     (check-in / pdf / ex-cards / prompts / portfolio)  │ │
│  │                                                        │ │
│  │  ...empty-space / padding-bottom so FAB never covers   │ │
│  │     the last item (bottom padding = 80)                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  TAB BAR (bottom-nav)           [surface]                │ │
│  │                                                         │ │
│  │    ◧          ▢          ◈          ✎          ◐        │ │
│  │  Dashboard   Toolkit   Exercises   Diary    Portfolio   │ │
│  │   (active)  [icon]     [icon]     [icon]     [icon]     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│                    ╔═══════════════════╗                       │
│                    ║  ☰  Crisis FAB   ║  ←-- FLOATS over body  │
│                    ║  (56×56,radius-full)║   + tab bar, always  │
│                    ╚═══════════════════╝                       │
└───────────────────────────────────────────────────────────────┘
```

**Design-system mapping:**
| Screen band   | Component / token                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| Header        | `.app-topbar`, `.app-title`, `.app-sub` — `--color-surface`, `--color-text`        |
| Body          | `.app-body` — `--color-bg`, spacing `--sp-*`                                       |
| Tab bar       | `.bottom-nav`, `.nav-item`, `.nav-icon`, `.is-active` — active=`--color-primary` |
| Crisis FAB    | `.fab` — fixed, 56×56, `--radius-full`, `--shadow-lg`                             |

**Active-tab rule:** exactly one `.nav-item` has `.is-active` → `--color-primary` text+icon, weight 700.

---

## 4. Crisis FAB — placement & z-index

The FAB is the single most important element. It must always be reachable in ≤1 tap, in every
screen, light or dark, online or offline.

```
           Container: fixed, bottom: 24 + tab-bar-height, right: 24
           z-index: > tab bar (see token zIndex: modal 400, toast 500)
           size:    56x56, radius full, bg = --color-error (#BF3A2A light / #E87A6A dark)
           content: ☰ / "+" glyph, `--color-text-inverse`

           Tap → push /crisis (full-screen modal). NO confirmation dialog.
           Offline: fully functional (bundled content, no network call).
           If a crisis gesture is used, DO NOT log, track, or analyse it.
```

---

## 5. Dash / Home (index) — block-level wireframe

The home screen shows a check-in card (M3) that is the entry point to trigger logging.

```
┌─────────────────────────────────────────────┐
│  CalmAnchor            ☰(menu)  ⚙(settings) │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  💬 HOW ARE YOU RIGHT NOW?  [primary] │  │  ← check-in-card (M3)
│  │  [ ns_state pills: fight flight … ]   │  ── window-of-tolerance state
│  │  [ survival response chips ]          │  ── survival response grid
│  │  [ + Add a trigger ]                  │  ── trigger tracker entry
│  │  [ Save check-in ]  (btn-accent)      │  ── saveCheckin() → checkins
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌  QUICK RELIEF (ex-row) ──────────────┐   │
│  │  [Breathe] [Ground] [Reset] [🧡]      │   │  ← ex-tile, links to /crisis
│  └───────────────────────────────────────┘   │
│                                             │
│  ┌  TODAY'S REFLECTION (list-item) ─────┐   │
│  │  "How does it feel now?" → /diary     │   │
│  └───────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
                   [  ╔ Crisis FAB ╗  ]
```

---

## 6. Tab-by-tab content outline

| Tab         | Route            | Primary content (M-)                                    | Data call (`lib/db.ts`)        |
| ----------- | ---------------- | ------------------------------------------------------- | ------------------------------ |
| Dashboard   | `index.tsx`      | Check-in card, quick relief tiles, today's reflection    | `saveCheckin()` / `saveMoodLog()` |
| Toolkit     | `toolkit.tsx`    | PDF viewer + chapter list → page jump                     | `getChapters()`               |
| Exercises   | `exercises.tsx`  | Category cards → exercise list                            | `getAllExercises()`           |
| Diary       | `diary.tsx`      | Prompt list + entry timeline                             | `getJournalEntries()`         |
| Portfolio   | `portfolio.tsx`  | Favourites, safe-space notes, custom strategies           | (M3: `favourites`, `safe_space_notes`, `custom_strategies`) |

> Confirm against `docs/progress/` milestones. Toolkit/Diary/Exercises are M2; Portfolio is M3;
> Dashboard check-in is M3. The shell (this doc) is M1 and should be built first.

---

## 7. Legend

```
[text]      = a screen / route  │ (text) = a user action  │ text = microcopy
┌───┐ ──┐   = box grouping (a visual block)
▼           = a branch (tabs / child routes)
╔═══╗       = persistent overlay (Crisis FAB)
──           = arrow / flow direction
```

**Cross-reference:** each block is linked to a design-system `.class` and a token from
`theme/tokens.ts`. When implementing, use the token, never hard-code a hex.
