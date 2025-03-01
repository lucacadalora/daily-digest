import express from "express";
import axios from "axios";
import { log } from "../vite";

const router = express.Router();

// Safer logging to prevent API key exposure
function safeLog(message: string, data?: any): void {
  if (!data) {
    log(message);
    return;
  }
  
  try {
    // For objects, create a sanitized copy
    if (typeof data === 'object' && data !== null) {
      // Deep clone the object to avoid modifying the original
      const sanitized = JSON.parse(JSON.stringify(data));
      
      // Sanitize authorization headers or any obvious API key patterns
      const sanitizeObject = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeObject(obj[key]);
          } else if (
            // Sanitize potential sensitive fields
            (typeof key === 'string' && 
             (key.toLowerCase().includes('auth') || 
              key.toLowerCase().includes('key') || 
              key.toLowerCase().includes('secret') || 
              key.toLowerCase().includes('token'))) ||
            // Sanitize values that look like API keys
            (typeof obj[key] === 'string' && 
             (obj[key].startsWith('pplx-') || 
              obj[key].includes('Bearer')))
          ) {
            obj[key] = '[REDACTED]';
          }
        }
      };
      
      sanitizeObject(sanitized);
      log(message, sanitized);
    } else {
      // For non-objects, just log the message and data directly
      log(message, data);
    }
  } catch (error) {
    // If anything goes wrong with sanitization, just log the message without the data
    log(`${message} (data omitted due to sanitization error)`);
  }
}

// Validate Perplexity API key format
function isValidPerplexityKey(key: string): boolean {
  return typeof key === 'string' && key.startsWith('pplx-');
}

// Root endpoint and named endpoint both work
router.post(["/", "/chat"], async (req, res) => {
  try {
    safeLog('Received chat request:', req.body);

    const { message } = req.body;
    if (!message) {
      safeLog('Error: Message is required');
      return res.status(400).json({
        status: 'error',
        error: 'Message is required'
      });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      safeLog('Error: Missing API key');
      return res.status(500).json({
        status: 'error',
        error: 'API Configuration Error: Missing API key'
      });
    }

    // Log key status for debugging (without exposing the actual key)
    const keyPrefix = apiKey.substring(0, 5);
    const isValid = isValidPerplexityKey(apiKey);
    safeLog(`API Key validation: prefix=${keyPrefix}..., isValid=${isValid}`);

    if (!isValid) {
      safeLog('Error: Invalid API key format');
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

    safeLog('Preparing system prompt...');
    const basePrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Today is ${today}. Provide clear, concise, and accurate information based on your extensive knowledge of global financial markets, company valuations, and investment analysis.

Only answer questions related to financial markets, investments, economic trends, and business analysis. If the question is outside these domains, inform the user that you can only assist with market-related queries.`;

    // Using axios directly instead of OpenAI client library
    safeLog('Sending direct request to Perplexity API...');
    
    // Try different model options since we're getting 404 errors
    // Perplexity API models to try in order of preference
    const modelOptions = [
      "sonar-medium-chat",           // Perplexity's mid-size model
      "sonar-small-chat",            // Perplexity's small model
      "sonar-medium-online",         // Another name for the same model
      "sonar-small-online",          // Another name for the same model
      "mistral-7b-instruct",         // Mistral's model
      "mistral-medium",              // Another option
      "llama-3-8b-instruct",         // Meta's model
      "llama-2-70b-chat",            // Older but more widely supported
      "mixtral-8x7b-instruct",       // Mixtral model
      "gpt-3.5-turbo"                // OpenAI fallback option
    ];
    
    // Alternative endpoints to try
    const endpointOptions = [
      "https://api.perplexity.ai/v1/chat/completions",
      "https://api.perplexity.ai/chat/completions", 
      "https://api.perplexity.ai/v1/messages",
      "https://api.perplexity.ai/messages",
      // Different formats entirely
      "https://perplexity.ai/api/v1/chat/completions",
      "https://perplexity.ai/api/chat/completions",
      // Yet another possible endpoint structure
      "https://labs-api.perplexity.ai/chat/completions"
    ];
    
    // Use the first model in our list
    const requestBody = {
      model: modelOptions[0],
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

    // Try each endpoint and model combination in sequence until one works
    let apiResponse;
    let modelUsed = '';
    let endpointUsed = '';
    let lastError;

    // Try each endpoint
    for (const endpoint of endpointOptions) {
      // Try each model with this endpoint
      for (const model of modelOptions) {
        try {
          safeLog(`Trying endpoint: ${endpoint}, model: ${model}`);
          requestBody.model = model;
          
          apiResponse = await axios.post(endpoint, requestBody, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 30000
          });
          
          modelUsed = model;
          endpointUsed = endpoint;
          safeLog(`Successfully connected using endpoint: ${endpoint}, model: ${model}`);
          break; // Exit the inner loop if successful
        } catch (error) {
          safeLog(`Endpoint ${endpoint}, model ${model} failed with error:`, axios.isAxiosError(error) ? error.message : 'Unknown error');
          lastError = error;
        }
      }
      
      // If we found a working endpoint+model, break out of the outer loop too
      if (apiResponse) {
        break;
      }
    }
    
    // If all combinations failed, throw the last error
    if (!apiResponse) {
      safeLog('All endpoint and model combinations failed, using the last error');
      throw lastError || new Error('Failed to connect to Perplexity API with all endpoint and model combinations');
    }

    const response = apiResponse.data;
    
    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }
    
    safeLog(`Using endpoint: ${endpointUsed}, model: ${modelUsed} - Response received`);
    
    const result = {
      status: 'success',
      reply: response.choices[0].message.content.trim(),
      model: modelUsed,
      endpoint: endpointUsed.replace(/https:\/\/api\.perplexity\.ai/, '') // Just show the path for brevity
    };

    safeLog('Sending successful response:', { status: 'success', model: modelUsed, endpoint: endpointUsed });
    res.json(result);

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle axios errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      // This is an Axios error
      const axiosError = error;
      
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        statusCode = axiosError.response.status;
        
        if (statusCode === 401) {
          errorMessage = 'Invalid API key. Please check your configuration.';
        } else if (statusCode === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (statusCode === 404) {
          errorMessage = 'The API endpoint is not found. Please check the URL.';
          
          // Additional logging for 404 errors to debug the endpoint issue
          safeLog(`404 Error Details - URL: ${axiosError.config?.url}, Method: ${axiosError.config?.method}`);
          
          // Try an alternative URL format if we're getting 404s
          errorMessage = 'Unable to reach Perplexity API. Please verify the API endpoint and model availability.';
        } else {
          const responseData = axiosError.response.data as any;
          errorMessage = `API error (${statusCode}): ${responseData?.error?.message || 'Unknown error'}`;
        }
        
        safeLog(`API Error response: ${statusCode}`, axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from API server. Please try again later.';
        safeLog('No response error:', { requestURL: axiosError.config?.url });
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = axiosError.message || 'Unknown error occurred';
        safeLog('Request setup error:', axiosError.message);
      }
    } else {
      // Non-Axios error
      const genericError = error as Error;
      errorMessage = genericError?.message || 'Unknown error occurred';
      safeLog('Non-Axios error:', genericError?.message || 'Unknown error type');
    }

    safeLog('Error in chat endpoint:', errorMessage);
    res.status(statusCode).json({
      status: 'error',
      error: errorMessage
    });
  }
});

export default router;