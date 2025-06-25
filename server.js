#!/usr/bin/env node

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  
  try {
    // Create Vite server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: __dirname
    });
    
    // Use vite's connect instance as middleware
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
    
    const port = 3000;
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`🍯 Honeydew Marketing Website running at:`);
      console.log(`   Local:   http://localhost:${port}/`);
      console.log(`   Network: http://0.0.0.0:${port}/`);
    });
    
    // Keep process alive
    process.on('SIGTERM', () => {
      console.log('Shutting down gracefully...');
      server.close(() => {
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

createServer();