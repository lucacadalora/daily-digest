import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Assuming this import is correct

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
  import.meta.hot.accept(render); //This line is crucial to fix the HMR
}