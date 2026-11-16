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
  Calculator,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import styles from './ExchangeForm.module.css';

const presetAmounts = [
  { label: '28', value: 28 },
  { label: '39', value: 39 },
  { label: '57', value: 57 },
  { label: '100', value: 100 },
];

const ExchangeForm = ({
  availableGems = 420,
  availableVEs = 3850,
  onConfirmConversion,
  onEarnMoreGems,
}) => {
  const [gemInput, setGemInput] = useState('28');
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const sliderId = useId();

  // Parsing & validation
  const numGems = parseInt(gemInput, 10) || 0;
  const isAffordable = numGems > 0 && numGems <= availableGems;
  const isOverBalance = numGems > availableGems;
  const isEmptyOrZero = numGems <= 0;
  const missingGems = Math.max(0, numGems - availableGems);

  // Conversion rate logic (Base 5.39x)
  const baseRate = 5.39;
  let bonusMultiplier = 1.0;
  let tierLabel = 'Standard Multiplier';

  if (numGems >= 100) {
    bonusMultiplier = 1.05;
    tierLabel = 'VIP Whale (+5% Bonus)';
  } else if (numGems >= 57) {
    bonusMultiplier = 1.02;
    tierLabel = 'Value (+2% Bonus)';
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
      tierName: numGems >= 100 ? 'VIP Custom Conversion' : 'Calculator Conversion',
      requiredGems: numGems,
      receiveVEs: calculatedVEs,
      multiplier: `${effectiveRate}x`,
      badge: numGems >= 100 ? 'VIP CONVERT' : 'CALCULATOR',
      tagline: `Calculated at ${effectiveRate}x guaranteed rate`,
    };

    onConfirmConversion(customOption);
  };

  return (
    <div className={styles.calculatorCard} aria-label="Gems to VEs Calculator">
      <div className={styles.calcHeader}>
        <div className={styles.calcTitleRow}>
          <div className={styles.iconBadge}>
            <Calculator size={14} />
          </div>
          <div>
            <h3 className={styles.calcTitle}>Gems-to-VEs Calculator</h3>
            <span className={styles.calcSub}>
              Enter custom Gems with MAX option &amp; live conversion calculations
            </span>
          </div>
        </div>

        <div className={styles.ratePill}>
          <TrendingUp size={12} />
          <span>1 Gem = {effectiveRate} VEs</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.calcBody}>
        {/* Input & Presets Row */}
        <div className={styles.inputSection}>
          <div className={styles.inputTopRow}>
            <label htmlFor="gem-calc-input" className={styles.inputLabel}>
              Gems to Convert
            </label>
            <span className={styles.balanceInfo}>
              Available: <strong>{Number(availableGems).toLocaleString()} Gems</strong>
            </span>
          </div>

          <div className={`${styles.inputBox} ${isOverBalance ? styles.inputBoxError : ''}`}>
            <img src="/assets/gem_purple.png" alt="Gem" className={styles.gemPrefix} />
            <input
              id="gem-calc-input"
              type="text"
              inputMode="numeric"
              value={gemInput}
              onChange={handleInputChange}
              placeholder="0"
              className={styles.numInput}
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

          {/* Quick Presets */}
          <div className={styles.presetsRow}>
            <span className={styles.presetLabel}>Presets:</span>
            <div className={styles.presetGroup}>
              {presetAmounts.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`${styles.presetPill} ${numGems === p.value ? styles.presetPillActive : ''}`}
                  onClick={() => handlePresetClick(p.value)}
                >
                  {p.label} Gems
                </button>
              ))}
              <button
                type="button"
                className={`${styles.presetPill} ${styles.presetMax} ${numGems === availableGems ? styles.presetPillActive : ''}`}
                onClick={handleMaxClick}
              >
                Max ({availableGems})
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Preview Matrix */}
        <div className={styles.previewSection}>
          <div className={styles.previewHeaderRow}>
            <span className={styles.previewTag}>
              <Eye size={12} />
              <span>Preview Conversion</span>
            </span>
            <span className={styles.tierTag}>{tierLabel}</span>
          </div>

          <div className={styles.calcMatrix}>
            <div className={styles.calcCol}>
              <span className={styles.colLabel}>GEMS DEDUCTED</span>
              <div className={styles.colValueRow}>
                <span className={styles.gemsValue}>-{isEmptyOrZero ? 0 : numGems}</span>
                <span className={styles.valUnit}>Gems</span>
              </div>
              <span className={styles.colSub}>
                Remaining: {isEmptyOrZero ? availableGems : remainingGems} Gems
              </span>
            </div>

            <div className={styles.arrowNexus}>
              <div className={styles.nexusLine} />
              <div className={styles.nexusCircle}>
                <ArrowRight size={13} />
              </div>
              <span className={styles.rateText}>{effectiveRate}x</span>
              <div className={styles.nexusLine} />
            </div>

            <div className={styles.calcCol}>
              <span className={styles.colLabel}>VEs RECEIVED</span>
              <div className={styles.colValueRow}>
                <span className={styles.vesValue}>+{isEmptyOrZero ? 0 : calculatedVEs}</span>
                <span className={styles.valUnitGold}>VEs</span>
              </div>
              <span className={styles.colSubGold}>
                New Treasury: {Number(isEmptyOrZero ? availableVEs : projectedVEs).toLocaleString()} VEs
              </span>
            </div>
          </div>

          {/* Validation Banner if Insufficient */}
          <AnimatePresence>
            {isOverBalance && (
              <motion.div
                className={styles.errorRow}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AlertTriangle size={13} />
                <span>
                  Insufficient Gems: Need <strong>{missingGems} more Gems</strong>
                </span>
                <button type="button" onClick={onEarnMoreGems} className={styles.earnMoreLink}>
                  + Earn Gems
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <div className={styles.calcActionRow}>
            <button
              type="submit"
              disabled={!isAffordable}
              className={`${styles.convertNowBtn} ${!isAffordable ? styles.convertBtnDisabled : ''}`}
            >
              {isEmptyOrZero ? (
                'Enter Gems Amount'
              ) : isOverBalance ? (
                `Need ${missingGems} More Gems`
              ) : (
                <>
                  <Zap size={14} />
                  <span>Convert {numGems} Gems ➔ {calculatedVEs} VEs</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;
