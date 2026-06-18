/* ============================================================
   CET138 Full Stack Development - ePortfolio
   Student: Rahul Kumar Yadav | Canvas ID: bj20vx
   main.js - Main JavaScript File
   ============================================================ */

'use strict';

// ── Loading Screen ──────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-screen');
  const bar = document.getElementById('loader-bar');
  const pct = document.getElementById('loader-pct');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      pct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        initAll();
      }, 400);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
  }, 80);
});

function initAll() {
  initTheme();          // restore saved theme FIRST before anything renders
  initParticles();
  initTyping();
  initClock();
  initScrollReveal();
  initSkillBars();
  initNavHighlight();
  initScrollProgress();
}

// ── Restore Theme from localStorage ──────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme');  // 'light' | 'dark' | null
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.textContent = '\uD83C\uDF19';
  }
  // dark mode is the default — no class needed, do nothing
}




// ── Particles Canvas ─────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = !document.body.classList.contains('light-mode');
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(0,212,255,${p.alpha})`
        : `rgba(124,58,237,${p.alpha * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Typing Animation ─────────────────────────────────────────
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = ['HTML Developer', 'CSS Designer', 'Bootstrap Developer', 'JavaScript Programmer', 'Full Stack Developer'];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
}

// ── Digital Clock ────────────────────────────────────────────
function initClock() {
  function tick() {
    const now = new Date();
    const el = document.getElementById('clock-display');
    const de = document.getElementById('clock-date');
    if (el) {
      el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    if (de) {
      de.textContent = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => obs.observe(item));
}

// ── Skill Bars ───────────────────────────────────────────────
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.dataset.pct;
        e.target.style.width = target + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
}

// ── Nav Highlight on Scroll ──────────────────────────────────
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a, #mobile-nav a');

  function update() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Scroll Progress Bar ──────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
}

// ── Theme Toggle ─────────────────────────────────────────────
window.toggleTheme = function () {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.textContent = isLight ? '🌙' : '☀️';
  // Persist theme preference across page reloads
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

// ── Hamburger Menu ───────────────────────────────────────────
window.toggleMobileNav = function () {
  const nav = document.getElementById('mobile-nav');
  const ham = document.getElementById('hamburger');
  nav.classList.toggle('open');
  ham.classList.toggle('open');
};
window.closeMobileNav = function () {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
};

// ── Calculator ───────────────────────────────────────────────
let calcExpr = '';
window.calcInput = function (val) {
  const disp = document.getElementById('calc-disp');
  if (!disp) return;
  if (val === 'C') { calcExpr = ''; }
  else if (val === '⌫') { calcExpr = calcExpr.slice(0, -1); }
  else if (val === '=') {
    try { calcExpr = String(Function('"use strict";return (' + calcExpr + ')')());
    } catch { calcExpr = 'Error'; setTimeout(() => { calcExpr = ''; disp.textContent = '0'; }, 900); return; }
  } else { calcExpr += val; }
  disp.textContent = calcExpr || '0';
};

// ── Counter ──────────────────────────────────────────────────
let counterVal = 0;
window.counterOp = function (op) {
  const el = document.getElementById('counter-num');
  if (!el) return;
  if (op === '+') counterVal++;
  else if (op === '-') counterVal--;
  else counterVal = 0;
  el.textContent = counterVal;
  el.style.transform = 'scale(1.25)';
  setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
};

// ── Quote Generator with fetch() API ──────────────────────
window.newQuote = async function () {
  const qt = document.getElementById('quote-text');
  const qa = document.getElementById('quote-author');
  const btn = document.querySelector('[onclick="newQuote()"]');
  if (!qt || !qa) return;

  // Show loading state while waiting for API
  qt.style.opacity = '0.4';
  if (btn) btn.textContent = 'Loading...';

  try {
    // fetch() sends an HTTP GET request to the API
    // Add a short timeout + better error handling, and validate response shape.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      'https://api.quotable.io/random?tags=technology%7Cprogramming',
      { signal: controller.signal }
    );

    if (!response.ok) throw new Error('API error: ' + response.status);

    const data = await response.json();

    if (!data || typeof data.content !== 'string' || typeof data.author !== 'string') {
      throw new Error('Invalid API response');
    }

    qt.textContent = `"${data.content}"`;
    qa.textContent = `— ${data.author}`;

    clearTimeout(timeoutId);
  } catch (error) {
    // Fallback: show a new local quote on each click.
    const fallback = [
      { q: '"The best way to learn to code is to write code."', a: '— Anonymous' },
      { q: '"First, solve the problem. Then, write the code."', a: '— John Johnson' },
      { q: '"Make it work, make it right, make it fast."', a: '— Kent Beck' },
      { q: '"Code is like humor. When you have to explain it, it’s bad."', a: '— Cory House' },
      { q: '"Talk is cheap. Show me the code."', a: '— Linus Torvalds' },
      { q: '"Simplicity is the soul of efficiency."', a: '— Austin Freeman' },
      { q: '"Errors should never pass silently."', a: '— Charles Babbage' },
      { q: '"Good code is its own best documentation."', a: '— Steve McConnell' },
      { q: '"Programming isn’t about what you know; it’s about what you can figure out."', a: '— Chris Pine' },
      { q: '"The only way to learn a new programming language is by writing programs in it."', a: '— Dennis Ritchie' }
    ];

    const pick = fallback[Math.floor(Math.random() * fallback.length)];
    qt.textContent = pick.q;
    qa.textContent = pick.a;
    console.warn('Quote API unavailable, using fallback:', error);
  } finally {
    // Always restore opacity and button text
    qt.style.opacity = '1';
    if (btn) btn.textContent = '✨ New Quote';
  }
};

// ── Cart System ──────────────────────────────────────────────
let cart = {};
window.addToCart = function (name, price) {
  if (cart[name]) cart[name].qty++;
  else cart[name] = { price, qty: 1 };
  renderCart();
};
function renderCart() {
  const el = document.getElementById('cart-items');
  const tot = document.getElementById('cart-total');
  if (!el || !tot) return;
  const keys = Object.keys(cart);
  if (keys.length === 0) {
    el.innerHTML = '<p class="cart-empty">🛒 Your cart is empty</p>';
    tot.textContent = 'Rs. 0';
    return;
  }
  let html = '', total = 0;
  keys.forEach(k => {
    const item = cart[k];
    const sub = item.price * item.qty;
    total += sub;
    html += `<div class="cart-row"><span>${k} ×${item.qty}</span><span>Rs. ${sub}</span></div>`;
  });
  el.innerHTML = html;
  tot.textContent = 'Rs. ' + total;
}
window.checkout = function () {
  const keys = Object.keys(cart);
  if (keys.length === 0) { alert('Your cart is empty!'); return; }
  alert(`✅ Order placed successfully!\n\nThank you for ordering from Rahul Food Delivery!\nYour food will arrive in 30-45 minutes. 🍽️`);
  cart = {};
  renderCart();
};

// ── Copy Code ────────────────────────────────────────────────
window.copyCode = function (btnEl) {
  const block = btnEl.closest('.code-block');
  const text = block ? block.innerText.replace('Copy', '').trim() : '';
  navigator.clipboard.writeText(text).then(() => {
    btnEl.textContent = 'Copied!';
    setTimeout(() => { btnEl.textContent = 'Copy'; }, 1500);
  });
};

// ── Bootstrap Demo Modal ─────────────────────────────────────
window.showModal = function () {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.style.display = 'flex';
};
window.closeModal = function () {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.style.display = 'none';
};
document.addEventListener('click', e => {
  const modal = document.getElementById('demo-modal');
  if (modal && e.target === modal) modal.style.display = 'none';
});

// ── Contact Form ─────────────────────────────────────────────
window.submitForm = function () {
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value;
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }
  alert(`✅ Message sent successfully!\n\nThank you, ${name}! I'll get back to you shortly at ${email}.`);
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-message').value = '';
};

