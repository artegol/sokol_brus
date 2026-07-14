const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const heroMedia = document.querySelector('.hero-media img');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
  if (!reducedMotion && window.scrollY < window.innerHeight) {
    heroMedia.style.transform = `translateY(${window.scrollY * 0.12}px) scale(1)`;
  }
}

function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('menu-open');
}

toggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', setHeader, { passive: true });
setHeader();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });
} else {
  reveals.forEach(element => element.classList.add('visible'));
}
