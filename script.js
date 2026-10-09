// ---------- Theme toggle (dark is the default) ----------
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#0f172a' : '#f1f4fa';
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
});

// ---------- Mobile menu (drops down from the top bar) ----------
const menuBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));

// ---------- Highlight the current section in the navigation ----------
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...new Set(navLinks.map((a) => a.getAttribute('href')))].map((id) => document.querySelector(id)).filter(Boolean);

if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.toggleAttribute('aria-current', false);
        if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((s) => spy.observe(s));
}

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