// ── Smooth scroll for anchor links ───────────────────────────
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile nav if open
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.getElementById('hamburger');
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger?.classList.remove('open');
    }
  }
});

// ── CSS Before/After Demo ────────────────────────────────────
window.showAfterCSS = function () {
  const b = document.getElementById('before-box');
  const a = document.getElementById('after-box');
  if (b && a) { b.style.display = 'none'; a.style.display = 'block'; }
};
window.showBeforeCSS = function () {
  const b = document.getElementById('before-box');
  const a = document.getElementById('after-box');
  if (b && a) { b.style.display = 'block'; a.style.display = 'none'; }
};

// ── Bootstrap Alert Demo ─────────────────────────────────────
window.showAlert = function (type) {
  const el = document.getElementById('bs-alert-box');
  if (!el) return;
  const msgs = {
    success: '<div class="alert alert-success alert-dismissible fade show" role="alert">✅ <strong>Success!</strong> Your action was completed successfully. <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>',
    danger: '<div class="alert alert-danger alert-dismissible fade show" role="alert">❌ <strong>Error!</strong> Something went wrong. Please try again. <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>',
    warning: '<div class="alert alert-warning alert-dismissible fade show" role="alert">⚠️ <strong>Warning!</strong> Please check your input before proceeding. <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>',
    info: '<div class="alert alert-info alert-dismissible fade show" role="alert">ℹ️ <strong>Info!</strong> Bootstrap makes styling alerts very easy. <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>',
  };
  el.innerHTML = msgs[type] || '';
};

// ── FSD Interactive Demo ─────────────────────────────────────
window.fsdStep = function (layer) {
  const layers = ['frontend', 'backend', 'database'];
  const descs = {
    frontend: 'Frontend: The user sees the website, clicks "Order Food", form data is sent to the server.',
    backend: 'Backend: Server receives the request, validates the order, processes payment & logic.',
    database: 'Database: Order details are saved in MySQL. A confirmation is returned to the user.',
  };
  layers.forEach(l => {
    const el = document.getElementById('fsd-' + l);
    if (el) el.style.borderColor = l === layer ? 'var(--accent)' : '';
  });
  const info = document.getElementById('fsd-info');
  if (info) info.textContent = descs[layer];
};
// ── CSS Flexbox Playground ───────────────────────────────────
window.setFlex = function(type, value) {
  const box = document.getElementById('flex-demo-box');
  const status = document.getElementById('flex-status');
  if (!box) return;
  if (type === 'justify') {
    box.style.justifyContent = value;
  } else {
    box.style.alignItems = value;
  }
  if (status) {
    status.textContent = `justify-content: ${box.style.justifyContent || 'space-between'} \u00a0|\u00a0 align-items: ${box.style.alignItems || 'center'}`;
  }
};
