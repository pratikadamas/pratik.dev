import { motion } from 'framer-motion';
import { ArrowDownRight, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { socialLinks } from '../data/achievements';

// Previous SVG icons for platforms
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.32-.049.449l-5.765 5.603 6.18 7.565c.05.1.065.239.035.378z"/>
  </svg>
);

const socialIconMap = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  leetcode: <LeetCodeIcon />,
  kaggle: <KaggleIcon />,
};

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

      <div className="section-container relative z-10 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Bio, Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 lg:col-span-8 order-2 md:order-1"
          >
            {/* Eyebrow & Status */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: 'var(--accent)' }}>
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
                <span>B.Tech CSE · Adamas University (2023–2027)</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-6" style={{ color: 'var(--text-primary)' }}>
              Building intelligent software systems, machine learning pipelines & data-driven platforms.
            </h1>

            {/* Domain Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>AI / ML</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>Full-Stack Development</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>Vector Search & Data Systems</span>
            </div>

            {/* Intro Description */}
            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-normal" style={{ color: 'var(--text-secondary)' }}>
              I am a Computer Science Engineering student focused on building performant, real-world software.
              My work spans computer vision systems, full-stack web platforms, and semantic vector search engines.
            </p>

            {/* Action CTAs & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
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

              {/* Previous Style Social Icons */}
              <div className="flex items-center gap-2.5 sm:ml-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 card"
                    style={{
                      color: social.color,
                    }}
                    aria-label={`Visit Pratik's ${social.name} profile`}
                    title={social.name}
                  >
                    {socialIconMap[social.id] || <ExternalLink className="w-5 h-5" />}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: User Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end order-1 md:order-2 group cursor-pointer"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              {/* Subtle ambient aura that brightens on hover */}
              <div
                className="absolute -inset-2.5 rounded-3xl opacity-40 group-hover:opacity-85 blur-2xl transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, var(--accent) 0%, rgba(6,182,212,0.4) 50%, transparent 70%)',
                }}
              />

              {/* Framed Card with hover border glow and shadow */}
              <div
                className="relative rounded-2xl overflow-hidden card p-1.5 transition-all duration-500 group-hover:border-[var(--accent)] group-hover:shadow-[0_12px_40px_rgba(52,211,153,0.22)]"
                style={{
                  borderColor: 'var(--border)',
                }}
              >
                <div className="rounded-xl overflow-hidden relative">
                  <img
                    src="/images/mypic.png"
                    alt="Pratik Giri — Adamas University"
                    className="w-full h-auto aspect-[3/4] object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-[1.03]"
                    loading="eager"
                  />

                  {/* Subtle Ambient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/40 via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
