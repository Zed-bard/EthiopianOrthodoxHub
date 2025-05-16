import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceDetection } from "@/hooks/use-device-detection";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedImage3DProps {
  image1Url: string;
  image2Url: string;
  caption?: string;
  direction?: 'horizontal' | 'vertical';
}

/**
 * A reusable 3D animated image component that transitions between two images 
 * as the user scrolls, with a masking effect to create a 3D-like appearance
 */
const AnimatedImage3D = ({ 
  image1Url, 
  image2Url, 
  caption = "", 
  direction = 'horizontal' 
}: AnimatedImage3DProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  // Get device information
  const { isTouchDevice, isSmallScreen } = useDeviceDetection();
  
  // Automatically switch to vertical direction on small screens
  const effectiveDirection = isSmallScreen ? 'vertical' : direction;
  
  // Mouse position state for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Touch position for mobile devices
  const [touchAngle, setTouchAngle] = useState(0);

  // Handle mouse movement for parallax effect on non-touch devices
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !wrapperRef.current) return;
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    setMousePosition({ x, y });
  };
  
  // Handle device orientation for mobile devices
  useEffect(() => {
    if (!isTouchDevice) return;
    
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Use gamma (left/right tilt) for horizontal rotation
      // and beta (front/back tilt) for vertical rotation
      const x = Math.min(Math.max(e.gamma / 30, -1), 1) * 0.5;
      const y = Math.min(Math.max((e.beta - 40) / 30, -1), 1) * 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isTouchDevice]);
  
  // Apply the parallax effect when mouse position changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Reduce effect on touch devices to avoid excessive movement
    const intensityFactor = isTouchDevice ? 5 : 8;
    
    gsap.to(containerRef.current, {
      rotationY: mousePosition.x * intensityFactor,
      rotationX: -mousePosition.y * intensityFactor,
      duration: isTouchDevice ? 1 : 0.5, // Smoother transition on mobile
      ease: "power2.out",
    });
  }, [mousePosition, isTouchDevice]);
  useEffect(() => {
    // Ensure the DOM elements are available
    if (!containerRef.current || !image1Ref.current || !image2Ref.current || !maskRef.current || !wrapperRef.current) return;

    // Set up the scroll trigger context
    const ctx = gsap.context(() => {
      // Create the mask animation that moves based on the direction
      gsap.fromTo(
        maskRef.current,
        effectiveDirection === 'horizontal' 
          ? { x: "-100%", y: "0%" }
          : { y: "-100%", x: "0%" },
        {
          x: effectiveDirection === 'horizontal' ? "100%" : "0%",
          y: effectiveDirection === 'horizontal' ? "0%" : "100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1.5,
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3D rotation effect based on direction
      gsap.fromTo(
        containerRef.current,
        { 
          rotationY: effectiveDirection === 'horizontal' ? -8 : 0,
          rotationX: effectiveDirection === 'vertical' ? -5 : 0,
          z: -30,
          transformPerspective: 1000,
        },
        {
          rotationY: effectiveDirection === 'horizontal' ? 8 : 0,
          rotationX: effectiveDirection === 'vertical' ? 5 : 0,
          z: 30,
          transformPerspective: 1000,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Transition between the two images
      gsap.fromTo(
        image2Ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top center+=100",
            end: "center center-=100",
            scrub: 1.5,
          },
        }
      );

      // Add slight scale effect
      gsap.fromTo(
        [image1Ref.current, image2Ref.current],
        { scale: 1 },
        {
          scale: 1.05,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    // Cleanup function
    return () => ctx.revert();
  }, [direction]);

  // Define the gradient direction based on the animation direction
  const gradientStyle = direction === 'horizontal' 
    ? {
        background: "linear-gradient(90deg, transparent, rgba(255,192,203,0.5) 40%, rgba(255,255,255,0.8) 60%, transparent)",
        transform: "translateX(-100%)",
        width: "200%",
      }
    : {
        background: "linear-gradient(180deg, transparent, rgba(255,192,203,0.5) 40%, rgba(255,255,255,0.8) 60%, transparent)",
        transform: "translateY(-100%)",
        height: "200%",
      };

  return (
    <div 
      ref={wrapperRef} 
      className="relative w-full max-w-xl mx-auto my-12 perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })} // Reset on mouse leave
    >
      <div 
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full overflow-hidden rounded-lg shadow-xl masked-image-container transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* First image */}
        <div 
          ref={image1Ref} 
          className="absolute inset-0 bg-cover bg-center z-10 image-hover-effect"
          style={{ backgroundImage: `url('${image1Url}')` }}
        />
        
        {/* Second image */}
        <div 
          ref={image2Ref} 
          className="absolute inset-0 bg-cover bg-center z-20 opacity-0 image-hover-effect"
          style={{ backgroundImage: `url('${image2Url}')` }}
        />
        
        {/* Gradient mask that moves on scroll */}
        <div 
          ref={maskRef}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ 
            ...gradientStyle,
            mixBlendMode: "soft-light"
          }}
        />
        
        {/* Subtle overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/10 to-transparent opacity-60 z-40 mix-blend-overlay" />
        
        {/* Add reflection overlay for enhanced 3D effect */}
        <div className="reflection-overlay z-45" />
        
        {/* Caption overlay (if provided) */}
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3 flex items-end z-50">
            <div className="p-4 text-center w-full">
              <p className="text-white text-sm sm:text-base font-heading">{caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedImage3D;
