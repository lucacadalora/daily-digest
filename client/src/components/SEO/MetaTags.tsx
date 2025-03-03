import React, { useEffect } from 'react';
import { updateMetaTags, removeMetaTags } from '@/lib/meta-tags';
import type { ArticleMetadata } from '@/lib/meta-tags';

/**
 * Provides SEO meta tags for articles and pages
 * This component automatically manages OpenGraph and Twitter Card tags
 */
interface MetaTagsProps {
  /**
   * Metadata for the article or page
   */
  metadata: ArticleMetadata;

  /**
   * Optional version for cache busting
   * Used to ensure social media platforms refresh the metadata
   */
  cacheBuster?: string;
}

export default function MetaTags({ metadata, cacheBuster }: MetaTagsProps) {
  useEffect(() => {
    // Update meta tags in document head
    updateMetaTags(metadata, cacheBuster);

    // Clean up when component unmounts
    return () => {
      removeMetaTags();
    };
  }, [metadata, cacheBuster]);

  // This is a utility component that only affects the document head
  // It doesn't render anything to the DOM
  return null;
}