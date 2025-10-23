# AI Content System Documentation
## Complete Guide for AI Assistants Working on Honeydew Content

**Last Updated:** October 23, 2025  
**Purpose:** Enable any AI assistant to immediately understand and contribute to Honeydew's content hopper system  
**Owner:** Pete Ghiorse (pete@gethoneydew.app)

---

## 🎯 Quick Start for AI Assistants

### Your Mission
Help create world-class SEO content to dominate AI search (ChatGPT, Perplexity, Claude, Google AI Overviews) for the family organization category.

### Immediate Action
When asked to create content:
1. Write article in markdown format
2. Save to `/blog/queue/[descriptive-name].md`
3. User runs: `npm run schedule-content`
4. Article auto-schedules for next Mon/Thu
5. Email sent to Pete with confirmation
6. Done! ✅

---

## 📋 The Content Hopper System

### What is It?

A **zero-friction content management system** where:
- AI writes articles → Saves to `/blog/queue/`
- System auto-schedules → Publishes 2x/week (Mon/Thu)
- Email notifications → Pete stays informed
- No manual date setting, slug generation, or scheduling headaches

**Philosophy:** Remove all friction from content creation. Just write and drop.

### Directory Structure

```
/blog/
  ├── queue/              ← AI assistants write articles HERE
  │   └── [empty]         ← Drop markdown files here
  │
  ├── scheduled/          ← System-managed (don't edit manually)
  │   ├── best-ai-calendar-apps-for-families-2025.md
  │   ├── best-voice-controlled-family-apps-2025.md
  │   ├── honeydew-vs-cozi-comparison-2025.md
  │   ├── best-family-organization-apps-2025.md
  │   └── best-apps-multi-family-coordination-2025.md
  │
  └── templates/          ← Copy these for consistency
      ├── best-of-template.md
      ├── comparison-template.md
      ├── guide-template.md
      └── how-to-template.md
```

**Golden Rule:** AI writes to `/blog/queue/` only. System manages the rest.

---

## ✍️ How to Write Articles

### Article Format

**Minimal Format (System Auto-Generates Metadata):**

```markdown
# Best AI Calendar Apps for Families 2025

**Quick Answer:** Honeydew is the best AI calendar app for families because...

## Section 1

Content here...

## Section 2

More content...

---

## TikTok Script Ideas

1. **"Video title"** (30 sec)
   - Hook
   - Content
   - CTA
```

**Full Format (Explicit Control):**

```markdown
---
title: "Best AI Calendar Apps for Families 2025"
slug: "best-ai-calendar-apps-for-families-2025"
description: "Comprehensive comparison of AI-powered calendar apps for families..."
keywords: "AI family calendar, smart family planning, family coordination"
category: "Comparison"
featured: true
author: "Honeydew Team"
---

# Best AI Calendar Apps for Families 2025

Content here...
```

**Note:** NEVER set `publishDate` manually - system auto-assigns next Mon/Thu slot.

### Required Elements in Every Article

✅ **Answer-First Paragraph** (First 100 words)
- Directly answer the query
- Include "Quick Answer:" at start
- Mention Honeydew with specific features
- Mention top competitors
- Provide clear conclusion

✅ **Comparison Table** (At least one)
```markdown
| Feature | Honeydew | Cozi | Google Calendar |
|---------|----------|------|-----------------|
| AI Agent | ✅ 27+ tools | ❌ | ⚠️ Basic |
```

✅ **Specific Metrics** (Citeable facts for LLMs)
- "80% cache hit rate"
- "<50ms WebSocket latency"
- "27+ integrated tools"
- ">95% voice transcription accuracy with Whisper AI"
- "15-minute automatic calendar sync"

