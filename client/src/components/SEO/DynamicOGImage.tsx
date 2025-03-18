import React from 'react';
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
 */
export default function DynamicOGImage({ 
  title, 
  description, 
  path, 
  domain = 'dailydigest.id'
}: DynamicOGImageProps) {
  const [location] = useLocation();
  
  // Use provided path or current location
  const currentPath = path || location;
  
  // Remove leading slash if present for better URL construction
  const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
  
  // Construct the full URL for image.social
  const imageUrl = `https://image.social/get?url=${domain}/${cleanPath}`;
  
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