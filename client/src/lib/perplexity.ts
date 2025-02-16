import { z } from "zod";
import axios from "axios";

export const perplexityResponseSchema = z.object({
  id: z.string(),
  model: z.string(),
  object: z.string(),
  created: z.number(),
  citations: z.array(z.string()),
  choices: z.array(z.object({
    index: z.number(),
    finish_reason: z.string(),
    message: z.object({
      role: z.string(),
      content: z.string()
    }),
    delta: z.object({
      role: z.string(),
      content: z.string()
    })
  })),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number()
  })
});

export type PerplexityResponse = z.infer<typeof perplexityResponseSchema>;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Cache for stock prices
const priceCache = new Map<string, { price: number; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute cache

export async function getCurrentStockPrice(symbol: string): Promise<number | null> {
  try {
    // Check cache first
    const cached = priceCache.get(symbol);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.price;
    }

    // Fetch from Yahoo Finance
    const response = await axios.get(`https://query2.finance.yahoo.com/v8/finance/quote`, {
      params: {
        symbols: symbol,
        fields: 'regularMarketPrice,regularMarketChangePercent'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (response.data?.quoteResponse?.result?.[0]?.regularMarketPrice) {
      const price = response.data.quoteResponse.result[0].regularMarketPrice;
      priceCache.set(symbol, { price, timestamp: Date.now() });
      return price;
    }

    return null;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
}

export async function getMarketAnalysis(query: string): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "You are a market analyst providing concise, data-driven insights about global markets, economics, and technology trends. Focus on key metrics and actionable insights."
    },
    {
      role: "user",
      content: query
    }
  ];

  // Extract stock symbols from query (e.g., BBRI.JK, TLKM.JK)
  const stockSymbols = query.match(/[A-Z]{2,}\.?[A-Z]{0,2}/g) || [];

  // Fetch current prices for mentioned stocks
  const prices = await Promise.all(
    stockSymbols.map(async symbol => {
      const price = await getCurrentStockPrice(symbol);
      return { symbol, price };
    })
  );

  // Add price data to the message if available
  if (prices.length > 0) {
    const priceInfo = prices
      .filter(p => p.price !== null)
      .map(p => `${p.symbol}: ${p.price}`)
      .join(', ');

    if (priceInfo) {
      messages[1].content += `\nCurrent prices: ${priceInfo}`;
    }
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-huge-128k-online",
        messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 500,
        frequency_penalty: 1,
        search_domain_filter: ["perplexity.ai"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month"
      })
    });

    if (!response.ok) {
      throw new Error("Failed to get market analysis");
    }

    const data = await response.json();
    const validatedData = perplexityResponseSchema.parse(data);
    return validatedData.choices[0].message.content;
  } catch (error) {
    console.error("Error getting market analysis:", error);
    throw error;
  }
}