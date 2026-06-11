# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run android       # Run on Android emulator/device
npm run ios           # Run on iOS simulator/device
npm run start         # Start Metro bundler
npm run test          # Run Jest tests
npm run lint          # Run ESLint
```

Run a single test file:
```bash
npx jest __tests__/App.test.tsx
```

After adding new assets (fonts, word files), re-link them:
```bash
npx react-native-asset
```

## Architecture Overview

**improvibes** is a React Native app for improv comedy facilitators. It helps run jams, shows, warmups, and games by managing timers and generating random scene-starting words.

### Navigation Structure

Two-level navigation defined in `App.tsx`:
- **Root Stack**: `Start` → `Main`
- **`Main` is a Drawer navigator** (`MainDrawer`) containing all primary screens

The app always enters via `StartScreen`, then pushes into the `Main` drawer. All drawer screens share the `RootStackParamList` type.

### Screen Flow

```
StartScreen → HomeScreen
HomeScreen → JamScreen | ShowScreen
JamScreen → WarmupsScreen | GameScreen
GameScreen → DetailsScreen
DetailsScreen → TimerScreen (single scene)
ShowScreen → TimerScreen (multi-team)
WarmupsScreen → TimerScreen (warmup countdown)
```

`TimerScreen` has two modes, distinguished by route params:
- **Teams mode**: `{ teams, duration }` from ShowScreen — cycles through teams
- **Single scene mode**: `{ sceneLength }` from DetailsScreen or WarmupsScreen

### Styling System

All styling follows a strict percentage-based responsive pattern:

1. **`src/components/ScreenDimensionUtility.js`** — exports `sw` (screen width) and `sh` (screen height minus status bar). Import these for any pixel calculations.

2. **`src/styles/Constants.js`** — all layout values as decimal percentages (e.g. `0.12` = 12% of `sw` or `sh`). Each screen has its own named constant block (`HOME_SCREEN`, `DETAILS_SCREEN`, etc.). Also contains `COLORS`, `FONTS`, and hamburger menu feature switches (`HOME_SWITCH`, `ABOUT_US_SWITCH`, etc.).

3. **`src/styles/SharedStyles.js`** — single `StyleSheet.create()` that consumes `Constants.js` values. All screens import from here; **do not add inline styles to screens**.

### BorderWrapper Component

Every screen renders inside `<BorderWrapper>`, which provides:
- `HeaderBar` (app title + hamburger icon to open drawer)
- Outer pink border (`COLORS.OUTER_BORDER`)
- Inner yellow border (`COLORS.INNER_BORDER`)
- Main content area (`COLORS.MAIN_SCREEN_BG`)

The double-border pattern is also used on buttons (`*ButtonOuter` / `*ButtonInner` style pairs in `SharedStyles.js`).

### Word Generation (`src/utils/wordUtils.ts`)

Async utility that reads `.txt` word files from the bundle using `react-native-fs`. Results are cached in-memory per word type. **Platform paths differ**:
- Android: files land in `custom/` (e.g. `custom/nouns.txt`)
- iOS: files use the original path (e.g. `assets/words/nouns.txt`)

Word types: `any`, `nouns`, `adjectives`, `adverbs`, `ads_adverbs` (combines adjectives + adverbs), `location`.

### Static Data Assets

- `assets/games/games.json` — array of game objects, each `{ [gameName]: { playerNum, length, rules } }`
- `assets/games/warmups.json` — warmup definitions
- `assets/words/*.txt` — one word per line
- `assets/locations/improv_locations_small.txt` — improv-appropriate locations
- `assets/fonts/FredokaOne-Regular.ttf` — decorative display font (used as `FONTS.FONT1`)

All assets are registered in `react-native.config.js` and must be re-linked after changes.

### Hamburger Menu

Menu items are driven by boolean feature switches at the bottom of `Constants.js` (`HOME_SWITCH`, `ABOUT_US_SWITCH`, `INSTRUCTIONS_SWITCH`, `COLORS_SWITCH`). Set a switch to `false` to hide that item from the drawer without deleting the screen.
