/**
 * Central Articles Configuration
 * 
 * This file contains the master configuration for all articles in the system.
 * Adding a new article only requires adding an entry to this configuration.
 */

import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().optional(), // For simple articles, content can be provided directly
  image: z.string(), // Path to the image
  imageAlt: z.string().optional(),
  author: z.string(),
  publishedDate: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  slug: z.string(), // URL path
  featured: z.boolean().default(false),
  imageWidth: z.number().optional(),
  imageHeight: z.number().optional(),
  summary: z.string().optional(), // Shorter than description, for teasers
});

export type ArticleConfig = z.infer<typeof articleSchema>;

/**
 * Master list of all articles
 * Adding a new article only requires adding a new entry here
 */
export const articles: ArticleConfig[] = [
  {
    id: "saving-usd-50-billion-pp-no-8-2025",
    title: "Saving USD 50 Billion: How PP No 8 2025 Could Transform Indonesia's Liquidity",
    description: "Analysis of how Indonesia's PP No 8 2025 regulation aims to consolidate state cash management, potentially freeing up to USD 50 billion in liquidity through systematic reforms of government institution cash management.",
    image: "/images/articles/cash-management.jpg",
    imageAlt: "Financial documents and charts representing government cash management",
    author: "Luca Cada Lora",
    publishedDate: "March 5, 2025",
    category: "Economics",
    tags: ["Government Policy", "Liquidity", "Economic Reform", "Indonesia"],
    slug: "newsletter/saving-usd-50-billion-pp-no-8-2025",
    featured: true,
    imageWidth: 1200,
    imageHeight: 630,
    summary: "How Indonesia's new regulation could unlock USD 50 billion through improved cash management."
  },
  {
    id: "global-coal-price-slump",
    title: "Global Coal's Price Slump Masks Brewing Supply Crisis and Potential Price Surge",
    description: "Today's depressed coal prices conceal brewing market tensions that may drive significant price increases in the medium term as investment shortfalls, shifting trade patterns, and increasing Asian demand create a perfect storm for supply constraints.",
    image: "/images/articles/coal-barges.jpeg",
    imageAlt: "Coal barges in Indonesia awaiting shipment",
    author: "Luca Cada Lora",
    publishedDate: "March 3, 2025",
    category: "Commodities",
    tags: ["Coal", "Energy", "Commodities", "Supply Chain"],
    slug: "latest/global-coal-price-slump",
    featured: true,
    imageWidth: 1200,
    imageHeight: 630,
    summary: "Analysis reveals why today's coal price slump may precede a significant supply-driven rally."
  },
  {
    id: "china-steel-reform",
    title: "China's Steel Sector: 'Supply Reform 2.0' Looms",
    description: "China's billion-ton steel industry faces unprecedented consolidation and capacity reduction pressures as environmental regulations tighten and authorities target excess production to meet decarbonization goals.",
    image: "/images/articles/china-steel.png",
    imageAlt: "Chinese steel factory with smokestacks",
    author: "Financial Markets Team",
    publishedDate: "February 28, 2025",
    category: "Markets",
    tags: ["China", "Steel", "Manufacturing", "Commodities"],
    slug: "latest/china-steel-reform",
    featured: false,
    imageWidth: 1200,
    imageHeight: 630,
    summary: "China's steel sector faces consolidation and capacity cuts as 'Supply Reform 2.0' shapes industry outlook."
  }
];

/**
 * Utility function to get article by ID
 */
export function getArticleById(id: string): ArticleConfig | undefined {
  return articles.find(article => article.id === id);
}

/**
 * Utility function to get article by slug
 */
export function getArticleBySlug(slug: string): ArticleConfig | undefined {
  const normalizedSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  return articles.find(article => {
    const articleSlug = article.slug.startsWith('/') ? article.slug.substring(1) : article.slug;
    return articleSlug === normalizedSlug;
  });
}

/**
 * Get the full article URL (including domain)
 */
export function getArticleUrl(article: ArticleConfig): string {
  // Use the appropriate domain based on environment
  const domain = typeof window !== 'undefined' ? 
    (import.meta.env.PROD ? "https://market-insights.repl.app" : window.location.origin)
    : "https://market-insights.repl.app";
    
  return `${domain}/${article.slug}`;
}

/**
 * Get the full image URL (including domain)
 */
export function getArticleImageUrl(article: ArticleConfig): string {
  const domain = typeof window !== 'undefined' ? 
    (import.meta.env.PROD ? "https://market-insights.repl.app" : window.location.origin)
    : "https://market-insights.repl.app";
    
  return `${domain}${article.image}`;
}