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
    slug: "trade-war-tsunami-feb-10-14",
    title: "Trade War Tsunami: China's Mineral Export Curbs Ignite IHSG Crisis",
    description: "Bank Indonesia issues stark warning as Chinese mineral export curbs destabilize Indonesia's industrial backbone, threatening nickel ambitions and IHSG stability amid escalating trade war retaliation.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 10, 2025",
    previewEmoji: "🌊",
    previewMetrics: [
      {
        label: "Nickel Price",
        value: "$15.4K",
        subtitle: "4-year low"
      },
      {
        label: "Job Losses",
        value: "2,100+",
        subtitle: "Nickel sector"
      },
      {
        label: "Price Gap",
        value: "-33%",
        subtitle: "vs global rate"
      }
    ],
    tags: ["IHSG", "Trade War", "Market Analysis", "Weekly Special"],
    content: `The Floodgates Open
Bank Indonesia (BI) issued a dire warning this week: "China's strategic mineral export curbs are destabilizing Indonesia's industrial backbone", as Beijing escalates its trade war retaliation against the West. Following President Trump's 25% tariffs on Chinese EVs and renewables, China has weaponized its dominance in critical minerals, restricting exports of tungsten, molybdenum, indium, and graphite — key inputs for defense tech, batteries, and electronics. Indonesia, reliant on Chinese refining expertise and mineral imports, now faces a supply chain crisis threatening its nickel ambitions and IHSG stability.

Mechanism: How China's Mineral War Targets Indonesia
1. China's Export Controls Redirect Supply Chain Chaos
The Trump administration's 25% tariffs on Chinese clean tech forced Beijing to retaliate with strategic mineral export curbs, disrupting global supply chains. Indonesia, home to 23% of global nickel reserves, relies on Chinese firms (e.g., Tsingshan, GEM Co.) to process 92% of its nickel into battery-grade materials. With China halting exports of tungsten (critical for alloy production) and molybdenum (used in steel), Indonesian smelters like ANTM and INCO face production paralysis.

Impact:
Nickel Price Crash: Global nickel prices slumped to $15,400/ton (near 4-year lows) as Chinese buyers withhold orders.
Smelter Shutdowns: PT Virtue Dragon's $1.2B nickel plant halted operations, laying off 2,100 workers.

2. Price Manipulation and Market Capture
Chinese firms exploit Indonesia's reliance on their refining technology to suppress prices and dominate supply chains:
Oligopsony Tactics: Chinese buyers collude to purchase nickel ore at $28/ton (vs. global $42/ton), squeezing margins for ADRO and PTBA.
Tech Dependence: China controls 85% of Indonesia's high-pressure acid leaching (HPAL) technology, critical for EV battery production.
Example: PT Trimegah Bangun Persada (ANTM) reported Q4 2024 losses of $120M after China slashed nickel orders by 40%.

3. Policy Paralysis Amid Crisis
Jakarta's countermeasures remain fragmented:
Export Ban Delays: A proposed 2025 ban on raw nickel exports (to boost domestic refining) stalled due to lobbying by Chinese-backed firms.
BI's Dilemma: With USDIDR at 16,450, BI's Feb 11 emergency meeting may hike rates 25bps to 6.00%, but this risks stifling growth.`
  },
  {
    slug: "fed-balance-sheet-blueprint",
    title: "Fed's QT Exit: A Liquidity Lifeline for Risk Assets",
    description: "The Federal Reserve's accelerated QT and strategic pivot signal a shift from austerity to equilibrium, with implications for equities and crypto markets through 2025.",
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
    description: "A comprehensive analysis of Indonesia's critical mineral reserves and their strategic importance in global supply chains, focusing on nickel, copper, and rare earth elements.",
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