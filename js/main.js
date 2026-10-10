const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const safe=(f)=>{try{return f()}catch(e){}};
// theme
const root=document.documentElement;
safe(()=>{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t});
$('#theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';safe(()=>localStorage.setItem('theme',root.dataset.theme))};
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#yr').textContent=new Date().getFullYear();
// visitor counter (per device)
safe(()=>{const v=+(localStorage.getItem('visits')||0)+1;localStorage.setItem('visits',v);$('#visits').textContent=v});
// typed text
const words=['AI systems that explain themselves','data dashboards that find the story','sensors that do real work','teams that ship in 36 hours'];let w=0,c=0,del=false;
(function tick(){const s=words[w];$('#typed').textContent=s.slice(0,c);if(!del&&c++===s.length){del=true;return setTimeout(tick,1600)}if(del&&--c<0){del=false;c=0;w=(w+1)%words.length}setTimeout(tick,del?25:55)})();
// counters
$$('[data-n]').forEach(el=>{const n=+el.dataset.n;let i=0;const id=setInterval(()=>{i+=Math.ceil(n/40);if(i>=n){i=n;clearInterval(id)}el.textContent=i},30)});
// starfield
safe(()=>{const cv=$('#stars'),x=cv.getContext('2d');let S=[];const fit=()=>{cv.width=innerWidth;cv.height=innerHeight;S=Array.from({length:90},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,s:Math.random()*.25+.05}))};fit();addEventListener('resize',fit);
(function d(){x.clearRect(0,0,cv.width,cv.height);x.fillStyle=root.dataset.theme==='dark'?'#fff':'#c2410c33';S.forEach(t=>{t.y=(t.y+t.s)%cv.height;x.beginPath();x.arc(t.x,t.y,t.r,0,7);x.fill()});if(!matchMedia('(prefers-reduced-motion:reduce)').matches)requestAnimationFrame(d)})()});
// skills
const SK={'Languages':[['Python',85],['C / C++ (Arduino)',70],['JavaScript',65],['SQL',60]],'Web':[['HTML & CSS',80],['Bootstrap',70],['Responsive design',75]],'Data & AI':[['Excel & pivot tables',90],['Data cleaning',85],['Rule-based AI / expert systems',80],['Graph algorithms (BFS)',80]],'Tools':[['Git & GitHub',70],['Vercel',65],['Arduino IDE',75],['VS Code',80]]};
$('#skillGrid').innerHTML=Object.entries(SK).map(([k,v])=>`<div class="card"><h3>${k}</h3>${v.map(([n,p])=>`<div class="sk">${n}<div><i data-w="${p}"></i></div></div>`).join('')}</div>`).join('');
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){$$('.sk i').forEach(i=>i.style.width=i.dataset.w+'%');o.disconnect()}})).observe($('#skills'));
// project filter
$$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>x.classList.toggle('on',x===b));$$('.proj').forEach(p=>p.hidden=b.dataset.f!=='all'&&p.dataset.c!==b.dataset.f)});
// tabs
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));$('#dash').hidden=b.dataset.t!=='dash';$('#expert').hidden=b.dataset.t!=='expert'});
// dashboard (figures from my Excel Pivot Tables sheet)
const D={brand:{'Maruti Suzuki':[270,2517],'Mahindra':[162,2552.1],'Hyundai':[171,1969.6],'Tata':[146,1864.1],'Toyota':[69,1777.2],'Kia':[60,803.6],'MG':[28,526.7],'Honda':[33,417.4],'Skoda':[15,208.2],'Renault':[24,176.8]},
region:{West:[298,3846.4],South:[258,3420.4],North:[221,2963.8],East:[114,1386],Central:[87,1196]},
fuel:{Petrol:[576,6392.4],Diesel:[259,4807.1],CNG:[95,894.5],Electric:[38,553],Hybrid:[10,165.7]},
body:{SUV:[524,8143.7],Hatchback:[221,1834.5],Sedan:[119,1286.9],MPV:[114,1547.5]},
pay:{Finance:[544,7277.8],Cash:[295,3798.6],'Exchange Offer':[139,1736.2]}};
const M24=[29,22,32,29,21,33,22,34,35,62,55,46],M25=[42,35,61,37,36,35,26,50,52,74,69,41],MN='Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
$('#k1').textContent='₹12,812.6 L';$('#k2').textContent='978';
function draw(){const d=D[$('#dim').value],m=$('#met').value==='rev'?1:0,e=Object.entries(d).sort((a,b)=>b[1][m]-a[1][m]),mx=e[0][1][m];
$('#bars').innerHTML=e.map(([k,v])=>`<div class="row"><span>${k}</span><div class="t"><i style="width:${v[m]/mx*100}%"></i></div><b>${m?v[m].toLocaleString('en-IN'):v[m]}</b></div>`).join('')}
$('#dim').onchange=$('#met').onchange=draw;draw();
const mm=Math.max(...M25);$('#months').innerHTML=MN.map((n,i)=>`<div title="${n}: 2024 ${M24[i]}, 2025 ${M25[i]}"><i class="a" style="height:${M24[i]/mm*100}%"></i><i class="b" style="height:${M25[i]/mm*100}%"></i><small>${n}</small></div>`).join('');
// expert system (rules R1-R5 from my project documentation)
const SYM=['fever','cough','mild_fever','sneezing','runny_nose','increased_thirst','frequent_urination','chest_pain','severe_breathing_difficulty','headache','sensitivity_to_light'];
$('#sym').innerHTML=SYM.map(s=>`<label><input type="checkbox" value="${s}">${s.replace(/_/g,' ')}</label>`).join('');
const RULES=[['R1',f=>f.fever&&f.cough,'Fever AND cough: consider respiratory infection; advise clinical evaluation.'],['R2',f=>f.sneezing&&f.runny_nose&&f.mild_fever,'Sneezing, runny nose and mild fever: common cold pattern.'],['R3',f=>f.increased_thirst&&f.frequent_urination,'Increased thirst AND frequent urination: possible metabolic issue; see a professional.'],['R4',f=>f.chest_pain||f.severe_breathing_difficulty,'URGENT: chest pain or severe breathing difficulty. Seek urgent care now.'],['R5',f=>f.headache&&f.sensitivity_to_light,'Headache AND light sensitivity: migraine pattern; get assessed if severe or unusual.']];
$('#run').onclick=()=>{const f={};$$('#sym input:checked').forEach(i=>f[i.value]=true);
if(!Object.keys(f).length){$('#out').innerHTML='<div class="hit">Select at least one symptom so the rules have facts to match.</div>';return}
const fired=RULES.filter(r=>r[1](f));
$('#out').innerHTML=fired.length?fired.map(r=>`<div class="hit ${r[0]==='R4'?'urgent':''}"><b>Rule ${r[0]} fired.</b> ${r[2]}</div>`).join(''):'<div class="hit">No rule matched these symptoms. Add more detail or consult a doctor.</div>'};
// lightbox
$('#certBtn').onclick=()=>$('#lightbox').hidden=false;$('#lightbox').onclick=()=>$('#lightbox').hidden=true;
addEventListener('keydown',e=>{if(e.key==='Escape')$('#lightbox').hidden=true});
// contact form -> opens mail client (no backend needed)
$('#form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);location.href=`mailto:rathodrushikesh8507@gmail.com?subject=${encodeURIComponent('Portfolio message from '+f.get('n'))}&body=${encodeURIComponent(f.get('m')+'\n\nReply to: '+f.get('e'))}`;$('#fmsg').textContent='Your email app should open with the message ready to send.'};
