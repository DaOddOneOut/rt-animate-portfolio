// src/pages/CaseStudy.jsx
// A full write-up for a published project that has a `caseStudy` in src/data/projects.js.
// Anything without one (or unpublished) falls through to the 404 page.
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { findProject, STATUS } from '../data/projects';
import { BRAND } from '../data/site';
import NotFound from './NotFound';

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

  const { title, summary, tools, status } = project;
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

      {cs.video && (
        <figure className="card mt-10 overflow-hidden p-0">
          <video className="mx-auto max-h-[70vh] w-full bg-black object-contain" controls playsInline preload="metadata" poster={project.image || undefined}>
            <source src={cs.video} type="video/mp4" />
          </video>
          <figcaption className="p-3 text-sm text-muted">
            Promo video for the pack, recorded in ProPresenter. Lyrics and speaker name are example text.
          </figcaption>
        </figure>
      )}

      <Section id="overview" title="Project overview">
        {cs.overview?.map((p) => <p key={p} className="mb-3 text-lg">{p}</p>)}
        {cs.contents?.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-6">
            {cs.contents.map((c) => <li key={c}>{c}</li>)}
          </ul>
        )}
        {cs.formats && <p className="mt-4 text-muted">{cs.formats}</p>}
      </Section>

      {cs.objective && (
        <Section id="objective" title="Creative objective">
          <p className="text-lg">{cs.objective}</p>
        </Section>
      )}

      {cs.role?.length > 0 && (
        <Section id="role" title="My role">
          <ul className="list-disc space-y-1 pl-6">
            {cs.role.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Section>
      )}

      {cs.aiDisclosure && (
        <Section id="ai" title="AI-assisted production">
          <div className="card p-5">
            <p>{cs.aiDisclosure}</p>
            {tools?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            )}
          </div>
        </Section>
      )}

      {cs.testing?.length > 0 && (
        <Section id="testing" title="Software and testing">
          <ul className="list-disc space-y-2 pl-6">
            {cs.testing.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Section>
      )}

      {cs.previews?.length > 0 && (
        <Section id="previews" title="Finished product previews">
          {cs.previewNote && <p className="mb-6 text-muted">{cs.previewNote}</p>}
          <ul className="grid gap-6 sm:grid-cols-3">
            {cs.previews.map((g) => (
              <li key={g.file} className="card overflow-hidden">
                <img src={g.src} alt={g.caption} loading="lazy" decoding="async" className="w-full" />
                <p className="p-3 text-sm text-muted">{g.caption}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {cs.links?.length > 0 && (
        <Section id="buy" title="Get the pack">
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
