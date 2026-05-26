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

/* ── MOBILE MENU ── */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if(mobileMenuBtn && mobileMenu){
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
  
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

/* ── TYPEWRITER ── */
const tw = document.getElementById('tw');
if(tw){
  const phrases = [
    'I build modern, responsive websites.',
    'I learn something new every single day.',
    'I document the whole journey publicly.',
    'From Zero → Hero. Day by day.',
    'Dark mode? Light mode? Both look fire. 🔥',
    'Day 18: This portfolio is now live on Vercel! 🚀',
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
const revObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');}),
{threshold:.12,rootMargin:'0px 0px -40px 0px'});
revEls.forEach(el=>revObs.observe(el));

/* ── SKILL BARS ── */
// b6/p6 are the new Vercel bar added on Day 18
const skillDefs=[
  ['b1','p1',85],
  ['b2','p2',78],
  ['b3','p3',62],
  ['b4','p4',70],
  ['b5','p5',55],
  ['b6','p6',72],   // ← NEW: Vercel Deployment
];
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

/* ── MODAL SYSTEM ── */
const projectsData = {
  "Portfolio Foundation": {
    icon: "📁", day: "DAY 01",
    description: "The very first thing I ever built in HTML. Semantic structure with header, nav, main, section, and footer tags.",
    tech: ["HTML5", "CSS3", "Flexbox", "Semantic HTML"],
    lessons: ["Basic HTML document structure", "CSS Flexbox for layouts", "Creating a responsive navbar"]
  },
  "Typewriter Effect": {
    icon: "⌨️", day: "DAY 07",
    description: "Built in vanilla JavaScript with zero libraries. Uses recursive setTimeout calls for character timing.",
    tech: ["JavaScript", "DOM Manipulation", "setTimeout", "CSS Animation"],
    lessons: ["JavaScript timing functions", "DOM manipulation techniques", "String and array methods"]
  },
  "Scroll Reveal System": {
    icon: "🌊", day: "DAY 10",
    description: "The IntersectionObserver API changed everything. Elements fade in when they enter the viewport.",
    tech: ["IntersectionObserver API", "CSS Transitions", "JavaScript"],
    lessons: ["IntersectionObserver API usage", "CSS transform animations", "Performance optimization"]
  },
  "Animated Skill Bars": {
    icon: "📊", day: "DAY 12",
    description: "Skill bars that animate when scrolled into view with live percentage counters.",
    tech: ["CSS Custom Properties", "JS Intervals", "IntersectionObserver", "Gradients"],
    lessons: ["Custom CSS properties", "JavaScript setInterval", "Progress bar animations"]
  },
  "Glassmorphism Modals": {
    icon: "💎", day: "DAY 13",
    description: "Full-screen overlay with backdrop-filter blur for glass effect. Project data in JS object.",
    tech: ["backdrop-filter", "CSS Keyframes", "JS Objects", "Accessibility"],
    lessons: ["Backdrop-filter blur effect", "CSS keyframe animations", "JavaScript objects for data"]
  },
  "Light / Dark Mode": {
    icon: "🌙", day: "DAY 14",
    description: "Complete theme switching using CSS variables and localStorage. One click, total transformation.",
    tech: ["CSS Variables", "data-theme", "localStorage", "Theme Switching"],
    lessons: ["CSS custom properties", "data-theme attribute switching", "localStorage for persistence"]
  },
  "Responsive Design": {
    icon: "📱", day: "DAY 16",
    description: "Mobile-first overhaul of the entire portfolio. Every section was refactored with fluid layouts, breakpoints at 768px and 480px, and CSS clamp() for typography that scales naturally.",
    tech: ["Media Queries", "Mobile-First CSS", "CSS clamp()", "Flexbox", "CSS Grid"],
    lessons: ["Mobile-first design philosophy", "Fluid typography with clamp()", "Responsive grid layouts", "Hamburger menu + mobile nav", "Testing across viewport sizes"]
  },
  "Glassmorphism Modal System": {
    icon: "💎", day: "DAY 17",
    description: "Today I built this very modal system you're looking at! A fully custom glassmorphism modal that pops up when you click any project card. No libraries, just vanilla JavaScript, CSS backdrop-filter, and smooth animations.",
    tech: ["JavaScript", "CSS backdrop-filter", "Glassmorphism", "Event Listeners", "Keyboard Navigation", "CSS Transitions"],
    lessons: [
      "Creating dynamic modals with JavaScript DOM manipulation",
      "CSS backdrop-filter for glass/blur effects",
      "Smooth scale + fade modal animations",
      "Escape key to close modal (keyboard accessibility)",
      "Click outside overlay to close modal",
      "Preventing body scroll when modal is open",
      "Passing dynamic data to modals using JavaScript objects",
      "CSS cubic-bezier transitions for polish"
    ]
  },

  /* ★ DAY 18 — NEW ★ */
  "Vercel Deployment": {
    icon: "🚀", day: "DAY 18",
    description: "Today I took this entire portfolio off localhost and deployed it to the real internet using Vercel. Connected GitHub repo → Vercel project → live URL. Every git push now auto-deploys. This website is no longer just on my computer — it exists in the world.",
    tech: ["Vercel", "Git", "GitHub", "CI/CD", "Auto Deploy", "CDN", "HTTPS"],
    lessons: [
      "Creating a Vercel account and linking it to GitHub",
      "Understanding what a CDN (Content Delivery Network) is",
      "Git add, commit, push — the deployment workflow",
      "What CI/CD means: Continuous Integration / Continuous Deployment",
      "How Vercel auto-detects static HTML/CSS/JS projects",
      "Understanding build output vs source files",
      "Setting up a custom domain on Vercel (optional step)",
      "Reading Vercel deployment logs and fixing build errors",
      "The difference between localhost and a live production URL",
      "Why HTTPS matters and how Vercel handles SSL certificates automatically"
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
  if (!project) {
    console.error("Project not found:", projectName);
    return;
  }

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
    <ul>${project.lessons.map(l => `<li>${l}</li>`).join('')}</ul>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  liveBtn.onclick = () => {
    if (projectName === "Glassmorphism Modal System") {
      alert("✨ You're already experiencing the Glassmorphism Modal System! This modal IS the live demo. ✨");
    } else if (projectName === "Vercel Deployment") {
      alert("🚀 You're already on the live Vercel deployment! The URL in your browser IS the live demo. ✨");
    } else {
      alert(`✨ "${projectName}" live demo coming soon! ✨`);
    }
  };
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal(); });

window.openModal = openModal;

/* ── SEND TO GMAIL FUNCTION ── */
function sendToGmail() {
  const name = document.getElementById('contactName')?.value;
  const email = document.getElementById('contactEmail')?.value;
  const message = document.getElementById('contactMessage')?.value;
  
  if(!name || !email || !message){
    alert('⚠️ Please fill in all fields!');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    alert('⚠️ Please enter a valid email address!');
    return;
  }
  
  const YOUR_GMAIL = "spstudent2006@gmail.com";
  
  const subject = encodeURIComponent(`Contact from ${name} - Zero Knowledge Portfolio`);
  const body = encodeURIComponent(
    `Name: ${name}\n\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}\n\n` +
    `---\nSent from Zero Knowledge Portfolio`
  );
  
  window.location.href = `mailto:${YOUR_GMAIL}?subject=${subject}&body=${body}`;
  alert('📧 Opening Gmail...\n\nPlease send the email to complete your message.');
  
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const msgInput = document.getElementById('contactMessage');
  if(nameInput) nameInput.value = '';
  if(emailInput) emailInput.value = '';
  if(msgInput) msgInput.value = '';
}