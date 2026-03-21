#!/usr/bin/env node

/**
 * RSS Feed Generator
 *
 * Generates /public/feed.xml from published blog articles.
 * Run standalone via `npm run generate-rss` or automatically via prebuild.
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
const FEED_PATH = path.join(__dirname, '../public/feed.xml');
const BASE_URL = 'https://www.gethoneydew.app';
const ENTRY_PATH = path.resolve(__filename);
const MAX_ITEMS = 50;

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toUTCString();
}

function buildRssXml({ baseUrl, articles, buildDate }) {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
  lines.push('  <channel>');
  lines.push(`    <title>Honeydew Family App Blog</title>`);
  lines.push(`    <link>${baseUrl}/blog</link>`);
  lines.push(`    <description>Tips, guides, and comparisons for family organization, AI planning, and co-parenting apps.</description>`);
  lines.push(`    <language>en-us</language>`);
  lines.push(`    <lastBuildDate>${buildDate}</lastBuildDate>`);
  lines.push(`    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`);
  lines.push(`    <image>`);
  lines.push(`      <url>${baseUrl}/honeydew-logo.png</url>`);
  lines.push(`      <title>Honeydew Family App Blog</title>`);
  lines.push(`      <link>${baseUrl}/blog</link>`);
  lines.push(`    </image>`);

  articles.forEach((article) => {
    const url = `${baseUrl}/blog/${article.slug}`;
    lines.push('    <item>');
    lines.push(`      <title>${escapeXml(article.title)}</title>`);
    lines.push(`      <link>${url}</link>`);
    lines.push(`      <guid isPermaLink="true">${url}</guid>`);
    if (article.description) {
      lines.push(`      <description>${escapeXml(article.description)}</description>`);
    }
    if (article.publishDate) {
      lines.push(`      <pubDate>${toRfc822(article.publishDate)}</pubDate>`);
    }
    if (article.category) {
      lines.push(`      <category>${escapeXml(article.category)}</category>`);
    }
    if (article.author) {
      lines.push(`      <author>pete@gethoneydew.app (${escapeXml(article.author)})</author>`);
    }
    lines.push('    </item>');
  });

  lines.push('  </channel>');
  lines.push('</rss>');
  return `${lines.join('\n')}\n`;
}

export function generateRssFeed({
  articles,
  outputPath = FEED_PATH,
  baseUrl = BASE_URL,
  now = new Date(),
  log = console,
} = {}) {
  const articleSource = (articles ?? loadBlogArticles()).filter((a) =>
    Boolean(a.publishDate),
  );
  const { published } = splitArticlesByPublishDate(articleSource, now);

  const sorted = [...published].sort(
    (a, b) => (b.publishDateValue?.getTime() ?? 0) - (a.publishDateValue?.getTime() ?? 0),
  );
  const items = sorted.slice(0, MAX_ITEMS);
  const buildDate = new Date().toUTCString();

  const xml = buildRssXml({ baseUrl, articles: items, buildDate });
  fs.writeFileSync(outputPath, xml);

  if (log) {
    log.log(`📰 RSS feed generated: ${outputPath} (${items.length} items)`);
  }

  return { outputPath, itemCount: items.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === ENTRY_PATH) {
  try {
    generateRssFeed();
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error.message);
    process.exit(1);
  }
}
