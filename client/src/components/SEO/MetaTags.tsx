
import React, { useEffect } from 'react';
import Head from 'next/head';

export interface ArticleMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  author?: string;
  publishedTime?: string;
  section?: string;
  tags?: string[];
  siteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

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

/**
 * Updates the meta tags in the document head
 */
const updateMetaTags = (metadata: ArticleMetadata, cacheBuster?: string) => {
  // Apply cache busting to the image URL if needed
  const imageUrl = cacheBuster
    ? `${metadata.image}${metadata.image.includes('?') ? '&' : '?'}v=${cacheBuster}`
    : metadata.image;

  // Helper to create meta tags
  const createMetaTag = (name: string, content: string) => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    meta.setAttribute('data-meta-tag', 'true');
    return meta;
  };

  // Helper to create Open Graph meta tags
  const createOgMetaTag = (property: string, content: string) => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    meta.setAttribute('data-meta-tag', 'true');
    return meta;
  };

  // Helper to create Twitter meta tags
  const createTwitterMetaTag = (name: string, content: string) => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    meta.setAttribute('data-meta-tag', 'true');
    return meta;
  };

  // Remove existing meta tags
  removeMetaTags();

  // Add standard meta tags
  document.head.appendChild(createMetaTag('description', metadata.description));

  // Add Open Graph meta tags
  document.head.appendChild(createOgMetaTag('og:title', metadata.title));
  document.head.appendChild(createOgMetaTag('og:description', metadata.description));
  document.head.appendChild(createOgMetaTag('og:url', metadata.url));
  document.head.appendChild(createOgMetaTag('og:image', imageUrl));
  document.head.appendChild(createOgMetaTag('og:type', 'article'));

  if (metadata.siteName) {
    document.head.appendChild(createOgMetaTag('og:site_name', metadata.siteName));
  }

  if (metadata.publishedTime) {
    document.head.appendChild(createOgMetaTag('article:published_time', metadata.publishedTime));
  }

  if (metadata.author) {
    document.head.appendChild(createOgMetaTag('article:author', metadata.author));
  }

  if (metadata.section) {
    document.head.appendChild(createOgMetaTag('article:section', metadata.section));
  }

  if (metadata.tags && metadata.tags.length > 0) {
    metadata.tags.forEach((tag) => {
      document.head.appendChild(createOgMetaTag('article:tag', tag));
    });
  }

  // Add Twitter Card meta tags
  document.head.appendChild(createTwitterMetaTag('twitter:card', 'summary_large_image'));
  document.head.appendChild(createTwitterMetaTag('twitter:title', metadata.title));
  document.head.appendChild(createTwitterMetaTag('twitter:description', metadata.description));
  document.head.appendChild(createTwitterMetaTag('twitter:image', imageUrl));

  if (metadata.twitterSite) {
    document.head.appendChild(createTwitterMetaTag('twitter:site', metadata.twitterSite));
  }

  if (metadata.twitterCreator) {
    document.head.appendChild(createTwitterMetaTag('twitter:creator', metadata.twitterCreator));
  }
};

/**
 * Removes meta tags added by this component
 */
const removeMetaTags = () => {
  const metaTags = document.querySelectorAll('meta[data-meta-tag="true"]');
  metaTags.forEach((tag) => {
    tag.remove();
  });
};

/**
 * Component to manage meta tags for SEO and social sharing
 */
const MetaTags: React.FC<MetaTagsProps> = ({ metadata, cacheBuster }) => {
  useEffect(() => {
    // Update meta tags in document head
    updateMetaTags(metadata, cacheBuster);

    // Clean up when component unmounts
    return () => {
      removeMetaTags();
    };
  }, [metadata, cacheBuster]);

  // This is a utility component that only affects the document head
  // It doesn't render anything to the DOM
  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metadata.url} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.image} />
      
      {metadata.twitterSite && (
        <meta name="twitter:site" content={metadata.twitterSite} />
      )}
      {metadata.twitterCreator && (
        <meta name="twitter:creator" content={metadata.twitterCreator} />
      )}
    </Head>
  );
};

export default MetaTags;
