
import React from 'react';
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  type?: string;
  publishedTime?: string;
  cacheBuster?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  url = typeof window !== 'undefined' ? window.location.href : '',
  imageUrl,
  type = 'article',
  publishedTime,
  cacheBuster = new Date().getTime().toString(),
}) => {
  // Generate dynamic OG image URL if no image is provided
  const ogImageUrl = imageUrl || 
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&v=${cacheBuster}`;
  
  const imageWidth = 1200;
  const imageHeight = 630;
  const imageAlt = title;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Daily Digest" />
      <meta property="og:locale" content="en_US" />
      
      {/* Image Meta Tags */}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:url" content={ogImageUrl} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:image:alt" content={imageAlt} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:src" content={ogImageUrl} />
      <meta name="twitter:url" content={url} />
      
      {/* Article specific (if article type) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
    </Head>
  );
};

export default MetaTags;
