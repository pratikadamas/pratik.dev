import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
    } catch { }
    return true; // default dark
  });

  // Lock body scroll while loader is visible
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  // Apply/remove 'dark' class on <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch { }
  }, [darkMode]);

  return (
    <>
      {/* NeoLeaf Awwwards Inspired Loading Animation */}
      <AnimatePresence mode="wait">
        {loading && <PageLoader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Butter-Smooth Custom Animated Cursor */}
      <CustomCursor />

      {/* Scroll Progress & Back to Top */}
      <ScrollToTop />

      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 btn-primary"
        >
          Skip to main content
        </a>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main id="main-content">
          <Hero />
          <About />
          <Education />
          <TechStack />
          <Projects />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
