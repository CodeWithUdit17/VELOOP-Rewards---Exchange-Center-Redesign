import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  X,
  Plus,
  TrendingUp,
  CheckCircle2,
  Zap,
  Crown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { platformGlossary } from '../../data/exchangeData';
import styles from './BalanceOverview.module.css';

const BalanceOverview = ({
  gems = 420,
  ves = 3850,
  sves = 1250,
  userData = {},
  onEarnMoreGems,
}) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const toggleTooltip = (key) => {
    setActiveTooltip((prev) => (prev === key ? null : key));
  };

  return (
    <section className={styles.balanceContainer} aria-label="Current Balances and Exchange Conduit">
      {/* Top Multiplier & Rate Banner Strip */}
      <div className={styles.rateSummaryBar}>
        <div className={styles.rateSummaryLeft}>
          <div className={styles.liveIndicator}>
            <span className={styles.livePulseDot} />
            <span className={styles.liveText}>CONVERSION METRICS</span>
          </div>
          <div className={styles.rateChips}>
            <div className={styles.rateChip}>
              <span className={styles.rateChipLabel}>Gems Ratio:</span>
              <strong className={styles.rateChipValPurple}>1 Gem = 5.39 VEs</strong>
            </div>
            <div className={styles.chipDivider} />
            <div className={styles.rateChip}>
              <span className={styles.rateChipLabel}>SVEs Ratio:</span>
              <strong className={styles.rateChipValCyan}>1 SVE = 1.25 VEs (+25% VIP Yield)</strong>
            </div>
            <div className={styles.chipDivider} />
            <div className={styles.rateChip}>
              <span className={styles.rateChipLabel}>Slippage / Fee:</span>
              <strong className={styles.rateChipValGreen}>0% (Guaranteed)</strong>
            </div>
          </div>
        </div>

        <div className={styles.rateSummaryRight}>
          <span className={styles.instantSettlementBadge}>
            <Zap size={12} />
            <span>Instant Settlement (0s)</span>
          </span>
        </div>
      </div>

      {/* 3-Card Balanced HUD Grid */}
      <div className={styles.hudGrid}>
        {/* Card 1: Available Gems */}
        <motion.div
          className={`${styles.hudPod} ${styles.gemsPod}`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
        >
          <div className={styles.podGlowPurple} />

          <div className={styles.podHeader}>
            <div className={styles.podLabelRow}>
              <span className={styles.podTag}>ACTIVITY CREDITS</span>
              <button
                type="button"
                className={styles.infoBtn}
                onClick={() => toggleTooltip('gems')}
                aria-label="What are Gems?"
                title="Gems information"
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
              <span className={styles.conversionRateText}>
                Power: &asymp; <strong>{(gems * 5.39).toFixed(0)} VEs</strong> potential
              </span>
            </div>
          </div>

          <div className={styles.podFooter}>
            <button
              type="button"
              className={styles.earnBtn}
              onClick={onEarnMoreGems}
            >
              <Plus size={13} />
              <span>Earn More Gems</span>
            </button>
            <span className={styles.subtextPill}>Daily Tasks Active</span>
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

        {/* Card 2: Spendable VEs (Main Reward Treasury) */}
        <motion.div
          className={`${styles.hudPod} ${styles.vesPod}`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
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
                title="VEs information"
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
              <span className={styles.conversionRateTextGold}>
                Value: <strong>1 VE = 1.00 Platform Credit</strong>
              </span>
            </div>
          </div>

          <div className={styles.podFooter}>
            <div className={styles.redemptionReadyTag}>
              <Zap size={13} style={{ color: '#fbbf24' }} />
              <span>Instant Catalog Ready</span>
            </div>
            <span className={styles.subtextPillGold}>Zero Fees</span>
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

        {/* Card 3: Staked SVEs (Special VEs / VIP Stash) */}
        <motion.div
          className={`${styles.hudPod} ${styles.svesPod}`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
        >
          <div className={styles.podGlowCyan} />

          <div className={styles.podHeader}>
            <div className={styles.podLabelRow}>
              <span className={styles.podTagCyan}>STAKED SVEs</span>
              <button
                type="button"
                className={styles.infoBtn}
                onClick={() => toggleTooltip('sves')}
                aria-label="What are SVEs?"
                title="SVEs information"
              >
                <Info size={13} />
              </button>
            </div>
            <span className={styles.vipBadge}>
              <Crown size={12} />
              <span>VIP Tier 2</span>
            </span>
          </div>

          <div className={styles.podMain}>
            <div className={styles.iconChamberCyan}>
              <img src="/assets/crown.png" alt="SVEs" className={styles.icon3d} />
            </div>
            <div className={styles.balanceData}>
              <div className={styles.valueRow}>
                <span className={`${styles.numericValue} ${styles.valueCyan}`}>{Number(sves).toLocaleString()}</span>
                <span className={styles.unitSVEs}>SVEs</span>
              </div>
              <span className={styles.conversionRateTextCyan}>
                Yield: <strong>1 SVE = 1.25 VEs (+25% Boost)</strong>
              </span>
            </div>
          </div>

          <div className={styles.podFooter}>
            <div className={styles.stakingYieldTag}>
              <Sparkles size={12} style={{ color: '#38bdf8' }} />
              <span>Active Staking Yield</span>
            </div>
            <span className={styles.subtextPillCyan}>Auto-Compound</span>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {activeTooltip === 'sves' && (
              <motion.div
                className={styles.tooltipCard}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
              >
                <div className={styles.tooltipHeader}>
                  <span>{platformGlossary.sves?.title || 'What are SVEs?'}</span>
                  <button type="button" onClick={() => setActiveTooltip(null)}><X size={13} /></button>
                </div>
                <p>{platformGlossary.sves?.description || 'Special Virtual Entitlements for loyalty staking.'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BalanceOverview;
