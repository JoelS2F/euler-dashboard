import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

// âââ CONFIG ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const VAULT_ADDRESSES = {
  ecACRED: "0x75e2DAbcfb2edb0e63445ac9F027e3048508eA2b",
  ecVBILL: "0x2ff596321782fe034102f55af5ad707a4fb1DCe7",
  ecSTAC: "0x8b2d7534ffcf6c2a9226f439cdac26c6666e97a9",
};
const EUL_TOKEN = "0xd9fcd98c322942075a5c3860693e9f4f03aae07b";
const DAO_TREASURY = "0xcAD001c30E96765aC90307669d578219D4fb1DCe";

const COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
  green: "#10b981",
  red: "#ef4444",
  orange: "#f59e0b",
  pink: "#ec4899",
  slate: "#64748b",
  bg: "#0f172a",
  card: "#1e293b",
  cardHover: "#334155",
  border: "#334155",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  textDim: "#64748b",
};

const SECTIONS = [
  { id: "overview", label: "Overview", icon: "â" },
  { id: "securitize", label: "Securitize Vaults", icon: "ð¦" },
  { id: "protocol", label: "Protocol Health", icon: "ð" },
  { id: "token", label: "EUL Analytics", icon: "ðª" },
  { id: "derivatives", label: "Derivatives", icon: "ð" },
  { id: "comparative", label: "Peer Comparison", icon: "âï¸" },
  { id: "macro", label: "Macro Signals", icon: "ð" },
  { id: "alerts", label: "Alerts", icon: "ð" },
  { id: "thesis", label: "Thesis Tracker", icon: "ð¯" },
];

