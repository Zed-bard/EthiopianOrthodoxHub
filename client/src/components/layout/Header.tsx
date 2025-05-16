import { Link, useLocation } from "wouter";
import { PatternBorder } from "@/components/ui/pattern-border";
import LanguageSelector from "@/components/LanguageSelector";
import NotificationIcon from "@/components/NotificationIcon";
import { useLanguage } from "@/lib/LanguageContext";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Profile from "@/components/Auth/Profile";
import { FaUserCircle } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path ? "text-burgundy" : "hover:text-burgundy";
  };

  return (
    <header className="relative bg-white">
      <PatternBorder className="h-1" />
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Site Title */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center">
              <span className="text-white font-heading text-lg">ቤተ</span>
            </div>
            <div className="ml-3">
              <h1 className="font-heading text-xl text-burgundy sm:text-lg">Xofoo Misirroo Q/Gabra Kiristoos</h1>
              <p className="text-xs text-gold font-semibold tracking-wide hidden sm:block">Spiritual Resources Portal</p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            aria-label="Open menu"
          >
            <HiMenuAlt3 className="w-6 h-6 text-burgundy" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <nav className="flex space-x-8 font-medium mr-6">
              <Link href="/" className={`transition duration-300 ${isActive("/")}`}>
                {t('navItems', 'home')}
              </Link>
              <Link href="/teachings" className={`transition duration-300 ${isActive("/teachings")}`}>
                {t('navItems', 'teachings')}
              </Link>
              <Link href="/calendar" className={`transition duration-300 ${isActive("/calendar")}`}>
                {t('navItems', 'calendar')}
              </Link>
              <Link href="/prayers" className={`transition duration-300 ${isActive("/prayers")}`}>
                {t('navItems', 'prayers')}
              </Link>
              <Link href="/churches" className={`transition duration-300 ${isActive("/churches")}`}>
                {t('navItems', 'churches')}
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <NotificationIcon />
              <LanguageSelector />
              <div className="relative">
                <Link href="/profile">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go to profile"
                  >
                    <FaUserCircle className="w-6 h-6 text-gray-600" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
