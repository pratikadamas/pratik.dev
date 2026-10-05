import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smoother, slightly longer loading for the premium feel
    const duration = 2200; 
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing function for progress (easeOutExpo)
      const t = currentStep / steps;
      const easeOut = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      setProgress(Math.min(Math.round(easeOut * 100), 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030303] text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Subtle Grain Overlay for premium texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-6">
        
        {/* Premium Morphing Fluid Sphere Centerpiece */}
        <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
          {/* Outer glowing layer */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 blur-2xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 360],
              borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "50%"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Inner dynamic layer */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-bl from-emerald-400 via-indigo-500 to-purple-600 blur-xl opacity-70 mix-blend-screen"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 90, 0],
              borderRadius: ["50%", "60% 40% 30% 70% / 50% 60% 40% 50%", "50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner glassmorphism core */}
          <motion.div
            className="absolute inset-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Core dot */}
             <motion.div 
               className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
               animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             />
          </motion.div>
        </div>

        {/* Counter & Branding */}
        <div className="w-full flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-xs tracking-[0.4em] text-gray-400 uppercase font-light mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Pratik Giri
            </motion.div>
            <div className="flex items-baseline gap-1">
              <motion.span 
                className="text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {progress}
              </motion.span>
              <span className="text-2xl text-gray-600 font-light">%</span>
            </div>
          </div>

          {/* Ultra-minimalist progress line */}
          <div className="w-full h-[2px] bg-gray-900 relative overflow-hidden rounded-full">
            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
              initial={{ x: "-200%" }}
              animate={{ x: "400%" }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
