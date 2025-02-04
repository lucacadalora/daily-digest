import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useDevRefresh } from "@/hooks/use-dev-refresh";
import NotFound from "@/pages/not-found";
import WSJArticle from "@/pages/article";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";
import TradeWarAnalysis from "@/pages/trade-war-analysis";
import MineralCriticalityMatrix from "@/pages/mineral-critically-matix";

function Router() {
  // Add development refresh hook
  useDevRefresh();

  // Force re-render on development changes
  if (import.meta.env.DEV) {
    const key = Date.now(); // Force re-render on each development change
    console.log('Development build refreshed:', key);
    return (
      <div key={key}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/newsletter" component={Newsletters} />
          {/* Trade War Analysis and Mineral Matrix routes must come before generic article route */}
          <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
          <Route path="/newsletter/indonesia-mineral-criticality-matrix" component={MineralCriticalityMatrix} />
          <Route path="/newsletter/:slug" component={WSJArticle} />
          <Route path="/newsletter/category/:category" component={Newsletters} />
          <Route path="/newsletters" component={() => <Redirect to="/newsletter" />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/newsletter" component={Newsletters} />
      {/* Trade War Analysis and Mineral Matrix routes must come before generic article route */}
      <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
      <Route path="/newsletter/indonesia-mineral-criticality-matrix" component={MineralCriticalityMatrix} />
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