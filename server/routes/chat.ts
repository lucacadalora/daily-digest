import express from "express";
import OpenAI from "openai";
import type { APIError } from "openai";
import { log } from "../vite";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    log('Received chat request:', req.body);

    const { message } = req.body;
    if (!message) {
      log('Error: Message is required');
      return res.status(400).json({
        status: 'error',
        error: 'Message is required'
      });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
    if (!apiKey) {
      log('Error: Missing API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error: Missing API key'
      });
    }

    // Detect off-topic queries
    const nonMarketTerms = /\b(code|programming|typescript|javascript|python|game|gaming|maze|algorithm|compiler|database|API|endpoint)\b/i;
    if (nonMarketTerms.test(message)) {
      return res.json({
        status: 'error',
        error: 'This AI assistant specializes in financial markets and investment analysis. For programming or other topics, please use appropriate specialized resources.',
      });
    }

    // Match stock tickers
    const stockTickerPattern = /\b[A-Z]{1,5}(\.[A-Z]{2})?\b|\^[A-Z]+\b/g;
    const hasStockTicker = stockTickerPattern.test(message);

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai",
      defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Important: Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    const detailedStockPrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Format your response using markdown syntax:

# 📊 Market Context
Provide a concise overview of the current market landscape, focusing on recent significant developments, positioning, and broader macroeconomic trends. Use market-specific terminology and insights for the latest developments.
## 💡 Key Metrics
* **Current Stock Price:** [Latest stock price] [[citation]](source_url)
* **Price-to-Earnings (P/E):** [Value, with comparison to industry peers and historical trends] [[citation]](source_url)
* **Discount to Peers:** [Value, comparison to regional peers or sector average] [[citation]](source_url)
* **Market Capitalization:** [Total market cap, with comparison to industry average or historical trends] [[citation]](source_url)
* **Earnings Growth (YoY/Quarterly):** [Latest earnings growth, with comparison to peers or historical growth] [[citation]](source_url)
* **Price-to-Book (P/B):** [Current P/B ratio with relevant context] [[citation]](source_url)
* **Debt-to-Equity Ratio:** [Ratio indicating leverage, with comparison to sector average] [[citation]](source_url)
## 💰 Dividend Outlook
2025 Projections: Dividend Yield: [X%] (estimated final dividend of IDR [value] per share) [[citation]](source_url)
## 💸 Fair Value Estimates
💡 **Peter Lynch Fair Value:** [Fair Value IDR, implying X% upside from the current price] [[citation]](source_url)
💸 **Analyst Consensus:** [Target prices range from IDR X to IDR Y, offering Z% upside] [[citation]](source_url)
## 📈 Detailed Analysis
Provide an in-depth analysis of the company's financial standing, including profit growth, asset quality, capital buffers, and key market catalysts. Highlight the company's competitive positioning and growth trajectory, particularly in areas such as market penetration and broader macroeconomic factors.
## 🎯 Expert Perspective
> "[Insert relevant expert quote with specific metrics or insights]"
— [Expert Name], [Organization] [[citation]](source_url)
## 💫 Growth Opportunities
* [Growth drivers like rate cuts, new market penetration, or product innovation] [[citation]](source_url)
* [Possible new revenue streams such as cross-selling services or expanding into new regions] [[citation]](source_url)
* [Competitive advantage over peers, such as improved operational efficiency or strong loan book quality] [[citation]](source_url)
## ⚠️ Risk Factors
* [Primary risks such as macroeconomic sensitivity, interest rate changes, and currency fluctuations] [[citation]](source_url)
* [Challenges with asset quality, such as rising NPLs or economic downturn impacts] [[citation]](source_url)
* [Regulatory or political risks, particularly with state ownership or directed lending] [[citation]](source_url)
## 📝 Bottom Line
Summarize key takeaways with actionable insights, focusing on investment opportunities. Provide a concise view of the potential total returns, including dividends and growth, along with risks to monitor. Offer a strategic recommendation based on the company's fundamentals and market outlook.`;

    log('Sending request to Perplexity API with sonar model...');
    const response = await client.chat.completions.create({
      model: "llama-3.1-sonar-huge-128k-online", // Using the largest model for better analysis
      messages: [
        { 
          role: "system", 
          content: hasStockTicker ? detailedStockPrompt : basePrompt 
        },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 4000,  // Increased for more comprehensive analysis
      frequency_penalty: 1,
      search_domain_filter: [ // Focus on financial and market data sources
        // Global Financial Sources
        "bloomberg.com",
        "reuters.com",
        "ft.com",
        "wsj.com",
        "cnbc.com",
        "marketwatch.com",
        "finance.yahoo.com",
        "investing.com",
        "seekingalpha.com",
        "fool.com",
        "morningstar.com",
        "zacks.com",
        "tradingview.com",
        "benzinga.com",
        "barrons.com",
        "gurufocus.com",
        "markets.ft.com",

        // Indonesian Financial Sources
        "investortrust.id",
        "kontan.co.id",
        "bisnis.com",
        "stockbit.com",
        "idx.co.id",
        "finance.detik.com",
        "money.kompas.com",
        "investor.id",
        "cnbcindonesia.com",
        "market.bisnis.com",
        "pasardana.id",
        "indopremier.com",
        "bareksa.com",
        "mncsekuritas.id",
        "idx.co.id"
      ]
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const result = {
      status: 'success',
      reply: response.choices[0].message.content.trim(),
      citations: response.citations || []
    };

    log('Sending successful response:', result);
    res.json(result);

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    log('Error in chat endpoint:', errorMessage);
    res.status(500).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;