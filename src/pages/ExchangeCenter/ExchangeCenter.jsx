import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import RightSidebar from '../../components/layout/RightSidebar';
import ExchangeHero from '../../components/exchange/ExchangeHero';
import BalanceOverview from '../../components/exchange/BalanceOverview';
import ExchangeCard from '../../components/exchange/ExchangeCard';
import ExchangeForm from '../../components/exchange/ExchangeForm';
import MidRewardBanner from '../../components/exchange/MidRewardBanner';
import HowExchangeWorks from '../../components/exchange/HowExchangeWorks';
import ExchangeRules from '../../components/exchange/ExchangeRules';
import ExchangeHistory from '../../components/exchange/ExchangeHistory';

import ExchangeModal from '../../components/exchange/ExchangeModal';
import ConversionSuccess from '../../components/exchange/ConversionSuccess';
import ExchangeLoader from '../../components/exchange/ExchangeLoader';
import ExchangeErrorState from '../../components/exchange/ExchangeErrorState';
import ExchangeEmptyState from '../../components/exchange/ExchangeEmptyState';
import EarnMoreGemsModal from '../../components/exchange/EarnMoreGemsModal';
import GlossaryModal from '../../components/exchange/GlossaryModal';
import DemoTools from '../../components/common/DemoTools';

import {
  initialUserData,
  standardExchangeOptions,
  initialRecentConversions,
} from '../../data/exchangeData';

