/* ── THEME ── */
const root = document.documentElement;
const btn  = document.getElementById('themeToggle');
const lbl  = document.getElementById('themeLabel');
const saved = localStorage.getItem('zk-theme') || 'dark';
root.setAttribute('data-theme', saved);
if(lbl) lbl.textContent = saved.toUpperCase();

if(btn){
  btn.addEventListener('click', () => {
    const cur  = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('zk-theme', next);
    if(lbl) lbl.textContent = next.toUpperCase();
  });
}

/* ── TYPEWRITER (Only on home page) ── */
const tw = document.getElementById('tw');
if(tw){
  const phrases = [
    'I build modern, responsive websites.',
    'I learn something new every single day.',
    'I document the whole journey publicly.',
    'From Zero → Hero. Day by day.',
    'Dark mode? Light mode? Both look fire. 🔥',
  ];
  let pi=0, ci=0, del=false;
  function type(){
    const ph=phrases[pi];
    if(!del){ 
      tw.textContent=ph.slice(0,++ci); 
      if(ci===ph.length){
        setTimeout(()=>{del=true;type();},2400);
        return;
      } 
    } else { 
      tw.textContent=ph.slice(0,--ci); 
      if(ci===0){
        del=false;
        pi=(pi+1)%phrases.length;
      } 
    }
    setTimeout(type,del?38:72);
  }
  type();
}

/* ── SCROLL REVEAL ── */
const revEls=document.querySelectorAll('.reveal');
const revObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');})
,{threshold:.12,rootMargin:'0px 0px -40px 0px'});
revEls.forEach(el=>revObs.observe(el));

/* ── SKILL BARS (Only on about page) ── */
const skillDefs=[['b1','p1',85],['b2','p2',78],['b3','p3',62],['b4','p4',70],['b5','p5',50]];
let skDone=false;
const skObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !skDone){
    skDone=true;
    skillDefs.forEach(([bid,pid,to],i)=>{
      setTimeout(()=>{
        const bar = document.getElementById(bid);
        const pct = document.getElementById(pid);
        if(bar) bar.style.width=to+'%';
        if(pct){
          let c=0,step=to/60;
          const iv=setInterval(()=>{
            c=Math.min(c+step,to);
            pct.textContent=Math.round(c)+'%';
            if(c>=to)clearInterval(iv);
          },25);
        }
      },i*140);
    });
  }
},{threshold:.3});
const sp=document.getElementById('skills-panel');
if(sp)skObs.observe(sp);

/* ── DAY 15: MODAL SYSTEM ── */
const projectsData = {
  "Portfolio Foundation": {
    icon: "📁",
    day: "DAY 01",
    description: "The very first thing I ever built in HTML. Semantic structure with header, nav, main, section, and footer tags. A CSS reset to wipe browser defaults. A flexbox navbar with working anchor links. This was ground zero — and it was enough to make me feel like a real developer.",
    tech: ["HTML5", "CSS3", "Flexbox", "Semantic HTML"],
    lessons: [
      "Basic HTML document structure",
      "CSS Flexbox for layouts",
      "Creating a responsive navbar",
      "Working with CSS resets"
    ]
  },
  "Typewriter Effect": {
    icon: "⌨️",
    day: "DAY 07",
    description: "Built in vanilla JavaScript with zero libraries. Uses recursive setTimeout calls for character timing, a cycling array of phrases, and a separate deletion phase. The blinking cursor is a CSS border-right animation.",
    tech: ["JavaScript", "DOM Manipulation", "setTimeout", "CSS Animation"],
    lessons: [
      "JavaScript timing functions",
      "DOM manipulation techniques",
      "String and array methods",
      "CSS cursor animations"
    ]
  },
  "Scroll Reveal System": {
    icon: "🌊",
    day: "DAY 10",
    description: "The IntersectionObserver API changed everything. Elements start invisible (opacity 0, translateY 30px). When they enter the viewport an .on class triggers the smooth CSS reveal. Staggered transition-delay makes it feel cinematic.",
    tech: ["IntersectionObserver API", "CSS Transitions", "JavaScript"],
    lessons: [
      "IntersectionObserver API usage",
      "CSS transform animations",
      "Performance optimization",
      "Staggered animations"
    ]
  },
  "Animated Skill Bars": {
    icon: "📊",
    day: "DAY 12",
    description: "The bars animate once — the first time they scroll into view — using an IntersectionObserver with a boolean guard. The percentage counter is a pure JS interval counting from 0. Different gradient fills per skill.",
    tech: ["CSS Custom Properties", "JS Intervals", "IntersectionObserver", "Gradients"],
    lessons: [
      "Custom CSS properties",
      "JavaScript setInterval",
      "Progress bar animations",
      "Gradient backgrounds"
    ]
  },
  "Glassmorphism Modals": {
    icon: "💎",
    day: "DAY 13",
    description: "Full-screen overlay with backdrop-filter: blur(14px) for that glass effect. Project data lives in a JS object so adding new entries is instant. The slide-up is a CSS @keyframes triggered by adding an .open class.",
    tech: ["backdrop-filter", "CSS Keyframes", "JS Objects", "Accessibility"],
    lessons: [
      "Backdrop-filter blur effect",
      "CSS keyframe animations",
      "JavaScript objects for data",
      "Escape key handling"
    ]
  },
  "Light / Dark Mode": {
    icon: "🌙",
    day: "DAY 14",
    description: "The entire theme system runs through CSS custom properties on the :root element. A data-theme attribute on <html> switches the complete variable set. localStorage saves the preference across sessions.",
    tech: ["CSS Variables", "data-theme", "localStorage", "Theme Switching"],
    lessons: [
      "CSS custom properties (variables)",
      "data-theme attribute switching",
      "localStorage for persistence",
      "Complete UI transformation"
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalIcon = document.getElementById('modalIcon');
const modalDay = document.getElementById('modalDay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLessons = document.getElementById('modalLessons');
const closeModalBtn = document.getElementById('closeModal');
const liveBtn = document.getElementById('modalLiveBtn');

function openModal(projectName) {
  const project = projectsData[projectName];
  if (!project) return;
  
  modalIcon.textContent = project.icon;
  modalDay.textContent = project.day;
  modalTitle.textContent = projectName;
  modalDescription.textContent = project.description;
  
  modalTech.innerHTML = '';
  project.tech.forEach(tech => {
    const tag = document.createElement('span');
    tag.textContent = tech;
    modalTech.appendChild(tag);
  });
  
  modalLessons.innerHTML = `
    <h4><span>🧠</span> What I Learned</h4>
    <ul>
      ${project.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
    </ul>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  liveBtn.onclick = () => {
    alert(`✨ "${projectName}" live demo coming soon on Day 20! ✨`);
  };
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

window.openModal = openModal;

/* ── CONTACT FORM WITH EMAIL (mailto) ── */
function sendMessage() {
  const name = document.getElementById('contactName')?.value;
  const email = document.getElementById('contactEmail')?.value;
  const message = document.getElementById('contactMessage')?.value;
  
  if(!name || !email || !message){
    alert('⚠️ Please fill in all fields!');
    return;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    alert('⚠️ Please enter a valid email address!');
    return;
  }
  
  // Create email content
  const subject = encodeURIComponent(`Contact from ${name} - Zero Knowledge Portfolio`);
  const body = encodeURIComponent(
    `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Zero Knowledge Portfolio`
  );
  
  // Open default email client
  window.location.href = `mailto:your-email@gmail.com?subject=${subject}&body=${body}`;
  
  alert('📧 Opening your email client...\n\nPlease send the email to complete your message.');
  
  // Clear form
  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMessage').value = '';
}