import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Initialize theme
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Force refresh in development mode
if (import.meta.env.DEV) {
  const hot = (import.meta as any).hot;
  if (hot) {
    hot.accept();
  }
}

// Add timestamp to force refresh on development
if (import.meta.env.DEV) {
  const stamp = Date.now();
  const linkEls = document.getElementsByTagName('link');
  const scriptEls = document.getElementsByTagName('script');

  for (const el of [...linkEls, ...scriptEls]) {
    const url = el.getAttribute('href') || el.getAttribute('src');
    if (url) {
      el.setAttribute(url.includes('?') ? 'href' : 'src', `${url}?t=${stamp}`);
    }
  }
}

const root = createRoot(document.getElementById("root")!);

const render = () => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </StrictMode>
  );
};

render();

if (import.meta.hot) {
  import.meta.hot.accept(render);
}