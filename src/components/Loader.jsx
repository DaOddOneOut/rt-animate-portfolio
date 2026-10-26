// src/components/Loader.jsx
// First-visit intro. Shown once per browser session (App skips it on later visits).
import { motion } from 'framer-motion';
import { useStyleEngine } from '../theme/StyleContext';

export default function Loader() {
  const { active, styles } = useStyleEngine();
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-bg text-ink"
      style={{ zIndex: 9997 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
      aria-live="polite"
    >
      <motion.img
        src="/self-sketch.webp"
        alt=""
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 12 }}
        className="mb-6 h-36 w-36 rounded-full object-contain"
        style={{ border: 'var(--border-w) solid rgb(var(--line))', boxShadow: 'var(--card-shadow)', background: 'rgb(var(--card))' }}
      />
      <motion.p
        className="t-h2 flex items-center gap-3"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 animate-bounce" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687 1.688M3 21h3.75L17.81 9.94a1.125 1.125 0 00-1.59-1.591L5.16 19.41V21z" />
        </svg>
        Welcome to my world...
      </motion.p>
      <p className="mt-3 text-sm text-muted">Opening in {styles[active].name} style</p>
    </motion.div>
  );
}
