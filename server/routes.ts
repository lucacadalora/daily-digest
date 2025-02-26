import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { execFile } from "child_process";
import { join } from "path";
import { readFileSync, statSync, createReadStream } from "fs";
import * as fs from "fs";
import { sampleArticles } from "../client/src/types/newsletter";

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
      
      // Set appropriate headers for download
      res.setHeader("Content-Type", document.contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${document.filename}"`);
      
      // Create read stream and pipe to response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      // Log the download
      console.log(`Document download: ${category}/${id} (${document.title})`);
    } catch (error) {
      console.error('Error in /api/documents:', error);
      res.status(500).json({
        error: 'Failed to fetch document',
        message: error instanceof Error ? error.message : 'Unknown error'
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