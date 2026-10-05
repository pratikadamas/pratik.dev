import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const focusAreas = [
  {
    index: '01',
    title: 'AI & Vision',
    description: 'Train smart models, spot objects in real time, and read text from images.',
    tags: ['YOLO', 'Vision', 'OCR', 'PyTorch'],
  },
  {
    index: '02',
    title: 'Full-Stack Web',
    description: 'Build quick, responsive websites and clean APIs that feel great to use.',
    tags: ['React', 'Node', 'FastAPI', 'REST'],
  },
  {
    index: '03',
    title: 'Data & Search',
    description: 'Set up fast search engines and smooth data flow for instant lookup.',
    tags: ['Pinecone', 'Qdrant', 'DuckDB', 'Pandas'],
  },
  {
    index: '04',
    title: 'Core CS & Logic',
    description: 'Solid base in data structures, algorithms, and clean logic in C++ and Java.',
    tags: ['DSA', 'C++', 'Java', 'IIT Elite'],
  },
];

// Small ambient words for subtle background watermark
const backgroundKeywords = [
  'code', 'build', 'ship', 'fast', 'clean', 'learn', 'scale', 'logic', 'ai', 'web', 'data', 'core'
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section 
      id="about" 
      className="section-padding border-b relative overflow-hidden" 
      style={{ borderColor: 'var(--border)' }} 
      aria-labelledby="about-heading"
    >
      {/* Subtle small words floating in the background watermark */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.035] dark:opacity-[0.05] flex flex-wrap gap-x-12 gap-y-8 items-center justify-around font-mono text-xs sm:text-sm tracking-widest uppercase p-6"
        aria-hidden="true"
      >
        {backgroundKeywords.map((word, i) => (
          <span key={i} className="hover:text-[var(--accent)] transition-colors">
            {`// ${word}`}
          </span>
        ))}
      </div>

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="section-eyebrow">ABOUT ME</p>
              <h2 id="about-heading" className="section-title">Background & Core</h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Who I am, what I build, and how I work
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', background: 'var(--bg-card)' }}>
                B.Tech CSE · 2023–2027
              </span>
            </div>
          </div>

          {/* Narrative Paragraph - Simple, punchy, concise words */}
          <div className="max-w-3xl space-y-3.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I am <strong className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Pratik Giri</strong>. I write clean code and build fast, reliable software.
            </p>
            <p>
              I turn ideas into real tools — from smart computer vision and AI models to modern web platforms and fast vector search. 
              My focus is simple: write clean code, keep it fast, and ship things that work.
            </p>

            {/* Quick Core Highlights in small words */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {['Clean Code', 'Fast Web', 'Smart AI', 'Vector Search', 'Good APIs', 'IIT Elite'].map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                  style={{
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  ✓ {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas Grid with refined hover feedback */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden border shadow-sm" 
            style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}
          >
            {focusAreas.map((area) => (
              <div
                key={area.index}
                className="group p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:bg-[var(--bg-tertiary)]"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>
                      {area.index}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {area.description}
                  </p>
                </div>

                {/* Small words tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]/60">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
