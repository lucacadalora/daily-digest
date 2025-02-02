import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
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

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, serve the index.html for client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/public/index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;

  // Fixed the TypeScript error by using a number for the port
  server.listen(PORT, () => {
    log(`serving on port ${PORT}`);
  }).on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      console.error('Port 5000 is in use, trying 5001...');
      server.listen(5001);
    } else {
      console.error(e);
    }
  });
})();