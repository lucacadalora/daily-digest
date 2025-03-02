import { z } from "zod";

export const categorySchema = z.enum([
  "Markets",
  "Economics",
  "Industries",
  "Tech",
  "Insight"
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
    slug: "japan-economic-security-indonesia-minerals",
    title: "Strategic Supply Chain Positioning and Critical Minerals: Japan's Economic Security Strategy and Implications for Indonesia",
    description: "Analysis of Japan's economic security vulnerabilities, strategic responses, and the opportunities for Indonesia to position itself within Japan's evolving supply chain resilience framework, particularly in critical minerals.",
    category: "Economics",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "March 1, 2025",
    previewEmoji: "🔋",
    previewMetrics: [
      {
        label: "Chinese Dependency",
        value: "70%",
        subtitle: "Japan's rare earth imports"
      },
      {
        label: "Nickel Reserves",
        value: "21%",
        subtitle: "Indonesia's global share"
      },
      {
        label: "Strategic Index",
        value: "86 vs 12",
        subtitle: "Japan HHI vs G7 average"
      }
    ],
    tags: ["Economic Security", "Critical Minerals", "Japan", "Indonesia", "Supply Chain"],
    content: "Strategic Supply Chain Positioning and Critical Minerals: Japan's Economic Security Strategy and Implications for Indonesia"
  },
  {
    slug: "bumn-law-comparison",
    title: "Perbandingan UU BUMN: UU No. 19/2003 vs UU No. 1/2025",
    description: "Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.",
    category: "Insight",
    source: "Daily Digest",
    author: "Market Intelligence Team",
    date: "February 26, 2025",
    previewEmoji: "📜",
    tags: ["BUMN", "Regulatory Changes", "Indonesia", "Law"],
    content: "Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.\n\nPerubahan utama mencakup pemisahan aset BUMN dari aset negara, penerapan business judgment rule, penghapusan status eksekutif BUMN sebagai penyelenggara negara, dan pengaturan Holding Investasi dan Holding Operasional di bawah Danantara.\n\nReformasi ini membawa implikasi luas bagi operasional BUMN dan mitra bisnisnya seiring konsolidasi yang diperkirakan terjadi dalam beberapa tahun mendatang, dengan masa transisi ditetapkan selama satu tahun."
  },
  {
    slug: "indonesia-coal-dilemma",
    title: "Indonesia's Coal Dilemma: Navigating Commodity Risks in a Decarbonizing World",
    description: "Deep analysis of Indonesia's coal sector challenges amid global energy transition, examining fiscal impacts, export risks, and strategic policy options in a decarbonizing world.",
    category: "Economics",
    source: "Daily Digest",
    author: "Daily | Digest Market Analysis Team",
    date: "February 24, 2025",
    previewEmoji: "⛏️",
    previewMetrics: [
      {
        label: "Sovereign Debt Risk",
        value: "23%",
        subtitle: "GDP debt increase by 2050"
      },
      {
        label: "Export Revenue at Risk",
        value: "$30B",
        subtitle: "Annual coal exports"
      },
      {
        label: "GDP Contribution",
        value: "12%",
        subtitle: "Coal sector (2024)"
      }
    ],
    tags: ["Coal", "Energy Transition", "Economic Analysis"],
    content: "Analysis of Indonesia's coal sector challenges..."
  },
  {
    slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
    title: "Bank Rakyat Indonesia: Undervalued Dividend Powerhouse",
    description: "Deep dive into BBRI's fundamental strengths, dividend sustainability, and valuation metrics against regional peers. Focus on micro-lending moat and digital transformation.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 1, 2025",
    previewEmoji: "🏦",
    previewMetrics: [
      {
        label: "Dividend Yield",
        value: "4.8%",
        subtitle: "Sustainable Payout"
      },
      {
        label: "P/B Ratio",
        value: "1.8x",
        subtitle: "Below 5Y Avg"
      },
      {
        label: "Upside Range",
        value: "31-48%",
        subtitle: "Analyst Target"
      }
    ],
    tags: ["Banking", "Dividends", "Value Investing"],
    content: "Analysis of BRI's dividend potential..."
  },
  {
    slug: "us-china-trade-war-impact-ihsg",
    title: "US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900",
    description: "Analysis of potential market impacts as US-China trade tensions escalate, with focus on IHSG technical levels and sector-specific vulnerabilities.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 2, 2025",
    previewEmoji: "🔄",
    previewMetrics: [
      {
        label: "IHSG Support",
        value: "6,900",
        subtitle: "Critical Level"
      },
      {
        label: "Foreign Flow",
        value: "-$218M",
        subtitle: "Weekly Outflow"
      },
      {
        label: "Strategy",
        value: "Defensive",
        subtitle: "High Opportunity"
      }
    ],
    tags: ["Trade War", "Technical Analysis", "Market Risk"],
    content: "Analysis of US-China trade war impacts..."
  },
  {
    slug: "indonesia-mineral-criticality-matrix",
    title: "Indonesia's Mineral Matrix: Strategic Supply Chain Analysis",
    description: "Deep dive into Indonesia's critical mineral reserves and supply chain implications, analyzing nickel, copper, and rare earth elements. Focus on economic impact and strategic positioning in global markets.",
    category: "Industries",
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
    content: `Indonesia's economic narrative took a dramatic turn in early 2025...`
  },
  {
    slug: "fed-balance-sheet-blueprint",
    title: "Fed's QT Exit: A Liquidity Lifeline for Risk Assets",
    description: "Federal Reserve accelerates balance sheet reduction while planning strategic pivot, with implications for equities and crypto through 2025. Analysis of $2T cut since 2022 and projected market impact.",
    category: "Economics",
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
    slug: "fed-qt-exit-crypto-rally",
    title: "Crypto at Critical Junctures: Technical Analysis for BTC, ETH, SOL, and WIF's Next Moves",
    description: "Comprehensive analysis of the Federal Reserve's quantitative tightening exit strategy and its implications for crypto markets, with focus on key resistance levels and institutional flows.",
    category: "Markets",
    source: "Daily Digest",
    author: "Daily | Digest Market Analysis Team",
    date: "February 10, 2025",
    previewEmoji: "📈",
    previewMetrics: [
      {
        label: "BlackRock Dominance",
        value: "150K+ BTC",
        subtitle: "~3% BTC Supply"
      },
      {
        label: "Daily ETF Volume",
        value: "$48B",
        subtitle: "4x Gold ETFs"
      },
      {
        label: "Weekly Inflows",
        value: "$1.2B",
        subtitle: "Reverses Jan Outflow"
      }
    ],
    tags: ["Crypto", "Federal Reserve", "Technical Analysis"],
    content: "fed-qt-exit-crypto-rally"
  },
  {
    slug: "ihsg-outlook-march-3-7",
    title: "IHSG Weekly Forecast: Navigating Oversold Conditions Amid Structural Headwinds",
    description: "Analysis of IHSG's historic 7.83% weekly decline to 6,270.597, with focus on MSCI rebalancing impact, technical indicators and actionable contrarian plays amid foreign investor outflows.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "March 3, 2025",
    previewEmoji: "📉",
    previewMetrics: [
      {
        label: "IHSG Range",
        value: "6,050–6,200",
        subtitle: "Critical Support Zone"
      },
      {
        label: "MSCI Impact",
        value: "-$120M",
        subtitle: "Passive Outflows"
      },
      {
        label: "Banking Yield",
        value: "6.1–7.8%",
        subtitle: "Dividend Opportunity"
      }
    ],
    tags: ["IHSG", "Technical Analysis", "Market Strategy", "Weekly Special"],
    content: "Weekly Market Alert March 3-7, 2025\nThe IHSG enters March 2025 at a critical inflection point after a historic 7.83% weekly decline to 6,270.597, its lowest close since October 2021. Foreign investors drove the sell-off, with Rp10.22 trillion in net outflows last week alone (Rp18.98 trillion YTD), exacerbated by MSCI's reweighting of Indonesia from 2.2% to 1.5% in its EM index. While technical indicators signal oversold conditions, structural pressures from global trade risks and domestic liquidity constraints remain key headwinds."
  }
];