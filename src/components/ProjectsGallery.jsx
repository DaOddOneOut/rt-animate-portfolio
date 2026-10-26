// src/components/ProjectsGallery.jsx
import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import { STYLE_ORDER } from '../theme/styles';
import { useStyleEngine } from '../theme/StyleContext';
import ProjectMediaCard from './ProjectMediaCard';
import ProjectLightbox from './ProjectLightbox';

export default function ProjectsGallery() {
  const { styles } = useStyleEngine();
  const [filter, setFilter] = useState('all');
  const [openSlug, setOpenSlug] = useState(null);

  // only offer filters for styles that at least one project uses
  const usedStyles = useMemo(() => STYLE_ORDER.filter((id) => projects.some((p) => p.style === id)), []);
  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.style === filter)), [filter]);

  const index = openSlug ? list.findIndex((p) => p.slug === openSlug) : -1;
  const close = useCallback(() => setOpenSlug(null), []);
  const prev = useCallback(() => index > 0 && setOpenSlug(list[index - 1].slug), [index, list]);
  const next = useCallback(() => index >= 0 && index < list.length - 1 && setOpenSlug(list[index + 1].slug), [index, list]);

  return (
    <section aria-labelledby="works-title">
      <header className="mb-8">
        <h1 id="works-title" className="t-h1 text-accent-ink">
          <span className="scribble">Animated Works</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Click any piece to expand it. Each project is tagged with the animation style it leans on, so you can filter the reel by style.
        </p>
      </header>

      <div role="group" aria-label="Filter projects by animation style" className="mb-8 flex flex-wrap gap-2">
        <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')} className={`chip !px-4 !py-1.5 ${filter === 'all' ? 'chip-on' : ''}`}>
          All ({projects.length})
        </button>
        {usedStyles.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={`chip !px-4 !py-1.5 ${filter === id ? 'chip-on' : ''}`}
          >
            {styles[id].name}
          </button>
        ))}
      </div>

      <ul key={filter} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <motion.li
            key={p.slug}
            className="tilt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <article className="card card-hover flex h-full flex-col overflow-hidden">
              <ProjectMediaCard
                project={p}
                className="aspect-[16/10] border-b-[length:var(--border-w)] border-line"
                onClick={() => setOpenSlug(p.slug)}
              />
              <div className="flex flex-1 flex-col p-4">
                <h2 className="t-h3 mb-1">{p.title}</h2>
                <p className="mb-3 line-clamp-3 text-sm text-muted">{p.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.style && <span className="chip chip-on">{styles[p.style].name}</span>}
                  {p.tech?.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>

      <ProjectLightbox
        isOpen={index >= 0}
        project={index >= 0 ? list[index] : null}
        onClose={close}
        onPrev={prev}
        onNext={next}
        hasPrev={index > 0}
        hasNext={index >= 0 && index < list.length - 1}
      />
    </section>
  );
}
