# 🎯 Content Hopper - Automatic Article Scheduler

## What is This?

A **dead-simple content management system** where you just drop articles in a folder and they automatically get scheduled for publishing on Monday and Thursday.

**No manual date setting. No scheduling headaches. Just drop and go.** ✨

---

## 🚀 Quick Start (3 Steps)

### 1. Drop Your Article

Create a markdown file in `/blog/queue/`:

```bash
/blog/queue/my-awesome-article.md
```

**Minimal format:**
```markdown
# Your Article Title

Your content here...
```

That's it! The system will auto-generate everything else.

### 2. Run the Scheduler

```bash
npm run schedule-content
```

### 3. Deploy

Your article is now scheduled! It will auto-publish on the assigned date.

---

## 📁 Directory Structure

```
/blog/
  ├── queue/          ← DROP NEW ARTICLES HERE
  ├── scheduled/      ← Auto-scheduled articles (don't touch)
  └── CONTENT_STATUS.md  ← See what's scheduled
```

**Golden Rule:** Only touch `/blog/queue/`. Let the system manage everything else.

---

## 🎨 Article Format Options

### Option 1: Minimal (System Auto-Generates)

```markdown
# Best Family Apps 2025

Your content here...
```

**System auto-generates:**
- Slug: `best-family-apps-2025`
- Publish date: Next Mon/Thu
- Author: "Honeydew Team"
- Category: "Guide"

### Option 2: Full Control (Custom Frontmatter)

```markdown
---
title: "Best Family Apps 2025"
slug: "best-family-apps-2025"
author: "Pete Ghiorse"
description: "Complete guide to family organization apps"
keywords: "family apps, organization, productivity"
category: "Comparison"
featured: true
---

# Best Family Apps 2025

Your content here...
```

