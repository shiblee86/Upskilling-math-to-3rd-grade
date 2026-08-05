// ============================================================
//  SAFIA'S AND SAFAAN'S MATH UPSKILLING DOJO - APP SHELL
//  Screens, progress/localStorage, and the quiz engine.
//  Curriculum data lives in js/curriculum.js, shared helpers and
//  the visual-component library live in js/lib.js (loaded first).
//  DYNAMIC QUESTION GENERATION: every question is generated fresh
//  on the spot from SKILLS[skillId][belt].gen(), never reused.
// ============================================================

let progress = {};
try { progress = JSON.parse(localStorage.getItem('dojo_math_v6')) || {}; } catch (e) { }
for (let skillId in SKILLS) {
  if (!progress[skillId]) progress[skillId] = {};
  SKILLS[skillId].forEach((_, i) => {
    const l = i + 1;
    if (!progress[skillId][l]) progress[skillId][l] = { done: false, stars: 0 };
  });
}
if (!progress.__units) progress.__units = {};
if (!progress.__challenges) progress.__challenges = {};
if (!progress.__fluency) progress.__fluency = {};

let currentTrack = '', currentCat = '', currentLvl = 1, questions = [], qIdx = 0, correct = 0, wrong = 0, mistakes = [], answered = false, hintShown = false, lessonData = null, currentQ = null;
let quizMode = 'belt', mixedQueue = [], currentUnitId = null;
let fluencyKind = '', fluencyScore = 0, fluencyBest = 0, fluencyTimeLeft = 60, fluencyTimerId = null, fluencyQ = null;

