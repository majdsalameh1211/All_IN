import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

const Testimonials = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Counter visibility observer – triggers EVERY TIME we enter the section
  const { ref: counterRef, inView: countersInView } = useInView({
    threshold: 0.4,
    triggerOnce: false
  });

  const testimonials = t('testimonials.quotes', { returnObjects: true });

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="testimonials-header"
        >
          <h2 className="testimonials-title">
            {t('testimonials.title')}
          </h2>
          <div className="testimonials-divider" />
        </motion.div>

        {/* Big Stat with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="big-stat"
        >
          <h3 className="big-stat-number">
            <CountUpAnimation
              end={180}
              suffix="M+"
              duration={2.5}
              isInView={countersInView}
            />
          </h3>
          <p className="big-stat-desc">
            {t('testimonials.bigStatDesc')}
          </p>
        </motion.div>

        {/* Mini Stats with Counter Animations */}
        <motion.div
        ref={counterRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="stats-grid"
        >
          <div className="stat-card">
            <p className="stat-number">
              <CountUpAnimation
                end={120}
                suffix="+"
                duration={2}
                isInView={countersInView}
              />
            </p>
            <p className="stat-label">
              {t('testimonials.stats.transactions')}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-number">
              <CountUpAnimation
                end={98}
                suffix="%"
                duration={2}
                isInView={countersInView}
              />
            </p>
            <p className="stat-label">
              {t('testimonials.stats.satisfaction')}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-number">
              <CountUpAnimation
                end={4.9}
                suffix="★"
                duration={2}
                decimals={1}
                isInView={countersInView}
              />
            </p>
            <p className="stat-label">
              {t('testimonials.stats.rating')}
            </p>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="testimonials-carousel"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active-gold'
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {Array.isArray(testimonials) && testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <svg
                    className="quote-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="testimonial-text">
                    "{testimonial.text}"
                  </p>

                  <div className="testimonial-author">
                    <p className="author-name">
                      — {testimonial.author}
                    </p>
                    <p className="author-location">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

// Counter Animation Component
const CountUpAnimation = ({ end, suffix = '', duration = 2, decimals = 0, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (endValue - startValue) * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure we end exactly at the target
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export default Testimonials;