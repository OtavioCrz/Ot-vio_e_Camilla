import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StarFieldProps {
  count?: number;
  color?: string;
}

const StarField = ({ count = 30, color = '#FFD700' }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const stars: HTMLDivElement[] = [];
    const container = containerRef.current;
    const ctx = gsap.context(() => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = gsap.utils.random(2, 5);

        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${gsap.utils.random(0, 100)}%;
          top: ${gsap.utils.random(0, 100)}%;
          box-shadow: 0 0 ${gsap.utils.random(2, 6)}px ${color};
          transform: translate3d(0,0,0);
        `;

        container.appendChild(star);
        stars.push(star);

        // Twinkle animation
        gsap.to(star, {
          opacity: gsap.utils.random(0.3, 0.9),
          scale: gsap.utils.random(0.7, 1.15),
          duration: gsap.utils.random(1.8, 3.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3),
          force3D: true,
        });
      }
    }, containerRef);

    return () => {
      gsap.killTweensOf(stars);
      stars.forEach((star) => star.remove());
      container.innerHTML = '';
      ctx.revert();
    };
  }, [count, color]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarField;
