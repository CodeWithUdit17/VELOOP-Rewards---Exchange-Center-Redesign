import React from 'react';

/**
 * High-fidelity, 3D official reward graphics for VELOOP Rewards.
 * Replaces generic flat SVGs with the authentic 3D metallic and crystal assets.
 */

export const GemIcon = ({ size = 28, className = '', style = {} }) => (
  <img
    src="/assets/gem_purple.png"
    width={size}
    height={size}
    alt="Gems"
    className={className}
    style={{
      objectFit: 'contain',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 6px rgba(168, 85, 247, 0.45))',
      display: 'inline-block',
      ...style,
    }}
  />
);

export const VECoinIcon = ({ size = 28, className = '', style = {} }) => (
  <img
    src="/assets/coin_ve.png"
    width={size}
    height={size}
    alt="VEs"
    className={className}
    style={{
      objectFit: 'contain',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 6px rgba(251, 191, 36, 0.45))',
      display: 'inline-block',
      ...style,
    }}
  />
);

export const VaultChestIcon = ({ size = 28, className = '', style = {} }) => (
  <img
    src="/assets/chest_rewards.png"
    width={size}
    height={size}
    alt="Reward Chest"
    className={className}
    style={{
      objectFit: 'contain',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.35))',
      display: 'inline-block',
      ...style,
    }}
  />
);

export const CrownRewardIcon = ({ size = 28, className = '', style = {} }) => (
  <img
    src="/assets/crown.png"
    width={size}
    height={size}
    alt="Crown"
    className={className}
    style={{
      objectFit: 'contain',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 8px rgba(251, 191, 36, 0.45))',
      display: 'inline-block',
      ...style,
    }}
  />
);

export const GiftBoxIcon = ({ size = 28, className = '', style = {} }) => (
  <img
    src="/assets/gift_box.png"
    width={size}
    height={size}
    alt="Gift Box"
    className={className}
    style={{
      objectFit: 'contain',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.45))',
      display: 'inline-block',
      ...style,
    }}
  />
);