function saveProgress() {
  const blob = new Blob([JSON.stringify(progress)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'safia_and_safaan_math_dojo_progress.json'; a.click();
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
  for (let c in SKILLS) {
    SKILLS[c].forEach((_, i) => {
      const l = i + 1;
      total++;
      if (progress[c]?.[l]?.stars) stars += progress[c][l].stars;
      if (progress[c]?.[l]?.done) done++;
    });
  }
  document.getElementById('saveLbl').innerHTML = `⭐ ${stars} stars`;
  const ch = document.getElementById('progressChart');
  if (ch) {
    const pct = Math.round(done / total * 100);
    ch.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:var(--font-body);font-weight:900;color:var(--text-secondary);font-size:var(--text-sm);letter-spacing:0.5px;">TOTAL PROGRESS</div>
        <div style="background:var(--surface-2);color:var(--amber);border:2px solid var(--amber);border-radius:var(--radius-pill);padding:4px 14px;font-weight:900;font-size:var(--text-sm);">⭐ ${stars} stars</div>
      </div>
      <div class="prog-bar" style="margin-top:10px;height:18px;">
        <div class="prog-fill reward" style="width:${pct}%;"></div>
      </div>
      <div style="font-family:var(--font-body);color:var(--text-secondary);font-size:var(--text-sm);margin-top:8px;">${done}/${total} belts earned (${pct}%)</div>`;
  }
}

// Computed mastery tier for a skill - purely derived from existing belt
// progress (done/attempted), no separate storage needed.
const MASTERY_BADGE = { new: '🌱 New', attempted: '✏️ Attempted', familiar: '📘 Familiar', proficient: '🌟 Proficient', mastered: '🏆 Mastered' };
function skillMastery(skillId) {
  const belts = SKILLS[skillId].length;
  let done = 0, attempted = 0;
  for (let l = 1; l <= belts; l++) {
    const p = progress[skillId][l];
    if (p.done) done++;
    if (p.done || p.attempted) attempted++;
  }
  if (done === belts) return 'mastered';
  if (done >= belts / 2) return 'proficient';
  if (done > 0) return 'familiar';
  if (attempted > 0) return 'attempted';
  return 'new';
}

function showScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0, 0); }

function updateQuizStats() {
  document.getElementById('qsCorrect').textContent = correct;
  document.getElementById('qsWrong').textContent = wrong;
  const attempts = correct + wrong;
  document.getElementById('qsAccuracy').textContent = attempts ? `${Math.round(correct / attempts * 100)}%` : '0%';
}

function showHome() { updateLbl(); showScreen('homeScreen'); }

// ============================================================
//  UNITS SCREEN (track -> curriculum units -> skill cards)
// ============================================================
function openTrack(trackId) {
  currentTrack = trackId;
  const track = CURRICULUM[trackId];
  document.getElementById('unitsTitle').innerHTML = track.label + '  -  pick a unit';

  const challenge = progress.__challenges[trackId];
  const ccBtn = document.getElementById('courseChallengeBtn');
  ccBtn.innerHTML = `🏆 Course Challenge${challenge?.passed ? ` <span style="color:#17C7C7;">✅ ${challenge.bestPct}%</span>` : ''}`;
  ccBtn.onclick = () => startCourseChallenge(trackId);

  const fzBtn = document.getElementById('fluencyZoneBtn');
  const isFactTrack = trackId === 'multiply' || trackId === 'divide';
  fzBtn.style.display = isFactTrack ? 'inline-flex' : 'none';
  if (isFactTrack) {
    const best = progress.__fluency[trackId]?.best || 0;
    fzBtn.innerHTML = `⚡ Fluency Zone${best ? ` <span style="color:#17C7C7;">best ${best}</span>` : ''}`;
    fzBtn.onclick = () => startFluency(trackId);
  }

  const wrap = document.getElementById('unitsAccordion');
  wrap.innerHTML = '';
  track.units.forEach((unit, ui) => {
    const card = document.createElement('div');
    card.className = 'unit-card' + (ui === 0 ? ' open' : '');
    card.style.borderColor = TRACK_THEME[trackId];
    const skillCardsHTML = unit.skills.map(skillId => {
      const meta = SKILL_META[skillId];
      const tier = skillMastery(skillId);
      return `<div class="menu-card unit-skill-card ${TRACK_CARD_CLASS[trackId]}" data-skill="${skillId}">
        <div class="mc-icon">📘</div>
        <div class="mc-name">${meta.label}</div>
        <div class="mc-badge mastery-badge mastery-${tier}">${MASTERY_BADGE[tier]}</div>
      </div>`;
    }).join('');
    const uq = progress.__units[unit.id];
    card.innerHTML = `
      <button type="button" class="unit-header">${unit.label}</button>
      <div class="unit-body">
        <div class="menu-grid">${skillCardsHTML}</div>
        <button type="button" class="btn btn-unit-quiz">📝 Unit Quiz${uq?.passed ? ` ✅ ${uq.bestPct}%` : ''}</button>
      </div>`;
    card.querySelector('.unit-header').addEventListener('click', () => card.classList.toggle('open'));
    card.querySelectorAll('.unit-skill-card').forEach(el => {
      el.addEventListener('click', () => openCategory(el.dataset.skill));
    });
    card.querySelector('.btn-unit-quiz').addEventListener('click', () => startUnitQuiz(trackId, unit.id));
    wrap.appendChild(card);
  });
  showScreen('unitsScreen');
}

function startUnitQuiz(trackId, unitId) {
  const unit = CURRICULUM[trackId].units.find(u => u.id === unitId);
  currentTrack = trackId; currentUnitId = unitId; quizMode = 'unit';
  mixedQueue = buildQuestionPool(unit.skills, 2, 10);
  qIdx = 0; correct = 0; wrong = 0; mistakes = []; answered = false; hintShown = false;
  questions = mixedQueue;
  document.getElementById('quizLabel').innerHTML = `${unit.label} · Unit Quiz`;
  showScreen('quizScreen');
  renderLesson();
}

function startCourseChallenge(trackId) {
  const allSkills = CURRICULUM[trackId].units.flatMap(u => u.skills);
  currentTrack = trackId; quizMode = 'challenge';
  mixedQueue = buildQuestionPool(allSkills, 1, 16);
  qIdx = 0; correct = 0; wrong = 0; mistakes = []; answered = false; hintShown = false;
  questions = mixedQueue;
  document.getElementById('quizLabel').innerHTML = `${CURRICULUM[trackId].label} · Course Challenge`;
  showScreen('quizScreen');
  renderLesson();
}

function openCategory(c) {
  currentCat = c;
  const meta = SKILL_META[c];
  const isMultiply = meta.track === 'multiply';
  const isDivide = meta.track === 'divide';
  const isSoar = meta.track === 'soar';
  document.getElementById('levelsTitle').innerHTML = meta.label + '  -  pick a belt';
  const grid = document.getElementById('levelsGrid');
  grid.innerHTML = '';
  const icons = ['🌱', '🌿', '🍃', '🌟', '🏆', '💎', '👑', '🔥'];
  const belts = SKILLS[c].length;
  for (let l = 1; l <= belts; l++) {
    const p = progress[c][l];
    // Belts unlock sequentially: belt n is only playable once belt n-1 is done.
    const locked = l > 1 && !progress[c][l - 1].done;
    const btn = document.createElement('button');
    btn.className = 'lv-btn' + (p.done ? ' done' : '') + (locked ? ' locked' : '') + (isMultiply ? ' multiply-lv' : '') + (isDivide ? ' divide-lv' : '');
    btn.disabled = locked;
    btn.innerHTML = locked
      ? `<span class="lv-icon">🔒</span>${isSoar ? 'Challenge' : 'Belt'} ${l}`
      : `<span class="lv-icon">${icons[(l - 1) % icons.length]}</span>${isSoar ? 'Challenge' : 'Belt'} ${l}${p.done ? `<div style="font-size:0.9rem;color:var(--mint);">⭐${p.stars}</div>` : ''}`;
    if (!locked) btn.onclick = function () { startLesson(c, l); };
    grid.appendChild(btn);
  }
  showScreen('levelsScreen');
}

function startLesson(cat, lvl) {
  currentCat = cat; currentLvl = lvl; quizMode = 'belt'; qIdx = 0; correct = 0; wrong = 0; mistakes = []; answered = false; hintShown = false;
  lessonData = SKILLS[cat][lvl - 1];
  progress[cat][lvl].attempted = true;
  // Just set the number of questions (3 per belt), but questions will be generated on demand
  questions = [1, 2, 3]; // This just tracks count, actual questions are generated dynamically
  document.getElementById('quizLabel').innerHTML = `${SKILL_META[cat].label} · ${lessonData.isSoar ? 'SOAR' : 'Belt'} ${lvl}`;
  showScreen('quizScreen');
  renderLesson();
}

function renderLesson() {
  if (quizMode !== 'belt') {
    document.getElementById('lessonContainer').innerHTML = `
      <div class="lesson-card">
        <div class="lesson-badge">${quizMode === 'unit' ? '📝 Unit Quiz' : '🏆 Course Challenge'}</div>
        <div class="lesson-explanation">✨ Answer ${questions.length} questions mixing everything from ${quizMode === 'unit' ? 'this unit' : 'this course'}!</div>
      </div>`;
    loadQuestion();
    return;
  }
  document.getElementById('lessonContainer').innerHTML = `
    <div class="lesson-card">
      <div class="lesson-badge">📚 ${lessonData.isSoar ? 'SOAR Challenge' : 'Dojo lesson'}</div>
      <div class="lesson-visual">${lessonData.visual}</div>
      <div class="lesson-explanation">✨ ${lessonData.learn}<br>
        <span style="background:#123636;padding:8px 14px;border-radius:40px;display:inline-block;margin-top:8px;">💡 Example: ${lessonData.example}</span>
      </div>
    </div>`;
  loadQuestion();
}

function loadQuestion() {
  if (qIdx >= questions.length) { showResult(); return; }
  answered = false; hintShown = false;

  // DYNAMIC GENERATION: Generate a brand new question object every time!
  // This ensures every question is fresh and different!
  if (quizMode === 'belt') {
    currentQ = lessonData.gen();
  } else {
    const ref = mixedQueue[qIdx];
    currentQ = SKILLS[ref.skillId][ref.belt - 1].gen();
  }

  const total = questions.length;
  document.getElementById('quizQNum').textContent = `Q${qIdx + 1}/${total}`;
  updateQuizStats();
  document.getElementById('progFill').style.width = (qIdx / total * 100) + '%';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('hintBox').className = 'hint-box';
  document.getElementById('hintBox').innerHTML = '';
  document.getElementById('checkBtn').style.display = 'inline-flex';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('hintBtn').disabled = false;

  const q = currentQ;
  const isMultiply = SKILL_META[currentCat]?.track === 'multiply';
  const isDivide = SKILL_META[currentCat]?.track === 'divide';
  const cardClass = isMultiply ? 'multiply-q-card' : (isDivide ? 'divide-q-card' : ((quizMode === 'belt' && lessonData.isSoar) ? 'soar-q-card' : 'q-card'));

  let inner = '';
  if (q.opts) {
    const opts = q.opts.map((opt, i) => `<button class="opt-btn" onclick="window.selectOpt(${i},'${String(opt).replace(/'/g, "\\'")}')">${opt}</button>`).join('');
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
  updateQuizStats();
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
  updateQuizStats();
}

function showHint() {
  if (hintShown) return;
  hintShown = true;
  document.getElementById('hintBtn').disabled = true;
  const q = currentQ;
  const hBox = document.getElementById('hintBox');
  hBox.innerHTML = (q.h ? q.h() : (quizMode === 'belt' ? `<div class="hint-bubble">💡 ${lessonData.example}</div>` : ''));
  hBox.className = 'hint-box show';
}

function nextQuestion() { qIdx++; loadQuestion(); }

function showResult() {
  const total = questions.length;
  const nb = document.getElementById('nextLvBtn');
  const ms = document.getElementById('mistakeSection');

  if (quizMode !== 'belt') {
    const pctScore = Math.round(correct / total * 100);
    const passed = correct >= Math.ceil(total * 0.7);
    const stars = passed ? (pctScore >= 90 ? 3 : 2) : 1;
    if (quizMode === 'unit') {
      const prevBest = progress.__units[currentUnitId]?.bestPct || 0;
      progress.__units[currentUnitId] = { passed: passed || !!progress.__units[currentUnitId]?.passed, bestPct: Math.max(prevBest, pctScore) };
    } else {
      const prevBest = progress.__challenges[currentTrack]?.bestPct || 0;
      progress.__challenges[currentTrack] = { passed: passed || !!progress.__challenges[currentTrack]?.passed, bestPct: Math.max(prevBest, pctScore) };
    }
    try { localStorage.setItem('dojo_math_v6', JSON.stringify(progress)); } catch (e) { }
    updateLbl();
    document.getElementById('resEmoji').textContent = passed ? '🏆' : '🥊';
    document.getElementById('resTitle').textContent = passed ? (quizMode === 'unit' ? 'Unit Quiz passed!' : 'Course Challenge passed!') : 'Keep training!';
    document.getElementById('resStars').innerHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('resMsg').innerHTML = `${passed ? '✨' : '💪'} ${correct}/${total} correct (${pctScore}%)${passed ? '' : ' - need 70% to pass, try again?'}`;
    ms.innerHTML = '';
    document.getElementById('retryBtn').onclick = quizMode === 'unit'
      ? function () { startUnitQuiz(currentTrack, currentUnitId); }
      : function () { startCourseChallenge(currentTrack); };
    nb.style.display = 'none';
    showScreen('resultScreen');
    return;
  }

  const stars = correct >= 3 ? 3 : correct >= 2 ? 2 : 1;
  const passed = correct >= 2;
  if (passed) { progress[currentCat][currentLvl].done = true; progress[currentCat][currentLvl].stars = Math.max(progress[currentCat][currentLvl].stars || 0, stars); }
  try { localStorage.setItem('dojo_math_v6', JSON.stringify(progress)); } catch (e) { }
  updateLbl();
  document.getElementById('resEmoji').textContent = stars >= 2 ? '🏆' : '🥊';
  document.getElementById('resTitle').textContent = stars >= 2 ? 'Great fight!' : 'Good effort!';
  document.getElementById('resStars').innerHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('resMsg').innerHTML = passed ? `✨ ${correct}/${total} correct - belt earned!` : `💪 ${correct}/${total} correct. Try again?`;
  if (mistakes.length) {
    ms.innerHTML = '<div style="font-size:1.2rem;font-weight:900;margin:12px 0;">📝 Learn from these:</div>'
      + mistakes.map(m => `<div class="mistake-item">❓ ${m.q.replace(/\n/g, ' | ')}<br>✅ Answer: ${m.ans}${m.hint ? `<br>💡 ${m.hint.split('\n')[0]}` : ''}${m.hint ? m.hint.split('\n').slice(1).map(l => `<br>${l}`).join('') : ''}</div>`).join('');
  } else ms.innerHTML = '';
  document.getElementById('retryBtn').onclick = function () { startLesson(currentCat, currentLvl); };
  if (passed && currentLvl < SKILLS[currentCat].length) { nb.style.display = 'inline-flex'; nb.onclick = function () { startLesson(currentCat, currentLvl + 1); }; }
  else nb.style.display = 'none';
  showScreen('resultScreen');
}

function leaveQuiz() { if (confirm('Leave this lesson?')) showHome(); }
function leaveQuizToLevels() { if (confirm('Go back?')) backToLevelsOrUnits(); }
function backToLevelsOrUnits() { quizMode === 'belt' ? openCategory(currentCat) : openTrack(currentTrack); }

// ============================================================
//  FLUENCY ZONE (timed multiplication/division fact practice)
//  Deliberately its own small function set, not wired into the
//  belt-quiz engine above - a timer doesn't mix well with that
//  engine's currentQ/lessonData/mistake-tracking coupling.
// ============================================================
function startFluency(kind) {
  fluencyKind = kind; fluencyScore = 0; fluencyTimeLeft = 60;
  fluencyBest = progress.__fluency[kind]?.best || 0;
  document.getElementById('fluencyTitle').textContent = kind === 'multiply' ? '⚡ Multiplication Fluency Zone' : '⚡ Division Fluency Zone';
  updateFluencyHeader();
  showScreen('fluencyScreen');
  nextFluencyQuestion();
  if (fluencyTimerId) clearInterval(fluencyTimerId);
  fluencyTimerId = setInterval(fluencyTick, 1000);
}

function updateFluencyHeader() {
  document.getElementById('fluencyTime').textContent = fluencyTimeLeft;
  document.getElementById('fluencyScoreVal').textContent = fluencyScore;
}

function fluencyTick() {
  fluencyTimeLeft--;
  updateFluencyHeader();
  if (fluencyTimeLeft <= 0) endFluency();
}

function nextFluencyQuestion() {
  fluencyQ = randomFact(fluencyKind);
  document.getElementById('fluencyQuestion').textContent = fluencyQ.q;
  const inp = document.getElementById('fluencyInput');
  inp.value = '';
  inp.classList.remove('flash-correct', 'flash-wrong');
  inp.focus();
}

function submitFluencyAnswer() {
  if (!fluencyTimerId) return;
  const inp = document.getElementById('fluencyInput');
  const raw = inp.value.trim();
  if (!raw) return;
  const isCorrect = parseInt(raw) === fluencyQ.ans;
  if (isCorrect) { fluencyScore++; inp.classList.add('flash-correct'); } else { inp.classList.add('flash-wrong'); }
  updateFluencyHeader();
  nextFluencyQuestion();
}

function endFluency() {
  clearInterval(fluencyTimerId); fluencyTimerId = null;
  const isNewBest = fluencyScore > fluencyBest;
  progress.__fluency[fluencyKind] = { best: Math.max(fluencyScore, fluencyBest) };
  try { localStorage.setItem('dojo_math_v6', JSON.stringify(progress)); } catch (e) { }
  updateLbl();
  showFluencyResult(isNewBest);
}

function stopFluency() { if (confirm('Stop the Fluency Zone early?')) endFluency(); }

function showFluencyResult(isNewBest) {
  document.getElementById('resEmoji').textContent = isNewBest ? '🏆' : '⚡';
  document.getElementById('resTitle').textContent = isNewBest ? 'New best!' : 'Fluency Zone complete!';
  const fStars = fluencyScore >= 20 ? 3 : fluencyScore >= 10 ? 2 : fluencyScore >= 1 ? 1 : 0;
  document.getElementById('resStars').innerHTML = '★'.repeat(fStars) + '☆'.repeat(3 - fStars);
  document.getElementById('resMsg').innerHTML = `⚡ ${fluencyScore} correct in 60 seconds! Best: ${Math.max(fluencyScore, fluencyBest)}`;
  document.getElementById('mistakeSection').innerHTML = '';
  document.getElementById('retryBtn').onclick = function () { startFluency(fluencyKind); };
  document.getElementById('nextLvBtn').style.display = 'none';
  showScreen('resultScreen');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-card[data-track]').forEach(card => {
    card.addEventListener('click', function () { openTrack(this.dataset.track); });
  });
  document.getElementById('saveBtn').addEventListener('click', saveProgress);
  document.getElementById('loadBtn').addEventListener('click', loadProgress);
  document.getElementById('loadFile').addEventListener('change', loadFile);

  document.getElementById('backToHomeFromUnitsBtn').addEventListener('click', showHome);
  document.getElementById('backToUnitsBtn').addEventListener('click', () => openTrack(currentTrack));

  document.getElementById('homeFromQuiz').addEventListener('click', leaveQuiz);
  document.getElementById('levelsFromQuiz').addEventListener('click', leaveQuizToLevels);

  document.getElementById('homeFromResultBtn').addEventListener('click', showHome);

  document.getElementById('qnDojo').addEventListener('click', showHome);
  document.getElementById('qnFluency').addEventListener('click', () => startFluency('multiply'));

  document.getElementById('hintBtn').addEventListener('click', showHint);
  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);

  document.getElementById('fluencySubmitBtn').addEventListener('click', submitFluencyAnswer);
  document.getElementById('fluencyInput').addEventListener('keydown', e => { if (e.key === 'Enter') submitFluencyAnswer(); });
  document.getElementById('fluencyStopBtn').addEventListener('click', stopFluency);
  document.getElementById('homeFromFluency').addEventListener('click', () => {
    if (fluencyTimerId) { if (confirm('Leave the Fluency Zone?')) { clearInterval(fluencyTimerId); fluencyTimerId = null; showHome(); } }
    else showHome();
  });

  updateLbl();
});
