import express from "express";
import axios from "axios";
import type { APIError } from "openai";
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

    // Get API key from environment
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    // Check if API key is valid
    if (apiKey && isValidPerplexityKey(apiKey)) {
      try {
        log('Making request to Perplexity API...');
        
        // Make the API request to Perplexity using the Sonar model
        // No custom system prompt - letting the model use its default behavior
        const perplexityResponse = await axios.post(
          'https://api.perplexity.ai/chat/completions',
          {
            model: 'sonar-small-chat',  // Use the Sonar model
            messages: [
              { role: 'user', content: message }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          }
        );

        if (!perplexityResponse?.data?.choices?.[0]?.message?.content) {
          throw new Error('Invalid API response format');
        }

        const result = {
          status: 'success',
          reply: perplexityResponse.data.choices[0].message.content.trim()
        };

        log('Sending successful response from API');
        return res.json(result);
      } catch (err) {
        const apiError = err as Error;
        log('Error making API request, falling back to simulation mode:', apiError.message);
        // Fall back to simulation mode on API error
      }
    } else {
      log('No valid API key found, using simulation mode');
    }
    
    // Simple simulation mode - just enough to test the UI
    log('Running in simulation mode');
    
    // Generate a simple response for a general-purpose chatbot
    let simulatedResponse = "";
    
    // Convert to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage === 'hey') {
      simulatedResponse = "Hello! I'm a general-purpose assistant running in simulation mode. How can I help you today?";
    } else if (lowerMessage.includes('how are you')) {
      simulatedResponse = "I'm doing well, thanks for asking! I'm currently running in simulation mode, but I can still chat with you.";
    } else if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
      simulatedResponse = "I'm an AI assistant powered by Perplexity's Sonar model. I'm currently running in simulation mode since I don't have access to the actual API.";
    } else if (lowerMessage.includes('weather')) {
      simulatedResponse = "I'm in simulation mode so I can't check the current weather. When properly configured with a valid API key, I'll be able to provide more helpful responses.";
    } else if (lowerMessage.includes('joke')) {
      simulatedResponse = "Why don't scientists trust atoms? Because they make up everything! (Note: I'm responding in simulation mode since I don't have access to the Perplexity API)";
    } else if (lowerMessage.includes('ai') && (lowerMessage.includes('work') || lowerMessage.includes('function'))) {
      simulatedResponse = "AI systems like me work through pattern recognition in large datasets. Modern AI uses neural networks trained on massive amounts of text to predict what might come next in a sequence. This allows me to generate responses that seem natural and contextually appropriate. When properly configured with the Perplexity API, I'll have even better capabilities!";
    } else if (lowerMessage === 'jakarta' || lowerMessage.includes('jakarta')) {
      simulatedResponse = "Jakarta is the capital city of Indonesia. It's located on the northwest coast of Java island and is the country's economic, cultural, and political center. With a population of over 10 million in the city proper, it's one of the most populous urban areas in the world. (Note: I'm responding in simulation mode)";
    } else if (lowerMessage.includes('help')) {
      simulatedResponse = "I'm here to help answer questions and provide information on a wide range of topics. While I'm currently in simulation mode with limited capabilities, once configured with a valid Perplexity API key, I'll be able to assist with more complex queries. What would you like to know about?";
    } else if (lowerMessage.includes('api key') || lowerMessage.includes('apikey') || lowerMessage.includes('perplexity')) {
      simulatedResponse = "To use the Perplexity API, you'll need a valid API key that starts with 'pplx-'. You can get one by signing up at Perplexity's website. Once you have the key, you'll need to add it to your environment variables. I'm currently running in simulation mode because I don't have access to a valid API key.";
    } else if (lowerMessage.includes('python') || lowerMessage.includes('javascript') || lowerMessage.includes('code')) {
      simulatedResponse = "I can help with programming concepts and code examples when properly configured with a valid Perplexity API key. In simulation mode, I have limited capabilities, but I'd be happy to try answering basic programming questions.";
    } else if (lowerMessage.includes('thank')) {
      simulatedResponse = "You're welcome! I'm happy to help, even in simulation mode. Let me know if you have any other questions.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('date') || lowerMessage.includes('day')) {
      simulatedResponse = "I'm in simulation mode so I don't have access to the current time or date. With a valid Perplexity API key, I'd be able to provide real-time information.";
    } else {
      simulatedResponse = `I'm a general-purpose AI assistant currently running in simulation mode. When properly configured with a valid Perplexity API key, I'll be able to provide more helpful and detailed responses to your questions.

To enable the full chatbot capabilities, please configure a valid Perplexity API key.`;
    }

    const result = {
      status: 'success',
      reply: simulatedResponse
    };

    log('Sending simulated response');
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
    } else if (apiError.status === 403) {
      errorMessage = 'Access forbidden. Please check your API permissions.';
      statusCode = 403;
    } else if (apiError.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (apiError.status === 404) {
      errorMessage = 'API endpoint not found. Please check the API URL.';
      statusCode = 404;
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