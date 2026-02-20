import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingHearts from '@/components/effects/FloatingHearts';
import StarField from '@/components/effects/StarField';
import { ChevronDown, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const initialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Typewriter effect for title
      const title = titleRef.current;
      if (title) {
        const text = title.textContent || '';
        title.textContent = '';
        
        gsap.to(title, {
          duration: text.length * 0.1,
          ease: 'none',
          onUpdate: function() {
            const progress = Math.floor(this.progress() * text.length);
            title.textContent = text.substring(0, progress);
          },
        });
      }

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
      });

      // Initials animation
      gsap.from(initialsRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        delay: 2,
        ease: 'elastic.out(1, 0.5)',
      });

      // Scroll indicator
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 2.5,
        ease: 'power2.out',
      });

      // Bounce animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        ease: 'none',
      });

      gsap.to(subtitleRef.current, {
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fullscreen relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF0F5 0%, #FFFAFA 30%, #FFF8E7 100%)',
      }}
    >
      {/* Background Effects */}
      <FloatingHearts count={20} minSize={12} maxSize={28} speed={1} />
      <StarField count={12} color="#FFD700" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-romantic-pink/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-romantic-deep/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-romantic-gold/20 blur-2xl" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Initials */}
        <div 
          ref={initialsRef}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="font-script text-4xl md:text-6xl text-romantic-wine opacity-80">Otávio</span>
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-romantic-deep animate-heart-beat fill-romantic-deep" />
          <span className="font-script text-4xl md:text-6xl text-romantic-wine opacity-80">Camilla</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-gradient-romantic mb-6 text-shadow-soft"
        >
          Nossa História de Amor
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-display text-xl md:text-2xl lg:text-3xl text-gray-600 italic mb-8"
        >
          "Cada momento ao seu lado é um capítulo inesquecível"
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
          <Heart className="w-5 h-5 text-romantic-deep fill-romantic-deep" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
        </div>

        {/* Date/Tagline */}
        <p className="font-body text-lg md:text-xl text-romantic-wine/80">
          Para sempre juntos 💕
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => {
          document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-body text-sm text-romantic-wine/70 mb-2">Role para explorar</span>
        <ChevronDown className="w-6 h-6 text-romantic-deep" />
      </div>
    </section>
  );
};

export default HeroSection;
