import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  { src: './photos/casal1.jpg', alt: 'Momento especial', caption: 'Juntos em cada celebração' },
  { src: './photos/casal2.jpg', alt: 'Olhar de amor', caption: 'Seus olhos são meu lar' },
  { src: './photos/ela1.jpg', alt: 'Jantar romântico', caption: 'Momentos especiais a dois' },
  { src: './photos/ela2.jpg', alt: 'Sorriso lindo', caption: 'Seu sorriso ilumina meu dia' },
  { src: './photos/ela3.jpg', alt: 'Pose perfeita', caption: 'A mulher da minha vida' },
  { src: './photos/ela4.jpg', alt: 'Selfie', caption: 'Linda em cada ângulo' },
  { src: './photos/ela5.jpg', alt: 'Momento doce', caption: 'Doce como você' },
  { src: './photos/casal3.jpg', alt: 'Espelho', caption: 'Nós dois, sempre' },
  { src: './photos/casal4.jpg', alt: 'Close', caption: 'Amor em cada detalhe' },
  { src: './photos/casal5.jpg', alt: 'Abraço', caption: 'Seu abraço é meu refúgio' },
  { src: './photos/casal6.jpg', alt: 'Casal casual', caption: 'Perfeitos juntos' },
  { src: './photos/casal7.jpg', alt: 'Praia', caption: 'Verão ao seu lado' },
  { src: './photos/casal8.jpg', alt: 'Ternura', caption: 'Meu amor eterno' },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

      // Photos stagger animation
      const photoCards = gridRef.current?.querySelectorAll('.photo-card');
      if (photoCards) {
        photoCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: 'power2.out',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + photos.length) % photos.length
      : (selectedIndex + 1) % photos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="section-fullscreen relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFAFA 0%, #FFF0F5 50%, #FFF8E7 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-56 h-56 rounded-full bg-romantic-pink/15 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-romantic-deep/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-script text-5xl md:text-6xl lg:text-7xl text-gradient-romantic mb-4"
          >
            Nossa Galeria
          </h2>
          <p className="font-display text-lg text-gray-600 italic mb-4">
            Cada foto conta um pedaço da nossa história
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-romantic-pink" />
            <Heart className="w-5 h-5 text-romantic-deep fill-romantic-deep animate-heart-beat" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-romantic-pink" />
          </div>
        </div>

        {/* Photo Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className="photo-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-romantic hover:shadow-romantic-lg transition-all duration-500"
              onClick={() => openLightbox(photo, index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-romantic-wine/80 via-romantic-wine/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <Heart className="w-8 h-8 text-white fill-white mb-2 animate-heart-beat" />
                <p className="font-script text-white text-lg">{photo.caption}</p>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none overflow-hidden">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {selectedPhoto && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation */}
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

              {/* Image */}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-script text-white text-2xl text-center">
                  {selectedPhoto.caption}
                </p>
                <p className="text-white/70 text-center mt-2">
                  {selectedIndex + 1} / {photos.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
