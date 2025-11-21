import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Send to backend/email service
    console.log('Form submitted:', formData);
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="contact-header"
        >
          <h2 className="contact-title">
            {t('contact.title')}
          </h2>
          <p className="contact-subtitle">
            {t('contact.subtitle')}
          </p>
          <div className="contact-divider" />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="contact-form-wrapper"
        >
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder={t('contact.form.name')}
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder={t('contact.form.email')}
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder={t('contact.form.phone')}
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />

            {/* Interest Dropdown - FIXED DESIGN */}
            <div className="select-wrapper">
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>{t('contact.form.interest')}</option>
                <option value="buying">{t('contact.form.interestOptions.buying')}</option>
                <option value="selling">{t('contact.form.interestOptions.selling')}</option>
                <option value="renting">{t('contact.form.interestOptions.renting')}</option>
                <option value="land">{t('contact.form.interestOptions.land')}</option>
                <option value="consulting">{t('contact.form.interestOptions.consulting')}</option>
              </select>
              <svg className="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder={t('contact.form.message')}
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="form-textarea"
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`form-submit-btn ${submitted ? 'success' : ''}`}
            >
              {submitted ? t('contact.form.success') : t('contact.form.submit')}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info Grid - REARRANGED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="contact-info-grid"
        >
          {/* Contact Information Card */}
          <div className="info-card">
            <h3 className="info-card-title">
              {t('contact.info.title')}
            </h3>
            <div className="info-items">
              <div className="info-item">
                <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="info-text">{t('contact.info.address')}</p>
              </div>
              <div className="info-item">
                <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p className="info-text">{t('contact.info.phone')}</p>
              </div>
              <div className="info-item">
                <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="info-text">{t('contact.info.email')}</p>
              </div>
            </div>
          </div>

          {/* Google Maps - BIGGER WITH HOVER EFFECT */}
          <div 
            className={`map-card ${isMapExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsMapExpanded(true)}
            onMouseLeave={() => setIsMapExpanded(false)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13442.123456789!2d35.3213!3d32.7044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db1234567890a%3A0x1234567890abcdef!2sNof%20HaGalil!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil"
              className="map-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>

          {/* Office Hours Card */}
          <div className="info-card">
            <h3 className="info-card-title">
              {t('contact.info.hoursTitle')}
            </h3>
            <div className="info-items">
              <div className="info-item">
                <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="info-text">{t('contact.info.hours')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;