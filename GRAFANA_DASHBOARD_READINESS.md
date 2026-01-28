# Grafana Dashboard Readiness

This repo does not include Grafana configuration or data source setup. Use this checklist to confirm dashboards are ready for acquisition + retention analysis.

## Required Data Sources

- App event stream (retention + engagement)
- Google Ads spend + keyword performance
- GA4 traffic + behavior

## Required Events (App)

Acquisition:
- `signup_complete`

Retention:
- `d1_return`
- `d7_return`
- `d30_return`

Engagement:
- `first_ai_use`
- `family_created`
- `first_list_created`

## Minimum Dashboards

1. **Acquisition Overview**
   - Spend, CPC, CTR, CPA
   - Signups and D1 retention (by campaign/ad group)

2. **Retention Funnel**
   - Signup → D1 → D7 → D30
   - Cohort retention over time

3. **Behavior**
   - Feature usage (AI use, list creation, calendar connect)
   - Session depth and return frequency

## Readiness Checks

- Google Ads conversion action for `d1_return` exists and is primary.
- GA4 captures `d1_return`, `d7_return`, `d30_return`.
- Attribution present: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`.
- Dashboards show metrics by campaign/ad group.

## Next Steps (if not wired yet)

- Provide Grafana URL and data source details (Prometheus/Loki/BigQuery/etc).
- Confirm where GA4 + Ads data is ingested (or add a sync job).






