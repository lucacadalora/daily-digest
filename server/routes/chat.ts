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

    log('Initializing Perplexity client...');
    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.perplexity.ai",
      defaultHeaders: {
        'Accept': 'application/json',
      }
    });

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    log('Preparing system prompt...');
    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Today is ${today}. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    log('Sending request to Perplexity API...');
    const response = await client.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { 
          role: "system", 
          content: basePrompt
        },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000,
      frequency_penalty: 1
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const result = {
      status: 'success',
      reply: response.choices[0].message.content.trim()
    };

    log('Sending successful response:', JSON.stringify(result));
    res.json(result);

  } catch (error) {
    console.error('Chat API Error:', error);
    const apiError = error as APIError;

    // Handle specific API errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (apiError.status === 401) {
      errorMessage = 'Invalid API key. Please check your configuration.';
      statusCode = 401;
    } else if (apiError.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else {
      errorMessage = apiError.message || 'Unknown error occurred';
      statusCode = apiError.status || 500;
    }

    log('Error in chat endpoint:', errorMessage);
    res.status(statusCode).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;