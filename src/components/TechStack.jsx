import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Layers, Database, Settings, Atom } from 'lucide-react';
import { techCategories } from '../data/technologies';

const categoryIcons = {
  Code2, Brain, Layers, Database, Settings, Atom,
};

// Flatten all techs with their category info for filtering
const allTechsFlat = techCategories.flatMap(cat =>
  cat.technologies.map(tech => ({ ...tech, categoryId: cat.id }))
);

const filterTabs = [
  { id: 'all', label: 'All' },
  ...techCategories.map(cat => ({ id: cat.id, label: cat.label })),
];

function TechCard({ tech, index, inView }) {
  const [imgError, setImgError] = useState(false);
  // Prominent alternating entrance: left side (-80px) and right side (+80px)
  const isLeft = index % 2 === 0;
  const xOffset = isLeft ? -80 : 80;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: xOffset, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: xOffset, y: 20 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: Math.min((index % 6) * 0.08, 0.5),
        ease: [0.25, 1, 0.5, 1],
      }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="group flex flex-col items-center gap-2.5 p-4 rounded-xl cursor-default transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{ background: 'var(--bg-tertiary)' }}
      >
        {tech.icon && !imgError ? (
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-7 h-7 object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-2xl" role="img" aria-label={tech.name}>
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

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? allTechsFlat
    : allTechsFlat.filter(t => t.categoryId === activeCategory);

  // Current category accent color for the header badge
  const activeCat = techCategories.find(c => c.id === activeCategory);
  const ActiveIcon = activeCat ? categoryIcons[activeCat.icon] || Code2 : null;

  return (
    <section id="tech" className="section-padding" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="tech-heading">
      <div className="section-container" ref={ref}>
        <div className="space-y-10">
          {/* Header - Slides in from Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-center"
          >
            <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">Tech Stack</p>
            <h2 id="tech-heading" className="section-title">Technologies I Work With</h2>
            <p className="section-subtitle mt-3 max-w-lg mx-auto">
              From machine learning to quantum circuits — my toolkit spans multiple domains
            </p>
          </motion.div>

          {/* Category Filter Tabs - Slides in from Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Filter technologies by category"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const catData = techCategories.find(c => c.id === tab.id);
              const Icon = catData ? categoryIcons[catData.icon] : null;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  whileTap={{ scale: 0.95 }}
                  role="tab"
                  aria-selected={isActive}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                      : 'hover:text-primary-500 hover:border-primary-500/50'
                  }`}
                  style={!isActive ? {
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  } : {}}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Count badge */}
          <div className="flex items-center justify-center gap-2">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
            >
              {filtered.length} {filtered.length === 1 ? 'technology' : 'technologies'}
              {activeCategory !== 'all' && activeCat ? ` in ${activeCat.label}` : ' total'}
            </span>
          </div>

          {/* Tech Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((tech, index) => (
                <TechCard key={`${tech.categoryId}-${tech.name}`} tech={tech} index={index} inView={inView} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
