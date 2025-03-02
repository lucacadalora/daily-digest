// Add this code to server/routes.ts

// Universal image endpoint that works for all social platforms (WhatsApp, Telegram, Twitter, etc)
app.get('/steel-image', (req, res) => {
  try {
    console.log('[Universal Image] Serving optimized steel image for social media');
    
    // Get the actual image file path
    const filePath = join(process.cwd(), 'public', 'latest', 'china-steel.png');
    
    if (!fs.existsSync(filePath)) {
      console.error(`[Image Error] Image not found at path: ${filePath}`);
      return res.status(404).send('Image not found');
    }
    
    // Set special headers that work well across multiple platforms
    // Cache for 1 hour for better performance
    const oneHour = 60 * 60;
    res.setHeader('Cache-Control', `public, max-age=${oneHour}`);
    res.setHeader('Expires', new Date(Date.now() + oneHour * 1000).toUTCString());
    
    // Add cross-origin support for all platforms
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Set content type
    res.setHeader('Content-Type', 'image/png');
    
    // Create a readable stream and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving social media image:', error);
    return res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});