// ============================================================
//  DOJO CURRICULUM
//  SKILLS      - flat skill-id -> array of belts (no fixed length)
//  SKILL_META  - flat skill-id -> { label, track }
//  CURRICULUM  - pure navigation tree: track -> units -> skill ids
//  This is the file that grows across future content phases.
// ============================================================

// ============================================================
//  MULTIPLICATION INTRO LESSONS (What is Multiplication?)
// ============================================================
const multiply_intro = [
  {
    learn: "What is Multiplication? 🤔",
    visual: "🐻🐻 + 🐻🐻 + 🐻🐻 = 6 bears! 3 groups of 2 = 3 × 2 = 6",
    example: "Multiplication is a shortcut for adding the same number again and again!",
    gen: () => {
      let groups = rnd(2, 4);
      let items = rnd(2, 4);
      return {
        q: `You have ${groups} bags. Each bag has ${items} candies. The FAST way to find total candies is:`,
        ans: `${groups} × ${items}`,
        h: () => hWrap('#fbe158', '✖️', 'Multiplication = Repeated Addition',
          hBubble(`Adding: ${items} + ${items} + ${items} (${groups} times) is slow!<br>` +
                  `Multiplying: ${groups} × ${items} = ${groups * items} is FASTER!<br><br>` +
                  `<strong style="color:#9bc4cb;">✅ Multiplication = adding the SAME number over and over!</strong>`)),
        opts: shuffle([`${groups} × ${items}`, `${items} × ${groups}`, `${groups} + ${items}`, `${items} + ${groups}`])
      };
    }
  },
  {
    learn: "Multiplication vs Addition — Same thing, just FASTER! ⚡",
    visual: "4 + 4 + 4 = 12 ··· 3 × 4 = 12 (same answer, less writing!)",
    example: "3 × 4 means 4 + 4 + 4",
    gen: () => {
      let a = rnd(2, 4);
      let b = rnd(2, 5);
      return {
        q: `${a} × ${b} means adding ${b} how many times?`,
        ans: a,
        h: () => hWrap('#fbe158', '✖️', "Multiplication = Repeated Addition",
          hBubble(`"${a} × ${b}" means "${b} added ${a} times"<br>` +
                  `${b} + ${b} + ${b} (${a} times) = ${a * b}<br><br>` +
                  `<strong>✅ The first number tells you HOW MANY TIMES to add!</strong>`)),
        opts: [a, b, a + b, a * b]
      };
    }
  },
  {
    learn: "Why do we multiply? Real life! 🛒",
    visual: "Buying 5 boxes of cookies. Each box has 6 cookies. 5×6=30 cookies!",
    example: "Multiplication saves time counting one by one",
    gen: () => {
      let boxes = rnd(2, 5);
      let perBox = rnd(3, 6);
      return {
        q: `You buy ${boxes} packs of stickers. Each pack has ${perBox} stickers. Total stickers? (Multiply!)`,
        ans: boxes * perBox,
        h: () => hintMultiply(boxes, perBox),
        opts: shuffle([boxes * perBox, boxes + perBox, perBox, boxes * perBox + 1])
      };
    }
  }
];

// ============================================================
//  DIVISION INTRO LESSONS (What is Division?)
// ============================================================
const divide_intro = [
  {
    learn: "What is Division? 🤔",
    visual: "12 cookies ÷ 4 friends = each gets 3 cookies!",
    example: "Division = SHARING equally!",
    gen: () => {
      let total = rnd(12, 20);
      let groups = rnd(2, 4);
      let perGroup = Math.floor(total / groups);
      return {
        q: `${total} candies shared among ${groups} friends. Each gets the SAME number. This is:`,
        ans: "division",
        h: () => hWrap('#9bc4cb', '➗', "Division = Sharing Equally",
          hBubble(`When you share things FAIRLY, you DIVIDE!<br>` +
                  `${total} ÷ ${groups} = ${perGroup} each.<br><br>` +
                  `<strong style="color:#fbe158;">✅ Division = Multiplication's opposite! If ${perGroup}×${groups}=${total}, then ${total}÷${groups}=${perGroup}!</strong>`)),
        opts: ["addition", "subtraction", "multiplication", "division"]
      };
    }
  },
  {
    learn: "Division vs Subtraction — Same thing, just FASTER! ⚡",
    visual: "12 - 4 - 4 - 4 = 0 (subtracted 3 times) → 12÷4=3",
    example: "Division = repeated subtraction!",
    gen: () => {
      let total = rnd(12, 16);
      let divisor = rnd(3, 4);
      let quotient = Math.floor(total / divisor);
      return {
        q: `${total} ÷ ${divisor} means: subtract ${divisor} how many times to reach 0?`,
        ans: quotient,
        h: () => hWrap('#9bc4cb', '➗', "Division = Repeated Subtraction",
          hBubble(`${total} - ${divisor} - ${divisor} - ... = 0<br>` +
                  `You subtract ${divisor} <strong>${quotient}</strong> times!<br><br>` +
                  `<strong>✅ ${total} ÷ ${divisor} = ${quotient}</strong>`)),
        opts: [quotient, divisor, total, quotient + 1]
      };
    }
  },
  {
    learn: "Why do we divide? Real life! 🍕",
    visual: "Pizza for 4 people. 8 slices ÷ 4 = 2 slices each!",
    example: "Division makes sharing fair!",
    gen: () => {
      let slices = rnd(8, 12);
      let people = rnd(2, 4);
      let each = Math.floor(slices / people);
      return {
        q: `${slices} pizza slices for ${people} people. Each gets the SAME amount. How many slices each?`,
        ans: each,
        h: () => hintDivision(slices, people),
        opts: shuffle([each, each + 1, slices, people])
      };
    }
  }
];

// ============================================================
//  PHASE 2 CONTENT HELPERS
// ============================================================

// Builds a shuffled opts array with no duplicate values: takes the
// correct answer plus up to `count` distinct, non-matching candidates
// from `pool` (in order). Fixes the duplicate-option bug class found
// in Phase 1 verification, where small-number +/-1 distractors could
// collide with each other or with the correct answer.
function dedupOpts(correct, pool, count) {
  count = count || 3;
  const chosen = [];
  const seen = new Set([String(correct)]);
  for (const p of pool) {
    const key = String(p);
    if (!seen.has(key)) { chosen.push(p); seen.add(key); }
    if (chosen.length === count) break;
  }
  return shuffle([correct, ...chosen]);
}

// Builds a shuffled pool of { skillId, belt } refs for unit quizzes / course
// challenges: `perSkill` questions from each skill (a random belt each time,
// since belt difficulty isn't the point here), capped at `cap` total.
function buildQuestionPool(skillIds, perSkill, cap) {
  let pool = [];
  skillIds.forEach(skillId => {
    const belts = SKILLS[skillId].length;
    for (let i = 0; i < perSkill; i++) pool.push({ skillId, belt: rnd(1, belts) });
  });
  return shuffle(pool).slice(0, cap);
}

const SHAPES_3D = [
  { name: 'cube', emoji: '🎲', hint: 'like a dice - 6 flat square faces' },
  { name: 'sphere', emoji: '⚽', hint: 'perfectly round, rolls every way' },
  { name: 'cylinder', emoji: '🥫', hint: "like a can - round on the ends, straight sides" },
  { name: 'cone', emoji: '🍦', hint: 'like an ice cream cone - round bottom, pointy top' }
];
const COINS = [
  { name: 'penny', value: 1 },
  { name: 'nickel', value: 5 },
  { name: 'dime', value: 10 },
  { name: 'quarter', value: 25 }
];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SEASON_OF_MONTH = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // indexed like MONTHS, non-leap year

// Solid shapes with real face/edge/vertex counts - kept separate from grade 1's
// SHAPES_3D (which is emoji-identification only, and includes curved shapes like
// sphere/cone/cylinder that don't have well-defined edges/vertices for counting).
const SHAPES_3D_VEF = [
  { name: 'cube', emoji: '🎲', faces: 6, edges: 12, vertices: 8 },
  { name: 'rectangular prism', emoji: '📦', faces: 6, edges: 12, vertices: 8 },
  { name: 'triangular prism', emoji: '⛺', faces: 5, edges: 9, vertices: 6 },
  { name: 'square pyramid', emoji: '🔺', faces: 5, edges: 8, vertices: 5 }
];

// Index = number of sides (3-10). Any distractor lookup into this table
// MUST clamp to [3,10] first - an out-of-range index returns undefined
// and would leak the literal string "undefined" into the UI.
const POLYGON_NAMES = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' };
function clampSides(n) { return Math.max(3, Math.min(10, n)); }

// ============================================================
//  SKILLS - every atomic skill's belts. gen() always returns
//  { q, ans, h, opts } - unchanged contract from before Phase 1.
// ============================================================

