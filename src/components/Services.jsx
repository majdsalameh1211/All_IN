import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      titleKey: 'services.items.selling.title',
      descKey: 'services.items.selling.desc',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
    },
    {
      id: 2,
      titleKey: 'services.items.acquisition.title',
      descKey: 'services.items.acquisition.desc',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'
    },
    {
      id: 3,
      titleKey: 'services.items.land.title',
      descKey: 'services.items.land.desc',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
    },
    {
      id: 4,
      titleKey: 'services.items.rentals.title',
      descKey: 'services.items.rentals.desc',
      image: 'https://images.unsplash.com/photo-1615875221405-33c0d6e80315?w=800'
    },
    {
      id: 5,
      titleKey: 'services.items.marketing.title',
      descKey: 'services.items.marketing.desc',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'
    },
    {
      id: 6,
      titleKey: 'services.items.consulting.title',
      descKey: 'services.items.consulting.desc',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="services-header"
        >
          <h2 className="services-title">
            {t('services.title')}
          </h2>
          <p className="services-subtitle">
            {t('services.subtitle')}
          </p>
          <div className="services-divider" />
        </motion.div>

        {/* Grid Layout - 3 columns, 2 rows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="services-grid"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="service-card"
            >
              {/* Image Container */}
              <div className="service-image-wrapper">
                <motion.img
                  animate={{
                    scale: hoveredCard === service.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="service-image"
                />

                {/* Hover Overlay with Explore Button */}
                <AnimatePresence>
                  {hoveredCard === service.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="service-overlay"
                    >
                      <button className="service-explore-btn">
                        {t('services.explore')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Info */}
              <motion.div
                animate={{
                  y: hoveredCard === service.id ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
                className="service-info"
              >
                <h3 className="service-title">
                  {t(service.titleKey)}
                </h3>
                <p className="service-desc">
                  {t(service.descKey)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;