import React from 'react';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { exchangeRules } from '../../data/exchangeData';
import styles from './ExchangeRules.module.css';

const ExchangeRules = ({ onOpenGlossary }) => {
  return (
    <section className={styles.container} aria-label="Exchange Rules and Terms">
      <div className={styles.contentWrap}>
        <div className={styles.leftCol}>
          <div className={styles.headerRow}>
            <div className={styles.titleGroup}>
              <div className={styles.iconBadge}>
                <ShieldCheck size={18} />
              </div>
              <h2 className={styles.title}>Exchange Rules & Trust Guardrails</h2>
            </div>

            {onOpenGlossary && (
              <button
                type="button"
                onClick={onOpenGlossary}
                className={styles.glossaryBtn}
              >
                <Info size={14} />
                <span>Platform Glossary</span>
              </button>
            )}
          </div>

          <div className={styles.rulesGrid}>
            {exchangeRules.map((rule, idx) => (
              <div key={idx} className={styles.ruleItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <p className={styles.ruleText}>{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightShieldBox} aria-hidden="true">
          <img
            src="/assets/shield_rules.png"
            alt="Security Shield"
            className={styles.shieldImg}
          />
        </div>
      </div>
    </section>
  );
};

export default ExchangeRules;

