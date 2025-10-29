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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../public/blog');
const MANIFEST_PATH = path.join(__dirname, '../public/blog-manifest.json');

/**
 * Extract frontmatter from markdown file
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatterText = match[1];
  const fm = {};
  
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');
      fm[key] = value;
    }
  });
  
  return fm;
}

/**
 * Get all blog articles
 */
function getBlogArticles() {
  const articles = [];
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`Blog directory not found: ${BLOG_DIR}`);
    return articles;
  }
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => 
    f.endsWith('.md') && f !== 'CONTENT_STATUS.md'
  );
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const frontmatter = extractFrontmatter(content);
      
      if (frontmatter && frontmatter.slug && frontmatter.title) {
        articles.push({
          slug: frontmatter.slug,
          title: frontmatter.title,
          description: frontmatter.description || '',
          publishDate: frontmatter.publishDate || '',
          category: frontmatter.category || 'Article',
          featured: frontmatter.featured === 'true' || frontmatter.featured === true,
          keywords: frontmatter.keywords || '',
          author: frontmatter.author || 'Honeydew Team',
          image: frontmatter.image || '',
        });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });
  
  // Sort by date (newest first)
  articles.sort((a, b) => {
    const dateA = new Date(a.publishDate || 0);
    const dateB = new Date(b.publishDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  
  return articles;
}

/**
 * Main function
 */
function main() {
  console.log('📝 Generating blog manifest...\n');
  
  const articles = getBlogArticles();
  const published = articles.filter(a => 
    !a.publishDate || new Date(a.publishDate) <= new Date()
  );
  const scheduled = articles.filter(a => 
    a.publishDate && new Date(a.publishDate) > new Date()
  );
  
  const manifest = {
    generated: new Date().toISOString(),
    articles: articles,
    stats: {
      total: articles.length,
      published: published.length,
      scheduled: scheduled.length,
    }
  };
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  
  console.log(`📊 Blog Manifest Summary:`);
  console.log(`   Total articles: ${articles.length}`);
  console.log(`   Published: ${published.length}`);
  console.log(`   Scheduled: ${scheduled.length}`);
  console.log(`\n✅ Manifest generated: ${MANIFEST_PATH}`);
  console.log(`📍 URL: /blog-manifest.json\n`);
}

// Run
try {
  main();
} catch (error) {
  console.error('❌ Error generating manifest:', error.message);
  console.error(error.stack);
  process.exit(1);
}

