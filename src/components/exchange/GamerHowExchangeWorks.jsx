import React from 'react';
import { Gift, Menu, Search, Check, Coins, Info } from 'lucide-react';
import styles from './GamerHowExchangeWorks.module.css';

const GamerHowExchangeWorks = ({ onInfoClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Earn Gems',
      desc: 'Complete eligible activities and earn Gems.',
      icon: Gift,
      styleClass: styles.nodePurple,
    },
    {
      num: '02',
      title: 'Choose Conversion',
      desc: 'Select a conversion that suits your Gems balance.',
      icon: Menu,
      styleClass: styles.nodeBlue,
    },
    {
      num: '03',
      title: 'Review Exchange',
      desc: 'Review the details before confirming the conversion.',
      icon: Search,
      styleClass: styles.nodeTeal,
    },
    {
      num: '04',
      title: 'Confirm',
      desc: 'Confirm the exchange to convert your Gems.',
      icon: Check,
      styleClass: styles.nodeGold,
    },
    {
      num: '05',
      title: 'Receive VEs',
      desc: 'VEs are added to your balance instantly.',
      icon: Coins,
      styleClass: styles.nodeGreen,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>How Exchange Works</h2>
        <Info
          size={13}
          className={styles.infoIcon}
          onClick={onInfoClick}
        />
      </div>

      <div className={styles.stepsTrack}>
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className={styles.stepCol}>
              <div className={`${styles.nodeCircle} ${s.styleClass}`}>
                <Icon size={16} />
              </div>
              <div className={styles.stepTitle}>
                {s.num} {s.title}
              </div>
              <p className={s.stepDesc}>{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamerHowExchangeWorks;
