// src/pages/Contact.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import links from '../data/links';

const FORM_ENDPOINT = 'https://formspree.io/f/xpwdvavv';

const validate = (form) => {
  const e = {};
  if (!form.name.trim()) e.name = 'Name is required.';
  if (!form.email.trim()) e.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.';
  if (!form.message.trim()) e.message = 'Message is required.';
  return e;
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-bold" style={{ color: 'rgb(var(--accent-ink))' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('bad response');
      setStatus('sent');
      setForm({ name: '', email: '', message: '', _gotcha: '' });
    } catch {
      setStatus('error');
    }
  };

  const social = [
    { label: 'GitHub', href: links.github },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'ArtStation', href: links.artstation },
  ].filter((l) => l.href);

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr]">
      <Helmet>
        <title>RT.Animation | Contact</title>
        <meta name="description" content="Interested in working together or saying hi? Reach out to Rich here." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card p-6 sm:p-8">
        <h1 className="t-h1 mb-2 text-accent-ink"><span className="scribble">Let’s Connect</span></h1>
        <p className="mb-6 text-muted">Interested in working together or saying hi? Tell me about your project.</p>

        {status === 'sent' ? (
          <div role="status" className="rounded-lg border-2 border-line p-5">
            <p className="t-h3 mb-1">Message sent!</p>
            <p>Thanks for reaching out.</p>
            <button type="button" className="btn btn-ghost mt-4" onClick={() => setStatus('idle')}>Send another</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Field id="name" label="Name" error={errors.name}>
              <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={onChange}
                className="input" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange}
                className="input" placeholder="your@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={onChange}
                className="input" placeholder="Tell me about your project or say hello!" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>

            {/* honeypot: hidden from people, tempting to spam bots */}
            <input type="text" name="_gotcha" value={form._gotcha} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

            {status === 'error' && (
              <p role="alert" className="font-bold" style={{ color: 'rgb(var(--accent-ink))' }}>
                Something went wrong sending that. Please try again in a moment.
              </p>
            )}

            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>

      <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="card h-fit p-6">
        <h2 className="t-h3 mb-4">Elsewhere</h2>
        <ul className="space-y-3">
          {social.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent-ink underline underline-offset-4">{l.label}</a>
            </li>
          ))}
          <li>
            <a href={links.resume} download className="text-accent-ink underline underline-offset-4">Download my resume</a>
          </li>
        </ul>
      </motion.aside>
    </section>
  );
}
