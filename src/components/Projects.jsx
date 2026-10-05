import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

// Color maps for tech tags
const techColors = {
  Python: 'bg-blue-500/10 text-blue-500',
  React: 'bg-cyan-500/10 text-cyan-500',
  Flask: 'bg-gray-500/10 text-gray-500',
  YOLO: 'bg-red-500/10 text-red-500',
  OpenCV: 'bg-green-500/10 text-green-500',
  EasyOCR: 'bg-purple-500/10 text-purple-500',
  FastAPI: 'bg-teal-500/10 text-teal-500',
  DuckDB: 'bg-yellow-500/10 text-yellow-600',
  Pandas: 'bg-indigo-500/10 text-indigo-500',
  'Tailwind CSS': 'bg-sky-500/10 text-sky-500',
  'Node.js': 'bg-green-500/10 text-green-600',
  MongoDB: 'bg-emerald-500/10 text-emerald-500',
  PHP: 'bg-violet-500/10 text-violet-400',
  MySQL: 'bg-orange-500/10 text-orange-400',
  Pinecone: 'bg-emerald-500/10 text-emerald-400',
  Qdrant: 'bg-teal-500/10 text-teal-400',
  Streamlit: 'bg-red-500/10 text-red-400',
  default: 'bg-gray-500/10 text-gray-400',
};

function getTechColor(tech) {
  return techColors[tech] || techColors.default;
}

// Placeholder thumbnail based on category
function ProjectThumbnail({ project }) {
  const categoryBg = {
    'ai-ml': 'from-purple-500/20 to-violet-600/20',
    'full-stack': 'from-emerald-500/20 to-teal-600/20',
    'other': 'from-orange-500/20 to-amber-600/20',
  };

  const categoryIcon = {
    'ai-ml': '🤖',
    'full-stack': '🌐',
    'other': '💻',
  };

  return (
    <div className={`w-full h-48 bg-gradient-to-br ${categoryBg[project.category] || 'from-gray-500/20 to-gray-600/20'} flex items-center justify-center overflow-hidden relative`}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} thumbnail`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-110">
          <span className="text-5xl" role="img" aria-label={project.category}>
            {categoryIcon[project.category] || '💻'}
          </span>
          <span
            className="text-xs font-mono font-medium px-3 py-1 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
          >
            {project.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, inView }) {
  // Alternating directional entrance for 1/2/3 column responsive grids
  // index % 2 === 0 from left (-80px), index % 2 === 1 from right (+80px)
  const isLeft = index % 2 === 0;
  const xOffset = isLeft ? -80 : 80;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: xOffset, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: xOffset, y: 20 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.12,
        ease: [0.25, 1, 0.5, 1],
      }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden flex flex-col transition-all duration-300"
      aria-label={`Project: ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden relative">
        <ProjectThumbnail project={project} />
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="tag text-[10px]">⭐ Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3
            className="text-base font-bold mb-1.5 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
        </div>

        {/* Tech tags — show max 4, with overflow count */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${getTechColor(tech)}`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}
            >
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding" aria-labelledby="projects-heading">
      <div className="section-container" ref={ref}>
        <div>
          {/* Header - Slides in from Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="section-eyebrow">Projects</p>
            <h2 id="projects-heading" className="section-title">Things I've Built</h2>
            <p className="section-subtitle mt-2 sm:mt-3 max-w-lg mx-auto">
              Real-world projects spanning AI/ML, intelligent data platforms, and full-stack development
            </p>
          </motion.div>

          {/* Filter tabs - Slides in from Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileTap={{ scale: 0.95 }}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 border ${isActive
                      ? 'shadow-md'
                      : 'hover:text-[var(--accent)]'
                    }`}
                  style={
                    isActive
                      ? {
                        backgroundColor: 'var(--text-primary)',
                        color: 'var(--bg-primary)',
                        borderColor: 'var(--text-primary)',
                      }
                      : {
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }
                  }
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} inView={inView} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: 'var(--text-tertiary)' }}>
              <p className="text-sm">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
