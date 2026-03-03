'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';

const contacts = [
    {
        icon: <Linkedin size={32} />,
        label: 'LinkedIn',
        value: 'Mahil Kotadiya',
        href: 'https://www.linkedin.com/in/mahil-kotadiya',
        color: '#0077b5',
        glow: 'rgba(0,119,181,0.6)',
        emoji: '💼',
    },
    {
        icon: <Mail size={32} />,
        label: 'Gmail',
        value: 'mahilkotadiya810@gmail.com',
        href: 'mailto:mahilkotadiya810@gmail.com',
        color: '#ea4335',
        glow: 'rgba(234,67,53,0.6)',
        emoji: '✉️',
    },
    {
        icon: <Github size={32} />,
        label: 'GitHub',
        value: 'MahilPatel810',
        href: 'https://github.com/MahilPatel810',
        color: '#a78bfa',
        glow: 'rgba(167,139,250,0.6)',
        emoji: '💻',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            id="contact"
            ref={ref}
            style={{
                padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#ff6b35', letterSpacing: '0.2em' }}>
                        04 / CONTACT
                    </span>
                    <h2 className="section-title" style={{ marginTop: 8 }}>Get In Touch</h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        marginTop: 12,
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem',
                    }}>
                        Let&apos;s build something extraordinary together.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: 24,
                }}>
                    {contacts.map((c, i) => (
                        <motion.a
                            key={c.label}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                y: -12,
                                boxShadow: `0 20px 50px ${c.glow}`,
                                borderColor: c.color,
                            }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 16,
                                padding: 'clamp(24px, 4vw, 40px) 24px',
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(147,51,234,0.2)',
                                borderRadius: 20,
                                textDecoration: 'none',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Background glow on hover */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: `radial-gradient(ellipse at center, ${c.glow}0a, transparent 70%)`,
                                pointerEvents: 'none',
                            }} />

                            {/* Icon with spin on hover */}
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    width: 72, height: 72,
                                    borderRadius: '50%',
                                    background: `${c.color}18`,
                                    border: `2px solid ${c.color}55`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: c.color,
                                    boxShadow: `0 0 20px ${c.glow}40`,
                                }}
                            >
                                {c.icon}
                            </motion.div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: c.color,
                                    marginBottom: 6,
                                    textShadow: `0 0 10px ${c.glow}`,
                                }}>
                                    {c.label}
                                </div>
                                <div style={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    wordBreak: 'break-all',
                                }}>
                                    {c.value}
                                </div>
                            </div>

                            <div style={{
                                fontSize: '0.75rem',
                                color: c.color,
                                fontFamily: "'Outfit', sans-serif",
                                display: 'flex', alignItems: 'center', gap: 4,
                            }}>
                                Connect {c.emoji}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
