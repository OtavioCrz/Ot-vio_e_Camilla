import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !flowerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete,
          });
        },
      });

      // Animate flower growing
      const stem = flowerRef.current?.querySelector('.flower-stem') as Element | null;
      const petals = flowerRef.current?.querySelectorAll('.flower-petal') as NodeListOf<Element> | null;
      const center = flowerRef.current?.querySelector('.flower-center') as Element | null;
      const leaves = flowerRef.current?.querySelectorAll('.flower-leaf') as NodeListOf<Element> | null;

      // Initial states
      if (stem) gsap.set(stem, { scaleY: 0, transformOrigin: 'bottom center' });
      if (petals) gsap.set(petals, { scale: 0, opacity: 0, transformOrigin: 'center' });
      if (center) gsap.set(center, { scale: 0, opacity: 0 });
      if (leaves) gsap.set(leaves, { scale: 0, opacity: 0 });

      // Animation sequence
      if (stem) {
        tl.to(stem, {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      
      if (leaves && leaves.length > 0) {
        tl.to(leaves, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        }, '-=0.4');
      }
      
      if (petals && petals.length > 0) {
        tl.to(petals, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }, '-=0.3');
      }
      
      if (center) {
        tl.to(center, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        }, '-=0.4');
      }

      // Progress animation
      gsap.to({}, {
        duration: 4,
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Create falling petals
      createFallingPetals();
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const createFallingPetals = () => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493'];
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        const size = gsap.utils.random(15, 30);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50% 0 50% 50%;
          left: ${gsap.utils.random(10, 90)}%;
          top: -50px;
          opacity: 0.8;
          pointer-events: none;
          z-index: 10;
        `;
        
        container.appendChild(petal);

        gsap.to(petal, {
          y: '110vh',
          x: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(360, 720),
          duration: gsap.utils.random(4, 7),
          ease: 'none',
          onComplete: () => petal.remove(),
        });
      }, i * 200);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 50%, #FF69B4 100%)',
      }}
    >
      {/* Background Initials */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="font-script text-[40vw] opacity-5 select-none"
          style={{ 
            color: '#C71585',
            textShadow: '0 0 100px rgba(199, 21, 133, 0.3)',
          }}
        >
          J
        </span>
        <span 
          className="font-script text-[40vw] opacity-5 select-none absolute"
          style={{ 
            color: '#C71585',
            textShadow: '0 0 100px rgba(199, 21, 133, 0.3)',
            right: '5%',
            bottom: '5%',
          }}
        >
          C
        </span>
      </div>

      {/* Flower SVG */}
      <svg
        ref={flowerRef}
        viewBox="0 0 200 300"
        className="w-48 h-72 md:w-64 md:h-96 relative z-10"
      >
        {/* Stem */}
        <path
          className="flower-stem"
          d="M100 300 Q100 200 100 150"
          stroke="#228B22"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Leaves */}
        <ellipse
          className="flower-leaf"
          cx="70"
          cy="220"
          rx="25"
          ry="12"
          fill="#32CD32"
          transform="rotate(-30 70 220)"
        />
        <ellipse
          className="flower-leaf"
          cx="130"
          cy="200"
          rx="25"
          ry="12"
          fill="#32CD32"
          transform="rotate(30 130 200)"
        />
        
        {/* Petals */}
        <ellipse className="flower-petal" cx="100" cy="80" rx="25" ry="40" fill="#FF69B4" />
        <ellipse className="flower-petal" cx="70" cy="100" rx="25" ry="40" fill="#FFB6C1" transform="rotate(-60 70 100)" />
        <ellipse className="flower-petal" cx="130" cy="100" rx="25" ry="40" fill="#FF1493" transform="rotate(60 130 100)" />
        <ellipse className="flower-petal" cx="60" cy="130" rx="25" ry="40" fill="#FFC0CB" transform="rotate(-120 60 130)" />
        <ellipse className="flower-petal" cx="140" cy="130" rx="25" ry="40" fill="#FF69B4" transform="rotate(120 140 130)" />
        <ellipse className="flower-petal" cx="100" cy="150" rx="25" ry="40" fill="#FFB6C1" transform="rotate(180 100 150)" />
        
        {/* Center */}
        <circle className="flower-center" cx="100" cy="115" r="20" fill="#FFD700" />
        <circle className="flower-center" cx="100" cy="115" r="15" fill="#FFA500" />
      </svg>

      {/* Loading Text */}
      <div className="mt-8 text-center relative z-10">
        <p className="font-script text-2xl md:text-3xl text-romantic-wine mb-2">
          Carregando nosso amor...
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-romantic-deep font-body text-lg">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className="w-48 h-2 bg-white/50 rounded-full mt-4 overflow-hidden relative z-10"
      >
        <div 
          className="h-full bg-gradient-to-r from-romantic-pink to-romantic-wine rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hearts decoration */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="w-6 h-6 animate-heart-beat"
            style={{ 
              fill: i === 1 ? '#FF69B4' : '#FFB6C1',
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default PreLoader;
