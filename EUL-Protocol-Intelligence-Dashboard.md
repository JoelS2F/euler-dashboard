# EUL Protocol Intelligence Dashboard

**Monitoring Framework for Institutional RWA Adoption & Token Accumulation Signals**

---

## 1. SECURITIZE / RWA VAULT MONITORING

### Primary Vault Addresses (Ethereum L1)

| Vault Collateral | Address | Type |
|---|---|---|
| USDC Vault ecACRED (Apollo) | `0x75e2DAbcfb2edb0e63445ac9F027e3048508eA2b` | USDC |
| USDC Vault ecVBILL | `0x2ff596321782fe034102f55af5ad707a4ce0d6a7` | USDC |
| USDC Vault ecSTAC | `0x8b2d7534ffcf6c2a9226f439cdac26c6666e97a9` | USDC |

### Metrics to Track

- **TVL per vault** â total USDC deposited + collateral value (daily snapshots)
- **Utilization rate** â borrowed / total supplied (indicates demand for leverage on RWA collateral)
- **Unique depositor count** â whitelisted investor adoption curve
- **Borrow/supply APY spread** â competitiveness vs Morpho sACRED and Aave Horizon
- **ecACRED transfer events** â Securitize DS token movements into Euler vaults (leading indicator of institutional inflows)
- **Reserve fee accrual** â actual protocol revenue generated from these vaults (5% if proposal passes)

### Data Sources

- Etherscan contract reads (ERC-4626 `totalAssets()`, `totalSupply()`)
- DefiLlama API for TVL aggregation
- Euler subgraph / API for vault-specific utilization
- Securitize DS token contract for transfer tracking

---

## 2. PROTOCOL-WIDE HEALTH METRICS

### TVL & Lending Activity

- **Aggregate TVL** â across Ethereum, Avalanche, Arbitrum, HyperEVM (DefiLlama)
- **TVL by chain** â identify growth vectors (Avalanche was key for RWA expansion)
- **Active loans outstanding** â total borrow notional
- **Net deposit flows** â deposits minus withdrawals (7d, 30d rolling)
- **Vault count growth** â new EVK deployments per week
- **EulerSwap volume** â DEX activity ($1.8B peak in July 2025)

### Revenue & Fee Generation

- **FeeFlow auction data** â reverse Dutch auction outcomes, EUL demand from fee buyers
- **Protocol revenue (daily/weekly)** â available via CoinGecko ($75.7K/day recently, $10K project revenue)
- **Cumulative fees** â $4.39M in Q1 2025; track quarterly trajectory
- **Reserve fee collection per vault category** â crypto-native vs RWA vaults

### Risk / Bad Debt Monitoring

- **Bad debt events** â socializations across any vault (Stream Finance was the warning)
- **Liquidation volume** â healthy liquidation activity indicates functioning risk infrastructure
- **Vault health distribution** â distribution of health factors across active positions
- **Curator-level risk exposure** â TVL per risk curator (KPK, Gauntlet, Re7, etc.)

---

## 3. EUL TOKEN ON-CHAIN ANALYTICS

### Key Contract Addresses

| Entity | Address |
|---|---|
| EUL Token | `0xd9fcd98c322942075a5c3860693e9f4f03aae07b` |
| DAO Treasury | `0xcAD001c30E96765aC90307669d578219D4fb1DCe` |
| Euler Foundation Multisig | Track via DeBank |

### Smart Wallet Accumulation Signals

- **Top holder balance changes** â Etherscan token holders page, 7d/30d delta
- **CEX net flow** â EUL inflows vs outflows from Binance, Coinbase, Kraken hot wallets
  - Net outflows = accumulation (moving to self-custody)
  - Net inflows = potential sell pressure
- **New wallet accumulation** â fresh addresses acquiring >10K EUL (filter noise with minimum threshold)
- **Whale wallet tracking** â monitor top 50 non-exchange, non-treasury wallets for position changes
- **DAO treasury balance** â track disbursements, remaining EUL allocation (~27% of supply)
- **Cohort B/C investor wallets** â Paradigm, Haun Ventures, Coinbase Ventures, Jane Street unlock/movement tracking (all fully unlocked per docs)

### Governance Activity

- **Delegation changes** â spikes in vote delegation = someone positioning for governance influence
- **Snapshot vote participation** â rising voter turnout signals engaged holder base
- **Forum activity** â new proposals, RFC discussions (especially around Securitize markets)

### Staking & Distribution

- **EUL in gauge staking** â eToken staking for EUL rewards (indicates conviction holders)
- **rEUL reward distribution rate** â ongoing emissions per governance proposal from Nov 2024
- **Mint function monitoring** â annual 2.718% max inflation (check `mintingRestrictedBefore` timestamp)

---

