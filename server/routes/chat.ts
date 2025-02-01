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
    const isKeyMetric = /^(P\/?E|P\/?B|ROE|EPS|Dividend Yield|Market Cap|Revenue|EBITDA|Net Profit|Price Target):/i.test(paragraph) ||
                       /^(Current Price|Support Level|Resistance Level|Trading Volume):/i.test(paragraph);

    // Check if this is a section header
    const isSectionHeader = /^(Key|Analysis|Market|Risk|Investment|Technical|Fundamental|Valuation|Growth|Outlook)/i.test(paragraph);

    if (isSectionHeader) {
      // Format section headers with emoji based on content
      if (/Analysis|Overview|Summary/i.test(paragraph)) {
        formattedResponse += `\n📊 ${paragraph}\n`;
      } else if (/Market|Trading|Price/i.test(paragraph)) {
        formattedResponse += `\n📈 ${paragraph}\n`;
      } else if (/Risk|Warning|Caution/i.test(paragraph)) {
        formattedResponse += `\n⚠️ ${paragraph}\n`;
      } else if (/Investment|Strategy|Recommendation/i.test(paragraph)) {
        formattedResponse += `\n💡 ${paragraph}\n`;
      }
    } else if (isKeyMetric) {
      // Format key metrics as bullets
      formattedResponse += `• ${paragraph}\n`;
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

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: `You are an expert financial analyst specializing in market analysis and investment research. Structure your responses like a professional investment report with clear sections.

Keep responses focused on these key elements:
1. Current market price and key valuation metrics (P/E, P/B, dividend yield)
2. Critical growth drivers and market dynamics
3. Major risk factors and mitigation strategies
4. Essential fundamental metrics
5. Important technical levels
6. Notable peer comparison highlights
7. Key forward-looking projections

Format important metrics as "Metric: Value" on their own line.
Keep paragraphs concise and focused.
Do not include citations or reference numbers.
Use decimal points for numbers (write '4.9x' not '4.9 x' or '4• 9x').
Focus on actionable insights and material information.`
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