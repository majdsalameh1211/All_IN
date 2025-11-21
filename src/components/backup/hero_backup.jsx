import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {/* Gradient Background (Video Placeholder) */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-black to-luxury-charcoal">
          {/* Animated Pattern Overlay */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center backdrop-blur-sm bg-luxury-black/30 p-12 rounded-2xl 
                     border border-luxury-gold/20 shadow-2xl"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-accent text-6xl md:text-7xl font-bold mb-2">
              <span className="text-luxury-gold">ALL</span>
              <span className="text-white"> IN</span>
            </h1>
            <div className="w-32 h-1 bg-luxury-gold mx-auto rounded-full" />
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight"
          >
            {t('hero.tagline')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-luxury-gray text-lg md:text-xl mb-8 font-light"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center justify-center gap-2 mb-10 text-luxury-gold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-accent text-sm tracking-wide">{t('hero.location')}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              {t('hero.cta1')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="btn-secondary"
            >
              {t('hero.cta2')}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <span className="text-luxury-gold text-xs font-accent tracking-wider">
            {t('hero.scroll')}
          </span>
          <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;