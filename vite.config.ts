import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

function resolveCamentraFaviconPath(): string | null {
  const candidates = [
    path.join(root, 'public/camentra-favicon.png'),
    path.join(root, 'dist/camentra-favicon.png'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Browsers request /favicon.ico even when <link rel="icon" href="...png"> is set.
 * A PNG file renamed to .ico is often served as wrong MIME type and Chrome may reject it,
 * then reuse an old cached icon for this origin (e.g. if Brand Alchemy ran on :3000 before).
 * This serves the Camentra PNG with Content-Type: image/png for that request.
 */
function camentraFaviconMiddleware(): Plugin {
  return {
    name: 'camentra-favicon-png',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/favicon.ico') {
          next();
          return;
        }
        const faviconPath = resolveCamentraFaviconPath();
        if (!faviconPath) {
          next();
          return;
        }
        try {
          const buf = fs.readFileSync(faviconPath);
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Cache-Control', 'no-store');
          res.end(buf);
        } catch {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/favicon.ico') {
          next();
          return;
        }
        const faviconPath = resolveCamentraFaviconPath();
        if (!faviconPath) {
          next();
          return;
        }
        try {
          const buf = fs.readFileSync(faviconPath);
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Cache-Control', 'no-store');
          res.end(buf);
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      // Different default from :3000 avoids Chrome reusing a favicon cached for that origin
      // when you previously ran another local site (e.g. Brand Alchemy) on port 3000.
      port: 3010,
      strictPort: false,
      host: '0.0.0.0',
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    preview: {
      port: 3010,
      host: '0.0.0.0',
    },
    plugins: [react(), camentraFaviconMiddleware()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(root, '.'),
      },
    },
  };
});
