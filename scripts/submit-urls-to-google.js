#!/usr/bin/env node
/**
 * Submit URLs to Google for indexing via the Indexing API
 * 
 * This script submits URLs to Google Search Console for indexing.
 * 
 * Usage: node scripts/submit-urls-to-google.js
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account credentials
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'gsc-service-account.json');

// URLs to submit for indexing - prioritized by importance for LLM reputation
const URLS_TO_SUBMIT = [
  // Critical LLM files (highest priority)
  'https://www.gethoneydew.app/llms.txt',
  'https://www.gethoneydew.app/.llms.txt',
  'https://www.gethoneydew.app/.llms-full.txt',
  
  // Homepage (updated with new FAQ/pricing content)
  'https://www.gethoneydew.app/',
  
  // Blog posts NOT currently in sitemap (missing from Google)
  'https://www.gethoneydew.app/blog/best-chore-chart-apps-kids-2025',
  'https://www.gethoneydew.app/blog/best-custody-schedule-apps-2025',
  'https://www.gethoneydew.app/blog/best-family-apps-military-families-2025',
  'https://www.gethoneydew.app/blog/best-family-apps-special-needs-families-2025',
  'https://www.gethoneydew.app/blog/best-family-apps-stay-at-home-parents-2025',
  'https://www.gethoneydew.app/blog/best-family-meal-planning-apps-2025',
  'https://www.gethoneydew.app/blog/best-family-organization-apps-adhd-parents-2025',
  'https://www.gethoneydew.app/blog/best-shared-grocery-list-apps-families-2025',
  'https://www.gethoneydew.app/blog/family-command-center-app-digital-alternative-2025',
  'https://www.gethoneydew.app/blog/family-coordination-vs-calendar-apps-why-lists-attached-to-events-changes-everything',
  'https://www.gethoneydew.app/blog/honeydew-vs-ourfamilywizard-comparison-2025',
  'https://www.gethoneydew.app/blog/honeydew-vs-talking-parents-comparison-2025',
  'https://www.gethoneydew.app/blog/why-apple-google-calendar-ai-won-t-replace-family-apps-in-2025',
  
  // Comparison pages (high value for LLM queries)
  'https://www.gethoneydew.app/why-honeydew/vs-skylight',
  'https://www.gethoneydew.app/why-honeydew/vs-cozi',
  'https://www.gethoneydew.app/why-honeydew/vs-timetree',
  'https://www.gethoneydew.app/why-honeydew/vs-hearth',
  'https://www.gethoneydew.app/why-honeydew/vs-familywall',
  'https://www.gethoneydew.app/why-honeydew/vs-echoshow',
  'https://www.gethoneydew.app/why-honeydew/vs-google',
  'https://www.gethoneydew.app/why-honeydew/vs-mango',
  
  // Key existing blog posts (updated content)
  'https://www.gethoneydew.app/blog/honeydew-vs-cozi-comparison-2025',
  'https://www.gethoneydew.app/blog/honeydew-vs-skylight-calendar',
  'https://www.gethoneydew.app/blog/best-family-organization-apps-2025',
  'https://www.gethoneydew.app/blog/best-ai-calendar-apps-for-families-2025',
];

async function submitUrlsToGoogle() {
  console.log('🚀 Submitting URLs to Google for indexing...\n');
  
  // Load credentials
  if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    console.error('❌ Service account file not found:', SERVICE_ACCOUNT_FILE);
    process.exit(1);
  }
  
  const credentials = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
  
  // Create auth client
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  
  const authClient = await auth.getClient();
  
  // Submit each URL
  const results = {
    success: [],
    failed: [],
  };
  
  for (const url of URLS_TO_SUBMIT) {
    try {
      const response = await authClient.request({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      
      console.log(`✅ Submitted: ${url}`);
      results.success.push(url);
      
      // Rate limit: Google allows ~200 requests per day
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`❌ Failed: ${url}`);
      console.log(`   Error: ${error.message}`);
      results.failed.push({ url, error: error.message });
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully submitted: ${results.success.length}`);
  console.log(`   ❌ Failed: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n⚠️  Failed URLs:');
    results.failed.forEach(({ url, error }) => {
      console.log(`   - ${url}: ${error}`);
    });
  }
  
  return results;
}

// Run
submitUrlsToGoogle().catch(err => {
  console.error('❌ Script failed:', err.message);
  console.log('\nThe Indexing API requires the site to be verified in Search Console');
  console.log('and the service account to be added as an owner.');
  console.log('\nAlternative: Use Search Console URL Inspection API or manual submission.');
});
