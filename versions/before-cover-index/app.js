const app = document.querySelector('#app');
const email = 'ljhr051120@outlook.com';
const sizes = {'b60d5.png':[2854,1978],'51b61.png':[1178,1546],'44422.png':[1705,922],'7e173.png':[1536,1024],'0ccf6.png':[1086,1448],'ea101.png':[1671,941],'b99c7.png':[1659,948],'3f860.png':[1282,1710],'8c375.png':[1536,1152],'31696.png':[1280,1708],'bb38d.png':[1448,1086],'ef3e6.png':[1222,958]};
const image = (src, alt, eager = false) => `<img src="assets/${src}" alt="${alt}" width="${sizes[src][0]}" height="${sizes[src][1]}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const arrow = '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M8 8L70 70M14 70H70V14" fill="none" stroke="currentColor" stroke-width="3"/></svg>';

app.innerHTML = `
<header class="navigation">
  <a class="site-name" href="#top" aria-label="Back to homepage">LJHR</a>
  <a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#contact">CONTACT</a>
</header>
<main id="main" tabindex="-1">
  <section class="home" id="top" aria-label="Introduction">
    <div class="home-photo">${image('b60d5.png','Black and white portrait',true)}</div>
    <div class="hero-notes"><p>GRAPHIC DESIGN<br>IDENTITY & PACKAGING</p><a href="#work">EXPLORE MY<br>SELECTED WORK</a></div>
  </section>

  <section class="work-section" id="work" aria-label="Selected work">
    <article class="folio-project">
      <div class="folio-heading"><h1>01 Folia</h1><p>My inspiration for Folia came from the beauty of nature and handmade craftsmanship.</p><p>I wanted to create a warm, organic, and refined visual identity.</p></div>
      <div class="folio-pair folio-pair--first">
        <figure class="packaging">${image('44422.png','Folia artisan chocolate packaging in pink, red, green and yellow')}<figcaption>Folia — Chocolate & packaging</figcaption></figure>
        <figure class="chocolate-photo">${image('51b61.png','Handcrafted chocolates on a floral ceramic plate')}</figure>
      </div>
    </article>

    <article class="folio-project">
      <div class="folio-heading"><h2>02 Velora</h2><p>My inspiration comes from butterflies in nature, as well as kites so I’ve combined these elements into my logo.</p><p>For the clothing, the focus is on prioritizing comfort over high fashion.</p></div>
      <div class="velora-gallery">
        <figure class="velora-tags">${image('7e173.png','Purple and cream clothing labels featuring the Velora butterfly logo')}<figcaption>Velora — Clothing & identity</figcaption></figure>
        <figure class="velora-logo">${image('ef3e6.png','Original Velora butterfly logo')}</figure>
        <div class="clothing-pair"><div class="clothing-mark">${image('0ccf6.png','White Velora butterfly logo on black')}</div><div class="clothing-portrait">${image('ea101.png','Velora clothing in a black and white portrait')}</div></div>
        <figure class="velora-social">${image('b99c7.png','Three Velora social posts presenting the clothing designs')}</figure>
      </div>
    </article>

    <article class="folio-project">
      <div class="folio-heading"><h2>03 Record artwork</h2><p>My inspiration came from a friend’s photography. I loved the mood and style of her images, so I used them as the cover art for my record.</p><p>They helped shape the overall aesthetic of the project.</p></div>
      <div class="record-gallery">
        <figure class="water-photo">${image('3f860.png','Sunlight across water and white flowers')}</figure>
        <figure class="water-mockup">${image('8c375.png','Where the Water Holds the Light — album sleeves and vinyl records')}<figcaption>Where the Water Holds the Light</figcaption></figure>
        <figure class="ivy-photo">${image('31696.png','Sunlit ivy growing above a stone wall')}</figure>
        <figure class="ivy-mockup">${image('bb38d.png','Ivy Light, Summer at the Wall — album sleeves and vinyl records')}<figcaption>Ivy Light — Summer at the Wall</figcaption></figure>
      </div>
    </article>
  </section>

  <section class="about-section" id="about"><h2>ABOUT</h2><div class="about-photo">${image('b60d5.png','Portrait of the designer')}</div><div class="about-copy"><p>A selection of design projects exploring chocolate packaging, clothing identity, and record artwork.</p><p>For enquiries and collaborations:<br><a href="mailto:${email}">${email}</a></p></div></section>
  <section class="project-disciplines" aria-label="Design disciplines"><h2>DESIGN<br>PROJECTS</h2><div><p>GRAPHIC DESIGN</p><p>VISUAL IDENTITY</p><p>PACKAGING</p><p>ART DIRECTION</p></div></section>
</main>
<footer id="contact"><a class="connect" href="mailto:${email}">let’s connect ${arrow}</a><div class="footer-columns"><div><h2>navigate</h2><a href="#top">home</a><a href="#work">work</a></div><div><h2>contact</h2><a href="mailto:${email}">${email}</a></div><div><h2>projects</h2><a href="#work">Folia</a><a href="#work">Velora</a><a href="#work">Record artwork</a></div></div><div class="footer-photo">${image('ea101.png','Black and white Velora portrait')}</div></footer>`;

// Preserve old bookmarks while removing the old work and detail screens.
function resolveAnchor() {
  if (location.hash.startsWith('#/')) {
    const target = location.hash.includes('work') ? '#work' : location.hash.includes('contact') ? '#contact' : '#top';
    history.replaceState(null,'',target);
  }
  const id = location.hash.slice(1);
  if (id) document.getElementById(id)?.scrollIntoView({behavior:'instant'});
}
resolveAnchor();
document.title = 'LJHR — Graphic Design & Selected Work';
