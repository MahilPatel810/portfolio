'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VISION_ITEMS = [
    {
        icon: '🍓',
        title: 'Raspberry Pi Computing',
        subtitle: 'Currently Exploring',
        description:
            'Diving deep into Raspberry Pi as a full Linux-capable single-board computer — setting up headless servers, GPIO interfacing, and bridging the gap between hardware and software at a new level of complexity.',
        tags: ['Raspberry Pi', 'Linux', 'GPIO', 'Headless Server'],
        color: '#e879f9',
        glow: 'rgba(232,121,249,0.45)',
        status: 'active',
    },
    {
        icon: '🤖',
        title: 'Artificial Intelligence',
        subtitle: 'Learning & Applying',
        description:
            'Actively studying the foundations of Artificial Intelligence — from neural network architectures to real-world AI integrations — with a focus on embedding AI decision-making into embedded and IoT systems.',
        tags: ['Neural Networks', 'AI Concepts', 'Edge AI', 'Python'],
        color: '#9333ea',
        glow: 'rgba(147,51,234,0.45)',
        status: 'active',
    },
    {
        icon: '🧠',
        title: 'Machine Learning',
        subtitle: 'Hands-On Training',
        description:
            'Training and deploying Machine Learning models — experimenting with scikit-learn, TensorFlow Lite, and dataset pipelines. Goal: run inference directly on embedded devices and IoT hardware for truly smart systems.',
        tags: ['ML Models', 'TensorFlow Lite', 'scikit-learn', 'Edge Inference'],
        color: '#00d4ff',
        glow: 'rgba(0,212,255,0.45)',
        status: 'active',
    },
    {
        icon: '🚀',
        title: 'AI-Powered IoT',
        subtitle: 'Future Vision',
        description:
            'The endgame: merging IoT hardware with intelligent AI — building systems that don\'t just collect data but understand it. Smart sensors that learn, robots that adapt, and devices that predict — all running locally on embedded hardware.',
        tags: ['AIoT', 'Smart Sensors', 'Autonomous Systems', 'Future Tech'],
        color: '#ff6b35',
        glow: 'rgba(255,107,53,0.45)',
        status: 'future',
    },
];

function VisionCard({ item, index }: { item: typeof VISION_ITEMS[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 12;
        const y = (e.clientY - rect.top - rect.height / 2) / 12;
        card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = '';
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 70, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                border: `1px solid ${item.color}30`,
                borderRadius: 20,
                padding: 'clamp(24px, 3vw, 36px)',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'transform 0.15s ease, box-shadow 0.4s ease',
                boxShadow: `0 0 25px ${item.glow}20, 0 8px 32px rgba(0,0,0,0.3)`,
            }}
            whileHover={{ scale: 1.01 }}
        >
            {/* Top glow border */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                boxShadow: `0 0 18px ${item.color}`,
            }} />

            {/* Corner radial glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at top left, ${item.color}10, transparent 65%)`,
                pointerEvents: 'none',
            }} />

            {/* Status badge */}
            <div style={{
                position: 'absolute', top: 18, right: 18,
                display: 'flex', alignItems: 'center', gap: 6,
                background: item.status === 'active' ? 'rgba(0,245,100,0.12)' : `${item.color}18`,
                border: `1px solid ${item.status === 'active' ? 'rgba(0,245,100,0.35)' : `${item.color}44`}`,
                borderRadius: 99,
                padding: '4px 10px',
            }}>
                {item.status === 'active' && (
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: '#00f564' }}
                    />
                )}
                {item.status === 'future' && (
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: item.color }}
                    />
                )}
                <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    color: item.status === 'active' ? '#00f564' : item.color,
                    letterSpacing: '0.08em',
                }}>
                    {item.status === 'active' ? 'LEARNING NOW' : 'FUTURE GOAL'}
                </span>
            </div>

            {/* Icon */}
            <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }}
                style={{ fontSize: '3rem', marginBottom: 18, display: 'inline-block' }}
            >
                {item.icon}
            </motion.div>

            {/* Title */}
            <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                color: '#fff',
                marginBottom: 4,
            }}>
                {item.title}
            </h3>

            {/* Subtitle */}
            <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.76rem',
                color: item.color,
                textShadow: `0 0 10px ${item.color}`,
                marginBottom: 14,
                letterSpacing: '0.04em',
            }}>
                {item.subtitle}
            </p>

            {/* Description */}
            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                lineHeight: 1.75,
                fontFamily: "'Outfit', sans-serif",
                marginBottom: 20,
            }}>
                {item.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {item.tags.map((tag, ti) => (
                    <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.14 + ti * 0.06 + 0.4 }}
                        whileHover={{ scale: 1.08, boxShadow: `0 0 12px ${item.color}` }}
                        style={{
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}40`,
                            borderRadius: 99,
                            padding: '4px 12px',
                            fontSize: '0.72rem',
                            color: item.color,
                            fontFamily: "'Space Mono', monospace",
                            cursor: 'default',
                        }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>

            {/* Animated progress bar at bottom */}
            <div style={{ marginTop: 22, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={inView ? { width: item.status === 'active' ? '65%' : '20%' } : {}}
                    transition={{ duration: 1.4, delay: index * 0.14 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        boxShadow: `0 0 8px ${item.color}`,
                        borderRadius: 99,
                    }}
                />
            </div>
            <div style={{
                marginTop: 6,
                display: 'flex', justifyContent: 'space-between',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.62rem',
                color: '#4a2d7a',
            }}>
                <span>{item.status === 'active' ? 'IN PROGRESS' : 'PLANNED'}</span>
                <span style={{ color: item.color }}>{item.status === 'active' ? '65%' : '20%'}</span>
            </div>
        </motion.div>
    );
}

export default function FutureVision() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            id="vision"
            ref={ref}
            style={{
                padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            {/* Section background accent */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 80% 50%, rgba(232,121,249,0.04) 0%, transparent 60%)',
            }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 64 }}
                >
                    <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.8rem',
                        color: '#e879f9',
                        letterSpacing: '0.2em',
                    }}>
                        05 / VISION
                    </span>
                    <h2 className="section-title" style={{ marginTop: 8 }}>Current Learning &amp; Future Vision</h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        style={{
                            color: 'var(--text-secondary)',
                            marginTop: 14,
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                            maxWidth: 600,
                            margin: '14px auto 0',
                            lineHeight: 1.7,
                        }}
                    >
                        I recently began exploring <span style={{ color: '#e879f9', fontWeight: 600 }}>Raspberry Pi</span>,{' '}
                        <span style={{ color: '#9333ea', fontWeight: 600 }}>Artificial Intelligence</span>, and{' '}
                        <span style={{ color: '#00d4ff', fontWeight: 600 }}>Machine Learning</span> — with the goal of
                        infusing intelligent decision-making directly into the hardware and IoT systems I build.
                    </motion.p>
                </motion.div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: 24,
                }}>
                    {VISION_ITEMS.map((item, i) => (
                        <VisionCard key={item.title} item={item} index={i} />
                    ))}
                </div>

                {/* Bottom tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    style={{
                        textAlign: 'center',
                        marginTop: 56,
                        padding: '28px 32px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: 18,
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 0 40px rgba(147,51,234,0.08)',
                    }}
                >
                    <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                            background: 'linear-gradient(135deg, #e879f9, #9333ea, #00d4ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '0.03em',
                        }}
                    >
                        🔭&nbsp; &ldquo;The convergence of Hardware + AI + IoT is where I&rsquo;m heading — and I&rsquo;m just getting started.&rdquo;
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
