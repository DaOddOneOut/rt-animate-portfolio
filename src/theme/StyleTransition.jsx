// src/theme/StyleTransition.jsx
// Ten full-screen page transitions, one per animation style. Each covers the screen
// (phase "cover"), the page swaps underneath, then it uncovers (phase "reveal").
// Colors come straight from the DESTINATION style's palette (not the CSS variables,
// which still hold the old style until the swap).
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { STYLES } from './styles';

// small seeded RNG so random layouts are stable for one transition
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const steps6 = (t) => Math.floor(t * 6) / 6;
const steps4 = (t) => Math.floor(t * 4) / 4;

const cover = (c, delay = 0, extra = {}) => ({ transition: { duration: c, delay, ...extra } });

function Label({ s, pal, text, size = 'clamp(2.2rem, 9vw, 6rem)', style }) {
  return (
    <span
      style={{
        fontFamily: s.fonts.display,
        color: pal.ink,
        textTransform: s.shape.case,
        letterSpacing: s.shape.tracking,
        fontStyle: s.shape.hStyle,
        fontSize: `calc(${size} * ${s.displayAdjust})`,
        lineHeight: 1,
        textAlign: 'center',
        ...style,
      }}
    >
      {text}
    </span>
  );
}

const Center = ({ children, className = '', ...rest }) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${className}`}
    {...rest}
  >
    {children}
  </div>
);

/* ---------------------------------------------------------------- 1. Cel */
function Cel({ phase, pal, s, c, r, label }) {
  const sheets = [pal.bg2, pal.card, pal.bg];
  return (
    <>
      {sheets.map((bg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: bg,
            borderTop: `4px solid ${pal.ink}`,
            boxShadow: '0 -12px 30px rgba(0,0,0,0.18)',
          }}
          initial={{ y: '105%', rotate: 3 - i * 2 }}
          animate={
            phase === 'cover'
              ? { y: '0%', rotate: (i - 1) * 0.6, ...cover(c * 0.62, i * c * 0.19, { ease: [0.22, 1, 0.36, 1] }) }
              : { y: '-112%', rotate: -i * 1.2, ...cover(r * 0.7, i * r * 0.14, { ease: [0.65, 0, 0.35, 1] }) }
          }
        >
          {i === 2 && (
            <Center>
              <Label s={s} pal={pal} text={label} />
              <svg width="260" height="26" viewBox="0 0 260 26" className="mt-3" aria-hidden="true">
                <motion.path
                  d="M4 16 C 30 2, 50 26, 78 12 S 130 4, 156 16 S 210 24, 256 8"
                  fill="none"
                  stroke={pal.accent}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, transition: { duration: c * 0.8, delay: c * 0.45 } }}
                />
              </svg>
              <span style={{ fontFamily: s.fonts.body, color: pal.muted, marginTop: 10, fontSize: '1.1rem' }}>
                frame by frame...
              </span>
            </Center>
          )}
        </motion.div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------- 2. Vector */
function Vector({ phase, pal, s, c, r, label }) {
  const cols = [pal.accent3, pal.accent2, pal.accent, pal.bg];
  return (
    <>
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%', top: '50%', width: '175vmax', height: '175vmax',
            marginLeft: '-87.5vmax', marginTop: '-87.5vmax', background: col, border: `5px solid ${pal.ink}`,
          }}
          initial={{ scale: 0 }}
          animate={
            phase === 'cover'
              ? { scale: 1, ...cover(c * 0.7, i * c * 0.1, { ease: [0.34, 1.2, 0.64, 1] }) }
              : { scale: 0, ...cover(r * 0.7, (3 - i) * r * 0.1, { ease: [0.65, 0, 0.35, 1] }) }
          }
        />
      ))}
      <Center>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            phase === 'cover'
              ? { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 15, delay: c * 0.4 } }
              : { opacity: 0, scale: 0.8, ...cover(0.15) }
          }
          className="flex flex-col items-center gap-3"
        >
          <span
            className="block rounded-full"
            style={{ width: 70, height: 70, background: pal.accent, border: `5px solid ${pal.ink}`, boxShadow: `0 6px 0 ${pal.ink}` }}
          />
          <Label s={s} pal={pal} text={label} style={{ textShadow: `0 0.06em 0 ${pal.accent}` }} />
        </motion.div>
      </Center>
    </>
  );
}

/* ------------------------------------------------------------ 3. Cut-Out */
function Cutout({ phase, pal, s, c, r, label }) {
  const cols = [pal.accent, pal.accent2, pal.accent3, pal.card];
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{ background: pal.bg }}
        initial={{ opacity: 0 }}
        animate={phase === 'cover' ? { opacity: 1, ...cover(0.01, c * 0.75) } : { opacity: 0, ...cover(0.01, r * 0.2) }}
      />
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${i * 24}%`, width: '28%', background: col,
            border: `4px solid ${pal.line}`, boxShadow: `6px 0 0 ${pal.line}`,
          }}
          initial={{ y: i % 2 ? '-105%' : '105%', rotate: i % 2 ? 4 : -4 }}
          animate={
            phase === 'cover'
              ? { y: '0%', rotate: (i % 2 ? -1 : 1) * 1.2, ...cover(c * 0.7, i * c * 0.12, { ease: steps6 }) }
              : { y: i % 2 ? '105%' : '-105%', rotate: 0, ...cover(r * 0.7, i * r * 0.1, { ease: steps6 }) }
          }
        />
      ))}
      <Center>
        <motion.div
          initial={{ opacity: 0, rotate: -6 }}
          animate={
            phase === 'cover'
              ? {
                  opacity: 1,
                  rotate: [-6, 2, -2, 1.5],
                  transition: {
                    opacity: { duration: 0.01, delay: c * 0.45 },
                    rotate: { duration: c * 0.45, delay: c * 0.45, ease: steps4 },
                  },
                }
              : { opacity: 0, ...cover(0.01) }
          }
          style={{ background: pal.card, border: `5px solid ${pal.line}`, boxShadow: `8px 8px 0 ${pal.line}`, padding: '1.2rem 2rem' }}
        >
          <Label s={s} pal={pal} text={label} size="clamp(2rem, 8vw, 5rem)" />
        </motion.div>
      </Center>
    </>
  );
}

