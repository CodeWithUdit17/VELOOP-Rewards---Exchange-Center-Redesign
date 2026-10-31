import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, ArrowUpRight, Wallet, UserCheck, Sparkles } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import { platformGlossary } from '../../data/exchangeData';
import styles from './BalanceOverview.module.css';

const BalanceOverview = ({
  gems = 420,
  ves = 3850,
  userData = {},
  onEarnMoreGems,
}) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const toggleTooltip = (key) => {
    setActiveTooltip((prev) => (prev === key ? null : key));
  };

  return (
    <section className={styles.balanceContainer} aria-label="Current Balances">
      {/* Header bar with user profile indicators */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Wallet size={16} />
          <span>Reward Balances</span>
        </div>

        <div className={styles.userBadgeRow}>
          <div className={styles.userTag}>
            <UserCheck size={13} style={{ color: '#38bdf8' }} />
            <span>{userData.name || 'Hassan'}</span>
            <span className={styles.userLevel}>({userData.level || 'Lvl 7'})</span>
          </div>
          <div className={styles.userTag} style={{ display: 'none' }}>
            <span>ID: {userData.veloopId || '784591'}</span>
          </div>
        </div>
      </div>

      {/* Dual Balance Cards: Gems and VEs */}
      <div className={styles.cardsGrid}>
        {/* Gems Card */}
        <motion.div
          className={`${styles.balanceCard} ${styles.gemsCard}`}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.cardTopRow}>
            <div className={styles.labelGroup}>
              <span className={styles.cardLabel}>Available Gems</span>
              <button
                type="button"
                className={styles.infoButton}
                onClick={() => toggleTooltip('gems')}
                aria-label="Information about Gems"
                title="What are Gems?"
              >
                <Info size={14} />
              </button>
            </div>

            <div className={`${styles.iconWrapper} ${styles.gemsIconBg}`}>
              <GemIcon size={32} />
            </div>
          </div>

          <div className={styles.valueRow}>
            <span className={styles.balanceValue}>{Number(gems).toLocaleString()}</span>
            <span className={styles.balanceUnit}>Gems</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.subText}>Earned through platform tasks</span>
            <button
              type="button"
              className={styles.actionLink}
              onClick={onEarnMoreGems}
            >
              <span>Earn More</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Interactive Info Popover */}
          <AnimatePresence>
            {activeTooltip === 'gems' && (
              <motion.div
                className={styles.popoverCard}
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <div className={styles.popoverHeader}>
                  <span className={styles.popoverTitle}>{platformGlossary.gems.title}</span>
                  <button
                    type="button"
                    className={styles.popoverClose}
                    onClick={() => setActiveTooltip(null)}
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className={styles.popoverDesc}>{platformGlossary.gems.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* VEs Card */}
        <motion.div
          className={`${styles.balanceCard} ${styles.vesCard}`}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.cardTopRow}>
            <div className={styles.labelGroup}>
              <span className={styles.cardLabel}>Available VEs</span>
              <button
                type="button"
                className={styles.infoButton}
                onClick={() => toggleTooltip('ves')}
                aria-label="Information about VEs"
                title="What are VEs?"
              >
                <Info size={14} />
              </button>
            </div>

            <div className={`${styles.iconWrapper} ${styles.vesIconBg}`}>
              <VECoinIcon size={32} />
            </div>
          </div>

          <div className={styles.valueRow}>
            <span className={styles.balanceValue}>{Number(ves).toLocaleString()}</span>
            <span className={styles.balanceUnit}>VEs</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.subText}>Virtual currency for redemptions</span>
            <div className={styles.subText} style={{ color: '#fbbf24', fontWeight: 600 }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Active Balance
            </div>
          </div>

          {/* Interactive Info Popover */}
          <AnimatePresence>
            {activeTooltip === 'ves' && (
              <motion.div
                className={styles.popoverCard}
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <div className={styles.popoverHeader}>
                  <span className={styles.popoverTitle}>{platformGlossary.ves.title}</span>
                  <button
                    type="button"
                    className={styles.popoverClose}
                    onClick={() => setActiveTooltip(null)}
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className={styles.popoverDesc}>{platformGlossary.ves.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BalanceOverview;
