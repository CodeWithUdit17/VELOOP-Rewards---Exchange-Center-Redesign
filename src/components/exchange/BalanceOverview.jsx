import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, ArrowUpRight, Wallet, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
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
    <section className={styles.balanceContainer} aria-label="Current Balances and Exchange Rates">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Wallet size={16} className={styles.titleIcon} />
          <span>Your Reward Balances</span>
        </div>

        <div className={styles.liveRateTag}>
          <TrendingUp size={13} className={styles.rateIcon} />
          <span>Guaranteed Yield Rate: 1 Gem = 4.55 — 5.39 VEs</span>
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
          <div className={styles.cardGlowPurple} />

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

            <div className={styles.iconBoxPurple}>
              <img src="/assets/gem_purple.png" alt="Gems" className={styles.balance3dIcon} />
            </div>
          </div>

          <div className={styles.valueRow}>
            <span className={styles.balanceValue}>{Number(gems).toLocaleString()}</span>
            <span className={styles.balanceUnitGems}>Gems</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.subText}>Earned through platform quests & achievements</span>
            <button
              type="button"
              className={styles.actionLinkPurple}
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
          <div className={styles.cardGlowGold} />

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

            <div className={styles.iconBoxGold}>
              <img src="/assets/coin_ve.png" alt="VEs" className={styles.balance3dIcon} />
            </div>
          </div>

          <div className={styles.valueRow}>
            <span className={styles.balanceValue}>{Number(ves).toLocaleString()}</span>
            <span className={styles.balanceUnitVEs}>VEs</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.subText}>Virtual rewards ready for catalog redemptions</span>
            <div className={styles.statusVerified}>
              <CheckCircle size={13} />
              <span>Verified Balance</span>
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

