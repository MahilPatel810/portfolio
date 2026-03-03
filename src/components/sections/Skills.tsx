'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
    {
        category: 'Frontend',
        emoji: '🌐',
        color: '#9333ea',
        items: [
            { name: 'HTML', level: 90 },
            { name: 'CSS', level: 85 },
            { name: 'JavaScript', level: 80 },
        ],
    },
    {
        category: 'Hardware & IoT',
        emoji: '⚡',
        color: '#00d4ff',
        items: [
            { name: 'Arduino', level: 92 },
            { name: 'ESP32', level: 88 },
            { name: 'IoT Sensors', level: 82 },
            { name: 'Embedded Systems', level: 78 },
        ],
    },
    {
        category: 'Other Skills',
        emoji: '🚀',
        color: '#ff0080',
        items: [
            { name: 'Problem Solving', level: 90 },
            { name: 'Project Development', level: 85 },
        ],
    },
];

function ProgressBar({ level, color, inView }: { level: number; color: string; inView: boolean }) {
    return (
        <div
            style={{
                height: 6,
                borderRadius: 99,
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
                marginTop: 6,
            }}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{
                    height: '100%',
                    borderRadius: 99,
                    background: `linear-gradient(90deg, ${color}aa, ${color})`,
                    boxShadow: `0 0 10px ${color}66`,
                }}
            />
        </div>
    );
}

function SkillCard({ group, index }: { group: typeof skills[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 12;
        const y = (e.clientY - rect.top - rect.height / 2) / 12;
        card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = '';
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${group.color}33`,
                borderRadius: 18,
                padding: 'clamp(20px, 3vw, 32px)',
                transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
            }}
            whileHover={{ boxShadow: `0 0 30px ${group.color}44` }}
        >
            {/* Top glow */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
                boxShadow: `0 0 15px ${group.color}`,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    style={{ fontSize: '1.8rem' }}
                >{group.emoji}</motion.span>
                <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: group.color,
                    textShadow: `0 0 10px ${group.color}66`,
                }}>
                    {group.category}
                </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {group.items.map(skill => (
                    <div key={skill.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                color: 'var(--text-primary)',
                            }}>{skill.name}</span>
                            <span style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: '0.75rem',
                                color: group.color,
                            }}>{skill.level}%</span>
                        </div>
                        <ProgressBar level={skill.level} color={group.color} inView={inView} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            id="skills"
            ref={ref}
            style={{
                padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#00d4ff', letterSpacing: '0.2em' }}>
                        02 / SKILLS
                    </span>
                    <h2 className="section-title" style={{ marginTop: 8 }}>Tech Arsenal</h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 24,
                }}>
                    {skills.map((group, i) => (
                        <SkillCard key={group.category} group={group} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
