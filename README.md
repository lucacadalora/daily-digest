
# Market Insights AI - Advanced Financial Analysis Platform

An advanced AI-powered market insights platform that explores collaborative human-AI interaction through comprehensive financial market analysis and innovative research visualization.

![Market Insights AI Dashboard](https://placeholder-for-dashboard-screenshot.png)

*Note: The above screenshot is a placeholder. Add actual application screenshot when available.*

## Overview

Market Insights AI delivers nuanced market insights by leveraging state-of-the-art AI reasoning, interactive data visualization, and cutting-edge content management technologies that reimagine workplace collaboration. The platform focuses on delivering complex economic narratives through intuitive, data-driven storytelling and AI-powered analysis.

## Features

- **AI-Powered Market Analysis**: Leverage state-of-the-art AI reasoning models for deep financial insights
- **Interactive Data Visualization**: Explore complex financial data through intuitive charts and dynamic visual representations
- **Collaborative Research Environment**: Seamlessly integrate human expertise with AI analysis
- **Comprehensive Market Dashboard**: Track global markets with real-time data across various asset classes
- **Advanced Content Management**: Dynamic organization of financial analysis, research papers, and market reports
- **Customizable User Experience**: Personalized dashboard with dark/light mode support
- **SEO-Optimized Content**: High-visibility market research that's easily discoverable

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for advanced styling
- Shadcn UI component library
- Framer Motion for sophisticated animations
- Recharts for dynamic data visualization
- Next.js for optimized performance

### Backend
- Node.js with Express
- PostgreSQL database with Drizzle ORM
- RESTful API architecture

### AI & Data Integration
- Perplexity AI integration for market research
- Llama-3.1-sonar-reasoning-pro for advanced financial analysis
- Real-time data processing pipeline
- Enhanced citation and source attribution system

## Key Sections

1. **Market Intelligence Dashboard**: Real-time market analysis with AI-powered insights
2. **Research Hub**: Advanced AI-generated analysis and expert commentary on market trends
3. **Data Visualization Studio**: Interactive tools for exploring complex financial datasets
4. **Content Management System**: Dynamic organization of market research, analysis, and reports
5. **AI Collaboration Space**: Environment for human-AI joint market analysis and research

## Project Structure

```
market-insights-ai/
├── app/                   # Next.js application
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Shadcn UI components
│   │   └── custom/        # Custom project components
│   ├── lib/               # Utility functions and services
│   ├── hooks/             # Custom React hooks 
│   ├── pages/             # Application routes
│   └── api/               # API routes
├── public/                # Static assets and files
│   ├── images/            # Image assets
│   └── documents/         # PDF documents and reports
├── db/                    # Database related files
│   ├── index.ts           # Database connection setup
│   └── schema.ts          # Drizzle ORM schema definitions
├── services/              # Service integrations
│   ├── ai/                # AI model integrations
│   └── data/              # Data processing services
├── styles/                # Global styles and themes
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL database
- AI API keys (Perplexity AI, Llama-3.1)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/market-insights-ai.git
cd market-insights-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with the following variables:
```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/marketinsights

# AI API Keys
PERPLEXITY_API_KEY=your-perplexity-api-key
LLAMA_API_KEY=your-llama-api-key

# Other configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

The application uses Next.js for development and builds. The main scripts are:

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Run the production build
- `npm run lint`: Run ESLint
- `npm run db:push`: Push database schema changes

## API Documentation

### Market Intelligence Endpoints

- `GET /api/market-analytics`: Retrieve AI-generated market analysis and insights
  - Response includes detailed analysis of market trends, key indicators, and predictive metrics
  - Query parameters allow filtering by market sector, region, and time period

### AI Analysis Endpoints

- `POST /api/ai/analyze`: Submit data for AI analysis
  - Request body: `{ "data": { ... }, "analysisType": "market-forecast" }`
  - Returns structured market intelligence with reasoning chains and citations

### Research Management

- `GET /api/research`: Get a list of all research papers and reports
- `GET /api/research/:id`: Get a specific research paper by ID
- `POST /api/research`: Create a new research paper (requires authentication)

### Visualization API

- `GET /api/visualize/:datasetId`: Generate visualization data for interactive charts
  - Supports various visualization types via the `type` parameter
  - Returns structured data ready for client-side rendering

## Contributing

Contributions to Market Insights AI are welcome! Please feel free to submit issues or pull requests to help improve the platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
