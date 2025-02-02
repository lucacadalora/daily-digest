import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WSJArticle from "@/pages/article";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";
import DevTools from "@/pages/dev-tools";
import TradeWarAnalysis from "@/pages/trade-war-analysis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/newsletter" component={Newsletters} />
      {/* Special route for Trade War Analysis */}
      <Route path="/newsletter/us-china-trade-war-impact-ihsg" component={TradeWarAnalysis} />
      {/* Generic article route for other articles */}
      <Route path="/newsletter/:slug" component={WSJArticle} />
      <Route path="/newsletter/category/:category" component={Newsletters} />
      {/* Add redirect for /newsletters to /newsletter for backward compatibility */}
      <Route path="/newsletters" component={Newsletters} />
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