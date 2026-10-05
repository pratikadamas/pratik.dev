import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer follower ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch or coarse pointer
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest(
        'a, button, input, textarea, select, [role="button"], .interactive-hover, .card, .tag, [data-cursor]'
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center mix-blend-difference"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (cursorText ? 64 : 44) : 32,
          height: isHovered ? (cursorText ? 64 : 44) : 32,
          scale: isClicked ? 0.85 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          borderWidth: isHovered ? '1.5px' : '1.5px',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(99, 102, 241, 0.6)',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.2,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-wider uppercase text-white font-semibold select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 6 : 8,
          height: isHovered ? 6 : 8,
          opacity: isHovered && cursorText ? 0 : 1,
          scale: isClicked ? 1.4 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </>
  );
}
