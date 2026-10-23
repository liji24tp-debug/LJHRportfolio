const app = document.querySelector('#app');
const email = 'ljhr051120@outlook.com';
const sizes = {'b60d5.png':[2854,1978],'51b61.png':[1178,1546],'44422.png':[1705,922],'7e173.png':[1536,1024],'0ccf6.png':[1086,1448],'ea101.png':[1671,941],'b99c7.png':[1659,948],'3f860.png':[1282,1710],'8c375.png':[1536,1152],'31696.png':[1280,1708],'bb38d.png':[1448,1086],'ef3e6.png':[1222,958]};
const image = (src, alt, eager = false) => `<img src="assets/${src}" alt="${alt}" width="${sizes[src][0]}" height="${sizes[src][1]}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const arrow = '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M8 8L70 70M14 70H70V14" fill="none" stroke="currentColor" stroke-width="3"/></svg>';

const projects = [
{id:'chocolate',title:'Folia',cover:'44422.png',content:`<article class="folio-project">
      <div class="folio-heading"><h1>Folia</h1><p>My inspiration for Folia came from the beauty of nature and handmade craftsmanship.</p><p>I wanted to create a warm, organic, and refined visual identity.</p></div>
      <div class="folio-pair folio-pair--first">
        <figure class="packaging">${image('44422.png','Folia artisan chocolate packaging in pink, red, green and yellow')}<figcaption>Folia — Chocolate & packaging</figcaption></figure>
        <figure class="chocolate-photo">${image('51b61.png','Handcrafted chocolates on a floral ceramic plate')}</figure>
      </div>
    </article>`},
{id:'clothing',title:'Velora',cover:'ef3e6.png',content:`<article class="folio-project">
      <div class="folio-heading"><h1>Velora</h1><p>My inspiration comes from butterflies in nature, as well as kites so I’ve combined these elements into my logo.</p><p>For the clothing, the focus is on prioritizing comfort over high fashion.</p></div>
      <div class="velora-gallery">
        <figure class="velora-tags">${image('7e173.png','Purple and cream clothing labels featuring the Velora butterfly logo')}<figcaption>Velora — Clothing & identity</figcaption></figure>
        <figure class="velora-logo">${image('ef3e6.png','Original Velora butterfly logo')}</figure>
        <div class="clothing-pair"><div class="clothing-mark">${image('0ccf6.png','White Velora butterfly logo on black')}</div><div class="clothing-portrait">${image('ea101.png','Velora clothing in a black and white portrait')}</div></div>
        <figure class="velora-social">${image('b99c7.png','Three Velora social posts presenting the clothing designs')}</figure>
      </div>
    </article>`},
{id:'records',title:'Record artwork',cover:'8c375.png',content:`<article class="folio-project">
      <div class="folio-heading"><h1>Record artwork</h1><p>My inspiration came from a friend’s photography. I loved the mood and style of her images, so I used them as the cover art for my record.</p><p>They helped shape the overall aesthetic of the project.</p></div>
      ${vinylMarkup}
      <div class="record-gallery">
        <figure class="water-photo">${image('3f860.png','Sunlight across water and white flowers')}</figure>
        <figure class="water-mockup">${image('8c375.png','Where the Water Holds the Light — album sleeves and vinyl records')}<figcaption>Where the Water Holds the Light</figcaption></figure>
        <figure class="ivy-photo">${image('31696.png','Sunlit ivy growing above a stone wall')}</figure>
        <figure class="ivy-mockup">${image('bb38d.png','Ivy Light, Summer at the Wall — album sleeves and vinyl records')}<figcaption>Ivy Light — Summer at the Wall</figcaption></figure>
      </div>
    </article>`}
];

const nav = `<header class="navigation"><a class="site-name" href="#top" aria-label="Back to homepage">LJHR</a><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#contact">CONTACT</a></header>`;
const footer = `<footer id="contact"><div class="contact-intro"><h2>Have a project in mind?</h2><a class="contact-email" href="mailto:${email}">${email}<span>${arrow}</span></a></div><div class="footer-bottom"><span>LJHR — Graphic design & identity</span><a href="#top">Back to top ↑</a></div></footer>`;
const home = `  <section class="home" id="top" aria-label="Introduction">
    <div class="home-photo">${image('b60d5.png','Black and white portrait',true)}</div>
    <div class="home-motion"><div class="home-motion-art" role="img" aria-label="Animated pink LJHR wordmark"><img src="assets/ljhr-logo-poster.png" alt="LJHR hand-drawn pink wordmark" width="960" height="672"><video muted loop playsinline preload="auto" aria-hidden="true"><source src="assets/ljhr-logo-motion.webm" type="video/webm"></video></div><button class="home-motion-toggle" type="button">Pause animation</button></div>
    <div class="hero-notes"><p>GRAPHIC DESIGN<br>IDENTITY & PACKAGING</p><a href="#work">EXPLORE MY<br>SELECTED WORK</a></div>
  </section>


<section class="work-section" id="work" aria-labelledby="work-title"><div class="work-intro"><h1 id="work-title">Selected work</h1><p>Identity, packaging & images.</p></div><div class="project-index">${projects.map(project => `<a class="project-cover" href="#/project/${project.id}" aria-label="View ${project.title} project"><figure>${image(project.cover,project.title)}<figcaption><h2>${project.title}</h2><span>View project ${arrow}</span></figcaption></figure></a>`).join('')}</div></section>
  <section class="about-section" id="about"><h2>ABOUT</h2><div class="about-photo">${image('b60d5.png','Portrait of the designer')}</div><div class="about-copy"><p>A selection of design projects exploring chocolate packaging, clothing identity, and record artwork.</p><p>For enquiries and collaborations:<br><a href="mailto:${email}">${email}</a></p></div></section>

<section class="design-focus" aria-labelledby="focus-title"><h2 id="focus-title">Design across<br>different forms.</h2><ul><li>Graphic design</li><li>Visual identity</li><li>Packaging</li><li>Art direction</li></ul></section>`;
let cleanupHomeMotion = () => {};
function mountHomeMotion() {
 const root=document.querySelector('.home-motion');
 if(!root)return ()=>{};
 const video=root.querySelector('video'),button=root.querySelector('button');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let wanted=!reduce.matches,visible=true;
 video.muted=true;
 function sync(){
  button.textContent=wanted?'Pause animation':'Play animation';
  if(wanted&&visible&&!document.hidden)video.play().catch(()=>{wanted=false;button.textContent='Play animation';});
  else video.pause();
 }
 button.addEventListener('click',()=>{wanted=!wanted;sync();});
 video.addEventListener('playing',()=>root.classList.add('motion-ready'));
 video.addEventListener('error',()=>{root.classList.remove('motion-ready');button.hidden=true;});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});
 observer.observe(document.getElementById('top'));
 const onReduce=()=>{wanted=!reduce.matches;sync();};
 reduce.addEventListener('change',onReduce);
 document.addEventListener('visibilitychange',sync);
 sync();
 return ()=>{observer.disconnect();reduce.removeEventListener('change',onReduce);document.removeEventListener('visibilitychange',sync);video.pause();};
}
let currentProject = null;
let cleanupPlayer = () => {};
function render() {
 cleanupPlayer(); cleanupPlayer=()=>{};
 const requested = location.hash.match(/^#\/project\/(.+)$/)?.[1];
 const project = projects.find(item => item.id === requested);
 if (project) {
  cleanupHomeMotion();cleanupHomeMotion=()=>{};
  app.innerHTML = nav + `<main id="main" class="detail-page" tabindex="-1"><a class="back-work" href="#work">← Selected work</a>${project.content}<div class="project-next"><a href="#work">All work</a><a href="#/project/${projects[(projects.indexOf(project)+1)%projects.length].id}">Next project →</a></div></main>` + footer;
  currentProject=project.id;
  if(project.id==='records') cleanupPlayer=mountVinylPlayer();
  document.title=`${project.title} — LJHR`;
  window.scrollTo({top:0,behavior:'instant'});
  document.getElementById('main').focus({preventScroll:true});
 } else {
  const returning = currentProject !== null;
  if(returning || !document.getElementById('top')) {
   app.innerHTML=nav+`<main id="main" tabindex="-1">${home}</main>`+footer;
   cleanupHomeMotion=mountHomeMotion();
  }
  currentProject=null;
  document.title='LJHR — Graphic Design & Selected Work';
  const target=location.hash.startsWith('#/')?'work':location.hash.slice(1)||'top';
  if(location.hash.startsWith('#/')) history.replaceState(null,'','#work');
  document.getElementById(target)?.scrollIntoView({behavior:returning?'instant':'smooth'});
 }
}
window.addEventListener('hashchange',render);
render();
