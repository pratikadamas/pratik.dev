import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
    } catch {}
    return true; // default dark
  });

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
    } catch {}
  }, [darkMode]);

  return (
    <>
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