**Note:** `publishDate` is ALWAYS auto-assigned (don't set it manually).

---

## 📅 How Scheduling Works

**Publishing Days:** Monday & Thursday

**Smart Scheduling:**
1. System finds next available Mon/Thu
2. Checks what's already scheduled
3. Assigns next open slot
4. Updates both `/blog/scheduled/` and `/public/blog/`

**Example:**
- Today: October 23, 2025 (Wednesday)
- Next slot: October 28, 2025 (Monday)
- Following: October 31, 2025 (Thursday)
- Then: November 4, 2025 (Monday)

---

## 🎯 Common Workflows

### Workflow 1: Single Article

```bash
# 1. Write article
echo "# My Article\n\nContent here" > blog/queue/my-article.md

# 2. Schedule it
npm run schedule-content

# Output:
# ✅ Scheduled articles:
# 1. 2025-10-28 - My Article
#    → /blog/my-article
```

### Workflow 2: Bulk Upload

```bash
# Drop 10 articles in queue
ls blog/queue/
# article-1.md
# article-2.md
# ... (8 more)

# Schedule them all
npm run schedule-content

# Output:
# ✅ Scheduled articles:
# 1. 2025-10-28 - Article 1
# 2. 2025-10-31 - Article 2
# 3. 2025-11-04 - Article 3
# ... (7 more)
```

**Result:** 10 articles scheduled across 5 weeks (2 per week).

### Workflow 3: Adding to Existing Schedule

```bash
# Already have 5 articles scheduled (through Nov 14)

# Add 3 more
cp new-articles/* blog/queue/

# Schedule
npm run schedule-content

# Output:
# ✅ Scheduled articles:
# 1. 2025-11-18 - New Article 1  ← Picks up after existing
# 2. 2025-11-21 - New Article 2
# 3. 2025-11-25 - New Article 3
```

**Smart:** System never overwrites existing dates.

---

## 🎨 Advanced: Custom Scheduling

Want to publish 3x/week instead of 2x? Edit `scripts/schedule-content.js`:

```javascript
// Change this line:
const PUBLISH_DAYS = [1, 4]; // Mon, Thu

// To this:
const PUBLISH_DAYS = [1, 3, 5]; // Mon, Wed, Fri
```

---

## 📊 View Your Content Calendar

```bash
# See what's scheduled
cat blog/CONTENT_STATUS.md
```

Or visit: `http://localhost:5173/blog-preview`

---

## 🔧 Troubleshooting

### "No articles in queue"

**Solution:** Drop markdown files in `/blog/queue/`

```bash
# Check if directory exists
ls -la blog/queue/

# Create test article
echo "# Test Article\n\nHello world" > blog/queue/test.md

# Try again
npm run schedule-content
```

### "Slug already exists"

**Solution:** Give your article a unique title or slug.

```markdown
---
slug: "my-unique-slug-v2"
---

# My Article
```

### "Published dates are wrong"

**Solution:** Dates are based on server time. Check:

```bash
date  # Current server date/time
```

If timezone is wrong, scheduled dates will be off.

---

## 🎉 Pro Tips

### Tip 1: Write in Batches

Write 5-10 articles in one sitting, drop them all in queue, schedule once. **Set and forget for weeks.**

### Tip 2: Use Templates

Create article templates:

```bash
/blog/templates/
  ├── best-of-template.md
  ├── comparison-template.md
  └── guide-template.md
```

Copy template → fill in content → drop in queue.

### Tip 3: Git Workflow

```bash
# Write articles locally
vim blog/queue/article.md

# Schedule them
npm run schedule-content

# Commit scheduled articles
git add blog/scheduled/
git commit -m "Add 5 new articles for Nov 2025"

# Deploy
git push
```

**Vercel auto-deploys** → articles publish on schedule.

### Tip 4: Content Backlog

Keep unscheduled articles in a different folder:

```bash
/blog/
  ├── queue/          ← Ready to publish
  ├── drafts/         ← Still writing
  ├── scheduled/      ← Auto-scheduled
  └── ideas/          ← Future topics
```

Move from `drafts/` → `queue/` when ready.

---

## 🤖 Automated Deployment (Optional)

Want articles to deploy automatically on their publish date?

### Option A: Vercel Cron (Recommended)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/deploy-scheduled",
      "schedule": "0 0 * * 1,4"
    }
  ]
}
```

This triggers rebuild every Mon/Thu at midnight.

### Option B: GitHub Actions

Create `.github/workflows/schedule-deploy.yml`:

```yaml
name: Deploy Scheduled Content

on:
  schedule:
    - cron: '0 0 * * 1,4'  # Mon & Thu at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Vercel Deploy
        run: curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

---

## 📋 Content Checklist

Before dropping in queue:

- [ ] Article is complete (no TODOs)
- [ ] Markdown formatting correct
- [ ] Images uploaded (if any)
- [ ] Links tested
- [ ] SEO keywords included
- [ ] Title is compelling
- [ ] Filename is descriptive

Then:
- [ ] Drop in `/blog/queue/`
- [ ] Run `npm run schedule-content`
- [ ] Review output
- [ ] Commit and push

---

## 🎯 What You Get

### Before (Manual Scheduling):
1. Write article ✍️
2. Decide publish date 🤔
3. Set date in frontmatter 📅
4. Remember to update STATUS file 📝
5. Hope you didn't conflict with existing dates 🤞
6. Deploy 🚀

**Time:** 10-15 minutes of scheduling overhead per article

### After (Content Hopper):
1. Write article ✍️
2. Drop in queue 📂
3. Run command 🎯

**Time:** 5 seconds of scheduling

**That's a 99%+ time savings on scheduling!**

---

## 🚀 You're Ready!

Your content hopper is set up and ready to go.

**Next:** Drop an article in `/blog/queue/` and run `npm run schedule-content`

Watch the magic happen. ✨

---

**Questions?** Check the main README or the example in `/blog/queue/EXAMPLE.md`

