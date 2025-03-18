import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * GlobalOGImage component that adds default Open Graph tags to every page
 * 
 * This component provides the base Open Graph and Twitter card settings
 * that will be used when no specific article image is provided.
 * 
 * It uses a static default image from the public directory instead of
 * a dynamic screenshot service.
 */
export default function GlobalOGImage() {
  // Default image URL - static logo image in public directory
  const defaultImageUrl = '/logo-large.png';
  
  return (
    <Helmet prioritizeSeoTags>
      {/* Open Graph image tags - prioritized */}
      <meta property="og:image" content={defaultImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card image tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={defaultImageUrl} />
    </Helmet>
  );
}