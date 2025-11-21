import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Portfolio.css';



const Portfolio = () => {
  const { t } = useTranslation();
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Placeholder property data
  const allProperties = [
    {
      id: 1,
      title: 'Sea View Penthouse',
      location: 'Haifa',
      price: '₪8.5M',
      category: 'forSale',
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    },
    {
      id: 2,
      title: 'Modern Villa',
      location: 'Nof HaGalil',
      price: '₪6.2M',
      category: 'forSale',
      badge: 'EXCLUSIVE',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    },
    {
      id: 3,
      title: 'Luxury Apartment',
      location: 'Nazareth',
      price: '₪12,000/mo',
      category: 'forRent',
      badge: null,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    },
    {
      id: 4,
      title: 'Historic Property',
      location: 'Yafia',
      price: '₪4.8M',
      category: 'sold',
      badge: 'SOLD',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    },
    {
      id: 5,
      title: 'Contemporary Home',
      location: 'Kafr Kanna',
      price: '₪5.5M',
      category: 'forSale',
      badge: null,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    },
    {
      id: 6,
      title: 'Garden Residence',
      location: 'Migdal HaEmek',
      price: '₪15,000/mo',
      category: 'forRent',
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    },
    {
      id: 7,
      title: 'Executive Suite',
      location: 'Haifa',
      price: '₪7.2M',
      category: 'sold',
      badge: 'SOLD',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    },
    {
      id: 8,
      title: 'Boutique Apartment',
      location: 'Nof HaGalil',
      price: '₪3.8M',
      category: 'forSale',
      badge: null,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
    }
  ];

// Filter properties by category
let filteredProperties = allProperties.filter(
  (p) => activeFilter === "all" || p.category === activeFilter
);

// 🔁 Force infinite loop by duplicating items when too few
if (filteredProperties.length > 0) {
  while (filteredProperties.length < 8) {
    filteredProperties = [...filteredProperties, ...filteredProperties];
  }
  filteredProperties = filteredProperties.slice(0, 8);
}


  const filters = [
    { id: 'all', label: t('portfolio.filters.all') },
    { id: 'forSale', label: t('portfolio.filters.forSale') },
    { id: 'forRent', label: t('portfolio.filters.forRent') },
    { id: 'sold', label: t('portfolio.filters.sold') }
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="portfolio-header"
        >
          <h2 className="portfolio-title">
            {t('portfolio.title')}
          </h2>
          <div className="portfolio-divider" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="portfolio-filters"
        >
          {filters.map((filter) => (
            <div key={filter.id} className="filter-wrapper">
              <button
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              >
                <span>{filter.label}</span>
                
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="filter-active-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Property Slideshow - Simple Slide Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="portfolio-carousel"
        >
          <Swiper
            key={activeFilter} // Reset carousel when filter changes
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000, // 5 seconds per slide
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            speed={800} // Smooth transition speed
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active-gold'
            }}
            navigation={true}
            loop={true}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30
              },
              1280: { 
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
            className="properties-swiper"
          >
            {filteredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <div
                  className="property-card"
                  onMouseEnter={() => setHoveredCard(property.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Container */}
                  <div className="property-image-wrapper">
                    <motion.img
                      animate={{
                        scale: hoveredCard === property.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      src={property.image}
                      alt={property.title}
                      className="property-image"
                    />
                    
                    {/* Badge */}
                    {property.badge && (
                      <div className="property-badge">
                        {t(`portfolio.badges.${property.badge.toLowerCase()}`)}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredCard === property.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="property-overlay"
                        >
                          <button className="property-view-btn">
                            {t('portfolio.viewDetails')}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Property Info */}
                  <motion.div
                    animate={{
                      y: hoveredCard === property.id ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="property-info"
                  >
                    <h3 className="property-title">
                      {property.title}
                    </h3>
                    <div className="property-location">
                      <svg className="location-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{property.location}</span>
                    </div>
                    <p className="property-price">
                      {property.price}
                    </p>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;