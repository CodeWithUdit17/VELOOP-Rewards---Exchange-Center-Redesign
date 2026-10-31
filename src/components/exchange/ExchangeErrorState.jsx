import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import styles from './ExchangeErrorState.module.css';

const ExchangeErrorState = ({
  title = "Unable to load exchange options.",
  description = "Please try again. If the issue persists, your reward balances are unaffected.",
  onRetry,
}) => {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.iconCircle}>
        <AlertTriangle size={28} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          <RefreshCw size={15} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ExchangeErrorState;

