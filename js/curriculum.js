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

  add2: { label: 'Peach · Add to 100', track: 'grade2' },
  sub2: { label: 'Peach · Subtract to 100', track: 'grade2' },
  numberline_add2: { label: 'Peach · Number Lines', track: 'grade2' },
  money: { label: 'Peach · Money', track: 'grade2' },
  measure: { label: 'Kitty · Measure', track: 'grade2' },
  graph_read1: { label: 'Peach · Data & Graphs', track: 'grade2' },

  multiply: { label: 'Labubu · Multiplication', track: 'grade3' },
  multiply_facts: { label: 'Labubu · Times Tables', track: 'grade3' },
  divide: { label: 'Labubu · Division', track: 'grade3' },
  division_facts: { label: 'Labubu · Division Facts', track: 'grade3' },
  remainder: { label: 'Labubu · Remainder', track: 'grade3' },
  fractions1: { label: 'Labubu · Fractions', track: 'grade3' },

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
      { id: 'g1_add_sub', label: 'Unit 1 · Addition & Subtraction', skills: ['add1', 'sub1'] },
      { id: 'g1_place', label: 'Unit 2 · Tens & Ones', skills: ['place1'] },
      { id: 'g1_time', label: 'Unit 3 · Telling Time', skills: ['clock_read1'] },
      { id: 'g1_shapes', label: 'Unit 4 · 2D Shapes', skills: ['shapes1'] }
    ]
  },
  grade2: {
    label: "👑 2nd Grade · Princess Peach's Power-ups",
    units: [
      { id: 'g2_add_sub', label: 'Unit 1 · Add & Subtract to 100', skills: ['add2', 'sub2', 'numberline_add2'] },
      { id: 'g2_money', label: 'Unit 2 · Money', skills: ['money'] },
      { id: 'g2_measure', label: 'Unit 3 · Measurement', skills: ['measure'] },
      { id: 'g2_data', label: 'Unit 4 · Data & Graphs', skills: ['graph_read1'] }
    ]
  },
  grade3: {
    label: "🐾 3rd Grade · Labubu's MMA Math",
    units: [
      { id: 'g3_multiply', label: 'Unit 1 · Multiplication', skills: ['multiply', 'multiply_facts'] },
      { id: 'g3_divide', label: 'Unit 2 · Division', skills: ['divide', 'division_facts', 'remainder'] },
      { id: 'g3_fractions', label: 'Unit 3 · Fractions', skills: ['fractions1'] }
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
