import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  Gift,
  Sparkles,
  RefreshCw,
  Users,
  History,
  HelpCircle,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = ({
  activeTab = 'exchange',
  onSelectTab,
  onExploreGems,
  userData = {},
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'earn', label: 'Level Up & Earn', icon: Sparkles },
    { id: 'exchange', label: 'Exchange Center', icon: RefreshCw },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'history', label: 'History', icon: History },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <aside className={styles.sidebar} aria-label="Main Navigation Sidebar">
      <div className={styles.topSection}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img
            src="/assets/veloop_logo.png"
            alt="VEELOOP REWARDS"
            className={styles.logoImg}
          />
        </div>

        {/* Navigation Items */}
        <nav className={styles.navList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => onSelectTab && onSelectTab(item.id)}
              >
                <div className={styles.navItemLeft}>
                  <Icon size={16} className={styles.navIcon} />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className={styles.activeDot} />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Promo Area */}
      <div className={styles.bottomSection}>
        {/* User Profile */}
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            <img
              src="/assets/user_avatar.png"
              alt="Hasan Level 7"
              className={styles.avatarImg}
            />
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.greetingRow}>Hello,</span>
            <div className={styles.userNameRow}>
              <span className={styles.userName}>{userData.name || 'Hasan'}</span>
              <span className={styles.levelBadge}>{userData.level || 'Level 7'}</span>
            </div>
            <span className={styles.veloopId}>Veloop ID: {userData.veloopId || '78459'}</span>
          </div>
        </div>

        {/* Earn More Gems Promo Card */}
        <div className={styles.earnPromoCard}>
          <div className={styles.earnPromoTitle}>Earn More Gems!</div>
          <p className={styles.earnPromoDesc}>
            Complete tasks, refer friends and unlock more ways to earn Gems.
          </p>

          <div className={styles.crystalsImgWrapper}>
            <img
              src="/assets/earn_crystals.png"
              alt="Earn Gems"
              className={styles.crystalsImg}
            />
          </div>

          <button
            type="button"
            className={styles.exploreBtn}
            onClick={onExploreGems}
          >
            Explore Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
