// src/components/ProjectsCarousel.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projects from "../data/projects";
import ProjectMediaCard from "./ProjectMediaCard";
import ProjectLightbox from "./ProjectLightbox";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function ProjectsCarousel() {
  const items = projects;

  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);

  // lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const maxPage = Math.max(0, Math.ceil(items.length / PAGE_SIZE) - 1);

  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const go = (dir) => setPage((p) => clamp(p + dir, 0, maxPage));

  const openProject = (slug) => {
    const idx = items.findIndex((p) => p.slug === slug);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const hasPrev = lightboxIndex !== null && lightboxIndex > 0;
  const hasNext = lightboxIndex !== null && lightboxIndex < items.length - 1;
  const goPrev = () => hasPrev && setLightboxIndex((i) => i - 1);
  const goNext = () => hasNext && setLightboxIndex((i) => i + 1);

  return (
    <section className="w-full">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-sketchPurple text-center md:text-left">
            Animated Works
          </h2>
          <p className="text-sm opacity-70">Hover to preview (if available). Click to expand.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            disabled={page === 0}
            className="px-3 py-2 rounded-xl bg-sketchPurple text-white shadow-md hover:opacity-90 transition disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={() => go(1)}
            disabled={page === maxPage}
            className="px-3 py-2 rounded-xl bg-sketchPurple text-white shadow-md hover:opacity-90 transition disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={page}
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x;
              if (swipe < -80) go(1);
              if (swipe > 80) go(-1);
            }}
          >
            {pageItems.map((p) => (
              <div key={p.slug} className="group">
                <ProjectMediaCard
                  project={p}
                  className="aspect-[16/10]"
                  onClick={() => openProject(p.slug)}
                />

                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm opacity-80 line-clamp-2">{p.description}</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tech?.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <ProjectLightbox
        isOpen={lightboxIndex !== null}
        project={lightboxIndex !== null ? items[lightboxIndex] : null}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  );
}
