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

    const detailedStockPrompt = `You are an expert financial analyst providing real-time market insights as of ${today}. Focus on TODAY'S data and news only. Format your response using markdown syntax with the following sections:

# 📊 Today's Market Context
Provide a concise overview of TODAY'S market landscape and developments. Start with a relevant expert quote from today's news:
"[Today's market insight]" — [Expert Name], [Title], [Institution]

## 💡 Current Key Metrics (As of Today)
* **Current Stock Price:** [Latest real-time price]
* **Intraday Range:** [Today's high/low]
* **Volume:** [Today's volume]
* **Market Cap:** [Current market cap]
* **Today's Change:** [Percentage and absolute change]

## 💰 Latest Trading Activity
* **Institutional Flows:** [Today's institutional activity]
* **Major News:** [Today's significant announcements]
* **Trading Patterns:** [Today's notable patterns]

## 🔮 Today's Expert Opinions
* Quote at least two expert analysts with their insights from today
* Include insights from today's research reports
* Reference specific market reports released today

## 📈 Immediate Action Points
* Trading recommendations based on today's movement
* Key support/resistance levels for today's session
* Risk factors identified in today's trading

Always cite your sources with today's date and include expert opinions specifically from:
- Today's investment bank research notes
- Today's market strategist comments
- Real-time analyst updates
- Today's regulatory announcements
- Latest central bank communications`;

    const basePrompt = `You are a real-time market analyst providing insights about global markets, economics, and technology trends as of ${today}. Focus ONLY on today's data and developments. Structure your response with proper expert citations:

# Today's Market Analysis
Start with a key expert quote from today's news:
"[Today's market insight]" — [Expert Name], [Title], [Institution]

## Today's Key Data Points
* Include today's numerical data
* Cite specific analysts who commented today
* Reference today's research reports

## Latest Expert Views
* Quote today's market strategist comments
* Include opposing viewpoints from today's analysis
* Reference institutional research published today

## Immediate Recommendations
* Support each point with today's expert opinions
* Include specific timing based on current market conditions
* Cite today's research reports

Always attribute insights to specific experts and institutions, with today's date. Use the following format:
"[Market insight from today]" — [Expert Name], [Title], [Institution], [Today's Date]`;

    log('Sending request to Perplexity API with sonar model...');
    const response = await client.chat.completions.create({
      model: "sonar",
      messages: [
        { 
          role: "system", 
          content: hasStockTicker ? detailedStockPrompt : basePrompt 
        },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.9,
      frequency_penalty: 1,
      search_domain_filter: ["perplexity.ai"],
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "day"  // Changed from "month" to "day"
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