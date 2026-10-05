import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Mail, MapPin, Send, CheckCircle, Copy, Check } from 'lucide-react';
import { socialLinks, contactInfo } from '../data/achievements';

// Platform-specific previous style SVG icons
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

function SocialCard({ social }) {
  const Icon = socialIconMap[social.id] || <ExternalLink className="w-5 h-5" />;

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="card p-3.5 flex items-center gap-3 group transition-all duration-300 hover:border-[var(--border-hover)]"
      aria-label={`Visit ${social.name} profile`}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: `${social.color}15`,
          border: `1px solid ${social.color}30`,
          color: social.color,
        }}
      >
        {Icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{social.name}</p>
        <p className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>{social.handle}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'success'
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { name, email, message } = formState;

    // Mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    setStatus('success');
    setSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="contact-heading">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="section-eyebrow">Get In Touch</p>
            <h2 id="contact-heading" className="section-title">Let's Connect</h2>
            <p className="section-subtitle mt-2 sm:mt-3 max-w-lg mx-auto">
              Have a project in mind, opportunities to explore, or just want to chat about AI & tech? Reach out!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            {/* Left: Contact Info & Previous Style Social Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Contact Information</h3>
                <div className="space-y-3">
                  {/* Email Card with Copy button */}
                  <div
                    className="flex items-center justify-between p-4 rounded-xl card group transition-all duration-300"
                  >
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 min-w-0 flex-1"
                      aria-label={`Send email to ${contactInfo.email}`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                      >
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Email Me</p>
                        <p
                          className="text-sm font-bold truncate group-hover:text-[var(--accent)] transition-colors"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {contactInfo.email}
                        </p>
                      </div>
                    </a>

                    <button
                      onClick={copyEmail}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-[var(--bg-tertiary)] flex-shrink-0 ml-2"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                      aria-label="Copy email address"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Location Card */}
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl card"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                    >
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Location</p>
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{contactInfo.location}</p>
                    </div>
                  </div>

                  {/* Availability Badge Card */}
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl card"
                    style={{ background: 'var(--accent-subtle)', borderColor: 'var(--accent-border)' }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0 ml-2" style={{ backgroundColor: 'var(--accent)' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{contactInfo.availability}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Style Social links grid */}
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Find Me Online</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <SocialCard key={social.id} social={social} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card p-6 sm:p-7">
                <h3 className="text-base font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Send Me a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none"
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none"
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project, opportunity, or just say hello..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none resize-none"
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>

                {/* Status feedback */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2 p-3 rounded-xl"
                      style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)' }}
                      role="alert"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                      <p className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                        Email client opened! Message ready to send to giripratik499@gmail.com.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
