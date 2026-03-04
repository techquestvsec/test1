/* shared.js — star canvas + back-to-top, used on every page */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STARS ── */
  const canvas = document.getElementById('starCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    const init   = () => {
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.45 + 0.1,
        s: Math.random() * 0.04 + 0.01,
        ph: Math.random() * Math.PI * 2,
      }));
    };
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      stars.forEach(s => {
        const o = s.o * (0.5 + 0.5 * Math.sin(t * s.s * 60 + s.ph));
        ctx.globalAlpha = o;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
  }

  /* ── BACK TO TOP ── */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', scrollY > 400);
    });
    topBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
