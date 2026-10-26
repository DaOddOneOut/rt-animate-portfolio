// src/theme/StyleReel.jsx
// Home-page showcase of all 10 animation styles. Each tile previews its style live
// (own palette, font, shape) and applies it to the whole site on click.
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useStyleEngine } from './StyleContext';
import StylePreview from './StylePreview';
import { ensureFonts } from './styles';

export default function StyleReel() {
  const { styles, order, mode, active, dark, busy, setMode } = useStyleEngine();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '300px' });

  // load every style's fonts once the reel is about to scroll into view, so the previews are accurate
  useEffect(() => {
    if (inView) order.forEach(ensureFonts);
  }, [inView, order]);

  return (
    <section id="styles" ref={ref} aria-labelledby="styles-title" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="styles-title" className="t-h1">
        Ten ways to draw <span className="scribble text-accent-ink">one story</span>
      </h2>
      <p className="mt-5 max-w-3xl text-lg text-muted">
        Pick a style and the whole site redraws itself. Left alone, every page opens in its own style, and each page
        transition plays in the style of the page you are heading to.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={`btn ${mode === 'auto' ? '' : 'btn-ghost'}`}
          disabled={busy}
          aria-pressed={mode === 'auto'}
          onClick={() => setMode('auto')}
        >
          Auto: a style per page
        </button>
        <button
          type="button"
          className={`btn ${mode === 'shuffle' ? '' : 'btn-ghost'}`}
          disabled={busy}
          aria-pressed={mode === 'shuffle'}
          onClick={() => setMode('shuffle')}
        >
          Shuffle every page
        </button>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {order.map((id) => {
          const s = styles[id];
          const isActive = active === id;
          return (
            <li key={id} className="tilt">
              <article className="card card-hover flex h-full flex-col gap-3 p-4">
                <StylePreview id={id} dark={dark} />
                <div>
                  <h3 className="t-h3">{s.name}</h3>
                  <span className="chip mt-2">{s.tag}</span>
                </div>
                <p className="text-sm text-muted">{s.blurb}</p>
                <p className="text-xs italic text-muted">Think: {s.refs}</p>
                <button
                  type="button"
                  className="btn mt-auto w-full !px-3 !py-2 !text-[0.85rem]"
                  disabled={busy || isActive}
                  aria-pressed={isActive}
                  onClick={() => setMode(id)}
                >
                  {isActive ? 'Showing now' : 'Apply style'}
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
