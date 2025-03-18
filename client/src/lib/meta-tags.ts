/**
 * Meta Tags Helper Library
 * 
 * This library provides utilities for managing meta tags needed for proper
 * social media sharing across platforms like Twitter, Facebook, and WhatsApp.
 */

/**
 * Interface for structured article metadata
 */
export interface ArticleMetadata {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  section?: string;
  tags?: string[];
  siteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
  // Additional fields for more comprehensive social media coverage
  imageWidth?: string; // Image width for OG tags
  imageHeight?: string; // Image height for OG tags
  imageAlt?: string; // Accessible alt text for social media images
  locale?: string; // For international content
  fbAppId?: string; // Facebook app ID if available
}

/**
 * Updates the document head with appropriate meta tags for social sharing
 * 
 * @param metadata Article metadata to use for the meta tags
 * @param cacheBuster Optional version string to add to image URLs for cache busting
 * @returns void
 */
export function updateMetaTags(metadata: ArticleMetadata, cacheBuster?: string): void {
  // Set document title
  document.title = metadata.title;
  
  // Add or update canonical link
  const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
  canonicalLink.setAttribute('rel', 'canonical');
  canonicalLink.setAttribute('href', metadata.url);
  
  if (!document.querySelector('link[rel="canonical"]')) {
    document.head.appendChild(canonicalLink);
  }
  
  // Default site name if not provided
  const siteName = metadata.siteName || 'Daily Digest';
  
  // Default Twitter accounts if not provided
  const twitterSite = metadata.twitterSite || '@dailydigest';
  const twitterCreator = metadata.twitterCreator || '@dailydigest';
  
  // Set defaults for optional fields
  const locale = metadata.locale || 'en_US';
  const imageAlt = metadata.imageAlt || metadata.title;
  const imageWidth = metadata.imageWidth || '1200';
  const imageHeight = metadata.imageHeight || '630';
  
  // Define image-related meta tags
  let imageMetaTags: Record<string, string> = {};
  
  // Function to create image.social URL if needed
  const getImageUrl = (baseUrl: string): string => {
    // If already using image.social, just return with cache buster
    if (baseUrl.includes('image.social/get?url=')) {
      return cacheBuster 
        ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}t=${cacheBuster}`
        : baseUrl;
    }
    
    // If it's a custom image, use it directly
    if (baseUrl.startsWith('http') && !baseUrl.includes('dailydigest.id')) {
      return cacheBuster 
        ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}v=${cacheBuster}`
        : baseUrl;
    }
    
    // Otherwise, create an image.social URL from the article's URL
    // This ensures we get a beautiful screenshot preview with a widescreen viewport
    const encodedUrl = encodeURIComponent(metadata.url);
    const timestamp = cacheBuster || Date.now();
    return `https://image.social/get?url=${encodedUrl}&viewport=1920x1080&t=${timestamp}`;
  };
  
  // Process image URL
  const imageUrl = metadata.image && metadata.image.trim() !== ''
    ? getImageUrl(metadata.image)
    : getImageUrl(metadata.url);
  
  // Determine image format for proper MIME type (default to jpeg for image.social)
  let imageMimeType = 'image/jpeg';
  if (imageUrl.endsWith('.png') || imageUrl.includes('.png?')) {
    imageMimeType = 'image/png';
  } else if (imageUrl.endsWith('.webp') || imageUrl.includes('.webp?')) {
    imageMimeType = 'image/webp';
  }
  
  imageMetaTags = {
    // Open Graph image tags
    'og:image': imageUrl,
    'og:image:url': imageUrl,
    'og:image:secure_url': imageUrl,
    'og:image:type': imageMimeType,
    'og:image:width': imageWidth,
    'og:image:height': imageHeight,
    'og:image:alt': imageAlt,

    // Twitter card tags - use large image format for better visibility
    'twitter:card': 'summary_large_image',
    'twitter:image': imageUrl,
    'twitter:image:src': imageUrl,
    'twitter:image:alt': imageAlt,
  };
  
  // Define all meta tags
  const metaTags = {
    // Basic meta tags
    'description': metadata.description,
    'keywords': metadata.tags?.join(',') || '',
    'news_keywords': metadata.tags?.join(',') || '',
    
    // Open Graph tags
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:url': metadata.url,
    'og:type': 'article',
    'og:site_name': siteName,
    'og:locale': locale,
    
    // Twitter Card tags without image
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:url': metadata.url,
    'twitter:site': twitterSite,
    'twitter:creator': twitterCreator,
    'twitter:domain': new URL(metadata.url).hostname,
    
    // Include image tags if an image was provided
    ...imageMetaTags,
    
    // Article metadata if available
    ...(metadata.publishedTime && { 'article:published_time': metadata.publishedTime }),
    ...(metadata.author && { 'article:author': metadata.author }),
    ...(metadata.section && { 'article:section': metadata.section }),
    ...(metadata.tags && { 'article:tag': metadata.tags.join(',') }),
    
    // Facebook App ID if available
    ...(metadata.fbAppId && { 'fb:app_id': metadata.fbAppId }),
  };
  
  // Update each meta tag, creating it if it doesn't exist
  Object.entries(metaTags).forEach(([name, content]) => {
    // Skip empty values
    if (!content) return;
    
    // For Open Graph tags which use property attribute
    if (name.startsWith('og:') || name.startsWith('article:')) {
      let tag = document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        // Create the tag if it doesn't exist
        tag = document.createElement('meta');
        tag.setAttribute('property', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }
    // For Twitter and other tags which use name attribute
    else {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        // Create the tag if it doesn't exist
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }
  });
}

/**
 * Removes all social media meta tags from the document head
 * Useful when navigating away from a page
 */
export function removeMetaTags(): void {
  // Remove Open Graph tags and article-related tags
  document.querySelectorAll('meta[property^="og:"], meta[property^="article:"], meta[property^="fb:"]').forEach(tag => {
    tag.remove();
  });
  
  // Remove Twitter tags
  document.querySelectorAll('meta[name^="twitter:"]').forEach(tag => {
    tag.remove();
  });
  
  // Remove other meta tags
  const metaTagsToRemove = ['description', 'keywords', 'news_keywords'];
  metaTagsToRemove.forEach(name => {
    const tag = document.querySelector(`meta[name="${name}"]`);
    if (tag) tag.remove();
  });
  
  // Also remove canonical link when navigating away
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) canonicalLink.remove();
}