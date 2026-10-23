const app = document.querySelector('#app');
const asset = (name) => `assets/${name}`;
const email = 'ljhr051120@outlook.com';
const dimensions = { 'b60d5.png': [2854,1978], '57509.png': [1178,1157], 'ef3e6.png': [1222,958], '2b464.png': [1122,1402], '51b61.png': [1178,1546], '44422.png': [1705,922], '7e173.png': [1536,1024], '0ccf6.png': [1086,1448], 'ea101.png': [1671,941], 'b99c7.png': [1659,948], '3f860.png': [1282,1710], '8c375.png': [1536,1152], '31696.png': [1280,1708], 'bb38d.png': [1448,1086] };
const image = (name, alt, className = '', eager = false) => `<img class="${className}" src="${asset(name)}" alt="${alt}" width="${dimensions[name][0]}" height="${dimensions[name][1]}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

function nav() {
  const route = location.hash || '#/';
  return `<header class="navigation"><a class="site-name" href="#/" aria-label="Back to homepage">LJHR</a><nav aria-label="Main navigation"><a href="#/work" ${route.startsWith('#/work') ? 'aria-current="page"' : ''}>Work</a><a href="#/contact" ${route === '#/contact' ? 'aria-current="page"' : ''}>Contact</a></nav></header>`;
}

function footer() {
  return `<footer class="footer"><a class="email" href="mailto:${email}">${email}</a><div class="footer-links"><a href="#/work">All work</a><a href="#/">Home</a></div></footer>`;
}

function home() {
  return `<main id="main" class="home" tabindex="-1">${nav()}<div class="home-photo">${image('b60d5.png', 'Black and white portrait', 'home-portrait', true)}</div></main>`;
}

function work() {
  const projects = [
    ['chocolate','Folia','Chocolate & packaging','57509.png','Folia chocolate'],
    ['clothing','Velora','Clothing & identity','ef3e6.png','Velora butterfly logo'],
    ['records','Records','Art direction & packaging','2b464.png','Record sleeve and vinyl artwork']
  ];
  return `<main id="main" class="work-page" tabindex="-1">${nav()}<div class="work-content"><h1>Browse my work</h1><div class="projects" aria-label="Selected projects">${projects.map(([slug,title,category,src,alt])=>`<a class="project-link project-link--${slug}" href="#/work/${slug}" aria-label="${title} — ${category}"><div class="project-stage">${image(src,alt,'',true)}</div><div class="project-caption"><span>${title}</span><small>${category}</small></div></a>`).join('')}</div></div></main>`;
}

function chocolate() {
  return `<main id="main" class="project chocolate" tabindex="-1">${nav()}<section class="project-intro"><h1>Folia</h1><p>My inspiration for Folia came from the beauty of nature and handmade craftsmanship. I wanted to create a warm, organic, and refined visual identity.</p></section><div class="project-gallery"><section class="chocolate-hero">${image('51b61.png', 'Handcrafted chocolates on a floral ceramic plate', 'hero-image', true)}</section><section class="chocolate-packaging" aria-label="Folia packaging">${image('44422.png', 'Folia artisan chocolate packaging in pink, red, green and yellow')}</section></div>${footer()}</main>`;
}

function clothing() {
  return `<main id="main" class="project clothing" tabindex="-1">${nav()}<section class="project-intro"><h1>Velora</h1><p>My inspiration comes from butterflies in nature, as well as kites so I’ve combined these elements into my logo. For the clothing, the focus is on prioritizing comfort over high fashion.</p></section><div class="project-gallery"><section class="clothing-labels" aria-label="Velora garment labels">${image('7e173.png', 'Purple and cream clothing labels featuring the Velora butterfly logo')}</section><section class="clothing-pair" aria-label="Velora identity and clothing"><div class="clothing-mark">${image('0ccf6.png', 'White Velora butterfly logo on black')}</div><div class="clothing-portrait">${image('ea101.png', 'Velora clothing in a black and white portrait')}</div></section><section class="clothing-social" aria-label="Velora social campaign">${image('b99c7.png', 'Three Velora social posts presenting the clothing designs')}</section></div>${footer()}</main>`;
}

function records() {
  return `<main id="main" class="project records" tabindex="-1">${nav()}<section class="project-intro"><h1>Record artwork</h1><p>My inspiration came from a friend’s photography. I loved the mood and style of her images, so I used them as the cover art for my record. They helped shape the overall aesthetic of the project.</p></section><div class="project-gallery"><section class="record-hero">${image('3f860.png', 'Sunlight across water and white flowers', 'hero-image', true)}</section><section class="record-mockup" aria-label="Where the Water Holds the Light record design">${image('8c375.png', 'Where the Water Holds the Light — album sleeves and vinyl records')}</section><section class="ivy-photo" aria-label="Summer at the Wall photography">${image('31696.png', 'Sunlit ivy growing above a stone wall')}</section><section class="ivy-mockup" aria-label="Summer at the Wall record design">${image('bb38d.png', 'Ivy Light, Summer at the Wall — album sleeves and vinyl records')}</section></div>${footer()}</main>`;
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
