import { z } from "zod";

export const categorySchema = z.enum([
  "Markets",
  "Economics",
  "Industries",
  "Tech"
]);

export type Category = z.infer<typeof categorySchema>;

export const articleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: categorySchema,
  source: z.string(),
  author: z.string(),
  date: z.string(),
  content: z.string(),
  featured: z.boolean().optional(),
  previewMetrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    subtitle: z.string(),
  })).optional(),
  previewEmoji: z.string().optional(),
  previewImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Article = z.infer<typeof articleSchema>;

export const sampleArticles: Article[] = [
  {
    slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
    title: "Bank Rakyat Indonesia: Undervalued Dividend Powerhouse",
    description: "A deep dive into BBRI's compelling valuation discount and 8.4% dividend yield potential for 2025. Analysis of digital banking growth and state policy tailwinds.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 1, 2025",
    previewEmoji: "🏦",
    previewMetrics: [
      {
        label: "P/E Ratio",
        value: "10.3x",
        subtitle: "46% Below Peers"
      },
      {
        label: "Dividend Yield",
        value: "8.4%",
        subtitle: "2025 Forecast"
      },
      {
        label: "Net Profit",
        value: "+12% YoY",
        subtitle: "Q3 2024"
      }
    ],
    tags: ["Banking", "Dividends", "BBRI", "Stock Analysis"],
    content: `In a market where yield-hungry investors are scrambling for stable returns, Bank Rakyat Indonesia (IDX: BBRI) has emerged as a compelling anomaly: a blue-chip stock trading at a steep discount to intrinsic value while offering one of Asia's highest dividend yields. Our analysis of financial disclosures, analyst models, and macroeconomic trends reveals why this state-backed lender could deliver 30–40% total returns in 2025 through a rare combination of income and growth.

At IDR 4,190 per share, BBRI trades at a trailing P/E of 10.3x — a 46% discount to its Indonesian banking peers (14.7x) and nearly half the valuation of regional counterparts like Malaysia's CIMB (19.1x). This disparity becomes starker when contextualized against fundamentals:

Profit Growth: Net profit rose 12% YoY in Q3 2024 to IDR 16.2T, driven by a 34% surge in fee-based income from digital transactions and microloans.

Asset Quality: Gross NPL ratio held steady at 2.8% (vs. industry average 3.1%), with 89% of its IDR 1,895T loan book concentrated in resilient UMKM (micro-SME) segments.

Capital Buffers: CET1 ratio of 19.4% (Dec 2024) provides ample room for dividend hikes and share buybacks.

The stock's appeal as a passive income vehicle is quantifiable:
2024 Payout: IDR 135/share interim dividend (paid Jan 15, 2025), with a final dividend expected to bring the total to IDR 300–316/share (7.1–7.5% yield).
2025 Forecast: Consensus estimates project IDR 350/share dividends (8.4% yield), supported by a government-mandated 35% payout ratio and IDR 220T in retained earnings.

Notably, BBRI has increased dividends for 8 consecutive years — a track record unmatched by Indonesian peers.

At 10.3x earnings and 1.9x book value, BBRI prices in excessive pessimism about Indonesian macro risks while ignoring its best-in-class yield, digital growth runway, and defensive SME exposure. For investors with a 12–18 month horizon, this represents a high-conviction opportunity to lock in 8%+ dividends while awaiting multiple expansion.

The stock's appeal as a passive income vehicle is quantifiable:
2024 Payout: IDR 135/share interim dividend (paid Jan 15, 2025), with a final dividend expected to bring the total to IDR 300–316/share (7.1–7.5% yield).
2025 Forecast: Consensus estimates project IDR 350/share dividends (8.4% yield), supported by a government-mandated 35% payout ratio and IDR 220T in retained earnings.

Catalysts: Rate Cuts, Digital Adoption, and Foreign Flows

Monetary Policy Tailwinds
Bank Indonesia's 25bps rate cut to 5.75% (Jan 2025) is expected to reduce BBRI's funding costs by 30–40bps, boosting net interest margins to 7.5% by Q4 2025.

Digital Banking Breakthrough
The BRI Mobile app now processes IDR 185T/month in microloan disbursements (+62% YoY), capturing 28% of Indonesia's digital lending market. Cross-selling insurance and wealth products to its 34 million users could add IDR 4.2T to 2025 non-interest income.

Foreign Institutional Demand
After a IDR 8.2T net sell-off in 2024, foreign investors turned net buyers in January 2025 (IDR 1.2T inflow), likely attracted by the IDR 4,000–4,200 support zone and yield spread over US Treasuries.

Risks: What Could Derail the Thesis?

Macro Sensitivity: 57% of BBRI's loan book is floating-rate, exposing it to BI rate volatility.
NPL Creep: Restructuring of IDR 48T in pandemic-era microloans (3.2% of total) could pressure asset quality if economic growth dips below 4.5%.
Political Pressures: As a 53% state-owned entity, BBRI faces risks of directed lending to priority sectors at suboptimal margins.

The Bottom Line
At 10.3x earnings and 1.9x book value, BBRI prices in excessive pessimism about Indonesian macro risks while ignoring its best-in-class yield, digital growth runway, and defensive SME exposure. For investors with a 12–18 month horizon, this represents a high-conviction opportunity to lock in 8%+ dividends while awaiting multiple expansion.`
  },
  {
    slug: "us-china-trade-war-impact-ihsg",
    title: "US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900",
    description: "As US-China tensions escalate with new tariffs, Indonesian markets face mounting pressure. Analysis of critical support levels and sector-specific impacts as foreign investors reassess risk exposure.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 2, 2025",
    previewEmoji: "📊",
    previewMetrics: [
      {
        label: "IHSG Support",
        value: "6,900",
        subtitle: "Critical Level"
      },
      {
        label: "Sector Risk",
        value: "Cyclicals",
        subtitle: "Most Exposed"
      },
      {
        label: "Defense Pick",
        value: "KLBF",
        subtitle: "Healthcare Shield"
      }
    ],
    tags: ["IHSG", "Trade War", "Market Strategy"],
    content: `President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical support levels.

The IHSG's 6,600–6,700 zone is this week's litmus test. While BI's rate hike and Ramadan-driven consumption (UNVR, ICBP) may offer brief respite, systemic risks from trade wars and foreign outflows demand tactical caution. A breach below 6,742 opens a path to 6,400, but oversold conditions hint at dead-cat bounces to 6,900.`
  },
  {
    slug: "trade-war-tsunami-feb-10-14",
    title: "Trade War Tsunami: Indonesia Emerges as China's Surplus Dumping Ground",
    description: "Bank Indonesia issues stark warning as Chinese goods flood Indonesian markets, threatening local industries. Analysis of critical support levels and monetary policy implications amid growing market volatility.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 10, 2025",
    previewEmoji: "🌊",
    previewMetrics: [
      {
        label: "IHSG Range",
        value: "6,742–6,900",
        subtitle: "Sideways with Bearish Bias"
      },
      {
        label: "USDIDR Crisis",
        value: "+25 bps",
        subtitle: "Near 16,500 Threshold"
      },
      {
        label: "Gold Proxy",
        value: "Buy MDKA",
        subtitle: "As Gold Nears $2,900"
      }
    ],
    tags: ["IHSG", "Trade War", "Market Analysis", "Weekly Special"],
    content: `Weekly Market Alert February 10–14, 2025

The New Narrative: Indonesia as a Chinese Surplus Dumping Ground
Bank Indonesia (BI) issued a stark warning this week: "Chinese goods barred from US markets are flooding Indonesia," threatening to overwhelm domestic industries. Key insights:

Mechanism: Trump's 10% China tariffs have redirected $48B worth of Chinese exports (textiles, electronics, ceramics) to ASEAN markets. Indonesia, with its porous import controls, absorbed 32% of this diverted volume.

Impact: Local MSMEs face existential risks. Textile producers like ERAT (-18% WoW) and ceramic firm ARTI (-23%) collapsed as Chinese imports undercut prices by 40–60%.

Policy Paralysis: Indonesia's retaliatory 200% tariffs on Chinese goods (announced Jan 2025) remain unimplemented, exposing regulatory inertia.

Defensive Pivot - Strategic Plan

Dividend Shelter: Rotate into HMSP (8.2% yield) and SMGR (6.7%).

HMSP:
Short-Term Play: High yield attractive for income, but monitor payout sustainability.
Action: Buy on dips near Rp580 (52-week low) with tight stop-loss at Rp550.

SMGR:
Long-Term Value: Undervalued at 0.5x P/S, but await infrastructure policy clarity.
Action: Accumulate below Rp2,700 (near 2025 low) for dividend + potential rebound.`
  },
  {
    slug: "fed-balance-sheet-blueprint",
    title: "Fed's QT Exit: A Liquidity Lifeline for Risk Assets",
    description: "Federal Reserve accelerates balance sheet reduction while planning strategic pivot, with implications for equities and crypto through 2025. Analysis of $2T cut since 2022 and projected market impact.",
    category: "Economics",
    featured: true,
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 9, 2025",
    previewEmoji: "🏦",
    previewMetrics: [
      {
        label: "QT Total",
        value: "$2T",
        subtitle: "Since 2022"
      },
      {
        label: "Monthly Pace",
        value: "$95B",
        subtitle: "Current Run-rate"
      },
      {
        label: "Target Level",
        value: "$6.0T",
        subtitle: "End-2025 Goal"
      }
    ],
    tags: ["Federal Reserve", "Monetary Policy", "QT", "Risk Assets"],
    content: `Fed's QT Exit: A Liquidity Lifeline for Risk Assets`
  },
  {
    slug: "indonesia-economic-inventory-crisis",
    title: "Indonesia's Growth Paradox: The Inventory-Led Crisis of 2025",
    description: "Indonesia's economic narrative faces a dramatic shift as markets punish inventory-dependent growth, with the Jakarta Composite Index suffering its worst single-day performance in eight months amid revelations of unsustainable inventory accumulation.",
    category: "Economics",
    featured: true,
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 6, 2025",
    previewEmoji: "📉",
    previewMetrics: [
      {
        label: "IHSG Drop",
        value: "-2.1%",
        subtitle: "Single-day decline"
      },
      {
        label: "GDP Growth",
        value: "5.03%",
        subtitle: "19% from inventory"
      },
      {
        label: "Coal Stockpile",
        value: "28MT",
        subtitle: "18 days' output"
      }
    ],
    tags: ["Economics", "Market Analysis", "Indonesia"],
    content: `Indonesia's economic narrative took a dramatic turn in early 2025...`
  },
  {
    slug: "indonesia-mineral-criticality-matrix",
    title: "Indonesia's Mineral Matrix: Strategic Supply Chain Analysis",
    description: "Deep dive into Indonesia's critical mineral reserves and supply chain implications, analyzing nickel, copper, and rare earth elements. Focus on economic impact and strategic positioning in global markets.",
    category: "Industries",
    featured: true,
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 4, 2025",
    previewEmoji: "⛏️",
    previewMetrics: [
      {
        label: "GDP Share",
        value: "8.3%",
        subtitle: "Mining Sector"
      },
      {
        label: "Export Share",
        value: "15%",
        subtitle: "of Total Exports"
      },
      {
        label: "Processing",
        value: "60%",
        subtitle: "Local Value Add"
      }
    ],
    tags: ["Mining", "Supply Chain", "Commodities"],
    content: `[Content from the mineral criticality matrix article]`
  }
];