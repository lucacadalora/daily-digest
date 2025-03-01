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
  // Perplexity API keys always start with "pplx-" and consist of alphanumeric characters
  // They are typically 40+ characters long
  if (typeof key !== 'string') {
    console.error('API key is not a string');
    return false;
  }
  
  if (!key.startsWith('pplx-')) {
    console.error('API key does not start with "pplx-"');
    return false;
  }
  
  if (key.length < 20) {
    console.error('API key is too short, should be at least 20 characters');
    return false;
  }
  
  // Check for valid characters (alphanumeric plus possibly some special chars)
  const validKeyPattern = /^pplx-[a-zA-Z0-9_\-]+$/;
  if (!validKeyPattern.test(key)) {
    console.error('API key contains invalid characters');
    return false;
  }
  
  return true;
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

    safeLog('Preparing optimized system prompt...');
    const basePrompt = `Financial analyst. Today: ${today}. Answer only financial/market/investment questions concisely.`;

    // Using axios directly instead of OpenAI client library
    safeLog('Sending direct request to Perplexity API...');
    
    // Extract speed preference from the query if present
    const speedParam = message.match(/\[speed=(fast|balanced|accurate)\]/i);
    const speedPreference = speedParam ? speedParam[1].toLowerCase() : 'balanced';
    
    // Remove the speed parameter from the message if present and create a clean version
    let cleanedMessage = message;
    if (speedParam) {
      cleanedMessage = message.replace(speedParam[0], '').trim();
    }
    
    // Optimized: Prioritize models that we've confirmed working reliably
    // Prioritizing models that actually work over ones that return errors
    const modelOptions = [
      "sonar-pro",               // Most reliable model with good performance - our main model
      "pplx-7b-chat",            // Backup smaller model
      "llama-3-8b-instant",      // Fast Meta Llama 3 model but sometimes returns 400 errors
    ];
    
    console.log(`Speed preference: ${speedPreference}, starting with model: ${modelOptions[0]}`);
    
    // Using the standardized endpoint as recommended in the documentation
    const endpointOptions = [
      "https://api.perplexity.ai/chat/completions" // This is the correct endpoint as per Perplexity documentation
    ];
    
    // Simplify the request body to include only required parameters
    // Strictly follow Perplexity documentation
    const requestBody = {
      model: modelOptions[0],
      messages: [
        { 
          role: "system", 
          content: basePrompt
        },
        { role: "user", content: cleanedMessage }
      ]
    };
    
    // Log the API key format (masked for security)
    const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4);
    console.log(`Using API key format: ${maskedKey} (length: ${apiKey.length})`);
    
    // For debugging purposes, log if the key starts with "pplx-"
    console.log(`API key starts with "pplx-": ${apiKey.startsWith('pplx-')}`);
    
    // Output exact format of the first request for debugging
    const debugRequestBody = JSON.stringify(requestBody, null, 2);
    console.log(`Request body format:\n${debugRequestBody}`);
    
    // Output cURL equivalent command for manual testing (with masked API key)
    const maskedCurlCommand = `curl -X POST "${endpointOptions[0]}" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer ${maskedKey}" \\
  -d '${debugRequestBody}'`;
    
    console.log("Equivalent cURL command for testing:");
    console.log(maskedCurlCommand);

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
          
          // Optimized request with shorter timeout and network optimizations
          apiResponse = await axios.post(endpoint, requestBody, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Connection': 'keep-alive',           // Keep connection alive for faster subsequent requests
              'Accept-Encoding': 'gzip, deflate',   // Accept compressed responses for faster data transfer
              'Cache-Control': 'no-cache'           // Ensure fresh responses
            },
            timeout: 15000,                         // Shorter timeout for faster failure detection
            responseType: 'json',                   // Explicitly request JSON for faster parsing
            maxRedirects: 3,                        // Limit redirects
            decompress: true                        // Auto-decompress responses
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
          console.error('401 Authentication Error: API key rejected. Make sure your key is valid and properly formatted.');
        } else if (statusCode === 403) {
          errorMessage = 'Access forbidden. Please make sure your API key is active and has the necessary permissions.';
          console.error('403 Forbidden Error: This usually indicates an API key permissions issue or account restriction.');
          console.error('Please verify in your Perplexity account that your key is active and has required permissions.');
          
          // Log request details for debugging
          safeLog(`403 Error Details - URL: ${axiosError.config?.url}, Method: ${axiosError.config?.method}`);
          
          // Check if there's a specific error message in the response
          const responseData = axiosError.response.data as any;
          if (responseData?.error?.message) {
            console.error(`API provided error message: ${responseData.error.message}`);
          }
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