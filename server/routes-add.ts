import { Express, Request, Response } from 'express';

/**
 * Register additional routes
 * (These endpoints were previously using image.social but have been removed to prevent unwanted image previews)
 */
export function registerAdditionalRoutes(app: Express) {
  // Static image endpoint for social media platforms
  app.get('/static-image', (req: Request, res: Response) => {
    try {
      console.log('[Static Image] Serving static image for social media');
      
      // Redirect to a static image from the public directory
      res.redirect('/logo-large.png');
    } catch (error) {
      console.error('Error serving static image:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
}