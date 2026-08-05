Implement the redesign described in `design_handoff_math_upskilling_dojo/README.md` directly in this repo (vanilla HTML/CSS/JS, no build step — index.html, style.css, script.js, js/curriculum.js, js/lib.js).

Scope:
1. Restyle the whole app to the Turbo Math visual system in the README's "Design Tokens" section (dark teal/graphite surfaces, cyan/coral/amber action colors, Lilita One + Nunito Sans, chunky pressed-button shadows). Replace style.css's pink/purple bubble theme entirely. Do not introduce Hello Kitty, Princess Peach, Labubu, Samurai Champloo, or any other licensed/copyrighted character or logo anywhere — use the original, character-free treatment described in the README (emoji iconography, no mascots).
2. Rename the app throughout (title tag, top bar, README, any hardcoded strings) to "Safia's and Safaan's Math Upskilling Dojo".
3. Recreate the 6 screens (Home, Units, Levels, Quiz, Fluency Zone, Result) per the README's "Screens / Views" section — same layout structure, spacing, and component shapes as described.
4. Keep all existing logic as-is: js/curriculum.js (SKILLS/CURRICULUM/gen()), the real quiz engine, save/load JSON, and Fluency Zone timing in script.js. Only change presentation (HTML structure/classes and CSS) and copy/labels needed for the rename and theme — do not simplify or replace the real question-generation logic with the prototype's placeholder generator.
5. Match belt-lock behavior, star scoring (3/2/1/0 for 3/2/1/0 correct), and progress-bar/stat displays already implemented in script.js, just restyled.
6. Leave a clearly marked empty image slot (or a plain-color placeholder block) where the README calls for hero artwork — do not fabricate or scrape any character image into it.

Open `design.dc.html` in a browser alongside the repo to see the exact target look and click-through behavior for every screen before starting.