## 4. DERIVATIVES & MARKET MICROSTRUCTURE

### Perpetual Futures (if EUL perp exists on Binance/Bybit)

- **Open interest (OI)** â absolute level and % change (rising OI + rising price = bullish conviction)
- **OI / market cap ratio** â high ratio = leveraged positioning, potential squeeze setup
- **Funding rate** â persistent negative funding = shorts paying, potential squeeze catalyst
- **Long/short ratio** â Binance top trader positioning
- **Liquidation map** â clustered liquidation levels above/below current price (CoinGlass)
- **Basis (perp vs spot)** â premium/discount indicates directional sentiment

### Spot Market Depth

- **Order book depth** â bid/ask liquidity within 2% of mid on Binance, Coinbase
- **Volume-weighted spread** â tightening spread = improving liquidity
- **CEX volume breakdown** â Binance vs Coinbase vs Kraken vs Bithumb (identify where marginal price discovery happens)
- **DEX volume** â Uniswap V3 EUL/WETH pool depth and volume

### Key Derivatives Signals to Watch

| Signal | Interpretation |
|---|---|
| OI rising + price flat | Buildup before move |
| Negative funding + price rising | Short squeeze potential |
| OI declining + price rising | Organic spot buying (strong) |
| High OI/mcap + positive funding | Overleveraged longs (fragile) |

---

## 5. COMPARATIVE / RELATIVE VALUE

### Peer Protocol Benchmarks

| Metric | Euler | Morpho | Aave | Spark |
|---|---|---|---|---|
| Market Cap / FDV | Track | Track | Track | Track |
| TVL | Track | Track | Track | Track |
| MC/TVL ratio | Track | Track | Track | Track |
| Protocol revenue (30d) | Track | Track | Track | Track |
| Revenue multiple | Track | Track | Track | Track |
| RWA vault TVL | Track | Track | Track | Track |

### Key Ratios

- **MC/TVL** â Euler's should converge with peers if institutional adoption materializes
- **Price/Revenue** â annualized protocol revenue vs FDV (compare to Morpho, Aave)
- **RWA TVL share** â % of total TVL in institutional/RWA vaults (growth trajectory vs competitors)

---

## 6. MACRO / CONTEXTUAL SIGNALS

### RWA Market Growth

- **Total tokenized RWA market cap** â RWA.xyz for aggregate tracking
- **ACRED token AUM** â growth in Apollo's tokenized credit fund (Securitize)
- **sBUIDL AUM** â BlackRock's tokenized treasury fund (also on Euler via Avalanche)
- **Securitize platform AUM** â $4B+ as of Oct 2025, track growth

### Euler Governance Calendar

- **Upcoming Snapshot votes** â especially fee parameter changes
- **KPK reserve fee proposal** â passage/rejection directly impacts Securitize vault competitiveness
- **XP Season 4 rules** â incentive structure for 2026
- **Synthetic USD launch status** â unifying Euler's lending/DEX ecosystem

### Sentiment / Social

- **CT mentions** â LunarCrush, Santiment social volume for EUL
- **Forum governance engagement** â comment count on Securitize-related proposals
- **Research coverage** â new reports from OAK Research, Messari, Delphi Digital

---

## 7. ALERT FRAMEWORK

### High-Priority Alerts

| Alert | Trigger | Why It Matters |
|---|---|---|
| ecACRED vault deposit >$1M | First significant institutional deposit | Validates partnership beyond press release |
| EUL CEX net outflow >500K tokens | Large accumulation event | Smart money positioning |
| Funding rate <-0.05% sustained 24h+ | Heavy short positioning | Squeeze setup |
| New whale wallet >100K EUL | Institutional accumulation | Pre-narrative positioning |
| KPK fee proposal passes | Snapshot vote result | Securitize vaults go competitive |
| Bad debt event any Securitize vault | Vault health breach | Risk materialization |
| EUL treasury disbursement >100K | DAO spending | Potential sell pressure |
| Delegation spike >500K votes | Governance positioning | Someone building influence |

### Data Infrastructure Recommendations

- **Dune Analytics** â custom dashboards for vault-level metrics, token flows
- **Nansen / Arkham** â smart money wallet labeling, exchange flow tracking
- **CoinGlass** â derivatives data (OI, funding, liquidation maps)
- **DefiLlama** â TVL, revenue, protocol comparison
- **Etherscan API** â token holder snapshots, contract event monitoring
- **Euler Subgraph** â vault utilization, borrow/supply rates
- **RWA.xyz** â tokenized asset market tracking
- **Euler Governance Forum RSS** â real-time proposal monitoring

---

## 8. THESIS TRACKING SCORECARD

Track these binary milestones to assess whether the RWA institutional thesis is materializing:

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

*Last updated: March 2026 | Framework by Joel @ ms2capital*
