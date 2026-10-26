// src/theme/StylePreview.jsx
// A small live sample of one art style, rendered with that style's own palette, fonts and
// shape by scoping its CSS variables to this element (the rest of the page is untouched).
import { STYLES, styleVars } from './styles';

export default function StylePreview({ id, dark, compact = false }) {
  const s = STYLES[id];
  const pal = dark ? s.dark : s.light;
  return (
    <div
      aria-hidden="true"
      style={{
        ...styleVars(id, dark),
        background: 'rgb(var(--bg))',
        color: 'rgb(var(--ink))',
        border: `2px solid ${pal.line}`,
        borderRadius: 10,
        padding: compact ? 8 : 14,
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 8 : 14,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? '1.4rem' : `calc(2.6rem * var(--display-adjust))`,
          textTransform: 'var(--case)',
          fontStyle: 'var(--h-style)',
          lineHeight: 1,
        }}
      >
        Aa
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {[pal.accent, pal.accent2, pal.accent3, pal.card].map((c, i) => (
            <span key={i} style={{ width: compact ? 10 : 16, height: compact ? 10 : 16, background: c, border: `2px solid ${pal.line}` }} />
          ))}
        </div>
        {!compact && (
          <span className="btn" style={{ fontSize: 'calc(0.75rem * var(--display-adjust))', padding: '0.25rem 0.8rem', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
            Button
          </span>
        )}
      </div>
    </div>
  );
}
