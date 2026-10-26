// src/theme/styles.js
// The 10 animation styles. Each one is a complete theme: palette (light + dark),
// fonts, shape language, and the timing of its page transition.
// Colors are hex here; the engine converts them to space-separated RGB CSS variables
// so Tailwind can still do opacity (e.g. `bg-accent/20`).

export const STYLE_ORDER = [
  'cel',
  'vector',
  'cutout',
  'anime',
  'whiteboard',
  'rotoscope',
  'pixel',
  'flat',
  'chibi',
  'abstract',
];

// Which style each page opens in when the visitor is in "Auto" mode.
export const PAGE_STYLES = {
  '/': 'cel',
  '/about': 'whiteboard',
  '/projects': 'vector',
  '/contact': 'pixel',
};
export const FALLBACK_STYLE = 'abstract'; // 404 and anything unknown

export const STYLES = {
  cel: {
    id: 'cel',
    name: 'Traditional Cel',
    tag: 'Hand-Drawn',
    blurb: 'Frame-by-frame drawing for premium, organic movement.',
    refs: 'Studio Ghibli, Snow White',
    fonts: {
      display: "'Fredericka the Great', cursive",
      body: "'Patrick Hand', cursive",
      google: 'family=Fredericka+the+Great&family=Patrick+Hand',
    },
    fontScale: 1.12,
    displayAdjust: 1,
    shape: {
      radius: '22px 12px 26px 10px / 12px 24px 10px 26px',
      btnRadius: '18px 10px 20px 10px / 10px 20px 10px 18px',
      borderW: '2px',
      cardShadow: '4px 5px 0 rgb(var(--line) / 0.18)',
      btnShadow: '3px 4px 0 rgb(var(--line) / 0.85)',
      case: 'none',
      tracking: '0',
      hStyle: 'normal',
    },
    fx: { cover: 760, reveal: 620 },
    pen: true,
    light: {
      bg: '#f5f0e6', bg2: '#ebe3d0', card: '#fffdf7', ink: '#2d2d2d', muted: '#5b5750',
      line: '#2d2d2d', accent: '#7c3aed', accent2: '#ff8a2b', accent3: '#2f80ed', onAccent: '#ffffff', accentInk: '#7c3aed',
    },
    dark: {
      bg: '#1b1a20', bg2: '#25232b', card: '#2a2831', ink: '#f5f0e6', muted: '#b9b3c4',
      line: '#f5f0e6', accent: '#a78bfa', accent2: '#ff9d4d', accent3: '#6aa8ff', onAccent: '#17151f', accentInk: '#a78bfa',
    },
  },

  vector: {
    id: 'vector',
    name: 'Digital Vector',
    tag: 'Motion Graphics',
    blurb: 'Clean, scalable shapes ideal for explainers, ads, and UI.',
    refs: 'Rick and Morty',
    fonts: {
      display: "'Fredoka', sans-serif",
      body: "'Nunito', sans-serif",
      google: 'family=Fredoka:wght@500;700&family=Nunito:wght@400;700',
    },
    fontScale: 1,
    displayAdjust: 1,
    shape: {
      radius: '22px',
      btnRadius: '999px',
      borderW: '3px',
      cardShadow: '0 7px 0 rgb(var(--line))',
      btnShadow: '0 5px 0 rgb(var(--line))',
      case: 'none',
      tracking: '-0.01em',
      hStyle: 'normal',
    },
    fx: { cover: 700, reveal: 600 },
    light: {
      bg: '#e9f8ff', bg2: '#cdeefc', card: '#ffffff', ink: '#0b1b2b', muted: '#3d566b',
      line: '#0b1b2b', accent: '#97ce4c', accent2: '#25c3f5', accent3: '#ffd23f', onAccent: '#0b1b2b', accentInk: '#3d6a0d',
    },
    dark: {
      bg: '#06141f', bg2: '#0b2233', card: '#0f2c42', ink: '#e8f7ff', muted: '#9bb9cc',
      line: '#e8f7ff', accent: '#97ce4c', accent2: '#25c3f5', accent3: '#ffd23f', onAccent: '#06141f', accentInk: '#97ce4c',
    },
  },

  cutout: {
    id: 'cutout',
    name: 'Cut-Out',
    tag: 'Paper Puppets',
    blurb: 'Reusable digital puppets for fast production, with that stiff paper-doll feel.',
    refs: 'South Park, The Simpsons',
    fonts: {
      display: "'Chewy', cursive",
      body: "'Comic Neue', cursive",
      google: 'family=Chewy&family=Comic+Neue:wght@400;700',
    },
    fontScale: 1.05,
    displayAdjust: 1,
    shape: {
      radius: '6px',
      btnRadius: '6px',
      borderW: '3px',
      cardShadow: '5px 5px 0 rgb(var(--line))',
      btnShadow: '4px 4px 0 rgb(var(--line))',
      case: 'none',
      tracking: '0',
      hStyle: 'normal',
    },
    fx: { cover: 720, reveal: 620 },
    light: {
      bg: '#bfe3ff', bg2: '#ffffff', card: '#fffbe8', ink: '#111111', muted: '#3a3a3a',
      line: '#111111', accent: '#d32f2f', accent2: '#fbc02d', accent3: '#2e7d32', onAccent: '#ffffff', accentInk: '#b71c1c',
    },
    dark: {
      bg: '#0f1b33', bg2: '#1b2d52', card: '#20335c', ink: '#fff4d6', muted: '#c8cfdf',
      line: '#05070d', accent: '#ff5252', accent2: '#ffd740', accent3: '#69f0ae', onAccent: '#14070a', accentInk: '#ff5252',
    },
  },

  anime: {
    id: 'anime',
    name: 'Anime',
    tag: 'Bold & Dramatic',
    blurb: 'Expressive characters, bold colors, and dramatic staging.',
    refs: 'Japanese animation',
    fonts: {
      display: "'Bangers', cursive",
      body: "'Nunito', sans-serif",
      google: 'family=Bangers&family=Nunito:wght@400;700',
    },
    fontScale: 1,
    displayAdjust: 1.12,
    shape: {
      radius: '4px 26px 4px 26px',
      btnRadius: '4px 16px 4px 16px',
      borderW: '3px',
      cardShadow: '6px 6px 0 rgb(var(--accent2))',
      btnShadow: '4px 4px 0 rgb(var(--accent2))',
      case: 'uppercase',
      tracking: '0.03em',
      hStyle: 'italic',
    },
    fx: { cover: 620, reveal: 560 },
    light: {
      bg: '#fff1f6', bg2: '#ffd9e6', card: '#ffffff', ink: '#1a1033', muted: '#54456f',
      line: '#1a1033', accent: '#e0195a', accent2: '#2a4bff', accent3: '#ffd400', onAccent: '#ffffff', accentInk: '#c2124d',
    },
    dark: {
      bg: '#0d0a1f', bg2: '#1a1340', card: '#17123a', ink: '#fff1f6', muted: '#c6b9e6',
      line: '#fff1f6', accent: '#ff4d8d', accent2: '#5b7bff', accent3: '#ffe14d', onAccent: '#12081f', accentInk: '#ff4d8d',
    },
  },

  whiteboard: {
    id: 'whiteboard',
    name: 'Whiteboard',
    tag: 'Explain It',
    blurb: 'Hand-drawn presentation style for step-by-step explanations. (Dark mode becomes a chalkboard.)',
    refs: 'Explainer videos',
    fonts: {
      display: "'Permanent Marker', cursive",
      body: "'Caveat', cursive",
      google: 'family=Permanent+Marker&family=Caveat:wght@400;700',
    },
    fontScale: 1.22,
    displayAdjust: 0.92,
    shape: {
      radius: '14px 40px 16px 34px / 34px 14px 40px 16px',
      btnRadius: '14px 30px 14px 26px / 26px 14px 30px 14px',
      borderW: '3px',
      cardShadow: 'none',
      btnShadow: '0 0 0 transparent',
      case: 'none',
      tracking: '0',
      hStyle: 'normal',
    },
    fx: { cover: 820, reveal: 620 },
    pen: true,
    light: {
      bg: '#f4f7fa', bg2: '#e6edf3', card: '#ffffff', ink: '#1d3557', muted: '#4b6584',
      line: '#1d3557', accent: '#d62839', accent2: '#2a9d8f', accent3: '#f4a261', onAccent: '#ffffff', accentInk: '#c1121f',
    },
    dark: {
      bg: '#1f2d27', bg2: '#263830', card: '#2a3d35', ink: '#f3f1e7', muted: '#bfc9bf',
      line: '#f3f1e7', accent: '#ffd166', accent2: '#8ecae6', accent3: '#ff8fa3', onAccent: '#1f2d27', accentInk: '#ffd166',
    },
  },

  rotoscope: {
    id: 'rotoscope',
    name: 'Rotoscope',
    tag: 'Traced Realism',
    blurb: 'Tracing over live-action for stylized, slightly unsettling realism.',
    refs: 'A Scanner Darkly',
    fonts: {
      display: "'Special Elite', monospace",
      body: "'Courier Prime', monospace",
      google: 'family=Special+Elite&family=Courier+Prime:wght@400;700',
    },
    fontScale: 0.98,
    displayAdjust: 0.92,
    shape: {
      radius: '2px',
      btnRadius: '2px',
      borderW: '2px',
      cardShadow: '5px 4px 0 rgb(var(--accent2) / 0.6), -3px -2px 0 rgb(var(--accent) / 0.5)',
      btnShadow: '3px 3px 0 rgb(var(--accent2) / 0.7)',
      case: 'none',
      tracking: '0.01em',
      hStyle: 'normal',
    },
    fx: { cover: 740, reveal: 620 },
    pen: true,
    light: {
      bg: '#e4e0d3', bg2: '#d4cfbf', card: '#f1eee4', ink: '#1c2b33', muted: '#4a5a62',
      line: '#1c2b33', accent: '#2b6a8a', accent2: '#d9772b', accent3: '#7aa874', onAccent: '#ffffff', accentInk: '#1f5673',
    },
    dark: {
      bg: '#10171b', bg2: '#18232a', card: '#1b2a32', ink: '#e6efe9', muted: '#a5b6bc',
      line: '#e6efe9', accent: '#5fb3d9', accent2: '#f0944d', accent3: '#9bd08f', onAccent: '#0c1317', accentInk: '#5fb3d9',
    },
  },

  pixel: {
    id: 'pixel',
    name: 'Pixel Art',
    tag: 'Retro Arcade',
    blurb: 'Low-res, nostalgic visuals from indie games and retro-inspired projects. (Light is Game Boy green, dark is arcade night.)',
    refs: 'Indie & retro games',
    fonts: {
      display: "'Press Start 2P', monospace",
      body: "'VT323', monospace",
      google: 'family=Press+Start+2P&family=VT323',
    },
    fontScale: 1.2,
    displayAdjust: 0.5,
    shape: {
      radius: '0px',
      btnRadius: '0px',
      borderW: '4px',
      cardShadow: '6px 6px 0 rgb(var(--line))',
      btnShadow: '4px 4px 0 rgb(var(--line))',
      case: 'uppercase',
      tracking: '0.04em',
      hStyle: 'normal',
    },
    fx: { cover: 820, reveal: 660 },
    light: {
      bg: '#8bac0f', bg2: '#7a9a0d', card: '#9bbc0f', ink: '#0f380f', muted: '#1f4a1f',
      line: '#0f380f', accent: '#0f380f', accent2: '#306230', accent3: '#c4cf5a', onAccent: '#9bbc0f', accentInk: '#0f380f',
    },
    dark: {
      bg: '#0d0221', bg2: '#1a0b3b', card: '#150734', ink: '#f4f1ff', muted: '#b9a8ff',
      line: '#00f0ff', accent: '#ff2a6d', accent2: '#00f0ff', accent3: '#fffb96', onAccent: '#0d0221', accentInk: '#ff2a6d',
    },
  },

  flat: {
    id: 'flat',
    name: 'Minimalist Flat',
    tag: 'Modern UI',
    blurb: 'Bold colors, simple shapes, and no shading. Popular in modern digital interfaces.',
    refs: 'Modern interface design',
    fonts: {
      display: "'Outfit', sans-serif",
      body: "'DM Sans', sans-serif",
      google: 'family=Outfit:wght@500;800&family=DM+Sans:wght@400;500;700',
    },
    fontScale: 1,
    displayAdjust: 1,
    shape: {
      radius: '0px',
      btnRadius: '999px',
      borderW: '0px',
      cardShadow: 'none',
      btnShadow: 'none',
      case: 'none',
      tracking: '-0.03em',
      hStyle: 'normal',
    },
    fx: { cover: 620, reveal: 520 },
    light: {
      bg: '#f5f4ef', bg2: '#e9e7df', card: '#ffffff', ink: '#101010', muted: '#4d4d4d',
      line: '#101010', accent: '#ff5a36', accent2: '#2b59ff', accent3: '#ffc233', onAccent: '#101010', accentInk: '#b8330f',
    },
    dark: {
      bg: '#101010', bg2: '#1a1a1a', card: '#1d1d1d', ink: '#f5f4ef', muted: '#b5b3ab',
      line: '#f5f4ef', accent: '#ff6a47', accent2: '#5b83ff', accent3: '#ffc233', onAccent: '#101010', accentInk: '#ff6a47',
    },
  },

  chibi: {
    id: 'chibi',
    name: 'Chibi',
    tag: 'Cute & Comedic',
    blurb: 'Exaggerated proportions, big heads, small bodies. Cute or comedic by design.',
    refs: 'Super-deformed characters',
    fonts: {
      display: "'Baloo 2', cursive",
      body: "'Quicksand', sans-serif",
      google: 'family=Baloo+2:wght@500;800&family=Quicksand:wght@500;700',
    },
    fontScale: 1.02,
    displayAdjust: 1.05,
    shape: {
      radius: '30px',
      btnRadius: '999px',
      borderW: '3px',
      cardShadow: '0 7px 0 rgb(var(--accent) / 0.55)',
      btnShadow: '0 5px 0 rgb(var(--line) / 0.9)',
      case: 'none',
      tracking: '0',
      hStyle: 'normal',
    },
    fx: { cover: 760, reveal: 640 },
    light: {
      bg: '#fff0f7', bg2: '#ffe0ef', card: '#ffffff', ink: '#4a2c4f', muted: '#7a5a80',
      line: '#4a2c4f', accent: '#ff7eb6', accent2: '#5cc8ff', accent3: '#ffe066', onAccent: '#3a1f3f', accentInk: '#b02a6b',
    },
    dark: {
      bg: '#2a1a33', bg2: '#38244a', card: '#3a2650', ink: '#ffe9f5', muted: '#d6b8d9',
      line: '#ffb3d4', accent: '#ff8fc3', accent2: '#7ad7ff', accent3: '#ffe680', onAccent: '#2a1a33', accentInk: '#ff8fc3',
    },
  },

  abstract: {
    id: 'abstract',
    name: 'Experimental',
    tag: 'Abstract',
    blurb: 'Non-literal shapes and mixed media, focused on rhythm and color over story.',
    refs: 'Experimental & abstract film',
    fonts: {
      display: "'Rubik Glitch', system-ui",
      body: "'Space Mono', monospace",
      google: 'family=Rubik+Glitch&family=Space+Mono:wght@400;700',
    },
    fontScale: 0.96,
    displayAdjust: 0.8,
    shape: {
      radius: '0px',
      btnRadius: '999px',
      borderW: '2px',
      cardShadow: '8px 8px 0 rgb(var(--accent) / 0.9)',
      btnShadow: '4px 4px 0 rgb(var(--accent2))',
      case: 'none',
      tracking: '0',
      hStyle: 'normal',
    },
    fx: { cover: 640, reveal: 560 },
    light: {
      bg: '#f1efe6', bg2: '#e3dfd0', card: '#fffdf5', ink: '#0a0a0a', muted: '#444444',
      line: '#0a0a0a', accent: '#ff3b30', accent2: '#1f3bff', accent3: '#00c853', onAccent: '#0a0a0a', accentInk: '#c4160d',
    },
    dark: {
      bg: '#0a0a0a', bg2: '#161616', card: '#141414', ink: '#f1efe6', muted: '#b0ada0',
      line: '#f1efe6', accent: '#ff2e93', accent2: '#00e5ff', accent3: '#c6ff00', onAccent: '#0a0a0a', accentInk: '#ff2e93',
    },
  },
};

