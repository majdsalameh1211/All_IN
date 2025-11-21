import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      // Track active section
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
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="navbar-logo"
            onClick={() => handleNavClick('home')}
          >
            <img src="/logo.png" alt="ALL IN Logo" className="navbar-logo-image" />
            <div className="navbar-logo-text">
              <span className="logo-all">ALL</span>
              <span className="logo-in">IN</span>
            </div>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="navbar-items">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="navbar-item-wrapper"
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`navbar-item ${activeSection === item.id ? 'navbar-item-active' : ''}`}
                >
                  {item.label}
                </button>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="navbar-underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side: Language Switcher + Mobile Menu Button */}
          <div className="navbar-right">
            <LanguageSwitcher />
            
            {/* Mobile Menu Toggle */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="mobile-menu"
            >
              {/* Mobile Menu Header */}
              <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                  <img src="/logo.png" alt="ALL IN Logo" className="mobile-menu-logo-image" />
                  <div className="mobile-menu-logo-text">
                    <span className="logo-all">ALL</span>
                    <span className="logo-in">IN</span>
                  </div>
                </div>
                <button
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="mobile-menu-items">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-menu-item ${activeSection === item.id ? 'mobile-menu-item-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="mobile-indicator"
                        className="mobile-menu-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="mobile-menu-footer">
                <p className="mobile-menu-footer-text">{t('hero.tagline')}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;