import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="about" className="py-20 bg-luxury-black">
      <div className="container mx-auto px-6">
        {/* Brand Story */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-luxury-gold mx-auto mb-12 rounded-full" />
          
          <p className="text-luxury-gray text-lg mb-6 leading-relaxed">
            {t('about.story1')}
          </p>
          <p className="text-luxury-gray text-lg mb-6 leading-relaxed">
            {t('about.story2')}
          </p>
          <p className="text-luxury-gray text-lg leading-relaxed">
            {t('about.story3')}
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="font-serif text-4xl text-center text-white mb-16">
            {t('about.teamTitle')}
          </h3>

          {/* Fares - Left Circle, Right Text */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-64 flex-shrink-0"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light 
                              flex items-center justify-center overflow-hidden border-4 border-luxury-gold shadow-2xl">
                {/* Placeholder Image - Replace with actual image */}
                <div className="w-full h-full bg-luxury-charcoal flex items-center justify-center">
                  <span className="text-6xl text-luxury-gold font-serif">F</span>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h4 className="font-accent text-3xl text-luxury-gold mb-2">
                {t('about.team.fares.name')}
              </h4>
              <p className="text-luxury-gray text-sm mb-4 font-light tracking-wide">
                {t('about.team.fares.title')}
              </p>
              <p className="text-luxury-gold italic text-lg mb-4 font-serif">
                "{t('about.team.fares.quote')}"
              </p>
              <p className="text-luxury-gray leading-relaxed">
                {t('about.team.fares.bio')}
              </p>
            </div>
          </div>

          {/* Ward - Right Circle, Left Text */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-64 flex-shrink-0"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light 
                              flex items-center justify-center overflow-hidden border-4 border-luxury-gold shadow-2xl">
                {/* Placeholder Image - Replace with actual image */}
                <div className="w-full h-full bg-luxury-charcoal flex items-center justify-center">
                  <span className="text-6xl text-luxury-gold font-serif">W</span>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-right">
              <h4 className="font-accent text-3xl text-luxury-gold mb-2">
                {t('about.team.ward.name')}
              </h4>
              <p className="text-luxury-gray text-sm mb-4 font-light tracking-wide">
                {t('about.team.ward.title')}
              </p>
              <p className="text-luxury-gold italic text-lg mb-4 font-serif">
                "{t('about.team.ward.quote')}"
              </p>
              <p className="text-luxury-gray leading-relaxed">
                {t('about.team.ward.bio')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Approach - 3 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-serif text-4xl text-center text-white mb-16">
            {t('about.approachTitle')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Discretion */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-luxury-charcoal p-8 rounded-lg border border-luxury-gold/20 
                         hover:border-luxury-gold transition-all duration-300 text-center"
            >
              <div className="text-6xl mb-4">🔒</div>
              <h4 className="font-accent text-2xl text-luxury-gold mb-3">
                {t('about.approach.discretion.title')}
              </h4>
              <p className="text-luxury-gray text-sm">
                {t('about.approach.discretion.desc')}
              </p>
            </motion.div>

            {/* Expertise */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-luxury-charcoal p-8 rounded-lg border border-luxury-gold/20 
                         hover:border-luxury-gold transition-all duration-300 text-center"
            >
              <div className="text-6xl mb-4">💎</div>
              <h4 className="font-accent text-2xl text-luxury-gold mb-3">
                {t('about.approach.expertise.title')}
              </h4>
              <p className="text-luxury-gray text-sm">
                {t('about.approach.expertise.desc')}
              </p>
            </motion.div>

            {/* Dedication */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-luxury-charcoal p-8 rounded-lg border border-luxury-gold/20 
                         hover:border-luxury-gold transition-all duration-300 text-center"
            >
              <div className="text-6xl mb-4">🤝</div>
              <h4 className="font-accent text-2xl text-luxury-gold mb-3">
                {t('about.approach.dedication.title')}
              </h4>
              <p className="text-luxury-gray text-sm">
                {t('about.approach.dedication.desc')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;