import styles from './ExchangeCenter.module.css';
import {
  Info,
  Sparkles,
  Zap,
  Calculator,
  ShieldCheck,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';

const ExchangeCenter = () => {
  // User Profile and Balances
  const [userData, setUserData] = useState(initialUserData);
  const [availableGems, setAvailableGems] = useState(initialUserData.availableGems);
  const [availableVEs, setAvailableVEs] = useState(initialUserData.availableVEs);
  const [availableSVEs, setAvailableSVEs] = useState(initialUserData.availableSVEs || 1250);

  // Conversion options (4 cards + grand vault)
  const [options, setOptions] = useState(standardExchangeOptions);
  const [history, setHistory] = useState(initialRecentConversions);

  // Navigation & Drawer
  const [activeTab, setActiveTab] = useState('exchange');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals & Flows
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedConversion, setCompletedConversion] = useState(null);
  const [isEarnGemsOpen, setIsEarnGemsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Dev preview menu
  const [viewState, setViewState] = useState('normal');
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);

  // Conversion Handler
  const handleSelectExchange = (option) => {
    setSelectedOption(option);
  };

  const handleConfirmConversion = (option) => {
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      const updatedGems = availableGems - option.requiredGems;
      const updatedVEs = availableVEs + option.receiveVEs;
      const txRef = 'VLP-' + Math.floor(10000 + Math.random() * 90000);

      setAvailableGems(updatedGems);
      setAvailableVEs(updatedVEs);

      const newHistoryItem = {
        id: 'conv-' + Date.now(),
        date:
          new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) +
          ' • ' +
          new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        dateRelative: 'Just now',
        requiredGems: option.requiredGems,
        receiveVEs: option.receiveVEs,
        tierName: option.tierName,
        status: 'completed',
        txRef: txRef,
      };

      setHistory((prev) => [newHistoryItem, ...prev]);

      setCompletedConversion({
        requiredGems: option.requiredGems,
        receiveVEs: option.receiveVEs,
        tierName: option.tierName,
        txRef: txRef,
      });

      setIsProcessing(false);
      setSelectedOption(null);
    }, 850);
  };

  const handleAddGems = (amount) => {
    setAvailableGems((prev) => prev + amount);
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRules = () => {
    const el = document.getElementById('exchange-rules-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsGlossaryOpen(true);
    }
  };

  return (
    <div className={styles.appWrapper}>
      {/* Mobile Top Navigation Header (visible on < 1150px) */}
      <header className={styles.mobileHeader}>
        <div className={styles.mobileHeaderLeft}>
          <button
            type="button"
            className={styles.menuToggleBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <img src="/assets/veloop_logo.png" alt="VELOOP REWARDS" className={styles.mobileLogoImg} />
        </div>

        <div className={styles.mobileHeaderRight}>
          <div className={styles.headerBalPill}>
            <img src="/assets/gem_purple.png" alt="Gems" className={styles.balIcon} />
            <span>{Number(availableGems).toLocaleString()}</span>
          </div>
          <div className={styles.headerBalPill}>
            <img src="/assets/coin_ve.png" alt="VEs" className={styles.balIcon} />
            <span>{Number(availableVEs).toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawerOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.mobileDrawerContent} onClick={(e) => e.stopPropagation()}>
            <Sidebar
              userData={userData}
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              onExploreGems={() => {
                setIsEarnGemsOpen(true);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Dashboard Layout (Reference 3-Column Structure) */}
      <div className={styles.dashboardContainer}>
        {/* 1. LEFT SIDEBAR (Sticky on desktop, exactly matches reference) */}
        <aside className={styles.leftSidebarWrapper}>
          <Sidebar
            userData={userData}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onExploreGems={() => setIsEarnGemsOpen(true)}
          />
        </aside>

        {/* 2. CENTER MAIN COLUMN */}
        <main className={styles.centerMainColumn}>
          {/* Top Hero Section */}
          <ExchangeHero onOpenHowItWorks={handleScrollToHowItWorks} />

          {/* Wallet Balance Panel (Available Gems & Available VEs) */}
          <BalanceOverview
            gems={availableGems}
            ves={availableVEs}
            sves={availableSVEs}
            userData={userData}
            onEarnMoreGems={() => setIsEarnGemsOpen(true)}
          />

          {/* Gems-to-VEs Exchange Calculator Engine (with MAX & Preview) */}
          <ExchangeForm
            availableGems={availableGems}
            availableVEs={availableVEs}
            onConfirmConversion={handleSelectExchange}
            onEarnMoreGems={() => setIsEarnGemsOpen(true)}
          />

          {/* Available Conversions: Compact 4 Tier Cards */}
          <section className={styles.conversionsSection} aria-label="Available Conversions">
            <div className={styles.conversionsHeaderRow}>
              <div>
                <div className={styles.sectionBadge}>
                  <Sparkles size={11} />
                  <span>PREDEFINED PACKAGES</span>
                </div>
                <h2 className={styles.conversionsTitle}>Available Conversions</h2>
                <p className={styles.conversionsSub}>
                  Select a multiplier package to convert your Gems into spendable VEs instantly.
                </p>
              </div>

              <button
                type="button"
                className={styles.infoBadgeBtn}
                onClick={() => setIsGlossaryOpen(true)}
              >
                <Info size={13} />
                <span>Conversion Rules</span>
              </button>
            </div>

            {/* View States */}
            {viewState === 'loading' && (
              <ExchangeLoader
                title="Preparing your reward conversions..."
                subtitle="Fetching verified conversion ratios and real-time wallet allocations."
              />
            )}

            {viewState === 'error' && (
              <ExchangeErrorState
                title="Unable to load exchange options."
                description="Could not synchronize with the reward ledger. Please try again."
                onRetry={() => setViewState('normal')}
              />
            )}

            {viewState === 'empty' && (
              <ExchangeEmptyState onRefresh={() => setViewState('normal')} />
            )}

            {viewState === 'normal' && (
              <div className={styles.cardsGrid}>
                {options.map((opt) => (
                  <ExchangeCard
                    key={opt.id}
                    option={opt}
                    availableGems={availableGems}
                    onSelectExchange={handleSelectExchange}
                    onEarnMoreGems={() => setIsEarnGemsOpen(true)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Promotional Section: Rewards Benefits, Security & Instant Credit */}
          <MidRewardBanner
            onSelectExchange={handleSelectExchange}
            availableGems={availableGems}
            onEarnMoreGems={() => setIsEarnGemsOpen(true)}
          />

          {/* 4-Step Process Flow: How Exchange Works (Choose, Review, Confirm, Receive) */}
          <div id="how-it-works-section">
            <HowExchangeWorks onOpenInfo={() => setIsGlossaryOpen(true)} />
          </div>

          {/* Mobile/Tablet Fallback: Rules & Recent History (rendered below main flow when right column stacks) */}
          <div className={styles.mobileOnlyWidgets}>
            <div id="exchange-rules-section">
              <ExchangeRules onOpenGlossary={() => setIsGlossaryOpen(true)} />
            </div>
            <ExchangeHistory history={history} />
          </div>
        </main>

        {/* 3. RIGHT SIDEBAR COLUMN (Top balances, What are these?, Recent Conversions, Exchange Rules) */}
        <aside className={styles.rightSidebarWrapper}>
          <RightSidebar
            gems={availableGems}
            ves={availableVEs}
            history={history}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onOpenRules={handleScrollToRules}
          />
        </aside>
      </div>

      {/* Global Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img
                src="/assets/veloop_logo.png"
                alt="VEELOOP REWARDS"
                className={styles.footerLogoImg}
              />
            </div>
            <p className={styles.footerDesc}>
              The premium reward conversion platform. Convert activity credits into real-value VEs with guaranteed instant settlement.
            </p>
          </div>

          <div className={styles.footerTrust}>
            <div className={styles.trustItem}>
              <ShieldCheck size={15} className={styles.trustIcon} />
              <div>
                <strong>Encrypted Reward Ledger</strong>
                <span>Instant cryptographically verified conversions</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <HelpCircle size={15} className={styles.trustIcon} />
              <div>
                <strong>Need Support?</strong>
                <span>velooprewardsofficial@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottomBar}>
          <span>&copy; 2026 VELOOP Rewards. All rights reserved. Virtual Reward Currency System.</span>
          <div className={styles.footerLinks}>
            <button
              type="button"
              onClick={() => setIsGlossaryOpen(true)}
              className={styles.footerLink}
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setIsGlossaryOpen(true)}
              className={styles.footerLink}
            >
              Platform Rules
            </button>
            <button
              type="button"
              onClick={() => setIsGlossaryOpen(true)}
              className={styles.footerLink}
            >
              Glossary
            </button>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      <ExchangeModal
        isOpen={!!selectedOption}
        option={selectedOption}
        currentGems={availableGems}
        currentVEs={availableVEs}
        isProcessing={isProcessing}
        onConfirm={handleConfirmConversion}
        onClose={() => setSelectedOption(null)}
      />

      {/* Conversion Success Notification with Confetti */}
      <ConversionSuccess
        isOpen={!!completedConversion}
        conversionData={completedConversion}
        onContinue={() => setCompletedConversion(null)}
      />

      {/* Earn More Gems Drawer/Modal */}
      <EarnMoreGemsModal
        isOpen={isEarnGemsOpen}
        onClose={() => setIsEarnGemsOpen(false)}
        onAddGems={handleAddGems}
      />

      {/* Platform Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Evaluator & Demo Control Hub (Docked in bottom-left away from content) */}
      <DemoTools
        isOpen={isDevMenuOpen}
        onToggle={() => setIsDevMenuOpen(!isDevMenuOpen)}
        viewState={viewState}
        setViewState={setViewState}
        availableGems={availableGems}
        setAvailableGems={setAvailableGems}
        availableVEs={availableVEs}
        setAvailableVEs={setAvailableVEs}
        availableSVEs={availableSVEs}
        setAvailableSVEs={setAvailableSVEs}
        onTriggerConfirmModal={() => {
          setSelectedOption(options[0]);
          setIsDevMenuOpen(false);
        }}
        onTriggerSuccessModal={() => {
          setCompletedConversion({
            requiredGems: 28,
            receiveVEs: 151,
            tierName: 'Daily Gem Conversion',
            txRef: 'VLP-' + Math.floor(10000 + Math.random() * 90000),
          });
          setIsDevMenuOpen(false);
        }}
        onOpenEarnGems={() => {
          setIsEarnGemsOpen(true);
          setIsDevMenuOpen(false);
        }}
        onOpenGlossary={() => {
          setIsGlossaryOpen(true);
          setIsDevMenuOpen(false);
        }}
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
};

export default ExchangeCenter;
