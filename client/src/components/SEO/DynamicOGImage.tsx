import React, { useEffect } from 'react';
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
   * Optional image URL to use for Open Graph tags
   * If not provided, will use defaultImage
   */
  imageUrl?: string;
  
  /**
   * Whether to prioritize these meta tags over existing ones
   * Default is true
   */
  prioritize?: boolean;
}

/**
 * DynamicOGImage component that sets Open Graph meta tags for the current page
 * 
 * This is a simplified version that uses a static image rather than
 * a dynamic screenshot service.
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
 * With custom image:
 * ```tsx
 * <DynamicOGImage imageUrl="/images/my-custom-image.jpg" />
 * ```
 */
export default function DynamicOGImage({ 
  title, 
  description, 
  imageUrl,
  prioritize = true
}: DynamicOGImageProps) {
  const [location] = useLocation();
  
  // Default image to use if none is provided
  const defaultImage = '/logo-large.png';
  const finalImageUrl = imageUrl || defaultImage;
  
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
      ogImageMeta.setAttribute('content', finalImageUrl);
      head.appendChild(ogImageMeta);
      
      // Create and insert Twitter image tag
      const twitterImageMeta = document.createElement('meta');
      twitterImageMeta.setAttribute('name', 'twitter:image');
      twitterImageMeta.setAttribute('content', finalImageUrl);
      head.appendChild(twitterImageMeta);
      
      // If title is provided, update those tags too
      if (title) {
        document.querySelectorAll('meta[property="og:title"]').forEach(tag => tag.remove());
        document.querySelectorAll('meta[name="twitter:title"]').forEach(tag => tag.remove());
        
        const ogTitleTag = document.createElement('meta');
        ogTitleTag.setAttribute('property', 'og:title');
        ogTitleTag.setAttribute('content', title);
        head.appendChild(ogTitleTag);
        
        const twitterTitleTag = document.createElement('meta');
        twitterTitleTag.setAttribute('name', 'twitter:title');
        twitterTitleTag.setAttribute('content', title);
        head.appendChild(twitterTitleTag);
      }
      
      // If description is provided, update those tags too
      if (description) {
        document.querySelectorAll('meta[property="og:description"]').forEach(tag => tag.remove());
        document.querySelectorAll('meta[name="twitter:description"]').forEach(tag => tag.remove());
        
        const ogDescTag = document.createElement('meta');
        ogDescTag.setAttribute('property', 'og:description');
        ogDescTag.setAttribute('content', description);
        head.appendChild(ogDescTag);
        
        const twitterDescTag = document.createElement('meta');
        twitterDescTag.setAttribute('name', 'twitter:description');
        twitterDescTag.setAttribute('content', description);
        head.appendChild(twitterDescTag);
      }
    }
    
    // Cleanup function to remove tags on unmount
    return () => {
      if (prioritize && typeof document !== 'undefined') {
        // Only remove our specific tags on unmount
        const allMetaTags = document.querySelectorAll('meta');
        allMetaTags.forEach(tag => {
          const property = tag.getAttribute('property');
          const name = tag.getAttribute('name');
          
          if ((property && property === 'og:image') || 
              (name && name === 'twitter:image')) {
            tag.remove();
          }
        });
      }
    };
  }, [finalImageUrl, title, description, prioritize]);
  
  return (
    <>
      {/* Standard Open Graph tags */}
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'Daily Digest - Market Intelligence'} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={finalImageUrl} />
      
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