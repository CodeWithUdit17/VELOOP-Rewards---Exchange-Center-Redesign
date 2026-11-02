import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  Zap,
  RefreshCw,
  Users,
  History,
  Bell,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({
  userData = {},
  availableGems = 420,
  availableVEs = 3850,
  activeTab = 'exchange',
  onSelectTab,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'exchange', label: 'Exchange Center', icon: RefreshCw },
    { id: 'earn', label: 'Level Up & Earn', icon: Zap },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'history', label: 'History', icon: History },
  ];

  const handleNavClick = (id) => {
    if (onSelectTab) onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <div className={styles.brandGroup} onClick={() => handleNavClick('exchange')} role="button" tabIndex={0}>
          <img
            src="/assets/veloop_logo.png"
            alt="VEELOOP REWARDS"
            className={styles.brandLogoImg}
          />
          <span className={styles.brandBadge}>
            <Sparkles size={11} />
            Exchange Center
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {isActive && <span className={styles.activePillDot} />}
              </button>
            );
          })}
        </nav>

        {/* Right Controls & Balances */}
        <div className={styles.rightControls}>
          {/* Gems Quick Pill */}
          <div className={`${styles.quickBalancePill} ${styles.gemsPill}`} title="Available Reward Gems">
            <img src="/assets/gem_purple.png" alt="Gems" className={styles.pillIcon} />
            <span className={styles.pillValueGems}>{Number(availableGems).toLocaleString()}</span>
            <span className={styles.pillUnit}>Gems</span>
          </div>

          {/* VEs Quick Pill */}
          <div className={`${styles.quickBalancePill} ${styles.vesPill}`} title="Available VE Credits">
            <img src="/assets/coin_ve.png" alt="VEs" className={styles.pillIcon} />
            <span className={styles.pillValueVEs}>{Number(availableVEs).toLocaleString()}</span>
            <span className={styles.pillUnit}>VEs</span>
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            className={styles.bellBtn}
            onClick={onOpenNotifications}
            aria-label="View notifications"
          >
            <Bell size={16} />
            <span className={styles.bellDot} />
          </button>

          {/* User Profile */}
          <div className={styles.userProfileBtn} title={`Logged in as ${userData.name || 'Hasan'} (${userData.level || 'Level 7'})`}>
            <div className={styles.avatarWrapper}>
              <img
                src="/assets/user_avatar.png"
                alt="Avatar"
                className={styles.avatarImg}
              />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userData.name || 'Hasan'}</span>
              <span className={styles.userLevelBadge}>{userData.level || 'Lvl 7'}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileNavList}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

