// src/components/ProjectMediaCard.jsx
import { useEffect, useRef, useState } from "react";

export default function ProjectMediaCard({ project, className = "", onClick }) {
  const { title, image, blur, preview } = project;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const videoRef = useRef(null);

  // Hover video behavior
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (hovered) {
      const play = async () => {
        try {
          v.currentTime = 0;
          await v.play();
        } catch {
          // autoplay can fail; ignore
        }
      };
      play();
    } else {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        // ignore
      }
    }
  }, [hovered]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow-lg bg-white/5 text-left w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Blur placeholder */}
      {blur && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover scale-105 blur-2xl transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"
            }`}
          draggable="false"
        />
      )}

      {/* Main image */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          draggable="false"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-sm opacity-70">
          Missing image
        </div>
      )}

      {/* Hover preview video */}
      {preview && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"
            }`}
          muted
          playsInline
          loop
          preload="metadata"
        >
          <source
            src={preview}
            type={preview.endsWith(".webm") ? "video/webm" : "video/mp4"}
          />
        </video>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      {/* Hint */}
      <div className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full bg-black/50 border border-white/10 opacity-0 hover:opacity-100 transition">
        Click to expand
      </div>
    </button>
  );
}
