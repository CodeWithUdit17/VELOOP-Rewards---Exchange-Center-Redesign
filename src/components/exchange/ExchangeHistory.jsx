import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './ExchangeHistory.module.css';

const ExchangeHistory = ({ history = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredHistory = history.filter((item) => {
    if (filter === 'completed') return item.status === 'completed';
    if (filter === 'failed') return item.status === 'failed';
    return true;
  });

  const renderStatus = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className={`${styles.statusTag} ${styles.statusCompleted}`}>
            <CheckCircle2 size={13} />
            <span>Completed</span>
          </span>
        );
      case 'pending':
      case 'processing':
        return (
          <span className={`${styles.statusTag} ${styles.statusPending}`}>
            <Clock size={13} />
            <span>Processing</span>
          </span>
        );
      case 'failed':
      default:
        return (
          <span className={`${styles.statusTag} ${styles.statusFailed}`}>
            <XCircle size={13} />
            <span>Failed</span>
          </span>
        );
    }
  };

  return (
    <section className={styles.container} aria-label="Recent Conversions History">
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBadge}>
            <History size={18} />
          </div>
          <div>
            <h2 className={styles.title}>Recent Conversions</h2>
          </div>
        </div>

        <div className={styles.filterRow}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({history.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'completed' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'failed' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
        </div>
      </div>

      <div className={styles.historyList}>
        {filteredHistory.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            className={styles.historyItem}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
          >
            {/* Date column */}
            <div className={styles.dateCol}>
              <span className={styles.dateRelative}>{item.dateRelative || 'Recent'}</span>
              <span className={styles.dateExact}>{item.date}</span>
            </div>

            {/* Conversion details column */}
            <div className={styles.conversionCol}>
              <span className={styles.flowGems}>
                <GemIcon size={16} />
                <span>{item.requiredGems} Gems</span>
              </span>

              <span className={styles.flowArrow}>
                <ArrowRight size={14} />
              </span>

              <span className={styles.flowVEs}>
                <VECoinIcon size={16} />
                <span>{item.receiveVEs} VEs</span>
              </span>
            </div>

            {/* Status column */}
            <div className={styles.statusCol}>
              {renderStatus(item.status)}
              {item.txRef && <span className={styles.txId}>{item.txRef}</span>}
            </div>
          </motion.div>
        ))}

        {filteredHistory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            No conversions found for this filter.
          </div>
        )}
      </div>
    </section>
  );
};

export default ExchangeHistory;
