import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

/**
 * GlobalOGImage component that adds image.social Open Graph tags to every page
 * 
 * This component should be included in your app's layout or root component
 * to ensure that every page has the proper OG image tags.
 * 
 * It dynamically generates the OG image URL based on the current page path,
 * ensuring each page has its own unique social preview image.
 */
export default function GlobalOGImage() {
  const [location] = useLocation();

  // Get the full URL for the current page
  const baseUrl = 'dailydigest.id'; // Use your actual domain here
  const fullUrl = `${baseUrl}${location}`;
  
  // Generate the image.social URL
  const imageSocialUrl = `https://image.social/get?url=${fullUrl}`;
  
  return (
    <Helmet>
      {/* Open Graph image tags */}
      <meta property="og:image" content={imageSocialUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card image tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageSocialUrl} />
    </Helmet>
  );
}