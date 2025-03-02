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
  },
  {
    id: "2",
    title: "Japan Unveils $30B Package to Boost Semiconductor Industry",
    source: "Financial Times",
    author: "",
    publishedDate: "March 2, 2025",
    url: "#",
    imageUrl: "/latest/japan-semiconductors.png",
    category: "Technology",
    timestamp: Date.now() - 1000 * 60 * 60 * 5 // 5 hours ago
  },
  {
    id: "3",
    title: "Indonesia's Nickel Exports Hit Record High as EV Demand Surges",
    source: "Reuters",
    author: "",
    publishedDate: "March 2, 2025",
    url: "#",
    imageUrl: "/latest/indonesia-nickel.png",
    category: "Commodities",
    timestamp: Date.now() - 1000 * 60 * 60 * 8 // 8 hours ago
  },
  {
    id: "4",
    title: "Bank Indonesia Holds Rates Steady Despite Currency Pressure",
    source: "CNBC",
    author: "",
    publishedDate: "March 1, 2025",
    url: "#",
    imageUrl: "/latest/bank-indonesia.png",
    category: "Economics",
    timestamp: Date.now() - 1000 * 60 * 60 * 12 // 12 hours ago
  },
  {
    id: "5",
    title: "US Fed Signals Slower Pace for Future Rate Cuts",
    source: "Wall Street Journal",
    author: "",
    publishedDate: "March 1, 2025",
    url: "#",
    imageUrl: "/latest/us-fed.png",
    category: "Economics",
    timestamp: Date.now() - 1000 * 60 * 60 * 16 // 16 hours ago
  },
  {
    id: "6",
    title: "Global Supply Chains: The New Geopolitical Battleground",
    source: "The Economist",
    author: "",
    publishedDate: "March 1, 2025",
    url: "#",
    imageUrl: "/latest/supply-chains.png",
    category: "Global Trade",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 // 24 hours ago
  },
  {
    id: "7",
    title: "Indonesian Tech Startups Face Funding Crunch in Q1 2025",
    source: "Kompas",
    author: "",
    publishedDate: "March 1, 2025",
    url: "#",
    imageUrl: "/latest/indonesian-startups.png",
    category: "Startup",
    timestamp: Date.now() - 1000 * 60 * 60 * 36 // 36 hours ago
  },
  {
    id: "8",
    title: "Critical Minerals: The High-Stakes Race for Battery Supply",
    source: "Bloomberg",
    author: "",
    publishedDate: "February 28, 2025",
    url: "#",
    imageUrl: "/latest/critical-minerals.png",
    category: "Energy",
    timestamp: Date.now() - 1000 * 60 * 60 * 48 // 48 hours ago
  }
];