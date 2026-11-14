import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Calculator,
  ShieldCheck,
} from 'lucide-react';
import styles from './ExchangeForm.module.css';

const presetAmounts = [
  { label: '28 (Daily)', value: 28 },
  { label: '39 (Explorer)', value: 39 },
  { label: '57 (Value)', value: 57 },
  { label: '100 (VIP)', value: 100 },
  { label: '250 (Whale)', value: 250 },
];

const ExchangeForm = ({
  availableGems = 420,
  availableVEs = 3850,
  onConfirmConversion,
  onEarnMoreGems,
}) => {
  const [gemInput, setGemInput] = useState('57');
  const [isHovered, setIsHovered] = useState(false);
  const sliderId = useId();

  // Parsing & validation
  const numGems = parseInt(gemInput, 10) || 0;
  const isAffordable = numGems > 0 && numGems <= availableGems;
  const isOverBalance = numGems > availableGems;
  const isEmptyOrZero = numGems <= 0;
  const missingGems = Math.max(0, numGems - availableGems);

  // Conversion rate logic: Base rate 5.39, bonus tier for larger batches
  const baseRate = 5.39;
  let bonusMultiplier = 1.0;
  let bonusLabel = 'Standard Multiplier';

  if (numGems >= 100) {
    bonusMultiplier = 1.05; // +5% bonus
    bonusLabel = 'VIP Whale +5% Bonus';
  } else if (numGems >= 57) {
    bonusMultiplier = 1.02; // +2% bonus
    bonusLabel = 'Value Explorer +2% Bonus';
  }

  const effectiveRate = Number((baseRate * bonusMultiplier).toFixed(2));
  const calculatedVEs = Math.round(numGems * effectiveRate);
  const remainingGems = Math.max(0, availableGems - numGems);
  const projectedVEs = availableVEs + calculatedVEs;

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setGemInput(val);
  };

  const handlePresetClick = (amount) => {
    setGemInput(amount.toString());
  };

  const handleMaxClick = () => {
    setGemInput(availableGems.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAffordable) return;

    const customOption = {
      id: 'custom-' + Date.now(),
      tierName: numGems >= 100 ? 'VIP Custom Conversion' : 'Custom Gem Conversion',
      requiredGems: numGems,
      receiveVEs: calculatedVEs,
      multiplier: `${effectiveRate}x`,
      badge: numGems >= 100 ? 'VIP CONVERT' : 'CUSTOM',
      tagline: `Calculated at ${effectiveRate}x guaranteed rate`,
    };

    onConfirmConversion(customOption);
  };

  return (
    <section className={styles.formContainer} aria-label="Interactive Exchange Form">
      <div className={styles.formCard}>
        {/* Glow ambient background */}
        <div className={styles.ambientGlow} />

        {/* Header */}
        <div className={styles.formHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.tagBadge}>
                <Calculator size={12} />
                <span>CUSTOM REWARD CONVERTER</span>
              </span>
              <span className={styles.ratePill}>
                <TrendingUp size={11} />
                <span>1 Gem = {effectiveRate} VEs</span>
              </span>
            </div>
            <h3 className={styles.formTitle}>Flexible Exchange Calculator</h3>
            <p className={styles.formSubtitle}>
              Enter any Gem amount or pick a preset to preview conversion with instant rate lock.
            </p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.guaranteePill}>
              <ShieldCheck size={14} className={styles.shieldIcon} />
              <span>Zero Fees &bull; Instant Settlement</span>
            </div>
          </div>
        </div>

        {/* Main interactive form */}
        <form onSubmit={handleSubmit} className={styles.calculatorGrid}>
          {/* Left Column: Input and Presets */}
          <div className={styles.inputColumn}>
            <div className={styles.inputGroupWrap}>
              <div className={styles.inputLabelRow}>
                <label htmlFor="gems-input-field" className={styles.fieldLabel}>
                  Amount of Gems to Convert
                </label>
                <span className={styles.availableBadge}>
                  Balance: <strong>{Number(availableGems).toLocaleString()} Gems</strong>
                </span>
              </div>

              {/* Input Box with Gem Icon and MAX button */}
              <div className={`${styles.inputBox} ${isOverBalance ? styles.inputBoxError : ''}`}>
                <div className={styles.inputPrefix}>
                  <img
                    src="/assets/gem_purple.png"
                    alt="Gems"
                    className={styles.gemPrefixImg}
                  />
                  <span className={styles.currencyPrefixText}>GEMS</span>
                </div>

                <input
                  id="gems-input-field"
                  type="text"
                  inputMode="numeric"
                  value={gemInput}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={styles.numericInput}
                  maxLength={6}
                />

                <button
                  type="button"
                  className={styles.maxBtn}
                  onClick={handleMaxClick}
                  title="Convert maximum available Gems"
                >
                  MAX
                </button>
              </div>

              {/* Slider for intuitive control */}
              <div className={styles.sliderWrap}>
                <input
                  id={sliderId}
                  aria-label="Gems to Convert Slider"
                  type="range"
                  min="0"
                  max={Math.max(100, availableGems)}
                  value={numGems}
                  onChange={(e) => setGemInput(e.target.value)}
                  className={styles.gemSlider}
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #ec4899 ${(numGems / Math.max(100, availableGems)) * 100}%, rgba(255, 255, 255, 0.1) ${(numGems / Math.max(100, availableGems)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  }}
                />
                <div className={styles.sliderLabels}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                  <span>{availableGems} (Max)</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className={styles.presetsRow}>
                <span className={styles.presetHeading}>Quick Amounts:</span>
                <div className={styles.presetButtons}>
                  {presetAmounts.map((p) => {
                    const isSelected = numGems === p.value;
                    const canAffordPreset = availableGems >= p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        className={`${styles.presetBtn} ${isSelected ? styles.presetBtnActive : ''} ${!canAffordPreset ? styles.presetBtnDisabled : ''}`}
                        onClick={() => handlePresetClick(p.value)}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Validation / Warning Messages */}
            <AnimatePresence>
              {isOverBalance && (
                <motion.div
                  className={styles.errorBanner}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertTriangle size={16} className={styles.errorIcon} />
                  <div className={styles.errorText}>
                    <strong>Insufficient Gems Balance!</strong>
                    <span>
                      You need <strong>{missingGems} more Gems</strong> to complete this conversion.
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.earnMoreLink}
                    onClick={onEarnMoreGems}
                  >
                    <Plus size={12} />
                    <span>Earn Gems</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Live Conversion Preview Card */}
          <div className={styles.previewColumn}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.previewBadge}>
                  <Sparkles size={11} />
                  <span>CONVERSION PREVIEW</span>
                </span>
                <span className={styles.tierRateText}>{bonusLabel}</span>
              </div>

              <div className={styles.conversionMetrics}>
                {/* You Deduct */}
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>YOU CONVERT</span>
                  <div className={styles.metricRow}>
                    <img
                      src="/assets/gem_purple.png"
                      alt="Gems"
                      className={styles.metricIcon}
                    />
                    <span className={styles.metricGemsValue}>
                      {isEmptyOrZero ? '0' : Number(numGems).toLocaleString()}
                    </span>
                    <span className={styles.metricUnit}>Gems</span>
                  </div>
                  <span className={styles.metricSub}>
                    Remaining: {isEmptyOrZero ? availableGems : Number(remainingGems).toLocaleString()} Gems
                  </span>
                </div>

                {/* Conversion Divider with animated arrow */}
                <div className={styles.nexusDivider}>
                  <div className={styles.nexusLine} />
                  <div className={styles.nexusPill}>
                    <ArrowRight size={14} className={styles.nexusArrow} />
                    <span>{effectiveRate}x</span>
                  </div>
                  <div className={styles.nexusLine} />
                </div>

                {/* You Receive */}
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>YOU RECEIVE</span>
                  <div className={styles.metricRow}>
                    <img
                      src="/assets/coin_ve.png"
                      alt="VEs"
                      className={styles.metricIcon}
                    />
                    <span className={styles.metricVEsValue}>
                      +{isEmptyOrZero ? '0' : Number(calculatedVEs).toLocaleString()}
                    </span>
                    <span className={styles.metricUnitGold}>VEs</span>
                  </div>
                  <span className={styles.metricSubGold}>
                    Projected Treasury: {isEmptyOrZero ? availableVEs : Number(projectedVEs).toLocaleString()} VEs
                  </span>
                </div>
              </div>

              {/* Conversion details summary pill */}
              <div className={styles.summaryBar}>
                <div className={styles.summaryItem}>
                  <span>Fixed Multiplier</span>
                  <strong>{effectiveRate}x</strong>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryItem}>
                  <span>Conversion Fee</span>
                  <strong className={styles.zeroFee}>0 Gems (FREE)</strong>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryItem}>
                  <span>Settlement</span>
                  <strong className={styles.instantTag}>Instant (0s)</strong>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={!isAffordable}
                className={`${styles.submitBtn} ${!isAffordable ? styles.submitBtnDisabled : ''}`}
              >
                {isEmptyOrZero ? (
                  <span>Enter Gems Amount to Convert</span>
                ) : isOverBalance ? (
                  <span>Insufficient Gems Balance ({missingGems} Needed)</span>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>
                      Review & Convert {Number(numGems).toLocaleString()} Gems &rarr; {Number(calculatedVEs).toLocaleString()} VEs
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ExchangeForm;

