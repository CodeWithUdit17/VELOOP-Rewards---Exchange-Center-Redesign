import React from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronRight } from 'lucide-react';
import styles from './HowExchangeWorks.module.css';

const stepsData = [
  {
    stepNum: '01',
    title: 'Earn Gems',
    desc: 'Complete eligible activities and earn Gems.',
    icon: '/assets/step1_earn.png',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.25)',
  },
  {
    stepNum: '02',
    title: 'Choose Conversion',
    desc: 'Select a conversion that suits your Gems balance.',
    icon: '/assets/step2_choose.png',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.25)',
  },
  {
    stepNum: '03',
    title: 'Review Exchange',
    desc: 'Review the details before confirming the conversion.',
    icon: '/assets/step3_review.png',
    accentColor: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.25)',
  },
  {
    stepNum: '04',
    title: 'Confirm',
    desc: 'Confirm the exchange to convert your Gems.',
    icon: '/assets/step4_confirm.png',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.25)',
  },
  {
    stepNum: '05',
    title: 'Receive VEs',
    desc: 'VEs are added to your balance instantly.',
    icon: '/assets/step5_receive.png',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
  },
];

const HowExchangeWorks = ({ onOpenInfo }) => {
  return (
    <section className={styles.container} aria-label="How Exchange Works">
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>How Exchange Works</h2>
          <button
            type="button"
            className={styles.infoBtn}
            onClick={onOpenInfo}
            aria-label="How exchange works info"
            title="Learn about the conversion process"
          >
            <Info size={14} />
          </button>
        </div>
        <span className={styles.headerSub}>
          Simple 5-step conversion pipeline from activity to spendable balance
        </span>
      </div>

      <div className={styles.stepsRail}>
        {stepsData.map((step, idx) => (
          <React.Fragment key={step.stepNum}>
            <motion.div
              className={styles.stepCard}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div
                className={styles.cardGlow}
                style={{ background: step.glowColor }}
              />

              {/* Numbered Indicator */}
              <div
                className={styles.numberBadge}
                style={{
                  color: step.accentColor,
                  borderColor: step.accentColor,
                  background: `${step.glowColor}`,
                }}
              >
                {step.stepNum}
              </div>

              {/* 3D Glowing Circle Icon */}
              <div className={styles.iconChamber}>
                <img
                  src={step.icon}
                  alt={step.title}
                  className={styles.stepIconImg}
                />
              </div>

              {/* Step Title & Description */}
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>

            {/* Dotted Flow Rail Connector with Chevron */}
            {idx < stepsData.length - 1 && (
              <div className={styles.connector} aria-hidden="true">
                <div className={styles.dashedLine} />
                <div className={styles.chevronBox}>
                  <ChevronRight size={13} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowExchangeWorks;
