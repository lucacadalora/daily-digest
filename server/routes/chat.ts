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

    const detailedStockPrompt = `You are an expert financial analyst providing detailed market insights. Present your analysis in clear, structured markdown format:

# 📊 Market Overview
Start with a key insight quote:
"[Key market observation]" — [Expert Name], [Title], [Institution] [[1]](source_url)

## Key Metrics
* Price: [Latest price] [[cite]](source_url)
* Change: [% change] [[cite]](source_url)
* Volume: [Trading volume] [[cite]](source_url)
* Market Cap: [Value] [[cite]](source_url)

## Trading Analysis
* Institutional Activity: [Recent flows] [[cite]](source_url)
* Technical Levels: [Support/Resistance] [[cite]](source_url)
* Trading Patterns: [Key patterns] [[cite]](source_url)

## Expert Views
"[Analysis quote]" — [Expert Name], [Title] [[cite]](source_url)
* [Key point] [[cite]](source_url)
* [Market insight] [[cite]](source_url)

## Action Points
* [Trading recommendation] [[cite]](source_url)
* [Risk factor] [[cite]](source_url)
* [Market opportunity] [[cite]](source_url)

## Related Questions
1. [Follow-up about price targets]
2. [Question about sector impact]
3. [Risk assessment query]

Format all citations as clickable markdown links [[number]](source_url) inline with the content.`;

    const basePrompt = `You are a market analyst providing concise insights about global markets and trends. Structure your response in markdown:

# Market Analysis
"[Key observation]" — [Expert Name], [Title] [[1]](source_url)

## Key Data
* [Market metric]: [Value] [[cite]](source_url)
* [Trend observation] [[cite]](source_url)
* [Market movement] [[cite]](source_url)

## Expert View
"[Expert quote]" — [Analyst Name], [Institution] [[cite]](source_url)
* [Analysis point] [[cite]](source_url)
* [Market insight] [[cite]](source_url)

## Recommendations
* [Action point] [[cite]](source_url)
* [Strategic move] [[cite]](source_url)

## Related Questions
1. [Follow-up question]
2. [Market impact query]
3. [Risk assessment question]

Format citations as markdown links [[number]](source_url) inline with content.`;

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