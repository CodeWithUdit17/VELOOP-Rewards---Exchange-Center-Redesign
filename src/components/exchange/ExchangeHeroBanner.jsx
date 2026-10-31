import React from 'react';
import { Info } from 'lucide-react';
import styles from './ExchangeHeroBanner.module.css';

const ExchangeHeroBanner = ({
  gems = 420,
  ves = 3850,
  onInfoClick,
}) => {
  return (
    <section className={styles.heroBanner} aria-label="Exchange Center Hero">
      <div className={styles.bannerContent}>
        {/* Left: Headline & Split Balance Cards */}
        <div className={styles.leftCol}>
          <h1 className={styles.headline}>Exchange Center</h1>
          <div className={styles.subhead}>Turn Your Earned Gems into VEs</div>
          <p className={styles.bodyText}>
            Convert your eligible Gems into VEs and continue your reward journey.
          </p>

          {/* Split Cards */}
          <div className={styles.splitCardsGrid}>
            {/* Available Gems Card */}
            <div className={styles.balanceMiniCard}>
              <div className={styles.balanceLeft}>
                <div className={styles.balanceLabelRow}>
                  <span>Available Gems</span>
                  <Info
                    size={12}
                    className={styles.infoIcon}
                    onClick={() => onInfoClick && onInfoClick('gems')}
                  />
                </div>
                <span className={styles.balanceNumber}>{Number(gems).toLocaleString()}</span>
                <span className={styles.balanceSub}>Your Reward Gems</span>
              </div>

              <div className={styles.balanceIconBox}>
                <img
                  src="/assets/gem_purple.png"
                  alt="Gems"
                  className={styles.tokenImg}
                />
              </div>
            </div>

            {/* Available VEs Card */}
            <div className={styles.balanceMiniCard}>
              <div className={styles.balanceLeft}>
                <div className={styles.balanceLabelRow}>
                  <span>Available VEs</span>
                  <Info
                    size={12}
                    className={styles.infoIcon}
                    onClick={() => onInfoClick && onInfoClick('ves')}
                  />
                </div>
                <span className={styles.balanceNumber}>{Number(ves).toLocaleString()}</span>
                <span className={styles.balanceSub}>Your VE Balance</span>
              </div>

              <div className={styles.balanceIconBox}>
                <img
                  src="/assets/coin_ve.png"
                  alt="VEs"
                  className={styles.coinImg}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Holographic Portal & Coin Illustration */}
        <div className={styles.rightCol} aria-hidden="true">
          <div className={styles.portalImgWrapper}>
            <img
              src="/assets/hero_portal_full.png"
              alt="Exchange Center Portal"
              className={styles.portalIllustration}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangeHeroBanner;

