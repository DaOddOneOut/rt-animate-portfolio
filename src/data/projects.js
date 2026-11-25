// src/data/projects.js (CRA / Webpack)
//
// Portfolio content lives here. Every entry must be honest about what it is.
// See README.md > "Adding portfolio items" for the full checklist.
//
// status       'real'            finished work the owner made or contributed to, with rights to show it
//              'concept'         an idea or pitch, shown only as a concept preview
//              'in-development'  real work that is not finished yet
// published    false keeps an entry out of the public site until the owner approves it.
// role         what Rich actually did on this project, in plain words (required for 'real').
// tools        software actually used. List only tools that were used on this project.
// visual       where the card image comes from. Pick one key from VISUAL_SOURCES below.
// style        optional; one of the 10 site styles (src/theme/styles.js) the piece leans on.
//
// Assets go in src/assets/projects/ and are found by slug:
//   <slug>.webp        full size, used in the lightbox
//   <slug>.card.webp   grid thumbnail (optional; falls back to <slug>.webp)
//   <slug>.blur.webp   tiny blurred placeholder (optional)
//   <slug>.preview.webm | .mp4   optional hover / lightbox clip

export const STATUS = {
  real: { label: 'Completed project' },
  'in-development': { label: 'In development' },
  concept: { label: 'Concept preview' },
};

// Shown on every card and in the lightbox so visitors always know what they are looking at.
export const VISUAL_SOURCES = {
  final: null, // the image is the real finished work; no extra note
  'work-in-progress': 'Work-in-progress frame. Not final artwork.',
  'ai-concept': 'Temporary AI-generated concept visual. Not final artwork and not client work.',
  mockup: 'Mockup for presentation. Not a live client deliverable.',
};

// Candidate entries from the Website & Portfolio Handoff (Nov 25, 2026).
// All are unpublished until the owner confirms role, tools, rights and media.
const meta = [
  {
    slug: 'rt-animation-identity',
    title: 'RT.Animation Identity',
    status: 'in-development',
    published: false,
    summary: 'Logo, profile icon and banner for the RT.Animation brand, with an animated logo reveal planned.',
    role: 'OWNER TO CONFIRM',
    tools: ['Illustrator'],
    aiAssisted: true,
    visual: 'work-in-progress',
  },
  {
    slug: 'christmas-church-media-pack',
    title: 'Christmas Church Media Pack',
    status: 'real',
    published: false,
    summary: 'Countdowns, loops and title graphics for church services, sold as a digital product.',
    role: 'OWNER TO CONFIRM',
    tools: ['After Effects'],
    aiAssisted: true,
    visual: 'final',
  },
  {
    slug: 'countdown-builder',
    title: 'Countdown Builder',
    status: 'in-development',
    published: false,
    summary: 'An After Effects script that builds countdown timers from a few settings.',
    role: 'OWNER TO CONFIRM',
    tools: ['After Effects', 'ExtendScript'],
    aiAssisted: true,
    visual: 'work-in-progress',
  },
  {
    slug: 'raf-and-tre',
    title: 'Raf & Tre',
    status: 'concept',
    published: false,
    summary: 'An original animated project in development.',
    role: 'OWNER TO CONFIRM',
    tools: [],
    aiAssisted: false,
    visual: 'ai-concept',
  },
];

// Load assets from src/assets/projects (the folder may be empty).
const imagesCtx = require.context('../assets/projects', false, /\.(png|jpe?g|webp)$/i);
const videosCtx = require.context('../assets/projects', false, /\.preview\.(webm|mp4)$/i);

function tryGet(ctx, filename) {
  try {
    return ctx(`./${filename}`);
  } catch {
    return null;
  }
}

const firstOf = (ctx, slug, exts) => exts.map((e) => tryGet(ctx, `${slug}${e}`)).find(Boolean) || null;

const projects = meta
  .filter((p) => p.published)
  .map((p) => ({
    ...p,
    tools: p.tools || [],
    image: firstOf(imagesCtx, p.slug, ['.webp', '.png', '.jpg', '.jpeg']),
    thumb: firstOf(imagesCtx, p.slug, ['.card.webp']),
    blur: firstOf(imagesCtx, p.slug, ['.blur.webp', '.blur.png', '.blur.jpg']),
    preview: firstOf(videosCtx, p.slug, ['.preview.webm', '.preview.mp4']),
    visualNote: VISUAL_SOURCES[p.visual] ?? null,
  }));

export const realProjects = projects.filter((p) => p.status === 'real');
export const conceptProjects = projects.filter((p) => p.status === 'concept' || p.status === 'in-development');

export default projects;
