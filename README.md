
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

1. **Choose a grade level** (K/1st, 2nd, 3rd, Multiplication, Division, or SOAR)
2. **Pick a unit** (each grade is grouped into curriculum units, e.g. "Addition & Subtraction", "Telling Time")
3. **Pick a skill** within that unit
4. **Read the lesson** - each has a visual and explanation
5. **Answer 3 questions** - get at least 2 correct to earn a belt
6. **Use hints** - if stuck, click "Hint" for step-by-step help
7. **Track progress** - stars and belts show your achievements

## 💾 Saving Progress

- Click **"Save (Belt)"** to download your progress as a `.json` file
- Click **"Load (Match)"** to restore saved progress

## 🧪 Running Tests

This project has no build step, so there's no `npm test`. There's a `gjs`-based automated suite instead - it loads the real app files outside a browser and checks the logic (every skill generates valid, answerable questions; progress/mastery/quizzes/Fluency Zone all behave correctly; every button's target element actually exists).

1. Install `gjs` (GNOME JavaScript) if you don't have it - e.g. `sudo apt install gjs` or `brew install gjs`
2. Run `bash tests/run.sh` from the project folder

This verifies the app's logic is sound, but **can't confirm the page actually renders correctly in a browser** - always give it a manual look after making changes.

## 📱 Device Support

- Works on **desktop**, **tablet**, and **mobile**
- Responsive design adapts to all screen sizes
- Touch-friendly buttons (minimum 44px tap targets)

## 🎨 Color Themes by Grade

| Grade | Theme Color |
|-------|-------------|
| K/1st | Pink (`#dc80b0`) |
| 2nd | Gold (`#fbe158`) |
| 3rd | Blue (`#9bc4cb`) |
| Multiplication | Brown/Gold (`#9b6a4a`) |
| Division | Teal (`#4a6a5a`) |
| SOAR | Dark Teal (`#1e3a3a`) |

## 🙏 Credits

- Built for Safia's MAP test preparation
- Characters: Hello Kitty, Princess Peach, Labubu
- Dojo martial arts theme for engagement

## 📝 License

Free for personal and educational use.

---

**Good luck on your MAP test! 🥊🌸**
