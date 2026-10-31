import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, Sparkles, TrendingUp, Lock } from 'lucide-react';
import { GemIcon, VECoinIcon, VaultChestIcon, CrownRewardIcon } from '../common/RewardIcons';
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
    badgeType = 'primary',
    tagline,
    visualType,
    colorAccent,
  } = option;

  const isAffordable = availableGems >= requiredGems;
  const missingGems = Math.max(0, requiredGems - availableGems);
  const progressPercent = Math.min(100, Math.round((availableGems / requiredGems) * 100));

  // Determine which visual illustration to render
  const renderVisual = () => {
    switch (visualType) {
      case 'gem-cluster':
        return (
          <div
            className={styles.visualHalo}
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
              border: '1px solid rgba(192, 132, 252, 0.25)',
            }}
          >
            <GemIcon size={44} />
          </div>
        );
      case 'reward-chest':
        return (
          <div
            className={styles.visualHalo}
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
              border: '1px solid rgba(129, 140, 248, 0.25)',
            }}
          >
            <VaultChestIcon size={42} />
          </div>
        );
      case 'crystal-crown':
        return (
          <div
            className={styles.visualHalo}
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, transparent 70%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            <CrownRewardIcon size={44} />
          </div>
        );
      case 'vault':
      case 'mega-vault':
      default:
        return (
          <div
            className={styles.visualHalo}
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            <VECoinIcon size={44} />
          </div>
        );
    }
  };

  // Badge CSS modifier
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'accent':
        return styles.badgeAccent;
      case 'success':
        return styles.badgeSuccess;
      case 'warning':
        return styles.badgeWarning;
      case 'special':
        return styles.badgeSpecial;
      case 'primary':
      default:
        return styles.badgePopular;
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${!isAffordable ? styles.cardInsufficient : ''}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      layout
    >
      {/* Top Header: Badge & Multiplier */}
      <div className={styles.cardHeader}>
        <span className={`${styles.tierBadge} ${getBadgeClass()}`}>
          {badge || 'Tier Conversion'}
        </span>
        <span className={styles.multiplierTag} title="Conversion Value Yield">
          <TrendingUp size={12} />
          {multiplier || 'Reward Value'}
        </span>
      </div>

      {/* Visual Reward Illustration */}
      <div className={styles.visualContainer} aria-hidden="true">
        {renderVisual()}
      </div>

      {/* Tier Title and Friendly Explanation */}
      <div className={styles.titleGroup}>
        <h3 className={styles.tierTitle}>{tierName}</h3>
        <p className={styles.tierTagline}>{tagline}</p>
      </div>

      {/* Conversion Flow Box */}
      <div className={styles.conversionBox}>
        {/* Required Gems Column */}
        <div className={styles.conversionUnit}>
          <span className={styles.unitAmount}>{requiredGems}</span>
          <span className={styles.unitLabel}>
            <GemIcon size={14} />
            Gems
          </span>
        </div>

        {/* Directional Pathway (Reward Conversion, Not Swap) */}
        <div className={styles.conversionPathway}>
          <div className={styles.pathwayArrow}>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Incoming VEs Column */}
        <div className={styles.conversionUnit}>
          <span className={styles.unitAmount} style={{ color: '#fbbf24' }}>
            +{receiveVEs}
          </span>
          <span className={styles.unitLabel}>
            <VECoinIcon size={14} />
            VEs
          </span>
        </div>
      </div>

      {/* Insufficient State Warning (Section 15) */}
      {!isAffordable && (
        <div className={styles.insufficientNotice} role="alert">
          <AlertCircle size={15} style={{ color: '#f43f5e', flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <p className={styles.insufficientText}>
              You need <strong>{missingGems} more Gems</strong> to unlock this conversion.
            </p>
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progressPercent}%` }}
                title={`${progressPercent}% progress`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action CTA */}
      {isAffordable ? (
        <button
          type="button"
          className={styles.convertButton}
          onClick={() => onSelectExchange(option)}
          aria-label={`Convert ${requiredGems} Gems into ${receiveVEs} VEs`}
        >
          <Sparkles size={16} />
          <span>Convert Rewards</span>
        </button>
      ) : (
        <button
          type="button"
          className={`${styles.convertButton} ${styles.earnMoreButton}`}
          onClick={() => onEarnMoreGems(option)}
          aria-label={`Earn ${missingGems} more Gems`}
        >
          <Lock size={15} style={{ opacity: 0.8 }} />
          <span>Earn More Gems</span>
        </button>
      )}
    </motion.div>
  );
};

export default ExchangeCard;

