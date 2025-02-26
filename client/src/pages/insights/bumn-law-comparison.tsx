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

        <header className="border-b border-gray-200 dark:border-gray-800 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
                {article.category}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-bold uppercase">Regulatory Analysis</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>JAKARTA</span>
            </div>
          </div>

          <div className="text-sm mb-4">
            <p className="font-semibold dark:text-gray-300">By {article.author}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead">
                <strong>Indonesia telah memberlakukan perubahan signifikan terhadap kerangka regulasi BUMN</strong> dengan disahkannya UU No. 1/2025 yang mengamendemen UU No. 19/2003. Reformasi ini mengubah paradigma pengelolaan BUMN dari Teori Sumber ke Teori Korporasi dan memperkenalkan Danantara dengan modal awal Rp 1.000 triliun.
              </p>

              <p>
                Perubahan utama mencakup pemisahan aset BUMN dari aset negara, penerapan business judgment rule, penghapusan status eksekutif BUMN sebagai penyelenggara negara, dan pengaturan Holding Investasi dan Holding Operasional di bawah Danantara.
              </p>

              <h2>9 Perubahan Utama dalam UU BUMN Baru</h2>

              <ol>
                <li>
                  <strong>Perubahan Paradigma:</strong> Beralih dari Teori Sumber (BUMN sebagai sumber pendapatan negara) ke Teori Korporasi (BUMN sebagai entitas bisnis mandiri).
                </li>
                <li>
                  <strong>Pemisahan Aset:</strong> Kekayaan BUMN bukan lagi kekayaan negara, melainkan terpisah sebagai entitas bisnis independen.
                </li>
                <li>
                  <strong>Business Judgment Rule:</strong> Perlindungan hukum bagi direksi BUMN dalam pengambilan keputusan bisnis dengan itikad baik.
                </li>
                <li>
                  <strong>Status Penyelenggara Negara:</strong> Pengurus BUMN tidak lagi berstatus sebagai penyelenggara negara.
                </li>
                <li>
                  <strong>Danantara:</strong> Pembentukan badan investasi terintegrasi dengan modal awal Rp 1.000 triliun.
                </li>
                <li>
                  <strong>Struktur Holding:</strong> Pengaturan BUMN dalam Holding Investasi dan Holding Operasional di bawah Danantara.
                </li>
                <li>
                  <strong>Fleksibilitas Anggaran:</strong> BUMN dapat menetapkan anggaran sendiri tanpa persetujuan pemerintah.
                </li>
                <li>
                  <strong>Penyertaan Modal:</strong> Penyederhanaan proses penyertaan modal negara ke BUMN.
                </li>
                <li>
                  <strong>Periode Transisi:</strong> Masa transisi implementasi UU selama satu tahun.
                </li>
              </ol>

              <h2>Implikasi bagi Bisnis dan Pasar</h2>

              <p>
                Reformasi UU BUMN membawa implikasi luas bagi operasional BUMN dan mitra bisnisnya seiring konsolidasi yang diperkirakan terjadi dalam beberapa tahun mendatang. Beberapa dampak utama meliputi:
              </p>

              <ul>
                <li>Peningkatan fleksibilitas dalam pengambilan keputusan bisnis</li>
                <li>Potensi akselerasi privatisasi dan IPO BUMN dalam jangka menengah</li>
                <li>Peningkatan daya saing BUMN di pasar global</li>
                <li>Perubahan struktur kerjasama dengan mitra swasta</li>
                <li>Penguatan tata kelola korporasi dan transparansi</li>
              </ul>

              <div className="not-prose">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-8 mb-8 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center mb-4">
                    <LuLightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Analisis Komprehensif
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Untuk analisis lebih mendalam mengenai 9 aspek perubahan utama dalam UU BUMN, silakan kunjungi:
                  </p>
                  <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Analisis Perbandingan UU BUMN
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>

              <h2>Kesimpulan</h2>
              
              <p>
                UU BUMN No. 1/2025 memberikan kerangka baru yang lebih fleksibel untuk BUMN Indonesia beroperasi sebagai entitas bisnis yang berdaya saing global. Pemisahan aset BUMN dari aset negara, penerapan business judgment rule, dan pembentukan Danantara merupakan terobosan signifikan yang berpotensi mengubah lanskap bisnis Indonesia secara fundamental.
              </p>
              
              <p>
                Pelaku pasar perlu mencermati perkembangan implementasi UU ini selama masa transisi satu tahun ke depan, terutama terkait restrukturisasi holding dan potensi perubahan valuasi BUMN di pasar modal.
              </p>
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