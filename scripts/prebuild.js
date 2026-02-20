#!/usr/bin/env node

/**
 * Prebuild script
 *
 * Generates all derived blog assets (manifest + sitemap + LLM context) in a
 * single pass, then injects blog-to-list cross-links.
 */

import { execSync } from 'child_process';
import { loadBlogArticles } from './utils/blog-content.js';
import { generateBlogManifest } from './generate-blog-manifest.js';
import { generateSitemapFile } from './generate-sitemap.js';
import { generateLlmAssets } from './generate-llm-assets.js';

async function main() {
  console.log('⚙️  Prebuild: indexing blog content...');
  const articles = loadBlogArticles();

  console.log(`📄 Articles discovered: ${articles.length}`);

  generateBlogManifest({ articles });
  generateSitemapFile({ articles });
  await generateLlmAssets({ articles });

  console.log('\n🔗 Injecting blog-to-list cross-links...');
  try {
    execSync('node scripts/inject-blog-list-crosslinks.cjs', { stdio: 'inherit' });
  } catch {
    console.log('   ⚠ Cross-link injection skipped (script not found or failed)');
  }

  console.log('✅ Prebuild assets refreshed.');
}

main().catch((error) => {
  console.error('❌ Prebuild failed:', error);
  process.exit(1);
});
