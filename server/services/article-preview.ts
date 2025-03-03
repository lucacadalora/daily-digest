import { Request, Response } from 'express';
import path from 'path';
import { detectSocialMediaCrawler } from '../utils/crawler-detection';

/**
 * Social media platforms we support optimized previews for
 */
export type SocialPlatform = 'twitter' | 'facebook' | 'whatsapp' | 'linkedin' | 'other';

/**
 * Article data needed for preview generation
 */
export interface ArticlePreviewData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  url: string;
  category?: string;
  tags?: string[];
}

/**
 * Determine the appropriate cache headers based on social platform
 */
export function getCacheControlHeaders(platform: SocialPlatform): string {
  switch (platform) {
    case 'twitter':
      // Twitter caches aggressively, use short cache time
      return 'max-age=600, s-maxage=600';
    case 'facebook':
      // Facebook's crawler respects cache headers
      return 'max-age=3600, s-maxage=43200';
    case 'whatsapp':
      // WhatsApp needs fresh content for sharing
      return 'max-age=0, no-cache, no-store, must-revalidate';
    default:
      // Default moderate caching
      return 'max-age=3600, s-maxage=86400';
  }
}

/**
 * Generate HTML for social media previews
 * This creates optimized HTML specially designed for each social platform
 */
export function generateSocialPreviewHTML(
  article: ArticlePreviewData,
  platform: SocialPlatform,
  baseUrl: string
): string {
  // Check if article has a valid image URL
  const hasValidImage = article.imageUrl && article.imageUrl.trim() !== '';
  
  // Set image URL - either the article image or a default site logo
  let imageUrl: string;
  if (hasValidImage) {
    // Ensure image URL is absolute
    imageUrl = article.imageUrl.startsWith('http') 
      ? article.imageUrl 
      : `${baseUrl}${article.imageUrl}`;
  } else {
    // Use default site logo
    imageUrl = `${baseUrl}/images/default/site-logo.png`;
  }
  
  // Canonical URL for the article
  const canonicalUrl = article.url.startsWith('http') 
    ? article.url 
    : `${baseUrl}${article.url}`;

  // Common meta tags needed by all platforms
  const commonMetaTags = `
    <!-- Basic meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${article.description}">
    
    <!-- Canonical link -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph tags (used by Facebook, WhatsApp, LinkedIn) -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.description}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="Daily Digest">
    <meta property="article:published_time" content="${article.publishedDate}">
    <meta property="article:author" content="${article.author}">
    ${article.category ? `<meta property="article:section" content="${article.category}">` : ''}
    ${article.tags ? article.tags.map(tag => `<meta property="article:tag" content="${tag}">`).join('\n    ') : ''}
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@dailydigest">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.description}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:creator" content="@dailydigest">
  `;

  // Platform-specific optimizations
  let platformSpecificTags = '';
  let platformStyles = '';
  
  switch (platform) {
    case 'twitter':
      platformSpecificTags = `
        <!-- Twitter-specific optimizations -->
        <meta name="twitter:image:alt" content="${article.title}">
        <meta name="twitter:dnt" content="on">
      `;
      platformStyles = `
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      `;
      break;
      
    case 'facebook':
      platformSpecificTags = `
        <!-- Facebook-specific optimizations -->
        <meta property="fb:app_id" content="123456789">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
      `;
      break;
      
    case 'whatsapp':
      // WhatsApp is very picky about image formats and sizes
      platformSpecificTags = `
        <!-- WhatsApp-specific optimizations -->
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:locale" content="en_US">
      `;
      break;
      
    case 'linkedin':
      platformSpecificTags = `
        <!-- LinkedIn-specific optimizations -->
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="627">
      `;
      break;
      
    default:
      // General purpose tags for other crawlers
      platformSpecificTags = `
        <meta name="robots" content="index, follow">
        <meta name="author" content="${article.author}">
      `;
      break;
  }

  // Generate the full HTML template
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>${article.title}</title>
  ${commonMetaTags}
  ${platformSpecificTags}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.5;
      color: #374151;
      background-color: #f9fafb;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 1rem;
    }
    .meta {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
    .meta > div {
      margin-right: 1rem;
    }
    img.featured {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      border-radius: 0.375rem;
      margin-bottom: 1.5rem;
    }
    .description {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }
    ${platformStyles}
  </style>
</head>
<body>
  <div class="container">
    <h1>${article.title}</h1>
    
    <div class="meta">
      <div class="author">${article.author}</div>
      <div class="date">${article.publishedDate}</div>
      ${article.category ? `<div class="category">${article.category}</div>` : ''}
    </div>
    
    <img class="featured" src="${imageUrl}" alt="${article.title}">
    
    <div class="description">
      ${article.description}
    </div>
    
    <a href="${canonicalUrl}">Read more</a>
  </div>
</body>
</html>`;
}

/**
 * Middleware to handle article preview requests
 * This function determines if the request is from a social media crawler
 * and serves an optimized preview HTML if so
 */
export function handleArticlePreview(
  req: Request, 
  res: Response, 
  article: ArticlePreviewData,
  next: () => void
) {
  // Detect if this request is from a social media crawler
  const crawlerInfo = detectSocialMediaCrawler(req);
  
  // If not a crawler, pass to the next middleware
  if (!crawlerInfo.isCrawler) {
    return next();
  }
  
  console.log(`[ArticlePreview] Social crawler detected: ${JSON.stringify(crawlerInfo)}`);
  
  // Determine which platform the crawler is from
  let platform: SocialPlatform = 'other';
  if (crawlerInfo.isTwitter) platform = 'twitter';
  else if (crawlerInfo.isFacebook) platform = 'facebook';
  else if (crawlerInfo.isWhatsApp) platform = 'whatsapp';
  else if (crawlerInfo.isLinkedIn) platform = 'linkedin';
  
  // Set cache control headers based on platform
  res.setHeader('Cache-Control', getCacheControlHeaders(platform));
  
  // Get the base URL for generating absolute URLs
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = `${protocol}://${req.get('host')}`;
  
  // Generate the HTML and send it
  const html = generateSocialPreviewHTML(article, platform, baseUrl);
  res.setHeader('Content-Type', 'text/html');
  return res.send(html);
}