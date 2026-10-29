(()=>{
 const root=document.querySelector('.unified-header');if(!root)return;
 const labels=[...root.querySelectorAll('[data-nav-en]')].map(el=>({el,zh:el.textContent,en:el.dataset.navEn}));
 function fitUnits(){
  const row=root.querySelector('.unified-identities'),names=[...root.querySelectorAll('.unified-unit-name')];
  names.forEach(el=>el.style.removeProperty('font-size'));if(innerWidth<=900)return;
  const style=getComputedStyle(row);let available=row.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)-parseFloat(style.columnGap)*(names.length-1),total=0;
  for(const name of names){const unit=name.parentElement;available-=unit.querySelector('img').offsetWidth+parseFloat(getComputedStyle(unit).columnGap);total+=name.scrollWidth;}
  if(total>available){const size=parseFloat(getComputedStyle(names[0]).fontSize)*available/total*.98;names.forEach(el=>el.style.setProperty('font-size',size+'px','important'));}
 }
 function update(){
  const en=document.documentElement.dataset.language==='en';labels.forEach(x=>x.el.textContent=en?x.en:x.zh);root.querySelector('nav').setAttribute('aria-label',en?'Main navigation':'主导航');
  const links=root.querySelectorAll('.unified-nav-link[href]');let active=null;
  for(const link of links){link.removeAttribute('aria-current');const url=new URL(link.href);if(url.pathname===location.pathname&&(!url.hash||url.hash===location.hash))active=link;}
  if(!active&&location.pathname.endsWith('/index.html')&&!location.hash)active=links[0];if(active)active.setAttribute('aria-current','page');
  requestAnimationFrame(fitUnits);document.fonts.load(en?'30px "Unified English Script"':'30px "Unified Hanyi"').then(fitUnits);
 }
 window.addEventListener('resize',fitUnits);document.fonts.ready.then(fitUnits);window.addEventListener('site:languagechange',update);window.addEventListener('hashchange',update);update();
})();