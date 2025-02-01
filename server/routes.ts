import type { Express } from "express";
import { createServer, type Server } from "http";
import chatRouter from "./routes/chat";
import newsRouter from "./routes/news";

export function registerRoutes(app: Express): Server {
  app.use(chatRouter);
  app.use(newsRouter);

  const httpServer = createServer(app);
  return httpServer;
}