const SKILLS = {
  // K/1st Grade
  add1: [
    { learn: "Addition means putting things together!", visual: "🐶🐶 + 🐶🐶🐶 = 5 dogs!", example: "2 + 3 = 5",
      gen: () => { let a = rnd(1, 4), b = rnd(1, 4); return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 1, a + b - 1, a]) }; } },
    { learn: "Count on from the bigger number!", visual: "Start at 6 → 7, 8, 9... (+3) = 9", example: "6 + 3 = 9",
      gen: () => { let a = rnd(3, 6), b = rnd(1, 3); return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 1, a + b - 1, b]) }; } },
    { learn: "Doubles are easy! Same number twice.", visual: "🍎🍎🍎 + 🍎🍎🍎 = 6", example: "3 + 3 = 6",
      gen: () => { let d = rnd(2, 5); return { q: `${d} + ${d} = ?`, ans: d * 2, h: () => addHint(d, d), opts: shuffle([d * 2, d * 2 + 1, d * 2 - 1, d]) }; } },
    { learn: "Make a ten! What's missing to get to 10?", visual: "🟡🟡🟡🟡🟡🟡🟡 + ❓❓❓ = 10", example: "7 + 3 = 10",
      gen: () => { let a = rnd(2, 8); return { q: `${a} + ? = 10`, ans: 10 - a, h: () => missingAddHint(10, a), opts: shuffle([10 - a, 10 - a + 1, 10 - a - 1, a]) }; } },
    { learn: "Add three numbers! First two, then the third.", visual: "🐧2 + 🐧3 + 🐧1 = 6", example: "2+3+1=6",
      gen: () => { let a = rnd(1, 3), b = rnd(1, 3), c = rnd(1, 2); return { q: `${a} + ${b} + ${c} = ?`, ans: a + b + c, h: () => addThreeHint(a, b, c), opts: shuffle([a + b + c, a + b + c + 1, a + b + c - 1, a + b]) }; } }
  ],
  sub1: [
    { learn: "Subtraction = taking away. Cookies eaten!", visual: "🍪🍪🍪🍪🍪 − 🍪🍪 = 🍪🍪🍪", example: "5−2=3",
      gen: () => { let a = rnd(5, 9), b = rnd(1, 4); return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 1, a - b - 1, b]) }; } },
    { learn: "Count back! Start at the big number, count back.", visual: "9 → 8, 7, 6 (counted back 3) = 6", example: "9−3=6",
      gen: () => { let a = rnd(6, 10), b = rnd(1, 4); return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 1, a - b - 1, b]) }; } },
    { learn: "Missing number! What's taken away?", visual: "8 − ? = 5. Count from 5 to 8!", example: "8−3=5",
      gen: () => { let total = rnd(6, 10), result = rnd(2, total - 2); return { q: `${total} − ? = ${result}`, ans: total - result, h: () => missingSubHint(total, result), opts: shuffle([total - result, total - result + 1, total - result - 1, result]) }; } },
    { learn: "How many more? Compare two amounts.", visual: "🌟🌟🌟🌟🌟 vs 🌟🌟🌟  -  how many more?", example: "5−3=2",
      gen: () => { let a = rnd(5, 9), b = rnd(2, a - 2); return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 1, a - b - 1, b]) }; } },
    { learn: "Fact families: 3+4=7, 7−3=4, 7−4=3", visual: "Big Boss = 7 👑, Friends = 3 & 4 🤝", example: "7−4=3",
      gen: () => { let a = rnd(2, 5), b = rnd(2, 5); return { q: `${a + b} − ${a} = ?`, ans: b, h: () => factFamilyHint(a, b, a + b), opts: shuffle([b, b + 1, b - 1, a]) }; } }
  ],
  place1: [
    { learn: "Tens and ones: 14 = 1 ten + 4 ones.", visual: "📦(10) + 🧱🧱🧱🧱 = 14", example: "14 → 1 ten",
      gen: () => { let t = rnd(1, 4), o = rnd(0, 8), n = t * 10 + o; return { q: `${n} has how many tens?`, ans: t, h: () => hWrap('#c4a5ff', '📦', 'Tens & Ones', hBubble(`${n}: the LEFT digit is tens → <strong>${t}</strong> ten${t > 1 ? 's' : ''}`)), opts: shuffle([t, t + 1, t - 1, o || 1]) }; } },
    { learn: "Make the number! tens × 10 + ones.", visual: "3 tens + 5 ones = 35", example: "35",
      gen: () => { let t = rnd(1, 5), o = rnd(0, 9); return { q: `${t} tens and ${o} ones = ?`, ans: t * 10 + o, h: () => hWrap('#c4a5ff', '📦', 'Build the Number', hBubble(`${t} tens = ${t * 10}. Plus ${o} ones = <strong>${t * 10 + o}</strong>`)), opts: shuffle([t * 10 + o, t * 10 + o + 1, t * 10 + o + 10, o]) }; } },
    { learn: "Compare numbers. Which is bigger?", visual: "23 vs 32  -  look at the tens first!", example: "32 > 23",
      gen: () => { let a = rnd(11, 49), b = rnd(11, 49); while (a === b) b = rnd(11, 49); return { q: `Which is bigger: ${a} or ${b}?`, ans: Math.max(a, b), h: () => hWrap('#c4a5ff', '🔍', 'Compare', hBubble(`Look at the tens digit first! ${Math.floor(a / 10)} vs ${Math.floor(b / 10)}`)), opts: shuffle([Math.max(a, b), Math.min(a, b), Math.max(a, b) + 1, Math.min(a, b) - 1]) }; } },
    { learn: "Skip count by 10s: 10, 20, 30, 40...", visual: "📦 📦 📦 📦 = 40", example: "10, 20, 30, 40",
      gen: () => { let n = rnd(3, 7) * 10; return { q: `What comes after ${n} when counting by 10s?`, ans: n + 10, h: () => hWrap('#c4a5ff', '🔢', 'Skip Count', hBubble(`Count by 10s: ${n}, then add 10 → <strong>${n + 10}</strong>`)), opts: shuffle([n + 10, n + 20, n - 10, n + 5]) }; } },
    { learn: "Even & odd: even numbers end in 0,2,4,6,8.", visual: "2🐧 4🐧 6🐧  -  pairs! All even.", example: "14 is even",
      gen: () => { let n = rnd(10, 30); return { q: `Is ${n} even or odd?`, ans: n % 2 === 0 ? 'even' : 'odd', h: () => hWrap('#c4a5ff', '🔢', 'Even or Odd', hBubble(`Last digit is ${n % 10}. ${n % 2 === 0 ? 'Ends in 0,2,4,6,8 → even' : 'Ends in 1,3,5,7,9 → odd'}`)), opts: ['even', 'odd', n % 2 === 0 ? 'odd' : 'even', 'both'] }; } }
  ],
  clock_read1: [
    { learn: "Clocks have an hour hand (short) and a minute hand (long). On the hour, the minute hand points straight up to 12!",
      visual: vClock(3, 0, TRACK_THEME.grade1), example: "Short hand near 3, long hand at 12 = 3:00",
      gen: () => {
        let hour = rnd(1, 12);
        return {
          q: `What time does the clock show?<br>${vClock(hour, 0, TRACK_THEME.grade1)}`,
          ans: `${hour}:00`,
          h: () => hintClock(hour, 0),
          opts: shuffle([`${hour}:00`, `${hour % 12 + 1}:00`, `${hour === 1 ? 12 : hour - 1}:00`, `${hour}:30`])
        };
      } },
    { learn: "Half past the hour! The minute hand points straight down to the 6.",
      visual: vClock(6, 30, TRACK_THEME.grade1), example: "Short hand between 6 and 7, long hand at 6 = 6:30",
      gen: () => {
        let hour = rnd(1, 12);
        return {
          q: `What time does the clock show?<br>${vClock(hour, 30, TRACK_THEME.grade1)}`,
          ans: `${hour}:30`,
          h: () => hintClock(hour, 30),
          opts: shuffle([`${hour}:30`, `${hour}:00`, `${hour % 12 + 1}:30`, `${hour === 1 ? 12 : hour - 1}:30`])
        };
      } }
  ],
  shapes1: [
    { learn: "Shapes have names based on their sides! Triangle=3, square=4, pentagon=5, hexagon=6.",
      visual: vShape('pentagon', { theme: TRACK_THEME.grade1 }), example: "3 sides = triangle",
      gen: () => {
        const shapes = [['triangle', 3], ['square', 4], ['pentagon', 5], ['hexagon', 6]];
        const [kind] = shapes[rnd(0, shapes.length - 1)];
        return {
          q: `What shape is this?<br>${vShape(kind, { theme: TRACK_THEME.grade1 })}`,
          ans: kind,
          h: () => hintShape(kind),
          opts: shuffle(shapes.map(s => s[0]))
        };
      } },
    { learn: "Count the sides to know the shape's name!",
      visual: vShape('hexagon', { theme: TRACK_THEME.grade1, labelSides: true }), example: "A hexagon has 6 sides",
      gen: () => {
        const shapes = [['triangle', 3], ['square', 4], ['pentagon', 5], ['hexagon', 6]];
        const [kind, sides] = shapes[rnd(0, shapes.length - 1)];
        return {
          q: `How many sides does this shape have?<br>${vShape(kind, { theme: TRACK_THEME.grade1, labelSides: true })}`,
          ans: sides,
          h: () => hintShape(kind),
          opts: shuffle([sides, sides + 1, sides - 1, sides + 2])
        };
      } }
  ],

  // K/1st Grade - Phase 2 additions
  equations_truefalse: [
    { learn: "Some number sentences are TRUE and some are FALSE! Check both sides of the = sign.",
      visual: "3 + 4 = 7 ✅ true! 3 + 4 = 8 ❌ false!", example: "5 + 2 = 7 is TRUE",
      gen: () => {
        let a = rnd(1, 9), b = rnd(1, 9);
        let realAns = a + b;
        let showTrue = Math.random() < 0.5;
        let shown = showTrue ? realAns : realAns + (Math.random() < 0.5 ? 1 : -1);
        if (shown < 0) shown = realAns + 1;
        let isTrue = shown === realAns;
        return {
          q: `${a} + ${b} = ${shown}. True or false?`,
          ans: isTrue ? 'true' : 'false',
          h: () => hWrap('#ffb6d1', '❓', 'True or False?', hBubble(`${a} + ${b} = <strong style="color:#9bc4cb;">${realAns}</strong>. The sentence shows ${shown}, so it is <strong>${isTrue ? 'TRUE ✅' : 'FALSE ❌'}</strong>.`) + addHint(a, b)),
          opts: shuffle(['true', 'false'])
        };
      } },
    { learn: "Complete the equation! The missing number could be anywhere.", visual: "? + 4 = 9 → ? = 5   ·   6 + ? = 9 → ? = 3", example: "3 + ? = 8 → ? = 5",
      gen: () => {
        let a = rnd(2, 9), b = rnd(2, 9);
        let sum = a + b;
        let missingFirst = Math.random() < 0.5;
        let q = missingFirst ? `? + ${b} = ${sum}` : `${a} + ? = ${sum}`;
        let ans = missingFirst ? a : b;
        return {
          q, ans,
          h: () => missingAddHint(sum, missingFirst ? b : a),
          opts: dedupOpts(ans, [ans + 1, ans - 1, sum, missingFirst ? b : a])
        };
      } }
  ],
  strategies20: [
    { learn: "Near doubles: 6+7 is close to a double! 6+6=12, so 6+7=13 (one more).", visual: "6+6=12 (double), so 6+7=13", example: "7+8 = double 7 (14) + 1 = 15",
      gen: () => {
        let d = rnd(2, 9);
        let b = Math.random() < 0.5 ? d + 1 : Math.max(1, d - 1);
        let ans = d + b;
        return {
          q: `${d} + ${b} = ?`,
          ans,
          h: () => hWrap('#9bc4cb', '👯', 'Near Doubles', hBubble(`${d} + ${d} = ${d * 2} (double). ${b > d ? `${b} is 1 more than ${d}, so add 1 more` : `${b} is 1 less than ${d}, so take away 1`}: <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, d * 2, d])
        };
      } },
    { learn: "Make a ten! 9+6: take 1 from 6 to make 9 into 10. 10+5=15.", visual: "9 + 6 → 9+1=10, 6-1=5 → 10+5=15", example: "9+6=15",
      gen: () => {
        let a = rnd(7, 9), b = rnd(3, 9);
        let ans = a + b;
        let need = 10 - a;
        return {
          q: `${a} + ${b} = ?`,
          ans,
          h: () => hWrap('#9bc4cb', '🔟', 'Make a Ten', hBubble(`Take ${need} from ${b} to make ${a} into 10: ${a}+${need}=10.<br>${b}-${need}=${b - need} left.<br>10 + ${b - need} = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, a + Math.max(0, b - 1), 10])
        };
      } }
  ],
  compare_symbols: [
    { learn: "Use symbols to compare! < means less than, > means greater than, = means equal.", visual: "5 < 8   ·   9 > 3   ·   4 = 4", example: "7 > 5",
      gen: () => {
        let a = rnd(1, 20), b = rnd(1, 20);
        let ans = a < b ? '<' : a > b ? '>' : '=';
        return {
          q: `${a} __ ${b}`,
          ans,
          h: () => hWrap('#c4a5ff', '🔍', 'Compare', hBubble(`${a} vs ${b}: ${a < b ? `${a} is smaller → <strong>&lt;</strong>` : a > b ? `${a} is bigger → <strong>&gt;</strong>` : `they're the same → <strong>=</strong>`}`)),
          opts: ['<', '>', '=']
        };
      } },
    { learn: "Compare 2-digit numbers! Look at the tens digit first.", visual: "34 __ 29 → 34 > 29 (3 tens > 2 tens)", example: "52 > 48",
      gen: () => {
        let a = rnd(10, 99), b = rnd(10, 99);
        let ans = a < b ? '<' : a > b ? '>' : '=';
        return {
          q: `${a} __ ${b}`,
          ans,
          h: () => hWrap('#c4a5ff', '🔍', 'Compare Tens First', hBubble(`Tens digit: ${Math.floor(a / 10)} vs ${Math.floor(b / 10)}. ${a < b ? `${a} &lt; ${b}` : a > b ? `${a} &gt; ${b}` : `${a} = ${b}`}`)),
          opts: ['<', '>', '=']
        };
      } }
  ],
  shapes_3d: [
    { learn: "3D shapes are all around us! Cube, sphere, cylinder, cone.", visual: SHAPES_3D.map(s => s.emoji).join(' '), example: "🎲 is a cube",
      gen: () => {
        const target = SHAPES_3D[rnd(0, SHAPES_3D.length - 1)];
        return {
          q: `What 3D shape is this? ${target.emoji}`,
          ans: target.name,
          h: () => hWrap('#9bc4cb', '📦', 'Real-World Shapes', hBubble(`${target.emoji} is a <strong>${target.name}</strong> - ${target.hint}.`)),
          opts: shuffle(SHAPES_3D.map(s => s.name))
        };
      } },
    { learn: "Match the clue to the shape!", visual: "round and rolls every way = sphere ⚽", example: "flat square faces = cube 🎲",
      gen: () => {
        const target = SHAPES_3D[rnd(0, SHAPES_3D.length - 1)];
        return {
          q: `Which shape is ${target.hint}?`,
          ans: target.name,
          h: () => hWrap('#9bc4cb', '📦', 'Shape Clues', hBubble(`${target.hint} describes a <strong>${target.name}</strong> ${target.emoji}`)),
          opts: shuffle(SHAPES_3D.map(s => s.name))
        };
      } }
  ],
  counting_120: [
    { learn: "Count forward! Each number is one more than the last.", visual: "45, 46, 47, __, 49 → 48", example: "97, 98, __, 100 → 99",
      gen: () => {
        let start = rnd(1, 116);
        let seq = [start, start + 1, start + 2, start + 3];
        let hideIdx = rnd(1, 2);
        let ans = seq[hideIdx];
        let shown = seq.map((n, i) => i === hideIdx ? '__' : n);
        return {
          q: `${shown.join(', ')}`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Count Forward', hBubble(`Counting up by 1: ${seq.join(', ')}. Missing number = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, ans + 2, Math.max(0, ans - 2)])
        };
      } },
    { learn: "Count backward! Each number is one less than the last.", visual: "72, 71, 70, __, 68 → 69", example: "50, 49, __, 47 → 48",
      gen: () => {
        let start = rnd(5, 120);
        let seq = [start, start - 1, start - 2, start - 3];
        let hideIdx = rnd(1, 2);
        let ans = seq[hideIdx];
        let shown = seq.map((n, i) => i === hideIdx ? '__' : n);
        return {
          q: `${shown.join(', ')}`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Count Backward', hBubble(`Counting down by 1: ${seq.join(', ')}. Missing number = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, ans + 2, ans - 2])
        };
      } }
  ],
  skip_counting: [
    { learn: "Skip-count by 2s! 2, 4, 6, 8, 10...", visual: "2, 4, 6, __, 10 → 8", example: "12, 14, 16",
      gen: () => {
        let start = rnd(0, 20) * 2;
        let seq = [start, start + 2, start + 4, start + 6];
        let ans = seq[3];
        return {
          q: `${seq.slice(0, 3).join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Skip-Count by 2s', hBubble(`Add 2 each time: ${seq.join(', ')}`)),
          opts: dedupOpts(ans, [ans + 2, ans - 2, ans + 1, seq[2]])
        };
      } },
    { learn: "Skip-count by 5s! 5, 10, 15, 20...", visual: "5, 10, 15, __, 25 → 20", example: "30, 35, 40",
      gen: () => {
        let start = rnd(0, 18) * 5;
        let seq = [start, start + 5, start + 10, start + 15];
        let ans = seq[3];
        return {
          q: `${seq.slice(0, 3).join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Skip-Count by 5s', hBubble(`Add 5 each time: ${seq.join(', ')}`)),
          opts: dedupOpts(ans, [ans + 5, ans - 5, ans + 1, seq[2]])
        };
      } }
  ],
  patterns1: [
    { learn: "Repeating patterns repeat! Find what comes next.", visual: "🌟🌙🌟🌙🌟 __ → 🌙", example: "🔴🔵🔴🔵 __ → 🔴",
      gen: () => {
        const pairs = [['🌟', '🌙'], ['🔴', '🔵'], ['🐶', '🐱'], ['🍎', '🍌']];
        const idx = rnd(0, pairs.length - 1);
        const [a, b] = pairs[idx];
        const other = pairs[(idx + 1) % pairs.length];
        let len = rnd(4, 5);
        let seq = Array.from({ length: len }, (_, i) => i % 2 === 0 ? a : b);
        let ans = len % 2 === 0 ? a : b;
        return {
          q: `${seq.join('')} __ ?`,
          ans,
          h: () => hWrap('#9bc4cb', '🔁', 'Repeating Pattern', hBubble(`The pattern repeats: ${a}${b} ${a}${b}... Next is <strong>${ans}</strong>`)),
          opts: shuffle([a, b, other[0], other[1]])
        };
      } },
    { learn: "Growing patterns! Find the rule, then keep going.", visual: "2, 4, 6, 8, __ → 10 (rule: +2)", example: "5, 8, 11, __ → 14 (rule: +3)",
      gen: () => {
        let s = rnd(1, 6), d = rnd(2, 5);
        let seq = [s, s + d, s + 2 * d, s + 3 * d];
        let ans = seq[3] + d;
        return {
          q: `${seq.join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#9bc4cb', '🔁', 'Growing Pattern', hBubble(`Each number goes up by <strong>${d}</strong>: ${seq.join(', ')}, ${ans}`)),
          opts: dedupOpts(ans, [ans - d, ans + 1, ans - 1, seq[3]])
        };
      } }
  ],
  calendar_seasons: [
    { learn: "The days of the week repeat: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.", visual: "Monday, Tuesday, __ → Wednesday", example: "After Friday comes Saturday",
      gen: () => {
        let i = rnd(0, 6);
        let ans = DAYS[(i + 1) % 7];
        return {
          q: `What day comes after ${DAYS[i]}?`,
          ans,
          h: () => hWrap('#ffb6d1', '📅', 'Days of the Week', hBubble(`${DAYS.join(' → ')} → back to ${DAYS[0]}!<br>After <strong>${DAYS[i]}</strong> comes <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: shuffle([ans, DAYS[(i + 2) % 7], DAYS[(i + 6) % 7], DAYS[i]])
        };
      } },
    { learn: "There are 4 seasons: Winter, Spring, Summer, Fall. Each season has 3 months.", visual: "December, January, February = Winter ❄️", example: "June, July, August = Summer ☀️",
      gen: () => {
        let m = rnd(0, 11);
        let ans = SEASON_OF_MONTH[m];
        return {
          q: `What season is ${MONTHS[m]} in?`,
          ans,
          h: () => hWrap('#ffb6d1', '🍂', 'Seasons', hBubble(`${MONTHS[m]} is in <strong style="color:#9bc4cb;">${ans}</strong>. Winter❄️=Dec/Jan/Feb, Spring🌸=Mar/Apr/May, Summer☀️=Jun/Jul/Aug, Fall🍂=Sep/Oct/Nov`)),
          opts: ['Winter', 'Spring', 'Summer', 'Fall']
        };
      } }
  ],
  coin_id: [
    { learn: "Penny=1¢, nickel=5¢, dime=10¢, quarter=25¢. Learn the coin names!", visual: "🟤 penny = 1¢   ⚪ nickel = 5¢   ⚪ dime = 10¢   ⚪ quarter = 25¢", example: "A dime is worth 10¢",
      gen: () => {
        const c = COINS[rnd(0, COINS.length - 1)];
        return {
          q: `How much is a ${c.name} worth?`,
          ans: `${c.value}¢`,
          h: () => hWrap('#c4a5ff', '💰', 'Coin Values', hBubble(`A <strong>${c.name}</strong> is worth <strong style="color:#9bc4cb;">${c.value}¢</strong>`)),
          opts: shuffle(COINS.map(x => `${x.value}¢`))
        };
      } },
    { learn: "Match the value back to the coin name!", visual: "25¢ = quarter   10¢ = dime   5¢ = nickel   1¢ = penny", example: "5¢ is a nickel",
      gen: () => {
        const c = COINS[rnd(0, COINS.length - 1)];
        return {
          q: `Which coin is worth ${c.value}¢?`,
          ans: c.name,
          h: () => hWrap('#c4a5ff', '💰', 'Coin Names', hBubble(`${c.value}¢ is a <strong style="color:#9bc4cb;">${c.name}</strong>`)),
          opts: shuffle(COINS.map(x => x.name))
        };
      } }
  ],
  data_graphs1: [
    { learn: "Tally marks count in groups of 5! IIII with a line through = 5.", visual: "🐶 tally: 5 → count the marks", example: "IIII (crossed) + II = 7",
      gen: () => {
        const animals = shuffle(['🐶', '🐱', '🐰']);
        const data = animals.map(a => ({ label: a, value: rnd(2, 12) }));
        const target = data[rnd(0, data.length - 1)];
        return {
          q: `How many ${target.label} are there?<br>${vTallyGraph(data, { theme: TRACK_THEME.grade1 })}`,
          ans: target.value,
          h: () => hWrap('#ffb6d1', '📊', 'Count the Tally Marks', hBubble(`Each group of 5 marks (IIII with a line through) = 5. Count the groups, then add extra marks: <strong style="color:#9bc4cb;">${target.value}</strong>`)),
          opts: dedupOpts(target.value, [target.value + 1, target.value - 1, target.value + 2, target.value - 2])
        };
      } },
    { learn: "Picture graphs use pictures to show how many! Count the pictures.", visual: "⭐⭐⭐⭐ = 4", example: "Count the stars to find the total",
      gen: () => {
        const fruits = shuffle(['🍎', '🍌', '🍇']);
        const data = fruits.map(f => ({ label: f, value: rnd(2, 8) }));
        const target = data[rnd(0, data.length - 1)];
        return {
          q: `How many ${target.label} are there?<br>${vPictograph(data, { theme: TRACK_THEME.grade1 })}`,
          ans: target.value,
          h: () => hWrap('#ffb6d1', '📊', 'Count the Pictures', hBubble(`Count each ${target.label}: <strong style="color:#9bc4cb;">${target.value}</strong>`)),
          opts: dedupOpts(target.value, [target.value + 1, target.value - 1, target.value + 2, target.value - 2])
        };
      } }
  ],
  halves_fourths: [
    { learn: "A half means 1 of 2 equal parts. Half of the shape is shaded!", visual: vFractionBar(1, 2, { theme: TRACK_THEME.grade1 }), example: "1 out of 2 parts = a half",
      gen: () => {
        let num = Math.random() < 0.5 ? 1 : (Math.random() < 0.5 ? 0 : 2);
        return {
          q: `Is this shape divided into halves, with one half shaded?<br>${vFractionBar(num, 2, { theme: TRACK_THEME.grade1 })}`,
          ans: num === 1 ? 'yes' : 'no',
          h: () => hWrap('#9bc4cb', '🥧', 'Halves', hBubble(`A half is 1 out of 2 equal parts shaded. This shows ${num} out of 2 shaded, so the answer is <strong>${num === 1 ? 'YES ✅' : 'NO ❌'}</strong>.`)),
          opts: shuffle(['yes', 'no'])
        };
      } },
    { learn: "A fourth (quarter) means 1 of 4 equal parts.", visual: vFractionBar(1, 4, { theme: TRACK_THEME.grade1 }), example: "1 out of 4 parts = a fourth",
      gen: () => {
        let num = rnd(0, 4);
        let isFourth = num === 1;
        return {
          q: `Does this show a FOURTH shaded (1 out of 4 equal parts)?<br>${vFractionBar(num, 4, { theme: TRACK_THEME.grade1 })}`,
          ans: isFourth ? 'yes' : 'no',
          h: () => hWrap('#9bc4cb', '🥧', 'Fourths', hBubble(`A fourth is 1 out of 4 equal parts shaded. This shows ${num} out of 4 shaded, so the answer is <strong>${isFourth ? 'YES ✅' : 'NO ❌'}</strong>.`)),
          opts: shuffle(['yes', 'no'])
        };
      } }
  ],
  financial_literacy1: [
    { learn: "Earning money means working to get paid! Saving means keeping money for later.", visual: "🧹 do chores → 💰 earn money → 🐷 save some!", example: "Doing a job for money is called earning",
      gen: () => {
        const scenarios = [
          { q: "Safia walks the neighbor's dog and gets paid $2. What is this called?", ans: "earning" },
          { q: "Labubu puts his allowance in a piggy bank instead of spending it. What is this called?", ans: "saving" },
          { q: "Peach uses her money to buy a toy. What is this called?", ans: "spending" }
        ];
        const s = scenarios[rnd(0, scenarios.length - 1)];
        return {
          q: s.q,
          ans: s.ans,
          h: () => hWrap('#ffb6d1', '💵', 'Money Words', hBubble(`<strong>Earning</strong> = getting paid for work.<br><strong>Saving</strong> = keeping money for later.<br><strong>Spending</strong> = using money to buy something.<br>This is <strong style="color:#9bc4cb;">${s.ans}</strong>.`)),
          opts: shuffle(['earning', 'saving', 'spending'])
        };
      } },
    { learn: "Giving means sharing what you have with others, like donating to charity.", visual: "🎁 give toys to kids who need them = giving/sharing", example: "Donating old toys is giving",
      gen: () => {
        const scenarios = [
          { q: "Hello Kitty gives some of her old books to a school that needs them. What is this called?", ans: "giving" },
          { q: "Safia shares half her cookies with her friend. What is this called?", ans: "giving" },
          { q: "Labubu keeps all his stickers only for himself. What is this called?", ans: "keeping" }
        ];
        const s = scenarios[rnd(0, scenarios.length - 1)];
        return {
          q: s.q,
          ans: s.ans,
          h: () => hWrap('#ffb6d1', '🎁', 'Giving', hBubble(`<strong>Giving</strong> means sharing what you have with others who need it. This is <strong style="color:#9bc4cb;">${s.ans}</strong>.`)),
          opts: shuffle(['giving', 'keeping', 'spending'])
        };
      } }
  ],

  // K/1st Grade - Phase 6 additions
  word_problems1: [
    { learn: "Comparison word problems: find the difference to see how many more or fewer!", visual: "🐶🐶🐶🐶🐶 vs 🐱🐱🐱 - how many more dogs?", example: "5 dogs, 3 cats → 2 more dogs",
      gen: () => {
        let a = rnd(5, 12), b = rnd(2, a - 2);
        let animals = shuffle(['🐶', '🐱', '🐰', '🐸']).slice(0, 2);
        let askMore = Math.random() < 0.5;
        return {
          q: askMore
            ? `There are ${a} ${animals[0]} and ${b} ${animals[1]}. How many more ${animals[0]} than ${animals[1]}?`
            : `There are ${a} ${animals[0]} and ${b} ${animals[1]}. How many fewer ${animals[1]} than ${animals[0]}?`,
          ans: a - b,
          h: () => subtractHint(a, b),
          opts: dedupOpts(a - b, [a - b + 1, a - b - 1, a, b])
        };
      } },
    { learn: "Some word problems give you the total and ask what's missing at the start!", visual: "Had some, got 4 more, now has 9. Started with 5.", example: "?+4=9 → ?=5",
      gen: () => {
        let start = rnd(2, 9), gained = rnd(1, 8), total = start + gained;
        return {
          q: `Safia had some stickers. She got ${gained} more and now has ${total}. How many did she start with?`,
          ans: start,
          h: () => missingAddHint(total, gained),
          opts: dedupOpts(start, [start + 1, start - 1, gained, total])
        };
      } }
  ],
  ordinals1: [
    { learn: "Ordinal numbers tell position: 1st, 2nd, 3rd, 4th... up to 10th!", visual: "🥇1st 🥈2nd 🥉3rd 4th 5th...", example: "The 3rd animal in the row",
      gen: () => {
        const ordWords = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        const animals = ['🐶', '🐱', '🐰', '🐸', '🐻', '🦊', '🐼', '🐨', '🐵', '🐷'];
        let n = rnd(1, 8);
        let row = animals.slice(0, n + 2);
        let targetIdx = rnd(0, row.length - 1);
        let correct = row[targetIdx];
        let others = row.filter((_, i) => i !== targetIdx);
        let distractors = shuffle(others.slice()).slice(0, Math.min(3, others.length));
        return {
          q: `${row.join(' ')}<br>Which animal is ${ordWords[targetIdx]}?`,
          ans: correct,
          h: () => hWrap('#ffb6d1', '🔢', 'Ordinal Numbers', hBubble(`Count from the left: ${row.map((a, i) => `${ordWords[i]}=${a}`).join(', ')}`)),
          opts: shuffle([correct, ...distractors])
        };
      } }
  ],
  bar_graphs1: [
    { learn: "Bar graphs show 'how many' with tall bars! Find the bar and read the number.", visual: vBarGraph([{ label: '🐶', value: 3 }, { label: '🐱', value: 5 }], { theme: TRACK_THEME.grade1 }), example: "Taller bar = more",
      gen: () => {
        const animals = shuffle(['🐶', '🐱', '🐰']).slice(0, 2);
        const data = animals.map(a => ({ label: a, value: rnd(2, 8) }));
        const target = data[rnd(0, 1)];
        return {
          q: `How many ${target.label} are there?<br>${vBarGraph(data, { theme: TRACK_THEME.grade1 })}`,
          ans: target.value,
          h: () => hintBarGraph(data, target.label, target.value),
          opts: dedupOpts(target.value, [target.value + 1, target.value - 1, target.value + 2])
        };
      } }
  ],
  coin_counting1: [
    { learn: "Count a group of the same coin! Pennies=1¢ each, nickels=5¢ each.", visual: "🟤🟤🟤🟤 = 4 pennies = 4¢", example: "5 pennies = 5¢",
      gen: () => {
        const isPenny = Math.random() < 0.5;
        const value = isPenny ? 1 : 5;
        const emoji = isPenny ? '🟤' : '⚪';
        const name = isPenny ? 'penny' : 'nickel';
        const plural = isPenny ? 'pennies' : 'nickels';
        let n = rnd(2, 8);
        return {
          q: `${emoji.repeat(n)}<br>How much money is that? (${n} ${plural})`,
          ans: n * value,
          h: () => hWrap('#c4a5ff', '💰', 'Count Like Coins', hBubble(`Each ${name} = ${value}¢. Count by ${value}s, ${n} times: <strong style="color:#9bc4cb;">${n * value}¢</strong>`)),
          opts: dedupOpts(n * value, [n * value + value, n * value - value, n])
        };
      } },
    { learn: "Count dimes! Each dime = 10¢. Count by 10s.", visual: "🪙🪙🪙 = 3 dimes = 30¢", example: "6 dimes = 60¢",
      gen: () => {
        let n = rnd(2, 9);
        return {
          q: `${'🪙'.repeat(n)}<br>How much money is that? (${n} dimes)`,
          ans: n * 10,
          h: () => hWrap('#c4a5ff', '💰', 'Count Dimes', hBubble(`Count by 10s: ${Array.from({ length: n }, (_, i) => (i + 1) * 10).join(', ')}`)),
          opts: dedupOpts(n * 10, [n * 10 + 10, n * 10 - 10, n])
        };
      } }
  ],
  venn1: [
    { learn: "A Venn diagram sorts things into two circles! Things that belong to both groups go in the middle.", visual: vVennDiagram([{ emoji: '🔺', region: 'left' }, { emoji: '⭐', region: 'both' }, { emoji: '🔵', region: 'right' }], TRACK_THEME.grade1), example: "Middle = belongs to both groups",
      gen: () => {
        const pool = ['🔺', '⭐', '🔵', '🟦', '🟢', '🟨'];
        const shuffled = shuffle(pool.slice());
        const leftCount = rnd(1, 2), rightCount = rnd(1, 2), bothCount = rnd(1, 2);
        let items = [], idx = 0;
        for (let i = 0; i < leftCount; i++) items.push({ emoji: shuffled[idx++], region: 'left' });
        for (let i = 0; i < rightCount; i++) items.push({ emoji: shuffled[idx++], region: 'right' });
        for (let i = 0; i < bothCount; i++) items.push({ emoji: shuffled[idx++], region: 'both' });
        const askRegion = ['left', 'right', 'both'][rnd(0, 2)];
        const ans = items.filter(it => it.region === askRegion).length;
        const regionName = askRegion === 'both' ? 'both circles' : askRegion === 'left' ? 'only the left circle' : 'only the right circle';
        return {
          q: `How many shapes are in ${regionName}?<br>${vVennDiagram(items, TRACK_THEME.grade1)}`,
          ans,
          h: () => hWrap('#9bc4cb', '⭕', 'Venn Diagram', hBubble(`Count the shapes in ${regionName}: <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, Math.max(0, ans - 1), leftCount + rightCount + bothCount])
        };
      } },
    { learn: "Sort a shape into the right group by checking its properties!", visual: "Group A: has 4 sides. Group B: is round.", example: "A square goes in Group A (4 sides)",
      gen: () => {
        const rules = [
          { groupA: 'has 4 sides', groupB: 'has 3 sides', shapes: [['square', 'A'], ['rectangle', 'A'], ['rhombus', 'A'], ['triangle', 'B']] },
          { groupA: 'is round', groupB: 'has straight sides', shapes: [['circle', 'A'], ['square', 'B'], ['triangle', 'B'], ['hexagon', 'B']] }
        ];
        const rule = rules[rnd(0, rules.length - 1)];
        const [shape, correctGroup] = rule.shapes[rnd(0, rule.shapes.length - 1)];
        return {
          q: `Group A: ${rule.groupA}. Group B: ${rule.groupB}. Which group does a ${shape} belong to?`,
          ans: correctGroup,
          h: () => hWrap('#9bc4cb', '⭕', 'Sort by Property', hBubble(`A ${shape} ${correctGroup === 'A' ? rule.groupA : rule.groupB} → Group <strong style="color:#9bc4cb;">${correctGroup}</strong>`)),
          opts: ['A', 'B']
        };
      } }
  ],

  // 2nd Grade
  add2: [
    { learn: "Add tens: 30+20 = 50 (like 3+2 with a zero!)", visual: "📦📦📦 + 📦📦 = 📦📦📦📦📦 (50)", example: "30+20=50",
      gen: () => { let a = rnd(2, 4) * 10, b = rnd(1, 3) * 10; return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 10, a + b - 10, a]) }; } },
    { learn: "Add 2-digit numbers, no regrouping.", visual: "34 + 25: ones 4+5=9, tens 3+2=5 → 59", example: "34+25=59",
      gen: () => { let a, b, g = 0; do { a = rnd(11, 54); b = rnd(11, 44); g++; } while (((a % 10) + (b % 10) > 9 || a + b > 99) && g < 200); return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 1, a + b + 10, a + b - 1]) }; } },
    { learn: "Carry! When ones add to more than 9.", visual: "15+17: 5+7=12 → write 2, carry 1 → 32", example: "15+17=32",
      gen: () => { let a, b, g = 0; do { a = rnd(14, 67); b = rnd(13, 55); g++; } while (((a % 10) + (b % 10) < 10 || a + b > 99) && g < 200); return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 1, a + b + 10, a + b - 1]) }; } },
    { learn: "Missing addend: ? + 14 = 30 → subtract!", visual: "30 − 14 = 16, so ? = 16", example: "? + 14 = 30",
      gen: () => { let a = rnd(11, 25), total = rnd(a + 5, 50); return { q: `? + ${a} = ${total}`, ans: total - a, h: () => missingAddHint(total, a), opts: shuffle([total - a, total - a + 1, total - a - 1, a]) }; } },
    { learn: "Add three 2-digit numbers  -  step by step!", visual: "12+23+14: first 12+23=35, then 35+14=49", example: "12+23+14=49",
      gen: () => { let a = rnd(10, 25), b = rnd(10, 25), c = rnd(10, 25); while (a + b + c > 95) c = rnd(10, 20); return { q: `${a} + ${b} + ${c} = ?`, ans: a + b + c, h: () => addThreeHint(a, b, c), opts: shuffle([a + b + c, a + b + c + 1, a + b + c - 1, a + b]) }; } }
  ],
  sub2: [
    { learn: "Subtract tens: 50−20=30 (like 5−2 with a zero!)", visual: "📦📦📦📦📦 − 📦📦 = 📦📦📦", example: "50−20=30",
      gen: () => { let a = rnd(4, 7) * 10, b = rnd(1, 3) * 10; return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 10, a - b - 10, a]) }; } },
    { learn: "Subtract 2-digit, no borrowing.", visual: "56−23: ones 6−3=3, tens 5−2=3 → 33", example: "56−23=33",
      gen: () => { let a, b, g = 0; do { a = rnd(30, 80); b = rnd(11, a - 10); g++; } while (((a % 10) < (b % 10)) && g < 200); return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 1, a - b + 10, a - b - 1]) }; } },
    { learn: "Borrow! When ones are too small.", visual: "32−18: 2<8, borrow! 12−8=4, 2−1=2 → 14", example: "32−18=14",
      gen: () => { let a, b, g = 0; do { a = rnd(22, 91); b = rnd(13, a - 5); g++; } while (((a % 10) >= (b % 10) || a - b < 5) && g < 200); return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: shuffle([a - b, a - b + 1, a - b - 1, a - b + 10]) }; } },
    { learn: "Missing subtrahend: 25 − ? = 13 → 25−13=12", visual: "25−?=13 → 25−13=12", example: "25−12=13",
      gen: () => { let total = rnd(20, 60), result = rnd(5, total - 10); return { q: `${total} − ? = ${result}`, ans: total - result, h: () => missingSubHint(total, result), opts: shuffle([total - result, total - result + 1, total - result - 1, result]) }; } },
    { learn: "Subtract three numbers step by step!", visual: "75−28−19: first 75−28=47, then 47−19=28", example: "75−28−19=28",
      gen: () => { let t = rnd(50, 85), b, c, g = 0; do { b = rnd(10, t - 20); c = rnd(5, t - b - 10); g++; } while ((t - b - c < 5 || t - b - c > 40) && g < 200); return { q: `${t} − ${b} − ${c} = ?`, ans: t - b - c, h: () => subThreeHint(t, b, c), opts: shuffle([t - b - c, t - b - c + 1, t - b - c - 1, t - b]) }; } }
  ],
  numberline_add2: [
    { learn: "A number line helps you add! Start at the first number, then hop forward.",
      visual: vNumberLine(0, 20, { theme: TRACK_THEME.grade2, jumpFrom: 4, jumpTo: 11, point: 4 }), example: "4 + 7: start at 4, hop 7 → 11",
      gen: () => {
        let a = rnd(3, 12), b = rnd(2, 8);
        return {
          q: `${a} + ${b} = ?<br>${vNumberLine(0, a + b + 3, { theme: TRACK_THEME.grade2, jumpFrom: a, jumpTo: a + b, point: a })}`,
          ans: a + b,
          h: () => hintNumberLineJump(a, b, a + b),
          opts: shuffle([a + b, a + b + 1, a + b - 1, a])
        };
      } },
    { learn: "For 2-digit numbers, hop by tens first, then by ones!",
      visual: vNumberLine(0, 100, { theme: TRACK_THEME.grade2, step: 10, jumpFrom: 20, jumpTo: 50 }), example: "20 + 30: hop 3 tens → 50",
      gen: () => {
        let a = rnd(1, 5) * 10, b = rnd(1, 4) * 10;
        return {
          q: `${a} + ${b} = ?<br>${vNumberLine(0, 100, { theme: TRACK_THEME.grade2, step: 10, jumpFrom: a, jumpTo: a + b })}`,
          ans: a + b,
          h: () => hintNumberLineJump(a, b, a + b),
          opts: shuffle([a + b, a + b + 10, a + b - 10, a])
        };
      } }
  ],
  money: [
    { learn: "Penny=1¢, nickel=5¢, dime=10¢, quarter=25¢", visual: "🟤1¢ 🔘5¢ 🪙10¢ 🥈25¢", example: "2 dimes=20¢",
      gen: () => { let d = rnd(1, 5); return { q: `${d} dime${d > 1 ? 's' : ''} = __¢?`, ans: d * 10, h: () => hWrap('#c4a5ff', '💰', 'Dimes', hBubble(`Each dime = 10¢. Count by 10s: ${Array.from({ length: d }, (_, i) => (i + 1) * 10).join(', ')}`)), opts: shuffle([d * 10, d * 10 + 5, d * 10 - 5, d * 5]) }; } },
    { learn: "Count nickels: 5, 10, 15, 20...", visual: "🔘🔘🔘🔘 = 4×5 = 20¢", example: "4 nickels=20¢",
      gen: () => { let n = rnd(2, 6); return { q: `${n} nickels = __¢?`, ans: n * 5, h: () => hWrap('#c4a5ff', '💰', 'Nickels', hBubble(`Each nickel=5¢. Count by 5s: ${Array.from({ length: n }, (_, i) => (i + 1) * 5).join(', ')}`)), opts: shuffle([n * 5, n * 5 + 5, n * 5 - 5, n * 10]) }; } },
    { learn: "Add coins together  -  count biggest first.", visual: "Quarter+dime+nickel = 25+10+5 = 40¢", example: "40¢",
      gen: () => { let q = rnd(0, 1) * 25, d = rnd(1, 3) * 10, n = rnd(0, 1) * 5; return { q: `${q > 0 ? '1 quarter + ' : ''}${d / 10} dime${d > 10 ? 's' : ''} + ${n > 0 ? '1 nickel' : ''} = __¢?`, ans: q + d + n, h: () => hWrap('#c4a5ff', '💰', 'Add Coins', hBubble(`${q}+${d}+${n} = <strong>${q + d + n}¢</strong>`)), opts: shuffle([q + d + n, q + d + n + 5, q + d + n - 5, q + d]) }; } },
    { learn: "How much change? Start with what you paid.", visual: "Pay 50¢ for 32¢ item → 50−32=18¢ change", example: "18¢",
      gen: () => { let cost = rnd(11, 45), paid = [50, 25, 75][rnd(0, 2)]; while (paid < cost) paid = 100; return { q: `Pay ${paid}¢ for a ${cost}¢ item. Change = ?`, ans: paid - cost, h: () => subtractHint(paid, cost), opts: shuffle([paid - cost, paid - cost + 5, paid - cost - 5, cost]) }; } },
    { learn: "Dollar = 100¢. How many quarters?", visual: "🥈🥈🥈🥈 = 4×25 = 100¢ = $1", example: "4 quarters = $1",
      gen: () => { let q = rnd(2, 8); return { q: `${q * 25}¢ = how many quarters?`, ans: q, h: () => hWrap('#c4a5ff', '💰', 'Quarters', hBubble(`Each quarter=25¢. ${q * 25}÷25 = <strong>${q}</strong>`)), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } }
  ],
  measure: [
    { learn: "Measure with a ruler! Count the inches.", visual: "📏 ➖➖➖ = 3 inches", example: "3 inches",
      gen: () => { let m = rnd(1, 8); return { q: `A pencil is ${m} inches long. How many inches?`, ans: m, h: () => hWrap('#c4a5ff', '📏', 'Measure', hBubble(`Count the marks: <strong>${m}</strong> inches`)), opts: shuffle([m, m + 1, m - 1, m + 2]) }; } },
    { learn: "cm vs inches: 1 inch ≈ 2.5 cm. CM are smaller.", visual: "📏 1 inch = about 2.5 cm", example: "1in≈2.5cm",
      gen: () => { let m = rnd(2, 8); return { q: `${m} inches is about how many cm? (1in≈2.5cm)`, ans: Math.round(m * 2.5), h: () => hWrap('#c4a5ff', '📏', 'Inches to cm', hBubble(`${m} × 2.5 = <strong>${m * 2.5}</strong>`)), opts: shuffle([Math.round(m * 2.5), Math.round(m * 2.5) + 2, Math.round(m * 2.5) - 2, m]) }; } },
    { learn: "Compare lengths! Which is longer?", visual: "Snake 🐍 (8cm) vs worm 🪱 (5cm)  -  snake is longer", example: "8>5",
      gen: () => { let a = rnd(3, 12), b = rnd(3, 12); while (a === b) b = rnd(3, 12); return { q: `Object A = ${a}cm, Object B = ${b}cm. Which is longer?`, ans: a > b ? `A (${a}cm)` : `B (${b}cm)`, h: () => hWrap('#c4a5ff', '📏', 'Compare', hBubble(`${a} vs ${b}  -  ${Math.max(a, b)} is bigger`)), opts: [`A (${a}cm)`, `B (${b}cm)`, `Same`, `Can't tell`] }; } },
    { learn: "Add lengths: 5cm + 3cm = 8cm.", visual: "📏5cm + 📏3cm = 📏8cm", example: "8cm",
      gen: () => { let a = rnd(3, 10), b = rnd(2, 8); return { q: `${a}cm + ${b}cm = ?`, ans: a + b, h: () => addHint(a, b), opts: shuffle([a + b, a + b + 1, a + b - 1, a]) }; } },
    { learn: "Perimeter = all sides added together!", visual: "🟦 side 4cm × 4 sides = 16cm perimeter", example: "Perimeter=16",
      gen: () => { let s = rnd(2, 6); return { q: `Square with sides ${s}cm. Perimeter = ?`, ans: s * 4, h: () => hWrap('#c4a5ff', '📐', 'Perimeter', hBubble(`4 sides × ${s}cm = <strong>${s * 4}cm</strong>`)), opts: shuffle([s * 4, s * 4 + 2, s * 4 - 2, s * 2]) }; } }
  ],
  graph_read1: [
    { learn: "Bar graphs show amounts as tall bars. Taller bar = more!",
      visual: vBarGraph([{ label: '🐶', value: 4 }, { label: '🐱', value: 7 }, { label: '🐰', value: 3 }], { theme: TRACK_THEME.grade2 }), example: "Find the bar, read the number on top",
      gen: () => {
        const animals = shuffle(['🐶', '🐱', '🐰', '🐸']);
        const data = animals.slice(0, 3).map(a => ({ label: a, value: rnd(2, 9) }));
        const target = data[rnd(0, 2)];
        return {
          q: `How many ${target.label} are there?<br>${vBarGraph(data, { theme: TRACK_THEME.grade2 })}`,
          ans: target.value,
          h: () => hintBarGraph(data, target.label, target.value),
          opts: shuffle([target.value, target.value + 1, target.value - 1, target.value + 2])
        };
      } },
    { learn: "Compare two bars: subtract to find how many more!",
      visual: vBarGraph([{ label: 'A', value: 6 }, { label: 'B', value: 3 }], { theme: TRACK_THEME.grade2 }), example: "6 − 3 = 3 more",
      gen: () => {
        let a = rnd(4, 10), b = rnd(2, a - 1);
        const data = [{ label: 'A', value: a }, { label: 'B', value: b }];
        return {
          q: `How many more A than B?<br>${vBarGraph(data, { theme: TRACK_THEME.grade2 })}`,
          ans: a - b,
          h: () => subtractHint(a, b),
          opts: shuffle([a - b, a - b + 1, a - b - 1, a])
        };
      } }
  ],

  // 2nd Grade - Phase 3 additions
  place2: [
    { learn: "Each digit has a place: hundreds, tens, ones. Its worth depends on its position!", visual: "352 → 3 hundreds, 5 tens, 2 ones", example: "In 352, the 5 is worth 50",
      gen: () => {
        let h = rnd(1, 9), t = rnd(0, 9), o = rnd(0, 9);
        let n = h * 100 + t * 10 + o;
        const positions = [{ name: 'hundreds', val: h, worth: h * 100 }, { name: 'tens', val: t, worth: t * 10 }, { name: 'ones', val: o, worth: o }];
        const p = positions[rnd(0, 2)];
        return {
          q: `In the number ${n}, what is the value of the digit in the ${p.name} place?`,
          ans: p.worth,
          h: () => hWrap('#c4a5ff', '📦', 'Place Value', hBubble(`${n} = ${h} hundreds + ${t} tens + ${o} ones.<br>The ${p.name} digit (${p.val}) is worth <strong style="color:#9bc4cb;">${p.worth}</strong>`)),
          opts: dedupOpts(p.worth, [p.val, p.worth + 10, p.worth - 10, p.worth + 100])
        };
      } },
    { learn: "Build a 3-digit number from hundreds, tens, and ones!", visual: "4 hundreds + 3 tens + 6 ones = 436", example: "436",
      gen: () => {
        let h = rnd(1, 9), t = rnd(0, 9), o = rnd(0, 9);
        let ans = h * 100 + t * 10 + o;
        return {
          q: `${h} hundreds + ${t} tens + ${o} ones = ?`,
          ans,
          h: () => hWrap('#c4a5ff', '📦', 'Build the Number', hBubble(`${h}×100=${h * 100}, ${t}×10=${t * 10}, +${o} = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 10, ans - 10, ans + 100, ans + 1])
        };
      } }
  ],
  numbers_forms: [
    { learn: "Expanded form breaks a number into hundreds + tens + ones!", visual: "352 = 300 + 50 + 2", example: "436 = 400 + 30 + 6",
      gen: () => {
        let h = rnd(1, 9), t = rnd(0, 9), o = rnd(0, 9);
        let n = h * 100 + t * 10 + o;
        let ans = `${h * 100} + ${t * 10} + ${o}`;
        let pool = [`${h * 100} + ${o * 10} + ${t}`, `${h * 10} + ${t * 100} + ${o}`, `${(h + 1) * 100} + ${t * 10} + ${o}`, `${h * 100} + ${(t + 1) * 10} + ${o}`];
        return {
          q: `Write ${n} in expanded form.`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Expanded Form', hBubble(`${n} = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, pool)
        };
      } },
    { learn: "Number words! Learn to read numbers written as words.", visual: "245 = two hundred forty-five", example: "108 = one hundred eight",
      gen: () => {
        const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tensWords = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        function numToWords(n) {
          let h = Math.floor(n / 100), rem = n % 100;
          let parts = [];
          if (h) parts.push(`${ones[h]} hundred`);
          if (rem) {
            if (rem < 20) parts.push(ones[rem]);
            else {
              let t = Math.floor(rem / 10), o = rem % 10;
              parts.push(o ? `${tensWords[t]}-${ones[o]}` : tensWords[t]);
            }
          }
          return parts.join(' ') || 'zero';
        }
        let n = rnd(101, 899);
        let ans = numToWords(n);
        let wrongN1 = n + 10 <= 999 ? n + 10 : n - 10;
        let wrongN2 = n + 100 <= 999 ? n + 100 : n - 100;
        return {
          q: `Which number is written as "${ans}"?`,
          ans: n,
          h: () => hWrap('#c4a5ff', '🔤', 'Number Words', hBubble(`"${ans}" = <strong style="color:#9bc4cb;">${n}</strong>`)),
          opts: dedupOpts(n, [wrongN1, wrongN2, n + 1])
        };
      } }
  ],
  add_sub_1000: [
    { learn: "Add 3-digit numbers! Line up hundreds, tens, and ones.", visual: "234 + 158: ones 4+8=12, tens 3+5+1=9, hundreds 2+1=3 → 392", example: "234+158=392",
      gen: () => {
        let a = rnd(110, 600), b = rnd(110, 390);
        while (a + b > 999) b = rnd(110, 300);
        return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: dedupOpts(a + b, [a + b + 1, a + b - 1, a + b + 10, a + b - 10]) };
      } },
    { learn: "Subtract 3-digit numbers! Borrow across columns if needed.", visual: "523 − 178 = 345", example: "523−178=345",
      gen: () => {
        let a = rnd(200, 950), b = rnd(100, a - 50);
        return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: dedupOpts(a - b, [a - b + 1, a - b - 1, a - b + 10, a - b - 10]) };
      } }
  ],
  rounding: [
    { learn: "Round to the nearest 10! Look at the ones digit: 5 or more rounds UP.", visual: "23 → 20   ·   27 → 30", example: "34 rounds to 30",
      gen: () => {
        let n = rnd(11, 989);
        let ones = n % 10;
        let ans = ones >= 5 ? n - ones + 10 : n - ones;
        return {
          q: `Round ${n} to the nearest 10.`,
          ans,
          h: () => hWrap('#c4a5ff', '🎯', 'Round to Nearest 10', hBubble(`Ones digit is ${ones}. ${ones >= 5 ? "That's 5 or more, round UP" : "That's less than 5, round DOWN"} → <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 10, ans - 10, n])
        };
      } },
    { learn: "Round to the nearest 100! Look at the tens digit: 50 or more rounds UP.", visual: "230 → 200   ·   270 → 300", example: "340 rounds to 300",
      gen: () => {
        let n = rnd(101, 989);
        let tensDigit = Math.floor(n / 10) % 10;
        let hundreds = Math.floor(n / 100) * 100;
        let ans = tensDigit >= 5 ? hundreds + 100 : hundreds;
        return {
          q: `Round ${n} to the nearest 100.`,
          ans,
          h: () => hWrap('#c4a5ff', '🎯', 'Round to Nearest 100', hBubble(`Tens digit is ${tensDigit}. ${tensDigit >= 5 ? "That's 5 or more, round UP" : "That's less than 5, round DOWN"} → <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 100, ans - 100, n])
        };
      } }
  ],
  money2: [
    { learn: "Count bigger money! Ten-dollar bills, quarters, and dimes.", visual: "2 ten-dollar bills + 1 quarter + 1 dime = $20.35", example: "$20.35",
      gen: () => {
        let tens = rnd(1, 8), quarters = rnd(0, 3), dimes = rnd(0, 4);
        let cents = tens * 1000 + quarters * 25 + dimes * 10;
        let dollars = (cents / 100).toFixed(2);
        let parts = [`${tens} ten-dollar bill${tens > 1 ? 's' : ''}`];
        if (quarters) parts.push(`${quarters} quarter${quarters > 1 ? 's' : ''}`);
        if (dimes) parts.push(`${dimes} dime${dimes > 1 ? 's' : ''}`);
        return {
          q: `${parts.join(' + ')} = ?`,
          ans: `$${dollars}`,
          h: () => hWrap('#c4a5ff', '💵', 'Count the Money', hBubble(`${tens} × $10 = $${tens * 10}.00<br>${quarters} × 25¢ = ${quarters * 25}¢<br>${dimes} × 10¢ = ${dimes * 10}¢<br>Total = <strong style="color:#9bc4cb;">$${dollars}</strong>`)),
          opts: dedupOpts(`$${dollars}`, [`$${(cents / 100 + 0.25).toFixed(2)}`, `$${(cents / 100 - 0.25).toFixed(2)}`, `$${(cents / 100 + 1).toFixed(2)}`])
        };
      } },
    { learn: "Making change from a $20 bill! Subtract the price from $20.00.", visual: "$20.00 − $14.35 = $5.65 change", example: "$5.65",
      gen: () => {
        let costCents = rnd(200, 1800);
        let costStr = `$${(costCents / 100).toFixed(2)}`;
        let changeStr = `$${((2000 - costCents) / 100).toFixed(2)}`;
        return {
          q: `Pay a $20 bill for a ${costStr} item. How much change?`,
          ans: changeStr,
          h: () => hWrap('#c4a5ff', '💵', 'Making Change', hBubble(`You pay $20.00 for a ${costStr} item.<br>$20.00 − ${costStr} = <strong style="color:#9bc4cb;">${changeStr}</strong>`)),
          opts: dedupOpts(changeStr, [`$${((2000 - costCents + 100) / 100).toFixed(2)}`, `$${((2000 - costCents - 100) / 100).toFixed(2)}`, costStr])
        };
      } }
  ],
  time2: [
    { learn: "Read time to the nearest 5 minutes! Count by 5s around the clock.", visual: vClock(4, 25, TRACK_THEME.grade2), example: "Minute hand on the 5 = :25",
      gen: () => {
        let hour = rnd(1, 12), minute = rnd(0, 11) * 5;
        let ans = `${hour}:${String(minute).padStart(2, '0')}`;
        return {
          q: `What time does the clock show?<br>${vClock(hour, minute, TRACK_THEME.grade2)}`,
          ans,
          h: () => hintClock(hour, minute),
          opts: dedupOpts(ans, [`${hour}:${String((minute + 5) % 60).padStart(2, '0')}`, `${hour}:${String((minute + 55) % 60).padStart(2, '0')}`, `${hour % 12 + 1}:${String(minute).padStart(2, '0')}`])
        };
      } },
    { learn: "A.M. is midnight to noon (morning). P.M. is noon to midnight (afternoon/evening).", visual: "🌅 7:00 AM = morning   🌇 7:00 PM = evening", example: "Breakfast is usually AM",
      gen: () => {
        const events = [
          { text: 'wake up and eat breakfast', ans: 'AM' },
          { text: 'eat dinner with your family', ans: 'PM' },
          { text: 'go to sleep at night', ans: 'PM' },
          { text: 'go to school in the morning', ans: 'AM' },
          { text: 'watch the sunset', ans: 'PM' }
        ];
        const e = events[rnd(0, events.length - 1)];
        return {
          q: `You ${e.text}. Is this usually A.M. or P.M.?`,
          ans: e.ans,
          h: () => hWrap('#fbe158', '🌗', 'AM or PM?', hBubble(`A.M. = midnight to noon (morning). P.M. = noon to midnight (afternoon/night). This is usually <strong style="color:#fbe158;">${e.ans}</strong>.`)),
          opts: shuffle(['AM', 'PM'])
        };
      } },
    { learn: "Elapsed time: how many minutes passed between two clock times?", visual: "2:15 to 2:45 = 30 minutes passed", example: "3:00 to 3:20 = 20 minutes",
      gen: () => {
        let hour = rnd(1, 11);
        let startMin = rnd(0, 6) * 5;
        let elapsed = rnd(1, 5) * 5;
        let endMin = startMin + elapsed;
        return {
          q: `Class starts at ${hour}:${String(startMin).padStart(2, '0')} and ends at ${hour}:${String(endMin).padStart(2, '0')}. How many minutes is that?`,
          ans: elapsed,
          h: () => hWrap('#fbe158', '⏱️', 'Elapsed Time', hBubble(`${hour}:${String(endMin).padStart(2, '0')} − ${hour}:${String(startMin).padStart(2, '0')} = <strong style="color:#fbe158;">${elapsed} minutes</strong>`)),
          opts: dedupOpts(elapsed, [elapsed + 5, elapsed - 5, elapsed + 10])
        };
      } }
  ],
  perimeter2: [
    { learn: "Perimeter of a rectangle: add all 4 sides, or use 2×(length+width).", visual: "Rectangle 5cm×3cm: 2×(5+3)=16cm", example: "Perimeter = 16cm",
      gen: () => {
        let l = rnd(3, 12), w = rnd(2, 10);
        let ans = 2 * (l + w);
        return {
          q: `Rectangle ${l}cm × ${w}cm. Perimeter?`,
          ans,
          h: () => hWrap('#c4a5ff', '📐', 'Perimeter', hBubble(`2 × (${l}+${w}) = 2 × ${l + w} = <strong style="color:#9bc4cb;">${ans}cm</strong>`)),
          opts: dedupOpts(ans, [ans + 2, ans - 2, l * w, l + w])
        };
      } }
  ],
  area1: [
    { learn: "Area = how many unit squares fit inside a shape! Count them all.", visual: vUnitGrid(3, 4, { theme: TRACK_THEME.grade2 }), example: "3 rows × 4 columns = 12 squares",
      gen: () => {
        let rows = rnd(2, 6), cols = rnd(2, 6);
        let ans = rows * cols;
        return {
          q: `Count the unit squares. How many fit in this rectangle?<br>${vUnitGrid(rows, cols, { theme: TRACK_THEME.grade2 })}`,
          ans,
          h: () => hWrap('#9bc4cb', '⬜', 'Count Unit Squares', hBubble(`${rows} rows × ${cols} columns. Count them all: <strong style="color:#9bc4cb;">${ans}</strong> squares.`)),
          opts: dedupOpts(ans, [ans + rows, ans - rows, rows + cols, ans + 1])
        };
      } },
    { learn: "Shortcut! Instead of counting one by one, multiply rows × columns to find area.", visual: vUnitGrid(4, 5, { theme: TRACK_THEME.grade2 }), example: "4 × 5 = 20 square units",
      gen: () => {
        let rows = rnd(3, 8), cols = rnd(3, 8);
        let ans = rows * cols;
        return {
          q: `${rows} rows × ${cols} columns. What is the area?<br>${vUnitGrid(rows, cols, { theme: TRACK_THEME.grade2 })}`,
          ans,
          h: () => hintMultiply(rows, cols),
          opts: dedupOpts(ans, [ans + rows, ans - cols, rows + cols, ans + 1])
        };
      } }
  ],
  line_plots1: [
    { learn: "A line plot shows how many times each value appears, using dots stacked above a number line.", visual: vLinePlot([{ value: 1, count: 2 }, { value: 2, count: 4 }, { value: 3, count: 1 }], { theme: TRACK_THEME.grade2 }), example: "3 dots above '2' means the value 2 appeared 3 times",
      gen: () => {
        let vals = [1, 2, 3, 4, 5];
        let data = vals.map(v => ({ value: v, count: rnd(0, 5) })).filter(d => d.count > 0);
        if (data.length < 2) data.push({ value: vals[rnd(0, 4)], count: rnd(1, 4) });
        let target = data[rnd(0, data.length - 1)];
        return {
          q: `How many data points show the value ${target.value}?<br>${vLinePlot(data, { theme: TRACK_THEME.grade2 })}`,
          ans: target.count,
          h: () => hWrap('#fbe158', '📈', 'Read the Line Plot', hBubble(`Count the dots above ${target.value}: <strong style="color:#fbe158;">${target.count}</strong>`)),
          opts: dedupOpts(target.count, [target.count + 1, Math.max(0, target.count - 1), target.count + 2])
        };
      } },
    { learn: "The mode is the value that appears most often - the tallest stack!", visual: vLinePlot([{ value: 1, count: 1 }, { value: 2, count: 5 }, { value: 3, count: 2 }], { theme: TRACK_THEME.grade2 }), example: "Tallest stack = most common value",
      gen: () => {
        let vals = [1, 2, 3, 4, 5];
        let data, maxCount, modes, guard = 0;
        do {
          data = vals.map(v => ({ value: v, count: rnd(1, 6) }));
          maxCount = Math.max(...data.map(d => d.count));
          modes = data.filter(d => d.count === maxCount);
          guard++;
        } while (modes.length > 1 && guard < 50);
        let ans = modes[0].value;
        return {
          q: `Which value appears most often (tallest stack)?<br>${vLinePlot(data, { theme: TRACK_THEME.grade2 })}`,
          ans,
          h: () => hWrap('#fbe158', '📈', 'Find the Mode', hBubble(`The tallest stack is at <strong style="color:#fbe158;">${ans}</strong> with ${maxCount} dots.`)),
          opts: dedupOpts(ans, vals.filter(v => v !== ans))
        };
      } }
  ],
  polygons2: [
    { learn: "Polygons are named by their number of sides! Pentagon=5, hexagon=6, heptagon=7, octagon=8.", visual: vShape('octagon', { theme: TRACK_THEME.grade2 }), example: "8 sides = octagon",
      gen: () => {
        const shapes = [['pentagon', 5], ['hexagon', 6], ['heptagon', 7], ['octagon', 8]];
        const [kind] = shapes[rnd(0, shapes.length - 1)];
        return {
          q: `What is this polygon called?<br>${vShape(kind, { theme: TRACK_THEME.grade2 })}`,
          ans: kind,
          h: () => hWrap('#9bc4cb', '🔷', 'Name the Polygon', hBubble(`This shape has <strong>${SHAPE_SIDES[kind]}</strong> sides, so it's a <strong style="color:#9bc4cb;">${kind}</strong>.`)),
          opts: shuffle(shapes.map(s => s[0]))
        };
      } },
    { learn: "Quadrilaterals all have 4 sides, but different shapes: square, rectangle, rhombus, trapezoid.", visual: vShape('rhombus', { theme: TRACK_THEME.grade2 }), example: "A rhombus has 4 equal sides that aren't square corners",
      gen: () => {
        const shapes = ['square', 'rectangle', 'rhombus', 'trapezoid'];
        const kind = shapes[rnd(0, shapes.length - 1)];
        return {
          q: `What quadrilateral is this?<br>${vShape(kind, { theme: TRACK_THEME.grade2 })}`,
          ans: kind,
          h: () => hWrap('#9bc4cb', '🔷', 'Quadrilaterals', hBubble(`All 4-sided shapes are quadrilaterals. This one is a <strong style="color:#9bc4cb;">${kind}</strong>.`)),
          opts: shuffle(shapes)
        };
      } }
  ],
  shapes_3d_2: [
    { learn: "Count faces, edges, and vertices! A cube has 6 faces, 12 edges, 8 vertices (corners).", visual: "🎲 cube: 6 faces, 12 edges, 8 vertices", example: "A cube has 6 flat faces",
      gen: () => {
        const shape = SHAPES_3D_VEF[rnd(0, SHAPES_3D_VEF.length - 1)];
        const prop = ['faces', 'edges', 'vertices'][rnd(0, 2)];
        return {
          q: `How many ${prop} does a ${shape.name} have? ${shape.emoji}`,
          ans: shape[prop],
          h: () => hWrap('#9bc4cb', '📦', 'Count the Parts', hBubble(`A <strong>${shape.name}</strong> has ${shape.faces} faces, ${shape.edges} edges, and ${shape.vertices} vertices. It has <strong style="color:#9bc4cb;">${shape[prop]}</strong> ${prop}.`)),
          opts: dedupOpts(shape[prop], [shape[prop] + 1, Math.max(0, shape[prop] - 1), shape[prop] + 2])
        };
      } },
    { learn: "Compare shapes! Which one has more edges, faces, or vertices?", visual: "Triangular prism (9 edges) vs Square pyramid (8 edges)", example: "9 > 8, so the prism has more edges",
      gen: () => {
        let i, j;
        do {
          i = rnd(0, SHAPES_3D_VEF.length - 1); j = rnd(0, SHAPES_3D_VEF.length - 1);
        } while (j === i || (SHAPES_3D_VEF[i].faces === SHAPES_3D_VEF[j].faces && SHAPES_3D_VEF[i].edges === SHAPES_3D_VEF[j].edges && SHAPES_3D_VEF[i].vertices === SHAPES_3D_VEF[j].vertices));
        const s1 = SHAPES_3D_VEF[i], s2 = SHAPES_3D_VEF[j];
        const prop = ['faces', 'edges', 'vertices'][rnd(0, 2)];
        const ans = s1[prop] >= s2[prop] ? s1.name : s2.name;
        return {
          q: `Which has more ${prop}: a ${s1.name} ${s1.emoji} or a ${s2.name} ${s2.emoji}?`,
          ans,
          h: () => hWrap('#9bc4cb', '📦', 'Compare Shapes', hBubble(`${s1.name}: ${s1[prop]} ${prop}. ${s2.name}: ${s2[prop]} ${prop}. <strong style="color:#9bc4cb;">${ans}</strong> has more.`)),
          opts: [s1.name, s2.name]
        };
      } }
  ],
  fractions2: [
    { learn: "Fractions can have many denominators - not just halves and fourths! Try thirds, sixths, eighths.", visual: vFractionBar(3, 6, { theme: TRACK_THEME.grade2 }), example: "3 out of 6 shaded = 3/6",
      gen: () => {
        let den = [3, 6, 8][rnd(0, 2)], num = rnd(1, den - 1);
        let correct = `${num}/${den}`;
        let pool = [`${den - num}/${den}`, `${num}/${den + 1}`, `${num + 1}/${den}`, `${Math.max(1, num - 1)}/${den}`];
        return {
          q: `What fraction is shaded?<br>${vFractionBar(num, den, { theme: TRACK_THEME.grade2 })}`,
          ans: correct,
          h: () => hintFraction(num, den),
          opts: dedupOpts(correct, pool)
        };
      } },
    { learn: "Compare fractions! Same denominator: the bigger numerator wins.", visual: "3/8 vs 5/8 → 5/8 is bigger", example: "Same denominator, compare the top numbers",
      gen: () => {
        let den = [4, 6, 8][rnd(0, 2)];
        let n1 = rnd(1, den - 1), n2 = rnd(1, den - 1);
        while (n1 === n2) n2 = rnd(1, den - 1);
        let ans = n1 > n2 ? `${n1}/${den}` : `${n2}/${den}`;
        return {
          q: `Which is bigger: ${n1}/${den} or ${n2}/${den}?`,
          ans,
          h: () => hWrap('#9bc4cb', '🥧', 'Compare Fractions', hBubble(`Same denominator (${den}) - compare numerators: ${n1} vs ${n2}. Bigger numerator = bigger fraction: <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: [`${n1}/${den}`, `${n2}/${den}`]
        };
      } }
  ],
  financial_literacy2: [
    { learn: "A deposit adds money to an account. A withdrawal takes money out.", visual: "🏦 Put money IN = deposit. Take money OUT = withdrawal.", example: "Putting $10 in a piggy bank is a deposit",
      gen: () => {
        const scenarios = [
          { q: "Peach puts $10 of her birthday money into her savings account. What is this called?", ans: "deposit" },
          { q: "Labubu takes $5 out of his savings account to buy a toy. What is this called?", ans: "withdrawal" },
          { q: "Safia adds her allowance to her bank account. What is this called?", ans: "deposit" }
        ];
        const s = scenarios[rnd(0, scenarios.length - 1)];
        return { q: s.q, ans: s.ans, h: () => hWrap('#ffb6d1', '🏦', 'Bank Words', hBubble(`<strong>Deposit</strong> = put money IN.<br><strong>Withdrawal</strong> = take money OUT.<br>This is <strong style="color:#9bc4cb;">${s.ans}</strong>.`)), opts: shuffle(['deposit', 'withdrawal']) };
      } },
    { learn: "A producer MAKES things to sell. A consumer BUYS and uses things.", visual: "👩‍🌾 farmer grows food = producer. 🛒 you buy food = consumer.", example: "A baker who makes bread is a producer",
      gen: () => {
        const scenarios = [
          { q: "A farmer grows vegetables to sell at the market. Is the farmer a producer or consumer?", ans: "producer" },
          { q: "Safia buys an apple from the farmer's market. Is Safia a producer or consumer?", ans: "consumer" },
          { q: "A toy maker builds toys to sell in stores. Is the toy maker a producer or consumer?", ans: "producer" }
        ];
        const s = scenarios[rnd(0, scenarios.length - 1)];
        return { q: s.q, ans: s.ans, h: () => hWrap('#ffb6d1', '🏭', 'Producers & Consumers', hBubble(`<strong>Producer</strong> = makes or grows things to sell.<br><strong>Consumer</strong> = buys and uses things.<br>This is <strong style="color:#9bc4cb;">${s.ans}</strong>.`)), opts: shuffle(['producer', 'consumer']) };
      } }
  ],

  // 2nd Grade - Phase 6 additions
  compare_1000: [
    { learn: "Compare 3-digit numbers on a number line! Numbers further right are bigger.", visual: vNumberLine(0, 1000, { theme: TRACK_THEME.grade2, step: 200, point: 350 }), example: "350 is between 200 and 400",
      gen: () => {
        let a = rnd(50, 950), b = rnd(50, 950);
        while (Math.abs(a - b) < 20) b = rnd(50, 950);
        let ans = a < b ? '<' : a > b ? '>' : '=';
        return {
          q: `${a} __ ${b}`,
          ans,
          h: () => hWrap('#c4a5ff', '🔍', 'Compare on a Number Line', hBubble(`${a} vs ${b}: ${a < b ? 'the first is further left, so smaller' : 'the first is further right, so bigger'} → <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: ['<', '>', '=']
        };
      } },
    { learn: "Write numbers in word form up to 1,000!", visual: "352 = three hundred fifty-two", example: "1,000 = one thousand",
      gen: () => {
        const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tensWords = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        function numToWords(n) {
          if (n === 1000) return 'one thousand';
          let h = Math.floor(n / 100), rem = n % 100;
          let parts = [];
          if (h) parts.push(`${ones[h]} hundred`);
          if (rem) { if (rem < 20) parts.push(ones[rem]); else { let t = Math.floor(rem / 10), o = rem % 10; parts.push(o ? `${tensWords[t]}-${ones[o]}` : tensWords[t]); } }
          return parts.join(' ') || 'zero';
        }
        let n = Math.random() < 0.1 ? 1000 : rnd(100, 899);
        let ans = numToWords(n);
        let pool = [numToWords(n + 10 <= 1000 ? n + 10 : n - 10), numToWords(n + 100 <= 1000 ? n + 100 : n - 100), numToWords(n + 1 <= 1000 ? n + 1 : n - 1), numToWords(n - 1 >= 100 ? n - 1 : n + 1)];
        return {
          q: `Write ${n} in words.`,
          ans,
          h: () => hWrap('#c4a5ff', '🔤', 'Word Form', hBubble(`${n} = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, pool)
        };
      } }
  ],
  skip_100s_even_odd: [
    { learn: "Skip-count by 100s! 100, 200, 300...", visual: "100, 200, 300, __, 500 → 400", example: "600, 700, 800",
      gen: () => {
        let start = rnd(0, 6) * 100;
        let seq = [start, start + 100, start + 200, start + 300];
        let ans = seq[3];
        return {
          q: `${seq.slice(0, 3).join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#c4a5ff', '🔢', 'Skip-Count by 100s', hBubble(`Add 100 each time: ${seq.join(', ')}`)),
          opts: dedupOpts(ans, [ans + 100, ans - 100, ans + 10, seq[2]])
        };
      } },
    { learn: "Even or odd, even for bigger numbers! Check the last digit.", visual: "84 → ends in 4 → even", example: "97 is odd",
      gen: () => {
        let n = rnd(31, 100);
        return {
          q: `Is ${n} even or odd?`,
          ans: n % 2 === 0 ? 'even' : 'odd',
          h: () => hWrap('#c4a5ff', '🔢', 'Even or Odd', hBubble(`Last digit is ${n % 10}. ${n % 2 === 0 ? 'Ends in 0,2,4,6,8 → even' : 'Ends in 1,3,5,7,9 → odd'}`)),
          opts: ['even', 'odd']
        };
      } }
  ],
  estimate_word_problems2: [
    { learn: "Estimate word problems by rounding first, then adding or subtracting!", visual: "A store has 298 apples, gets 103 more ≈ 300+100=400", example: "Round then solve",
      gen: () => {
        let a = rnd(100, 899), b = rnd(100, 899);
        let ra = Math.round(a / 100) * 100, rb = Math.round(b / 100) * 100;
        let isAdd = Math.random() < 0.5;
        let ans = isAdd ? ra + rb : Math.abs(ra - rb);
        const nouns = ['apples', 'marbles', 'stickers', 'books'];
        const noun = nouns[rnd(0, nouns.length - 1)];
        return {
          q: isAdd
            ? `A store has ${a} ${noun}. They get ${b} more. About how many ${noun} in all? (round to the nearest hundred first)`
            : `A store has ${a} ${noun}. They sell ${b}. About how many ${noun} are left? (round to the nearest hundred first)`,
          ans,
          h: () => hWrap('#c4a5ff', '🎯', 'Estimate the Word Problem', hBubble(`${a}→${ra}, ${b}→${rb}. ${ra} ${isAdd ? '+' : '−'} ${rb} = <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 100, Math.max(0, ans - 100), Math.abs(a - b), a + b])
        };
      } }
  ],
  calendar2: [
    { learn: "Each month has a different number of days! April, June, September, November have 30. February has 28 (29 in a leap year). The rest have 31.", visual: "April = 30 days, January = 31 days", example: "September has 30 days",
      gen: () => {
        let m = rnd(0, 11);
        return {
          q: `How many days are in ${MONTHS[m]}?`,
          ans: DAYS_IN_MONTH[m],
          h: () => hWrap('#ffb6d1', '📅', 'Days in a Month', hBubble(`${MONTHS[m]} has <strong style="color:#9bc4cb;">${DAYS_IN_MONTH[m]}</strong> days.`)),
          opts: dedupOpts(DAYS_IN_MONTH[m], [28, 30, 31])
        };
      } },
    { learn: "Add days to find a new date, as long as you stay in the same month!", visual: "The 5th + 10 days = the 15th", example: "March 3rd + 20 days = March 23rd",
      gen: () => {
        let m = rnd(0, 11);
        let maxDay = DAYS_IN_MONTH[m];
        let startDay = rnd(1, Math.max(1, maxDay - 15));
        let addDays = rnd(1, Math.min(15, maxDay - startDay));
        let ans = startDay + addDays;
        return {
          q: `Today is ${MONTHS[m]} ${startDay}. What date is it ${addDays} days from now?`,
          ans: `${MONTHS[m]} ${ans}`,
          h: () => hWrap('#ffb6d1', '📅', 'Date Arithmetic', hBubble(`${startDay} + ${addDays} = <strong style="color:#9bc4cb;">${ans}</strong> → ${MONTHS[m]} ${ans}`)),
          opts: dedupOpts(`${MONTHS[m]} ${ans}`, [`${MONTHS[m]} ${ans + 1}`, `${MONTHS[m]} ${ans - 1}`, `${MONTHS[m]} ${startDay}`])
        };
      } }
  ],
  graph_select2: [
    { learn: "Read the data, then pick the graph that matches!", visual: vBarGraph([{ label: 'Mon', value: 4 }, { label: 'Tue', value: 7 }], { theme: TRACK_THEME.grade2 }), example: "Check each bar's height against the data",
      gen: () => {
        const labels = shuffle(['Mon', 'Tue', 'Wed']).slice(0, 2);
        const trueData = labels.map(l => ({ label: l, value: rnd(3, 9) }));
        const wrongIdx = rnd(0, 1);
        const delta = Math.random() < 0.5 ? 3 : -3;
        const wrongData = trueData.map((d, i) => i === wrongIdx ? { label: d.label, value: Math.max(1, d.value + delta) } : { label: d.label, value: d.value });
        const answerIsA = Math.random() < 0.5;
        const graphA = answerIsA ? trueData : wrongData;
        const graphB = answerIsA ? wrongData : trueData;
        return {
          q: `Data: ${trueData.map(d => `${d.label}=${d.value}`).join(', ')}. Which graph matches?<br>
            <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
              <div><div style="color:#fef9d7;font-weight:900;">Graph A</div>${vBarGraph(graphA, { theme: TRACK_THEME.grade2 })}</div>
              <div><div style="color:#fef9d7;font-weight:900;">Graph B</div>${vBarGraph(graphB, { theme: TRACK_THEME.grade2 })}</div>
            </div>`,
          ans: answerIsA ? 'Graph A' : 'Graph B',
          h: () => hWrap('#fbe158', '📊', 'Match the Data', hBubble(`Data says ${trueData.map(d => `${d.label}=${d.value}`).join(', ')}. Check each graph's bar heights against that.`)),
          opts: ['Graph A', 'Graph B']
        };
      } },
    { learn: "Pictographs work the same way - check the picture counts against the data!", visual: vPictograph([{ label: '🍎', value: 4 }], { theme: TRACK_THEME.grade2 }), example: "Count the pictures for each category",
      gen: () => {
        const fruits = shuffle(['🍎', '🍌']).slice(0, 2);
        const trueData = fruits.map(f => ({ label: f, value: rnd(2, 6) }));
        const wrongIdx = rnd(0, 1);
        const delta = Math.random() < 0.5 ? 2 : -2;
        const wrongData = trueData.map((d, i) => i === wrongIdx ? { label: d.label, value: Math.max(1, d.value + delta) } : { label: d.label, value: d.value });
        const answerIsA = Math.random() < 0.5;
        const graphA = answerIsA ? trueData : wrongData;
        const graphB = answerIsA ? wrongData : trueData;
        return {
          q: `Data: ${trueData.map(d => `${d.label}=${d.value}`).join(', ')}. Which picture graph matches?<br>
            <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
              <div><div style="color:#fef9d7;font-weight:900;">Graph A</div>${vPictograph(graphA, { theme: TRACK_THEME.grade2 })}</div>
              <div><div style="color:#fef9d7;font-weight:900;">Graph B</div>${vPictograph(graphB, { theme: TRACK_THEME.grade2 })}</div>
            </div>`,
          ans: answerIsA ? 'Graph A' : 'Graph B',
          h: () => hWrap('#fbe158', '📊', 'Match the Data', hBubble(`Data says ${trueData.map(d => `${d.label}=${d.value}`).join(', ')}. Count each graph's pictures.`)),
          opts: ['Graph A', 'Graph B']
        };
      } }
  ],

  // 3rd Grade
  multiply: [
    { learn: "Multiplication = groups of same size!", visual: "🐻🐻 | 🐻🐻 | 🐻🐻 = 3×2=6", example: "3 × 2 = 6",
      gen: () => { let a = rnd(2, 5), b = rnd(2, 4); return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiply(a, b), opts: shuffle([a * b, a * b + a, a * b - b, a + b]) }; } },
    { learn: "×5 always ends in 0 or 5!", visual: "5, 10, 15, 20, 25...", example: "4 × 5 = 20",
      gen: () => { let a = rnd(2, 7); return { q: `${a} × 5 = ?`, ans: a * 5, h: () => hintMultiplyFacts(a, 5), opts: shuffle([a * 5, a * 5 + 5, a * 5 - 5, a * 10]) }; } },
    { learn: "×10 is super easy! Just add a zero!", visual: "3×10 = 30 (3 with a zero)", example: "6 × 10 = 60",
      gen: () => { let a = rnd(2, 9); return { q: `${a} × 10 = ?`, ans: a * 10, h: () => hintMultiplyFacts(a, 10), opts: shuffle([a * 10, a * 10 + 10, a * 10 - 10, a * 5]) }; } },
    { learn: "Doubles: 2 × anything = double!", visual: "2×7 = 7+7 = 14", example: "2 × 8 = 16",
      gen: () => { let b = rnd(3, 9); return { q: `2 × ${b} = ?`, ans: 2 * b, h: () => hintMultiply(2, b), opts: shuffle([2 * b, 2 * b + 2, 2 * b - 2, b]) }; } },
    { learn: "×4 is double the double!", visual: "4×3 = 12 (double 3=6, double 6=12)", example: "4 × 6 = 24",
      gen: () => { let a = rnd(2, 8); return { q: `4 × ${a} = ?`, ans: 4 * a, h: () => hintMultiply(4, a), opts: shuffle([4 * a, 4 * a + 4, 4 * a - 4, a]) }; } }
  ],
  multiply_facts: [
    { learn: "3 times table — triple strike!", visual: "3, 6, 9, 12, 15...", example: "3 × 4 = 12",
      gen: () => { let a = rnd(1, 9); return { q: `3 × ${a} = ?`, ans: 3 * a, h: () => hintMultiplyFacts(3, a), opts: shuffle([3 * a, 3 * a + 3, 3 * a - 3, a]) }; } },
    { learn: "6 times table — six pack smash!", visual: "6, 12, 18, 24, 30...", example: "6 × 7 = 42",
      gen: () => { let a = rnd(1, 8); return { q: `6 × ${a} = ?`, ans: 6 * a, h: () => hintMultiplyFacts(6, a), opts: shuffle([6 * a, 6 * a + 6, 6 * a - 6, a]) }; } },
    { learn: "7 times table — lucky seven!", visual: "7, 14, 21, 28, 35...", example: "7 × 8 = 56",
      gen: () => { let a = rnd(1, 8); return { q: `7 × ${a} = ?`, ans: 7 * a, h: () => hintMultiplyFacts(7, a), opts: shuffle([7 * a, 7 * a + 7, 7 * a - 7, a]) }; } },
    { learn: "8 times table — octopus attack!", visual: "8, 16, 24, 32, 40...", example: "8 × 6 = 48",
      gen: () => { let a = rnd(1, 8); return { q: `8 × ${a} = ?`, ans: 8 * a, h: () => hintMultiplyFacts(8, a), opts: shuffle([8 * a, 8 * a + 8, 8 * a - 8, a]) }; } },
    { learn: "9 times table — ninja finger trick!", visual: "9, 18, 27, 36, 45...", example: "9 × 7 = 63",
      gen: () => { let a = rnd(2, 9); return { q: `9 × ${a} = ?`, ans: 9 * a, h: () => hintNineTimes(a), opts: shuffle([9 * a, 9 * a + 9, 9 * a - 9, a]) }; } }
  ],
  divide: [
    { learn: "Division = sharing equally!", visual: "🍪🍪🍪🍪🍪🍪 ÷ 3 = 2 each", example: "6 ÷ 3 = 2",
      gen: () => { let a = rnd(2, 5), b = rnd(2, 5); return { q: `${a * b} ÷ ${a} = ?`, ans: b, h: () => hintDivision(a * b, a), opts: shuffle([b, b + 1, b - 1, a]) }; } },
    { learn: "÷2 means half! Double team takedown!", visual: "6 ÷ 2 = 3", example: "8 ÷ 2 = 4",
      gen: () => { let a = rnd(2, 8) * 2; return { q: `${a} ÷ 2 = ?`, ans: a / 2, h: () => hintDivision(a, 2), opts: shuffle([a / 2, a / 2 + 1, a / 2 - 1, a]) }; } },
    { learn: "÷5 — how many groups of 5?", visual: "10 ÷ 5 = 2 groups", example: "15 ÷ 5 = 3",
      gen: () => { let q = rnd(2, 6); return { q: `${q * 5} ÷ 5 = ?`, ans: q, h: () => hintDivision(q * 5, 5), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } },
    { learn: "÷10 — just remove a zero!", visual: "50 ÷ 10 = 5", example: "80 ÷ 10 = 8",
      gen: () => { let q = rnd(2, 9); return { q: `${q * 10} ÷ 10 = ?`, ans: q, h: () => hintDivision(q * 10, 10), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } },
    { learn: "÷3 — triple threat division!", visual: "9 ÷ 3 = 3", example: "12 ÷ 3 = 4",
      gen: () => { let q = rnd(2, 6); return { q: `${q * 3} ÷ 3 = ?`, ans: q, h: () => hintDivision(q * 3, 3), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } }
  ],
  division_facts: [
    { learn: "Division facts from 4× table!", visual: "4×5=20, so 20÷4=5", example: "16 ÷ 4 = 4",
      gen: () => { let a = rnd(2, 8); return { q: `${a * 4} ÷ 4 = ?`, ans: a, h: () => hintDivisionFacts(a * 4, 4), opts: shuffle([a, a + 1, a - 1, a + 2]) }; } },
    { learn: "Division facts from 6× table!", visual: "6×6=36, so 36÷6=6", example: "42 ÷ 6 = 7",
      gen: () => { let a = rnd(2, 7); return { q: `${a * 6} ÷ 6 = ?`, ans: a, h: () => hintDivisionFacts(a * 6, 6), opts: shuffle([a, a + 1, a - 1, a + 2]) }; } },
    { learn: "Division facts from 7× table!", visual: "7×7=49, so 49÷7=7", example: "56 ÷ 7 = 8",
      gen: () => { let a = rnd(2, 8); return { q: `${a * 7} ÷ 7 = ?`, ans: a, h: () => hintDivisionFacts(a * 7, 7), opts: shuffle([a, a + 1, a - 1, a + 2]) }; } },
    { learn: "Division facts from 8× table!", visual: "8×6=48, so 48÷8=6", example: "64 ÷ 8 = 8",
      gen: () => { let a = rnd(2, 8); return { q: `${a * 8} ÷ 8 = ?`, ans: a, h: () => hintDivisionFacts(a * 8, 8), opts: shuffle([a, a + 1, a - 1, a + 2]) }; } },
    { learn: "Division facts from 9× table!", visual: "9×7=63, so 63÷9=7", example: "81 ÷ 9 = 9",
      gen: () => { let a = rnd(2, 9); return { q: `${a * 9} ÷ 9 = ?`, ans: a, h: () => hintNineDivision(a * 9), opts: shuffle([a, a + 1, a - 1, a + 2]) }; } }
  ],
  remainder: [
    { learn: "Remainder: when sharing leaves leftovers!", visual: "7 ÷ 3 = 2 R1", example: "10 ÷ 4 = 2 R2",
      gen: () => { let d = rnd(3, 6), q = rnd(2, 4), r = rnd(1, d - 1); return { q: `${d * q + r} ÷ ${d} = ?`, ans: q, h: () => hintDivision(d * q + r, d), opts: shuffle([q, q + 1, d, r]) }; } },
    { learn: "Remainder with 5 — five-finger leftover!", visual: "13 ÷ 5 = 2 R3", example: "17 ÷ 5 = 3 R2",
      gen: () => { let q = rnd(2, 4), r = rnd(1, 4); return { q: `${5 * q + r} ÷ 5 = ?`, ans: q, h: () => hintDivision(5 * q + r, 5), opts: shuffle([q, q + 1, 5, r]) }; } },
    { learn: "Remainder with 6 — six-pack extras!", visual: "20 ÷ 6 = 3 R2", example: "22 ÷ 6 = 3 R4",
      gen: () => { let q = rnd(2, 4), r = rnd(1, 5); return { q: `${6 * q + r} ÷ 6 = ?`, ans: q, h: () => hintDivision(6 * q + r, 6), opts: shuffle([q, q + 1, 6, r]) }; } },
    { learn: "Remainder with 7 — lucky leftovers!", visual: "23 ÷ 7 = 3 R2", example: "30 ÷ 7 = 4 R2",
      gen: () => { let q = rnd(2, 4), r = rnd(1, 6); return { q: `${7 * q + r} ÷ 7 = ?`, ans: q, h: () => hintDivision(7 * q + r, 7), opts: shuffle([q, q + 1, 7, r]) }; } },
    { learn: "Remainder with 8 — octopus extras!", visual: "26 ÷ 8 = 3 R2", example: "34 ÷ 8 = 4 R2",
      gen: () => { let q = rnd(2, 4), r = rnd(1, 7); return { q: `${8 * q + r} ÷ 8 = ?`, ans: q, h: () => hintDivision(8 * q + r, 8), opts: shuffle([q, q + 1, 8, r]) }; } }
  ],
  fractions1: [
    { learn: "A fraction shows equal parts of a whole. The bottom number (denominator) is the total parts; the top number (numerator) is how many are shaded.",
      visual: vFractionBar(3, 4, { theme: TRACK_THEME.grade3 }), example: "3 out of 4 parts shaded = 3/4",
      gen: () => {
        let den = rnd(3, 8), num = rnd(1, den - 1);
        const correct = `${num}/${den}`;
        const pool = [`${den - num}/${den}`, `${num}/${den + 1}`, `${num + 1}/${den}`, `${Math.max(1, num - 1)}/${den}`, `${num}/${Math.max(num + 1, den - 1)}`];
        const distractors = [];
        for (const d of pool) {
          if (d !== correct && !distractors.includes(d)) distractors.push(d);
          if (distractors.length === 3) break;
        }
        return {
          q: `What fraction is shaded?<br>${vFractionBar(num, den, { theme: TRACK_THEME.grade3 })}`,
          ans: correct,
          h: () => hintFraction(num, den),
          opts: shuffle([correct, ...distractors])
        };
      } }
  ],

  // 3rd Grade - Phase 4 additions
  mult_properties: [
    { learn: "Commutative property: you can multiply in any order and get the same answer! a×b = b×a", visual: "3×4 = 4×3 = 12", example: "6×2 = 2×6",
      gen: () => {
        let a = rnd(2, 9), b = rnd(2, 9);
        return {
          q: `If ${a} × ${b} = ${a * b}, what does ${b} × ${a} equal?`,
          ans: a * b,
          h: () => hWrap('#fbe158', '🔄', 'Commutative Property', hBubble(`Multiplication order doesn't matter! ${a}×${b} = ${b}×${a} = <strong style="color:#fbe158;">${a * b}</strong>`)),
          opts: dedupOpts(a * b, [a * b + a, a * b - a, a + b])
        };
      } },
    { learn: "Distributive property: break apart a factor to multiply in easier pieces!", visual: "8×6 = 8×5 + 8×1 = 40+8 = 48", example: "9×4 = 9×2 + 9×2 = 36",
      gen: () => {
        let a = rnd(6, 9), b = rnd(6, 9);
        let split1 = rnd(2, b - 1), split2 = b - split1;
        let ans = a * b;
        return {
          q: `${a} × ${b} = (${a} × ${split1}) + (${a} × ${split2}). What is the total?`,
          ans,
          h: () => hWrap('#fbe158', '✂️', 'Distributive Property', hBubble(`${a}×${split1}=${a * split1}, ${a}×${split2}=${a * split2}.<br>${a * split1}+${a * split2}=<strong style="color:#fbe158;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + a, ans - a, a + b])
        };
      } }
  ],
  mult_2digit: [
    { learn: "Multiply by tens! 4×30 = 4×3 with a zero on the end.", visual: "4×30 = 120", example: "6×20=120",
      gen: () => {
        let a = rnd(2, 9), tens = rnd(2, 9) * 10;
        let ans = a * tens;
        return {
          q: `${a} × ${tens} = ?`,
          ans,
          h: () => hWrap('#fbe158', '🔟', 'Multiply by Tens', hBubble(`${a}×${tens / 10}=${a * tens / 10}, then add a zero: <strong style="color:#fbe158;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + tens, ans - tens, ans + 10])
        };
      } },
    { learn: "Multiply a 2-digit number by a 1-digit number! Break it into tens and ones.", visual: "23×4 = 20×4 + 3×4 = 80+12 = 92", example: "23×4=92",
      gen: () => {
        let a = rnd(11, 49), b = rnd(2, 9);
        let tens = Math.floor(a / 10) * 10, ones = a % 10;
        let ans = a * b;
        return {
          q: `${a} × ${b} = ?`,
          ans,
          h: () => hWrap('#fbe158', '✖️', '2-Digit Multiplication', hBubble(`${a} = ${tens}+${ones}.<br>${tens}×${b}=${tens * b}, ${ones}×${b}=${ones * b}.<br>${tens * b}+${ones * b}=<strong style="color:#fbe158;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + b, ans - b, ans + 10])
        };
      } }
  ],
  division_fluency12: [
    { learn: "Division facts up to 12! 144÷12=12, 121÷11=11...", visual: "132 ÷ 12 = 11", example: "121÷11=11",
      gen: () => {
        let d = rnd(11, 12), q = rnd(2, 12);
        return { q: `${d * q} ÷ ${d} = ?`, ans: q, h: () => hintDivisionFacts(d * q, d), opts: dedupOpts(q, [q + 1, q - 1, d]) };
      } },
    { learn: "Find the missing dividend or divisor!", visual: "? ÷ 6 = 9 → ? = 54", example: "72 ÷ ? = 8 → ? = 9",
      gen: () => {
        let divisor = rnd(2, 12), quotient = rnd(2, 12);
        let dividend = divisor * quotient;
        if (rnd(0, 1) === 0) return { q: `? ÷ ${divisor} = ${quotient}`, ans: dividend, h: () => hintMultiplyFacts(divisor, quotient), opts: dedupOpts(dividend, [dividend + divisor, dividend - divisor, quotient]) };
        else return { q: `${dividend} ÷ ? = ${quotient}`, ans: divisor, h: () => hintDivisionFacts(dividend, quotient), opts: dedupOpts(divisor, [divisor + 1, divisor - 1, quotient]) };
      } }
  ],
  rounding_estimate: [
    { learn: "Round bigger numbers! Look at the digit to the right of the place you're rounding to.", visual: "3,482 rounded to the nearest 1000 = 3,000", example: "6,720 → nearest 1000 = 7,000",
      gen: () => {
        let n = rnd(1000, 9899);
        const place = [10, 100, 1000][rnd(0, 2)];
        let ans = Math.round(n / place) * place;
        return {
          q: `Round ${n} to the nearest ${place}.`,
          ans,
          h: () => hWrap('#c4a5ff', '🎯', 'Round', hBubble(`${n} rounds to <strong style="color:#9bc4cb;">${ans}</strong> (nearest ${place}).`)),
          opts: dedupOpts(ans, [ans + place, ans - place, n])
        };
      } },
    { learn: "Estimate a sum by rounding each number first, then adding the round numbers!", visual: "297+412 ≈ 300+400 = 700", example: "Estimate, don't calculate exactly",
      gen: () => {
        let a = rnd(100, 899), b = rnd(100, 899);
        let ra = Math.round(a / 100) * 100, rb = Math.round(b / 100) * 100;
        let ans = ra + rb;
        return {
          q: `Estimate ${a} + ${b} by rounding each to the nearest hundred.`,
          ans,
          h: () => hWrap('#c4a5ff', '🎯', 'Estimate the Sum', hBubble(`${a}→${ra}, ${b}→${rb}. ${ra}+${rb}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 100, ans - 100, a + b])
        };
      } }
  ],
  add_sub_4digit: [
    { learn: "Add 4-digit numbers! Same rules, just more columns.", visual: "2456+1389=3845", example: "2456+1389=3845",
      gen: () => {
        let a = rnd(1100, 6000), b = rnd(1100, 3500);
        while (a + b > 9999) b = rnd(1100, 2500);
        return { q: `${a} + ${b} = ?`, ans: a + b, h: () => addHint(a, b), opts: dedupOpts(a + b, [a + b + 1, a + b - 1, a + b + 10, a + b - 10]) };
      } },
    { learn: "Subtract 4-digit numbers! Borrow across columns as needed.", visual: "5230−1876=3354", example: "5230−1876=3354",
      gen: () => {
        let a = rnd(2000, 9500), b = rnd(1000, a - 500);
        return { q: `${a} − ${b} = ?`, ans: a - b, h: () => subtractHint(a, b), opts: dedupOpts(a - b, [a - b + 1, a - b - 1, a - b + 10, a - b - 10]) };
      } }
  ],
  word_problems3: [
    { learn: "Two-step word problems: solve one step, then use that answer for the next step!", visual: "Buy 3 packs of 4 pencils, give away 5. 3×4=12, 12−5=7", example: "12−5=7",
      gen: () => {
        let packs = rnd(2, 6), perPack = rnd(3, 8);
        let total = packs * perPack;
        let giveAway = rnd(1, total - 3);
        let ans = total - giveAway;
        return {
          q: `Buy ${packs} packs of ${perPack} pencils each, then give away ${giveAway}. How many pencils are left?`,
          ans,
          h: () => hWrap('#9bc4cb', '🧩', 'Two Steps', hBubble(`Step 1: ${packs}×${perPack}=${total}.<br>Step 2: ${total}−${giveAway}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, total, giveAway])
        };
      } },
    { learn: "Solve for the unknown! Use the inverse operation to find the missing number.", visual: "? × 6 = 42 → ? = 42÷6 = 7", example: "? ÷ 5 = 8 → ? = 40",
      gen: () => {
        let b = rnd(2, 9), ans = rnd(2, 9), product = ans * b;
        if (rnd(0, 1) === 0) return { q: `? × ${b} = ${product}`, ans, h: () => hintDivisionFacts(product, b), opts: dedupOpts(ans, [ans + 1, ans - 1, b, product]) };
        else return { q: `? ÷ ${b} = ${ans}`, ans: product, h: () => hintMultiplyFacts(ans, b), opts: dedupOpts(product, [product + b, product - b, ans, b]) };
      } }
  ],
  fractions_numberline: [
    { learn: "Fractions live on the number line too! Between 0 and 1, split into equal parts.", visual: vNumberLine(0, 1, { theme: TRACK_THEME.grade3, step: 0.25, point: 0.75, labelFn: v => `${Math.round(v * 4)}/4` }), example: "3/4 is 3 steps from 0, split into fourths",
      gen: () => {
        let den = [2, 3, 4, 5, 6][rnd(0, 4)];
        let num = rnd(1, den - 1);
        return {
          q: `What fraction is marked on the number line?<br>${vNumberLine(0, 1, { theme: TRACK_THEME.grade3, step: 1 / den, point: num / den, labelFn: v => `${Math.round(v * den)}/${den}` })}`,
          ans: `${num}/${den}`,
          h: () => hWrap('#9bc4cb', '➡️', 'Fractions on a Number Line', hBubble(`Between 0 and 1, split into ${den} equal parts. The mark is at <strong style="color:#9bc4cb;">${num}/${den}</strong>.`)),
          opts: dedupOpts(`${num}/${den}`, [`${den - num}/${den}`, `${num}/${den + 1}`, `${num + 1}/${den}`])
        };
      } },
    { learn: "Fractions greater than 1! The number line keeps going past 1, 2, 3...", visual: vNumberLine(0, 2, { theme: TRACK_THEME.grade3, step: 0.5, point: 1.5, labelFn: v => `${Math.round(v * 2)}/2` }), example: "3/2 is one and a half",
      gen: () => {
        let den = [2, 3, 4][rnd(0, 2)];
        let num = rnd(den + 1, den * 2 - 1);
        return {
          q: `What fraction is marked on the number line?<br>${vNumberLine(0, 2, { theme: TRACK_THEME.grade3, step: 1 / den, point: num / den, labelFn: v => `${Math.round(v * den)}/${den}` })}`,
          ans: `${num}/${den}`,
          h: () => hWrap('#9bc4cb', '➡️', 'Fractions Greater Than 1', hBubble(`Count marks past 0: the mark at <strong style="color:#9bc4cb;">${num}/${den}</strong> is past 1 whole.`)),
          opts: dedupOpts(`${num}/${den}`, [`${num - 1}/${den}`, `${num + 1}/${den}`, `${den}/${den}`])
        };
      } }
  ],
  fractions_equivalent: [
    { learn: "Equivalent fractions look different but represent the same amount!", visual: vFractionBar(1, 2, { theme: TRACK_THEME.grade3, compareTo: [2, 4] }), example: "1/2 = 2/4",
      gen: () => {
        let den1 = rnd(2, 4), num1 = rnd(1, den1 - 1);
        let mult = rnd(2, 3);
        let makeEquivalent = Math.random() < 0.5;
        let den2 = den1 * mult;
        let num2 = makeEquivalent ? num1 * mult : num1 * mult + (Math.random() < 0.5 ? 1 : -1);
        num2 = Math.max(1, Math.min(den2 - 1, num2));
        let actuallyEquivalent = (num1 / den1 === num2 / den2);
        return {
          q: `Are these fractions equivalent?<br>${vFractionBar(num1, den1, { theme: TRACK_THEME.grade3, compareTo: [num2, den2] })}`,
          ans: actuallyEquivalent ? 'yes' : 'no',
          h: () => hWrap('#9bc4cb', '🟰', 'Equivalent Fractions', hBubble(`${num1}/${den1} = ${(num1 / den1).toFixed(2)}. ${num2}/${den2} = ${(num2 / den2).toFixed(2)}. ${actuallyEquivalent ? 'They ARE equal ✅' : "They're NOT equal ❌"}`)),
          opts: shuffle(['yes', 'no'])
        };
      } },
    { learn: "Find the missing number to make equivalent fractions! Multiply top and bottom by the same number.", visual: "1/3 = ?/9 → multiply by 3 → 3/9", example: "2/5 = 4/10",
      gen: () => {
        let den1 = rnd(2, 6), num1 = rnd(1, den1 - 1);
        let mult = rnd(2, 4);
        let den2 = den1 * mult;
        let ans = num1 * mult;
        return {
          q: `${num1}/${den1} = ?/${den2}`,
          ans,
          h: () => hWrap('#9bc4cb', '🟰', 'Equivalent Fractions', hBubble(`${den2}÷${den1}=${mult}, so multiply the top by ${mult} too: ${num1}×${mult}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, den1, mult])
        };
      } }
  ],
  fractions_compare: [
    { learn: "Compare fractions with different denominators! Bigger pieces or more pieces can both matter - compare carefully.", visual: "1/3 vs 1/4 → 1/3 is bigger (thirds are bigger pieces)", example: "3/4 > 2/3",
      gen: () => {
        let den1 = rnd(2, 8), den2 = rnd(2, 8);
        while (den2 === den1) den2 = rnd(2, 8);
        let num1 = rnd(1, den1 - 1), num2 = rnd(1, den2 - 1);
        let v1 = num1 / den1, v2 = num2 / den2, guard = 0;
        while (Math.abs(v1 - v2) < 0.02 && guard < 50) { num2 = rnd(1, den2 - 1); v2 = num2 / den2; guard++; }
        let ans = v1 > v2 ? `${num1}/${den1}` : `${num2}/${den2}`;
        return {
          q: `Which is bigger: ${num1}/${den1} or ${num2}/${den2}?`,
          ans,
          h: () => hWrap('#9bc4cb', '⚖️', 'Compare Fractions', hBubble(`${num1}/${den1} = ${v1.toFixed(2)}. ${num2}/${den2} = ${v2.toFixed(2)}. <strong style="color:#9bc4cb;">${ans}</strong> is bigger.`)),
          opts: [`${num1}/${den1}`, `${num2}/${den2}`]
        };
      } },
    { learn: "Order fractions from smallest to biggest!", visual: "1/4, 1/2, 3/4 (smallest to biggest)", example: "Order: 1/8, 1/2, 3/4",
      gen: () => {
        let den = rnd(4, 8);
        let nums = [rnd(1, den - 1), rnd(1, den - 1), rnd(1, den - 1)], guard = 0;
        while (new Set(nums).size < 3 && guard < 50) { nums = [rnd(1, den - 1), rnd(1, den - 1), rnd(1, den - 1)]; guard++; }
        let sorted = [...nums].sort((a, b) => a - b);
        let ans = sorted.map(n => `${n}/${den}`).join(', ');
        let pool = [sorted.slice().reverse().map(n => `${n}/${den}`).join(', '), nums.map(n => `${n}/${den}`).join(', ')];
        let opts = [ans];
        for (const p of pool) if (!opts.includes(p)) opts.push(p);
        while (opts.length < 3) { const alt = shuffle(nums.slice()).map(n => `${n}/${den}`).join(', '); if (!opts.includes(alt)) opts.push(alt); }
        return {
          q: `Order these from smallest to biggest: ${nums.map(n => `${n}/${den}`).join(', ')}`,
          ans,
          h: () => hWrap('#9bc4cb', '📶', 'Order Fractions', hBubble(`Same denominator - just order the numerators: ${sorted.join(', ')} → <strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: shuffle(opts)
        };
      } }
  ],
  area_perimeter3: [
    { learn: "Break a big rectangle into two smaller ones to find area - distributive property!", visual: "4×7 = 4×3 + 4×4 = 12+16 = 28", example: "Add the two rectangle areas together",
      gen: () => {
        let rows = rnd(3, 7), cols1 = rnd(2, 5), cols2 = rnd(2, 5);
        let ans = rows * (cols1 + cols2);
        return {
          q: `A rectangle is split into two parts: ${rows}×${cols1} and ${rows}×${cols2}. What is the total area?<br><div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">${vUnitGrid(rows, cols1, { theme: TRACK_THEME.grade3 })}<span style="font-size:1.8rem;color:#fef9d7;font-weight:900;">+</span>${vUnitGrid(rows, cols2, { theme: TRACK_THEME.grade3 })}</div>`,
          ans,
          h: () => hWrap('#9bc4cb', '⬜', 'Composite Area', hBubble(`${rows}×${cols1}=${rows * cols1}. ${rows}×${cols2}=${rows * cols2}. ${rows * cols1}+${rows * cols2}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + rows, ans - rows, rows * cols1, rows * cols2])
        };
      } },
    { learn: "Find a missing side! If you know the perimeter and one side, subtract to find the other.", visual: "Perimeter=20, one side=5. Other side = 10-5=5", example: "Rectangle: perimeter 18, one side 5 → other side = 4",
      gen: () => {
        let l = rnd(3, 10), w = rnd(3, 10);
        let perimeter = 2 * (l + w);
        let known = rnd(0, 1) === 0 ? l : w;
        let ans = known === l ? w : l;
        return {
          q: `A rectangle has perimeter ${perimeter}cm. One side is ${known}cm. What is the other side?`,
          ans,
          h: () => hWrap('#c4a5ff', '📐', 'Missing Side', hBubble(`Perimeter ÷ 2 = ${perimeter / 2}. ${perimeter / 2}−${known}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, perimeter / 2, known])
        };
      } },
    { learn: "Area and perimeter measure different things! Area = space inside. Perimeter = distance around.", visual: "5×3 rectangle: Area=15, Perimeter=16", example: "Same rectangle, two different measurements",
      gen: () => {
        let l = rnd(3, 9), w = rnd(2, 8);
        let area = l * w, perimeter = 2 * (l + w);
        let askArea = Math.random() < 0.5;
        let ans = askArea ? area : perimeter;
        return {
          q: `Rectangle ${l}cm × ${w}cm. What is the ${askArea ? 'area' : 'perimeter'}?`,
          ans,
          h: () => askArea ? hintMultiply(l, w) : hWrap('#c4a5ff', '📐', 'Perimeter', hBubble(`2×(${l}+${w})=<strong style="color:#9bc4cb;">${perimeter}</strong>`)),
          opts: dedupOpts(ans, [area, perimeter, l + w, ans + 1, ans - 1])
        };
      } }
  ],
  geometry3: [
    { learn: "Angles are classified by size! Right = exactly 90°. Acute = less than 90°. Obtuse = more than 90°.", visual: vAngle(90, TRACK_THEME.grade3), example: "A right angle looks like the corner of a square",
      gen: () => {
        const types = [{ deg: rnd(20, 70), name: 'acute' }, { deg: 90, name: 'right' }, { deg: rnd(110, 160), name: 'obtuse' }];
        const t = types[rnd(0, 2)];
        return {
          q: `What type of angle is this?<br>${vAngle(t.deg, TRACK_THEME.grade3)}`,
          ans: t.name,
          h: () => hWrap('#9bc4cb', '📐', 'Angle Types', hBubble(`Acute = less than 90°. Right = exactly 90°. Obtuse = more than 90°. This angle is <strong style="color:#9bc4cb;">${t.name}</strong>.`)),
          opts: ['acute', 'right', 'obtuse']
        };
      } },
    { learn: "Quadrilaterals can be classified by their sides and angles!", visual: "Square: 4 equal sides + 4 right angles. Rhombus: 4 equal sides, no right angles.", example: "A trapezoid has only 1 pair of parallel sides",
      gen: () => {
        const facts = [
          { kind: 'square', fact: '4 equal sides and 4 right angles' },
          { kind: 'rectangle', fact: 'opposite sides equal and 4 right angles' },
          { kind: 'rhombus', fact: '4 equal sides but no right angles' },
          { kind: 'trapezoid', fact: 'only 1 pair of parallel sides' }
        ];
        const f = facts[rnd(0, facts.length - 1)];
        return {
          q: `Which quadrilateral has ${f.fact}?`,
          ans: f.kind,
          h: () => hWrap('#9bc4cb', '🔷', 'Quadrilateral Properties', hBubble(`A <strong>${f.kind}</strong> has ${f.fact}.<br>${vShape(f.kind, { theme: TRACK_THEME.grade3, labelSides: true })}`)),
          opts: shuffle(facts.map(x => x.kind))
        };
      } },
    { learn: "Polygons are named by their number of sides, all the way up to 10!", visual: "3=triangle, 4=quadrilateral ... 9=nonagon, 10=decagon", example: "A 9-sided shape is a nonagon",
      gen: () => {
        let sides = rnd(3, 10);
        return {
          q: `What is a polygon with ${sides} sides called?`,
          ans: POLYGON_NAMES[sides],
          h: () => hWrap('#9bc4cb', '🔷', 'Polygon Names', hBubble(`${sides} sides = <strong style="color:#9bc4cb;">${POLYGON_NAMES[sides]}</strong>`)),
          opts: dedupOpts(POLYGON_NAMES[sides], [POLYGON_NAMES[clampSides(sides - 1)], POLYGON_NAMES[clampSides(sides + 1)], POLYGON_NAMES[clampSides(sides - 2)], POLYGON_NAMES[clampSides(sides + 2)]])
        };
      } }
  ],
  time3: [
    { learn: "Read time to the exact minute! Count each small tick mark.", visual: vClock(7, 38, TRACK_THEME.grade3), example: "Minute hand between 7 and 8 = :38",
      gen: () => {
        let hour = rnd(1, 12), minute = rnd(0, 59);
        let ans = `${hour}:${String(minute).padStart(2, '0')}`;
        return {
          q: `What time does the clock show?<br>${vClock(hour, minute, TRACK_THEME.grade3)}`,
          ans,
          h: () => hintClock(hour, minute),
          opts: dedupOpts(ans, [`${hour}:${String((minute + 1) % 60).padStart(2, '0')}`, `${hour}:${String((minute + 59) % 60).padStart(2, '0')}`, `${hour % 12 + 1}:${String(minute).padStart(2, '0')}`])
        };
      } },
    { learn: "Elapsed time can cross the hour! Count minutes to the hour, then add the rest.", visual: "10:45 to 11:15 = 15 min to 11:00, then 15 more = 30 min", example: "9:50 to 10:20 = 30 minutes",
      gen: () => {
        let startHour = rnd(1, 10), startMin = rnd(35, 55);
        let toHour = 60 - startMin;
        let afterHour = rnd(5, 30);
        let totalElapsed = toHour + afterHour;
        let endHour = startHour + 1, endMin = afterHour;
        return {
          q: `Start: ${startHour}:${String(startMin).padStart(2, '0')}. End: ${endHour}:${String(endMin).padStart(2, '0')}. How many minutes passed?`,
          ans: totalElapsed,
          h: () => hWrap('#fbe158', '⏱️', 'Elapsed Time Across the Hour', hBubble(`From ${startHour}:${String(startMin).padStart(2, '0')} to ${endHour}:00 is ${toHour} minutes.<br>From ${endHour}:00 to ${endHour}:${String(endMin).padStart(2, '0')} is ${afterHour} more minutes.<br>${toHour}+${afterHour}=<strong style="color:#fbe158;">${totalElapsed}</strong> minutes`)),
          opts: dedupOpts(totalElapsed, [totalElapsed + 5, totalElapsed - 5, toHour, afterHour])
        };
      } }
  ],
  mass_volume: [
    { learn: "Mass tells how heavy something is. Grams (g) for light things, kilograms (kg) for heavy things.", visual: "🪶 paperclip ≈ 1 gram   🐘 elephant ≈ many kilograms", example: "An apple is about 100 grams",
      gen: () => {
        const items = [
          { name: 'a paperclip', ans: 'grams' }, { name: 'a bicycle', ans: 'kilograms' },
          { name: 'an apple', ans: 'grams' }, { name: 'a dog', ans: 'kilograms' },
          { name: 'a pencil', ans: 'grams' }, { name: 'a full backpack', ans: 'kilograms' }
        ];
        const it = items[rnd(0, items.length - 1)];
        return { q: `Would you measure the mass of ${it.name} in grams or kilograms?`, ans: it.ans, h: () => hWrap('#c4a5ff', '⚖️', 'Mass', hBubble(`Light things use <strong>grams</strong>. Heavy things use <strong>kilograms</strong>. ${it.name} is measured in <strong style="color:#9bc4cb;">${it.ans}</strong>.`)), opts: shuffle(['grams', 'kilograms']) };
      } },
    { learn: "Volume tells how much liquid something holds. Milliliters (mL) for small amounts, liters (L) for large amounts.", visual: "💧 a spoonful ≈ mL   🪣 a bucket ≈ L", example: "A juice box is about 200 mL",
      gen: () => {
        const items = [
          { name: 'a teaspoon of medicine', ans: 'milliliters' }, { name: 'a bathtub', ans: 'liters' },
          { name: 'a juice box', ans: 'milliliters' }, { name: 'a fish tank', ans: 'liters' },
          { name: 'a raindrop', ans: 'milliliters' }, { name: 'a swimming pool', ans: 'liters' }
        ];
        const it = items[rnd(0, items.length - 1)];
        return { q: `Would you measure the volume of ${it.name} in milliliters or liters?`, ans: it.ans, h: () => hWrap('#c4a5ff', '🧪', 'Volume', hBubble(`Small amounts use <strong>milliliters</strong>. Large amounts use <strong>liters</strong>. ${it.name} is measured in <strong style="color:#9bc4cb;">${it.ans}</strong>.`)), opts: shuffle(['milliliters', 'liters']) };
      } }
  ],
  data3: [
    { learn: "Multi-step graph problems: find two values, then add or subtract them!", visual: vBarGraph([{ label: 'Mon', value: 5 }, { label: 'Tue', value: 3 }, { label: 'Wed', value: 6 }], { theme: TRACK_THEME.grade3 }), example: "Mon + Wed = 5+6 = 11",
      gen: () => {
        const days = shuffle(['Mon', 'Tue', 'Wed', 'Thu']).slice(0, 3);
        const data = days.map(d => ({ label: d, value: rnd(3, 12) }));
        let i = rnd(0, 2), j = rnd(0, 2);
        while (j === i) j = rnd(0, 2);
        let op = Math.random() < 0.5 ? '+' : '-';
        let a = data[i].value, b = data[j].value;
        let ans = op === '+' ? a + b : Math.abs(a - b);
        return {
          q: `${data[i].label} ${op} ${data[j].label} = ?<br>${vBarGraph(data, { theme: TRACK_THEME.grade3 })}`,
          ans,
          h: () => hWrap('#fbe158', '📊', 'Multi-Step Graph', hBubble(`${data[i].label}=${a}, ${data[j].label}=${b}. ${a} ${op} ${b} = <strong style="color:#fbe158;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + 1, ans - 1, ans + 2])
        };
      } },
    { learn: "Picture graphs can use a KEY where each picture = more than 1!", visual: "🍎🍎🍎 (each 🍎 = 2 apples) = 6 apples", example: "3 pictures × 2 each = 6",
      gen: () => {
        const scale = [2, 5, 10][rnd(0, 2)];
        const items = shuffle(['🍎', '🍌', '🍇']).slice(0, 2);
        const data = items.map(f => ({ label: f, value: rnd(2, 6) * scale }));
        const target = data[rnd(0, 1)];
        return {
          q: `Each ${target.label} in the picture graph = ${scale}. ${target.label.repeat(target.value / scale)} How many total?`,
          ans: target.value,
          h: () => hWrap('#fbe158', '📊', 'Picture Graph Key', hBubble(`${target.value / scale} pictures × ${scale} each = <strong style="color:#fbe158;">${target.value}</strong>`)),
          opts: dedupOpts(target.value, [target.value + scale, target.value - scale, target.value + 1])
        };
      } }
  ],

  // 3rd Grade - Phase 6 additions
  mult_word_problems3: [
    { learn: "Multiply by tens in word problems! 10 boxes of 30 crayons each.", visual: "10 × 30 = 300", example: "Multiply by a multiple of ten",
      gen: () => {
        let boxes = rnd(2, 9), perBox = rnd(2, 9) * 10;
        let ans = boxes * perBox;
        return {
          q: `A store has ${boxes} boxes with ${perBox} crayons in each box. How many crayons in all?`,
          ans,
          h: () => hWrap('#fbe158', '📦', 'Multiply by Tens', hBubble(`${boxes} × ${perBox} = ${boxes} × ${perBox / 10} tens = <strong style="color:#fbe158;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + perBox, ans - perBox, ans + 10])
        };
      } },
    { learn: "Real-world patterns: if you know the rate, you can find any amount!", visual: "1 ticket = $4. 5 tickets = $20.", example: "Multiply the rate by the quantity",
      gen: () => {
        let rate = rnd(2, 9), qty = rnd(3, 9);
        let ans = rate * qty;
        return {
          q: `Each ticket costs $${rate}. How much do ${qty} tickets cost?`,
          ans,
          h: () => hintMultiply(rate, qty),
          opts: dedupOpts(ans, [ans + rate, ans - rate, rate + qty])
        };
      } }
  ],
  area_advanced3: [
    { learn: "Find a missing side when you know the area! Divide area by the known side.", visual: "Area=24, one side=6 → other side=4", example: "24÷6=4",
      gen: () => {
        let side = rnd(3, 9), other = rnd(3, 9);
        let area = side * other;
        return {
          q: `A rectangle has area ${area} sq units. One side is ${side}. What is the other side?`,
          ans: other,
          h: () => hintDivisionFacts(area, side),
          opts: dedupOpts(other, [other + 1, other - 1, side])
        };
      } },
    { learn: "Compare areas! Multiply each rectangle's sides, then compare.", visual: "5×4=20 vs 3×6=18 → the first is bigger", example: "Compare the products",
      gen: () => {
        let l1 = rnd(3, 9), w1 = rnd(3, 9), l2 = rnd(3, 9), w2 = rnd(3, 9);
        let a1 = l1 * w1, a2 = l2 * w2, guard = 0;
        while (a1 === a2 && guard < 50) { l2 = rnd(3, 9); w2 = rnd(3, 9); a2 = l2 * w2; guard++; }
        let ans = a1 > a2 ? `Rectangle A (${a1})` : `Rectangle B (${a2})`;
        return {
          q: `Rectangle A: ${l1}×${w1}. Rectangle B: ${l2}×${w2}. Which has more area?`,
          ans,
          h: () => hWrap('#9bc4cb', '⬜', 'Compare Areas', hBubble(`A: ${l1}×${w1}=${a1}. B: ${l2}×${w2}=${a2}. <strong style="color:#9bc4cb;">${ans}</strong> is bigger.`)),
          opts: [`Rectangle A (${a1})`, `Rectangle B (${a2})`]
        };
      } }
  ],
  lines_types3: [
    { learn: "Parallel lines never cross. Perpendicular lines cross at a right angle. Intersecting lines just cross somewhere.", visual: vLinePair('perpendicular', TRACK_THEME.grade3), example: "Perpendicular = forms a right angle",
      gen: () => {
        const kinds = ['parallel', 'perpendicular', 'intersecting'];
        const kind = kinds[rnd(0, 2)];
        return {
          q: `What type of lines are these?<br>${vLinePair(kind, TRACK_THEME.grade3)}`,
          ans: kind,
          h: () => hWrap('#9bc4cb', '📏', 'Types of Lines', hBubble(kind === 'parallel' ? 'These lines never meet - parallel.' : kind === 'perpendicular' ? 'These lines cross at a right angle - perpendicular.' : 'These lines cross, but not at a right angle - intersecting.')),
          opts: kinds
        };
      } }
  ],
  arithmetic_patterns3: [
    { learn: "Patterns in a hundred chart! Moving right adds 1, moving down adds 10.", visual: "23, 33, 43, __ → 53 (down the chart, +10 each time)", example: "Moving down a column adds 10",
      gen: () => {
        let start = rnd(1, 49);
        let seq = [start, start + 10, start + 20, start + 30];
        let ans = seq[3];
        return {
          q: `Hundred chart column: ${seq.slice(0, 3).join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#9bc4cb', '💯', 'Hundred Chart Pattern', hBubble(`Moving down a column adds 10 each time: ${seq.join(', ')}`)),
          opts: dedupOpts(ans, [ans + 10, ans - 10, ans + 1, seq[2]])
        };
      } },
    { learn: "Patterns in a multiplication table! Each row/column skip-counts by the same number.", visual: "3× table: 3,6,9,12,__ → 15", example: "Multiples of a number form a pattern",
      gen: () => {
        let n = rnd(2, 9);
        let seq = [n, n * 2, n * 3, n * 4];
        let ans = n * 5;
        return {
          q: `Multiples of ${n}: ${seq.join(', ')}, __ ?`,
          ans,
          h: () => hWrap('#9bc4cb', '✖️', 'Multiplication Table Pattern', hBubble(`Each step adds ${n}: ${seq.join(', ')}, ${ans}`)),
          opts: dedupOpts(ans, [ans + n, ans - n, ans + 1, seq[3]])
        };
      } }
  ],
  fractions_group3: [
    { learn: "Fractions of a group! If 3 out of 5 shapes are red, that's 3/5 red.", visual: "🔴🔴🔴⚪⚪ - 3/5 are red", example: "3 out of 5 = 3/5",
      gen: () => {
        let total = [4, 5, 6, 8][rnd(0, 3)];
        let part = rnd(1, total - 1);
        let items = shuffle(Array.from({ length: total }, (_, i) => i < part ? '🔴' : '⚪'));
        return {
          q: `${items.join('')}<br>What fraction of the group is 🔴?`,
          ans: `${part}/${total}`,
          h: () => hWrap('#9bc4cb', '🥧', 'Fraction of a Group', hBubble(`${part} out of ${total} are red: <strong style="color:#9bc4cb;">${part}/${total}</strong>`)),
          opts: dedupOpts(`${part}/${total}`, [`${total - part}/${total}`, `${part}/${total + 1}`, `${part + 1}/${total}`])
        };
      } },
    { learn: "Fraction word problems: find the fraction, then multiply!", visual: "20 marbles, 1/4 are blue → 20÷4=5 blue marbles", example: "Find part of a group",
      gen: () => {
        let den = [2, 3, 4, 5][rnd(0, 3)];
        let multiplier = rnd(2, 6);
        let total = den * multiplier;
        let num = rnd(1, den - 1);
        let ans = num * multiplier;
        const nouns = ['marbles', 'stickers', 'candies', 'crayons'];
        const noun = nouns[rnd(0, nouns.length - 1)];
        const colors = ['blue', 'red', 'green'];
        const color = colors[rnd(0, colors.length - 1)];
        return {
          q: `There are ${total} ${noun}. ${num}/${den} of them are ${color}. How many are ${color}?`,
          ans,
          h: () => hWrap('#9bc4cb', '🥧', 'Fraction Word Problem', hBubble(`${total}÷${den}=${multiplier}. ${multiplier}×${num}=<strong style="color:#9bc4cb;">${ans}</strong>`)),
          opts: dedupOpts(ans, [ans + multiplier, ans - multiplier, total])
        };
      } }
  ],

  // Multiplication Intro (3 lessons)
  multiply_intro: multiply_intro,

  // Multiplication Main Sections
  multiply_main_1: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×2 = double! Just add the number to itself." : i === 1 ? "×4 = double twice!" : i === 2 ? "×2 facts speed round" : i === 3 ? "×4 facts speed round" : i === 4 ? "Mixed ×2 & ×4 challenge!" : "", visual: i === 0 ? "2×3 = 3+3 = 6" : i === 1 ? "4×3 = 3+3=6, double to 12" : "⚡", example: i === 0 ? "2×5=10" : i === 1 ? "4×5=20" : "Practice!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 2 : i === 1 || i === 3 ? 4 : (Math.random() > 0.5 ? 2 : 4); return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiply(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_2: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×5 = count by 5s!" : i === 1 ? "×10 = add a zero!" : i === 2 ? "×5 facts speed" : i === 3 ? "×10 facts speed" : i === 4 ? "Mixed ×5 & ×10!" : "", visual: i === 0 ? "5,10,15,20,25..." : "10,20,30,40...", example: "Quick strikes!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 5 : 10; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_3: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×3 = triple strike!" : i === 1 ? "×6 = double ×3" : i === 2 ? "×3 facts" : i === 3 ? "×6 facts" : i === 4 ? "Mixed ×3 & ×6!" : "", visual: i === 0 ? "3,6,9,12..." : "6,12,18,24...", example: "Power up!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 3 : 6; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_4: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×7 = lucky seven!" : i === 1 ? "×8 = octopus attack!" : i === 2 ? "×7 facts" : i === 3 ? "×8 facts" : i === 4 ? "Mixed ×7 & ×8!" : "", visual: i === 0 ? "7,14,21,28..." : "8,16,24,32...", example: "Strike hard!", gen: () => { let a = rnd(2, 8); let b = i === 0 || i === 2 ? 7 : 8; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_5: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×9 finger trick!" : i === 1 ? "×9 more practice" : i === 2 ? "×9 ninja strikes" : i === 3 ? "×9 speed round" : i === 4 ? "Master ×9!" : "", visual: i === 0 ? "Bend finger #3 → 2 and 7 = 27" : "9,18,27,36...", example: "9×8=72", gen: () => { let a = rnd(2, 9); return { q: `${a} × 9 = ?`, ans: a * 9, h: () => hintNineTimes(a), opts: shuffle([a * 9, a * 9 + 9, a * 9 - 9, a]) }; } })),

  // Division Intro (3 lessons)
  divide_intro: divide_intro,

  // Division Main Sections
  divide_main_1: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "÷2 = split in half!" : i === 1 ? "÷4 = quarter the group!" : i === 2 ? "÷2 facts" : i === 3 ? "÷4 facts" : i === 4 ? "Mixed ÷2 & ÷4!" : "", visual: i === 0 ? "8÷2=4" : i === 1 ? "12÷4=3" : "⚡", example: "Share equally!", gen: () => { let q = rnd(2, 8); let d = i === 0 || i === 2 ? 2 : 4; return { q: `${q * d} ÷ ${d} = ?`, ans: q, h: () => hintDivision(q * d, d), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } })),
  divide_main_2: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "÷5 = groups of 5!" : i === 1 ? "÷10 = remove a zero!" : i === 2 ? "÷5 facts" : i === 3 ? "÷10 facts" : i === 4 ? "Mixed ÷5 & ÷10!" : "", visual: i === 0 ? "20÷5=4" : i === 1 ? "50÷10=5" : "⚡", example: "Quick groups!", gen: () => { let q = rnd(2, 9); let d = i === 0 || i === 2 ? 5 : 10; return { q: `${q * d} ÷ ${d} = ?`, ans: q, h: () => hintDivision(q * d, d), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } })),
  divide_main_3: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "÷3 = triple split!" : i === 1 ? "÷6 = six-pack share!" : i === 2 ? "÷3 facts" : i === 3 ? "÷6 facts" : i === 4 ? "Mixed ÷3 & ÷6!" : "", visual: i === 0 ? "15÷3=5" : i === 1 ? "36÷6=6" : "⚡", example: "Share evenly!", gen: () => { let q = rnd(2, 8); let d = i === 0 || i === 2 ? 3 : 6; return { q: `${q * d} ÷ ${d} = ?`, ans: q, h: () => hintDivision(q * d, d), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } })),
  divide_main_4: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "÷7 = lucky split!" : i === 1 ? "÷8 = eight-way share!" : i === 2 ? "÷7 facts" : i === 3 ? "÷8 facts" : i === 4 ? "Mixed ÷7 & ÷8!" : "", visual: i === 0 ? "28÷7=4" : i === 1 ? "48÷8=6" : "⚡", example: "Share fairly!", gen: () => { let q = rnd(2, 7); let d = i === 0 || i === 2 ? 7 : 8; return { q: `${q * d} ÷ ${d} = ?`, ans: q, h: () => hintDivision(q * d, d), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } })),
  divide_main_5: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "÷9 = reverse finger trick!" : i === 1 ? "÷9 practice" : i === 2 ? "÷9 ninja shares" : i === 3 ? "÷9 speed" : i === 4 ? "Master ÷9!" : "", visual: i === 0 ? "63÷9=7" : "9,18,27,36...", example: "81÷9=9", gen: () => { let q = rnd(2, 9); return { q: `${q * 9} ÷ 9 = ?`, ans: q, h: () => hintNineDivision(q * 9), opts: shuffle([q, q + 1, q - 1, q + 2]) }; } })),

  // SOAR sections
  soar1: [
    { learn: "SOAR Challenge 1", visual: "Think like a fighter!", example: "Use reasoning", isSoar: true, gen: () => { let a = rnd(2, 5), b = rnd(2, 5); return { q: `Safia has ${a} bags. Each has ${b} apples. Total?`, ans: a * b, h: () => hintMultiply(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } },
    { learn: "SOAR Challenge 2", visual: "Pattern detection", example: "Find the rule", isSoar: true, gen: () => { let s = rnd(2, 5), d = rnd(2, 4); let seq = [s, s + d, s + 2 * d, s + 3 * d]; return { q: `Pattern: ${seq.join(', ')}, __ ?`, ans: seq[3] + d, h: () => hWrap('#9bc4cb', '🦅', 'Patterns', hBubble(`Rule: +${d}`)), opts: shuffle([seq[3] + d, seq[3] + d + 1, seq[3], seq[2]]) }; } },
    { learn: "SOAR Challenge 3", visual: "Shapes", example: "Count corners", isSoar: true, gen: () => { let shapes = [{ n: 'triangle', s: 3 }, { n: 'square', s: 4 }, { n: 'pentagon', s: 5 }]; let sh = shapes[rnd(0, 2)]; return { q: `A ${sh.n} has ${sh.s} sides. Corners?`, ans: sh.s, h: () => hWrap('#9bc4cb', '🦅', 'Shapes', hBubble(`Corners = sides = ${sh.s}`)), opts: shuffle([sh.s, sh.s + 1, sh.s - 1, sh.s + 2]) }; } },
    { learn: "SOAR Challenge 4", visual: "Number bonds", example: "Find the missing", isSoar: true, gen: () => { let t = rnd(6, 10), a = rnd(1, t - 1); return { q: `${a} + ? = ${t}`, ans: t - a, h: () => missingAddHint(t, a), opts: shuffle([t - a, t - a + 1, t - a - 1, a]) }; } },
    { learn: "SOAR Challenge 5", visual: "Money", example: "Calculate change", isSoar: true, gen: () => { let p = rnd(2, 4), c = rnd(3, 6), pay = 25; return { q: `${p} pencils at ${c}¢ each, pay ${pay}¢. Change?`, ans: pay - p * c, h: () => subtractHint(pay, p * c), opts: shuffle([pay - p * c, pay - p * c + 1, pay - p * c - 1, p * c]) }; } }
  ],
  soar2: [
    { learn: "SOAR Grade 2 Challenge 1", visual: "Measurement", example: "Compare lengths", isSoar: true, gen: () => { let l1 = rnd(15, 40), l2 = rnd(10, 25); return { q: `Ribbon A=${l1}cm, B=${l2}cm. How much longer is A?`, ans: l1 - l2, h: () => subtractHint(l1, l2), opts: shuffle([l1 - l2, l1 - l2 + 1, l1 - l2 - 1, l1]) }; } },
    { learn: "SOAR Grade 2 Challenge 2", visual: "Money", example: "Count coins", isSoar: true, gen: () => { let q = rnd(1, 3), d = rnd(1, 4); return { q: `${q} quarter(s) + ${d} dime(s) = ?¢`, ans: q * 25 + d * 10, h: () => hWrap('#9bc4cb', '💰', 'Coins', hBubble(`${q}×25=${q * 25}, ${d}×10=${d * 10}, total=${q * 25 + d * 10}`)), opts: shuffle([q * 25 + d * 10, q * 25 + d * 10 + 5, q * 25 + d * 10 - 5, q * 25]) }; } },
    { learn: "SOAR Grade 2 Challenge 3", visual: "Missing number", example: "Find both!", isSoar: true, gen: () => { let a = rnd(10, 30), b = rnd(10, 25); return { q: `${a} + __ = ${a + b}\n__ - ${b} = ${a}`, ans: b, h: () => missingAddHint(a + b, a), opts: shuffle([b, b + 1, b - 1, a]) }; } },
    { learn: "SOAR Grade 2 Challenge 4", visual: "Data", example: "Read graph", isSoar: true, gen: () => { let r = rnd(4, 12), b = rnd(3, 10); return { q: `Red cars=${r}, Blue cars=${b}. How many more red?`, ans: r - b, h: () => subtractHint(r, b), opts: shuffle([r - b, r - b + 1, r - b - 1, r]) }; } },
    { learn: "SOAR Grade 2 Challenge 5", visual: "Fact family", example: "Find Boss", isSoar: true, gen: () => { let a = rnd(5, 15), b = rnd(5, 15); return { q: `Fact family: ${a}, ${b}, ${a + b}. Big Boss?`, ans: a + b, h: () => factFamilyHint(a, b, a + b), opts: shuffle([a + b, a, b, a + b + 1]) }; } }
  ],
  soar3: [
    { learn: "SOAR Grade 3 Challenge 1", visual: "Area", example: "Find area", isSoar: true, gen: () => { let a = rnd(3, 7), b = rnd(3, 6); return { q: `Rectangle ${a}×${b}. Area?`, ans: a * b, h: () => hintMultiply(a, b), opts: shuffle([a * b, a * b + a, a * b + b, a + b]) }; } },
    { learn: "SOAR Grade 3 Challenge 2", visual: "Fractions", example: "Find part", isSoar: true, gen: () => { let total = rnd(24, 60), num = rnd(1, 3), den = 4; return { q: `${total} stickers, give ${num}/${den}. How many given?`, ans: total / den * num, h: () => hWrap('#9bc4cb', '🥧', 'Fractions', hBubble(`${total}÷${den}=${total / den}, ×${num}=${total / den * num}`)), opts: shuffle([total / den * num, total / den * num + 1, total / den * num - 1, total]) }; } },
    { learn: "SOAR Grade 3 Challenge 3", visual: "Perimeter", example: "Find perimeter", isSoar: true, gen: () => { let w = rnd(3, 7), h = rnd(3, 7); return { q: `Rectangle ${w}×${h}. Perimeter?`, ans: 2 * (w + h), h: () => hWrap('#9bc4cb', '📐', 'Perimeter', hBubble(`2×(${w}+${h})=${2 * (w + h)}`)), opts: shuffle([2 * (w + h), w + h, w * h, w + h + 2]) }; } },
    { learn: "SOAR Grade 3 Challenge 4", visual: "Division", example: "Share evenly", isSoar: true, gen: () => { let total = rnd(24, 60), d = rnd(3, 8); return { q: `${total} ÷ ${d} = ?`, ans: Math.floor(total / d), h: () => hintDivision(total, d), opts: shuffle([Math.floor(total / d), Math.floor(total / d) + 1, Math.floor(total / d) - 1, d]) }; } },
    { learn: "SOAR Grade 3 Challenge 5", visual: "Multi-step", example: "Solve step by step", isSoar: true, gen: () => { let price = rnd(3, 9), qty = rnd(3, 6), paid = price * qty + 5; return { q: `${qty} books at ${price}¢ each, pay ${paid}¢. Change?`, ans: paid - price * qty, h: () => subtractHint(paid, price * qty), opts: shuffle([paid - price * qty, paid - price * qty + 1, paid - price * qty - 1, price]) }; } }
  ]
};

// ============================================================
//  SKILL_META - label + track for every skill (replaces CATEGORIES)
// ============================================================
const SKILL_META = {
  add1: { label: 'Hello Kitty · Addition', track: 'grade1' },
  sub1: { label: 'Peach · Subtraction', track: 'grade1' },
  place1: { label: 'Labubu · Tens & Ones', track: 'grade1' },
  clock_read1: { label: 'Kitty · Telling Time', track: 'grade1' },
  shapes1: { label: 'Kitty · 2D Shapes', track: 'grade1' },
  equations_truefalse: { label: 'Kitty · True or False', track: 'grade1' },
  strategies20: { label: 'Kitty · Add/Sub Strategies to 20', track: 'grade1' },
  compare_symbols: { label: 'Labubu · Compare with Symbols', track: 'grade1' },
  shapes_3d: { label: 'Kitty · 3D Shapes', track: 'grade1' },
  counting_120: { label: 'Peach · Counting to 120', track: 'grade1' },
  skip_counting: { label: 'Peach · Skip-Counting', track: 'grade1' },
  patterns1: { label: 'Labubu · Patterns', track: 'grade1' },
  calendar_seasons: { label: 'Kitty · Calendar & Seasons', track: 'grade1' },
  coin_id: { label: 'Peach · Coin Values', track: 'grade1' },
  data_graphs1: { label: 'Peach · Data & Graphs', track: 'grade1' },
  halves_fourths: { label: 'Labubu · Halves & Fourths', track: 'grade1' },
  financial_literacy1: { label: 'Kitty · Money Basics', track: 'grade1' },
  word_problems1: { label: 'Kitty · Word Problems', track: 'grade1' },
  ordinals1: { label: 'Peach · Ordinal Numbers', track: 'grade1' },
  bar_graphs1: { label: 'Peach · Bar Graphs', track: 'grade1' },
  coin_counting1: { label: 'Peach · Counting Coins', track: 'grade1' },
  venn1: { label: 'Labubu · Venn Diagrams', track: 'grade1' },

  add2: { label: 'Peach · Add to 100', track: 'grade2' },
  sub2: { label: 'Peach · Subtract to 100', track: 'grade2' },
  numberline_add2: { label: 'Peach · Number Lines', track: 'grade2' },
  money: { label: 'Peach · Money', track: 'grade2' },
  measure: { label: 'Kitty · Measure', track: 'grade2' },
  graph_read1: { label: 'Peach · Data & Graphs', track: 'grade2' },
  place2: { label: 'Peach · Place Value to 1,000', track: 'grade2' },
  numbers_forms: { label: 'Peach · Number Forms', track: 'grade2' },
  add_sub_1000: { label: 'Peach · Add/Sub to 1,000', track: 'grade2' },
  rounding: { label: 'Peach · Rounding', track: 'grade2' },
  money2: { label: 'Peach · Money to $100', track: 'grade2' },
  time2: { label: 'Kitty · Time', track: 'grade2' },
  perimeter2: { label: 'Kitty · Perimeter', track: 'grade2' },
  area1: { label: 'Labubu · Area', track: 'grade2' },
  line_plots1: { label: 'Peach · Line Plots', track: 'grade2' },
  polygons2: { label: 'Labubu · Polygons', track: 'grade2' },
  shapes_3d_2: { label: 'Labubu · 3D Shapes', track: 'grade2' },
  fractions2: { label: 'Labubu · Fractions to Eighths', track: 'grade2' },
  financial_literacy2: { label: 'Kitty · Financial Literacy', track: 'grade2' },
  compare_1000: { label: 'Peach · Compare to 1,000', track: 'grade2' },
  skip_100s_even_odd: { label: 'Peach · Skip-Count by 100s & Even/Odd', track: 'grade2' },
  estimate_word_problems2: { label: 'Peach · Estimation Word Problems', track: 'grade2' },
  calendar2: { label: 'Kitty · Calendar', track: 'grade2' },
  graph_select2: { label: 'Peach · Match the Graph', track: 'grade2' },

  multiply: { label: 'Labubu · Multiplication', track: 'grade3' },
  multiply_facts: { label: 'Labubu · Times Tables', track: 'grade3' },
  divide: { label: 'Labubu · Division', track: 'grade3' },
  division_facts: { label: 'Labubu · Division Facts', track: 'grade3' },
  remainder: { label: 'Labubu · Remainder', track: 'grade3' },
  fractions1: { label: 'Labubu · Fractions', track: 'grade3' },
  mult_properties: { label: 'Labubu · Multiplication Properties', track: 'grade3' },
  mult_2digit: { label: 'Labubu · 2-Digit Multiplication', track: 'grade3' },
  division_fluency12: { label: 'Labubu · Division to 12', track: 'grade3' },
  rounding_estimate: { label: 'Labubu · Rounding & Estimation', track: 'grade3' },
  add_sub_4digit: { label: 'Labubu · Add/Sub to 10,000', track: 'grade3' },
  word_problems3: { label: 'Labubu · Two-Step Word Problems', track: 'grade3' },
  fractions_numberline: { label: 'Labubu · Fractions on a Number Line', track: 'grade3' },
  fractions_equivalent: { label: 'Labubu · Equivalent Fractions', track: 'grade3' },
  fractions_compare: { label: 'Labubu · Compare & Order Fractions', track: 'grade3' },
  area_perimeter3: { label: 'Labubu · Area & Perimeter', track: 'grade3' },
  geometry3: { label: 'Labubu · Lines, Angles & Quadrilaterals', track: 'grade3' },
  time3: { label: 'Labubu · Time', track: 'grade3' },
  mass_volume: { label: 'Labubu · Mass & Volume', track: 'grade3' },
  data3: { label: 'Labubu · Data & Graphs', track: 'grade3' },
  mult_word_problems3: { label: 'Labubu · Multiplication Word Problems', track: 'grade3' },
  area_advanced3: { label: 'Labubu · Missing Side & Compare Area', track: 'grade3' },
  lines_types3: { label: 'Labubu · Parallel, Perpendicular & Intersecting', track: 'grade3' },
  arithmetic_patterns3: { label: 'Labubu · Number Patterns', track: 'grade3' },
  fractions_group3: { label: 'Labubu · Fractions of a Group', track: 'grade3' },

  multiply_intro: { label: '🌟 What is Multiplication?', track: 'multiply' },
  multiply_main_1: { label: '×2 & ×4', track: 'multiply' },
  multiply_main_2: { label: '×5 & ×10', track: 'multiply' },
  multiply_main_3: { label: '×3 & ×6', track: 'multiply' },
  multiply_main_4: { label: '×7 & ×8', track: 'multiply' },
  multiply_main_5: { label: '×9', track: 'multiply' },

  divide_intro: { label: '🌟 What is Division?', track: 'divide' },
  divide_main_1: { label: '÷2 & ÷4', track: 'divide' },
  divide_main_2: { label: '÷5 & ÷10', track: 'divide' },
  divide_main_3: { label: '÷3 & ÷6', track: 'divide' },
  divide_main_4: { label: '÷7 & ÷8', track: 'divide' },
  divide_main_5: { label: '÷9', track: 'divide' },

  soar1: { label: 'SOAR white belt', track: 'soar' },
  soar2: { label: 'SOAR yellow belt', track: 'soar' },
  soar3: { label: 'SOAR black belt', track: 'soar' }
};

// ============================================================
//  CURRICULUM - navigation tree only: track -> units -> skill ids
// ============================================================
const CURRICULUM = {
  grade1: {
    label: "🍭 K/1st · Hello Kitty's Basics",
    units: [
      { id: 'g1_counting', label: 'Unit 1 · Counting to 120', skills: ['counting_120', 'skip_counting', 'ordinals1'] },
      { id: 'g1_place', label: 'Unit 2 · Tens & Ones', skills: ['place1', 'compare_symbols'] },
      { id: 'g1_add_sub', label: 'Unit 3 · Addition & Subtraction to 20', skills: ['add1', 'sub1', 'strategies20', 'equations_truefalse', 'word_problems1'] },
      { id: 'g1_patterns', label: 'Unit 4 · Patterns', skills: ['patterns1'] },
      { id: 'g1_time', label: 'Unit 5 · Telling Time', skills: ['clock_read1'] },
      { id: 'g1_calendar', label: 'Unit 6 · Calendar & Seasons', skills: ['calendar_seasons'] },
      { id: 'g1_money', label: 'Unit 7 · Coin Values', skills: ['coin_id', 'coin_counting1'] },
      { id: 'g1_data', label: 'Unit 8 · Data & Graphs', skills: ['data_graphs1', 'bar_graphs1'] },
      { id: 'g1_shapes', label: 'Unit 9 · 2D & 3D Shapes', skills: ['shapes1', 'shapes_3d', 'venn1'] },
      { id: 'g1_fractions', label: 'Unit 10 · Halves & Fourths', skills: ['halves_fourths'] },
      { id: 'g1_financial', label: 'Unit 11 · Money Basics', skills: ['financial_literacy1'] }
    ]
  },
  grade2: {
    label: "👑 2nd Grade · Princess Peach's Power-ups",
    units: [
      { id: 'g2_place', label: 'Unit 1 · Place Value to 1,000', skills: ['place2', 'numbers_forms', 'compare_1000', 'skip_100s_even_odd'] },
      { id: 'g2_add_sub', label: 'Unit 2 · Add & Subtract to 1,000', skills: ['add2', 'sub2', 'numberline_add2', 'add_sub_1000', 'rounding', 'estimate_word_problems2'] },
      { id: 'g2_money', label: 'Unit 3 · Money', skills: ['money', 'money2'] },
      { id: 'g2_time', label: 'Unit 4 · Time', skills: ['time2'] },
      { id: 'g2_calendar', label: 'Unit 5 · Calendar', skills: ['calendar2'] },
      { id: 'g2_measure', label: 'Unit 6 · Measurement', skills: ['measure', 'perimeter2'] },
      { id: 'g2_area', label: 'Unit 7 · Area', skills: ['area1'] },
      { id: 'g2_data', label: 'Unit 8 · Data & Graphs', skills: ['graph_read1', 'line_plots1', 'graph_select2'] },
      { id: 'g2_shapes', label: 'Unit 9 · 2D & 3D Shapes', skills: ['polygons2', 'shapes_3d_2'] },
      { id: 'g2_fractions', label: 'Unit 10 · Fractions to Eighths', skills: ['fractions2'] },
      { id: 'g2_financial', label: 'Unit 11 · Financial Literacy', skills: ['financial_literacy2'] }
    ]
  },
  grade3: {
    label: "🐾 3rd Grade · Labubu's MMA Math",
    units: [
      { id: 'g3_multiply', label: 'Unit 1 · Multiplication', skills: ['multiply', 'multiply_facts', 'mult_properties', 'mult_2digit'] },
      { id: 'g3_divide', label: 'Unit 2 · Division', skills: ['divide', 'division_facts', 'remainder', 'division_fluency12'] },
      { id: 'g3_estimation', label: 'Unit 3 · Rounding, Estimation & Big Numbers', skills: ['rounding_estimate', 'add_sub_4digit'] },
      { id: 'g3_word_problems', label: 'Unit 4 · Two-Step Word Problems', skills: ['word_problems3', 'mult_word_problems3'] },
      { id: 'g3_fractions', label: 'Unit 5 · Fractions', skills: ['fractions1', 'fractions_numberline', 'fractions_equivalent', 'fractions_compare', 'fractions_group3'] },
      { id: 'g3_area_perimeter', label: 'Unit 6 · Area & Perimeter', skills: ['area_perimeter3', 'area_advanced3'] },
      { id: 'g3_geometry', label: 'Unit 7 · Lines, Angles & Quadrilaterals', skills: ['geometry3', 'lines_types3'] },
      { id: 'g3_time', label: 'Unit 8 · Time', skills: ['time3'] },
      { id: 'g3_measurement', label: 'Unit 9 · Mass & Volume', skills: ['mass_volume'] },
      { id: 'g3_data', label: 'Unit 10 · Data & Graphs', skills: ['data3'] },
      { id: 'g3_patterns', label: 'Unit 11 · Number Patterns', skills: ['arithmetic_patterns3'] }
    ]
  },
  multiply: {
    label: "✖️ MULTIPLICATION · Labubu's Group Grapple",
    units: [
      { id: 'm_intro', label: 'Getting Started', skills: ['multiply_intro'] },
      { id: 'm_facts', label: 'Times Tables', skills: ['multiply_main_1', 'multiply_main_2', 'multiply_main_3', 'multiply_main_4', 'multiply_main_5'] }
    ]
  },
  divide: {
    label: "➗ DIVISION · Labubu's Sharing Takedown",
    units: [
      { id: 'd_intro', label: 'Getting Started', skills: ['divide_intro'] },
      { id: 'd_facts', label: 'Division Tables', skills: ['divide_main_1', 'divide_main_2', 'divide_main_3', 'divide_main_4', 'divide_main_5'] }
    ]
  },
  soar: {
    label: "🦍 LABUBU'S SOAR (open‑ended mma)",
    units: [
      { id: 's_all', label: 'Challenges', skills: ['soar1', 'soar2', 'soar3'] }
    ]
  }
};
