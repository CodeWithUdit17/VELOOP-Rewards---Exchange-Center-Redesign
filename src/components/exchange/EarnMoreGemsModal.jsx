import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Gift, Video, Users, MessageSquare } from 'lucide-react';
import { GemIcon } from '../common/RewardIcons';
import styles from './EarnMoreGemsModal.module.css';

const EARN_TASKS = [
  {
    id: 'task-1',
    title: 'Daily Platform Check-in',
    reward: 20,
    icon: Gift,
    description: 'Claim your consecutive daily activity bonus.',
  },
  {
    id: 'task-2',
    title: 'Watch Reward Spotlight Video',
    reward: 25,
    icon: Video,
    description: 'Quick 30s partner sponsor video preview.',
  },
  {
    id: 'task-3',
    title: 'Invite a Colleague or Friend',
    reward: 60,
    icon: Users,
    description: 'Get rewarded when a referee joins VELOOP Rewards.',
  },
  {
    id: 'task-4',
    title: 'Complete 2-Min Product Survey',
    reward: 40,
    icon: MessageSquare,
    description: 'Help improve reward catalog redemptions.',
  },
];

const EarnMoreGemsModal = ({ isOpen, onClose, onAddGems }) => {
  const [claimedTasks, setClaimedTasks] = useState({});

  if (!isOpen) return null;

  const handleClaim = (task) => {
    if (claimedTasks[task.id]) return;
    setClaimedTasks((prev) => ({ ...prev, [task.id]: true }));
    onAddGems(task.reward);
  };

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
          aria-labelledby="earn-title"
        >
          <div className={styles.header}>
            <div className={styles.titleGroup}>
              <div className={styles.iconCircle}>
                <Sparkles size={20} />
              </div>
              <div>
                <h2 id="earn-title" className={styles.title}>Earn More Gems</h2>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Complete quick activities to top up your conversion stash
                </span>
              </div>
            </div>

            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className={styles.tasksList}>
            {EARN_TASKS.map((task) => {
              const Icon = task.icon;
              const isClaimed = !!claimedTasks[task.id];

              return (
                <div key={task.id} className={styles.taskItem}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#c084fc',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div className={styles.taskInfo}>
                      <span className={styles.taskTitle}>{task.title}</span>
                      <span className={styles.taskReward}>
                        <GemIcon size={13} />
                        +{task.reward} Gems
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.claimBtn}
                    onClick={() => handleClaim(task)}
                    disabled={isClaimed}
                    style={
                      isClaimed
                        ? { background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8', cursor: 'default' }
                        : {}
                    }
                  >
                    {isClaimed ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Check size={13} style={{ color: '#34d399' }} />
                        Claimed
                      </span>
                    ) : (
                      'Claim Gems'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            Rewards are automatically added to your available Gems balance in real time.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EarnMoreGemsModal;
