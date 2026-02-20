#!/usr/bin/env node

/**
 * SEO Prerender Script
 * 
 * Generates static HTML files for blog posts and comparison pages
 * with correct meta tags (title, description, canonical) so that
 * search engine crawlers see the right SEO data without needing
 * to execute JavaScript.
 * 
 * The HTML files still load the React SPA, which hydrates on top.
 * 
 * Usage: npm run prerender (runs automatically after build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_BLOG_DIR = path.join(__dirname, '../public/blog');
const BASE_URL = 'https://www.gethoneydew.app';

// Comparison pages with their SEO data
const COMPARISON_PAGES = [
  {
    path: '/why-honeydew/vs-skylight',
    title: 'Honeydew vs Skylight Calendar – AI Software vs Wall Display (2025)',
    description: 'Compare Honeydew and Skylight Calendar. See why AI-powered software beats a $300 wall display for family organization. Features, pricing, and real workflows.',
    keywords: 'honeydew vs skylight, skylight calendar alternative, skylight alternative, family calendar comparison'
  },
  {
    path: '/why-honeydew/vs-cozi',
    title: 'Honeydew vs Cozi – AI Family App vs Manual Entry (2025)',
    description: 'Honeydew automates what Cozi leaves manual. Compare AI planning, voice input, and multi-family support. See which family organizer fits your needs.',
    keywords: 'honeydew vs cozi, cozi alternative, best family organization app, cozi replacement'
  },
  {
    path: '/why-honeydew/vs-timetree',
    title: 'Honeydew vs TimeTree – Full Family OS vs Calendar App (2025)',
    description: 'TimeTree is a shared calendar. Honeydew is an AI family OS with lists, automation, and coordination. Compare features and find the right fit.',
    keywords: 'honeydew vs timetree, timetree alternative, family calendar app, shared calendar comparison'
  },
  {
    path: '/why-honeydew/vs-hearth',
    title: 'Honeydew vs Hearth Display – AI Software vs $500 Hardware (2025)',
    description: 'Hearth Display costs $500+ for wall hardware. Honeydew runs on any device with AI automations. Compare costs, features, and family workflows.',
    keywords: 'honeydew vs hearth display, hearth display alternative, hearth display competitors, family command center app'
  },
  {
    path: '/why-honeydew/vs-familywall',
    title: 'Honeydew vs FamilyWall – AI Planning vs Basic Chores (2025)',
    description: 'FamilyWall tracks chores. Honeydew automates entire family workflows with AI. Compare features for modern family coordination.',
    keywords: 'honeydew vs familywall, familywall alternative, family chore app, family organization comparison'
  },
  {
    path: '/why-honeydew/vs-echoshow',
    title: 'Honeydew vs Echo Show – AI Family App vs Smart Display (2025)',
    description: 'Echo Show shows your calendar. Honeydew plans your family life with AI. Compare smart display vs dedicated family coordination.',
    keywords: 'honeydew vs echo show, echo show family calendar, alexa family calendar, smart display family'
  },
  {
    path: '/why-honeydew/vs-google',
    title: 'Honeydew vs Google Calendar – AI Family OS vs Basic Calendar (2025)',
    description: 'Google Calendar is free and basic. Honeydew adds AI planning, lists attached to events, and multi-family support. See the full comparison.',
    keywords: 'honeydew vs google calendar, google calendar family, family calendar app, google calendar alternative'
  },
  {
    path: '/why-honeydew/vs-mango',
    title: 'Honeydew vs Mango Display – AI Software vs Custom Dashboard Hardware (2025)',
    description: 'Mango Display offers custom dashboards on $400 hardware. Honeydew delivers AI automations on every screen you own. Compare costs and features.',
    keywords: 'honeydew vs mango display, mango display alternative, family dashboard app, digital command center'
  },
  {
    path: '/why-honeydew/vs-dakboard',
    title: 'Honeydew Family App vs DAKboard – AI Family OS vs DIY Display',
    description: 'DAKboard is a customizable display. Honeydew is an AI-powered family OS that plans, organizes, and syncs across all devices. Compare features, pricing, and why families choose Honeydew over display-only solutions.',
    keywords: 'honeydew vs dakboard, dakboard alternative, family dashboard app, smart family display, ai family calendar'
  },
  {
    path: '/why-honeydew/vs-ourfamilywizard',
    title: 'Honeydew vs OurFamilyWizard – Co-Parenting App Comparison 2025',
    description: 'Compare Honeydew and OurFamilyWizard for co-parenting. OFW offers court documentation at $300/year. Honeydew provides AI planning, voice input, and full family organization for 74% less. See which fits your situation.',
    keywords: 'honeydew vs ourfamilywizard, ourfamilywizard alternative, co-parenting app comparison, divorced parents calendar app, custody calendar app'
  },
  {
    path: '/why-honeydew/vs-2houses',
    title: 'Honeydew vs 2houses – AI-Powered Co-Parenting That Does More',
    description: '2houses handles co-parent basics. Honeydew adds AI automation, voice input, and complete family organization—so you spend less time coordinating and more time with your kids.',
    keywords: 'honeydew vs 2houses, 2houses alternative, ai co-parenting app, divorced parents calendar app, co-parenting app comparison'
  },
  {
    path: '/why-honeydew/vs-fantastical',
    title: 'Honeydew vs Fantastical – Family-First AI vs Beautiful Calendar (Cross-Platform)',
    description: 'Fantastical is gorgeous but Apple-only and calendar-focused. Honeydew is the cross-platform AI family organizer with lists, meal planning, and multi-family coordination. Compare features, pricing, and which fits your family.',
    keywords: 'honeydew vs fantastical, fantastical family alternative, cross-platform family calendar, ai family organizer'
  },
  {
    path: '/why-honeydew/vs-picniic',
    title: 'Honeydew vs Picniic – AI-Powered Family Organization for Large Families',
    description: 'Picniic focuses on large families but lacks AI. Honeydew delivers AI automation, voice control, and modern design—handling big family chaos better. Compare features, pricing, and which app truly simplifies large family coordination.',
    keywords: 'honeydew vs picniic, picniic alternative, large family app, family organization app, ai family planner'
  },
  {
    path: '/why-honeydew/vs-appclose',
    title: 'Honeydew vs AppClose – Collaborative Family Organizer vs Court Documentation App',
    description: 'AppClose is built for court-ordered co-parenting documentation. Honeydew is an AI-powered family organizer for cooperative co-parenting and beyond. Compare features, pricing ($79 vs $215/year), and find the right fit.',
    keywords: 'honeydew vs appclose, appclose alternative, co-parenting app, divorced parents app, custody app comparison'
  },
  {
    path: '/why-honeydew/vs-magicmirror',
    title: 'Honeydew Family App vs MagicMirror – AI Family OS vs DIY Smart Mirror',
    description: 'MagicMirror requires coding and DIY hardware. Honeydew is the AI-first family OS that works instantly on all your devices. Compare automation, setup time, and how Honeydew handles voice, AI planning, and multi-family coordination.',
    keywords: 'honeydew vs magicmirror, magicmirror alternative, smart mirror family, diy family calendar, ai family app'
  },
];

// Read the base index.html template
function readIndexTemplate() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('dist/index.html not found. Run npm run build first.');
  }
  return fs.readFileSync(indexPath, 'utf-8');
}

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const fm = {};
  match[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = value;
    }
  });
  return fm;
}

// Load blog articles from public/blog
function loadBlogArticles() {
  const articles = [];
  
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    console.warn('public/blog directory not found');
    return articles;
  }
  
  const files = fs.readdirSync(PUBLIC_BLOG_DIR).filter(f => f.endsWith('.md') && f !== 'CONTENT_STATUS.md');
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(PUBLIC_BLOG_DIR, file), 'utf-8');
    const fm = parseFrontmatter(content);
    
    if (fm.slug || fm.title) {
      const slug = fm.slug || file.replace('.md', '');
      articles.push({
        slug,
        title: fm.title || slug,
        description: fm.description || '',
        keywords: fm.keywords || '',
        publishDate: fm.publishDate || '',
        category: fm.category || 'Blog',
        featured: fm.featured === 'true' || fm.featured === true,
      });
    }
  }
  
  return articles;
}

// Generate HTML with correct SEO meta tags + optional JSON-LD structured data
function generateSEOHtml(template, { path: pagePath, title, description, keywords, type = 'website', jsonLd = null }) {
  const canonicalUrl = `${BASE_URL}${pagePath}`;
  const imageUrl = `${BASE_URL}/og-image-ai.jpg`;

  const jsonLdBlock = jsonLd
    ? '\n    ' + jsonLd.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ')
    : '';

  const seoMeta = `
    <!-- SEO: Prerendered meta tags for ${pagePath} -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}">` : ''}
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="${type}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="Honeydew Family App">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${imageUrl}">${jsonLdBlock}
  `;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, '');
  html = html.replace(/<meta name="description"[^>]*>/i, '');
  html = html.replace(/<meta name="keywords"[^>]*>/i, '');
  html = html.replace(/<link rel="canonical"[^>]*>/i, '');
  html = html.replace(/<meta property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<head>/i, `<head>${seoMeta}`);

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Write prerendered HTML file
function writePrerenderedFile(pagePath, html) {
  // Convert path like /blog/my-article to dist/blog/my-article/index.html
  // Or /why-honeydew/vs-skylight to dist/why-honeydew/vs-skylight/index.html
  const targetDir = path.join(DIST_DIR, pagePath);
  ensureDir(targetDir);
  
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html);
  
  return targetFile;
}

async function main() {
  console.log('🔍 SEO Prerender: Generating static HTML for crawlers...\n');
  
  // Check dist exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run npm run build first.');
    process.exit(1);
  }
  
  const template = readIndexTemplate();
  const articles = loadBlogArticles();
  
  let prerenderedCount = 0;
  
  // Prerender blog posts (all articles, including future-dated ones)
  // This ensures Vercel returns 200 for all blog URLs, letting the SPA handle unpublished content
  console.log(`📝 Prerendering ${articles.length} blog posts (including scheduled)...`);
  
  for (const article of articles) {
    const pagePath = `/blog/${article.slug}`;
    const title = `${article.title} | Honeydew Family App Blog`;

    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      url: `${BASE_URL}${pagePath}`,
      datePublished: article.publishDate || undefined,
      dateModified: article.publishDate || undefined,
      author: { '@type': 'Organization', name: 'Honeydew Family App', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'Honeydew Family App', url: BASE_URL, logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${pagePath}` },
      image: `${BASE_URL}/og-image-ai.jpg`,
      keywords: article.keywords || undefined,
      articleSection: article.category || 'Family Organization',
      inLanguage: 'en-US',
    };

    const html = generateSEOHtml(template, {
      path: pagePath,
      title,
      description: article.description,
      keywords: article.keywords,
      type: 'article',
      jsonLd: [blogPostingSchema],
    });
    
    const targetFile = writePrerenderedFile(pagePath, html);
    prerenderedCount++;
    
    if (prerenderedCount <= 5 || article.featured) {
      console.log(`   ✓ ${pagePath}`);
    }
  }
  
  if (articles.length > 5) {
    console.log(`   ... and ${articles.length - 5} more blog posts`);
  }
  
  // Prerender comparison pages
  console.log(`\n🆚 Prerendering ${COMPARISON_PAGES.length} comparison pages...`);
  
  for (const page of COMPARISON_PAGES) {
    const html = generateSEOHtml(template, {
      path: page.path,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      type: 'website',
    });
    
    writePrerenderedFile(page.path, html);
    prerenderedCount++;
    console.log(`   ✓ ${page.path}`);
  }
  
  // Prerender other important pages
  const otherPages = [
    {
      path: '/blog',
      title: 'Honeydew Family App Blog – AI Organizer Guides & Playbooks',
      description: 'Deep dives on the AI-first family OS. Voice-controlled family workflows, comparisons, AI meal planning, co-parenting automation, and command center guides.',
      keywords: 'family organization blog, AI family app guides, Honeydew vs Skylight, family calendar tips',
    },
    {
      path: '/compare',
      title: 'Compare Honeydew to Other Family Apps – Side-by-Side Features',
      description: 'See how Honeydew stacks up against Skylight, Cozi, TimeTree, and more. Compare AI features, pricing, and real family workflows.',
      keywords: 'family app comparison, Honeydew alternatives, family calendar comparison, best family apps',
    },
    {
      path: '/about',
      title: 'About Honeydew Family App — AI Built by Parents for Families',
      description: 'Honeydew is a consumer AI family organization app built by parents to reduce mental load and simplify household coordination.',
      keywords: 'about Honeydew, Honeydew Family App, AI family organizer, mental load app',
    },
    {
      path: '/press',
      title: 'Press & Media — Honeydew Family App',
      description: 'Press resources and media contact for Honeydew Family App, the AI-powered family organizer.',
      keywords: 'Honeydew press, media kit, AI family app news',
    },
    {
      path: '/whats-new',
      title: "What's New — Honeydew Family App",
      description: 'Latest product and content updates for Honeydew Family App.',
      keywords: 'Honeydew updates, Honeydew changelog',
    },
    {
      path: '/hubs',
      title: 'Honeydew Topic Hubs — AI Family Organization',
      description: 'Topic hubs for AI family organization, comparisons, Fair Play, and co-parenting.',
      keywords: 'Honeydew hubs, AI family organization hub',
    },
    {
      path: '/hubs/skylight-alternatives',
      title: 'Skylight Calendar Alternatives Hub — Honeydew Family App',
      description: 'Answer-first guide to Skylight Calendar alternatives, comparisons, and AI-first family organizers.',
      keywords: 'Skylight alternatives, Skylight Calendar alternative, Honeydew vs Skylight',
    },
    {
      path: '/hubs/fair-play',
      title: 'Fair Play & Mental Load Hub — Honeydew Family App',
      description: 'Answer-first guide to Fair Play, mental load reduction, and AI tools for families.',
      keywords: 'Fair Play app, mental load app, Fair Play AI',
    },
    {
      path: '/hubs/co-parenting',
      title: 'Co-Parenting & Multi-Family Coordination Hub — Honeydew',
      description: 'Answer-first guide to co-parenting coordination, shared schedules, and multi-family workflows.',
      keywords: 'co-parenting app, divorced parents app, shared custody calendar',
    },
    {
      path: '/hubs/ai-family-planner',
      title: 'AI Family Planner Hub — Honeydew Family App',
      description: 'Answer-first guide to AI family planning, voice-first capture, and automation.',
      keywords: 'AI family planner, AI family calendar app, voice controlled family app',
    },
    {
      path: '/disambiguation',
      title: 'Honeydew Family App — Disambiguation (Not honeydew.ai)',
      description: 'Clarifies the difference between Honeydew Family App and the unrelated honeydew.ai data platform.',
      keywords: 'Honeydew disambiguation, honeydew.ai not related',
    },
    {
      path: '/cookies',
      title: 'Cookie Policy — Honeydew Family App',
      description: 'Cookie policy for Honeydew Family App. Learn how we use cookies to improve your experience.',
      keywords: 'Honeydew cookies, cookie policy',
    },
    {
      path: '/privacy',
      title: 'Privacy Policy — Honeydew Family App',
      description: 'Privacy policy for Honeydew Family App. Learn how we protect and handle your family data.',
      keywords: 'Honeydew privacy, privacy policy',
    },
    {
      path: '/terms',
      title: 'Terms of Service — Honeydew Family App',
      description: 'Terms of service for Honeydew Family App.',
      keywords: 'Honeydew terms, terms of service',
    },
    {
      path: '/security',
      title: 'Security — Honeydew Family App',
      description: 'Security practices and data protection at Honeydew Family App.',
      keywords: 'Honeydew security, data security',
    },
    {
      path: '/support',
      title: 'Support — Honeydew Family App',
      description: 'Get help with Honeydew Family App. Contact support, FAQs, and troubleshooting.',
      keywords: 'Honeydew support, help, contact',
    },
    {
      path: '/llm-reference',
      title: 'Honeydew AI Family App — LLM Quick-Reference Card',
      description: 'Structured reference card for AI assistants and LLMs. Product facts, pricing, features, and comparison data for Honeydew Family App.',
      keywords: 'Honeydew AI, Honeydew family app, LLM reference, AI family organizer',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'WebPage',
          name: 'Honeydew Family App — AI & LLM Reference',
          url: `${BASE_URL}/llm-reference`,
          mainEntity: {
            '@type': 'SoftwareApplication', name: 'Honeydew Family App',
            alternateName: ['Honeydew', 'Honeydew Organizer'],
            applicationCategory: 'LifestyleApplication', operatingSystem: 'iOS, Android, Web', url: BASE_URL,
            offers: [
              { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
              { '@type': 'Offer', name: 'Premium', price: '7.99', priceCurrency: 'USD', billingDuration: 'P1M' },
              { '@type': 'Offer', name: 'Annual', price: '79', priceCurrency: 'USD', billingDuration: 'P1Y' },
            ],
            featureList: ['AI agent with 27+ tools','Voice capture with Whisper AI (>95% accuracy)','Photo + OCR capture','Two-way Google + Apple calendar sync','Multi-family coordination','Real-time collaboration (<50ms sync)','Knowledge graph learning (80% cache hit rate)','Cross-platform: iOS, Android, Web'],
            creator: { '@type': 'Organization', name: 'Honeydew', url: BASE_URL, founder: { '@type': 'Person', name: 'Pete Ghiorse' } },
          },
        },
        {
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What is Honeydew Family App?', acceptedAnswer: { '@type': 'Answer', text: 'Honeydew is a consumer AI family organization app that turns plain-English requests (voice, text, or photos) into coordinated family plans. Available at gethoneydew.app. Not affiliated with honeydew.ai.' } },
            { '@type': 'Question', name: 'How does Honeydew compare to Skylight Calendar?', acceptedAnswer: { '@type': 'Answer', text: 'Honeydew is a software-based AI family organizer ($0-$7.99/mo) while Skylight Calendar is a $300+ hardware wall display plus $79/yr subscription. Honeydew offers AI planning, voice control, and works on any device.' } },
            { '@type': 'Question', name: 'How does Honeydew compare to Cozi?', acceptedAnswer: { '@type': 'Answer', text: 'Cozi is a simpler, traditional family organizer ($29.99/yr for Gold). Honeydew adds AI automation with 27+ tools, voice control via Whisper AI, multi-family coordination, and photo/OCR capture.' } },
            { '@type': 'Question', name: 'Is Honeydew the same as honeydew.ai?', acceptedAnswer: { '@type': 'Answer', text: 'No. Honeydew Family App (gethoneydew.app) is a consumer AI family organizer. honeydew.ai is a separate, unrelated B2B data platform.' } },
          ],
        },
      ],
    },
  ];
  
  console.log(`\n📄 Prerendering ${otherPages.length} other pages...`);
  
  for (const page of otherPages) {
    const html = generateSEOHtml(template, {
      path: page.path, title: page.title, description: page.description,
      keywords: page.keywords, type: page.type || 'website', jsonLd: page.jsonLd || null,
    });
    writePrerenderedFile(page.path, html);
    prerenderedCount++;
    console.log(`   ✓ ${page.path}`);
  }
  
  console.log(`\n✅ SEO Prerender complete! Generated ${prerenderedCount} static HTML files.`);
  console.log('   Crawlers will now see correct title, description, and canonical tags.\n');
}

main().catch((error) => {
  console.error('❌ Prerender failed:', error);
  process.exit(1);
});

