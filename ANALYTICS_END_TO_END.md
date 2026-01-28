# End-to-End Analytics Checklist

This checklist defines the minimum wiring for full-funnel analytics across ads → site → app → retention.

## 1) Marketing Site (gethoneydew.app)

- GA4 installed (measurement ID present in `index.html`).
- Google Ads conversion tag configured.
- CTA clicks, app clicks, and conversion events tracked.

## 2) App Tracking (app.gethoneydew.app)

- Honeydew tracking SDK loaded from `https://gethoneydew.app/tracking/honeydew-tracking.js`.
- On signup:
  - `HoneydewTracking.setUserId(user.id)`
  - `HoneydewTracking.trackSignup({ method })`
- On key actions:
  - `family_created`
  - `first_ai_use`
  - `calendar_connected`
- Retention:
  - `d1_return`, `d7_return`, `d30_return` (automatically emitted after signup)

## 3) Conversions (Google Ads + GA4)

- Primary conversion: `d1_return`
- Secondary: `signup_complete`, `family_created`, `first_ai_use`

Run:
```bash
node scripts/ga4-cli.js setup-funnel --property=properties/XXXXXX
```

## 4) Attribution

- UTM parameters stored and reused across sessions.
- `gclid` captured for Google Ads.

## 5) Reporting

- Google Ads report: `npm run ads:report`
- GA4 conversions: `node scripts/ga4-cli.js list-conversions --property=properties/XXXXXX`
- Search Console: `npm run gsc:wow`

## 6) Grafana / Dashboards

This repo does not include Grafana configuration. To enable end-to-end dashboards:

- Ensure GA4 + Ads data is ingested into your data warehouse.
- Connect Grafana to that warehouse (or to a streaming pipeline).
- Build the three core dashboards:
  - Acquisition Overview
  - Retention Funnel
  - Behavior & Activation






