import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Brain, Layers, Database, Settings, Atom } from 'lucide-react';
import { techCategories } from '../data/technologies';

const categoryIcons = {
  Code2, Brain, Layers, Database, Settings, Atom,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function TechCard({ tech }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex flex-col items-center gap-2 p-4 rounded-xl cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{ background: 'var(--bg-tertiary)' }}
      >
        {tech.icon && !imgError ? (
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-6 h-6 object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-xl" role="img" aria-label={tech.name}>
            {tech.emoji || '⚡'}
          </span>
        )}
      </div>

      {/* Name */}
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'var(--text-primary)' }}>
        {tech.name}
      </span>

      {/* Tag */}
      {tech.tag && (
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            color: 'var(--accent-primary)',
          }}
        >
          {tech.tag}
        </span>
      )}
    </motion.div>
  );
}

function CategorySection({ category, inView }) {
  const Icon = categoryIcons[category.icon] || Code2;

  return (
    <motion.div variants={itemVariants} className="space-y-4">
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} border ${category.borderColor}`}
        >
          <Icon className={`w-4 h-4 ${category.accentColor}`} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{category.label}</h3>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{category.technologies.length} technologies</p>
        </div>
      </div>

      {/* Tech cards grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {category.technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tech" className="section-padding" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="tech-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">Tech Stack</p>
            <h2 id="tech-heading" className="section-title">Technologies I Work With</h2>
            <p className="section-subtitle mt-3 max-w-lg mx-auto">
              From machine learning to quantum circuits — my toolkit spans multiple domains
            </p>
          </motion.div>

          {/* Categories */}
          <div className="grid md:grid-cols-2 gap-10">
            {techCategories.map((category) => (
              <CategorySection key={category.id} category={category} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
