import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PreLoader from '@/components/PreLoader';
import HeroSection from '@/sections/HeroSection';
import HistorySection from '@/sections/HistorySection';
import GallerySection from '@/sections/GallerySection';
import MomentsSection from '@/sections/MomentsSection';
import DreamsSection from '@/sections/DreamsSection';
import FooterSection from '@/sections/FooterSection';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PreLoader onComplete={handleLoadingComplete} />}
      
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <main className="relative">
          <HeroSection />
          <HistorySection />
          <GallerySection />
          <MomentsSection />
          <DreamsSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}

export default App;
