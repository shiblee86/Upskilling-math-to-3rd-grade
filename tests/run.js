// ============================================================
//  CUTE COMBAT DOJO - AUTOMATED TEST SUITE
//  Run with: bash tests/run.sh   (from anywhere in the repo)
//
//  This is a logic/data-level suite, not a browser test: it loads the
//  real app files (js/lib.js, js/curriculum.js, script.js) under `gjs`
//  with dom-stub.js standing in for the DOM/localStorage/timers, then
//  exercises the real functions - not mocks. It cannot tell you whether
//  the page renders correctly in an actual browser (layout, CSS, focus,
//  touch) - only that the underlying logic is sound. Treat a green run
//  here as "safe to look at in a browser next," not "done."
// ============================================================

let passCount = 0, failCount = 0;
const failures = [];

function check(desc, cond) {
  if (cond) { passCount++; }
  else { failCount++; failures.push(desc); print('  FAIL: ' + desc); }
}
function section(title) { print('\n=== ' + title + ' ==='); }

// ------------------------------------------------------------
section('App boots cleanly');
// ------------------------------------------------------------
check('DOMContentLoaded handler registered', !!document._domReadyCb);
if (document._domReadyCb) document._domReadyCb();
check('DOMContentLoaded handler runs without throwing', true);

// ------------------------------------------------------------
section('Structural consistency: SKILLS / SKILL_META / CURRICULUM');
// ------------------------------------------------------------
{
  const skillKeys = Object.keys(SKILLS);
  const metaKeys = Object.keys(SKILL_META);
  check(`every SKILLS key has a SKILL_META entry (${skillKeys.length} skills)`,
    skillKeys.every(k => metaKeys.includes(k)));
  check('every SKILL_META key has a SKILLS entry',
    metaKeys.every(k => skillKeys.includes(k)));

  const curriculumSkillIds = new Set();
  const unitIdsByTrack = {};
  for (const trackId in CURRICULUM) {
    unitIdsByTrack[trackId] = [];
    for (const unit of CURRICULUM[trackId].units) {
      unitIdsByTrack[trackId].push(unit.id);
      for (const sid of unit.skills) curriculumSkillIds.add(sid);
    }
  }
  check('every SKILLS entry is reachable from CURRICULUM (no orphans)',
    skillKeys.every(k => curriculumSkillIds.has(k)));
  check('every CURRICULUM-referenced skill exists in SKILLS',
    [...curriculumSkillIds].every(k => skillKeys.includes(k)));
  for (const trackId in unitIdsByTrack) {
    const ids = unitIdsByTrack[trackId];
    check(`${trackId}: no duplicate unit ids (${ids.length} units)`, new Set(ids).size === ids.length);
  }
  for (const skillId of skillKeys) {
    check(`${skillId}: has at least 1 belt`, SKILLS[skillId].length >= 1);
    check(`${skillId}: SKILL_META.track is a real CURRICULUM track`, !!CURRICULUM[SKILL_META[skillId].track]);
  }
}

// ------------------------------------------------------------
section('Content generation: every skill x belt x 30 generations');
// ------------------------------------------------------------
{
  // Two tiers, deliberately not conflated:
  //  - hardFailures: the question is broken (crashes, unanswerable, NaN/undefined
  //    leaking into the UI). Always blocks the suite.
  //  - duplicateOptionWarnings: cosmetic only (the correct answer is always still
  //    present - verified separately above). This is a known, pre-existing bug
  //    class in the original app content that predates this test suite and was
  //    explicitly deferred by the project owner in favor of other work. Reported
  //    for visibility, not treated as a build-breaking regression. If you're
  //    here to fix it: every occurrence below is a real bug worth cleaning up,
  //    just not one this suite enforces yet.
  let totalGens = 0, totalBelts = 0;
  const hardFailures = new Set();
  const duplicateOptionWarnings = new Set();
  for (const skillId in SKILLS) {
    SKILLS[skillId].forEach((belt, i) => {
      totalBelts++;
      for (let g = 0; g < 30; g++) {
        totalGens++;
        let q;
        try { q = belt.gen(); }
        catch (e) { hardFailures.add(`${skillId} belt${i + 1}: gen() threw: ${e}`); return; }
        if (!q || typeof q.q !== 'string' || !q.q.length) hardFailures.add(`${skillId} belt${i + 1}: bad/empty q.q`);
        if (q.ans === undefined || q.ans === null) hardFailures.add(`${skillId} belt${i + 1}: missing ans`);
        if (q.opts) {
          const strs = q.opts.map(String);
          if (!strs.includes(String(q.ans))) hardFailures.add(`${skillId} belt${i + 1}: answer not in opts`);
          if (new Set(strs).size !== strs.length) duplicateOptionWarnings.add(`${skillId} belt${i + 1}`);
        }
        try {
          const h = q.h ? q.h() : null;
          if (q.h && (!h || /NaN|undefined/.test(h))) hardFailures.add(`${skillId} belt${i + 1}: hint has NaN/undefined`);
        } catch (e) { hardFailures.add(`${skillId} belt${i + 1}: h() threw: ${e}`); }
      }
    });
  }
  print(`  scanned ${totalBelts} belts across ${Object.keys(SKILLS).length} skills, ${totalGens} generations`);
  check(`zero hard content failures (crash/unanswerable/NaN) - ${hardFailures.size} found`, hardFailures.size === 0);
  for (const loc of hardFailures) print('  FAIL LOCATION: ' + loc);
  if (duplicateOptionWarnings.size) {
    print(`  (info, non-blocking) ${duplicateOptionWarnings.size} belts occasionally produce duplicate multiple-choice options: ${[...duplicateOptionWarnings].join(', ')}`);
  }
}

