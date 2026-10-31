import React from 'react';
import { Crown } from 'lucide-react';
import styles from './MidRewardBanner.module.css';

const MidRewardBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.leftGroup}>
        <Crown size={20} className={styles.crownIcon} />
        <span className={styles.text}>
          The more Gems you have, the better the rewards you unlock! Keep earning and keep growing.
        </span>
      </div>

      <div className={styles.rightGroup}>
        <img
          src="/assets/chest_rewards.png"
          alt="Reward Chest"
          className={styles.chestImg}
        />
      </div>
    </div>
  );
};

export default MidRewardBanner;
