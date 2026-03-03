'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let mouseX = 0;
        let mouseY = 0;
        let scrollY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Particle system
        const particleCount = 120;
        interface Particle {
            x: number; y: number; vx: number; vy: number; size: number;
            color: string; alpha: number; twinkle: number; twinkleSpeed: number;
        }
        const colors = theme === 'light'
            ? ['rgba(147,51,234,', 'rgba(108,43,217,', 'rgba(0,102,204,', 'rgba(99,102,241,']
            : ['rgba(147,51,234,', 'rgba(0,212,255,', 'rgba(255,0,128,', 'rgba(108,43,217,', 'rgba(0,245,212,'];

        const particles: Particle[] = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.7 + 0.2,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
        }));

        // Grid lines
        const gridOpacity = theme === 'light' ? 0.04 : 0.06;

        let t = 0;
        const draw = () => {
            t += 0.003;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background gradient
            const isDark = theme !== 'light';
            const grad = ctx.createRadialGradient(
                canvas.width / 2 + Math.sin(t * 0.5) * 100,
                canvas.height / 2 + Math.cos(t * 0.3) * 80,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.85
            );
            if (isDark) {
                grad.addColorStop(0, '#120025');
                grad.addColorStop(0.4, '#0a0018');
                grad.addColorStop(0.8, '#06000f');
                grad.addColorStop(1, '#000008');
            } else {
                grad.addColorStop(0, '#f0e8ff');
                grad.addColorStop(0.5, '#f8f4ff');
                grad.addColorStop(1, '#fdfcff');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Animated grid
            ctx.strokeStyle = isDark
                ? `rgba(147,51,234,${gridOpacity})`
                : `rgba(108,43,217,${gridOpacity})`;
            ctx.lineWidth = 1;
            const gridSize = 80;
            const offsetX = (t * 20) % gridSize;
            const offsetY = (scrollY * 0.1) % gridSize;
            for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Glow orbs (layer 1)
            const orbs = [
                { cx: canvas.width * 0.15, cy: canvas.height * 0.3, r: 300, color: isDark ? 'rgba(108,43,217,0.12)' : 'rgba(147,51,234,0.07)', dx: Math.sin(t * 0.4) * 60, dy: Math.cos(t * 0.3) * 50 },
                { cx: canvas.width * 0.8, cy: canvas.height * 0.2, r: 250, color: isDark ? 'rgba(0,212,255,0.08)' : 'rgba(0,100,200,0.05)', dx: Math.cos(t * 0.5) * 50, dy: Math.sin(t * 0.4) * 40 },
                { cx: canvas.width * 0.5, cy: canvas.height * 0.75, r: 350, color: isDark ? 'rgba(255,0,128,0.07)' : 'rgba(180,0,100,0.04)', dx: Math.sin(t * 0.35) * 70, dy: Math.cos(t * 0.45) * 60 },
            ];
            orbs.forEach(orb => {
                const g = ctx.createRadialGradient(orb.cx + orb.dx, orb.cy + orb.dy, 0, orb.cx + orb.dx, orb.cy + orb.dy, orb.r);
                g.addColorStop(0, orb.color);
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(orb.cx + orb.dx, orb.cy + orb.dy, orb.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Moving light streaks
            if (isDark) {
                for (let i = 0; i < 4; i++) {
                    const streakT = t * 0.3 + i * 1.57;
                    const startX = (Math.sin(streakT + i) * 0.5 + 0.5) * canvas.width;
                    const startY = 0;
                    const endX = startX + Math.sin(streakT) * 200;
                    const endY = canvas.height;
                    const g = ctx.createLinearGradient(startX, startY, endX, endY);
                    g.addColorStop(0, 'transparent');
                    g.addColorStop(0.4, `rgba(${i % 2 === 0 ? '147,51,234' : '0,212,255'},0.04)`);
                    g.addColorStop(1, 'transparent');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.moveTo(startX - 10, startY);
                    ctx.lineTo(startX + 10, startY);
                    ctx.lineTo(endX + 10, endY);
                    ctx.lineTo(endX - 10, endY);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            // Particles with mouse interaction
            particles.forEach(p => {
                p.twinkle += p.twinkleSpeed;
                const twinkledAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

                // Mouse repulsion
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    p.vx -= (dx / dist) * 0.08;
                    p.vy -= (dy / dist) * 0.08;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${twinkledAlpha})`;
                ctx.fill();

                // Glow for larger particles
                if (p.size > 1.5) {
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                    g.addColorStop(0, `${p.color}${twinkledAlpha * 0.4})`);
                    g.addColorStop(1, `${p.color}0)`);
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Energy pulse wave
            const pulseR = ((t * 100) % (canvas.width * 1.5));
            ctx.strokeStyle = isDark
                ? `rgba(147,51,234,${Math.max(0, 0.08 - pulseR / (canvas.width * 15))})`
                : `rgba(108,43,217,${Math.max(0, 0.04 - pulseR / (canvas.width * 20))})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease',
            }}
        />
    );
}