// âââ MOCK DATA GENERATORS ââââââââââââââââââââââââââââââââââââââââââââ
const generateTimeSeries = (days, baseValue, volatility, trend = 0) => {
  const data = [];
  let value = baseValue;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    value += (Math.random() - 0.48 + trend) * volatility;
    value = Math.max(value * 0.95, value);
    data.push({
      date: new Date(now - i * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
};

const MOCK_VAULT_DATA = {
  ecACRED: { tvl: 4200000, utilization: 62, depositors: 18, supplyAPY: 4.8, borrowAPY: 7.2, transfers24h: 3 },
  ecVBILL: { tvl: 2800000, utilization: 45, depositors: 12, supplyAPY: 3.9, borrowAPY: 6.1, transfers24h: 1 },
  ecSTAC: { tvl: 1500000, utilization: 38, depositors: 8, supplyAPY: 5.2, borrowAPY: 8.0, transfers24h: 2 },
};

const MOCK_WHALE_WALLETS = [
  { label: "Whale #1", balance: 892000, change7d: 45000, change30d: 120000 },
  { label: "Whale #2", balance: 654000, change7d: -12000, change30d: 85000 },
  { label: "Whale #3", balance: 543000, change7d: 28000, change30d: 28000 },
  { label: "Paradigm", balance: 1200000, change7d: 0, change30d: 0 },
  { label: "Haun Ventures", balance: 890000, change7d: -50000, change30d: -150000 },
  { label: "Coinbase Ventures", balance: 670000, change7d: 0, change30d: -30000 },
  { label: "Jane Street", balance: 450000, change7d: 15000, change30d: 75000 },
  { label: "Whale #7", balance: 380000, change7d: 62000, change30d: 62000 },
];

const MOCK_CEX_FLOWS = [
  { exchange: "Binance", inflow: 125000, outflow: 198000 },
  { exchange: "Coinbase", inflow: 45000, outflow: 78000 },
  { exchange: "Kraken", inflow: 32000, outflow: 41000 },
  { exchange: "Bithumb", inflow: 18000, outflow: 12000 },
];

const MOCK_DERIVATIVES = {
  openInterest: 28500000,
  oiChange24h: 12.3,
  fundingRate: -0.032,
  longShortRatio: 0.85,
  basis: -0.45,
  liquidation24h: 1200000,
};

const MOCK_ALERTS = [
  { id: 1, type: "high", title: "EUL CEX Net Outflow >500K", message: "720K EUL net outflow from Binance in 24h", time: "2h ago", active: true },
  { id: 2, type: "medium", title: "Funding Rate Sustained Negative", message: "Funding at -0.032% for 18h (threshold: -0.05% for 24h)", time: "6h ago", active: true },
  { id: 3, type: "info", title: "New Whale Wallet Detected", message: "Fresh address accumulated 85K EUL over 3 days", time: "1d ago", active: true },
  { id: 4, type: "low", title: "ecACRED Deposit Activity", message: "$420K deposited into ecACRED vault", time: "1d ago", active: false },
  { id: 5, type: "info", title: "Delegation Spike", message: "320K votes delegated to new delegate address", time: "3d ago", active: false },
];

const MOCK_THESIS = [
  { id: 1, text: "KPK reserve fee proposal passes DAO vote", done: false, category: "governance" },
  { id: 2, text: "First >$1M deposit in ecACRED vault", done: false, category: "adoption" },
  { id: 3, text: "Securitize vaults reach $10M combined TVL", done: false, category: "adoption" },
  { id: 4, text: "Securitize vaults reach $50M combined TVL", done: false, category: "adoption" },
  { id: 5, text: "Second institutional RWA curator onboards to Euler", done: false, category: "adoption" },
  { id: 6, text: "EUL re-rates above $2 (100% from ~$1)", done: false, category: "price" },
  { id: 7, text: "OAK/Messari/Delphi publishes bullish reassessment", done: false, category: "sentiment" },
  { id: 8, text: "EulerSwap integrated with RWA vault strategies", done: false, category: "product" },
  { id: 9, text: "Synthetic USD launches with RWA backing", done: false, category: "product" },
  { id: 10, text: "Euler MC/TVL ratio converges toward Morpho levels", done: false, category: "valuation" },
];

const PEER_DATA = [
  { name: "Euler", mcap: 125, fdv: 210, tvl: 980, revenue30d: 2.27, rwaTvl: 8.5, mcTvl: 0.128, revMultiple: 92.5 },
  { name: "Morpho", mcap: 420, fdv: 1100, tvl: 3200, revenue30d: 4.1, rwaTvl: 45, mcTvl: 0.131, revMultiple: 102.4 },
  { name: "Aave", mcap: 2800, fdv: 3100, tvl: 12500, revenue30d: 28.5, rwaTvl: 120, mcTvl: 0.224, revMultiple: 98.2 },
  { name: "Spark", mcap: 0, fdv: 0, tvl: 4800, revenue30d: 8.2, rwaTvl: 200, mcTvl: 0, revMultiple: 0 },
];

// âââ UTILITY COMPONENTS ââââââââââââââââââââââââââââââââââââââââââââââ
const fmt = (n, decimals = 2) => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(decimals)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(decimals)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(decimals)}K`;
  return `$${n.toFixed(decimals)}`;
};

const fmtNum = (n) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
};

const pct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

const Badge = ({ children, color = COLORS.primary }) => (
  <span style={{ background: `${color}22`, color, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{children}</span>
);

const Card = ({ children, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: 20,
      ...style,
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s",
    }}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, sub, change, color = COLORS.primary, icon }) => (
  <Card>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
        <div style={{ color: COLORS.text, fontSize: 26, fontWeight: 700 }}>{value}</div>
        {sub && <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
        {change !== undefined && (
          <span style={{ color: change >= 0 ? COLORS.green : COLORS.red, fontSize: 13, fontWeight: 600 }}>
            {change >= 0 ? "â²" : "â¼"} {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  </Card>
);

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, margin: 0 }}>{title}</h2>
    {subtitle && <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "4px 0 0" }}>{subtitle}</p>}
  </div>
);

const MiniTable = ({ headers, rows }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ color: COLORS.textMuted, fontWeight: 600, padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}`, textAlign: i === 0 ? "left" : "right", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}15` }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "10px 12px", color: COLORS.text, textAlign: j === 0 ? "left" : "right", fontFamily: j > 0 ? "monospace" : "inherit" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LoadingPulse = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.textMuted, fontSize: 13 }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, animation: "pulse 1.5s infinite" }} />
    Fetching live data...
  </div>
);

// âââ MAIN DASHBOARD ââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function EULDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [liveData, setLiveData] = useState({ price: null, tvl: null, tvlHistory: [], marketData: null, loading: true });
  const [thesisItems, setThesisItems] = useState(MOCK_THESIS);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchLiveData = useCallback(async () => {
    setLiveData((prev) => ({ ...prev, loading: true }));
    try {
      const [priceRes, tvlRes, tvlHistRes] = await Promise.allSettled([
        fetch("https://api.coingecko.com/api/v3/coins/euler?localization=false&tickers=false&community_data=false&developer_data=false").then((r) => r.json()),
        fetch("https://api.llama.fi/tvl/euler").then((r) => r.json()),
        fetch("https://api.llama.fi/protocol/euler").then((r) => r.json()),
      ]);

      const price = priceRes.status === "fulfilled" ? priceRes.value : null;
      const tvl = tvlRes.status === "fulfilled" ? tvlRes.value : null;
      const tvlHist = tvlHistRes.status === "fulfilled" ? tvlHistRes.value : null;

      let tvlHistory = [];
      if (tvlHist?.tvl) {
        tvlHistory = tvlHist.tvl.slice(-90).map((d) => ({
          date: new Date(d.date * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.round(d.totalLiquidityUSD / 1e6),
        }));
      }

      let chainTvl = [];
      if (tvlHist?.chainTvls) {
        chainTvl = Object.entries(tvlHist.chainTvls)
          .filter(([k]) => !k.includes("-") && !["borrowed", "staking", "pool2"].includes(k))
          .map(([chain, data]) => ({
            chain,
            tvl: data.tvl?.[data.tvl.length - 1]?.totalLiquidityUSD || 0,
          }))
          .filter((d) => d.tvl > 0)
          .sort((a, b) => b.tvl - a.tvl);
      }

      setLiveData({
        price: price
          ? {
              usd: price.market_data?.current_price?.usd,
              change24h: price.market_data?.price_change_percentage_24h,
              change7d: price.market_data?.price_change_percentage_7d,
              change30d: price.market_data?.price_change_percentage_30d,
              mcap: price.market_data?.market_cap?.usd,
              fdv: price.market_data?.fully_diluted_valuation?.usd,
              volume24h: price.market_data?.total_volume?.usd,
              circulatingSupply: price.market_data?.circulating_supply,
              totalSupply: price.market_data?.total_supply,
              ath: price.market_data?.ath?.usd,
              athChange: price.market_data?.ath_change_percentage?.usd,
              sparkline: price.market_data?.sparkline_7d?.price,
            }
          : null,
        tvl: tvl || null,
        tvlHistory,
        chainTvl,
        marketData: price?.market_data || null,
        loading: false,
      });
      setLastRefresh(new Date());
    } catch (e) {
      console.error("Fetch error:", e);
      setLiveData((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 120000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  const toggleThesis = (id) => {
    setThesisItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  // Mock time series data
  const tvlMock = generateTimeSeries(90, 800, 15, 0.5);
  const revenueMock = generateTimeSeries(30, 65, 12, 0.2);
  const oiMock = generateTimeSeries(30, 25, 3, 0.3);
  const rwaMarketMock = generateTimeSeries(90, 12, 0.8, 0.15);

  // âââ RENDER SECTIONS ââââââââââââââââââââââââââââââââââââââââââââ
  const renderOverview = () => {
    const p = liveData.price;
    return (
      <div>
        <SectionHeader title="EUL Protocol Overview" subtitle="Real-time metrics powered by CoinGecko & DefiLlama" />
        {liveData.loading && <LoadingPulse />}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          <StatCard label="EUL Price" value={p ? `$${p.usd?.toFixed(4)}` : "â"} change={p?.change24h} icon="ðª" sub={p ? `ATH: $${p.ath?.toFixed(2)} (${p.athChange?.toFixed(0)}%)` : ""} />
          <StatCard label="Market Cap" value={p?.mcap ? fmt(p.mcap, 1) : "â"} change={p?.change7d} icon="ð" sub="7d change" />
          <StatCard label="FDV" value={p?.fdv ? fmt(p.fdv, 1) : "â"} icon="ð" sub={p?.totalSupply ? `Supply: ${fmtNum(p.totalSupply)}` : ""} />
          <StatCard label="Protocol TVL" value={liveData.tvl ? fmt(liveData.tvl, 1) : "â"} icon="ð¦" sub="All chains" />
          <StatCard label="24h Volume" value={p?.volume24h ? fmt(p.volume24h, 1) : "â"} icon="ð" />
          <StatCard label="MC/TVL Ratio" value={p?.mcap && liveData.tvl ? (p.mcap / liveData.tvl).toFixed(3) : "â"} icon="âï¸" sub="Lower = undervalued" />
        </div>

        {/* TVL Chart */}
        <Card style={{ marginBottom: 24 }}>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>TVL History (90d) â Live from DefiLlama</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={liveData.tvlHistory.length > 0 ? liveData.tvlHistory : tvlMock}>
              <defs>
                <linearGradient id="tvlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="date" stroke={COLORS.textDim} tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v}M`, "TVL"]} />
              <Area type="monotone" dataKey="value" stroke={COLORS.primary} fill="url(#tvlGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Chain TVL Breakdown */}
        {liveData.chainTvl && liveData.chainTvl.length > 0 && (
          <Card style={{ marginBottom: 24 }}>
            <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>TVL by Chain â Live</h3>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={liveData.chainTvl} dataKey="tvl" nameKey="chain" cx="50%" cy="50%" outerRadius={80} label={({ chain, percent }) => `${chain} ${(percent * 100).toFixed(0)}%`}>
                      {liveData.chainTvl.map((_, i) => (
                        <Cell key={i} fill={[COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.green, COLORS.orange, COLORS.pink][i % 6]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, minWidth: 250 }}>
                {liveData.chainTvl.map((c, i) => (
                  <div key={c.chain} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}20` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.green, COLORS.orange, COLORS.pink][i % 6] }} />
                      <span style={{ color: COLORS.text, fontSize: 14 }}>{c.chain}</span>
                    </div>
                    <span style={{ color: COLORS.textMuted, fontFamily: "monospace", fontSize: 13 }}>{fmt(c.tvl)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Quick Thesis Progress */}
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 12px", fontSize: 16 }}>Thesis Progress</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${(thesisItems.filter((t) => t.done).length / thesisItems.length) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`, borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 14 }}>{thesisItems.filter((t) => t.done).length}/{thesisItems.length}</span>
          </div>
          <p style={{ color: COLORS.textMuted, fontSize: 12, margin: 0 }}>Track milestones in the Thesis Tracker tab</p>
        </Card>
      </div>
    );
  };

  const renderSecuritize = () => (
    <div>
      <SectionHeader title="Securitize / RWA Vault Monitoring" subtitle="Ethereum L1 â ERC-4626 vault metrics" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
        {Object.entries(MOCK_VAULT_DATA).map(([name, data]) => (
          <Card key={name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ color: COLORS.text, margin: 0, fontSize: 18 }}>{name}</h3>
                <code style={{ color: COLORS.textDim, fontSize: 10 }}>{VAULT_ADDRESSES[name]?.slice(0, 10)}...{VAULT_ADDRESSES[name]?.slice(-6)}</code>
              </div>
              <Badge color={data.utilization > 50 ? COLORS.green : COLORS.orange}>{data.utilization}% utilized</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { l: "TVL", v: fmt(data.tvl) },
                { l: "Depositors", v: data.depositors },
                { l: "Supply APY", v: `${data.supplyAPY}%` },
                { l: "Borrow APY", v: `${data.borrowAPY}%` },
                { l: "APY Spread", v: `${(data.borrowAPY - data.supplyAPY).toFixed(1)}%` },
                { l: "24h Transfers", v: data.transfers24h },
              ].map((item) => (
                <div key={item.l}>
                  <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>{item.l}</div>
                  <div style={{ color: COLORS.text, fontSize: 16, fontWeight: 600, fontFamily: "monospace" }}>{item.v}</div>
                </div>
              ))}
            </div>
            {/* Utilization bar */}
            <div style={{ marginTop: 16 }}>
              <div style={{ height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${data.utilization}%`, height: "100%", background: data.utilization > 70 ? COLORS.green : data.utilization > 40 ? COLORS.orange : COLORS.red, borderRadius: 3 }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Combined Securitize Vault TVL</h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
          <div>
            <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>Combined TVL</div>
            <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700 }}>{fmt(Object.values(MOCK_VAULT_DATA).reduce((a, b) => a + b.tvl, 0))}</div>
          </div>
          <div>
            <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>Avg Utilization</div>
            <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700 }}>{(Object.values(MOCK_VAULT_DATA).reduce((a, b) => a + b.utilization, 0) / 3).toFixed(1)}%</div>
          </div>
          <div>
            <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>Total Depositors</div>
            <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700 }}>{Object.values(MOCK_VAULT_DATA).reduce((a, b) => a + b.depositors, 0)}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={Object.entries(MOCK_VAULT_DATA).map(([name, d]) => ({ name, tvl: d.tvl / 1e6 }))}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="name" stroke={COLORS.textDim} tick={{ fontSize: 12 }} />
            <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v.toFixed(2)}M`, "TVL"]} />
            <Bar dataKey="tvl" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 style={{ color: COLORS.text, margin: "0 0 8px", fontSize: 16 }}>Data Sources</h3>
        <div style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.8 }}>
          <div>â¢ Etherscan: ERC-4626 <code style={{ color: COLORS.accent }}>totalAssets()</code>, <code style={{ color: COLORS.accent }}>totalSupply()</code></div>
          <div>â¢ DefiLlama API: TVL aggregation</div>
          <div>â¢ Euler subgraph: vault utilization, borrow/supply rates</div>
          <div>â¢ Securitize DS token contract: transfer event tracking</div>
        </div>
      </Card>
    </div>
  );

  const renderProtocol = () => (
    <div>
      <SectionHeader title="Protocol-Wide Health Metrics" subtitle="TVL, revenue, and risk monitoring across all chains" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Aggregate TVL" value={liveData.tvl ? fmt(liveData.tvl) : "â"} icon="ð¦" change={3.2} sub="All chains" />
        <StatCard label="Daily Revenue" value="$75.7K" icon="ð°" change={8.5} sub="Protocol fees" />
        <StatCard label="Q1 2025 Fees" value="$4.39M" icon="ð" />
        <StatCard label="Active Vaults" value="142" icon="ð" change={5.1} sub="EVK deployments" />
        <StatCard label="EulerSwap Peak" value="$1.8B" icon="ð" sub="July 2025 volume" />
        <StatCard label="Bad Debt Events" value="1" icon="â ï¸" sub="Stream Finance" color={COLORS.orange} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Daily Protocol Revenue (30d)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueMock}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="date" stroke={COLORS.textDim} tick={{ fontSize: 10 }} interval={4} />
              <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}K`} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v.toFixed(1)}K`, "Revenue"]} />
              <Bar dataKey="value" fill={COLORS.green} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>FeeFlow Auction & Revenue</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { l: "Avg Auction Price", v: "$12.4K", c: COLORS.green },
              { l: "Auction Frequency", v: "Weekly", c: COLORS.accent },
              { l: "EUL from Fees", v: "28,500", c: COLORS.primary },
              { l: "Reserve Fee Rate", v: "5%", c: COLORS.orange },
              { l: "Annual Run Rate", v: "$27.6M", c: COLORS.green },
              { l: "Project Revenue", v: "$10K/day", c: COLORS.accent },
            ].map((item) => (
              <div key={item.l} style={{ padding: 12, background: `${item.c}08`, borderRadius: 8, border: `1px solid ${item.c}20` }}>
                <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>{item.l}</div>
                <div style={{ color: item.c, fontSize: 18, fontWeight: 700, marginTop: 4 }}>{item.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Risk Curators â TVL Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            layout="vertical"
            data={[
              { name: "KPK Finance", tvl: 320 },
              { name: "Gauntlet", tvl: 280 },
              { name: "Re7 Labs", tvl: 195 },
              { name: "MEV Capital", tvl: 105 },
              { name: "Others", tvl: 80 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis type="number" stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
            <YAxis dataKey="name" type="category" stroke={COLORS.textDim} tick={{ fontSize: 12 }} width={100} />
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v}M`, "TVL"]} />
            <Bar dataKey="tvl" fill={COLORS.secondary} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderToken = () => {
    const p = liveData.price;
    return (
      <div>
        <SectionHeader title="EUL Token On-Chain Analytics" subtitle="Accumulation signals, exchange flows, and governance activity" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
          <StatCard label="Price" value={p ? `$${p.usd?.toFixed(4)}` : "â"} change={p?.change24h} />
          <StatCard label="Circulating" value={p?.circulatingSupply ? fmtNum(p.circulatingSupply) : "â"} sub="EUL tokens" />
          <StatCard label="Total Supply" value={p?.totalSupply ? fmtNum(p.totalSupply) : "â"} sub="2.718% max annual inflation" />
          <StatCard label="DAO Treasury" value="~27%" sub="of total supply" icon="ðï¸" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* CEX Flows */}
          <Card>
            <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>CEX Net Flows (24h)</h3>
            {MOCK_CEX_FLOWS.map((ex) => {
              const net = ex.outflow - ex.inflow;
              const isOutflow = net > 0;
              return (
                <div key={ex.exchange} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}20` }}>
                  <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 500 }}>{ex.exchange}</span>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ color: COLORS.red, fontSize: 12 }}>In: {fmtNum(ex.inflow)}</span>
                    <span style={{ color: COLORS.green, fontSize: 12 }}>Out: {fmtNum(ex.outflow)}</span>
                    <Badge color={isOutflow ? COLORS.green : COLORS.red}>{isOutflow ? "â" : "+"}{fmtNum(Math.abs(net))} net</Badge>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 12, padding: 12, background: `${COLORS.green}10`, borderRadius: 8, border: `1px solid ${COLORS.green}30` }}>
              <div style={{ color: COLORS.green, fontSize: 14, fontWeight: 600 }}>
                Total Net Outflow: {fmtNum(MOCK_CEX_FLOWS.reduce((a, b) => a + (b.outflow - b.inflow), 0))} EUL
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>Net outflows signal accumulation (self-custody)</div>
            </div>
          </Card>

          {/* Whale Tracking */}
          <Card>
            <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Top Wallet Movements</h3>
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              <MiniTable
                headers={["Wallet", "Balance", "7d Î", "30d Î"]}
                rows={MOCK_WHALE_WALLETS.map((w) => [
                  w.label,
                  fmtNum(w.balance),
                  <span style={{ color: w.change7d >= 0 ? COLORS.green : COLORS.red }}>{w.change7d >= 0 ? "+" : ""}{fmtNum(w.change7d)}</span>,
                  <span style={{ color: w.change30d >= 0 ? COLORS.green : COLORS.red }}>{w.change30d >= 0 ? "+" : ""}{fmtNum(w.change30d)}</span>,
                ])}
              />
            </div>
          </Card>
        </div>

        {/* Governance */}
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Governance & Staking</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { l: "Gauge Staked EUL", v: "4.2M", sub: "eToken staking for rewards", c: COLORS.primary },
              { l: "rEUL Distribution", v: "Active", sub: "Nov 2024 proposal", c: COLORS.green },
              { l: "Snapshot Participation", v: "34%", sub: "Last vote turnout", c: COLORS.accent },
              { l: "Active Delegates", v: "48", sub: "+6 this month", c: COLORS.secondary },
              { l: "Forum Proposals", v: "3 Active", sub: "Including Securitize RFC", c: COLORS.orange },
              { l: "Next Mint Window", v: "Q3 2026", sub: "2.718% max inflation", c: COLORS.pink },
            ].map((item) => (
              <div key={item.l} style={{ padding: 14, background: `${item.c}08`, borderRadius: 8, border: `1px solid ${item.c}20` }}>
                <div style={{ color: COLORS.textDim, fontSize: 11, textTransform: "uppercase" }}>{item.l}</div>
                <div style={{ color: item.c, fontSize: 20, fontWeight: 700, marginTop: 4 }}>{item.v}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderDerivatives = () => {
    const d = MOCK_DERIVATIVES;
    const signals = [
      { signal: "OI rising + price flat", interpretation: "Buildup before move", status: "active" },
      { signal: "Negative funding + price rising", interpretation: "Short squeeze potential", status: "warning" },
      { signal: "OI declining + price rising", interpretation: "Organic spot buying (strong)", status: "inactive" },
      { signal: "High OI/mcap + positive funding", interpretation: "Overleveraged longs (fragile)", status: "inactive" },
    ];
    return (
      <div>
        <SectionHeader title="Derivatives & Market Microstructure" subtitle="Perpetual futures, order book depth, and signal interpretation" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
          <StatCard label="Open Interest" value={fmt(d.openInterest)} change={d.oiChange24h} icon="ð" />
          <StatCard label="Funding Rate" value={`${d.fundingRate}%`} icon="ð¹" sub={d.fundingRate < 0 ? "Shorts paying â squeeze setup" : "Longs paying"} color={d.fundingRate < 0 ? COLORS.red : COLORS.green} />
          <StatCard label="Long/Short Ratio" value={d.longShortRatio.toFixed(2)} icon="âï¸" sub={d.longShortRatio < 1 ? "More shorts than longs" : "More longs"} />
          <StatCard label="Basis (Perp vs Spot)" value={`${d.basis}%`} icon="ð" sub={d.basis < 0 ? "Perp discount = bearish" : "Perp premium = bullish"} />
          <StatCard label="24h Liquidations" value={fmt(d.liquidation24h)} icon="ð¥" />
          <StatCard label="OI/MCap Ratio" value={liveData.price?.mcap ? `${((d.openInterest / liveData.price.mcap) * 100).toFixed(1)}%` : "â"} icon="â¡" sub="High = leveraged" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <Card>
            <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Open Interest (30d)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={oiMock}>
                <defs>
                  <linearGradient id="oiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="date" stroke={COLORS.textDim} tick={{ fontSize: 10 }} interval={4} />
                <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v.toFixed(1)}M`, "OI"]} />
                <Area type="monotone" dataKey="value" stroke={COLORS.accent} fill="url(#oiGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Spot Market Depth</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { l: "Binance Spread", v: "0.08%", c: COLORS.green },
                { l: "Coinbase Spread", v: "0.12%", c: COLORS.green },
                { l: "2% Bid Depth", v: "$420K", c: COLORS.accent },
                { l: "2% Ask Depth", v: "$380K", c: COLORS.orange },
                { l: "Uni V3 Liquidity", v: "$2.1M", c: COLORS.primary },
                { l: "DEX/CEX Ratio", v: "18%", c: COLORS.secondary },
              ].map((item) => (
                <div key={item.l} style={{ padding: 12, background: `${item.c}08`, borderRadius: 8, border: `1px solid ${item.c}20` }}>
                  <div style={{ color: COLORS.textDim, fontSize: 10, textTransform: "uppercase" }}>{item.l}</div>
                  <div style={{ color: item.c, fontSize: 18, fontWeight: 700, marginTop: 4 }}>{item.v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Signal Interpretation Matrix</h3>
          {signals.map((s) => (
            <div key={s.signal} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <div>
                <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 500 }}>{s.signal}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{s.interpretation}</div>
              </div>
              <Badge color={s.status === "active" ? COLORS.green : s.status === "warning" ? COLORS.orange : COLORS.textDim}>
                {s.status === "active" ? "â Active" : s.status === "warning" ? "â Forming" : "â Inactive"}
              </Badge>
            </div>
          ))}
        </Card>
      </div>
    );
  };

  const renderComparative = () => (
    <div>
      <SectionHeader title="Comparative / Relative Value" subtitle="Peer protocol benchmarks â Euler vs Morpho vs Aave vs Spark" />
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Protocol Comparison Table</h3>
        <MiniTable
          headers={["Protocol", "MCap ($M)", "FDV ($M)", "TVL ($M)", "Rev 30d ($M)", "RWA TVL ($M)", "MC/TVL", "Rev Multiple"]}
          rows={PEER_DATA.map((p) => [
            <span style={{ fontWeight: 600, color: p.name === "Euler" ? COLORS.primary : COLORS.text }}>{p.name}</span>,
            p.mcap || "N/A",
            p.fdv || "N/A",
            p.tvl.toLocaleString(),
            p.revenue30d.toFixed(2),
            p.rwaTvl,
            p.mcTvl ? p.mcTvl.toFixed(3) : "N/A",
            p.revMultiple ? `${p.revMultiple.toFixed(1)}x` : "N/A",
          ])}
        />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>TVL Comparison</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PEER_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="name" stroke={COLORS.textDim} tick={{ fontSize: 12 }} />
              <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}B` : `${v}M`}`} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
              <Bar dataKey="tvl" name="TVL ($M)" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>RWA TVL Comparison</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PEER_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="name" stroke={COLORS.textDim} tick={{ fontSize: 12 }} />
              <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
              <Bar dataKey="rwaTvl" name="RWA TVL ($M)" fill={COLORS.accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Key Valuation Ratios</h3>
        <div style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 8px" }}><strong style={{ color: COLORS.text }}>MC/TVL</strong> â Euler's ratio ({PEER_DATA[0].mcTvl.toFixed(3)}) is comparable to Morpho ({PEER_DATA[1].mcTvl.toFixed(3)}). Convergence upward would signal institutional re-rating.</p>
          <p style={{ margin: "0 0 8px" }}><strong style={{ color: COLORS.text }}>Revenue Multiple</strong> â Euler at {PEER_DATA[0].revMultiple.toFixed(1)}x vs Aave at {PEER_DATA[2].revMultiple.toFixed(1)}x. Lower multiple = cheaper relative to revenue.</p>
          <p style={{ margin: 0 }}><strong style={{ color: COLORS.text }}>RWA TVL Share</strong> â Euler at {((PEER_DATA[0].rwaTvl / PEER_DATA[0].tvl) * 100).toFixed(1)}% of TVL in RWA. Growth here is the primary thesis driver.</p>
        </div>
      </Card>
    </div>
  );

  const renderMacro = () => (
    <div>
      <SectionHeader title="Macro & Contextual Signals" subtitle="RWA market growth, governance calendar, and sentiment" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total RWA Market" value="$18.2B" icon="ð" change={15.3} sub="RWA.xyz aggregate" />
        <StatCard label="ACRED AUM" value="$1.2B" icon="ðï¸" change={8.7} sub="Apollo tokenized credit" />
        <StatCard label="sBUIDL AUM" value="$2.1B" icon="ð¦" change={22.1} sub="BlackRock treasury fund" />
        <StatCard label="Securitize Platform" value="$4.2B+" icon="ð" change={5.0} sub="Total AUM" />
      </div>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Total Tokenized RWA Market (90d)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={rwaMarketMock}>
            <defs>
              <linearGradient id="rwaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="date" stroke={COLORS.textDim} tick={{ fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis stroke={COLORS.textDim} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}B`} />
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} formatter={(v) => [`$${v.toFixed(1)}B`, "RWA Market"]} />
            <Area type="monotone" dataKey="value" stroke={COLORS.green} fill="url(#rwaGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Governance Calendar</h3>
          {[
            { event: "KPK Reserve Fee Proposal", status: "Voting", date: "Mar 2026", color: COLORS.orange },
            { event: "XP Season 4 Rules", status: "Discussion", date: "Q2 2026", color: COLORS.accent },
            { event: "Synthetic USD Launch", status: "In Development", date: "TBD", color: COLORS.primary },
            { event: "Securitize Market Expansion", status: "RFC Active", date: "Mar 2026", color: COLORS.green },
          ].map((item) => (
            <div key={item.event} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <div>
                <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 500 }}>{item.event}</div>
                <div style={{ color: COLORS.textDim, fontSize: 12 }}>{item.date}</div>
              </div>
              <Badge color={item.color}>{item.status}</Badge>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Sentiment & Social</h3>
          {[
            { metric: "CT Social Volume", value: "Medium", trend: "â", color: COLORS.accent },
            { metric: "Forum Engagement", value: "High", trend: "â", color: COLORS.green },
            { metric: "Research Coverage", value: "Growing", trend: "â", color: COLORS.primary },
            { metric: "Discord Activity", value: "Moderate", trend: "â", color: COLORS.orange },
          ].map((item) => (
            <div key={item.metric} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <span style={{ color: COLORS.text, fontSize: 14 }}>{item.metric}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Badge color={item.color}>{item.value}</Badge>
                <span style={{ color: item.trend === "â" ? COLORS.green : COLORS.textDim, fontSize: 16 }}>{item.trend}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div>
      <SectionHeader title="Alert Framework" subtitle="High-priority signals and monitoring triggers" />
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "high", "medium", "info", "low"].map((type) => (
          <button key={type} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.text, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
            {type === "all" ? `All (${MOCK_ALERTS.length})` : type}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {MOCK_ALERTS.map((alert) => {
          const colors = { high: COLORS.red, medium: COLORS.orange, info: COLORS.accent, low: COLORS.textDim };
          const ac = colors[alert.type];
          return (
            <Card key={alert.id} style={{ borderLeft: `4px solid ${ac}`, opacity: alert.active ? 1 : 0.6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Badge color={ac}>{alert.type.toUpperCase()}</Badge>
                    {alert.active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, display: "inline-block" }} />}
                    <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 600 }}>{alert.title}</span>
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 13 }}>{alert.message}</div>
                </div>
                <span style={{ color: COLORS.textDim, fontSize: 12, whiteSpace: "nowrap" }}>{alert.time}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 style={{ color: COLORS.text, margin: "0 0 16px", fontSize: 16 }}>Alert Configuration</h3>
        <MiniTable
          headers={["Alert", "Trigger", "Significance"]}
          rows={[
            ["ecACRED vault deposit >$1M", "Vault deposit event", "Validates partnership"],
            ["EUL CEX net outflow >500K", "Exchange flow tracking", "Smart money positioning"],
            ["Funding rate <-0.05% 24h", "Perp market monitoring", "Squeeze setup"],
            ["New whale wallet >100K EUL", "Token holder analysis", "Institutional accumulation"],
            ["KPK fee proposal passes", "Snapshot vote result", "Vault competitiveness"],
            ["Bad debt in Securitize vault", "Vault health monitor", "Risk materialization"],
            ["Treasury disbursement >100K", "DAO treasury tracking", "Potential sell pressure"],
            ["Delegation spike >500K votes", "Governance monitoring", "Influence building"],
          ]}
        />
      </Card>
    </div>
  );

  const renderThesis = () => {
    const categories = { governance: COLORS.orange, adoption: COLORS.green, price: COLORS.primary, sentiment: COLORS.pink, product: COLORS.accent, valuation: COLORS.secondary };
    const completed = thesisItems.filter((t) => t.done).length;
    const total = thesisItems.length;
    return (
      <div>
        <SectionHeader title="Thesis Tracking Scorecard" subtitle="Binary milestones for the RWA institutional adoption thesis" />
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 20 }}>
            <div style={{ position: "relative", width: 100, height: 100 }}>
              <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke={COLORS.border} strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={COLORS.primary} strokeWidth="8" strokeDasharray={`${(completed / total) * 251.2} 251.2`} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ color: COLORS.text, fontSize: 24, fontWeight: 700 }}>{completed}</span>
                <span style={{ color: COLORS.textDim, fontSize: 11 }}>of {total}</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: COLORS.text, margin: "0 0 4px", fontSize: 20 }}>Thesis Completion</h3>
              <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 13 }}>
                {completed === 0 ? "No milestones achieved yet â early stage thesis" : completed < 4 ? "Early signals forming â monitoring closely" : completed < 7 ? "Thesis gaining traction â key milestones hit" : "Strong thesis confirmation â most milestones achieved"}
              </p>
            </div>
          </div>

          {thesisItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleThesis(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 12px",
                borderBottom: `1px solid ${COLORS.border}20`,
                cursor: "pointer",
                transition: "background 0.15s",
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: `2px solid ${item.done ? COLORS.green : COLORS.border}`,
                  background: item.done ? COLORS.green : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {item.done && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>â</span>}
              </div>
              <span style={{ color: item.done ? COLORS.textMuted : COLORS.text, fontSize: 14, textDecoration: item.done ? "line-through" : "none", flex: 1 }}>{item.text}</span>
              <Badge color={categories[item.category]}>{item.category}</Badge>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ color: COLORS.text, margin: "0 0 12px", fontSize: 16 }}>Data Infrastructure</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { name: "Dune Analytics", use: "Custom vault dashboards, token flows" },
              { name: "Nansen / Arkham", use: "Smart money labeling, exchange flows" },
              { name: "CoinGlass", use: "OI, funding rates, liquidation maps" },
              { name: "DefiLlama", use: "TVL, revenue, protocol comparison" },
              { name: "Etherscan API", use: "Token holders, contract events" },
              { name: "Euler Subgraph", use: "Vault utilization, rates" },
              { name: "RWA.xyz", use: "Tokenized asset market tracking" },
              { name: "Governance Forum", use: "Real-time proposal monitoring" },
            ].map((item) => (
              <div key={item.name} style={{ padding: 12, background: `${COLORS.primary}08`, borderRadius: 8, border: `1px solid ${COLORS.primary}15` }}>
                <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>{item.use}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderSection = () => {
    const map = {
      overview: renderOverview,
      securitize: renderSecuritize,
      protocol: renderProtocol,
      token: renderToken,
      derivatives: renderDerivatives,
      comparative: renderComparative,
      macro: renderMacro,
      alerts: renderAlerts,
      thesis: renderThesis,
    };
    return map[activeSection]?.() || null;
  };

  // âââ MAIN RENDER ââââââââââââââââââââââââââââââââââââââââââââââââââ
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.card}, ${COLORS.bg})`, borderBottom: `1px solid ${COLORS.border}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              EUL Protocol Intelligence
            </h1>
            <div style={{ color: COLORS.textDim, fontSize: 11, marginTop: 2 }}>Institutional RWA Adoption & Token Accumulation Signals</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {liveData.price && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: `${COLORS.primary}15`, borderRadius: 8, border: `1px solid ${COLORS.primary}30` }}>
              <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700 }}>EUL ${liveData.price.usd?.toFixed(4)}</span>
              <span style={{ color: liveData.price.change24h >= 0 ? COLORS.green : COLORS.red, fontSize: 12, fontWeight: 600 }}>
                {liveData.price.change24h >= 0 ? "â²" : "â¼"} {Math.abs(liveData.price.change24h || 0).toFixed(2)}%
              </span>
            </div>
          )}
          <button
            onClick={fetchLiveData}
            style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.textMuted, fontSize: 12, cursor: "pointer" }}
          >
            â» Refresh
          </button>
          {lastRefresh && <span style={{ color: COLORS.textDim, fontSize: 11 }}>{lastRefresh.toLocaleTimeString()}</span>}
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar Nav */}
        <nav style={{ width: 200, borderRight: `1px solid ${COLORS.border}`, padding: "16px 0", flexShrink: 0, background: `${COLORS.card}80`, position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto" }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 20px",
                border: "none",
                background: activeSection === s.id ? `${COLORS.primary}20` : "transparent",
                color: activeSection === s.id ? COLORS.primary : COLORS.textMuted,
                fontSize: 13,
                fontWeight: activeSection === s.id ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                borderLeft: activeSection === s.id ? `3px solid ${COLORS.primary}` : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
          <div style={{ padding: "20px 20px 0", borderTop: `1px solid ${COLORS.border}`, marginTop: 12 }}>
            <div style={{ color: COLORS.textDim, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Live Sources</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: liveData.price ? COLORS.green : COLORS.red }} />
              <span style={{ color: COLORS.textDim, fontSize: 11 }}>CoinGecko</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: liveData.tvl ? COLORS.green : COLORS.red }} />
              <span style={{ color: COLORS.textDim, fontSize: 11 }}>DefiLlama</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.orange }} />
              <span style={{ color: COLORS.textDim, fontSize: 11 }}>Mock Data</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: 24, overflowY: "auto", maxWidth: 1200 }}>
          {renderSection()}
          <div style={{ color: COLORS.textDim, fontSize: 11, textAlign: "center", marginTop: 40, paddingBottom: 20, borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
            EUL Protocol Intelligence Dashboard â Framework by Joel @ ms2capital â Last updated: March 2026
            <br />
            Live data: CoinGecko + DefiLlama | Mock data indicated where applicable | Auto-refreshes every 2 minutes
          </div>
        </main>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.textDim}; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
