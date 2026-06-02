// ============================================================
//  CUTE COMBAT DOJO - COMPLETE SCRIPT (FULLY CORRECTED)
//  Fixed: Removed extra semicolons inside shuffle() calls
// ============================================================

// Helper functions
function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// ============================================================
//  HINT FUNCTIONS (Visual, step-by-step explanations)
// ============================================================
function hBubble(html) { return `<div class="hint-bubble">${html}</div>`; }
function hChip(n, bg) { return `<span class="hint-chip" style="background:${bg || '#fbe158'};color:#3e1b2b;">${n}</span>`; }
function hChips(steps, hlLast) { return steps.map((n, i) => hChip(n, (hlLast && i === steps.length - 1) ? '#9bc4cb' : '#fbe158')).join(' '); }
function hCol(rows) { const lines = rows.map(r => `<div style="color:${r.c || '#fbe158'};font-family:'Courier New';font-size:1.4rem;text-align:right;padding:1px 0;">${r.t}</div>`).join(''); return `<div style="text-align:center;margin:8px 0;"><div class="hint-col">${lines}</div></div>`; }
function hWrap(border, icon, title, body) { return `<div style="border:3px solid ${border};border-radius:20px;padding:14px;margin:6px 0;"><div style="color:${border};font-weight:900;font-size:1.1rem;text-align:center;margin-bottom:10px;">${icon} ${title}</div>${body}</div>`; }

function subtractHint(big, small) {
  const oB = big % 10, oS = small % 10, tB = Math.floor(big / 10), tS = Math.floor(small / 10);
  const needBorrow = oB < oS, ans = big - small;
  const pad = String(big).length;
  if (!needBorrow) {
    return hWrap('#9bc4cb', '➖', `${big} − ${small}`, hBubble(`<strong style="color:#fbe158;">Right side (ones):</strong> Is ${oB} ≥ ${oS}? <strong style="color:#9bc4cb;">YES ✅</strong> → ${oB} − ${oS} = ${oB - oS}`) + hBubble(`<strong style="color:#fbe158;">Left side (tens):</strong> ${tB} − ${tS} = ${tB - tS}`) + hCol([{ t: '  ' + big }, { t: '− ' + String(small).padStart(pad, ' ') }, { t: '─'.repeat(pad + 2), c: '#ffb6d1' }, { t: '  ' + ans, c: '#9bc4cb' }]) + hBubble(`<strong style="color:#9bc4cb;">✅ ${big} − ${small} = ${ans} ⭐</strong>`));
  } else {
    const bOnes = oB + 10, nTens = tB - 1, oDiff = bOnes - oS, tDiff = nTens - tS;
    const oSteps = Array.from({ length: oDiff }, (_, i) => oS + i + 1);
    return hWrap('#ffb6d1', '➖', `${big} − ${small} (borrowing)`, hBubble(`<strong style="color:#fbe158;">Right side (ones):</strong> Is ${oB} ≥ ${oS}? <strong style="color:#ffb6d1;">NO ❌</strong> → borrow!`) + hBubble(`<strong style="color:#fbe158;">Borrow 1 ten:</strong> left side ${tB}→${nTens} · right side ${oB}→${bOnes} (10+${oB}=${bOnes})`) + hBubble(`<strong style="color:#fbe158;">Right side: ${bOnes} − ${oS}</strong> → count up from ${oS}:<br><div class="hint-chips">${hChip(oS, '#ffb6d1')} → ${hChips(oSteps, true)}</div><em>${oSteps.join(', ')}</em> → <strong style="color:#9bc4cb;">${oDiff}</strong>`) + hBubble(`<strong style="color:#fbe158;">Left side (tens): ${nTens} − ${tS} = ${tDiff}</strong>`) + hCol([{ t: '  ' + big }, { t: '− ' + String(small).padStart(pad, ' ') }, { t: '─'.repeat(pad + 2), c: '#ffb6d1' }, { t: '  ' + ans, c: '#9bc4cb' }]) + hBubble(`<strong style="color:#9bc4cb;">✅ ${big} − ${small} = ${ans} ⭐</strong>`));
  }
}

