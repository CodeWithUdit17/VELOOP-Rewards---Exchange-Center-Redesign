import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import ExchangeHero from '../../components/exchange/ExchangeHero';
import BalanceOverview from '../../components/exchange/BalanceOverview';
import ExchangeCard from '../../components/exchange/ExchangeCard';
import ExchangeModal from '../../components/exchange/ExchangeModal';
import ConversionSuccess from '../../components/exchange/ConversionSuccess';
import ExchangeLoader from '../../components/exchange/ExchangeLoader';
import ExchangeErrorState from '../../components/exchange/ExchangeErrorState';
import ExchangeEmptyState from '../../components/exchange/ExchangeEmptyState';
import HowExchangeWorks from '../../components/exchange/HowExchangeWorks';
import ExchangeHistory from '../../components/exchange/ExchangeHistory';
import ExchangeRules from '../../components/exchange/ExchangeRules';
import EarnMoreGemsModal from '../../components/exchange/EarnMoreGemsModal';
import GlossaryModal from '../../components/exchange/GlossaryModal';

import {
  initialUserData,
  exchangeOptions,
  initialRecentConversions,
} from '../../data/exchangeData';

import styles from './ExchangeCenter.module.css';
import { Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

const ExchangeCenter = () => {
  // Core user state
  const [userData, setUserData] = useState(initialUserData);
  const [availableGems, setAvailableGems] = useState(initialUserData.availableGems);
  const [availableVEs, setAvailableVEs] = useState(initialUserData.availableVEs);

  // Conversion options & history state
  const [options, setOptions] = useState(exchangeOptions);
  const [history, setHistory] = useState(initialRecentConversions);

  // Modal & Flow states
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedConversion, setCompletedConversion] = useState(null);
  const [isEarnGemsOpen, setIsEarnGemsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // View state simulator for development & evaluation review
  const [viewState, setViewState] = useState('normal'); // 'normal' | 'loading' | 'error' | 'empty'

  // Open conversion confirmation modal
  const handleSelectExchange = (option) => {
    setSelectedOption(option);
  };

  // Perform the conversion
  const handleConfirmConversion = (option) => {
    if (isProcessing) return; // Prevent double conversion (Section 17)
    setIsProcessing(true);

    // Simulate atomic network settlement
    setTimeout(() => {
      const updatedGems = availableGems - option.requiredGems;
      const updatedVEs = availableVEs + option.receiveVEs;
      const txRef = 'VLP-' + Math.floor(10000 + Math.random() * 90000);

      // Update balances
      setAvailableGems(updatedGems);
      setAvailableVEs(updatedVEs);

      // Prepend to history
      const newHistoryItem = {
        id: 'conv-' + Date.now(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        dateRelative: 'Just now',
        requiredGems: option.requiredGems,
        receiveVEs: option.receiveVEs,
        tierName: option.tierName,
        status: 'completed',
        txRef: txRef,
      };

      setHistory((prev) => [newHistoryItem, ...prev]);

      // Set completion payload & transition modal
      setCompletedConversion({
        requiredGems: option.requiredGems,
        receiveVEs: option.receiveVEs,
        tierName: option.tierName,
        txRef: txRef,
      });

      setIsProcessing(false);
      setSelectedOption(null);
    }, 900);
  };

  // Add Gems from Earn More activities
  const handleAddGems = (amount) => {
    setAvailableGems((prev) => prev + amount);
  };

  // Quick reset balances
  const handleResetBalances = () => {
    setAvailableGems(initialUserData.availableGems);
    setAvailableVEs(initialUserData.availableVEs);
  };

  // Simulate low balance (12 Gems) to inspect Section 15 "Insufficient Gems" state
  const handleSimulateLowBalance = () => {
    setAvailableGems(12);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* VELOOP Platform Navigation */}
      <Navbar
        userData={userData}
        availableGems={availableGems}
        availableVEs={availableVEs}
        activeTab="exchange"
      />

      <main className={styles.mainContent}>
        {/* Top Earn More Gems Activity Banner */}
        <aside className={styles.promoBanner} aria-label="Earning opportunities banner">
          <div className={styles.bannerLeft}>
            <Sparkles size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
            <span>
              <span className={styles.bannerHighlight}>Earn More Gems!</span> Complete tasks, refer friends, and unlock higher reward conversion tiers.
            </span>
          </div>
          <button
            type="button"
            className={styles.bannerBtn}
            onClick={() => setIsEarnGemsOpen(true)}
          >
            <span>Explore Now</span>
            <ArrowUpRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
          </button>
        </aside>

        {/* Hero Section */}
        <ExchangeHero
          onOpenHowItWorks={() => {
            const el = document.getElementById('how-it-works-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Balances Overview Card Grid */}
        <BalanceOverview
          gems={availableGems}
          ves={availableVEs}
          userData={userData}
          onEarnMoreGems={() => setIsEarnGemsOpen(true)}
        />

        {/* Conversions Section */}
        <section className={styles.conversionsSection} aria-label="Available Conversions">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Available Conversions</h2>
              <div className={styles.sectionSubtitle}>
                Choose a conversion opportunity that works best for you
              </div>
            </div>

            {/* Evaluator / Review View Controls */}
            <div className={styles.evaluatorBar} title="Review testing modes">
              <SlidersHorizontal size={13} />
              <span>Preview Mode:</span>
              <button
                type="button"
                className={`${styles.evaluatorBtn} ${viewState === 'normal' ? styles.evaluatorBtnActive : ''}`}
                onClick={() => setViewState('normal')}
              >
                Normal
              </button>
              <button
                type="button"
                className={`${styles.evaluatorBtn} ${viewState === 'loading' ? styles.evaluatorBtnActive : ''}`}
                onClick={() => setViewState('loading')}
              >
                Loader
              </button>
              <button
                type="button"
                className={`${styles.evaluatorBtn} ${viewState === 'empty' ? styles.evaluatorBtnActive : ''}`}
                onClick={() => setViewState('empty')}
              >
                Empty
              </button>
              <button
                type="button"
                className={`${styles.evaluatorBtn} ${viewState === 'error' ? styles.evaluatorBtnActive : ''}`}
                onClick={() => setViewState('error')}
              >
                Error
              </button>
              <button
                type="button"
                className={styles.evaluatorBtn}
                onClick={availableGems === 12 ? handleResetBalances : handleSimulateLowBalance}
                title="Toggle between 12 Gems (insufficient state test) and 420 Gems"
              >
                {availableGems === 12 ? 'Reset (420 Gems)' : 'Test Low Bal (12 Gems)'}
              </button>
            </div>
          </div>

          {/* Conditional View States */}
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
            <div className={styles.conversionsGrid}>
              {options.map((option) => (
                <ExchangeCard
                  key={option.id}
                  option={option}
                  availableGems={availableGems}
                  onSelectExchange={handleSelectExchange}
                  onEarnMoreGems={() => setIsEarnGemsOpen(true)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Supplementary Information Grid: How It Works & History */}
        <div id="how-it-works-section">
          <HowExchangeWorks />
        </div>

        <div className={styles.supplementaryGrid}>
          {/* Recent Conversions History */}
          <ExchangeHistory history={history} />

          {/* Exchange Rules and Compliance */}
          <ExchangeRules onOpenGlossary={() => setIsGlossaryOpen(true)} />
        </div>
      </main>

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

      {/* Conversion Success Notification */}
      <ConversionSuccess
        isOpen={!!completedConversion}
        conversionData={completedConversion}
        onContinue={() => setCompletedConversion(null)}
      />

      {/* Earn More Gems Modal */}
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

      {/* Platform Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            © {new Date().getFullYear()} VELOOP Rewards. All reward currencies and conversion rates are proprietary.
          </div>
          <div>
            Non-Volatile Reward Assets • Safe & Transparent Conversion
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExchangeCenter;

