import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 text-center text-ink overflow-hidden">

      <Helmet>
        <title>RT.Animation | Home</title>
        <meta
          name="description"
          content="Rich is a motion designer and animator blending traditional 2D animation with modern design. Explore his latest work."
        />
      </Helmet>

      <motion.img
        src="/Portfolio_RT_IMG.png"
        alt="Rich Sketch Background"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 0.35, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none select-none z-0 dark:z-20
                   opacity-20 sm:opacity-30 md:opacity-40 lg:opacity-50 xs-landscape:opacity-30"
        style={{
          maskImage: 'radial-gradient(circle at center, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 100%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl z-10"
      >
        <motion.h2 variants={itemVariants} className="text-3xl xs-landscape:text-2xl sm:text-5xl font-bold mb-6">
          Hey, I’m <span className="text-sketchPurple">Rich</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base xs-landscape:text-sm text-ink/100 dark:text-white/90 mb-8"
        >
          Animator. Designer. Creative Thinker. I bring stories to life through motion and visuals.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/projects"
            className="inline-block bg-sketchPurple/100 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-300 dark:bg-sketchPurple/100"
          >
            View My Work
          </Link>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm text-ink/100 dark:text-white/90"
        >
          Looking for my resume?{' '}
          <a href="/Rich-Resume.pdf" download className="text-sketchPurple hover:underline">
            Grab it here
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
