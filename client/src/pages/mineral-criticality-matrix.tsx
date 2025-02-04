import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from "wouter";
import { sampleArticles } from "@/types/newsletter";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Article } from "@/types/newsletter";

function updateMetaTags(article: Article) {
  const metaTags = {
    "og:title": `${article.title} | Daily Digest`,
    "og:description": article.description,
    "og:type": "article",
    "og:url": `https://lucaxyzz-digest.replit.app/newsletter/${article.slug}`,
    "twitter:card": "summary",
    "twitter:title": `${article.title} | Daily Digest`,
    "twitter:description": article.description,
    "article:published_time": article.date,
    "article:author": article.author,
    "article:section": article.category,
    "article:tag": article.tags ? article.tags.join(",") : article.category
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    let tag = document.querySelector(`meta[property="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  document.title = `${article.title} | Daily Digest`;
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', article.description);
}

export default function MineralCriticalityMatrix() {
  const [location] = useLocation();
  const slug = "indonesia-mineral-criticality-matrix";
  const article = sampleArticles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      updateMetaTags(article);
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header simplified showCategories={false} />

      {/* Header spacing */}
      <div className="h-36 sm:h-32"></div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/newsletters" className="hover:text-blue-600">Newsletter</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{article.title}</span>
        </div>

        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
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
                <span>JAKARTA</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold dark:text-gray-300">By {article.author}</p>
            </div>
          </div>
        </header>

        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Indonesia's strategic position in the global mineral supply chain has evolved from a mere commodity exporter to a pivotal player in the clean energy transition. With the world's largest nickel reserves and significant deposits of copper and rare earth elements, the archipelago nation is leveraging its geological wealth to reshape global supply dynamics and domestic industrial policy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Nickel Reserves</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">21M tons</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">World's largest reserve</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Market Share</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">37%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Global nickel supply</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Export Growth</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">↑ 28%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">YoY mineral exports</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Supply Chain Dominance: Beyond Raw Materials</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">Indonesia's mineral strategy extends beyond mere extraction, encompassing:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Processing Capacity", text: "Investment in downstream processing has increased refined nickel production capacity to 1.4M tons annually, positioning Indonesia as a key supplier for EV battery manufacturers." },
                  { label: "Strategic Partnerships", text: "Joint ventures with global players like LG and CATL have established integrated battery supply chains, from mining to cell production." },
                  { label: "Policy Framework", text: "The mineral added-value policy (PP No. 1/2019) mandates domestic processing, effectively leveraging Indonesia's resource advantage for industrial development." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300 mb-2">
                "Indonesia's mineral strategy represents a paradigm shift in resource nationalism, effectively leveraging geological endowments for industrial transformation."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">— Dr. Sarah Chen, Global Resources Institute</p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Critical Mineral Matrix: Supply Risk Assessment</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-3">Key factors influencing Indonesia's mineral criticality include:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Supply Concentration", text: "Indonesia controls 37% of global nickel reserves and 23% of refined nickel production, creating both opportunity and responsibility in supply chain stability." },
                  { label: "Processing Bottlenecks", text: "Current HPAL capacity utilization at 65% indicates room for efficiency improvements in battery-grade nickel production." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Investment Implications: Opportunities and Risks</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Market Evolution</h3>
                  <p>Indonesia's downstream integration is reshaping global mineral markets, with implications for both producers and consumers in the EV supply chain.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Strategic Considerations</h3>
                  <p>The government's commitment to value-added processing presents opportunities in mining technology, energy infrastructure, and specialized logistics.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Risk Factors</h3>
                  <p>Investors must navigate regulatory changes, environmental compliance requirements, and potential shifts in global demand patterns.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Challenges and Future Outlook</h2>
            <div className="prose text-gray-700 dark:text-gray-300 max-w-none">
              <ul className="list-none space-y-3 pl-0">
                {[
                  { label: "Environmental Impact", text: "Increasing scrutiny of mining practices requires substantial investment in sustainable extraction methods." },
                  { label: "Technology Gaps", text: "Domestic processing capabilities need continued advancement to meet battery-grade specifications." },
                  { label: "Market Competition", text: "Other nickel-producing nations are expanding capacity, potentially affecting Indonesia's market position." }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                    <p className="mt-0"><strong>{item.label}:</strong> {item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Bottom Line</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Indonesia's mineral strategy positions it as a critical node in global supply chains, particularly for electric vehicle batteries and renewable energy infrastructure. While challenges remain in environmental sustainability and technological capability, the country's resource endowment and policy framework create compelling opportunities for strategic investment in the mineral sector.
              </p>
            </CardContent>
          </Card>
        </div>

        <footer className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 mt-8">
          <p className="mb-2">Disclosure: This analysis incorporates data from the Indonesian Ministry of Energy and Mineral Resources, Wood Mackenzie, and the International Energy Agency. The author maintains no direct investments in Indonesian mining companies.</p>
          <p>© 2025 Daily Digest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
