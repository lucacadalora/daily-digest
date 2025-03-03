import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
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
import { detectSocialMediaCrawler, setSocialMediaCacheHeaders } from "./utils/crawler-detection";

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
  // Special middleware to handle social media crawler requests at the highest level
  // This must be the FIRST middleware in the chain to ensure it catches crawler requests
  app.use((req, res, next) => {
    // Use our crawler detection utility to check for social media crawlers
    const { isCrawler, platform, isTwitter, isFacebook, isWhatsApp } = detectSocialMediaCrawler(req);
    
    // Get the request path and user agent
    const path = req.path;
    const userAgent = req.headers['user-agent'] || '';
    
    // Log crawler-related requests for debugging
    if (isCrawler) {
      console.log(`🤖 Social media crawler detected:`);
      console.log(`  • Platform: ${platform || 'unknown'}`);
      console.log(`  • User-Agent: ${userAgent.substring(0, 100)}`);
      console.log(`  • Path: ${path}`);
    }
    
    // Handle the China Steel Reform article for Twitter/X
    if (isTwitter && (path === '/latest/china-steel-reform' || path === '/latest/china-steel-reform/')) {
      console.log('🐦 Twitter/X client detected! Serving specialized Twitter card page...');
      
      // Set cache headers optimized for Twitter previews
      const thirtyMinutes = 30 * 60; // 30 minutes in seconds
      res.setHeader('Cache-Control', `public, max-age=${thirtyMinutes}`);
      res.setHeader('Expires', new Date(Date.now() + thirtyMinutes * 1000).toUTCString());
      
      // Add cross-origin headers to ensure Twitter can access everything
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Serve our dedicated Twitter Card HTML
      return res.sendFile(join(process.cwd(), 'public', 'twitter-card', 'steel.html'));
    }
    
    // Handle the China Steel Reform article for WhatsApp
    if (isWhatsApp && (path === '/latest/china-steel-reform' || path === '/latest/china-steel-reform/')) {
      console.log('📱 WhatsApp client detected! Serving specialized WhatsApp preview page...');
      
      // Set no-cache headers for WhatsApp to ensure fresh content
      setSocialMediaCacheHeaders(res);
      
      // Serve our WhatsApp-optimized page with Open Graph tags
      return res.sendFile(join(process.cwd(), 'public', 'shares', 'whatsapp', 'china-steel.html'));
    }
    
    // Handle the China Steel Reform article for Facebook
    if (isFacebook && (path === '/latest/china-steel-reform' || path === '/latest/china-steel-reform/')) {
      console.log('👍 Facebook client detected! Serving specialized Facebook preview page...');
      
      // Set moderate cache headers for Facebook
      const oneHour = 60 * 60; // 1 hour in seconds
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Serve our general share page which works well with Facebook
      return res.sendFile(join(process.cwd(), 'public', 'shares', 'china-steel-reform.html'));
    }
    
    // ---------- GLOBAL COAL PRICE ARTICLE SOCIAL MEDIA HANDLERS ----------
    
    // Handle the Global Coal Price article for Twitter/X
    if (isTwitter && (path === '/latest/global-coal-price-slump' || path === '/latest/global-coal-price-slump/')) {
      console.log('🐦 Twitter/X client detected for Coal article! Serving specialized Twitter card page...');
      
      // Set cache headers optimized for Twitter previews - shorter for latest news
      const fifteenMinutes = 15 * 60; // 15 minutes in seconds
      res.setHeader('Cache-Control', `public, max-age=${fifteenMinutes}`);
      res.setHeader('Expires', new Date(Date.now() + fifteenMinutes * 1000).toUTCString());
      
      // Add cross-origin headers to ensure Twitter can access everything
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Serve our dedicated Twitter Card HTML
      return res.sendFile(join(process.cwd(), 'public', 'twitter-card', 'coal.html'));
    }
    
    // Handle the Global Coal Price article for WhatsApp
    if (isWhatsApp && (path === '/latest/global-coal-price-slump' || path === '/latest/global-coal-price-slump/')) {
      console.log('📱 WhatsApp client detected for Coal article! Serving specialized WhatsApp preview page...');
      
      // Set no-cache headers for WhatsApp to ensure fresh content
      setSocialMediaCacheHeaders(res);
      
      // Serve our WhatsApp-optimized page with Open Graph tags
      return res.sendFile(join(process.cwd(), 'public', 'shares', 'whatsapp', 'coal.html'));
    }
    
    // Handle the Global Coal Price article for Facebook
    if (isFacebook && (path === '/latest/global-coal-price-slump' || path === '/latest/global-coal-price-slump/')) {
      console.log('👍 Facebook client detected for Coal article! Serving specialized Facebook preview page...');
      
      // Set moderate cache headers for Facebook
      const oneHour = 60 * 60; // 1 hour in seconds
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Serve our general share page which works well with Facebook
      return res.sendFile(join(process.cwd(), 'public', 'shares', 'coal.html'));
    }
    
    // For all other requests, continue with regular processing
    next();
  });
  
  // Configure Express to serve static files outside of Vite's control FIRST in the middleware chain
  // This ensures it catches routes before any other middleware or route handlers
  app.use('/static', express.static(join(process.cwd(), 'public', 'static'), { 
    index: false,
    extensions: ['html'],
    setHeaders: (res: Response) => {
      // Set appropriate headers for static files
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }));
  
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

  // DISABLED - now using the comprehensive crawler detection below
  // app.get('/latest/china-steel-reform', (req, res, next) => {
  //   try {
  //     // Check if the request is from a social media crawler or bot
  //     const userAgent = req.headers['user-agent'] || '';
  //     const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Googlebot|bingbot|DuckDuckBot|Slackbot|TelegramBot/i.test(userAgent);
  //     
  //     if (isCrawler) {
  //       // For social media crawlers, redirect to our static share page
  //       console.log(`[SSR] Detected crawler in user-agent: ${userAgent}`);
  //       console.log('[SSR] Redirecting to static share page');
  //       return res.redirect(302, '/share/china-steel-reform/');
  //     }
  //     
  //     // For regular users, continue with normal React app rendering
  //     next();
  //   } catch (error) {
  //     console.error('Error in China Steel Reform crawler detection:', error);
  //     next(); // Fall back to client-side rendering
  //   }
  // });
  
  // Configure direct serving for static images used in Open Graph
  app.use('/public', express.static(join(process.cwd(), 'public'), { 
    index: false,
    setHeaders: (res: Response) => {
      // Set appropriate headers for static files
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }));
  
  // Direct access to static HTML version for social sharing (both paths)
  app.get(['/share/china-steel-reform', '/share/china-steel-reform/'], (req, res) => {
    try {
      // Serve the static HTML file directly
      console.log('[Share Route] Serving static HTML for China Steel Reform');
      const filePath = join(process.cwd(), 'public', 'static', 'share', 'china-steel-reform.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Share Route] HTML file not found at path: ${filePath}`);
        return res.status(404).send('Share page not found');
      }
      
      const html = readFileSync(filePath, 'utf-8');
      console.log('[Share Route] Successfully read HTML file, length:', html.length);
      
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } catch (error) {
      console.error('Error serving China Steel Reform share page:', error);
      return res.status(500).send(`Error loading share page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Serve the steel image for Open Graph meta tag use
  app.get('/latest/china-steel.png', (req, res) => {
    try {
      console.log('[Image Route] Serving China Steel image');
      const filePath = join(process.cwd(), 'public', 'latest', 'china-steel.png');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Image Route] Image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Set cache headers based on version parameter
      if (req.query.v) {
        // If version parameter is present, set long cache time (helps with preview caching)
        res.setHeader('Cache-Control', 'public, max-age=86400, immutable'); // 24 hours
      } else {
        // Otherwise use default no-cache policy
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
      
      res.setHeader('Content-Type', 'image/png');
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving China Steel image:', error);
      return res.status(500).send(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Special Twitter-optimized image route with forced caching
  app.get('/latest/china-steel-true.png', (req, res) => {
    try {
      console.log('[Twitter Image] Serving Twitter-optimized China Steel image');
      const filePath = join(process.cwd(), 'public', 'latest', 'china-steel-true.png');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Twitter Image] Image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Special Twitter-friendly caching headers
      // Twitter seems to work better with a moderate cache time that's consistent
      // This prevents cards from disappearing after posting
      const oneDayInSeconds = 24 * 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneDayInSeconds}`);
      res.setHeader('Expires', new Date(Date.now() + oneDayInSeconds * 1000).toUTCString());
      
      // Add additional headers that help with cross-origin requests
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Vary', 'Accept-Encoding');
      res.setHeader('Content-Type', 'image/png');
      
      // Serve the image directly from the file system
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving Twitter-optimized China Steel image:', error);
      return res.status(500).send(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Universal image endpoint that works for all social platforms (WhatsApp, Telegram, Twitter, etc)
  app.get('/steel-image', (req, res) => {
    try {
      console.log('[Universal Image] Serving optimized steel image for social media');
      
      // Get the actual image file path
      const filePath = join(process.cwd(), 'public', 'latest', 'china-steel.png');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Image Error] Image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Set special headers that work well across multiple platforms
      // Cache for 1 hour for better performance
      const oneHour = 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Add cross-origin support for all platforms
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Set content type
      res.setHeader('Content-Type', 'image/png');
      
      // Create a readable stream and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving social media image:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Universal image endpoint for Coal article - works for all social platforms
  app.get('/coal-image', (req, res) => {
    try {
      console.log('[Universal Image] Serving optimized coal image for social media');
      
      // Get the actual image file path
      const filePath = join(process.cwd(), 'public', 'latest', 'tongkang.jpeg');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Image Error] Image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Set special headers that work well across multiple platforms
      // Cache for 1 hour for better performance
      const oneHour = 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Add cross-origin support for all platforms
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Set content type
      res.setHeader('Content-Type', 'image/jpeg');
      
      // Create a readable stream and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving coal social media image:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // API endpoint for serving images for meta tags
  app.get('/api/image', (req, res) => {
    try {
      const { path } = req.query;
      
      if (!path || typeof path !== 'string') {
        return res.status(400).send('Missing or invalid path parameter');
      }
      
      // For security, only allow paths with specific patterns (e.g., '/latest/...')
      if (!path.startsWith('/latest/')) {
        return res.status(403).send('Invalid path prefix');
      }
      
      // Remove the leading '/' to match file system paths
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      
      // Build the actual file path
      const filePath = join(process.cwd(), 'public', cleanPath);
      
      console.log(`[API Image] Serving image from path: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`[API Image Error] Image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Set special headers that work well across multiple platforms
      // Cache for 1 hour for better performance
      const oneHour = 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Add cross-origin support for all platforms
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Determine content type based on file extension
      const extension = filePath.split('.').pop()?.toLowerCase();
      const contentType = extension === 'png' ? 'image/png' : 
                         extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' :
                         extension === 'gif' ? 'image/gif' :
                         extension === 'svg' ? 'image/svg+xml' :
                         'application/octet-stream';
      
      res.setHeader('Content-Type', contentType);
      
      // Create a readable stream and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving API image:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Simple test route for OG meta tags
  app.get('/share-test', (req, res) => {
    try {
      console.log('[Debug] Serving share-test.html');
      const filePath = join(process.cwd(), 'public', 'share-test.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] Test file not found at path: ${filePath}`);
        return res.status(404).send('Test file not found');
      }
      
      const html = readFileSync(filePath, 'utf-8');
      console.log('[Debug] Successfully read test file, length:', html.length);
      
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } catch (error) {
      console.error('Error serving test page:', error);
      return res.status(500).send(`Error loading test page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Specialized route for coal article sharing test
  app.get('/coal-share', (req, res) => {
    try {
      console.log('[Debug] Serving coal-share-test.html');
      const filePath = join(process.cwd(), 'public', 'coal-share-test.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] Coal share test file not found at path: ${filePath}`);
        return res.status(404).send('Coal share test page not found');
      }
      
      // Set special headers for social media platforms
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const html = readFileSync(filePath, 'utf-8');
      console.log('[Debug] Successfully read coal share test HTML file, length:', html.length);
      
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } catch (error) {
      console.error('Error serving coal share test page:', error);
      return res.status(500).send(`Error loading coal share page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Dedicated route to serve the coal image with proper headers for social media
  app.get('/latest/coal-image.jpeg', (req, res) => {
    try {
      console.log('[Coal Image] Serving coal image for social media sharing');
      const filePath = join(process.cwd(), 'public', 'latest', 'tongkang.jpeg');
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.error(`[Coal Image Error] Image not found at path: ${filePath}`);
        return res.status(404).send('Coal image not found');
      }
      
      // Set content type (important for proper rendering)
      res.setHeader('Content-Type', 'image/jpeg');
      
      // Add Cross-Origin headers to ensure platforms can access the image
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Set moderate cache headers - balancing caching needs
      const oneHour = 60 * 60; // 1 hour in seconds
      if (req.query.v) {
        // For versioned requests, use a longer cache time
        res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
        res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
        console.log(`[Coal Image] Serving versioned image (v=${req.query.v}) with 1 hour cache`);
      } else {
        // For non-versioned requests, use a shorter cache time
        const fifteenMinutes = 15 * 60; // 15 minutes in seconds
        res.setHeader('Cache-Control', `public, max-age=${fifteenMinutes}`);
        res.setHeader('Expires', new Date(Date.now() + fifteenMinutes * 1000).toUTCString());
        console.log('[Coal Image] Serving non-versioned image with 15 min cache');
      }
      
      // Stream the file directly
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving coal image:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Test route for WhatsApp and X preview
  app.get('/test', (req, res) => {
    try {
      console.log('[Debug] Redirecting to image preview test');
      return res.redirect(302, '/static/share/test.html');
    } catch (error) {
      console.error('Error redirecting to test page:', error);
      return res.status(500).send(`Error redirecting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Specific test route for Twitter Cards
  app.get('/twitter-test', (req, res) => {
    try {
      console.log('[Debug] Redirecting to Twitter Card test');
      return res.redirect(302, '/static/share/twitter-test.html');
    } catch (error) {
      console.error('Error redirecting to Twitter test page:', error);
      return res.status(500).send(`Error redirecting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Super simplified Twitter card test - minimal HTML with only essential tags
  app.get('/t/steel', (req, res) => {
    try {
      console.log('[Debug] Redirecting to minimal Twitter Card test');
      // Add cache control headers to prevent caching
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      return res.redirect(302, '/static/share/twitter-steel.html');
    } catch (error) {
      console.error('Error redirecting to minimal Twitter Card test:', error);
      return res.status(500).send(`Error redirecting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Super minimal JPG test for Twitter Cards
  app.get('/t/jpg', (req, res) => {
    try {
      console.log('[Debug] Redirecting to JPG Twitter Card test');
      // Add cache control headers to prevent caching
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      return res.redirect(302, '/static/share/jpg-test.html');
    } catch (error) {
      console.error('Error redirecting to JPG Twitter Card test:', error);
      return res.status(500).send(`Error redirecting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Direct HTML page for Twitter Cards without redirects
  app.get('/t/direct', (req, res) => {
    try {
      console.log('[Debug] Serving direct Twitter Card page');
      // Add cache control headers to prevent caching
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // Serve the file directly without redirections
      const filePath = join(process.cwd(), 'public', 'static', 't', 'direct.html');
      return res.sendFile(filePath);
    } catch (error) {
      console.error('Error serving direct Twitter Card page:', error);
      return res.status(500).send(`Error serving page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Social share optimized route for China Steel Reform article
  app.get('/share/china-steel-reform', (req, res) => {
    try {
      console.log('[Debug] Redirecting to China Steel Reform share page');
      // Add cache control headers to prevent caching of this redirector
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      return res.redirect(302, '/static/share/china-steel-reform.html');
    } catch (error) {
      console.error('Error redirecting to China Steel Reform share page:', error);
      return res.status(500).send(`Error redirecting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Special route that serves static HTML for social media crawlers directly at the original URL
  app.get('/latest/china-steel-reform', (req, res, next) => {
    // Check if this is a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers['referer'] || '';
    
    const isSocialCrawler = (
      userAgent.includes('Twitterbot') || 
      userAgent.includes('facebookexternalhit') || 
      userAgent.includes('WhatsApp') ||
      userAgent.includes('LinkedInBot') ||
      userAgent.includes('Slackbot-LinkExpanding') ||
      referer.includes('twitter.com') ||
      referer.includes('t.co') ||
      referer.includes('facebook.com') ||
      referer.includes('whatsapp.com')
    );
    
    // Log crawler detection for debugging
    console.log(`[UserAgent Debug] ${userAgent.substring(0, 100)}`);
    console.log(`[Referer Debug] ${referer}`);
    
    if (isSocialCrawler) {
      // For Twitter bots specifically, serve the super simplified card page
      if (userAgent.includes('Twitterbot') || userAgent.includes('Twitter') || referer.includes('twitter') || referer.includes('t.co')) {
        console.log(`Detected Twitter crawler - serving Twitter-optimized page: ${userAgent.substring(0, 30)}`);
        
        // Set cache control headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        
        // Serve the minimal Twitter card HTML
        return res.sendFile(join(process.cwd(), 'public', 't-steel.html'));
      }
      
      // For other social crawlers
      console.log(`Detected social media crawler - serving static HTML directly: ${userAgent.substring(0, 30)}`);
      
      // Serve the content directly - NOT redirecting to avoid breaking previews
      return res.sendFile(join(process.cwd(), 'public', 'latest', 'china-steel-share', 'index.html'));
    }
    
    // Not a crawler, continue with normal React app rendering
    next();
  });
  
  // Special route for Coal Price Slump article that handles social media crawlers
  app.get('/latest/global-coal-price-slump', (req, res, next) => {
    // Check if this is a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers['referer'] || '';
    
    const isSocialCrawler = (
      userAgent.includes('Twitterbot') || 
      userAgent.includes('facebookexternalhit') || 
      userAgent.includes('WhatsApp') ||
      userAgent.includes('LinkedInBot') ||
      userAgent.includes('Slackbot-LinkExpanding') ||
      referer.includes('twitter.com') ||
      referer.includes('t.co') ||
      referer.includes('facebook.com') ||
      referer.includes('whatsapp.com')
    );
    
    // Log crawler detection for debugging
    console.log(`[Coal Article UA Debug] ${userAgent.substring(0, 100)}`);
    console.log(`[Coal Article Referer Debug] ${referer}`);
    
    if (isSocialCrawler) {
      // For Twitter bots specifically, serve the super simplified card page
      if (userAgent.includes('Twitterbot') || userAgent.includes('Twitter') || referer.includes('twitter') || referer.includes('t.co')) {
        console.log(`Detected Twitter crawler for coal article - serving Twitter-optimized page: ${userAgent.substring(0, 30)}`);
        
        // Set cache control headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        
        // Serve the minimal Twitter card HTML for coal
        return res.sendFile(join(process.cwd(), 'public', 't-coal.html'));
      }
      
      // For other social crawlers
      console.log(`Detected social media crawler for coal article - serving static HTML directly: ${userAgent.substring(0, 30)}`);
      
      // Serve the content directly - NOT redirecting to avoid breaking previews
      return res.sendFile(join(process.cwd(), 'public', 'latest', 'global-coal-share', 'index.html'));
    }
    
    // Not a crawler, continue with normal React app rendering
    next();
  });
  
  // Optimized image serving route for social sharing with proper cache headers
  app.get('/latest/china-steel.png', (req, res) => {
    try {
      const filePath = join(process.cwd(), 'public', 'latest', 'china-steel.png');
      
      // Check if file exists
      try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          throw new Error("Not a file");
        }
      } catch (err) {
        console.error(`Image file not found: ${filePath}`, err);
        return res.status(404).send("Image not found");
      }
      
      // Set content type
      res.setHeader('Content-Type', 'image/png');
      
      // Add Cross-Origin headers to ensure Twitter can access the image
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Set cache headers based on version parameter
      if (req.query.v) {
        // Avoid excessive caching for social media crawlers
        // Maximum 1 hour cache for versioned requests to allow for revalidation
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
        res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
        console.log(`Serving versioned image (v=${req.query.v}) with short cache: ${filePath}`);
      } else {
        // Very short cache time for non-versioned requests (5 minutes)
        res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
        console.log(`Serving non-versioned image with minimal cache: ${filePath}`);
      }
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving image:', error);
      return res.status(500).send(`Error serving image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Serving true PNG image for Twitter Cards (converted from WebP)
  app.get('/latest/china-steel-true.png', (req, res) => {
    try {
      const filePath = join(process.cwd(), 'public', 'latest', 'china-steel-true.png');
      
      // Check if file exists
      try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          throw new Error("Not a file");
        }
      } catch (err) {
        console.error(`True PNG image file not found: ${filePath}`, err);
        return res.status(404).send("Image not found");
      }
      
      // Set content type
      res.setHeader('Content-Type', 'image/png');
      
      // Add Cross-Origin headers to ensure Twitter can access the image
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Use moderate caching for Twitter - Twitter needs this for the card to work!
      // Too little caching can cause Twitter to drop the card
      const oneHour = 60 * 60; // 1 hour in seconds
      if (req.query.v) {
        // For versioned requests, use a longer cache time
        res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
        res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      } else {
        // For non-versioned requests, use a shorter cache time
        const fifteenMinutes = 15 * 60; // 15 minutes in seconds
        res.setHeader('Cache-Control', `public, max-age=${fifteenMinutes}`);
        res.setHeader('Expires', new Date(Date.now() + fifteenMinutes * 1000).toUTCString());
      }
      
      console.log(`Serving Twitter-compatible PNG image: ${filePath}`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving true PNG image:', error);
      return res.status(500).send(`Error serving image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  // Add a dedicated handler for Twitter card files
  app.get('/twitter-card/:filename', (req, res) => {
    try {
      const { filename } = req.params;
      console.log(`[Twitter Card Route] Serving Twitter Card file: ${filename}`);
      
      const filePath = join(process.cwd(), 'public', 'twitter-card', filename);
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Twitter Card Route] File not found at path: ${filePath}`);
        return res.status(404).send('Twitter Card file not found');
      }
      
      // Determine content type based on extension
      let contentType = 'text/html';
      if (filename.endsWith('.png')) {
        contentType = 'image/png';
      } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (filename.endsWith('.css')) {
        contentType = 'text/css';
      } else if (filename.endsWith('.js')) {
        contentType = 'application/javascript';
      }
      
      // Set moderate cache headers - Twitter needs some caching to maintain the preview
      // but not too long to prevent updates from appearing
      const fifteenMinutes = 15 * 60; // 15 minutes in seconds
      res.setHeader('Cache-Control', `public, max-age=${fifteenMinutes}`);
      res.setHeader('Expires', new Date(Date.now() + fifteenMinutes * 1000).toUTCString());
      
      // Add Cross-Origin headers to ensure Twitter can access the resources
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      res.setHeader('Content-Type', contentType);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving Twitter Card file:', error);
      return res.status(500).send(`Error loading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      
      // Support both law and research documents
      if (category !== 'law' && category !== 'research') {
        console.log(`Document category not supported: ${category}`);
        return res.status(404).json({ error: "Document category not found" });
      }
      
      // Simple document registry - in a real app, this would be in a database
      const documentsRegistry: Record<string, { filename: string, contentType: string, title: string }> = {
        // Law documents
        "undang-undang-nomor-1-tahun-2025": {
          filename: "UU_NO_1_2025.pdf",
          contentType: "application/pdf",
          title: "Undang-Undang Nomor 1 Tahun 2025"
        },
        "peraturan-pemerintah-nomor-10-tahun-2025": {
          filename: "Salinan PP Nomor 10 Tahun 2025.pdf",
          contentType: "application/pdf",
          title: "PP No. 10 Tahun 2025"
        },
        // Research papers
        "steel-tariff-exemptions-global-trade-impact": {
          filename: "Paper.pdf",
          contentType: "application/pdf",
          title: "Supply-Chain Disruptions from Revoking Section 232 Steel Tariff Exemptions"
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