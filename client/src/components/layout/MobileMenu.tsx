import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();
  const { t } = useLanguage();

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
            <a className="text-burgundy font-medium py-2 border-b border-gray-100">{t('navItems', 'home')}</a>
          </Link>
          <Link href="/teachings">
            <a className="py-2 border-b border-gray-100">{t('navItems', 'teachings')}</a>
          </Link>
          <Link href="/calendar">
            <a className="py-2 border-b border-gray-100">{t('navItems', 'calendar')}</a>
          </Link>
          <Link href="/prayers">
            <a className="py-2 border-b border-gray-100">{t('navItems', 'prayers')}</a>
          </Link>
          <Link href="/churches">
            <a className="py-2 border-b border-gray-100">{t('navItems', 'churches')}</a>
          </Link>
          
          {/* Language selector in mobile menu */}
          <div className="py-4 border-t border-gray-100 mt-2">
            <p className="text-sm text-gray-500 mb-2">Select Language</p>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
