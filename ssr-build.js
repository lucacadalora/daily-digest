
import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildAll() {
  // Build client
  console.log('Building client...');
  await build({
    configFile: './vite.config.ts',
    root: path.resolve(__dirname, 'client'),
    build: {
      outDir: path.resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
    }
  });

  // Build server
  console.log('Building server...');
  await build({
    configFile: './vite.config.ts',
    root: path.resolve(__dirname, 'client'),
    build: {
      outDir: path.resolve(__dirname, 'dist/server'),
      ssr: 'src/entry-server.tsx',
      emptyOutDir: true,
    }
  });

  console.log('Build complete');
}

buildAll();
