import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { PatternBorder } from "@/components/ui/pattern-border";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path ? "text-burgundy" : "hover:text-burgundy";
  };

  return (
    <header className="relative bg-white shadow-md">
      <PatternBorder />
      
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Site Title */}
        <Link href="/">
          <div className="flex items-center mb-4 md:mb-0 cursor-pointer">
            <div className="w-12 h-12 bg-burgundy rounded-full flex items-center justify-center">
              <span className="text-white font-heading text-xl">ቤተ</span>
            </div>
            <div className="ml-4">
              <h1 className="font-heading text-2xl md:text-3xl text-burgundy">Ethiopian Orthodox</h1>
              <p className="text-sm text-gold font-semibold tracking-wide">Spiritual Resources Portal</p>
            </div>
          </div>
        </Link>
        
        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center">
          <nav className="hidden md:flex space-x-8 font-medium mr-6">
            <Link href="/">
              <a className={`transition duration-300 ${isActive("/")}`}>{t('navItems', 'home')}</a>
            </Link>
            <Link href="/teachings">
              <a className={`transition duration-300 ${isActive("/teachings")}`}>{t('navItems', 'teachings')}</a>
            </Link>
            <Link href="/calendar">
              <a className={`transition duration-300 ${isActive("/calendar")}`}>{t('navItems', 'calendar')}</a>
            </Link>
            <Link href="/prayers">
              <a className={`transition duration-300 ${isActive("/prayers")}`}>{t('navItems', 'prayers')}</a>
            </Link>
            <Link href="/churches">
              <a className={`transition duration-300 ${isActive("/churches")}`}>{t('navItems', 'churches')}</a>
            </Link>
          </nav>
          
          {/* Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden bg-burgundy text-white p-2 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
