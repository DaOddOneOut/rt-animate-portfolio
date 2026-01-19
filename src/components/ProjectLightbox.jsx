// src/components/ProjectLightbox.jsx
import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function ProjectLightbox({
    isOpen,
    project,
    onClose,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}) {
    // Portal target
    const portalTarget = useMemo(() => {
        if (typeof document === "undefined") return null;
        return document.body;
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            const isNavKey =
                e.key === "Escape" || e.key === "ArrowLeft" || e.key === "ArrowRight";
            if (!isNavKey) return;

            // block extensions / other listeners
            e.preventDefault();
            e.stopPropagation();
            if (typeof e.stopImmediatePropagation === "function") {
                e.stopImmediatePropagation();
            }

            if (e.key === "Escape") onClose?.();
            if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
            if (e.key === "ArrowRight" && hasNext) onNext?.();
        };

        document.addEventListener("keydown", onKeyDown, true);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown, true);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

    if (!isOpen || !project || !portalTarget) return null;

    const { title, description, tech, image, preview } = project;

    const ui = (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-modal="true"
                role="dialog"
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80" onClick={onClose} />

                {/* Modal */}
                <motion.div
                    className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl border border-white/10"
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="min-w-0">
                            <h3 className="text-base font-semibold truncate">{title}</h3>
                            {description && (
                                <p className="text-xs opacity-70 truncate">{description}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={onPrev}
                                disabled={!hasPrev}
                                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition disabled:opacity-40 disabled:hover:bg-white/10"
                                aria-label="Previous project"
                            >
                                ←
                            </button>
                            <button
                                onClick={onNext}
                                disabled={!hasNext}
                                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition disabled:opacity-40 disabled:hover:bg-white/10"
                                aria-label="Next project"
                            >
                                →
                            </button>
                            <button
                                onClick={onClose}
                                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="relative bg-black">
                        {preview ? (
                            <video className="w-full max-h-[70vh] object-contain" controls playsInline>
                                <source
                                    src={preview}
                                    type={preview.endsWith(".webm") ? "video/webm" : "video/mp4"}
                                />
                            </video>
                        ) : (
                            <img
                                src={image}
                                alt={title}
                                className="w-full max-h-[70vh] object-contain"
                                draggable="false"
                            />
                        )}
                    </div>

                    {/* Tech chips */}
                    {Array.isArray(tech) && tech.length > 0 && (
                        <div className="p-4 border-t border-white/10 flex flex-wrap gap-2">
                            {tech.map((t) => (
                                <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(ui, portalTarget);
}
