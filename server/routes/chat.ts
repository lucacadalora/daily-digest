import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Pre-process to fix number formatting
  text = text.replace(/\[\d+\]/g, ''); // Remove citations
  text = text.replace(/(\d+)\s*[•.-]\s*(\d+)(x?)/g, '$1.$2$3'); // Fix split numbers
  text = text.replace(/\s+/g, ' ').trim(); // Clean up spaces

  // Split into paragraphs and filter empty lines
  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  let formattedResponse = "";

  // Process content
  paragraphs.forEach((paragraph, index) => {
    // Handle Analysis Highlights header specially
    if (/^Analysis Highlights/i.test(paragraph)) {
      formattedResponse += "📊 Analysis Highlights:\n\n";
      return;
    }

    // Format the paragraph based on content
    let formattedParagraph = paragraph;

    // Format bullet points
    if (/^\s*[•-]/.test(paragraph)) {
      formattedParagraph = formattedParagraph.replace(/^\s*[•-]\s*/, '• ');
    }

    // Add emojis based on content type
    if (/price|market cap|ratio|dividend/i.test(formattedParagraph)) {
      formattedParagraph = `📈 ${formattedParagraph}`;
    } else if (/growth|increase|performance/i.test(formattedParagraph)) {
      formattedParagraph = `📊 ${formattedParagraph}`;
    } else if (/risk|warning|caution/i.test(formattedParagraph)) {
      formattedParagraph = `⚠️ ${formattedParagraph}`;
    } else if (/recommend|opportunity|strategy/i.test(formattedParagraph)) {
      formattedParagraph = `💡 ${formattedParagraph}`;
    }

    // Add the formatted paragraph
    formattedResponse += formattedParagraph + "\n\n";
  });

  return formattedResponse.trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error('Missing PERPLEXITY_API_KEY');
    }

    // Enhanced financial terms regex
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b|\bIDX:\s*[A-Z]+\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I apologize, but I can only assist with questions related to financial markets, economic analysis, and investment insights. Please ask questions within these domains."
      });
    }

    console.log('Processing financial query:', message);

    const systemPrompt = `You are an expert financial analyst specializing in Indonesian market analysis and investment research.
Your response must start with "Analysis Highlights:" followed by a comprehensive analysis.

Format your response exactly as follows (including all sections):

Analysis Highlights:
[Brief overview of key points]

Price Action
• Current stock price: [exact value]
• Recent trading range
• Volume trends

Key Metrics
• Market Cap: [value in IDR]
• P/E Ratio: [value]
• Trading Volume: [average]
• Revenue Growth: [YoY %]

Growth & Performance
• Historical performance
• Market position
• Competitive strengths
• Recent developments

Expert Analysis
• Market sentiment
• Industry trends
• Strategic outlook
• Key challenges

Investment Assessment
• Growth catalysts
• Risk factors
• Technical levels
• Price targets

Use bullet points and exact numbers throughout your analysis.`;

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-small-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const rawContent = response.data.choices[0].message.content;
    console.log('Raw content before formatting:', rawContent);

    const formattedReply = formatResponse(rawContent);
    console.log('Formatted reply:', formattedReply);

    if (!formattedReply || formattedReply.trim().length === 0) {
      throw new Error('Empty formatted response');
    }

    res.json({
      status: 'success',
      reply: formattedReply
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    res.status(500).json({
      status: 'error',
      error: 'Failed to get response from AI',
      details: errorMessage
    });
  }
});

export default router;