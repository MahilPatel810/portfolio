'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 15;
        const y = (e.clientY - rect.top - rect.height / 2) / 15;
        card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    const stats = [
        { value: '10+', label: 'Projects Built' },
        { value: '3+', label: 'Years Learning' },
        { value: '∞', label: 'Curiosity' },
    ];

    return (
        <section
            id="about"
            ref={ref}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: 900, width: '100%' }}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#9333ea', letterSpacing: '0.2em' }}>
                        01 / ABOUT ME
                    </span>
                    <h2 className="section-title" style={{ marginTop: 8 }}>Who Am I?</h2>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        padding: 'clamp(30px, 5vw, 50px)',
                        transition: 'transform 0.15s ease, box-shadow 0.4s ease',
                        background: 'rgba(10, 0, 28, 0.82)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: 20,
                        border: '1px solid rgba(147,51,234,0.3)',
                        boxShadow: '0 0 50px rgba(108,43,217,0.12), 0 8px 40px rgba(0,0,0,0.6)',
                        cursor: 'default',
                        animation: 'float 5s ease-in-out infinite',
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(24px, 4vw, 50px)', alignItems: 'center' }}>
                        {/* Avatar */}
                        <motion.div
                            animate={{ boxShadow: ['0 0 20px rgba(147,51,234,0.4)', '0 0 50px rgba(147,51,234,0.8)', '0 0 20px rgba(147,51,234,0.4)'] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            style={{
                                width: 'clamp(80px, 15vw, 140px)',
                                height: 'clamp(80px, 15vw, 140px)',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #6c2bd9, #00d4ff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                flexShrink: 0,
                                border: '3px solid rgba(147,51,234,0.5)',
                            }}
                        >
                            🤖
                        </motion.div>

                        {/* Content */}
                        <div>
                            <h3 style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 700,
                                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                                background: 'linear-gradient(135deg, #fff, #d8b4fe)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: 16,
                            }}>
                                Mahil Kotadiya
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                                fontFamily: "'Outfit', sans-serif",
                            }}>
                                A passionate <span style={{ color: '#9333ea', fontWeight: 600 }}>Computer Engineering student</span> and
                                innovative developer specializing in{' '}
                                <span style={{ color: '#00d4ff', fontWeight: 600 }}>Arduino, ESP32, IoT systems</span>, and futuristic
                                animated web interfaces. I bridge the gap between hardware and software, crafting{' '}
                                <span style={{ color: '#ff0080', fontWeight: 600 }}>smart, connected experiences</span> that push the
                                boundaries of what technology can do.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{
                        margin: '32px 0',
                        height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), rgba(0,212,255,0.5), transparent)',
                    }} />

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    fontWeight: 800,
                                    fontFamily: "'Space Mono', monospace",
                                    background: 'linear-gradient(135deg, #9333ea, #00d4ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 10px rgba(147,51,234,0.5))',
                                }}>
                                    {s.value}
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4, fontFamily: "'Outfit', sans-serif" }}>
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
