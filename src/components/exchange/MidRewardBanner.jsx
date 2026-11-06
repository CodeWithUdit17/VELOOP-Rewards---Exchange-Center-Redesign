import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, TrendingUp } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import { milestoneVaultOption } from '../../data/exchangeData';
import styles from './MidRewardBanner.module.css';

const MidRewardBanner = ({
  onSelectExchange,
  availableGems = 420,
  onEarnMoreGems,
}) => {
  const isAffordable = availableGems >= milestoneVaultOption.requiredGems;
  const progressPercent = Math.min(
    100,
    Math.round((availableGems / milestoneVaultOption.requiredGems) * 100)
  );

  return (
    <motion.div
      className={styles.banner}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.ambientGlow} />

      <div className={styles.leftGroup}>
        <div className={styles.visualTrophyBox}>
          <img
            src="/assets/crown.png"
            alt="Royal Crown"
            className={styles.crownImg}
          />
          <img
            src="/assets/chest_rewards.png"
            alt="Grand Chest"
            className={styles.chestImg}
          />
        </div>

        <div className={styles.textGroup}>
          <div className={styles.badgeRow}>
            <span className={styles.milestoneBadge}>
              <Sparkles size={11} />
              VIP GRAND MILESTONE
            </span>
            <span className={styles.yieldTag}>
              <TrendingUp size={11} />
              4.90x MAX YIELD
            </span>
          </div>

          <h3 className={styles.title}>Grand Celestial Milestone Vault</h3>

          <div className={styles.conversionEquation}>
            <div className={styles.eqSide}>
              <GemIcon size={16} />
              <strong>500 Gems</strong>
            </div>
            <span className={styles.eqArrow}>➔</span>
            <div className={styles.eqSide}>
              <VECoinIcon size={16} />
              <strong style={{ color: '#fbbf24' }}>+2,450 VEs</strong>
            </div>
            <span className={styles.bonusTag}>+1,950 VEs Net Bonus</span>
          </div>
        </div>
      </div>

      <div className={styles.actionGroup}>
        {isAffordable ? (
          <button
            type="button"
            className={styles.claimBtn}
            onClick={() => onSelectExchange && onSelectExchange(milestoneVaultOption)}
          >
            <span>CLAIM GRAND VAULT</span>
            <ArrowRight size={15} />
          </button>
        ) : (
          <div className={styles.lockedBox}>
            <div className={styles.lockedProgress}>
              <span>{availableGems}/500 Gems ({progressPercent}%)</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              className={styles.earnMoreBtn}
              onClick={onEarnMoreGems}
            >
              <Lock size={13} />
              <span>Earn 80 More Gems</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MidRewardBanner;
