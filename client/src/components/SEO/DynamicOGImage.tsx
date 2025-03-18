import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * Properties for the DynamicOGImage component
 */
interface DynamicOGImageProps {
  /**
   * Optional title to override the page title
   */
  title?: string;

  /**
   * Optional description to override the meta description
   */
  description?: string;

  /**
   * Optional path to override the current URL path
   * If not provided, the component will use the current path
   */
  path?: string;
  
  /**
   * Optional custom domain to use instead of dailydigest.id
   */
  domain?: string;
  
  /**
   * Optional flag to enable cache busting with timestamp parameter
   * Default is false to exactly match the official image.social documentation format
   * IMPORTANT: Using cache busting may cause issues with some platforms
   */
  enableCacheBusting?: boolean;
  
  /**
   * Whether to prioritize these meta tags over existing ones
   * Default is true
   */
  prioritize?: boolean;
  
  /**
   * Optional platform-specific optimizations for different social media platforms
   * Default is 'all' which applies general optimizations
   */
  platform?: 'twitter' | 'facebook' | 'telegram' | 'whatsapp' | 'linkedin' | 'all';
}

/**
 * DynamicOGImage component that generates Open Graph meta tags using image.social service
 * 
 * This component automatically generates high-quality, dynamic Open Graph images for any page
 * without requiring manual configuration. The image.social service creates screenshots
 * of the actual page content, making preview cards more engaging and relevant.
 * 
 * Usage:
 * ```tsx
 * <DynamicOGImage />
 * ```
 * 
 * With custom title and description:
 * ```tsx
 * <DynamicOGImage 
 *   title="China's Steel Sector Reform" 
 *   description="Analysis of China's billion-ton steel industry reforms" 
 * />
 * ```
 * 
 * With custom path:
 * ```tsx
 * <DynamicOGImage path="/latest/steel-reform" />
 * ```
 * 
 * With platform-specific optimizations:
 * ```tsx
 * <DynamicOGImage platform="telegram" />
 * ```
 */
export default function DynamicOGImage({ 
  title, 
  description, 
  path, 
  domain = 'dailydigest.id',
  enableCacheBusting = false,
  prioritize = true,
  platform = 'all'
}: DynamicOGImageProps) {
  const [location] = useLocation();
  const [timestamp, setTimestamp] = useState<string>('');
  
  // Generate a timestamp for cache busting when component mounts
  useEffect(() => {
    if (enableCacheBusting) {
      setTimestamp(new Date().getTime().toString());
    }
  }, [enableCacheBusting]);
  
  // Use provided path or current location
  const currentPath = path || location;
  
  // Remove leading slash if present for better URL construction
  const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
  
  // Construct the full URL for image.social with the correct format
  // The format should be https://image.social/get?url=domain/path
  let imageUrl = `https://image.social/get?url=${domain}/${cleanPath}`;
  
  // Add cache busting parameter if enabled - only use a simple 't' parameter
  if (enableCacheBusting && timestamp) {
    imageUrl += `&t=${timestamp}`;
  }
  
  // Client-side meta tag cleanup to prevent duplicates
  useEffect(() => {
    if (prioritize && typeof document !== 'undefined') {
      // Remove any existing OG image tags
      const existingOgImageTags = document.querySelectorAll('meta[property="og:image"]');
      const existingTwitterImageTags = document.querySelectorAll('meta[name="twitter:image"]');
      
      existingOgImageTags.forEach(tag => tag.remove());
      existingTwitterImageTags.forEach(tag => tag.remove());
      
      // Directly insert meta tags to ensure they're present
      const head = document.head;
      
      // Create and insert OG image tag
      const ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      ogImageMeta.setAttribute('content', imageUrl);
      head.appendChild(ogImageMeta);
      
      // Create and insert Twitter image tag
      const twitterImageMeta = document.createElement('meta');
      twitterImageMeta.setAttribute('name', 'twitter:image');
      twitterImageMeta.setAttribute('content', imageUrl);
      head.appendChild(twitterImageMeta);
    }
    
    // Cleanup function to remove tags on unmount
    return () => {
      if (prioritize && typeof document !== 'undefined') {
        // Only remove our specific tags on unmount
        const allMetaTags = document.querySelectorAll('meta');
        allMetaTags.forEach(tag => {
          const property = tag.getAttribute('property');
          const name = tag.getAttribute('name');
          const content = tag.getAttribute('content');
          
          if (content && content.includes('image.social/get') && 
              ((property && property === 'og:image') || 
               (name && name === 'twitter:image'))) {
            tag.remove();
          }
        });
      }
    };
  }, [imageUrl, prioritize]);
  
  return (
    <>
      {/* Standard Open Graph tags */}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'Daily Digest - Market Intelligence'} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* If title is provided, add it to OG tags */}
      {title && (
        <>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      
      {/* If description is provided, add it to OG tags */}
      {description && (
        <>
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
    </>
  );
}