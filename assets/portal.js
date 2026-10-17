/* Lighthouse portal — landing page for schools, students, and educators */
(function () {
  const PARTNER = 'Developed by Harper Steenstra &middot; In partnership with the Maine Department of Education';
  const SCHOOL = 'harborview.k12.me.us';

  const studentMods = ['Spot the Phish', 'Lock It Down', 'Think Before You Post', 'Scams, Fakes &amp; Pressure', 'Who Do You Tell?'];
  const eduMods = ['Phishing in the School Inbox', 'Student Images &amp; Viral Moments', 'Protecting Student Data', 'When Something Goes Wrong'];

  const inboxMock = `<div class="mock-laptop"><div class="ml-screen">
      <div class="ml-bar"><span class="dots"><i></i><i></i><i></i></span>Harborview Mail</div>
      <div class="ml-rows">
        ${[['Ms. Rivera', 'Lab report due Friday', 'safe'], ['R0BUX Rewards', 'You were selected: 10,000 FREE...', 'phish'], ['Harborview Athletics', 'Practice moved to 4:30', 'safe'], ['Delivery Notice', 'Your package could not be...', 'phish']]
          .map(([w, t, v], i) => `<div class="ml-row" style="--d:${i * .45 + .4}s"><span class="av" style="background:${v === 'phish' ? '#c8322b' : '#138a4b'}">${w[0]}</span><span class="tx"><b>${w}</b><span>${t}</span></span><span class="tag ${v}">${v === 'phish' ? icon('flag') + 'Phishing' : icon('check') + 'Safe'}</span></div>`).join('')}
      </div></div><div class="ml-base"></div></div>`;

  const talkMock = `<div class="mock-talk"><div class="mt-main"><span class="mt-label">${icon('talk')} Turn and Talk</span>
      <div class="mt-q">It is Sunday at 6:15 PM. Who needs to know, in what order?</div>
      <div class="mt-stem">The first person I would call is...</div><div class="mt-stem">What I would not know how to do is...</div></div>
      <div class="mt-side"><div class="mt-timer"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="7"/><circle class="mt-prog" cx="50" cy="50" r="42" fill="none" stroke="#f5b93d" stroke-width="7" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="70"/></svg><b>2:14</b></div></div></div>`;

  const results = [
    { site: 'Harborview Schools', display: SCHOOL + ' › password-reset', href: 'https://' + SCHOOL + '/password-reset', color: '#2459d6', title: 'Reset Your Password - Harborview Schools', snip: 'Students and staff can reset a forgotten password here or visit the library tech desk.', v: 'safe', why: 'The real school domain.' },
    { site: 'Harborview Account Help', display: 'harborview-k12-reset.com', href: 'https://harborview-k12-reset.com/student', color: '#7c3aed', ad: true, title: 'Harborview Password Reset | Instant Access', snip: 'Locked out? Reset your Harborview school password in seconds. Official student support.', v: 'phish', why: 'A paid ad on a domain the school does not own. "Official" in an ad means nothing.' },
    { site: 'Harborview Tech Help', display: 'help.' + SCHOOL + ' › accounts', href: 'https://help.' + SCHOOL + '/accounts', color: '#0e7490', title: 'Account Help for Students and Families', snip: 'Step-by-step help with school accounts, Chromebooks, and passwords.', v: 'safe', why: '"help." is part of the real school website.' }
  ];

  const topics = [
    ['mail', 'Phishing and fake links', 'Spot fake senders, lookalike domains, and links that lie, in email, texts, and DMs.', 'Both'],
    ['key', 'Passwords and account takeover', 'Passphrases, two-step verification, and the "send me your code" trick.', 'Both'],
    ['camera', 'Posting and student images', 'Consent, digital footprints, media opt-outs, and what to do when a post goes viral.', 'Both'],
    ['sparkle', 'AI fakes and scams', 'Voice clones, fake images, game scams, and impersonation.', 'Students'],
    ['database', 'Protecting student data', 'AI tools and IEPs, sharing settings, and everyday data leaks.', 'Educators'],
    ['heartHand', 'Getting help', 'Trusted adults, sextortion response, incident reporting, and student disclosures.', 'Both']
  ];

  const faqs = [
    ['Do students or staff need an account?', 'No. There is nothing to sign in to. Progress is saved in the browser on the device each person uses, so learners should finish on the same computer.'],
    ['What information does Lighthouse collect?', 'None. Nothing anyone types or clicks is sent to us or anyone else. Progress and the name entered on a certificate stay in the browser on that device. See the privacy notice for details.'],
    ['How long does each course take?', 'The student course takes about 45 minutes and can be split across several class periods. The educator course takes about 50 minutes and fits a typical staff meeting.'],
    ['How do I run the educator course in a staff meeting?', 'Project the course from one screen and use Present mode. Staff follow along on their own laptops so their completion is recorded. Turn-and-talk steps include a timer, and every step has facilitator notes.'],
    ['Can administrators preview everything first?', 'Yes. Add ?preview to the end of either course address to unlock every module for review.'],
    ['Are the scenarios real?', 'The situations are realistic, but every person, school, email, and website is fictional. Scenarios take place in an invented district called Harborview.']
  ];

  document.getElementById('app').innerHTML = `
  <header class="pnav" id="top"><div class="wrap pnav-in">
    <a class="brand" href="./">${brandMark()}<span><span class="brand-name">LIGHTHOUSE</span><br><span class="brand-sub">Cybersecurity Readiness</span></span></a>
    <nav class="plinks"><a href="#courses">Courses</a><a href="#try">Try it</a><a href="#how">How it works</a><a href="#admins">For administrators</a><a href="#faq">FAQ</a></nav>
    <a class="btn beam sm" href="#courses">Start learning ${icon('right')}</a></div></header>

  <section class="phero"><div class="scene-bg">${scene(innerWidth < 700 ? { view: '800 0 560 800' } : {})}</div>
    <div class="wrap phero-in"><div class="hero-copy">
      <div class="eyebrow"><i></i>Cybersecurity Readiness for Maine Schools</div>
      <h1>Guiding every student and educator <em>safely</em> through a connected world</h1>
      <p class="lead">Lighthouse is an interactive cybersecurity program for middle and high schools. Learners catch phishing in realistic simulations, work through hard situations with real tradeoffs, and finish with a certificate.</p>
      <div class="hero-actions"><a class="btn beam lg" href="student/">${icon('user')} Student course</a><a class="btn glass lg" href="educator/">${icon('users')} Educator course</a></div>
      <div class="hero-meta"><span>${icon('school')}Grades 6&ndash;12 and all school staff</span><span>${icon('lock')}No accounts or sign-in</span><span>${icon('award')}Certificate of completion</span></div>
    </div></div>
    <a class="scroll-cue" href="#courses" aria-label="Scroll to courses">${icon('down')}</a>
    <div class="partner-pill">${PARTNER}</div>
  </section>

  <section class="psec" id="courses"><div class="wrap">
    <div class="sec-head reveal"><div class="eyebrow">Two courses, one mission</div><h2>Built for the people in the building.</h2><p>Students learn on their own. Staff learn together. Both finish with a certificate.</p></div>
    <div class="doors">
      <a class="door reveal" href="student/"><div class="door-top student">${inboxMock}</div><div class="door-body">
        <div class="door-who">${icon('user')} For students &middot; Grades 6&ndash;12</div><h3>Student Course</h3>
        <p>A self-paced course students complete on their own, in class or at home. Short, visual activities with hints when they get stuck.</p>
        <ol class="mods">${studentMods.map((m) => `<li>${m}</li>`).join('')}</ol>
        <div class="door-foot"><span>${icon('clock')}45 min</span><span>${icon('layers')}5 modules</span><span class="btn primary">Start the student course ${icon('right')}</span></div></div></a>
      <a class="door reveal" href="educator/"><div class="door-top educator">${talkMock}</div><div class="door-body">
        <div class="door-who">${icon('users')} For educators &middot; All school staff</div><h3>Educator Course</h3>
        <p>Designed for a staff meeting, with turn-and-talks, a projected timer, and facilitator notes. Staff can also complete it on their own.</p>
        <ol class="mods">${eduMods.map((m) => `<li>${m}</li>`).join('')}</ol>
        <div class="door-foot"><span>${icon('clock')}50 min</span><span>${icon('talk')}Facilitated</span><span class="btn primary">Start the educator course ${icon('right')}</span></div></div></a>
    </div>
  </div></section>

  <section class="psec dark" id="try"><div class="wrap try-grid">
    <div class="reveal"><div class="eyebrow">Try it right now</div><h2>One of these links is a trap.</h2>
      <p>You forgot your school password, so you search for the reset page. Hover over each result to see where it really goes, then click the one you think is phishing.</p>
      <ul class="try-tips"><li>${icon('eye')}Hover to preview the real address</li><li>${icon('flag')}Watch for sponsored results</li><li>${icon('shieldCheck')}Trust the domain, not the design</li></ul>
      <div class="try-fb" aria-live="polite"></div></div>
    <div class="reveal"><div class="laptop"><div class="lid"><div class="screen">
      <div class="browser"><div class="tabs"><span class="dots"><i></i><i></i><i></i></span><div class="tab"><span class="fav"></span>harborview password reset - Seek</div></div>
      <div class="addr"><span class="navs">${icon('chevL')}${icon('chevR')}${icon('reset')}</span><div class="url">${icon('lock')}seek.example/search?q=harborview+password+reset</div></div>
      <div class="serp"><div class="s-bar"><div class="s-logo">Seek<span>.</span></div><div class="s-input">${icon('search')}harborview password reset</div></div><div class="s-meta">About 31,900 results</div>
        ${results.map((o, i) => `<button class="result" data-i="${i}" data-href="${o.href}"><span class="letter">${'ABC'[i]}</span><span><span class="site"><span class="fv" style="background:${o.color}">${o.site.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><span><b style="display:block;font-weight:600">${o.ad ? '<span class="ad-tag">Sponsored</span>' : ''}${o.site}</b><span class="u">${o.display}</span></span></span><span class="ttl" style="display:block">${o.title}</span><span class="snip">${o.snip}</span></span></button>`).join('')}
      </div></div><div class="status-url"></div></div></div><div class="base"></div></div></div>
  </div></section>

  <section class="psec" id="how"><div class="wrap">
    <div class="sec-head reveal"><div class="eyebrow">How it works</div><h2>Learn it. Decide it. Prove it.</h2></div>
    <div class="steps3">
      ${[['monitor', 'Practice on realistic screens', 'Inboxes, search results, sign-in pages, text threads, and social posts that look and behave like the real thing.'],
         ['talk', 'Make real decisions', 'Some questions have a right answer. Others are messy, so learners see how each choice plays out and talk it through.'],
         ['award', 'Earn a certificate', 'Finishing every module unlocks a printable certificate with a unique ID for class or professional learning records.']]
        .map(([ic, t, d], i) => `<div class="s3 reveal" style="transition-delay:${i * .1}s"><div class="s3-n">${i + 1}</div><div class="s3-ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div></section>

  <section class="psec tint"><div class="wrap">
    <div class="sec-head reveal"><div class="eyebrow">What it covers</div><h2>The threats schools actually face.</h2><p>From the gift card email in a teacher's inbox to the highlight video that goes viral overnight.</p></div>
    <div class="topics">${topics.map(([ic, t, d, who], i) => `<div class="topic reveal" style="transition-delay:${(i % 3) * .08}s"><div class="t-ic">${icon(ic)}</div><div><h3>${t}</h3><p>${d}</p><span class="who ${who.toLowerCase()}">${who === 'Both' ? 'Students and educators' : who}</span></div></div>`).join('')}</div>
  </div></section>

  <section class="psec" id="admins"><div class="wrap admin-grid">
    <div class="reveal"><div class="eyebrow">For administrators</div><h2>Roll it out in an afternoon.</h2>
      <p class="sub">Lighthouse runs in any modern browser, on Chromebooks, laptops, tablets, and projectors. There is nothing to install and no accounts to create.</p>
      <ol class="rollout">
        <li><b>Share the link</b><span>Send students the student course and staff the educator course.</span></li>
        <li><b>Learners complete it</b><span>Students during class or advisory. Staff together at a meeting.</span></li>
        <li><b>Collect certificates</b><span>Each person prints or saves a PDF certificate with a unique ID and turns it in.</span></li>
      </ol>
      <div class="preview-tip">${icon('eye')}<div><b>Preview before you assign.</b> Add <span class="mono">?preview</span> to either course address to unlock every module.<div class="pv-links"><a href="student/?preview">Preview student course ${icon('right')}</a><a href="educator/?preview">Preview educator course ${icon('right')}</a></div></div></div>
    </div>
    <div class="privacy reveal"><div class="pv-badge">${icon('shieldCheck')}</div><h3>Private by design</h3>
      <ul>${['No accounts or sign-in', 'Nothing typed is sent anywhere', 'No advertising or analytics', 'Progress stays on each device', 'All scenarios use a fictional district'].map((t) => `<li>${icon('check')}${t}</li>`).join('')}</ul></div>
  </div></section>

  <section class="psec tint" id="faq"><div class="wrap faq-wrap">
    <div class="sec-head reveal"><div class="eyebrow">Questions</div><h2>Frequently asked.</h2></div>
    <div class="faq">${faqs.map(([q, a]) => `<details class="reveal"><summary>${q}<span class="pm">${icon('down')}</span></summary><p>${a}</p></details>`).join('')}</div>
  </div></section>

  <section class="final"><div class="scene-bg">${scene({ shield: false, view: '0 140 1440 660', par: 'xMidYMid slice' })}</div><div class="wrap final-in reveal">
    <h2>Be the light for your school.</h2><p>Pick a course and start in under a minute.</p>
    <div class="hero-actions"><a class="btn beam lg" href="student/">${icon('user')} Student course</a><a class="btn glass lg" href="educator/">${icon('users')} Educator course</a></div></div></section>

  <footer class="pfoot"><div class="wrap pfoot-in">
    <div class="brand">${brandMark()}<span><span class="brand-name">LIGHTHOUSE</span><br><span class="brand-sub">Cybersecurity Readiness for Maine Schools</span></span></div>
    <nav><a href="student/">Student course</a><a href="educator/">Educator course</a><a href="#admins">Administrators</a><a href="#faq">FAQ</a></nav>
    <div class="pf-note">${PARTNER} &middot; <a href="privacy.html">Privacy notice</a><br>All scenarios, people, schools, and websites in these courses are fictional.</div>
  </div></footer>`;

  /* Nav goes solid after the hero */
  const nav = document.querySelector('.pnav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Reveal on scroll */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((n) => io.observe(n));

  /* Try-it demo */
  const scr = document.querySelector('#try .screen'), bar = scr.querySelector('.status-url'), fb = document.querySelector('.try-fb');
  scr.addEventListener('mouseover', (e) => { const a = e.target.closest('[data-href]'); if (a) { bar.textContent = a.dataset.href; bar.classList.add('show'); } });
  scr.addEventListener('mouseout', (e) => { if (e.target.closest('[data-href]')) bar.classList.remove('show'); });
  let done = false;
  scr.querySelectorAll('.result').forEach((b) => b.onclick = () => {
    if (done) return; done = true;
    const i = +b.dataset.i, right = results[i].v === 'phish';
    scr.querySelectorAll('.result').forEach((x, j) => {
      const v = results[j].v;
      if (j === i) x.classList.add(right ? 'is-right' : 'is-wrong'); else if (v === 'phish') x.classList.add('is-right');
      x.insertAdjacentHTML('beforeend', `<span class="tag ${v}">${v === 'safe' ? 'Legit' : 'Phishing'}</span>`);
    });
    fb.innerHTML = `<div class="feedback ${right ? 'good' : 'bad'}"><div class="fb-h"><span class="badge">${icon(right ? 'check' : 'x')}</span>${right ? 'You caught it.' : 'Close. The phish was B.'}</div>
      <p>${results[1].why}</p><div class="q-actions"><a class="btn primary sm" href="student/">Try the full course ${icon('right')}</a><button class="btn ghost sm again">${icon('reset')} Try again</button></div></div>`;
    fb.querySelector('.again').onclick = () => { done = false; fb.innerHTML = ''; scr.querySelectorAll('.result').forEach((x) => { x.classList.remove('is-right', 'is-wrong'); x.querySelector('.tag')?.remove(); }); };
  });
})();
