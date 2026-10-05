import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { socialLinks, contactInfo } from '../data/achievements';

// Minimal platform icons
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.32-.049.449l-5.765 5.603 6.18 7.565c.05.1.065.239.035.378z"/>
  </svg>
);

const socialIconMap = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  leetcode: <LeetCodeIcon />,
  kaggle: <KaggleIcon />,
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="contact-heading">
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
              <p className="section-eyebrow">INQUIRIES</p>
              <h2 id="contact-heading" className="section-title">Let's Connect</h2>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              [Available for 2026 roles]
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Direct Info & Social Links */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I am actively seeking software engineering positions, AI/ML research roles, and collaborative projects. Feel free to send an email or reach out on any platform below.
                </p>
              </div>

              {/* Prominent Email Box */}
              <div className="card p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                  <span>DIRECT EMAIL</span>
                  <span className="flex items-center gap-1.5 text-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-mono text-sm sm:text-base font-semibold truncate hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {contactInfo.email}
                  </a>

                  <button
                    onClick={copyEmail}
                    className="w-8 h-8 rounded flex items-center justify-center border transition-colors hover:bg-[var(--bg-tertiary)] flex-shrink-0"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Social Links Row / Grid */}
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                  Profiles & Repositories
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-3 flex items-center justify-between transition-colors hover:border-[var(--border-hover)]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {socialIconMap[social.id]}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                            {social.name}
                          </p>
                          <p className="font-mono text-[10px] truncate text-[var(--text-tertiary)]">
                            {social.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 text-[var(--text-tertiary)]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Editorial Contact Form */}
            <div className="lg:col-span-7">
              <div className="card p-6 sm:p-8">
                <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Send a Direct Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      01 / YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded border font-mono text-sm transition-colors outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      02 / EMAIL ADDRESS
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded border font-mono text-sm transition-colors outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      03 / MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={4}
                      placeholder="Discussing a role, project, or technical topic..."
                      className="w-full px-3.5 py-2.5 rounded border font-mono text-sm transition-colors outline-none resize-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  {submitted && (
                    <p className="font-mono text-xs text-[var(--accent)] text-center pt-2">
                      Message client opened. Thank you!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
