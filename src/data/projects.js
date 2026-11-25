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

// FEATURED PROJECTS (Website & Portfolio Handoff, Nov 25, 2026).
// Unpublished until the owner confirms role, tools, status and supplies source media.
const featured = [
  {
    slug: 'rt-animation-brand-identity',
    title: 'RT.Animation Brand Identity',
    status: 'in-development',
    published: false,
    summary: 'The RT.Animation identity: the geometric ivory RT. mark with the gold dot, profile icon, banner and mascot (AI-assisted character design under owner creative direction).',
    role: 'OWNER TO CONFIRM',
    tools: ['Illustrator'], // owner reported Illustrator assembly; confirm full tool list
    aiAssisted: true,
    visual: 'final',
  },
  // Case study built from the Passive Income & Content Handoff (Nov 25, 2026).
  // Media: Etsy_Main_Photo_v2.png (approved Etsy main photo; an illustrative display mockup, labeled
  // as such), Overview_Backgrounds_and_Titles.png and Overview_Social_Stills.png (renders of the
  // actual pack files), the RT.Animation promo video (RTAnimation_Christmas_Vertical_v3.mp4, recorded
  // in ProPresenter) and two frames cut from it. No generated replacement art.
  {
    slug: 'christmas-church-media-pack',
    title: 'Christmas Church Media Pack',
    status: 'real',
    published: true,
    summary: 'A ready-to-use set of countdowns, motion backgrounds, title screens and lower thirds for Christmas church services. On sale on Etsy and Gumroad.',
    role: 'Product concept, creative direction, branding, production review, compatibility testing, promotional screen recording and digital storefront management.', // owner-approved
    tools: ['ChatGPT', 'Claude'], // production tools
    testedWith: ['ProPresenter 22', 'Canva'], // compatibility testing tools
    aiAssisted: true,
    visual: 'final',
    imageAlt: 'Display mockup of the Christmas Church Media Pack countdown on a church screen and a phone',
    visualNote: 'Cover image is a display mockup; the screen designs are from the pack.',
    caseStudy: {
      cover: {
        caption: 'Display mockup: an illustrative scene showing the pack\u2019s 5-minute countdown on a church screen and a social still on a phone. The screen designs are from the pack; the room and devices are not.',
      },
      overview: [
        'A digital download for church media teams: 34 files in one navy-and-gold design, all at 1920 × 1080.',
        'It was published on Etsy on November 13, 2026 and is also sold on Gumroad.',
      ],
      contents: [
        '2 countdowns (5 minutes and 1 minute) that hold on 00:00',
        '4 seamless, text-free motion loops (24 seconds) with 4 matching stills',
        '8 title screens: Welcome, Merry Christmas, Christmas Eve Service, Announcements, Giving, Prayer, Message, Closing',
        '3 lower thirds (Speaker, Scripture, Announcement) as transparent PNGs and editable SVGs',
        '8 text-free social stills, square and vertical',
        'A START_HERE guide and a single-organization license',
      ],
      formats: 'H.264 MP4 at 24 fps (silent), PNG and SVG. Fonts: Cormorant Garamond and DM Sans (SIL Open Font License).',
      // Owner-approved wording (November 25, 2026).
      objective:
        'Provide church media teams and volunteers with a consistent collection of Christmas service graphics that are easy to integrate into presentation software.',
      role: 'Product concept, creative direction, branding, production review, compatibility testing, promotional screen recording and digital storefront management.',
      aiDisclosure:
        'Artwork and production scripts were generated with ChatGPT under my creative direction. Claude assisted with technical review, quality control and corrections.',
      testing: [
        'Tested in ProPresenter 22 on Windows (November 2026).',
        'Tested in Canva (November 23, 2026): all test files uploaded, including the SVG; in Present mode the 1-minute countdown stopped and held on 00:00; the Star Light loop ran past its 24-second point with no visible jump; the PNG and SVG lower thirds displayed correctly.',
        'Other applications have not been tested.',
      ],
      overviews: [
        { file: 'overview-titles', caption: 'The four text-free motion backgrounds with matching stills, and the eight title screens.' },
        { file: 'overview-social', caption: 'The eight text-free social stills, in square (1080 × 1080) and vertical (1080 × 1920).' },
      ],
      previews: [
        { file: 'inuse-countdown', caption: 'Countdown: a pack countdown playing in ProPresenter, with a close-up of the timer.' },
        { file: 'inuse-lowerthird', caption: 'Lower third: the Speaker lower third over a loop. "Example speaker" is sample text.' },
      ],
      previewNote: 'Frames from the RT.Animation promo video, recorded in ProPresenter from the actual pack files.',
      video: 'promo',
      videoPoster: 'inuse-countdown',
      links: [
        { label: 'Buy on Gumroad', href: 'https://animatrix186.gumroad.com/l/christmas-church-media-pack' },
        { label: 'Buy on Etsy', href: 'https://www.etsy.com/listing/4616209245/christmas-church-media-pack-with' },
      ],
    },
  },
  {
    slug: 'countdown-builder',
    title: 'Countdown Builder',
    status: 'in-development',
    published: false,
    summary: 'An After Effects script that builds countdown timers from a few settings.',
    role: 'OWNER TO CONFIRM',
    tools: ['After Effects'], // OWNER TO CONFIRM
    aiAssisted: true,
    visual: 'work-in-progress',
  },
  {
    slug: 'raf-and-tre',
    title: 'Raf & Tre',
    status: 'in-development',
    published: false,
    summary: 'An original animated project in development.',
    role: 'OWNER TO CONFIRM',
    tools: [], // OWNER TO CONFIRM
    aiAssisted: false, // OWNER TO CONFIRM
    visual: 'work-in-progress',
  },
];

