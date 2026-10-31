import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  Zap,
  RefreshCw,
  Users,
  History,
  LifeBuoy,
} from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './Navbar.module.css';

const Navbar = ({
  userData = {},
  availableGems = 420,
  availableVEs = 3850,
  activeTab = 'exchange',
  onSelectTab,
}) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <div className={styles.brandGroup}>
          <div className={styles.brandLogo}>V</div>
          <div className={styles.brandName}>
            <span>VELOP</span>
            <span className={styles.brandTagline}>Rewards Vault</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('dashboard')}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'wallet' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('wallet')}
          >
            <Wallet size={15} />
            <span>Wallet</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'exchange' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('exchange')}
          >
            <RefreshCw size={15} />
            <span>Exchange Center</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'earn' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('earn')}
          >
            <Zap size={15} />
            <span>Level Up & Earn</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'referrals' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('referrals')}
          >
            <Users size={15} />
            <span>Referrals</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'history' ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab('history')}
          >
            <History size={15} />
            <span>History</span>
          </button>
        </nav>

        {/* Right Controls & Fast Balances */}
        <div className={styles.rightControls}>
          <div className={styles.quickBalancePill} title="Quick Gem Balance">
            <GemIcon size={16} />
            <span style={{ color: '#c084fc' }}>{availableGems.toLocaleString()}</span>
          </div>

          <div className={styles.quickBalancePill} title="Quick VE Balance">
            <VECoinIcon size={16} />
            <span style={{ color: '#fbbf24' }}>{availableVEs.toLocaleString()}</span>
          </div>

          <div className={styles.userProfileBtn} title={`Logged in as ${userData.name || 'Hassan'}`}>
            <div className={styles.avatarCircle}>
              {(userData.name || 'H')[0].toUpperCase()}
            </div>
            <span className={styles.userName}>{userData.name || 'Hassan'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
