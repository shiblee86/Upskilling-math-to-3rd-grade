// ============================================================
//  DOJO SHARED LIBRARY
//  Pure helpers: RNG, hint-composition, and the visual-component
//  library. Every renderer here returns an HTML string (inline
//  SVG where useful) - no canvas, no framework, so it drops
//  straight into the existing innerHTML-based quiz engine.
// ============================================================

// Helper functions
function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// Per-track accent colors, tuned to read clearly on the app's dark recessed panels
const TRACK_THEME = {
  grade1: '#ffb6d1',
  grade2: '#fbe158',
  grade3: '#9bc4cb',
  multiply: '#fbe158',
  divide: '#9bc4cb',
  soar: '#9bc4cb'
};
const TRACK_CARD_CLASS = { grade1: 'grade1', grade2: 'grade2', grade3: 'grade3', multiply: 'multiply-card', divide: 'divide-card', soar: 'soar-card' };

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
//  VISUAL COMPONENT LIBRARY
//  New for Phase 1 - unblocks Time / Number Lines / Data & Graphs /
//  Geometry / Fractions content. All return an HTML string and can
//  be dropped straight into q.q, lessonData.visual, or a hint body.
// ============================================================

function vClock(hour, minute, theme) {
  theme = theme || '#9bc4cb';
  const hAngle = ((hour % 12) + minute / 60) * 30;
  const mAngle = minute * 6;
  const cx = 60, cy = 60, r = 54;
  const hourRad = (hAngle - 90) * Math.PI / 180;
  const minRad = (mAngle - 90) * Math.PI / 180;
  const hx = cx + 30 * Math.cos(hourRad), hy = cy + 30 * Math.sin(hourRad);
  const mx = cx + 46 * Math.cos(minRad), my = cy + 46 * Math.sin(minRad);
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const x1 = cx + (r - 6) * Math.cos(a), y1 = cy + (r - 6) * Math.sin(a);
    const x2 = cx + (r - 1) * Math.cos(a), y2 = cy + (r - 1) * Math.sin(a);
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${theme}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 120 120" width="150" height="150" role="img" aria-label="clock" style="vertical-align:middle;">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2f1f2f" stroke="${theme}" stroke-width="4"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#fef9d7" stroke-width="6" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#fef9d7" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="${theme}"/>
  </svg>`;
}

function vDigitalClock(hour, minute, theme) {
  theme = theme || '#9bc4cb';
  const h12 = ((hour + 11) % 12) + 1;
  const mm = String(minute).padStart(2, '0');
  return `<span style="display:inline-block;background:#2f0f2f;color:${theme};border:3px solid ${theme};border-radius:16px;padding:6px 16px;font-family:'Courier New',monospace;font-size:1.6rem;font-weight:900;letter-spacing:2px;">${h12}:${mm}</span>`;
}

function vNumberLine(min, max, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const step = opts.step || 1;
  const labelFn = opts.labelFn || (v => v);
  const w = 320, h = 90, pad = 20;
  const span = max - min;
  const xFor = v => pad + (v - min) / span * (w - pad * 2);
  let ticks = '', labels = '';
  // Compute each tick from the loop index (min + i*step) rather than
  // accumulating v += step, which drifts with fractional steps like 1/3
  // and can skip or duplicate the final tick.
  const stepCount = Math.round((max - min) / step);
  for (let i = 0; i <= stepCount; i++) {
    const v = min + i * step;
    const x = xFor(v);
    ticks += `<line x1="${x.toFixed(1)}" y1="34" x2="${x.toFixed(1)}" y2="46" stroke="${theme}" stroke-width="2"/>`;
    labels += `<text x="${x.toFixed(1)}" y="66" text-anchor="middle" fill="#fef9d7" font-size="12" font-family="'Courier New',monospace">${labelFn(v)}</text>`;
  }
  let hop = '';
  const markerId = 'dojoArrow' + Math.floor(Math.random() * 1e6);
  if (opts.jumpFrom !== undefined && opts.jumpTo !== undefined) {
    const x1 = xFor(opts.jumpFrom), x2 = xFor(opts.jumpTo);
    const midX = (x1 + x2) / 2;
    hop = `<path d="M ${x1.toFixed(1)} 32 Q ${midX.toFixed(1)} 14 ${x2.toFixed(1)} 32" fill="none" stroke="#ffb6d1" stroke-width="3" marker-end="url(#${markerId})"/>
      <text x="${midX.toFixed(1)}" y="10" text-anchor="middle" fill="#ffb6d1" font-size="13" font-weight="bold">${opts.jumpTo > opts.jumpFrom ? '+' : ''}${opts.jumpTo - opts.jumpFrom}</text>`;
  }
  let point = '';
  if (opts.point !== undefined) {
    const x = xFor(opts.point);
    point = `<circle cx="${x.toFixed(1)}" cy="40" r="6" fill="${theme}"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="max-width:360px;vertical-align:middle;" role="img" aria-label="number line from ${min} to ${max}">
    <defs><marker id="${markerId}" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ffb6d1"/></marker></defs>
    <line x1="${pad}" y1="40" x2="${w - pad}" y2="40" stroke="${theme}" stroke-width="3" stroke-linecap="round"/>
    ${ticks}${labels}${hop}${point}
  </svg>`;
}

function vBarGraph(data, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const max = opts.maxValue || Math.max(...data.map(d => d.value), 1);
  const barW = 60, gap = 18, h = 120, padBottom = 24;
  const totalW = data.length * (barW + gap) + gap;
  let bars = '';
  data.forEach((d, i) => {
    const barH = Math.round((d.value / max) * h);
    const x = gap + i * (barW + gap);
    const y = h - barH + 10;
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="6" fill="${theme}"/>
      <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" fill="#fef9d7" font-size="14" font-weight="bold">${d.value}</text>
      <text x="${x + barW / 2}" y="${h + padBottom}" text-anchor="middle" fill="#fef9d7" font-size="16">${d.label}</text>`;
  });
  return `<svg viewBox="0 0 ${totalW} ${h + padBottom + 12}" width="100%" height="${h + padBottom + 12}" style="max-width:${totalW}px;vertical-align:middle;" role="img" aria-label="bar graph">
    <line x1="0" y1="${h + 10}" x2="${totalW}" y2="${h + 10}" stroke="${theme}" stroke-width="2"/>
    ${bars}
  </svg>`;
}

