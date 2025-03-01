import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, Globe, Clock, MapPin, ChevronRight, TrendingUp, 
  AlertCircle, Unlink, FileLock2, FileText, ExternalLink 
} from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";

export default function JapanEconomicSecurity() {
  const [location] = useLocation();
  const article = sampleArticles.find(a => a.slug === 'japan-economic-security-indonesia-minerals');

  useEffect(() => {
    if (article) {
      // Create rich preview metadata
      const metrics = article.previewMetrics || [];
      const metricsText = metrics.length > 0 
        ? metrics.map(m => `${m.label}: ${m.value}`).join(" | ")
        : '';

      const previewTitle = `${article.title} | Daily Digest`;
      const previewDescription = metricsText 
        ? `${metricsText}. ${article.description}`
        : article.description;

      const metaTags = {
        // Open Graph tags for rich previews
        'og:title': previewTitle,
        'og:description': previewDescription,
        'og:type': 'article',
        'og:url': `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
        'og:site_name': 'Daily Digest',
        'og:locale': 'en_US',

        // Twitter Card tags
        'twitter:card': 'summary',
        'twitter:site': '@dailydigest',
        'twitter:creator': '@dailydigest',
        'twitter:title': previewTitle,
        'twitter:description': previewDescription,

        // Article metadata
        'article:published_time': article.date,
        'article:author': article.author,
        'article:section': article.category,
        'article:tag': article.tags?.join(',') || article.category,

        // Basic SEO tags
        'description': previewDescription,
        'keywords': article.tags?.join(',') || `${article.category},market analysis,financial news`,
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
      document.title = previewTitle;
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      <Header simplified showCategories={false} />

      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletter" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>Japan's Economic Security Strategy</span>
        </div>

        <header className="sticky top-0 z-20 bg-[#FBF7F4] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>Analysis</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>TOKYO / JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By {article.author}</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            As meticulously documented by <a href="#citation-1" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">Armstrong, Solís, and Urata in their 2025 paper "Economic Security and New Industrial Policy"<sup className="text-xs ml-0.5">[1]</sup></a> published in the Asian Economic Policy Review, Japan exhibits persistent vulnerabilities in its supply chain resilience despite comprehensive policy initiatives. Recent analysis reveals Japan's increased dependence on China for rare earth elements—rising precipitously from 50% in 2014 to 70% in 2022—notwithstanding Beijing's tightening export controls over strategic minerals including germanium, gallium, graphite, and antimony.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-red-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Chinese Dependency</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">70%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Japan's rare earth imports</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Nickel Reserves</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">21%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Indonesia's global share</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Strategic Index</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">86 vs 12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Japan HHI vs G7 average</p>
            </CardContent>
          </Card>
        </div>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Supply Chain Vulnerabilities in Japan's Economic Security Framework</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This vulnerability is systematically quantified through comparative analysis of supplier concentration metrics. Japan reports substantially higher supplier concentration (defined by Herfindahl-Hirschman Index above 50) compared to G7 averages across multiple critical sectors:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Sector</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Japan HHI</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">G7 Average HHI</th>
                  <th className="p-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Machinery</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">148</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">12</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-red-600">+136</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Organic chemical goods</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">141</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">30</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-red-600">+111</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Rare earths and metals</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">86</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">12</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-red-600">+74</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Electric products</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">79</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">12</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-red-600">+67</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Supply Chain Dependencies on China</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            According to the Mitsubishi Research Institute's analysis, computation of import sources for ten specified critical materials designated under the Economic Security Promotion Act (ESPA) reveals China's dominant position across multiple categories. China represents the primary source of imports for fertilizers (42%), machine tools and industrial robots (30%), rechargeable batteries (52%), and ship parts (22%). Additionally, China ranks second in permanent magnets (36%), semiconductors (24%), and rare earths (30%).
          </p>
          
          <div className="my-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-center mb-3">
              <p className="font-semibold text-gray-900 dark:text-white">Figure 1: Share of China in overall trade for Japan and the United States (%)</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Showing trends from 1989-2023</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-2xl h-64 flex items-center justify-center rounded">
                <p className="text-gray-600 dark:text-gray-400 text-sm italic">Figure 1 Image Placeholder</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The International Energy Agency further confirms that China maintains an extraordinary dominance in processing critical minerals, accounting for 70% of global rare earth elements production and an overwhelming 90% of processing capacity—a bottleneck of particular strategic concern.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Japan's Strategic Responses</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Economic Security Promotion Act (ESPA) - first pillar: supply chain resilience</li>
                  <li>Government identification of essential products susceptible to foreign exploitation</li>
                  <li>Subsidization of corporate sustainability planning</li>
                  <li>Industrial policies to reduce dependency and diversify supply chains</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Japanese Firms' Risk Management</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Inventory buffer enhancement:</p>
                    <p className="text-gray-700 dark:text-gray-300">58.2% (semiconductors), 51.3% (critical minerals)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Production site/procurement diversification:</p>
                    <p className="text-gray-700 dark:text-gray-300">50.9%, 53.9%</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product design reconfiguration:</p>
                    <p className="text-gray-700 dark:text-gray-300">30.9%, 17.9%</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Material recycling initiatives:</p>
                    <p className="text-gray-700 dark:text-gray-300">10.0%, 14.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Supply Chain Reconfiguration Strategies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">27.5%</p>
                  <p className="text-gray-700 dark:text-gray-300">"Friendshoring"</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">32.6%</p>
                  <p className="text-gray-700 dark:text-gray-300">Reshoring to Japan</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">30.5%</p>
                  <p className="text-gray-700 dark:text-gray-300">Further globalization</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="my-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-center mb-3">
              <p className="font-semibold text-gray-900 dark:text-white">Figure 3: Japan's trade distortive semiconductor industrial policies with stated motivation</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Showing cumulative measures categorized by resilience security, strategic competitiveness, and geopolitical concern</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-2xl h-64 flex items-center justify-center rounded">
                <p className="text-gray-600 dark:text-gray-400 text-sm italic">Figure 3 Image Placeholder</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Indonesia's Strategic Position in Japan's Economic Security Framework</h2>
          
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Critical Minerals Resources as Strategic Leverage</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Indonesia's abundant nickel reserves—containing approximately 21% of global reserves—represent a significant opportunity within Japan's supply chain diversification imperative. With Japan's increased rare earth dependence on China (from 50% in 2014 to 70% in 2022), Indonesia emerges as a potential alternative supplier in Japan's mineral security strategy.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Japan's persistent vulnerabilities in rare earths and metals (HHI concentration index of 86 compared to G7 average of 12) creates strategic openings for Indonesia to position itself within Japan's "strategic autonomy" framework. This alignment is particularly relevant given Beijing's documented tightening of export controls over strategic minerals including germanium, gallium, graphite, and antimony.
          </p>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2 mt-6">Japan's Strategic Imperative to Reduce Chinese Dependency</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Japan has explicitly adopted a policy objective to systematically reduce dependency on China across multiple dimensions of economic interaction. This imperative is central to Japan's "strategic autonomy" doctrine articulated by the LDP in 2020 and embedded in subsequent policy frameworks. Economic data reveals the tangible manifestation of this strategic shift in Japanese investment patterns, with FDI outflows to China declining precipitously from their peak of 18.9% of total Japanese outbound investment.
          </p>
          
          <div className="my-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-center mb-3">
              <p className="font-semibold text-gray-900 dark:text-white">Figure 2: Share of China in overall FDI for Japan and the United States (%)</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Showing trends in both outflows and stock positions</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-2xl h-64 flex items-center justify-center rounded">
                <p className="text-gray-600 dark:text-gray-400 text-sm italic">Figure 2 Image Placeholder</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Multiple drivers underpin this strategic recalibration:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Unlink className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">Economic Coercion</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Beijing's increasing deployment of economic leverage for geopolitical purposes (exemplified by the 2010 rare earth minerals embargo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">Rising Production Costs</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Within China eroding comparative advantages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <FileLock2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">Technological Competition</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Intensifying US-China technological competition creating compliance risks for Japanese firms with global operations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">COVID-19 Exposures</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Pandemic exposures of concentrated supply chain vulnerabilities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            While Japan is not pursuing comprehensive economic decoupling from China, it is systematically implementing a calibrated "de-risking" strategy that targets specific vulnerability points in critical supply chains. This measured approach aims to maintain beneficial economic engagement with China while establishing greater resilience against potential supply disruptions or economic coercion.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Opportunities for Indonesia within Japan's Economic Security Framework</h2>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Manufacturing Diversification and Supply Chain Reconfiguration</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Recent corporate survey data indicating significant pursuit of "friendshoring" (27.5%) and "further globalization" (30.5%) strategies by Japanese firms suggests Indonesia's potential as a destination for manufacturing investment seeking to reduce concentration risks. This opportunity is amplified by Japan's documented concerns regarding overdependence on China for products including:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">99.4%</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">Laptop PCs</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">83.7%</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">Mobile telephones</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">66.6%</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">PV semiconductor devices</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">66.1%</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">Lithium-ion batteries</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Raw Materials Processing Advancement Opportunities</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            China's dominance in critical minerals processing (90% of rare earths processing globally according to IEA data) illuminates a strategic convergence between Japan's economic security objectives and Indonesia's downstream industry development goals. Japan's substantial industrial subsidies (3.9 trillion yen over three years) suggests potential for Indonesia to attract Japanese technical expertise for advancing processing capabilities that would simultaneously serve Japan's strategic needs while accelerating Indonesia's industrialization objectives.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This potential alignment is reinforced by recent economic research suggesting efficacy of well-designed industrial policies particularly for upstream sectors. Indonesia's position in the industrial value chain for critical minerals essential to clean energy technologies corresponds directly with Japan's identification of renewable energy components as strategically important under the Economic Security Promotion Act (ESPA).
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Implementation Considerations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Institutional Framework Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Japan's rapid institutional formalization—including dedicated economic security divisions within MOFA and METI, specialized teams within the National Security Secretariat, and a full-fledged Economic Security Bureau—provides models for Indonesia to develop complementary institutional capacities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Public-Private Coordination</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  The significant divergence in economic security implementation based on organizational scale (56.5% of SMEs have implemented no economic security policies) parallels challenges in Indonesia's business ecosystem, suggesting potential for shared capacity-building initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Multilateral Framework Alignment</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Japan's systematic embedding of its economic security agenda within frameworks including the Indo-Pacific Economic Framework's Supply Chain Resilience pillar creates opportunities for Indonesia to strengthen economic security cooperation through established multilateral channels.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
            <p className="text-gray-700 dark:text-gray-300 italic">
              The current transformation of global supply chains presents a strategic window for Indonesia to position itself within Japan's evolving economic security architecture, particularly in critical minerals and supply chain reconfiguration initiatives that align with both nations' strategic imperatives amid intensifying geopolitical competition.
            </p>
          </div>
        </section>
        
        {/* Citation Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div id="citation-1" className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Source [1]</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Armstrong, S., Solís, M., & Urata, S. (2025). Economic Security and New Industrial Policy. <i>Asian Economic Policy Review</i>.
              </p>
              <a 
                href="https://onlinelibrary.wiley.com/doi/full/10.1111/aepr.12502?msockid=38e8ce1644eb6c2c0bf3dcdf45bd6d60" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-flex items-center"
              >
                View publication <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}