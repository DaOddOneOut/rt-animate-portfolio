// src/theme/StyleContext.jsx
// Owns: the active art style, light/dark, the visitor's mode (auto | shuffle | a locked style),
// and the transition runner (cover -> swap -> reveal).
//
// The page swap is driven by the transition's OWN animation clock (see <StyleTransition />,
// which calls `advance`), not by a wall-clock timer. framer-motion slows animations down when
// frames drop, so a timer could otherwise swap the page before the cover finished drawing.
// Timers remain only as a safety net (e.g. a hidden tab pauses animations).
import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { STYLES, STYLE_ORDER, styleForPath, applyStyle, ensureFonts } from './styles';

const Ctx = createContext(null);
export const useStyleEngine = () => useContext(Ctx);

const LS_MODE = 'rt-style-mode';
const HOLD_MS = 90; // a beat on the fully covered screen so the label registers

const readMode = () => {
  try {
    const v = localStorage.getItem(LS_MODE);
    return v === 'auto' || v === 'shuffle' || STYLES[v] ? v : 'auto';
  } catch {
    return 'auto';
  }
};
const readDark = () => {
  try {
    return localStorage.getItem('theme') === 'dark';
  } catch {
    return false;
  }
};

// Which style should a given page use right now?
const pick = (pathname, mode, current) => {
  if (mode === 'auto') return styleForPath(pathname);
  if (mode === 'shuffle') {
    const pool = STYLE_ORDER.filter((s) => s !== current);
    return pool[Math.floor(Math.random() * pool.length)];
  }
  return mode; // locked to one style
};

export function StyleProvider({ children }) {
  const location = useLocation();
  const [mode, setModeState] = useState(readMode);
  const [dark, setDark] = useState(readDark);
  const [active, setActive] = useState(() => pick(location.pathname, readMode(), null));
  const [fx, setFx] = useState({ style: null, phase: 'idle' });
  const [busy, setBusy] = useState(false);

  const busyRef = useRef(false);
  const timers = useRef([]);
  const advanceRef = useRef(() => {});

  // Apply the theme before paint so there is never a flash of the wrong style.
  useLayoutEffect(() => {
    applyStyle(active, dark);
  }, [active, dark]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* private mode: ignore */
    }
  }, [dark]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // Play a transition in `target`'s style. `commit` runs while the screen is fully covered.
  // `label` is the text shown mid-transition (page name or style name).
  const play = useCallback((target, commit, label) => {
    if (busyRef.current) return false;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      commit();
      return true;
    }

    busyRef.current = true;
    setBusy(true);
    ensureFonts(target); // start loading the new fonts while the cover animates in
    const { cover, reveal } = STYLES[target].fx;
    let phase = 'cover';

    const finish = () => {
      if (phase === 'done') return;
      phase = 'done';
      clearTimers();
      setFx({ style: null, phase: 'idle' });
      busyRef.current = false;
      setBusy(false);
    };
    const swap = () => {
      if (phase !== 'cover') return;
      phase = 'reveal';
      clearTimers();
      commit();
      setFx({ style: target, phase: 'reveal', label });
      timers.current.push(setTimeout(finish, reveal * 1.7 + 500)); // safety net
    };

    // the overlay reports when its own cover / reveal animation has actually finished
    advanceRef.current = (done) => {
      if (done === 'cover' && phase === 'cover') {
        clearTimers();
        timers.current.push(setTimeout(swap, HOLD_MS));
      } else if (done === 'reveal' && phase === 'reveal') {
        finish();
      }
    };

    setFx({ style: target, phase: 'cover', label });
    timers.current.push(setTimeout(swap, cover * 1.7 + 500)); // safety net
    return true;
  }, []);

  const advance = useCallback((done) => advanceRef.current(done), []);

  // Visitor picked a mode in the style picker.
  const setMode = useCallback(
    (next) => {
      if (busyRef.current) return;
      setModeState(next);
      try {
        localStorage.setItem(LS_MODE, next);
      } catch {
        /* ignore */
      }
      const target = pick(location.pathname, next, active);
      if (target === active) return; // nothing visually changes
      play(target, () => setActive(target), STYLES[target].name);
    },
    [location.pathname, active, play],
  );

  const value = useMemo(
    () => ({
      styles: STYLES,
      order: STYLE_ORDER,
      mode,
      active,
      dark,
      fx,
      busy,
      setActive,
      setMode,
      play,
      advance,
      toggleDark: () => setDark((d) => !d),
      pickFor: (pathname) => pick(pathname, mode, active),
    }),
    [mode, active, dark, fx, busy, setMode, play, advance],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
