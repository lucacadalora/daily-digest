import React, { useEffect } from 'react';
import { updateMetaTags, removeMetaTags } from '@/lib/meta-tags';
import type { ArticleMetadata } from '@/lib/meta-tags';
import { Helmet } from 'react-helmet-async';

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
}

export default function MetaTags({ 
  metadata, 
  cacheBuster
}: MetaTagsProps) {
  // Get the image URL from metadata or use a default
  const imageUrl = metadata.image || '/logo-large.png';
  
  // Set up meta tags with React Helmet
  useEffect(() => {
    // Update meta tags in document head
    updateMetaTags({
      ...metadata,
      image: imageUrl
    }, cacheBuster);
    
    // Clean up when component unmounts
    return () => {
      removeMetaTags();
    };
  }, [metadata, imageUrl, cacheBuster]);
  
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
      
      {/* Image tags */}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {metadata.imageAlt && (
        <meta property="og:image:alt" content={metadata.imageAlt} />
      )}
      
      {/* Twitter image */}
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}