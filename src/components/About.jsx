import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Star, Brain, Globe, Atom, Wrench } from 'lucide-react';
import { stats } from '../data/certificates';
import { timeline } from '../data/achievements';

const iconMap = {
  Rocket: Rocket,
  Code2: Code2,
  Award: Star,
  Github: Globe,
  GraduationCap: GraduationCap,
  Star: Star,
  Brain: Brain,
  Atom: Atom,
  Wrench: Wrench,
};

const interests = [
  { icon: Brain, label: 'Artificial Intelligence & ML', color: 'text-purple-500' },
  { icon: Globe, label: 'Full-Stack Development', color: 'text-emerald-500' },
  { icon: Atom, label: 'Quantum Computing', color: 'text-cyan-500' },
  { icon: Wrench, label: 'Software Engineering', color: 'text-orange-500' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function StatCard({ stat, index }) {
  const Icon = iconMap[stat.icon] || Star;
  return (
    <motion.div
      variants={itemVariants}
      className="card p-5 flex flex-col items-center text-center gap-2 hover:-translate-y-1"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
        style={{ background: 'rgba(99, 102, 241, 0.1)' }}
      >
        <Icon className="w-5 h-5 text-primary-500" aria-hidden="true" />
      </div>
      <span className="text-2xl font-bold gradient-text">{stat.value}</span>
      <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
    </motion.div>
  );
}

function TimelineItem({ item, index, isLast }) {
  const iconMap2 = {
    GraduationCap, Code2, Rocket, Star,
  };
  const Icon = iconMap2[item.icon] || Star;

  const typeColors = {
    education: 'bg-blue-500',
    skill: 'bg-emerald-500',
    project: 'bg-purple-500',
    current: 'bg-primary-500',
  };

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[item.type] || 'bg-primary-500'}`}>
          <Icon className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        {!isLast && <div className="w-px flex-1 mt-2" style={{ background: 'var(--border)' }} />}
      </div>

      {/* Content */}
      <div className={`pb-${isLast ? '0' : '8'} pt-1`}>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >
            {item.year}
          </span>
        </div>
        <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{item.description}</p>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">About Me</p>
            <h2 id="about-heading" className="section-title">Who I Am</h2>
            <p className="section-subtitle mt-3 max-w-xl mx-auto">
              A curious builder at the intersection of AI, software, and quantum computing
            </p>
          </motion.div>

          {/* Main content: left intro + right stats */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I'm <strong style={{ color: 'var(--text-primary)' }}>Pratik Giri</strong>, a final-year Computer Science Engineering student
                  with a deep passion for building intelligent systems and scalable software. I thrive at the
                  intersection of <strong style={{ color: 'var(--text-primary)' }}>Artificial Intelligence</strong>,{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Full-Stack Development</strong>, and{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Quantum Computing</strong>.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I approach problems with both engineering rigor and research curiosity — whether it's designing
                  a real-time license plate recognition system, building an AI-powered data analysis platform,
                  or exploring quantum circuit transpilation.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I believe great software requires deep technical understanding, clean architecture,
                  and a relentless focus on user experience.
                </p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>What I'm Interested In</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <motion.div
                        key={interest.label}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="card p-3.5 flex items-center gap-3 cursor-default group transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                          <Icon className={`w-4 h-4 ${interest.color}`} aria-hidden="true" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{interest.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: Stats + Timeline */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>By the Numbers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>My Journey</h3>
                <div className="space-y-0">
                  {timeline.map((item, i) => (
                    <motion.div key={item.year} variants={itemVariants}>
                      <TimelineItem item={item} index={i} isLast={i === timeline.length - 1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
