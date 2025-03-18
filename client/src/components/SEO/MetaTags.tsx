import React, { useEffect } from 'react';
import { updateMetaTags, removeMetaTags } from '@/lib/meta-tags';
import type { ArticleMetadata } from '@/lib/meta-tags';
import { Helmet } from 'react-helmet-async';
import DynamicOGImage from './DynamicOGImage';

/**
 * Provides SEO meta tags for articles and pages
 * This component automatically manages OpenGraph and Twitter Card tags
 */
interface MetaTagsProps {
  /**
   * Metadata for the article or page
   */
  metadata: ArticleMetadata;
  
  /**
   * Optional version for cache busting
   * Used to ensure social media platforms refresh the metadata
   */
  cacheBuster?: string;
  
  /**
   * Optional flag to use image.social dynamic OG images
   * If true, the component will use image.social for preview images
   * Default is true
   */
  useDynamicOG?: boolean;
  
  /**
   * Optional custom path for image.social
   * If not provided, will use the current URL path
   */
  customPath?: string;
}

export default function MetaTags({ 
  metadata, 
  cacheBuster, 
  useDynamicOG = true,
  customPath 
}: MetaTagsProps) {
  useEffect(() => {
    // Only use standard meta tags if dynamic OG is disabled
    if (!useDynamicOG) {
      // Update meta tags in document head
      updateMetaTags(metadata, cacheBuster);
    }
    
    // Clean up when component unmounts
    return () => {
      if (!useDynamicOG) {
        removeMetaTags();
      }
    };
  }, [metadata, cacheBuster, useDynamicOG]);
  
  // If dynamic OG is enabled, use Helmet to render the dynamic OG tags
  if (useDynamicOG) {
    return (
      <Helmet>
        {/* Standard meta tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
        {/* OpenGraph basic tags */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content={metadata.siteName || 'Daily Digest'} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        
        {/* Article specific tags */}
        {metadata.publishedTime && (
          <meta property="article:published_time" content={metadata.publishedTime} />
        )}
        {metadata.section && (
          <meta property="article:section" content={metadata.section} />
        )}
        {metadata.tags && metadata.tags.map((tag, index) => (
          <meta key={`tag-${index}`} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter specific tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterSite || '@dailydigest'} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {metadata.twitterCreator && (
          <meta name="twitter:creator" content={metadata.twitterCreator} />
        )}
        
        {/* Use dynamic OG image with cache busting - simplified format */}
        <meta
          property="og:image"
          content={`https://image.social/get?url=dailydigest.id${customPath || ''}&t=${cacheBuster || Date.now()}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {metadata.imageAlt && (
          <meta property="og:image:alt" content={metadata.imageAlt} />
        )}
        
        {/* Twitter image uses the same exact URL format */}
        <meta
          name="twitter:image"
          content={`https://image.social/get?url=dailydigest.id${customPath || ''}&t=${cacheBuster || Date.now()}`} />
          
        {/* For newsletter links, we'll add a special crawler hint */}
        {customPath && customPath.includes('newsletter') && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Helmet>
    );
  }
  
  // If not using dynamic OG, don't render anything to the DOM
  // The standard meta tags are handled by the useEffect hook
  return null;
}