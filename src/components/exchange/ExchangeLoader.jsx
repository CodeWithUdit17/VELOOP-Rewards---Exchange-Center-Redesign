import React from 'react';
import { motion } from 'framer-motion';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './ExchangeLoader.module.css';

const ExchangeLoader = ({
  title = "Preparing your reward conversions...",
  subtitle = "Verifying real-time reward ledger and conversion availability."
}) => {
  return (
    <div className={styles.loaderContainer} role="status" aria-live="polite">
      <div className={styles.stageBox}>
        <motion.div
          className={`${styles.tokenOrb} ${styles.gemLoaderOrb}`}
          animate={{ scale: [1, 1.12, 1], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <GemIcon size={30} />
        </motion.div>

        <div className={styles.loaderSpinner} aria-hidden="true" />

        <motion.div
          className={`${styles.tokenOrb} ${styles.veLoaderOrb}`}
          animate={{ scale: [1, 1.12, 1], y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
        >
          <VECoinIcon size={30} />
        </motion.div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.pulseBar} aria-hidden="true">
        <div className={styles.pulseIndicator} />
      </div>
    </div>
  );
};

export default ExchangeLoader;
