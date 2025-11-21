import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  // Separate refs for different sections
  const { ref: storyRef, inView: storyInView } = useInView({
    threshold: 0.2,
    triggerOnce: true // Story only animates once
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.2,
    triggerOnce: true // Team only animates once
  });

  const { ref: approachRef, inView: approachInView } = useInView({
    threshold: 0.2,
    triggerOnce: true // Approach only animates once
  });

  // For video control - doesn't trigger once
  const { ref: videoSectionRef, inView: videoSectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false // Videos need to restart when re-entering
  });

  return (
    <section id="about" className="about-section" ref={videoSectionRef}>
      <div className="about-container">
        {/* Brand Story */}
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
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
          ref={teamRef}
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
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
                  src="/fares.jpg"
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

          {/* Fares Video with Smart Controls */}
          <SmartVideo
            videoSrc="/faresjaboor.mp4"
            isInView={videoSectionInView}
            delay={0.5}
          />

          {/* Ward - Right Circle, Left Text */}
          <div className="team-member team-member-right">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="team-photo-wrapper"
            >
              <div className="team-photo">
                <img
                  src="/ward.jpg"
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

          {/* Ward Video with Smart Controls */}
          <SmartVideo
            videoSrc="/wardjaboor.mp4"
            isInView={videoSectionInView}
            delay={0.7}
          />
        </motion.div>

        {/* Our Approach - 3 Pillars */}
        <motion.div
          ref={approachRef}
          initial={{ opacity: 0, y: 30 }}
          animate={approachInView ? { opacity: 1, y: 0 } : {}}
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

// Smart Video Component with Advanced Controls - WITH MUTED INDICATOR
const SmartVideo = ({ videoSrc, isInView, delay }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: none)');
      setIsTouchDevice(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.currentTime = 0;
      video.muted = true;

      const playTimer = setTimeout(() => {
        video.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
        setHasPlayedOnce(true);
      }, delay * 1000);

      return () => clearTimeout(playTimer);
    } else {
      video.pause();
      video.currentTime = 0;
      setHasPlayedOnce(false);
      setIsHovered(false);
    }
  }, [isInView, delay]);

  // Handle hover - KEEP VIDEO PLAYING
  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video && hasPlayedOnce) {
      video.muted = false;
      if (video.paused) {
        video.play().catch(error => {
          console.log('Play on hover failed:', error);
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video && hasPlayedOnce) {
      video.muted = true;
      if (video.paused) {
        video.play().catch(error => {
          console.log('Play on leave failed:', error);
        });
      }
    }
  };

const handleClick = () => {
  if (!isTouchDevice) return;   // Only run on phones/tablets
  if (!hasPlayedOnce) return;   // Don't toggle before first play

  const video = videoRef.current;
  if (!video) return;

  // Toggle mute/unmute
  if (video.muted) {
    // Currently muted → UNMUTE
    video.muted = false;
    setIsHovered(true);    // Show 🔊
    if (video.paused) {
      video.play().catch(() => {});
    }
  } else {
    // Currently unmuted → MUTE
    video.muted = true;
    setIsHovered(false);   // Show 🔇
    if (video.paused) {
      video.play().catch(() => {});
    }
  }
};





  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (video && isInView) {
      video.currentTime = 0;
      video.muted = true;
      setIsHovered(false);
      video.play().catch(error => {
        console.log('Restart prevented:', error);
      });
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="team-video-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} 
    >
      <video
        ref={videoRef}
        className="team-video"
        playsInline
        preload="metadata"
        onEnded={handleVideoEnd}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sound indicator - ALWAYS visible when video is playing */}
      {hasPlayedOnce && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`sound-indicator ${isHovered ? 'unmuted' : 'muted'}`}
        >
          {isHovered ? '🔊' : '🔇'}
        </motion.div>
      )}
    </motion.div>
  );
};


export default About;