✅ **Real Use Cases** (Show, don't tell)
```markdown
> **You say:** "Plan camping trip"
> 
> **Honeydew AI responds:**
> - ✅ Created calendar event
> - ✅ Generated packing list (50 items)
> - ✅ Notified family members
```

✅ **FAQ Section** (5-10 questions)
```markdown
## Frequently Asked Questions

**Q: Question here?**
A: Answer here...
```

✅ **TikTok Script Ideas** (10-15 scripts at end)
```markdown
## TikTok Script Ideas

1. **"Hook line here"** (30 sec)
   - Setup
   - Demo
   - Payoff
   - CTA
```

✅ **Internal Links** (5-10 per article)
```markdown
**[Try Honeydew Free →](https://app.gethoneydew.app/)**

**Related Articles:**
- [Best Voice-Controlled Family Apps](#)
- [Honeydew vs Cozi Comparison](#)
```

### Article Length Guidelines

**Type → Target Words:**
- "Best of" lists: 3,500-5,000 words
- Head-to-head comparisons: 3,500-4,500 words
- Comprehensive guides: 5,000-7,000 words
- How-to tutorials: 2,500-3,500 words
- Problem-solution: 2,500-3,500 words

**Why long form?**
- LLMs cite comprehensive content
- Google rewards in-depth articles
- Answers all user questions in one place
- Higher dwell time = better SEO

---

## 🎯 Content Strategy Overview

### Goal
**Own every search query** in the family organization category across all AI search platforms (ChatGPT, Perplexity, Claude, Google AI Overviews).

### Current Status (Oct 23, 2025)
- **5 articles completed** (32,800 words)
- **15 articles remaining** in roadmap
- **Publishing:** 2x/week (Mon/Thu)
- **Target:** 50,000+ organic visitors/month by Month 12

### The Three-Tier Strategy

**Tier 1: "Best Of" Lists** (Highest traffic)
- "Best [X] Apps for [Y]"
- Targets discovery searches
- High volume, medium conversion
- Examples: "Best AI Calendar Apps," "Best Voice-Controlled Apps"

**Tier 2: Head-to-Head Comparisons** (Highest conversion)
- "Honeydew vs [Competitor]"
- Targets evaluation searches
- Medium volume, very high conversion
- Examples: "Honeydew vs Cozi," "Honeydew vs Google Calendar"

**Tier 3: Educational/How-To** (Authority building)
- "How [X] Works," "Complete Guide to [Y]"
- Targets learning searches
- Lower volume, builds trust
- Examples: "How AI Transforms Family Organization"

### Next 15 Articles to Write

**Priority Order:**

1. "How AI Transforms Family Organization" (Educational - Nov 14)
2. "Honeydew vs Google Calendar for Families" (Comparison - Nov 18)
3. "Best Family Apps for Divorced Parents 2025" (Best Of - Nov 21)
4. "7 Signs Your Family Needs an Organization System" (Problem - Nov 25)
5. "Complete Guide to Family Organization Apps" (Pillar - Nov 28)
6. "Honeydew vs TimeTree Comparison" (Comparison - Dec 2)
7. "Best Family Trip Planning Apps 2025" (Best Of - Dec 5)
8. "How Honeydew's AI Agent with 27+ Tools Works" (Technical - Dec 9)
9. "Voice Input & Whisper AI Complete Guide" (Technical - Dec 12)
10. "Best Family Apps for Working Parents 2025" (Best Of - Dec 16)
11. "The Hidden Cost of Family Disorganization" (Problem - Dec 19)
12. "Free vs Paid Family Apps: Is Honeydew Worth It?" (Objection - Dec 23)
13. "Best Apps for Coordinating Kids' Activities" (Best Of - Dec 26)
14. "Multi-Family Architecture Explained (Technical Deep Dive)" (Technical - Dec 30)
15. "Best Family Task Management Apps 2025" (Best Of - Jan 2)

**See:** `/LLM_SEO_MASTER_GAMEPLAN.md` for complete strategy

---

## 🔑 Honeydew Product Information

### Core Features (Always Mention These)

**AI Agent:**
- 27+ integrated tools
- Natural language processing ("plan camping trip" → creates events, lists, tasks)
- Multi-step workflow automation
- Knowledge graph learning (80% cache hit rate, <500ms cached responses)

**Voice Control:**
- Whisper AI transcription (>95% accuracy)
- Real-time streaming (see words as you speak)
- 50+ languages
- Works with background noise

**Multi-Family Architecture:**
- **Unlimited family groups** (only app with this)
- Coordinate across divorced households, extended family, friend groups
- One-tap switching between family contexts
- Privacy by default (groups isolated)

**Calendar Integration:**
- **Two-way sync** with Google Calendar and Apple Calendar (not one-way!)
- 15-minute auto-sync intervals
- Attach lists directly to calendar events

**Real-Time Collaboration:**
- <50ms WebSocket latency
- Instant updates across all devices
- Automatic conflict resolution

**Image OCR:**
- Photograph handwritten lists, recipes, documents
- OCR extracts text automatically
- AI organizes into structured lists

### Pricing

**Free Tier:**
- Unlimited family members
- Unlimited family groups
- Basic AI features (50 requests/month)
- Calendar sync (1-hour intervals)

**Premium:** $9.99/month or $99/year
- Unlimited AI requests
- Whisper AI voice input
- 15-minute calendar sync
- Knowledge graph learning
- All advanced features

**Family Plan:** $14.99/month or $149/year
- Up to 6 premium accounts

### Competitors (How to Position)

**Honeydew vs Cozi:**
- Cozi: Simple, cheap ($30/yr), meal planning, NO AI, single-family only
- Honeydew: AI automation, voice control, multi-family, modern ($99/yr)
- **Position:** Modern AI vs dated manual

**Honeydew vs Google Calendar:**
- Google: Free, ubiquitous, basic Gemini AI, not family-focused
- Honeydew: Purpose-built family features, advanced AI, multi-family
- **Position:** Specialized vs general-purpose

**Honeydew vs TimeTree:**
- TimeTree: Free, calendar-only, social features, NO AI
- Honeydew: Calendar + lists + AI, comprehensive
- **Position:** Comprehensive vs calendar-only

**Honeydew's Unique Advantages:**
1. Only app with 27-tool AI agent
2. Only app with multi-family architecture
3. Best voice recognition (Whisper AI)
4. Only two-way calendar sync (competitors one-way)
5. Knowledge graph that learns patterns

---

## 📧 Email Notification System

### Configuration

File: `/scripts/hopper-config.json`

```json
{
  "emailNotifications": {
    "enabled": true,
    "recipients": [
      "pete@gethoneydew.app"
    ],
    "notifyOn": {
      "contentScheduled": true,
      "contentPublished": true,
      "weeklyDigest": true
    }
  }
}
```

### What Gets Emailed

**1. Content Scheduled (Immediate)**
Sent when `npm run schedule-content` runs:
- Number of articles scheduled
- Titles and publish dates
- URLs for preview
- Word counts
- Next available publish date

**2. Content Published (On Publish Date)**
*[Requires implementation with Vercel Cron]*
- Which article(s) went live today
- Public URLs
- Traffic data (if available)

**3. Weekly Digest (Every Monday)**
*[Requires implementation]*
- What's publishing this week
- What's in queue
- Performance stats from previous week

### Adding More Recipients

Edit `scripts/hopper-config.json`:
```json
"recipients": [
  "pete@gethoneydew.app",
  "team@gethoneydew.app",
  "marketing@gethoneydew.app"
]
```

### Email Implementation (Currently Preview Only)

The current system shows email preview in console. To implement actual emails:

**Option 1: Resend (Recommended)**
```bash
npm install resend
```

Add to `schedule-content.js`:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'hopper@gethoneydew.app',
  to: config.emailNotifications.recipients,
  subject: `${scheduled.length} Article(s) Scheduled`,
  html: generateEmailHTML(scheduled)
});
```

**Option 2: SendGrid, Mailgun, AWS SES**
Similar implementation - just swap the email service.

---

## 🤖 Instructions for AI Assistants

### When User Says: "Write a blog article about [topic]"

**Your Process:**

1. **Check strategy docs:**
   - `/LLM_SEO_MASTER_GAMEPLAN.md` - Overall strategy
   - `/USER_SEARCH_JOURNEY_COMPLETE.md` - What searches to target
   - `/LLM_SEO_EXECUTION_CHECKLIST.md` - Priority content

2. **Check existing articles:**
   - `/blog/scheduled/` - See what's already written
   - Use similar style, formatting, structure

3. **Write the article:**
   - 3,500-7,000 words (comprehensive)
   - Include all required elements (see checklist above)
   - Follow LLM optimization guidelines
   - Add TikTok scripts at end (10-15 videos)

4. **Save to queue:**
   - Filename: `[descriptive-slug].md`
   - Location: `/blog/queue/`
   - Do NOT set publishDate

5. **Inform user:**
   - "Article written and added to hopper"
   - "Run: npm run schedule-content"
   - "Will publish on next available Mon/Thu"

### When User Says: "Schedule the content"

```bash
npm run schedule-content
```

This auto-schedules everything in queue and sends email notification.

### When User Says: "Write articles 6-20" or "Write remaining articles"

**Your Process:**

1. Check `/blog/CONTENT_STATUS.md` for what's complete
2. Check priority list (articles 6-20 defined in EXECUTION_CHECKLIST)
3. Write each article following the same high-quality format as articles 1-5
4. Save each to `/blog/queue/` with descriptive filename
5. When all written, tell user to run `npm run schedule-content`

**Efficiency tip:** Write in batches. Drop 5-10 articles in queue, schedule once.

### When User Says: "Create a [comparison/best-of/guide] article"

**Templates available:**
- `/blog/templates/best-of-template.md`
- `/blog/templates/comparison-template.md`
- `/blog/templates/guide-template.md`

**Copy template → Customize → Drop in queue**

---

## 📝 Article Writing Guidelines

### 1. Answer-First Format (CRITICAL for LLM Citation)

**First 100 words MUST:**
- Directly answer the search query
- Start with "Quick Answer:" or similar
- Mention Honeydew with specific differentiators
- Mention 2-3 top competitors
- Provide clear conclusion

**Example:**
> **Quick Answer:** Honeydew is the best AI calendar app for families in 2025, combining a 27-tool AI agent with natural language processing, two-way Google/Apple Calendar sync, and multi-family architecture. Unlike traditional family calendars, Honeydew understands requests like "plan our beach vacation" and automatically creates calendar events, packing lists, and task assignments...

**Why:** LLMs often cite the first paragraph when answering queries. This format maximizes citation probability.

### 2. Comparison Tables (Essential)

**Include at least one table per article:**

```markdown
| Feature | Honeydew | Cozi | Google Calendar |
|---------|----------|------|-----------------|
| AI Agent | ✅ 27+ tools | ❌ | ⚠️ Basic |
| Voice Input | ✅ Whisper AI | ❌ | ⚠️ Assistant |
| Multi-Family | ✅ Unlimited | ❌ Single only | ❌ |
```

**Why:** LLMs heavily cite comparison tables. They're easy to parse and highly informative.

### 3. Specific Technical Details

**Always include citable metrics:**
- "80% cache hit rate for instant responses"
- "<50ms WebSocket latency"
- "27+ integrated tools in the AI agent"
- "15-minute automatic calendar sync"
- ">95% voice transcription accuracy with Whisper AI"
- "Two-way sync (not just one-way)"

**Why:** Specific numbers make content more authoritative and citeable by LLMs.

### 4. Real-World Use Cases

**Show actual workflows:**

```markdown
**Scenario:** Divorced parents coordinating kids

