import express from "express";
import OpenAI from "openai";
import type { APIError } from "openai";

const router = express.Router();

// Helper function to send SSE messages
function sendSSE(res: express.Response, data: any) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
    if (!apiKey) {
      console.error('Missing Perplexity API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error',
        details: 'Missing Perplexity API key'
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

    // Configure response headers for SSE if requested
    if (req.headers.accept === 'text/event-stream') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();
    }

    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Important: Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai",
      defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (req.headers.accept === 'text/event-stream') {
      try {
        const stream = await client.chat.completions.create({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            { role: "system", content: basePrompt },
            { role: "user", content: message }
          ],
          temperature: 0.2,
          top_p: 0.9,
          stream: true
        });

        let fullContent = '';

        for await (const chunk of stream) {
          if (chunk.choices[0]?.delta?.content) {
            const content = chunk.choices[0].delta.content;
            fullContent += content;
            sendSSE(res, {
              status: 'chunk',
              content: content
            });
          }
        }

        sendSSE(res, {
          status: 'complete',
          content: fullContent
        });

        res.end();
        return;
      } catch (error) {
        console.error('Streaming Error:', error);
        const apiError = error as APIError;
        sendSSE(res, {
          status: 'error',
          error: apiError.message
        });
        res.end();
        return;
      }
    }

    // Non-streaming response
    const response = await client.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { role: "system", content: basePrompt },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.9
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const content = response.choices[0].message.content;
    res.json({
      status: 'success',
      reply: content.trim()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        error: 'API Error',
        details: errorMessage
      });
    }
  }
});

export default router;