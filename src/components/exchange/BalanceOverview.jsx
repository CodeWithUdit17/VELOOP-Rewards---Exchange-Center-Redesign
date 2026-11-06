import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Plus, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
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
    <section className={styles.balanceContainer} aria-label="Current Balances and Exchange Conduit">
      <div className={styles.hudGrid}>
        {/* Pod 1: Available Gems */}
        <motion.div
          className={`${styles.hudPod} ${styles.gemsPod}`}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.podGlowPurple} />

          <div className={styles.podHeader}>
            <div className={styles.podLabelRow}>
              <span className={styles.podTag}>ACTIVITY STASH</span>
              <button
                type="button"
                className={styles.infoBtn}
                onClick={() => toggleTooltip('gems')}
                aria-label="What are Gems?"
              >
                <Info size={13} />
              </button>
            </div>
            <span className={styles.levelBadge}>
              LVL {userData?.level ? userData.level.replace(/[^0-9]/g, '') || '7' : '7'}
            </span>
          </div>

          <div className={styles.podMain}>
            <div className={styles.iconChamberPurple}>
              <img src="/assets/gem_purple.png" alt="Gems" className={styles.icon3d} />
            </div>
            <div className={styles.balanceData}>
              <div className={styles.valueRow}>
                <span className={styles.numericValue}>{Number(gems).toLocaleString()}</span>
                <span className={styles.unitGems}>GEMS</span>
              </div>
              <span className={styles.subtext}>Available for conversion</span>
            </div>
          </div>

          <div className={styles.podFooter}>
            <button
              type="button"
              className={styles.earnBtn}
              onClick={onEarnMoreGems}
            >
              <Plus size={14} />
              <span>Earn More Gems</span>
            </button>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {activeTooltip === 'gems' && (
              <motion.div
                className={styles.tooltipCard}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
              >
                <div className={styles.tooltipHeader}>
                  <span>{platformGlossary.gems.title}</span>
                  <button type="button" onClick={() => setActiveTooltip(null)}><X size={13} /></button>
                </div>
                <p>{platformGlossary.gems.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Center Conduit: Live Exchange Rate Engine */}
        <div className={styles.conduitBridge}>
          <div className={styles.conduitCore}>
            <div className={styles.conduitPulseRing} />
            <div className={styles.conduitIcon}>
              <TrendingUp size={18} />
            </div>
            <div className={styles.conduitInfo}>
              <span className={styles.conduitRateLabel}>LIVE REWARD RATIO</span>
              <div className={styles.conduitRateVal}>1 Gem ≈ 4.55 — 5.39 VEs</div>
              <span className={styles.conduitStatus}>
                <span className={styles.liveGreenDot} />
                Guaranteed Fixed Multipliers
              </span>
            </div>
          </div>
        </div>

        {/* Pod 2: Available VEs */}
        <motion.div
          className={`${styles.hudPod} ${styles.vesPod}`}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.podGlowGold} />

          <div className={styles.podHeader}>
            <div className={styles.podLabelRow}>
              <span className={styles.podTagGold}>SPENDABLE TREASURY</span>
              <button
                type="button"
                className={styles.infoBtn}
                onClick={() => toggleTooltip('ves')}
                aria-label="What are VEs?"
              >
                <Info size={13} />
              </button>
            </div>
            <span className={styles.verifiedPill}>
              <CheckCircle2 size={12} />
              <span>Verified Ledger</span>
            </span>
          </div>

          <div className={styles.podMain}>
            <div className={styles.iconChamberGold}>
              <img src="/assets/coin_ve.png" alt="VEs" className={styles.icon3d} />
            </div>
            <div className={styles.balanceData}>
              <div className={styles.valueRow}>
                <span className={`${styles.numericValue} ${styles.valueGold}`}>{Number(ves).toLocaleString()}</span>
                <span className={styles.unitVEs}>VEs</span>
              </div>
              <span className={styles.subtext}>Redeemable for catalog perks</span>
            </div>
          </div>

          <div className={styles.podFooter}>
            <div className={styles.redemptionReadyTag}>
              <Zap size={13} style={{ color: '#fbbf24' }} />
              <span>Instant Catalog Ready</span>
            </div>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {activeTooltip === 'ves' && (
              <motion.div
                className={styles.tooltipCard}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
              >
                <div className={styles.tooltipHeader}>
                  <span>{platformGlossary.ves.title}</span>
                  <button type="button" onClick={() => setActiveTooltip(null)}><X size={13} /></button>
                </div>
                <p>{platformGlossary.ves.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BalanceOverview;
