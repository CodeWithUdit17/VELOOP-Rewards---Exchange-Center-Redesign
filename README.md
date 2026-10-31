# VELOOP Rewards — Exchange Center UI Redesign

A frontend redesign of the **VELOP Rewards Exchange Center**, transforming reward conversions into an engaging fintech reward vault experience.

---

## 1. Project Overview

**VELOP Rewards Exchange Center** enables platform users to convert their activity-earned **Gems** into **VEs** (VELOP Rewards' virtual currency used for catalog redemptions, perks, and partner offers).

This redesign eliminates traditional, repetitive rectangular cards and avoids crypto/trading clichés (such as order books, liquidity swaps, trading charts, or buy/sell terminology). Instead, it introduces a **Reward Conversion Vault** concept that communicates security, clarity, and gamified progress.

---

## 2. Exchange Center Concept: "The Reward Vault"

The core metaphor of the redesign is **The Reward Conversion Vault**:
- **Non-Crypto by Design**: Avoids confusing DEX swap patterns (`From Token ↓ Swap ↑ To Token`). Conversions are presented as earned reward milestones.
- **Visual Transformation Flow**: Instead of confusing trading terminology, users see an intuitive flow from **Gems** (activity credits) to **VEs** (virtual spending currency).
- **Gamified Milestone Unlocking**: Clear visibility into what tier can be redeemed now, and dynamic progress bars displaying required Gems for higher tiers.
- **Fintech Precision**: Fixed conversion rates, projected post-conversion balances, atomic double-click prevention, and real-time ledger updates.

---

## 3. Key Features

- **Dynamic Reward Vault**: Tier cards featuring custom SVG reward visuals (Gems, Reward Chests, Vaults, and Elite Crowns) with glowing accents matching `#161827`.
- **Pre-Conversion Confirmation Modal**: Displays required Gems, incoming VEs, and projected balances after conversion, giving users complete confidence before confirming.
- **Insufficient Gems Intelligence**: Automatically detects if `availableGems < requiredGems`, calculates the exact missing amount (`"You need X more Gems to unlock this conversion"`), shows a progress percentage bar, and converts the CTA to **"Earn More Gems"**.
- **Interactive Earning Drawer**: Clicking "Earn More Gems" opens a platform activity drawer (Daily Check-in, Video Spotlights, Referrals, Surveys) where users can claim Gems and watch tiers unlock dynamically.
- **Custom VELOOP-Themed Loader**: Features orbital Gem and VE particles with animated progress pulses, replacing generic spinners.
- **Atomic Double-Click Guard**: Disables actions and transitions buttons to an interactive `"Converting..."` state to prevent duplicate conversions.
- **Celebration Burst**: An integrated reward burst animation (`canvas-confetti`) with gold, amethyst, and emerald particles upon conversion completion.
- **Recent Conversions Ledger**: Filterable history (All, Completed, Failed) with exact timestamps, transaction references (`VLP-XXXXX`), and status indicators.
- **Interactive Platform Glossary**: Expandable modals and tooltips explaining *"What are Gems?"*, *"What are VEs?"*, exchange rules, and platform guarantees.
- **Evaluator Testing Toolbar**: Built-in preview mode switcher to test Normal, Custom Loader, Error State with Retry, Empty State, and Low-Balance (12 Gems) state.

---

## 4. Exchange Logic & Business Rules

All conversions strictly preserve the platform's predefined exchange rates:

| Tier Name | Required Gems | Received VEs | Value Yield | Classification |
| :--- | :---: | :---: | :---: | :--- |
| **Daily Gem Conversion** | **28 Gems** | **151 VEs** | 5.39x | Popular / Daily |
| **Reward Conversion** | **39 Gems** | **168 VEs** | 4.31x | Most Picked |
| **Value Conversion** | **57 Gems** | **255 VEs** | 4.47x | Bonus Yield |
| **Premium Conversion** | **100 Gems** | **455 VEs** | 4.55x | High Value Tier |
| **Grand Vault Conversion** | **500 Gems** | **2,450 VEs** | 4.90x | Milestone Goal |

### Guardrails:
1. Only eligible Gems can be converted.
2. Exchange rates are fixed and predefined by VELOOP Rewards (non-market traded).
3. Conversions are processed atomically; duplicates are blocked via client-side debouncing and double-click guards.
4. User balances update in real time across the Navbar, Overview, and History ledger.

---

## 5. User Flow

```
1. Earn Gems  ──>  2. Choose Tier  ──>  3. Review Preview  ──>  4. Confirm  ──>  5. Instant Credit
   (Activities)       (Grid Cards)       (Modal Breakdown)        (Locked)         (VEs Added + Burst)
```

1. **Step 1 — Earn Gems**: User checks current available Gems and VEs in the top overview.
2. **Step 2 — Choose Conversion**: User selects a tier that matches their available Gems. If Gems are insufficient, the card shows the shortfall and guides the user to earn more.
3. **Step 3 — Review Conversion**: Clicking "Convert Rewards" launches the confirmation dialog showing exact deductions, additions, and post-conversion balances.
4. **Step 4 — Confirm**: User confirms; double-click protection locks the interface while the animated conversion processes.
5. **Step 5 — Receive VEs**: Success modal appears with celebration burst, balances update instantly, and a transaction receipt is prepended to recent conversions.

---

## 6. Component Architecture

```
src/
├── components/
│   ├── common/
│   │   └── RewardIcons.jsx         # Custom SVG Gem, VECoin, Chest, and Crown assets
│   ├── layout/
│   │   ├── Navbar.jsx              # VELOOP Platform topbar with real-time balance pills
│   │   └── Navbar.module.css
│   └── exchange/
│       ├── ExchangeHero.jsx        # Premium header with Gem -> VE visual transformation
│       ├── ExchangeHero.module.css
│       ├── BalanceOverview.jsx     # Dual balance cards with interactive info tooltips
│       ├── BalanceOverview.module.css
│       ├── ExchangeCard.jsx        # Non-crypto conversion cards with shortfall progress
│       ├── ExchangeCard.module.css
│       ├── ExchangeModal.jsx       # Projected balances confirmation dialog
│       ├── ExchangeModal.module.css
│       ├── ConversionSuccess.jsx   # Success dialog with confetti celebration
│       ├── ConversionSuccess.module.css
│       ├── ExchangeLoader.jsx      # Custom VELOOP-themed loading state
│       ├── ExchangeLoader.module.css
│       ├── ExchangeErrorState.jsx  # Graceful error state with retry action
│       ├── ExchangeErrorState.module.css
│       ├── ExchangeEmptyState.jsx  # Zero-state placeholder
│       ├── HowExchangeWorks.jsx    # 5-step visual guide
│       ├── HowExchangeWorks.module.css
│       ├── ExchangeRules.jsx       # Compliance and guardrails card
│       ├── ExchangeRules.module.css
│       ├── ExchangeHistory.jsx     # Filterable recent conversion transaction log
│       ├── ExchangeHistory.module.css
│       ├── EarnMoreGemsModal.jsx   # Interactive task drawer to earn/claim Gems
│       ├── EarnMoreGemsModal.module.css
│       ├── GlossaryModal.jsx       # Educational modal for Gems & VEs
│       └── GlossaryModal.module.css
├── pages/
│   └── ExchangeCenter/
│       ├── ExchangeCenter.jsx      # Main orchestrator with state & evaluator toolbar
│       └── ExchangeCenter.module.css
├── data/
│   └── exchangeData.js             # Structured data architecture (no hardcoded JSX values)
└── styles/
    ├── variables.css               # Design tokens, colors, radii, transitions
    └── global.css                  # Global styles, Bootstrap integration, typography
```

---

## 7. Technology Stack

- **Core Framework**: React.js 18 + Vite 6
- **Layout & Grid**: Bootstrap 5 + CSS Flexbox / CSS Grid
- **Styling Architecture**: CSS Modules (`.module.css`) for strict scoping and zero CSS bleed
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **Icons**: Lucide React + Bespoke hand-crafted SVGs (`RewardIcons.jsx`)
- **Animation**: Framer Motion (page transitions, orbital tokens, springs, modals)
- **Delight & Micro-interactions**: Canvas Confetti

---

## 8. Installation & Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Steps
1. Clone the repository:
   ```bash
   git clone <YOUR_REPO_URL>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 9. Production Build

To create an optimized production build:

```bash
npm run build
```

The output bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 10. Responsive Design

The interface was built mobile-first and tested across all standard viewport breakpoints:
- **Mobile (320px – 639px)**: Single column stack, touch-optimized tap targets, collapsible elements, full-width modal sheets.
- **Tablet (640px – 1023px)**: Balanced 2-column conversion cards and dual-column balance summary.
- **Laptop / Desktop (1024px – 1399px)**: 3-column conversion grid, side-by-side transaction history and rules section.
- **Large Displays (1400px – 1920px+)**: 4-column conversion cards, container max-width capping (`1320px`) with centered margins to prevent awkward horizontal stretching.

---

## 11. Future Backend Integration

The frontend data architecture is decoupled inside `src/data/exchangeData.js`. Transitioning to a real backend REST or GraphQL API is straightforward:

```javascript
// Replace static imports with React Query, SWR, or useEffect fetch calls:
const fetchExchangeRates = async () => {
  const response = await fetch('/api/v1/rewards/exchange-rates');
  return response.json();
};
```

All models conform to future API schemas:
- `userBalance`: `{ availableGems: number, availableVEs: number }`
- `exchangeOption`: `{ id: string, requiredGems: number, receiveVEs: number, tierName: string }`
- `conversionTransaction`: `{ id: string, date: string, requiredGems: number, receiveVEs: number, status: 'completed' | 'pending' | 'failed', txRef: string }`

---

## 12. Deployment

This project is configured for deployment to **Vercel** or **Netlify**:

### Deploying on Vercel:
```bash
npx vercel
```
- Build command: `npm run build`
- Output directory: `dist`

### Deploying on Netlify:
```bash
npx netlify deploy --prod
```
- Build command: `npm run build`
- Publish directory: `dist`

---

## 13. License & Credits

Developed for **VELOP Rewards Internship Program**.
Designed and engineered with care for a premium reward experience.

