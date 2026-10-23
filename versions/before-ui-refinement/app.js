const app = document.querySelector('#app');
const asset = (name) => `assets/${name}`;
const email = 'ljhr051120@outlook.com';
const image = (name, alt, className = '', eager = false) => `<img class="${className}" src="${asset(name)}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

function nav(light = false, home = false) {
  return `<header class="navigation ${light ? 'navigation--light' : ''}"><nav aria-label="Main navigation"><a href="#/work">Work</a><a href="#/contact">Contact</a></nav>${home ? '' : '<a class="home-link" href="#/" aria-label="Back to homepage">Home</a>'}</header>`;
}

function footer(theme = '') {
  return `<footer class="footer ${theme}"><div class="footer-links"><a href="#/work">Browse my work</a><a href="#/">Home</a></div><a class="email" href="mailto:${email}">mail: ${email}</a></footer>`;
}

function home() {
  return `<main id="main" class="home" tabindex="-1">${image('b60d5.png', 'Black and white portrait', 'home-portrait', true)}${nav(false, true)}</main>`;
}

function work() {
  return `<main id="main" class="work-page" tabindex="-1"><div class="work-top"><a href="#/" class="work-back">Home</a><a href="#/contact">Contact</a></div><h1>BROWSEMYWORK</h1><div class="projects" aria-label="Selected projects"><a class="project-link project-link--chocolate" href="#/work/chocolate" aria-label="Folia — chocolate design">${image('57509.png', 'Folia chocolate', '', true)}<span>Folia</span></a><a class="project-link project-link--clothing" href="#/work/clothing" aria-label="Velora — clothing design">${image('ef3e6.png', 'Velora butterfly logo', '', true)}<span>Velora</span></a><a class="project-link project-link--records" href="#/work/records" aria-label="Records — album artwork">${image('2b464.png', 'Record sleeve and vinyl artwork', '', true)}<span>Records</span></a></div></main>`;
}

function chocolate() {
  return `<main id="main" class="project chocolate" tabindex="-1"><section class="chocolate-hero">${image('51b61.png', 'Handcrafted chocolates on a floral ceramic plate', 'hero-image', true)}${nav()}<h1>FOLIA</h1><p class="project-description">My inspiration for Folia came from the beauty of nature and handmade craftsmanship. I wanted to create a warm, organic, and refined visual identity.</p></section><section class="chocolate-packaging" aria-label="Folia packaging">${image('44422.png', 'Folia artisan chocolate packaging in pink, red, green and yellow')}</section>${footer('footer--cream')}</main>`;
}

function clothing() {
  return `<main id="main" class="project clothing" tabindex="-1"><section class="clothing-intro">${nav()}<div class="clothing-intro-content"><h1 class="clothing-logo">${image('ef3e6.png', 'Velora', '', true)}</h1><p>My inspiration comes from butterflies in nature, as well as kites so I’ve combined these elements into my logo. For the clothing, the focus is on prioritizing comfort over high fashion.</p></div></section><section class="clothing-labels" aria-label="Velora garment labels">${image('7e173.png', 'Purple and cream clothing labels featuring the Velora butterfly logo')}</section><section class="clothing-pair" aria-label="Velora identity and clothing"><div class="clothing-mark">${image('0ccf6.png', 'White Velora butterfly logo on black')}</div><div class="clothing-portrait">${image('ea101.png', 'Velora clothing in a black and white portrait')}</div></section><section class="clothing-social" aria-label="Velora social campaign">${image('b99c7.png', 'Three Velora social posts presenting the clothing designs')}</section>${footer('footer--gray')}</main>`;
}

function records() {
  return `<main id="main" class="project records" tabindex="-1"><section class="record-hero">${image('3f860.png', 'Sunlight across water and white flowers', 'hero-image', true)}${nav(true)}<h1 class="sr-only">Record artwork</h1><p class="project-description">My inspiration came from a friend’s photography. I loved the mood and style of her images, so I used them as the cover art for my record. They helped shape the overall aesthetic of the project.</p></section><section class="record-mockup" aria-label="Where the Water Holds the Light record design">${image('8c375.png', 'Where the Water Holds the Light — album sleeves and vinyl records')}</section><section class="ivy-photo" aria-label="Summer at the Wall photography">${image('31696.png', 'Sunlit ivy growing above a stone wall')}</section><section class="ivy-mockup" aria-label="Summer at the Wall record design">${image('bb38d.png', 'Ivy Light, Summer at the Wall — album sleeves and vinyl records')}</section>${footer()}</main>`;
}

function contact() {
  return `<main id="main" class="contact-page" tabindex="-1">${nav()}<div class="contact-content"><h1>Contact</h1><a href="mailto:${email}">${email}</a><a class="contact-work" href="#/work">Browse my work</a></div></main>`;
}

const routes = {
  '/': { render: home, title: 'Portfolio' },
  '/work': { render: work, title: 'Selected Work' },
  '/work/chocolate': { render: chocolate, title: 'Folia — Chocolate' },
  '/work/clothing': { render: clothing, title: 'Velora — Clothing' },
  '/work/records': { render: records, title: 'Records' },
  '/contact': { render: contact, title: 'Contact' },
};

function render({ focus = false } = {}) {
  const path = location.hash.replace(/^#/, '') || '/';
  const route = routes[path] || routes['/'];
  app.innerHTML = route.render();
  document.title = `${route.title} — LJHR`;
  document.body.dataset.page = path.split('/')[1] || 'home';
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (focus) document.querySelector('main').focus({ preventScroll: true });
}

window.addEventListener('hashchange', () => {
  if (location.hash === '#main') {
    document.querySelector('main').focus();
    return;
  }
  render({ focus: true });
});
render();
