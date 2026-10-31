import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
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

      {/* Breadcrumb & Platform Badge */}
      <div className={styles.breadcrumbRow}>
        <span className={styles.brandBadge}>
          <Sparkles size={13} />
          VELOP Rewards
        </span>
        <span className={styles.breadcrumbDivider}>/</span>
        <span className={styles.breadcrumbCurrent}>Reward Conversion Vault</span>
      </div>

      <div className={styles.mainGrid}>
        {/* Left: Text & Positioning */}
        <div className={styles.textContent}>
          <div className={styles.titleArea}>
            <h1 className={styles.mainHeading}>Exchange Center</h1>
            <p className={styles.subHeading}>Turn your earned Gems into VEs</p>
          </div>

          <p className={styles.description}>
            Convert your eligible Gems into VEs and continue your reward journey.
            Select a predefined conversion tier to instantly receive virtual credits for premium catalog redemptions.
          </p>

          <div className={styles.metaPills}>
            <span className={styles.pill}>
              <Zap size={14} className={styles.pillIcon} />
              Instant Credit
            </span>
            <span className={styles.pill}>
              <ShieldCheck size={14} className={styles.pillIcon} />
              100% Guaranteed Rate
            </span>
            {onOpenHowItWorks && (
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className={styles.pill}
                style={{ cursor: 'pointer', background: 'rgba(99, 102, 241, 0.12)', color: '#c7d2fe', border: '1px solid rgba(129, 140, 248, 0.3)' }}
              >
                <HelpCircle size={14} style={{ color: '#818cf8' }} />
                How It Works
              </button>
            )}
          </div>
        </div>

        {/* Right: Gem -> VE Transformation Illustration */}
        <div className={styles.visualWrapper}>
          <div className={styles.transformStage}>
            {/* Gem Origin Orb */}
            <motion.div
              className={styles.stageOrb}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className={`${styles.orbCircle} ${styles.gemOrb}`}>
                <GemIcon size={38} />
              </div>
              <span className={styles.orbLabel}>Gems</span>
              <span className={styles.orbSub}>Earned Credit</span>
            </motion.div>

            {/* Conversion Pathway Stream */}
            <div className={styles.streamPathway} aria-hidden="true">
              <div className={styles.streamLine}>
                <div className={styles.streamPulse} />
              </div>
              <div className={styles.streamBadge}>
                <span>Convert</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* VE Destination Orb */}
            <motion.div
              className={styles.stageOrb}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
            >
              <div className={`${styles.orbCircle} ${styles.veOrb}`}>
                <VECoinIcon size={38} />
              </div>
              <span className={styles.orbLabel}>VEs</span>
              <span className={styles.orbSub}>Reward Currency</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExchangeHero;

