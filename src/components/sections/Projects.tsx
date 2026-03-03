'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Smart Parking System',
        subtitle: 'ESP32 + Ultrasonic Sensors',
        emoji: '🅿️',
        description:
            'An intelligent parking management system using ESP32 microcontrollers and ultrasonic sensors to detect parking space availability in real-time, displayed via a web dashboard over Wi-Fi.',
        tags: ['ESP32', 'IoT', 'Ultrasonic', 'Wi-Fi', 'Real-time'],
        color: '#9333ea',
        glow: 'rgba(147,51,234,0.5)',
    },
    {
        id: 2,
        title: 'Arduino Automation',
        subtitle: 'Home & Industrial Control',
        emoji: '🔧',
        description:
            'A comprehensive suite of Arduino-powered automation projects including motor control, sensor monitoring, relay-based switching, and LCD interfaces for industrial and home environments.',
        tags: ['Arduino', 'Automation', 'Sensors', 'Motor Control'],
        color: '#00d4ff',
        glow: 'rgba(0,212,255,0.5)',
    },
    {
        id: 3,
        title: 'ESP32 IoT Systems',
        subtitle: 'Smart Connected Devices',
        emoji: '📡',
        description:
            'Developed multiple IoT systems leveraging ESP32 connectivity features including MQTT protocols, cloud integration, real-time sensor dashboards, and automated alert systems.',
        tags: ['ESP32', 'MQTT', 'Cloud', 'Dashboard', 'Alerts'],
        color: '#ff0080',
        glow: 'rgba(255,0,128,0.5)',
    },
    {
        id: 4,
        title: 'Line Following Robot',
        subtitle: 'Arduino Uno + IR Sensor Array',
        emoji: '🤖',
        description:
            'Engineered an autonomous line-following robot powered by Arduino Uno, utilizing a calibrated array of IR sensors for precise line detection. The robot intelligently processes sensor feedback for real-time steering decisions — navigating curves, intersections, and varying track conditions fully autonomously without any manual intervention.',
        tags: ['Arduino Uno', 'IR Sensors', 'Autonomous', 'PID Logic', 'Robotics'],
        color: '#ff6b35',
        glow: 'rgba(255,107,53,0.5)',
    },
    {
        id: 5,
        title: 'Object Detecting Robot',
        subtitle: 'ESP32 · Collision-Free Autonomous',
        emoji: '🛡️',
        description:
            'Built a fully autonomous collision-avoidance robot driven by ESP32, equipped with ultrasonic distance sensors for environmental awareness. The robot dynamically adapts its speed based on proximity data — decelerating as obstacles approach and rerouting intelligently to guarantee zero collisions across any terrain.',
        tags: ['ESP32', 'Ultrasonic', 'Collision Avoidance', 'Autonomous', 'Dynamic Speed'],
        color: '#00f5d4',
        glow: 'rgba(0,245,212,0.5)',
    },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [flipped, setFlipped] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (flipped) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left - rect.width / 2) / 10;
        const y = (clientY - rect.top - rect.height / 2) / 10;
        card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`;
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (flipped) return;
        e.currentTarget.style.transform = '';
    };

    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.25);
      animation:rippleEffect 0.6s ease-out forwards;
      pointer-events:none;
    `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
        >
            <div
                onClick={() => setFlipped(f => !f)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseLeave}
                style={{
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: flipped ? 'transform 0.7s ease' : 'transform 0.15s ease, box-shadow 0.3s ease',
                    transform: flipped ? 'rotateY(180deg)' : '',
                    cursor: 'pointer',
                    borderRadius: 20,
                    touchAction: 'none'
                }}
            >
                {/* Front */}
                <div
                    style={{
                        position: 'relative',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${project.color}33`,
                        borderRadius: 20,
                        padding: 'clamp(24px, 3vw, 36px)',
                        boxShadow: `0 0 20px ${project.glow}22, 0 8px 32px rgba(0,0,0,0.3)`,
                    }}
                >
                    {/* Glow top border */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                        boxShadow: `0 0 15px ${project.color}`,
                    }} />

                    {/* Animated overlay gradient */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(ellipse at bottom right, ${project.color}0a, transparent 70%)`,
                        pointerEvents: 'none',
                    }} />

                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        style={{ fontSize: '3rem', marginBottom: 20 }}
                    >
                        {project.emoji}
                    </motion.div>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        color: '#fff',
                        marginBottom: 6,
                    }}>{project.title}</h3>
                    <p style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.78rem',
                        color: project.color,
                        marginBottom: 16,
                        textShadow: `0 0 8px ${project.color}`,
                    }}>{project.subtitle}</p>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        lineHeight: 1.7,
                        fontFamily: "'Outfit', sans-serif",
                        marginBottom: 20,
                    }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {project.tags.map(tag => (
                            <motion.span
                                key={tag}
                                whileHover={{ scale: 1.07, boxShadow: `0 0 12px ${project.color}` }}
                                style={{
                                    background: `${project.color}18`,
                                    border: `1px solid ${project.color}44`,
                                    borderRadius: 99,
                                    padding: '4px 12px',
                                    fontSize: '0.72rem',
                                    color: project.color,
                                    fontFamily: "'Space Mono', monospace",
                                    cursor: 'default',
                                }}>{tag}</motion.span>
                        ))}
                    </div>
                    <div style={{ marginTop: 20, fontSize: '0.72rem', color: '#6d4aaf', fontFamily: "'Space Mono', monospace" }}>
                        Click card to flip →
                    </div>
                </div>

                {/* Back */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: `linear-gradient(135deg, ${project.color}22 0%, rgba(5,0,15,0.85) 100%)`,
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${project.color}55`,
                        borderRadius: 20,
                        padding: 36,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                        boxShadow: `0 0 40px ${project.glow}`,
                    }}
                >
                    <div style={{ fontSize: '4rem' }}>{project.emoji}</div>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.4rem',
                        color: '#fff',
                        textAlign: 'center',
                    }}>{project.title}</h3>
                    <a
                        href="https://github.com/MahilPatel810"
                        target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleRipple}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: project.color,
                                border: 'none',
                                borderRadius: 10,
                                padding: '12px 24px',
                                color: '#fff',
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: `0 0 20px ${project.glow}`,
                            }}
                        >
                            <Github size={18} /> View on GitHub
                        </button>
                    </a>
                    <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontFamily: "'Space Mono', monospace" }}>
                        Click to flip back
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            id="projects"
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
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#ff0080', letterSpacing: '0.2em' }}>
                        03 / PROJECTS
                    </span>
                    <h2 className="section-title" style={{ marginTop: 8 }}>Featured Work</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontFamily: "'Outfit', sans-serif" }}>
                        Click any card to reveal more
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: 28,
                }}>
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
