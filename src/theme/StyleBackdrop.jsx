// src/theme/StyleBackdrop.jsx
// The fixed, full-screen background art for each style (all CSS/SVG, no image weight),
// plus the shared SVG filter used by the rotoscope "boil" effect.
import { useMemo } from 'react';
import { useStyleEngine } from './StyleContext';
import paperLight from '../assets/paper-texture-light.webp';
import paperDark from '../assets/paper-texture-dark.webp';

const Star = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
    <path d="M50 6 L62 38 L96 40 L69 60 L79 94 L50 74 L21 94 L31 60 L4 40 L38 38 Z" strokeLinejoin="round" />
  </svg>
);
const Heart = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
    <path d="M50 88 C 8 56 6 24 28 18 C 40 15 48 22 50 30 C 52 22 60 15 72 18 C 94 24 92 56 50 88 Z" strokeLinejoin="round" />
  </svg>
);

function Cel({ dark }) {
  return (
    <div className="bd bd-cel">
      <div className="paper" style={{ backgroundImage: `url(${dark ? paperDark : paperLight})` }} />
      <div className="lines" />
      {['18%', '50%', '82%'].map((t) => (
        <span key={t} className="peg" style={{ top: t }} />
      ))}
    </div>
  );
}

const Vector = () => (
  <div className="bd bd-vector">
    <div className="shape s1" />
    <div className="shape s2" />
    <div className="shape s3" />
    <div className="shape s4" />
  </div>
);

const Cutout = () => (
  <div className="bd bd-cutout">
    <div className="sun" />
    {[
      { l: '8%', t: '14%', s: [70, 90, 60] },
      { l: '58%', t: '24%', s: [60, 80, 54] },
    ].map((c, i) => (
      <div key={i} className="cloud" style={{ left: c.l, top: c.t, animationDelay: `${i * 0.5}s` }}>
        {c.s.map((w, j) => (
          <i key={j} style={{ width: w, height: w * 0.7 }} />
        ))}
      </div>
    ))}
    <div className="hill h1" />
    <div className="hill h2" />
  </div>
);

const Anime = () => (
  <div className="bd bd-anime">
    <div className="rays" />
    <div className="dots" />
  </div>
);

function Whiteboard() {
  return (
    <div className="bd bd-whiteboard">
      <svg viewBox="0 0 140 90" style={{ left: '40%', top: '3%', width: 120, color: 'rgb(var(--accent))' }} aria-hidden="true">
        <path d="M10 72 C 40 8, 92 8, 122 52 M104 38 L123 53 L100 63" />
      </svg>
      <svg viewBox="0 0 100 100" style={{ right: '3%', top: '10%', width: 80, color: 'rgb(var(--accent3))' }} aria-hidden="true">
        <path d="M50 6 L62 38 L96 40 L69 60 L79 94 L50 74 L21 94 L31 60 L4 40 L38 38 Z" />
      </svg>
      <svg viewBox="0 0 100 100" style={{ right: '3%', bottom: '5%', width: 90, color: 'rgb(var(--accent2))' }} aria-hidden="true">
        <path d="M50 8 C 25 8 15 30 25 48 C 32 60 35 64 35 74 L65 74 C 65 64 68 60 75 48 C 85 30 75 8 50 8 Z M38 84 L62 84 M42 94 L58 94" />
      </svg>
      <svg viewBox="0 0 100 100" style={{ left: '1%', bottom: '3%', width: 70, color: 'rgb(var(--accent))' }} aria-hidden="true">
        <path d="M50 50 m0 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -20 0 a18 18 0 1 1 36 0 a26 26 0 1 1 -52 0" />
      </svg>
    </div>
  );
}

const Rotoscope = () => (
  <div className="bd bd-rotoscope">
    <div className="wash w1" />
    <div className="wash w2" />
    <div className="wash w3" />
    <div className="grain" />
  </div>
);

function Pixel() {
  const stars = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      l: `${(i * 37 + 11) % 100}%`,
      t: `${(i * 53 + 7) % 78}%`,
      d: `${(i % 7) * 0.23}s`,
    })),
    [],
  );
  return (
    <div className="bd bd-pixel">
      <div className="grid" />
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: s.l, top: s.t, animationDelay: s.d }} />
      ))}
      <span className="px-cloud" style={{ top: '16%', animationDuration: '70s' }} />
      <span className="px-cloud" style={{ top: '42%', animationDuration: '95s', animationDelay: '-40s' }} />
    </div>
  );
}

const Flat = () => (
  <div className="bd bd-flat">
    <div className="f1" />
    <div className="f2" />
    <div className="f3" />
    <div className="f4" />
  </div>
);

function Chibi() {
  const items = [
    { C: Star, l: '2%', t: '14%', w: 60, fill: 'accent3', d: '0s' },
    { C: Heart, l: '92%', t: '14%', w: 52, fill: 'accent', d: '1.2s' },
    { C: Heart, l: '1.5%', t: '86%', w: 44, fill: 'accent2', d: '2.1s' },
    { C: Star, l: '93%', t: '82%', w: 48, fill: 'accent', d: '0.7s' },
    { C: Star, l: '62%', t: '4%', w: 32, fill: 'accent2', d: '1.7s' },
  ];
  return (
    <div className="bd bd-chibi">
      {items.map(({ C, l, t, w, fill, d }, i) => (
        <C
          key={i}
          style={{
            left: l, top: t, width: w, animationDelay: d,
            fill: `rgb(var(--${fill}))`, stroke: 'rgb(var(--line))', strokeWidth: 4,
          }}
        />
      ))}
    </div>
  );
}

const Abstract = () => (
  <div className="bd bd-abstract">
    <div className="a1" />
    <div className="a2" />
    <div className="a3" />
    <div className="a4" />
    <div className="a5" />
    <div className="a6" />
  </div>
);

export default function StyleBackdrop() {
  const { active, dark } = useStyleEngine();
  const art = {
    cel: <Cel dark={dark} />,
    vector: <Vector />,
    cutout: <Cutout />,
    anime: <Anime />,
    whiteboard: <Whiteboard />,
    rotoscope: <Rotoscope />,
    pixel: <Pixel />,
    flat: <Flat />,
    chibi: <Chibi />,
    abstract: <Abstract />,
  }[active];

  return (
    <>
      {/* shared filter: animated turbulence that makes outlines "boil" like rotoscoped footage */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="roto-boil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="1" result="n">
            <animate attributeName="seed" values="1;2;3;4;5;6;7;8" dur="0.8s" repeatCount="indefinite" calcMode="discrete" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div key={active}>{art}</div>
      {active === 'pixel' && <div className="crt" aria-hidden="true" />}
    </>
  );
}
