import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Page1Props {
  onNext: () => void;
}

const Page1 = ({ onNext }: Page1Props) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Animation for the logo and title
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    })
    .from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.3");

    // Subtle floating animation for the logo
    gsap.to(logoRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });    // Apply a beautiful Orthodox-themed gradient overlay using GSAP
    gsap.to(containerRef.current, {
      background: "linear-gradient(135deg, rgba(230,205,120,0.4) 0%, rgba(180,130,60,0.3) 50%, rgba(120,80,30,0.25) 100%)",
      duration: 5,
      repeat: -1,
      yoyo: true
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="splash-page flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
    >
      {/* Background elements - Orthodox cross patterns */}
      <div className="absolute inset-0 opacity-10">
        {Array(6).fill(0).map((_, i) => (
          <div 
            key={i}
            className="absolute text-amber-800 text-6xl"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 45}deg)`
            }}
          >
            ✝
          </div>
        ))}      </div>      <img 
        ref={logoRef}
        src="/Gabre22 (1) copy.png" 
        alt="Ethiopian Orthodox Hub Logo" 
        className="w-72 h-72 object-contain mb-8 shadow-lg rounded-md p-2 bg-amber-50/30"
      />      <div ref={titleRef} className="space-y-4">
        <h1 className="text-3xl font-bold text-amber-900">
          Xofoo Qulqululluu
        </h1>
        <h2 className="text-xl font-semibold text-amber-800">
          Misirroo gabra Kiristoo
        </h2>
      </div>
      
      <div className="absolute inset-0 cursor-pointer" onClick={onNext} aria-label="Continue to next page"></div>
    </div>
  );
};

export default Page1;
