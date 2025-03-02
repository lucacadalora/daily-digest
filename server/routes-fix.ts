// Add this code to routes.ts after all the existing Twitter card routes:

// Direct Twitter Card Route - Ultra minimal implementation 
// This doesn't use any redirects and serves the minimal HTML directly
app.get('/t-steel', (req, res) => {
  try {
    console.log('[Twitter Card Direct] Serving minimal Twitter Card HTML page');
    
    // Set cache headers optimized for Twitter 
    // Twitter seems to work better with proper cache settings - 1 hour is a good balance
    const oneHour = 60 * 60; 
    res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
    res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
    
    // Add all cross-origin headers to ensure Twitter crawler can access everything
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // Serve our ultra-minimal Twitter Card HTML file
    return res.sendFile(join(process.cwd(), 'public', 't-steel.html'));
  } catch (error) {
    console.error('Error serving minimal Twitter Card:', error);
    return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});