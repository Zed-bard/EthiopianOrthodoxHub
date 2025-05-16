import { useEffect } from 'react';
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { IoClose } from "react-icons/io5";
import { FaHome, FaBook, FaCalendar, FaPray, FaChurch, FaGlobe, FaBell } from "react-icons/fa";
import { RiSettings4Line } from 'react-icons/ri';
import LanguageSelector from "@/components/LanguageSelector";
import NotificationIcon from "@/components/NotificationIcon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    x: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const menuItems = [
  { href: "/", icon: FaHome, label: "home" },
  { href: "/teachings", icon: FaBook, label: "teachings" },
  { href: "/calendar", icon: FaCalendar, label: "calendar" },
  { href: "/prayers", icon: FaPray, label: "prayers" },
  { href: "/churches", icon: FaChurch, label: "churches" }
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={onClose}
          />

          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[90%] max-w-md bg-white/95 backdrop-blur-xl z-50 shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
          >
            {/* Header with Glass Effect */}
            <div className="relative bg-gradient-to-b from-burgundy/10 to-transparent backdrop-blur-sm border-b border-white/20 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-burgundy rounded-xl flex items-center justify-center shadow-lg shadow-burgundy/20">
                    <span className="text-white font-heading text-lg">ቤተ</span>
                  </div>
                  <h2 className="font-heading text-burgundy text-xl">Menu</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/80 rounded-xl transition-all"
                >
                  <IoClose className="w-6 h-6 text-burgundy" />
                </motion.button>
              </div>
            </div>

            {/* Navigation Items with Improved Styling */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto py-6 px-4 scrollbar-none"
            >
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center px-4 py-4 rounded-xl transition-all ${
                          active
                            ? "bg-gradient-to-r from-burgundy to-burgundy/90 text-white shadow-lg shadow-burgundy/20 scale-[1.02]"
                            : "hover:bg-burgundy/5 text-gray-700 hover:scale-[1.01]"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          active ? "text-white" : "text-burgundy"
                        }`} />
                        <span className="ml-3 font-medium">
                          {t('navItems', item.label)}
                        </span>
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-2 h-2 rounded-full bg-white shadow-sm"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions Section */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 px-4 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3 px-4">
                  <motion.div
                    variants={itemVariants}
                    className="p-4 rounded-xl bg-burgundy/5 flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="p-2 rounded-lg bg-burgundy/10">
                      <FaGlobe className="w-5 h-5 text-burgundy" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Language</span>
                    <LanguageSelector />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="p-4 rounded-xl bg-burgundy/5 flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="p-2 rounded-lg bg-burgundy/10">
                      <FaBell className="w-5 h-5 text-burgundy" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Notifications</span>
                    <NotificationIcon />
                  </motion.div>
                </div>
              </div>
            </motion.nav>

            {/* Enhanced User Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-t border-gray-100/50 p-5 bg-gradient-to-t from-burgundy/5 to-transparent backdrop-blur-sm"
            >
              {user ? (                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white shadow-sm"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-burgundy/5 rounded-xl transition-colors flex items-center text-burgundy"
                    >
                      <RiSettings4Line className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <Link href="/" onClick={onClose}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 flex items-center justify-center bg-white border border-burgundy/20 text-burgundy rounded-xl font-medium shadow-sm hover:bg-burgundy/5 transition-all"
                    >
                      {t('profile', 'backToHome')}
                    </motion.button>
                  </Link>
                </div>
              ) : (                <Link href="/profile">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full px-4 py-3.5 bg-gradient-to-r from-burgundy to-burgundy/90 text-white rounded-xl font-medium shadow-lg shadow-burgundy/20 hover:shadow-xl hover:shadow-burgundy/30 transition-all"
                  >
                    {t('profile', 'signIn') || 'Sign In'}
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;