import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Lock,
  TrendingUp,
  ShieldCheck,
  Zap,
  Gift,
  CheckCircle2,
} from 'lucide-react';
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
    <div className={styles.promoContainer} aria-label="Promotional and VIP Milestone Section">
      {/* 1. Main VIP Milestone Vault Card */}
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

            <h3 className={styles.title}>Grand Milestone Reward Vault</h3>

            <div className={styles.conversionEquation}>
              <div className={styles.eqSide}>
                <GemIcon size={14} />
                <span>500 Gems</span>
              </div>
              <span className={styles.eqArrow}>➔</span>
              <div className={styles.eqSide}>
                <VECoinIcon size={14} />
                <span style={{ color: '#fbbf24' }}>+2,450 VEs</span>
              </div>
              <span className={styles.bonusTag}>+1,950 VEs Bonus</span>
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
              <span>CLAIM VAULT</span>
              <ArrowRight size={14} />
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
                <Lock size={12} />
                <span>Need {500 - availableGems} More Gems</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* 2. Platform Value Props / Promo Strip: Rewards Benefits, Security & Instant Credit */}
      <div className={styles.propsStrip}>
        <div className={styles.propCard}>
          <div className={styles.propIconWrap} style={{ color: '#fbbf24' }}>
            <Gift size={16} />
          </div>
          <div className={styles.propText}>
            <strong>Rewards Benefits</strong>
            <span>Unlock up to 5.39x conversion yield + VIP catalog perks</span>
          </div>
        </div>

        <div className={styles.propDivider} />

        <div className={styles.propCard}>
          <div className={styles.propIconWrap} style={{ color: '#c084fc' }}>
            <ShieldCheck size={16} />
          </div>
          <div className={styles.propText}>
            <strong>Audited Security</strong>
            <span>Cryptographically verified ledger with anti-double-spend locks</span>
          </div>
        </div>

        <div className={styles.propDivider} />

        <div className={styles.propCard}>
          <div className={styles.propIconWrap} style={{ color: '#34d399' }}>
            <Zap size={16} />
          </div>
          <div className={styles.propText}>
            <strong>Instant Credit</strong>
            <span>0s settlement &bull; Direct wallet reflection &bull; Zero fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidRewardBanner;
