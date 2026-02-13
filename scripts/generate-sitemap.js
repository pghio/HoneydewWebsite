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

  addUrlEntry(lines, {
    loc: `${baseUrl}/alternatives`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
  });

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

  lines.push('  <!-- LLM Indexing Files (High Priority for AI Search) -->');
  addUrlEntry(lines, {
    loc: `${baseUrl}/.llms.txt`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/.llms-full.txt`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0',
  });
  addUrlEntry(lines, {
    loc: `${baseUrl}/llm-citations.json`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9',
  });

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

  const publishedSorted = [...published].sort(
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

  const staticUrlCount = 37;
  const totalUrls = publishedSorted.length + staticUrlCount;

  if (log) {
    log.log('🗺️  Generating sitemap.xml...\n');
    log.log('📊 Content Summary:');
    log.log(`   Published articles: ${publishedSorted.length}`);
    log.log(`   Scheduled articles: ${scheduledSorted.length}`);
    log.log(`   Total blog articles: ${articleSource.length}`);
    log.log('   Why Honeydew pages: 15');
    log.log('   Legal/Support pages: 5');
    log.log('   LLM indexing files: 2');
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