function vPictograph(data, opts) {
  opts = opts || {};
  const icon = opts.icon || '⭐';
  const theme = opts.theme || '#9bc4cb';
  const rows = data.map(d => `
    <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
      <span style="min-width:70px;color:#fef9d7;font-weight:900;">${d.label}</span>
      <span style="font-size:1.3rem;letter-spacing:2px;">${icon.repeat(d.value)}</span>
    </div>`).join('');
  return `<div style="border:2px solid ${theme};border-radius:16px;padding:10px 14px;display:inline-block;text-align:left;">${rows}</div>`;
}

function tallyGroupSVG(theme) {
  return `<svg width="26" height="20" viewBox="0 0 26 20" style="vertical-align:middle;">
    <line x1="2" y1="2" x2="2" y2="18" stroke="${theme}" stroke-width="2"/>
    <line x1="8" y1="2" x2="8" y2="18" stroke="${theme}" stroke-width="2"/>
    <line x1="14" y1="2" x2="14" y2="18" stroke="${theme}" stroke-width="2"/>
    <line x1="20" y1="2" x2="20" y2="18" stroke="${theme}" stroke-width="2"/>
    <line x1="0" y1="18" x2="22" y2="2" stroke="${theme}" stroke-width="2"/>
  </svg>`;
}

function vTallyGraph(data, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const tallyFor = n => {
    const full = Math.floor(n / 5), rem = n % 5;
    let out = '';
    for (let i = 0; i < full; i++) out += tallyGroupSVG(theme);
    if (rem) out += `<span style="font-family:'Courier New',monospace;font-size:1.3rem;letter-spacing:3px;color:${theme};">${'|'.repeat(rem)}</span>`;
    return out;
  };
  const rows = data.map(d => `
    <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
      <span style="min-width:70px;color:#fef9d7;font-weight:900;">${d.label}</span>
      <span>${tallyFor(d.value)}</span>
    </div>`).join('');
  return `<div style="border:2px solid ${theme};border-radius:16px;padding:10px 14px;display:inline-block;text-align:left;">${rows}</div>`;
}

