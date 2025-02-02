import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import ArticlePage from "@/pages/article";
import Home from "@/pages/home";
import Newsletters from "@/pages/newsletters";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/newsletters" component={Newsletters} />
      <Route path="/newsletter/:slug" component={ArticlePage} />
      <Route path="/newsletter/category/:category" component={Newsletters} />
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