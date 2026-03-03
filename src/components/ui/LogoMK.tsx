'use client';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: number;
    showText?: boolean;
    className?: string;
}

export default function LogoMK({ size = 60, showText = true, className }: LogoProps) {
    const scale = size / 100;

    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible', filter: 'drop-shadow(0 0 12px rgba(147,51,234,0.8))' }}
            >
                <defs>
                    {/* Main M gradient: blue left, purple/pink right */}
                    <linearGradient id="mGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1a90ff" />
                        <stop offset="40%" stopColor="#7c3aed" />
                        <stop offset="70%" stopColor="#c026d3" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>

                    {/* Inner M gradient (slightly lighter) */}
                    <linearGradient id="mGradInner" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60b8ff" />
                        <stop offset="40%" stopColor="#a855f7" />
                        <stop offset="80%" stopColor="#e879f9" />
                        <stop offset="100%" stopColor="#c026d3" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Circuit trace animation mask */}
                    <mask id="traceMask">
                        <rect width="100" height="100" fill="white" />
                    </mask>
                </defs>

                {/* === OUTER M BORDER === */}
                {/* Left outer leg */}
                <path
                    d="M8,90 L8,10 L50,55 L92,10 L92,90"
                    stroke="url(#mGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow)"
                />

                {/* === INNER M (nested lines) === */}
                <path
                    d="M16,85 L16,22 L50,60 L84,22 L84,85"
                    stroke="url(#mGradInner)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow)"
                    opacity="0.85"
                />
                <path
                    d="M22,80 L22,32 L50,64 L78,32 L78,80"
                    stroke="url(#mGradInner)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.6"
                />

                {/* === CIRCUIT TRACES - Left side === */}
                {/* Horizontal trace, left outer */}
                <line x1="4" y1="30" x2="8" y2="30" stroke="#1a90ff" strokeWidth="1.2" opacity="0.9" />
                <circle cx="4" cy="30" r="1.8" fill="#1a90ff" opacity="0.9" />

                <line x1="4" y1="50" x2="8" y2="50" stroke="#4db8ff" strokeWidth="1.2" opacity="0.85" />
                <circle cx="4" cy="50" r="1.8" fill="#4db8ff" opacity="0.85" />

                <line x1="4" y1="68" x2="8" y2="68" stroke="#1a90ff" strokeWidth="1.2" opacity="0.8" />
                <circle cx="4" cy="68" r="1.5" fill="#1a90ff" opacity="0.8" />

                {/* Vertical trace down left */}
                <line x1="3" y1="15" x2="3" y2="50" stroke="#1a90ff" strokeWidth="1" opacity="0.5" />
                <circle cx="3" cy="15" r="1.5" fill="#60b8ff" opacity="0.7" />

                {/* === CIRCUIT TRACES - Right side === */}
                <line x1="96" y1="30" x2="92" y2="30" stroke="#c026d3" strokeWidth="1.2" opacity="0.9" />
                <circle cx="96" cy="30" r="1.8" fill="#c026d3" opacity="0.9" />

                <line x1="96" y1="50" x2="92" y2="50" stroke="#a855f7" strokeWidth="1.2" opacity="0.85" />
                <circle cx="96" cy="50" r="1.8" fill="#a855f7" opacity="0.85" />

                <line x1="96" y1="68" x2="92" y2="68" stroke="#c026d3" strokeWidth="1.2" opacity="0.8" />
                <circle cx="96" cy="68" r="1.5" fill="#c026d3" opacity="0.8" />

                {/* Vertical trace down right */}
                <line x1="97" y1="15" x2="97" y2="50" stroke="#c026d3" strokeWidth="1" opacity="0.5" />
                <circle cx="97" cy="15" r="1.5" fill="#e879f9" opacity="0.7" />

                {/* === DOTS on M joints === */}
                {/* Top left joint */}
                <circle cx="8" cy="10" r="3" fill="#60b8ff" filter="url(#glow)" />
                {/* Top right joint */}
                <circle cx="92" cy="10" r="3" fill="#e879f9" filter="url(#glow)" />
                {/* Center valley */}
                <circle cx="50" cy="55" r="2.5" fill="#a855f7" filter="url(#glow)" />
                {/* Bottom left */}
                <circle cx="8" cy="90" r="3" fill="#1a90ff" filter="url(#glow)" />
                {/* Bottom right */}
                <circle cx="92" cy="90" r="3" fill="#c026d3" filter="url(#glow)" />

                {/* Small circuit dots on inner lines */}
                <circle cx="50" cy="60" r="1.5" fill="#d946ef" opacity="0.7" />

                {/* === ANIMATED PULSE DOT (traveling circuit trace) === */}
                <motion.circle
                    cx="8"
                    cy="10"
                    r="2"
                    fill="white"
                    opacity={0.9}
                    filter="url(#glow)"
                    animate={{
                        cx: [8, 8, 50, 92, 92, 92, 50, 8, 8],
                        cy: [10, 90, 55, 10, 10, 90, 55, 10, 10],
                        opacity: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                        times: [0, 0.2, 0.35, 0.5, 0.55, 0.75, 0.87, 1, 1.0],
                    }}
                />

                {/* Second opposite pulse */}
                <motion.circle
                    cx="92"
                    cy="90"
                    r="2"
                    fill="#00d4ff"
                    opacity={0.85}
                    filter="url(#glow)"
                    animate={{
                        cx: [92, 92, 50, 8, 8, 8, 50, 92, 92],
                        cy: [90, 10, 55, 90, 90, 10, 55, 90, 90],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 2,
                    }}
                />
            </svg>

            {/* Text below logo */}
            {showText && (
                <motion.div
                    animate={{
                        textShadow: [
                            '0 0 8px rgba(147,51,234,0.8)',
                            '0 0 20px rgba(147,51,234,1)',
                            '0 0 8px rgba(147,51,234,0.8)',
                        ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: size < 50 ? '0.55rem' : '0.7rem',
                        letterSpacing: '0.18em',
                        background: 'linear-gradient(90deg, #60b8ff, #a855f7, #e879f9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    MAHIL&rsquo;S PORTFOLIO
                </motion.div>
            )}
        </div>
    );
}