function regularPolygonPoints(n, cx, cy, r, rotationDeg) {
  rotationDeg = rotationDeg === undefined ? -90 : rotationDeg;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (rotationDeg + i * 360 / n) * Math.PI / 180;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

const SHAPE_POINTS = {
  triangle: () => regularPolygonPoints(3, 60, 66, 52),
  square: () => [[16, 16], [104, 16], [104, 104], [16, 104]],
  rectangle: () => [[8, 32], [112, 32], [112, 88], [8, 88]],
  pentagon: () => regularPolygonPoints(5, 60, 62, 50),
  hexagon: () => regularPolygonPoints(6, 60, 60, 48),
  heptagon: () => regularPolygonPoints(7, 60, 62, 50),
  octagon: () => regularPolygonPoints(8, 60, 60, 50),
  trapezoid: () => [[30, 20], [90, 20], [112, 100], [8, 100]],
  rhombus: () => [[60, 10], [104, 60], [60, 110], [16, 60]],
  parallelogram: () => [[30, 20], [110, 20], [90, 100], [10, 100]]
};
const SHAPE_SIDES = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, heptagon: 7, octagon: 8, trapezoid: 4, rhombus: 4, parallelogram: 4 };

function vUnitGrid(rows, cols, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const cell = 28;
  const w = cols * cell, h = rows * cell;
  let cells = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells += `<rect x="${c * cell}" y="${r * cell}" width="${cell}" height="${cell}" fill="${theme}22" stroke="${theme}" stroke-width="2"/>`;
    }
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="max-width:${w}px;vertical-align:middle;" role="img" aria-label="${rows} by ${cols} grid of unit squares">${cells}</svg>`;
}

function vLinePlot(data, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const w = 300, pad = 20;
  const span = Math.max(1, max - min);
  const xFor = v => pad + (v - min) / span * (w - pad * 2);
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const dotR = 7, gap = 16;
  const h = 40 + maxCount * gap;
  let dots = '', ticks = '', labels = '';
  for (let v = min; v <= max; v++) {
    const x = xFor(v);
    ticks += `<line x1="${x.toFixed(1)}" y1="${h - 30}" x2="${x.toFixed(1)}" y2="${h - 24}" stroke="${theme}" stroke-width="2"/>`;
    labels += `<text x="${x.toFixed(1)}" y="${h - 8}" text-anchor="middle" fill="#fef9d7" font-size="12">${v}</text>`;
  }
  data.forEach(d => {
    const x = xFor(d.value);
    for (let i = 0; i < d.count; i++) {
      dots += `<circle cx="${x.toFixed(1)}" cy="${h - 34 - i * gap}" r="${dotR}" fill="${theme}"/>`;
    }
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="max-width:${w}px;vertical-align:middle;" role="img" aria-label="line plot">
    <line x1="${pad}" y1="${h - 27}" x2="${w - pad}" y2="${h - 27}" stroke="${theme}" stroke-width="3" stroke-linecap="round"/>
    ${ticks}${labels}${dots}
  </svg>`;
}

