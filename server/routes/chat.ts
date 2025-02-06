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
      log('Error: Missing Perplexity API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error: Missing Perplexity API key'
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

    log('Sending request to Perplexity API...');
    const response = await client.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { 
          role: "system", 
          content: "You are an expert financial and business analyst specializing in market analysis and investment research. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis."
        },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000,
      frequency_penalty: 1
    });

    if (!response?.choices?.[0]?.message?.content) {
      log('Error: Invalid API response format');
      throw new Error('Invalid API response format');
    }

    log('Received API Response');

    const result = {
      status: 'success',
      reply: response.choices[0].message.content.trim()
    };

    log('Sending successful response');
    res.json(result);

  } catch (error) {
    log('Chat API Error:', error);
    let errorMessage = 'Unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
      // Log detailed error information
      log('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    log('Error in chat endpoint:', errorMessage);
    res.status(500).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;