import { useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Clock, MapPin, ExternalLink } from "lucide-react";
import { LuLightbulb } from "react-icons/lu";
import { sampleArticles } from "@/types/newsletter";
import { Badge } from "@/components/ui/badge";
import MetaTags from '@/components/SEO/MetaTags';
import type { ArticleMetadata } from '@/lib/meta-tags';

export default function BUMNLawComparison() {
  const article = sampleArticles.find(a => a.slug === "bumn-law-comparison");

  // Create article metadata for the MetaTags component
  const metadata: ArticleMetadata | null = article ? {
    title: `${article.title} | Daily Digest`,
    description: article.description,
    url: `https://lucaxyzz-digest.replit.app/insights/bumn-law-comparison`,
    image: '/images/bumn-law-comparison.jpg',
    author: article.author,
    publishedTime: article.date,
    section: article.category,
    tags: article.tags || [article.category, 'BUMN', 'Indonesia', 'Law'],
    siteName: 'Daily Digest',
    twitterSite: '@dailydigest',
    twitterCreator: '@dailydigest'
  } : null;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Add MetaTags component for SEO */}
      {metadata && <MetaTags metadata={metadata} cacheBuster="20250302" />}
      
      <Header simplified showCategories={false} />
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/insights" className="hover:text-blue-600">Insights</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800 dark:text-gray-200">Perbandingan UU BUMN</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 py-6">
          <Badge variant="outline" className="mb-4 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800">
            LAW REVIEW
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Perbandingan UU BUMN: UU No. 19/2003 vs UU No. 1/2025
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>26 Februari 2025</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>JAKARTA</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8 not-prose">
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                  Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.
                </p>
              </div>

              <div className="space-y-4 mb-8 not-prose">
                <div className="flex items-start">
                  <div className="min-w-7 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">1</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">Pemisahan aset BUMN dari aset negara</span>, memberikan fleksibilitas lebih besar dalam pengelolaan aset dan keputusan bisnis.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-7 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">2</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">Penerapan business judgment rule</span> yang melindungi direksi dan komisaris BUMN untuk keputusan bisnis yang diambil dengan itikad baik.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-7 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">3</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">Penghapusan status eksekutif BUMN sebagai penyelenggara negara</span>, mengurangi risiko kriminalisasi keputusan bisnis.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-7 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">4</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">Pengaturan Holding Investasi dan Holding Operasional</span> di bawah Danantara untuk mengoptimalkan sinergi antar BUMN.
                  </p>
                </div>
              </div>
              
              <p>
                Reformasi ini membawa implikasi luas bagi operasional BUMN dan mitra bisnisnya seiring konsolidasi yang diperkirakan terjadi dalam beberapa tahun mendatang, dengan masa transisi ditetapkan selama satu tahun.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-8 flex items-start not-prose">
                <div className="min-w-10 w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <LuLightbulb className="h-5 w-5 text-blue-700 dark:text-blue-200" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Untuk analisis komprehensif mengenai 9 aspek perubahan utama, silakan kunjungi:
                  </p>
                  <a href="https://bumn-vs-danantara.replit.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Analisis Perbandingan UU BUMN
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg sticky top-36">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Insight Terkait</h3>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <Link href="#" className="block hover:text-blue-600 dark:hover:text-blue-400">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 block">Insight</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Restrukturisasi BUMN: Strategi Menuju Global Competitiveness
                    </span>
                  </Link>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <Link href="#" className="block hover:text-blue-600 dark:hover:text-blue-400">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 block">Insight</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Dampak UU BUMN Baru Terhadap Valuasi BUMN di Pasar Modal
                    </span>
                  </Link>
                </div>
                <div>
                  <Link href="#" className="block hover:text-blue-600 dark:hover:text-blue-400">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 block">Insight</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Danantara: Momentum Transformasi Pengelolaan Aset Negara
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/insights" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Lihat semua insight
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}