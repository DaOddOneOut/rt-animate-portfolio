// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { StyleProvider, useStyleEngine } from './theme/StyleContext';
import StyleBackdrop from './theme/StyleBackdrop';
import StyleTransition from './theme/StyleTransition';
import { ensureFonts, PAGE_STYLES } from './theme/styles';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PageWrapper from './components/PageWrapper';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import addInkRipple from './effects/ink-ripple';
import './index.css';

const PAGE_LABELS = { '/': 'Home', '/about': 'About', '/projects': 'Projects', '/contact': 'Contact' };
const INTRO_KEY = 'rt-intro-seen';

const introSeen = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
};

function Shell() {
  const location = useLocation();
  const { dark, fx, busy, play, advance, pickFor, setActive } = useStyleEngine();
  const [shown, setShown] = useState(location); // the page currently on screen
  const [loading, setLoading] = useState(() => !introSeen());

  // first-visit intro (once per session)
  useEffect(() => {
    if (!loading) return undefined;
    const t = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem(INTRO_KEY, '1');
      } catch {
        /* ignore */
      }
    }, 1900);
    return () => clearTimeout(t);
  }, [loading]);

  // warm the fonts for the pages' own styles while the browser is idle
  useEffect(() => {
    const warm = () => Object.values(PAGE_STYLES).forEach(ensureFonts);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(warm) : setTimeout(warm, 1500);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  useEffect(() => addInkRipple(), []);

  // route changed: cover the screen in the destination style, swap the page, uncover
  useEffect(() => {
    if (location.pathname === shown.pathname || busy) return;
    const target = pickFor(location.pathname);
    play(
      target,
      () => {
        setShown(location);
        setActive(target);
        window.scrollTo(0, 0);
        requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
      },
      PAGE_LABELS[location.pathname] || 'Off-Model',
    );
  }, [location, shown, busy, play, pickFor, setActive]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <StyleBackdrop />
      <CustomCursor />

      <a
        href="#main"
        className="sr-only z-[10001] rounded bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main" tabIndex={-1} className="flex-grow outline-none">
        <Routes location={shown} key={shown.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </main>
      <Footer />

      <StyleTransition fx={fx} dark={dark} onClock={advance} />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <StyleProvider>
        <Shell />
      </StyleProvider>
    </Router>
  );
}
