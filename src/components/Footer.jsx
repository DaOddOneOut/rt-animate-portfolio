// src/components/Footer.jsx
import { useStyleEngine } from '../theme/StyleContext';
import links from '../data/links';

const socials = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'ArtStation', href: links.artstation },
].filter((l) => l.href);

export default function Footer() {
  const { active, styles } = useStyleEngine();
  return (
    <footer className="mt-16 shrink-0 border-t-[length:var(--border-w)] border-line bg-bg/85 py-6 text-center backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm text-muted">
          Drawn in <strong className="text-ink">{styles[active].name}</strong> style. Use the Style button up top to redraw the whole site.
        </p>
        <p className="mt-1 text-sm">&copy; {new Date().getFullYear()} RT.Animate. All rights reserved.</p>
        {socials.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-5">
            {socials.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent-ink hover:underline">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
