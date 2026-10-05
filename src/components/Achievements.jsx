import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/achievements';

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="achievements" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="achievements-heading">
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
              <p className="section-eyebrow">RECOGNITION</p>
              <h2 id="achievements-heading" className="section-title">Milestones & Achievements</h2>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              [Verified competitions & honors]
            </p>
          </div>

          {/* Clean Timeline / List */}
          <div className="border rounded-xl divide-y overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
            {achievements.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 transition-colors hover:bg-[var(--bg-tertiary)] flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-8"
              >
                {/* Year & Category */}
                <div className="md:w-48 flex-shrink-0 flex items-center md:flex-col md:items-start gap-3 md:gap-1">
                  <span className="font-mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    {item.year}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-tertiary)',
                      background: 'var(--bg-tertiary)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-1.5">
                  <h3 className="text-base font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {item.issuer}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed font-normal pt-1" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
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
