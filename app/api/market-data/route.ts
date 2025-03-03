import { NextResponse } from 'next/server';

// Example market data (static for now, would be fetched from a real source in production)
const marketData = {
  crypto: {
    BTC: { price: 67421.35, change24h: 2.35 },
    ETH: { price: 3542.21, change24h: 1.54 }
  },
  stocks: {
    BBRI: { price: 4250, change24h: -0.82 },
    TLKM: { price: 3720, change24h: 0.54 },
    ASII: { price: 5125, change24h: -1.12 },
    BBCA: { price: 8925, change24h: 0.78 },
    AAPL: { price: 189.52, change24h: 0.43 },
    MSFT: { price: 425.52, change24h: 1.21 },
    GOOGL: { price: 178.48, change24h: 0.87 },
    TSLA: { price: 175.35, change24h: -2.14 }
  },
  indices: {
    IHSG: { price: 7435.87, change24h: -0.45 },
    'S&P500': { price: 5321.35, change24h: 0.34 },
    NASDAQ: { price: 17235.62, change24h: 0.83 },
    DJI: { price: 39214.64, change24h: 0.12 },
    NIKKEI: { price: 38542.21, change24h: -0.74 },
    HSI: { price: 17354.89, change24h: -1.34 }
  },
  forex: {
    'USD/IDR': { price: 15824, change24h: 0.21 }
  }
};

export async function GET() {
  // In a real app, we would fetch live data here
  return NextResponse.json(marketData);
}