function addHint(a, b) {
  const oA = a % 10, oB = b % 10, tA = Math.floor(a / 10), tB = Math.floor(b / 10);
  const oSum = oA + oB, needCarry = oSum > 9, oWrite = oSum % 10, carry = Math.floor(oSum / 10), ans = a + b;
  const bigO = Math.max(oA, oB), smlO = Math.min(oA, oB);
  const oSteps = Array.from({ length: smlO }, (_, i) => bigO + i + 1);
  const pad = String(a).length;
  if (!needCarry) {
    return hWrap('#9bc4cb', '➕', `${a} + ${b}`, hBubble(`<strong style="color:#fbe158;">Right side (ones): ${oA}+${oB}</strong> → count from ${bigO} up ${smlO} step${smlO !== 1 ? 's' : ''}:<br><div class="hint-chips">${hChip(bigO, '#ffb6d1')} → ${hChips(oSteps, true)}</div>${oSteps.length ? `<em>${oSteps.join(', ')}</em> → ` : ''}<strong style="color:#9bc4cb;">${oSum}</strong> (9 or less  -  no carry)`) + hBubble(`<strong style="color:#fbe158;">Left side (tens): ${tA}+${tB} = ${tA + tB}</strong>`) + hCol([{ t: '  ' + a }, { t: '+ ' + String(b).padStart(pad, ' ') }, { t: '─'.repeat(pad + 2), c: '#ffb6d1' }, { t: '  ' + ans, c: '#9bc4cb' }]) + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} + ${b} = ${ans} ⭐</strong>`));
  } else {
    return hWrap('#ffb6d1', '➕', `${a} + ${b} (carrying)`, hBubble(`<strong style="color:#fbe158;">Right side (ones): ${oA}+${oB}</strong> → count from ${bigO} up ${smlO}:<br><div class="hint-chips">${hChip(bigO, '#ffb6d1')} → ${hChips(oSteps, false)}</div>Total = <strong>${oSum}</strong>  -  <strong style="color:#ffb6d1;">>9!</strong><br>Write <strong style="color:#9bc4cb;">${oWrite}</strong> on right, carry <strong style="color:#fbe158;">${carry}</strong> to left.`) + hBubble(`<strong style="color:#fbe158;">Left side (tens): ${tA}+${tB}+${carry}(carried) = ${tA + tB + carry}</strong>`) + hCol([{ t: '  ' + carry, c: '#fbe158' }, { t: '  ' + a }, { t: '+ ' + String(b).padStart(pad, ' ') }, { t: '─'.repeat(pad + 2), c: '#ffb6d1' }, { t: '  ' + ans, c: '#9bc4cb' }]) + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} + ${b} = ${ans} ⭐</strong>`));
  }
}

function missingAddHint(total, known) { const ans = total - known; return hWrap('#ffb6d1', '❓', 'Missing Number  -  Addition', hBubble(`<strong style="color:#fbe158;">${known} + ? = ${total}</strong> → to find the missing number, subtract ${known} from ${total}.`) + subtractHint(total, known) + hBubble(`<strong style="color:#9bc4cb;">✅ Missing number = ${ans} ⭐</strong> · Check: ${known}+${ans}=${total} ✓`)); }

function missingSubHint(total, result) { const ans = total - result; return hWrap('#ffb6d1', '❓', 'Missing Number  -  Subtraction', hBubble(`<strong style="color:#fbe158;">${total} − ? = ${result}</strong> → subtract ${result} from ${total}.`) + subtractHint(total, result) + hBubble(`<strong style="color:#9bc4cb;">✅ Missing number = ${ans} ⭐</strong> · Check: ${total}−${ans}=${result} ✓`)); }

function addThreeHint(a, b, c) { const s1 = a + b; return hWrap('#9bc4cb', '🔺', 'Adding Three Numbers', hBubble(`<strong style="color:#fbe158;">Step 1  -  Add ${a} + ${b}:</strong>`) + addHint(a, b) + hBubble(`<strong style="color:#fbe158;">Step 2  -  Add ${c} to the result (${s1} + ${c}):</strong>`) + addHint(s1, c) + hBubble(`<strong style="color:#9bc4cb;">✅ ${a}+${b}+${c} = ${a + b + c} ⭐</strong>`)); }

function subThreeHint(total, b, c) { const s1 = total - b; return hWrap('#ffb6d1', '🔻', 'Subtracting Step by Step', hBubble(`<strong style="color:#fbe158;">Step 1  -  Subtract ${b} from ${total}:</strong>`) + subtractHint(total, b) + hBubble(`<strong style="color:#fbe158;">Step 2  -  Subtract ${c} from the result (${s1} − ${c}):</strong>`) + subtractHint(s1, c) + hBubble(`<strong style="color:#9bc4cb;">✅ ${total}−${b}−${c} = ${total - b - c} ⭐</strong>`)); }

