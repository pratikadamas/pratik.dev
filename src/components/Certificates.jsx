import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Calendar, Building2, ImageOff } from 'lucide-react';
import { certificates } from '../data/certificates';

// Certificate placeholder
function CertPlaceholder({ title, org }) {
  return (
    <div
      className="w-full h-48 flex flex-col items-center justify-center gap-3"
      style={{ background: 'var(--bg-tertiary)' }}
    >
      <Award className="w-10 h-10 text-primary-400" aria-hidden="true" />
      <div className="text-center px-4">
        <p className="text-xs font-semibold line-clamp-2" style={{ color: 'var(--text-primary)' }}>{title}</p>
        <p className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{org}</p>
      </div>
    </div>
  );
}

function CertCard({ cert, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card overflow-hidden cursor-pointer group"
      onClick={() => onClick(cert)}
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${cert.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(cert); }}
    >
      <div className="relative overflow-hidden">
        {cert.image && !imgError ? (
          cert.image.toLowerCase().endsWith('.pdf') ? (
            <div
              className="w-full h-48 flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform duration-500"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <Award className="w-10 h-10 text-primary-400" aria-hidden="true" />
              <p className="text-xs font-semibold px-4 text-center line-clamp-2" style={{ color: 'var(--text-primary)' }}>{cert.title}</p>
              <span className="text-[10px] uppercase font-bold text-red-400/80 border border-red-400/30 px-2 py-0.5 rounded bg-red-400/10">PDF Document</span>
            </div>
          ) : (
            <img
              src={cert.image}
              alt={`${cert.title} certificate`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )
        ) : (
          <CertPlaceholder title={cert.title} org={cert.organization} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 right-2">
          <span className="tag text-[10px]">{cert.category}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold line-clamp-2" style={{ color: 'var(--text-primary)' }}>{cert.title}</h3>
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{cert.organization}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{cert.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Lightbox Modal
function CertModal({ cert, onClose }) {
  const [imgError, setImgError] = useState(false);

  // ESC key handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
          }}
          aria-label="Close certificate modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate image or PDF */}
        <div className="relative bg-gray-900 flex items-center justify-center min-h-[50vh]">
          {cert.image && !imgError ? (
            cert.image.toLowerCase().endsWith('.pdf') ? (
              <div className="flex flex-col items-center justify-center gap-6 p-8 text-center w-full">
                <div className="w-24 h-24 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-2">
                  <Award className="w-12 h-12 text-primary-400" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">PDF Certificate</h4>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">
                    This certificate is stored securely as a PDF document. Click below to view or download it in full quality.
                  </p>
                </div>
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 shadow-lg shadow-primary-500/25"
                >
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                  Open PDF Document
                </a>
              </div>
            ) : (
              <img
                src={cert.image}
                alt={`${cert.title} certificate`}
                className="w-full max-h-[70vh] object-contain"
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <div
              className="w-full h-64 flex flex-col items-center justify-center gap-4"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <Award className="w-16 h-16 text-primary-400" aria-hidden="true" />
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Certificate image not available</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Add your certificate image to see it here</p>
            </div>
          )}
        </div>

        {/* Info bar */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{cert.title}</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cert.organization} · {cert.date}</p>
          </div>
          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-shrink-0 text-xs"
              aria-label="View credential"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              View Credential
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpen = useCallback((cert) => setSelectedCert(cert), []);
  const handleClose = useCallback(() => setSelectedCert(null), []);

  return (
    <>
      <section id="certificates" className="section-padding" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="certs-heading">
        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-xs font-mono font-medium text-primary-500 mb-2 tracking-wider uppercase">Credentials</p>
              <h2 id="certs-heading" className="section-title">Certificates & Credentials</h2>
              <p className="section-subtitle mt-3 max-w-lg mx-auto">
                Verified learning milestones across AI, development, and engineering
              </p>
            </div>

            {/* Instructions */}
            {certificates.every(c => !c.image) && (
              <div
                className="mb-8 p-4 rounded-xl text-sm text-center"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--text-secondary)' }}
              >
                📋 Add your certificate images to <code className="font-mono text-xs">/public/certificates/</code> and update <code className="font-mono text-xs">src/data/certificates.js</code>
              </div>
            )}

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <CertCard cert={cert} onClick={handleOpen} />
                </motion.div>
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
