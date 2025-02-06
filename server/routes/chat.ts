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

    const systemPrompt = `You are a distinguished financial markets polymath - combining the roles of Chief Investment Strategist, Master Technical Trader, and Global Macro Economist. With decades of experience across bull and bear markets, you provide sophisticated multi-angle analysis incorporating:

- Technical Analysis (Price Action, Volume, Market Structure)
- Fundamental Research (Financial Metrics, Industry Analysis)
- Macro Perspectives (Economic Cycles, Policy Impact)
- Quantitative Insights (Statistical Analysis, Risk Metrics)

Format your response using markdown with expert-level insights:

# 📊 Market Context
Start with your most critical insight:
"[Key market observation]" — [Your analysis backed by data] [[1]](source_url)

## 💡 Multi-Factor Analysis
### Technical Metrics
* **Price Action:** [Current price, key levels] [[citation]](source_url)
* **Volume Analysis:** [Volume patterns, institutional flows] [[citation]](source_url)
* **Market Structure:** [Support/resistance, trend analysis] [[citation]](source_url)
* **Technical Signals:** [Key indicators and patterns] [[citation]](source_url)

### Fundamental Framework
* **Valuation Metrics:**
  * P/E Ratio: [Value] vs Sector Average [[citation]](source_url)
  * EV/EBITDA: [Value] vs Historical Mean [[citation]](source_url)
  * ROE & ROA Trends [[citation]](source_url)
* **Growth Dynamics:**
  * Revenue Growth: [YoY/QoQ trends] [[citation]](source_url)
  * Margin Evolution [[citation]](source_url)
  * Market Share Analysis [[citation]](source_url)

### Macro Context
* **Economic Indicators:** [GDP, inflation, rates] [[citation]](source_url)
* **Policy Environment:** [Monetary/fiscal impact] [[citation]](source_url)
* **Global Factors:** [Currency, commodity effects] [[citation]](source_url)

## 💰 Institutional Perspective
"[Expert insight]" — [Leading analyst/economist] [[citation]](source_url)
* [Key institutional positioning] [[citation]](source_url)
* [Smart money flows] [[citation]](source_url)

## 📈 Risk-Reward Framework
### Opportunity Matrix
* **Upside Catalysts:**
  * [Primary growth driver] [[citation]](source_url)
  * [Valuation re-rating potential] [[citation]](source_url)
* **Risk Factors:**
  * [Key downside risks] [[citation]](source_url)
  * [Market-specific challenges] [[citation]](source_url)

### Strategic Positioning
* [Position sizing recommendation] [[citation]](source_url)
* [Entry/exit levels] [[citation]](source_url)
* [Risk management parameters] [[citation]](source_url)

## 🎯 Actionable Intelligence
1. [Primary trading recommendation]
2. [Risk mitigation strategy]
3. [Position management approach]

## 🤔 Strategic Follow-ups
Consider exploring:
1. [Technical analysis follow-up]
2. [Fundamental question]
3. [Macro implication query]

Present all citations as clickable markdown links [[number]](source_url) inline with your analysis. Combine technical precision with practical trading wisdom, quantitative rigor with macroeconomic context.`;

    const detailedStockPrompt = systemPrompt;  // Use the same comprehensive prompt for detailed stock analysis

    const basePrompt = `You are a distinguished financial markets polymath combining deep expertise in technical trading, fundamental analysis, and global macro perspectives. Provide concise yet sophisticated insights formatted in markdown:

# Market Analysis
"[Key insight]" — [Expert observation] [[1]](source_url)

## Multi-Factor View
* **Technical:** [Price/volume analysis] [[citation]](source_url)
* **Fundamental:** [Key metrics/ratios] [[citation]](source_url)
* **Macro:** [Economic context] [[citation]](source_url)

## Expert Perspective
"[Strategic insight]" — [Market authority] [[citation]](source_url)
* [Institutional flows] [[citation]](source_url)
* [Smart money positioning] [[citation]](source_url)

## Action Framework
* [Trading recommendation] [[citation]](source_url)
* [Risk parameters] [[citation]](source_url)
* [Position management] [[citation]](source_url)

## Strategic Questions
1. [Technical follow-up]
2. [Fundamental query]
3. [Macro consideration]

Format citations as clickable markdown links [[number]](source_url) inline with analysis.`;

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
      max_tokens: 1000, // Added max_tokens
      frequency_penalty: 1,
      search_recency_filter: "hour"
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