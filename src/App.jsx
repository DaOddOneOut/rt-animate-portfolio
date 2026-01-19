// App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import addInkRipple from './effects/ink-ripple';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Loader from './components/Loader';
import PageWrapper from './components/PageWrapper';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';

import './index.css';
import initCursorTrail from './effects/cursor-trail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showSite, setShowSite] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 2500);
  const fullReveal = setTimeout(() => setShowSite(true), 3300);
  document.body.style.cursor = 'none';

  

  initCursorTrail();     // ✅ initialize graphite trail
  addInkRipple();        // ✅ add ripple on real links

  return () => {
    clearTimeout(timer);
    clearTimeout(fullReveal);
    document.body.style.cursor = 'auto';
  };
}, []);



  if (loading) return <Loader />;

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-parchment text-ink font-sketch bg-paper-light dark:bg-paper-dark bg-cover bg-repeat">

        <CustomCursor />
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
