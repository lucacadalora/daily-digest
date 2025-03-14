import { Request } from 'express';

/**
 * Crawler detection patterns for various social media platforms
 */
const CRAWLER_PATTERNS = {
  // Twitter/X crawlers
  twitter: [
    /Twitterbot/i,
    /Twitter/i, 
    /card-validator/i
  ],
  
  // Facebook crawlers
  facebook: [
    /facebookexternalhit/i, 
    /Facebook/i,
    /facebookcatalog/i
  ],
  
  // WhatsApp crawler detection is intentionally disabled
  // We want WhatsApp users to access the real site
  whatsapp: [
    // Empty array - no longer detecting WhatsApp
  ],
  
  // LinkedIn crawlers
  linkedin: [
    /LinkedInBot/i,
    /^LinkedIn/
  ],
  
  // Generic social media crawlers
  generic: [
    /bot/i,
    /preview/i,
    /social/i,
    /embed/i,
    /metadata/i,
    /crawler/i
  ]
};

/**
 * Known social media referer patterns
 */
const SOCIAL_REFERERS = [
  /twitter\.com/i,
  /x\.com/i,
  /facebook\.com/i,
  /fb\.com/i,
  /linkedin\.com/i,
  /t\.co\//i
  // WhatsApp referer pattern removed - we don't want to treat WhatsApp referrals as special
];

/**
 * Check if the request is from a social media crawler
 * This function checks both User-Agent and Referer headers
 * 
 * @param req Express request object
 * @returns Object with detection results
 */
export function detectSocialMediaCrawler(req: Request): { 
  isCrawler: boolean;
  platform: string | null;
  isTwitter: boolean;
  isFacebook: boolean;
  isWhatsApp: boolean;
  isLinkedIn: boolean;
} {
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  
  // Check if this is a Twitter/X crawler
  const isTwitter = CRAWLER_PATTERNS.twitter.some(pattern => pattern.test(userAgent));
  
  // Check if this is a Facebook crawler
  const isFacebook = CRAWLER_PATTERNS.facebook.some(pattern => pattern.test(userAgent));
  
  // WhatsApp crawler detection is disabled
  // We manually check here in case it's needed somewhere, but we always return false
  const isWhatsApp = false;
  
  // Check if this is a LinkedIn crawler
  const isLinkedIn = CRAWLER_PATTERNS.linkedin.some(pattern => pattern.test(userAgent));
  
  // Check if this is a generic social media crawler
  const isGenericCrawler = CRAWLER_PATTERNS.generic.some(pattern => pattern.test(userAgent));
  
  // Check if the referer is from a social media site
  const isSocialReferer = SOCIAL_REFERERS.some(pattern => pattern.test(referer));
  
  // Determine the platform
  let platform = null;
  if (isTwitter) platform = 'twitter';
  else if (isFacebook) platform = 'facebook';
  // We no longer detect WhatsApp as a platform
  else if (isLinkedIn) platform = 'linkedin';
  else if (isGenericCrawler || isSocialReferer) platform = 'unknown';
  
  return {
    // WhatsApp is excluded from the crawler detection
    isCrawler: isTwitter || isFacebook || isLinkedIn || isGenericCrawler || isSocialReferer,
    platform,
    isTwitter,
    isFacebook,
    isWhatsApp, // Always false
    isLinkedIn
  };
}

/**
 * Set appropriate cache control headers for social media crawlers
 * This helps ensure that the preview is fresh and up-to-date
 * 
 * @param res Express response object
 */
export function setSocialMediaCacheHeaders(res: any): void {
  // No caching for social media crawlers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}