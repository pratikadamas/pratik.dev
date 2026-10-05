import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress math
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-2 rounded-full glass bg-white/80 dark:bg-[#16161e]/90 shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            {/* SVG Progress Circle */}
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-indigo-500 transition-all duration-75"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp className="w-4 h-4 absolute stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
