import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Cpu } from 'lucide-react';

export default function PageLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing core...');

  useEffect(() => {
    const statuses = [
      { at: 10, text: 'Calibrating neural matrix...' },
      { at: 35, text: 'Synthesizing quantum states...' },
      { at: 65, text: 'Rendering intelligent UI...' },
      { at: 90, text: 'Systems operational.' },
    ];

    const startTime = Date.now();
    const duration = 1600; // 1.6s

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
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07070b] text-white select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Background Cybernetic Grid & Ambient Lights */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
      />

      <div className="absolute w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none translate-x-20 -translate-y-10" />

      {/* 3D Gyroscopic Quantum / AI Core Animation */}
      <div className="relative w-44 h-44 mb-10 flex items-center justify-center [perspective:1000px]">
        {/* Outer Ring 1 - Indigo */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          animate={{
            rotateX: [65, 65, 65],
            rotateY: [0, 180, 360],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Middle Ring 2 - Emerald */}
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-emerald-400/50 border-t-transparent border-b-transparent shadow-[0_0_20px_rgba(52,211,153,0.3)]"
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [65, 65, 65],
            rotateZ: [360, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner Ring 3 - Purple Glow */}
        <motion.div
          className="absolute inset-7 rounded-full border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          animate={{
            rotateX: [45, -45, 45],
            rotateY: [45, 225, 45],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting Quantum Electrons / Data Beacons */}
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
          animate={{
            x: [0, 60, 0, -60, 0],
            y: [-60, 0, 60, 0, -60],
            scale: [1, 1.4, 0.8, 1.4, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]"
          animate={{
            x: [0, -50, 0, 50, 0],
            y: [50, 0, -50, 0, 50],
            scale: [1.2, 0.7, 1.2, 0.7, 1.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Center Glowing AI Core Hexagon */}
        <motion.div
          className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-slate-900/90 to-black/80 border border-indigo-400/50 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.6)]"
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              '0 0 25px rgba(99,102,241,0.4)',
              '0 0 45px rgba(52,211,153,0.6)',
              '0 0 25px rgba(99,102,241,0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Animated Tech / Code Symbol */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Code2 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] stroke-[2.2]" />
          </motion.div>

          {/* Corner Tech Accents */}
          <span className="absolute top-1 left-1 w-1 h-1 bg-indigo-400 rounded-full" />
          <span className="absolute top-1 right-1 w-1 h-1 bg-emerald-400 rounded-full" />
          <span className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full" />
          <span className="absolute bottom-1 right-1 w-1 h-1 bg-indigo-400 rounded-full" />
        </motion.div>
      </div>

      {/* Futuristic Progress HUD */}
      <div className="w-72 max-w-[85vw] flex flex-col gap-2.5 relative z-10">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="truncate max-w-[190px] font-medium tracking-wide">
              {statusText}
            </span>
          </div>
          <span className="text-emerald-400 font-bold ml-2 font-mono">
            {progress}%
          </span>
        </div>

        {/* Multi-layered Glowing Progress Bar */}
        <div className="h-2 w-full bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-slate-700/60 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_14px_rgba(52,211,153,0.9)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Bottom Status Subtitle */}
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-400 inline" /> AI / ML & DEV
          </span>
          <span>QUANTUM READY</span>
        </div>
      </div>
    </motion.div>
  );
}
