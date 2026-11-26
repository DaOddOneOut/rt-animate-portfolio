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
  // Case study built from the Brand Asset Register v1.1, the Branding & Social Media Handoff,
  // TEST 008 and owner-supplied files (Nov 26, 2026). Only verified facts; items marked
  // OWNER TO APPROVE are draft wording awaiting the owner's sign-off.
  {
    slug: 'rt-animation-brand-identity',
    title: 'RT.Animation Brand Identity',
    status: 'real',
    published: true,
    summary: 'The visual identity for RT.Animation: the RT. mark, a recurring mascot, a navy, ivory and gold palette, and the banners and icons used across social channels and email.',
    role: 'Brand concept and creative direction, direction of AI-assisted artwork, Illustrator assembly of the Facebook banner, and rollout across the RT.Animation channels.', // OWNER TO APPROVE
    tools: ['Adobe Illustrator', 'AI image tools'], // Illustrator verified from RT_Banner.ai; specific AI tools not documented
    aiAssisted: true,
    visual: 'final',
    imageAlt: 'RT.Animation Facebook banner with the wordmark, tagline, mascot and RT. mark',
    caseStudy: {
      tagline: 'Bringing Ideas to Motion.',
      cover: {
        caption: 'Facebook banner (2172 × 724), assembled in Adobe Illustrator and in use on the RT.Animation Facebook page.',
      },
      blocks: [
        {
          id: 'overview',
          title: 'Brand overview',
          text: [
            'RT.Animation is my independent animation and design studio name, with the tagline “Bringing Ideas to Motion.” It covers three areas of work: animation, motion graphics and digital design.',
            'The identity runs across rtanimate.com, the business email social@rtanimate.com, the RT.Animation Facebook and TikTok pages, the YouTube channel @rtanimateofficial, and my digital products.',
          ],
        },
        {
          id: 'objective',
          title: 'Creative objective',
          // OWNER TO APPROVE
          text: ['Create one recognizable, consistent identity that works at every size, from a small profile icon to a wide banner, and carries across the website, social channels, email and products.'],
        },
        {
          id: 'logo',
          title: 'The official RT. mark',
          text: ['The official logo is the geometric ivory RT. mark with a gold dot, shown on midnight navy. The dot also closes the RT.Animation wordmark.'],
          figures: [
            { file: 'logo-mark', caption: 'Official RT. mark: ivory letters with the gold dot, on midnight navy.', wide: true },
            { file: 'email-logo', caption: 'Square email logo (240 × 240) used with social@rtanimate.com.', small: true },
          ],
        },
        {
          id: 'mascot',
          title: 'Mascot',
          text: [
            'The RT.Animation mascot is a character with short locks, glasses and a goatee, wearing a black hoodie, a blue shirt and headphones that carry the RT. mark. He appears on the banners alongside the logo.',
          ],
          note: 'AI-assisted character design under owner creative direction.',
          figures: [{ file: 'mascot', caption: 'The RT.Animation mascot, shown on midnight navy.' }],
        },
        {
          id: 'palette',
          title: 'Color palette and typography',
          swatches: [
            { hex: '#0C1729', name: 'Midnight navy' },
            { hex: '#142B40', name: 'Deep blue' },
            { hex: '#213A50', name: 'Slate blue' },
            { hex: '#F3EBDD', name: 'Ivory' },
            { hex: '#D5B16B', name: 'Muted gold' },
            { hex: '#F4C578', name: 'Light gold' },
          ],
          swatchNote: 'Working palette from the Brand Asset Register, matched to the approved artwork.',
          type: [
            { font: 'Arial Bold', use: 'RT.Animation wordmark on the Facebook banner', weight: 700, style: 'normal' },
            { font: 'Arial Bold Italic', use: 'Tagline “Bringing Ideas to Motion.”', weight: 700, style: 'italic' },
            { font: 'Arial', use: 'Services line and web address', weight: 400, style: 'normal' },
          ],
          typeNote: 'Fonts verified from the embedded fonts in the Illustrator banner file (RT_Banner.ai).',
        },
        {
          id: 'social',
          title: 'Social media applications',
          figures: [
            { file: 'profile-icon', caption: 'Circular gold-rimmed profile icon, in use on RT.Animation social profiles.', small: true },
            { file: 'youtube-concept', caption: 'YouTube banner concept (AI-generated). Final export and crop not yet confirmed, so it is shown here as a concept.', badge: 'Concept', wide: true },
          ],
        },
        {
          id: 'role',
          title: 'My role and tools',
          role: true,
          text: ['Adobe Illustrator 27.4 (Windows) is verified as the design tool for the Facebook banner master file. AI image tools were used for parts of the artwork; I directed the work and assembled the final pieces.'],
        },
        {
          id: 'assets',
          title: 'Approved artwork and source files',
          list: [
            'RT. mark, ivory and gold (transparent PNG, 1962 × 802): approved, in use.',
            'Square email logo (240 × 240): in use with social@rtanimate.com.',
            'Circular gold-rimmed profile icon (1254 × 1254): in use on social profiles.',
            'Mascot (transparent PNG, 1122 × 1402): in use on the banners.',
            'Facebook banner (PNG export, 2172 × 724) and its Illustrator master RT_Banner.ai (Illustrator 27.4, 13 layers): in use.',
            'YouTube banner (1672 × 941): concept; final export and crop to be confirmed.',
          ],
        },
      ],
      aiDisclosure: 'Parts of this identity, including the mascot and the YouTube banner concept, were made with AI image tools under my creative direction. I assembled the Facebook banner in Adobe Illustrator.', // OWNER TO APPROVE
      linksTitle: 'Find RT.Animation',
      links: [
        { label: 'Visit RT.Animation on YouTube', href: 'https://www.youtube.com/@rtanimateofficial' },
      ],
    },
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
          blocks: p.caseStudy.blocks?.length
            ? p.caseStudy.blocks.map((bl) => ({ ...bl, figures: resolveMedia(p.slug, bl.figures) }))
            : null,
          videoPoster: p.caseStudy.videoPoster ? firstOf(mediaCtx, `${p.slug}.${p.caseStudy.videoPoster}`, ['.webp', '.png', '.jpg']) : null,
          video: p.caseStudy.video ? firstOf(mediaCtx, `${p.slug}.${p.caseStudy.video}`, ['.mp4', '.webm']) : null,
        }
      : null,
  }));

export const findProject = (slug) => projects.find((p) => p.slug === slug) || null;

export const realProjects = projects.filter((p) => p.status === 'real');
export const conceptProjects = projects.filter((p) => p.status === 'concept' || p.status === 'in-development');

export default projects;
