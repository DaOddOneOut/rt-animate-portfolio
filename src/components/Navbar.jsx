// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsLightbulbFill, BsLightbulbOffFill } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';
import StylePicker from '../theme/StylePicker';
import { useStyleEngine } from '../theme/StyleContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { dark, toggleDark } = useStyleEngine();
  const [menuOpen, setMenuOpen] = useState(false);

  const LinkItem = ({ item, onClick, className = '' }) => {
    const current = pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={onClick}
        aria-current={current ? 'page' : undefined}
        className={`${className} ${current ? 'text-accent-ink' : 'text-ink hover:text-accent-ink'} transition-colors`}
      >
        <span className={current ? 'scribble' : ''}>{item.name}</span>
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b-[length:var(--border-w)] border-line bg-bg/85 backdrop-blur-md"
    >
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="t-h3 shrink-0 whitespace-nowrap text-accent-ink max-[440px]:!text-[0.8rem]" aria-label="RT.Animation home">
          RT.Animation
        </Link>

        <ul className="hidden items-center gap-7 text-lg md:flex">
          {navItems.map((item) => (
            <li key={item.path}>
              <LinkItem item={item} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <StylePicker />
          <button
            type="button"
            onClick={toggleDark}
            aria-pressed={dark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="btn btn-ghost !px-2.5 !py-2"
          >
            {dark ? <BsLightbulbOffFill className="h-5 w-5" /> : <BsLightbulbFill className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="btn btn-ghost !px-2.5 !py-2 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line/30 px-6 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.path} className="py-2 text-xl">
                <LinkItem item={item} onClick={() => setMenuOpen(false)} className="block" />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
