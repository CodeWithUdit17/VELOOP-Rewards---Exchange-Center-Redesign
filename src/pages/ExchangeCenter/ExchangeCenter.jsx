import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import RightSidebar from '../../components/layout/RightSidebar';
import ExchangeHeroBanner from '../../components/exchange/ExchangeHeroBanner';
import GamerExchangeCard from '../../components/exchange/GamerExchangeCard';
import MidRewardBanner from '../../components/exchange/MidRewardBanner';
import GamerHowExchangeWorks from '../../components/exchange/GamerHowExchangeWorks';

import ExchangeModal from '../../components/exchange/ExchangeModal';
import ConversionSuccess from '../../components/exchange/ConversionSuccess';
import ExchangeLoader from '../../components/exchange/ExchangeLoader';
import ExchangeErrorState from '../../components/exchange/ExchangeErrorState';
import ExchangeEmptyState from '../../components/exchange/ExchangeEmptyState';
import EarnMoreGemsModal from '../../components/exchange/EarnMoreGemsModal';
import GlossaryModal from '../../components/exchange/GlossaryModal';

import {
  initialUserData,
  standardExchangeOptions,
  initialRecentConversions,
} from '../../data/exchangeData';

import styles from './ExchangeCenter.module.css';
import { Info, Settings } from 'lucide-react';

const ExchangeCenter = () => {
  // User Profile and Balances
  const [userData, setUserData] = useState(initialUserData);
  const [availableGems, setAvailableGems] = useState(initialUserData.availableGems);
  const [availableVEs, setAvailableVEs] = useState(initialUserData.availableVEs);

  // Conversion options (4 cards)
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

  return (
    <div className={styles.dashboardContainer}>
      {/* 1. Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onExploreGems={() => setIsEarnGemsOpen(true)}
        userData={userData}
      />

      {/* Main Layout: Center Column + Right Sidebar */}
      <div className={styles.mainLayout}>
        {/* 2. Center Content Column */}
        <main className={styles.centerColumn}>
          {/* Top-Center Hero Banner */}
          <ExchangeHeroBanner
            gems={availableGems}
            ves={availableVEs}
            onInfoClick={() => setIsGlossaryOpen(true)}
          />

          {/* Available Conversions Section */}
          <section aria-label="Available Conversions">
            <div className={styles.conversionsHeaderRow}>
              <h2 className={styles.conversionsTitle}>Available Conversions</h2>
              <Info
                size={13}
                className={styles.infoIcon}
                onClick={() => setIsGlossaryOpen(true)}
              />
            </div>

            {/* View State Rendering (Normal / Loader / Error / Empty) */}
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
                  <GamerExchangeCard
                    key={opt.id}
                    option={opt}
                    availableGems={availableGems}
                    onSelectExchange={handleSelectExchange}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Mid Banner: "The more Gems you have..." */}
          <MidRewardBanner />

          {/* Bottom Flow: "How Exchange Works" */}
          <GamerHowExchangeWorks onInfoClick={() => setIsGlossaryOpen(true)} />
        </main>

        {/* 3. Right-Hand Sidebar */}
        <RightSidebar
          gems={availableGems}
          ves={availableVEs}
          history={history}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenRules={() => setIsGlossaryOpen(true)}
        />
      </div>

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

      {/* Discreet Evaluator Tool Menu (Bottom-Right) */}
      <aside className={styles.devDock} aria-label="Developer testing tools">
        <button
          type="button"
          className={styles.devDockBtn}
          onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
        >
          <Settings size={12} />
          <span>Demo Tools</span>
        </button>

        {isDevMenuOpen && (
          <div className={styles.devDockMenu}>
            <button type="button" className={styles.devItem} onClick={() => { setViewState('normal'); setIsDevMenuOpen(false); }}>
              Normal Mode
            </button>
            <button type="button" className={styles.devItem} onClick={() => { setViewState('loading'); setIsDevMenuOpen(false); }}>
              Test Loader
            </button>
            <button type="button" className={styles.devItem} onClick={() => { setViewState('error'); setIsDevMenuOpen(false); }}>
              Test Error State
            </button>
            <button type="button" className={styles.devItem} onClick={() => { setViewState('empty'); setIsDevMenuOpen(false); }}>
              Test Empty State
            </button>
            <button
              type="button"
              className={styles.devItem}
              onClick={() => {
                setAvailableGems(availableGems === 12 ? 420 : 12);
                setIsDevMenuOpen(false);
              }}
            >
              {availableGems === 12 ? 'Reset (420 Gems)' : 'Test Low Bal (12)'}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default ExchangeCenter;