/* -------------------------------------------------------------- 4. Anime */
function Anime({ phase, pal, s, c, r, label }) {
  const panel = (extra, key, bg, from, delay) => (
    <motion.div
      key={key}
      className="absolute"
      style={{ top: '-6%', bottom: '-6%', background: bg, borderLeft: `5px solid ${pal.ink}`, borderRight: `5px solid ${pal.ink}`, ...extra }}
      initial={{ x: from, skewX: -14 }}
      animate={
        phase === 'cover'
          ? { x: '0%', skewX: -14, ...cover(c * 0.55, delay, { ease: [0.2, 0.9, 0.2, 1] }) }
          : { x: from, skewX: -14, ...cover(r * 0.6, delay * 0.6, { ease: [0.7, 0, 0.84, 0] }) }
      }
    />
  );
  return (
    <>
      {panel({ left: '-12%', width: '70%' }, 'a', pal.accent, '-125%', 0)}
      {panel({ right: '-12%', width: '70%' }, 'b', pal.accent2, '125%', c * 0.12)}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `repeating-conic-gradient(from 0deg at 50% 50%, ${pal.ink}22 0deg 1.4deg, transparent 1.4deg 7deg)`,
        }}
        initial={{ opacity: 0 }}
        animate={phase === 'cover' ? { opacity: 1, ...cover(c * 0.3, c * 0.45) } : { opacity: 0, ...cover(r * 0.3) }}
      />
      <motion.div
        className="absolute"
        style={{
          left: '14%', right: '14%', top: '30%', bottom: '30%', background: pal.card,
          border: `5px solid ${pal.ink}`, boxShadow: `10px 10px 0 ${pal.accent3}`, transform: 'skewX(-8deg)',
        }}
        initial={{ scaleY: 0 }}
        animate={phase === 'cover' ? { scaleY: 1, ...cover(c * 0.3, c * 0.4) } : { scaleY: 0, ...cover(r * 0.25) }}
      />
      <Center>
        <motion.div
          initial={{ opacity: 0, scale: 2.6 }}
          animate={
            phase === 'cover'
              ? { opacity: 1, scale: 1, ...cover(c * 0.28, c * 0.5, { ease: [0.2, 1.4, 0.4, 1] }) }
              : { opacity: 0, scale: 0.6, ...cover(0.15) }
          }
        >
          <Label s={s} pal={pal} text={`${label}!`} size="clamp(2.6rem, 11vw, 7.5rem)" style={{ textShadow: `5px 5px 0 ${pal.accent}` }} />
        </motion.div>
      </Center>
    </>
  );
}

