// src/pages/About.jsx
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import skills from '../data/skills';

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 sm:px-6 lg:px-8 text-ink overflow-hidden">

      <Helmet>
        <title>RT.Animation | About Rich</title>
        <meta name="description" content="Learn about Rich’s background in motion design, traditional animation, and creative storytelling." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-6xl z-10 text-ink dark:text-white"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-sketchPurple mb-6 text-shadow text-center">
          About Me
        </h2>

        <p className="text-graphite dark:text-gray-200 mb-4 leading-relaxed text-shadow text-center sm:text-left">
          I’m Rich, a multidisciplinary animator and motion graphics designer based in NYC. With a background in illustration, 3D, and branding, I transform concepts into visually dynamic experiences.
        </p>
        <p className="text-graphite dark:text-gray-200 mb-8 leading-relaxed text-shadow text-center sm:text-left">
          Whether I’m designing title sequences, animating character rigs, or crafting traditional frame-by-frame loops — storytelling is always at the core.
        </p>

        <h3 className="text-2xl font-semibold text-ink dark:text-white mb-6 text-shadow text-center sm:text-left">Skills</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white/70 dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="font-medium text-ink dark:text-white">{skill.name}</span>
                </div>
                <span className="text-sm text-graphite dark:text-gray-300">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-4 rounded-full bg-sketchPurple"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/Rich-Resume.pdf"
            download
            className="bg-graphite text-white px-6 py-3 rounded-md hover:bg-ink transition-all duration-300 shadow-md"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}
