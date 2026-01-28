#!/usr/bin/env node
/**
 * Submit sitemap to Google Search Console and request indexing
 * 
 * Uses the Search Console API (which the service account has access to)
 * 
 * Usage: node scripts/submit-sitemap-to-google.js
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account credentials
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'gsc-service-account.json');
const SITE_URL = 'https://www.gethoneydew.app/';
const SITEMAP_URL = 'https://www.gethoneydew.app/sitemap.xml';

async function submitSitemap() {
  console.log('🚀 Connecting to Google Search Console...\n');
  
  // Load credentials
  if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    console.error('❌ Service account file not found:', SERVICE_ACCOUNT_FILE);
    process.exit(1);
  }
  
  const credentials = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
  
  // Create auth client
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  
  const authClient = await auth.getClient();
  google.options({ auth: authClient });
  
  const searchconsole = google.searchconsole('v1');
  
  try {
    // First, list verified sites
    console.log('📋 Checking verified sites...');
    const sitesResponse = await searchconsole.sites.list();
    console.log('Verified sites:', sitesResponse.data.siteEntry?.map(s => s.siteUrl) || 'None found');
    
    // Submit sitemap
    console.log('\n📤 Submitting sitemap...');
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });
    console.log('✅ Sitemap submitted successfully:', SITEMAP_URL);
    
    // Get sitemap status
    console.log('\n📊 Checking sitemap status...');
    const sitemapsResponse = await searchconsole.sitemaps.list({
      siteUrl: SITE_URL,
    });
    
    if (sitemapsResponse.data.sitemap) {
      sitemapsResponse.data.sitemap.forEach(sm => {
        console.log(`   - ${sm.path}`);
        console.log(`     Last submitted: ${sm.lastSubmitted}`);
        console.log(`     Pending: ${sm.isPending}`);
        console.log(`     Errors: ${sm.errors || 0}`);
        console.log(`     Warnings: ${sm.warnings || 0}`);
      });
    }
    
    console.log('\n✅ Done! Google will now crawl and index the URLs in your sitemap.');
    console.log('   This typically takes 1-7 days for new URLs.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('not verified')) {
      console.log('\n⚠️  The service account needs to be added as an owner in Search Console.');
      console.log('   1. Go to: https://search.google.com/search-console');
      console.log('   2. Select your property: www.gethoneydew.app');
      console.log('   3. Go to Settings > Users and permissions');
      console.log('   4. Add user: search-console-reader@honeydew-458122.iam.gserviceaccount.com');
      console.log('   5. Set permission level to: Owner');
      console.log('   6. Re-run this script');
    }
    
    if (error.message.includes('403')) {
      console.log('\n⚠️  Permission denied. Make sure:');
      console.log('   1. The service account is added as an owner in Search Console');
      console.log('   2. The Search Console API is enabled in Google Cloud Console');
    }
  }
}

// Also list URLs that need priority indexing
function listPriorityUrls() {
  console.log('\n📋 Priority URLs for manual inspection (if API fails):');
  console.log('   Go to: https://search.google.com/search-console');
  console.log('   Use URL Inspection tool for each:\n');
  
  const priorityUrls = [
    'https://www.gethoneydew.app/llms.txt',
    'https://www.gethoneydew.app/',
    'https://www.gethoneydew.app/blog/honeydew-vs-cozi-comparison-2025',
    'https://www.gethoneydew.app/blog/honeydew-vs-skylight-calendar',
    'https://www.gethoneydew.app/why-honeydew/vs-cozi',
    'https://www.gethoneydew.app/why-honeydew/vs-skylight',
  ];
  
  priorityUrls.forEach(url => console.log(`   - ${url}`));
}

// Run
submitSitemap().then(() => {
  listPriorityUrls();
}).catch(err => {
  console.error('❌ Script failed:', err.message);
  listPriorityUrls();
});












