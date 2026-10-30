(()=>{
 const sections=[...document.querySelectorAll('.restoration-editorial')];
 if(!sections.length)return;
 const fit=()=>{
  const overlap=innerWidth<=900?28:90;
  sections.forEach(section=>{
   const heading=section.querySelector('.restoration-heading');
   if(heading)heading.style.setProperty('--corner-rise',`${parseFloat(getComputedStyle(section).paddingTop)+(section.matches('.phonology-editorial')?0:overlap)}px`);
  });
 };
 window.addEventListener('resize',fit,{passive:true});
 window.addEventListener('site:languagechange',()=>requestAnimationFrame(fit));
 document.fonts.ready.then(fit);fit();
})();