import express from "express";
import axios from "axios";

const router = express.Router();

function formatResponse(text: string): string {
  // Pre-process to fix number formatting
  text = text.replace(/\[\d+\]/g, ''); // Remove all citations
  text = text.replace(/(\d+)\s*[•.-]\s*(\d+)(x?)/g, '$1.$2$3'); // Fix split numbers
  text = text.replace(/\s+/g, ' ').trim(); // Clean up extra spaces

  // Split into paragraphs and sentences
  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);

  let formattedResponse = "";
  let keyMetrics = [];
  let quotes = [];
  let sections = {};

  // First pass: Categorize content
  paragraphs.forEach(paragraph => {
    // Collect key metrics
    if (/^(P\/?E|P\/?B|ROE|EPS|Dividend Yield|Market Cap|Revenue|EBITDA|Net Profit|Price Target|Current Price|Payout Ratio):/i.test(paragraph)) {
      keyMetrics.push(paragraph);
    }
    // Collect analyst quotes
    else if (/^[""].*[""].*—.*$/i.test(paragraph)) {
      quotes.push(paragraph);
    }
    // Group sections
    else if (/^(Key|Analysis|Market|Risk|Investment|Technical|Fundamental|Valuation|Growth|Outlook|Catalyst)/i.test(paragraph)) {
      const sectionName = paragraph;
      sections[sectionName] = [];
    }
    else if (Object.keys(sections).length > 0) {
      const lastSection = Object.keys(sections)[Object.keys(sections).length - 1];
      sections[lastSection].push(paragraph);
    }
  });

  // Build the response
  // 1. Start with key metrics
  if (keyMetrics.length > 0) {
    formattedResponse += "📊 Key Metrics:\n";
    keyMetrics.forEach(metric => {
      formattedResponse += `💎 ${metric}\n`;
    });
    formattedResponse += "\n";
  }

  // 2. Add analyst quotes if available
  if (quotes.length > 0) {
    formattedResponse += "💬 Expert Analysis:\n";
    quotes.forEach(quote => {
      formattedResponse += `${quote}\n`;
    });
    formattedResponse += "\n";
  }

  // 3. Add sections with their content
  Object.entries(sections).forEach(([sectionName, content]) => {
    // Choose emoji based on section content
    let emoji = "📈";
    if (/Risk|Warning|Caution/i.test(sectionName)) {
      emoji = "⚠️";
    } else if (/Investment|Strategy|Recommendation|Catalyst/i.test(sectionName)) {
      emoji = "💡";
    }

    formattedResponse += `${emoji} ${sectionName}\n`;
    content.forEach(paragraph => {
      // Check if paragraph contains important points
      if (/^[•-]/.test(paragraph) || /\b(key|major|significant|critical|important)\b/i.test(paragraph)) {
        formattedResponse += `• ${paragraph}\n`;
      } else {
        formattedResponse += `${paragraph}\n`;
      }
    });
    formattedResponse += "\n";
  });

  return formattedResponse.trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Enhanced financial terms regex for better coverage
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|IDX:|NYSE:|NASDAQ:|mining|coal|commodity|volume)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b/i;

    if (!financialTerms.test(message)) {
      return res.json({
        reply: "I'm specialized in financial market analysis. Please ask questions about stocks, market trends, company valuations, or investment insights. For example, try asking about specific stocks like 'BBRI valuation' or 'ADRO analysis'.",
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
            content: `You are an expert financial analyst specializing in market analysis and investment research. Format your responses in this order:

1. Key Metrics Section (Always First):
   - Current price and trading details
   - P/E ratio and other valuation multiples
   - Dividend yield and payout ratios
   - Important financial metrics

2. Expert Analysis Section:
   - Include relevant analyst quotes with attribution
   - Format as "Quote" — Analyst Name, Firm

3. Analysis Sections (Choose relevant ones):
   - Market Position and Competitive Analysis
   - Growth Drivers and Catalysts
   - Risk Factors and Challenges
   - Technical Analysis and Price Targets
   - Forward-Looking Projections

Format Guidelines:
- Present key metrics as "Metric: Value" (e.g., "P/E Ratio: 15.2x")
- Use bullet points for important insights
- Keep paragraphs focused and concise
- Do not include citations or reference numbers
- Use consistent decimal formatting (4.9x not 4.9 x)
- Emphasize material changes and significant developments`
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

    // Format the response before sending
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