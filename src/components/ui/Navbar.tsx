'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact', 'Vision'];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('Home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Active section tracking
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
                });
            },
            { threshold: 0.4 }
        );
        navLinks.forEach(l => {
            const el = document.getElementById(l.toLowerCase());
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -80, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
                position: 'fixed',
                top: 16,
                left: '50%',
                zIndex: 1000,
                width: scrolled ? '90%' : '95%',
                maxWidth: 900,
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), top 0.5s ease',
            }}
        >
            <div
                className="glass"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: scrolled ? '8px 20px' : '14px 24px',
                    boxShadow: scrolled ? '0 10px 40px rgba(108,43,217,0.35)' : '0 4px 20px rgba(108,43,217,0.1)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderRadius: 20,
                    position: 'relative',
                    overflow: 'visible'
                }}
            >
                {/* Center Gradient Glow (only at top) */}
                <AnimatePresence>
                    {!scrolled && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '150px',
                                height: '150px',
                                background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)',
                                pointerEvents: 'none',
                                zIndex: -1,
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Empty spacer to maintain layout balance when scrolled */}
                {scrolled && <div style={{ width: 40 }} className="hidden-mobile" />}

                {/* Desktop Links (Always present, revealed on scroll or if at top) */}
                <div style={{ flex: 1, display: 'flex', justifyContent: scrolled ? 'center' : 'center' }}>
                    <AnimatePresence>
                        {(scrolled || !scrolled) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ display: 'flex', gap: 4, alignItems: 'center' }}
                                className="hidden-mobile"
                            >
                                {navLinks.map(link => (
                                    <motion.button
                                        key={link}
                                        onClick={() => scrollTo(link)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            position: 'relative',
                                            background: 'none',
                                            border: 'none',
                                            color: active === link ? '#9333ea' : 'var(--text-primary)',
                                            fontFamily: "'Outfit', sans-serif",
                                            fontWeight: 500,
                                            fontSize: '0.9rem',
                                            padding: '6px 14px',
                                            cursor: 'pointer',
                                            borderRadius: 8,
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        {link}
                                        {active === link && (
                                            <motion.span
                                                layoutId="navUnderline"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: '10%',
                                                    width: '80%',
                                                    height: 2,
                                                    background: 'linear-gradient(90deg, #9333ea, #00d4ff)',
                                                    borderRadius: 99,
                                                    boxShadow: '0 0 8px rgba(147,51,234,0.8)',
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: theme toggle + mobile menu */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    zIndex: 20
                }}>
                    {mounted && (
                        <motion.button
                            whileHover={{ scale: 1.15, rotate: 20 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: 10,
                                padding: '8px',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0 0 15px rgba(147,51,234,0.2)',
                                transition: 'box-shadow 0.3s ease',
                            }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6c2bd9" />}
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mobile-only"
                        onClick={() => setMobileOpen(o => !o)}
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 10,
                            padding: 8,
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                        }}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="glass"
                        style={{
                            marginTop: 8,
                            padding: '16px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                            borderRadius: 16,
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link}
                                onClick={() => scrollTo(link)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                style={{
                                    background: active === link ? 'rgba(147,51,234,0.15)' : 'transparent',
                                    border: '1px solid transparent',
                                    borderColor: active === link ? 'rgba(147,51,234,0.4)' : 'transparent',
                                    borderRadius: 10,
                                    color: active === link ? '#9333ea' : 'var(--text-primary)',
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                {link}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 640px) { .hidden-mobile { display: flex !important; } .mobile-only { display: none !important; } }
        @media (max-width: 639px) { .hidden-mobile { display: none !important; } .mobile-only { display: flex !important; } }
      `}</style>
        </motion.nav>
    );
}
