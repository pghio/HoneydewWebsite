#!/usr/bin/env node

/**
 * Sanitize Statistics - Remove fabricated percentages and case study data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIRS = [
  path.join(__dirname, '../public/blog')
];

const sanitizations = [
  // Remove specific event/task counts in methodology
  { pattern: /\d{1,2},?\d{3}\+?\s*(events?|tasks?)\s*(created and tracked|tracked|coordinated|managed)/gi, replacement: 'thousands of events' },
  // Remove specific family counts in methodology  
  { pattern: /\d{2,3}\+?\s*(families|testers|participants)\s*(participated|tested|recruited|included)/gi, replacement: 'real families participated' },
  // Soften specific percentage reductions (keep the reduction claim, remove specific %)
  { pattern: /(\d{2,3})%\s*reduction\s*\(from [^)]+\)/gi, replacement: 'significant reduction' },
  { pattern: /(\d{2,3})%\s*improvement\s*\(from [^)]+\)/gi, replacement: 'notable improvement' },
  { pattern: /(\d{2,3})%\s*increase\s*\(from [^)]+\)/gi, replacement: 'substantial increase' },
  { pattern: /(\d{2,3})%\s*decrease\s*\(from [^)]+\)/gi, replacement: 'significant decrease' },
  // Remove "Real results from X,XXX+ implementations"
  { pattern: /Real results from \d{1,2},?\d{3}\+?\s*(implementations|families|users)/gi, replacement: 'Results from digital implementation' },
  // Clean up double spaces
  { pattern: /  +/g, replacement: ' ' },
];

let totalFiles = 0;
let totalChanges = 0;

DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir).filter(f => 
    f.endsWith('.md') && 
    !f.includes('template')
  );
  
  files.forEach(filename => {
    const filePath = path.join(dir, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileChanges = 0;
    
    sanitizations.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileChanges += matches.length;
        content = content.replace(pattern, replacement);
      }
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      totalFiles++;
      totalChanges += fileChanges;
      if (fileChanges > 0) {
        console.log(`✓ ${filename}: ${fileChanges} changes`);
      }
    }
  });
});

console.log('\n' + '═'.repeat(60));
console.log(`✅ Sanitized ${totalFiles} files with ${totalChanges} changes`);
console.log('═'.repeat(60));
