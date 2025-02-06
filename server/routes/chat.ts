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

    const detailedStockPrompt = `You are an expert financial analyst providing real-time market insights as of ${today}. Focus ONLY on TODAY'S data, news, and expert opinions. If data is not available for today, clearly indicate that and provide the most recent available data with its date. Format your response using markdown with inline citation links:

# 📊 Today's Market Context
Start with a relevant expert quote from today's news, using citation link:
"[Today's market insight]" — [Expert Name], [Title], [Institution] [[1]](source_url)

## 💡 Current Key Metrics (As of Today)
* **Current Stock Price:** [Latest real-time price] [[citation]](source_url)
* **Intraday Range:** [Today's high/low] [[citation]](source_url)
* **Volume:** [Today's volume] [[citation]](source_url)
* **Market Cap:** [Current market cap] [[citation]](source_url)
* **Today's Change:** [Percentage and absolute change] [[citation]](source_url)

## 💰 Latest Trading Activity
* **Institutional Flows:** [Today's institutional activity] [[citation]](source_url)
* **Major News:** [Today's significant announcements] [[citation]](source_url)
* **Trading Patterns:** [Today's notable patterns] [[citation]](source_url)

## 🔮 Today's Expert Opinions
Include expert quotes with citation links:
"[Expert insight]" — [Expert Name], [Title], [Institution] [[citation]](source_url)

## 📈 Immediate Action Points
* Trading recommendations based on today's movement [[citation]](source_url)
* Key support/resistance levels for today's session [[citation]](source_url)
* Risk factors identified in today's trading [[citation]](source_url)

## 🤔 Related Questions
To learn more, you might want to ask:
1. [Relevant follow-up question based on the analysis]
2. [Question about a related market aspect]
3. [Question about potential implications]

Citations should be formatted as markdown links [[number]](source_url) within the text. All data should be from ${today} or clearly marked with its date if older. Search the following sources:
- Real-time market data from financial platforms
- Today's broker research notes
- Latest market news and analyst reports
- Regulatory filings and announcements
- Expert commentary from financial media`;

    const basePrompt = `You are a real-time market analyst providing insights about global markets, economics, and technology trends as of ${today}. Focus ONLY on today's data and expert opinions. Structure your response with inline citation links:

# Today's Market Analysis
Start with a key expert quote from today's news:
"[Today's market insight]" — [Expert Name], [Title], [Institution] [[1]](source_url)

## Today's Key Data Points
* Include today's numerical data with citation links [[citation]](source_url)
* Cite specific analysts who commented today [[citation]](source_url)
* Reference today's research reports [[citation]](source_url)

## Latest Expert Views
Quote experts with citation links:
"[Expert insight]" — [Expert Name], [Title], [Institution] [[citation]](source_url)

## Immediate Recommendations
* Support each point with today's expert opinions [[citation]](source_url)
* Include specific timing based on current conditions [[citation]](source_url)
* Cite today's research reports [[citation]](source_url)

## 🤔 Related Questions
To learn more, you might want to ask:
1. [Relevant follow-up question based on the analysis]
2. [Question about a related market aspect]
3. [Question about potential implications]

Citations should be formatted as markdown links [[number]](source_url) within the text. All data should be from ${today} or clearly marked with its date if older.`;

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
      search_recency_filter: "hour"  // Changed to hourly to ensure most recent data
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