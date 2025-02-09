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
    slug: "weekly-special-feb-10-14",
    title: "Weekly Special: Market Reality Check (February 10-14, 2025)",
    description: "Our February 3-7 Market Alert proved prescient as IHSG breached critical support levels, with commodity sectors experiencing significant pressure and defensive plays showing mixed resilience.",
    category: "Markets",
    source: "Weekly Special",
    author: "Luca Cada Lora",
    date: "February 10, 2025",
    previewEmoji: "📊",
    previewMetrics: [
      {
        label: "IHSG Drop",
        value: "-5.16%",
        subtitle: "WoW decline"
      },
      {
        label: "Support Level",
        value: "6,752",
        subtitle: "As predicted"
      },
      {
        label: "Foreign Outflow",
        value: "Rp3.8T",
        subtitle: "Weekly total"
      }
    ],
    tags: ["IHSG", "Market Analysis", "Weekly Special", "Technical Analysis"],
    content: `Previously on Weekly Special February 3–7, 2025

Our February 3–7 Market Alert proved prescient across three critical dimensions:

IHSG Support Breach
Predicted: 6,721–6,900 range under "Full Trade War" scenario.
Actual: Index collapsed to 6,752.57 (-5.16% WoW), breaching 6,900 in 3 sessions.
Key Drivers:
Trump's 25% tariffs on Canada/Mexico triggered risk-off sentiment.
CNY devaluation pressured USDIDR to 16,450.

Sectoral Divergence
Sector Prediction Outcome Source
Commodities "Bloodbath" expected Energy -7.6%, ADRO -12%
Defensives (KLBF) Resilient initially +7.44% intraweek, then -1.7%

Currency & Macro
USDIDR: Reached 16,450 (vs projected 16,300–16,500).
Reserves: Dropped $1.4B to $138.6B, limiting BI's response.

Intermezzo: Last Week's Market Reality Check

What Our Analysis Nailed
6,900 Breach: Occurred exactly as modeled, with foreign outflows surging to Rp 3.8T.
Commodity Collapse: Coal prices fell to $73/ton, crushing ADRO (-12%) and PTBA (-9%).
Defensive Flaw: KLBF's intraweek rally (+7.44%) validated its defensive role, but systemic panic later erased gains.

Where We Underestimated
Speed of Collapse: 6,900 breached in 3 days vs projected 5-day timeline.
KLBF's Limits: Sector-wide healthcare decline (-1.7% WoW) exposed defensive vulnerabilities.

Conclusion: Precision Amid Chaos
Our original analysis:
✅ Correctly flagged 6,900 as the critical threshold.
✅ Accurately predicted commodity sector vulnerabilities (ADRO, AALI).
⚠️ Underestimated KLBF's sensitivity to systemic panic despite strong fundamentals.

Lesson: While macro forecasts proved reliable, liquidity crunches amplified sell-offs beyond technical projections.`
  },
  {
    slug: "fed-balance-sheet-blueprint",
    title: "Fed's QT Exit: A Liquidity Lifeline for Risk Assets",
    description: "The Federal Reserve has accelerated its quantitative tightening (QT) program, cutting its balance sheet by $2 trillion since 2022—including a rapid $297B reduction since June 2024. This pace exceeds earlier Wall Street estimates (JPMorgan projected $1.7T total by 2024) and signals aggressive liquidity withdrawal.",
    category: "Economics",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 9, 2025",
    previewEmoji: "🏦",
    previewMetrics: [
      {
        label: "Balance Sheet Cut",
        value: "$2T",
        subtitle: "Since 2022"
      },
      {
        label: "S&P Target",
        value: "6,000+",
        subtitle: "Q3 2025"
      },
      {
        label: "BTC Projection",
        value: "$120K",
        subtitle: "Late 2025"
      }
    ],
    tags: ["Federal Reserve", "Monetary Policy", "QT", "Risk Assets"],
    content: `Fed's QT Exit: A Liquidity Lifeline for Risk Assets
February 9, 2025 | Markets Desk

The Fed's Balance Sheet Blueprint: Faster QT, Strategic Pivot

The Federal Reserve has accelerated its quantitative tightening (QT) program, cutting its balance sheet by $2 trillion since 2022—including a rapid $297B reduction since June 2024. This pace exceeds earlier Wall Street estimates (JPMorgan projected $1.7T total by 2024) and signals aggressive liquidity withdrawal.

Critically, the Fed now explicitly plans to halt QT when reserves reach "somewhat above" ample levels—a nuanced shift from prior "just above" guidance. This buffer aims to prevent a replay of 2019's repo market stress while maintaining policy flexibility. Projections align with a mid-2025 endpoint, contingent on reserve balances (currently ~10-11% of GDP).

Market Implications: The Liquidity Thaw

Equities: S&P 500 Poised for Breakout
* Tech/Growth Leadership: Reduced liquidity drag and stable reserves favor rate-sensitive sectors. The S&P 500 could retest 6,000+ by Q3 2025 if inflation cools as projected.
* Sector Opportunities: AI infrastructure (semiconductors, data centers), renewables, and small-caps likely outperform as credit conditions ease.
* Valuation Support: Fed liquidity safeguards (Standing Repo Facility) mitigate systemic risk, allowing P/E multiples to expand despite elevated rates.

Crypto: Bitcoin's Macro Catalyst
* Bitcoin: Historically inverse to real yields, BTC could target $120K by late 2025 as QT ends. Institutional inflows via ETFs may accelerate post-Fed pivot.
* Ethereum: ETH/BTC ratio likely rebounds with risk appetite; regulatory clarity (SEC's SAB 122) reduces custody friction for banks.
* High-Beta Plays: SOL, DOGE, and AI-linked tokens (FET, RNDR) may surge if retail FOMO returns.

The Hidden Risk: Faster QT ≠ Tighter Policy

While the Fed's balance sheet shrinks faster than anticipated, strategic tools soften the blow:
* ON RRP Usage Collapse: Dropped from $2.55T (2023) to $78B, redirecting liquidity to private markets.
* Productivity Buffer: Business-sector productivity grew 1.97% in 2024—above pre-pandemic trends—supporting non-inflationary growth.
* Labor Market Stability: Unemployment flatlined at 4.1%, wage growth cooled to 3.6% YoY—a Goldilocks backdrop for corporates.

Actionable Scenarios
1. Soft Landing (60%)
   * Inflation cools to 2.4%
   * S&P +15%, Tech rallies
   * BTC $100K, ETH $6K

2. Early Pivot (25%)
   * Unemployment >4.5% by Q1'25
   * Small-caps surge 30%
   * Altcoins (SOL +50%)

3. Stagflation (15%)
   * Oil spikes >$100/bbl
   * Defensives outperform
   * BTC tests $60K, stablecoins

Risks to Monitor
* Geopolitical Shock: Middle East conflict or Taiwan escalation could spike oil, delaying QT exit.
* Inflation Stickiness: Core services (3.5% YoY) remain stubborn; hot CPI print >3% would reset rate cut bets.
* Crypto Regulation: SEC Chair Gensler's lingering hostility to DeFi remains a sector headwind.

The Bottom Line

The Fed's QT exit marks a structural shift from austerity to equilibrium—bullish for risk assets but requiring nimble positioning. Investors should:
* Overweight: Tech (NVDA, META), Bitcoin miners (RIOT), AI infrastructure plays
* Avoid: Regional banks, commercial REITs facing refinancing walls
* Watch: March FOMC meeting for updated dot plots; CME FedWatch odds now price 40bps cuts by December

Key Balance Sheet Metrics & Trajectory
Current State (February 2025):
* Total Assets: $7.2 trillion (-15% YoY)
* Securities Portfolio: $5.8T Treasuries, $1.2T MBS
* Duration: 6.2 years weighted average maturity
* Monthly Runoff: $95B/month ($60B UST + $35B MBS)

2024 Balance Sheet Evolution:
* Q1: -$392B (-5.2% QoQ)
* Q2: -$315B (-4.4% QoQ)
* Q3: -$298B (-4.3% QoQ)
* Q4: -$295B (-4.5% QoQ)

Strategic Pivot: Faster QT, Higher Terminal
The Fed's accelerated QT reflects three strategic imperatives:

1. Inflation Management
* Core PCE steady at 2.9% despite rate restrictiveness
* Wage growth remains elevated at 4.2% YoY
* Housing services inflation sticky at 5.2%

2. Financial Stability
* Bank reserves at $3.2T (comfortable above $2.5T minimum)
* Money market functioning intact despite faster runoff
* No signs of Treasury market stress (bid-ask spreads normal)

3. Policy Flexibility
* Creates room for rate cuts if needed in H2-25
* Reduces political pressure on monetary decisions
* Better aligns with global central bank normalization

Market Impact & Technical Dynamics
Treasury Market Effects:
* Long-end yields +15bps on faster QT announcement
* 5s30s curve bear steepened to 65bps
* Primary dealer positions down 22% YoY

MBS Market Reaction:
* Option-adjusted spreads widen 8bps
* Convexity hedging adds to long-end pressure
* Bank demand remains weak amid QT

Transmission to Risk Assets:
* SPX -0.8% on announcement day
* HY spreads +25bps wider
* EM sovereign spreads +15bps

Policy Outlook & Scenario Analysis
Base Case (65% probability):
* Continue $95B/month pace through 2025
* Terminal balance sheet ~$6.0T by end-2025
* First rate cut in September 2025

Hawkish Risk (25%):
* Accelerate to $115B/month in H2
* Faster MBS sales if housing stays hot
* No rate cuts in 2025

Dovish Risk (10%):
* Slow to $65B/month if markets stress
* Pause QT before rate cuts begin
* Multiple rate cuts starting Q2

Critical Variables to Monitor
Inflation Dynamics:
* Core services at 3.5% YoY; hot CPI print >3% would reset rate cut expectations
* Wage growth moderation needed
* Housing services disinflation pace

Financial Conditions:
* Bank reserves adequacy ($2.5T floor)
* Treasury market depth metrics
* Cross-currency basis swaps

Economic Impact:
* GDP growth sensitivity to QT
* Credit availability/lending standards
* Housing market reaction

Implementation Challenges & Considerations
Operational Complexities:
1. MBS reinvestment caps require active management
2. Treasury auction sizes may need adjustment
3. Intraday liquidity demands increasing

Market Communication:
* Forward guidance on terminal size
* Contingency plans for stress scenarios
* Coordination with Treasury debt management

Policy Coordination:
* Fiscal deficit funding needs
* International spillover effects
* Emergency facility wind-down

Strategic Recommendations
For Investors:
1. Duration: Maintain neutral stance, look to add at 4.5% 10y
2. Curve: Steepener positions offer positive carry
3. MBS: Prefer up-in-coupon given convexity risk

For Policymakers:
1. Enhance Treasury market monitoring
2. Develop stress testing scenarios
3. Update emergency facility frameworks

The Bottom Line
The Fed's accelerated balance sheet reduction represents a critical test of market resilience and policy transmission. While current conditions support the faster pace, flexibility remains key given the unprecedented nature of QT at this scale. Success will require careful monitoring of financial stability indicators and continued clear communication of policy intentions.

This strategic pivot reinforces the Fed's commitment to sustainable inflation control while creating policy space for future cycles. However, the interaction between QT and eventual rate cuts will require deft management to avoid market disruption.

This newsletter synthesizes the Federal Reserve's February 2025 Monetary Policy Report, Bloomberg consensus forecasts, and proprietary analytics. Not investment advice. Want deeper analysis? Reply with your portfolio focus for tailored insights.`
  },
  {
    slug: "indonesia-economic-inventory-crisis",
    title: "Indonesia's Growth Paradox: The Inventory-Led Crisis of 2025",
    description: "Indonesia's economic narrative faces a dramatic shift as markets punish inventory-dependent growth, with the Jakarta Composite Index suffering its worst single-day performance in eight months amid revelations of unsustainable inventory accumulation.",
    category: "Economics",
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
    content: `Indonesia's economic narrative took a dramatic turn in early 2025, as financial markets delivered a brutal verdict on the nation's inventory-dependent growth model. The Jakarta Composite Index's 2.1% plunge on February 6 - its worst single-day performance in eight months - served as exclamation point to revelations that 19% of 2024's 5.03% GDP growth came from unsustainable inventory accumulation, creating a dangerous economic paradox now coming home to roost.
The House of Cards: How Inventory Artifice Boosted Growth
2024's Growth Mirage:
* Coal stockpiling: 14.2% production surge vs 4.7% exports → 28MT surplus (18 days' output)
* Strategic miscalculations: 166% QoQ rice imports created 2.3MT excess reserves
* Manufacturing glut: Electronics/components inventory at 22% of sector GDP

This inventory overhang - contributing 0.97pp to GDP - masked fundamental weaknesses now exposed by three converging forces:

Crisis Catalysts:
* Fed Hawkishness: Rp14,900/USD → $317M foreign outflows (Dollarized inventory financing costs up 22%)
* China Tariffs: ADRO -4.2% (28MT coal exposure) as export bottleneck compounds stockpiles
* Earnings Shock: BMRI -3.5% (14% profit drop) as inventory impairments hit bank balance sheets

Sectoral Reckoning: From Growth Driver to Liability
Banking Sector (-1.75%):
* BMRI's manufacturing NPL ratio hit 4.1% (Q4-24) vs 2.8% YoY
* Inventory-linked loans reached 18% of corporate credit portfolio

Basic Materials (-1.95%):
* KRAS steel inventories at 22% sales ratio → 5.2% share drop
* TPIA petrochemical stockpiles at 45-day cover (-6.9% session loss)

Automotive Crisis:
* ASII inventories hit 1.8M units (+37% YoY) → 4.3% plunge
* 22% of dealer lots now holding >90 days' supply

The Great Unwind: Scenarios & Strategic Imperatives
Inventory Normalization Pathways:
* Managed Drawdown (55%): -0.4-0.6pp GDP impact, 5-7% EPS contraction
* Fire Sale (30%): -0.8-1.0pp GDP impact, 12-15% EPS collapse
* Stagnation (15%): +0.2pp GDP impact, Chronic 3-4% annual drag

Critical Crossroads for Policymakers:
1. Monetary Tightrope: BI's 25bps cut risks stoking inventory inflation (current 2.1% carrying costs)
2. Fiscal Reallocation: Prabowo's welfare shift could divert Rp45T from inventory-heavy sectors
3. SOE Rescue Plan: Mandatory inventory purchases for infrastructure projects under consideration

Market Technicals: The Chart of Capitulation
The IHSG's breakdown below 6,900 (critical Fibonacci support) suggests:
* Immediate target 6,750 (-2.8% from current)
* Resistance now at 7,150 (200-day MA)
* Volume surge to Rp18.4T (145% of 30-day avg) confirms distribution

This technical damage mirrors fundamental realities - 14% of manufacturing loans turning substandard, while inventory carrying costs consume 7.2% of corporate cash flow (vs 4.1% 5-year avg).

The Path Forward: From Inventory Arithmetic to Demand Economics
Strategic pivots must address both symptoms and causes:

Immediate Term (Q1-25):
* Emergency export subsidies for coal/steel inventories (est. Rp7.2T cost)
* Temporary tax holiday for inventory-to-investment conversion

Structural Reform:
1. Demand-Side Stimulus: Shift from rice stockpiling to direct nutrition vouchers
2. Manufacturing Upgrade: 30% tax credit for Industry 4.0 adoption in glut sectors
3. Commodity Hedge Fund: SOE-led buffer stock mechanism with ASEAN partners

While the inventory reckoning has exposed near-term vulnerabilities, it also creates opportunity - successful normalization could catalyze 7.6% NGDP growth through reflationary effects. However, as February's market tantrum proved, Indonesia can no longer afford growth models built on warehouse arithmetic rather than genuine economic value creation.`
  },
  {
    slug: "indonesia-mineral-criticality-matrix",
    title: "Indonesia's Mineral Criticality Matrix: Strategic and Supply Chain Perspectives",
    description: "A comprehensive analysis of Indonesia's critical mineral reserves and their strategic importance in global supply chains, with focus on nickel, copper, and rare earth elements.",
    category: "Industries",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 4, 2025",
    previewEmoji: "⛏️",
    previewMetrics: [
      {
        label: "GDP Contribution",
        value: "8.3%",
        subtitle: "of National GDP"
      },
      {
        label: "Export Share",
        value: "15%",
        subtitle: "of Total Exports"
      },
      {
        label: "Domestic Processing",
        value: "60%",
        subtitle: "Processed Locally"
      }
    ],
    tags: ["Mining", "Supply Chain", "Commodities"],
    content: `[Content from the mineral criticality matrix article]`
  },
  {
    slug: "us-china-trade-war-impact-ihsg",
    title: "US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900",
    description: "President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical support levels.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 2, 2025",
    previewEmoji: "🚨",
    previewMetrics: [
      {
        label: "IHSG Support",
        value: "6,900-6,956",
        subtitle: "Critical level"
      },
      {
        label: "Risk Sectors",
        value: "Cyclicals",
        subtitle: "Trade exposure"
      },
      {
        label: "Defensive Picks",
        value: "UNVR, KLBF",
        subtitle: "Domestic focus"
      }
    ],
    tags: ["IHSG", "Trade War", "Market Analysis"],
    content: `[Trade War Analysis Content]`
  },
  {
    slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
    title: "Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse",
    description: "Analysis of BBRI's potential 30-40% total return opportunity through dividends and valuation re-rating.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "January 30, 2025",
    previewEmoji: "💰",
    previewMetrics: [
      {
        label: "Dividend Yield",
        value: "8.4%",
        subtitle: "2025 Forecast"
      },
      {
        label: "P/E Ratio",
        value: "10.3x",
        subtitle: "46% discount"
      },
      {
        label: "Upside",
        value: "30-40%",
        subtitle: "Total return"
      }
    ],
    tags: ["BBRI", "Banking", "Dividends"],
    content: "Full article content here..."
  },
  {
    slug: "softbank-openai-investment",
    title: "SoftBank in Talks to Invest Up to $25 Billion in OpenAI",
    description: "Meta Gains After Zuckerberg Predicts 'Really Big Year' in AI",
    category: "Tech",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "January 29, 2025",
    previewEmoji: "🤖",
    previewMetrics: [
      {
        label: "Deal Size",
        value: "$25B",
        subtitle: "Proposed"
      },
      {
        label: "Valuation",
        value: "$100B+",
        subtitle: "Post-money"
      },
      {
        label: "AI Market",
        value: "↑ 42%",
        subtitle: "YoY Growth"
      }
    ],
    tags: ["OpenAI", "SoftBank", "AI"],
    content: "Full article content here..."
  }
];