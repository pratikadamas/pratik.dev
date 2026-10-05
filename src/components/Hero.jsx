import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Mail } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
      aria-label="Hero Introduction"
    >
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 technical-grid pointer-events-none" aria-hidden="true" />

      {/* Subtle radial falloff mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, var(--bg-primary) 95%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-24 sm:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--accent)' }}>
              PRATIK GIRI
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[var(--border)]" />
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono border"
              style={{
                background: 'var(--accent-subtle)',
                borderColor: 'var(--accent-border)',
                color: 'var(--text-secondary)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <span>Final-year CS Engineer</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] mb-6" style={{ color: 'var(--text-primary)' }}>
            Building intelligent software systems, machine learning pipelines & quantum algorithms.
          </h1>

          {/* Domain Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>AI / ML</span>
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>Full-Stack Development</span>
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>Quantum Computing</span>
          </div>

          {/* Intro Description */}
          <p className="text-sm sm:text-base leading-relaxed mb-10 max-w-2xl font-normal" style={{ color: 'var(--text-secondary)' }}>
            I am a Computer Science Engineering student focused on building performant, real-world software.
            My work spans computer vision systems, full-stack web platforms, and NISQ quantum circuit optimization.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="btn-primary"
            >
              <span>View Projects</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="btn-secondary"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Contact</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
