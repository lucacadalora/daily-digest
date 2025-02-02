import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
  log(`[DEBUG] ${req.method} ${req.path}`);
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

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  // Log environment
  log(`[ENV] Running in ${app.get("env")} mode`);

  // Setup Vite in development mode first, before other routes
  if (app.get("env") === "development") {
    log("[SETUP] Setting up Vite middleware");
    await setupVite(app, server);
    log("[SETUP] Vite middleware setup complete");
  }

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