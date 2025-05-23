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

    // Fetch from Yahoo Finance with updated headers and error handling
    const response = await axios.get(`https://query2.finance.yahoo.com/v8/finance/quote`, {
      params: {
        symbols: symbol,
        fields: 'regularMarketPrice,regularMarketChangePercent,shortName',
        region: 'US',
        lang: 'en-US',
        corsDomain: 'finance.yahoo.com'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://finance.yahoo.com',
        'Referer': 'https://finance.yahoo.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      },
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: function (status) {
        return status >= 200 && status < 300 || status === 302;
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
    // Use the server's API endpoint instead of direct Perplexity API access
    // This way we use the server's API key which is properly configured
    // Try multiple endpoints with fallback mechanism
    let response: Response | undefined;
    let error: Error | unknown;
    
    // Try the chat endpoint first
    try {
      response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query })
      });
      
      if (response.ok) {
        console.log('Connected via /chat endpoint');
      }
    } catch (err) {
      console.error('First endpoint failed:', err);
      error = err;
    }
    
    // If first attempt failed, try the /api/chat endpoint
    if (!response || !response.ok) {
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query })
        });
        
        if (response.ok) {
          console.log('Connected via /api/chat endpoint');
        }
      } catch (err) {
        console.error('Second endpoint failed:', err);
        error = err;
      }
    }
    
    // If all attempts failed, throw the last error
    if (!response || !response.ok) {
      throw error || new Error('Failed to connect to chat endpoints');
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.error || 'Failed to get market analysis');
    }
    
    // Log successful model and endpoint details if available
    if (data.model || data.endpoint) {
      console.log(`Successfully received response from API using model: ${data.model || 'unknown'}, endpoint: ${data.endpoint || 'unknown'}`);
    }
    
    return data.reply;
  } catch (error) {
    console.error("Error getting market analysis:", error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}