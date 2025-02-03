import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add chat routes
app.use(chatRouter);

// Development middleware to disable caching
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });
}

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

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    log("Setting up Vite development server...");
    await setupVite(app, server);
    log("Vite development server setup complete");
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  const PORT = 5000;
  const HOST = '0.0.0.0';

  server.listen(PORT, HOST, () => {
    log(`Server running in ${app.get('env')} mode`);
    log(`Frontend: http://${HOST}:${PORT}`);
    log(`API: http://${HOST}:${PORT}/api`);
  });
})();