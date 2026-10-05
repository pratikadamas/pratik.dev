import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Terminal } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

// High-fidelity technical previews for projects
function TechnicalPreview({ project }) {
  if (project.image) {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[320px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] flex items-center justify-center">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }

  // ANPR Preview Schematic
  if (project.category === 'ai-ml') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[320px] rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs overflow-hidden select-none">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-[var(--text-tertiary)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
          </div>
          <span className="text-[10px] tracking-wider uppercase">vision_engine.py — ESP32-CAM</span>
        </div>

        {/* Visual Detection Box Simulation */}
        <div className="my-auto py-4">
          <div className="border border-dashed border-[var(--accent-border)] bg-[var(--accent-subtle)] rounded p-3 mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium" style={{ color: 'var(--accent)' }}>
              <span>BOUNDING_BOX: [x:120, y:68, w:340, h:110]</span>
              <span>YOLOv8 CONF: 0.942</span>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded px-3 py-2 flex items-center justify-between">
              <span className="tracking-widest font-bold" style={{ color: 'var(--text-primary)' }}>WB-02-AK-4921</span>
              <span className="text-[10px] text-[var(--text-tertiary)]">EasyOCR · 14ms</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] px-1">
            <span>FPS: 28.4</span>
            <span>FRAME_LATENCY: 32ms</span>
            <span>MQTT: CONNECTED</span>
          </div>
        </div>

        {/* Status Line */}
        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
          <span>PARKING_SLOT: #04 [OCCUPIED]</span>
          <span style={{ color: 'var(--accent)' }}>● REALTIME</span>
        </div>
      </div>
    );
  }

  // Quantum Circuit Transpiler Schematic
  if (project.category === 'quantum') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[320px] rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs overflow-hidden select-none">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-[var(--text-tertiary)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
          </div>
          <span className="text-[10px] tracking-wider uppercase">qiskit_transpiler_pass.py</span>
        </div>

        <div className="my-auto py-3 space-y-2">
          {/* Circuit Lines */}
          <div className="space-y-1.5 text-[11px] text-[var(--text-secondary)]">
            <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-between">
              <span>q[0]: ──[ H ]────■────[ Rz ]────</span>
              <span className="text-[10px] text-[var(--text-tertiary)]">depth: 3</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-between">
              <span>q[1]: ─────────[ X ]──[ M ]──────</span>
              <span className="text-[10px] text-[var(--text-tertiary)]">depth: 2</span>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-[var(--text-tertiary)] block">GATE_DEPTH</span>
              <span className="text-[var(--text-primary)] font-semibold">42 → 18 (-57%)</span>
            </div>
            <div className="p-2 rounded border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-[var(--text-tertiary)] block">CNOT_COUNT</span>
              <span className="text-[var(--text-primary)] font-semibold">14 → 4 (-71%)</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
          <span>BACKEND: ibm_kyoto (127Q)</span>
          <span style={{ color: 'var(--accent)' }}>ROUTING: PASS</span>
        </div>
      </div>
    );
  }

  // Full-Stack / Platform Schematic
  return (
    <div className="w-full h-full min-h-[260px] sm:min-h-[320px] rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs overflow-hidden select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-[var(--text-tertiary)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-hover)]" />
        </div>
        <span className="text-[10px] tracking-wider uppercase">api_gateway · engine</span>
      </div>

      <div className="my-auto py-3 space-y-2">
        <div className="p-3 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[11px]">
          <p className="text-[var(--text-tertiary)] mb-1">// Query Engine</p>
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            SELECT customer_segment, AVG(revenue)
          </p>
          <p className="text-[var(--text-secondary)]">FROM parquet_scan('analytics.parquet')</p>
        </div>

        <div className="flex items-center justify-between text-[11px] px-1 text-[var(--text-tertiary)]">
          <span>PARSER: DuckDB In-Memory</span>
          <span>EXEC_TIME: 1.8ms</span>
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
        <span>STATUS: 200 OK</span>
        <span style={{ color: 'var(--accent)' }}>● FASTAPI ACTIVE</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding border-b" style={{ borderColor: 'var(--border)' }} aria-labelledby="projects-heading">
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
              <p className="section-eyebrow">SELECTED WORK</p>
              <h2 id="projects-heading" className="section-title">Engineered Projects</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist">
              {projectCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    role="tab"
                    aria-selected={isActive}
                    className="font-mono text-xs px-3 py-1.5 rounded transition-colors border"
                    style={{
                      backgroundColor: isActive ? 'var(--text-primary)' : 'var(--bg-card)',
                      color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      borderColor: isActive ? 'var(--text-primary)' : 'var(--border)',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Alternating Layout */}
          <div className="space-y-16 sm:space-y-24">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    aria-label={`Project: ${project.title}`}
                  >
                    {/* Editorial Text Column */}
                    <div
                      className={`lg:col-span-5 space-y-4 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                          0{index + 1}
                        </span>
                        <span className="inline-block w-4 h-px bg-[var(--border)]" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                          {project.category.replace('-', ' ')}
                        </span>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-semibold tracking-tight transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm leading-relaxed font-normal"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {project.longDescription || project.description}
                      </p>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded border"
                            style={{
                              background: 'var(--bg-tertiary)',
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium transition-colors hover:text-[var(--accent)]"
                            style={{ color: 'var(--text-primary)' }}
                            aria-label={`GitHub source for ${project.title}`}
                          >
                            <Github className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Source Code</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}

                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium transition-colors hover:text-[var(--accent)]"
                            style={{ color: 'var(--text-primary)' }}
                            aria-label={`Live demo for ${project.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Media Column */}
                    <div
                      className={`lg:col-span-7 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <TechnicalPreview project={project} />
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
