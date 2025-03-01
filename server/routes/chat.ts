import express from "express";
import axios from "axios";
import { log } from "../vite";

const router = express.Router();

// Validate Perplexity API key format
function isValidPerplexityKey(key: string): boolean {
  return typeof key === 'string' && key.startsWith('pplx-');
}

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

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      log('Error: Missing API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error: Missing API key'
      });
    }

    // Log key status for debugging (without exposing the actual key)
    const keyPrefix = apiKey.substring(0, 5);
    const isValid = isValidPerplexityKey(apiKey);
    log(`API Key validation: prefix=${keyPrefix}..., isValid=${isValid}`);

    if (!isValid) {
      log('Error: Invalid API key format');
      return res.status(500).json({
        status: 'error',
        error: 'Invalid API key format. Key should start with "pplx-"'
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

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    log('Preparing system prompt...');
    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Today is ${today}. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    // Using axios directly instead of OpenAI client library
    log('Sending direct request to Perplexity API...');
    const requestBody = {
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
      max_tokens: 1000
    };

    const apiResponse = await axios.post('https://api.perplexity.ai/v1/chat/completions', requestBody, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000
    });

    const response = apiResponse.data;
    
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
    
    // Handle axios errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      statusCode = error.response.status;
      
      if (statusCode === 401) {
        errorMessage = 'Invalid API key. Please check your configuration.';
      } else if (statusCode === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else {
        errorMessage = `API error (${statusCode}): ${error.response.data?.error?.message || 'Unknown error'}`;
      }
      
      log(`API Error response: ${statusCode}`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from API server. Please try again later.';
      log('No response error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || 'Unknown error occurred';
      log('Request setup error:', error.message);
    }

    log('Error in chat endpoint:', errorMessage);
    res.status(statusCode).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;