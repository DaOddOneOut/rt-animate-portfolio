// src/components/ProjectsGallery.jsx
// Two clearly separated sections: finished work (Real Projects) and Concepts & Explorations.
// Concept and in-development items always carry a visible status badge and a note about the visual.
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { realProjects, conceptProjects, STATUS } from '../data/projects';
import { useStyleEngine } from '../theme/StyleContext';
import ProjectMediaCard from './ProjectMediaCard';
import ProjectLightbox from './ProjectLightbox';

function ProjectCard({ project, index, onOpen }) {
  const { styles } = useStyleEngine();
  const isFinished = project.status === 'real';
  return (
    <motion.li
      className="tilt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <article className="card card-hover flex h-full flex-col overflow-hidden">
        <ProjectMediaCard
          project={project}
          className="aspect-[16/10] border-b-[length:var(--border-w)] border-line"
          onClick={onOpen}
        />
        <div className="flex flex-1 flex-col p-4">
          {!isFinished && <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent-ink">{STATUS[project.status].label}</p>}
          <h3 className="t-h3 mb-1">{project.title}</h3>
          <p className="mb-3 line-clamp-3 text-sm text-muted">{project.summary}</p>
          {project.visualNote && <p className="mb-3 text-xs italic text-muted">{project.visualNote}</p>}
          {project.caseStudy && (
            <Link to={`/projects/${project.slug}`} className="mb-3 text-sm font-bold text-accent-ink underline underline-offset-4">
              Read the case study
            </Link>
          )}
          <div className="mt-auto flex flex-wrap gap-2">
            {project.style && styles[project.style] && <span className="chip chip-on">{styles[project.style].name}</span>}
            {project.tools.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
            {project.testedWith?.length > 0 && (
              <span className="w-full text-xs text-muted">Tested in {project.testedWith.join(' and ')}</span>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  );
}

function Section({ id, title, intro, items, empty, onOpen }) {
  return (
    <section aria-labelledby={id} className="mb-16">
      <h2 id={id} className="t-h2 mb-2">{title}</h2>
      <p className="mb-6 max-w-2xl text-muted">{intro}</p>
      {items.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={() => onOpen(p.slug)} />
          ))}
        </ul>
      ) : (
        <div className="card p-6 text-muted">{empty}</div>
      )}
    </section>
  );
}

export default function ProjectsGallery() {
  const [openSlug, setOpenSlug] = useState(null);
  const navigate = useNavigate();
  // Projects with a case study open their own page; the rest open in the lightbox.
  const open = useCallback(
    (slug) => {
      const p = [...realProjects, ...conceptProjects].find((x) => x.slug === slug);
      if (p?.caseStudy) navigate(`/projects/${slug}`);
      else setOpenSlug(slug);
    },
    [navigate],
  );

  // One ordered list so the lightbox can step through everything, section by section.
  const list = useMemo(() => [...realProjects, ...conceptProjects], []);
  const index = openSlug ? list.findIndex((p) => p.slug === openSlug) : -1;
  const close = useCallback(() => setOpenSlug(null), []);
  const prev = useCallback(() => index > 0 && setOpenSlug(list[index - 1].slug), [index, list]);
  const next = useCallback(() => index >= 0 && index < list.length - 1 && setOpenSlug(list[index + 1].slug), [index, list]);

  return (
    <div>
      <header className="mb-12">
        <h1 className="t-h1 text-accent-ink">
          <span className="scribble">Portfolio</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Finished work is listed first. Concepts and projects still in development are kept in their own section, and every one of them is labeled.
        </p>
      </header>

      <Section
        id="real-projects"
        title="Real Projects"
        intro="Completed work, with my role and the tools I used on each one."
        items={realProjects}
        onOpen={open}
        empty={
          <>
            New finished pieces are being prepared and will appear here soon. In the meantime, feel free to{' '}
            <Link to="/contact" className="text-accent-ink underline underline-offset-4">get in touch</Link>.
          </>
        }
      />

      <Section
        id="concepts"
        title="Concepts & Explorations"
        intro="Ideas, pitches and work in progress. Visuals here are temporary concept previews, many generated with AI (Google Gemini). They are not finished pieces and not client work."
        items={conceptProjects}
        onOpen={open}
        empty="Concept previews will be added here as projects get underway."
      />

      <ProjectLightbox
        isOpen={index >= 0}
        project={index >= 0 ? list[index] : null}
        onClose={close}
        onPrev={prev}
        onNext={next}
        hasPrev={index > 0}
        hasNext={index >= 0 && index < list.length - 1}
      />
    </div>
  );
}
