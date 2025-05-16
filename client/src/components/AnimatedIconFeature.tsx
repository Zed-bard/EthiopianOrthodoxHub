import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedIconFeatureProps {
  imageUrl: string;
  alt?: string;
}

/**
 * A component that displays an image with a liquid jiggling animation effect
 */
const AnimatedIconFeature = ({ imageUrl, alt = "Feature icon" }: AnimatedIconFeatureProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!iconRef.current) return;
    
    const icon = iconRef.current;
    
    // Initial slight scale to prepare for animation
    gsap.set(icon, {
      scale: 0.95,
    });
    
    // Create the liquid jiggle animation
    const createJiggleAnimation = () => {
      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        onComplete: () => {
          // Reset to normal state after animation
          gsap.to(icon, {
            scale: 0.95,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
      
      // Random scale and rotation values for organic feel
      const scaleX = 0.85 + Math.random() * 0.3;
      const scaleY = 0.85 + Math.random() * 0.3;
      const rotation = -2 + Math.random() * 4;
      
      timeline
        .to(icon, {
          scaleX: scaleX,
          scaleY: scaleY,
          rotation: rotation,
          duration: 0.4,
        })
        .to(icon, {
          scaleX: 0.95,
          scaleY: 0.95,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
        
      return timeline;
    };
    
    // Start a repeated animation with random intervals to look more natural
    const startJiggling = () => {
      // Initial animation
      createJiggleAnimation();
      
      // Set up recurring animations at random intervals
      const animateWithRandomDelay = () => {
        // Random delay between 2-6 seconds
        const delay = 2000 + Math.random() * 4000;
        intervalRef.current = window.setTimeout(() => {
          createJiggleAnimation();
          animateWithRandomDelay();
        }, delay);
      };
      
      animateWithRandomDelay();
    };
    
    startJiggling();
    
    // Clean up
    return () => {
      if (intervalRef.current !== null) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={iconRef}
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white"
      style={{ 
        transformOrigin: 'center center',
      }}
    >
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default AnimatedIconFeature;
