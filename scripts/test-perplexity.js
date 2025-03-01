// Simple script to test Perplexity API connectivity
import 'dotenv/config';
import axios from 'axios';

async function testPerplexityAPI() {
  console.log('Testing Perplexity API connection...');
  
  // Get API key from environment
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    console.error('ERROR: No API key found in environment variables');
    console.error('Please make sure PERPLEXITY_API_KEY is set in your .env file');
    process.exit(1);
  }
  
  // Log key format (masked)
  const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4);
  console.log(`Using API key: ${maskedKey} (length: ${apiKey.length})`);
  console.log(`Key starts with "pplx-": ${apiKey.startsWith('pplx-')}`);
  
  // Test message with official model IDs
  const requestBody = {
    model: "sonar-pro", // This is the model that's currently working in our application
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello, what's the weather like today?" }
    ]
  };
  
  // Test endpoints
  const endpoints = [
    "https://api.perplexity.ai/chat/completions"
  ];
  
  // Try each endpoint
  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting endpoint: ${endpoint}`);
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 30000
      });
      
      console.log('\nSUCCESS! Received response:');
      console.log('Status:', response.status);
      console.log('Headers:', JSON.stringify(response.headers, null, 2));
      
      if (response.data && response.data.choices && response.data.choices[0]) {
        console.log('\nResponse content:');
        console.log(response.data.choices[0].message.content);
      } else {
        console.log('\nResponse data:', JSON.stringify(response.data, null, 2));
      }
      
      return; // Exit on first success
    } catch (error) {
      console.error(`\nERROR with endpoint ${endpoint}:`);
      
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx range
        console.error('Status:', error.response.status);
        console.error('Status Text:', error.response.statusText);
        console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
        console.error('Response data:', error.response.data);
        
        if (error.response.status === 403) {
          console.error('\n*** 403 FORBIDDEN ERROR ***');
          console.error('This usually means one of the following:');
          console.error('1. Your API key is incorrect or has been revoked');
          console.error('2. Your account does not have permission to use this model');
          console.error('3. Your account has reached its quota limit');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
      
      // Generate equivalent curl command for manual testing
      const curlCmd = `curl -X POST "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer ${maskedKey}" \\
  -d '${JSON.stringify(requestBody)}'`;
      
      console.log('\nEquivalent curl command for manual testing:');
      console.log(curlCmd);
    }
  }
  
  console.error('\nAll endpoints failed. Please check your API key and account permissions.');
}

// Run the test
testPerplexityAPI().catch(err => {
  console.error('Unhandled error during test:', err);
});