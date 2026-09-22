/* ============================================================
   PowerShare — animations.js
   Ripple on buttons, staggered card reveals, splash auto-advance.
   Respects prefers-reduced-motion throughout.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Button ripple ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ---------- Staggered reveal for card grids/lists ---------- */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.animation = `screen-in 400ms cubic-bezier(0.4,0,0.2,1) both`;
      child.style.animationDelay = `${Math.min(i * 60, 400)}ms`;
    });
  });

  /* ---------- Splash screen auto-advance ---------- */
  const splash = document.querySelector('.splash-screen');
  if (splash) {
    const nextPage = splash.getAttribute('data-next') || 'welcome.html';
    setTimeout(() => { window.location.href = nextPage; }, 2200);
  }

  /* ---------- Smooth internal navigation fade-out ---------- */
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.target === '_blank' || this.hasAttribute('data-no-transition') || reduceMotion) return;
      const shell = document.querySelector('.app-shell, .admin-shell');
      if (!shell) return;
      e.preventDefault();
      const href = this.getAttribute('href');
      shell.style.transition = 'opacity 180ms ease';
      shell.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 170);
    });
  });
});
