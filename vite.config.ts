import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

type Next = (err?: unknown) => void;

const knownPages = ['/', '/index.html', '/team.html', '/polaris.html', '/404.html'];
const imageExtensions = ['.avif', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webp'];
const imageCacheControl = 'public, max-age=259200';

function isImageRequest(req: IncomingMessage): boolean {
  const urlPath = requestPath(req).toLowerCase();
  return imageExtensions.some((extension) => urlPath.endsWith(extension));
}

function imageCacheHeaders(): Plugin {
  return {
    name: 'image-cache-headers',
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: Next) => {
        if (isImageRequest(req)) {
          res.setHeader('Cache-Control', imageCacheControl);
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: Next) => {
        if (isImageRequest(req)) {
          res.setHeader('Cache-Control', imageCacheControl);
        }
        next();
      });
    },
  };
}

function isHtmlNavigation(req: IncomingMessage): boolean {
  return req.method === 'GET' && (req.headers.accept ?? '').includes('text/html');
}

function requestPath(req: IncomingMessage): string {
  try {
    return decodeURIComponent((req.url ?? '/').split('?')[0]);
  } catch {
    return '/';
  }
}

function mpa404Fallback(): Plugin {
  return {
    name: 'mpa-404-fallback',
    configureServer(server) {
      const { root, publicDir } = server.config;
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: Next) => {
        if (!isHtmlNavigation(req)) { next(); return; }
        const urlPath = requestPath(req);
        if (knownPages.includes(urlPath)) { next(); return; }
        if (publicDir && fs.existsSync(path.join(publicDir, urlPath))) { next(); return; }
        const source = path.join(root, '404.html');
        if (!fs.existsSync(source)) { next(); return; }
        const html = fs.readFileSync(source, 'utf-8');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(await server.transformIndexHtml('/404.html', html));
      });
    },
    configurePreviewServer(server) {
      const { root, build } = server.config;
      const outDir = path.resolve(root, build.outDir);
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: Next) => {
        if (!isHtmlNavigation(req)) return next();
        const urlPath = requestPath(req);
        if (knownPages.includes(urlPath)) return next();
        if (fs.existsSync(path.join(outDir, urlPath))) { next(); return; }
        const file = path.join(outDir, '404.html');
        if (!fs.existsSync(file)) { next(); return; }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync(file, 'utf-8'));
      });
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), mpa404Fallback(), imageCacheHeaders()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        team: fileURLToPath(new URL('./team.html', import.meta.url)),
        polaris: fileURLToPath(new URL('./polaris.html', import.meta.url)),
        notfound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
});
