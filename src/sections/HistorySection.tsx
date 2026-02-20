import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, Sparkles, Gem, Home, UtensilsCrossed } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'O Primeiro Olhar',
    title: 'Como Nos Conhecemos',
    description: 'Eu te achei no Instagram e pensei: essa é a garota mais linda do mundo, eu preciso tentar falar com ela. Mas como você quase nunca postava story, tive que esperar por um tempo até que você postasse algo para eu responder. E assim que começamos a nos falar, a conexão foi instantânea, energia boa e uma pitada de amor logo no primeiro momento.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    date: '20/11/2025',
    title: 'O Início de Tudo',
    description: 'A primeira vez que nos vimos foi marcando um treino na minha academia. Depois daquele dia, já tínhamos a certeza de que estávamos com a pessoa certa.',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    date: 'Nosso Primeiro Encontro',
    title: 'Casa Fontana',
    description: 'Fomos comer em um restaurante italiano, o Casa Fontana. Foi um bate-papo incrível a noite toda, sempre tínhamos assunto e nunca deixamos a conversa esfriar. E assim tivemos mais certeza ainda de que estávamos no caminho certo.',
    icon: <UtensilsCrossed className="w-6 h-6" />,
  },
  {
    date: 'Momentos Inesquecíveis',
    title: 'Nossas Aventuras',
    description: 'Cada passeio, cada jantar, cada risada compartilhada construiu os alicerces do nosso amor.',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    date: 'O Compromisso',
    title: 'Nosso Namoro',
    description: 'Decidimos oficializar nosso amor e começar a escrever nossa história como um casal.',
    icon: <Gem className="w-6 h-6" />,
  },
  {
    date: 'O Futuro',
    title: 'Nossos Sonhos',
    description: 'Olhamos para o futuro com esperança e amor, prontos para construir uma vida linda juntos.',
    icon: <Home className="w-6 h-6" />,
  },
];

const HistorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      });

      // Timeline line drawing
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: 'top center',
        });
      }

      // Timeline cards animation
      const cards = timelineRef.current?.querySelectorAll('.timeline-card');
      cards?.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: isLeft ? -80 : 80,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
        });

        // Icon bounce
        const icon = card.querySelector('.timeline-icon');
        if (icon) {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            scale: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.3,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="section-fullscreen relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8E7 0%, #FFF0F5 50%, #FFFAFA 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-romantic-pink/10 blur-3xl" />
        <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-romantic-deep/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-script text-5xl md:text-6xl lg:text-7xl text-gradient-romantic mb-4"
          >
            Nossa História
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
            <Heart className="w-5 h-5 text-romantic-deep fill-romantic-deep animate-heart-beat" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-romantic-pink via-romantic-deep to-romantic-wine transform -translate-x-1/2 hidden md:block"
          />

          {/* Mobile Line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-romantic-pink via-romantic-deep to-romantic-wine md:hidden" />

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`timeline-card relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row pl-12 md:pl-0`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} text-left`}>
                    <div 
                      className={`glass-romantic rounded-2xl p-6 shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-[1.02] ${
                        isLeft ? 'md:ml-auto' : 'md:mr-auto'
                      } max-w-md`}
                    >
                      <span className="font-display text-sm text-romantic-wine/70 italic">
                        {event.date}
                      </span>
                      <h3 className="font-script text-2xl md:text-3xl text-romantic-wine mt-1 mb-3">
                        {event.title}
                      </h3>
                      <p className="font-body text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="timeline-icon absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-romantic-pink to-romantic-wine flex items-center justify-center shadow-glow z-10">
                    <div className="text-white">
                      {event.icon}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
