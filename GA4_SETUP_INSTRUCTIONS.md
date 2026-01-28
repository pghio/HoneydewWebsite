# GA4 Configuration Instructions

**Property ID:** G-4X6LYQ296G  
**Time Required:** 15 minutes  
**Access Needed:** GA4 Admin access

---

## Step 1: Mark Events as Conversions

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property (G-4X6LYQ296G)
3. Navigate to: **Admin** (gear icon) → **Events**
4. Find and toggle "Mark as conversion" for:

| Event Name | Priority | Description |
|------------|----------|-------------|
| `cta_click` | ⭐ High | Any CTA button clicked |
| `app_store_click` | ⭐⭐ Critical | User clicked through to app |
| `scroll_depth` | Medium | (Only count 75%+ as conversion) |

**Note:** If events don't appear yet, they'll show up after they fire. Check back in 24-48 hours.

---

## Step 2: Create Custom Audiences

1. Navigate to: **Admin** → **Audiences** → **New audience**

### Audience 1: Blog Readers
- **Name:** Blog Readers
- **Condition:** `page_location` contains `/blog/`
- **Membership duration:** 30 days
- **Use case:** Retargeting blog visitors who didn't convert

### Audience 2: High Intent Users  
- **Name:** High Intent Visitors
- **Condition:** 
  - Include users where `cta_click` event count > 0
  - AND `scroll_depth` parameter `depth_percentage` >= 75
- **Membership duration:** 14 days
- **Use case:** Priority retargeting

### Audience 3: Skylight Shoppers
- **Name:** Skylight Comparison Visitors
- **Condition:** `page_location` contains `skylight`
- **Membership duration:** 30 days
- **Use case:** Competitor-focused retargeting

### Audience 4: Engaged Non-Converters
- **Name:** Engaged But No App Click
- **Condition:**
  - Include users where `session_count` >= 2
  - AND `app_store_click` event count = 0
- **Membership duration:** 30 days
- **Use case:** Nurture campaign targeting

---

## Step 3: Create Custom Definitions (Dimensions)

1. Navigate to: **Admin** → **Custom definitions** → **Create custom dimension**

### Dimension 1: Blog Slug
- **Dimension name:** Blog Article Slug
- **Scope:** Event
- **Event parameter:** `blog_slug`

### Dimension 2: CTA Source
- **Dimension name:** CTA Click Source
- **Scope:** Event  
- **Event parameter:** `click_source`

### Dimension 3: Scroll Depth
- **Dimension name:** Scroll Depth Percentage
- **Scope:** Event
- **Event parameter:** `depth_percentage`

---

## Step 4: Set Up Exploration Reports

1. Navigate to: **Explore** → **Blank** exploration

### Report 1: Blog Content Performance
- **Dimensions:** `Blog Article Slug`, `Page path`
- **Metrics:** `Sessions`, `Engaged sessions`, `Conversions`
- **Filter:** Page path contains `/blog/`

### Report 2: Funnel Analysis
- **Technique:** Funnel exploration
- **Steps:**
  1. `page_view` (any page)
  2. `cta_click` 
  3. `app_store_click`

### Report 3: Acquisition by Source
- **Dimensions:** `Source/Medium`, `Campaign`
- **Metrics:** `Sessions`, `Engaged sessions`, `Conversions`, `Conversion rate`

---

## Step 5: Connect to Looker Studio (Optional)

1. Go to [Looker Studio](https://lookerstudio.google.com)
2. Create new report
3. Add data source: Google Analytics 4 → Select your property
4. Build dashboard with:
   - Traffic overview (sessions, users, engagement)
   - Top pages by conversions
   - Campaign performance table
   - Funnel visualization

---

## Step 6: Enable Google Signals (Recommended)

1. Navigate to: **Admin** → **Data Settings** → **Data Collection**
2. Toggle ON: **Google signals data collection**
3. Review and accept terms

**Benefit:** Cross-device tracking and demographics data

---

## Step 7: Adjust Data Retention

1. Navigate to: **Admin** → **Data Settings** → **Data Retention**
2. Set: **Event data retention** → 14 months (max)
3. Toggle ON: **Reset user data on new activity**

---

## Verification Checklist

After 24-48 hours, verify:

- [ ] Events appearing in **Reports** → **Engagement** → **Events**
- [ ] Conversions showing in **Reports** → **Engagement** → **Conversions**
- [ ] Custom dimensions available in Explore reports
- [ ] Audiences populating (check audience size)

---

## Events You Should See

These events are now being sent from the website:

| Event | Triggered When |
|-------|----------------|
| `page_view` | Every page load |
| `cta_click` | CTA button clicked |
| `app_store_click` | App link clicked |
| `scroll_depth` | User scrolls to 25/50/75/100% |
| `blog_engagement` | Time on page or scroll milestones |

---

## Troubleshooting

**Events not showing?**
1. Check browser console for GA4 errors
2. Use [GA4 DebugView](https://analytics.google.com) → Admin → DebugView
3. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension

**Audiences empty?**
- Audiences are forward-looking; they populate from creation date
- Check back in 24-48 hours after creation

**Data not matching?**
- GA4 has sampling at high volumes
- Use BigQuery export for exact counts

---

## Next Steps After Setup

1. ✅ Wait 24-48 hours for data to populate
2. ✅ Review first Funnel exploration report
3. ✅ Share Looker Studio dashboard with team
4. ✅ Set up weekly email reports (optional)

---

**Questions?** The tracking code is in `src/utils/funnelTracking.ts` and `src/utils/analytics.ts` in the website repo.












