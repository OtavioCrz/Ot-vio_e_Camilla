import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heartsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      });

      // Falling hearts animation
      createFallingHearts();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const createFallingHearts = () => {
    const container = heartsContainerRef.current;
    if (!container) return;

    const colors = ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493', '#C71585'];
    
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        const size = gsap.utils.random(14, 28);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        heart.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" style="width:100%;height:100%;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${gsap.utils.random(0, 100)}%;
          top: -50px;
          opacity: ${gsap.utils.random(0.4, 0.9)};
          pointer-events: none;
          z-index: 1;
        `;
        
        container.appendChild(heart);

        gsap.to(heart, {
          y: '120vh',
          x: `random(-40, 40)`,
          rotation: `random(-180, 180)`,
          duration: gsap.utils.random(7, 11),
          ease: 'none',
          delay: gsap.utils.random(0, 5),
          onComplete: () => heart.remove(),
        });
      }, i * 450);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-fullscreen relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFAFA 0%, #FFF0F5 50%, #FFB6C1 100%)',
      }}
    >
      {/* Falling Hearts Container */}
      <div 
        ref={heartsContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-romantic-pink/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-romantic-deep/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-romantic-gold/10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        {/* Sparkles */}
        <div className="flex justify-center gap-4 mb-6">
          <Sparkles className="w-6 h-6 text-romantic-gold animate-twinkle" />
          <Sparkles className="w-8 h-8 text-romantic-gold animate-twinkle" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="w-6 h-6 text-romantic-gold animate-twinkle" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Quote */}
        <blockquote className="font-script text-3xl md:text-5xl lg:text-6xl text-romantic-wine leading-tight mb-8">
          "Eu te amei ontem,<br />
          te amo hoje,<br />
          e te amarei<br />
          para sempre"
        </blockquote>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
          <Heart className="w-8 h-8 text-romantic-deep fill-romantic-deep animate-heart-beat" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
        </div>

        {/* Initials */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <span className="font-script text-4xl md:text-6xl text-romantic-wine">Otávio</span>
          <Heart className="w-10 h-10 md:w-14 md:h-14 text-romantic-deep fill-romantic-deep animate-heart-beat" />
          <span className="font-script text-4xl md:text-6xl text-romantic-wine">Camilla</span>
        </div>

        {/* Year */}
        <p className="font-display text-lg text-romantic-wine/70 mb-4">
          Desde o primeiro olhar • {new Date().getFullYear()}
        </p>

        {/* Final message */}
        <div className="glass-romantic rounded-3xl px-8 py-6 inline-block shadow-romantic-lg">
          <p className="font-body text-gray-600">
            Feito com {' '}
            <Heart className="w-4 h-4 inline text-romantic-deep fill-romantic-deep animate-heart-beat" />
            {' '} para o amor da minha vida
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-12 font-body text-sm text-gray-400">
          Nossa História de Amor 💕
        </p>
      </div>
    </section>
  );
};

export default FooterSection;
