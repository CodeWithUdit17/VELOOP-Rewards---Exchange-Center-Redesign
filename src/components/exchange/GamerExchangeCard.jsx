import React from 'react';
import styles from './GamerExchangeCard.module.css';

const GamerExchangeCard = ({
  option,
  availableGems = 420,
  onSelectExchange,
}) => {
  const {
    id,
    tierName,
    requiredGems,
    receiveVEs,
    badge,
    description,
    visualType,
  } = option;

  // Visual image asset matching
  let visualImg = '/assets/card1_purple.png';
  let cardClass = styles.cardPurple;
  let btnClass = styles.btnPurple;

  if (id === 'exchange-02' || visualType === 'reward-chest') {
    visualImg = '/assets/card2_blue.png';
    cardClass = styles.cardBlue;
    btnClass = styles.btnBlue;
  } else if (id === 'exchange-03' || visualType === 'vault') {
    visualImg = '/assets/card3_green.png';
    cardClass = styles.cardGreen;
    btnClass = styles.btnGreen;
  } else if (id === 'exchange-04' || visualType === 'crystal-crown') {
    visualImg = '/assets/card4_gold.png';
    cardClass = styles.cardGold;
    btnClass = styles.btnGold;
  }

  return (
    <div className={`${styles.card} ${cardClass}`}>
      {/* Badge */}
      {badge && (
        <div className={styles.badgeWrapper}>
          <span
            className={
              id === 'exchange-02'
                ? styles.badgePopularBlue
                : styles.badgePopularPurple
            }
          >
            {badge}
          </span>
        </div>
      )}

      {/* 3D Gems -> VE Coin Visual */}
      <div className={styles.visualArea}>
        <img
          src={visualImg}
          alt={`${tierName} visual`}
          className={styles.visualImg}
        />
      </div>

      {/* Title */}
      <div className={styles.tierTitle}>{tierName}</div>

      {/* Conversion Rate */}
      <div className={styles.rateBox}>
        <div className={styles.gemsAmount}>{requiredGems} Gems</div>
        <div className={styles.arrowDown}>↓</div>
        <div className={styles.vesAmount}>{receiveVEs} VEs</div>
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Action Button */}
      <button
        type="button"
        className={`${styles.convertBtn} ${btnClass}`}
        onClick={() => onSelectExchange(option)}
      >
        Convert Rewards
      </button>
    </div>
  );
};

export default GamerExchangeCard;
