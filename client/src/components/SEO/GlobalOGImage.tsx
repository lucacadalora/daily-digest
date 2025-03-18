import React, { useEffect } from 'react';
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

  // Remove any existing OG image meta tags to prevent conflicts
  useEffect(() => {
    // This runs only on the client side to clean up any existing meta tags
    const removeExistingOGTags = () => {
      const existingOGImageTags = document.querySelectorAll('meta[property="og:image"]');
      const existingTwitterImageTags = document.querySelectorAll('meta[name="twitter:image"]');
      
      existingOGImageTags.forEach(tag => tag.remove());
      existingTwitterImageTags.forEach(tag => tag.remove());
    };
    
    removeExistingOGTags();
    
    // This adds the meta tags directly to the head to ensure they're present
    // even if React-Helmet has issues
    const addMetaTags = () => {
      const head = document.head;
      const baseUrl = 'dailydigest.id';
      const fullUrl = `${baseUrl}${location}`;
      const imageSocialUrl = `https://image.social/get?url=${fullUrl}`;
      
      // Create OG image meta tag
      const ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      ogImageMeta.setAttribute('content', imageSocialUrl);
      head.appendChild(ogImageMeta);
      
      // Create OG width meta tag
      const ogWidthMeta = document.createElement('meta');
      ogWidthMeta.setAttribute('property', 'og:image:width');
      ogWidthMeta.setAttribute('content', '1200');
      head.appendChild(ogWidthMeta);
      
      // Create OG height meta tag
      const ogHeightMeta = document.createElement('meta');
      ogHeightMeta.setAttribute('property', 'og:image:height');
      ogHeightMeta.setAttribute('content', '630');
      head.appendChild(ogHeightMeta);
      
      // Create Twitter card meta tag
      const twitterCardMeta = document.createElement('meta');
      twitterCardMeta.setAttribute('name', 'twitter:card');
      twitterCardMeta.setAttribute('content', 'summary_large_image');
      head.appendChild(twitterCardMeta);
      
      // Create Twitter image meta tag
      const twitterImageMeta = document.createElement('meta');
      twitterImageMeta.setAttribute('name', 'twitter:image');
      twitterImageMeta.setAttribute('content', imageSocialUrl);
      head.appendChild(twitterImageMeta);
    };
    
    addMetaTags();
    
    // Clean up when the component unmounts
    return () => {
      removeExistingOGTags();
    };
  }, [location]);

  // Get the full URL for the current page
  const baseUrl = 'dailydigest.id'; // Use your actual domain here
  const fullUrl = `${baseUrl}${location}`;
  
  // Generate the image.social URL with the correct format and optional cache busting
  // Format: https://image.social/get?url=domain/path
  const timestamp = new Date().getTime();
  const imageSocialUrl = `https://image.social/get?url=${fullUrl}&t=${timestamp}`;
  
  return (
    <Helmet prioritizeSeoTags>
      {/* Open Graph image tags - prioritized */}
      <meta property="og:image" content={imageSocialUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card image tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageSocialUrl} />
    </Helmet>
  );
}