import { z } from "zod";

export const newsSourceSchema = z.enum([
  "Bloomberg",
  "The Economist",
  "Financial Times",
  "Wall Street Journal",
  "Reuters",
  "CNBC",
  "Kompas",
  "Tempo"
]);

export type NewsSource = z.infer<typeof newsSourceSchema>;

export const externalNewsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  source: newsSourceSchema,
  author: z.string(),
  publishedDate: z.string(),
  url: z.string(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  timestamp: z.number().optional() // Unix timestamp for sorting
});

export type ExternalNews = z.infer<typeof externalNewsSchema>;

// Sample external news data for development/testing
export const sampleExternalNews: ExternalNews[] = [
  {
    id: "1",
    title: "Global Coal's Price Slump Masks Brewing Supply Crisis and Potential Price Surge",
    source: "Bloomberg",
    author: "Luca Cada Lora",
    publishedDate: "March 3, 2025",
    url: "/latest/global-coal-price-slump",
    imageUrl: "/latest/tongkang.jpeg",
    category: "Commodities",
    timestamp: Date.now() // Most recent
  },
  {
    id: "2",
    title: "China's Steel Sector: 'Supply Reform 2.0' Looms",
    source: "Bloomberg",
    author: "",
    publishedDate: "February 28, 2025",
    url: "/latest/china-steel-reform",
    imageUrl: "/latest/china-steel.png",
    category: "Markets",
    timestamp: Date.now() - 1000 * 60 * 60 * 72 // 3 days ago
  }
];