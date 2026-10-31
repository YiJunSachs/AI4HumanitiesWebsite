(()=>{
 const sections=[...document.querySelectorAll('.restoration-editorial')];
 if(!sections.length)return;
 const fit=()=>{
  const mobile=innerWidth<=900;
  sections.forEach((section,index)=>{
   const heading=section.querySelector('.restoration-heading');
   const overlap=(mobile?[6,16,0,12]:[25,55,0,40])[index];
   if(heading)heading.style.setProperty('--corner-rise',`${parseFloat(getComputedStyle(section).paddingTop)+overlap}px`);
  });
 };
 window.addEventListener('resize',fit,{passive:true});
 window.addEventListener('site:languagechange',()=>requestAnimationFrame(fit));
 document.fonts.ready.then(fit);fit();
})();
