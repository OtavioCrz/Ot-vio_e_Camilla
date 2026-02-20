import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingHeartsProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const FloatingHearts = ({ 
  count = 20, 
  colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#DC143C', '#FF6B81'],
  minSize = 12,
  maxSize = 28,
  speed = 1 
}: FloatingHeartsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hearts: HTMLDivElement[] = [];
    const container = containerRef.current;
    const containerHeight = container.offsetHeight || 800;

    const ctx = gsap.context(() => {
      for (let i = 0; i < count; i++) {
        const wrapper = document.createElement('div');
        const size = gsap.utils.random(minSize, maxSize);
        const color = colors[Math.floor(Math.random() * colors.length)];

        wrapper.style.position = 'absolute';
        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size}px`;
        wrapper.style.left = `${gsap.utils.random(2, 98)}%`;
        wrapper.style.top = `${-gsap.utils.random(10, 100)}px`;
        wrapper.style.opacity = `${gsap.utils.random(0.4, 0.85)}`;
        wrapper.style.willChange = 'transform';
        wrapper.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

        container.appendChild(wrapper);
        hearts.push(wrapper);

        const fallDuration = gsap.utils.random(4, 8) * speed;
        const delay = gsap.utils.random(0, 6);

        // Rain fall animation — hearts fall from top and reset
        gsap.to(wrapper, {
          y: containerHeight + 120,
          x: `random(-40, 40)`,
          rotation: `random(-60, 60)`,
          duration: fallDuration,
          ease: 'none',
          repeat: -1,
          delay,
          force3D: true,
          onRepeat: () => {
            gsap.set(wrapper, {
              left: `${gsap.utils.random(2, 98)}%`,
              y: 0,
              rotation: 0,
              opacity: gsap.utils.random(0.4, 0.85),
            });
          },
        });

        // Gentle horizontal sway
        gsap.to(wrapper, {
          x: `random(-30, 30)`,
          duration: gsap.utils.random(1.5, 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay,
        });
      }
    }, containerRef);

    return () => {
      gsap.killTweensOf(hearts);
      hearts.forEach((h) => h.remove());
      container.innerHTML = '';
      ctx.revert();
    };
  }, [count, colors, minSize, maxSize, speed]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingHearts;
