import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Page2Props {
  onNext: () => void;
  onSkip: () => void;
}

const Page2 = ({ onNext, onSkip }: Page2Props) => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate features
    if (featuresRef.current) {
      const features = featuresRef.current.children;
      
      gsap.from(features, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        }
      });
    }
  }, []);

  const features = [
    { 
      icon: "🕊️", 
      title: "Community Prayer",
      description: "Join communal prayers and spiritual reflections with fellow believers."
    },
    { 
      icon: "🎉", 
      title: "Holiday Celebrations",
      description: "Stay updated on Ethiopian Orthodox holidays and special celebrations."
    },
    { 
      icon: "👨‍👩‍👧‍👦", 
      title: "Brotherhood",
      description: "Connect with the Ethiopian Orthodox community and build lasting relationships."
    },
    { 
      icon: "📖", 
      title: "Spiritual Resources",
      description: "Access religious texts, teachings, and spiritual guidance."
    },
  ];

  return (
    <div className="splash-page flex-shrink-0 w-full h-full flex flex-col items-center justify-between px-6 py-12 text-center bg-amber-50">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          Ethiopian Orthodox Hub
        </h2>
        <p className="text-amber-700 mb-8">
          Your spiritual companion for the Ethiopian Orthodox Tewahedo Church
        </p>
        
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 gap-6 mt-8 max-w-md mx-auto text-left"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-amber-100">
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h3 className="font-medium text-amber-900">{feature.title}</h3>
                <p className="text-sm text-amber-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>      </div>
      
      <div className="mt-8 text-sm text-amber-700">
        <p>Tap anywhere to skip</p>
      </div>
      
      <div className="absolute inset-0 cursor-pointer" onClick={onNext} aria-label="Continue to next page"></div>
    </div>
  );
};

export default Page2;
