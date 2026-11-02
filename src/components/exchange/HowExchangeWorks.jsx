import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Lightbulb, Sparkles } from 'lucide-react';
import { howExchangeWorksSteps } from '../../data/exchangeData';
import styles from './HowExchangeWorks.module.css';

const stepIcons = [
  '/assets/step1_earn.png',
  '/assets/step2_choose.png',
  '/assets/step3_review.png',
  '/assets/step4_confirm.png',
  '/assets/step5_receive.png',
];

const HowExchangeWorks = () => {
  return (
    <section className={styles.container} aria-label="How Exchange Works">
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBadge}>
            <Layers size={18} />
          </div>
          <div>
            <h2 className={styles.title}>How Exchange Works</h2>
            <div className={styles.subtitle}>
              5 simple steps to convert your earned activity credits into spendable rewards
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stepsGrid}>
        {howExchangeWorksSteps.map((step, idx) => (
          <motion.div
            key={step.stepNumber}
            className={styles.stepCard}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <div className={styles.nodeCircle}>
              <img
                src={stepIcons[idx] || '/assets/step1_earn.png'}
                alt={`Step ${step.stepNumber}`}
                className={styles.nodeImg}
              />
            </div>
            <div className={styles.stepNumberBadge}>Step {step.stepNumber}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className={styles.proTipBanner}>
        <Lightbulb size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
        <span>
          <strong>Pro-tip:</strong> The more Gems you hold, the higher conversion value you unlock! Keep participating in VELOOP activities to level up your yield.
        </span>
      </div>
    </section>
  );
};

export default HowExchangeWorks;

