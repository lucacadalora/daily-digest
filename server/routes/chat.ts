import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Log environment check
    console.log('Environment check:', {
      hasApiKey: !!process.env.PERPLEXITY_API_KEY,
      nodeEnv: process.env.NODE_ENV,
      apiKeyLength: process.env.PERPLEXITY_API_KEY?.length
    });

    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('API Key missing in deployment environment');
      throw new Error('Missing PERPLEXITY_API_KEY in environment');
    }

    const restrictedTerms = /\b(sql injection|xss|database schema|api endpoint|code syntax|programming language|compiler|runtime|debugging)\b/i;
    if (restrictedTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I focus on business, market, and investment analysis. For coding-related questions, please consult programming-specific resources."
      });
    }

    console.log('Processing query:', message);

    const systemPrompt = `You are an expert financial and business analyst specializing in market analysis and investment research. Format your response using markdown syntax:

# 📊 Market Context
[Provide a concise market context about the topic, focusing on recent significant developments and current positioning]

## 💡 Key Metrics
* **[Key Metric 1]:** [Value with comparison to peers or historical data]
* **[Key Metric 2]:** [Value with relevant context]
* **[Key Metric 3]:** [Value with growth or trend information]

## 📈 Detailed Analysis
[Comprehensive analysis of current situation, market position, and growth trajectory]

## 🎯 Expert Perspective
> "[Insert relevant expert quote with specific metrics or insights]"
— [Expert Name], [Organization]

## 💫 Growth Opportunities
* [Key growth catalyst]
* [Market expansion possibility]
* [Competitive advantage]

## ⚠️ Risk Factors
* [Primary risk]
* [Market challenge]
* [Operational concern]

## 📝 Bottom Line
[Concise conclusion summarizing key points and actionable insights]`;

    // Log API request details
    const requestConfig = {
      url: 'https://api.perplexity.ai/chat/completions',
      model: "sonar",
      messageLength: message.length,
      hasSystemPrompt: true
    };
    console.log('Making API request with config:', requestConfig);

    const response = await axios.post(
      requestConfig.url,
      {
        model: "sonar",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
        },
        timeout: 30000
      }
    );

    // Log successful API response metadata
    console.log('API Response metadata:', {
      status: response.status,
      hasData: !!response.data,
      hasChoices: !!response.data?.choices,
      contentLength: response.data?.choices?.[0]?.message?.content?.length
    });

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(response.data));
      throw new Error('Invalid API response format');
    }

    const content = response.data.choices[0].message.content;
    const citations = response.data.citations || [];

    res.json({
      status: 'success',
      reply: content.trim(),
      citations: citations
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    // Enhanced error logging
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        requestConfig: error.config,
        headers: error.response?.headers
      });

      // Return more specific error messages based on status codes
      if (error.response?.status === 401) {
        return res.status(500).json({
          status: 'error',
          error: 'Authentication failed - API key may be invalid',
          details: 'Please check if the API key is correctly set in the deployment environment'
        });
      } else if (error.response?.status === 429) {
        return res.status(500).json({
          status: 'error',
          error: 'Rate limit exceeded',
          details: 'Too many requests, please try again later'
        });
      }
    }

    res.status(500).json({
      status: 'error',
      error: 'Failed to get response from AI',
      details: errorMessage
    });
  }
});

export default router;