# Google Ads Autonomous Campaign Setup

**Budget:** $5/day ($150/month)  
**Goal:** Full-funnel tracking from ad click → signup → activation → purchase  
**Status:** Ready for credentials

Reference plan: `GOOGLE_ADS_5_DOLLAR_CAMPAIGN.md`

---

## Quick Start Checklist

### 1. Create Google Ads Account (5 minutes)
- [ ] Go to [ads.google.com](https://ads.google.com)
- [ ] Click "Start Now" and create account
- [ ] Add payment method (credit card)
- [ ] Note your Customer ID (format: XXX-XXX-XXXX)

### 2. Apply for API Access (1-2 days approval)
- [ ] Go to [Google Ads API Center](https://developers.google.com/google-ads/api/docs/get-started/dev-token)
- [ ] Apply for a Developer Token
- [ ] Wait for approval email (usually 24-48 hours for basic access)

### 3. Create OAuth Credentials (10 minutes)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create new project or use existing "Honeydew"
- [ ] Enable "Google Ads API"
- [ ] Create OAuth 2.0 credentials
- [ ] Download client secret JSON

### 4. Configure Environment Variables

Local (shell or `.env.local`):
```bash
export GOOGLE_ADS_CUSTOMER_ID="123-456-7890"
export GOOGLE_ADS_LOGIN_CUSTOMER_ID="123-456-7890" # MCC/manager account
export GOOGLE_ADS_DEVELOPER_TOKEN="your_developer_token"
export GOOGLE_ADS_CLIENT_ID="your_oauth_client_id"
export GOOGLE_ADS_CLIENT_SECRET="your_oauth_client_secret"
export GOOGLE_ADS_REFRESH_TOKEN="your_refresh_token"
```

Vercel (store as secrets/env vars, never commit):
```bash
npx vercel env add GOOGLE_ADS_CUSTOMER_ID production
npx vercel env add GOOGLE_ADS_LOGIN_CUSTOMER_ID production
npx vercel env add GOOGLE_ADS_DEVELOPER_TOKEN production
npx vercel env add GOOGLE_ADS_CLIENT_ID production
npx vercel env add GOOGLE_ADS_CLIENT_SECRET production
npx vercel env add GOOGLE_ADS_REFRESH_TOKEN production
```

Minimum required for status/monitoring:
```bash
export GOOGLE_ADS_CUSTOMER_ID="123-456-7890"
export GOOGLE_ADS_DEVELOPER_TOKEN="your_developer_token"
```

### 5. Run Setup
```bash
npm install google-ads-api
node scripts/google-ads-cli.js setup
```

---

## What I'll Create Autonomously

### Campaign Structure

```
Honeydew - Family Organization ($5/day)
├── Ad Group: Competitor - Cozi Alternative (35% budget)
│   ├── Keywords: "cozi alternative", "better than cozi", etc.
│   └── Landing: /why-honeydew/vs-cozi
├── Ad Group: Competitor - Skylight Alternative (25% budget)
│   ├── Keywords: "skylight calendar alternative", etc.
│   └── Landing: /why-honeydew/vs-skylight
├── Ad Group: Problem - Family Organization (25% budget)
│   ├── Keywords: "family organization app", "organize family life"
│   └── Landing: /
└── Ad Group: AI Family App (15% budget)
    ├── Keywords: "ai family app", "smart family planner"
    └── Landing: /
```

### Sitelink Assets (use live website URLs)
Sitelinks should point to real pages on the website (not the app store). Recommended set:

| Sitelink | Final URL | Description 1 | Description 2 |
|---|---|---|---|
| Try Honeydew | https://gethoneydew.app/app | Start free in minutes | AI-powered family planner |
| Compare to Cozi | https://gethoneydew.app/why-honeydew/vs-cozi | See why families switch | Better AI + multi-family |
| Compare to Skylight | https://gethoneydew.app/why-honeydew/vs-skylight | Smarter than digital frames | Real-time family planning |
| Family Planner Hub | https://gethoneydew.app/hubs/ai-family-planner | AI tips and workflows | Plan faster, stress less |
| Co-Parenting Hub | https://gethoneydew.app/hubs/co-parenting | Coordinate across households | Shared calendars and lists |
| Support | https://gethoneydew.app/support | Get help fast | FAQs and guidance |
| Blog | https://gethoneydew.app/blog | Guides for busy parents | Best apps + comparisons |
| About Honeydew | https://gethoneydew.app/about | The mission and team | Built for families |

Tip: Keep at least 6 sitelinks active for maximum eligibility and rotate seasonally.

### Image & Video Asset Recommendations
Use existing site assets where possible and add a few purpose-built creatives for ads.

**Recommended existing images (crop into required sizes):**
- 1.91:1 landscape: `public/og-image-ai.jpg`, `public/blog-images/honeydew-calendar-hero.jpg`
- 1:1 square: `public/blog-images/honeydew-app-screenshot.jpg`, `public/blog-images/honeydew-ai-agent.jpg`
- 4:5 portrait: `public/blog-images/honeydew-working-parents.jpg`, `public/blog-images/honeydew-multi-family.jpg`
- Logos: `public/logo.png`, `public/assets/honeydew-logo-with-wordmark.svg` (export PNG)

**Suggested new image assets to create (high-impact):**
- Lifestyle + app composite: busy parent + Honeydew calendar overlay (1200x628 and 1200x1200)
- Voice-first moment: “Add soccer practice” voice bubble + calendar update (1200x1200)
- Multi-family coordination: split-screen of two households sharing events (960x1200)

**Recommended video assets (build these first):**
- 15s vertical (1080x1920): Voice add → calendar auto-populates → family gets updates.
- 30s square (1080x1080): 3 feature beats (AI agent, multi-family, two-way sync).
- 6s bumper (1920x1080): “Organize your family in seconds” with app UI.

**Existing video you can use now:**
- `public/reviewer/honeydew-google-calendar-review.webm` (trim to 15–30s if needed)

### Conversion Events (Google Ads + GA4)

| Event | Category | Value | Tracks |
|-------|----------|-------|--------|
| `signup_complete` | Primary | $2.00 | User creates account |
| `family_created` | Secondary | $1.00 | Creates/joins family |
| `first_ai_use` | Secondary | $1.50 | Uses AI feature |
| `trial_started` | Primary | $5.00 | Starts paid trial |
| `purchase_complete` | Primary | Dynamic | Completes purchase |

### Optimization Schedule

| Time | Action |
|------|--------|
| Every 6 hours | Check keyword performance |
| Daily | Pause losers (>$3 spent, 0 conv) |
| Daily | Boost winners (+20% bid) |
| Weekly | Reallocate budget to top ad groups |
| Weekly | Generate performance report |

---

## Conversion Tracking Implementation

## Manager vs Client Accounts (Important)

Google Ads uses a **Manager (MCC)** account to oversee one or more **Client** accounts where ads actually run.

- **Manager (MCC)**: use for `GOOGLE_ADS_LOGIN_CUSTOMER_ID`
- **Client**: use for `GOOGLE_ADS_CUSTOMER_ID`

The CLI now auto-resolves to a valid client account if the configured ID is not accessible.

### On app.gethoneydew.app

Add this script to your web app:

```html
<!-- In <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4X6LYQ296G"></script>
<script src="/tracking/honeydew-tracking.js"></script>
<script>
  HoneydewTracking.init({
    ga4MeasurementId: 'G-4X6LYQ296G',
    googleAdsId: 'AW-XXXXXXXXX', // Your Google Ads conversion ID
    debug: false
  });
</script>
```

### Event Implementation

```javascript
// After signup
HoneydewTracking.setUserId(user.id);
HoneydewTracking.trackSignup({ method: 'google' }); // or 'apple', 'email'

// After creating family
HoneydewTracking.track('family_created', { 
  family_size: memberCount,
  family_name: familyName 
});

// After first AI use
HoneydewTracking.track('first_ai_use', { 
  tool: 'list_generator',
  prompt_type: 'packing_list'
});

// After purchase
HoneydewTracking.trackPurchase({
  value: 7.99,
  currency: 'USD',
  plan: 'monthly',
  transactionId: stripePaymentId
});
```

---

## What I Need From You

### Required (To Go Live)

1. **Google Ads Customer ID**
   - Where: Google Ads → Settings → Account settings
   - Format: XXX-XXX-XXXX

2. **Developer Token**
   - Where: Apply at Google Ads API Center
   - Timeline: 24-48 hours for approval

3. **OAuth Credentials**
   - Where: Google Cloud Console
   - Need: Client ID, Client Secret, Refresh Token

4. **Payment Method**
   - Add credit card to Google Ads account
   - Set daily budget limit of $5

### Optional (Enhanced Tracking)

5. **Google Ads Conversion ID**
   - Where: Google Ads → Tools → Conversions
   - Format: AW-XXXXXXXXX

6. **Access to app.gethoneydew.app codebase**
   - To implement tracking SDK
   - Or: Copy `honeydew-tracking.js` to your app

---

## Files Created

| File | Purpose |
|------|---------|
| `scripts/google-ads-cli.js` | Campaign management CLI |
| `scripts/google-ads-config.json` | Campaign configuration |
| `scripts/honeydew-tracking.js` | Web app tracking SDK |
| `scripts/ads-optimizer.js` | Automated optimization (next) |

---

## Running the System

### Manual Mode (Current)

```bash
# View status
node scripts/google-ads-cli.js status

# Generate report
node scripts/google-ads-cli.js report --days=7

# Run optimization
node scripts/google-ads-cli.js optimize
```

### Autonomous Mode (With Credentials)

Once credentials are configured, the system will:

1. **Create campaign** with optimized structure
2. **Monitor performance** every 6 hours
3. **Pause underperformers** automatically
4. **Boost winners** with increased bids
5. **Send reports** daily/weekly to pete@gethoneydew.app
6. **Alert on issues** (budget depleted, no conversions, etc.)

---

## Budget Allocation Strategy

### Week 1: Learning Phase
- Split budget evenly across ad groups
- Gather baseline CTR and conversion data
- No aggressive optimization

### Week 2+: Optimization Phase
- Reallocate budget to best-performing ad groups
- Pause keywords with $3+ spend and 0 conversions
- Increase bids on converting keywords

### Expected Results

| Metric | Conservative | Optimistic |
|--------|--------------|------------|
| Daily Clicks | 2-3 | 5-10 |
| Weekly Signups | 1-2 | 4-8 |
| Cost Per Signup | $4-6 | $2-3 |
| Monthly Spend | $150 | $150 |
| Monthly Signups | 8-12 | 20-30 |

---

## Post-Conversion Analytics

The tracking SDK captures full funnel behavior:

### Activation Metrics
- Signup → Family Created rate
- Family Created → First List rate
- First List → AI Feature Use rate
- Time to activation (signup → active user)

### Revenue Metrics
- Signup → Trial rate
- Trial → Paid rate
- Average revenue per user
- Payback period (CAC / ARPU)

### Retention Metrics
- D1, D7, D30 return rates
- Feature adoption by cohort
- Churn prediction signals

### Viral Metrics
- Invites sent per user
- Invite acceptance rate
- Viral coefficient (K-factor)

---

## Troubleshooting

### "Credentials not configured"
```bash
# Check environment variables
echo $GOOGLE_ADS_CUSTOMER_ID
echo $GOOGLE_ADS_DEVELOPER_TOKEN
```

### "API permission denied"
- Ensure developer token is approved
- Check OAuth credentials have correct scopes
- Verify service account has access

### "No conversions tracking"
- Verify tracking script is loaded on app.gethoneydew.app
- Check browser console for errors
- Use debug mode: `HoneydewTracking.init({ debug: true })`

### "Campaign not spending"
- Check keywords aren't too restrictive
- Verify bid amounts are competitive
- Ensure targeting isn't too narrow

---

## Next Steps

1. **You provide:** Google Ads Customer ID + payment method
2. **I set up:** Campaign structure and conversion tracking
3. **You implement:** Tracking SDK on app.gethoneydew.app
4. **I configure:** Automated optimization and reporting
5. **Launch:** Enable campaign and start learning!

---

## Contact

Questions? The system is designed to be fully autonomous once credentials are configured. I'll handle:
- Campaign creation and management
- Daily optimization cycles
- Performance reporting
- Alert handling

All you need to do is provide the credentials and implement the tracking SDK.
