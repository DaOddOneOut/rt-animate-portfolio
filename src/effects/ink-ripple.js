// src/effects/ink-ripple.js
export default function addInkRipple() {
  document.addEventListener('click', (e) => {
    const isLink =
      e.target.tagName === 'A' ||
      e.target.closest('a') || // in case child element is clicked
      e.target.getAttribute?.('role') === 'link';

    if (!isLink) return;

    const ripple = document.createElement('span');
    ripple.className = 'ink-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}
