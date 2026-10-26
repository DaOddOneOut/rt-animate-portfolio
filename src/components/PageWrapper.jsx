// src/components/PageWrapper.jsx
// Gentle entrance for each page. The big style transition is handled by <StyleTransition />.
import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
