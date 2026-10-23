const app = document.querySelector('#app');
const email = 'ljhr051120@outlook.com';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('js');
if (!reduceMotion.matches) document.documentElement.classList.add('js-motion');

/* ---------- Images: responsive WebP derivatives in assets/opt (originals kept in assets/) ---------- */
const sizes = {'b60d5.png':[2854,1978],'51b61.png':[1178,1546],'44422.png':[1705,922],'7e173.png':[1536,1024],'0ccf6.png':[1086,1448],'ea101.png':[1671,941],'b99c7.png':[1659,948],'3f860.png':[1282,1710],'8c375.png':[1536,1152],'31696.png':[1280,1708],'bb38d.png':[1448,1086],'ef3e6.png':[1222,958]};
const derived = { b60d5: [800, 1600, 2400] };
const base = src => src.replace(/\.\w+$/, '');
const full = src => `assets/opt/${base(src)}-1600.webp`;
function srcset(src) {
  const seen = new Set();
  return (derived[base(src)] || [800, 1600])
    .map(requested => [requested, Math.min(requested, sizes[src][0])])
    .filter(([, actual]) => !seen.has(actual) && seen.add(actual))
    .map(([requested, actual]) => `assets/opt/${base(src)}-${requested}.webp ${actual}w`).join(', ');
}
const image = (src, alt, { eager = false, sizes: sz = '100vw' } = {}) =>
  `<img src="${full(src)}" srcset="${srcset(src)}" sizes="${sz}" alt="${alt}" width="${sizes[src][0]}" height="${sizes[src][1]}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const zoom = (src, alt, opts = {}) =>
  `<button class="zoom" type="button" data-full="${full(src)}"${opts.caption ? ` data-caption="${opts.caption}"` : ''} aria-label="Enlarge image: ${alt}">${image(src, alt, opts)}</button>`;
const fig = (cls, src, alt, opts = {}) =>
  `<figure class="${cls}" data-reveal>${zoom(src, alt, opts)}${opts.caption ? `<figcaption>${opts.caption}</figcaption>` : ''}</figure>`;

const icon = {
  arrowUpRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6H18V16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V20M5 13L12 20L19 13" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12H21M14 5L21 12L14 19" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5H10V19H7ZM14 5H17V19H14Z" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5L19 12L8 19Z" fill="currentColor"/></svg>'
};

/* ---------- Content ---------- */
const projects = [
  {
    id: 'chocolate', title: 'Folia', category: 'Chocolate & packaging', deliverables: 'Packaging, visual identity',
    cover: '44422.png', coverAlt: 'Folia artisan chocolate packaging',
    intro: ['My inspiration for Folia came from the beauty of nature and handmade craftsmanship.', 'I wanted to create a warm, organic, and refined visual identity.'],
    gallery: () => `<div class="folio-pair">
      ${fig('packaging', '44422.png', 'Folia artisan chocolate packaging in pink, red, green and yellow', { caption: 'Folia — Chocolate &amp; packaging', sizes: '(max-width:760px) 100vw, 58vw' })}
      ${fig('chocolate-photo', '51b61.png', 'Handcrafted chocolates on a floral ceramic plate', { sizes: '(max-width:760px) 76vw, 33vw' })}
    </div>`
  },
  {
    id: 'clothing', title: 'Velora', category: 'Clothing & identity', deliverables: 'Logo, swing tags, social content',
    cover: '7e173.png', coverAlt: 'Velora swing tags featuring the butterfly logo',
    intro: ['My inspiration comes from butterflies in nature, as well as kites so I’ve combined these elements into my logo.', 'For the clothing, the focus is on prioritizing comfort over high fashion.'],
    gallery: () => `<div class="velora-gallery">
      ${fig('velora-tags', '7e173.png', 'Purple and cream clothing labels featuring the Velora butterfly logo', { caption: 'Velora — Clothing &amp; identity', sizes: '(max-width:760px) 100vw, 58vw' })}
      ${fig('velora-logo', 'ef3e6.png', 'Original Velora butterfly logo', { caption: 'Primary logo', sizes: '(max-width:760px) 70vw, 33vw' })}
      <div class="clothing-pair" data-reveal><div class="clothing-mark">${zoom('0ccf6.png', 'White Velora butterfly logo on black', { sizes: '(max-width:760px) 90vw, 50vw' })}</div><div class="clothing-portrait">${zoom('ea101.png', 'Velora clothing in a black and white portrait', { sizes: '(max-width:760px) 60vw, 36vw' })}</div></div>
      ${fig('velora-social', 'b99c7.png', 'Three Velora social posts presenting the clothing designs', { caption: 'Social stories', sizes: '(max-width:760px) 100vw, 72vw' })}
    </div>`
  },
  {
    id: 'records', title: 'Record artwork', category: 'Album sleeves & vinyl', deliverables: 'Sleeves, vinyl labels, mock-ups',
    cover: '8c375.png', coverAlt: 'Where the Water Holds the Light album sleeves and vinyl',
    intro: ['My inspiration came from a friend’s photography. I loved the mood and style of her images, so I used them as the cover art for my record.', 'They helped shape the overall aesthetic of the project.'],
    gallery: () => `${vinylMarkup}
      <div class="record-gallery">
        ${fig('water-photo', '3f860.png', 'Sunlight across water and white flowers', { sizes: '(max-width:760px) 100vw, 58vw' })}
        ${fig('water-mockup', '8c375.png', 'Where the Water Holds the Light — album sleeves and vinyl records', { caption: 'Where the Water Holds the Light', sizes: '(max-width:760px) 100vw, 33vw' })}
        ${fig('ivy-photo', '31696.png', 'Sunlit ivy growing above a stone wall', { sizes: '(max-width:760px) 100vw, 33vw' })}
        ${fig('ivy-mockup', 'bb38d.png', 'Ivy Light, Summer at the Wall — album sleeves and vinyl records', { caption: 'Ivy Light — Summer at the Wall', sizes: '(max-width:760px) 100vw, 58vw' })}
      </div>`
  }
];
const pad = n => String(n).padStart(2, '0');

/* ---------- Shared chrome ---------- */
const nav = `<header class="navigation">
  <a class="site-name" href="#top" aria-label="LJHR — back to top">LJHR</a>
  <nav aria-label="Primary" class="nav-links"><a href="#work" data-nav="work">WORK</a><a href="#about" data-nav="about">ABOUT</a><a href="#contact" data-nav="contact">CONTACT</a></nav>
