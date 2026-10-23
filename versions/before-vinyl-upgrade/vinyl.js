const vinylMarkup = `
<section class="vinyl-player" aria-label="Interactive vinyl record">
 <div class="vinyl-stage" aria-hidden="true">
  <div class="vinyl-sleeve"><img src="assets/3f860.png" alt=""><span>Where the Water<br>Holds the Light</span></div>
  <div class="vinyl-disc"><div class="vinyl-label"><img src="assets/3f860.png" alt=""><span>SIDE A<br>33⅓ RPM</span></div><i class="vinyl-spindle"></i></div>
 </div>
 <div class="vinyl-info"><h2 id="vinyl-title">Where the Water<br>Holds the Light</h2><div class="vinyl-sides" aria-label="Select record"><button type="button" data-side="0" aria-pressed="true">Side A</button><button type="button" data-side="1" aria-pressed="false">Side B</button></div>
 <button class="vinyl-toggle" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4L20 12L7 20Z"/></svg><span>Play record</span></button>
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
 const sides=[{title:'Where the Water Holds the Light',image:'3f860.png'},{title:'Ivy Light, Summer at the Wall',image:'31696.png'}];
 root.querySelectorAll('[data-side]').forEach(button=>button.addEventListener('click',()=>{
  const side=sides[Number(button.dataset.side)];
  root.querySelectorAll('[data-side]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  root.querySelectorAll('.vinyl-stage img').forEach(img=>img.src='assets/'+side.image);
  root.querySelector('.vinyl-sleeve span').textContent=side.title;
  root.querySelector('#vinyl-title').textContent=side.title;
  root.querySelector('.vinyl-label span').innerHTML=(button.dataset.side==='0'?'SIDE A':'SIDE B')+'<br>33⅓ RPM';
 }));
 const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncMotion();});
 observer.observe(root);
 document.addEventListener('visibilitychange',syncMotion);
 return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',syncMotion);audio.pause();audio.removeAttribute('src');audio.load();if(objectUrl)URL.revokeObjectURL(objectUrl);};
}
