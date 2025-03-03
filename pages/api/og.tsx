
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get query parameters
    const title = searchParams.get('title') || 'Daily Digest';
    const description = searchParams.get('description') || 'Market insights and analysis';
    const imageUrl = searchParams.get('imageUrl') || '';
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: 'white',
            background: '#1f2937',
            width: '100%',
            height: '100%',
            padding: 40,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h1 style={{ fontSize: 48, fontWeight: 'bold', margin: 0 }}>
              {title}
            </h1>
            <p style={{ fontSize: 28, margin: 0, opacity: 0.9 }}>
              {description}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Daily Digest</span>
            <span>Market Analysis</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
