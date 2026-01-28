---
title: "Google Tag Implementation Guide for Production App"
purpose: "Hand off instructions to integrate Google tag + conversion tracking into app.gethoneydew.app"
audience: "Engineering agent implementing production app changes"
---

# Google Tag Implementation Guide (Production App)

## Goal
Install the Google tag for **Google Ads + GA4** on `app.gethoneydew.app` and wire conversion events so Ads can optimize on real outcomes. This must be done in the **production app codebase** (not this marketing repo).

## Required IDs
Use these exact values:
- Google Ads ID: `AW-17819845292`
- GA4 Measurement ID: `G-4X6LYQ296G`

## 1) Add the Google tag script in the app HTML `<head>`
Add the global gtag snippet **once** on every page:

```html
<!-- Google tag (Google Ads + GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17819845292"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Google Ads config
  gtag('config', 'AW-17819845292');

  // GA4 config (page views should be tracked by router, not auto)
  gtag('config', 'G-4X6LYQ296G', {
    send_page_view: false,
    cookie_flags: 'SameSite=None;Secure'
  });
</script>
```

Where to place this:
- If the app is a SPA (React/Vue/etc), add to the **base HTML template** (e.g., `index.html`, `_document`, or server layout).
- Ensure this runs **once** and not duplicated in a component tree.

## 2) Track SPA page views on route changes
If this is a SPA, fire page views on route changes:

```js
// Example: on every route change
window.gtag?.('event', 'page_view', {
  page_path: window.location.pathname + window.location.search,
  page_location: window.location.href,
  page_title: document.title
});
```

## 3) Fire conversion events (Ads + GA4)
Use the Honeydew tracking helper (preferred) or direct gtag events.

### Option A: Use the existing tracking helper
If the app can load `/tracking/honeydew-tracking.js` from the marketing site:

```html
<script src="https://gethoneydew.app/tracking/honeydew-tracking.js"></script>
<script>
  HoneydewTracking.init({
    ga4MeasurementId: 'G-4X6LYQ296G',
    googleAdsId: 'AW-17819845292',
    debug: false
  });
</script>
```

Then trigger:
```js
HoneydewTracking.track('signup_complete', { method: 'email' });
HoneydewTracking.track('family_created', { family_size: 4 });
HoneydewTracking.track('first_ai_use', { tool: 'list_generator' });
HoneydewTracking.track('trial_started', { value: 5.00, currency: 'USD' });
HoneydewTracking.trackPurchase({ value: 7.99, currency: 'USD', plan: 'monthly', transactionId: 'stripe_txn_id' });
```

### Option B: Direct gtag conversions
Use Ads conversion tags directly:
```js
window.gtag?.('event', 'conversion', {
  send_to: 'AW-17819845292/CONVERSION_LABEL',
  value: 7.99,
  currency: 'USD',
  transaction_id: 'txn_123'
});
```

If conversion labels are not set, create them in Google Ads → Tools → Conversions, then replace `CONVERSION_LABEL`.

## 4) Validate
- Use Google Ads → Tools → Conversions → Tag diagnostics.
- Use GA4 Realtime to verify `page_view` and event hits.
- Optional: Google Tag Assistant to verify `AW-17819845292`.

## 5) Notes / Common Pitfalls
- Google Ads will show “Missing tag” if only installed on `gethoneydew.app` and not on `app.gethoneydew.app`.
- Avoid duplicate tag injection (one global snippet only).
- Ensure the app domain matches the conversion action’s “Website” URL in Google Ads.
- For iOS/Android app conversions, use app-specific SDKs; this guide is web-only.

## 6) Checklist
- [ ] Google tag script added to app HTML head
- [ ] GA4 config present with `send_page_view: false`
- [ ] Ads config present
- [ ] SPA page views tracked
- [ ] Key conversion events wired
- [ ] Tag diagnostics green in Google Ads
