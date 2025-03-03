import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { ArticleMetadata } from '@/lib/meta-tags';
import MetaTags from '@/components/SEO/MetaTags';

/**
 * Test page for verifying the default site logo functionality
 * This page deliberately doesn't specify an image to test the default site logo
 */
export default function TestDefaultLogo() {
  // Generate test metadata without an image to test default logo fallback
  const metadata: ArticleMetadata = {
    title: "Test Default Logo Page",
    description: "This page is used to test the default site logo functionality when no specific image is provided.",
    url: typeof window !== 'undefined' ? window.location.href : "https://market-insights.repl.app/test-default-logo",
    author: "Test Author",
    publishedTime: new Date().toISOString(),
    section: "Testing",
    tags: ["Test", "Default Logo", "Meta Tags"],
    siteName: 'Daily Digest',
    twitterSite: '@dailydigest',
    twitterCreator: '@dailydigest',
    // Deliberately omit image to test default logo
    useDefaultImage: true, // Flag to use default site logo
  };
  
  // Use a cache buster to ensure social media platforms refresh the metadata
  const cacheBuster = new Date().getTime().toString();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Add meta tags */}
      <MetaTags metadata={metadata} cacheBuster={cacheBuster} />
      
      <Header simplified />
      
      {/* Test content */}
      <div className="w-full max-w-screen-xl mx-auto bg-white dark:bg-gray-950 min-h-screen">
        <main className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto mb-2">
            <Link href="/">
              <div className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </div>
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-5">Test Default Logo Page</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p>This page is intentionally created without a specific image to test the default site logo fallback functionality.</p>
              
              <h2>Features being tested:</h2>
              <ul>
                <li>Default site logo fallback when no image is provided</li>
                <li>Proper usage of useDefaultImage flag</li>
                <li>Meta tag generation for sites without specific images</li>
              </ul>
              
              <p>When shared on social media platforms (Twitter, Facebook, LinkedIn, WhatsApp), this page should use the site's default logo for previews instead of showing a blank or missing image.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}