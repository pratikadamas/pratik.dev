import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ExternalLink, Award } from 'lucide-react';
import { certificates } from '../data/certificates';

// Individual Certificate Card
function CertCard({ cert, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onClick(cert)}
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${cert.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(cert);
      }}
      className="card group cursor-pointer overflow-hidden flex flex-col justify-between transition-all"
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)] border-b border-[var(--border)] flex items-center justify-center p-2">
        {cert.image && !imgError ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
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
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="font-mono text-xs text-white bg-black/70 px-2.5 py-1 rounded border border-white/20">
            Expand ↗
          </span>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--accent)]">{cert.category}</span>
          <span className="text-[var(--text-tertiary)]">{cert.date}</span>
        </div>

        <h3 className="text-xs sm:text-sm font-medium leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>
          {cert.title}
        </h3>

        <p className="text-[11px] font-mono truncate" style={{ color: 'var(--text-secondary)' }}>
          {cert.organization}
        </p>
      </div>
    </div>
  );
}

// Lightbox Modal
function CertModal({ cert, onClose }) {
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
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-xl overflow-hidden border"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
              {cert.category}
            </span>
            <span className="text-[var(--text-tertiary)]">·</span>
            <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              {cert.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center transition-colors border hover:bg-[var(--bg-tertiary)]"
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
        <div className="relative bg-black flex items-center justify-center min-h-[40vh] max-h-[68vh] p-3 sm:p-6 overflow-hidden">
          <img
            src={cert.image}
            alt={`${cert.title} full view`}
            className="w-full h-full max-h-[64vh] object-contain rounded"
          />
        </div>

        {/* Modal Bottom Metadata */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h3 className="text-sm sm:text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {cert.title}
            </h3>
            <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              Issued by {cert.organization}
            </p>
          </div>

          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex-shrink-0"
            >
              <span>Verify Credential</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpen = useCallback((cert) => setSelectedCert(cert), []);
  const handleClose = useCallback(() => setSelectedCert(null), []);

  return (
    <>
      <section id="certificates" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="certs-heading">
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
                <p className="section-eyebrow">VERIFIED CREDENTIALS</p>
                <h2 id="certs-heading" className="section-title">Certifications & Milestones</h2>
              </div>
              <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                [{certificates.length} credentials cataloged]
              </p>
            </div>

            {/* Certificate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {certificates.map((cert) => (
                <CertCard key={cert.id} cert={cert} onClick={handleOpen} />
              ))}
            </div>
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
