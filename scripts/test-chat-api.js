import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Test all available endpoints
async function testEndpoints() {
  const message = 'Give me a brief summary of the Indonesian banking sector.';
  const endpoints = [
    'http://localhost:5000/chat',
    'http://localhost:5000/api/chat',
    'http://0.0.0.0:5000/chat',
    'http://0.0.0.0:5000/api/chat'
  ];
  
  // Try the Perplexity API directly
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  
  if (perplexityKey) {
    try {
      console.log('Testing direct Perplexity API connection...');
      
      const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const basePrompt = `You are a test assistant. Today is ${today}.`;
      
      // List of models to try
      const models = [
        "llama-3.1-sonar-small-128k-online",
        "sonar-small-online",
        "sonar-small-chat",
        "mistral-7b-instruct"
      ];
      
      for (const model of models) {
        try {
          console.log(`Trying model: ${model}`);
          
          const requestBody = {
            model: model,
            messages: [
              { role: "system", content: basePrompt },
              { role: "user", content: "Testing 1-2-3" }
            ],
            temperature: 0.2
          };
          
          const response = await axios.post('https://api.perplexity.ai/v1/chat/completions', requestBody, {
            headers: {
              'Authorization': `Bearer ${perplexityKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 10000
          });
          
          console.log(`✅ Model ${model} SUCCESS!`);
          console.log('Response:', JSON.stringify(response.data, null, 2).substring(0, 200) + '...');
          break;
        } catch (error) {
          console.log(`❌ Model ${model} failed:`, error.message);
          if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
          }
        }
      }
    } catch (error) {
      console.error('Error testing Perplexity API directly:', error.message);
    }
  } else {
    console.log('No Perplexity API key found in environment variables. Skipping direct API test.');
  }
  
  console.log('\nTesting local endpoints:');
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      const response = await axios.post(endpoint, 
        { message },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );
      console.log(`✅ ${endpoint} SUCCESS!`);
      console.log('Response:', JSON.stringify(response.data, null, 2).substring(0, 200) + '...');
    } catch (error) {
      console.log(`❌ ${endpoint} failed:`, error.message);
      if (error.response) {
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
      }
    }
  }
}

testEndpoints().catch(console.error);