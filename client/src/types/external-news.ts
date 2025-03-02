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
    title: "China's Steel Sector: 'Supply Reform 2.0' Looms",
    source: "Bloomberg",
    author: "",
    publishedDate: "March 2, 2025",
    url: "/external/china-steel-supply-reform",
    imageUrl: "/latest/china-steel.png",
    category: "Markets",
    timestamp: Date.now() - 1000 * 60 * 60 * 3 // 3 hours ago
  }
];