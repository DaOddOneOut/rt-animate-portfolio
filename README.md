# RT.Animation Portfolio

Source for the RT.Animation portfolio site (Rich Toney, animator and motion designer, NYC).

Built with Create React App, React 18, Tailwind CSS, Framer Motion and React Router. Every page is drawn in one of ten 2D animation styles (see `src/theme/styles.js`).

## Run locally

```bash
npm ci
npm start          # dev server at http://localhost:3000
CI=true npm run build   # production build into build/
```

## Deployment rules

- Every commit pushed to `main` creates a **Vercel Production** deployment.
- Any other pushed branch can create a **Vercel Preview** deployment.
- rtanimate.com is served through Hostinger; how it is updated is tracked in the RT.Animation Source of Truth Index.
- Do not merge or push to `main` without the owner's explicit deployment approval.

## Adding portfolio items

All portfolio content lives in `src/data/projects.js`. The Portfolio page has two sections:

| Section | Which `status` values | What belongs there |
|---|---|---|
| Real Projects | `real` | Finished work Rich made or contributed to, with the rights to show it |
| Concepts & Explorations | `concept`, `in-development` | Ideas, pitches and unfinished work |

Checklist for every entry:

1. **`status`** is honest. If the work is not finished, it is not `real`.
2. **`role`** says what Rich actually did, in plain words. Required for `real` items.
3. **`tools`** lists only software actually used on that project.
4. **`aiAssisted: true`** when AI tools helped make the piece. The lightbox then says so.
5. **`visual`** says where the image comes from: `final`, `work-in-progress`, `ai-concept` or `mockup`. Every value except `final` prints a note on the card and in the lightbox.
6. **`published: false`** keeps the entry hidden until the owner approves it. Flip it to `true` to show it.
7. No client names, logos, testimonials or results unless the owner has permission to show them.

### Temporary concept visuals (for example, Gemini-generated images)

These are allowed **only** in the Concepts & Explorations section.

1. Set `status: 'concept'` (or `'in-development'`) and `visual: 'ai-concept'`.
2. Export the image as WebP and name it after the slug:
   - `src/assets/projects/<slug>.webp` (full size, about 1600px wide)
   - `src/assets/projects/<slug>.card.webp` (thumbnail, about 640px wide, optional)
   - `src/assets/projects/<slug>.blur.webp` (about 24px wide, optional)
3. The site then automatically shows:
   - a **Concept preview** or **In development** badge on the image itself,
   - the note "Temporary AI-generated concept visual. Not final artwork and not client work.",
   - the status in the image's alt text.
4. When the real artwork is ready, replace the files and change `visual` (and `status`, once finished).

Do not put a concept visual on an entry with `status: 'real'`.

## Change log

See [CHANGES.md](CHANGES.md).
