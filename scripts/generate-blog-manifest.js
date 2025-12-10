#!/usr/bin/env node

/**
 * Generate Blog Manifest
 *
 * Scans /public/blog/*.md files and generates a manifest.json
 * for dynamic blog article loading without hardcoded lists
 *
 * Usage: npm run generate-blog-manifest (or called during build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  loadBlogArticles,
  splitArticlesByPublishDate,
} from './utils/blog-content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MANIFEST_PATH = path.join(__dirname, '../public/blog-manifest.json');
const ENTRY_PATH = path.resolve(__filename);

export function generateBlogManifest({
  articles,
  outputPath = MANIFEST_PATH,
  now = new Date(),
  log = console,
} = {}) {
  const sourceArticles = articles ?? loadBlogArticles();
  const { published, scheduled } = splitArticlesByPublishDate(
    sourceArticles,
    now,
  );

  const manifest = {
    generated: new Date().toISOString(),
    articles: sourceArticles,
    stats: {
      total: sourceArticles.length,
      published: published.length,
      scheduled: scheduled.length,
    },
  };

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  if (log) {
    log.log('📊 Blog Manifest Summary:');
    log.log(`   Total articles: ${sourceArticles.length}`);
    log.log(`   Published: ${published.length}`);
    log.log(`   Scheduled: ${scheduled.length}`);
    log.log(`\n✅ Manifest generated: ${outputPath}`);
    log.log('📍 URL: /blog-manifest.json\n');
  }

  return manifest;
}

function runCli() {
  try {
    console.log('📝 Generating blog manifest...\n');
    generateBlogManifest();
  } catch (error) {
    console.error('❌ Error generating manifest:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === ENTRY_PATH) {
  runCli();
}
