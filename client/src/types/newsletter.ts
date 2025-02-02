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
});

export type Article = z.infer<typeof articleSchema>;

export const sampleArticles: Article[] = [
  {
    slug: "us-china-trade-war-impact-ihsg",
    title: "US-China Retaliation: Escalation Could Trigger IHSG Sell-Offs Below 6,900",
    description: "President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical support levels.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 2, 2025",
    content: `[Trade War Analysis Content]
      President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, 
      with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant 
      industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical 
      support levels.

      Key metrics include:
      - IHSG Support Level: 6,900-6,956 (Critical psychological support)
      - Most Impacted Sectors: Cyclicals & Basic Industries (Direct trade war exposure)
      - Defensive Opportunities: Non-Cyclicals & Finance (Domestic demand shield)

      China's Retaliatory Playbook includes:
      - Tech Restrictions: Beijing may limit rare earth exports critical for US tech manufacturing
      - Agricultural Tariffs: Soybean or palm oil levies could pressure Indonesia's CPO exports
      - Currency Devaluation: A weaker yuan risks competitive devaluations across ASEAN

      Supply Chain Spillovers affect:
      - Electronics & Auto: US-China factory relocations may sideline Indonesian suppliers
      - Commodity Demand: China's slowdown could reduce coal imports

      Bottom Line: A US-China trade war remains the #1 systemic risk for the IHSG this week.
    `
  },
  {
    slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
    title: "Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse",
    description: "Analysis of BBRI's potential 30-40% total return opportunity through dividends and valuation re-rating.",
    category: "Markets",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "January 30, 2025",
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
    content: "Full article content here..."
  },
  {
    slug: "white-house-seize-spending-power",
    title: "White House Considers Dozens of New Ways to Seize Spending Power",
    description: "Trump's Transactional Foreign Policy Leads to Flurry of Pledges",
    category: "Economics",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "January 28, 2025",
    content: "Full article content here..."
  }
];