#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || 'dist';
const resolvedTarget = path.resolve(process.cwd(), targetDir);

if (!fs.existsSync(resolvedTarget)) {
  console.error(`❌ Target directory not found: ${resolvedTarget}`);
  process.exit(1);
}

function walk(dir, accumulator) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, accumulator);
    } else {
      const stats = fs.statSync(fullPath);
      accumulator.push({
        path: path.relative(resolvedTarget, fullPath),
        size: stats.size,
      });
    }
  });
  return accumulator;
}

const files = walk(resolvedTarget, []);
const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
const largestFiles = [...files]
  .sort((a, b) => b.size - a.size)
  .slice(0, 10);

const summary = {
  generated: new Date().toISOString(),
  directory: resolvedTarget,
  fileCount: files.length,
  totalBytes,
  largestFiles,
};

const outputPath = path.join(resolvedTarget, 'build-index.json');
fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

console.log('📦 Build index written');
console.log(`   Directory: ${resolvedTarget}`);
console.log(`   Files: ${files.length}`);
console.log(`   Total size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Output: ${outputPath}`);
