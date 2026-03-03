'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable custom cursor on non-touch devices
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        setIsVisible(true);
        const dot = dotRef.current!;
        const ring = ringRef.current!;
        let ringX = 0, ringY = 0;
        let dotX = 0, dotY = 0;
        let raf: number;

        const onMove = (e: MouseEvent) => {
            dotX = e.clientX;
            dotY = e.clientY;
        };
        window.addEventListener('mousemove', onMove);

        const tick = () => {
            if (!dot || !ring) return;
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
            ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
            raf = requestAnimationFrame(tick);
        };
        tick();

        const onEnter = () => {
            if (!ring) return;
            ring.style.transform += ' scale(1.8)';
            ring.style.borderColor = '#00d4ff';
        };
        const onLeave = () => {
            if (!ring) return;
            ring.style.borderColor = '#9333ea';
        };

        const links = document.querySelectorAll('a, button, [data-cursor]');
        links.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: '#9333ea',
                    boxShadow: '0 0 12px #9333ea, 0 0 24px rgba(147,51,234,0.5)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    transition: 'opacity 0.3s',
                    willChange: 'transform',
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: 36, height: 36,
                    borderRadius: '50%',
                    border: '1.5px solid #9333ea',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    transition: 'border-color 0.2s, box-shadow 0.3s',
                    boxShadow: '0 0 10px rgba(147,51,234,0.3)',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
