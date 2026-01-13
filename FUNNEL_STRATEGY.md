# Honeydew Conversion Funnel Strategy

**Last Updated:** December 2025  
**Status:** Ready for Implementation

---

## Executive Summary

This document outlines Honeydew's end-to-end conversion funnel, tracking implementation, and optimization strategy. With the iOS app approval imminent, we can now track users from first touch to activated customer.

---

## The Honeydew Funnel (AARRR Framework)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ACQUISITION                                        │
│  Blog SEO → Landing Pages → Website → App Store                             │
│  (40 clicks/mo) → (5,430 impressions/mo)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                           ACTIVATION                                         │
│  App Download → Onboarding Complete → First Family Created                  │
│  Target: 30% of downloads complete onboarding                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                           RETENTION                                          │
│  Week 1 Active → Week 4 Active → Month 3 Active                            │
│  Target: 40% D7, 25% D30 retention                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                           REVENUE                                            │
│  Free User → Trial Started → Paid Conversion                                │
│  Target: 5% free → paid conversion                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                           REFERRAL                                           │
│  Invite Family Members → Share App → Leave Review                           │
│  Target: 2.5 avg family members per account                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Funnel Stages & Tracking Events

### Stage 1: Acquisition (Website)

**Goal:** Drive qualified traffic to app download

| Touchpoint | Event Name | Parameters | Goal |
|------------|------------|------------|------|
| Blog article view | `blog_view` | `slug`, `source`, `referrer` | Awareness |
| Homepage view | `page_view` | `page_path`, `source` | Interest |
| CTA click (any) | `cta_click` | `location`, `variant`, `destination` | Intent |
| App Store click | `app_store_click` | `platform`, `source_page`, `utm_*` | Conversion |

**Key UTM Structure:**
```
https://app.gethoneydew.app/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}

Sources: website, blog, email, social, ads
Mediums: hero, cta_section, blog_cta, footer, navbar
Campaigns: primary_cta, skylight_comparison, cozi_comparison, fair_play
Content: {article_slug} or {page_name}
```

### Stage 2: Activation (App)

**Goal:** User completes valuable first action

| Milestone | Event Name | Parameters | Target |
|-----------|------------|------------|--------|
| App opened | `app_open` | `install_source`, `utm_*` | Track source |
| Onboarding started | `onboarding_start` | `version` | 100% of opens |
| Account created | `sign_up` | `method` (email/apple/google) | 60% of starts |
| Onboarding complete | `onboarding_complete` | `steps_completed` | 80% of signups |
| First family created | `family_created` | `family_size` | = "Activated" |
| First list created | `first_list` | `list_type`, `ai_generated` | Core action |
| Calendar connected | `calendar_connected` | `provider` (google/apple) | Power action |

**Activation Definition:** User has created account + created or joined family + created first list

### Stage 3: Retention (App)

**Goal:** Users return and engage regularly

| Milestone | Event Name | Parameters | Target |
|-----------|------------|------------|--------|
| Day 1 return | `d1_retention` | `actions_taken` | 70% |
| Day 7 return | `d7_retention` | `lists_created`, `ai_uses` | 40% |
| Day 30 return | `d30_retention` | `family_members`, `active_lists` | 25% |
| AI feature used | `ai_agent_use` | `tool_name`, `success` | Engagement |
| Voice input used | `voice_input` | `duration`, `success` | Power feature |
| Family invite sent | `family_invite_sent` | `count` | Viral loop |

### Stage 4: Revenue (App)

**Goal:** Convert free users to paid

| Milestone | Event Name | Parameters | Target |
|-----------|------------|------------|--------|
| Paywall viewed | `paywall_view` | `trigger`, `variant` | Track exposure |
| Trial started | `trial_start` | `plan_type` | 15% of activated |
| Trial converted | `purchase` | `plan`, `price`, `currency` | 35% of trials |
| Subscription renewed | `subscription_renew` | `plan`, `tenure` | 80% annually |

### Stage 5: Referral (App)

**Goal:** Users bring in more users

| Milestone | Event Name | Parameters | Target |
|-----------|------------|------------|--------|
| Family member invited | `family_invite_sent` | `count` | 2.5 avg |
| Invite accepted | `family_invite_accepted` | `source_user` | 60% accept |
| App shared | `app_shared` | `method` | Viral growth |
| Review prompted | `review_prompt` | `days_active` | After D14 |
| Review left | `review_submitted` | `rating` | 30% prompt |

---

## Website Implementation

### Current State ✅
- GA4 tracking active (`G-4X6LYQ296G`)
- Page view tracking working
- Basic CTA click tracking via `trackLinkClick`
- UTM parameters on hero and CTA section

### Required Improvements

#### 1. Standardize UTM Parameters Across All CTAs

Every outbound link to `app.gethoneydew.app` should include:

```typescript
const buildAppLink = (source: string, medium: string, campaign: string, content?: string) => {
  const base = 'https://app.gethoneydew.app/'
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content || source
  })
  return `${base}?${params.toString()}`
}
```

#### 2. Add Funnel Events to Website

