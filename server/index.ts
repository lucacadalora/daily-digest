import 'dotenv/config';

import path from "path";

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client directory in development
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '../client')));
}

// Add chat routes
app.use(chatRouter);

// Development middleware to disable caching and add debug logging
app.use((req, res, next) => {
  // Force no caching in all environments
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '-1');
  res.setHeader('Surrogate-Control', 'no-store');

  // Debug logging for file requests
  if (process.env.NODE_ENV === 'development' && (req.url.includes('.') || req.url.includes('assets'))) {
    log(`[Debug] File request: ${req.url}`, 'dev-server');
  }

  next();
});


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

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log(`[Error] ${message}`, 'error');
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    log("Setting up Vite development server...");
    await setupVite(app, server);
    log("Vite development server setup complete");
  } else {
    serveStatic(app);
  }

  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || '0.0.0.0';

  server.listen(PORT, HOST, () => {
    log(`Server running in ${app.get('env')} mode`);
    log(`Frontend: http://${HOST}:${PORT}`);
    log(`API: http://${HOST}:${PORT}/api`);

    // Log environment details in development
    if (app.get("env") === "development") {
      log(`Debug mode enabled - file changes will be logged`);
      log(`Cache headers: disabled`);
      log(`HMR: enabled`);
    }
  });
})();