/* ---------------------------------------------------------- 5. Whiteboard */
function Whiteboard({ phase, pal, s, c, r, label }) {
  const d = 'M-6 7 L106 7 L-6 23 L106 23 L-6 39 L106 39 L-6 55 L106 55 L-6 71 L106 71 L-6 87 L106 87 L-6 103 L106 103';
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ x: '0%' }}
      animate={phase === 'reveal' ? { x: '102%', ...cover(r * 0.95, 0, { ease: [0.65, 0, 0.35, 1] }) } : { x: '0%' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: pal.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...cover(c * 0.4, c * 0.5) }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={d}
          fill="none"
          stroke={pal.accent}
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, ...cover(c * 0.92, 0, { ease: 'easeInOut' }) }}
        />
      </svg>
      <Center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, ...cover(0.2, c * 0.7) }}
          style={{ background: pal.bg, padding: '0.6rem 1.8rem', borderRadius: 16, border: `4px solid ${pal.ink}` }}
        >
          <Label s={s} pal={pal} text={label} />
        </motion.div>
      </Center>
      {/* the eraser that wipes the board clean while revealing */}
      <div
        className="absolute bottom-0 top-0"
        style={{
          left: '-7vw', width: '7vw', minWidth: 36,
          background: `linear-gradient(90deg, ${pal.ink}, ${pal.muted})`,
          borderRadius: '8px 0 0 8px', opacity: phase === 'reveal' ? 0.9 : 0,
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------ 6. Rotoscope */
function Rotoscope({ phase, pal, s, c, r, label }) {
  const bands = 8;
  const cols = [pal.accent, pal.ink, pal.accent2, pal.bg2];
  return (
    <>
      <div className="absolute inset-0" style={{ filter: 'url(#roto-boil)' }}>
        {Array.from({ length: bands }, (_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${(i * 100) / bands - 1}%`, height: `${100 / bands + 2}%`, background: cols[i % cols.length],
              borderTop: `3px solid ${pal.ink}`, borderBottom: `3px solid ${pal.ink}`,
            }}
            initial={{ x: i % 2 ? '108%' : '-108%' }}
            animate={
              phase === 'cover'
                ? { x: '0%', ...cover(c * 0.7, i * c * 0.05, { ease: steps4 }) }
                : { x: i % 2 ? '-108%' : '108%', ...cover(r * 0.7, i * r * 0.04, { ease: steps4 }) }
            }
          />
        ))}
      </div>
      <Center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === 'cover' ? { opacity: 1, ...cover(0.01, c * 0.55) } : { opacity: 0, ...cover(0.01) }}
          style={{ background: pal.card, border: `3px solid ${pal.ink}`, padding: '1rem 1.6rem', boxShadow: `6px 5px 0 ${pal.accent2}, -4px -3px 0 ${pal.accent}` }}
        >
          <Label s={s} pal={pal} text={label} size="clamp(1.8rem, 7vw, 4.2rem)" />
          <div style={{ fontFamily: s.fonts.body, color: pal.muted, marginTop: 8, fontSize: '0.95rem' }}>tracing frame...</div>
        </motion.div>
      </Center>
    </>
  );
}

/* ---------------------------------------------------------------- 7. Pixel */
function Pixel({ phase, pal, s, c, r, label }) {
  const cols = 16;
  const rows = 10;
  const cells = useMemo(() => {
    const rand = rng(7 + label.length);
    const palette = [pal.bg, pal.bg2, pal.accent2, pal.bg, pal.card];
    return Array.from({ length: cols * rows }, () => ({
      color: palette[Math.floor(rand() * palette.length)],
      inDelay: rand(),
      outDelay: rand(),
    }));
  }, [label, pal]);

  return (
    <>
      <div className="absolute inset-0" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            style={{ background: cell.color, margin: -0.5 }}
            initial={{ opacity: 0 }}
            animate={
              phase === 'cover'
                ? { opacity: 1, ...cover(0.01, cell.inDelay * c * 0.8) }
                : { opacity: 0, ...cover(0.01, cell.outDelay * r * 0.8) }
            }
          />
        ))}
      </div>
      <Center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === 'cover' ? { opacity: 1, ...cover(0.01, c * 0.8) } : { opacity: 0, ...cover(0.01) }}
          style={{ background: pal.card, border: `4px solid ${pal.line}`, boxShadow: `6px 6px 0 ${pal.line}`, padding: '1.4rem 1.8rem' }}
        >
          <Label s={s} pal={pal} text={label} size="clamp(1.4rem, 5vw, 3rem)" />
          <div className="blink" style={{ fontFamily: s.fonts.display, color: pal.ink, marginTop: 16, fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            NOW LOADING...
          </div>
          <div className="mt-3 flex gap-1" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.span
                key={i}
                style={{ width: 14, height: 14, background: pal.accent, display: 'block' }}
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 1, ...cover(0.01, (c * 0.85 * (i + 1)) / 10) }}
              />
            ))}
          </div>
        </motion.div>
      </Center>
    </>
  );
}

/* ----------------------------------------------------------------- 8. Flat */
function Flat({ phase, pal, s, c, r, label }) {
  const cols = [pal.accent, pal.accent2, pal.accent3, pal.bg];
  return (
    <>
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: col }}
          initial={{ x: '-101%' }}
          animate={
            phase === 'cover'
              ? { x: '0%', ...cover(c * 0.6, i * c * 0.13, { ease: [0.76, 0, 0.24, 1] }) }
              : { x: '101%', ...cover(r * 0.6, i * r * 0.12, { ease: [0.76, 0, 0.24, 1] }) }
          }
        >
          {i === 3 && (
            <Center>
              <div style={{ width: 72, height: 10, background: pal.accent, marginBottom: 18 }} />
              <Label s={s} pal={pal} text={label} style={{ fontWeight: 800 }} />
            </Center>
          )}
        </motion.div>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- 9. Chibi */
function Chibi({ phase, pal, s, c, r, label }) {
  const cols = 7;
  const rows = 5;
  const bubbles = useMemo(() => {
    const maxD = Math.hypot(3, 2);
    const palette = [pal.accent, pal.accent2, pal.accent3, pal.card];
    return Array.from({ length: cols * rows }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return { col, row, d: Math.hypot(col - 3, row - 2) / maxD, color: palette[(col + row) % palette.length] };
    });
  }, [pal]);

  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{ background: pal.bg }}
        initial={{ opacity: 0 }}
        animate={phase === 'cover' ? { opacity: 1, ...cover(0.2, c * 0.55) } : { opacity: 0, ...cover(0.2, r * 0.3) }}
      />
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(b.col * 100) / cols - 3}%`, top: `${(b.row * 100) / rows - 5}%`,
            width: `${100 / cols + 6}%`, height: `${100 / rows + 10}%`, background: b.color, border: `4px solid ${pal.line}`,
          }}
          initial={{ scale: 0 }}
          animate={
            phase === 'cover'
              ? { scale: 1, transition: { type: 'spring', stiffness: 240, damping: 13, delay: b.d * c * 0.5 } }
              : { scale: 0, transition: { type: 'spring', stiffness: 260, damping: 18, delay: (1 - b.d) * r * 0.4 } }
          }
        />
      ))}
      <Center>
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            phase === 'cover'
              ? { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 11, delay: c * 0.5 } }
              : { opacity: 0, scale: 0.5, transition: { duration: 0.15 } }
          }
          className="flex flex-col items-center"
        >
          <span style={{ fontFamily: s.fonts.display, fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: pal.ink }}>(^o^)</span>
          <Label s={s} pal={pal} text={label} style={{ textShadow: `0 0.05em 0 ${pal.accent3}` }} />
        </motion.div>
      </Center>
    </>
  );
}

