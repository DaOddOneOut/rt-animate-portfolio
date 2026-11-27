// src/pages/CaseStudy.jsx
// A full write-up for a published project that has a `caseStudy` in src/data/projects.js.
// Anything without one (or unpublished) falls through to the 404 page.
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { findProject, STATUS } from '../data/projects';
import { BRAND } from '../data/site';
import NotFound from './NotFound';

function Figure({ f }) {
  const size = f.wide ? 'sm:col-span-2' : '';
  return (
    <li className={`card overflow-hidden ${size}`}>
      <div className="relative">
        <a href={f.src} target="_blank" rel="noopener noreferrer" aria-label={`${f.caption} Open full size`}>
          <img src={f.src} alt={f.caption} loading="lazy" decoding="async" className={`h-auto w-full ${f.small ? 'mx-auto max-w-xs p-4' : ''}`} />
        </a>
        {f.badge && (
          <span className="chip chip-on pointer-events-none absolute left-3 top-3 !text-xs font-bold uppercase tracking-wide">{f.badge}</span>
        )}
      </div>
      <p className="p-3 text-sm text-muted">{f.caption}</p>
    </li>
  );
}

// Generic, ordered sections for case studies that define `blocks`.
function Block({ b, project }) {
  return (
    <Section id={b.id} title={b.title}>
      {b.text?.map((t) => <p key={t} className="mb-3 text-lg">{t}</p>)}
      {b.role && project.role && <p className="mb-3 text-lg"><strong>My role:</strong> {project.role}</p>}
      {b.list?.length > 0 && (
        <ul className="list-disc space-y-1 pl-6">
          {b.list.map((l) => <li key={l}>{l}</li>)}
        </ul>
      )}
      {b.role && project.tools?.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold">Design tools:</span>
          {project.tools.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      )}
      {b.note && <p className="mb-4 rounded-[var(--btn-radius)] border border-line p-3 text-sm"><strong>AI disclosure:</strong> {b.note}</p>}
      {b.swatches?.length > 0 && (
        <>
          <ul className="mb-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {b.swatches.map((c) => (
              <li key={c.hex} className="card overflow-hidden">
                <div className="h-16" style={{ background: c.hex }} aria-hidden="true" />
                <p className="p-2 text-sm"><strong>{c.name}</strong><br /><span className="font-mono text-muted">{c.hex}</span></p>
              </li>
            ))}
          </ul>
          {b.swatchNote && <p className="mb-6 text-sm text-muted">{b.swatchNote}</p>}
        </>
      )}
      {b.type?.length > 0 && (
        <>
          <ul className="mb-2 space-y-3">
            {b.type.map((t) => (
              <li key={t.font} className="card p-4">
                <p className="text-2xl" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: t.weight, fontStyle: t.style }}>{t.font}</p>
                <p className="text-sm text-muted">{t.use}</p>
              </li>
            ))}
          </ul>
          {b.typeNote && <p className="mb-6 text-sm text-muted">{b.typeNote}</p>}
        </>
      )}
      {b.figures?.length > 0 && (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2">
          {b.figures.map((f) => <Figure key={f.file} f={f} />)}
        </ul>
      )}
    </Section>
  );
}

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="t-h2 mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project || !project.caseStudy) return <NotFound />;

  const { title, summary, tools, testedWith, status } = project;
  const cs = project.caseStudy;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>{`${BRAND} | ${title}`}</title>
        <meta name="description" content={summary} />
      </Helmet>

      <Link to="/projects" className="text-sm text-accent-ink underline underline-offset-4">← Back to portfolio</Link>

      <header className="mt-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent-ink">{STATUS[status]?.label} · Case study</p>
        <h1 className="t-h1 text-accent-ink"><span className="scribble">{title}</span></h1>
        {cs.tagline && <p className="mt-3 text-xl italic text-accent-ink">{cs.tagline}</p>}
        <p className="mt-4 text-lg text-muted">{summary}</p>
        {cs.links?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {cs.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i ? 'btn-ghost' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {cs.cover && project.image && (
        <figure className="card mt-10 overflow-hidden p-0">
          <img src={project.image} alt={project.imageAlt || title} width="1600" height="1200" decoding="async" className="h-auto w-full" />
          <figcaption className="p-3 text-sm text-muted">{cs.cover.caption}</figcaption>
        </figure>
      )}

      {cs.video && (
        <figure className="card mt-10 overflow-hidden p-0">
          <video className="mx-auto max-h-[70vh] w-full bg-black object-contain" controls playsInline preload="metadata" poster={cs.videoPoster || undefined}>
            <source src={cs.video} type="video/mp4" />
          </video>
          <figcaption className="p-3 text-sm text-muted">
            Promo video for the pack, recorded in ProPresenter. Lyrics and speaker name are example text.
          </figcaption>
        </figure>
      )}

      {cs.blocks?.map((b) => <Block key={b.id} b={b} project={project} />)}

      {!cs.blocks && (
      <Section id="overview" title="Project overview">
        {cs.overview?.map((p) => <p key={p} className="mb-3 text-lg">{p}</p>)}
        {cs.contents?.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-6">
            {cs.contents.map((c) => <li key={c}>{c}</li>)}
          </ul>
        )}
        {cs.formats && <p className="mt-4 text-muted">{cs.formats}</p>}
      </Section>
      )}

      {cs.objective && !cs.blocks && (
        <Section id="objective" title="Creative objective">
          <p className="text-lg">{cs.objective}</p>
        </Section>
      )}

      {cs.role && !cs.blocks && (
        <Section id="role" title="My role">
          {Array.isArray(cs.role) ? (
            <ul className="list-disc space-y-1 pl-6">
              {cs.role.map((r) => <li key={r}>{r}</li>)}
            </ul>
          ) : (
            <p className="text-lg">{cs.role}</p>
          )}
        </Section>
      )}

      {cs.aiDisclosure && (
        <Section id="ai" title="AI-assisted production">
          <div className="card p-5">
            <p>{cs.aiDisclosure}</p>
            {tools?.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold">Production tools:</span>
                {tools.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            )}
          </div>
        </Section>
      )}

      {cs.testing?.length > 0 && (
        <Section id="testing" title="Software and testing">
          {testedWith?.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold">Compatibility testing:</span>
              {testedWith.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          )}
          <ul className="list-disc space-y-2 pl-6">
            {cs.testing.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Section>
      )}

      {(cs.overviews?.length > 0 || cs.previews?.length > 0) && (
        <Section id="previews" title="Finished product previews">
          {cs.overviews?.length > 0 && (
            <ul className="mb-10 grid gap-6">
              {cs.overviews.map((g) => (
                <li key={g.file} className="card overflow-hidden">
                  <a href={g.src} target="_blank" rel="noopener noreferrer" aria-label={`${g.caption} Open full size`}>
                    <img src={g.src} alt={g.caption} width="1600" height="1200" loading="lazy" decoding="async" className="h-auto w-full" />
                  </a>
                  <p className="p-3 text-sm text-muted">{g.caption}</p>
                </li>
              ))}
            </ul>
          )}
          {cs.previews?.length > 0 && <h3 className="t-h3 mb-2">In use in ProPresenter</h3>}
          {cs.previewNote && cs.previews?.length > 0 && <p className="mb-6 text-muted">{cs.previewNote}</p>}
          <ul className="grid gap-6 sm:grid-cols-2">
            {cs.previews.map((g) => (
              <li key={g.file} className="card overflow-hidden">
                <img src={g.src} alt={g.caption} width="1080" height="1040" loading="lazy" decoding="async" className="h-auto w-full" />
                <p className="p-3 text-sm text-muted">{g.caption}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {cs.links?.length > 0 && (
        <Section id="buy" title={cs.linksTitle || 'Get the pack'}>
          <div className="flex flex-wrap gap-3">
            {cs.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i ? 'btn-ghost' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
