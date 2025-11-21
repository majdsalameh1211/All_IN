import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Brand Story */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="about-story"
        >
          <h2 className="about-title">
            {t('about.title')}
          </h2>
          <div className="about-divider" />

          <p className="about-paragraph">
            {t('about.story1')}
          </p>
          <p className="about-paragraph">
            {t('about.story2')}
          </p>
          <p className="about-paragraph">
            {t('about.story3')}
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="about-team-section"
        >
          <h3 className="about-team-title">
            {t('about.teamTitle')}
          </h3>

          {/* Fares - Left Circle, Right Text */}
          <div className="team-member team-member-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="team-photo-wrapper"
            >
              <div className="team-photo">
                <img
                  src="public\fares.jpg"
                  alt="Fares Gabor"
                  className="team-photo-image"
                />
              </div>
            </motion.div>

            <div className="team-info team-info-left">
              <h4 className="team-name">
                {t('about.team.fares.name')}
              </h4>
              <p className="team-title">
                {t('about.team.fares.title')}
              </p>
              <p className="team-quote">
                "{t('about.team.fares.quote')}"
              </p>
              <p className="team-bio">
                {t('about.team.fares.bio')}
              </p>
            </div>
          </div>

          {/* Ward - Right Circle, Left Text */}
          <div className="team-member team-member-right">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="team-photo-wrapper"
            >
              <div className="team-photo">
                <img
                  src="public\ward.jpg"
                  alt="Ward Gabor"
                  className="team-photo-image"
                />
              </div>
            </motion.div>

            <div className="team-info team-info-right">
              <h4 className="team-name">
                {t('about.team.ward.name')}
              </h4>
              <p className="team-title">
                {t('about.team.ward.title')}
              </p>
              <p className="team-quote">
                "{t('about.team.ward.quote')}"
              </p>
              <p className="team-bio">
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
          <h3 className="about-approach-title">
            {t('about.approachTitle')}
          </h3>

          <div className="approach-grid">
            {/* Discretion */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="approach-card"
            >
              <div className="approach-icon">🔒</div>
              <h4 className="approach-card-title">
                {t('about.approach.discretion.title')}
              </h4>
              <p className="approach-card-desc">
                {t('about.approach.discretion.desc')}
              </p>
            </motion.div>

            {/* Expertise */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="approach-card"
            >
              <div className="approach-icon">💎</div>
              <h4 className="approach-card-title">
                {t('about.approach.expertise.title')}
              </h4>
              <p className="approach-card-desc">
                {t('about.approach.expertise.desc')}
              </p>
            </motion.div>

            {/* Dedication */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="approach-card"
            >
              <div className="approach-icon">🤝</div>
              <h4 className="approach-card-title">
                {t('about.approach.dedication.title')}
              </h4>
              <p className="approach-card-desc">
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