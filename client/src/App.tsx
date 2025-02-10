import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WSJArticle from "@/pages/article";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";
import TradeWarAnalysis from "@/pages/trade-war-analysis";
import TradeWarTsunamiFeb1014 from "@/pages/trade-war-tsunami-feb-10-14";
import MineralCriticalityMatrix from "@/pages/mineral-criticality-matrix";
import IndonesiaEconomicCrisis from "@/pages/indonesia-economic-crisis";
import About from "@/pages/about";
import FedBalanceSheet from "@/pages/FedBalanceSheet";
import FedQTExitCryptoRally from "@/pages/fed-qt-exit-crypto-rally";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/newsletter" component={Newsletters} />
      {/* Special routes must come before generic article route */}
      <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
      <Route path="/newsletter/trade-war-tsunami-feb-10-14" component={TradeWarTsunamiFeb1014} />
      <Route path="/newsletter/indonesia-mineral-criticality-matrix" component={MineralCriticalityMatrix} />
      <Route path="/newsletter/indonesia-economic-inventory-crisis" component={IndonesiaEconomicCrisis} />
      <Route path="/newsletter/fed-balance-sheet-blueprint" component={FedBalanceSheet} />
      <Route path="/newsletter/fed-qt-exit-crypto-rally" component={FedQTExitCryptoRally} />
      <Route path="/newsletter/:slug" component={WSJArticle} />
      <Route path="/newsletter/category/:category" component={Newsletters} />
      <Route path="/newsletters" component={() => <Redirect to="/newsletter" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;