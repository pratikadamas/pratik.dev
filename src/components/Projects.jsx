import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Filter } from 'lucide-react';
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
  PHP: 'bg-violet-500/10 text-violet-500',
  MySQL: 'bg-orange-500/10 text-orange-500',
  Qiskit: 'bg-primary-500/10 text-primary-500',
  default: 'bg-gray-500/10 text-gray-500',
};

function getTechColor(tech) {
  return techColors[tech] || techColors.default;
}

// Placeholder thumbnail based on category
function ProjectThumbnail({ project }) {
  const categoryBg = {
    'ai-ml': 'from-purple-500/20 to-violet-600/20',
    'full-stack': 'from-emerald-500/20 to-teal-600/20',
    'quantum': 'from-cyan-500/20 to-sky-600/20',
    'other': 'from-orange-500/20 to-amber-600/20',
  };

  const categoryIcon = {
    'ai-ml': '🤖',
    'full-stack': '🌐',
    'quantum': '⚛️',
    'other': '💻',
  };

  return (
    <div className={`w-full h-48 bg-gradient-to-br ${categoryBg[project.category] || 'from-gray-500/20 to-gray-600/20'} flex items-center justify-center`}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} thumbnail`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <span className="text-5xl" role="img" aria-label={project.category}>
            {categoryIcon[project.category] || '💻'}
          </span>
          <span className="text-xs font-mono font-medium px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
            {project.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card group overflow-hidden flex flex-col"
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
          <h3 className="text-base font-bold mb-1.5 group-hover:text-primary-500 transition-colors"
            style={{ color: 'var(--text-primary)' }}>
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
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary-500"
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
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-accent-500"
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
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding" aria-labelledby="projects-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">Projects</p>
            <h2 id="projects-heading" className="section-title">Things I've Built</h2>
            <p className="section-subtitle mt-3 max-w-lg mx-auto">
              Real-world projects spanning AI/ML, full-stack development, and quantum computing
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.95 }}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'hover:text-primary-500 hover:border-primary-500/50'
                }`}
                style={activeCategory !== cat.id ? {
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                } : {}}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: 'var(--text-tertiary)' }}>
              <p className="text-sm">No projects in this category yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
