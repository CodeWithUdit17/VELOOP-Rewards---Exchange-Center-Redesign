/**
 * VELOOP Rewards — Exchange Center Data Architecture
 * Structured datasets for exchange options, initial user profile,
 * recent conversion history, exchange rules, and platform metadata.
 */

export const initialUserData = {
  name: "Hassan",
  level: "Level 7",
  veloopId: "784591",
  availableGems: 420,
  availableVEs: 3850,
  tier: "Gold Contributor",
  rewardsEarnedThisMonth: 820,
};

export const exchangeOptions = [
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
    description: "Convert your earned Gems into VEs instantly.",
    visualType: "gem-cluster",
    colorAccent: "#38bdf8", // soft blue / cyan
    features: ["Instant credit", "Zero fee", "Daily eligible"],
    conversionRateDisplay: "28 Gems → 151 VEs",
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
    tagline: "Higher conversion for better rewards",
    description: "Higher conversion rate tailored for active weekly earners.",
    visualType: "reward-chest",
    colorAccent: "#818cf8", // controlled purple / indigo
    features: ["Priority settlement", "Reward bonus", "Instant credit"],
    conversionRateDisplay: "39 Gems → 168 VEs",
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
    description: "Optimized milestone yield when redeeming larger earned packages.",
    visualType: "vault",
    colorAccent: "#34d399", // emerald mint
    features: ["Higher yield", "Platform milestone", "Instant credit"],
    conversionRateDisplay: "57 Gems → 255 VEs",
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
    tagline: "Premium conversion for premium rewards",
    description: "Elite tier exchange providing highest single-batch virtual currency.",
    visualType: "crystal-crown",
    colorAccent: "#fbbf24", // gold
    features: ["VIP multiplier", "Priority status", "Instant credit"],
    conversionRateDisplay: "100 Gems → 455 VEs",
  },
  {
    id: "exchange-05",
    type: "gem-to-ve",
    tierName: "Grand Vault Conversion",
    requiredGems: 500,
    receiveVEs: 2450,
    multiplier: "4.90x",
    badge: "Milestone Tier",
    badgeType: "special",
    tagline: "Reserved for top reward achievers",
    description: "Mega milestone exchange with the highest total VE return.",
    visualType: "mega-vault",
    colorAccent: "#c084fc", // violet
    features: ["Grand rewards", "Collector badge", "Instant credit"],
    conversionRateDisplay: "500 Gems → 2,450 VEs",
  },
];

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
    description: "Complete everyday tasks, participate in app events, and refer friends to build your Gems stash.",
    icon: "gem",
  },
  {
    stepNumber: "02",
    title: "Choose Conversion",
    description: "Pick an available reward tier tailored to your available Gems balance and reward goals.",
    icon: "layers",
  },
  {
    stepNumber: "03",
    title: "Review Exchange",
    description: "Inspect the required Gems, incoming VEs, and simulated new balance before confirming.",
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