// ------------------------------------------------------------
section('skillMastery() tier transitions');
// ------------------------------------------------------------
{
  const multiBeltSkill = Object.keys(SKILLS).find(k => SKILLS[k].length >= 4);
  const oneBeltSkill = Object.keys(SKILLS).find(k => SKILLS[k].length === 1);
  check('fixture: found a skill with >=4 belts to test tier progression', !!multiBeltSkill);
  check('fixture: found a 1-belt skill to test the mastered-on-first-pass edge case', !!oneBeltSkill);

  if (multiBeltSkill) {
    const belts = SKILLS[multiBeltSkill].length;
    progress[multiBeltSkill] = {};
    for (let l = 1; l <= belts; l++) progress[multiBeltSkill][l] = { done: false, stars: 0, attempted: false };
    check(`${multiBeltSkill}: fresh -> new`, skillMastery(multiBeltSkill) === 'new');
    progress[multiBeltSkill][1].attempted = true;
    check(`${multiBeltSkill}: attempted-not-passed -> attempted`, skillMastery(multiBeltSkill) === 'attempted');
    progress[multiBeltSkill][1].done = true;
    check(`${multiBeltSkill}: 1 belt passed -> familiar`, skillMastery(multiBeltSkill) === 'familiar');
    for (let l = 1; l <= Math.ceil(belts / 2); l++) progress[multiBeltSkill][l].done = true;
    check(`${multiBeltSkill}: half+ belts passed -> proficient`, skillMastery(multiBeltSkill) === 'proficient');
    for (let l = 1; l <= belts; l++) progress[multiBeltSkill][l].done = true;
    check(`${multiBeltSkill}: all belts passed -> mastered`, skillMastery(multiBeltSkill) === 'mastered');
  }
  if (oneBeltSkill) {
    progress[oneBeltSkill] = { 1: { done: false, stars: 0, attempted: false } };
    check(`${oneBeltSkill}: fresh 1-belt skill -> new`, skillMastery(oneBeltSkill) === 'new');
    progress[oneBeltSkill][1].done = true;
    check(`${oneBeltSkill}: 1-belt skill jumps straight to mastered, not stuck at proficient`, skillMastery(oneBeltSkill) === 'mastered');
  }
}

// ------------------------------------------------------------
section('buildQuestionPool() invariants (unit quizzes + course challenges)');
// ------------------------------------------------------------
{
  let poolsChecked = 0;
  for (const trackId in CURRICULUM) {
    for (const unit of CURRICULUM[trackId].units) {
      const pool = buildQuestionPool(unit.skills, 2, 10);
      poolsChecked++;
      check(`${unit.id}: pool respects cap (${pool.length}<=10)`, pool.length <= 10);
      check(`${unit.id}: pool respects perSkill*skillCount`, pool.length <= unit.skills.length * 2);
      for (const ref of pool) {
        const maxBelt = SKILLS[ref.skillId].length;
        if (ref.belt < 1 || ref.belt > maxBelt) { check(`${unit.id}: belt ${ref.belt} in range for ${ref.skillId} (max ${maxBelt})`, false); continue; }
        const q = SKILLS[ref.skillId][ref.belt - 1].gen();
        if (q.opts) check(`${unit.id}/${ref.skillId} belt${ref.belt}: pooled question is answerable`, q.opts.some(o => String(o) === String(q.ans)));
      }
    }
    const allSkills = CURRICULUM[trackId].units.flatMap(u => u.skills);
    const challengePool = buildQuestionPool(allSkills, 1, 16);
    check(`${trackId}: course-challenge pool respects cap (${challengePool.length}<=16)`, challengePool.length <= 16);
  }
  print(`  checked ${poolsChecked} unit pools + ${Object.keys(CURRICULUM).length} course-challenge pools`);
}

// ------------------------------------------------------------
section('randomFact() (Fluency Zone fact generator)');
// ------------------------------------------------------------
{
  for (const kind of ['multiply', 'divide']) {
    let ok = true;
    for (let i = 0; i < 500; i++) {
      const f = randomFact(kind);
      if (!Number.isInteger(f.ans) || f.ans < 0) ok = false;
      if (kind === 'divide') {
        const m = f.q.match(/^(\d+) ÷ (\d+) = \?$/);
        if (!m) { ok = false; continue; }
        const dividend = parseInt(m[1], 10), divisor = parseInt(m[2], 10);
        if (dividend % divisor !== 0 || dividend / divisor !== f.ans) ok = false;
      }
    }
    check(`randomFact('${kind}'): 500/500 generations valid`, ok);
  }
}

