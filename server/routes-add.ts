// Universal image endpoint for social media previews using image.social
app.get('/steel-image', (req, res) => {
  try {
    console.log('[Universal Image] Redirecting to image.social for dynamic preview');
    
    // Get path from query parameter or use default path
    const path = req.query.path || 'latest/china-steel-reform';
    
    // Add cache busting for aggressive cachers like Telegram
    const timestamp = Date.now();
    
    // Redirect to image.social with the appropriate path
    const imageSocialUrl = `https://image.social/get?url=dailydigest.id/${path}&t=${timestamp}`;
    
    // Set cache control headers
    const oneHour = 60 * 60;
    res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
    res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
    
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

// Dynamic social preview endpoint that generates previews for any path
app.get('/dynamic-preview', (req, res) => {
  try {
    console.log('[Dynamic Preview] Generating dynamic social preview');
    
    // Get path from query parameter
    const path = req.query.path || '';
    
    // Get platform from query parameter (defaults to 'all')
    const platform = req.query.platform || 'all';
    
    // Add cache busting for aggressive cachers like Telegram
    const timestamp = Date.now();
    
    // Generate image.social URL with appropriate parameters
    let imageSocialUrl = `https://image.social/get?url=dailydigest.id/${path}`;
    
    // Use simplified parameter format for all platforms
    // The correct image.social format works consistently across platforms
    imageSocialUrl += `&t=${timestamp}`;
    
    // Set appropriate cache control headers based on platform
    let cacheTime = 60 * 60; // Default: 1 hour
    if (platform === 'telegram') {
      cacheTime = 5 * 60; // 5 minutes for Telegram (aggressive caching)
    } else if (platform === 'twitter' || platform === 'x') {
      cacheTime = 12 * 60 * 60; // 12 hours for Twitter (less frequent refreshes)
    }
    
    res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
    res.setHeader('Expires', new Date(Date.now() + cacheTime * 1000).toUTCString());
    
    // Add cross-origin support
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Redirect to image.social
    res.redirect(imageSocialUrl);
  } catch (error) {
    console.error('Error generating dynamic preview:', error);
    return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});