import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Award, 
  Cloud, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Brain, 
  Trophy, 
  Maximize2,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { certificates } from '../data/certificates';

// Platform metadata configuration for filters and badge styling
const PLATFORMS = [
  { 
    id: 'all', 
    label: 'All', 
    shortLabel: 'All',
    icon: Award, 
    color: 'emerald' 
  },
  { 
    id: 'aws', 
    label: 'AWS', 
    shortLabel: 'AWS',
    icon: Cloud, 
    color: 'amber',
    badge: 'AWS Academy',
    badgeClass: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/25',
    description: 'Accredited AWS Academy Graduate credentials in Cloud Operations, Data Engineering & Machine Learning.'
  },
  { 
    id: 'nptel', 
    label: 'NPTEL', 
    shortLabel: 'NPTEL',
    icon: GraduationCap, 
    color: 'blue',
    badge: 'NPTEL Elite',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
    description: 'Elite certifications issued by Ministry of Education (MHRD) & IIT Kharagpur in C, Modern C++, and Java DSA.'
  },
  { 
    id: 'infosys', 
    label: 'Infosys', 
    shortLabel: 'Infosys',
    icon: Sparkles, 
    color: 'emerald',
    badge: 'Infosys Springboard',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    description: 'Industry-grade certifications in Computer Vision, Deep Learning, NLP, and Data Science.'
  },
  { 
    id: 'udemy', 
    label: 'Udemy', 
    shortLabel: 'Udemy',
    icon: BookOpen, 
    color: 'purple',
    badge: 'Udemy Certified',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
    description: 'Bootcamps in Machine Learning, Full-Stack Web Development, and Deep Learning.'
  },
  { 
    id: 'great-learning', 
    label: 'Great Learning', 
    shortLabel: 'Great Learning',
    icon: Brain, 
    color: 'teal',
    badge: 'Great Learning',
    badgeClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25',
    description: 'Specialized program in Machine Learning Algorithms and mathematical foundations.'
  },
  { 
    id: 'other', 
    label: 'Other Honors', 
    shortLabel: 'Others',
    icon: Trophy, 
    color: 'slate',
    badge: 'National & University',
    badgeClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/25',
    description: 'ISRO Bharatiya Antariksh Hackathon, Adamas University coding honors, and Skill India AI for Youth.'
  }
];

const platformMap = PLATFORMS.reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {});

// Individual Certificate Card
function CertCard({ cert, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const platform = platformMap[cert.issuer] || platformMap.other;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.35, 
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.25, 1, 0.5, 1] 
      }}
      onClick={() => onClick(cert)}
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${cert.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(cert);
      }}
      className="card group cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Thumbnail area with platform tag */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)] border-b border-[var(--border)] flex items-center justify-center p-3">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-15 technical-grid pointer-events-none" />

        {/* Platform tag pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border backdrop-blur-md ${platform.badgeClass || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {platform.shortLabel || cert.issuer.toUpperCase()}
          </span>
        </div>

        {/* Thumbnail image */}
        {cert.image && !imgError ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)]">
            <Award className="w-8 h-8" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase">Credential File</span>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
            <Maximize2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            View Certificate
          </span>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--accent)] font-medium">{cert.category}</span>
            <span className="text-[var(--text-tertiary)]">{cert.date}</span>
          </div>

          <h3 
            className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[var(--accent)]" 
            style={{ color: 'var(--text-primary)' }}
          >
            {cert.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--text-secondary)] truncate flex items-center gap-1" title={cert.organization}>
            <CheckCircle2 className="w-3 h-3 text-[var(--accent)] flex-shrink-0" />
            <span className="truncate">{cert.organization}</span>
          </span>
          <span className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors pl-2 flex-shrink-0">
            ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Lightbox Modal
