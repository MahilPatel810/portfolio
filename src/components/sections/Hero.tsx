'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const SUBTITLES = [
    'Arduino & ESP32 Developer',
    'Creative Frontend Developer',
    'IoT Innovator',
    'Smart System Builder',
];

// Floating IoT Icon
const FloatingIcon = ({ icon, x, y, delay }: { icon: string; x: string; y: string; delay: number }) => (
    <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 5, -5, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
        style={{
            position: 'absolute', left: x, top: y,
            fontSize: 'clamp(1rem, 3vw, 2.5rem)',
            filter: 'drop-shadow(0 0 12px rgba(147,51,234,0.8))',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
        }}
    >
        {icon}
    </motion.div>
);

export default function Hero() {
    const [subtitleIdx, setSubtitleIdx] = useState(0);
    const [typed, setTyped] = useState('');

    useEffect(() => {
        const target = SUBTITLES[subtitleIdx];
        if (typed.length < target.length) {
            const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 60);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setSubtitleIdx(i => (i + 1) % SUBTITLES.length);
            setTyped('');
        }, 2500);
        return () => clearTimeout(t);
    }, [typed, subtitleIdx]);

    // Magnetic button
    const btnRef = useRef<HTMLButtonElement>(null);
    const btn2Ref = useRef<HTMLButtonElement>(null);
    const makeMagnetic = (ref: React.RefObject<HTMLButtonElement | null>) => ({
        onMouseMove: (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width / 2) * 0.3;
            const dy = (e.clientY - r.top - r.height / 2) * 0.3;
            ref.current.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
        },
        onMouseLeave: () => {
            if (!ref.current) return;
            ref.current.style.transform = '';
        },
    });

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.3);
      animation:rippleEffect 0.6s ease-out forwards;
      pointer-events:none;
    `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    }, []);

    return (
        <section
            id="home"
            style={{
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 100,
                paddingBottom: 60,
            }}
        >
            {/* Floating IoT icons */}
            <FloatingIcon icon="⚡" x="8%" y="20%" delay={0} />
            <FloatingIcon icon="🤖" x="88%" y="15%" delay={0.8} />
            <FloatingIcon icon="📡" x="5%" y="70%" delay={1.5} />
            <FloatingIcon icon="🔌" x="92%" y="65%" delay={0.4} />
            <FloatingIcon icon="💡" x="15%" y="45%" delay={2} />
            <FloatingIcon icon="🛜" x="82%" y="40%" delay={1.2} />

            {/* Hero content */}
            <div style={{ textAlign: 'center', zIndex: 2, position: 'relative', padding: '0 20px', maxWidth: 800 }}>
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: 'rgba(147,51,234,0.12)',
                        border: '1px solid rgba(147,51,234,0.35)',
                        borderRadius: 99,
                        padding: '6px 18px',
                        marginBottom: 24,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.8rem',
                        color: '#a78bfa',
                        letterSpacing: '0.1em',
                    }}
                >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9333ea', boxShadow: '0 0 8px #9333ea', display: 'inline-block', animation: 'pulseGlow 2s ease infinite' }} />
                    PORTFOLIO 2026
                </motion.div>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 12vw, 7rem)',
                        lineHeight: 1.0,
                        marginBottom: 12,
                        background: 'linear-gradient(135deg, #fff 0%, #d8b4fe 30%, #9333ea 60%, #00d4ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 40px rgba(147,51,234,0.5))',
                    }}
                >
                    MAHIL
                    <br />
                    KOTADIYA
                </motion.h1>

                {/* Subtitle typing */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
                        color: '#00d4ff',
                        marginBottom: 40,
                        minHeight: '2em',
                        textShadow: '0 0 20px rgba(0,212,255,0.7)',
                        letterSpacing: '0.05em',
                    }}
                    className="typing-cursor"
                >
                    {typed}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <button
                        ref={btnRef}
                        {...makeMagnetic(btnRef)}
                        onClick={(e) => { handleRipple(e); scrollTo('projects'); }}
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '14px 36px',
                            background: 'linear-gradient(135deg, #6c2bd9, #9333ea)',
                            border: 'none',
                            borderRadius: 12,
                            color: '#fff',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 25px rgba(147,51,234,0.6)',
                            transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                            letterSpacing: '0.04em',
                            width: 'min(100%, 260px)',
                        }}
                        className="light-sweep-btn"
                    >
                        View Projects ⚡
                    </button>

                    <button
                        ref={btn2Ref}
                        {...makeMagnetic(btn2Ref)}
                        onClick={(e) => { handleRipple(e); scrollTo('contact'); }}
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '14px 36px',
                            background: 'transparent',
                            border: '1.5px solid rgba(147,51,234,0.7)',
                            borderRadius: 12,
                            color: '#d8b4fe',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 15px rgba(147,51,234,0.2)',
                            transition: 'transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            letterSpacing: '0.04em',
                            width: 'min(100%, 260px)',
                        }}
                        onMouseEnter={e => {
                            (e.target as HTMLButtonElement).style.background = 'rgba(147,51,234,0.15)';
                            (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(147,51,234,0.4)';
                        }}
                        onMouseLeave={e => {
                            (e.target as HTMLButtonElement).style.background = 'transparent';
                            (e.target as HTMLButtonElement).style.boxShadow = '0 0 15px rgba(147,51,234,0.2)';
                        }}
                    >
                        Contact Me →
                    </button>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    style={{ marginTop: 60, color: '#6d4aaf', fontSize: '0.8rem', letterSpacing: '0.1em', fontFamily: "'Space Mono', monospace" }}
                >
                    ↓ scroll to explore
                </motion.div>
            </div>
        </section>
    );
}
