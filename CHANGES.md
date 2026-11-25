# Changes

## Phase 1B: content and asset integration (same branch, local only, November 25, 2026)

Not pushed. Needs owner approval before the preview is updated.

### Added
- Six Gemini-assisted concepts in **Concepts & Explorations**, published with Concept preview badges, AI disclosure and "Google Gemini" as the only tool: Identity in Motion (with a 10-second logo-reveal preview clip), Words in Motion, Sonic — Product Visualization, Beyond the Frame, On Air — Motion Identity, RT.Animation — Creative Showreel. Summaries follow the descriptions on the Gemini concept boards; no animation software is claimed.
- Assets in `src/assets/projects/`: for each concept, the concept board (`<slug>.webp`, lightbox), a clean art crop (`<slug>.card.webp`) and a blur placeholder; `identity-in-motion.preview.mp4` (re-encoded from the Gemini video, 720p, no audio, 1.9 MB).
- `public/rt-mascot.webp`: RT.Animation mascot (owner-supplied), cropped to the circle at 800×800.
- Business email `social@rtanimate.com` (Contact page and footer) and YouTube `@rtanimateofficial` (Contact page and footer), in `src/data/links.js`.
- Lightbox videos use the concept board as their poster frame.

### Changed
- Home hero portrait replaced with the mascot; old `public/Portfolio_RT_IMG.webp` (superhero logo on shirt) deleted.
- Section renamed "Concepts / In Development" → "Concepts & Explorations"; intro now names Google Gemini.
- Featured projects renamed/prepared: RT.Animation Brand Identity, Christmas Church Media Pack, Countdown Builder, Raf & Tre. All still `published: false` until role, tools, status and source media are confirmed.


## Phase 1: authentic portfolio (branch `phase1/authentic-portfolio`, November 25, 2026)

Preview only. Not merged, not deployed to production.
Built on top of draft PR #3 (`review/rt-animation-test006`, commit `860da9a`), which already centralizes the RT.Animation brand name.

### Removed from public view
- The nine placeholder portfolio projects (Unbox, Signal Sync, Frame by Frame, Idle Spark, Ellies Ville, Digital Ghosts, The Stylus and the Sword, MatchaVerse, Looped) and their 27 image files. The owner reported these were not his completed work, and their descriptions claimed tools and work that did not happen.
- `public/Rich-Resume.pdf` and all four links to it (Home, About, Contact). The PDF exposed a personal phone number and personal email address.
- Unverifiable skill proficiency ratings (percent bars) on the About page.
- Skills that could not be confirmed (Cinema 4D, Blender, Premiere Pro, Marvelous Designer). Icons are kept in `public/icons/` so they can be re-added.

### Added
- New portfolio data model in `src/data/projects.js` with `status`, `published`, `role`, `tools`, `aiAssisted` and `visual` fields.
- Two portfolio sections: **Real Projects** and **Concepts / In Development**, each with an empty state.
- Always-visible status badge on concept and in-development images, a note about the image source, and status in alt text.
- Lightbox shows role, an AI-assistance note and the image-source note.
- Four candidate entries from the Website & Portfolio Handoff, all `published: false` until the owner confirms them.
- `src/assets/projects/.gitkeep` so the asset folder exists while empty.
- README with deployment rules and the content checklist, including how to add Gemini concept visuals.

### Changed
- Home "Latest work" shows only finished projects; when there are none it shows a "New work in progress" card instead.
- Navbar label "Projects" is now "Portfolio" (URL `/projects` unchanged).
- About page copy rewritten to match stated skills and to disclose AI-assisted work. "Me, drawn by me" caption changed to "Chibi sketch of me".
- Projects page title and meta description no longer repeat the placeholder claims.
- 404 page title uses the RT.Animation brand.

### Not changed (needs owner decision)
- Home hero portrait (`public/Portfolio_RT_IMG.webp`) still shows a superhero logo on the shirt.
- Mobile Tailwind variant bug, lightbox focus trap and SEO files (robots.txt, sitemap, Open Graph) are left for a later phase.
