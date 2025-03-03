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
    image: "/images/articles/factory-smoke.jpg",
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
  const domain = getDomain();
  return `${domain}/${article.slug}`;
}

/**
 * Get the domain for URL construction
 */
function getDomain(): string {
  // In browser environment, use window.location.origin
  // In server environment, use a fallback domain
  return typeof window !== 'undefined' 
    ? window.location.origin
    : "https://market-insights.repl.app";
}

/**
 * Get the full image URL (including domain)
 */
export function getArticleImageUrl(article: ArticleConfig): string {
  const domain = getDomain();
  return `${domain}${article.image}`;
}

/**
 * Get the default site logo URL for articles without images
 */
export function getDefaultSiteLogoUrl(): string {
  const domain = getDomain();
  return `${domain}/images/default/site-logo.png`;
}