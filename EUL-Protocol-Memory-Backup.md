# EUL Protocol Intelligence â Complete Project Memory

**Author:** Joel @ ms2capital
**Date:** March 3, 2026
**Status:** Complete â All deliverables pushed to GitHub

---

## Project Summary

Built a comprehensive EUL Protocol Intelligence Dashboard combining a full monitoring framework document with a live interactive React dashboard. The system tracks Euler Finance protocol metrics with a focus on institutional RWA (Real World Asset) adoption through the Securitize partnership and EUL token accumulation signals.

---

## GitHub Repository

**Repo:** [github.com/JoelS2F/euler-dashboard](https://github.com/JoelS2F/euler-dashboard)
**Visibility:** Public
**Commits:** 4 on main branch

### Files in Repo

| File | Size | Description |
|------|------|-------------|
| `eul-dashboard.jsx` | ~60KB / 1,070 lines | Interactive React dashboard with live CoinGecko + DefiLlama APIs |
| `EUL-Protocol-Intelligence-Dashboard.md` | Full framework | 8-section intelligence monitoring framework with metrics, alerts, thesis scorecard |
| `README.md` | 2.6KB | Repo documentation with sections overview, data sources, quick start |

---

## Dashboard Architecture

### Tech Stack
- **React** â Single-file JSX component (default export: `EULDashboard`)
- **Recharts** â Area charts, pie charts, bar charts, radar charts
- **Live APIs** â CoinGecko (price/market data) + DefiLlama (TVL/chain data)
- **Auto-refresh** â Every 2 minutes
- **Theme** â Dark terminal-style UI (`#0f172a` background)

### 9 Dashboard Sections

1. **Overview** â Live EUL price, TVL (DefiLlama), market cap, FDV, chain breakdown pie chart, thesis progress tracker
2. **Securitize Vaults** â ERC-4626 vault monitoring for ecACRED, ecVBILL, ecSTAC â TVL, utilization, yields, depositor counts
3. **Protocol Health** â Revenue tracking, bad debt monitoring, liquidation efficiency, risk curator exposure, oracle uptime
4. **EUL Analytics** â Token holder concentration, CEX exchange flows, vesting schedules, whale wallet tracking, governance delegation
5. **Derivatives** â Open interest, funding rates, liquidation maps, long/short ratios, basis analysis, signal interpretation matrix
6. **Peer Comparison** â EUL vs AAVE, COMP, MKR, Morpho â valuation multiples (MC/TVL, P/Revenue), market metrics
7. **Macro Signals** â RWA market context ($17B+ tokenized), regulatory timeline, institutional catalysts, governance calendar
8. **Alerts** â Configurable alert framework with priority levels (critical/high/medium), monitoring triggers
9. **Thesis Tracker** â Interactive binary milestone scorecard for RWA institutional adoption thesis (10 milestones)

### Live Data Endpoints

```
CoinGecko:  https://api.coingecko.com/api/v3/coins/euler
DefiLlama: https://api.llama.fi/protocol/euler
           https://api.llama.fi/tvl/euler
```

### Key On-Chain Addresses

| Entity | Address |
|--------|---------|
| EUL Token | `0xd9fcd98c322942075a5c3860693e9f4f03aae07b` |
| DAO Treasury | `0xcAD001c30E96765aC90307669d578219D4fb1DCe` |
| ecACRED Vault (Apollo/Securitize) | `0x75e2DAbcfb2edb0e63445ac9F027e3048508eA2b` |
| ecVBILL Vault | `0x2ff596321782fe034102f55af5ad707a4ce0d6a7` |
| ecSTAC Vault | `0x8b2d7534ffcf6c2a9226f439cdac26c6666e97a9` |

---

## Intelligence Framework (8 Sections)

### 1. Securitize / RWA Vault Monitoring
- TVL per vault (daily snapshots), utilization rates, unique depositor count
- Borrow/supply APY spread vs Morpho sACRED and Aave Horizon
- ecACRED transfer events â leading indicator of institutional inflows
- Reserve fee accrual â protocol revenue from RWA vaults (5% if proposal passes)
- Data: Etherscan ERC-4626 reads, DefiLlama, Euler subgraph, Securitize DS token

### 2. Protocol-Wide Health Metrics
- Aggregate TVL across Ethereum, Avalanche, Arbitrum, HyperEVM
- TVL by chain â Avalanche key for RWA expansion
- Revenue: FeeFlow auction data, $75.7K/day recent, $4.39M Q1 2025
- Risk: Bad debt events, liquidation volume, vault health distribution
- Curator exposure: KPK, Gauntlet, Re7 TVL tracking

### 3. EUL Token On-Chain Analytics
- Top holder balance changes (7d/30d delta)
- CEX net flow â Binance, Coinbase, Kraken (outflows = accumulation)
- New wallet accumulation >10K EUL threshold
- Whale tracking â top 50 non-exchange, non-treasury wallets
- DAO treasury: ~27% of supply, disbursement monitoring
- Cohort B/C investors: Paradigm, Haun, Coinbase Ventures, Jane Street (all fully unlocked)
- Governance: delegation changes, Snapshot participation, forum activity
- Staking: eToken gauge staking, rEUL rewards, 2.718% annual max inflation mint

### 4. Derivatives & Market Microstructure
- Perpetual futures: OI, OI/mcap ratio, funding rate, long/short ratio, liquidation maps
- Spot: Order book depth (2% of mid), volume-weighted spread, CEX volume breakdown
- DEX: Uniswap V3 EUL/WETH pool depth
- Signal matrix: OI rising + price flat = buildup; negative funding + price rising = squeeze potential

### 5. Comparative / Relative Value
- Peers: Euler vs Morpho vs Aave vs Spark
- Metrics: MC/FDV, TVL, MC/TVL ratio, protocol revenue (30d), revenue multiple, RWA vault TVL
- Key ratios: MC/TVL convergence thesis, Price/Revenue annualized, RWA TVL share growth

### 6. Macro / Contextual Signals
- Total tokenized RWA market cap (RWA.xyz)
- ACRED token AUM (Apollo/Securitize), sBUIDL AUM (BlackRock)
- Securitize platform AUM: $4B+ as of Oct 2025
- Governance calendar: KPK fee proposal, XP Season 4, Synthetic USD launch
- Sentiment: LunarCrush/Santiment social volume, CT mentions, research coverage

### 7. Alert Framework (High-Priority)

| Alert | Trigger | Significance |
|-------|---------|-------------|
| ecACRED vault >$1M deposit | Institutional validation | Confirms partnership beyond PR |
| EUL CEX net outflow >500K | Large accumulation | Smart money positioning |
| Funding rate <-0.05% 24h+ | Heavy shorts | Squeeze setup |
| New whale >100K EUL | Institutional buyer | Pre-narrative positioning |
| KPK fee proposal passes | Snapshot vote | Securitize vaults go competitive |
| Bad debt in Securitize vault | Health breach | Risk materialization |
| Treasury disbursement >100K | DAO spending | Potential sell pressure |
| Delegation spike >500K votes | Governance play | Influence building |

### 8. Thesis Tracking Scorecard

- [ ] KPK reserve fee proposal passes DAO vote
- [ ] First >$1M deposit in ecACRED vault
- [ ] Securitize vaults reach $10M combined TVL
- [ ] Securitize vaults reach $50M combined TVL
- [ ] Second institutional RWA curator onboards to Euler
- [ ] EUL re-rates above $2 (100% from current)
- [ ] OAK/Messari/Delphi publishes bullish reassessment
- [ ] EulerSwap integrated with RWA vault strategies
- [ ] Synthetic USD launches with RWA backing
- [ ] Euler MC/TVL ratio converges toward Morpho levels

---

## Data Infrastructure Recommendations

| Tool | Use Case |
|------|----------|
| Dune Analytics | Custom vault dashboards, token flows |
| Nansen / Arkham | Smart money labeling, exchange flows |
| CoinGlass | OI, funding rates, liquidation maps |
| DefiLlama | TVL, revenue, protocol comparison |
| Etherscan API | Token holders, contract events |
| Euler Subgraph | Vault utilization, borrow/supply rates |
| RWA.xyz | Tokenized asset market tracking |
| Governance Forum | Real-time proposal monitoring |

---

## Quick Start

```bash
git clone https://github.com/JoelS2F/euler-dashboard.git
npm install recharts
# Import in any React project:
import EULDashboard from './eul-dashboard';
```

---

## Component Structure (eul-dashboard.jsx)

```
EULDashboard (main export)
âââ State: activeSection, liveData, loading, lastRefresh, thesisItems
âââ useEffect: fetchLiveData() on mount + 2-min interval
âââ API calls: CoinGecko + DefiLlama
âââ Subcomponents: Badge, Card, StatCard, SectionHeader, MiniTable, LoadingPulse
âââ Render sections:
â   âââ renderOverview()      â price cards, TVL chart, chain pie, thesis progress
â   âââ renderSecuritize()    â vault table, utilization bars, depositor tracking
â   âââ renderProtocol()      â revenue charts, risk metrics, curator breakdown
â   âââ renderToken()         â holder concentration, CEX flows, governance
â   âââ renderDerivatives()   â OI chart, funding, liquidation map, signal matrix
â   âââ renderComparative()   â peer table, ratio comparison, radar chart
â   âââ renderMacro()         â RWA market, regulatory timeline, catalysts
â   âââ renderAlerts()        â priority-sorted alert list, configurable triggers
â   âââ renderThesis()        â interactive checklist, data infrastructure grid
âââ Layout: Sticky sidebar nav + scrollable main content (1200px max)
```

---

## Design Decisions

- **Hybrid data approach**: Live APIs for freely available data (price, TVL), structured mock data for premium sources (derivatives, on-chain analytics) â mock data clearly labeled in UI
- **Single-file component**: Entire dashboard in one JSX file for portability and artifact rendering
- **Dark theme**: Professional terminal aesthetic with indigo (#6366f1) primary color
- **Auto-refresh**: 2-minute intervals with last-refresh timestamp in header
- **Sidebar indicators**: Live green/red dots showing CoinGecko and DefiLlama connection status

---

*Framework by Joel @ ms2capital â March 2026*
*GitHub: github.com/JoelS2F/euler-dashboard*
