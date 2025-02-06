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

    const detailedStockPrompt = `You are an expert financial analyst providing comprehensive market insights. Format your response using markdown syntax with the following sections:

# 📊 Market Context
Provide a concise overview of the current market landscape, focusing on recent significant developments. Include at least one relevant expert quote with proper attribution, for example:
"[Market insight/analysis]" — [Expert Name], [Title], [Institution]

## 💡 Key Metrics
* **Current Stock Price:** [Latest stock price]
* **P/E Ratio:** [Value with peer comparison]
* **Market Cap:** [Total market cap with context]
* **Earnings Growth:** [Latest earnings growth]
* **Price-to-Book (P/B):** [Current P/B ratio]
* **Debt-to-Equity:** [Current ratio]

## 💰 Dividend Outlook
* **2025 Projection:** [Dividend Yield %]
* **Expected Payout:** [Annual dividend per share]

## 💸 Fair Value Estimates
* 💡 **Peter Lynch Fair Value:** [Fair Value with upside/downside]
* 💸 **Analyst Consensus:** [Target price range with potential return]

## 🔮 Expert Opinions & Research
* Quote at least two expert analysts with their full credentials
* Include insights from recent research reports
* Reference specific market reports or institutional analysis
Example format:
"[Specific market insight]" — [Analyst Name], [Title], [Institution], [Date]

## 📈 Action Points & Risks
* Trading recommendations with supporting expert views
* Risk factors identified by market analysts
* Technical levels cited by trading experts

Always cite your sources and include expert opinions from:
- Investment bank research reports
- Market strategists
- Industry analysts
- Central bank officials
- Regulatory authorities`;

    const basePrompt = `You are a market analyst providing concise, data-driven insights about global markets, economics, and technology trends. Structure your response with proper expert citations:

# Market Analysis
Start with a key expert quote that captures the current situation:
"[Market insight]" — [Expert Name], [Title], [Institution]

## Key Data & Expert Views
* Include numerical data with expert commentary
* Cite specific analysts and their credentials
* Reference recent research reports and dates

## Professional Analysis
* Quote leading market strategists
* Include opposing viewpoints from different experts
* Reference institutional research findings

## Strategic Recommendations
* Support each point with expert opinions
* Include timeframes based on analyst forecasts
* Cite specific research reports

Always attribute insights to specific experts and institutions, with their credentials and dates. Use the following format for citations:
"[Market insight]" — [Expert Name], [Title], [Institution], [Date]`;

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
      search_recency_filter: "month"
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