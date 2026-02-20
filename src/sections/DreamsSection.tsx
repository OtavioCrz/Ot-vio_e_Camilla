import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Home, Baby, Heart, Star, Check, Gift, Music, Camera, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Dream {
  text: string;
  icon: React.ReactNode;
  completed: boolean;
}

const dreams: Dream[] = [
  { text: 'Viajar pelo mundo juntos', icon: <Plane className="w-5 h-5" />, completed: false },
  { text: 'Construir nosso lar dos sonhos', icon: <Home className="w-5 h-5" />, completed: false },
  { text: 'Ter filhos lindos', icon: <Baby className="w-5 h-5" />, completed: false },
  { text: 'Casamento inesquecível', icon: <Heart className="w-5 h-5" />, completed: false },
  { text: 'Ver o pôr do sol em Paris', icon: <Star className="w-5 h-5" />, completed: false },
  { text: 'Fazer uma viagem de carro pela estrada', icon: <MapPin className="w-5 h-5" />, completed: false },
  { text: 'Aprender a dançar juntos', icon: <Music className="w-5 h-5" />, completed: false },
  { text: 'Criar um álbum de fotos de todas as nossas aventuras', icon: <Camera className="w-5 h-5" />, completed: false },
  { text: 'Celebrar 50 anos de casados', icon: <Gift className="w-5 h-5" />, completed: false },
  { text: 'Crescer juntos, sempre', icon: <Heart className="w-5 h-5" />, completed: true },
];

const DreamsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const completedCount = dreams.filter(d => d.completed).length;
  const progress = (completedCount / dreams.length) * 100;

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

      // Progress bar animation
      gsap.from(progressRef.current, {
        scrollTrigger: {
          trigger: progressRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Dream items stagger animation
      const items = listRef.current?.querySelectorAll('.dream-item');
      items?.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power2.out',
        });

        // Checkbox animation
        const checkbox = item.querySelector('.dream-checkbox');
        if (checkbox) {
          gsap.from(checkbox, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            scale: 0,
            duration: 0.4,
            delay: index * 0.08 + 0.3,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sonhos"
      className="section-fullscreen relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF0F5 0%, #FFF8E7 50%, #FFFAFA 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-romantic-pink/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-romantic-deep/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-romantic-gold/10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="font-script text-5xl md:text-6xl lg:text-7xl text-gradient-romantic mb-4"
          >
            Nossos Sonhos
          </h2>
          <p className="font-display text-lg text-gray-600 italic mb-4">
            Cada sonho é uma promessa de futuro
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
            <Heart className="w-5 h-5 text-romantic-deep fill-romantic-deep animate-heart-beat" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="font-body text-sm text-gray-600">Nosso progresso</span>
            <span className="font-script text-xl text-romantic-wine">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-white/70 rounded-full overflow-hidden shadow-inner">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-romantic-pink via-romantic-deep to-romantic-wine rounded-full"
              style={{ width: `${progress}%`, transformOrigin: 'left center' }}
            />
          </div>
          <p className="text-center mt-3 font-display text-sm text-gray-500">
            {completedCount} de {dreams.length} sonhos realizados
          </p>
        </div>

        {/* Dreams List */}
        <div 
          ref={listRef}
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {dreams.map((dream, index) => (
            <div
              key={index}
              className={`dream-item group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                dream.completed 
                  ? 'bg-gradient-to-r from-romantic-pink/20 to-romantic-deep/20' 
                  : 'bg-white/70 hover:bg-white/90'
              } shadow-romantic hover:shadow-romantic-lg hover:scale-[1.02]`}
            >
              {/* Checkbox */}
              <div 
                className={`dream-checkbox flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  dream.completed 
                    ? 'bg-gradient-to-br from-romantic-pink to-romantic-wine' 
                    : 'bg-gray-200 group-hover:bg-romantic-pink/30'
                }`}
              >
                {dream.completed && <Check className="w-5 h-5 text-white" />}
              </div>

              {/* Icon */}
              <div className={`flex-shrink-0 ${dream.completed ? 'text-romantic-wine' : 'text-gray-400'}`}>
                {dream.icon}
              </div>

              {/* Text */}
              <span className={`font-body text-sm md:text-base ${
                dream.completed 
                  ? 'text-romantic-wine line-through opacity-70' 
                  : 'text-gray-700'
              }`}>
                {dream.text}
              </span>

              {/* Decorative heart for completed */}
              {dream.completed && (
                <Heart className="w-4 h-4 text-romantic-deep fill-romantic-deep ml-auto animate-heart-beat" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <div className="inline-block glass-romantic rounded-3xl px-8 py-6 shadow-romantic">
            <p className="font-script text-2xl md:text-3xl text-romantic-wine mb-2">
              "Juntos, podemos conquistar o mundo"
            </p>
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-romantic-deep fill-romantic-deep" />
              <span className="font-body text-sm text-gray-600">Otávio & Camilla</span>
              <Heart className="w-4 h-4 text-romantic-deep fill-romantic-deep" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
