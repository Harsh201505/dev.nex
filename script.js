const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Portfolio filtering
const filters=document.querySelectorAll('.filter'),projects=document.querySelectorAll('.project');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>{
    const match=f==='all'||p.dataset.category.split(' ').includes(f);
    if(match){p.classList.remove('hidden');p.animate([{opacity:.1,transform:'scale(.94)'},{opacity:1,transform:'scale(1)'}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'})}
    else{p.classList.add('hidden')}
  });
}));

// Scroll reveal
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));

// Animated counters
const counters=document.querySelectorAll('[data-count]');let counted=false;
const countObs=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&!counted){counted=true;counters.forEach(el=>{let n=+el.dataset.count,t=0,step=Math.max(1,Math.ceil(n/30));const tick=()=>{t=Math.min(n,t+step);el.textContent=t;if(t<n)requestAnimationFrame(tick)};tick()})}},{threshold:.5});
if(counters.length)countObs.observe(document.querySelector('.stats'));

// Cursor spotlight on desktop
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(innerWidth>850){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('pointermove',e=>{if(innerWidth>850){const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}}));
document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform=''));

// Smooth anchor fallback
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));
