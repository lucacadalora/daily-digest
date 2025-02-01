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
    formattedResponse += sectionContent.join('\n') + '\n';
  }

  return formattedResponse.trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Enhanced financial terms regex
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b|\bIDX:\s*[A-Z]+\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        reply: "I'm specialized in financial market analysis. Please ask questions about stocks, market trends, company valuations, or investment insights. For example:\n\n• Analyze BBRI's current valuation and dividend outlook\n• What's the investment thesis for ADRO in 2025?\n• How is TLKM performing compared to its peers?\n• Assess ASII's growth prospects",
        status: 'success'
      });
    }

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: `You are an expert financial analyst specializing in Indonesian market analysis and investment research. Start your response with 'Analysis Highlights:' and then provide detailed analysis following this structure:

Price Action
- Current stock price and recent movement
- Trading volume and momentum indicators
- Key support and resistance levels

Key Metrics
• Current Price: [exact value]
• P/E Ratio: [value]
• Market Cap: [value]
• Trading Volume: [recent average]
[Add other relevant metrics with bullet points]

Growth & Performance
• Year-to-date performance
• Revenue growth trends
• Market share analysis
• Operational highlights

Expert Analysis
• Include relevant analyst quotes
• Key insights about company strategy
• Competitive position
• Market sentiment

Investment Assessment
• Growth catalysts
• Risk factors
• Technical outlook
• Price targets

Guidelines:
- Use bullet points for key information
- Include exact numbers where available
- Keep insights concise and actionable
- Focus on recent developments`
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

    const formattedReply = formatResponse(response.data.choices[0].message.content);

    res.json({ 
      reply: formattedReply,
      status: 'success' 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      status: 'error'
    });
  }
});

export default router;