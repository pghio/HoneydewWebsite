#!/usr/bin/env node

/**
 * Reorder Queue by Priority
 * 
 * Updates publish dates for 2026 articles based on impact priority.
 * Co-parenting content first, then wall displays, then productivity.
 * 
 * Usage: node scripts/reorder-queue-priority.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEDULED_DIR = path.join(__dirname, '../blog/scheduled');
const PUBLIC_DIR = path.join(__dirname, '../public/blog');

// Priority order based on QUEUE_PRIORITY_ORDER.md
// Lower number = higher priority = earlier publish date
const PRIORITY_ORDER = [
  // === TIER 1: CO-PARENTING (Weeks 1-4) - Highest LTV segment ===
  'best-co-parenting-apps-2026',
  'honeydew-vs-ourfamilywizard-comparison-2026',
  'best-apps-for-divorced-parents-2026',
  'ourfamilywizard-vs-appclose-vs-honeydew',
  'honeydew-vs-appclose-comparison-2026',
  'honeydew-vs-2houses',
  'best-family-organization-apps-2026-the-complete-guide',
  'honeydew-vs-talking-parents',
  
  // === TIER 2: WALL DISPLAYS (Weeks 5-8) - Proven traffic ===
  'best-wall-mounted-family-calendars-2026',
  'dakboard-vs-skylight-vs-honeydew-comparison-2026',
  'honeydew-vs-dakboard',
  'honeydew-vs-magicmirror',
  'best-smart-home-family-calendars-2026',
  'echo-show-15-vs-skylight-vs-honeydew-2026',
  'honeydew-vs-echo-show-15',
  'best-apps-for-blended-families-2026',
  
  // === TIER 3: PRODUCTIVITY CROSSOVER (Weeks 9-12) ===
  'best-free-family-organization-apps-2026',
  'honeydew-vs-google-calendar-complete',
  'fantastical-vs-google-calendar-vs-honeydew-2026',
  'honeydew-vs-fantastical',
  'best-task-management-apps-for-families-2026',
  'todoist-vs-anydo-vs-honeydew-2026',
  'honeydew-vs-todoist-comparison-2026',
  'honeydew-vs-anydo-comparison-2026',
  
  // === TIER 4: UPDATES & GAP-FILLING (Weeks 13-16) ===
  'honeydew-vs-cozi-complete-comparison-2026',
  'cozi-vs-ourhome-vs-honeydew-2026',
  'honeydew-vs-skylight-calendar-complete',
  'honeydew-vs-timetree-complete-comparison-2026',
  'timetree-vs-cozi-vs-honeydew',
  'honeydew-vs-apple-calendar',
  'best-family-calendar-apps-with-ai-in-2026',
  'best-family-apps-with-voice-control-2026',
  
  // === TIER 5: DEEP DIVES (Weeks 17-19) ===
  'honeydew-vs-hearth-display',
  'honeydew-vs-mango-display',
  'honeydew-vs-familywall',
  'honeydew-vs-picniic',
  'honeydew-vs-ourhome-deep-dive',
  'honeydew-vs-maple',
];

/**
 * Get priority score for a slug (lower = higher priority)
 */
