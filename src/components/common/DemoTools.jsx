import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  X,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ShieldCheck,
  History,
  Wallet,
  Play,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  initialUserData,
  standardExchangeOptions,
  initialRecentConversions,
} from '../../data/exchangeData';
import styles from './DemoTools.module.css';

const DemoTools = ({
  isOpen,
  onToggle,
  viewState = 'normal',
  setViewState,
  availableGems = 420,
  setAvailableGems,
  availableVEs = 3850,
  setAvailableVEs,
  onTriggerConfirmModal,
  onTriggerSuccessModal,
  onOpenEarnGems,
  onOpenGlossary,
  history = [],
  setHistory,
}) => {
  const [activeTab, setActiveTab] = useState('states');

  // Confetti trigger
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#fbbf24', '#34d399', '#38bdf8'],
      });
    } catch (e) {
      // ignore if unavailable
    }
  };

  // Reset all to clean defaults
  const handleResetAll = () => {
    setViewState('normal');
    setAvailableGems(initialUserData.availableGems);
    setAvailableVEs(initialUserData.availableVEs);
    setHistory(initialRecentConversions);
    triggerConfetti();
  };

  // Add dummy history item
  const handleAddMockTx = () => {
    const txRef = 'VLP-' + Math.floor(10000 + Math.random() * 90000);
    const newTx = {
      id: 'conv-' + Date.now(),
      date: 'Just now',
      dateRelative: 'Today',
      requiredGems: 28,
      receiveVEs: 151,
      tierName: 'Daily Gem Conversion',
      status: 'completed',
      txRef: txRef,
    };
    setHistory((prev) => [newTx, ...prev]);
  };

  return (
    <div className={styles.dockWrapper} aria-label="Reviewer Demo Control Hub">
      {/* Floating Trigger Pill */}
      <motion.button
        type="button"
        className={`${styles.triggerPill} ${isOpen ? styles.triggerPillActive : ''}`}
        onClick={onToggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={isOpen}
      >
        <span className={styles.pulseOrb} />
        <Sliders size={13} />
        <span className={styles.pillText}>Demo Tools</span>
        {viewState !== 'normal' && (
          <span className={styles.stateNotice}>{viewState.toUpperCase()}</span>
        )}
      </motion.button>

      {/* Expanded Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.panelCard}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Panel Header */}
            <div className={styles.panelHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIconWrap}>
                  <Sliders size={14} />
                </div>
                <div>
                  <h4 className={styles.panelTitle}>Demo & Review Hub</h4>
                  <span className={styles.panelSubtitle}>Test UI states, balances & edge flows</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onToggle}
                aria-label="Close demo tools"
              >
                <X size={15} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsRow}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'states' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('states')}
              >
                <EyeTabIcon active={activeTab === 'states'} />
                <span>UI States</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'wallet' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('wallet')}
              >
                <Wallet size={12} />
                <span>Balances</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'flows' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('flows')}
              >
                <Sparkles size={12} />
                <span>Modals</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className={styles.tabContent}>
              {/* TAB 1: UI View States */}
              {activeTab === 'states' && (
                <div className={styles.statesSection}>
                  <span className={styles.sectionLabel}>SIMULATE SCREEN STATE</span>
                  <div className={styles.stateBtnGrid}>
                    <button
                      type="button"
                      className={`${styles.stateBtn} ${viewState === 'normal' ? styles.stateBtnActive : ''}`}
                      onClick={() => setViewState('normal')}
                    >
                      <CheckCircle2 size={13} className={styles.btnIconGreen} />
                      <div>
                        <strong>Normal</strong>
                        <span>Full Active UI</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`${styles.stateBtn} ${viewState === 'loading' ? styles.stateBtnActive : ''}`}
                      onClick={() => setViewState('loading')}
                    >
                      <span className={styles.miniSpinner} />
                      <div>
                        <strong>Loading</strong>
                        <span>3D Spinner State</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`${styles.stateBtn} ${viewState === 'error' ? styles.stateBtnActive : ''}`}
                      onClick={() => setViewState('error')}
                    >
                      <AlertTriangle size={13} className={styles.btnIconRed} />
                      <div>
                        <strong>Error</strong>
                        <span>Ledger Sync Fail</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`${styles.stateBtn} ${viewState === 'empty' ? styles.stateBtnActive : ''}`}
                      onClick={() => setViewState('empty')}
                    >
                      <Layers size={13} className={styles.btnIconPurple} />
                      <div>
                        <strong>Empty</strong>
                        <span>No Tiers Available</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Wallet & Balance Simulator */}
              {activeTab === 'wallet' && (
                <div className={styles.walletSection}>
                  <div className={styles.currentBalanceBar}>
                    <div className={styles.balItem}>
                      <span>GEMS</span>
                      <strong style={{ color: '#c084fc' }}>{Number(availableGems).toLocaleString()}</strong>
                    </div>
                    <div className={styles.balDivider} />
                    <div className={styles.balItem}>
                      <span>VEs</span>
                      <strong style={{ color: '#fbbf24' }}>{Number(availableVEs).toLocaleString()}</strong>
                    </div>
                  </div>

                  <span className={styles.sectionLabel}>BALANCE PRESETS</span>
                  <div className={styles.presetRow}>
                    <button
                      type="button"
                      className={`${styles.presetBtn} ${availableGems === 420 ? styles.presetActive : ''}`}
                      onClick={() => setAvailableGems(420)}
                    >
                      Default (420)
                    </button>
                    <button
                      type="button"
                      className={`${styles.presetBtn} ${availableGems === 12 ? styles.presetActive : ''}`}
                      onClick={() => setAvailableGems(12)}
                    >
                      Low Stash (12)
                    </button>
                    <button
                      type="button"
                      className={`${styles.presetBtn} ${availableGems === 1250 ? styles.presetActive : ''}`}
                      onClick={() => setAvailableGems(1250)}
                    >
                      VIP Whale (1.2K)
                    </button>
                  </div>

                  <span className={styles.sectionLabel}>QUICK TOP-UP</span>
                  <div className={styles.adjustRow}>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setAvailableGems((prev) => prev + 50)}
                    >
                      <Plus size={11} /> +50 Gems
                    </button>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setAvailableGems((prev) => prev + 250)}
                    >
                      <Plus size={11} /> +250 Gems
                    </button>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setAvailableVEs((prev) => prev + 500)}
                    >
                      <Plus size={11} /> +500 VEs
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Modals & Flow Triggers */}
              {activeTab === 'flows' && (
                <div className={styles.flowsSection}>
                  <span className={styles.sectionLabel}>TEST OVERLAYS & MODALS</span>
                  <div className={styles.flowsGrid}>
                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={onTriggerConfirmModal}
                    >
                      <Play size={12} />
                      <span>Confirm Modal</span>
                    </button>

                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={onTriggerSuccessModal}
                    >
                      <CheckCircle2 size={12} style={{ color: '#34d399' }} />
                      <span>Success Receipt</span>
                    </button>

                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={onOpenEarnGems}
                    >
                      <Sparkles size={12} style={{ color: '#c084fc' }} />
                      <span>Earn Gems Modal</span>
                    </button>

                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={onOpenGlossary}
                    >
                      <HelpCircle size={12} style={{ color: '#38bdf8' }} />
                      <span>Platform Rules</span>
                    </button>
                  </div>

                  <span className={styles.sectionLabel}>LEDGER & SPECIAL EFFECTS</span>
                  <div className={styles.flowsGrid}>
                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={handleAddMockTx}
                    >
                      <History size={12} />
                      <span>+ Add Mock Tx</span>
                    </button>

                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={() => setHistory([])}
                    >
                      <X size={12} style={{ color: '#f43f5e' }} />
                      <span>Clear History</span>
                    </button>

                    <button
                      type="button"
                      className={styles.flowActionBtn}
                      onClick={triggerConfetti}
                    >
                      <span>🎉 Fire Confetti</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer: One-Click Reset */}
            <div className={styles.panelFooter}>
              <button
                type="button"
                className={styles.resetAllBtn}
                onClick={handleResetAll}
                title="Reset all states, balances, and history to defaults"
              >
                <RotateCcw size={12} />
                <span>Reset All to Default</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EyeTabIcon = ({ active }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default DemoTools;
