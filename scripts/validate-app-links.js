#!/usr/bin/env node

/**
 * Validate App Store Links
 *
 * Scans published and scheduled blog articles for:
 * - Presence of the canonical iOS App Store URL
 * - Absence of stale/legacy App Store IDs
 * - Consistent link formatting
 *
 * Usage: node scripts/validate-app-links.js [--fix-stale]
 *
 * Exit code 0 = all clear, 1 = issues found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, 'website-manager-agent-config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

const CANONICAL_URL = config.appLinks.ios;
const STALE_IDS = config.blogChecks.staleAppStoreIds || ['id1546892037', 'id6475768439'];
const HIGH_PRIORITY_CATEGORIES = config.blogChecks.appStoreLinkHighPriorityCategories || [];

const DIRS = [
  path.join(__dirname, '../public/blog'),
  path.join(__dirname, '../blog/scheduled'),
];

const SRC_FILES = [
  'src/components/Hero.tsx',
  'src/components/CallToAction.tsx',
  'src/components/Footer.tsx',
  'src/components/ChatWidget.tsx',
  'src/pages/BlogPostPage.tsx',
  'src/pages/WhyHoneydewPage.tsx',
  'src/pages/ComparisonsHubPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/LlmReferencePage.tsx',
  'index.html',
].map(f => path.join(__dirname, '..', f));

const fixStale = process.argv.includes('--fix-stale');

let staleCount = 0;
let missingCount = 0;
let highPriorityMissing = 0;
let totalArticles = 0;
let withLink = 0;

function extractCategory(content) {
  const m = content.match(/^category:\s*["']?([^"'\n]+)/m);
  return m ? m[1].trim() : '';
}

function scanMarkdownDirs() {
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      totalArticles++;
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      const category = extractCategory(content);
      const isHighPriority = HIGH_PRIORITY_CATEGORIES.some(
        c => category.toLowerCase().includes(c.toLowerCase())
      );
      let dirty = false;

      for (const id of STALE_IDS) {
        if (content.includes(id)) {
          staleCount++;
          console.log(`  STALE  ${path.relative(process.cwd(), filePath)} contains legacy ${id}`);
          if (fixStale) {
            content = content.replace(new RegExp(id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 'id6752225362');
            content = content.replace(/honeydew-family-organizer/g, 'honeydew-family-calendar');
            dirty = true;
          }
        }
      }

      if (content.includes(CANONICAL_URL) || content.includes('id6752225362')) {
        withLink++;
      } else {
        missingCount++;
        const severity = isHighPriority ? 'HIGH' : 'WARN';
        if (isHighPriority) highPriorityMissing++;
        console.log(`  ${severity}  ${path.relative(process.cwd(), filePath)} missing App Store link`);
      }

      if (dirty) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  FIXED  ${path.relative(process.cwd(), filePath)}`);
      }
    }
  }
}

function scanSrcFiles() {
  for (const filePath of SRC_FILES) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');

    for (const id of STALE_IDS) {
      if (content.includes(id)) {
        staleCount++;
        console.log(`  STALE  ${path.relative(process.cwd(), filePath)} contains legacy ${id}`);
      }
    }
  }
}

console.log('App Store Link Validation\n');
console.log(`Canonical: ${CANONICAL_URL}`);
console.log(`Stale IDs: ${STALE_IDS.join(', ')}\n`);

scanMarkdownDirs();
scanSrcFiles();

console.log('\n--- Summary ---');
console.log(`Articles scanned:   ${totalArticles}`);
console.log(`With App Store link: ${withLink}`);
console.log(`Missing link:        ${missingCount} (${highPriorityMissing} high-priority)`);
console.log(`Stale IDs found:     ${staleCount}`);

if (fixStale && staleCount > 0) {
  console.log('\nStale IDs were replaced with the canonical URL (--fix-stale mode).');
}

if (staleCount > 0 || highPriorityMissing > 0) {
  process.exit(1);
}

console.log('\nAll clear.');
