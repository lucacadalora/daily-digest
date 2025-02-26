import { useEffect } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight, Clock, MapPin, ExternalLink } from "lucide-react";

export default function BUMNLawComparison() {
  useEffect(() => {
    // Update the document title
    document.title = "Perbandingan UU BUMN: UU No. 19/2003 vs UU No. 1/2025 | Market Insights";
  }, []);

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Perbandingan UU BUMN: UU No. 19/2003 vs UU No. 1/2025
          </h1>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>February 26, 2025</span>
            </div>
            <span>|</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>JAKARTA</span>
            </div>
          </div>

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

            <p>
              Untuk analisis komprehensif mengenai 9 aspek perubahan utama, silakan lihat: <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Analisis Perbandingan UU BUMN</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}