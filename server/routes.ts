import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { execFile } from "child_process";
import { join } from "path";
import { readFileSync, statSync, createReadStream } from "fs";
import * as fs from "fs";
import { sampleArticles } from "../client/src/types/newsletter";
import { db, verifyDbConnection } from "../db/index";
import { subscribers } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

interface MarketPrice {
  price: number;
  change24h: number;
}

interface MarketData {
  crypto: {
    BTC: MarketPrice;
    ETH: MarketPrice;
  };
  stocks: {
    BBRI: MarketPrice;
    TLKM: MarketPrice;
    ASII: MarketPrice;
    BBCA: MarketPrice;
    AAPL: MarketPrice;
    MSFT: MarketPrice;
    GOOGL: MarketPrice;
    TSLA: MarketPrice;
  };
  indices: {
    IHSG: MarketPrice;
    'S&P500': MarketPrice;
    NASDAQ: MarketPrice;
    DJI: MarketPrice;
    NIKKEI: MarketPrice;
    HSI: MarketPrice;
  };
  forex: {
    'USD/IDR': MarketPrice;
  };
}

// Yahoo Finance symbols mapping
const SYMBOLS = {
  crypto: {
    BTC: 'BTC-USD',
    ETH: 'ETH-USD'
  },
  stocks: {
    BBRI: 'BBRI.JK',
    TLKM: 'TLKM.JK',
    ASII: 'ASII.JK',
    BBCA: 'BBCA.JK',
    AAPL: 'AAPL',
    MSFT: 'MSFT',
    GOOGL: 'GOOGL',
    TSLA: 'TSLA'
  },
  indices: {
    IHSG: '^JKSE',
    'S&P500': '^GSPC',
    NASDAQ: '^IXIC',
    DJI: '^DJI',
    NIKKEI: '^N225',
    HSI: '^HSI'
  },
  forex: {
    'USD/IDR': 'IDR=X'
  }
};

class MarketDataCache {
  private cache: {
    timestamp: number;
    data: MarketData;
  };

  constructor() {
    this.cache = {
      timestamp: 0,
      data: this.getInitialData()
    };
  }

  private getInitialData(): MarketData {
    const defaultPrice = { price: 0, change24h: 0 };
    return {
      crypto: {
        BTC: defaultPrice,
        ETH: defaultPrice
      },
      stocks: {
        BBRI: defaultPrice,
        TLKM: defaultPrice,
        ASII: defaultPrice,
        BBCA: defaultPrice,
        AAPL: defaultPrice,
        MSFT: defaultPrice,
        GOOGL: defaultPrice,
        TSLA: defaultPrice
      },
      indices: {
        IHSG: defaultPrice,
        'S&P500': defaultPrice,
        NASDAQ: defaultPrice,
        DJI: defaultPrice,
        NIKKEI: defaultPrice,
        HSI: defaultPrice
      },
      forex: {
        'USD/IDR': defaultPrice
      }
    };
  }

  async get(): Promise<MarketData> {
    const now = Date.now();
    if (now - this.cache.timestamp < 30000) { // 30 second cache
      return this.cache.data;
    }

    try {
      const data = await this.fetchFreshData();
      this.cache = {
        timestamp: now,
        data
      };
      return data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      if (this.cache.data) {
        return this.cache.data; // Return stale data if available
      }
      throw error;
    }
  }

