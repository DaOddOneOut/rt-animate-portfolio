// Footer.jsx
export default function Footer() {
  return (
    <footer className="shrink-0 bg-parchment dark:bg-[#1e1e1e] text-center text-sm text-ink dark:text-parchment py-4">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} RT.Animate. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sketchPurple transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sketchPurple transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.artstation.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sketchPurple transition-colors"
          >
            ArtStation
          </a>
        </div>
      </div>
    </footer>
  );
}