```typescript
// In analytics.ts - add these tracking functions

// Blog engagement
export const trackBlogEngagement = (slug: string, action: string, value?: number) => {
  trackEvent('blog_engagement', {
    event_category: 'content',
    blog_slug: slug,
    engagement_action: action, // 'scroll_50', 'scroll_100', 'time_on_page', 'share'
    engagement_value: value
  })
}

// Scroll depth (add to blog pages)
export const trackScrollDepth = (depth: number, slug: string) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    depth_percentage: depth,
    page_slug: slug
  })
}

// App store click (final conversion)
export const trackAppStoreClick = (platform: string, source: string, campaign: string) => {
  trackEvent('app_store_click', {
    event_category: 'conversion',
    platform: platform, // 'ios', 'android', 'web'
    click_source: source,
    campaign: campaign
  })
}
```

#### 3. Blog CTA Tracking Enhancement

Update blog posts to track CTA clicks with article context:

```typescript
// In blog post component
const handleBlogCTAClick = () => {
  trackLinkClick({
    href: buildAppLink('blog', 'blog_cta', 'article_conversion', slug),
    source: 'blog_cta',
    label: `Article: ${slug}`,
    campaign: 'article_conversion',
    additionalParams: {
      article_slug: slug,
      article_category: category,
      cta_position: 'inline' | 'bottom' | 'sidebar'
    }
  })
}
```

---

## GA4 Configuration

### Conversions to Mark

In GA4 Admin → Events → Mark as conversion:

| Event | Priority | Description |
|-------|----------|-------------|
| `cta_click` | High | Any CTA clicked |
| `app_store_click` | Critical | Link to app store |
| `scroll_depth` (≥75%) | Medium | Deep content engagement |
| `blog_engagement` | Medium | Content value |

### Audiences to Create

| Audience | Definition | Use Case |
|----------|------------|----------|
| Blog Readers | `blog_view` in last 30 days | Retargeting |
| High Intent | `cta_click` + `scroll_depth ≥ 75%` | Priority retargeting |
| Skylight Shoppers | Viewed skylight comparison content | Competitor targeting |
| Engaged Non-Converters | 3+ sessions, no `app_store_click` | Nurture campaign |

---

## End-to-End Attribution

### Connecting Website → App

When app launches, pass UTM parameters:

**Website CTA:**
```
https://app.gethoneydew.app/?utm_source=website&utm_medium=blog_cta&utm_campaign=skylight_comparison&utm_content=7-best-skylight-alternatives
```

**App onboarding:** Parse these params on first launch and include in:
- `app_open` event
- `sign_up` event  
- User properties in analytics

### User Properties (App)

Set these on signup for cohort analysis:

```javascript
// Firebase/Analytics
analytics.setUserProperty('acquisition_source', utmSource)
analytics.setUserProperty('acquisition_medium', utmMedium)
analytics.setUserProperty('acquisition_campaign', utmCampaign)
analytics.setUserProperty('acquisition_date', new Date().toISOString())
```

---

## Funnel Visualization (Looker Studio)

### Recommended Dashboard Panels

1. **Acquisition Overview**
   - Impressions by source
   - Clicks by landing page
   - CTR by article/page

2. **Website Conversion**
   - Page views → CTA clicks → App store clicks
   - Funnel by traffic source
   - Top converting content

3. **Content Performance**
   - Articles by engagement (scroll depth, time)
   - CTA click rate by article
   - Top converting blog posts

4. **Attribution**
   - First touch → Conversion
   - UTM campaign performance
   - Source/medium breakdown

---

## Quick Wins Checklist

### Immediate (This Week)

- [ ] Add consistent UTM params to ALL CTAs on website
- [ ] Create `buildAppLink` utility function
- [ ] Add scroll depth tracking to blog pages
- [ ] Mark `cta_click` and `app_store_click` as conversions in GA4

### Short-term (This Month)

- [ ] Create Looker Studio dashboard
- [ ] Set up GA4 audiences for retargeting
- [ ] Add heatmap tool (Hotjar/Microsoft Clarity) for UX insights
- [ ] A/B test CTA copy/colors

### Post-App Launch

- [ ] Implement UTM parsing in app onboarding
- [ ] Set user properties for attribution
- [ ] Build full-funnel report (web → app → activation → revenue)
- [ ] Calculate CAC and LTV by acquisition source

---

## KPIs by Stage

| Stage | Metric | Current | Target (90 days) |
|-------|--------|---------|------------------|
| **Acquisition** | Monthly clicks | 40 | 200 |
| **Acquisition** | CTR | 0.74% | 2% |
| **Website** | CTA click rate | ~1.5% | 3% |
| **Website** | App store click | Unknown | Track |
| **App** | D7 retention | Unknown | 40% |
| **App** | Activation rate | Unknown | 30% |
| **Revenue** | Trial → Paid | Unknown | 35% |

---

## Technical Implementation Files

### Files to Update

1. `src/utils/analytics.ts` - Add new tracking functions
2. `src/utils/buildAppLink.ts` - Create URL builder utility
3. `src/components/Hero.tsx` - Use standardized links
4. `src/components/CallToAction.tsx` - Use standardized links
5. `src/pages/BlogPostPage.tsx` - Add scroll tracking
6. All CTA buttons across site

---

## Next Steps

1. **Review this strategy** - Confirm funnel stages match your product
2. **Implement website tracking** - Update analytics.ts and CTAs
3. **Configure GA4** - Mark conversions, create audiences
4. **Build dashboard** - Looker Studio connected to GA4
5. **App integration** - When app launches, add attribution tracking
6. **Iterate** - Weekly funnel review, optimize bottlenecks

---

**Questions?** This strategy is designed to scale with Honeydew. As you add channels (paid ads, email, social), the UTM structure and event naming keeps everything attributable.






