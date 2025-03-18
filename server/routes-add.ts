import { Express, Request, Response } from 'express';

/**
 * Register additional routes for image.social integration
 */
export function registerAdditionalRoutes(app: Express) {
  // Universal image endpoint for social media previews using image.social
  app.get('/social-image', (req: Request, res: Response) => {
    try {
      console.log('[Social Image] Redirecting to image.social for dynamic preview');
      
      // Get path from query parameter or use default path
      const path = req.query.path || '';
      
      // Add cache busting for aggressive cachers like Telegram
      const timestamp = Date.now();
      
      // Redirect to image.social with the appropriate path and viewport parameters for a zoomed out view
      const imageSocialUrl = `https://image.social/get?url=dailydigest.id/${path}&viewport=1920x1080&t=${timestamp}`;
      
      // Set cache control headers
      const oneDay = 24 * 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${oneDay}`);
      res.setHeader('Expires', new Date(Date.now() + oneDay * 1000).toUTCString());
      
      // Add cross-origin support
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Redirect to image.social
      res.redirect(imageSocialUrl);
    } catch (error) {
      console.error('Error redirecting to image.social:', error);
      return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Fallback static image endpoint for platforms that don't support dynamic images
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