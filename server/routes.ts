import type { Express, Request as ExpressRequest, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { execFile } from "child_process";
import path, { join } from "path";
import { readFileSync, statSync, createReadStream } from "fs";
import * as fs from "fs";
import { sampleArticles } from "../client/src/types/newsletter";
import { db, verifyDbConnection } from "../db/index";
import { subscribers } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { detectSocialMediaCrawler, setSocialMediaCacheHeaders } from "./utils/crawler-detection";

// Extend Express Request to include the skipPreview property
declare global {
  namespace Express {
    interface Request {
      skipPreview?: boolean;
    }
  }
}

// Use the extended Request type
type Request = ExpressRequest;
import { registerArticleRoutes } from "./routes-article";

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
    const { isCrawler, platform, isTwitter, isFacebook, isWhatsApp, isInstagram } = detectSocialMediaCrawler(req);
    
    // Get the request path and user agent
    const path = req.path;
    const userAgent = req.headers['user-agent'] || '';
    
    // If this is from WhatsApp or Instagram, don't apply any special handling
    // We want these platforms to see the real site
    if (isWhatsApp || isInstagram) {
      console.log(`📱 WhatsApp/Instagram client detected - showing normal site`);
      return next();
    }
    
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
    
    // WhatsApp special handling is completely removed
    // We want WhatsApp users to see the actual website
    
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
    
    // WhatsApp special handling is completely removed for the Global Coal Price article
    // We want WhatsApp users to see the actual website
    
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

  // Special handling for IHSG newsletter with image-free meta tags
  app.get('/newsletter/ihsg-outlook-march-3-7', (req, res, next) => {
    console.log(`[OG Debug] Processing IHSG newsletter request with image-free meta tags`);
    console.log(`[OG Debug] User-Agent: ${req.headers['user-agent']}`);
    
    // For ALL social platforms, we skip special handling for newsletter links
    // We always want to show the actual website for newsletter links
    
    // Skip all special handling for this newsletter path
    console.log(`[OG Debug] Newsletter path detected - showing normal site`);
    return next();
    
    // Find the IHSG newsletter article
    const article = sampleArticles.find(a => a.slug === 'ihsg-outlook-march-3-7');

    if (!article) {
      console.log(`[OG Debug] IHSG article not found`);
      next(); // Let client-side handle 404
      return;
    }
    
    console.log(`[OG Debug] Found IHSG article: ${article.title}`);
    console.log(`[OG Debug] Article has metrics: ${!!article.previewMetrics}`);
    
    try {
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

      // Create a completely new HTML document from scratch
      // This ensures we don't inherit any unwanted meta tags
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <title>${previewTitle}</title>
    <meta name="description" content="${previewDescription}">
    
    <!-- Tell crawlers explicitly not to use image previews -->
    <meta name="robots" content="max-image-preview:none">

    <!-- Open Graph without images -->
    <meta property="og:title" content="${previewTitle}">
    <meta property="og:description" content="${previewDescription}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://lucaxyzz-digest.replit.app/newsletter/ihsg-outlook-march-3-7">
    <meta property="og:site_name" content="Daily Digest">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card - explicitly summary without image -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@dailydigest">
    <meta name="twitter:creator" content="@dailydigest">
    <meta name="twitter:title" content="${previewTitle}">
    <meta name="twitter:description" content="${previewDescription}">
    <meta name="twitter:domain" content="lucaxyzz-digest.replit.app">

    <!-- Article Metadata -->
    <meta property="article:published_time" content="${escapeHtml(article.date)}">
    <meta property="article:author" content="${escapeHtml(article.author)}">
    <meta property="article:section" content="${escapeHtml(article.category)}">
    <meta property="article:tag" content="${escapeHtml(article.category)}">
    
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        header {
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.8;
        }
        .metrics {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .metric {
            flex: 1;
            min-width: 150px;
        }
        .metric-label {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .metric-value {
            font-size: 18px;
            color: #333;
        }
        .metric-subtitle {
            font-size: 12px;
            color: #666;
        }
        @media (max-width: 600px) {
            .metrics {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>${previewTitle}</h1>
        <div class="meta">
            By ${escapeHtml(article.author)} | ${escapeHtml(article.date)} | ${escapeHtml(article.category)}
        </div>
    </header>
    
    <div class="content">
        <p>${previewDescription}</p>
        
        ${metrics.length > 0 ? `
        <div class="metrics">
            ${metrics.map(m => `
            <div class="metric">
                <div class="metric-label">${escapeHtml(m.label)}</div>
                <div class="metric-value">${escapeHtml(m.value)}</div>
                ${m.subtitle ? `<div class="metric-subtitle">${escapeHtml(m.subtitle)}</div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}
        
        <p>To continue reading this analysis, please visit our site.</p>
    </div>
</body>
</html>`;
      
      // Log that we're serving a completely custom HTML
      console.log('[OG Debug] Serving custom HTML without any image meta tags');
      
      // Set proper content type and headers
      res.setHeader('Content-Type', 'text/html');
      
      // Set cache control headers to prevent caching
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // Check for image tags in our custom HTML as a safeguard
      console.log('[OG Debug] Checking for any image tags in our custom HTML');
      // We're actually verifying that we don't have image meta tags, but we do have proper OG tags
      const hasImageTags = htmlContent.includes('og:image') || htmlContent.includes('twitter:image');
      const hasOgTitleTags = htmlContent.includes('og:title');
      
      if (hasImageTags) {
        console.log('[OG Debug] Warning: Found image tags in our custom HTML! These should be removed.');
      } else if (!hasOgTitleTags) {
        console.log('[OG Debug] Warning: Missing required OG title tags in our custom HTML!');
      } else {
        console.log('[OG Debug] Success: HTML has proper OG tags without images');
      }
      
      // Send our custom HTML
      res.send(htmlContent);
    } catch (error) {
      console.error('Error rendering IHSG newsletter meta tags:', error);
      next(); // Fall back to client-side rendering
    }
  });

  // Special handling for Indonesia Economic Tightrope article
  app.get('/newsletter/indonesia-economic-tightrope-export-rules', (req, res, next) => {
    console.log(`[OG Debug] Processing Indonesia Economic Tightrope newsletter request with proper image meta tags`);
    console.log(`[OG Debug] User-Agent: ${req.headers['user-agent']}`);
    
    // For ALL social platforms, we skip special handling for newsletter links
    // We always want to show the actual website for newsletter links
    
    // Skip all special handling for this newsletter path
    console.log(`[OG Debug] Newsletter path detected - showing normal site`);
    return next();
    
    // Check if the request is from a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|Googlebot|bingbot|DuckDuckBot|Slackbot|TelegramBot/i.test(userAgent);
    
    if (!isCrawler) {
      // If not a crawler, just pass through to the client app
      return next();
    }
    
    // Find the article in the sample articles
    const article = sampleArticles.find(a => a.slug === 'indonesia-economic-tightrope-export-rules');

    if (!article) {
      console.log(`[OG Debug] Indonesia Economic Tightrope article not found`);
      next(); // Let client-side handle 404
      return;
    }
    
    console.log(`[OG Debug] Found Indonesia Economic Tightrope article: ${article.title}`);
    
    try {
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
      const previewTitle = escapeHtml(`${article.title} | Daily Digest`);
      const previewDescription = escapeHtml(article.description);
      
      // Get the base URL for the images
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const baseUrl = `${protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/images/articles/rupiah-export.jpg`;

      // Create HTML with proper meta tags including the correct image
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <title>${previewTitle}</title>
    <meta name="description" content="${previewDescription}">
    
    <!-- Open Graph tags (used by Facebook, LinkedIn) -->
    <meta property="og:title" content="${previewTitle}">
    <meta property="og:description" content="${previewDescription}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${baseUrl}/newsletter/indonesia-economic-tightrope-export-rules">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Daily Digest">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@dailydigest">
    <meta name="twitter:creator" content="@dailydigest">
    <meta name="twitter:title" content="${previewTitle}">
    <meta name="twitter:description" content="${previewDescription}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:domain" content="${req.get('host')}">

    <!-- Article Metadata -->
    <meta property="article:published_time" content="${escapeHtml(article.date)}">
    <meta property="article:author" content="${escapeHtml(article.author)}">
    <meta property="article:section" content="${escapeHtml(article.category)}">
    <meta property="article:tag" content="${escapeHtml(article.tags?.join(',') || article.category)}">
    
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        header {
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.8;
        }
        img.featured {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <header>
        <h1>${previewTitle}</h1>
        <div class="meta">
            By ${escapeHtml(article.author)} | ${escapeHtml(article.date)} | ${escapeHtml(article.category)}
        </div>
    </header>
    
    <div class="content">
        <img class="featured" src="${imageUrl}" alt="Indonesian rupiah currency with export shipping containers in background" />
        <p>${previewDescription}</p>
        <p>To continue reading this analysis, please visit our site.</p>
    </div>
</body>
</html>`;
      
      // Log that we're serving a completely custom HTML
      console.log('[OG Debug] Serving custom HTML with proper image meta tags');
      
      // Set proper content type and headers
      res.setHeader('Content-Type', 'text/html');
      
      // Set cache control headers with short expiration to prevent stale images
      res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
      
      // Send our custom HTML
      res.send(htmlContent);
    } catch (error) {
      console.error('Error rendering Indonesia Economic Tightrope meta tags:', error);
      next(); // Fall back to client-side rendering
    }
  });

  // Global middleware for ALL newsletter routes
  // This runs before any specific route handlers
  app.use((req, res, next) => {
    // Check if this is a newsletter route
    if (req.path.startsWith('/newsletter/') || req.path === '/newsletter') {
      // DEBUG MODE: Always log newsletter requests
      console.log(`[DEBUG][Newsletter] Intercepted path: ${req.path}`);
      console.log(`[DEBUG][Newsletter] User-Agent: ${req.headers['user-agent']}`);
      
      // For ALL newsletter routes - ALWAYS set the skipPreview flag
      // This ensures no special preview handling for any social platform
      req.skipPreview = true;
      
      // Log that we're forcing the normal site for this newsletter link
      console.log(`[Newsletter] Path detected: ${req.path} - forcing normal site display for all platforms`);
      
      // Get user agent for debugging
      const userAgent = req.headers['user-agent'] || '';
      
      // Check if this is from a social media crawler for reporting purposes
      const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Instagram|Telegram|Googlebot|bingbot|DuckDuckBot|Slackbot|TelegramBot/i.test(userAgent);
      
      if (isCrawler) {
        console.log(`[Newsletter] Social media crawler detected in request: ${userAgent}`);
      }
    }
    
    // Always continue to the next middleware
    next();
  });
  
  // Special test page for verifying newsletter preview removal
  app.get('/newsletter/test', (req, res) => {
    console.log('[Newsletter] Serving test page for newsletter preview removal');
    
    // Serve our test HTML page
    res.sendFile(join(process.cwd(), 'public', 'test-newsletter-preview.html'));
  });
  
  // Generic handler for other newsletter routes - simply serves the app 
  app.get('/newsletter/:slug', (req, res, next) => {
    // Check if we should skip preview (set by the middleware above)
    if (req.skipPreview) {
      console.log(`[Newsletter] Skipping preview for ${req.path} - showing normal site`);
    }
    
    // Always just pass through to the actual application
    next();
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
  
  // Serve the rupiah-export.jpg image with proper MIME type for social media sharing
  app.get('/images/articles/rupiah-export.jpg', (req, res) => {
    try {
      console.log('[Image Route] Serving rupiah-export.jpg image');
      const filePath = join(process.cwd(), 'public', 'images', 'articles', 'rupiah-export.jpg');
      
      // Set content type for JPG
      res.setHeader('Content-Type', 'image/jpeg');
      
      // Set cache headers for better social media preview caching
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
      
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Use createReadStream for better performance with binary files
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else {
        console.error(`[Image Route] JPG file not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
    } catch (error) {
      console.error('Error serving rupiah export image:', error);
      return res.status(500).send(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

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
  
  // Dedicated route for images directory
  app.use('/images', express.static(join(process.cwd(), 'public', 'images'), { 
    index: false,
    setHeaders: (res: Response) => {
      // Set appropriate headers for static files
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
      res.setHeader('Access-Control-Allow-Origin', '*');
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
  
  // Serve our comprehensive social media test page
  app.get('/social-media-test', (req, res) => {
    try {
      console.log('[Debug] Serving social-media-test.html');
      const filePath = join(process.cwd(), 'public', 'social-media-test.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] HTML file not found at path: ${filePath}`);
        return res.status(404).send('Test page not found');
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      console.log('[Debug] Successfully read social media test file, length:', content.length);
      
      // Set appropriate cache headers based on user agent
      const userAgent = req.headers['user-agent'] || '';
      if (userAgent.includes('Twitterbot') || userAgent.includes('facebookexternalhit')) {
        // Social media crawlers should get fresh content
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else {
        // Regular users can cache briefly
        res.setHeader('Cache-Control', 'public, max-age=300');
      }
      
      res.setHeader('Content-Type', 'text/html');
      return res.send(content);
    } catch (error) {
      console.error('[Error] Failed to serve social media test page:', error);
      res.status(500).send('Error serving test page');
    }
  });
  
  // Serve social media image test page
  app.get('/social-image-test', (req, res) => {
    try {
      // Detect if request is from a social media crawler
      const userAgent = req.headers['user-agent'] || '';
      const isSocialCrawler = 
        userAgent.includes('Twitterbot') || 
        userAgent.includes('facebookexternalhit') || 
        userAgent.includes('LinkedInBot') || 
        userAgent.includes('Telegram') || 
        userAgent.includes('WhatsApp');
      
      if (isSocialCrawler) {
        console.log(`[Debug] Social media crawler detected: ${userAgent.substring(0, 50)}...`);
        
        // Generate a timestamp for cache busting
        const timestamp = new Date().getTime();
        const imageSocialUrl = `https://image.social/get?url=dailydigest.id/social-image-test&t=${timestamp}`;
        
        // Set appropriate cache control headers based on crawler type
        if (userAgent.includes('Twitterbot')) {
          // Twitter often needs a shorter cache period to refresh properly
          res.setHeader('Cache-Control', 'public, max-age=900'); // 15 minutes
        } else if (userAgent.includes('Telegram')) {
          // Telegram is aggressive with caching, use no-cache
          res.setHeader('Cache-Control', 'no-cache, max-age=0');
        } else {
          // General social media platforms
          res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
        
        // Return a minimal HTML response with the necessary meta tags
        res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Social Image Test - Daily Digest</title>
  <meta property="og:title" content="Daily Digest Social Media Image Test" />
  <meta property="og:description" content="Testing our implementation of automated social media preview images using image.social" />
  <meta property="og:image" content="${imageSocialUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://dailydigest.id/social-image-test" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Daily Digest Social Media Image Test" />
  <meta name="twitter:description" content="Testing our implementation of automated social media preview images using image.social" />
  <meta name="twitter:image" content="${imageSocialUrl}" />
</head>
<body>
  <h1>Social Image Test - Daily Digest</h1>
  <p>This page is optimized for social media crawler preview.</p>
</body>
</html>`);
        return;
      }
      
      // For regular users, serve the normal HTML file
      console.log('[Debug] Serving social-image-test.html to regular user');
      const filePath = join(process.cwd(), 'public', 'social-image-test.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] HTML file not found at path: ${filePath}`);
        return res.status(404).send('Test page not found');
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      console.log('[Debug] Successfully read social image test file, length:', content.length);
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.send(content);
    } catch (error) {
      console.error('[Error] Failed to serve social image test page:', error);
      res.status(500).send('Error serving test page');
    }
  });
  
  // Serve image.social implementation guide page
  app.get('/image-social-implementation', (req, res) => {
    try {
      console.log('[Debug] Serving image-social-implementation.html');
      const filePath = join(process.cwd(), 'public', 'image-social-implementation.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] HTML file not found at path: ${filePath}`);
        return res.status(404).send('Implementation guide not found');
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      console.log('[Debug] Successfully read implementation guide, length:', content.length);
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.send(content);
    } catch (error) {
      console.error('[Error] Failed to serve implementation guide:', error);
      res.status(500).send('Error serving implementation guide');
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
  
  // Direct access to coal article images with proper cache control
  app.get('/latest/coal-image.jpeg', (req, res) => {
    try {
      console.log('[Image Route] Serving Coal article image');
      const filePath = join(process.cwd(), 'public', 'latest', 'tongkang.jpeg');
      
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
      
      res.setHeader('Content-Type', 'image/jpeg');
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving Coal article image:', error);
      return res.status(500).send(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
  
  // Test route for social image (image.social) integration
  app.get('/social-image-test', (req, res) => {
    try {
      // Detect if request is from a social media crawler
      const userAgent = req.headers['user-agent'] || '';
      const isSocialCrawler = 
        userAgent.includes('Twitterbot') || 
        userAgent.includes('facebookexternalhit') || 
        userAgent.includes('LinkedInBot') || 
        userAgent.includes('Telegram') || 
        userAgent.includes('WhatsApp');
      
      if (isSocialCrawler) {
        console.log(`[Debug] Social media crawler detected for image.social test: ${userAgent.substring(0, 50)}...`);
        
        // Generate a timestamp for cache busting
        const timestamp = new Date().getTime();
        const imageSocialUrl = `https://image.social/get?url=dailydigest.id/social-image-test&t=${timestamp}`;
        
        // Set appropriate cache control headers based on crawler type
        if (userAgent.includes('Twitterbot')) {
          // Twitter often needs a shorter cache period to refresh properly
          res.setHeader('Cache-Control', 'public, max-age=900'); // 15 minutes
        } else if (userAgent.includes('Telegram')) {
          // Telegram is aggressive with caching, use no-cache
          res.setHeader('Cache-Control', 'no-cache, max-age=0');
        } else {
          // General social media platforms
          res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
        
        // Return a minimal HTML response with the necessary meta tags
        res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Social Image Test - Daily Digest</title>
  <meta property="og:title" content="Daily Digest Social Media Image Test" />
  <meta property="og:description" content="Testing our implementation of automated social media preview images using image.social" />
  <meta property="og:image" content="${imageSocialUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://dailydigest.id/social-image-test" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Daily Digest Social Media Image Test" />
  <meta name="twitter:description" content="Testing our implementation of automated social media preview images using image.social" />
  <meta name="twitter:image" content="${imageSocialUrl}" />
</head>
<body>
  <h1>Social Image Test - Daily Digest</h1>
  <p>This page is optimized for social media crawler preview.</p>
</body>
</html>`);
        return;
      }
      
      console.log('[Debug] Serving social-image-test.html to regular user');
      const filePath = join(process.cwd(), 'public', 'social-image-test.html');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Debug] Social image test file not found at path: ${filePath}`);
        return res.status(404).send('Social image test file not found');
      }
      
      const html = readFileSync(filePath, 'utf-8');
      console.log('[Debug] Successfully read social image test file, length:', html.length);
      
      // Set cache headers for social media preview
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Content-Type', 'text/html');
      
      return res.send(html);
    } catch (error) {
      console.error('Error serving social image test page:', error);
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
  
  // Dedicated endpoint for REE article image
  app.get('/ree-image', (req, res) => {
    try {
      console.log('[Image Route] Serving REE article image');
      const filePath = join(process.cwd(), 'public', 'images', 'ree-processing.png');
      
      if (!fs.existsSync(filePath)) {
        console.error(`[Image Route] REE image not found at path: ${filePath}`);
        return res.status(404).send('Image not found');
      }
      
      // Set cache headers for better performance
      const oneDay = 24 * 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneDay}`);
      res.setHeader('Expires', new Date(Date.now() + oneDay * 1000).toUTCString());
      
      // Add cross-origin support
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      res.setHeader('Content-Type', 'image/png');
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving REE article image:', error);
      return res.status(500).send(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  // Universal image endpoint for social media previews using image.social
  app.get('/steel-image', (req, res) => {
    try {
      console.log('[Universal Image] Redirecting to image.social for dynamic preview');
      
      // Get path from query parameter or use default path
      const path = req.query.path || 'latest/china-steel-reform';
      
      // Add cache busting for aggressive cachers like Telegram
      const timestamp = Date.now();
      
      // Redirect to image.social with the appropriate path (correct format)
      const imageSocialUrl = `https://image.social/get?url=dailydigest.id/${path}&t=${timestamp}`;
      
      // Set cache control headers
      const oneHour = 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
      res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
      
      // Add cross-origin support
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Redirect to image.social
      res.redirect(imageSocialUrl);
    } catch (error) {
      console.error('Error redirecting to image.social:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Dynamic social preview endpoint that generates previews for any path
  app.get('/dynamic-preview', (req, res) => {
    try {
      console.log('[Dynamic Preview] Generating dynamic social preview');
      
      // Get path from query parameter
      const path = req.query.path || '';
      
      // Get platform from query parameter (defaults to 'all')
      const platform = req.query.platform || 'all';
      
      // Add cache busting for aggressive cachers like Telegram
      const timestamp = Date.now();
      
      // Generate image.social URL with appropriate parameters
      let imageSocialUrl = `https://image.social/get?url=dailydigest.id/${path}`;
      
      // No platform-specific parameters needed, just add cache busting
      // The simplified image.social format works well across all platforms
      imageSocialUrl += `&t=${timestamp}`;
      
      // Set appropriate cache control headers based on platform
      let cacheTime = 60 * 60; // Default: 1 hour
      if (platform === 'telegram') {
        cacheTime = 5 * 60; // 5 minutes for Telegram (aggressive caching)
      } else if (platform === 'twitter' || platform === 'x') {
        cacheTime = 12 * 60 * 60; // 12 hours for Twitter (less frequent refreshes)
      }
      
      res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
      res.setHeader('Expires', new Date(Date.now() + cacheTime * 1000).toUTCString());
      
      // Add cross-origin support
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Redirect to image.social
      res.redirect(imageSocialUrl);
    } catch (error) {
      console.error('Error generating dynamic preview:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Routes for serving our social media test pages with proper headers
  app.get('/social-media-test.html', (req, res) => {
    // Set cache headers for social media platforms
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Check if it's a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('facebookexternalhit') || 
        userAgent.includes('Twitterbot') ||
        userAgent.includes('LinkedInBot')) {
      console.log(`[Social Test] Social media crawler detected: ${userAgent.substring(0, 50)}...`);
    }
    
    // Send the file
    res.sendFile(join(process.cwd(), 'public', 'social-media-test.html'));
  });
  
  app.get('/twitter-direct.html', (req, res) => {
    // Set cache headers for Twitter
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Check if it's a Twitter crawler
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('Twitterbot')) {
      console.log(`[Twitter Test] Twitter crawler detected: ${userAgent.substring(0, 50)}...`);
    }
    
    // Send the file
    res.sendFile(join(process.cwd(), 'public', 'twitter-direct.html'));
  });
  
  app.get('/social-media-testing-suite.html', (req, res) => {
    // Set cache headers for social media platforms
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Check if it's a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('facebookexternalhit') || 
        userAgent.includes('Twitterbot') ||
        userAgent.includes('LinkedInBot') ||
        userAgent.includes('Telegram') ||
        userAgent.includes('WhatsApp')) {
      console.log(`[TestSuite] Social crawler detected: ${userAgent.substring(0, 50)}...`);
    }
    
    // Send the file
    res.sendFile(join(process.cwd(), 'public', 'social-media-testing-suite.html'));
  });
  
  app.get('/image-social-test.html', (req, res) => {
    // Set cache headers for social media platforms
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Check if it's a social media crawler
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('facebookexternalhit') || 
        userAgent.includes('Twitterbot') ||
        userAgent.includes('LinkedInBot') ||
        userAgent.includes('Telegram') ||
        userAgent.includes('WhatsApp')) {
      console.log(`[Image.Social Test] Social crawler detected: ${userAgent.substring(0, 50)}...`);
    }
    
    // Send the file
    res.sendFile(join(process.cwd(), 'public', 'image-social-test.html'));
  });
  
  app.get('/whatsapp-cache-buster.html', (req, res) => {
    // Set strong cache-busting headers to help with WhatsApp's cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Log WhatsApp crawler detection
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('WhatsApp')) {
      console.log(`[WhatsApp Cache Buster] WhatsApp crawler detected: ${userAgent.substring(0, 50)}...`);
    }
    
    // Send the file
    res.sendFile(join(process.cwd(), 'public', 'whatsapp-cache-buster.html'));
  });

  // Register the article routes
  registerArticleRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}