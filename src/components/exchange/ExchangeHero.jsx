import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import styles from './ExchangeHero.module.css';

const ExchangeHero = ({ onOpenHowItWorks }) => {
  return (
    <motion.section
      className={styles.heroContainer}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Exchange Center Header"
    >
      <div className={styles.heroBackgroundGlow} aria-hidden="true" />

      {/* Top Breadcrumb & Status Pill */}
      <div className={styles.breadcrumbRow}>
        <div className={styles.brandBadge}>
          <Sparkles size={13} className={styles.sparkleIcon} />
          <span>VELOP REWARDS VAULT</span>
        </div>
        <span className={styles.breadcrumbDivider}>•</span>
        <div className={styles.liveStatusBadge}>
          <span className={styles.pulseDot} />
          <span>Real-Time Rate System Active</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left: Text & Positioning */}
        <div className={styles.textContent}>
          <div className={styles.titleArea}>
            <h1 className={styles.mainHeading}>Exchange Center</h1>
            <p className={styles.subHeading}>Turn Your Earned Gems into VEs</p>
          </div>

          <p className={styles.description}>
            Convert your eligible Gems into VEs (virtual reward currency) and continue your reward journey.
            Select a verified conversion tier to instantly receive virtual credits for premium catalog redemptions.
          </p>

          <div className={styles.metaPills}>
            <span className={styles.pill}>
              <Zap size={14} className={styles.pillIconZap} />
              Instant Settlement
            </span>
            <span className={styles.pill}>
              <ShieldCheck size={14} className={styles.pillIconShield} />
              Predefined Guaranteed Rates
            </span>
            <span className={styles.pill}>
              <CheckCircle size={14} className={styles.pillIconCheck} />
              Zero Platform Commission
            </span>
            {onOpenHowItWorks && (
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className={styles.howItWorksPill}
              >
                <HelpCircle size={14} />
                <span>How It Works</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: 3D Holographic Portal & Coin Illustration */}
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

