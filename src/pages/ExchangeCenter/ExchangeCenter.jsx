import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import ExchangeHero from '../../components/exchange/ExchangeHero';
import BalanceOverview from '../../components/exchange/BalanceOverview';
import ExchangeCard from '../../components/exchange/ExchangeCard';
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
import { Info, Settings, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

const ExchangeCenter = () => {
  // User Profile and Balances
  const [userData, setUserData] = useState(initialUserData);
  const [availableGems, setAvailableGems] = useState(initialUserData.availableGems);
  const [availableVEs, setAvailableVEs] = useState(initialUserData.availableVEs);

  // Conversion options (4 cards + grand vault)
  const [options, setOptions] = useState(standardExchangeOptions);
  const [history, setHistory] = useState(initialRecentConversions);

  // Modals & Navigation
  const [activeTab, setActiveTab] = useState('exchange');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedConversion, setCompletedConversion] = useState(null);
  const [isEarnGemsOpen, setIsEarnGemsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Dev preview menu
  const [viewState, setViewState] = useState('normal');
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);

  // Handlers
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
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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

  return (
    <div className={styles.appWrapper}>
      {/* 1. Global Sticky Navbar */}
      <Navbar
        userData={userData}
        availableGems={availableGems}
        availableVEs={availableVEs}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNotifications={() => setIsGlossaryOpen(true)}
      />

      {/* 2. Main Page Container */}
      <main className={styles.mainContainer}>
        {/* Top Hero Section */}
        <ExchangeHero onOpenHowItWorks={handleScrollToHowItWorks} />

        {/* Balance Overview Cards */}
        <BalanceOverview
          gems={availableGems}
          ves={availableVEs}
          userData={userData}
          onEarnMoreGems={() => setIsEarnGemsOpen(true)}
        />

        {/* Available Conversions Section */}
        <section className={styles.conversionsSection} aria-label="Available Conversions">
          <div className={styles.conversionsHeaderRow}>
            <div>
              <div className={styles.sectionBadge}>
                <Sparkles size={12} />
                <span>REWARD TIERS</span>
              </div>
              <h2 className={styles.conversionsTitle}>Available Conversions</h2>
              <p className={styles.conversionsSub}>
                Select a multiplier tier to convert your Gems into instant spendable VEs.
              </p>
            </div>

            <button
              type="button"
              className={styles.infoBadgeBtn}
              onClick={() => setIsGlossaryOpen(true)}
            >
              <Info size={14} />
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

        {/* Mid Reward Incentive Banner (VIP Milestone) */}
        <MidRewardBanner
          onSelectExchange={handleSelectExchange}
          availableGems={availableGems}
          onEarnMoreGems={() => setIsEarnGemsOpen(true)}
        />

        {/* 5-Step Process Flow */}
        <div id="how-it-works-section">
          <HowExchangeWorks />
        </div>

        {/* Rules & Trust Guardrails */}
        <ExchangeRules onOpenGlossary={() => setIsGlossaryOpen(true)} />

        {/* Recent Conversions Transaction Ledger */}
        <ExchangeHistory history={history} />
      </main>

      {/* 3. Global Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img src="/assets/veloop_logo.png" alt="VEELOOP REWARDS" className={styles.footerLogoImg} />
            </div>
            <p className={styles.footerDesc}>
              The premium reward conversion platform. Convert activity credits into real-value VEs with guaranteed instant settlement.
            </p>
          </div>

          <div className={styles.footerTrust}>
            <div className={styles.trustItem}>
              <ShieldCheck size={16} className={styles.trustIcon} />
              <div>
                <strong>Encrypted Reward Ledger</strong>
                <span>Instant cryptographically verified conversions</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <HelpCircle size={16} className={styles.trustIcon} />
              <div>
                <strong>Need Support?</strong>
                <span>velooprewardsofficial@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottomBar}>
          <span>© 2026 VELOOP Rewards. All rights reserved. Virtual Reward Currency System.</span>
          <div className={styles.footerLinks}>
            <button type="button" onClick={() => setIsGlossaryOpen(true)} className={styles.footerLink}>
              Terms of Service
            </button>
            <button type="button" onClick={() => setIsGlossaryOpen(true)} className={styles.footerLink}>
              Platform Rules
            </button>
            <button type="button" onClick={() => setIsGlossaryOpen(true)} className={styles.footerLink}>
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

      {/* Evaluator & Demo Control Hub */}
      <DemoTools
        isOpen={isDevMenuOpen}
        onToggle={() => setIsDevMenuOpen(!isDevMenuOpen)}
        viewState={viewState}
        setViewState={setViewState}
        availableGems={availableGems}
        setAvailableGems={setAvailableGems}
        availableVEs={availableVEs}
        setAvailableVEs={setAvailableVEs}
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
