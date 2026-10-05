import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const focusAreas = [
  {
    index: '01',
    title: 'AI & Machine Learning',
    description:
      'Designing applied vision systems and predictive models using Python, PyTorch, YOLO, and OpenCV. Experienced in OCR pipelines and LLM-assisted analytics.',
  },
  {
    index: '02',
    title: 'Full-Stack Engineering',
    description:
      'Architecting responsive web applications with React, Node.js, FastAPI, and Flask. Strong emphasis on type safety, clean REST APIs, and database performance.',
  },
  {
    index: '03',
    title: 'Vector Databases & Data Engineering',
    description:
      'Implementing high-throughput data pipelines, semantic vector search with Pinecone and Qdrant, and in-memory analytical engines using DuckDB and Pandas for low-latency retrieval.',
  },
  {
    index: '04',
    title: 'Systems & Algorithmic Rigor',
    description:
      'Firm grounding in data structures, algorithms, and systems programming across C, Modern C++, and Java, backed by NPTEL Elite certifications from IIT Kharagpur.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="about-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="section-eyebrow">ABOUT</p>
              <h2 id="about-heading" className="section-title">Background & Core Focus</h2>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              [B.Tech CSE · 2023–2027]
            </p>
          </div>

          {/* Narrative Paragraph */}
          <div className="max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I am <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Pratik Giri</strong>, an engineer with an analytical approach to software development. Rather than viewing machine learning and software engineering in silos, I focus on the entire lifecycle — from data ingestion and algorithm design to reliable backend infrastructure and intuitive user interfaces.
            </p>
            <p>
              Whether deploying automated license plate recognition at the edge, building data intelligence tools, or architecting semantic vector search engines, my goal is always to deliver clean code, measurable performance, and robust architecture.
            </p>
          </div>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden border" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
            {focusAreas.map((area) => (
              <div
                key={area.index}
                className="p-6 sm:p-8 flex flex-col justify-between transition-colors"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-medium" style={{ color: 'var(--accent)' }}>
                    {area.index}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
