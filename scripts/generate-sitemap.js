#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator
 * 
 * Scans /public/blog/*.md files and generates comprehensive sitemap.xml
 * Includes all pages, blog posts, and special LLM indexing files
 * 
 * Usage: npm run generate-sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../public/blog');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://www.gethoneydew.app';

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
 * Get all blog articles with metadata
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
      
      if (frontmatter && frontmatter.slug && frontmatter.publishDate) {
        // Parse publish date
        const publishDate = new Date(frontmatter.publishDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Include all articles (even future-dated) in sitemap
        // Google can crawl them now, they just won't appear in BlogListPage until published
        articles.push({
          slug: frontmatter.slug,
          publishDate: frontmatter.publishDate,
          title: frontmatter.title || '',
          featured: frontmatter.featured === 'true' || frontmatter.featured === true,
          isPublished: publishDate <= today
        });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });
  
  return articles;
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  if (typeof date === 'string') {
    return date; // Already in correct format
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const articles = getBlogArticles();
  const today = formatDate(new Date());
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Main pages
  xml += '  <!-- Main Pages -->\n';
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/app</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/blog</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n\n`;
  
  // Blog articles
  if (articles.length > 0) {
    // Separate published and scheduled
    const published = articles.filter(a => a.isPublished).sort((a, b) => 
      new Date(b.publishDate) - new Date(a.publishDate)
    );
    const scheduled = articles.filter(a => !a.isPublished).sort((a, b) => 
      new Date(a.publishDate) - new Date(b.publishDate)
    );
    
    // Published articles (higher priority)
    if (published.length > 0) {
      xml += '  <!-- Published Blog Articles -->\n';
      published.forEach(article => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/blog/${article.slug}</loc>\n`;
        xml += `    <lastmod>${article.publishDate}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>${article.featured ? '0.9' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
      });
      xml += '\n';
    }
    
    // Scheduled articles (lower priority initially)
    if (scheduled.length > 0) {
      xml += '  <!-- Scheduled Blog Articles (Future Dates) -->\n';
      scheduled.forEach(article => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/blog/${article.slug}</loc>\n`;
        xml += `    <lastmod>${article.publishDate}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>${article.featured ? '0.8' : '0.7'}</priority>\n`;
        xml += `  </url>\n`;
      });
      xml += '\n';
    }
  }
  
  // Why Honeydew comparison pages
  xml += '  <!-- Why Honeydew Pages -->\n';
  const comparisons = [
    'vs-skylight',
    'vs-cozi',
    'vs-timetree',
    'vs-hearth',
    'vs-familywall',
    'vs-echoshow',
    'vs-google',
    'vs-mango'
  ];
  
  comparisons.forEach(comp => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/why-honeydew/${comp}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });
  xml += '\n';
  
  // Legal & Support pages
  xml += '  <!-- Legal & Support Pages -->\n';
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/support</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.6</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/privacy</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.5</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/terms</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.5</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/cookies</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>yearly</changefreq>\n`;
  xml += `    <priority>0.4</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/security</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.5</priority>\n`;
  xml += `  </url>\n\n`;
  
  // LLM Indexing files (high priority for AI search engines)
  xml += '  <!-- LLM Indexing Files (High Priority for AI Search) -->\n';
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/.llms.txt</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;
  
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/.llms-full.txt</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;
  
  xml += '</urlset>\n';
  
  return xml;
}

/**
 * Main function
 */
function main() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  const articles = getBlogArticles();
  const published = articles.filter(a => a.isPublished);
  const scheduled = articles.filter(a => !a.isPublished);
  
  console.log(`📊 Content Summary:`);
  console.log(`   Published articles: ${published.length}`);
  console.log(`   Scheduled articles: ${scheduled.length}`);
  console.log(`   Total blog articles: ${articles.length}`);
  console.log(`   Why Honeydew pages: 8`);
  console.log(`   Legal/Support pages: 5`);
  console.log(`   LLM indexing files: 2`);
  console.log(`   ─────────────────────────────`);
  console.log(`   Total URLs in sitemap: ${articles.length + 17}\n`);
  
  const xml = generateSitemap();
  fs.writeFileSync(SITEMAP_PATH, xml);
  
  console.log(`✅ Sitemap generated: ${SITEMAP_PATH}`);
  console.log(`📍 URL: https://www.gethoneydew.app/sitemap.xml\n`);
  
  console.log('📋 Next Steps:');
  console.log('   1. Deploy updated sitemap to production');
  console.log('   2. Submit sitemap in Google Search Console:');
  console.log('      → Go to Sitemaps section');
  console.log('      → Enter "sitemap.xml"');
  console.log('      → Click Submit');
  console.log('   3. Monitor indexing progress over next 1-2 weeks\n');
  
  if (scheduled.length > 0) {
    console.log(`📅 Note: ${scheduled.length} future-dated articles included in sitemap.`);
    console.log('   Google can crawl them now, but they won\'t appear in BlogListPage');
    console.log('   until their publish date arrives.\n');
  }
}

// Run
try {
  main();
} catch (error) {
  console.error('❌ Error generating sitemap:', error.message);
  console.error(error.stack);
  process.exit(1);
}

