# Changes

## Phase 1D owner decisions (November 26, 2026)

Owner-approved; pushed with 270bace to the PR #4 Preview only.

- Brand Identity wording approved. Role: "Brand concept, creative direction, direction of AI-assisted artwork, visual refinement, Adobe Illustrator assembly and rollout across RT.Animation's digital channels." Objective and AI-assisted production approved as written ("AI image tools" kept until specific tools are verified).
- Official mascot is the hoodie-and-locks character with glasses, goatee and gold-trimmed headphones. It now replaces the earlier vest character on the Home page (`public/rt-mascot.webp`, 800 × 800 on midnight navy). The earlier artwork is kept as an archived character variation (`rt-animation-brand-identity.archived-variation.webp`) and shown with an Archived badge in the case study. The AI-assisted character design disclosure is unchanged.
- Brand standards kept: official ivory RT. mark with the gold dot, six-color working palette, Arial typography (now verified in RT_Banner.ai and RT_Banner_Master_v2.ai), YouTube banner labeled Concept.
- Recorded RT_Logo_Outlined.svg (outlined vector, single color) and RT_Banner_Master_v2.ai in the asset list.

## Phase 1D: RT.Animation Brand Identity case study (local, November 26, 2026)

Not pushed. Wording marked OWNER TO APPROVE in `src/data/projects.js` needs sign-off before the Preview is updated.

- Published **RT.Animation Brand Identity** in Real Projects with a case study at `/projects/rt-animation-brand-identity`: brand overview, creative objective, the official RT. mark, mascot with AI disclosure, color palette and typography, social media applications, role and tools, approved artwork and source files, and a YouTube link. Tagline "Bringing Ideas to Motion."
- Assets are owner-supplied (RT._Ivory_Gold_Logo.png, Confident_DJ_with_Gold-Trimmed_Headphones.png, RT_Animation_Emblem.png, RT.Animation-Brand-Banner3.png, RT.Animation__Bringing_Ideas_to_Motion_1.png, RT-Animation-email-logo.png), optimized to WebP (about 9.4 MB of PNG down to about 345 KB).
- Typography is verified from the fonts embedded in RT_Banner.ai (Arial Bold, Arial Bold Italic, Arial; Illustrator 27.4, Windows). The palette is the Brand Asset Register's working palette. The YouTube banner is labeled Concept (final export unconfirmed). RT.ANImation.svg was not used: it is live text in a system font, not outlined artwork.
- The case-study page gained an ordered `blocks` layout (text, lists, figures, swatches, type samples) and a configurable links heading. The Church Media Pack page is unchanged; Countdown Builder and Raf & Tre stay unpublished.

## Phase 1C assets: owner-supplied promotional images (November 25, 2026)

Owner-approved; pushed to the PR #4 Preview only.

- Added the three recovered listing assets, checked against the Passive Income handoff: `Etsy_Main_Photo_v2.png` (2400 × 1800, v2 two-line title, labeled "Display mockup"), `Overview_Backgrounds_and_Titles.png` and `Overview_Social_Stills.png` (both 2000 × 1500; names and counts match the pack).
- Card and case-study cover now use the Etsy main photo. It is labeled as a display mockup in its alt text, under the card and in the cover caption.
- Finished product previews now lead with the two overview boards (full width, open full size). The soft lyrics still from the video was retired; the countdown and lower-third frames stay under "In use in ProPresenter". The promo video, its poster frame, the approved wording, AI disclosure and store links are unchanged.
- Optimized to WebP: 6.5 MB of PNGs became about 245 KB (cover 1600 × 1200, card 960 × 600, overviews 1600 × 1200). Images carry width and height to avoid layout shift.

## Phase 1C: Christmas Church Media Pack case study (November 25, 2026)

Owner-approved and pushed to the PR #4 Preview only. Role, AI-assisted production and creative objective use the owner's approved wording. Production tools (ChatGPT, Claude) are shown separately from compatibility testing tools (ProPresenter 22, Canva).

- Published **Christmas Church Media Pack** in Real Projects, with a case-study page at `/projects/christmas-church-media-pack`: overview and contents, creative objective, my role, AI-assisted production disclosure, software and testing (ProPresenter 22 on Windows, Canva; other apps not tested), finished product previews, and Etsy and Gumroad purchase links. Facts come from the Passive Income & Content Handoff.
- Media are actual product footage: `RTAnimation_Christmas_Vertical_v3.mp4` from Drive (recorded in ProPresenter from the pack files) and three frames cut from it. No generated replacement artwork.
- New: `src/pages/CaseStudy.jsx`, route `/projects/:slug` (unpublished or case-study-less slugs show the 404 page), and a `caseStudy` field in `src/data/projects.js`. Case-study pages use the Portfolio page style and highlight Portfolio in the nav.
- Projects with a case study open their page from the card; the lightbox also links to it.
- The other three featured projects stay unpublished.

## Phase 1B owner decisions (November 25, 2026)

Applied after owner review; pushed to the PR #4 Preview only with owner approval.

- "Sonic — Product Visualization" renamed **Resonance — Product Visualization** (data, slug, and the title baked into the concept board). The card now uses a crop without baked text.
- On Air board (and the matching thumbnails on the Showreel board): social handle changed to **@rtanimateofficial**, sample presenter changed to **Speaker Name / Title**, and the non-official swoosh RT monogram removed.
- Official logo recorded as the **geometric ivory RT. mark with the gold dot**. The Gemini logo-reveal clip used a serif RT, so it was removed from Identity in Motion (`identity-in-motion.preview.mp4` deleted).
- Concept role wording approved: "Concept direction. Preview visuals generated with Google Gemini."
- Home mascot now has a visible caption: "RT.Animation mascot. AI-assisted character design under owner creative direction." Chip text changed from "Same guy, two styles" to "One character, two styles".
- The four featured projects stay unpublished.

## Phase 1B: content and asset integration (same branch, November 25, 2026)

### Added
- Six Gemini-assisted concepts in **Concepts & Explorations**, published with Concept preview badges, AI disclosure and "Google Gemini" as the only tool: Identity in Motion, Words in Motion, Sonic — Product Visualization (later renamed Resonance), Beyond the Frame, On Air — Motion Identity, RT.Animation — Creative Showreel. Summaries follow the descriptions on the Gemini concept boards; no animation software is claimed.
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
