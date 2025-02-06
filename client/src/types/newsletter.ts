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
        label: "GDP Impact",
        value: "0.97pp",
        subtitle: "From inventory"
      },
      {
        label: "NPL Ratio",
        value: "4.1%",
        subtitle: "Manufacturing sector"
      }
    ],
    tags: ["Economics", "Market Analysis", "Indonesia"],
    content: "Full article content here..."
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