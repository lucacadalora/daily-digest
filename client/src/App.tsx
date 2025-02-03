import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useDevRefresh } from "@/hooks/use-dev-refresh";
import NotFound from "@/pages/not-found";
import WSJArticle from "@/pages/article";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";
import DevTools from "@/pages/dev-tools";
import TradeWarAnalysis from "@/pages/trade-war-analysis";

function Router() {
  // Add development refresh hook
  useDevRefresh();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/newsletter" component={Newsletters} />
      {/* Trade War Analysis route must come before generic article route */}
      <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
      <Route path="/newsletter/:slug" component={WSJArticle} />
      <Route path="/newsletter/category/:category" component={Newsletters} />
      <Route path="/newsletters" component={() => <Redirect to="/newsletter" />} />
      <Route path="/dev-tools" component={DevTools} />
      <Route path="/devtools" component={() => <Redirect to="/dev-tools" />} />
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