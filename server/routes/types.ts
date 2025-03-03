/**
 * Shared types for server routes
 */

/**
 * Metric data used in article previews
 */
export interface PreviewMetric {
  label: string;
  value: string;
  subtitle?: string;
}

/**
 * Article interface matching the client-side configuration
 */
export interface Article {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  author: string;
  publishedDate: string;
  date: string;
  category?: string;
  tags?: string[];
  slug: string;
  featured?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  summary?: string;
  previewMetrics?: PreviewMetric[];
  previewImage?: string;
}