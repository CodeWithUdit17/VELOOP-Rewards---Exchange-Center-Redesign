import React from 'react';
import { ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { exchangeRules } from '../../data/exchangeData';
import styles from './ExchangeRules.module.css';

const ExchangeRules = ({ onOpenGlossary }) => {
  return (
    <section className={styles.container} aria-label="Exchange Rules and Terms">
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBadge}>
            <ShieldAlert size={18} />
          </div>
          <h2 className={styles.title}>Exchange Rules & Guardrails</h2>
        </div>

        {onOpenGlossary && (
          <button
            type="button"
            onClick={onOpenGlossary}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-blue)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
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
    </section>
  );
};

export default ExchangeRules;

