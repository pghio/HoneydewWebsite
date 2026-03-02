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
import {
  loadBlogArticles,
  splitArticlesByPublishDate,
} from './utils/blog-content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://www.gethoneydew.app';
const ENTRY_PATH = path.resolve(__filename);

const COMPARISON_SLUGS = [
  'vs-skylight',
  'vs-cozi',
  'vs-timetree',
  'vs-hearth',
  'vs-familywall',
  'vs-echoshow',
  'vs-google',
  'vs-mango',
  'vs-dakboard',
  'vs-ourfamilywizard',
  'vs-2houses',
  'vs-fantastical',
  'vs-picniic',
  'vs-appclose',
  'vs-magicmirror',
];

// Blog slugs that are redirect sources - exclude from sitemap since they 301 redirect
// These are defined in vercel.json and should not appear in sitemap
const REDIRECT_SOURCE_SLUGS = new Set([
  'best-voice-controlled-family-organization-apps-2025',
  'best-apps-multi-family-coordination-2025',
  'honeydew-vs-maple-comparison',
  'honeydew-vs-cozi-comparison-2025',
  'best-family-organization-apps-2025',
  'honeydew-vs-timetree-comparison',
  'honeydew-vs-skylight-calendar',
  'honeydew-vs-ourfamilywizard-comparison-2025',
  'honeydew-vs-talking-parents-comparison-2025',
  'best-ai-calendar-apps-for-families-2025',
  'best-family-apps-divorced-parents-2025',
  'cozi-gold-price-2025-is-it-worth-29-99-year-honest-review',
]);

function formatDate(date) {
  if (typeof date === 'string') {
    return date;
  }
  const normalized = new Date(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, '0');
  const day = String(normalized.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addUrlEntry(lines, { loc, lastmod, changefreq, priority }) {
  lines.push('  <url>');
  lines.push(`    <loc>${loc}</loc>`);
  if (lastmod) {
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
  }
  if (changefreq) {
    lines.push(`    <changefreq>${changefreq}</changefreq>`);
  }
  if (priority) {
    lines.push(`    <priority>${priority}</priority>`);
  }
  lines.push('  </url>');
}

function buildSitemapXml({ baseUrl, publishedArticles, today }) {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  addUrlEntry(lines, {
    loc: `${baseUrl}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/app`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/blog`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.9',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/compare`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
  });

  // NOTE: /alternatives removed - it 301 redirects to /compare

  addUrlEntry(lines, {
    loc: `${baseUrl}/disambiguation`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/about`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/press`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/whats-new`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7',
  });

  addUrlEntry(lines, {
    loc: `${baseUrl}/hubs`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7',
  });

  [
    'skylight-alternatives',
    'fair-play',
    'co-parenting',
    'ai-family-planner',
  ].forEach((slug) => {
    addUrlEntry(lines, {
      loc: `${baseUrl}/hubs/${slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7',
    });
  });

  if (publishedArticles.length > 0) {
    lines.push('  <!-- Published Blog Articles -->');
    publishedArticles.forEach((article) => {
      addUrlEntry(lines, {
        loc: `${baseUrl}/blog/${article.slug}`,
        lastmod: article.publishDate,
        changefreq: 'monthly',
        priority: article.featured ? '0.9' : '0.8',
      });
    });
  }

  lines.push('  <!-- Why Honeydew Pages -->');
  COMPARISON_SLUGS.forEach((slug) => {
    addUrlEntry(lines, {
      loc: `${baseUrl}/why-honeydew/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  lines.push('  <!-- Legal & Support Pages -->');
  addUrlEntry(lines, {
    loc: `${baseUrl}/support`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/privacy`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/terms`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/cookies`,
    lastmod: today,
    changefreq: 'yearly',
    priority: '0.4',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/security`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5',
  });

  // NOTE: LLM files (.llms.txt, .llms-full.txt, llm-citations.json) excluded from sitemap
  // because they are non-HTML files that cause soft 404s in Google Search Console.
  // These files are still accessible for LLM crawlers via robots.txt comments.

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

export function generateSitemapFile({
  articles,
  outputPath = SITEMAP_PATH,
  baseUrl = BASE_URL,
  now = new Date(),
  log = console,
} = {}) {
  const articleSource = (articles ?? loadBlogArticles()).filter((article) =>
    Boolean(article.publishDate),
  );
  const { published, scheduled } = splitArticlesByPublishDate(articleSource, now);
  const today = formatDate(now);

  // Filter out redirect source slugs - these 301 redirect and shouldn't be in sitemap
  const publishedFiltered = published.filter(
    (article) => !REDIRECT_SOURCE_SLUGS.has(article.slug)
  );
  
  const publishedSorted = [...publishedFiltered].sort(
    (a, b) => (b.publishDateValue?.getTime() ?? 0) - (a.publishDateValue?.getTime() ?? 0),
  );
  const scheduledSorted = [...scheduled].sort(
    (a, b) => (a.publishDateValue?.getTime() ?? 0) - (b.publishDateValue?.getTime() ?? 0),
  );

  const xml = buildSitemapXml({
    baseUrl,
    publishedArticles: publishedSorted,
    today,
  });

  fs.writeFileSync(outputPath, xml);

  const staticUrlCount = 33; // Removed /alternatives (redirects) and LLM files (cause soft 404s)
  const totalUrls = publishedSorted.length + staticUrlCount;

  const redirectsFiltered = published.length - publishedFiltered.length;
  
  if (log) {
    log.log('🗺️  Generating sitemap.xml...\n');
    log.log('📊 Content Summary:');
    log.log(`   Published articles: ${publishedSorted.length}${redirectsFiltered > 0 ? ` (${redirectsFiltered} redirect sources excluded)` : ''}`);
    log.log(`   Scheduled articles: ${scheduledSorted.length}`);
    log.log(`   Total blog articles: ${articleSource.length}`);
    log.log('   Why Honeydew pages: 15');
    log.log('   Legal/Support pages: 5');
    log.log('   ─────────────────────────────');
    log.log(`   Total URLs in sitemap: ${totalUrls}\n`);
    log.log(`✅ Sitemap generated: ${outputPath}`);
    log.log('📍 URL: https://www.gethoneydew.app/sitemap.xml\n');
    log.log('📋 Next Steps:');
    log.log('   1. Deploy updated sitemap to production');
    log.log('   2. Submit sitemap in Google Search Console:');
    log.log('      → Go to Sitemaps section');
    log.log('      → Enter "sitemap.xml"');
    log.log('      → Click Submit');
    log.log('   3. Monitor indexing progress over next 1-2 weeks\n');
    if (scheduledSorted.length > 0) {
      log.log(
        `📅 Note: ${scheduledSorted.length} future-dated articles excluded from sitemap until publish date.\n`,
      );
    }
  }

  return { outputPath, totalUrls };
}

function runCli() {
  try {
    generateSitemapFile();
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === ENTRY_PATH) {
  runCli();
}
