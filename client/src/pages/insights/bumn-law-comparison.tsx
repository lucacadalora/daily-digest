import { useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Clock, MapPin, ExternalLink } from "lucide-react";
import { LuLightbulb } from "react-icons/lu";
import { sampleArticles } from "@/types/newsletter";

export default function BUMNLawComparison() {
  const article = sampleArticles.find(a => a.slug === "bumn-law-comparison");

  useEffect(() => {
    if (article) {
      // Update meta tags for SEO
      const metaTags = {
        'og:title': article.title,
        'og:description': article.description,
        'og:type': 'article',
        'og:url': window.location.href,
        
        // Article metadata
        'article:published_time': article.date,
        'article:author': article.author,
        'article:section': article.category,
        'article:tag': article.tags?.join(',') || article.category,

        // Basic SEO tags
        'description': article.description,
        'keywords': article.tags?.join(',') || `${article.category},BUMN,Indonesia,Law`,
        'news_keywords': article.tags?.join(',') || article.category
      };

      // Update meta tags in the document head
      Object.entries(metaTags).forEach(([name, content]) => {
        let tag;
        if (name.startsWith('og:') || name.startsWith('article:')) {
          // Handle Open Graph and article tags
          tag = document.querySelector(`meta[property="${name}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', name);
            document.head.appendChild(tag);
          }
        } else {
          // Handle other meta tags
          tag = document.querySelector(`meta[name="${name}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', name);
            document.head.appendChild(tag);
          }
        }
        tag.setAttribute('content', content);
      });

      // Update the document title
      document.title = article.title + " | Daily Digest";
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

        <div className="py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
                CLIENT ALERT
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-bold uppercase">{article.date} | JAKARTA</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.
            </p>

            <p>
              Perubahan utama mencakup pemisahan aset BUMN dari aset negara, penerapan business judgment rule, penghapusan status eksekutif BUMN sebagai penyelenggara negara, dan pengaturan Holding Investasi dan Holding Operasional di bawah Danantara.
            </p>

            <p>
              Reformasi ini membawa implikasi luas bagi operasional BUMN dan mitra bisnisnya seiring konsolidasi yang diperkirakan terjadi dalam beberapa tahun mendatang, dengan masa transisi ditetapkan selama satu tahun.
            </p>

            <div className="not-prose">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6 mb-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center mb-2">
                  <LuLightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Untuk analisis komprehensif mengenai 9 aspek perubahan utama, silakan lihat: 
                    <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium ml-1">
                      Analisis Perbandingan UU BUMN
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <LuLightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Written by</p>
                  <p className="font-medium text-gray-900 dark:text-white">{article.author}</p>
                </div>
              </div>
              
              <Link href="/insights" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Lihat semua insight
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}