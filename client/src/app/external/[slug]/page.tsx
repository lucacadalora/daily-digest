
import React from 'react';
import { Header } from "@/components/Header";
import { SubscribeModal } from "@/components/SubscribeModal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MetaTags from '@/components/SEO/MetaTags';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [
    { slug: 'china-steel-supply-reform' }
  ]
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // You can replace this with a fetch to your API
  const articleMetadata = {
    title: "China's Steel Sector: 'Supply Reform 2.0' Looms | Daily Digest",
    description: "China's steel sector faces a new round of supply-side structural reforms as the government aims to reduce carbon emissions and tackle overcapacity.",
    url: `https://yourdomain.com/external/${params.slug}`,
    image: "/latest/china-steel.png",
    publishedTime: "2025-03-02T18:00:00Z",
  };
  
  return {
    title: articleMetadata.title,
    description: articleMetadata.description,
    openGraph: {
      title: articleMetadata.title,
      description: articleMetadata.description,
      images: [{
        url: articleMetadata.image,
      }],
      type: 'article',
      publishedTime: articleMetadata.publishedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: articleMetadata.title,
      description: articleMetadata.description,
      images: [articleMetadata.image],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // For this example, we're only handling the china-steel-supply-reform slug
  if (params.slug !== 'china-steel-supply-reform') {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header onSubscribe={() => {}} showCategories={false} />

      <div className="h-36 sm:h-32"></div>

      <main className="max-w-[860px] mx-auto px-4 py-6 sm:py-8 dark:text-gray-200">
        <div className="mb-8">
          <Link href="/latest" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-4 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Latest
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            China's Steel Sector: 'Supply Reform 2.0' Looms
          </h1>
          
          <div className="flex items-center text-sm mb-6">
            <span className="font-medium text-blue-600 dark:text-blue-400 mr-3">Markets</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 uppercase">3 HR AGO</span>
          </div>
        </div>

        <div className="mb-8">
          <img 
            src="/latest/china-steel.png" 
            alt="Steel factory production line with rolled steel coils" 
            className="w-full rounded-lg"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
            Steel coils at a production facility in China. The country's steel industry faces new supply-side reforms aimed at reducing carbon emissions and overcapacity.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="font-medium text-gray-900 dark:text-white text-lg">
            Beijing is preparing to implement what analysts are calling "Supply Reform 2.0" for China's massive steel industry, targeting both carbon emissions and chronic overcapacity that has plagued the sector for years.
          </p>
          
          {/* Article content */}
          {/* More article content would go here */}
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Daily Digest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
