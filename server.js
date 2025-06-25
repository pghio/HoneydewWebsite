#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting Honeydew Marketing Website...');

const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '3000'], {
  cwd: __dirname,
  stdio: 'inherit'
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  vite.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  vite.kill();
  process.exit(0);
});