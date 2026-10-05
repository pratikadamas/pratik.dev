import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing modules...');

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Configuring neural pipelines...' },
      { at: 45, text: 'Compiling project matrix...' },
      { at: 75, text: 'Optimizing interface shaders...' },
      { at: 95, text: 'System ready.' },
    ];

    const startTime = Date.now();
    const duration = 1600; // 1.6s total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      const matchedStatus = statuses.slice().reverse().find((s) => currentProgress >= s.at);
      if (matchedStatus) {
        setStatusText(matchedStatus.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0f] text-white select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -40,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-32 translate-y-32" />

      {/* Center Logo / Monogram */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <motion.div
          className="w-24 h-24 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            borderColor: [
              'rgba(99,102,241,0.3)',
              'rgba(52,211,153,0.4)',
              'rgba(129,140,248,0.4)',
              'rgba(99,102,241,0.3)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Brand Text */}
        <div className="absolute flex items-center justify-center">
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent font-mono">
            P<span className="text-emerald-400">.</span>
          </span>
        </div>
      </div>

      {/* Progress Info & Bar */}
      <div className="w-64 max-w-[80vw] flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span className="truncate max-w-[180px] text-slate-400 font-medium">
            {statusText}
          </span>
          <span className="text-indigo-400 font-bold ml-2">{progress}%</span>
        </div>

        {/* Progress Track */}
        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-slate-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Subtle developer tag */}
        <div className="text-[10px] text-center font-mono text-slate-500 mt-2 uppercase tracking-widest">
          Pratik Giri &bull; Portfolio 2026
        </div>
      </div>
    </motion.div>
  );
}
