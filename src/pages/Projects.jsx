// src/pages/Projects.jsx
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import ProjectsCarousel from "../components/ProjectsCarousel";

export default function Projects() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto text-ink">
      <Helmet>
        <title>RT.Animation | Projects</title>
        <meta
          name="description"
          content="Explore Rich’s animated works — from rigged characters to sound-reactive visuals and frame-by-frame storytelling."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="bg-white/80 dark:bg-black/60 backdrop-blur-lg rounded-xl p-6 shadow-md overflow-visible"
      >
        {/* ProjectsCarousel uses src/data/projects.js (auto-mapped assets) */}
        <ProjectsCarousel />
      </motion.div>
    </section>
  );
}
