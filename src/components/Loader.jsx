// src/components/Loader.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-sketchPurple text-white z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Sketch Drawing */}
        <motion.img
          src="/self-sketch.png"
          alt="Rich sketch loading icon"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-32 h-32 mb-6 object-contain"
        />

        {/* Animated Pencil + Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          className="flex items-center text-white text-xl font-sketch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 mr-3 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687 1.688M3 21h3.75L17.81 9.94a1.125 1.125 0 00-1.59-1.591L5.16 19.41V21z"
            />
          </svg>
          Welcome to my world...
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