function vShape(kind, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const gen = SHAPE_POINTS[kind] || SHAPE_POINTS.square;
  const pts = gen();
  const pointsAttr = pts.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
  let sideLabels = '';
  if (opts.labelSides) {
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      sideLabels += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="3" fill="#fef9d7"/>`;
    }
  }
  return `<svg viewBox="0 0 120 120" width="140" height="140" role="img" aria-label="${kind}" style="vertical-align:middle;">
    <polygon points="${pointsAttr}" fill="${theme}33" stroke="${theme}" stroke-width="4" stroke-linejoin="round"/>
    ${sideLabels}
  </svg>`;
}

function vAngle(degrees, theme) {
  theme = theme || '#9bc4cb';
  const cx = 20, cy = 100, len = 85;
  const rad = degrees * Math.PI / 180;
  const x2 = cx + len, y2 = cy;
  const x3 = cx + len * Math.cos(rad), y3 = cy - len * Math.sin(rad);
  const arcR = 24;
  const arcX = cx + arcR * Math.cos(rad / 2), arcY = cy - arcR * Math.sin(rad / 2);
  return `<svg viewBox="0 0 120 120" width="140" height="140" role="img" aria-label="${degrees} degree angle" style="vertical-align:middle;">
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${theme}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${x3.toFixed(1)}" y2="${y3.toFixed(1)}" stroke="${theme}" stroke-width="4" stroke-linecap="round"/>
    <path d="M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${arcX.toFixed(1)} ${arcY.toFixed(1)}" fill="none" stroke="#fef9d7" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#fef9d7"/>
  </svg>`;
}

function vFractionBar(numerator, denominator, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const segW = 44, segH = 44, gap = 3;
  const totalW = denominator * (segW + gap) - gap;
  let segs = '';
  for (let i = 0; i < denominator; i++) {
    const x = i * (segW + gap);
    const filled = i < numerator;
    segs += `<rect x="${x}" y="0" width="${segW}" height="${segH}" rx="6" fill="${filled ? theme : '#2f1f2f'}" stroke="${theme}" stroke-width="2"/>`;
  }
  let bar = `<svg viewBox="0 0 ${totalW} ${segH}" width="100%" height="${segH}" style="max-width:${totalW}px;vertical-align:middle;" role="img" aria-label="${numerator}/${denominator}">${segs}</svg>`;
  if (opts.compareTo) {
    const [n2, d2] = opts.compareTo;
    bar += `<div style="text-align:center;color:#fef9d7;font-weight:900;margin:6px 0;">vs</div>` + vFractionBar(n2, d2, { theme: opts.theme });
  }
  return `<div style="text-align:center;">${bar}</div>`;
}

function vFractionCircle(numerator, denominator, opts) {
  opts = opts || {};
  const theme = opts.theme || '#9bc4cb';
  const cx = 60, cy = 60, r = 54;
  let wedges = '';
  for (let i = 0; i < denominator; i++) {
    const a1 = (i * 360 / denominator - 90) * Math.PI / 180;
    const a2 = ((i + 1) * 360 / denominator - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = (360 / denominator) > 180 ? 1 : 0;
    const filled = i < numerator;
    wedges += `<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${filled ? theme : '#2f1f2f'}" stroke="#fef9d7" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 120 120" width="140" height="140" role="img" aria-label="${numerator}/${denominator}" style="vertical-align:middle;">${wedges}</svg>`;
}

// ---- Hint builders for the new components (same hWrap/hBubble idiom as above) ----

function hintClock(hour, minute) {
  const h12 = ((hour + 11) % 12) + 1;
  return hWrap('#ffb6d1', '🕐', 'What time is it?',
    hBubble(`The short hand (hour hand) points near <strong>${h12}</strong>. The long hand (minute hand) points to <strong>${minute === 0 ? '12' : minute}</strong>.`)
    + `<div style="text-align:center;margin:10px 0;">${vClock(hour, minute, '#ffb6d1')}</div>`
    + hBubble(`<strong style="color:#9bc4cb;">✅ It's ${vDigitalClock(hour, minute, '#9bc4cb')}</strong>`));
}

function hintShape(kind) {
  const sides = SHAPE_SIDES[kind] || 4;
  return hWrap('#9bc4cb', '🔺', 'What shape is this?',
    `<div style="text-align:center;margin:10px 0;">${vShape(kind, { theme: '#9bc4cb', labelSides: true })}</div>`
    + hBubble(`A <strong>${kind}</strong> has <strong style="color:#9bc4cb;">${sides}</strong> sides and ${sides} corners.`));
}

function hintNumberLineJump(a, b, ans) {
  return hWrap('#ffb6d1', '➡️', `${a} + ${b} on a number line`,
    hBubble(`Start at <strong>${a}</strong>, then hop forward <strong>${b}</strong> spaces.`)
    + `<div style="text-align:center;margin:10px 0;">${vNumberLine(0, a + b + Math.max(2, Math.round((a + b) * 0.1)), { theme: '#9bc4cb', jumpFrom: a, jumpTo: a + b, point: a })}</div>`
    + hBubble(`<strong style="color:#9bc4cb;">✅ ${a} + ${b} = ${ans} ⭐</strong>`));
}

function hintBarGraph(data, label, ans) {
  return hWrap('#fbe158', '📊', 'Read the graph',
    `<div style="text-align:center;margin:10px 0;">${vBarGraph(data, { theme: '#fbe158' })}</div>`
    + hBubble(`Find the bar for <strong>${label}</strong> - it reaches <strong style="color:#fbe158;">${ans}</strong>.`));
}

function hintFraction(num, den) {
  return hWrap('#9bc4cb', '🥧', `${num}/${den}`,
    `<div style="text-align:center;margin:10px 0;">${vFractionBar(num, den, { theme: '#9bc4cb' })}</div>`
    + hBubble(`${num} out of ${den} equal parts are shaded → <strong style="color:#9bc4cb;">${num}/${den}</strong>`));
}
