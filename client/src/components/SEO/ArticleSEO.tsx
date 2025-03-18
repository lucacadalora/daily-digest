import React, { useEffect } from 'react';
import { getArticleById, getArticleBySlug, getArticleUrl, getArticleImageUrl, ArticleConfig } from '@/config/articles';
import { ArticleMetadata } from '@/lib/meta-tags';
import MetaTags from './MetaTags';

interface ArticleSEOProps {
  /**
   * The article ID or slug to generate SEO for
   */
  articleId?: string;
  
  /**
   * The article slug to generate SEO for
   */
  articleSlug?: string;
  
  /**
   * Direct article configuration - can be used instead of ID/slug
   */
  article?: ArticleConfig;
}

/**
 * ArticleSEO component - automatically handles all necessary SEO tags
 * for article pages based on the centralized article configuration.
 * 
 * Usage:
 * 
 * ```tsx
 * // By ID
 * <ArticleSEO articleId="global-coal-price-slump" />
 * 
 * // By slug
 * <ArticleSEO articleSlug="latest/global-coal-price-slump" />
 * 
 * // By direct article config
 * <ArticleSEO article={myArticle} />
 * ```
 */
export default function ArticleSEO({ articleId, articleSlug, article }: ArticleSEOProps) {
  // Resolve the article based on the provided parameters
  const resolvedArticle = article || 
    (articleId ? getArticleById(articleId) : 
      articleSlug ? getArticleBySlug(articleSlug) : undefined);
  
  if (!resolvedArticle) {
    console.error('ArticleSEO: Could not find article with provided parameters');
    return null;
  }
  
  // Generate structured metadata for the article
  const metadata: ArticleMetadata = {
    title: resolvedArticle.title,
    description: resolvedArticle.description,
    url: getArticleUrl(resolvedArticle),
    image: getArticleImageUrl(resolvedArticle),
    author: resolvedArticle.author,
    publishedTime: resolvedArticle.publishedDate,
    section: resolvedArticle.category,
    tags: resolvedArticle.tags,
    siteName: 'Market Insights',
    twitterSite: '@MarketInsights',
    twitterCreator: '@MarketInsights',
    imageAlt: resolvedArticle.imageAlt || resolvedArticle.title,
    locale: 'en_US',
    imageWidth: resolvedArticle.imageWidth?.toString(),
    imageHeight: resolvedArticle.imageHeight?.toString(),
  };
  
  // Use a cache buster to ensure social media platforms refresh the metadata
  const cacheBuster = new Date().getTime().toString();
  
  return (
    <MetaTags 
      metadata={metadata}
      cacheBuster={cacheBuster}
    />
  );
}