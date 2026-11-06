import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from './HowExchangeWorks.module.css';

const pipelinePhases = [
  {
    num: '01',
    phase: 'EARN GEMS',
    detail: 'Complete daily tasks & quests',
    icon: '/assets/step1_earn.png',
  },
  {
    num: '02',
    phase: 'SELECT TIER',
    detail: 'Pick your multiplier tier',
    icon: '/assets/step2_choose.png',
  },
  {
    num: '03',
    phase: 'PREVIEW YIELD',
    detail: 'Check conversion breakdown',
    icon: '/assets/step3_review.png',
  },
  {
    num: '04',
    phase: 'INSTANT CONFIRM',
    detail: 'Authorize in 1 click',
    icon: '/assets/step4_confirm.png',
  },
  {
    num: '05',
    phase: 'RECEIVE VEs',
    detail: 'Spend in catalog store',
    icon: '/assets/step5_receive.png',
  },
];

const HowExchangeWorks = () => {
  return (
    <section className={styles.container} aria-label="How Exchange Works">
      <div className={styles.headerRow}>
        <div className={styles.badge}>
          <Sparkles size={11} />
          <span>REWARD PIPELINE</span>
        </div>
        <h2 className={styles.title}>How Exchange Works</h2>
        <p className={styles.sub}>5 simple phases from daily activity to instant spendable rewards</p>
      </div>

      <div className={styles.pipelineTrack}>
        {pipelinePhases.map((phase, idx) => (
          <React.Fragment key={phase.num}>
            <motion.div
              className={styles.phaseNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.06 }}
              whileHover={{ y: -3 }}
            >
              <div className={styles.nodeIconChamber}>
                <img
                  src={phase.icon}
                  alt={phase.phase}
                  className={styles.nodeImg}
                />
              </div>
              <div className={styles.phaseNumber}>PHASE {phase.num}</div>
              <h4 className={styles.phaseTitle}>{phase.phase}</h4>
              <span className={styles.phaseDetail}>{phase.detail}</span>
            </motion.div>

            {idx < pipelinePhases.length - 1 && (
              <div className={styles.connectorArrow} aria-hidden="true">
                <ArrowRight size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowExchangeWorks;
