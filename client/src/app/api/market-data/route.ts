
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // You can migrate your existing API logic here
    const marketData = {
      crypto: [
        { symbol: 'BTC-USD', name: 'Bitcoin', price: 61245.32, change: 2.34 },
        { symbol: 'ETH-USD', name: 'Ethereum', price: 3521.89, change: 1.76 }
      ],
      stocks: [
        { symbol: 'BBCA.JK', name: 'Bank Central Asia', price: 9825, change: -0.32 },
        { symbol: 'BBRI.JK', name: 'Bank Rakyat Indonesia', price: 4150, change: 1.12 }
      ],
      // Add more categories as needed
    };
    
    return NextResponse.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
