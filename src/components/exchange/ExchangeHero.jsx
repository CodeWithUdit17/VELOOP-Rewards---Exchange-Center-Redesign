import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import styles from './ExchangeHero.module.css';

const ExchangeHero = ({ onOpenHowItWorks }) => {
  return (
    <motion.section
      className={styles.heroContainer}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="Exchange Center Header"
    >
      <div className={styles.heroBackgroundGlow} aria-hidden="true" />
      <div className={styles.cyberGridPattern} aria-hidden="true" />

      {/* Top Status Strip */}
      <div className={styles.breadcrumbRow}>
        <div className={styles.brandBadge}>
          <Sparkles size={13} className={styles.sparkleIcon} />
          <span>REWARD CONDUIT</span>
        </div>
        <div className={styles.liveStatusBadge}>
          <span className={styles.pulseDot} />
          <span>Real-Time Multipliers Active</span>
        </div>
        <span className={styles.zeroFeeBadge}>
          <Zap size={12} />
          <span>Zero Platform Fees</span>
        </span>
      </div>

      <div className={styles.mainGrid}>
        {/* Left: Punchy Title & Core Value */}
        <div className={styles.textContent}>
          <div className={styles.titleArea}>
            <h1 className={styles.mainHeading}>Exchange Center</h1>
            <p className={styles.subHeading}>Power up your Gems into spendable VEs</p>
          </div>

          <p className={styles.shortDescription}>
            Convert eligible activity Gems into virtual rewards with guaranteed multipliers and instant settlement.
          </p>

          <div className={styles.metaPills}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <Zap size={14} className={styles.pillIconZap} />
              </div>
              <div className={styles.featureText}>
                <strong>Instant</strong>
                <span>0s Settlement</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <ShieldCheck size={14} className={styles.pillIconShield} />
              </div>
              <div className={styles.featureText}>
                <strong>Guaranteed</strong>
                <span>Up to 5.39x Multiplier</span>
              </div>
            </div>

            {onOpenHowItWorks && (
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className={styles.howItWorksBtn}
              >
                <span>How It Works</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right: 3D Holographic Portal */}
        <div className={styles.visualWrapper} aria-hidden="true">
          <div className={styles.portalBox}>
            <img
              src="/assets/hero_portal_full.png"
              alt="Exchange Center 3D Portal"
              className={styles.portalImg}
            />
            <div className={styles.portalGlowHalo} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExchangeHero;

