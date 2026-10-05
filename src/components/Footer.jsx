import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../data/achievements';

const navLinks = [
  { href: '#home', label: 'Top' },
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Tech Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border)',
      }}
      className="border-t"
      aria-label="Site footer"
    >
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b" style={{ borderColor: 'var(--border)' }}>
          {/* Identity */}
          <div className="space-y-2 max-w-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>
              PRATIK GIRI
            </span>
            <p className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Final-year Computer Science Engineer · Adamas University
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Specializing in applied machine learning, robust web architecture, and quantum computing exploration.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] block">
              SECTIONS
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Profiles */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] block">
              PROFILES
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 transition-colors hover:text-[var(--accent)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--text-tertiary)]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
          <p>© {new Date().getFullYear()} Pratik Giri. All rights reserved.</p>
          <p>Built with React, Vite &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
