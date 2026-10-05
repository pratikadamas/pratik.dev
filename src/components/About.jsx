import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Globe, Atom, Wrench } from 'lucide-react';

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

          {/* Main content: Bio and Interests */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div variants={itemVariants} className="space-y-10">
              {/* Bio */}
              <div className="space-y-6 text-center sm:text-left text-lg">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I'm <strong style={{ color: 'var(--text-primary)' }}>Pratik Giri</strong>, a final-year Computer Science Engineering student
                  with a deep passion for building intelligent systems and scalable software. I thrive at the
                  intersection of <strong style={{ color: 'var(--text-primary)' }}>Artificial Intelligence</strong>,{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Full-Stack Development</strong>, and{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Quantum Computing</strong>.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I approach problems with both engineering rigor and research curiosity — whether it's designing
                  a real-time license plate recognition system, building an AI-powered data analysis platform,
                  or exploring quantum circuit transpilation.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I believe great software requires deep technical understanding, clean architecture,
                  and a relentless focus on user experience.
                </p>
              </div>

              {/* Interests */}
              <div className="pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-center sm:text-left text-xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>What I'm Interested In</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <motion.div
                        key={interest.label}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="card p-5 flex flex-col items-center text-center gap-4 cursor-default group transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                          <Icon className={`w-6 h-6 ${interest.color}`} aria-hidden="true" />
                        </div>
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{interest.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
