// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 min-h-screen text-ink">
      <Helmet>
        <title>404 | Off-Model Adventure</title>
        <meta name="description" content="Oops! This page wandered out of the timeline." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <h1 className="text-6xl font-bold text-sketchPurple mb-4">404</h1>
        <p className="text-xl text-graphite mb-6">
          Uh-oh. This page went off-model and walked off set.
        </p>
        <p className="text-sm text-graphite mb-10">
          It might be hiding in your keyframes or sulking in the storyboard.
        </p>
        <Link
          to="/"
          className="inline-block bg-sketchPurple text-white px-6 py-3 rounded-md hover:bg-purple-600 transition"
        >
          Back to Safety
        </Link>
      </motion.div>
    </section>
  );
}
