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
    description: "President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant industries and foreign-owned equities stand in the crossfire.",
    category: "Economics",
    source: "Daily Digest",
    author: "Luca Cada Lora",
    date: "February 2, 2025",
    content: `President Trump's 25% tariffs on Canada/Mexico and 10% on China risk triggering a retaliatory spiral, with Beijing likely to counter with targeted measures on US goods and allies. Indonesia's export-reliant industries and foreign-owned equities stand in the crossfire, threatening to push the IHSG below critical support levels.

## IHSG Implications

### Limited Retaliation Scenario
- China imposes symbolic tariffs (e.g., luxury goods)
- IHSG Range-bound (7,000–7,215)

### Moderate Escalation Scenario
- Rare earth/tech restrictions + yuan devaluation
- Test 6,956 support level

### Full Trade War Scenario
- Broad tariffs, supply chain decoupling
- 6,721–6,900 (15% YTD drop)

## Critical Thresholds
- 6,900: Psychological support level; breached in August 2024 during initial Trump tariff threats
- Foreign Sell-Off Catalyst: Net equity outflows (-Rp 397.7B in Jan 2025) could accelerate, mirroring 2024's $31B EM capital flight

## China's Retaliatory Playbook

- Tech Restrictions: Beijing may limit rare earth exports critical for US tech manufacturing, disrupting Indonesia's $2.11B nickel export pipeline to China
- Agricultural Tariffs: Soybean or palm oil levies could pressure Indonesia's CPO exports (25% global market share), already weakened by EU deforestation rules
- Currency Devaluation: A weaker yuan (CNY) risks competitive devaluations across ASEAN, pressuring USDIDR toward 16,300–16,500

## Sectoral Vulnerabilities

### Commodity Exporters
- ADRO, PTBA: Coal prices face dual pressure from China's demand slump and US tariffs
- AALI, LSIP: Palm oil exporters risk margin compression if China imposes retaliatory levies

## Investor Action Plan

### Defensive Positioning
- Shift to KLBF (healthcare) and TLKM (telecom) for stability
- Hedge USDIDR exposure via BI's SRBI bonds (6.25% yield)

## The Bottom Line
A US-China trade war remains the #1 systemic risk for the IHSG this week. Investors must brace for volatility, with 6,900 acting as a critical line in the sand. Regulatory agility (BI's $140B forex reserves) and domestic demand resilience could mitigate losses, but proactive risk management is non-negotiable.

Sources: IDX, Kontan, CNBC Indonesia, Previous Analysis
© 2025 Market Analysis Report`
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