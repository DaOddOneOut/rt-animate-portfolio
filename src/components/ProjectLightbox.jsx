// src/components/ProjectLightbox.jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useStyleEngine } from '../theme/StyleContext';
import { STATUS } from '../data/projects';

export default function ProjectLightbox({ isOpen, project, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const { styles, active, setMode, busy } = useStyleEngine();
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        onPrev?.();
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        onNext?.();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!isOpen || !project) return null;

  const { title, summary, role, tools, image, preview, style, status, visualNote, aiAssisted } = project;
  const statusLabel = STATUS[status]?.label;
  const isFinished = status === 'real';
  const projectStyle = style ? styles[style] : null;
  const canRestyle = projectStyle && style !== active;

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6"
      style={{ zIndex: 2147483000 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <motion.div
        className="card relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between gap-3 border-b-[length:var(--border-w)] border-line px-4 py-3">
          <h3 id="lightbox-title" className="t-h3 min-w-0 truncate">
            {title}
          </h3>
          {statusLabel && !isFinished && <span className="chip chip-on shrink-0 !text-xs font-bold uppercase">{statusLabel}</span>}
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={onPrev} disabled={!hasPrev} aria-label="Previous project" className="btn btn-ghost !px-3 !py-1.5">
              ←
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext} aria-label="Next project" className="btn btn-ghost !px-3 !py-1.5">
              →
            </button>
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close" className="btn !px-3 !py-1.5">
              ✕
            </button>
          </div>
        </div>

        <div className="art-frame relative min-h-0 flex-1 bg-black">
          {preview ? (
            <video className="max-h-[60vh] w-full object-contain" controls playsInline poster={image || undefined}>
              <source src={preview} type={preview.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            </video>
          ) : (
            image ? <img src={image} alt={isFinished ? title : `${title} (${statusLabel.toLowerCase()})`} draggable="false" className="mx-auto max-h-[60vh] w-full object-contain" /> : <p className="p-8 text-center text-muted">No image yet</p>
          )}
        </div>

        <div className="overflow-y-auto p-4">
          {summary && <p className="mb-3 text-base">{summary}</p>}
          {role && <p className="mb-3 text-sm"><strong>My role:</strong> {role}</p>}
          {aiAssisted && <p className="mb-3 text-sm text-muted">Made with help from AI tools.</p>}
          {visualNote && <p className="mb-3 text-sm italic text-muted">{visualNote}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {projectStyle && <span className="chip chip-on">{projectStyle.name}</span>}
            {Array.isArray(tools) && tools.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          {canRestyle && (
            <button
              type="button"
              disabled={busy}
              className="btn btn-alt mt-4"
              onClick={() => {
                onClose?.();
                setMode(style);
              }}
            >
              Redraw the site in {projectStyle.name}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