function factFamilyHint(a, b, total) { return hWrap('#9bc4cb', '👪', 'Math Family (dojo trio)', hBubble(`<strong style="color:#fbe158;">👑 Big Boss = ${total}   🤝 Friends = ${a} & ${b}</strong>`) + hBubble(`<strong style="color:#fbe158;">➕ Plus (Friends → Boss):</strong><br>${hChip(a, '#ffb6d1')} + ${hChip(b, '#ffb6d1')} = ${hChip(total, '#fbe158')} ✅<br>${hChip(b, '#ffb6d1')} + ${hChip(a, '#ffb6d1')} = ${hChip(total, '#fbe158')} ✅`) + hBubble(`<strong style="color:#fbe158;">➖ Minus (Boss − Friend = Friend):</strong><br>${hChip(total, '#fbe158')} − ${hChip(a, '#ffb6d1')} = ${hChip(b, '#9bc4cb')} ✅<br>${hChip(total, '#fbe158')} − ${hChip(b, '#ffb6d1')} = ${hChip(a, '#9bc4cb')} ✅`) + hBubble(`🍑 <em>Big Boss must always be FIRST in minus, and LAST (after =) in plus!</em>`)); }

function composeAddHint(target) { const e = target > 10 ? 7 : 3, ans = target - e, e2 = e + 3, ans2 = target - e2; return hWrap('#9bc4cb', '🧩', 'Make a Sum', hBubble(`We need two different pairs that add to <strong>${target}</strong>. Let's find them!`) + hBubble(`<strong style="color:#fbe158;">Pair 1:</strong> Pick ${e}. Then ${e} + ? = ${target} → subtract:`) + subtractHint(target, e) + hBubble(`<strong style="color:#9bc4cb;">Pair 1: ${e} + ${ans} = ${target} ✅</strong>`) + hBubble(`<strong style="color:#fbe158;">Pair 2:</strong> Pick ${e2}. Then ${e2} + ? = ${target} → subtract:`) + subtractHint(target, e2) + hBubble(`<strong style="color:#9bc4cb;">Pair 2: ${e2} + ${ans2} = ${target} ✅ Now pick your own!</strong>`)); }

function composeSubHint(diff) { const big = diff + 2, sml = 2, big2 = diff + 3, sml2 = 3; return hWrap('#ffb6d1', '🔍', 'Find the Gap', hBubble(`🍪 <strong>Cookie Story:</strong> The first number is always the Boss (the whole tray). The gap must always equal ${diff}.`) + hBubble(`<strong style="color:#fbe158;">Case 1  -  Boss is known: ${big} − ? = ${diff}</strong><br>"You have ${big} cookies, ${diff} are left. How many did you eat?" → subtract:`) + subtractHint(big, diff) + hBubble(`<strong style="color:#9bc4cb;">${big} − ${sml} = ${diff} ✅</strong>`) + hBubble(`<strong style="color:#fbe158;">Case 2  -  Boss is hiding: ? − ${sml2} = ${diff}</strong><br>"Mystery bag: took out ${sml2}, ${diff} remain. How many at start?" → add:`) + addHint(diff, sml2) + hBubble(`<strong style="color:#9bc4cb;">${big2} − ${sml2} = ${diff} ✅</strong><br><em>Rule: Boss known → subtract · Boss hiding → add</em>`)); }

// ============================================================
//  MULTIPLICATION HINT FUNCTIONS
// ============================================================
function hintMultiply(a, b) {
  const ans = a * b;
  const steps = Array.from({ length: a }, (_, i) => (i + 1) * b);
  return hWrap('#fbe158', '✖️', `${a} × ${b} = ? (Group Grapple)`,
    hBubble(`<strong style="color:#fbe158;">🥊 MULTIPLICATION = GROUPS OF THE SAME SIZE</strong><br>
      Think of it like <strong>${a}</strong> fighting teams, each with <strong>${b}</strong> Labubu fighters.`)
    + hBubble(`<strong style="color:#fbe158;">Count by ${b}s, ${a} times:</strong><br>
      <div class="hint-chips">${steps.map((n, i) => hChip(n, i === steps.length - 1 ? '#9bc4cb' : '#fbe158')).join(' → ')}</div>
      <em>${steps.join(', ')}</em>`)
    + hCol([{ t: `  ${a} × ${b}` }, { t: '─────', c: '#9e8fc9' }, { t: `  ${ans}`, c: '#9bc4cb' }])
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} × ${b} = ${ans} ⭐</strong><br>
      <em>Remember: Multiplication is repeated addition!</em>`)
  );
}

function hintMultiplyFacts(a, b) {
  const ans = a * b;
  const steps = Array.from({ length: a }, (_, i) => (i + 1) * b);
  return hWrap('#fbe158', '🔢', `${a} × ${b} = ? (Times Table Strike)`,
    hBubble(`<strong style="color:#fbe158;">🥊 Skip counting by ${b}s:</strong><br>
      <div class="hint-chips">${steps.map((n, i) => hChip(n, i === steps.length - 1 ? '#9bc4cb' : '#fbe158')).join(' → ')}</div>`)
    + hBubble(`The ${a}th number is <strong style="color:#9bc4cb;">${ans}</strong>`)
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} × ${b} = ${ans} ⭐</strong>`)
  );
}

