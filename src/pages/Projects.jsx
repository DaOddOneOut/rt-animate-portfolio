// src/pages/Projects.jsx
import { Helmet } from 'react-helmet';
import ProjectsGallery from '../components/ProjectsGallery';

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Helmet>
        <title>RT.Animation | Projects</title>
        <meta
          name="description"
          content="Explore Rich’s animated works — from rigged characters to sound-reactive visuals and frame-by-frame storytelling."
        />
      </Helmet>
      <ProjectsGallery />
    </div>
  );
}