function CertModal({ cert, onClose }) {
  const platform = platformMap[cert.issuer] || platformMap.other;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(0, 0, 0, 0.88)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${platform.badgeClass || 'bg-slate-500/10 text-slate-300'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {platform.label}
            </span>
            <span className="text-[var(--text-tertiary)] font-mono text-xs">·</span>
            <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              {cert.category} ({cert.date})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border hover:bg-[var(--bg-tertiary)]"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Image Viewport */}
        <div className="relative bg-black flex items-center justify-center min-h-[42vh] max-h-[66vh] p-3 sm:p-6 overflow-hidden">
          <img
            src={cert.image}
            alt={`${cert.title} full view`}
            className="w-full h-full max-h-[62vh] object-contain rounded-lg shadow-inner"
          />
        </div>

        {/* Modal Bottom Metadata */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {cert.title}
            </h3>
            <p className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              Issued by {cert.organization}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <span>View Full File</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {cert.credentialUrl && cert.credentialUrl !== '#' && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleOpen = useCallback((cert) => setSelectedCert(cert), []);
  const handleClose = useCallback(() => setSelectedCert(null), []);

  // Compute counts per platform
  const counts = useMemo(() => {
    const c = { all: certificates.length };
    PLATFORMS.forEach((p) => {
      if (p.id !== 'all') {
        c[p.id] = certificates.filter((item) => item.issuer === p.id).length;
      }
    });
    return c;
  }, []);

  // Filtered certificates list
  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'all') return certificates;
    return certificates.filter((item) => item.issuer === activeFilter);
  }, [activeFilter]);

  const activePlatformData = platformMap[activeFilter] || platformMap.all;

  return (
    <>
      <section 
        id="certificates" 
        className="section-padding border-b" 
        style={{ borderColor: 'var(--border)' }} 
        aria-labelledby="certs-heading"
      >
        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="section-eyebrow">VERIFIED CREDENTIALS</p>
                <h2 id="certs-heading" className="section-title">Certifications & Milestones</h2>
                <p className="section-subtitle mt-2">
                  Industry-recognized accreditations in Machine Learning, Cloud Architecture, and Software Engineering
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg border flex items-center gap-1.5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <Award className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{certificates.length} credentials cataloged</span>
                </span>
              </div>
            </div>

            {/* Platform Filter Tabs (Linear / Raycast Style) */}
            <div className="space-y-4">
              <div 
                className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1"
                role="tablist"
                aria-label="Filter certificates by platform"
              >
                {PLATFORMS.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  const Icon = tab.icon;
                  const count = counts[tab.id] || 0;

                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      whileTap={{ scale: 0.96 }}
                      role="tab"
                      aria-selected={isActive}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
                        isActive
                          ? 'shadow-sm'
                          : 'hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)]'
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor: 'var(--text-primary)',
                              color: 'var(--bg-primary)',
                              borderColor: 'var(--text-primary)',
                            }
                          : {
                              background: 'var(--bg-card)',
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)',
                            }
                      }
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                          isActive
                            ? 'bg-black/20 text-[var(--bg-primary)] dark:bg-white/20'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                        }`}
                      >
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Status & Issuer Context Bar */}
              <div 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border text-xs"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Filter className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                  <span className="font-mono text-[var(--text-secondary)]">
                    Showing <strong className="text-[var(--text-primary)]">{filteredCertificates.length}</strong> of {certificates.length} credentials
                    {activeFilter !== 'all' && (
                      <span className="text-[var(--accent)] ml-1">
                        · {activePlatformData.label}
                      </span>
                    )}
                  </span>
                </div>

                {activePlatformData.description && activeFilter !== 'all' ? (
                  <p className="font-mono text-[11px] text-[var(--text-tertiary)] truncate max-w-md hidden md:block">
                    {activePlatformData.description}
                  </p>
                ) : null}

                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="font-mono text-[11px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Reset to All</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Certificate Grid with Animated Transitions */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 min-h-[360px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredCertificates.map((cert, index) => (
                  <CertCard 
                    key={cert.id} 
                    cert={cert} 
                    onClick={handleOpen} 
                    index={index} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}

