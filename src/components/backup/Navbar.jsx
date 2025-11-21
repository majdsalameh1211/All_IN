import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '#home' },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'portfolio', label: t('nav.portfolio'), href: '#portfolio' },
    { id: 'services', label: t('nav.services'), href: '#services' },
    { id: 'testimonials', label: t('nav.testimonials'), href: '#testimonials' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = ['home', 'about', 'portfolio', 'services', 'testimonials', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isHovering ? 'h-[50px] bg-luxury-black/95 backdrop-blur-md border-b border-luxury-gold/20' : 'h-[80px] bg-luxury-black/80 backdrop-blur-sm'
        }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-2xl font-accent font-bold text-luxury-gold hover:text-luxury-gold-light transition-colors cursor-pointer"
        >
          {/* Logo */}
          <img
            src="public\logo.png"   
            alt="ALL IN Logo"
            className="h-8 w-auto"
          />

          {/* Brand Text */}
          <span>ALL IN</span>
        </motion.div>


        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className={`text-sm lg:text-base font-sans transition-colors duration-300 ${activeSection === item.id ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'
                  }`}
              >
                {item.label}
              </button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-luxury-gold"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
