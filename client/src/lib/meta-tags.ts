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
  
  // Define image-related meta tags if an image URL is provided
  let imageMetaTags: Record<string, string> = {};
  
  if (metadata.image && metadata.image.trim() !== '') {
    // Process image URL to add cache buster if needed
    const imageUrl = cacheBuster 
      ? `${metadata.image}${metadata.image.includes('?') ? '&' : '?'}v=${cacheBuster}`
      : metadata.image;
    
    imageMetaTags = {
      'og:image': imageUrl,
      'og:image:url': imageUrl,
      'og:image:secure_url': imageUrl,
      'og:image:type': 'image/png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': metadata.title,
      'twitter:card': 'summary_large_image',
      'twitter:image': imageUrl,
      'twitter:image:src': imageUrl,
    };
  } else {
    // Use summary card type instead of summary_large_image when no image is present
    imageMetaTags = {
      'twitter:card': 'summary',
    };
  }
  
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
    'og:locale': 'en_US',
    
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
    ...(metadata.tags && { 'article:tag': metadata.tags.join(',') })
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
  // Remove Open Graph tags
  document.querySelectorAll('meta[property^="og:"], meta[property^="article:"]').forEach(tag => {
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
}