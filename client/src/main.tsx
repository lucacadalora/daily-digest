import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";

// Initialize theme
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Debug HMR connection
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('vite hmr update');
  });

  import.meta.hot.on('vite:error', (err) => {
    console.error('vite hmr error:', err);
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);