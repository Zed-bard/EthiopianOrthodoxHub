import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Page1 from './Page1.tsx';
import Page2 from './Page2.tsx';
import Page3 from './Page3.tsx';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  const {
    offlineReady: [offlineReady],
  } = useRegisterSW();

  // Check if the app is installed
  useEffect(() => {
    const checkIfPWAInstalled = () => {
      // Check if app is in standalone mode or display-mode is standalone (installed as PWA)
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone || 
                               document.referrer.includes('android-app://');
      
      setIsAppInstalled(isInStandaloneMode);
    };

    checkIfPWAInstalled();
    window.addEventListener('appinstalled', () => setIsAppInstalled(true));

    return () => {
      window.removeEventListener('appinstalled', () => setIsAppInstalled(true));
    };
  }, []);  // Automatic slide transition timer
  useEffect(() => {
    const slideTimers = [4000, 5500, 4500]; // Time in ms for page 1, 2, and 3
    
    let timer: number;
    if (currentPage < 2) {
      timer = window.setTimeout(() => {
        setCurrentPage(prev => prev + 1);
      }, slideTimers[currentPage]);
    } else if (currentPage === 2) {
      timer = window.setTimeout(() => {
        onComplete();
      }, slideTimers[currentPage]);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentPage, onComplete]);
  
  // Handle page transitions
  useEffect(() => {
    const pages = containerRef.current?.querySelectorAll('.splash-page');
    if (!pages) return;

    gsap.to(pages, {
      x: `-${currentPage * 100}%`,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Skip to the app if already installed when on page 3
    if (currentPage === 2 && isAppInstalled) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [currentPage, isAppInstalled, onComplete]);

  const nextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const skipTutorial = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-50 to-amber-100 z-50 overflow-hidden">
      <div 
        ref={containerRef}
        className="flex h-full"
      >
        <Page1 onNext={nextPage} />
        <Page2 onNext={nextPage} onSkip={skipTutorial} />
        <Page3 onNext={onComplete} isAppInstalled={isAppInstalled} />
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {[0, 1, 2].map((pageIndex) => (
          <button
            key={pageIndex}
            className={`w-2 h-2 rounded-full ${
              currentPage === pageIndex ? 'bg-amber-800' : 'bg-amber-300'
            }`}
            onClick={() => setCurrentPage(pageIndex)}
            aria-label={`Go to page ${pageIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
