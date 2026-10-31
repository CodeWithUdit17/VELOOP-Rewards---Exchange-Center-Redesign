import React from 'react';
import { Info } from 'lucide-react';
import styles from './GamerHowExchangeWorks.module.css';

const GamerHowExchangeWorks = ({ onInfoClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Earn Gems',
      desc: 'Complete eligible activities and earn Gems.',
      iconImg: '/assets/step1_earn.png',
    },
    {
      num: '02',
      title: 'Choose Conversion',
      desc: 'Select a conversion that suits your Gems balance.',
      iconImg: '/assets/step2_choose.png',
    },
    {
      num: '03',
      title: 'Review Exchange',
      desc: 'Review the details before confirming the conversion.',
      iconImg: '/assets/step3_review.png',
    },
    {
      num: '04',
      title: 'Confirm',
      desc: 'Confirm the exchange to convert your Gems.',
      iconImg: '/assets/step4_confirm.png',
    },
    {
      num: '05',
      title: 'Receive VEs',
      desc: 'VEs are added to your balance instantly.',
      iconImg: '/assets/step5_receive.png',
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
        {steps.map((s) => (
          <div key={s.num} className={styles.stepCol}>
            <div className={styles.nodeCircle}>
              <img
                src={s.iconImg}
                alt={`${s.num} ${s.title}`}
                className={styles.stepIconImg}
              />
            </div>
            <div className={styles.stepTitle}>
              {s.num} {s.title}
            </div>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamerHowExchangeWorks;

