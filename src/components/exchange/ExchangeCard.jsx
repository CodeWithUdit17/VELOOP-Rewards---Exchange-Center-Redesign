import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './ExchangeCard.module.css';

const ExchangeCard = ({
  option,
  availableGems = 420,
  onSelectExchange,
  onEarnMoreGems,
}) => {
  const {
    id,
    tierName,
    requiredGems,
    receiveVEs,
    multiplier,
    badge,
    tagline,
    visualType,
  } = option;

  const isAffordable = availableGems >= requiredGems;
  const missingGems = Math.max(0, requiredGems - availableGems);
  const progressPercent = Math.min(100, Math.round((availableGems / requiredGems) * 100));
  const netGain = receiveVEs - requiredGems;

  // Determine theme and 3D visual asset
  const getThemeConfig = () => {
    if (id === 'exchange-01' || visualType === 'gem-cluster') {
      return {
        cardClass: styles.tierCyan,
        imgPath: '/assets/card1_purple.png',
        rarity: 'STARTER',
        glowColor: 'rgba(56, 189, 248, 0.25)',
      };
    }
    if (id === 'exchange-02' || visualType === 'reward-chest') {
      return {
        cardClass: styles.tierPurple,
        imgPath: '/assets/card2_blue.png',
        rarity: 'EXPLORER',
        glowColor: 'rgba(129, 140, 248, 0.25)',
      };
    }
    if (id === 'exchange-03' || visualType === 'vault') {
      return {
        cardClass: styles.tierGreen,
        imgPath: '/assets/card3_green.png',
        rarity: 'ELITE',
        glowColor: 'rgba(16, 185, 129, 0.25)',
      };
    }
    if (id === 'exchange-04' || visualType === 'crystal-crown') {
      return {
        cardClass: styles.tierGold,
        imgPath: '/assets/card4_gold.png',
        rarity: 'LEGENDARY',
        glowColor: 'rgba(245, 158, 11, 0.3)',
      };
    }
    return {
      cardClass: styles.tierMythic,
      imgPath: '/assets/chest_rewards.png',
      rarity: 'MYTHIC',
      glowColor: 'rgba(192, 132, 252, 0.35)',
    };
  };

  const theme = getThemeConfig();

  return (
    <motion.div
      className={`${styles.card} ${theme.cardClass} ${!isAffordable ? styles.cardLocked : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      layout
    >
      <div className={styles.ambientGlow} style={{ background: theme.glowColor }} />

      {/* Top Header: Badge & Multiplier */}
      <div className={styles.cardHeader}>
        <div className={styles.rarityBadge}>
          <Sparkles size={11} />
          <span>{badge || theme.rarity}</span>
        </div>
        <div className={styles.multiplierPill} title="Conversion Value Yield">
          <TrendingUp size={12} />
          <span>{multiplier}</span>
        </div>
      </div>

      {/* 3D Floating Asset Chamber */}
      <div className={styles.assetChamber}>
        <div className={styles.pedestalLight} />
        <img
          src={theme.imgPath}
          alt={`${tierName} reward`}
          className={styles.assetImg}
        />
      </div>

      {/* Tier Title */}
      <div className={styles.titleArea}>
        <h3 className={styles.tierTitle}>{tierName}</h3>
        <span className={styles.tagline}>{tagline}</span>
      </div>

      {/* High-Impact Conversion Matrix */}
      <div className={styles.conversionMatrix}>
        <div className={styles.conversionSide}>
          <span className={styles.sideLabel}>PAY GEMS</span>
          <div className={styles.sideValueRow}>
            <GemIcon size={16} />
            <span className={styles.gemsNum}>{requiredGems}</span>
          </div>
        </div>

        <div className={styles.conduitArrowWrap}>
          <div className={styles.arrowCircle}>
            <ArrowRight size={14} />
          </div>
          <span className={styles.gainText}>+{netGain}</span>
        </div>

        <div className={styles.conversionSide}>
          <span className={styles.sideLabel}>RECEIVE VEs</span>
          <div className={styles.sideValueRow}>
            <VECoinIcon size={16} />
            <span className={styles.vesNum}>+{receiveVEs}</span>
          </div>
        </div>
      </div>

      {/* Status / Affordability Meter */}
      <div className={styles.statusArea}>
        {isAffordable ? (
          <div className={styles.readyBadge}>
            <CheckCircle2 size={13} />
            <span>Unlocked • Ready to Convert</span>
          </div>
        ) : (
          <div className={styles.insufficientBox}>
            <div className={styles.insufficientHeader}>
              <span>Need {missingGems} more Gems</span>
              <span>{progressPercent}%</span>
            </div>
            <div className={styles.meterTrack}>
              <div
                className={styles.meterFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gaming CTA Button */}
      {isAffordable ? (
        <button
          type="button"
          className={styles.convertBtn}
          onClick={() => onSelectExchange(option)}
          aria-label={`Convert ${requiredGems} Gems into ${receiveVEs} VEs`}
        >
          <span>CONVERT REWARDS</span>
          <ArrowRight size={15} className={styles.btnArrow} />
        </button>
      ) : (
        <button
          type="button"
          className={`${styles.convertBtn} ${styles.earnMoreBtn}`}
          onClick={() => onEarnMoreGems(option)}
          aria-label={`Earn ${missingGems} more Gems`}
        >
          <Lock size={14} />
          <span>EARN GEMS TO UNLOCK</span>
        </button>
      )}
    </motion.div>
  );
};

export default ExchangeCard;
