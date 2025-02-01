import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      'https://query2.finance.yahoo.com/v1/finance/search', {
      params: {
        q: 'IDX banks BBRI indonesian market',
        quotesCount: 0,
        newsCount: 4,
        enableFuzzyQuery: false,
        quotesQueryId: 'tss_match_phrase_query',
        multiQuoteQueryId: 'multi_quote_single_token_query',
        newsQueryId: 'news_cie_vespa',
        enableCb: true,
        enableNavLinks: true,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://finance.yahoo.com',
        'Referer': 'https://finance.yahoo.com/'
      }
    });

    const newsItems = response.data.news || [];
    
    res.json({
      status: 'success',
      news: newsItems
    });

  } catch (error) {
    console.error('News API Error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch news'
    });
  }
});

export default router;