</header>`;
const footer = () => `<footer id="contact" class="contact" aria-labelledby="contact-title">
  <h2 id="contact-title" class="eyebrow" data-reveal>Have a project in mind?</h2>
  <a class="contact-email" href="mailto:${email}" data-reveal><span>${email}</span>${icon.arrowUpRight}</a>
  <div class="contact-actions" data-reveal><button class="copy-email" type="button" data-copy>Copy email</button><span class="copy-status" role="status"></span></div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} LJHR — Graphic design &amp; identity</span><a href="#top">Back to top ↑</a></div>
</footer>`;

/* ---------- Views ---------- */
const homeView = () => `<section class="home" id="top" aria-labelledby="home-title">
    <h1 id="home-title" class="visually-hidden">LJHR — Graphic design, identity &amp; packaging</h1>
    <div class="home-photo">${image('b60d5.png', 'Black and white portrait of the designer', { eager: true })}</div>
    <div class="home-motion"><div class="home-motion-art" role="img" aria-label="Animated pink LJHR wordmark"><img src="assets/ljhr-logo-poster.png" alt="" width="960" height="672"><video muted loop playsinline preload="auto" aria-hidden="true"><source src="assets/ljhr-logo-motion.webm" type="video/webm"></video></div></div>
    <div class="hero-notes">
      <p>GRAPHIC DESIGN<br>IDENTITY &amp; PACKAGING</p>
      <button class="home-motion-toggle" type="button" aria-label="Pause animation" title="Pause animation">${icon.pause}</button>
      <a href="#work">EXPLORE MY<br>SELECTED WORK ${icon.arrowDown}</a>
    </div>
  </section>

  <section class="section work-section" id="work" aria-labelledby="work-title">
    <div class="section-head" data-reveal><h2 id="work-title">Selected work<sup>(${pad(projects.length)})</sup></h2><p>Identity, packaging &amp; images.</p></div>
    <div class="project-index">${projects.map((p, i) => `<a class="project-cover" id="cover-${p.id}" href="#/project/${p.id}" data-reveal>
      <div class="cover-media">${image(p.cover, p.coverAlt, { sizes: i === 0 ? '(max-width:760px) 100vw, 96vw' : '(max-width:760px) 100vw, 48vw' })}</div>
      <div class="cover-meta"><span class="cover-num">${pad(i + 1)}</span><span class="cover-text"><span class="cover-title">${p.title}</span><span class="cover-tags">${p.category}</span></span><span class="cover-cta">View project ${icon.arrowUpRight}</span></div>
    </a>`).join('')}</div>
  </section>

  <section class="section about-section" id="about" aria-labelledby="about-title">
    <h2 id="about-title" class="about-label" data-reveal>About</h2>
    <p class="about-lead" data-reveal>A selection of design projects exploring chocolate packaging, clothing identity, and record artwork — shaped by nature, handmade craft and photography.</p>
    <div class="about-cols" data-reveal>
      <div><h3>Focus</h3><ul><li>Graphic design</li><li>Visual identity</li><li>Packaging</li><li>Art direction</li></ul></div>
      <div><h3>Approach</h3><p>Warm, organic and refined identities that start from observation — a butterfly, a kite, the light on water.</p></div>
      <div><h3>Enquiries</h3><p>For enquiries and collaborations:<br><a href="mailto:${email}">${email}</a></p></div>
    </div>
  </section>`;

function detailView(project) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return `<div class="detail-top"><a class="back-link" href="#work">← Selected work</a><span class="detail-count">${pad(index + 1)} / ${pad(projects.length)}</span></div>
  <article class="folio-project">
    <header class="detail-head">
      <h1>${project.title}</h1>
      <div class="detail-intro">${project.intro.map(t => `<p>${t}</p>`).join('')}</div>
      <dl class="detail-meta"><div><dt>Category</dt><dd>${project.category}</dd></div><div><dt>Deliverables</dt><dd>${project.deliverables}</dd></div></dl>
    </header>
    ${project.gallery()}
  </article>
  <a class="next-project" href="#/project/${next.id}" data-reveal>
    <span class="next-label">Next project — ${pad(projects.indexOf(next) + 1)}</span>
    <span class="next-title">${next.title} ${icon.arrowRight}</span>
    <span class="next-thumb">${image(next.cover, '', { sizes: '(max-width:760px) 40vw, 24vw' })}</span>
  </a>`;
}

/* ---------- Behaviours ---------- */
function mountHomeMotion() {
  const root = document.querySelector('.home-motion');
  const button = document.querySelector('.home-motion-toggle');
  if (!root || !button) return () => {};
  const video = root.querySelector('video');
  let wanted = !reduceMotion.matches, visible = true;
  video.muted = true;
  function label() {
    const text = wanted ? 'Pause animation' : 'Play animation';
    button.setAttribute('aria-label', text); button.title = text;
    button.innerHTML = wanted ? icon.pause : icon.play;
  }
  function sync() {
    label();
    if (wanted && visible && !document.hidden) video.play().catch(() => { wanted = false; label(); });
    else video.pause();
  }
  button.addEventListener('click', () => { wanted = !wanted; sync(); });
  video.addEventListener('playing', () => root.classList.add('motion-ready'));
  video.addEventListener('error', () => { root.classList.remove('motion-ready'); button.hidden = true; });
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
  observer.observe(document.getElementById('top'));
  const onReduce = () => { wanted = !reduceMotion.matches; sync(); };
  reduceMotion.addEventListener('change', onReduce);
  document.addEventListener('visibilitychange', sync);
  sync();
  return () => { observer.disconnect(); reduceMotion.removeEventListener('change', onReduce); document.removeEventListener('visibilitychange', sync); video.pause(); };
}

function mountReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!document.documentElement.classList.contains('js-motion')) { items.forEach(el => el.classList.add('is-in')); return () => {}; }
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  items.forEach(el => io.observe(el));
  return () => io.disconnect();
}

function mountNavState(view) {
  const header = document.querySelector('.navigation');
  const links = [...header.querySelectorAll('[data-nav]')];
  const setCurrent = id => links.forEach(a => a.dataset.nav === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  let io;
  if (view === 'detail') setCurrent('work');
  else {
    const visible = new Map();
    io = new IntersectionObserver(entries => {
      entries.forEach(e => visible.set(e.target.id, e.isIntersecting));
      const active = ['contact', 'about', 'work'].find(id => visible.get(id));
      setCurrent(active || null);
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['work', 'about', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  }
  return () => { removeEventListener('scroll', onScroll); io?.disconnect(); };
}

function mountCopyEmail() {
  const button = document.querySelector('[data-copy]');
  const status = document.querySelector('.copy-status');
  if (!button) return () => {};
  let timer;
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(email); status.textContent = 'Copied to clipboard'; }
    catch { status.textContent = 'Copy unavailable — select the address above'; }
    button.classList.add('is-done'); clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ''; button.classList.remove('is-done'); }, 2400);
  });
  return () => clearTimeout(timer);
}

function mountLightbox() {
  const buttons = [...document.querySelectorAll('.detail-page .zoom')];
  if (!buttons.length) return () => {};
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Image viewer');
  dlg.innerHTML = `<div class="lb-bar"><span class="lb-count"></span><button class="lb-close" type="button">Close <span aria-hidden="true">✕</span></button></div>
    <div class="lb-stage"><button class="lb-nav lb-prev" type="button" aria-label="Previous image">←</button><img alt=""><button class="lb-nav lb-next" type="button" aria-label="Next image">→</button></div>
    <p class="lb-caption"></p>`;
  document.body.append(dlg);
  const img = dlg.querySelector('img'), count = dlg.querySelector('.lb-count'), caption = dlg.querySelector('.lb-caption');
  if (buttons.length < 2) dlg.querySelectorAll('.lb-nav').forEach(b => b.hidden = true);
  let current = 0, opener = null;
  function show(n) {
    current = (n + buttons.length) % buttons.length;
    const b = buttons[current], thumb = b.querySelector('img');
    img.classList.remove('is-loaded');
    img.onload = () => img.classList.add('is-loaded');
    img.src = b.dataset.full; img.alt = thumb.alt;
    caption.textContent = b.dataset.caption ? b.dataset.caption.replace(/&amp;/g, '&') : thumb.alt;
    count.textContent = `${pad(current + 1)} / ${pad(buttons.length)}`;
    if (img.complete) img.classList.add('is-loaded');
    new Image().src = buttons[(current + 1) % buttons.length].dataset.full; // warm the next image
  }
  buttons.forEach((b, n) => b.addEventListener('click', () => { opener = b; show(n); dlg.showModal(); document.documentElement.classList.add('lb-open'); }));
  dlg.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  dlg.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close(); });
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(current - 1); if (e.key === 'ArrowRight') show(current + 1); });
  dlg.addEventListener('close', () => { document.documentElement.classList.remove('lb-open'); opener?.focus({ preventScroll: true }); });
  let startX = null;
  const stage = dlg.querySelector('.lb-stage');
  stage.addEventListener('pointerdown', e => { startX = e.clientX; });
  stage.addEventListener('pointerup', e => { if (startX === null) return; const dx = e.clientX - startX; startX = null; if (Math.abs(dx) > 50 && buttons.length > 1) show(current + (dx < 0 ? 1 : -1)); });
  return () => { if (dlg.open) dlg.close(); dlg.remove(); document.documentElement.classList.remove('lb-open'); };
}

/* ---------- Router ---------- */
let currentView = null, lastProject = null, pageCleanups = [];
function mount(content, view) {
  pageCleanups.forEach(fn => fn()); pageCleanups = [];
  app.innerHTML = `${nav}<main id="main" tabindex="-1" class="page-enter${view === 'detail' ? ' detail-page' : ''}">${content}</main>${footer()}`;
  pageCleanups.push(mountReveal(), mountNavState(view), mountCopyEmail());
  if (view === 'home') pageCleanups.push(mountHomeMotion());
  if (view === 'detail') {
    pageCleanups.push(mountLightbox());
    if (document.querySelector('.vinyl-player')) pageCleanups.push(mountVinylPlayer());
  }
}

function render() {
  const requested = location.hash.match(/^#\/project\/([\w-]+)$/)?.[1];
  const project = projects.find(item => item.id === requested);
  if (project) {
    mount(detailView(project), 'detail');
    currentView = 'project:' + project.id; lastProject = project.id;
    document.title = `${project.title} — LJHR`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main').focus({ preventScroll: true });
    return;
  }
  const fromProject = currentView !== null && currentView !== 'home';
  const firstLoad = currentView === null;
  if (currentView !== 'home') mount(homeView(), 'home');
  currentView = 'home';
  document.title = 'LJHR — Graphic Design & Selected Work';
  let target = location.hash.slice(1);
  if (location.hash.startsWith('#/')) { history.replaceState(null, '', '#work'); target = 'work'; }
  if (!target) return;
  let el = document.getElementById(target);
  const toCover = fromProject && target === 'work' && lastProject;
  if (toCover) el = document.getElementById('cover-' + lastProject) || el;
  el?.scrollIntoView({ behavior: fromProject || firstLoad ? 'instant' : 'smooth', block: toCover ? 'center' : 'start' });
  if (toCover) el?.focus({ preventScroll: true });
}
window.addEventListener('hashchange', render);
render();
