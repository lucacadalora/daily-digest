
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get('https://query2.finance.yahoo.com/v8/finance/quote', {
      params: {
        symbols: 'BTC-USD,ETH-USD,BBRI.JK,TLKM.JK,ASII.JK,BBCA.JK,AAPL,MSFT,GOOGL,TSLA,^JKSE,^GSPC,^IXIC,^DJI,^N225,^HSI,IDR=X',
        fields: 'regularMarketPrice,regularMarketChangePercent'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })
    
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}
