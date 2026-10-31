import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import styles from './ExchangeErrorState.module.css';

const ExchangeEmptyState = ({ onRefresh }) => {
  return (
    <div className={styles.container} style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div
        className={styles.iconCircle}
        style={{
          background: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.25)',
          color: '#818cf8',
        }}
      >
        <Compass size={28} />
      </div>
      <h3 className={styles.title}>No conversions available right now.</h3>
      <p className={styles.description}>
        New reward conversion opportunities will appear here when available.
        Check back soon or complete eligible platform tasks to prepare for the next tier drop.
      </p>
      {onRefresh && (
        <button type="button" className={styles.retryBtn} onClick={onRefresh}>
          <Sparkles size={15} style={{ color: '#fbbf24' }} />
          <span>Refresh Opportunities</span>
        </button>
      )}
    </div>
  );
};

export default ExchangeEmptyState;
