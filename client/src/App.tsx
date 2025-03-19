import React from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import GlobalOGImage from "@/components/SEO/GlobalOGImage";
import NotFound from "@/pages/not-found";
import BBRIArticle from "@/pages/bank-rakyat-indonesia";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";
import Latest from "@/pages/latest";
import TradeWarAnalysis from "@/pages/trade-war-analysis";
import TradeWarTsunamiFeb1014 from "@/pages/trade-war-tsunami-feb-10-14";
import IHSGOutlookMarch37 from "@/pages/ihsg-outlook-march-3-7";
import MineralCriticalityMatrix from "@/pages/mineral-criticality-matrix";
import IndonesiaEconomicCrisis from "@/pages/indonesia-economic-crisis";
import SavingUSD50Billion from "@/pages/saving-usd-50-billion-pp-no-8-2025";
import IndonesiaEconomicTightrope from "@/pages/indonesia-economic-tightrope-export-rules";
import About from "@/pages/about";
import FedBalanceSheet from "@/pages/FedBalanceSheet";
import FedQTExitCryptoRally from "@/pages/fed-qt-exit-crypto-rally";
import IndonesiaCoalDilemma from "@/pages/indonesia-coal-dilemma";
import JapanEconomicSecurity from "@/pages/japan-economic-security";
import ChinaSteel from "@/pages/external/china-steel-supply-reform";
import ChinaSteelReform from "@/pages/latest/china-steel-reform";
import GlobalCoalPriceSlump from "@/pages/latest/global-coal-price-slump";
import IndonesiaREEPotential from "@/pages/newsletter/indonesia-ree-potential";

// Insights pages
import Insights from "@/pages/insights";
import BUMNLawComparison from "@/pages/insights/bumn-law-comparison";
import JFKDeclassifiedFiles from "@/pages/insights/jfk-declassified-files";

// Data section pages
import DataIndex from "@/pages/data/index";
import DataExplorer from "@/pages/data/explorer";
import DataMethodology from "@/pages/data/methodology";
import DataDocuments from "@/pages/data/documents";
import LawIndex from "@/pages/data/law/index";
import LawDetail from "@/pages/data/law/[slug]";
import ResearchIndex from "@/pages/data/research-index";
import ResearchDetail from "@/pages/data/research-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      
      {/* Latest news routes */}
      <Route path="/latest" component={Latest} />
      <Route path="/latest/global-coal-price-slump" component={GlobalCoalPriceSlump} />
      <Route path="/latest/china-steel-reform" component={ChinaSteelReform} />
      <Route path="/external/china-steel-supply-reform" component={ChinaSteel} />
      
      {/* Insights routes */}
      <Route path="/insights" component={Insights} />
      <Route path="/insights/bumn-law-comparison" component={BUMNLawComparison} />
      <Route path="/insights/jfk-declassified-files" component={JFKDeclassifiedFiles} />
      
      {/* Data section routes */}
      <Route path="/data" component={DataIndex} />
      <Route path="/data/explorer" component={DataExplorer} />
      <Route path="/data/methodology" component={DataMethodology} />
      <Route path="/data/documents" component={DataDocuments} />
      <Route path="/data/law" component={LawIndex} />
      <Route path="/data/law/:slug" component={LawDetail} />
      <Route path="/data/research-index" component={ResearchIndex} />
      <Route path="/data/research-detail/:slug" component={ResearchDetail} />
      
      {/* Newsletter routes */}
      <Route path="/newsletter" component={Newsletters} />
      {/* Special routes must come before generic article route */}
      <Route path="/newsletter/japan-economic-security-indonesia-minerals" component={JapanEconomicSecurity} />
      <Route path="/japan-economic-security" component={JapanEconomicSecurity} />
      <Route path="/newsletter/indonesia-coal-dilemma" component={IndonesiaCoalDilemma} />
      <Route path="/newsletter/bank-rakyat-indonesia-undervalued-dividend-powerhouse" component={BBRIArticle} />
      <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
      <Route path="/newsletter/trade-war-tsunami-feb-10-14" component={TradeWarTsunamiFeb1014} />
      <Route path="/trade-war-tsunami-feb-10-14" component={TradeWarTsunamiFeb1014} />
      <Route path="/newsletter/ihsg-outlook-march-3-7" component={IHSGOutlookMarch37} />
      <Route path="/ihsg-outlook-march-3-7" component={IHSGOutlookMarch37} />
      <Route path="/newsletter/indonesia-mineral-criticality-matrix" component={MineralCriticalityMatrix} />
      <Route path="/newsletter/indonesia-economic-inventory-crisis" component={IndonesiaEconomicCrisis} />
      <Route path="/indonesia-economic-crisis" component={IndonesiaEconomicCrisis} />
      <Route path="/newsletter/saving-usd-50-billion-pp-no-8-2025" component={SavingUSD50Billion} />
      <Route path="/newsletter/indonesia-economic-tightrope-export-rules" component={IndonesiaEconomicTightrope} />
      <Route path="/indonesia-economic-tightrope-export-rules" component={IndonesiaEconomicTightrope} />
      <Route path="/newsletter/fed-balance-sheet-blueprint" component={FedBalanceSheet} />
      <Route path="/fed-balance-sheet" component={FedBalanceSheet} />
      <Route path="/newsletter/fed-qt-exit-crypto-rally" component={FedQTExitCryptoRally} />
      <Route path="/newsletter/indonesia-ree-potential" component={IndonesiaREEPotential} />
      <Route path="/newsletter/jfk-declassified-files" component={JFKDeclassifiedFiles} />
      <Route path="/newsletter/category/:category" component={Newsletters} />
      <Route path="/newsletters" component={() => <Redirect to="/newsletter" />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        {/* Global OG Image for social media sharing */}
        <GlobalOGImage />
        <Router />
        <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;