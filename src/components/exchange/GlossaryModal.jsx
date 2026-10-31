import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Gem, Coins, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { platformGlossary } from '../../data/exchangeData';
import styles from './EarnMoreGemsModal.module.css';

const GlossaryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const glossaryItems = [
    { ...platformGlossary.gems, icon: Gem, color: '#c084fc' },
    { ...platformGlossary.ves, icon: Coins, color: '#fbbf24' },
    { ...platformGlossary.rates, icon: ArrowRightLeft, color: '#38bdf8' },
    { ...platformGlossary.rules, icon: ShieldCheck, color: '#34d399' },
  ];

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-labelledby="glossary-title"
        >
          <div className={styles.header}>
            <div className={styles.titleGroup}>
              <div className={styles.iconCircle}>
                <BookOpen size={20} />
              </div>
              <div>
                <h2 id="glossary-title" className={styles.title}>Rewards Glossary & Guides</h2>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Clear, transparent platform fundamentals
                </span>
              </div>
            </div>

            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            {glossaryItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 18, 30, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.15rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Icon size={16} style={{ color: item.color }} />
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.785rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            VELOP Rewards conversion values are mathematically fixed and non-volatile.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GlossaryModal;
