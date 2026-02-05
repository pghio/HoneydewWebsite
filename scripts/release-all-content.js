#!/usr/bin/env node

/**
 * Release All Content
 * 
 * Sets all future-dated articles to today's date, making them immediately published.
 * Updates both /blog/scheduled/ and /public/blog/ directories.
 * 
 * Usage: node scripts/release-all-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEDULED_DIR = path.join(__dirname, '../blog/scheduled');
const PUBLIC_DIR = path.join(__dirname, '../public/blog');

// Today's date in YYYY-MM-DD format
const TODAY = new Date().toISOString().split('T')[0];

console.log('🚀 Release All Content Script');
console.log('═'.repeat(60));
console.log(`📅 Setting all future articles to: ${TODAY}\n`);

function updateArticleDate(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract current publish date
  const dateMatch = content.match(/publishDate:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  if (!dateMatch) {
    return { updated: false, reason: 'no publishDate found' };
  }
  
  const currentDate = dateMatch[1];
  const currentDateObj = new Date(currentDate + 'T00:00:00');
  const todayObj = new Date(TODAY + 'T00:00:00');
  
  // Only update if the date is in the future
  if (currentDateObj <= todayObj) {
    return { updated: false, reason: 'already published', currentDate };
  }
  
  // Replace the date
  const updatedContent = content.replace(
    /publishDate:\s*["'](\d{4}-\d{2}-\d{2})["']/,
    `publishDate: "${TODAY}"`
  );
  
  fs.writeFileSync(filePath, updatedContent);
  
  return { updated: true, oldDate: currentDate, newDate: TODAY };
}

// Get all markdown files (excluding non-article files)
const scheduledFiles = fs.readdirSync(SCHEDULED_DIR)
  .filter(f => f.endsWith('.md') && !f.includes('CONTENT_STATUS') && !f.includes('template'));

console.log(`📁 Found ${scheduledFiles.length} article files\n`);

let updatedCount = 0;
let alreadyPublished = 0;
let errors = 0;

const updates = [];

scheduledFiles.forEach(filename => {
  const scheduledPath = path.join(SCHEDULED_DIR, filename);
  const publicPath = path.join(PUBLIC_DIR, filename);
  
  try {
    // Update in scheduled directory
    const result = updateArticleDate(scheduledPath);
    
    if (result.updated) {
      // Also update in public directory if it exists
      if (fs.existsSync(publicPath)) {
        updateArticleDate(publicPath);
      }
      
      updatedCount++;
      updates.push({
        filename,
        oldDate: result.oldDate,
        newDate: result.newDate
      });
    } else if (result.reason === 'already published') {
      alreadyPublished++;
    }
  } catch (err) {
    console.error(`❌ Error processing ${filename}: ${err.message}`);
    errors++;
  }
});

// Summary
console.log('═'.repeat(60));
console.log('📊 RELEASE SUMMARY');
console.log('═'.repeat(60));
console.log(`✅ Articles updated to today: ${updatedCount}`);
console.log(`📰 Already published: ${alreadyPublished}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📄 Total articles now published: ${updatedCount + alreadyPublished}`);
console.log('');

if (updates.length > 0) {
  console.log('📝 Updated articles:');
  updates.slice(0, 20).forEach(u => {
    console.log(`   ${u.oldDate} → ${u.newDate}: ${u.filename.substring(0, 50)}...`);
  });
  if (updates.length > 20) {
    console.log(`   ... and ${updates.length - 20} more`);
  }
  console.log('');
}

console.log('═'.repeat(60));
console.log('📋 NEXT STEPS');
console.log('═'.repeat(60));
console.log('1. Regenerate blog manifest:');
console.log('   npm run generate-blog-manifest');
console.log('');
console.log('2. Regenerate sitemap:');
console.log('   npm run generate-sitemap');
console.log('');
console.log('3. Deploy to production:');
console.log('   git add . && git commit -m "Release all content" && git push');
console.log('');
console.log('4. Submit sitemap to Google:');
console.log('   node scripts/submit-sitemap-to-google.js');
console.log('');
console.log('5. (Optional) Request indexing for priority URLs:');
console.log('   node scripts/submit-urls-to-google.js');
console.log('');
