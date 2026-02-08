# Website Manager Agent

This agent runs a daily, exhaustive review of the Honeydew website content and funnel
signals, with a focus on driving traffic to the web and mobile apps. It produces a
report and updates its own focus areas based on repeated issues.

## Run

```bash
npm run website-manager
```

## Outputs

- Reports: `reports/website-manager/YYYY-MM-DD.md`
- State: `scripts/website-manager-agent-state.json`

## Configure

Edit `scripts/website-manager-agent-config.json` to tune:

- Required frontmatter fields
- CTA patterns and app links
- Blog quality checks (FAQ, tables, TikTok ideas)
- Required CTA usage in key UI components
- Self-improvement thresholds

## Daily Scheduling

Use cron or launchd to run daily:

```bash
# Example (cron): run daily at 7:15am
15 7 * * * cd /path/to/HoneydewWebsite && npm run website-manager
```

## Self-Improvement Logic

Each run updates `scripts/website-manager-agent-state.json`:

- Repeated issue types become focus areas
- Focus areas decay after 14 days with no repeats
- Reports list active focus areas so the agent can prioritize fixes
