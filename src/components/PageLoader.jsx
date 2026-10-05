import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function PageLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  const finish = useCallback((immediate = false) => {
    setProgress(100);
    // 1.5s time delay after reaching 100% so user sees the fully filled water pot
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, immediate ? 100 : 1500);
  }, [onLoadingComplete]);

  useEffect(() => {
    // 2.2s total pour duration for a realistic, satisfying liquid fill
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      // Steady natural pouring curve that smoothly levels out at the brim
      const ease = t < 1 ? 1 - Math.pow(1 - t, 2.0) : 1;
      const nextProgress = Math.min(Math.round(ease * 100), 100);

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

  // Water level in SVG coordinates:
  // Text sits between y = 65 (top of letters) and y = 168 (bottom baseline of letters).
  // At 0%: waterLevelY = 172 (dry, sitting just under the letter pot).
  // At 100%: waterLevelY = 56 (filled completely to the brim and submerged).
  const waterLevelY = 172 - (progress / 100) * 116;

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
      {/* Inline styles for realistic water filling & wave physics */}
      <style>{`
        @keyframes waterWaveFront {
          0% { transform: translateX(0); }
          100% { transform: translateX(-450px); }
        }
        @keyframes waterWaveBack {
          0% { transform: translateX(-480px); }
          100% { transform: translateX(0); }
        }
        @keyframes waterShimmer {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes waterBubble1 {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          30% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-75px) scale(1.1); opacity: 0; }
        }
        @keyframes waterBubble2 {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          25% { opacity: 0.7; }
          75% { opacity: 0.5; }
          100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
        }
        .animate-water-front {
          animation: waterWaveFront 4s linear infinite;
        }
        .animate-water-back {
          animation: waterWaveBack 5.5s linear infinite;
        }
        .animate-water-shimmer {
          animation: waterShimmer 3.2s ease-in-out infinite;
        }
        .animate-bubble-1 {
          animation: waterBubble1 2.5s ease-in infinite;
        }
        .animate-bubble-2 {
          animation: waterBubble2 2s ease-in infinite 0.8s;
        }
        .animate-bubble-3 {
          animation: waterBubble1 2.2s ease-in infinite 1.4s;
        }
      `}</style>

      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glowing spotlight beneath the water vessel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 55%, rgba(230, 245, 54, 0.16), rgba(16, 185, 129, 0.12) 35%, transparent 70%)',
        }}
      />

      {/* TOP HEADER */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[11px] tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E6F536] animate-pulse" />
          <span className="text-neutral-300">PORTFOLIO // V2.0</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-500">
          <span>FILLING CONTAINER CORE</span>
          <span>·</span>
          <span>FLUID DYNAMICS // ACTIVE</span>
        </div>
        <button
          onClick={() => finish(true)}
          className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px] tracking-widest uppercase border border-white/10 px-2.5 py-1 rounded"
        >
          ESC TO SKIP
        </button>
      </div>

      {/* CENTER WATER POT: "PRATIK GIRI" Letters Filling with Water */}
      <div className="relative z-10 w-full max-w-[94%] sm:max-w-[88%] md:max-w-[80%] lg:max-w-[900px] xl:max-w-[1040px] mx-auto px-2 flex flex-col items-center">
        
        {/* SVG Water Pot Container */}
        <div className="relative w-full aspect-[1000/230]">
          <svg
            viewBox="0 0 1000 230"
            className="w-full h-full overflow-hidden select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Surface Water Gradient: Neon Lime -> Emerald -> Cyan */}
              <linearGradient id="water-surface-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E6F536" />
                <stop offset="35%" stopColor="#10B981" />
                <stop offset="70%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#9070DF" />
              </linearGradient>

              {/* Deep Water Gradient (Back Layer) */}
              <linearGradient id="water-deep-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#9070DF" />
                <stop offset="35%" stopColor="#06B6D4" />
                <stop offset="70%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#E6F536" />
              </linearGradient>

              {/* Shimmer Light Reflection Gradient */}
              <linearGradient id="water-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Surface Line Glow Filter */}
              <filter id="water-meniscus-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Clip Path of the "Pot" Text: PRATIK GIRI */}
              <clipPath id="pot-letters-clip">
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

            {/* Empty Pot / Glass Vessel: Visible outline of the letters waiting to be filled */}
            <text
              x="500"
              y="125"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.8"
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

            {/* Liquid Group: Strictly filling inside the pot letters */}
            <g clipPath="url(#pot-letters-clip)">
              
              {/* Water Container Rising from 0% (bottom) to 100% (top) */}
              <g
                style={{
                  transform: `translateY(${waterLevelY}px)`,
                  transition: 'transform 0.08s linear',
                }}
              >
                {/* Back Water Layer: Deeper water volume with counter-wave slosh */}
                <g className="animate-water-back opacity-80">
                  <path
                    d="M 0 0 C 60 -10, 120 10, 180 0 C 240 -10, 300 10, 360 0 C 420 -10, 480 10, 540 0 C 600 -10, 660 10, 720 0 C 780 -10, 840 10, 900 0 C 960 -10, 1020 10, 1080 0 C 1140 -10, 1200 10, 1260 0 C 1320 -10, 1380 10, 1440 0 C 1500 -10, 1560 10, 1620 0 C 1680 -10, 1740 10, 1800 0 C 1860 -10, 1920 10, 1980 0 C 2040 -10, 2100 10, 2160 0 L 2160 400 L 0 400 Z"
                    fill="url(#water-deep-grad)"
                  />
                </g>

                {/* Front Water Layer: Vibrant surface water wave */}
                <g className="animate-water-front opacity-95">
                  <path
                    d="M 0 0 C 75 14, 150 -14, 225 0 C 300 14, 375 -14, 450 0 C 525 14, 600 -14, 675 0 C 750 14, 825 -14, 900 0 C 975 14, 1050 -14, 1125 0 C 1200 14, 1275 -14, 1350 0 C 1425 14, 1500 -14, 1575 0 C 1650 14, 1725 -14, 1800 0 C 1875 14, 1950 -14, 2025 0 C 2100 14, 2175 -14, 2250 0 L 2250 400 L 0 400 Z"
                    fill="url(#water-surface-grad)"
                  />

                  {/* Glowing Water Meniscus / Crest Line (The bright surface of water) */}
                  <path
                    d="M 0 0 C 75 14, 150 -14, 225 0 C 300 14, 375 -14, 450 0 C 525 14, 600 -14, 675 0 C 750 14, 825 -14, 900 0 C 975 14, 1050 -14, 1125 0 C 1200 14, 1275 -14, 1350 0 C 1425 14, 1500 -14, 1575 0 C 1650 14, 1725 -14, 1800 0 C 1875 14, 1950 -14, 2025 0 C 2100 14, 2175 -14, 2250 0"
                    fill="none"
                    stroke="#E6F536"
                    strokeWidth="5"
                    strokeOpacity="0.45"
                    filter="url(#water-meniscus-glow)"
                  />
                  <path
                    d="M 0 0 C 75 14, 150 -14, 225 0 C 300 14, 375 -14, 450 0 C 525 14, 600 -14, 675 0 C 750 14, 825 -14, 900 0 C 975 14, 1050 -14, 1125 0 C 1200 14, 1275 -14, 1350 0 C 1425 14, 1500 -14, 1575 0 C 1650 14, 1725 -14, 1800 0 C 1875 14, 1950 -14, 2025 0 C 2100 14, 2175 -14, 2250 0"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.85"
                  />
                </g>

                {/* Rising Water Bubbles inside the liquid body */}
                <g>
                  <circle cx="150" cy="50" r="3.5" fill="rgba(255,255,255,0.7)" className="animate-bubble-1" />
                  <circle cx="320" cy="70" r="4.5" fill="rgba(230,245,54,0.7)" className="animate-bubble-2" />
                  <circle cx="480" cy="55" r="3.5" fill="rgba(255,255,255,0.6)" className="animate-bubble-3" />
                  <circle cx="650" cy="80" r="5" fill="rgba(6,182,212,0.7)" className="animate-bubble-1" />
                  <circle cx="820" cy="60" r="3.5" fill="rgba(255,255,255,0.8)" className="animate-bubble-2" />
                  <circle cx="920" cy="75" r="4" fill="rgba(144,112,223,0.7)" className="animate-bubble-3" />
                </g>
              </g>

              {/* Diagonal Water Shimmer / Caustic light reflection */}
              <rect
                x="0"
                y="0"
                width="280"
                height="230"
                fill="url(#water-shimmer-grad)"
                className="animate-water-shimmer pointer-events-none"
              />
            </g>
          </svg>
        </div>

        {/* Minimal Progress Line under the Water Vessel */}
        <div className="w-full mt-4 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E6F536] via-[#10B981] to-[#9070DF]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.05 }}
          />
        </div>

        {/* Status Line: Water filling indication */}
        <div className="w-full mt-3 flex items-center justify-between font-mono text-[11px] sm:text-xs">
          <span className="text-neutral-500 tracking-wider">
            {progress < 25 && 'POURING SYSTEM CORE & INGESTION...'}
            {progress >= 25 && progress < 65 && 'FILLING VISION, MODELS & DATA PIPELINES...'}
            {progress >= 65 && progress < 100 && 'WATER LEVEL REACHING CAPACITY...'}
            {progress === 100 && 'VESSEL FILLED 100% // ALL MODULES READY'}
          </span>

          {/* Liquid counter: loading... [0-100]% */}
          <div className="flex items-center gap-1.5 font-medium tracking-tight">
            <span className="text-neutral-400 font-light">loading...</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono min-w-[3ch] text-right">
              {progress}
            </span>
            <span className="text-[#E6F536] font-mono text-sm">%</span>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER BAR */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-500 border-t border-white/5">
        <div>
          <span>© {new Date().getFullYear()} PRATIK GIRI</span>
          <span className="hidden sm:inline text-neutral-600"> — FULL-STACK & AI SYSTEMS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-400">
            {progress < 100 ? 'FILLING...' : '100% FULL'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
