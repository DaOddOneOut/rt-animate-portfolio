// src/theme/StylePicker.jsx
// Navbar control: pick Auto (each page has its own style), Shuffle (new random style per page),
// or lock the whole site to one of the 10 styles.
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles, HiCheck } from 'react-icons/hi';
import { useStyleEngine } from './StyleContext';
import { ensureFonts } from './styles';

export default function StylePicker() {
  const { styles, order, mode, active, dark, busy, setMode } = useStyleEngine();
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const choose = (m) => {
    setOpen(false);
    setMode(m);
  };

  const modeLabel = mode === 'auto' ? 'Auto' : mode === 'shuffle' ? 'Shuffle' : styles[mode].name;

  return (
    <div className="relative" ref={wrap}>
      <button
        ref={btn}
        type="button"
        className="btn btn-ghost !px-3 !py-2 !text-[0.85rem]"
        aria-haspopup="dialog"
        aria-label="Choose an animation art style"
        aria-expanded={open}
        aria-controls="style-picker"
        onClick={() => {
          setOpen((o) => !o);
          order.forEach(ensureFonts);
        }}
        title="Change the art style of the whole site"
      >
        <HiOutlineSparkles className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Style: {modeLabel}</span>
        <span className="hidden min-[440px]:inline sm:hidden">Style</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="style-picker"
            role="dialog"
            aria-label="Choose an animation art style"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="card fixed inset-x-3 top-[4.75rem] z-[60] max-h-[calc(100vh-6rem)] overflow-y-auto p-3 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[23rem]"
            style={{ maxHeight: '72vh', overflowY: 'auto' }}
          >
            <p className="px-1 pb-2 text-sm text-muted">
              Every page opens in its own style. Pick one to re-skin the whole site, or let it shuffle.
            </p>

            <div className="mb-3 grid grid-cols-2 gap-2">
              {[
                { id: 'auto', label: 'Auto', hint: 'a style per page' },
                { id: 'shuffle', label: 'Shuffle', hint: 'random each page' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  disabled={busy}
                  onClick={() => choose(m.id)}
                  className={`chip text-left !rounded-lg !px-3 !py-2 ${mode === m.id ? 'chip-on' : ''}`}
                  aria-pressed={mode === m.id}
                >
                  <span className="block font-bold">{m.label}</span>
                  <span className="block text-xs opacity-80">{m.hint}</span>
                </button>
              ))}
            </div>

            <ul className="grid gap-1.5">
              {order.map((id) => {
                const s = styles[id];
                const pal = dark ? s.dark : s.light;
                const isActive = active === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => choose(id)}
                      aria-pressed={mode === id}
                      className="flex w-full items-center gap-3 rounded-lg border-2 px-2.5 py-2 text-left transition-colors hover:bg-bg2"
                      style={{ borderColor: mode === id ? 'rgb(var(--accent))' : 'transparent' }}
                    >
                      <span className="flex shrink-0">
                        {[pal.bg, pal.accent, pal.accent2, pal.accent3].map((col, i) => (
                          <span
                            key={i}
                            className="block h-5 w-5 border"
                            style={{ background: col, borderColor: pal.line, marginLeft: i ? -5 : 0, borderRadius: 999 }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block leading-tight font-bold">{s.name}</span>
                        <span className="block truncate text-xs text-muted">{s.tag}</span>
                      </span>
                      {isActive && <HiCheck className="h-5 w-5 shrink-0 text-accent-ink" aria-label="Currently showing" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
