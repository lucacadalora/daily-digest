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
    slug: "bank-rakyat-indonesia-undervalued-dividend-powerhouse",
    title: "Bank Rakyat Indonesia: The Undervalued Dividend Powerhouse",
    description: "Analysis of BBRI's potential 30-40% total return opportunity through dividends and valuation re-rating.",
    category: "Markets",
    source: "Wall Street Journal",
    author: "Luca Cada Lora",
    date: "January 30, 2025",
    content: "Full article content here..."
  },
  {
    slug: "indonesia-tech-sector-growth",
    title: "Indonesia's Tech Sector: The Next Growth Engine",
    description: "Exploring the rapid growth of Indonesia's tech ecosystem and investment opportunities.",
    category: "Tech",
    source: "TechCrunch",
    author: "Sarah Chen",
    date: "January 29, 2025",
    content: "Full article content here..."
  },
  {
    slug: "manufacturing-recovery-southeast-asia",
    title: "Manufacturing Recovery in Southeast Asia",
    description: "Analysis of the manufacturing sector's recovery and its impact on regional economies.",
    category: "Industries",
    source: "Bloomberg",
    author: "Michael Roberts",
    date: "January 28, 2025",
    content: "Full article content here..."
  },
  {
    slug: "economic-outlook-2025",
    title: "Economic Outlook 2025: Southeast Asia's Momentum",
    description: "Comprehensive analysis of economic trends and forecasts for Southeast Asian economies.",
    category: "Economics",
    source: "Financial Times",
    author: "David Wong",
    date: "January 27, 2025",
    content: "Full article content here..."
  }
];
