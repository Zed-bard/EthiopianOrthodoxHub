import { Link, useLocation } from "wouter";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [location, onClose]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('#mobileMenu') && !target.closest('#menuButton')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div id="mobileMenu" className="md:hidden bg-white absolute w-full z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-burgundy font-medium py-2 border-b border-gray-100">Home</a>
          </Link>
          <Link href="/teachings">
            <a className="py-2 border-b border-gray-100">Teachings</a>
          </Link>
          <Link href="/calendar">
            <a className="py-2 border-b border-gray-100">Calendar</a>
          </Link>
          <Link href="/prayers">
            <a className="py-2 border-b border-gray-100">Prayers</a>
          </Link>
          <Link href="/churches">
            <a className="py-2">Churches</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
