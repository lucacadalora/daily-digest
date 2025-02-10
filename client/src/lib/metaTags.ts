import { Article } from "@/types/newsletter";

export function updateMetaTags(article: Article) {
  // Create a richer description by combining metrics and description
  const enrichedDescription = article.previewMetrics 
    ? `${article.previewMetrics.map(m => `${m.label}: ${m.value}`).join(" | ")}. ${article.description}`
    : article.description;

  // Create a rich title that includes key metrics if available
  const enrichedTitle = article.previewMetrics 
    ? `${article.title} | ${article.previewMetrics[0].value} ${article.previewMetrics[0].label}`
    : article.title;

  const metaTags = {
    // Open Graph
    "og:title": enrichedTitle,
    "og:description": enrichedDescription,
    "og:type": "article",
    "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
    "og:site_name": "Daily Digest",
    "og:locale": "en_US",

    // Twitter Card
    "twitter:card": "summary",
    "twitter:site": "@dailydigest",
    "twitter:creator": "@dailydigest",
    "twitter:title": enrichedTitle,
    "twitter:description": enrichedDescription,
    "twitter:domain": "lucaxyzz-digest.replit.app",

    // Article Metadata
    "article:published_time": article.date,
    "article:author": article.author,
    "article:section": article.category,
    "article:tag": article.tags ? article.tags.join(",") : article.category,

    // Basic SEO
    "description": enrichedDescription,
    "keywords": article.tags ? article.tags.join(",") : `${article.category},market analysis,financial news`,
    "news_keywords": article.tags ? article.tags.join(",") : article.category
  };

  // Update meta tags
  Object.entries(metaTags).forEach(([name, content]) => {
    let tag;
    if (name.startsWith('og:') || name.startsWith('article:')) {
      tag = document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', name);
        document.head.appendChild(tag);
      }
    } else {
      tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
    }
    tag.setAttribute('content', content);
  });

  // Update document title with the enriched title
  document.title = `${enrichedTitle} | Daily Digest`;
}
