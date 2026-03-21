#!/usr/bin/env node

/**
 * OG Image Generator
 *
 * Generates unique 1200x630 PNG Open Graph images for each blog article.
 * Uses sharp to render branded SVGs to PNG at build time.
 *
 * Usage: npm run generate-og-images (or called during prebuild)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import {
  loadBlogArticles,
  splitArticlesByPublishDate,
} from './utils/blog-content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OG_DIR = path.join(__dirname, '../public/og');
const ENTRY_PATH = path.resolve(__filename);

const WIDTH = 1200;
const HEIGHT = 630;

const CATEGORY_COLORS = {
  Comparison: { accent: '#f59e0b', bg2: '#451a03' },
  Guide: { accent: '#10b981', bg2: '#022c22' },
  Tutorial: { accent: '#6366f1', bg2: '#1e1b4b' },
  Review: { accent: '#ec4899', bg2: '#500724' },
  Article: { accent: '#06b6d4', bg2: '#083344' },
  'Best Of': { accent: '#f97316', bg2: '#431407' },
};

function wrapText(text, maxCharsPerLine = 32) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCharsPerLine && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.slice(0, 4);
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSvg(title, category, publishDate) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Article;
  const lines = wrapText(title);
  const lineHeight = 58;
  const startY = Math.max(180, 300 - (lines.length * lineHeight) / 2);

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="80" y="${startY + i * lineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="46" font-weight="700" fill="white">${escapeXml(line)}</text>`,
    )
    .join('\n    ');

  const dateStr = publishDate
    ? new Date(publishDate + 'T00:00:00Z').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : '';

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="${colors.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="${HEIGHT}" fill="${colors.accent}"/>
  <rect x="0" y="${HEIGHT - 80}" width="${WIDTH}" height="80" fill="rgba(0,0,0,0.3)"/>

  <!-- Category pill -->
  <rect x="80" y="${startY - 80}" width="${category.length * 14 + 32}" height="36" rx="18" fill="${colors.accent}" opacity="0.9"/>
  <text x="${80 + (category.length * 14 + 32) / 2}" y="${startY - 56}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle">${escapeXml(category)}</text>

  <!-- Title -->
  ${titleLines}

  <!-- Footer -->
  <text x="80" y="${HEIGHT - 36}" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="${colors.accent}">🍈 Honeydew</text>
  <text x="${WIDTH - 80}" y="${HEIGHT - 36}" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="rgba(255,255,255,0.6)" text-anchor="end">${escapeXml(dateStr)}</text>
  <text x="${WIDTH - 80}" y="${HEIGHT - 60}" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="rgba(255,255,255,0.4)" text-anchor="end">gethoneydew.app</text>
</svg>`;
}

export async function generateOgImages({
  articles,
  outputDir = OG_DIR,
  now = new Date(),
  log = console,
  force = false,
} = {}) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const articleSource = (articles ?? loadBlogArticles()).filter((a) =>
    Boolean(a.publishDate && a.slug),
  );
  const { published } = splitArticlesByPublishDate(articleSource, now);

  let generated = 0;
  let skipped = 0;

  for (const article of published) {
    const outPath = path.join(outputDir, `${article.slug}.png`);

    if (!force && fs.existsSync(outPath)) {
      skipped++;
      continue;
    }

    const svg = buildSvg(
      article.title,
      article.category || 'Article',
      article.publishDate,
    );

    await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outPath);
    generated++;
  }

  if (log) {
    log.log(
      `🖼️  OG images: ${generated} generated, ${skipped} cached (${published.length} total published)`,
    );
  }

  return { generated, skipped, total: published.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === ENTRY_PATH) {
  const force = process.argv.includes('--force');
  generateOgImages({ force }).catch((err) => {
    console.error('❌ Error generating OG images:', err.message);
    process.exit(1);
  });
}
