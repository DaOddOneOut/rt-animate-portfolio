// src/components/ProjectMediaCard.jsx
// The clickable artwork thumbnail: tiny blurred placeholder first, then the card-sized image,
// and an optional hover preview clip if <slug>.preview.webm|mp4 exists.
import { useEffect, useRef, useState } from 'react';
import { STATUS } from '../data/projects';

export default function ProjectMediaCard({ project, className = '', onClick }) {
  const { title, image, thumb, blur, preview, status } = project;
  const src = thumb || image;
  // Anything that is not finished work keeps its label on the image itself, so a cropped
  // screenshot or a shared thumbnail still says what it is.
  const badge = status && status !== 'real' ? STATUS[status]?.label : null;
  const altText = badge ? `${title} (${badge.toLowerCase()})` : title;

  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {}); // autoplay can be refused; that's fine
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${altText}`}
      className={`art-frame px-art group relative block w-full overflow-hidden text-left ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {blur && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          draggable="false"
          className={`absolute inset-0 h-full w-full scale-105 object-cover blur-2xl transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      {src ? (
        <img
          src={src}
          alt={altText}
          loading="lazy"
          decoding="async"
          draggable="false"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted">No image yet</div>
      )}

      {preview && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          loop
          preload="metadata"
        >
          <source src={preview} type={preview.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        </video>
      )}

      {badge && (
        <span className="chip chip-on pointer-events-none absolute left-3 top-3 !text-xs font-bold uppercase tracking-wide">
          {badge}
        </span>
      )}

      <span className="chip chip-on pointer-events-none absolute bottom-3 right-3 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        View
      </span>
    </button>
  );
}
