import React from 'react';

/**
 * High-fidelity, custom SVG reward graphics for VELOOP Rewards
 * Gives a bespoke, premium fintech feel rather than generic flat icons.
 */

export const GemIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.45))' }}
  >
    <defs>
      <linearGradient id="gemGrad1" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d8b4fe" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
      <linearGradient id="gemFacetLight" x1="10" y1="2" x2="26" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    {/* Upper facets */}
    <path d="M11 4L25 4L32 14L18 34L4 14L11 4Z" fill="url(#gemGrad1)" />
    <path d="M11 4L18 14L4 14L11 4Z" fill="url(#gemFacetLight)" />
    <path d="M25 4L18 14L32 14L25 4Z" fill="#9333ea" fillOpacity="0.7" />
    <path d="M11 4L18 14L25 4H11Z" fill="#e9d5ff" fillOpacity="0.85" />
    {/* Lower facets */}
    <path d="M4 14L18 14L18 34L4 14Z" fill="#7e22ce" fillOpacity="0.9" />
    <path d="M32 14L18 14L18 34L32 14Z" fill="#6b21a8" />
    <circle cx="14" cy="9" r="1.5" fill="#ffffff" fillOpacity="0.9" />
  </svg>
);

export const VECoinIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.45))' }}
  >
    <defs>
      <radialGradient id="coinGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="45%" stopColor="#eab308" />
        <stop offset="85%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>
      <linearGradient id="rimGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    {/* Outer Rim */}
    <circle cx="18" cy="18" r="17" fill="url(#rimGrad)" stroke="#facc15" strokeWidth="1" />
    {/* Inner Coin Face */}
    <circle cx="18" cy="18" r="14.5" fill="url(#coinGrad)" />
    {/* Inner Ring */}
    <circle cx="18" cy="18" r="13" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
    {/* VE Emblem Text */}
    <text
      x="18"
      y="22"
      fontFamily="system-ui, -apple-system, 'Space Grotesk', sans-serif"
      fontSize="11"
      fontWeight="900"
      fill="#ffffff"
      textAnchor="middle"
      letterSpacing="0.5"
      style={{
        filter: 'drop-shadow(0 1px 2px rgba(113, 63, 18, 0.8))'
      }}
    >
      VE
    </text>
  </svg>
);

export const VaultChestIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' }}
  >
    <defs>
      <linearGradient id="chestGrad" x1="18" y1="4" x2="18" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
    </defs>
    <rect x="4" y="14" width="28" height="16" rx="4" fill="url(#chestGrad)" stroke="rgba(255,255,255,0.2)" />
    <path d="M4 14C4 9.58172 7.58172 6 12 6H24C28.4183 6 32 9.58172 32 14H4Z" fill="#6366f1" />
    <circle cx="18" cy="20" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
    <line x1="18" y1="23" x2="18" y2="26" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CrownRewardIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.4))' }}
  >
    <path
      d="M5 28L4 12L12 18L18 6L24 18L32 12L31 28H5Z"
      fill="url(#coinGrad)"
      stroke="#f59e0b"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="6" r="2.5" fill="#fef08a" />
    <circle cx="4" cy="12" r="2" fill="#c084fc" />
    <circle cx="32" cy="12" r="2" fill="#c084fc" />
    <rect x="7" y="27" width="22" height="3" rx="1.5" fill="#fef08a" />
  </svg>
);
