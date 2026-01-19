// src/data/projects.js (CRA / Webpack)
// Auto-maps images + optional blur + optional video previews via require.context

const meta = [
  {
    slug: "01UnboxTheJourney",
    title: "Unbox: The Journey of an Idea",
    description:
      "A curated selection of my latest motion design and traditional 2D animation work, combining frame-by-frame charm with modern techniques.",
    tech: ["After Effects", "Photoshop", "Traditional 2D"],
  },
  {
    slug: "02SignalSync",
    title: "Signal Sync",
    description:
      "An animated breakdown showcasing custom rig setups for expressive characters used in short films and game prototypes.",
    tech: ["Adobe Animate", "Illustrator", "Rigging"],
  },
  {
    slug: "03FramebyFrame",
    title: "Frame by Frame: The Loop Within",
    description:
      "Experimental VJ visuals built using beat detection and animated loops inspired by frame-by-frame timing principles.",
    tech: ["After Effects", "Cinema 4D", "Sound Design"],
  },
  {
    slug: "04IdleSpark",
    title: "Idle Spark",
    description:
      "A traditional frame-by-frame animated logo intro using rough passes and onion-skinning.",
    tech: ["Photoshop", "After Effects", "Hand Drawn"],
  },
  {
    slug: "05ElliesVille",
    title: "Ellies Ville: A Pastry Tale",
    description:
      "A side-by-side animation sequence showing storyboard panels transforming into full-motion animation.",
    tech: ["Storyboarding", "After Effects", "Photoshop"],
  },
  {
    slug: "06DigitalGhosts",
    title: "Digital Ghosts",
    description:
      "Micro-interactions and motion elements crafted for mobile apps and animated web components.",
    tech: ["Figma", "After Effects", "React.js"],
  },
  {
    slug: "07StylustheSword",
    title: "The Stylus and the Sword",
    description:
      "A loopable character morph animation from sketch to final design, ideal for idle game characters.",
    tech: ["Animate", "Illustrator", "GIF"],
  },
  {
    slug: "08MatchaVerse",
    title: "MatchaVerse: The Ritual Reimagined",
    description:
      "An opening title animation with frame-by-frame effects and layered music syncing.",
    tech: ["After Effects", "Audition", "Title Design"],
  },
  {
    slug: "09Looped",
    title: "Looped",
    description:
      "A funny, fast-paced chibi-style battle scene with exaggerated squash & stretch motion.",
    tech: ["Photoshop", "Animate", "Frame Timing"],
  },
];

// Load assets from src/assets/projects
const imagesCtx = require.context("../assets/projects", false, /\.(png|jpe?g|webp)$/i);
const blursCtx = require.context("../assets/projects", false, /\.blur\.(png|jpe?g|webp)$/i);
const videosCtx = require.context("../assets/projects", false, /\.preview\.(webm|mp4)$/i);

function tryGet(ctx, filename) {
  try {
    return ctx(`./${filename}`);
  } catch {
    return null;
  }
}

function getVideo(slug) {
  // prefer webm, fallback mp4
  return (
    tryGet(videosCtx, `${slug}.preview.webm`) ||
    tryGet(videosCtx, `${slug}.preview.mp4`) ||
    null
  );
}

const projects = meta.map((p) => ({
  ...p,
  image:
    tryGet(imagesCtx, `${p.slug}.png`) ||
    tryGet(imagesCtx, `${p.slug}.jpg`) ||
    tryGet(imagesCtx, `${p.slug}.jpeg`) ||
    tryGet(imagesCtx, `${p.slug}.webp`) ||
    null,
  blur:
    tryGet(blursCtx, `${p.slug}.blur.jpg`) ||
    tryGet(blursCtx, `${p.slug}.blur.jpeg`) ||
    tryGet(blursCtx, `${p.slug}.blur.png`) ||
    tryGet(blursCtx, `${p.slug}.blur.webp`) ||
    null,
  preview: getVideo(p.slug),
}));

export default projects;
