# Honeydew SEO KPI Plan (Nov 2025 – Jan 2026)

This plan translates the current content ramp into pragmatic leading indicators for the next 60–90 days. Targets assume we are still in the “getting indexed” phase, so success is measured by crawl coverage, engagement quality, and first conversions rather than top-line signups.

---

## 1. Current Funnel Reality
- **Content**: 5 pillar posts live, 30+ already scheduled through mid-December.
- **Distribution**: Minimal backlinks, limited social/email promotion so far.
- **Measurement**: GA4 snippet in place but still using placeholder ID; Search Console property exists but needs re-verification after new sitemap.
- **Expectation**: Organic clicks will stay in single digits until Google finishes crawling the backlog. The goal is to validate that people who *do* land engage deeply and click CTAs.

---

## 2. KPI Summary

| Category | KPI | Definition | Cadence | Target (Dec) | Target (Jan) |
|---|---|---|---|---|---|
| Visibility | **Indexed URLs** | Count of `/blog/*` pages in Google Search Console coverage report | Weekly | 10+ (all Oct–Nov posts) | 18+ (add early Dec posts) |
| Visibility | **Organic impressions** | GSC impressions for tracked blog keywords | Weekly rolling 7‑day | 250/week | 750/week |
| Visibility | **Organic clicks** | Total clicks from organic to blog | Weekly | ≥5/week | ≥12/week |
| Engagement | **Avg. engagement time** | GA4 `Average engagement time` on blog posts | Weekly | ≥4m 30s | ≥5m |
| Engagement | **Scroll depth** | % of readers reaching ≥60% depth (via GA4 custom event) | Weekly | ≥55% | ≥65% |
| Conversion | **CTA click rate** | `cta_click` events ÷ blog sessions | Weekly | ≥1.5% | ≥2.5% |
| Conversion | **Waitlist/signup assists** | Blog-assisted conversions to waitlist or product signup (can be tagged as GA4 conversion or HubSpot list) | Monthly | ≥4/month | ≥8/month |
| Production | **Content velocity** | Scheduled posts shipped per week | Weekly | 2 (Mon/Thu cadence) | 2 |
| Distribution | **Backlinks secured** | New referring domains pointing to blog | Monthly | 2/month | 4/month |

Notes:
- Low absolute click targets keep morale realistic while still forcing forward progress.
- Engagement thresholds ensure long-form pieces resonate even before traffic scales.
- Backlink KPI focuses on quality guest posts/pod appearances, not volume link spam.

---

## 3. Implementation Next Steps

| # | Action | Owner | Tooling | Due |
|---|---|---|---|---|
| 1 | Replace GA4 placeholder (`G-XXXXXXXXXX`) in `index.html` with live Measurement ID so all engagement KPIs are trustworthy. | Dev | GA4 | ASAP |
| 2 | Re-submit updated `/public/blog/sitemap.xml` in Search Console and trigger “Request Indexing” for the five October URLs to accelerate crawl. | Growth | GSC | This week |
| 3 | Create GA4 custom event `scroll_60` (Configuration › Events) firing at 60% depth via existing IntersectionObserver helper, so Engagement KPI data populates. | Dev | GA4 | This week |
| 4 | Mark `cta_click` as a conversion inside GA4 to surface the CTA rate KPI automatically in the conversions report. | Growth | GA4 | This week |
| 5 | Stand up a Looker Studio dashboard pulling (a) indexed pages, (b) impressions/clicks, (c) engagement time, (d) CTA clicks per post; share link in `BLOG_ANALYTICS_GUIDE.md`. | Growth | Looker Studio | Next week |
| 6 | Launch bi-weekly “fresh ping” ritual: every Monday, promote the week’s article on LinkedIn + newsletter; every Thursday, syndicate on Medium with canonical link. Track UTMs so traffic source KPIs tie back to campaigns. | Marketing | Social/Email | Start next Monday |
| 7 | Outreach to two parenting podcasts or newsletters per month requesting backlinks or guest features; log efforts in `ARTICLES_COMPLETED_SUMMARY.md` to keep backlink KPI visible. | Marketing | Outreach CRM | Monthly |
| 8 | Configure HubSpot (or existing CRM) to tag any signup coming from UTM `source=blog` as “Blog Assisted” for monthly waitlist KPI reporting. | Growth Ops | HubSpot | Next week |

---

## 4. Reporting Rhythm
1. **Weekly (Friday standup)**: Update KPI table with actuals; flag blockers (e.g., indexing issues).
2. **Bi-weekly content review**: Compare new posts’ engagement vs. baseline; tweak hero image, intro, CTA if targets missed.
3. **Monthly SEO retro**: Pull GSC queries, identify which LLM-style questions we’re appearing for, and feed those insights back into the writing queue.

Keep this file updated as milestones are hit so the entire team can see what “good” looks like at low traffic volume and how we’re progressing toward the January goals.





