# Handoff: Safia's and Safaan's Math Upskilling Dojo

## Overview
A visual + interaction redesign of the `shiblee86/Upskilling-math-to-3rd-grade` app. It replaces the source app's licensed-character theme (Hello Kitty, Princess Peach, Labubu) and pink/purple bubble UI with an original dojo-meets-racing theme, styled with the Turbo Math design system. Same underlying curriculum structure (grade tracks → units → belts/levels → 3-question quizzes → results), renamed and re-skinned, personalized to "Safia" and "Safaan".

## About the Design Files
The bundled file (`design.dc.html`) is a **design reference built in HTML** — a working prototype of the look, layout, and click-through behavior, not production code to paste in. The target codebase is the vanilla HTML/CSS/JS app in the GitHub repo (`index.html` / `style.css` / `script.js` / `js/curriculum.js` / `js/lib.js`, no framework, no build step). Recreate this design directly in that codebase's existing vanilla JS/CSS structure — restyle `style.css` and adjust `index.html`/`script.js` to match — rather than introducing a new framework.

## Fidelity
**High-fidelity for visuals** (exact colors, type, spacing, component shapes below) but **low-fidelity for the quiz engine** — the prototype's question generator is a simplified stand-in (a few arithmetic patterns per track) built for demo purposes. The real implementation must keep using the repo's actual `js/curriculum.js` (2,127 lines — all real SKILLS/gen()/hint logic) and `script.js` engine; only the presentation layer changes.

## Screens / Views

### 1. Home (track picker)
- Top bar: app title "Safia's and Safaan's Math Upskilling Dojo" (left), a `★ {stars}` pill (right), plus Save/Load icon buttons.
- Hero band, 200px tall, rounded (`--radius-xl`), dark gradient scrim over an image slot (placeholder for a future original illustration — no licensed art) with centered title + tagline "Race every lap. Earn every belt. First to the podium wins."
- Grid of 6 track cards (`repeat(auto-fit, minmax(220px,1fr))`, 14px gap): Rookie Track (K/1st), Power Track (2nd), Black Belt Track (3rd), Turbo Combo (Multiplication), Pit Split (Division), Free Sparring (SOAR). Each card: 40px emoji icon, display-font title, body-font description, and a grade badge (e.g. "K/1st") below.
- Total-progress panel: label, star-count badge, amber progress bar.
- Bottom quick-nav (Dojo / Fluency Zone), max-width 420px.

### 2. Units
- Panel title: `{track icon} {track name} — pick a unit`.
- Row of two buttons: "🏆 Course Challenge" (accent) and, only for Multiplication/Division tracks, "⚡ Fluency Zone" (ghost).
- List of unit rows (surface-2 card, 2px border, 20px radius): unit name + "{n} belts" badge line, "Start" button.
- "← Back to Dojo" ghost button, centered.

### 3. Levels (belts)
- Panel title: unit name.
- Wrapping grid of 104×104px level tiles (one per belt): icon, "Belt {n}" label, star count if completed, locked state (🔒, dimmed, disabled) until the previous belt is done.
- "← Back to units" ghost button.

### 4. Quiz
- Back buttons row: "🏠 Dojo", "← Levels".
- Meta row: unit·belt label + "{n}/3" progress.
- Stat row: CORRECT / OOPS / ACCURACY.
- Thin progress bar (question index / 3).
- Question card: large display-font question, up to 4 answer tiles (rounded-rect, 120×92px) that turn mint on correct / coral on wrong after checking, hint box (amber border) shown on demand, feedback line after check, and a Hint / Check / Next button row (Next only appears after checking; label becomes "See result" on the last question).

### 5. Fluency Zone
- Title "⚡ Fluency Zone".
- Time (coral under 10s, else cyan) and Score (mint) side by side.
- Big display-font question (e.g. "7 × 6 = ?").
- Numeric input, Submit/Stop while running, "🏁 Start 60s Drill" button when idle.
- "🏠 Back to Dojo" ghost button.

### 6. Result
- Centered card, amber 4px border, radial glow shadow.
- Trophy or fist emoji (🏆 if ≥2 stars else 🥊), title ("Great fight!" / "Good effort!"), star row (★★★ filled per score), summary line ("You got {n} of 3 correct."), Rematch / Dojo / Next-belt (only if passed and belts remain) button row.

## Interactions & Behavior
- All navigation is client-side state (no page reloads): Home → Units → Levels → Quiz → Result, plus a direct Fluency Zone entry from Home or Units.
- Answer tiles: click selects (cyan highlight); Check locks in and reveals correct/wrong coloring + feedback text; Next advances or ends the quiz.
- Belts unlock sequentially — belt *n* is clickable only once belt *n-1* has been completed at least once.
- Stars per belt: 3/2/1/0 mapped from 3/2/1/0 correct answers out of 3; total stars accumulate across the app.
- Fluency Zone: 60s countdown (1s tick), auto-stops at 0, submit compares input to the current fact and advances to a new fact regardless of correctness.
- Save/Load buttons currently show a placeholder toast — real implementation should port the repo's existing JSON export/import.

## State Management
- `screen`: 'home' | 'units' | 'levels' | 'quiz' | 'fluency' | 'result'
- `trackId`, `unitId`, `levelIdx`: current navigation selection
- `totalStars`: number, accumulated across sessions
- `completed`: map of `${trackId}:${unitId}:${levelIdx}` → stars earned
- `quiz`: `{ questions[3], idx, correct, wrong, selected, checked, showHint }`
- `fluency`: `{ running, time, score, currentQuestion, input }`

## Design Tokens
Colors (Turbo Math design system):
- Backgrounds: `--bg-app #0A1F1F`, `--bg-app-deep #081716`, `--surface-1 #0D2828`, `--surface-2 #123636`, `--surface-raised #1B4747`
- Borders: `--border-subtle #1B4747`, `--border-strong #275C5C`
- Primary (cyan): `#17C7C7` (hover `#3DDCDC`, press `#0EA3A3`)
- Accent (coral): `#FF5C3D` (hover `#FF8563`, press `#E6432E`)
- Reward (amber): `#FFB020`
- Success (mint): `#2FE6A7` · Error (red): `#FF3B3B`
- Text: primary `#F4FBFB`, secondary `#A9C4C4`, muted `#6E8C8C`, on-primary `#081716`, on-accent `#2A0F08`

Typography: display `'Lilita One'`, body `'Nunito Sans'`. Scale: xs 0.8rem / sm 0.95rem / base 1.1rem / md 1.3rem / lg 1.6rem / xl 2rem / 2xl 2.6rem. Weights: regular 400, bold 700, black 900.

Spacing/shape: 4/8/12/16/20/24/32/40/56/72px scale. Radius: sm 8 / md 14 / lg 20 / xl 28 / pill 999. Buttons/cards use a colored "pressed" bottom-shadow (`0 5-10px 0 <shade>`) that collapses to 2px and translates down on press/active — no opacity-based hover, just `translateY(-3px)` lift on card hover.

## Assets
No bitmap/vector assets — icons are emoji (🏁⚡🥋✖️➗🚀🏆⭐🔒 etc.), consistent with the source app's emoji-only iconography. The Home hero has an empty image slot intended for original commissioned artwork (explicitly not the Samurai-Champloo-styled or Hello-Kitty/Peach/Labubu imagery referenced during design).

## Files
- `design.dc.html` — the full interactive prototype (all 6 screens).
- Reference the Turbo Math design system tokens/components at `_ds/turbo-math-design-system-fa089027-7873-4c21-a576-5c93e55e0faa/` in the design project for the underlying component source if needed.
