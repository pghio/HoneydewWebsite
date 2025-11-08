# Content Synchronization Process

## Overview
This process ensures that all website content, structured data, and search engine signals remain synchronized as new content is added to the Honeydew website.

## Automated Systems

### Blog Content Pipeline

#### 1. Markdown File Creation
- **Location**: `/blog/queue/` directory
- **Format**: Standard markdown with frontmatter
- **Required Fields**:
  ```yaml
  ---
  title: "Article Title"
  description: "SEO description (150-160 chars)"
  keywords: "keyword1, keyword2, keyword3"
  category: "Guide|Comparison|Case Study"
  featured: true|false
  ---
  ```

#### 2. Content Scheduling Script
- **Command**: `npm run schedule-content`
- **Location**: `/scripts/schedule-content.js`
- **Functions**:
  - Parses frontmatter from all queue files
  - Assigns publish dates (next available Mon/Thu slots)
  - Generates slugs from titles
  - Adds missing metadata (word count, reading time, etc.)
  - Moves files to `/blog/scheduled/`
  - Updates `/public/blog/` with published content
  - Regenerates `/blog-manifest.json`
  - Sends notification emails

#### 3. Manifest Generation
- **File**: `/public/blog-manifest.json`
- **Purpose**: Provides blog list data to React components
- **Fields**: title, description, publishDate, category, slug, etc.
- **Filtering**: Only includes articles with `publishDate <= currentDate`

### Sitemap Auto-Updates

#### Current Sitemap Structure
- **File**: `/public/sitemap.xml`
- **Sections**:
  - Main pages (/, /app, /blog)
  - Published blog articles (auto-populated)
  - Scheduled blog articles (future dates)
  - Why Honeydew comparison pages
  - Legal/support pages
  - LLM indexing files

#### Sitemap Update Triggers
- [ ] Blog content scheduling (`npm run schedule-content`)
- [ ] New page creation (manual update required)
- [ ] Route changes (manual update required)

### Structured Data Synchronization

#### Blog Post Schema
- **Location**: `BlogPostPage.tsx` component
- **Auto-generated schemas**:
  - Article/BlogPosting schema
  - BreadcrumbList schema
  - HowTo schema (for guide/tutorial posts)
  - FAQ schema (when FAQ sections exist)
- **Triggers**: Page load with frontmatter data

#### Organization Schema
- **Location**: `index.html`
- **Updates required**: When company info changes
- **Fields**: name, URL, logo, description, founding date

#### Software Application Schema
- **Location**: `index.html`
- **Updates required**: When features or ratings change
- **Fields**: features, offers, aggregateRating

## Manual Synchronization Tasks

### Weekly Checks
- [ ] **Blog manifest accuracy**: Verify published articles appear correctly
- [ ] **Sitemap completeness**: Check all new blog posts are included
- [ ] **Schema validation**: Test structured data with Google's tool
- [ ] **Internal linking**: Add cross-references between related content

### Monthly Audits
- [ ] **Broken links**: Check all internal links still work
- [ ] **Image alt text**: Verify new images have proper alt text
- [ ] **Meta descriptions**: Ensure blog posts have unique descriptions
- [ ] **Canonical URLs**: Verify proper canonicalization

### Content Publishing Checklist

#### Pre-Publish Verification
- [ ] Frontmatter complete and accurate
- [ ] Images have descriptive alt text
- [ ] Internal links to related content included
- [ ] Meta description under 160 characters
- [ ] Keywords relevant and not stuffed
- [ ] Category correctly assigned
- [ ] Featured flag set appropriately

#### Post-Publish Verification
- [ ] Article appears in blog list
- [ ] Article loads correctly at its URL
- [ ] Social media meta tags work
- [ ] Structured data validates
- [ ] Sitemap includes new URL
- [ ] Search Console indexing requested

## Quality Assurance Process

### Content Standards
- [ ] **Readability**: Flesch score >60
- [ ] **Length**: 3,000-7,000 words for comprehensive articles
- [ ] **Structure**: H2/H3 headers with question-based titles
- [ ] **Data**: Include metrics, comparisons, and real examples
- [ ] **Links**: Internal links to 3+ related articles
- [ ] **Schema**: Appropriate structured data applied

### Technical Standards
- [ ] **Performance**: Page loads in <3 seconds
- [ ] **Mobile**: Responsive design verified
- [ ] **Accessibility**: Alt text, proper heading hierarchy
- [ ] **SEO**: Title tags, meta descriptions, canonical URLs

## Automation Opportunities

### Potential Improvements
1. **GitHub Actions**: Auto-deploy content changes
2. **Webhook integration**: Trigger sitemap updates on content changes
3. **Content management API**: Programmatic content publishing
4. **Automated testing**: Schema validation in CI/CD pipeline

### Current Automation Level
- ✅ Blog manifest regeneration
- ✅ Basic sitemap inclusion
- ✅ Frontmatter parsing
- ✅ Date-based publishing
- ⚠️ Manual sitemap updates for new page types
- ❌ Automated schema validation

## Troubleshooting Guide

### Common Issues

#### Blog Post Not Appearing
1. Check publish date is in the past
2. Verify file moved to `/blog/scheduled/`
3. Confirm manifest.json updated
4. Check for frontmatter syntax errors

#### Sitemap Missing URLs
1. Run `npm run schedule-content` after blog publishing
2. Manually add new page types to sitemap.xml
3. Submit updated sitemap to Search Console

#### Schema Validation Errors
1. Use Google's Rich Results Test tool
2. Check JSON-LD syntax
3. Verify required fields present
4. Update schema definitions as needed

#### Broken Internal Links
1. Search for outdated URLs in content
2. Update comparison page references
3. Fix blog post cross-links
4. Test all links manually

## Monitoring & Alerts

### Daily Monitoring
- [ ] Content deployment success
- [ ] Site performance metrics
- [ ] Error logs for broken functionality

### Weekly Monitoring
- [ ] New content publishing pipeline
- [ ] Search Console indexing status
- [ ] Social media sharing functionality

### Monthly Monitoring
- [ ] Content quality metrics
- [ ] SEO performance impact
- [ ] User engagement with new content

## Documentation Updates

### When to Update This Document
- [ ] New content types added
- [ ] Process changes implemented
- [ ] Tool updates or replacements
- [ ] Quality standards modified

### Related Documentation
- `CONTENT_HOPPER_GUIDE.md`: Content creation workflow
- `BLOG_PREVIEW_GUIDE.md`: Preview system usage
- `ALT_TEXT_POLICY.md`: Image accessibility standards
- `MONTHLY_SEO_REVIEW_PROCESS.md`: Performance monitoring

---

## Quick Commands Reference

```bash
# Schedule new blog content
npm run schedule-content

# Check blog manifest
cat public/blog-manifest.json | jq '.stats'

# Validate sitemap
curl -s https://www.gethoneydew.app/sitemap.xml | grep "<url>" | wc -l

# Test structured data
# Use: https://search.google.com/test/rich-results
```

## Contact & Support

**Content Issues**: Marketing team
**Technical Issues**: Development team
**Process Questions**: Product team

---

**Last Updated:** November 2025
**Version:** 1.0
