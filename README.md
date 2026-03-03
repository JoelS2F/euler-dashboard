# EUL Protocol Intelligence Dashboard

> Institutional RWA Adoption & Token Accumulation Signals — Built by Joel @ ms2capital

## Overview

A comprehensive React-based intelligence dashboard for monitoring **Euler Finance (EUL)** protocol metrics, with a focus on Real World Asset (RWA) institutional adoption signals and token accumulation patterns.

## Dashboard Sections

| Section | Description |
|---------|-------------|
| **Overview** | Live price, TVL (DefiLlama), market cap, thesis progress tracker |
| **Securitize Vaults** | ERC-4626 vault monitoring (ecACRED, ecVBILL, ecSTAC) — TVL, utilization, yields |
| **Protocol Health** | Revenue, bad debt, liquidation efficiency, oracle uptime |
| **EUL Analytics** | Token holder concentration, exchange flows, vesting schedules, whale tracking |
| **Derivatives** | Open interest, funding rates, liquidation maps, basis analysis |
| **Peer Comparison** | EUL vs AAVE, COMP, MKR — valuation multiples and market metrics |
| **Macro Signals** | RWA market context, regulatory timeline, institutional catalysts |
| **Alerts** | Configurable alert framework with priority-based monitoring triggers |
| **Thesis Tracker** | Binary milestone scorecard for the RWA institutional adoption thesis |

## Live Data Sources

- **CoinGecko API** — EUL price, market cap, 24h change, volume
- **DefiLlama API** — TVL (current + 90-day history), chain breakdown, protocol comparison
- **Mock Data** — Structured placeholders for vault metrics, derivatives, governance (indicated in UI)

## Tech Stack

- **React** (single-file JSX component)
- **Recharts** — Area charts, pie charts, bar charts
- **Live API integration** — Auto-refreshes every 2 minutes
- **Dark theme** — Professional terminal-style UI

## Quick Start

```bash
# Clone the repo
git clone https://github.com/JoelS2F/euler-dashboard.git

# The dashboard is a single React component (eul-dashboard.jsx)
# Import it into any React project with recharts installed:
npm install recharts

# Import the component
import EULDashboard from './eul-dashboard';
```

## Files

- `eul-dashboard.jsx` — Main dashboard React component (~1,070 lines)
- `EUL-Protocol-Intelligence-Dashboard.md` — Full intelligence framework document

## Architecture

The dashboard uses a hybrid data approach:
- **Live data** fetched from free public APIs (CoinGecko, DefiLlama) on mount + 2-min intervals
- **Structured mock data** for metrics requiring premium API access (clearly labeled in UI)
- **Interactive thesis tracker** with persistent state for tracking investment milestones

## License

MIT

---

*Framework by Joel @ ms2capital — March 2026*
