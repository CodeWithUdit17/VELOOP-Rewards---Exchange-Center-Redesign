/**
 * VELOOP Rewards — Exchange Center Data Architecture
 * Structured datasets for exchange options, user profile,
 * recent conversion history, exchange rules, and platform metadata.
 */

export const initialUserData = {
  name: "Hassan",
  level: "Level 7",
  nextLevel: "Level 8",
  levelProgress: 72, // 72% towards Level 8
  veloopId: "784591",
  availableGems: 420,
  availableVEs: 3850,
  availableSVEs: 1250,
  tier: "Gold Contributor",
  rewardsEarnedThisMonth: 1280,
  monthlyConversionsCount: 6,
};

export const standardExchangeOptions = [
  {
    id: "exchange-01",
    type: "gem-to-ve",
    tierName: "Daily Gem Conversion",
    requiredGems: 28,
    receiveVEs: 151,
    multiplier: "5.39x",
    badge: "Popular",
    badgeType: "primary",
    tagline: "Instant daily reward boost",
    description: "Convert your daily earned Gems into VEs instantly.",
    visualType: "gem-cluster",
    colorAccent: "#38bdf8",
    features: ["Instant credit", "Zero fee", "Daily eligible"],
    conversionRateDisplay: "28 Gems → 151 VEs",
    isRecommended: true,
  },
  {
    id: "exchange-02",
    type: "gem-to-ve",
    tierName: "Reward Conversion",
    requiredGems: 39,
    receiveVEs: 168,
    multiplier: "4.31x",
    badge: "Most Picked",
    badgeType: "accent",
    tagline: "Higher conversion for active earners",
    description: "Optimal conversion rate tailored for consistent weekly task finishers.",
    visualType: "reward-chest",
    colorAccent: "#818cf8",
    features: ["Priority settlement", "Standard reward", "Instant credit"],
    conversionRateDisplay: "39 Gems → 168 VEs",
    isRecommended: false,
  },
  {
    id: "exchange-03",
    type: "gem-to-ve",
    tierName: "Value Conversion",
    requiredGems: 57,
    receiveVEs: 255,
    multiplier: "4.47x",
    badge: "Bonus Yield",
    badgeType: "success",
    tagline: "Unlock greater value with more Gems",
    description: "Optimized milestone yield when redeeming larger accumulated packages.",
    visualType: "vault",
    colorAccent: "#34d399",
    features: ["Higher yield", "Platform milestone", "Instant credit"],
    conversionRateDisplay: "57 Gems → 255 VEs",
    isRecommended: false,
  },
  {
    id: "exchange-04",
    type: "gem-to-ve",
    tierName: "Premium Conversion",
    requiredGems: 100,
    receiveVEs: 455,
    multiplier: "4.55x",
    badge: "High Value",
    badgeType: "warning",
    tagline: "Premium conversion for top rewards",
    description: "Elite tier exchange providing highest single-batch virtual currency.",
    visualType: "crystal-crown",
    colorAccent: "#fbbf24",
    features: ["VIP multiplier", "Priority status", "Instant credit"],
    conversionRateDisplay: "100 Gems → 455 VEs",
    isRecommended: false,
  },
];

export const milestoneVaultOption = {
  id: "exchange-05",
  type: "gem-to-ve",
  tierName: "Grand Vault Milestone Conversion",
  requiredGems: 500,
  receiveVEs: 2450,
  multiplier: "4.90x",
  badge: "Elite Milestone Vault",
  badgeType: "special",
  tagline: "Reserved for top reward achievers",
  description: "Exclusive milestone vault providing the maximum conversion yield on VELOOP Rewards.",
  visualType: "mega-vault",
  colorAccent: "#c084fc",
  features: ["Grand multiplier", "Collector badge", "Direct VIP concierge"],
  conversionRateDisplay: "500 Gems → 2,450 VEs",
};

// All options for state compatibility
export const exchangeOptions = [...standardExchangeOptions, milestoneVaultOption];

