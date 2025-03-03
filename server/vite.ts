import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    allowedHosts: true,
    hmr: { server },
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Get template
      const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Apply Vite transforms
      template = await vite.transformIndexHtml(url, template);
      
      // Load the server entry module
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      
      // Render the app
      const { html, dehydratedState } = render();
      
      // Inject the rendered app and state into the template
      const finalHtml = template
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace(
          '<script type="module" src="/src/main.tsx"></script>',
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(dehydratedState).replace(/</g, '\\u003c')}</script>
           <script type="module" src="/src/entry-client.tsx"></script>`
        );
      
      res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      console.error(`SSR Error:`, e);
      
      // Fallback to client-side rendering
      const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  const serverDistPath = path.resolve(__dirname, "..", "dist", "server");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets
  app.use(express.static(distPath));

  // SSR handling for all other routes
  app.use("*", async (req, res) => {
    try {
      // In production, we'll use the built SSR bundle
      const { render } = await import('../dist/server/entry-server.js');
      
      // Get the template
      const template = await fs.promises.readFile(
        path.resolve(distPath, "index.html"),
        "utf-8"
      );
      
      // Render the app
      const { html, dehydratedState } = render();
      
      // Inject the rendered app into the template
      const finalHtml = template
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace(
          '<script type="module" src="/assets/entry-client',
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(dehydratedState).replace(/</g, '\\u003c')}</script>
           <script type="module" src="/assets/entry-client`
        );
      
      res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
    } catch (error) {
      console.error('Error during SSR:', error);
      // Fallback to static HTML if SSR fails
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}