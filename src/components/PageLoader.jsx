import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function PageLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  const finish = useCallback((immediate = false) => {
    setProgress(100);
    // 1.5s time delay after reaching 100% so the user can see the full completion state
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, immediate ? 100 : 1500);
  }, [onLoadingComplete]);

  useEffect(() => {
    // 2.0s duration with easeOutExpo curve for responsive, premium feel
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      // easeOutExpo curve
      const easeOut = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const nextProgress = Math.min(Math.round(easeOut * 100), 100);

      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        finish(false);
      }
    }, interval);

    const handleKey = (e) => {
      if (e.key === 'Escape') finish(true);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [finish]);

  // Liquid level rises from 230 (empty) down to -20 (completely flooded)
  const liquidY = 230 - (progress / 100) * 250;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#08090C] text-white overflow-hidden select-none cursor-wait"
      initial={{ opacity: 1, y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
      }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Inline styles for CSS keyframe fluid wave animations */}
      <style>{`
        @keyframes neoleafWave1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-600px); }
        }
        @keyframes neoleafWave2 {
          0% { transform: translateX(-600px); }
          100% { transform: translateX(0); }
        }
        @keyframes neoleafShine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-wave-1 {
          animation: neoleafWave1 5s linear infinite;
        }
        .animate-wave-2 {
          animation: neoleafWave2 7s linear infinite;
        }
        .animate-shine {
          animation: neoleafShine 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background subtle technical grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient background glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(230, 245, 54, 0.15), rgba(144, 112, 223, 0.12) 40%, transparent 70%)',
        }}
      />

      {/* TOP BAR: Minimal status indicators */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[11px] tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E6F536] animate-pulse" />
          <span className="text-neutral-300">PORTFOLIO // V2.0</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-500">
          <span>AI & FULL-STACK SYSTEMS</span>
          <span>·</span>
          <span>EST. LATENCY // 16MS</span>
        </div>
        <button
          onClick={() => finish(true)}
          className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px] tracking-widest uppercase border border-white/10 px-2.5 py-1 rounded"
        >
          ESC TO SKIP
        </button>
      </div>

      {/* CENTER: NeoLeaf Typographic Liquid Centerpiece */}
      <div className="relative z-10 w-full max-w-[92%] sm:max-w-[85%] md:max-w-[78%] lg:max-w-[880px] xl:max-w-[1020px] mx-auto px-2 flex flex-col items-center">
        
        {/* The Giant SVG Masked Liquid Typography */}
        <div className="relative w-full aspect-[1000/230]">
          <svg
            viewBox="0 0 1000 230"
            className="w-full h-full overflow-hidden select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Primary NeoLeaf Fluid Gradient: Neon Lime -> Emerald -> Electric Violet -> Cyan */}
              <linearGradient id="neoleaf-liquid-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E6F536" />
                <stop offset="35%" stopColor="#10B981" />
                <stop offset="70%" stopColor="#9070DF" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>

              {/* Secondary Layer Gradient */}
              <linearGradient id="neoleaf-liquid-2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#9070DF" />
                <stop offset="40%" stopColor="#06B6D4" />
                <stop offset="75%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#E6F536" />
              </linearGradient>

              {/* SVG Clip Path of the Name "PRATIK GIRI" */}
              <clipPath id="neoleaf-name-clip">
                <text
                  x="500"
                  y="125"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '116px',
                    fontWeight: 900,
                    letterSpacing: '-0.025em',
                    fontFamily:
                      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  PRATIK GIRI
                </text>
              </clipPath>
            </defs>

            {/* Base Ghost Text (Translucent background fill & crisp technical outline) */}
            <text
              x="500"
              y="125"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255, 255, 255, 0.04)"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
              style={{
                fontSize: '116px',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                fontFamily:
                  'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
              }}
            >
              PRATIK GIRI
            </text>

            {/* Liquid Fill Group: Clipped strictly inside the letters of "PRATIK GIRI" */}
            <g clipPath="url(#neoleaf-name-clip)">
              {/* Rising Liquid Container */}
              <g
                style={{
                  transform: `translateY(${liquidY}px)`,
                  transition: 'transform 0.1s linear',
                }}
              >
                {/* Wave Layer 1 (NeoLeaf Lime & Emerald) */}
                <g className="animate-wave-1 opacity-90">
                  <path
                    d="M 0 0 Q 75 -24 150 0 T 300 0 T 450 0 T 600 0 T 750 0 T 900 0 T 1050 0 T 1200 0 T 1350 0 T 1500 0 T 1650 0 T 1800 0 T 1950 0 T 2100 0 L 2100 350 L 0 350 Z"
                    fill="url(#neoleaf-liquid-1)"
                  />
                </g>

                {/* Wave Layer 2 (Electric Violet & Cyan - Counter-Flowing) */}
                <g className="animate-wave-2 opacity-75" style={{ mixBlendMode: 'screen' }}>
                  <path
                    d="M 0 -8 Q 85 20 170 -8 T 340 -8 T 510 -8 T 680 -8 T 850 -8 T 1020 -8 T 1190 -8 T 1360 -8 T 1530 -8 T 1700 -8 T 1870 -8 T 2040 -8 T 2210 -8 L 2210 350 L 0 350 Z"
                    fill="url(#neoleaf-liquid-2)"
                  />
                </g>
              </g>

              {/* Shimmer Light Beam sweeping across the text */}
              <rect
                x="0"
                y="0"
                width="300"
                height="230"
                fill="url(#shimmer-grad)"
                className="animate-shine pointer-events-none"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </g>
          </svg>
        </div>

        {/* Minimal Hairline Progress Line under the Name */}
        <div className="w-full mt-4 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E6F536] via-[#10B981] to-[#9070DF]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.05 }}
          />
        </div>

        {/* Status Line directly beneath the text */}
        <div className="w-full mt-3 flex items-center justify-between font-mono text-[11px] sm:text-xs">
          <span className="text-neutral-500 tracking-wider">
            {progress < 40 && 'INITIALIZING SYSTEM ARCHITECTURE...'}
            {progress >= 40 && progress < 80 && 'LOADING APPLIED VISION & ML MODELS...'}
            {progress >= 80 && progress < 100 && 'COMPOSING INTERACTIVE INTERFACES...'}
            {progress === 100 && 'SYSTEM INITIALIZED // ALL MODULES READY'}
          </span>

          {/* NeoLeaf Counter Style: loading... [0-100]% */}
          <div className="flex items-center gap-1.5 font-medium tracking-tight">
            <span className="text-neutral-400 font-light">loading...</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono min-w-[3ch] text-right">
              {progress}
            </span>
            <span className="text-[#E6F536] font-mono text-sm">%</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Footer Branding & System coordinates */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-500 border-t border-white/5">
        <div>
          <span>© {new Date().getFullYear()} PRATIK GIRI</span>
          <span className="hidden sm:inline text-neutral-600"> — ENGINEERING & DESIGN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-400">READY TO SERVE</span>
        </div>
      </div>
    </motion.div>
  );
}