function hintNineTimes(a) {
  const ans = a * 9;
  const fingerLeft = a - 1;
  const fingerRight = 10 - a;
  return hWrap('#fbe158', '9️⃣', `${a} × 9 = ? (Ninja Finger Trick)`,
    hBubble(`<strong style="color:#fbe158;">🥊 THE NINE TIMES FINGER TRICK:</strong><br>
      Hold up all 10 fingers. Bend down finger #${a}.<br>
      Left of bent finger: <strong>${fingerLeft}</strong> fingers → tens digit.<br>
      Right of bent finger: <strong>${fingerRight}</strong> fingers → ones digit.<br>
      So ${a} × 9 = <strong style="color:#9bc4cb;">${ans}</strong>`)
    + hBubble(`Check: ${a} × 9 = ${a} tens - ${a} = ${a * 10} - ${a} = ${ans}`)
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} × 9 = ${ans} ⭐</strong>`)
  );
}

// ============================================================
//  DIVISION HINT FUNCTIONS
// ============================================================
function hintDivision(total, groups) {
  const perGroup = Math.floor(total / groups);
  const remainder = total % groups;
  const hasRemainder = remainder !== 0;

  let body = hBubble(`<strong style="color:#9bc4cb;">🥊 DIVISION = SHARING EQUALLY</strong><br>
    We have <strong>${total}</strong> cookies to share among <strong>${groups}</strong> Labubu friends.`);

  if (hasRemainder) {
    body += hBubble(`Each friend gets <strong>${perGroup}</strong> cookies, and <strong>${remainder}</strong> are left over.<br>
      So: ${total} ÷ ${groups} = <strong style="color:#9bc4cb;">${perGroup} R${remainder}</strong>`)
      + hBubble(`<strong style="color:#9bc4cb;">✅ ${total} ÷ ${groups} = ${perGroup} R${remainder} ⭐</strong>`);
  } else {
    body += hBubble(`Each friend gets <strong style="color:#9bc4cb;">${perGroup}</strong> cookies.<br>
      Check: ${perGroup} × ${groups} = ${perGroup * groups} ✓`)
      + hBubble(`<strong style="color:#9bc4cb;">✅ ${total} ÷ ${groups} = ${perGroup} ⭐</strong>`);
  }
  return hWrap('#9bc4cb', '➗', `${total} ÷ ${groups} = ? (Sharing Takedown)`, body);
}

function hintDivisionFacts(total, divisor) {
  const quotient = total / divisor;
  return hWrap('#9bc4cb', '🔄', `${total} ÷ ${divisor} = ? (Fact Family Reversal)`,
    hBubble(`<strong style="color:#9bc4cb;">🥊 DIVISION IS THE OPPOSITE OF MULTIPLICATION</strong><br>
      Think: What number × ${divisor} = ${total}?`)
    + hBubble(`We found it! <strong style="color:#9bc4cb;">${quotient}</strong> × ${divisor} = ${total}`)
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${total} ÷ ${divisor} = ${quotient} ⭐</strong>`)
  );
}

