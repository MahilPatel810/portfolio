'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import FutureVision from '@/components/sections/FutureVision';
import Footer from '@/components/ui/Footer';

// Dynamically import the intro (canvas) to avoid SSR issues
const CinematicIntro = dynamic(() => import('@/components/3d/CinematicIntro'), { ssr: false });

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introStarted, setIntroStarted] = useState(false);

  // Start the intro after a small delay
  useEffect(() => {
    const t = setTimeout(() => setIntroStarted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleIntroDone = () => {
    setIntroVisible(false);
  };

  return (
    <>
      {/* Click ripple global style */}
      <style>{`
        @keyframes rippleEffect { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(4);opacity:0} }
        body { cursor: none; }
      `}</style>

      {/* Cinematic Intro */}
      <AnimatePresence>
        {introVisible && introStarted && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CinematicIntro onDone={handleIntroDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={!introVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, pointerEvents: introVisible ? 'none' : 'all' }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FutureVision />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
