# CLI Integrations Map

This repo includes several CLI tools for content, analytics, and ad ops. This doc maps each CLI entrypoint, the npm script, required credentials, and where configuration lives.

## Quick Map (npm scripts)

| Script | Entrypoint | Purpose | External Service |
| --- | --- | --- | --- |
| `npm run schedule-content` | `scripts/schedule-content.js` | Content hopper scheduling | None |
| `npm run ga4-setup` | `scripts/ga4-cli.js` | Configure GA4 funnel events/dimensions | Google Analytics 4 |
| `npm run gsc:wow` | `scripts/gsc-cli.js` | Search Console week-over-week report | Google Search Console |
| `npm run ads:setup` | `scripts/google-ads-cli.js` | Create Google Ads campaign | Google Ads |
| `npm run ads:status` | `scripts/google-ads-cli.js` | Campaign status/health | Google Ads |
| `npm run ads:optimize` | `scripts/ads-optimizer.js` | Optimize bids/keywords | Google Ads |
| `npm run ads:report` | `scripts/ads-optimizer.js` | Performance report | Google Ads |
| `npm run ads:daemon` | `scripts/ads-optimizer.js` | Continuous optimizer loop | Google Ads |
| `npm run seo-check` | `scripts/seo-check.js` | Static SEO checks | None |
| `npm run generate-sitemap` | `scripts/generate-sitemap.js` | Sitemap generation | None |
| `npm run generate-blog-manifest` | `scripts/generate-blog-manifest.js` | Blog manifest build | None |
| `npm run prerender` | `scripts/prerender-seo.js` | Static prerendering | None |

## Required Environment Variables

Set these locally (shell export or `.env.local`) and in Vercel for production/preview builds.

| Variable | Used By | Description |
| --- | --- | --- |
| `GOOGLE_ADS_CUSTOMER_ID` | `google-ads-cli.js` | Ads account ID (format: `XXX-XXX-XXXX`) |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | `google-ads-cli.js` | Google Ads API developer token |
| `GOOGLE_ADS_CLIENT_ID` | `google-ads-cli.js` (future) | OAuth client ID |
| `GOOGLE_ADS_CLIENT_SECRET` | `google-ads-cli.js` (future) | OAuth client secret |
| `GOOGLE_ADS_REFRESH_TOKEN` | `google-ads-cli.js` (future) | OAuth refresh token |
| `GA4_PROPERTY_ID` | `ga4-cli.js` | GA4 property ID (`properties/123456789`) |
| `GOOGLE_APPLICATION_CREDENTIALS` | `ga4-cli.js`, `gsc-cli.js` | Path to service-account JSON |
| `GSC_KEY_JSON` | `gsc-cli.js` | Raw JSON (string) of service account key |

## Vercel Secrets / Environment Setup

These values should be stored as Vercel Environment Variables (never committed to git).

```bash
# Production
npx vercel env add GOOGLE_ADS_CUSTOMER_ID production
npx vercel env add GOOGLE_ADS_DEVELOPER_TOKEN production
npx vercel env add GOOGLE_ADS_CLIENT_ID production
npx vercel env add GOOGLE_ADS_CLIENT_SECRET production
npx vercel env add GOOGLE_ADS_REFRESH_TOKEN production
npx vercel env add GA4_PROPERTY_ID production

# Preview + Development (optional but recommended)
npx vercel env add GOOGLE_ADS_CUSTOMER_ID preview
npx vercel env add GOOGLE_ADS_DEVELOPER_TOKEN preview
npx vercel env add GA4_PROPERTY_ID preview
npx vercel env add GOOGLE_ADS_CUSTOMER_ID development
npx vercel env add GOOGLE_ADS_DEVELOPER_TOKEN development
npx vercel env add GA4_PROPERTY_ID development
```

If you prefer a local file, create `.env.local` with the variables above and load it in your shell.

## Google Ads (Campaign + Optimization)

- Config: `scripts/google-ads-config.json`
- CLI: `scripts/google-ads-cli.js`
- Optimizer: `scripts/ads-optimizer.js`
- Setup doc: `GOOGLE_ADS_SETUP.md`

### Common Commands
```bash
npm run ads:status
npm run ads:setup
npm run ads:report
npm run ads:optimize
```

## Google Analytics 4 (Admin)

- CLI: `scripts/ga4-cli.js`
- Requires a service account with GA4 access.

```bash
node scripts/ga4-cli.js list-properties
node scripts/ga4-cli.js setup-funnel --property=properties/123456789
```

## Google Search Console

- CLI: `scripts/gsc-cli.js`
- Auth: `GOOGLE_APPLICATION_CREDENTIALS` or `GSC_KEY_JSON`

```bash
node scripts/gsc-cli.js week-over-week --property=https://www.gethoneydew.app --days=7
node scripts/gsc-cli.js sitemap-list --property=https://www.gethoneydew.app
```

## Content Hopper

- CLI: `scripts/schedule-content.js`
- Config: `scripts/hopper-config.json`

```bash
npm run schedule-content
```

