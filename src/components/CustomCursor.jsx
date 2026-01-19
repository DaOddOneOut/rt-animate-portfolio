// src/components/CustomCursor.jsx
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <img
      src="/cursor-pen.png"
      alt="Custom Cursor"
      className="pointer-events-none select-none"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        transform: 'translate(-20%, -90%) scaleX(-1)', // adjust origin + flip horizontally
        width: '40px',
        height: 'auto',
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
