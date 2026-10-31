import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GemIcon, VECoinIcon } from '../common/RewardIcons';
import styles from './ExchangeModal.module.css';

const ExchangeModal = ({
  isOpen,
  option,
  currentGems = 420,
  currentVEs = 3850,
  isProcessing = false,
  onConfirm,
  onClose,
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !option) return null;

  const { requiredGems, receiveVEs, tierName } = option;
  const gemsAfter = currentGems - requiredGems;
  const vesAfter = currentVEs + receiveVEs;

  return (
    <AnimatePresence>
      <div
        className={styles.backdrop}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isProcessing) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className={styles.modalContent}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.modalTitleGroup}>
              <div className={styles.modalIcon}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 id="modal-title" className={styles.modalTitle}>Confirm Conversion</h2>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tierName}</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              disabled={isProcessing}
              aria-label="Close confirmation dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Primary Conversion Flow Preview */}
          <div className={styles.previewBox}>
            <div className={styles.flowRow}>
              {/* Required Gems */}
              <div className={styles.flowItem}>
                <GemIcon size={32} />
                <div>
                  <div className={styles.flowValue}>{requiredGems} Gems</div>
                  <div className={styles.flowLabel}>Deducted</div>
                </div>
              </div>

              {/* Conversion Arrow */}
              <div className={styles.flowArrow}>
                <ArrowRight size={22} />
              </div>

              {/* Incoming VEs */}
              <div className={styles.flowItem}>
                <VECoinIcon size={32} />
                <div>
                  <div className={styles.flowValue} style={{ color: '#fbbf24' }}>
                    +{receiveVEs} VEs
                  </div>
                  <div className={styles.flowLabel}>Credited</div>
                </div>
              </div>
            </div>
          </div>

          {/* Post-Conversion Balance Projection */}
          <div className={styles.impactSection}>
            <div className={styles.impactTitle}>Balance After Conversion</div>
            <div className={styles.impactGrid}>
              <div className={styles.impactCol}>
                <span className={styles.impactLabel}>Gems After</span>
                <span className={styles.impactNewVal}>
                  {gemsAfter.toLocaleString()}
                  <span className={styles.diffNegative}>(-{requiredGems})</span>
                </span>
              </div>

              <div className={styles.impactCol}>
                <span className={styles.impactLabel}>VEs After</span>
                <span className={styles.impactNewVal}>
                  {vesAfter.toLocaleString()}
                  <span className={styles.diffPositive}>(+{receiveVEs})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee / Non-crypto notice */}
          <div className={styles.guaranteeNote}>
            <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
            <span>Guaranteed reward redemption. Rate is fixed by VELOOP Rewards.</span>
          </div>

          {/* Modal Actions */}
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.confirmBtn}
              onClick={() => onConfirm(option)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className={styles.spinnerSmall} aria-hidden="true" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <span>Confirm Conversion</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExchangeModal;

