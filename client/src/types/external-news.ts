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
    title: "Can Gen Z Truly Opt Out of Capitalism?",
    source: "Bloomberg",
    author: "Erin Lowry",
    publishedDate: "March 2, 2025",
    url: "/external/can-gen-z-opt-out-capitalism",
    imageUrl: "/images/external/gen-z-capitalism.jpg",
    category: "Opinion",
    timestamp: Date.now() - 1000 * 60 * 30 // 30 minutes ago
  },
  {
    id: "2",
    title: "A US War with Japan? Only in 'Captain America'",
    source: "Bloomberg",
    author: "Gearoid Reidy",
    publishedDate: "March 2, 2025",
    url: "/external/us-japan-captain-america",
    imageUrl: "/images/external/us-japan.jpg",
    category: "Politics",
    timestamp: Date.now() - 1000 * 60 * 60 // 1 hour ago
  },
  {
    id: "3",
    title: "One Planet, Two Box Offices to Rule It All?",
    source: "Bloomberg",
    author: "Howard Chua-Eoan",
    publishedDate: "March 2, 2025",
    url: "/external/planet-box-offices",
    imageUrl: "/images/external/box-office.jpg",
    category: "Business",
    timestamp: Date.now() - 1000 * 60 * 90 // 1.5 hours ago
  },
  {
    id: "4",
    title: "Claiming 'Reverse Discrimination' Could Get Easier",
    source: "Bloomberg",
    author: "Stephen L. Carter",
    publishedDate: "March 2, 2025",
    url: "/external/reverse-discrimination",
    imageUrl: "/images/external/discrimination.jpg",
    category: "Politics",
    timestamp: Date.now() - 1000 * 60 * 120 // 2 hours ago
  },
  {
    id: "5",
    title: "Samsung Broadens AI Phone Lineup With $300 5G Galaxy Models",
    source: "Bloomberg",
    author: "Sohee Kim",
    publishedDate: "March 2, 2025",
    url: "/external/samsung-ai-phone",
    imageUrl: "/images/external/samsung.jpg",
    category: "Technology",
    timestamp: Date.now() - 1000 * 60 * 180 // 3 hours ago
  },
  {
    id: "6",
    title: "A Trader's Guide for China's Closely Watched Policy Meeting",
    source: "Bloomberg",
    author: "Bloomberg News",
    publishedDate: "March 2, 2025",
    url: "/external/china-policy-meeting",
    imageUrl: "/images/external/china-meeting.jpg",
    category: "Markets",
    timestamp: Date.now() - 1000 * 60 * 240 // 4 hours ago
  },
  {
    id: "7",
    title: "Israel Halts Gaza Aid After Hamas Balks at New US Truce Idea",
    source: "Bloomberg",
    author: "Jordan Fabian",
    publishedDate: "March 1, 2025",
    url: "/external/israel-gaza-truce",
    imageUrl: "/images/external/gaza.jpg",
    category: "Politics",
    timestamp: Date.now() - 1000 * 60 * 60 * 12 // 12 hours ago
  },
  {
    id: "8",
    title: "Israel 'Poised' to Defend Syrian Druze Near Damascus",
    source: "Bloomberg",
    author: "Bloomberg News",
    publishedDate: "March 1, 2025",
    url: "/external/israel-syria-druze",
    imageUrl: "/images/external/syria.jpg",
    category: "Politics",
    timestamp: Date.now() - 1000 * 60 * 60 * 14 // 14 hours ago
  },
  {
    id: "9",
    title: "Joe Sixey Shines Spotlight on London Finance Elite Into Epstein Legal Fight",
    source: "Bloomberg",
    author: "Bloomberg News",
    publishedDate: "March 1, 2025",
    url: "/external/london-finance-epstein",
    imageUrl: "/images/external/london.jpg",
    category: "Finance",
    timestamp: Date.now() - 1000 * 60 * 60 * 16 // 16 hours ago
  },
  {
    id: "10",
    title: "Singapore Corporate Insolvencies Reach Highest Since 2010",
    source: "Bloomberg",
    author: "Bloomberg News",
    publishedDate: "March 1, 2025",
    url: "/external/singapore-insolvencies",
    imageUrl: "/images/external/singapore.jpg",
    category: "Business",
    timestamp: Date.now() - 1000 * 60 * 60 * 18 // 18 hours ago
  },
  {
    id: "11",
    title: "Most Thais Not Confident in Paetongtarn's Government, Poll Shows",
    source: "Bloomberg",
    author: "Bloomberg News",
    publishedDate: "February 28, 2025",
    url: "/external/thailand-government",
    imageUrl: "/images/external/thailand.jpg",
    category: "Politics",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 // 24 hours ago
  }
];