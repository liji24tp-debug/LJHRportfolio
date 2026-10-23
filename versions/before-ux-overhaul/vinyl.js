const vinylMarkup = `
<section class="vinyl-player" aria-label="Interactive vinyl record">
 <div class="vinyl-stage" aria-hidden="true">
  <div class="vinyl-sleeve"><img src="assets/8c375.png" alt=""></div>
  <div class="disc-carriage"><div class="vinyl-disc"><div class="record-art"><img src="assets/8c375.png" alt=""></div></div><div class="disc-glint"></div></div>
  <svg class="tonearm" viewBox="0 0 120 240"><defs><linearGradient id="arm-metal"><stop stop-color="#777"/><stop offset=".35" stop-color="#eee"/><stop offset=".65" stop-color="#aaa"/><stop offset="1" stop-color="#555"/></linearGradient></defs><circle cx="90" cy="20" r="17" fill="#222"/><circle cx="90" cy="20" r="10" fill="url(#arm-metal)"/><path d="M90 20V122L49 193" fill="none" stroke="#0003" stroke-width="10" transform="translate(3 4)"/><path d="M90 20V122L49 193" fill="none" stroke="url(#arm-metal)" stroke-width="7"/><path d="M47 186L61 194L44 223L30 215Z" fill="#252525"/><path d="M37 215L32 224" stroke="#b84920" stroke-width="3"/></svg>
 </div>
 <div class="vinyl-info"><h2 id="vinyl-title">Where the Water<br>Holds the Light</h2><div class="vinyl-sides" aria-label="Select record"><button type="button" data-side="0" aria-pressed="true">Water & light</button><button type="button" data-side="1" aria-pressed="false">Ivy light</button></div>
 <button class="vinyl-toggle" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4L20 12L7 20Z"/></svg><span>Play record</span></button>
 <div class="vinyl-speed" aria-label="Rotation speed"><span>RPM</span><button type="button" data-rpm="33.333" aria-pressed="true">33⅓</button><button type="button" data-rpm="45" aria-pressed="false">45</button><i class="power-light" aria-hidden="true"></i></div>
 <p class="vinyl-status" role="status">Spin preview · load your music to listen.</p>
 <label class="vinyl-upload">Load music<input type="file" accept="audio/*" aria-label="Load music from your device"></label>
 <audio class="vinyl-audio" controls hidden preload="metadata" aria-label="Music playback"></audio>
 </div>
</section>`;

function mountVinylPlayer() {
 const root=document.querySelector('.vinyl-player');
 if(!root) return ()=>{};
 const audio=root.querySelector('audio');
 const toggle=root.querySelector('.vinyl-toggle');
 const status=root.querySelector('.vinyl-status');
 const disc=root.querySelector('.vinyl-disc');
 let playing=false, objectUrl=null, audioName='', inView=true;
 const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4L20 12L7 20Z"/></svg>';
 const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4H10V20H6ZM14 4H18V20H14Z"/></svg>';
 function syncMotion(){disc.style.animationPlayState=playing&&inView&&!document.hidden?'running':'paused';}
 function setPlaying(value){
  playing=value;
  root.classList.toggle('is-playing',value);
  toggle.setAttribute('aria-pressed',String(value));
  toggle.innerHTML=(value?pauseIcon:playIcon)+'<span>'+(value?'Pause record':'Play record')+'</span>';
  status.textContent=audioName ? (value?'Playing: ':'Paused: ')+audioName : value?'Spinning · preview without audio.':'Spin preview · load your music to listen.';
  syncMotion();
 }
 toggle.addEventListener('click',async()=>{
  if(playing){audio.pause();setPlaying(false);return;}
  if(objectUrl){try{await audio.play();}catch{setPlaying(false);status.textContent='This audio could not be played. Please choose another file.';}}
  else setPlaying(true);
 });
 audio.addEventListener('play',()=>setPlaying(true));
 audio.addEventListener('pause',()=>setPlaying(false));
 audio.addEventListener('ended',()=>setPlaying(false));
 audio.addEventListener('error',()=>{setPlaying(false);status.textContent='This audio could not be played. Please choose another file.';});
 root.querySelector('input').addEventListener('change',event=>{
  const file=event.target.files[0];
  if(!file)return;
  audio.pause();setPlaying(false);
  if(objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl=URL.createObjectURL(file);audioName=file.name;
  audio.src=objectUrl;audio.hidden=false;
  status.textContent='Ready: '+audioName;
 });
 const sides=[{title:'Where the Water Holds the Light',image:'8c375.png'},{title:'Ivy Light, Summer at the Wall',image:'bb38d.png'}];
 root.querySelectorAll('[data-side]').forEach(button=>button.addEventListener('click',()=>{
  const side=sides[Number(button.dataset.side)];
  root.querySelectorAll('[data-side]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  root.querySelectorAll('.vinyl-stage img').forEach(img=>img.src='assets/'+side.image);
  root.classList.toggle('is-ivy',button.dataset.side==='1');
  root.querySelector('#vinyl-title').textContent=side.title;

 }));
 root.querySelectorAll('[data-rpm]').forEach(button=>button.addEventListener('click',()=>{
  root.querySelectorAll('[data-rpm]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  disc.style.animationDuration=(60/Number(button.dataset.rpm))+'s';
 }));
 const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncMotion();});
 observer.observe(root);
 document.addEventListener('visibilitychange',syncMotion);
 return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',syncMotion);audio.pause();audio.removeAttribute('src');audio.load();if(objectUrl)URL.revokeObjectURL(objectUrl);};
}
