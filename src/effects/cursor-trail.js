// src/effects/cursor-trail.js
// A short graphite trail behind the pen cursor. Returns a cleanup function.
export default function initCursorTrail() {
  const dots = Array.from({ length: 8 }, () => {
    const d = document.createElement('div');
    d.className = 'cursor-trail-dot';
    d.style.opacity = '0';
    document.body.appendChild(d);
    return d;
  });
  const timers = [];
  let i = 0;

  const onMove = (e) => {
    const d = dots[i];
    d.style.left = `${e.clientX}px`;
    d.style.top = `${e.clientY}px`;
    d.style.opacity = '1';
    clearTimeout(timers[i]);
    timers[i] = setTimeout(() => {
      d.style.opacity = '0';
    }, 380);
    i = (i + 1) % dots.length;
  };

  window.addEventListener('mousemove', onMove);
  return () => {
    window.removeEventListener('mousemove', onMove);
    timers.forEach(clearTimeout);
    dots.forEach((d) => d.remove());
  };
}
