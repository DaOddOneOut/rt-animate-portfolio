// src/components/CustomCursor.jsx
// Mouse cursors follow the active style. The hand-drawn styles (cel, whiteboard, rotoscope) get
// the animated pen; every other style gets its own SVG cursor (see theme/cursors.js).
// Touch devices keep their normal behavior.
import { useEffect, useRef, useState } from 'react';
import { useStyleEngine } from '../theme/StyleContext';
import initCursorTrail from '../effects/cursor-trail';
import { cursorsFor } from '../theme/cursors';

export default function CustomCursor() {
  const { active, styles, dark } = useStyleEngine();
  const ref = useRef(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const enabled = finePointer && !!styles[active].pen;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.pen = enabled ? 'on' : 'off';
    if (!enabled) return undefined;

    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-20%, -90%) scaleX(-1)`;
        ref.current.style.opacity = '1';
      }
    };
    window.addEventListener('mousemove', move);
    const stopTrail = initCursorTrail();
    return () => {
      window.removeEventListener('mousemove', move);
      stopTrail();
      root.dataset.pen = 'off';
    };
  }, [enabled]);

  // per-style SVG cursors for the non-pen styles
  useEffect(() => {
    const root = document.documentElement;
    const set = finePointer && !styles[active].pen ? cursorsFor(active, styles[active][dark ? 'dark' : 'light']) : null;
    if (!set) {
      root.dataset.cur = 'off';
      return undefined;
    }
    root.style.setProperty('--cur-def', set.def);
    root.style.setProperty('--cur-ptr', set.ptr);
    root.dataset.cur = 'on';
    return () => {
      root.dataset.cur = 'off';
    };
  }, [finePointer, active, dark, styles]);

  if (!enabled) return null;

  return (
    <img
      ref={ref}
      src="/cursor-pen.webp"
      alt=""
      aria-hidden="true"
      draggable="false"
      style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 'auto', opacity: 0,
        zIndex: 10000, pointerEvents: 'none', userSelect: 'none', willChange: 'transform',
      }}
    />
  );
}
