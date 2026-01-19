import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsLightbulbFill, BsLightbulbOffFill } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi'; // hamburger icons

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className="bg-parchment dark:bg-[#1e1e1e] shadow-md px-6 py-4 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4">

        <h1 className="text-2xl font-bold text-sketchPurple">RT.Animation</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:text-sketchPurple transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-sketchPurple'
                    : 'text-ink dark:text-parchment'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="ml-4 p-2 rounded-full border border-sketchPurple text-sketchPurple hover:bg-sketchPurple hover:text-white transition"
            >
              {isDark ? <BsLightbulbOffFill className="w-5 h-5" /> : <BsLightbulbFill className="w-5 h-5" />}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-sketchPurple"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-parchment dark:bg-[#1e1e1e] px-6 py-4"
          >
            <ul className="space-y-4 text-lg font-medium">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block hover:text-sketchPurple transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-sketchPurple'
                        : 'text-ink dark:text-parchment'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleTheme}
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  className="mt-2 p-2 rounded-full border border-sketchPurple text-sketchPurple hover:bg-sketchPurple hover:text-white transition"
                >
                  {isDark ? <BsLightbulbOffFill className="w-5 h-5" /> : <BsLightbulbFill className="w-5 h-5" />}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
