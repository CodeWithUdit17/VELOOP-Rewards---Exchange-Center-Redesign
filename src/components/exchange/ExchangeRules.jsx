import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Info, ArrowRight } from 'lucide-react';
import styles from './ExchangeRules.module.css';

const trustPillars = [
  {
    icon: Zap,
    title: 'Zero Latency Settlement',
    desc: 'Instant atomic conversion with zero wait time.',
    color: '#fbbf24',
  },
  {
    icon: ShieldCheck,
    title: 'Guaranteed Multipliers',
    desc: '100% fixed ratios with zero platform fees or slippage.',
    color: '#34d399',
  },
  {
    icon: Lock,
    title: 'Audited Ledger Security',
    desc: 'Cryptographically logged with unique transaction references.',
    color: '#c084fc',
  },
];

const ExchangeRules = ({ onOpenGlossary }) => {
  return (
    <section className={styles.container} aria-label="Exchange Rules and Trust Guardrails">
      <div className={styles.bannerWrap}>
        <div className={styles.ambientGlow} />

        <div className={styles.headerRow}>
          <div className={styles.shieldIllustrationWrap}>
            <img
              src="/assets/shield_rules.png"
              alt="Security Shield"
              className={styles.shieldImg}
            />
          </div>

          <div className={styles.titleGroup}>
            <div className={styles.badge}>
              <ShieldCheck size={12} />
              <span>SECURITY PROTOCOLS</span>
            </div>
            <h3 className={styles.title}>Trust & Conversion Guardrails</h3>
            <p className={styles.subtitle}>Protected by VELOOP Rewards' verified automated settlement engine.</p>
          </div>

          {onOpenGlossary && (
            <button
              type="button"
              onClick={onOpenGlossary}
              className={styles.glossaryBtn}
            >
              <Info size={14} />
              <span>Full Glossary</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

        <div className={styles.pillarsGrid}>
          {trustPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className={styles.pillarCard}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={styles.pillarIconWrap}
                  style={{ color: p.color }}
                >
                  <Icon size={18} />
                </div>
                <div className={styles.pillarContent}>
                  <h4 className={styles.pillarTitle}>{p.title}</h4>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExchangeRules;
