import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingHeartsProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const FloatingHearts = ({ 
  count = 15, 
  color = '#FFB6C1',
  minSize = 15,
  maxSize = 35,
  speed = 1 
}: FloatingHeartsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hearts: SVGElement[] = [];
    const container = containerRef.current;
    const ctx = gsap.context(() => {
      // Create hearts
      for (let i = 0; i < count; i++) {
        const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        heart.setAttribute('viewBox', '0 0 24 24');
        heart.setAttribute('fill', color);
        heart.style.position = 'absolute';
        heart.style.width = `${gsap.utils.random(minSize, maxSize)}px`;
        heart.style.height = `${gsap.utils.random(minSize, maxSize)}px`;
        heart.style.left = `${gsap.utils.random(0, 100)}%`;
        heart.style.top = `${gsap.utils.random(0, 100)}%`;
        heart.style.opacity = `${gsap.utils.random(0.2, 0.5)}`;
        heart.style.transform = 'translate3d(0,0,0)';

        heart.innerHTML = '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>';
        container.appendChild(heart);
        hearts.push(heart);

        // Animate each heart
        gsap.to(heart, {
          y: `random(-20, 20)`,
          x: `random(-14, 14)`,
          rotation: `random(-10, 10)`,
          duration: gsap.utils.random(2.5, 4.5) * speed,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2),
          force3D: true,
        });

        // Pulse opacity
        gsap.to(heart, {
          opacity: gsap.utils.random(0.15, 0.45),
          duration: gsap.utils.random(2, 3.5) * speed,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2),
        });
      }
    }, containerRef);

    return () => {
      gsap.killTweensOf(hearts);
      hearts.forEach((heart) => heart.remove());
      container.innerHTML = '';
      ctx.revert();
    };
  }, [count, color, minSize, maxSize, speed]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
};

export default FloatingHearts;
