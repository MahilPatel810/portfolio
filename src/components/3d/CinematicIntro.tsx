'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBTITLE_LINES = [
    'Arduino & ESP32 Developer',
    'Creative Frontend Developer',
    'IoT Innovator',
    'Smart System Builder',
];

type Phase = 'flight' | 'explode' | 'text';

interface IntroProps {
    onDone: () => void;
}

export default function CinematicIntro({ onDone }: IntroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<Phase>('flight');
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [typedText, setTypedText] = useState('');

    // Track phase in a ref so the canvas loop sees it without re-closure
    const phaseRef = useRef<Phase>('flight');
    const setPhaseOnce = useRef<Record<Phase, boolean>>({
        flight: false,
        explode: false,
        text: false,
    });

    const updatePhase = (next: Phase) => {
        if (!setPhaseOnce.current[next]) {
            setPhaseOnce.current[next] = true;
            phaseRef.current = next;
            setPhase(next);
        }
    };

    // Typing subtitle (only runs when phase === 'text')
    useEffect(() => {
        if (phase !== 'text') return;
        const target = SUBTITLE_LINES[subtitleIndex];
        if (typedText.length < target.length) {
            const t = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 55);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setSubtitleIndex(i => (i + 1) % SUBTITLE_LINES.length);
            setTypedText('');
        }, 2200);
        return () => clearTimeout(t);
    }, [phase, typedText, subtitleIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const W = () => canvas.width;
        const H = () => canvas.height;

        let t = 0;
        let animId: number;
        let explosionTime = -1;

        type Particle = { x: number; y: number; vx: number; vy: number; r: number; color: string; life: number };
        type Smoke = { x: number; y: number; vx: number; vy: number; r: number; life: number };
        type Debris = { x: number; y: number; vx: number; vy: number; rot: number; rotSpeed: number; size: number; color: string; life: number };

        let particles: Particle[] = [];
        let smokes: Smoke[] = [];
        let debris: Debris[] = [];

        const spawnExplosion = (ex: number, ey: number) => {
            const burstColors = ['#ff6b35', '#ff0080', '#ffd700', '#ff4500', '#fff', '#9333ea', '#00d4ff', '#a855f7'];
            for (let i = 0; i < 320; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 18 + 2;
                particles.push({
                    x: ex, y: ey,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    r: Math.random() * 7 + 1,
                    color: burstColors[Math.floor(Math.random() * burstColors.length)],
                    life: 1,
                });
            }
            const debrisColors = ['#666', '#999', '#ff6b35', '#333', '#aa6600'];
            for (let i = 0; i < 35; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 12 + 1;
                debris.push({
                    x: ex, y: ey,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 6,
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.35,
                    size: Math.random() * 14 + 4,
                    color: debrisColors[Math.floor(Math.random() * debrisColors.length)],
                    life: 1,
                });
            }
            for (let i = 0; i < 22; i++) {
                smokes.push({
                    x: ex + (Math.random() - 0.5) * 90,
                    y: ey + (Math.random() - 0.5) * 90,
                    vx: (Math.random() - 0.5) * 3,
                    vy: -Math.random() * 2 - 0.5,
                    r: Math.random() * 45 + 20,
                    life: 1,
                });
            }
        };

        const drawPlane = (
            x: number, y: number, scale: number,
            color: string, glowColor: string,
            flipX: boolean, angle: number
        ) => {
            const w = W(), h = H();
            void h;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            if (flipX) ctx.scale(-1, 1);
            ctx.scale(scale * (w / 1440), scale * (w / 1440));

            ctx.shadowBlur = 30;
            ctx.shadowColor = glowColor;

            // Fuselage
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(65, 0);
            ctx.lineTo(-65, -11);
            ctx.lineTo(-42, 0);
            ctx.lineTo(-65, 11);
            ctx.closePath();
            ctx.fill();

            // Cockpit
            ctx.fillStyle = '#00d4ff';
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.ellipse(28, -2, 13, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Main wings
            ctx.fillStyle = color;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 22;
            ctx.beginPath();
            ctx.moveTo(12, 0); ctx.lineTo(-20, -55); ctx.lineTo(-52, -55); ctx.lineTo(-32, 0);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(12, 0); ctx.lineTo(-20, 55); ctx.lineTo(-52, 55); ctx.lineTo(-32, 0);
            ctx.closePath();
            ctx.fill();

            // Tail fin
            ctx.beginPath();
            ctx.moveTo(-52, 0); ctx.lineTo(-65, -34); ctx.lineTo(-48, 0);
            ctx.closePath();
            ctx.fill();

            // Engine glow
            ctx.shadowBlur = 45;
            ctx.shadowColor = glowColor;
            ctx.fillStyle = glowColor;
            ctx.beginPath();
            ctx.ellipse(-61, 0, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Afterburner
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 25;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.beginPath();
            ctx.ellipse(-68, 0, 5, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        const draw = () => {
            t += 0.018;
            const w = W(), h = H();
            const cx = w / 2, cy = h / 2;
            ctx.clearRect(0, 0, w, h);

            // Background
            const bgGrad = ctx.createLinearGradient(0, 0, w, h);
            bgGrad.addColorStop(0, '#04001a');
            bgGrad.addColorStop(0.45, '#070020');
            bgGrad.addColorStop(0.8, '#090028');
            bgGrad.addColorStop(1, '#050016');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);

            // Stars
            for (let i = 0; i < 220; i++) {
                const sx = (i * 137.5) % w;
                const sy = (i * 91.3) % h;
                const b = 0.25 + 0.45 * Math.sin(t * 2.2 + i * 0.6);
                ctx.fillStyle = `rgba(255,255,255,${b * 0.55})`;
                ctx.beginPath();
                ctx.arc(sx, sy, i % 4 === 0 ? 1.6 : 0.9, 0, Math.PI * 2);
                ctx.fill();
            }

            // Nebula glow clouds
            [[w * 0.2, h * 0.28, 'rgba(108,43,217,0.08)'],
            [w * 0.78, h * 0.38, 'rgba(0,212,255,0.06)'],
            [w * 0.5, h * 0.72, 'rgba(255,0,128,0.04)']
            ].forEach(([nx, ny, nc]) => {
                const g = ctx.createRadialGradient(nx as number, ny as number, 0, nx as number, ny as number, 260);
                g.addColorStop(0, nc as string);
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            });

            // Ground horizon blend
            const groundGrad = ctx.createLinearGradient(0, h * 0.62, 0, h);
            groundGrad.addColorStop(0, 'transparent');
            groundGrad.addColorStop(1, 'rgba(108,43,217,0.14)');
            ctx.fillStyle = groundGrad;
            ctx.fillRect(0, h * 0.62, w, h * 0.38);

            const horizGrad = ctx.createLinearGradient(0, h * 0.62, 0, h * 0.72);
            horizGrad.addColorStop(0, 'rgba(147,51,234,0.18)');
            horizGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = horizGrad;
            ctx.fillRect(0, h * 0.62, w, h * 0.1);

            // Grid lines
            ctx.strokeStyle = 'rgba(147,51,234,0.06)';
            ctx.lineWidth = 1;
            for (let gx = 0; gx < w; gx += 90) {
                ctx.beginPath();
                ctx.moveTo(gx, h * 0.72);
                ctx.lineTo(cx + (gx - cx) * 0.05, h);
                ctx.stroke();
            }

            // ---------- FLIGHT PHASE ----------
            if (phaseRef.current === 'flight') {
                const prog = Math.min(t / 4.5, 1);

                const p1x = -120 + prog * (cx + 220);
                const p1y = h * 0.18 + prog * (cy - h * 0.18);
                const p1angle = 0.18 + prog * 0.15;

                const p2x = w + 120 - prog * (w - cx + 220);
                const p2y = h * 0.18 + prog * (cy - h * 0.18);
                const p2angle = -(0.18 + prog * 0.15);

                // Exhaust trails
                ctx.save();
                ctx.filter = 'blur(3px)';
                for (let j = 0; j < 18; j++) {
                    const frac = j / 18;
                    const trailX1 = p1x - 80 * frac * (w / 1440);
                    const trailX2 = p2x + 80 * frac * (w / 1440);
                    ctx.fillStyle = `rgba(147,51,234,${0.4 - frac * 0.35})`;
                    ctx.beginPath(); ctx.arc(trailX1, p1y, (5 - frac * 4), 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = `rgba(0,212,255,${0.4 - frac * 0.35})`;
                    ctx.beginPath(); ctx.arc(trailX2, p2y, (5 - frac * 4), 0, Math.PI * 2); ctx.fill();
                }
                ctx.restore();

                drawPlane(p1x, p1y, 1.3, '#7c3aed', '#9333ea', false, p1angle);
                drawPlane(p2x, p2y, 1.3, '#0077aa', '#00d4ff', true, p2angle);

                // Trigger explosion when planes reach center
                if (t > 4.5 && explosionTime < 0) {
                    explosionTime = t;
                    spawnExplosion(cx, cy);
                    updatePhase('explode');
                }
            }

            // ---------- EXPLODE PHASE ----------
            if (phaseRef.current === 'explode' && explosionTime > 0) {
                const eT = t - explosionTime;

                // Flash
                if (eT < 0.3) {
                    ctx.fillStyle = `rgba(255,180,50,${0.85 - eT * 2.5})`;
                    ctx.fillRect(0, 0, w, h);
                }

                // Shockwaves
                if (eT > 0.08) {
                    [700, 450, 250].forEach((maxR, i) => {
                        const r = (eT - 0.08) * maxR;
                        const a = Math.max(0, 0.65 - eT * 0.45 - i * 0.15);
                        const colors = ['rgba(255,107,53,', 'rgba(147,51,234,', 'rgba(255,220,50,'];
                        ctx.strokeStyle = `${colors[i]}${a})`;
                        ctx.lineWidth = 4 - i;
                        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
                    });
                }

                // Fire glow
                if (eT < 2.5) {
                    const fa = Math.max(0, 0.85 - eT * 0.38);
                    const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180 + eT * 220);
                    fg.addColorStop(0, `rgba(255,230,60,${fa})`);
                    fg.addColorStop(0.3, `rgba(255,100,0,${fa * 0.72})`);
                    fg.addColorStop(0.65, `rgba(147,51,234,${fa * 0.3})`);
                    fg.addColorStop(1, 'transparent');
                    ctx.fillStyle = fg;
                    ctx.beginPath(); ctx.arc(cx, cy, 180 + eT * 220, 0, Math.PI * 2); ctx.fill();
                }

                // Smoke
                smokes = smokes.filter(s => {
                    s.x += s.vx; s.y += s.vy; s.r += 1.8; s.life -= 0.008;
                    const alpha = Math.max(0, s.life * 0.28);
                    ctx.fillStyle = `rgba(55,35,75,${alpha})`;
                    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
                    return s.life > 0;
                });

                // Debris
                debris = debris.filter(d => {
                    d.x += d.vx; d.y += d.vy; d.vy += 0.45; d.vx *= 0.985;
                    d.rot += d.rotSpeed; d.life -= 0.013;
                    ctx.save();
                    ctx.translate(d.x, d.y); ctx.rotate(d.rot);
                    const hex = Math.max(0, Math.floor(d.life * 200)).toString(16).padStart(2, '0');
                    ctx.fillStyle = `${d.color}${hex}`;
                    ctx.fillRect(-d.size / 2, -d.size / 4, d.size, d.size / 2);
                    ctx.restore();
                    return d.life > 0;
                });

                // Particles
                particles = particles.filter(p => {
                    p.x += p.vx; p.y += p.vy; p.vy += 0.28;
                    p.vx *= 0.982; p.vy *= 0.982; p.life -= 0.014;
                    ctx.shadowBlur = 10; ctx.shadowColor = p.color;
                    const hex = Math.max(0, Math.floor(p.life * 230)).toString(16).padStart(2, '0');
                    ctx.fillStyle = `${p.color}${hex}`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.r * p.life), 0, Math.PI * 2); ctx.fill();
                    return p.life > 0;
                });
                ctx.shadowBlur = 0;

                // Transition to text after 3.5s
                if (eT > 3.5) {
                    updatePhase('text');
                }
            }

            // ---------- TEXT PHASE - let particles fade ----------
            if (phaseRef.current === 'text') {
                smokes = smokes.filter(s => {
                    s.x += s.vx * 0.3; s.y += s.vy * 0.3; s.r += 0.4; s.life -= 0.012;
                    const alpha = Math.max(0, s.life * 0.15);
                    ctx.fillStyle = `rgba(55,35,75,${alpha})`;
                    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
                    return s.life > 0;
                });
                particles = particles.filter(p => {
                    p.x += p.vx * 0.15; p.y += p.vy * 0.15; p.life -= 0.018;
                    const hex = Math.max(0, Math.floor(p.life * 160)).toString(16).padStart(2, '0');
                    ctx.fillStyle = `${p.color}${hex}`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.r * p.life), 0, Math.PI * 2); ctx.fill();
                    return p.life > 0;
                });
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 9000,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
            }}
        >
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

            {/* Text reveal overlay */}
            <AnimatePresence>
                {phase === 'text' && (
                    <motion.div
                        key="text-reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'relative', zIndex: 10,
                            textAlign: 'center',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: 24,
                            padding: '0 20px',
                        }}
                    >
                        {/* Glow halo */}
                        <div style={{
                            position: 'absolute',
                            width: 600, height: 250,
                            background: 'radial-gradient(ellipse, rgba(147,51,234,0.25) 0%, transparent 70%)',
                            pointerEvents: 'none',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }} />

                        <motion.h1
                            initial={{ scale: 0.3, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 900,
                                fontSize: 'clamp(2.4rem, 8vw, 5.5rem)',
                                letterSpacing: '0.04em',
                                background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 30%, #9333ea 60%, #00d4ff 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 35px rgba(147,51,234,0.9))',
                                position: 'relative', zIndex: 1,
                            }}
                        >
                            MAHIL KOTADIYA
                        </motion.h1>

                        <motion.p
                            key={subtitleIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                                color: '#00d4ff',
                                textShadow: '0 0 18px rgba(0,212,255,0.9)',
                                letterSpacing: '0.08em',
                                minHeight: '2em',
                                position: 'relative', zIndex: 1,
                            }}
                            className="typing-cursor"
                        >
                            {typedText}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 40, scale: 0.7 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.09, boxShadow: '0 0 60px rgba(147,51,234,1)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onDone}
                            style={{
                                marginTop: 8,
                                padding: '16px 52px',
                                background: 'linear-gradient(135deg, #6c2bd9, #9333ea)',
                                border: '1px solid rgba(200,150,255,0.4)',
                                borderRadius: 14,
                                color: '#fff',
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                letterSpacing: '0.06em',
                                boxShadow: '0 0 30px rgba(147,51,234,0.7)',
                                position: 'relative', overflow: 'hidden', zIndex: 1,
                            }}
                            className="light-sweep-btn"
                        >
                            ENTER PORTFOLIO →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skip button - always visible during flight/explosion */}
            {phase !== 'text' && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.75 }}
                    transition={{ delay: 1.2 }}
                    onClick={onDone}
                    style={{
                        position: 'absolute', bottom: 30, right: 30,
                        background: 'rgba(108,43,217,0.22)',
                        border: '1px solid rgba(147,51,234,0.45)',
                        borderRadius: 9,
                        color: '#a78bfa',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.85rem',
                        padding: '8px 18px',
                        cursor: 'pointer',
                        zIndex: 20,
                    }}
                >
                    Skip Intro ›
                </motion.button>
            )}
        </div>
    );
}
