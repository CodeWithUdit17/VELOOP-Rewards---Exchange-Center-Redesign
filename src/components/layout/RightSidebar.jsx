import React from 'react';
import { Bell, Info, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './RightSidebar.module.css';

const RightSidebar = ({
  gems = 420,
  ves = 3850,
  history = [],
  onOpenGlossary,
  onOpenRules,
}) => {
  const rulesList = [
    'Only eligible Gems can be exchanged.',
    'Exchange rates are predefined by VELOOP Rewards.',
    'Available conversions may vary.',
    'A successful conversion cannot be duplicated.',
    'Your balance is updated after successful conversion.',
    'Platform rules apply.',
  ];

  return (
    <aside className={styles.rightSidebar} aria-label="Quick Balances and Ledger">
      {/* 1. Top Balance Indicators Bar */}
      <div className={styles.topBalanceBar}>
        <div className={styles.balancePill}>
          <img src="/assets/gem_purple.png" alt="Gems" className={styles.pillIcon} />
          <span>{Number(gems).toLocaleString()} Gems</span>
          <Info size={11} className={styles.pillInfo} onClick={() => onOpenGlossary && onOpenGlossary('gems')} />
        </div>

        <div className={styles.balancePill}>
          <img src="/assets/coin_ve.png" alt="VEs" className={styles.pillIcon} />
          <span>{Number(ves).toLocaleString()} VEs</span>
          <Info size={11} className={styles.pillInfo} onClick={() => onOpenGlossary && onOpenGlossary('ves')} />
        </div>

        <button type="button" className={styles.bellBtn} aria-label="Notifications">
          <Bell size={14} />
          <div className={styles.bellDot} />
        </button>
      </div>

      {/* 2. "What are these?" Widget */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <h2 className={styles.widgetTitle}>What are these?</h2>
        </div>

        {/* Gems */}
        <div className={styles.glossaryItem}>
          <img src="/assets/gem_purple.png" alt="Gems" className={styles.glossaryIcon} />
          <div className={styles.glossaryInfo}>
            <span className={styles.glossaryTerm}>
              Gems <Info size={10} style={{ color: '#5A6678' }} />
            </span>
            <p className={styles.glossaryDesc}>
              Gems are reward credits earned through eligible activities on VELOOP Rewards.
            </p>
          </div>
        </div>

        {/* VEs */}
        <div className={styles.glossaryItem}>
          <img src="/assets/coin_ve.png" alt="VEs" className={styles.glossaryIcon} />
          <div className={styles.glossaryInfo}>
            <span className={styles.glossaryTerm}>
              VEs <Info size={10} style={{ color: '#5A6678' }} />
            </span>
            <p className={styles.glossaryDesc}>
              VEs are VELOOP Rewards' virtual reward currency and may be used for eligible redemption options according to platform rules.
            </p>
          </div>
        </div>

        <button type="button" className={styles.viewAllRulesLink} onClick={onOpenRules}>
          <span>View All Rules</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* 3. "Recent Conversions" Widget */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <h2 className={styles.widgetTitle}>Recent Conversions</h2>
          <span className={styles.widgetLink} onClick={onOpenRules}>View All</span>
        </div>

        <div className={styles.conversionsList}>
          {history.slice(0, 5).map((item, idx) => (
            <div key={item.id || idx} className={styles.conversionRow}>
              <div className={styles.convLeft}>
                <img
                  src={idx === 1 ? '/assets/card2_blue.png' : idx === 2 ? '/assets/card3_green.png' : '/assets/gem_purple.png'}
                  alt="icon"
                  className={styles.convGemIcon}
                  style={{ width: 14, height: 14, objectFit: 'contain' }}
                />
                <div className={styles.convTextCol}>
                  <span className={styles.convRateText}>
                    {item.requiredGems} Gems → {item.receiveVEs} VEs
                  </span>
                  <span className={styles.convDateText}>{item.date}</span>
                </div>
              </div>

              <div>
                {item.status === 'completed' ? (
                  <span className={styles.statusCompleted}>Completed ✓</span>
                ) : (
                  <span className={styles.statusFailed}>Failed</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="button" className={styles.viewAllRulesLink} onClick={onOpenRules}>
          <span>View Full History</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* 4. "Exchange Rules" Checklist Widget */}
      <div className={`${styles.widgetCard} ${styles.rulesContainer}`}>
        <div className={styles.widgetHeader}>
          <h2 className={styles.widgetTitle}>
            Exchange Rules <Info size={11} style={{ color: '#5A6678' }} />
          </h2>
        </div>

        <div className={styles.rulesList}>
          {rulesList.map((r, i) => (
            <div key={i} className={styles.ruleRow}>
              <CheckCircle2 size={12} className={styles.checkBullet} />
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* 3D Glowing Purple Shield Asset on Bottom Right */}
        <div className={styles.shieldGraphicWrapper} aria-hidden="true">
          <img
            src="/assets/shield_rules.png"
            alt="Shield"
            className={styles.shieldImg}
          />
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
