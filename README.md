
# Daily Digest - Financial Markets Analysis Platform

A comprehensive financial news and analysis platform delivering in-depth insights on global markets with a focus on Indonesian and international financial dynamics.

![Daily Digest Dashboard](https://placeholder-for-dashboard-screenshot.png)

*Note: The above screenshot is a placeholder. Add actual application screenshot when available.*

## Overview

Daily Digest provides intelligent market analysis and financial news by integrating multiple data sources, leveraging advanced natural language processing, and offering nuanced financial insights with enhanced visualization and user interaction. The platform focuses on delivering complex economic narratives through intuitive, data-driven storytelling.

## Features

- **Real-time Market Monitoring**: Track crypto, stocks, indices, and forex markets with up-to-date price data
- **AI-Powered Analysis**: Leverage advanced AI models for market intelligence and insights
- **Interactive Data Visualization**: Explore financial data through intuitive charts and visual representations
- **Comprehensive Article Library**: Access in-depth analysis on key market trends and economic events
- **Law & Regulatory Database**: Browse through Indonesian legal documents with PDF viewing capabilities
- **Dark/Light Mode Support**: Customize your viewing experience with theme preferences

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- Framer Motion for animations
- Recharts for data visualization
- Wouter for routing

### Backend
- Node.js with Express
- PostgreSQL database with Drizzle ORM
- WebSockets for real-time updates

### AI & Data Integration
- Integration with AI analysis tools
- Enhanced inline citation system

## Key Sections

1. **Market Dashboard**: Real-time updates on crypto, stocks, indices, and forex
2. **Insights Hub**: AI-generated analysis and expert commentary on market trends
3. **Data Explorer**: Interactive tools for exploring financial and economic datasets
4. **Document Library**: Comprehensive collection of laws, regulations, and economic papers
5. **Newsletter**: Regular financial market updates and analysis

## Project Structure

```
daily-digest/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and services
│   │   ├── pages/         # Application pages and routes
│   │   └── config/        # Configuration files
├── public/                # Static assets and files
│   ├── documents/         # PDF documents and reports
│   ├── images/            # Image assets
│   ├── shares/            # Social media share templates
│   └── twitter-card/      # Twitter card templates
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
git clone https://github.com/your-username/daily-digest.git
cd daily-digest
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/dailydigest
API_KEY=your-api-key-here
```

4. Set up the database
```bash
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

### Article Endpoints

- `GET /api/articles`: Get a list of all articles
- `GET /api/articles/:id`: Get a specific article by ID
- `POST /api/articles`: Create a new article (requires authentication)

### Newsletter Subscription

- `POST /api/subscribe`: Subscribe to the newsletter
  - Request body: `{ "email": "user@example.com", "category": "MARKETS" }`

## Contributing

Contributions to Daily Digest are welcome! Please feel free to submit issues or pull requests to help improve the platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
