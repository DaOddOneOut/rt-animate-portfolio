// src/effects/ink-ripple.js
// A soft ripple wherever a link is clicked. Returns a cleanup function.
export default function addInkRipple() {
  const onClick = (e) => {
    const isLink =
      e.target.tagName === 'A' || (e.target.closest && e.target.closest('a')) || e.target.getAttribute?.('role') === 'link';
    if (!isLink) return;

    const ripple = document.createElement('span');
    ripple.className = 'ink-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
