/**
 * Newsletter Preview Utilities
 * 
 * This module contains functions for generating preview HTML for newsletters
 * without image meta tags to comply with company policy for newsletter shares.
 */

import { Request, Response } from 'express';
import { Article } from '../routes/types';

/**
 * Helper function to escape HTML content
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generate HTML for a newsletter preview without any image meta tags
 * 
 * @param article The article data
 * @param baseUrl The base URL for the site
 * @param slug The slug of the article
 * @returns Complete HTML document with proper meta tags but no image tags
 */
export function generateNewsletterPreviewHtml(
  article: Article, 
  baseUrl: string,
  slug: string
): string {
  // Create rich preview content
  const metrics = article.previewMetrics || [];
  const metricsText = metrics.length > 0
    ? metrics.map(m => `${m.label}: ${m.value}`).join(" | ")
    : '';

  const previewTitle = escapeHtml(`${article.title} | Daily Digest`);
  const previewDescription = escapeHtml(metricsText
    ? `${metricsText}. ${article.description}`
    : article.description);

  // Create a completely new HTML document from scratch
  // This ensures we don't inherit any unwanted meta tags
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <title>${previewTitle}</title>
    <meta name="description" content="${previewDescription}">
    
    <!-- Tell crawlers explicitly not to use image previews -->
    <meta name="robots" content="max-image-preview:none">

    <!-- Open Graph without images -->
    <meta property="og:title" content="${previewTitle}">
    <meta property="og:description" content="${previewDescription}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${baseUrl}/newsletter/${escapeHtml(slug)}">
    <meta property="og:site_name" content="Daily Digest">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card - explicitly summary without image -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@dailydigest">
    <meta name="twitter:creator" content="@dailydigest">
    <meta name="twitter:title" content="${previewTitle}">
    <meta name="twitter:description" content="${previewDescription}">
    <meta name="twitter:domain" content="${baseUrl.replace(/^https?:\/\//, '')}">

    <!-- Article Metadata -->
    <meta property="article:published_time" content="${escapeHtml(article.date)}">
    <meta property="article:author" content="${escapeHtml(article.author)}">
    <meta property="article:section" content="${escapeHtml(article.category)}">
    <meta property="article:tag" content="${escapeHtml(article.tags?.join(',') || article.category)}">
    
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        header {
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.8;
        }
        .metrics {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .metric {
            flex: 1;
            min-width: 150px;
        }
        .metric-label {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .metric-value {
            font-size: 18px;
            color: #333;
        }
        .metric-subtitle {
            font-size: 12px;
            color: #666;
        }
        @media (max-width: 600px) {
            .metrics {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>${previewTitle}</h1>
        <div class="meta">
            By ${escapeHtml(article.author)} | ${escapeHtml(article.date)} | ${escapeHtml(article.category)}
        </div>
    </header>
    
    <div class="content">
        <p>${previewDescription}</p>
        
        ${metrics.length > 0 ? `
        <div class="metrics">
            ${metrics.map(m => `
            <div class="metric">
                <div class="metric-label">${escapeHtml(m.label)}</div>
                <div class="metric-value">${escapeHtml(m.value)}</div>
                ${m.subtitle ? `<div class="metric-subtitle">${escapeHtml(m.subtitle)}</div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}
        
        <p>To continue reading this analysis, please visit our site.</p>
    </div>
</body>
</html>`;
}

/**
 * Handle newsletter preview requests
 * This function serves a modified HTML response with image-free meta tags
 * 
 * @param req Express Request
 * @param res Express Response
 * @param article Article data
 * @param baseUrl Base URL of the site
 * @returns Boolean indicating if the request was handled
 */
export function handleNewsletterPreview(
  req: Request,
  res: Response,
  article: Article,
  slug: string
): void {
  const baseUrl = 'https://lucaxyzz-digest.replit.app';
  
  console.log(`[OG Debug] Serving custom HTML without any image meta tags for ${slug}`);
  
  // Generate the custom HTML
  const htmlContent = generateNewsletterPreviewHtml(article, baseUrl, slug);
  
  // Check for image tags in our custom HTML as a safeguard
  console.log('[OG Debug] Checking for any image tags in our custom HTML');
  // We're verifying we don't have image meta tags, but we do have proper OG tags
  const hasImageTags = htmlContent.includes('og:image') || htmlContent.includes('twitter:image');
  const hasOgTitleTags = htmlContent.includes('og:title');
  
  if (hasImageTags) {
    console.log('[OG Debug] Warning: Found image tags in our custom HTML! These should be removed.');
  } else if (!hasOgTitleTags) {
    console.log('[OG Debug] Warning: Missing required OG title tags in our custom HTML!');
  } else {
    console.log('[OG Debug] Success: HTML has proper OG tags without images');
  }
  
  // Set proper content type and headers
  res.setHeader('Content-Type', 'text/html');
  
  // Set cache control headers to prevent caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Send our custom HTML
  res.send(htmlContent);
}