function getPriorityScore(slug) {
  for (let i = 0; i < PRIORITY_ORDER.length; i++) {
    if (slug.includes(PRIORITY_ORDER[i])) {
      return i;
    }
  }
  return 999; // Not in priority list - keep at end
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get next publish date (Mon/Thu schedule)
 */
function getNextPublishDate(fromDate) {
  const date = new Date(fromDate);
  date.setHours(0, 0, 0, 0);
  const publishDays = [1, 4]; // Monday = 1, Thursday = 4
  
  while (true) {
    date.setDate(date.getDate() + 1);
    if (publishDays.includes(date.getDay())) {
      return date;
    }
  }
}

/**
 * Update publish date in frontmatter
 */
function updatePublishDate(content, newDate) {
  return content.replace(
    /publishDate:\s*["']?\d{4}-\d{2}-\d{2}["']?/,
    `publishDate: "${newDate}"`
  );
}

/**
 * Main reordering function
 */
function reorderByPriority() {
  console.log('🎯 Reordering Articles by Priority\n');
  console.log('Priority Order: Co-parenting → Wall Displays → Productivity → Updates\n');
  
  // Get all 2026 articles
  const files = fs.readdirSync(SCHEDULED_DIR)
    .filter(f => f.endsWith('.md') && f.includes('2026'));
  
  console.log(`📥 Found ${files.length} articles from 2026\n`);
  
  // Parse articles and their current dates
  const articles = files.map(filename => {
    const content = fs.readFileSync(path.join(SCHEDULED_DIR, filename), 'utf8');
    const dateMatch = content.match(/publishDate:\s*["']?(\d{4}-\d{2}-\d{2})["']?/);
    const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
    
    return {
      filename,
      slug: slugMatch ? slugMatch[1] : filename.replace('.md', ''),
      currentDate: dateMatch ? dateMatch[1] : null,
      content,
      priority: 0
    };
  });
  
  // Assign priority scores
  articles.forEach(article => {
    article.priority = getPriorityScore(article.slug);
  });
  
  // Sort by priority
  articles.sort((a, b) => a.priority - b.priority);
  
  // Assign new dates starting from Feb 6, 2026 (next Thursday after today)
  let currentDate = new Date('2026-02-06'); // Start with Feb 6, 2026 (Thursday)
  const changes = [];
  
  articles.forEach(article => {
    const newDate = formatDate(currentDate);
    
    if (article.currentDate !== newDate) {
      changes.push({
        filename: article.filename,
        slug: article.slug,
        oldDate: article.currentDate,
        newDate,
        priority: article.priority
      });
      
      // Update content
      const updatedContent = updatePublishDate(article.content, newDate);
      
      // Write to both scheduled and public directories
      fs.writeFileSync(path.join(SCHEDULED_DIR, article.filename), updatedContent);
      
      const publicPath = path.join(PUBLIC_DIR, article.filename);
      if (fs.existsSync(publicPath)) {
        fs.writeFileSync(publicPath, updatedContent);
      }
    }
    
    // Get next publish date
    currentDate = getNextPublishDate(currentDate);
  });
  
  // Display results
  console.log('═'.repeat(70));
  console.log('📅 NEW PRIORITY-BASED PUBLISH SCHEDULE');
  console.log('═'.repeat(70));
  console.log('');
  
  // Group by tier
  const tiers = [
    { name: 'TIER 1: CO-PARENTING', maxPriority: 7 },
    { name: 'TIER 2: WALL DISPLAYS', maxPriority: 15 },
    { name: 'TIER 3: PRODUCTIVITY', maxPriority: 23 },
    { name: 'TIER 4: UPDATES', maxPriority: 31 },
    { name: 'TIER 5: DEEP DIVES', maxPriority: 999 }
  ];
  
  let currentTier = 0;
  articles.forEach((article, index) => {
    // Check if we need to print tier header
    while (currentTier < tiers.length && article.priority > tiers[currentTier].maxPriority) {
      currentTier++;
    }
    if (currentTier < tiers.length && 
        (index === 0 || articles[index - 1].priority <= tiers[currentTier].maxPriority && 
         article.priority <= tiers[currentTier].maxPriority &&
         (index === 0 || articles[index - 1].priority < tiers[currentTier - 1]?.maxPriority || currentTier === 0))) {
      if (article.priority <= tiers[currentTier].maxPriority && 
          (index === 0 || articles[index - 1].priority > (tiers[currentTier - 1]?.maxPriority ?? -1))) {
        console.log(`\n📌 ${tiers[currentTier].name}`);
        console.log('─'.repeat(50));
      }
    }
    
    const change = changes.find(c => c.filename === article.filename);
    const newDate = change ? change.newDate : article.currentDate;
    const dateObj = new Date(newDate + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    
    console.log(`${index + 1}. ${newDate} (${dayName}) - ${article.slug.substring(0, 55)}${article.slug.length > 55 ? '...' : ''}`);
  });
  
  console.log('\n' + '═'.repeat(70));
  console.log(`✅ Updated ${changes.length} article publish dates`);
  console.log('═'.repeat(70));
  
  if (changes.length > 0) {
    console.log('\n📋 Changes Made:');
    changes.slice(0, 10).forEach(change => {
      console.log(`   ${change.oldDate} → ${change.newDate}: ${change.slug.substring(0, 45)}...`);
    });
    if (changes.length > 10) {
      console.log(`   ... and ${changes.length - 10} more changes`);
    }
  }
  
  console.log('\n🎉 Priority reordering complete!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Review the new schedule above');
  console.log('   2. Update blog-manifest.json: npm run build');
  console.log('   3. Commit changes: git add . && git commit -m "Reorder articles by priority"');
  console.log('');
}

// Run
try {
  reorderByPriority();
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
