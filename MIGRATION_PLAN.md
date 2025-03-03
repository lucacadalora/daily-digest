# Next.js Migration Plan

## Overview
This document outlines the plan for migrating our current Vite + Express + React app to Next.js.

## Current Tech Stack
- Frontend: React with TypeScript
- Backend: Express.js
- Routing: wouter
- Styling: Tailwind CSS
- Forms: react-hook-form with shadcn components
- Data Fetching: @tanstack/react-query
- Database: PostgreSQL with Drizzle ORM
- Authentication: Passport.js
- Build Tool: Vite

## Target Tech Stack
- Next.js (App Router)
- React with TypeScript
- Styling: Tailwind CSS (keep existing setup)
- Forms: react-hook-form with shadcn components
- Data Fetching: @tanstack/react-query + Next.js data fetching
- Database: PostgreSQL with Drizzle ORM
- Authentication: NextAuth.js (instead of Passport.js)
- API: Next.js API Routes

## Migration Strategy
We'll follow a phased approach to minimize disruption:

### Phase 1: Initial Setup (Current)
- ✅ Install Next.js and set up basic configuration
- ✅ Set up basic app directory structure
- ✅ Configure TypeScript
- ✅ Create basic layout and home page 

### Phase 2: Component Migration
- Convert existing wouter routes to Next.js pages
- Move components from client/src to appropriate Next.js app directories
- Update imports and paths
- Implement Next.js linking instead of wouter

### Phase 3: API Routes Migration
- Convert Express routes to Next.js API routes
- Implement authentication with NextAuth.js
- Maintain database connections using Drizzle

### Phase 4: Optimization
- Implement Server Components where appropriate
- Use Next.js data fetching mechanisms (fetch, getServerSideProps)
- Optimize routing and layout structures
- Enhance SEO with metadata API

### Phase 5: Testing & Deployment
- Run comprehensive tests
- Fix any bugs or issues
- Deploy to production

## Benefits of Migration
- **Better SEO**: Server-side rendering for improved search engine visibility
- **Improved Performance**: Automatic code splitting and optimized image loading
- **Simplified Development**: File-based routing system and comprehensive conventions
- **Enhanced User Experience**: Faster page loads with minimal client-side JavaScript
- **Future-proof**: Access to the latest React features and patterns

## Next Steps
1. Complete basic Next.js setup
2. Start migrating home page and key components
3. Test dual-running both the old and new versions
4. Gradually shift traffic to Next.js version

## Schedule
- Phase 1: 1 day
- Phase 2: 2-3 days
- Phase 3: 2-3 days
- Phase 4: 1-2 days
- Phase 5: 1 day

Total migration timeframe: 7-10 days