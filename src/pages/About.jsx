// src/pages/About.jsx
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import skills from '../data/skills';
import links from '../data/links';
import { BRAND } from '../data/site';

// General working process. Owner to confirm the wording matches how he works.
const steps = [
  { t: 'Idea first', d: 'Every piece starts with the idea and who it is for.' },
  { t: 'Plan & design', d: 'Sketches, layouts and timing before anything moves.' },
  { t: 'Animate', d: 'Motion graphics and animation built to fit the piece.' },
  { t: 'Polish & deliver', d: 'Final checks and export in the format you need.' },
];

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>{`${BRAND} | About Rich`}</title>
        <meta name="description" content="Learn about Rich’s background in motion design, traditional animation, and creative storytelling." />
      </Helmet>

      <h1 className="t-h1 mb-10 text-accent-ink">
        <span className="scribble">About Me</span>
      </h1>

      <div className="grid items-start gap-10 md:grid-cols-[17rem_1fr]">
        <motion.figure
          className="card mx-auto w-64 p-3 md:mx-0"
          initial={{ opacity: 0, rotate: -4, y: 20 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <img src="/self-sketch.webp" alt="Chibi vector sketch of Rich on a city street" width="800" height="800" className="aspect-square w-full rounded-full object-contain" />
          <figcaption className="mt-2 text-center text-sm text-muted">Chibi sketch of me</figcaption>
        </motion.figure>

        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            I’m Rich, an animator, motion designer and graphic designer based in NYC, working under the name RT.Animation.
          </p>
          <p>
            I work mainly in After Effects, Illustrator and Photoshop, and I also build websites with React. I use AI tools in parts of my process, and I say so on the projects where I do.
          </p>
          <p>
            My portfolio is being rebuilt around work I can fully stand behind. Finished projects and concepts are listed separately, so it is always clear what is done and what is still in progress.
          </p>
          {links.resume && <a href={links.resume} download className="btn mt-2">Download Resume</a>}
        </div>
      </div>

      <h2 className="t-h2 mb-6 mt-16">Toolbox</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => (
          <motion.li
            key={skill.name}
            className="card flex items-center gap-4 p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
          >
            <img src={skill.icon} alt="" width="40" height="40" loading="lazy" className="h-10 w-10 shrink-0 object-contain" />
            <p className="min-w-0 flex-1 truncate font-bold">{skill.name}</p>
          </motion.li>
        ))}
      </ul>

      <h2 className="t-h2 mb-6 mt-16">How I work</h2>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.t} className="card relative p-5 pt-8">
            <span className="chip chip-on absolute -top-3 left-4 !px-3 font-bold">Step {i + 1}</span>
            <h3 className="t-h3 mb-1">{s.t}</h3>
            <p className="text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
