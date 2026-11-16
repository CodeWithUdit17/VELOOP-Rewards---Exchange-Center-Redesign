import React from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronRight } from 'lucide-react';
import styles from './HowExchangeWorks.module.css';

const stepsData = [
  {
    stepNum: '01',
    title: 'Choose',
    subtitle: 'Select Tier',
    desc: 'Select a conversion package or enter custom Gems.',
    icon: '/assets/step2_choose.png',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.2)',
  },
  {
    stepNum: '02',
    title: 'Review',
    subtitle: 'Check Ratio',
    desc: 'Review required Gems, incoming VEs, and rate preview.',
    icon: '/assets/step3_review.png',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
  },
  {
    stepNum: '03',
    title: 'Confirm',
    subtitle: 'Authorize',
    desc: 'Confirm the exchange with instant zero-fee settlement.',
    icon: '/assets/step4_confirm.png',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.2)',
  },
  {
    stepNum: '04',
    title: 'Receive',
    subtitle: 'Instant Credit',
    desc: 'VEs land in your spendable treasury instantly.',
    icon: '/assets/step5_receive.png',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.2)',
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
            <Info size={13} />
          </button>
        </div>
        <span className={styles.headerSub}>
          4-step conversion flow &bull; Instant atomic settlement
        </span>
      </div>

      <div className={styles.stepsRail}>
        {stepsData.map((step, idx) => (
          <React.Fragment key={step.stepNum}>
            <motion.div
              className={styles.stepCard}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={styles.cardGlow}
                style={{ background: step.glowColor }}
              />

              <div className={styles.topBadgeRow}>
                <span
                  className={styles.numberBadge}
                  style={{
                    color: step.accentColor,
                    borderColor: step.accentColor,
                    background: step.glowColor,
                  }}
                >
                  {step.stepNum}
                </span>
                <span className={styles.stepSubtitle}>{step.subtitle}</span>
              </div>

              <div className={styles.iconChamber}>
                <img
                  src={step.icon}
                  alt={step.title}
                  className={styles.stepIconImg}
                />
              </div>

              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>

            {idx < stepsData.length - 1 && (
              <div className={styles.connector} aria-hidden="true">
                <div className={styles.dashedLine} />
                <div className={styles.chevronBox}>
                  <ChevronRight size={12} />
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
