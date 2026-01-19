// src/effects/cursor-trail.js
export default function initCursorTrail() {
  const trail = [];

  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let current = 0;
  window.addEventListener('mousemove', (e) => {
    const dot = trail[current];
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    dot.style.opacity = '1';
    dot.style.transition = 'all 0.2s ease-out';

    current = (current + 1) % trail.length;
  });
}
