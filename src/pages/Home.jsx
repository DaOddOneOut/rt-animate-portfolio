// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import StyleReel from '../theme/StyleReel';
import { useStyleEngine } from '../theme/StyleContext';
import projects from '../data/projects';
import links from '../data/links';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

const frame = {
  border: 'var(--border-w) solid rgb(var(--line))',
  boxShadow: 'var(--card-shadow)',
  background: 'rgb(var(--card))',
};

function LatestWork() {
  const picks = projects.slice(0, 3);
  return (
    <section aria-labelledby="latest-title" className="mx-auto max-w-6xl px-4 pb-6 pt-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="latest-title" className="t-h1">Latest work</h2>
        <Link to="/projects" className="btn btn-ghost">See all {projects.length} projects</Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-3">
        {picks.map((p) => (
          <li key={p.slug} className="tilt">
            <Link to="/projects" className="card card-hover block overflow-hidden" aria-label={`${p.title} (view all projects)`}>
              <div className="art-frame px-art relative aspect-[16/10] overflow-hidden border-b-[length:var(--border-w)] border-line">
                <img src={p.thumb || p.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="t-h3">{p.title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const { styles, active } = useStyleEngine();

  return (
    <>
      <Helmet>
        <title>RT.Animation | Home</title>
        <meta
          name="description"
          content="Rich is a motion designer and animator blending traditional 2D animation with modern design. Explore his latest work."
        />
      </Helmet>

      <section className="home-section mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="chip chip-on mb-5 !px-4 !py-1">
            Animator · Motion Designer · NYC
          </motion.p>

          <motion.h1 variants={item} className="t-hero">
            Hey, I’m <span className="scribble text-accent-ink">Rich</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-xl">
            Animator. Designer. Creative Thinker. I bring stories to life through motion and visuals.
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-muted">
            This whole site is a demo reel: every page is drawn in a different 2D animation style, and the transitions between them change too.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/projects" className="btn">View My Work</Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById('styles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try the 10 styles
            </button>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-sm text-muted">
            Looking for my resume?{' '}
            <a href={links.resume} download className="text-accent-ink underline underline-offset-4">Grab it here</a>
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mx-auto w-[min(78vw,26rem)]"
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.2 }}
        >
          <div className="art-frame px-art relative aspect-square overflow-hidden rounded-full" style={frame}>
            <img
              src="/Portfolio_RT_IMG.webp"
              alt="Illustration of Rich in an anime style, standing in a neon-lit night city"
              width="800"
              height="800"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            className="absolute -bottom-5 -left-5 h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32"
            style={frame}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <img src="/self-sketch.webp" alt="Chibi vector sketch of Rich" width="800" height="800" className="h-full w-full object-contain" />
          </motion.div>

          <span className="chip chip-on absolute -right-2 top-5 rotate-3 !px-3">Same guy, two styles</span>
          <span className="chip absolute left-1/2 top-[-0.9rem] -translate-x-1/2 whitespace-nowrap !px-3" aria-live="polite">
            Now drawn in {styles[active].name}
          </span>
        </motion.div>
      </section>

      <StyleReel />
      <LatestWork />
    </>
  );
}
