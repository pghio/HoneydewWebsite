#!/usr/bin/env node

/**
 * Fetches the public list catalog from the app backend at build time.
 * Falls back to a committed static snapshot if the network request fails.
 *
 * Usage:
 *   import { fetchListCatalog } from './fetch-list-catalog.js';
 *   const { lists, categories, fetchedLive } = await fetchListCatalog();
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND_URL = 'https://app.gethoneydew.app/.llms-full.txt';
const FALLBACK_PATH = path.join(__dirname, 'data', 'list-catalog-fallback.json');
const FETCH_TIMEOUT_MS = 5000;

function parseListEntry(block) {
  const title = block.match(/\*\*(.+?)\*\*/)?.[1]?.replace(/^[^\w]*/, '').trim();
  const url = block.match(/URL:\s*(https?:\/\/[^\s]+)/)?.[1];
  const description = block.match(/Description:\s*(.+)/)?.[1]?.trim();
  const items = parseInt(block.match(/Items:\s*(\d+)/)?.[1] || '0', 10);
  if (!title || !url) return null;
  const slug = url.split('/lists/')[1];
  return { title, slug, url, description: description || '', items };
}

function parseCategoryBlock(block) {
  const headerMatch = block.match(/###\s*(.+?)\s*\((\d+)\s*lists?\)/);
  if (!headerMatch) return null;
  const name = headerMatch[1].replace(/^[^\w]*/, '').trim();
  const count = parseInt(headerMatch[2], 10);
  const urlMatch = block.match(/Category URL:\s*(https?:\/\/[^\s]+)/);
  const url = urlMatch?.[1] || '';
  const slug = url.split('/category/')[1] || '';
  const descLine = block.split('\n').find(l => l.trim() && !l.startsWith('#') && !l.startsWith('Category URL') && !l.startsWith('-') && !l.match(/^\*\*/));
  return { name, slug, url, count, description: descLine?.trim() || '' };
}

function parseBackendCatalog(text) {
  const lists = [];
  const categories = [];

  const featuredMatch = text.match(/## Featured Lists.*?\n([\s\S]*?)(?=\n## )/);
  if (featuredMatch) {
    const entries = featuredMatch[1].split(/\n- \*\*/).filter(Boolean);
    for (const entry of entries) {
      const normalized = entry.startsWith('**') ? entry : `**${entry}`;
      const parsed = parseListEntry(normalized);
      if (parsed) lists.push({ ...parsed, featured: true });
    }
  }

  const categorySection = text.match(/## Categories\n([\s\S]*?)(?=\n## (?:Other|Additional))/);
  if (categorySection) {
    const catBlocks = categorySection[1].split(/\n(?=### )/).filter(Boolean);
    for (const block of catBlocks) {
      const parsed = parseCategoryBlock(block);
      if (parsed) categories.push(parsed);
    }
  }

  const otherMatch = text.match(/### 📋 Other Lists\n([\s\S]*?)(?=\n## )/);
  if (otherMatch) {
    const otherLines = otherMatch[1].split('\n').filter(l => l.startsWith('- '));
    for (const line of otherLines) {
      const titleMatch = line.match(/\*\*(.+?)\*\*/);
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
      if (titleMatch && urlMatch) {
        const slug = urlMatch[1].split('/lists/')[1];
        const existing = lists.find(l => l.slug === slug);
        if (!existing) {
          lists.push({
            title: titleMatch[1].replace(/^[^\w]*/, '').trim(),
            slug,
            url: urlMatch[1],
            description: '',
            items: 0,
            featured: false,
          });
        }
      }
    }
  }

  return { lists, categories };
}

export async function fetchListCatalog() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(BACKEND_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const { lists, categories } = parseBackendCatalog(text);

    if (lists.length === 0) throw new Error('Parsed zero lists from backend');

    console.log(`   ✓ Fetched live list catalog: ${lists.length} lists, ${categories.length} categories`);
    return { lists, categories, fetchedLive: true };
  } catch (err) {
    console.log(`   ⚠ Live fetch failed (${err.message}), using static fallback`);
    try {
      const fallback = JSON.parse(fs.readFileSync(FALLBACK_PATH, 'utf8'));
      console.log(`   ✓ Static fallback loaded: ${fallback.lists.length} lists, ${fallback.categories.length} categories`);
      return { ...fallback, fetchedLive: false };
    } catch {
      console.log('   ⚠ No fallback available, returning empty catalog');
      return { lists: [], categories: [], fetchedLive: false };
    }
  }
}

/**
 * Refresh the static fallback file from the live backend.
 * Run: node scripts/fetch-list-catalog.js --refresh
 */
async function main() {
  const { lists, categories, fetchedLive } = await fetchListCatalog();
  if (process.argv.includes('--refresh') && fetchedLive && lists.length > 0) {
    const data = { lists, categories, generatedAt: new Date().toISOString() };
    fs.writeFileSync(FALLBACK_PATH, JSON.stringify(data, null, 2));
    console.log(`\n✅ Fallback refreshed: ${FALLBACK_PATH}`);
  } else if (process.argv.includes('--refresh')) {
    console.log('\n❌ Cannot refresh fallback: live fetch returned no data');
  }
}

if (process.argv[1] && process.argv[1].endsWith('fetch-list-catalog.js')) {
  main();
}
