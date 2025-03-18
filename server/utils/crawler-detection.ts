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
  
  // Telegram crawlers
  telegram: [
    /TelegramBot/i,
    /Telegram/i
  ],
  
  // Additional messaging apps
  discord: [/Discordbot/i],
  slack: [/Slackbot/i],
  viber: [/Viber/i],
  line: [/Line\//i],
  skype: [/SkypeUriPreview/i],
  
  // Other social platforms
  snapchat: [/Snapchat/i],
  medium: [/Medium/i],
  reddit: [/Redditbot/i],
  
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
  /t\.co\//i,
  /telegram\.org/i,
  /t\.me\//i,
  /discord\.com/i,
  /discordapp\.com/i,
  /viber\.com/i,
  /line\.me/i,
  /skype\.com/i,
  /snapchat\.com/i,
  /medium\.com/i,
  /reddit\.com/i
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
  isInstagram: boolean;
  isLinkedIn: boolean;
  isTelegram?: boolean;
} {
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  
  // Check for WhatsApp and Instagram specific user-agents or referers
  const isWhatsAppRequest = 
    userAgent.includes('WhatsApp') || 
    referer.includes('whatsapp.com') || 
    referer.includes('wa.me');
    
  const isInstagramRequest = 
    userAgent.includes('Instagram') || 
    referer.includes('instagram.com') ||
    referer.includes('ig.me');
  
  // If this is a WhatsApp or Instagram request, don't treat as a crawler
  if (isWhatsAppRequest || isInstagramRequest) {
    return {
      isCrawler: false,
      platform: null,
      isTwitter: false,
      isFacebook: false,
      isWhatsApp: isWhatsAppRequest,
      isInstagram: isInstagramRequest,
      isLinkedIn: false
    };
  }
  
  // Check if this is a Twitter/X crawler
  const isTwitter = CRAWLER_PATTERNS.twitter.some(pattern => pattern.test(userAgent));
  
  // Check if this is a Facebook crawler (but not Instagram)
  const isFacebook = !isInstagramRequest && CRAWLER_PATTERNS.facebook.some(pattern => pattern.test(userAgent));
  
  // Check if this is a LinkedIn crawler
  const isLinkedIn = CRAWLER_PATTERNS.linkedin.some(pattern => pattern.test(userAgent));
  
  // Check if this is a Telegram crawler
  const isTelegram = CRAWLER_PATTERNS.telegram.some(pattern => pattern.test(userAgent)) || 
                    referer.includes('telegram.org') || 
                    referer.includes('t.me');
  
  // Check if this is a generic social media crawler
  const isGenericCrawler = CRAWLER_PATTERNS.generic.some(pattern => pattern.test(userAgent));
  
  // Check if the referer is from a social media site
  const isSocialReferer = SOCIAL_REFERERS.some(pattern => pattern.test(referer));
  
  // Determine the platform
  let platform = null;
  if (isTwitter) platform = 'twitter';
  else if (isFacebook) platform = 'facebook';
  else if (isLinkedIn) platform = 'linkedin';
  else if (isTelegram) platform = 'telegram';
  else if (isGenericCrawler || isSocialReferer) platform = 'unknown';
  
  return {
    // We exclude WhatsApp and Instagram from crawler detection
    isCrawler: isTwitter || isFacebook || isLinkedIn || isTelegram || (isGenericCrawler && !isWhatsAppRequest && !isInstagramRequest) || (isSocialReferer && !isWhatsAppRequest && !isInstagramRequest),
    platform,
    isTwitter,
    isFacebook,
    isWhatsApp: isWhatsAppRequest,
    isInstagram: isInstagramRequest,
    isLinkedIn,
    isTelegram
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