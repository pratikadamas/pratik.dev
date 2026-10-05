import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, Briefcase, Zap, GraduationCap, Award } from 'lucide-react';
import { achievements } from '../data/achievements';

const iconMap = {
  Trophy, Star, Briefcase, Zap, GraduationCap, Award,
};

const categoryColors = {
  Academic: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  Competitive: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  Experience: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
  Hackathon: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
  Research: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20' },
  default: { bg: 'bg-primary-500/10', text: 'text-primary-500', border: 'border-primary-500/20' },
};

function AchievementCard({ achievement, index }) {
  const Icon = iconMap[achievement.icon] || Star;
  const colors = categoryColors[achievement.category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`card p-5 flex gap-4 ${achievement.highlight ? 'ring-2 ring-primary-500/30' : ''}`}
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg} border ${colors.border}`}
      >
        <Icon className={`w-5 h-5 ${colors.text}`} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{achievement.title}</h3>
          <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>{achievement.date}</span>
        </div>
        <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{achievement.description}</p>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
          {achievement.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="section-padding" aria-labelledby="achievements-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">Recognition</p>
            <h2 id="achievements-heading" className="section-title">Achievements</h2>
            <p className="section-subtitle mt-3 max-w-lg mx-auto">
              Academic milestones, competitions, and experiences that shaped my journey
            </p>
          </div>

          {/* Instructions */}
          <div
            className="mb-8 p-4 rounded-xl text-sm text-center"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--text-secondary)' }}
          >
            ✏️ Update your achievements in <code className="font-mono text-xs">src/data/achievements.js</code>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {achievements.map((achievement, i) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
