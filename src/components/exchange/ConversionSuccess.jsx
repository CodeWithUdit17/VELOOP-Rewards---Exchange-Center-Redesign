import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, Hash } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './ConversionSuccess.module.css';

const ConversionSuccess = ({
  isOpen,
  conversionData,
  onContinue,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        // Trigger a refined, controlled reward burst
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#a855f7', '#34d399', '#38bdf8', '#ffffff'],
          ticks: 180,
          gravity: 0.9,
          scalar: 1,
          disableForReducedMotion: true,
        });
      } catch (err) {
        // fallback gracefully if canvas-confetti is unavailable
      }
    }
  }, [isOpen]);

  if (!isOpen || !conversionData) return null;

  const {
    requiredGems = 28,
    receiveVEs = 151,
    tierName = 'Daily Gem Conversion',
    txRef = 'VLP-' + Math.floor(10000 + Math.random() * 90000),
  } = conversionData;

  return (
    <AnimatePresence>
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="success-title">
        <motion.div
          className={styles.successCard}
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          <div className={styles.glowTop} aria-hidden="true" />

          {/* Animated Burst Check Icon */}
          <motion.div
            className={styles.iconBurst}
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
          >
            <CheckCircle2 size={42} />
          </motion.div>

          <h2 id="success-title" className={styles.title}>
            Conversion Complete
          </h2>
          <p className={styles.subtitle}>
            Your rewards have been processed and credited to your VELOOP balance.
          </p>

          {/* Conversion Details Summary */}
          <div className={styles.resultBox}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>
                <GemIcon size={18} />
                <span>Gems Converted</span>
              </span>
              <span className={styles.resultValueGems}>-{requiredGems} Gems</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>
                <VECoinIcon size={18} />
                <span>VEs Added</span>
              </span>
              <span className={styles.resultValueVEs}>+{receiveVEs} VEs</span>
            </div>
          </div>

          <div className={styles.txBadge}>
            <Hash size={12} />
            <span>Ref: {txRef} • {tierName}</span>
          </div>

          <button
            type="button"
            className={styles.continueBtn}
            onClick={onContinue}
            autoFocus
          >
            <Sparkles size={16} />
            <span>Continue</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConversionSuccess;