export const initialRecentConversions = [
  {
    id: "conv-101",
    date: "24 Aug 2026, 04:33 PM",
    dateRelative: "Today",
    requiredGems: 28,
    receiveVEs: 151,
    tierName: "Daily Gem Conversion",
    status: "completed",
    txRef: "VLP-89421",
  },
  {
    id: "conv-102",
    date: "23 Aug 2026, 11:15 AM",
    dateRelative: "Yesterday",
    requiredGems: 39,
    receiveVEs: 168,
    tierName: "Reward Conversion",
    status: "completed",
    txRef: "VLP-88914",
  },
  {
    id: "conv-103",
    date: "21 Aug 2026, 06:40 PM",
    dateRelative: "21 Aug",
    requiredGems: 57,
    receiveVEs: 255,
    tierName: "Value Conversion",
    status: "completed",
    txRef: "VLP-87430",
  },
  {
    id: "conv-104",
    date: "20 Aug 2026, 09:10 AM",
    dateRelative: "20 Aug",
    requiredGems: 28,
    receiveVEs: 112,
    tierName: "Daily Gem Conversion",
    status: "completed",
    txRef: "VLP-86301",
  },
  {
    id: "conv-105",
    date: "19 Aug 2026, 03:22 PM",
    dateRelative: "19 Aug",
    requiredGems: 25,
    receiveVEs: 151,
    tierName: "Special Campaign Conversion",
    status: "failed",
    txRef: "VLP-85210",
  },
];

export const howExchangeWorksSteps = [
  {
    stepNumber: "01",
    title: "Earn Gems",
    description: "Complete everyday tasks, participate in app challenges, and refer friends to build your Gems stash.",
    icon: "gem",
  },
  {
    stepNumber: "02",
    title: "Choose Tier",
    description: "Select a predefined conversion tier matching your available Gems and redemption plans.",
    icon: "layers",
  },
  {
    stepNumber: "03",
    title: "Review Preview",
    description: "Inspect required Gems, incoming VEs, and simulated post-conversion balances before confirming.",
    icon: "check-circle",
  },
  {
    stepNumber: "04",
    title: "Confirm Securely",
    description: "Authorize the reward conversion with real-time balance validation and anti-double-click guard.",
    icon: "shield-check",
  },
  {
    stepNumber: "05",
    title: "Receive VEs",
    description: "VEs land in your VELOOP account balance immediately, ready for store catalog redemptions.",
    icon: "coins",
  },
];

export const exchangeRules = [
  "Only eligible Gems earned through legitimate platform activities can be exchanged.",
  "Exchange rates and conversion ratios are predefined by VELOOP Rewards.",
  "Available conversion tiers and reward quotas may vary by user level and campaign.",
  "A successful conversion is processed atomically and cannot be duplicated or cancelled.",
  "Your balance is updated immediately in real-time upon successful conversion.",
  "General VELOOP Rewards terms, fair usage guidelines, and platform rules apply.",
];

export const platformGlossary = {
  gems: {
    term: "Gems",
    title: "What are Gems?",
    description: "Gems are reward credits earned through eligible activities, daily challenges, and referrals on VELOOP Rewards. They serve as the raw activity units you can convert into virtual spending currency (VEs).",
  },
  ves: {
    term: "VEs",
    title: "What are VEs?",
    description: "VEs are VELOOP Rewards' official virtual reward currency. They can be redeemed for gift vouchers, premium merchandise, exclusive perks, and partner offers according to platform rules.",
  },
  sves: {
    term: "SVEs",
    title: "What are SVEs?",
    description: "SVEs (Special VEs) are staked and VIP-tier reward entitlements earned through loyalty streaks and platform staking. They provide an enhanced 1.25x conversion yield into spendable VEs.",
  },
  rates: {
    term: "Exchange Rates",
    title: "How do Exchange Rates work?",
    description: "Conversion rates are fixed reward benchmarks set by VELOOP Rewards. Higher tiers reward loyalty with optimized conversion multipliers. This is not a market-traded asset.",
  },
  rules: {
    term: "Exchange Rules",
    title: "Conversion Guidelines",
    description: "All conversions adhere to VELOOP safety rules: minimum balance requirements, anti-double-submission safeguards, and verified audit logs for every transaction.",
  },
};
