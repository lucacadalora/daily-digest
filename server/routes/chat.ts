import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Pre-process to fix number formatting
  text = text.replace(/\[\d+\]/g, ''); // Remove citations
  text = text.replace(/(\d+)\s*[•.-]\s*(\d+)(x?)/g, '$1.$2$3'); // Fix split numbers
  text = text.replace(/\s+/g, ' ').trim(); // Clean up spaces

  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  let formattedResponse = "";
  let currentSection = "";
  let sectionContent: string[] = [];

  // Process content
  paragraphs.forEach((paragraph, index) => {
    // Handle Analysis Highlights header
    if (index === 0 && /analysis|overview|summary/i.test(paragraph)) {
      formattedResponse += "📊 Analysis Highlights:\n\n";
      return;
    }

    // Detect section headers but preserve original formatting
    if (/^[\d.]*\s*Price\s*Action/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "## Price Action\n\n";
      currentSection = "price";
    }
    else if (/^[\d.]*\s*Key\s*Metrics/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "⚡ Key Metrics\n\n";
      currentSection = "metrics";
    }
    else if (/^[\d.]*\s*Growth|Performance/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "🚀 Growth & Performance\n\n";
      currentSection = "growth";
    }
    else if (/^[\d.]*\s*Expert\s*Analysis/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "💬 Expert Analysis\n\n";
      currentSection = "expert";
    }
    else if (/^[\d.]*\s*Investment/i.test(paragraph)) {
      if (sectionContent.length) {
        formattedResponse += sectionContent.join('\n') + '\n\n';
        sectionContent = [];
      }
      formattedResponse += "💡 Investment Assessment\n\n";
      currentSection = "investment";
    }
    else {
      // Format content based on type
      let formattedParagraph = paragraph;

      // Format bullet points
      if (/^\s*[•-]/.test(paragraph)) {
        formattedParagraph = paragraph.replace(/^\s*[•-]\s*/, '• ');
      }

      // Add special formatting based on content
      if (/price|value|ratio|yield|cap/i.test(formattedParagraph)) {
        formattedParagraph = `📊 ${formattedParagraph}`;
      } else if (/growth|increase|decrease/i.test(formattedParagraph)) {
        formattedParagraph = `📈 ${formattedParagraph}`;
      } else if (/risk|warning|caution/i.test(formattedParagraph)) {
        formattedParagraph = `⚠️ ${formattedParagraph}`;
      }

      sectionContent.push(formattedParagraph);
    }
  });

  // Add any remaining content
  if (sectionContent.length) {
    formattedResponse += sectionContent.join('\n');
  }

  return formattedResponse.trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('Missing PERPLEXITY_API_KEY');
      throw new Error('API key not configured');
    }

    // Enhanced financial terms regex
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b|\bIDX:\s*[A-Z]+\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        status: 'success',
        reply: "I'm specialized in financial market analysis. Please ask questions about stocks, market trends, company valuations, or investment insights."
      });
    }

    console.log('Processing financial query:', message);

    const systemPrompt = `You are an expert financial analyst specializing in Indonesian market analysis and investment research. 
Start your response with 'Analysis Highlights:' followed by a concise summary. Then structure your detailed analysis as follows:

Price Action
- Current stock price with exact value
- Recent price movements and trends
- Trading volume and momentum analysis

Key Metrics
• Current Price: [exact value]
• P/E Ratio: [value]
• Market Cap: [value in IDR]
• Trading Volume: [average daily]

Growth & Performance
• Recent performance metrics
• Revenue growth and trends
• Market position analysis
• Key business developments

Expert Analysis
• Market sentiment and outlook
• Competitive advantages/risks
• Industry position
• Strategic initiatives

Investment Assessment
• Growth opportunities
• Risk considerations
• Technical support/resistance levels
• Price targets and recommendations

Always:
- Include exact numbers and metrics
- Use bullet points for key data
- Keep insights actionable and clear
- Focus on recent market data`;

    console.log('Sending request to Perplexity API...');
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
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
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Invalid API response structure:', response.data);
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
      reply: formattedReply,
      status: 'success' 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: errorMessage,
      status: 'error'
    });
  }
});

export default router;