function hintNineDivision(total) {
  const quotient = total / 9;
  return hWrap('#9bc4cb', '9️⃣', `${total} ÷ 9 = ? (Ninja Finger Trick Reverse)`,
    hBubble(`<strong style="color:#9bc4cb;">🥊 Use the nine times finger trick backwards!</strong><br>
      If ${quotient} × 9 = ${total}, then ${total} ÷ 9 = ${quotient}`)
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${total} ÷ 9 = ${quotient} ⭐</strong>`)
  );
}

// ============================================================
//  NEW: MULTIPLICATION INTRO LESSONS (What is Multiplication?)
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
//  NEW: DIVISION INTRO LESSONS (What is Division?)
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
//  COMPLETE LESSON DATA - FULLY CORRECTED
//  (Removed extra semicolons inside all shuffle() calls)
// ============================================================

const LESSONS = {
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

  // NEW: Multiplication Intro (3 lessons)
  multiply_intro: multiply_intro,
  
  // Multiplication Main Sections - FIXED (removed extra semicolons)
  multiply_main_1: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×2 = double! Just add the number to itself." : i === 1 ? "×4 = double twice!" : i === 2 ? "×2 facts speed round" : i === 3 ? "×4 facts speed round" : i === 4 ? "Mixed ×2 & ×4 challenge!" : "", visual: i === 0 ? "2×3 = 3+3 = 6" : i === 1 ? "4×3 = 3+3=6, double to 12" : "⚡", example: i === 0 ? "2×5=10" : i === 1 ? "4×5=20" : "Practice!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 2 : i === 1 || i === 3 ? 4 : (Math.random() > 0.5 ? 2 : 4); return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiply(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_2: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×5 = count by 5s!" : i === 1 ? "×10 = add a zero!" : i === 2 ? "×5 facts speed" : i === 3 ? "×10 facts speed" : i === 4 ? "Mixed ×5 & ×10!" : "", visual: i === 0 ? "5,10,15,20,25..." : "10,20,30,40...", example: "Quick strikes!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 5 : 10; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_3: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×3 = triple strike!" : i === 1 ? "×6 = double ×3" : i === 2 ? "×3 facts" : i === 3 ? "×6 facts" : i === 4 ? "Mixed ×3 & ×6!" : "", visual: i === 0 ? "3,6,9,12..." : "6,12,18,24...", example: "Power up!", gen: () => { let a = rnd(2, 9); let b = i === 0 || i === 2 ? 3 : 6; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_4: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×7 = lucky seven!" : i === 1 ? "×8 = octopus attack!" : i === 2 ? "×7 facts" : i === 3 ? "×8 facts" : i === 4 ? "Mixed ×7 & ×8!" : "", visual: i === 0 ? "7,14,21,28..." : "8,16,24,32...", example: "Strike hard!", gen: () => { let a = rnd(2, 8); let b = i === 0 || i === 2 ? 7 : 8; return { q: `${a} × ${b} = ?`, ans: a * b, h: () => hintMultiplyFacts(a, b), opts: shuffle([a * b, a * b + b, a * b - b, a]) }; } })),
  multiply_main_5: Array(5).fill().map((_, i) => ({ learn: i === 0 ? "×9 finger trick!" : i === 1 ? "×9 more practice" : i === 2 ? "×9 ninja strikes" : i === 3 ? "×9 speed round" : i === 4 ? "Master ×9!" : "", visual: i === 0 ? "Bend finger #3 → 2 and 7 = 27" : "9,18,27,36...", example: "9×8=72", gen: () => { let a = rnd(2, 9); return { q: `${a} × 9 = ?`, ans: a * 9, h: () => hintNineTimes(a), opts: shuffle([a * 9, a * 9 + 9, a * 9 - 9, a]) }; } })),

  // NEW: Division Intro (3 lessons)
  divide_intro: divide_intro,
  
  // Division Main Sections - FIXED (removed extra semicolons)
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
    { learn: "SOAR Challenge 5", visual: "Money", example: "Calculate change", isSoar: true, gen: () => { let p = rnd(2, 4), c = rnd(3, 6); return { q: `${p} pencils at ${c}p each, pay 20p. Change?`, ans: 20 - p * c, h: () => subtractHint(20, p * c), opts: shuffle([20 - p * c, 20 - p * c + 1, 20 - p * c - 1, p * c]) }; } }
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
    { learn: "SOAR Grade 3 Challenge 5", visual: "Multi-step", example: "Solve step by step", isSoar: true, gen: () => { let price = rnd(3, 9), qty = rnd(3, 6), paid = price * qty + 5; return { q: `${qty} books at £${price} each, pay £${paid}. Change?`, ans: paid - price * qty, h: () => subtractHint(paid, price * qty), opts: shuffle([paid - price * qty, paid - price * qty + 1, paid - price * qty - 1, price]) }; } }
  ]
};

// Pad all lessons to 5
for (let cat in LESSONS) {
  while (LESSONS[cat].length < 5) LESSONS[cat].push(LESSONS[cat][LESSONS[cat].length - 1] || LESSONS[cat][0]);
}

// Categories metadata
const CATEGORIES = {
  add1: { label: 'Hello Kitty · Addition', grade: 1 },
  sub1: { label: 'Peach · Subtraction', grade: 1 },
  place1: { label: 'Labubu · Tens & Ones', grade: 1 },
  add2: { label: 'Peach · Add to 100', grade: 2 },
  sub2: { label: 'Peach · Subtract to 100', grade: 2 },
  money: { label: 'Peach · Money', grade: 2 },
  measure: { label: 'Kitty · Measure', grade: 2 },
  multiply: { label: 'Labubu · Multiplication', grade: 3 },
  multiply_facts: { label: 'Labubu · Times Tables', grade: 3 },
  divide: { label: 'Labubu · Division', grade: 3 },
  division_facts: { label: 'Labubu · Division Facts', grade: 3 },
  remainder: { label: 'Labubu · Remainder', grade: 3 },
  
  // NEW: Multiplication Intro
  multiply_intro: { label: '🌟 What is Multiplication?', grade: 'multiply' },
  
  // Multiplication Main
  multiply_main_1: { label: '×2 & ×4', grade: 'multiply' },
  multiply_main_2: { label: '×5 & ×10', grade: 'multiply' },
  multiply_main_3: { label: '×3 & ×6', grade: 'multiply' },
  multiply_main_4: { label: '×7 & ×8', grade: 'multiply' },
  multiply_main_5: { label: '×9', grade: 'multiply' },
  
  // NEW: Division Intro
  divide_intro: { label: '🌟 What is Division?', grade: 'divide' },
  
  // Division Main
  divide_main_1: { label: '÷2 & ÷4', grade: 'divide' },
  divide_main_2: { label: '÷5 & ÷10', grade: 'divide' },
  divide_main_3: { label: '÷3 & ÷6', grade: 'divide' },
  divide_main_4: { label: '÷7 & ÷8', grade: 'divide' },
  divide_main_5: { label: '÷9', grade: 'divide' },
  
  // SOAR
  soar1: { label: 'SOAR white belt', grade: 'soar' },
  soar2: { label: 'SOAR yellow belt', grade: 'soar' },
  soar3: { label: 'SOAR black belt', grade: 'soar' }
};

let progress = {};
try { progress = JSON.parse(localStorage.getItem('safia_math_adv_v4')) || {}; } catch (e) { }
for (let c in CATEGORIES) {
  if (!progress[c]) progress[c] = {};
  for (let l = 1; l <= 5; l++) { if (!progress[c][l]) progress[c][l] = { done: false, stars: 0 }; }
}

let currentCat = '', currentLvl = 1, questions = [], qIdx = 0, correct = 0, wrong = 0, mistakes = [], answered = false, hintShown = false, lessonData = null, currentQ = null;

function saveProgress() {
  const blob = new Blob([JSON.stringify(progress)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'safia_math_adv.json'; a.click();
  document.getElementById('saveLbl').textContent = '✅ Saved!'; setTimeout(updateLbl, 2000);
}

function loadProgress() { document.getElementById('loadFile').click(); }

function loadFile(e) {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = ev => { try { progress = JSON.parse(ev.target.result); updateLbl(); document.getElementById('saveLbl').textContent = '✅ Loaded!'; } catch { alert('Could not load'); } };
  r.readAsText(file); e.target.value = '';
}

function updateLbl() {
  let stars = 0, done = 0, total = 0;
  for (let c in CATEGORIES) for (let l = 1; l <= 5; l++) { total++; if (progress[c]?.[l]?.stars) stars += progress[c][l].stars; if (progress[c]?.[l]?.done) done++; }
  document.getElementById('saveLbl').innerHTML = `⭐ ${stars} power stars`;
  const ch = document.getElementById('progressChart');
  if (ch) {
    const pct = Math.round(done / total * 100);
    ch.innerHTML = `<h3 style="color:#fbe158;font-size:1.6rem;">📊 Dojo Progress</h3>
      <div style="background:#511e3a;border-radius:30px;height:22px;margin:10px 0;overflow:hidden;border:2px solid #fbe158;">
        <div style="width:${pct}%;height:22px;border-radius:30px;background:linear-gradient(90deg,#fbe158,#9bc4cb);"></div>
      </div>
      <div style="font-size:1.3rem;margin-top:10px;">⭐ ${stars} stars · ${done}/${total} belts earned (${pct}%)</div>`;
  }
}

function showScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0, 0); }

function showHome() { updateLbl(); showScreen('homeScreen'); }

function openCategory(c) {
  currentCat = c;
  const cat = CATEGORIES[c];
  const isMultiply = cat.grade === 'multiply';
  const isDivide = cat.grade === 'divide';
  const isSoar = cat.grade === 'soar';
  document.getElementById('levelsTitle').innerHTML = cat.label + '  -  pick a belt';
  const grid = document.getElementById('levelsGrid');
  grid.innerHTML = '';
  const icons = ['🌱', '🌿', '🍃', '🌟', '🏆'];
  for (let l = 1; l <= 5; l++) {
    const p = progress[c][l];
    const btn = document.createElement('button');
    btn.className = 'lv-btn' + (p.done ? ' done' : '') + (isMultiply ? ' multiply-lv' : '') + (isDivide ? ' divide-lv' : '');
    btn.innerHTML = `<span class="lv-icon">${icons[l - 1]}</span>${isSoar ? 'Challenge' : 'Fight'} ${l}${p.done ? `<div style="font-size:0.9rem;color:#9bc4cb;">⭐${p.stars}</div>` : ''}`;
    btn.onclick = function () { startLesson(c, l); };
    grid.appendChild(btn);
  }
  showScreen('levelsScreen');
}

function startLesson(cat, lvl) {
  currentLvl = lvl; qIdx = 0; correct = 0; wrong = 0; mistakes = []; answered = false; hintShown = false;
  lessonData = LESSONS[cat][lvl - 1];
  questions = [];
  const n = 3;
  for (let i = 0; i < n; i++) questions.push(lessonData.gen());
  document.getElementById('quizLabel').innerHTML = `${CATEGORIES[cat].label} · ${lessonData.isSoar ? 'SOAR' : 'Belt'} ${lvl}`;
  showScreen('quizScreen');
  renderLesson();
}

function renderLesson() {
  const isMultiply = CATEGORIES[currentCat]?.grade === 'multiply';
  const isDivide = CATEGORIES[currentCat]?.grade === 'divide';
  document.getElementById('lessonContainer').innerHTML = `
    <div class="lesson-card" style="${isMultiply ? 'background:#9b6a4a' : isDivide ? 'background:#4a6a5a' : ''}">
      <div class="lesson-badge">📚 ${lessonData.isSoar ? 'Labubu SOAR' : 'Dojo lesson'}</div>
      <div class="lesson-visual">${lessonData.visual}</div>
      <div class="lesson-explanation">✨ ${lessonData.learn}<br>
        <span style="background:#511e3a;padding:8px 14px;border-radius:40px;display:inline-block;margin-top:8px;">💡 Example: ${lessonData.example}</span>
      </div>
    </div>`;
  loadQuestion();
}

function loadQuestion() {
  if (qIdx >= questions.length) { showResult(); return; }
  answered = false; hintShown = false;
  currentQ = questions[qIdx];
  const total = questions.length;
  document.getElementById('quizQNum').textContent = `Q${qIdx + 1}/${total}`;
  document.getElementById('qsCorrect').textContent = correct;
  document.getElementById('qsWrong').textContent = wrong;
  document.getElementById('progFill').style.width = (qIdx / total * 100) + '%';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('hintBox').className = 'hint-box';
  document.getElementById('hintBox').innerHTML = '';
  document.getElementById('checkBtn').style.display = 'inline-flex';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('hintBtn').disabled = false;

  const q = currentQ;
  const isMultiply = CATEGORIES[currentCat]?.grade === 'multiply';
  const isDivide = CATEGORIES[currentCat]?.grade === 'divide';
  const cardClass = isMultiply ? 'multiply-q-card' : (isDivide ? 'divide-q-card' : (lessonData.isSoar ? 'soar-q-card' : 'q-card'));

  let inner = '';
  if (q.opts) {
    const opts = q.opts.map((opt, i) => `<button class="opt-btn" onclick="window.selectOpt(${i},'${opt}')">${opt}</button>`).join('');
    inner = `<div class="${cardClass}">
      <div class="question-text">${q.q.replace(/\n/g, '<br>')}</div>
      <div class="options-grid">${opts}</div>
    </div>`;
    document.getElementById('questionContainer').innerHTML = inner;
    document.getElementById('checkBtn').style.display = 'none';
  } else {
    inner = `<div class="${cardClass}">
      <div class="question-text">${q.q.replace(/\n/g, '<br>')}</div>
      <input class="soar-answer-input" id="soarInput" type="number" placeholder="Your answer…" autocomplete="off">
    </div>`;
    document.getElementById('questionContainer').innerHTML = inner;
    document.getElementById('soarInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  }
}

window.selectOpt = function (idx, val) {
  if (answered) return;
  answered = true;
  const q = currentQ;
  const isCorrect = (String(val) === String(q.ans));
  if (isCorrect) correct++; else { wrong++; mistakes.push({ q: q.q, ans: q.ans, hint: q.soarHint || '' }); }
  document.querySelectorAll('.opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (String(btn.innerText) === String(q.ans)) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });
  const fb = document.getElementById('feedback');
  fb.textContent = isCorrect ? '✅ Brilliant! Well done, fighter! ⭐' : '🤗 Not quite! Check the hint - you can do it!';
  fb.className = 'feedback show ' + (isCorrect ? 'ok' : 'bad');
  document.getElementById('nextBtn').style.display = 'inline-flex';
  document.getElementById('qsCorrect').textContent = correct;
  document.getElementById('qsWrong').textContent = wrong;
};

function checkAnswer() {
  if (answered) return;
  const inp = document.getElementById('soarInput');
  if (!inp) { document.getElementById('feedback').textContent = '👆 Pick an answer!'; document.getElementById('feedback').className = 'feedback show bad'; return; }
  const raw = inp.value.trim();
  if (!raw) { document.getElementById('feedback').textContent = '✏️ Type your answer first!'; document.getElementById('feedback').className = 'feedback show bad'; return; }
  answered = true;
  const q = currentQ;
  const isCorrect = parseInt(raw) === parseInt(q.ans);
  if (isCorrect) correct++; else { wrong++; mistakes.push({ q: q.q, ans: q.ans, hint: q.soarHint || '' }); }
  const fb = document.getElementById('feedback');
  fb.textContent = isCorrect ? `✅ Correct! ${q.ans} is right! ⭐` : `🤗 The answer is ${q.ans}. ${q.soarHint || ''}`;
  fb.className = 'feedback show ' + (isCorrect ? 'ok' : 'bad');
  document.getElementById('nextBtn').style.display = 'inline-flex';
  document.getElementById('checkBtn').style.display = 'none';
  document.getElementById('qsCorrect').textContent = correct;
  document.getElementById('qsWrong').textContent = wrong;
}

function showHint() {
  if (hintShown) return;
  hintShown = true;
  document.getElementById('hintBtn').disabled = true;
  const q = currentQ;
  const hBox = document.getElementById('hintBox');
  hBox.innerHTML = (q.h ? q.h() : `<div class="hint-bubble">💡 ${lessonData.example}</div>`);
  hBox.className = 'hint-box show';
}

function nextQuestion() { qIdx++; loadQuestion(); }

function showResult() {
  const total = questions.length;
  const stars = correct >= 3 ? 3 : correct >= 2 ? 2 : 1;
  const passed = correct >= 2;
  if (passed) { progress[currentCat][currentLvl].done = true; progress[currentCat][currentLvl].stars = Math.max(progress[currentCat][currentLvl].stars || 0, stars); }
  try { localStorage.setItem('safia_math_adv_v4', JSON.stringify(progress)); } catch (e) { }
  updateLbl();
  document.getElementById('resEmoji').textContent = stars >= 3 ? '🏆' : stars >= 2 ? '🌟' : '⭐';
  document.getElementById('resTitle').textContent = stars >= 3 ? 'Amazing fight!' : stars >= 2 ? 'Great job!' : 'Keep training!';
  document.getElementById('resStars').innerHTML = '⭐'.repeat(stars);
  document.getElementById('resMsg').innerHTML = passed ? `✨ ${correct}/${total} correct - belt earned!` : `💪 ${correct}/${total} correct. Try again?`;
  const ms = document.getElementById('mistakeSection');
  if (mistakes.length) {
    ms.innerHTML = '<div style="font-size:1.2rem;font-weight:900;margin:12px 0;">📝 Learn from these:</div>'
      + mistakes.map(m => `<div class="mistake-item">❓ ${m.q.replace(/\n/g, ' | ')}<br>✅ Answer: ${m.ans}${m.hint ? `<br>💡 ${m.hint.split('\n')[0]}` : ''}${m.hint ? m.hint.split('\n').slice(1).map(l => `<br>${l}`).join('') : ''}</div>`).join('');
  } else ms.innerHTML = '';
  document.getElementById('retryBtn').onclick = function () { startLesson(currentCat, currentLvl); };
  const nb = document.getElementById('nextLvBtn');
  if (passed && currentLvl < 5) { nb.style.display = 'inline-flex'; nb.onclick = function () { startLesson(currentCat, currentLvl + 1); }; }
  else nb.style.display = 'none';
  showScreen('resultScreen');
}

function leaveQuiz() { if (confirm('Leave this lesson?')) showHome(); }
function leaveQuizToLevels() { if (confirm('Go back to belts?')) openCategory(currentCat); }
function leaveAndGo(cat) { if (confirm('Leave this lesson?')) { openCategory(cat); } }

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-card[data-category]').forEach(card => {
    card.addEventListener('click', function () { openCategory(this.dataset.category); });
  });
  document.getElementById('saveBtn').addEventListener('click', saveProgress);
  document.getElementById('loadBtn').addEventListener('click', loadProgress);
  document.getElementById('loadFile').addEventListener('change', loadFile);
  document.getElementById('backToHomeBtn').addEventListener('click', showHome);
  document.getElementById('homeFromLevels').addEventListener('click', showHome);
  document.getElementById('soarFromLevels').addEventListener('click', () => openCategory('soar1'));
  document.getElementById('mathFromLevels').addEventListener('click', showHome);
  document.getElementById('homeFromQuiz').addEventListener('click', leaveQuiz);
  document.getElementById('levelsFromQuiz').addEventListener('click', leaveQuizToLevels);
  document.getElementById('homeFromQuizQuick').addEventListener('click', leaveQuiz);
  document.getElementById('soarFromQuiz').addEventListener('click', () => leaveAndGo('soar1'));
  document.getElementById('levelsFromQuizQuick').addEventListener('click', leaveQuizToLevels);
  document.getElementById('homeFromResult').addEventListener('click', showHome);
  document.getElementById('levelsFromResult').addEventListener('click', () => openCategory(currentCat));
  document.getElementById('homeFromResultBtn').addEventListener('click', showHome);
  document.getElementById('homeFromResultQuick').addEventListener('click', showHome);
  document.getElementById('soarFromResult').addEventListener('click', () => leaveAndGo('soar1'));
  document.getElementById('levelsFromResultQuick').addEventListener('click', () => openCategory(currentCat));
  document.getElementById('hintBtn').addEventListener('click', showHint);
  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  updateLbl();
});