export const styleForPath = (pathname) => PAGE_STYLES[pathname] || FALLBACK_STYLE;

// ---------- engine helpers (DOM side effects live here, not in components) ----------

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

const kebab = (k) => k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const loadedFonts = new Set();
export function ensureFonts(id) {
  const s = STYLES[id];
  if (!s || loadedFonts.has(id) || typeof document === 'undefined') return;
  loadedFonts.add(id);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${s.fonts.google}&display=swap`;
  document.head.appendChild(link);
}

// All CSS custom properties for a style, as a plain object. Used by applyStyle (on <html>)
// and by previews (scoped to one element so it shows a style without changing the page).
export function styleVars(id, dark) {
  const s = STYLES[id];
  const pal = dark ? s.dark : s.light;
  const vars = {};
  Object.entries(pal).forEach(([k, v]) => {
    vars[`--${kebab(k)}`] = hexToRgb(v);
  });
  const sh = s.shape;
  Object.assign(vars, {
    '--radius': sh.radius,
    '--btn-radius': sh.btnRadius,
    '--border-w': sh.borderW,
    '--card-shadow': sh.cardShadow,
    '--btn-shadow': sh.btnShadow,
    '--case': sh.case,
    '--tracking': sh.tracking,
    '--h-style': sh.hStyle,
    '--font-display': s.fonts.display,
    '--font-body': s.fonts.body,
    '--display-adjust': String(s.displayAdjust),
  });
  return vars;
}

export function applyStyle(id, dark) {
  const s = STYLES[id];
  if (!s || typeof document === 'undefined') return;
  const root = document.documentElement;

  Object.entries(styleVars(id, dark)).forEach(([k, v]) => root.style.setProperty(k, v));
  root.style.setProperty('--font-scale', String(s.fontScale));

  root.dataset.style = id;
  root.classList.toggle('dark', !!dark);
  root.style.colorScheme = dark ? 'dark' : 'light';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', (dark ? s.dark : s.light).bg);
  ensureFonts(id);
}