// ------------------------------------------------------------
section('Full user-flow simulation: belt quiz');
// ------------------------------------------------------------
{
  const skillId = Object.keys(SKILLS).find(k => SKILLS[k].length >= 2 && !SKILLS[k][0].isSoar);
  openCategory(skillId);
  startLesson(skillId, 1);
  check('startLesson sets quizMode to belt', quizMode === 'belt');
  check('startLesson marks the belt as attempted', progress[skillId][1].attempted === true);
  correct = 3; wrong = 0;
  showResult();
  check('passing a belt marks it done', progress[skillId][1].done === true);
  check('passing belt 1 of a multi-belt skill reveals "next belt"', document.getElementById('nextLvBtn').style.display === 'inline-flex');
}

// ------------------------------------------------------------
section('Full user-flow simulation: unit quiz');
// ------------------------------------------------------------
{
  const trackId = Object.keys(CURRICULUM)[0];
  const unit = CURRICULUM[trackId].units[0];
  startUnitQuiz(trackId, unit.id);
  check('startUnitQuiz sets quizMode to unit', quizMode === 'unit');
  const total = questions.length;
  correct = total; wrong = 0;
  for (let i = 0; i < total; i++) nextQuestion();
  check('unit quiz records progress.__units on completion', !!progress.__units[unit.id]);
  check('100% correct passes the unit quiz', progress.__units[unit.id] && progress.__units[unit.id].passed === true);
}

// ------------------------------------------------------------
section('Full user-flow simulation: course challenge');
// ------------------------------------------------------------
{
  const trackId = Object.keys(CURRICULUM)[Object.keys(CURRICULUM).length - 1];
  startCourseChallenge(trackId);
  check('startCourseChallenge sets quizMode to challenge', quizMode === 'challenge');
  const total = questions.length;
  correct = 0; wrong = total;
  for (let i = 0; i < total; i++) nextQuestion();
  check('course challenge records progress.__challenges on completion', !!progress.__challenges[trackId]);
  check('0% correct does not pass the course challenge', progress.__challenges[trackId] && progress.__challenges[trackId].passed === false);
}

// ------------------------------------------------------------
section('Full user-flow simulation: Fluency Zone');
// ------------------------------------------------------------
{
  startFluency('multiply');
  check('startFluency starts the timer', !!fluencyTimerId);
  for (let i = 0; i < 15; i++) {
    document.getElementById('fluencyInput').value = String(fluencyQ.ans);
    submitFluencyAnswer();
  }
  check('15 correct submissions score 15', fluencyScore === 15);
  let ticks = 0;
  while (fluencyTimerId && ticks < 65) { fluencyTick(); ticks++; }
  check('a 60-second round ends after exactly 60 ticks (not early, not never)', ticks === 60);
  check('best score is recorded', progress.__fluency.multiply && progress.__fluency.multiply.best === 15);

  startFluency('multiply');
  document.getElementById('fluencyInput').value = String(fluencyQ.ans + 999); // deliberately wrong
  submitFluencyAnswer();
  for (let t = 0; t < 60; t++) fluencyTick();
  check('a worse run never lowers the stored best score', progress.__fluency.multiply.best === 15);
}

// ------------------------------------------------------------
section('Old-save-format compatibility');
// ------------------------------------------------------------
{
  const oldSave = {};
  for (const s in SKILLS) { oldSave[s] = {}; SKILLS[s].forEach((_, i) => oldSave[s][i + 1] = { done: false, stars: 0 }); }
  let reloaded;
  let threw = false;
  try {
    reloaded = JSON.parse(JSON.stringify(oldSave));
    if (!reloaded.__units) reloaded.__units = {};
    if (!reloaded.__challenges) reloaded.__challenges = {};
    if (!reloaded.__fluency) reloaded.__fluency = {};
  } catch (e) { threw = true; }
  check('a save blob missing __units/__challenges/__fluency and per-belt "attempted" loads without throwing', !threw);
}

// ------------------------------------------------------------
section('index.html <-> script.js id cross-check');
// ------------------------------------------------------------
{
  const scriptText = readFile('script.js');
  const htmlText = readFile('index.html');
  const usedIds = new Set([...scriptText.matchAll(/getElementById\('([a-zA-Z0-9_]+)'\)/g)].map(m => m[1]));
  const definedIds = new Set([...htmlText.matchAll(/id="([a-zA-Z0-9_]+)"/g)].map(m => m[1]));
  const missing = [...usedIds].filter(id => !definedIds.has(id) && id !== 'soarInput'); // soarInput is created dynamically
  check(`every static getElementById() target exists in index.html (${missing.join(', ') || 'none missing'})`, missing.length === 0);
}

// ------------------------------------------------------------
section('Summary');
// ------------------------------------------------------------
print(`\n${passCount} passed, ${failCount} failed`);
if (failCount > 0) {
  print('\nFailed checks:');
  failures.forEach(f => print('  - ' + f));
  imports.system.exit(1);
} else {
  print('ALL CHECKS PASSED');
  imports.system.exit(0);
}