  private async fetchFreshData(): Promise<MarketData> {
    const allSymbols = [
      ...Object.values(SYMBOLS.crypto),
      ...Object.values(SYMBOLS.stocks),
      ...Object.values(SYMBOLS.indices),
      ...Object.values(SYMBOLS.forex)
    ].join(',');

    try {
      // Updated Yahoo Finance API integration with enhanced headers and error handling
      const response = await axios.get('https://query2.finance.yahoo.com/v8/finance/quote', {
        params: {
          symbols: allSymbols,
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

      if (!response.data?.quoteResponse?.result) {
        console.error('Invalid response format from Yahoo Finance:', response.data);
        throw new Error('Invalid response format from Yahoo Finance API');
      }

      const quotes = response.data.quoteResponse.result;
      const quoteMap = new Map(quotes.map((quote: any) => [quote.symbol, quote]));

      const mapQuote = (symbol: string): MarketPrice => {
        const quote = quoteMap.get(symbol) as any;
        if (!quote?.regularMarketPrice) {
          console.warn(`No valid price data for symbol: ${symbol}`);
          return { price: 0, change24h: 0 };
        }
        return {
          price: Number(quote.regularMarketPrice) || 0,
          change24h: Number(quote.regularMarketChangePercent) || 0
        };
      };

      return {
        crypto: {
          BTC: mapQuote(SYMBOLS.crypto.BTC),
          ETH: mapQuote(SYMBOLS.crypto.ETH)
        },
        stocks: {
          BBRI: mapQuote(SYMBOLS.stocks.BBRI),
          TLKM: mapQuote(SYMBOLS.stocks.TLKM),
          ASII: mapQuote(SYMBOLS.stocks.ASII),
          BBCA: mapQuote(SYMBOLS.stocks.BBCA),
          AAPL: mapQuote(SYMBOLS.stocks.AAPL),
          MSFT: mapQuote(SYMBOLS.stocks.MSFT),
          GOOGL: mapQuote(SYMBOLS.stocks.GOOGL),
          TSLA: mapQuote(SYMBOLS.stocks.TSLA)
        },
        indices: {
          IHSG: mapQuote(SYMBOLS.indices.IHSG),
          'S&P500': mapQuote(SYMBOLS.indices['S&P500']),
          NASDAQ: mapQuote(SYMBOLS.indices.NASDAQ),
          DJI: mapQuote(SYMBOLS.indices.DJI),
          NIKKEI: mapQuote(SYMBOLS.indices.NIKKEI),
          HSI: mapQuote(SYMBOLS.indices.HSI)
        },
        forex: {
          'USD/IDR': mapQuote(SYMBOLS.forex['USD/IDR'])
        }
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw error;
    }
  }
}

const marketDataCache = new MarketDataCache();

export function registerRoutes(app: Express): Server {
  // Verify database connection during server startup
  (async () => {
    try {
      const isConnected = await verifyDbConnection();
      if (isConnected) {
        console.log("✅ Database connection established successfully");
      } else {
        console.error("❌ Failed to connect to database");
      }
    } catch (error) {
      console.error("❌ Error verifying database connection:", error);
    }
  })();

  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    next();
  });

  app.use((req, res, next) => {
    const requestStart = Date.now();
    const originalEnd = res.end;
    const chunks: Buffer[] = [];

    res.end = function (chunk: any) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const responseTime = Date.now() - requestStart;
      const contentLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);

      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${responseTime}ms, ${contentLength} bytes)`);

      // @ts-ignore
      return originalEnd.apply(res, arguments);
    };

    next();
  });

  // Server-side rendering for article meta tags
  app.get('/newsletter/:slug', (req, res, next) => {
    const { slug } = req.params;
    const article = sampleArticles.find(a => a.slug === slug);

    if (!article) {
      next(); // Let client-side handle 404
      return;
    }

    try {
      // Read the index.html template
      let html = readFileSync(join(__dirname, '..', 'client', 'index.html'), 'utf-8');

      // Helper function to escape HTML content
      const escapeHtml = (unsafe: string) => {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };

      // Create rich preview content
      const metrics = article.previewMetrics || [];
      const metricsText = metrics.length > 0
        ? metrics.map(m => `${m.label}: ${m.value}`).join(" | ")
        : '';

      const previewTitle = escapeHtml(`${article.title} | Daily Digest`);
      const previewDescription = escapeHtml(metricsText
        ? `${metricsText}. ${article.description}`
        : article.description);

      // Define meta tags for social media previews
      const metaTags = [
        `<title>${previewTitle}</title>`,
        `<meta name="description" content="${previewDescription}">`,

        // Open Graph
        `<meta property="og:title" content="${previewTitle}">`,
        `<meta property="og:description" content="${previewDescription}">`,
        `<meta property="og:type" content="article">`,
        `<meta property="og:url" content="https://lucaxyzz-digest.replit.app/newsletter/${escapeHtml(slug)}">`,
        `<meta property="og:site_name" content="Daily Digest">`,
        `<meta property="og:locale" content="en_US">`,
        `<meta property="og:image" content="https://lucaxyzz-digest.replit.app/logo.png">`,

        // Twitter Card
        `<meta name="twitter:card" content="summary">`,
        `<meta name="twitter:site" content="@dailydigest">`,
        `<meta name="twitter:creator" content="@dailydigest">`,
        `<meta name="twitter:title" content="${previewTitle}">`,
        `<meta name="twitter:description" content="${previewDescription}">`,
        `<meta name="twitter:domain" content="lucaxyzz-digest.replit.app">`,
        `<meta name="twitter:image" content="https://lucaxyzz-digest.replit.app/logo.png">`,

        // Article Metadata
        `<meta property="article:published_time" content="${escapeHtml(article.date)}">`,
        `<meta property="article:author" content="${escapeHtml(article.author)}">`,
        `<meta property="article:section" content="${escapeHtml(article.category)}">`,
        `<meta property="article:tag" content="${escapeHtml(article.tags?.join(',') || article.category)}">`
      ].join('\n        ');

      // Find the head tag and insert meta tags right after it
      html = html.replace('<head>', `<head>\n        ${metaTags}`);

      // Set proper content type
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error('Error rendering article meta tags:', error);
      next(); // Fall back to client-side rendering
    }
  });

  app.get('/api/market-data', async (req, res) => {
    try {
      const marketData = await marketDataCache.get();
      res.json(marketData);
    } catch (error) {
      console.error('Error in /api/market-data:', error);
      res.status(500).json({
        error: 'Failed to fetch market data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Document API endpoint for secure file downloads
  app.get('/api/documents/:category/:id', (req, res) => {
    try {
      const { category, id } = req.params;
      const forceDownload = req.query.download === 'true';
      
      // Only support law documents for now
      if (category !== 'law') {
        console.log(`Document category not supported: ${category}`);
        return res.status(404).json({ error: "Document category not found" });
      }
      
      // Simple document registry - in a real app, this would be in a database
      const documentsRegistry: Record<string, { filename: string, contentType: string, title: string }> = {
        "undang-undang-nomor-1-tahun-2025": {
          filename: "UU_NO_1_2025.pdf",
          contentType: "application/pdf",
          title: "Undang-Undang Nomor 1 Tahun 2025"
        }
      };
      
      const document = documentsRegistry[id];
      if (!document) {
        console.log(`Document ID not found: ${id}`);
        return res.status(404).json({ error: "Document not found" });
      }
      
      const filePath = join(process.cwd(), "public", "documents", category, document.filename);
      
      // Check if file exists
      try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          throw new Error("Not a file");
        }
      } catch (err) {
        console.error(`File not found or not accessible: ${filePath}`, err);
        return res.status(404).json({ error: "Document file not found" });
      }
      
      // Set content type header
      res.setHeader("Content-Type", document.contentType);
      
      // Set download header only if requested
      if (forceDownload) {
        res.setHeader("Content-Disposition", `attachment; filename="${document.filename}"`);
        console.log(`Document download: ${category}/${id} (${document.title})`);
      } else {
        res.setHeader("Content-Disposition", `inline; filename="${document.filename}"`);
        console.log(`Document view: ${category}/${id} (${document.title})`);
      }
      
      // Create read stream and pipe to response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error in /api/documents:', error);
      res.status(500).json({
        error: 'Failed to fetch document',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Subscribe endpoint to collect and store emails with enhanced error handling and retry logic
  app.post('/api/subscribe', async (req, res) => {
    try {
      // Define validation schema for subscription data
      const subscribeSchema = z.object({
        email: z.string().email("Invalid email format"),
        name: z.string().optional(),
        categories: z.array(z.string()).optional().default(['market-analysis', 'financial-news'])
      });
      
      // Validate request body
      const result = subscribeSchema.safeParse(req.body);
      if (!result.success) {
        console.warn("Validation failed for subscription data:", result.error.format());
        return res.status(400).json({ 
          error: "Validation failed", 
          details: result.error.format() 
        });
      }
      
      const { email, name, categories } = result.data;
      console.log(`Processing subscription for email: ${email}, name: ${name || 'not provided'}`);
      
      // Helper function for database operations with retry
      const executeWithRetry = async (operation: () => Promise<any>, maxRetries = 3) => {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            return await operation();
          } catch (error) {
            lastError = error;
            console.error(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
            
            // If not the last attempt, wait before retrying
            if (attempt < maxRetries) {
              const delay = 500 * Math.pow(2, attempt - 1); // Exponential backoff
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
        throw lastError;
      };
      
      // Check if email already exists
      const existingSubscriber = await executeWithRetry(async () => {
        return db.select()
          .from(subscribers)
          .where(eq(subscribers.email, email))
          .limit(1);
      });
      
      if (existingSubscriber && existingSubscriber.length > 0) {
        // Email already exists, update subscription if needed
        await executeWithRetry(async () => {
          await db.update(subscribers)
            .set({ 
              subscribed: true,
              name: name || existingSubscriber[0].name,
              categories: categories || existingSubscriber[0].categories
            })
            .where(eq(subscribers.email, email));
        });
        
        console.log(`Subscription updated for email: ${email}`);
        return res.status(200).json({ 
          message: "Subscription updated successfully", 
          status: "updated" 
        });
      }
      
      // Insert new subscriber
      await executeWithRetry(async () => {
        await db.insert(subscribers).values({
          email,
          name,
          categories,
          subscribed: true
        });
      });
      
      console.log(`New subscription created for email: ${email}`);
      return res.status(201).json({
        message: "Subscription successful",
        status: "created"
      });
    } catch (error) {
      console.error("Error in subscription endpoint:", error);
      
      // Provide more specific error messages based on the type of error
      let errorMessage = "Failed to process subscription";
      let statusCode = 500;
      
      if (error instanceof Error) {
        // Check for specific database errors
        const errorString = String(error);
        if (errorString.includes('duplicate key') || errorString.includes('unique constraint')) {
          errorMessage = "This email is already subscribed";
          statusCode = 409; // Conflict
        } else if (errorString.includes('timeout') || errorString.includes('connect')) {
          errorMessage = "Database connection issue, please try again later";
        } else if (errorString.includes('validation')) {
          errorMessage = "Invalid subscription data";
          statusCode = 400;
        }
      }
      
      return res.status(statusCode).json({
        error: errorMessage,
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get all subscribers (admin only)
  app.get('/api/subscribers', async (req, res) => {
    try {
      // In a production app, you would add authentication here
      // This is for demonstration purposes only
      const allSubscribers = await db.select().from(subscribers);
      return res.status(200).json(allSubscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({
        error: "Failed to fetch subscribers",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Unsubscribe endpoint
  app.post('/api/unsubscribe', async (req, res) => {
    try {
      const unsubscribeSchema = z.object({
        email: z.string().email("Invalid email format")
      });
      
      // Validate request body
      const result = unsubscribeSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: result.error.format() 
        });
      }
      
      const { email } = result.data;
      
      // Check if email exists
      const existingSubscriber = await db.select()
        .from(subscribers)
        .where(eq(subscribers.email, email))
        .limit(1);
      
      if (existingSubscriber.length === 0) {
        return res.status(404).json({ 
          error: "Email not found", 
          message: "This email is not subscribed to our newsletter." 
        });
      }
      
      // Update subscriber status instead of deleting the record
      await db.update(subscribers)
        .set({ 
          subscribed: false 
        })
        .where(eq(subscribers.email, email));
      
      return res.status(200).json({
        message: "Successfully unsubscribed",
        status: "unsubscribed"
      });
    } catch (error) {
      console.error("Error in unsubscribe endpoint:", error);
      return res.status(500).json({
        error: "Failed to process unsubscribe request",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post('/api/dev/refresh', async (req, res) => {
    console.log('Starting environment refresh...');

    try {
      const refreshScriptPath = join(__dirname, '..', 'scripts', 'refresh.js');

      execFile('node', [refreshScriptPath], (error, stdout, stderr) => {
        if (error) {
          console.error('Error running refresh script:', error);
          return res.status(500).json({
            error: 'Failed to refresh environment',
            message: error.message,
            details: {
              stdout,
              stderr
            }
          });
        }

        if (stderr) {
          console.warn('Refresh script warnings:', stderr);
        }

        console.log('Refresh script output:', stdout);
        res.json({
          message: 'Environment refresh completed successfully',
          details: {
            stdout,
            stderr: stderr || null
          }
        });
      });
    } catch (error) {
      console.error('Error in /api/dev/refresh:', error);
      res.status(500).json({
        error: 'Failed to refresh environment',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}