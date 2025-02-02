import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

(async () => {
  const server = registerRoutes(app);

  // Set environment
  const isDev = app.get("env") === "development";
  log(`[ENV] Running in ${isDev ? 'development' : 'production'} mode`);

  // Setup Vite first in development mode
  if (isDev) {
    try {
      log("[SETUP] Setting up Vite middleware");
      await setupVite(app, server);
      log("[SETUP] Vite middleware setup complete");
    } catch (error) {
      log(`[ERROR] Failed to setup Vite middleware: ${error}`);
      process.exit(1);
    }
  }

  // Debug middleware to log all requests
  app.use((req, res, next) => {
    // Skip logging HMR requests
    if (!req.url.includes('/@vite/client') && !req.url.includes('hmr')) {
      log(`[DEBUG] ${req.method} ${req.path}`);
    }
    next();
  });

  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // In production, serve static files from the dist/public directory
  if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../dist/public');
    app.use(express.static(clientDistPath));
  }

  // Add chat routes
  app.use(chatRouter);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log(`[ERROR] ${message}`);
    res.status(status).json({ message });
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, "0.0.0.0", () => {
    log(`[SERVER] Serving on port ${PORT}`);
  }).on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      log('[ERROR] Port 5000 is in use, trying 5001...');
      server.listen(5001, "0.0.0.0");
    } else {
      console.error(e);
    }
  });
})();