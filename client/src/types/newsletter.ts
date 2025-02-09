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
    slug: "bbri-financial-analysis",
    title: "BBRI Q4 2024: Digital Banking Surge Masks Credit Quality Concerns",
    description: "Bank Rakyat Indonesia (BBRI) faces credit quality pressures despite digital transformation success, as micro-lending segment shows stress signals amid rising rates.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 8, 2025",
    previewEmoji: "🏦",
    previewMetrics: [
      {
        label: "NPL Ratio",
        value: "3.2%",
        subtitle: "Up from 2.8% Q3"
      },
      {
        label: "Digital Users",
        value: "32.5M",
        subtitle: "+45% YoY Growth"
      },
      {
        label: "NIM",
        value: "6.8%",
        subtitle: "-20bps QoQ"
      }
    ],
    tags: ["Banking", "Financial Analysis", "BBRI", "Featured"],
    content: `BBRI's Q4 results reveal a complex narrative...`
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