// src/pages/Projects.jsx
import { Helmet } from 'react-helmet';
import ProjectsGallery from '../components/ProjectsGallery';
import { BRAND } from '../data/site';

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Helmet>
        <title>{`${BRAND} | Portfolio`}</title>
        <meta
          name="description"
          content="Rich’s animation and motion design portfolio: finished projects, plus concepts and work in development, each clearly labeled."
        />
      </Helmet>
      <ProjectsGallery />
    </div>
  );
}
