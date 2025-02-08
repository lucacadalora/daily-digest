import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";

import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import chatRouter from "./routes/chat";
import newsletterRouter from "./routes/newsletter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware for debugging
app.use((req, res, next) => {
  const start = Date.now();
  log(`${req.method} ${req.path} - Started`);

  const originalJson = res.json;
  res.json = function(...args) {
    log(`${req.method} ${req.path} - JSON Response:`, args[0]);
    return originalJson.apply(res, args);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} - Completed in ${duration}ms`);
  });

  next();
});

// API Routes - Mount before any other middleware
const apiRouter = express.Router();
apiRouter.use('/chat', chatRouter);
apiRouter.use('/newsletter', newsletterRouter);

// Mount API routes first
app.use('/api', apiRouter);

(async () => {
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log(`[Error] ${message}`, 'error');
    res.status(status).json({ message });
  });

  // Setup Vite or static serving after API routes
  if (app.get("env") === "development") {
    log("Setting up Vite development server...");
    await setupVite(app, server);
    log("Vite development server setup complete");
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server running in ${app.get('env')} mode`);
    log(`Frontend: http://0.0.0.0:${PORT}`);
    log(`API: http://0.0.0.0:${PORT}/api`);
  });
})();