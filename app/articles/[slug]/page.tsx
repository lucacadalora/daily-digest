import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '../../../client/src/config/articles';
import { ArticleLayout } from '../../../client/src/components/Article/ArticleLayout';
import MetaTags from '../../../client/src/components/SEO/MetaTags';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  // Convert to ArticleMetadata format for MetaTags
  const metadata = {
    title: article.title,
    description: article.description,
    url: `/articles/${article.slug}`,
    image: article.image,
    author: article.author,
    publishedTime: article.publishedDate,
    section: article.category,
    tags: article.tags,
  };

  return (
    <>
      <MetaTags metadata={metadata} />
      <ArticleLayout article={article}>
        <div>
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
          <div className="prose prose-lg max-w-none">
            {/* Article content would go here */}
            <p>
              This is a placeholder for the article content. In a real implementation,
              we would fetch and render the article content here, potentially using MDX
              or some other content format.
            </p>
          </div>
        </div>
      </ArticleLayout>
    </>
  );
}