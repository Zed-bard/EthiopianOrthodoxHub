import { useState, useEffect } from 'react';

interface DeviceDetection {
  isTouchDevice: boolean;
  isSmallScreen: boolean;
  isLargeScreen: boolean;
}

/**
 * Custom hook to detect device type and screen size
 * @returns Object containing device type detection flags
 */
export function useDeviceDetection(): DeviceDetection {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check for touch device
    const checkTouch = (): void => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    // Check screen size
    const checkScreenSize = (): void => {
      setIsSmallScreen(window.innerWidth < 640); // Match the sm: breakpoint in Tailwind
      setIsLargeScreen(window.innerWidth >= 1024); // Match the lg: breakpoint in Tailwind
    };

    // Initial checks
    checkTouch();
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return { isTouchDevice, isSmallScreen, isLargeScreen };
}
