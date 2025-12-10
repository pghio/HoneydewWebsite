#!/usr/bin/env node

/**
 * Prebuild script
 *
 * Generates all derived blog assets (manifest + sitemap) in a single pass
 * to reduce duplicated disk IO during production builds.
 */

import { loadBlogArticles } from './utils/blog-content.js';
import { generateBlogManifest } from './generate-blog-manifest.js';
import { generateSitemapFile } from './generate-sitemap.js';

async function main() {
  console.log('⚙️  Prebuild: indexing blog content...');
  const articles = loadBlogArticles();

  console.log(`📄 Articles discovered: ${articles.length}`);

  generateBlogManifest({ articles });
  generateSitemapFile({ articles });

  console.log('✅ Prebuild assets refreshed.');
}

main().catch((error) => {
  console.error('❌ Prebuild failed:', error);
  process.exit(1);
});
