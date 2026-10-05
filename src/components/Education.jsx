import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, School, Target, Calendar, Award } from 'lucide-react';
import { educationData } from '../data/education';

const iconMap = {
  GraduationCap,
  Target,
  School,
  Award
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="education"
      className="section-padding border-b"
      style={{ borderColor: 'var(--border)' }}
      aria-labelledby="education-heading"
    >
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div>
              <p className="section-eyebrow">ACADEMIC &amp; QUALIFICATIONS</p>
              <h2 id="education-heading" className="section-title">Education &amp; Credentials</h2>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              [3 milestones · 2021 – 2027]
            </p>
          </div>

          {/* Compact 3-Column Grid (Shorter format, 3 to 5 lines per item) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {educationData.map((item, index) => {
              const Icon = iconMap[item.icon] || GraduationCap;
              const isAccent = item.isCurrent || item.id === 'gate';

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ y: -4 }}
                  className="card p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:border-[var(--accent)]"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  aria-label={`${item.degree} - ${item.institution}`}
                >
                  <div className="space-y-3.5">
                    {/* Line 1: Header Row with Icon, Status Pill & Score */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                          style={{
                            background: isAccent ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                            color: isAccent ? 'var(--accent)' : 'var(--text-secondary)',
                            borderColor: isAccent ? 'var(--accent-border)' : 'var(--border)',
                          }}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <span
                          className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-md border"
                          style={{
                            background: isAccent ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                            color: isAccent ? 'var(--accent)' : 'var(--text-secondary)',
                            borderColor: isAccent ? 'var(--accent-border)' : 'var(--border)',
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Prominent Score Pill */}
                      <span
                        className="text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-md border"
                        style={{
                          background: isAccent ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
                          color: isAccent ? 'var(--accent)' : 'var(--text-primary)',
                          borderColor: isAccent ? 'var(--accent-border)' : 'var(--border)',
                        }}
                      >
                        {item.score}
                      </span>
                    </div>

                    {/* Line 2: Degree / Qualification Name */}
                    <h3
                      className="text-sm sm:text-base font-bold leading-snug tracking-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.degree}
                    </h3>

                    {/* Line 3: Institution / Body */}
                    <p className="text-xs font-mono font-medium" style={{ color: 'var(--accent)' }}>
                      {item.institution}
                    </p>

                    {/* Line 4: Concise Summary (No long details) */}
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.summary}
                    </p>
                  </div>

                  {/* Line 5: Timeline & Stream Tag */}
                  <div
                    className="pt-3 mt-4 border-t flex items-center justify-between text-[11px] font-mono"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[var(--accent)]" aria-hidden="true" />
                      <span>{item.period}</span>
                    </span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded border bg-[var(--bg-tertiary)] border-[var(--border)] text-[var(--text-secondary)]">
                      {item.tag}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

