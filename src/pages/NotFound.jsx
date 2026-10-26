// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <Helmet>
        <title>404 | Off-Model Adventure</title>
        <meta name="description" content="Oops! This page wandered out of the timeline." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card p-8 sm:p-10">
        <h1 className="t-hero mb-4 text-accent-ink">404</h1>
        <p className="mb-3 text-xl">Uh-oh. This page went off-model and walked off set.</p>
        <p className="mb-8 text-muted">It might be hiding in your keyframes or sulking in the storyboard.</p>
        <Link to="/" className="btn">Back to Safety</Link>
      </motion.div>
    </section>
  );
}
