import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const techGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'],
  },
  {
    category: 'AI & Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'YOLO', 'Scikit-learn', 'Pandas', 'NumPy', 'EasyOCR'],
  },
  {
    category: 'Full-Stack Engineering',
    skills: ['React', 'Node.js', 'FastAPI', 'Flask', 'Express.js', 'Tailwind CSS', 'HTML5 / CSS3', 'REST APIs'],
  },
  {
    category: 'Databases & Storage',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DuckDB'],
  },
  {
    category: 'DevOps & Infrastructure',
    skills: ['Docker', 'Git', 'GitHub', 'Linux', 'AWS', 'Azure', 'Vercel'],
  },
  {
    category: 'Quantum Computing',
    skills: ['Qiskit', 'Quantum Circuits', 'Circuit Transpilation', 'Qubit Mapping', 'Linear Algebra'],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="tech" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="tech-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="section-eyebrow">TOOLKIT</p>
              <h2 id="tech-heading" className="section-title">Technical Competencies</h2>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              [Curated across software, ML & quantum]
            </p>
          </div>

          {/* Grouped Technical Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techGroups.map((group) => (
              <div
                key={group.category}
                className="card p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {group.category}
                    </h3>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      {group.skills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 rounded transition-colors border"
                        style={{
                          background: 'var(--bg-tertiary)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