// Official logo: the geometric ivory RT. mark with the gold dot. Do not use the serif RT or RTA
// monograms in site assets (the Gemini logo-reveal clip used a serif RT, so it is not included).
//
// CONCEPTS & EXPLORATIONS. Gemini-assisted concept previews, not finished or client work.
// Summaries follow the descriptions on the Gemini concept boards. Tools list only what was
// actually used to make the preview visuals; no animation software is claimed.
const CONCEPT = {
  status: 'concept',
  published: true,
  role: 'Concept direction. Preview visuals generated with Google Gemini.', // owner-approved wording
  tools: ['Google Gemini'],
  aiAssisted: true,
  visual: 'ai-concept',
};

const concepts = [
  {
    ...CONCEPT,
    slug: 'identity-in-motion',
    title: 'Identity in Motion',
    summary: 'A planned 5-second logo reveal that takes the RT. mark apart and reassembles it with light and particles.',
  },
  {
    ...CONCEPT,
    slug: 'words-in-motion',
    title: 'Words in Motion',
    summary: 'A planned 5-second kinetic typography piece built around the tagline “Bringing Ideas to Motion”.',
  },
  {
    ...CONCEPT,
    slug: 'resonance-product-visualization',
    title: 'Resonance — Product Visualization',
    summary: 'A planned 10-second product spot for a pair of headphones, focused on materials, detail and smooth camera moves.',
  },
  {
    ...CONCEPT,
    slug: 'beyond-the-frame',
    title: 'Beyond the Frame',
    summary: 'A planned 15-second character animation about breaking through limits, with a runner bursting out of a frame.',
  },
  {
    ...CONCEPT,
    slug: 'on-air-motion-identity',
    title: 'On Air — Motion Identity',
    summary: 'A broadcast graphics package concept: logo bug, lower third, transitions and an end card for live and recorded video.',
  },
  {
    ...CONCEPT,
    slug: 'creative-showreel',
    title: 'RT.Animation — Creative Showreel',
    summary: 'A planned 60-second showreel. The board shows the intended layout; it will be cut from finished work once that work exists.',
  },
];

const meta = [...featured, ...concepts];

// Load assets from src/assets/projects (the folder may be empty).
const imagesCtx = require.context('../assets/projects', false, /\.(png|jpe?g|webp)$/i);
const videosCtx = require.context('../assets/projects', false, /\.preview\.(webm|mp4)$/i);
const mediaCtx = require.context('../assets/projects', false, /\.(webp|png|jpe?g|mp4|webm)$/i);

function tryGet(ctx, filename) {
  try {
    return ctx(`./${filename}`);
  } catch {
    return null;
  }
}

const firstOf = (ctx, slug, exts) => exts.map((e) => tryGet(ctx, `${slug}${e}`)).find(Boolean) || null;

const resolveMedia = (slug, list) =>
  (list || [])
    .map((g) => ({ ...g, src: firstOf(mediaCtx, `${slug}.${g.file}`, ['.webp', '.png', '.jpg']) }))
    .filter((g) => g.src);

const projects = meta
  .filter((p) => p.published)
  .map((p) => ({
    ...p,
    tools: p.tools || [],
    image: firstOf(imagesCtx, p.slug, ['.webp', '.png', '.jpg', '.jpeg']),
    thumb: firstOf(imagesCtx, p.slug, ['.card.webp']),
    blur: firstOf(imagesCtx, p.slug, ['.blur.webp', '.blur.png', '.blur.jpg']),
    preview: firstOf(videosCtx, p.slug, ['.preview.webm', '.preview.mp4']),
    visualNote: p.visualNote ?? VISUAL_SOURCES[p.visual] ?? null,
    caseStudy: p.caseStudy
      ? {
          ...p.caseStudy,
          previews: resolveMedia(p.slug, p.caseStudy.previews),
          overviews: resolveMedia(p.slug, p.caseStudy.overviews),
          videoPoster: p.caseStudy.videoPoster ? firstOf(mediaCtx, `${p.slug}.${p.caseStudy.videoPoster}`, ['.webp', '.png', '.jpg']) : null,
          video: p.caseStudy.video ? firstOf(mediaCtx, `${p.slug}.${p.caseStudy.video}`, ['.mp4', '.webm']) : null,
        }
      : null,
  }));

export const findProject = (slug) => projects.find((p) => p.slug === slug) || null;

export const realProjects = projects.filter((p) => p.status === 'real');
export const conceptProjects = projects.filter((p) => p.status === 'concept' || p.status === 'in-development');

export default projects;
