# 🥋 Safia's and Safaan's Math Upskilling Dojo

## 🚀 How to Use

### Option 1: Run Locally

1. Download this whole folder, keeping the `js/` subfolder intact (`index.html`, `style.css`, `script.js`, and `js/lib.js` + `js/curriculum.js`)
2. Double-click `index.html` to open in your browser
3. The app will work offline!

### Option 2: Host on GitHub Pages

1. Create a GitHub repository
2. Upload the whole folder, including the `js/` subfolder
3. Enable GitHub Pages in Settings
4. Visit `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Option 3: Host on Netlify

1. Drag and drop the folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Your app is live immediately

## 🎯 How to Play

1. **Choose a track** (Rookie Track K/1st, Power Track 2nd, Black Belt Track 3rd, Turbo Combo Multiplication, Pit Split Division, or Free Sparring SOAR)
2. **Pick a unit** (each track is grouped into curriculum units, e.g. "Addition & Subtraction", "Telling Time")
3. **Pick a skill** within that unit
4. **Read the lesson** - each has a visual and explanation
5. **Answer 3 questions** - get at least 2 correct to earn a belt
6. **Use hints** - if stuck, click "Hint" for step-by-step help
7. **Track progress** - stars and belts show your achievements. Belts unlock in order — belt *n* only opens once belt *n-1* is done.

## 💾 Saving Progress

- Click **"Save"** to download your progress as a `.json` file
- Click **"Load"** to restore saved progress

## 🧪 Running Tests

This project has no build step, so there's no `npm test`. There's a `gjs`-based automated suite instead - it loads the real app files outside a browser and checks the logic (every skill generates valid, answerable questions; progress/mastery/quizzes/Fluency Zone all behave correctly; every button's target element actually exists).

1. Install `gjs` (GNOME JavaScript) if you don't have it - e.g. `sudo apt install gjs` or `brew install gjs`
2. Run `bash tests/run.sh` from the project folder

This verifies the app's logic is sound, but **can't confirm the page actually renders correctly in a browser** - always give it a manual look after making changes.

## 📱 Device Support

- Works on **desktop**, **tablet**, and **mobile**
- Responsive design adapts to all screen sizes
- Touch-friendly buttons (minimum 44px tap targets)

## 🎨 Turbo Math Design System

Dark teal/graphite surfaces with cyan/coral/amber action colors, `Lilita One` display type + `Nunito Sans` body type, and chunky "pressed" button shadows. No licensed characters or mascots — icons are emoji only.

| Token | Value |
|-------|-------|
| Background | `#0A1F1F` |
| Surface | `#123636` |
| Primary (cyan) | `#17C7C7` |
| Accent (coral) | `#FF5C3D` |
| Reward (amber) | `#FFB020` |
| Success (mint) | `#2FE6A7` |

## 🙏 Credits

- Built for Safia's and Safaan's MAP test preparation
- Original dojo-meets-racing theme, no licensed characters
- Dojo martial arts theme for engagement

## 📝 License

Free for personal and educational use.

---

**Good luck on your MAP test! 🥋🏁**
