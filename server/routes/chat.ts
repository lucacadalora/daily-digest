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

  // Process each paragraph
  paragraphs.forEach(paragraph => {
    // Check if this is a key metric or highlight
    const isKeyMetric = 
      /^(P\/?E|P\/?B|ROE|EPS|Dividend Yield|Market Cap|Revenue|EBITDA|Net Profit|Price Target|Current Price|Support Level|Resistance Level|Trading Volume|Payout Ratio|Net Interest Margin):/i.test(paragraph) ||
      /^(Forward P\/?E|Book Value|Market Value|Free Cash Flow|Operating Margin):/i.test(paragraph);

    // Check if this is an analyst quote
    const isQuote = /^[""].*[""].*—.*$/i.test(paragraph);

    // Check if this is a section header
    const isSectionHeader = /^(Key|Analysis|Market|Risk|Investment|Technical|Fundamental|Valuation|Growth|Outlook|Catalyst)/i.test(paragraph);

    if (isSectionHeader) {
      // Format section headers with emoji based on content
      if (/Analysis|Overview|Summary|Valuation/i.test(paragraph)) {
        formattedResponse += `\n📊 ${paragraph}\n`;
      } else if (/Market|Trading|Price|Technical/i.test(paragraph)) {
        formattedResponse += `\n📈 ${paragraph}\n`;
      } else if (/Risk|Warning|Caution/i.test(paragraph)) {
        formattedResponse += `\n⚠️ ${paragraph}\n`;
      } else if (/Investment|Strategy|Recommendation|Catalyst/i.test(paragraph)) {
        formattedResponse += `\n💡 ${paragraph}\n`;
      }
    } else if (isKeyMetric) {
      // Format key metrics as bullets with 💎
      formattedResponse += `💎 ${paragraph}\n`;
    } else if (isQuote) {
      // Format analyst quotes in a blockquote style
      formattedResponse += `\n${paragraph}\n`;
    } else {
      // Regular paragraph without bullets
      formattedResponse += `${paragraph}\n`;
    }
  });

  // Cleanup double spacing and trim
  return formattedResponse.replace(/\n\s*\n/g, '\n\n').trim();
}

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Expanded financial terms regex for better coverage
    const financialTerms = /\b(market|stock|index|trade|invest|dividend|price|trend|economy|sector|analysis|forecast|growth|earning|revenue|profit|rate|bank|finance|currency|valuation|fundamental|technical|PE|EPS|ROE|asset|equity|bond|ETF|fund|IDX:|NYSE:|NASDAQ:)\b|\b[A-Z]{4}\.JK\b|\b[A-Z]{3,4}\b/i;

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
            content: `You are an expert financial analyst specializing in market analysis and investment research. Structure your responses like a professional investment report with clear sections.

Keep responses focused on these key elements:
1. Company overview or asset introduction
2. Current market price and key valuation metrics (P/E, P/B, dividend yield)
3. Growth catalysts and market dynamics
4. Risk factors and mitigation strategies
5. Technical levels and price targets
6. Analyst consensus and notable quotes
7. Forward-looking projections

Format valuation metrics with specific values (e.g., "P/E Ratio: 15.2x").
Include relevant analyst quotes with attribution when available.
Use clear section headers for different aspects of analysis.
Keep paragraphs concise and focused.
Do not use citations or reference numbers.
Format numbers consistently with decimal points.`
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