import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'portfolio', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'services', label: t('nav.services') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navHeight = scrolled && !isHovered ? 'h-[50px]' : 'h-[80px]';

  return (
    <motion.nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navHeight} 
                  bg-luxury-black/95 backdrop-blur-md border-b border-luxury-gold/20`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-accent text-2xl font-bold tracking-wider"
        >
          <span className="text-luxury-gold">ALL</span>
          <span className="text-white"> IN</span>
        </motion.div>

        {/* Nav Items */}
        <div className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="font-accent text-sm tracking-wide transition-colors duration-300
                         hover:text-luxury-gold relative py-2"
              >
                {item.label}
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-luxury-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </motion.div>
          ))}

          {/* Language Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <LanguageSwitcher />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;