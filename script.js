/* ============================================================
   SCRIPT.JS — Portfolio Futuristico
   ============================================================ */

// ─── CURSOR ─────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ─── NAVBAR SCROLL ──────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── CANVAS BACKGROUND (Particle Grid) ──────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLS = Math.floor(window.innerWidth / 60);
const ROWS = Math.floor(window.innerHeight / 60);

class Particle {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.ox = x; this.oy = y;
    this.vx = 0; this.vy = 0;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.size = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.4 + 0.1;
    this.offset = Math.random() * Math.PI * 2;
  }
  update(t) {
    this.x = this.ox + Math.sin(t * this.speed + this.offset) * 8;
    this.y = this.oy + Math.cos(t * this.speed * 0.7 + this.offset) * 8;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 210, 255, ${this.alpha})`;
    ctx.fill();
  }
}

const particles = [];
for (let r = 0; r <= ROWS; r++) {
  for (let c = 0; c <= COLS; c++) {
    particles.push(new Particle(
      (c / COLS) * window.innerWidth,
      (r / ROWS) * window.innerHeight
    ));
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 210, 255, ${(1 - dist / 90) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

let animTime = 0;
function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animTime += 0.008;
  particles.forEach(p => { p.update(animTime); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ─── TYPED CODE ANIMATION ────────────────────────────────────
const codeLines = [
  '<span style="color:#7b2fff">interface</span> <span style="color:#00d2ff">Developer</span> {',
  '  <span style="color:#ffd700">name</span>: <span style="color:#ff2d6e">string</span>;',
  '  <span style="color:#ffd700">skills</span>: <span style="color:#ff2d6e">string[]</span>;',
  '  <span style="color:#ffd700">passion</span>: <span style="color:#00ff9d">"∞"</span>;',
  '}',
  '',
  '<span style="color:#7b2fff">const</span> <span style="color:#00d2ff">me</span>: <span style="color:#ffd700">Developer</span> = {',
  '  <span style="color:#ffd700">name</span>: <span style="color:#00ff9d">"Il Tuo Nome"</span>,',
  '  <span style="color:#ffd700">skills</span>: [<span style="color:#00ff9d">"React"</span>, <span style="color:#00ff9d">"Node"</span>],',
  '  <span style="color:#ffd700">passion</span>: <span style="color:#00ff9d">"∞"</span>,',
  '};',
  '',
  '<span style="color:#6b7fa3">// building the future 🚀</span>',
];

const typedEl = document.getElementById('typed-code');
let lineIdx = 0;
let charIdx = 0;
let typedHTML = '';

function typeCode() {
  if (lineIdx >= codeLines.length) {
    setTimeout(() => {
      typedHTML = '';
      lineIdx = 0; charIdx = 0;
      typedEl.innerHTML = '';
      typeCode();
    }, 3500);
    return;
  }
  const line = codeLines[lineIdx];
  // Strip HTML tags for typing effect on raw text
  const stripped = line.replace(/<[^>]*>/g, '');
  if (charIdx <= stripped.length) {
    // Rebuild with HTML but only show charIdx visible chars
    let visible = 0;
    let result = '';
    let inTag = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '<') inTag = true;
      if (inTag) { result += line[i]; if (line[i] === '>') inTag = false; continue; }
      if (visible < charIdx) { result += line[i]; visible++; }
    }
    typedEl.innerHTML = typedHTML + result + '<span style="color:#00d2ff;animation:blink 1s step-end infinite">▋</span>';
    charIdx++;
    setTimeout(typeCode, 28);
  } else {
    typedHTML += line + '\n';
    lineIdx++; charIdx = 0;
    typeCode();
  }
}

setTimeout(typeCode, 800);

// ─── COUNTER ANIMATION ──────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// ─── SKILL BARS ANIMATION ────────────────────────────────────
function animateSkillBars() {
  document.querySelectorAll('.skill-item').forEach(item => {
    const level = item.dataset.level;
    const fill = item.querySelector('.skill-fill');
    if (fill) fill.style.width = level + '%';
  });
}

// ─── INTERSECTION OBSERVER ───────────────────────────────────
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, observerOptions);

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateSkillBars();
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounters(); heroObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to elements
  document.querySelectorAll('.section-title, .section-label, .about-text, .about-terminal, .project-card, .skill-group, .contact-link, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Skill bars
  const skillSection = document.querySelector('.skills');
  if (skillSection) skillObserver.observe(skillSection);

  // Counters
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // Timeline
  document.querySelectorAll('.timeline-item').forEach(el => {
    fadeObserver.observe(el);
    el.classList.add('timeline-item');
  });

  // Hero entrance animation
  setTimeout(() => {
    document.querySelectorAll('.hero-title .line').forEach((line, i) => {
      line.style.transition = `opacity 0.7s ${i * 0.15}s, transform 0.7s ${i * 0.15}s`;
      line.style.opacity = '0';
      line.style.transform = 'translateY(30px)';
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 100 + i * 150);
    });
    document.querySelectorAll('.hero-tag, .hero-sub, .hero-cta, .hero-stats').forEach((el, i) => {
      el.style.transition = `opacity 0.7s ${0.5 + i * 0.12}s, transform 0.7s ${0.5 + i * 0.12}s`;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 120);
    });
  }, 100);

  // Code window entrance
  const codeWindow = document.querySelector('.code-window');
  if (codeWindow) {
    codeWindow.style.opacity = '0';
    codeWindow.style.transform = 'perspective(1000px) rotateY(-3deg) rotateX(2deg) translateX(40px)';
    codeWindow.style.transition = 'opacity 0.9s 0.6s, transform 0.9s 0.6s';
    setTimeout(() => {
      codeWindow.style.opacity = '1';
      codeWindow.style.transform = 'perspective(1000px) rotateY(-3deg) rotateX(2deg)';
    }, 200);
  }
});

// ─── SMOOTH SECTION REVEAL WITH STAGGER ─────────────────────
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.fade-in');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-pad').forEach(s => staggerObserver.observe(s));

// ─── CONTACT FORM ────────────────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Messaggio inviato!';
    btn.style.background = '#00ff9d';
    btn.style.color = '#050810';
    setTimeout(() => {
      btn.innerHTML = 'Invia messaggio <span>→</span>';
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}

// ─── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + section.id) link.style.color = 'var(--accent)';
      });
    }
  });
}, { passive: true });

// ─── TECH PILLS HOVER RIPPLE ─────────────────────────────────
document.querySelectorAll('.tech-pills span').forEach(pill => {
  pill.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  pill.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});