/* ------------------------------------------------------------ 10. Abstract */
function Abstract({ phase, pal, s, c, r, label }) {
  const n = 16;
  const bars = useMemo(() => {
    const rand = rng(11 + label.length);
    const palette = [pal.accent, pal.accent2, pal.accent3, pal.ink, pal.bg];
    return Array.from({ length: n }, () => ({
      color: palette[Math.floor(rand() * palette.length)],
      delay: rand(),
      origin: rand() > 0.5 ? 0 : 1,
    }));
  }, [label, pal]);

  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{ background: pal.bg }}
        initial={{ opacity: 0 }}
        animate={phase === 'cover' ? { opacity: 1, ...cover(0.01, c * 0.85) } : { opacity: 0, ...cover(0.01, r * 0.5) }}
      />
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i * 100) / n}%`, width: `${100 / n + 0.6}%`, background: b.color,
            transformOrigin: b.origin ? 'bottom' : 'top',
          }}
          initial={{ scaleY: 0 }}
          animate={
            phase === 'cover'
              ? { scaleY: 1, ...cover(c * 0.35, b.delay * c * 0.55, { ease: [0.7, 0, 0.3, 1] }) }
              : { scaleY: 0, ...cover(r * 0.35, b.delay * r * 0.55, { ease: [0.7, 0, 0.3, 1] }) }
          }
        />
      ))}
      <Center style={{ mixBlendMode: 'difference' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={phase === 'cover' ? { opacity: 1, x: 0, ...cover(0.18, c * 0.5) } : { opacity: 0, x: 30, ...cover(0.12) }}
          style={{ position: 'relative' }}
        >
          <span
            style={{
              fontFamily: s.fonts.display, color: '#fff', fontSize: 'clamp(2rem, 9vw, 6rem)',
              textShadow: '5px 0 #f0f, -5px 0 #0ff', lineHeight: 1,
            }}
          >
            {label}
          </span>
        </motion.div>
      </Center>
    </>
  );
}

const VARIANTS = {
  cel: Cel,
  vector: Vector,
  cutout: Cutout,
  anime: Anime,
  whiteboard: Whiteboard,
  rotoscope: Rotoscope,
  pixel: Pixel,
  flat: Flat,
  chibi: Chibi,
  abstract: Abstract,
};

export default function StyleTransition({ fx, dark, onClock }) {
  if (!fx.style) return null;
  const s = STYLES[fx.style];
  const pal = dark ? s.dark : s.light;
  const V = VARIANTS[fx.style];
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 9998, pointerEvents: 'all' }} aria-hidden="true">
      {/* timeline clock: runs on the same animation clock as everything else here, so the page
          only swaps once the cover has REALLY finished, however slow the device is */}
      <motion.span
        key={`${fx.style}-clock`}
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: fx.phase === 'cover' ? 1 : 0.0001 }}
        transition={{ duration: (fx.phase === 'cover' ? s.fx.cover : s.fx.reveal) / 1000, ease: 'linear' }}
        onAnimationComplete={() => onClock && onClock(fx.phase)}
      />
      <V
        key={fx.style}
        phase={fx.phase}
        pal={pal}
        s={s}
        c={s.fx.cover / 1000}
        r={s.fx.reveal / 1000}
        label={fx.label || s.name}
      />
    </div>
  );
}
