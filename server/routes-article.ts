import { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { handleArticlePreview, ArticlePreviewData } from './services/article-preview';
import { setSocialMediaCacheHeaders } from './utils/crawler-detection';

/**
 * Article configuration interface matching the client-side configuration
 */
interface ArticleConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  author: string;
  publishedDate: string;
  category?: string;
  tags?: string[];
  slug: string;
  featured?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  summary?: string;
}

/**
 * Cache for article configurations to avoid reading the file on every request
 */
let articlesCache: ArticleConfig[] | null = null;
let articlesCacheTimestamp = 0;

/**
 * Read the article configurations from the client-side config
 * This centralizes all article data in one place for both client and server
 */
async function getArticlesConfig(): Promise<ArticleConfig[]> {
  // Check if we have a recent cache (less than 1 minute old)
  const now = Date.now();
  if (articlesCache && (now - articlesCacheTimestamp) < 60000) {
    return articlesCache;
  }
  
  // Path to the client-side articles config
  const configPath = path.join(process.cwd(), 'client', 'src', 'config', 'articles.ts');
  
  try {
    // Read the file content
    const configContent = fs.readFileSync(configPath, 'utf-8');
    
    // Extract the articles array from the file using regex
    const articlesMatch = configContent.match(/export\s+const\s+articles\s*=\s*(\[[\s\S]*?\])[\s\S]*?;/m);
    if (!articlesMatch || !articlesMatch[1]) {
      console.error('[ArticleRoutes] Failed to extract articles array from config');
      return [];
    }
    
    // Parse the articles array as JSON, replacing the trailing semicolon if needed
    const articlesJson = articlesMatch[1].trim().replace(/;$/, '');
    let articles: ArticleConfig[];
    
    try {
      // Parse the articles array, falling back to eval if JSON.parse fails due to JS syntax
      articles = JSON.parse(articlesJson.replace(/'/g, '"'));
    } catch (jsonError) {
      // If JSON parsing fails, it's probably because the config contains JS features like comments
      // We'll use a more dangerous but effective approach as a fallback
      try {
        // This is a security risk in production, but works for dev environments
        const tempFn = new Function('return ' + articlesJson);
        articles = tempFn();
      } catch (evalError) {
        console.error('[ArticleRoutes] Failed to parse articles config:', evalError);
        return [];
      }
    }
    
    // Update the cache
    articlesCache = articles;
    articlesCacheTimestamp = now;
    
    return articles;
  } catch (error) {
    console.error('[ArticleRoutes] Error reading articles config:', error);
    return [];
  }
}

/**
 * Find an article by its slug
 */
async function findArticleBySlug(slug: string): Promise<ArticleConfig | undefined> {
  const articles = await getArticlesConfig();
  
  // Normalize the slug (remove leading slash if present)
  const normalizedSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  
  return articles.find(article => {
    const articleSlug = article.slug.startsWith('/') ? article.slug.substring(1) : article.slug;
    return articleSlug === normalizedSlug;
  });
}

/**
 * Convert ArticleConfig to ArticlePreviewData format needed by the preview service
 */
function convertToPreviewData(article: ArticleConfig, baseUrl: string): ArticlePreviewData {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    imageUrl: article.image,
    author: article.author,
    publishedDate: article.publishedDate,
    url: article.slug.startsWith('/') ? article.slug : '/' + article.slug,
    category: article.category,
    tags: article.tags
  };
}

/**
 * Register routes for article handling
 */
export function registerArticleRoutes(app: Express) {
  // Serve article images with proper cache control headers
  app.get('/images/articles/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(process.cwd(), 'public', 'images', 'articles', filename);
    
    // Set appropriate cache headers for social media platforms
    setSocialMediaCacheHeaders(res);
    
    // Check if file exists and serve it
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
    
    // If the image doesn't exist, try to find it in the attached_assets folder
    const attachedImagePath = path.join(process.cwd(), 'attached_assets', filename);
    if (fs.existsSync(attachedImagePath)) {
      return res.sendFile(attachedImagePath);
    }
    
    // If neither location has the image, send a 404
    res.status(404).send('Image not found');
  });
  
  // Dynamic route for all articles
  app.get('/:section/:slug', async (req, res, next) => {
    const { section, slug } = req.params;
    
    // Only handle requests for sections that contain articles
    if (!['latest', 'insights', 'external'].includes(section)) {
      return next();
    }
    
    const fullSlug = `${section}/${slug}`;
    const article = await findArticleBySlug(fullSlug);
    
    if (!article) {
      console.log(`[ArticleRoutes] Article not found for slug: ${fullSlug}`);
      return next();
    }
    
    // Get the base URL
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const baseUrl = `${protocol}://${req.get('host')}`;
    
    // Convert to preview data format
    const previewData = convertToPreviewData(article, baseUrl);
    
    // Handle the preview for social media crawlers
    handleArticlePreview(req, res, previewData, next);
  });
}