# EUL Protocol Intelligence — Complete Project Memory

**Author:** Joel @ ms2capital
**Date:** March 3, 2026
**Status:** v2 — Updated with Dune SQL Monitors + Comprehensive RWA Vault Registry

---

## Project Summary

Built a comprehensive EUL Protocol Intelligence Dashboard combining a full monitoring framework document with a live interactive React dashboard. The system tracks Euler Finance protocol metrics with a focus on institutional RWA (Real World Asset) adoption through the Securitize partnership and EUL token accumulation signals.

---

## GitHub Repository

**Repo:** [github.com/JoelS2F/euler-dashboard](https://github.com/JoelS2F/euler-dashboard)
**Visibility:** Public
**Commits:** 7 on main branch

### Files in Repo

| File | Size | Description |
|------|------|-------------|
| `eul-dashboard.jsx` | ~78KB / 1,397 lines | Interactive React dashboard with live APIs + 2 Dune SQL monitors |
| `EUL-Protocol-Intelligence-Dashboard.md` | Full framework | 8-section intelligence monitoring framework with metrics, alerts, thesis scorecard |
| `EUL-Protocol-Memory-Backup.md` | ~12KB | Complete project memory backup (this file) |
| `README.md` | 2.6KB | Repo documentation with sections overview, data sources, quick start |

---

## Dashboard Architecture

### Tech Stack
- **React** — Single-file JSX component (default export: `EULDashboard`)
- **Recharts** — Area charts, pie charts, bar charts, radar charts
- **Live APIs** — CoinGecko (price/market data) + DefiLlama (TVL/chain data)
- **Dune SQL** — Revenue Pipeline + Whale Activity monitors (mock data, Dune API-ready)
- **Auto-refresh** — Every 2 minutes
- **Theme** — Dark terminal-style UI (`#0f172a` background)

### 11 Dashboard Sections

1. **Overview** — Live EUL price, TVL (DefiLlama), market cap, FDV, chain breakdown pie chart, thesis progress tracker
2. **Securitize Vaults** — ERC-4626 vault monitoring for ecACRED, ecVBILL, ecSTAC — TVL, utilization, yields, depositor counts
3. **Revenue Pipeline** (NEW) — Dune Monitor #1: Euler V2 Universal RWA & TradFi Activity — stacked bar charts, pie breakdown, SQL reference
4. **Whale Activity** (NEW) — Dune Monitor #2: Institutional deposit tracking (>$100K) — tier classification, vault registry, SQL reference
5. **Protocol Health** — Revenue tracking, bad debt monitoring, liquidation efficiency, risk curator exposure, oracle uptime
6. **EUL Analytics** — Token holder concentration, CEX exchange flows, vesting schedules, whale wallet tracking, governance delegation
7. **Derivatives** — Open interest, funding rates, liquidation maps, long/short ratios, basis analysis, signal interpretation matrix
8. **Peer Comparison** — EUL vs AAVE, COMP, MKR, Morpho — valuation multiples (MC/TVL, P/Revenue), market metrics
9. **Macro Signals** — RWA market context ($17B+ tokenized), regulatory timeline, institutional catalysts, governance calendar
10. **Alerts** — Configurable alert framework with priority levels (critical/high/medium), monitoring triggers
11. **Thesis Tracker** — Interactive binary milestone scorecard for RWA institutional adoption thesis (10 milestones)

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
| ecVBILL Vault | `0x2ff596321782fe034102f55af5ad707a4fb1DCe7` |
| ecSTAC Vault | `0x8b2d7534ffcf6c2a9226f439cdac26c6666e97a9` |

### Comprehensive RWA Vault Registry (Dune Monitors)

| Participant | Asset | Role | Mainnet Vault Address |
|-------------|-------|------|-----------------------|
| Apollo | ACRED | Credit Fund Collateral | `0x716bF454066a84F39A2F78b5707e79a9d64f1225` |
| BlackRock | sBUIDL | Treasury Collateral | `0xD8b27CF359b7D15710a5BE299AF6e7Bf904984C2` |
| Ondo | USDY/OUSG | Treasury/Cash Yield | `0xEA79E49A076a75A9bF6013505C2B92eED69E4fe1` |
| Sentora | SPYon/TSLAon | Tokenized Equities | `0xf6e2efdf175e7a91c8847dade42f2d39a9ae57d4` |
| KPK Select | Multi-Asset | Institutional Market Hub | `0x35400a05369e8654f2c166a09fed4db5bb0a4316` |

---

## Dune SQL Monitors

### Monitor #1: Revenue Pipeline
Tracks interest collected from institutional RWA vaults using `euler_v2_ethereum.EVault_evt_InterestCollected`. 180-day lookback across Apollo ACRED, BlackRock sBUIDL, Ondo RWA, and Sentora Equities. Aggregates daily USD value accrued and transaction counts per vault.

### Monitor #2: Whale & Institutional Activity
Tracks large institutional deposits (>$100K) into RWA vaults using `euler_v2_ethereum.EVault_evt_Deposit`. Classifies movements by partner (Apollo, BlackRock, Other TradFi). Filters for significant capital deployment events to identify institutional positioning.

Both queries are embedded in the dashboard JSX with full SQL reference panels. Currently using mock data — connect Dune API key for live results.

---

## Intelligence Framework (8 Sections)

### 1. Securitize / RWA Vault Monitoring
- TVL per vault (daily snapshots), utilization rates, unique depositor count
- Borrow/supply APY spread vs Morpho sACRED and Aave Horizon
- ecACRED transfer events — leading indicator of institutional inflows
- Reserve fee accrual — protocol revenue from RWA vaults (5% if proposal passes)
- Data: Etherscan ERC-4626 reads, DefiLlama, Euler subgraph, Securitize DS token

### 2. Protocol-Wide Health Metrics
- Aggregate TVL across Ethereum, Avalanche, Arbitrum, HyperEVM
- TVL by chain — Avalanche key for RWA expansion
- Revenue: FeeFlow auction data, $75.7K/day recent, $4.39M Q1 2025
- Risk: Bad debt events, liquidation volume, vault health distribution
- Curator exposure: KPK, Gauntlet, Re7 TVL tracking

### 3. EUL Token On-Chain Analytics
- Top holder balance changes (7d/30d delta)
- CEX net flow — Binance, Coinbase, Kraken (outflows = accumulation)
- New wallet accumulation >10K EUL threshold
- Whale tracking — top 50 non-exchange, non-treasury wallets
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
├── State: activeSection, liveData, loading, lastRefresh, thesisItems
├── useEffect: fetchLiveData() on mount + 2-min interval
├── API calls: CoinGecko + DefiLlama
├── Subcomponents: Badge, Card, StatCard, SectionHeader, MiniTable, LoadingPulse
├── Render sections:
│   ├── renderOverview()      — price cards, TVL chart, chain pie, thesis progress
│   ├── renderSecuritize()    — vault table, utilization bars, depositor tracking
│   ├── renderProtocol()      — revenue charts, risk metrics, curator breakdown
│   ├── renderToken()         — holder concentration, CEX flows, governance
│   ├── renderDerivatives()   — OI chart, funding, liquidation map, signal matrix
│   ├── renderComparative()   — peer table, ratio comparison, radar chart
│   ├── renderMacro()         — RWA market, regulatory timeline, catalysts
│   ├── renderDuneRevenue()   — stacked bar chart, pie breakdown, SQL reference
│   ├── renderDuneWhales()    — whale deposit feed, tier distribution, vault registry
│   ├── renderAlerts()        — priority-sorted alert list, configurable triggers
│   └── renderThesis()        — interactive checklist, data infrastructure grid
└── Layout: Sticky sidebar nav + scrollable main content (1200px max)
```

---

## Design Decisions

- **Hybrid data approach**: Live APIs for freely available data (price, TVL), structured mock data for premium sources (derivatives, on-chain analytics) — mock data clearly labeled in UI
- **Single-file component**: Entire dashboard in one JSX file for portability and artifact rendering
- **Dark theme**: Professional terminal aesthetic with indigo (#6366f1) primary color
- **Auto-refresh**: 2-minute intervals with last-refresh timestamp in header
- **Sidebar indicators**: Live green/red dots showing CoinGecko and DefiLlama connection status

---

*Framework by Joel @ ms2capital — March 2026*
*GitHub: github.com/JoelS2F/euler-dashboard*
