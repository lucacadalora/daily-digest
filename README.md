
# MarketMind AI - Advanced Market Insights Platform

MarketMind AI is an advanced AI-powered market insights platform providing comprehensive financial market analysis with a focus on Indonesian and global market dynamics, emphasizing real-time geopolitical and economic intelligence.

![MarketMind AI Dashboard](https://placeholder-for-dashboard-screenshot.png)

*Note: The above screenshot is a placeholder. Add actual application screenshot when available.*

## Overview

MarketMind AI provides intelligent, contextual market intelligence by integrating multiple data streams, leveraging advanced natural language AI, and offering nuanced financial insights with enhanced visualization and user interaction. The platform focuses on delivering complex economic narratives through intuitive, data-driven storytelling and advanced content management.

## Features

- **Real-time Market Monitoring**: Track crypto, stocks, indices, and forex markets with up-to-date price and change data
- **AI-Powered Analysis**: Leverage Perplexity AI and Llama-3.1-sonar-reasoning-pro for advanced market intelligence
- **Interactive Data Visualization**: Explore financial data through intuitive charts and visual representations
- **Comprehensive Article Library**: Access in-depth analysis on key market trends and economic events
- **Law & Regulatory Database**: Browse through Indonesian legal documents with PDF viewing capabilities
- **Dark/Light Mode Support**: Customize your viewing experience with theme preferences

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- Framer Motion for smooth animations
- Recharts for data visualization
- Wouter for routing

### Backend
- Node.js with Express
- PostgreSQL database with Drizzle ORM
- WebSockets for real-time updates

### AI & Data Integration
- Perplexity AI integration
- Local source integration (Investor Trust, Kompas, Stockbit)
- Llama-3.1-sonar-reasoning-pro model for advanced analysis
- Enhanced inline citation system

## Key Sections

1. **Market Dashboard**: Real-time updates on crypto, stocks, indices, and forex
2. **Insights Hub**: AI-generated analysis and expert commentary on market trends
3. **Data Explorer**: Interactive tools for exploring financial and economic datasets
4. **Document Library**: Comprehensive collection of laws, regulations, and economic papers
5. **Chat Interface**: Ask questions and receive AI-powered market insights

## Project Structure

```
marketmind-ai/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and services
│   │   ├── pages/         # Application pages and routes
│   │   └── types/         # TypeScript type definitions
├── public/                # Static assets and files
│   ├── documents/         # PDF documents and reports
│   ├── images/            # Image assets
│   └── shares/            # Social media share templates
├── db/                    # Database related files
│   ├── index.ts           # Database connection setup
│   └── schema.ts          # Drizzle ORM schema definitions
├── server/                # Backend Express server
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic and services
│   └── utils/             # Helper functions
├── scripts/               # Utility scripts
└── types/                 # Shared TypeScript types
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/marketmind-ai.git
cd marketmind-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/marketmind
PERPLEXITY_API_KEY=your-perplexity-api-key
```

4. Set up the database
```bash
# Initialize PostgreSQL database (if using Replit)
# The DATABASE_URL environment variable will be automatically set
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

## Development

The application uses Vite for development and builds. The main scripts are:

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Run the production build

## API Documentation

### Market Data Endpoints

- `GET /api/market-data`: Retrieve current market data for cryptocurrencies, stocks, indices, and forex.
  - Response includes price and 24-hour change data for each asset.

### Chat & Analysis Endpoints

- `POST /api/chat`: Send a query to the AI analysis engine.
  - Request body: `{ "messages": [{ "role": "user", "content": "your query here" }] }`
  - Response: AI-generated analysis based on your query.

### Article Endpoints

- `GET /api/articles`: Get a list of all articles
- `GET /api/articles/:id`: Get a specific article by ID
- `POST /api/articles`: Create a new article (requires authentication)

## Contributing

We welcome contributions to MarketMind AI! Please feel free to submit issues or pull requests to help improve the platform.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
