import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, PartyPopper, Plane, Laugh, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface MomentPhoto {
  src: string;
  caption: string;
}

interface MomentCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgImage: string;
  photos: MomentPhoto[];
}

const momentCategories: MomentCategory[] = [
  {
    title: 'Jantares Românticos',
    description: 'Cada refeição ao seu lado se torna um momento inesquecível, cheio de risadas, conversas e muito amor.',
    icon: <Utensils className="w-8 h-8" />,
    color: 'from-romantic-pink to-romantic-deep',
    bgImage: 'linear-gradient(135deg, rgba(255,182,193,0.9) 0%, rgba(255,105,180,0.9) 100%)',
    photos: [
      { src: './photos/casal1.jpg', caption: 'Nosso jantar especial' },
      { src: './photos/casal2.jpg', caption: 'Sempre juntos à mesa' },
    ],
  },
  {
    title: 'Festas e Celebrações',
    description: 'Dançamos, celebramos e criamos memórias que vamos guardar para sempre em nossos corações.',
    icon: <PartyPopper className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    bgImage: 'linear-gradient(135deg, rgba(167,139,250,0.9) 0%, rgba(236,72,153,0.9) 100%)',
    photos: [
      { src: './photos/casal3.jpg', caption: 'Comemorando juntos' },
      { src: './photos/casal4.jpg', caption: 'Sempre celebrando o amor' },
    ],
  },
  {
    title: 'Viagens e Passeios',
    description: 'Explorar o mundo ao seu lado é o maior presente. Cada lugar fica mais bonito com você.',
    icon: <Plane className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    bgImage: 'linear-gradient(135deg, rgba(96,165,250,0.9) 0%, rgba(6,182,212,0.9) 100%)',
    photos: [
      { src: './photos/casal5.jpg', caption: 'Aventureiros de coração' },
      { src: './photos/casal7.jpg', caption: 'Explorando o mundo juntos' },
    ],
  },
  {
    title: 'Momentos Engraçados',
    description: 'Suas gargalhadas são a melhor música para meus ouvidos. Você me faz rir todos os dias.',
    icon: <Laugh className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    bgImage: 'linear-gradient(135deg, rgba(250,204,21,0.9) 0%, rgba(249,115,22,0.9) 100%)',
    photos: [
      { src: './photos/casal6.jpg', caption: 'Risadas garantidas' },
      { src: './photos/casal8.jpg', caption: 'Aquele sorriso que amo' },
    ],
  },
];

const MomentsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<MomentCategory | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

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

      // Cards flip animation
      const cards = cardsRef.current?.querySelectorAll('.moment-card');
      cards?.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          rotateY: -90,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out',
        });

        // Icon animation
        const icon = card.querySelector('.moment-icon');
        if (icon) {
          gsap.to(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play play pause reverse',
            },
            rotation: 360,
            duration: 1,
            delay: index * 0.15 + 0.5,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openCategory = (category: MomentCategory) => {
    setSelectedCategory(category);
    setPhotoIndex(0);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedCategory) return;
    const total = selectedCategory.photos.length;
    const newIndex = direction === 'prev'
      ? (photoIndex - 1 + total) % total
      : (photoIndex + 1) % total;
    setPhotoIndex(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="momentos"
      className="section-fullscreen relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8E7 0%, #FFFAFA 50%, #FFF0F5 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-romantic-pink/10 blur-3xl" />
        <div className="absolute bottom-40 left-10 w-56 h-56 rounded-full bg-romantic-deep/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-romantic-gold/10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-script text-5xl md:text-6xl lg:text-7xl text-gradient-romantic mb-4"
          >
            Momentos Especiais
          </h2>
          <p className="font-display text-lg text-gray-600 italic mb-4">
            Cada momento ao seu lado é uma memória preciosa
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
            <Heart className="w-5 h-5 text-romantic-deep fill-romantic-deep animate-heart-beat" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
          </div>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {momentCategories.map((category, index) => (
            <div
              key={index}
              className="moment-card group relative rounded-3xl overflow-hidden shadow-romantic hover:shadow-romantic-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => openCategory(category)}
            >
              {/* Background */}
              <div 
                className="absolute inset-0"
                style={{ background: category.bgImage }}
              />
              
              {/* Content */}
              <div className="relative p-8 md:p-10 min-h-[280px] flex flex-col">
                {/* Icon */}
                <div className={`moment-icon w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 text-white`}>
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="font-script text-3xl md:text-4xl text-white mb-4">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="font-body text-white/90 leading-relaxed flex-grow">
                  {category.description}
                </p>

                {/* Click hint */}
                <p className="font-body text-white/60 text-sm mt-4">
                  Toque para ver fotos →
                </p>

                {/* Decorative heart */}
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Heart className="w-16 h-16 text-white fill-white" />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-16 text-center">
          <p className="font-display text-xl md:text-2xl text-romantic-wine/80 italic">
            "A vida é feita de momentos, e eu quero viver todos eles com você"
          </p>
        </div>
      </div>

      {/* Photo Popup Dialog */}
      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none overflow-hidden">
          <button
            onClick={() => setSelectedCategory(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {selectedCategory && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Category Title */}
              <div className="absolute top-4 left-4 z-50">
                <h3 className="font-script text-2xl md:text-3xl text-white drop-shadow-lg">
                  {selectedCategory.title}
                </h3>
              </div>

              {/* Navigation */}
              {selectedCategory.photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                    className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                    className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedCategory.photos[photoIndex].src}
                alt={selectedCategory.photos[photoIndex].caption}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-script text-white text-2xl text-center">
                  {selectedCategory.photos[photoIndex].caption}
                </p>
                <p className="text-white/70 text-center mt-2">
                  {photoIndex + 1} / {selectedCategory.photos.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MomentsSection;
