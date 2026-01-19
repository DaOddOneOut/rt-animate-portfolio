// src/components/ProjectCard.jsx
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, image, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-[#2a2a2a] p-4 rounded-xl shadow-md hover:shadow-lg transition"
      whileHover={{
        rotateX: 8,
        rotateY: -4,
        scale: 1.03,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
    >
      <div className="overflow-hidden rounded-lg mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold text-ink dark:text-parchment mb-1">{title}</h3>
      <p className="text-sm text-graphite dark:text-gray-300">{description}</p>
    </motion.a>
  );
}