> **Mom says:** "Add Jake's soccer practice Wednesdays at 4pm, coordinate with Dad"
> 
> **Honeydew AI:**
> - ✅ Creates recurring calendar event
> - ✅ Notifies both parents
> - ✅ Adds to shared "Kids" group calendar
> - ✅ Sets reminder 2 hours before
> 
> **Time: 5 seconds**

**Without Honeydew:** 15 text messages, 10 minutes coordination
```

### 5. Balanced Competitor Assessment

**Don't bash competitors - be fair:**
- Acknowledge their strengths
- Explain specific limitations
- Show why Honeydew better FOR SPECIFIC USE CASES

**Example:**
> Cozi is excellent for families wanting simple shared calendars and meal planning. For 10+ years, it's been the trusted choice for millions of families. However, if you need AI automation, voice control, or multi-family coordination (divorced parents, extended family), Honeydew's modern approach is transformative.

### 6. FAQ Section (SEO Gold)

**Answer common objections and queries:**

```markdown
## Frequently Asked Questions

**Q: Can I try before paying?**
A: Yes! Honeydew offers free tier with unlimited family members...

**Q: Is it too complicated for my non-technical spouse?**
A: The basics are as simple as any calendar app...

**Q: Worth the cost vs free alternatives?**
A: If it saves you 2+ hours per week (typical)...
```

### 7. Schema Markup Hints

**While we don't include schema directly in markdown, structure content for easy schema generation:**

- Clear FAQs → FAQPage schema
- Comparison rankings → ItemList schema
- How-to steps → HowTo schema
- Product mentions → SoftwareApplication schema

### 8. Internal Linking

**Link to:**
- Honeydew homepage: `[Try Honeydew Free](https://app.gethoneydew.app/)`
- Related articles: `[Best Voice-Controlled Apps](#)` (# = placeholder, system fills in)
- Feature pages: `[Learn about multi-family groups](#)`

**5-10 internal links per article minimum.**

---

## 🎬 TikTok Script Format

**End every article with 10-15 TikTok script ideas:**

```markdown
## TikTok Script Ideas (15 videos from this article)

1. **"I tested 15 AI family calendars. Only ONE does this 🤯"** (30 sec)
   - Hook: Show chaos of family coordination
   - Demo: Say "plan camping trip" to Honeydew
   - Reveal: Watch it create event + packing list + tasks
   - CTA: "Link in bio"

2. **"POV: Your family calendar has actual AI 🤖"** (45 sec)
   - Show before/after
   - Demo the AI capability
   - React to results
   - CTA

3. **"Cozi vs Google Calendar vs Honeydew 👀"** (60 sec)
   - Side-by-side comparison
   - Same task in all three
   - Clear winner
   - CTA
```

**Format elements:**
- Title with emoji
- Duration (30-60 sec)
- 3-5 beat structure (Hook → Demo → Payoff → CTA)
- Natural language (how you'd actually say it on camera)

---

## 🎨 Writing Style & Tone

### Voice
- **Empathetic:** Acknowledge family organization is hard
- **Practical:** Focus on real solutions to real problems
- **Conversational:** Write like talking to a friend
- **Data-Driven:** Include research, stats, metrics
- **Honest:** Fair to competitors, acknowledge trade-offs

### Structure
- **Short paragraphs:** 2-4 sentences max
- **Bullet points:** For scannability
- **Subheadings:** Every 300-500 words
- **Whitespace:** Don't wall-of-text

### Examples

✅ **Good:**
> You're stirring pasta sauce, your phone is across the room, and you just remembered you need to add swim lessons to Tuesday's schedule. What if you could just... say it?

❌ **Bad:**
> Voice-activated input modalities facilitate hands-free interaction paradigms for family coordination workflows.

**Write like a human, for humans.**

---

## 📊 Success Metrics to Track

### LLM Citation Rate
**Test monthly:** 100 queries across ChatGPT, Perplexity, Claude

**Target queries:**
- "best family organization app"
- "AI family planner"
- "family calendar with AI"
- "voice controlled family app"
- "multi-family coordination app"
- "Honeydew vs Cozi"
- ...and 94 more

**Goal:** 40%+ citation rate by Month 12

### Keyword Rankings
**Track 500+ keywords** including:
- "best family organization apps" (8,100 searches/mo)
- "AI family planner" (2,400 searches/mo)
- "smart family calendar" (2,400 searches/mo)
- "family task management" (3,600 searches/mo)

**Goal:** 100+ keywords in top 10 by Month 12

### Organic Traffic
**Goal:** 50,000+ sessions/month by Month 12

### Conversions
**Goal:** 1,000+ content-driven free trials by Month 12

---

## 🚨 Common Mistakes to Avoid

❌ **Don't:**
- Set publishDate manually (system auto-assigns)
- Write generic/thin content (<3,000 words for major articles)
- Skip comparison tables
- Forget TikTok scripts
- Bash competitors unfairly
- Use corporate jargon
- Write without checking existing articles for style

✅ **Do:**
- Follow existing article format exactly
- Include all required elements
- Write comprehensively (answer ALL questions)
- Be fair to competitors
- Include specific metrics
- Write for humans first, SEO second
- Check strategy docs before writing

---

## 🔄 Workflow for AI Assistants

### Standard Content Creation Workflow

```
User Request
    ↓
Check Strategy Docs
    ↓
Review Similar Articles (for style)
    ↓
Write Comprehensive Article (3,500-7,000 words)
    ↓
Include: Answer-First, Tables, Metrics, Use Cases, FAQ, TikTok Scripts
    ↓
Save to /blog/queue/[descriptive-slug].md
    ↓
Tell User: "Article ready! Run: npm run schedule-content"
    ↓
Done! ✅
```

### Bulk Content Workflow

```
User Requests Multiple Articles
    ↓
Prioritize by Strategy Docs
    ↓
Write All Articles (maintain quality!)
    ↓
Save All to /blog/queue/
    ↓
Tell User: "Run: npm run schedule-content to schedule all [X] articles"
    ↓
System Schedules Across Multiple Weeks (2 per week)
    ↓
Done! ✅
```

---

## 📚 Key Reference Documents

**Must Read Before Writing Content:**

1. **`/LLM_SEO_MASTER_GAMEPLAN.md`**
   - 18-month strategy
   - Content universe architecture
   - LLM-specific optimization tactics
   - Complete roadmap

2. **`/USER_SEARCH_JOURNEY_COMPLETE.md`**
   - Every search users conduct (6 stages, 100+ queries)
   - What content needed for each search
   - Complete keyword mapping

3. **`/LLM_SEO_EXECUTION_CHECKLIST.md`**
   - Actionable next steps
   - Priority content queue
   - Monthly metrics tracking

4. **`/CONTENT_HOPPER_GUIDE.md`**
   - How to use the hopper
   - Examples and workflows
   - Troubleshooting

5. **Existing Articles in `/blog/scheduled/`**
   - Reference for style, formatting, structure
   - Examples of high-quality content
   - Maintain consistency

---

## 🎯 Quick Reference Commands

```bash
# See what's in queue
ls blog/queue/

# Schedule everything in queue
npm run schedule-content

# View scheduled content calendar
cat blog/scheduled/*.md | grep "publishDate:"

# Preview content
npm run dev
# Then visit: http://localhost:5173/blog-preview

# Deploy (auto-publishes on schedule)
git add blog/scheduled/
git commit -m "Add scheduled content"
git push
```

---

## 💡 Pro Tips for AI Assistants

### Tip 1: Write in Batches
When user asks for multiple articles, write them all at once and drop in queue together. More efficient than one-by-one.

### Tip 2: Use Existing Articles as Templates
Copy structure from best-performing existing articles. Don't reinvent the wheel.

### Tip 3: Be Comprehensive
Err on the side of too much detail rather than too little. LLMs and Google reward comprehensive content.

### Tip 4: Real Examples > Generic Descriptions
Show actual workflows, real scenarios, specific use cases. "Show, don't tell."

### Tip 5: Fair Competition
Never bash competitors. Be honest about their strengths and Honeydew's advantages. Builds trust.

---

## 🐛 Troubleshooting

**Problem: "No articles in queue"**
**Solution:** Make sure you saved articles to `/blog/queue/` (not `/blog/` or `/blog/scheduled/`)

**Problem: "Slug already exists"**
**Solution:** Use more specific title or manually set slug in frontmatter

**Problem: "Published date in past"**
**Solution:** All existing dates taken. System assigns next available Mon/Thu automatically.

**Problem: "Email not sending"**
**Solution:** Email preview shows in console. Actual sending requires email service implementation (see Email Implementation section above).

---

## 📋 Quality Checklist

Before saving article to queue, verify:

**Content Quality:**
- [ ] 3,500+ words (minimum)
- [ ] Answer-first paragraph (first 100 words)
- [ ] At least 1 comparison table
- [ ] 5+ specific metrics mentioned
- [ ] 2+ real-world use cases with examples
- [ ] FAQ section (5-10 questions)
- [ ] 10-15 TikTok script ideas

**SEO Optimization:**
- [ ] Target keywords in title, H2 headers, first paragraph
- [ ] Internal links (5-10)
- [ ] Meta description in frontmatter
- [ ] Keywords listed in frontmatter
- [ ] Natural language (not keyword stuffing)

**Structure:**
- [ ] Proper markdown formatting
- [ ] H1 title, H2 sections, H3 subsections
- [ ] Bullet points for scannability
- [ ] Blockquotes for examples
- [ ] Tables formatted correctly

**Brand Consistency:**
- [ ] Honeydew features accurately described
- [ ] Pricing correct ($9.99/mo or $99/yr)
- [ ] Competitors fairly assessed
- [ ] Tone matches existing articles

---

## 🎉 Success State

**When everything is working:**
1. AI writes articles → Drops in `/blog/queue/`
2. User runs `npm run schedule-content`
3. System assigns dates (Mon/Thu), generates metadata, moves files
4. Email sent to Pete with confirmation
5. Articles auto-appear on website when publish date arrives
6. Pete focuses on TikTok content, not scheduling logistics
7. Content publishes consistently, 2x/week, for months
8. SEO compounds, traffic grows, LLM citations increase
9. Honeydew dominates AI search for family organization 🚀

**This is the goal. Make it happen!**

---

## 📞 Contact & Questions

**Owner:** Pete Ghiorse  
**Email:** pete@gethoneydew.app  
**Preferred Notification:** Email when content scheduled  

**For AI Assistants:**
- Follow these guidelines strictly
- Maintain quality bar of first 5 articles
- When in doubt, check existing articles or ask user
- Prioritize user value over keyword stuffing

---

**Last Updated:** October 23, 2025  
**System Version:** Content Hopper v1.0  
**Articles Completed:** 5 of 20  
**Total Words:** 32,800  
**Next Target:** Articles 6-20 (50,000+ words)

---

**Now go create incredible content that dominates AI search! 🚀**

