'use client';
import { motion } from 'framer-motion';
import LogoMK from '@/components/ui/LogoMK';

export default function Footer() {
    return (
        <footer
            style={{
                position: 'relative',
                zIndex: 2,
                overflow: 'hidden',
                paddingTop: 60,
            }}
        >
            {/* Animated wave */}
            <div style={{ position: 'relative', height: 80, overflow: 'hidden' }}>
                <svg
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveMove 8s linear infinite' }}
                >
                    <path
                        d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z"
                        fill="rgba(108,43,217,0.12)"
                    />
                </svg>
                <svg
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveMove 12s linear infinite reverse', opacity: 0.6 }}
                >
                    <path
                        d="M0,50 C200,10 400,70 600,50 C800,30 1000,70 1200,50 C1400,30 1440,60 1440,50 L1440,80 L0,80 Z"
                        fill="rgba(0,212,255,0.08)"
                    />
                </svg>
            </div>

            {/* Footer content */}
            <div style={{
                background: 'rgba(8,0,16,0.8)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(147,51,234,0.15)',
                padding: '40px 20px',
                textAlign: 'center',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <LogoMK size={80} showText={true} />
                </div>

                <p style={{
                    color: '#6d4aaf',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    marginBottom: 20,
                }}>
                    Arduino & ESP32 Developer · IoT Innovator · Creative Frontend Developer
                </p>

                {/* Divider */}
                <div style={{
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.4), rgba(0,212,255,0.4), transparent)',
                    margin: '20px auto',
                    maxWidth: 500,
                }} />

                <p style={{
                    color: '#4a2d7a',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                }}>
                    © 2026 Mahil Kotadiya. All rights reserved.
                </p>

                {/* Neon dots decoration */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                    {['#9333ea', '#00d4ff', '#ff0080', '#ff6b35', '#00f5d4'].map((c, i) => (
                        <motion.div
                            key={c}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            style={{ width: 6, height: 6, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}` }}
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
}
