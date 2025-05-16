import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Page3Props {
  onNext: () => void;
  isAppInstalled: boolean;
}

const Page3 = ({ onNext, isAppInstalled }: Page3Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayInstallPrompt, setDisplayInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    // Animation
    const tl = gsap.timeline();
    
    if (containerRef.current) {
      const elements = containerRef.current.children;
      
      tl.from(elements, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setDisplayInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt so it can't be used again
    setDeferredPrompt(null);
    setDisplayInstallPrompt(false);
  };

  return (
    <div className="splash-page flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-amber-50 to-amber-100">
      <div ref={containerRef} className="max-w-md">
        <div className="text-amber-800 text-5xl mb-6">
          {isAppInstalled ? "👍" : "📱"}
        </div>
        
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          {isAppInstalled 
            ? "You're already using the app!" 
            : "Experience the Full App"}
        </h2>
        
        <p className="text-amber-700 mb-8">
          {isAppInstalled 
            ? "You have already installed the Ethiopian Orthodox Hub app. Enjoy the full experience with offline access!" 
            : "Install Ethiopian Orthodox Hub on your device to access prayers, calendars, and teachings even when you're offline."}
        </p>

        {/* Installation guidance */}
        {!isAppInstalled && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200 mb-8">
            <h3 className="font-medium text-amber-900 mb-2">Benefits of installing:</h3>
            <ul className="text-left text-amber-700 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Access content offline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Fast load times</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Home screen icon for quick access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                <span>Receive prayer time notifications</span>
              </li>
            </ul>

            {/* Only show install button if beforeinstallprompt was fired */}
            {displayInstallPrompt && (
              <button 
                onClick={installApp}
                className="w-full px-5 py-3 bg-amber-700 rounded-md text-white hover:bg-amber-800 mb-2"
              >
                Install App Now
              </button>
            )}
            
            {!displayInstallPrompt && (
              <p className="text-xs text-amber-600">
                When prompted by your browser, click "Add to Home Screen" or "Install"
              </p>
            )}
          </div>
        )}        <div className="relative">
          <button 
            onClick={onNext}
            className={`px-5 py-3 ${isAppInstalled 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-amber-600 hover:bg-amber-700'} 
              rounded-md text-white transition-colors w-full`}
          >
            {isAppInstalled ? "Continue to App" : "Continue to Website"}
          </button>
          
          <div className="mt-3 text-sm text-amber-700 text-center">
            Automatically redirecting in a few seconds...
          </div>
        </div>
      </div>
      
      {/* Make entire page clickable for fast transition */}
      <div className="absolute inset-0 cursor-pointer" onClick={onNext} aria-label="Continue to app"></div>
    </div>
  );
};

export default Page3;
