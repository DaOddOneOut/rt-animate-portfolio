// src/theme/cursors.js
// One mouse cursor per art style, drawn as tiny inline SVGs in the style's own palette.
// (Cel, Whiteboard and Rotoscope keep the animated pen, handled in CustomCursor.)
// Each style has a normal cursor and a "pointer" cursor for links and buttons.

const arrow = 'M4 3 L4 24 L9.5 19 L13.5 28 L17.5 26.2 L13.6 17.4 L21 17 Z';

const svg = (inner, size = 32) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${inner}</svg>`;

const star = (cx, cy, R, r, n = 5) => {
  const pts = [];
  for (let i = 0; i < n * 2; i += 1) {
    const rad = i % 2 === 0 ? R : r;
    const a = (Math.PI / n) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
};

const heart = 'M16 28 C 3 18 3 8 10 6.5 C 13.5 5.8 15.4 8 16 10 C 16.6 8 18.5 5.8 22 6.5 C 29 8 29 18 16 28 Z';

// pixel arrow drawn on an 8px grid (each cell = 2px) so it stays crisp
const pxArrow = (fill, line) => {
  const rows = [
    '1000000000', '1100000000', '1210000000', '1221000000', '1222100000', '1222210000',
    '1222221000', '1222222100', '1222211110', '1221221000', '1210122100', '1100122100', '1000012210', '0000001100',
  ];
  let out = '';
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== '0') out += `<rect x="${2 + x * 2}" y="${2 + y * 2}" width="2" height="2" fill="${c === '1' ? line : fill}"/>`;
    });
  });
  return out;
};

const DESIGNS = {
  vector: (p) => ({
    def: svg(`<path d="${arrow}" fill="${p.accent}" stroke="${p.line}" stroke-width="2" stroke-linejoin="round"/>`),
    ptr: svg(`<circle cx="16" cy="16" r="10" fill="${p.accent3}" stroke="${p.line}" stroke-width="2.5"/><circle cx="16" cy="16" r="3.5" fill="${p.line}"/>`),
    hot: [4, 3, 16, 16],
  }),
  cutout: (p) => ({
    def: svg(`<path d="${arrow}" transform="translate(2 2)" fill="${p.line}" opacity=".35"/><path d="${arrow}" fill="${p.card}" stroke="${p.line}" stroke-width="2" stroke-linejoin="round" stroke-dasharray="4 2"/>`),
    ptr: svg(`<path d="M5 6 L27 26 M27 6 L5 26" stroke="${p.line}" stroke-width="3" stroke-linecap="round"/><circle cx="6" cy="26" r="4" fill="none" stroke="${p.accent}" stroke-width="2.5"/><circle cx="26" cy="26" r="4" fill="none" stroke="${p.accent}" stroke-width="2.5"/>`),
    hot: [4, 3, 16, 16],
  }),
  anime: (p) => ({
    def: svg(`<path d="M3 3 L5 25 L10 20 L14 29 L18 27 L14 18.5 L22 18 Z" fill="${p.accent3}" stroke="${p.line}" stroke-width="2.5" stroke-linejoin="miter"/><path d="M24 4 L28 1 M26 9 L31 8 M22 1 L22 -1" stroke="${p.accent}" stroke-width="2" stroke-linecap="round"/>`),
    ptr: svg(`<polygon points="${star(16, 16, 15, 6.5, 8)}" fill="${p.accent3}" stroke="${p.line}" stroke-width="2.2" stroke-linejoin="miter"/>`),
    hot: [3, 3, 16, 16],
  }),
  pixel: (p) => ({
    def: svg(pxArrow(p.accent3 || p.card, p.line)),
    ptr: svg(
      `<rect x="10" y="4" width="4" height="4" fill="${p.line}"/><rect x="14" y="4" width="4" height="12" fill="${p.accent3}"/><rect x="10" y="8" width="4" height="12" fill="${p.accent3}"/><rect x="18" y="12" width="4" height="8" fill="${p.accent3}"/><rect x="22" y="14" width="4" height="8" fill="${p.accent3}"/><rect x="6" y="14" width="4" height="8" fill="${p.accent3}"/><rect x="8" y="22" width="16" height="6" fill="${p.accent3}"/><rect x="8" y="28" width="16" height="2" fill="${p.line}"/>`,
    ),
    hot: [2, 2, 14, 4],
  }),
  flat: (p) => ({
    def: svg(`<circle cx="16" cy="16" r="9" fill="${p.accent}"/><circle cx="16" cy="16" r="13" fill="none" stroke="${p.accent}" stroke-width="2" opacity=".45"/>`),
    ptr: svg(`<circle cx="16" cy="16" r="13" fill="${p.accent2}" opacity=".35"/><circle cx="16" cy="16" r="8" fill="${p.accent}"/>`),
    hot: [16, 16, 16, 16],
  }),
  chibi: (p) => ({
    def: svg(`<path d="${heart}" fill="${p.accent}" stroke="${p.line}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" fill="#fff" opacity=".85"/>`),
    ptr: svg(`<polygon points="${star(16, 17, 14, 6.2)}" fill="${p.accent3}" stroke="${p.line}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12.5" cy="13" r="1.6" fill="${p.line}"/><circle cx="19.5" cy="13" r="1.6" fill="${p.line}"/>`),
    hot: [16, 16, 16, 17],
  }),
  abstract: (p) => ({
    def: svg(`<polygon points="4,3 28,16 4,29" fill="${p.accent}" opacity=".9"/><circle cx="22" cy="22" r="6" fill="${p.accent2}" opacity=".85"/>`),
    ptr: svg(`<rect x="5" y="5" width="22" height="22" fill="${p.accent3}" stroke="${p.line}" stroke-width="2.5" transform="rotate(14 16 16)"/><circle cx="16" cy="16" r="4" fill="${p.accent}"/>`),
    hot: [5, 3, 16, 16],
  }),
};

const toCss = (markup, [x, y]) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}") ${x} ${y}`;

// returns { def, ptr } as CSS cursor values, or null when the style uses the pen
export function cursorsFor(id, palette) {
  const make = DESIGNS[id];
  if (!make) return null;
  const d = make(palette);
  const [dx, dy, px, py] = d.hot;
  return { def: `${toCss(d.def, [dx, dy])}, auto`, ptr: `${toCss(d.ptr, [px, py])}, pointer` };
}
