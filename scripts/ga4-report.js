#!/usr/bin/env node

/**
 * GA4 Data API Reporting CLI
 *
 * Pull real traffic, conversion, and engagement data from GA4.
 *
 * Usage:
 *   node scripts/ga4-report.js overview --days=30
 *   node scripts/ga4-report.js conversions --days=7
 *   node scripts/ga4-report.js pages --days=30 --limit=20
 *   node scripts/ga4-report.js sources --days=30
 *   node scripts/ga4-report.js events --days=7
 *   node scripts/ga4-report.js full-report --days=30
 *   node scripts/ga4-report.js wow --days=7
 *
 * Authentication:
 *   Uses the same service account as gsc-cli.js.
 *   Set GOOGLE_APPLICATION_CREDENTIALS or pass --credentials=./path.json
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data'
import fs from 'fs'
import path from 'path'
import os from 'os'

// GA4 Property ID (numeric, from measurement ID G-4X6LYQ296G)
const DEFAULT_PROPERTY_ID = '487238294'

// ─── Helpers ────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2)
  if (args.length === 0) return { command: null, options: {} }
  const [command, ...rest] = args
  const options = {}
  rest.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value = 'true'] = arg.substring(2).split('=')
      options[key] = value
    }
  })
  return { command, options }
}

function resolveCredentialPath(inputPath) {
  if (!inputPath) return null
  if (inputPath.startsWith('~')) return path.join(os.homedir(), inputPath.slice(1))
  return path.resolve(process.cwd(), inputPath)
}

function getClient(options) {
  const explicitPath = options.credentials || options.keyFile || options.keyfile
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const keyPath = resolveCredentialPath(explicitPath || envPath) ||
    path.join(process.cwd(), 'gsc-service-account.json')

  if (!fs.existsSync(keyPath)) {
    throw new Error(`Credentials not found at ${keyPath}. Provide --credentials=./path.json or set GOOGLE_APPLICATION_CREDENTIALS.`)
  }

  return new BetaAnalyticsDataClient({ keyFilename: keyPath })
}

function toIsoDate(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

function todayUtc() {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

function addDays(date, n) {
  const d = new Date(date.getTime())
  d.setUTCDate(d.getUTCDate() + n)
  return d
}

function dateRange(days) {
  const end = addDays(todayUtc(), -1) // yesterday (avoid partial today)
  const start = addDays(end, -(days - 1))
  return { startDate: toIsoDate(start), endDate: toIsoDate(end) }
}

function previousDateRange(days) {
  const currentEnd = addDays(todayUtc(), -1)
  const currentStart = addDays(currentEnd, -(days - 1))
  const prevEnd = addDays(currentStart, -1)
  const prevStart = addDays(prevEnd, -(days - 1))
  return { startDate: toIsoDate(prevStart), endDate: toIsoDate(prevEnd) }
}

function fmt(n, decimals = 0) {
  if (n == null) return '—'
  const num = Number(n)
  if (!Number.isFinite(num)) return '—'
  return decimals > 0 ? num.toFixed(decimals) : num.toLocaleString('en-US')
}

function fmtPct(n) {
  if (n == null) return '—'
  return `${(Number(n) * 100).toFixed(2)}%`
}

function fmtDelta(current, previous) {
  const c = Number(current || 0)
  const p = Number(previous || 0)
  const delta = c - p
  const pct = p > 0 ? (delta / p) * 100 : c > 0 ? 100 : 0
  const sign = delta > 0 ? '+' : ''
  return `${sign}${fmt(delta)} (${sign}${pct.toFixed(1)}%)`
}

function fmtSeconds(seconds) {
  const s = Number(seconds || 0)
  const m = Math.floor(s / 60)
  const sec = Math.round(s % 60)
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
}

function printTable(headers, rows) {
  const widths = headers.map((h, i) => {
    const maxCell = rows.reduce((max, row) => Math.max(max, String(row[i] ?? '').length), h.length)
    return maxCell + 2
  })
  const drawRow = row => row.map((cell, i) => String(cell ?? '').padEnd(widths[i])).join('| ')
  console.log(drawRow(headers))
  console.log('-'.repeat(widths.reduce((s, w) => s + w, 0) + headers.length * 2))
  rows.forEach(row => console.log(drawRow(row)))
}

function extractRows(response) {
  return (response[0]?.rows || [])
}

function dimVal(row, idx = 0) {
  return row.dimensionValues?.[idx]?.value || ''
}

function metricVal(row, idx = 0) {
  return Number(row.metricValues?.[idx]?.value || 0)
}

// ─── API Queries ────────────────────────────────────────────

async function queryReport(client, propertyId, { startDate, endDate, dimensions = [], metrics = [], orderBys = [], limit = 100, dimensionFilter, metricFilter }) {
  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    metrics: metrics.map(m => typeof m === 'string' ? { name: m } : m),
  }
  if (dimensions.length > 0) {
    request.dimensions = dimensions.map(d => typeof d === 'string' ? { name: d } : d)
  }
  if (orderBys.length > 0) {
    request.orderBys = orderBys
  }
  if (limit) {
    request.limit = limit
  }
  if (dimensionFilter) {
    request.dimensionFilter = dimensionFilter
  }
  if (metricFilter) {
    request.metricFilter = metricFilter
  }
  return client.runReport(request)
}

// ─── Commands ───────────────────────────────────────────────

async function runOverview(client, propertyId, options) {
  const days = Number(options.days || 30)
  const range = dateRange(days)

  const response = await queryReport(client, propertyId, {
    ...range,
    metrics: [
      'activeUsers',
      'newUsers',
      'sessions',
      'screenPageViews',
      'averageSessionDuration',
      'bounceRate',
      'engagedSessions',
      'eventCount',
    ],
  })

  const rows = extractRows(response)
  if (rows.length === 0) {
    console.log('No data for this period.')
    return
  }

  const r = rows[0]
  const users = metricVal(r, 0)
  const newUsers = metricVal(r, 1)
  const sessions = metricVal(r, 2)
  const pageViews = metricVal(r, 3)
  const avgDuration = metricVal(r, 4)
  const bounceRate = metricVal(r, 5)
  const engagedSessions = metricVal(r, 6)
  const totalEvents = metricVal(r, 7)
  const engagementRate = sessions > 0 ? engagedSessions / sessions : 0

  console.log(`\n📊 GA4 Overview  (${range.startDate} → ${range.endDate}, ${days}d)`)
  console.log(`Property: ${propertyId}\n`)

  printTable(
    ['Metric', 'Value'],
    [
      ['Active Users', fmt(users)],
      ['New Users', fmt(newUsers)],
      ['Sessions', fmt(sessions)],
      ['Page Views', fmt(pageViews)],
      ['Avg Session Duration', fmtSeconds(avgDuration)],
      ['Bounce Rate', fmtPct(bounceRate)],
      ['Engagement Rate', fmtPct(engagementRate)],
      ['Engaged Sessions', fmt(engagedSessions)],
      ['Total Events', fmt(totalEvents)],
    ]
  )
}

async function runWow(client, propertyId, options) {
  const days = Number(options.days || 7)
  const current = dateRange(days)
  const previous = previousDateRange(days)

  const [curRes, prevRes] = await Promise.all([
    queryReport(client, propertyId, {
      ...current,
      metrics: ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'averageSessionDuration', 'bounceRate', 'engagedSessions'],
    }),
    queryReport(client, propertyId, {
      ...previous,
      metrics: ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'averageSessionDuration', 'bounceRate', 'engagedSessions'],
    }),
  ])

  const curRow = extractRows(curRes)[0]
  const prevRow = extractRows(prevRes)[0]

  const m = (row, idx) => (row ? metricVal(row, idx) : 0)

  console.log(`\n📈 GA4 Period-over-Period  (${days}d current vs prior ${days}d)`)
  console.log(`Current:  ${current.startDate} → ${current.endDate}`)
  console.log(`Previous: ${previous.startDate} → ${previous.endDate}\n`)

  printTable(
    ['Metric', 'Current', 'Previous', 'Change'],
    [
      ['Active Users', fmt(m(curRow, 0)), fmt(m(prevRow, 0)), fmtDelta(m(curRow, 0), m(prevRow, 0))],
      ['New Users', fmt(m(curRow, 1)), fmt(m(prevRow, 1)), fmtDelta(m(curRow, 1), m(prevRow, 1))],
      ['Sessions', fmt(m(curRow, 2)), fmt(m(prevRow, 2)), fmtDelta(m(curRow, 2), m(prevRow, 2))],
      ['Page Views', fmt(m(curRow, 3)), fmt(m(prevRow, 3)), fmtDelta(m(curRow, 3), m(prevRow, 3))],
      ['Avg Session Duration', fmtSeconds(m(curRow, 4)), fmtSeconds(m(prevRow, 4)), fmtDelta(m(curRow, 4), m(prevRow, 4))],
      ['Bounce Rate', fmtPct(m(curRow, 5)), fmtPct(m(prevRow, 5)), fmtDelta(m(curRow, 5), m(prevRow, 5))],
      ['Engaged Sessions', fmt(m(curRow, 6)), fmt(m(prevRow, 6)), fmtDelta(m(curRow, 6), m(prevRow, 6))],
    ]
  )
}

async function runConversions(client, propertyId, options) {
  const days = Number(options.days || 30)
  const range = dateRange(days)

  // Key conversion events
  const conversionEvents = ['cta_click', 'app_store_click', 'signup_complete', 'blog_engagement', 'comparison_engagement']

  const response = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['eventName'],
    metrics: ['eventCount', 'totalUsers'],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: conversionEvents,
        },
      },
    },
    limit: 50,
  })

  const rows = extractRows(response)

  console.log(`\n🎯 Conversion Events  (${range.startDate} → ${range.endDate}, ${days}d)\n`)

  if (rows.length === 0) {
    console.log('No conversion events found in this period.')
    console.log('(Events tracked: cta_click, app_store_click, signup_complete, blog_engagement, comparison_engagement)')
    return
  }

  printTable(
    ['Event', 'Count', 'Unique Users'],
    rows
      .sort((a, b) => metricVal(b, 0) - metricVal(a, 0))
      .map(row => [dimVal(row), fmt(metricVal(row, 0)), fmt(metricVal(row, 1))])
  )

  // Also get CTA click breakdown by source
  const ctaResponse = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['eventName', 'customEvent:click_source'],
    metrics: ['eventCount'],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: ['cta_click', 'app_store_click'],
        },
      },
    },
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 20,
  })

  const ctaRows = extractRows(ctaResponse)
  if (ctaRows.length > 0) {
    console.log(`\n🔗 CTA Click Breakdown by Source:\n`)
    printTable(
      ['Event', 'Source', 'Count'],
      ctaRows.map(row => [dimVal(row, 0), dimVal(row, 1) || '(not set)', fmt(metricVal(row, 0))])
    )
  }
}

async function runPages(client, propertyId, options) {
  const days = Number(options.days || 30)
  const limit = Number(options.limit || 20)
  const range = dateRange(days)

  const response = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['pagePath'],
    metrics: ['screenPageViews', 'activeUsers', 'averageSessionDuration', 'bounceRate', 'engagedSessions'],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  })

  const rows = extractRows(response)
  console.log(`\n📄 Top Pages  (${range.startDate} → ${range.endDate}, ${days}d)\n`)

  if (rows.length === 0) {
    console.log('No page data for this period.')
    return
  }

  printTable(
    ['Page', 'Views', 'Users', 'Avg Duration', 'Bounce Rate', 'Engaged'],
    rows.map(row => [
      dimVal(row).length > 70 ? dimVal(row).substring(0, 67) + '...' : dimVal(row),
      fmt(metricVal(row, 0)),
      fmt(metricVal(row, 1)),
      fmtSeconds(metricVal(row, 2)),
      fmtPct(metricVal(row, 3)),
      fmt(metricVal(row, 4)),
    ])
  )
}

async function runSources(client, propertyId, options) {
  const days = Number(options.days || 30)
  const range = dateRange(days)

  // Source/Medium breakdown
  const response = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['sessionSourceMedium'],
    metrics: ['sessions', 'activeUsers', 'newUsers', 'screenPageViews', 'averageSessionDuration', 'engagedSessions'],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 25,
  })

  const rows = extractRows(response)
  console.log(`\n🌐 Traffic Sources  (${range.startDate} → ${range.endDate}, ${days}d)\n`)

  if (rows.length === 0) {
    console.log('No source data for this period.')
    return
  }

  printTable(
    ['Source / Medium', 'Sessions', 'Users', 'New Users', 'Page Views', 'Avg Duration', 'Engaged'],
    rows.map(row => [
      dimVal(row).length > 40 ? dimVal(row).substring(0, 37) + '...' : dimVal(row),
      fmt(metricVal(row, 0)),
      fmt(metricVal(row, 1)),
      fmt(metricVal(row, 2)),
      fmt(metricVal(row, 3)),
      fmtSeconds(metricVal(row, 4)),
      fmt(metricVal(row, 5)),
    ])
  )

  // LLM referrals
  console.log(`\n🤖 LLM Referral Detection:\n`)
  const llmResponse = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['sessionSource'],
    metrics: ['sessions', 'activeUsers'],
    dimensionFilter: {
      orGroup: {
        expressions: [
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'chatgpt', caseSensitive: false } } },
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'perplexity', caseSensitive: false } } },
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'claude', caseSensitive: false } } },
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'gemini', caseSensitive: false } } },
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'copilot', caseSensitive: false } } },
          { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'openai', caseSensitive: false } } },
        ],
      },
    },
    limit: 20,
  })

  const llmRows = extractRows(llmResponse)
  if (llmRows.length > 0) {
    printTable(
      ['LLM Source', 'Sessions', 'Users'],
      llmRows.map(row => [dimVal(row), fmt(metricVal(row, 0)), fmt(metricVal(row, 1))])
    )
  } else {
    console.log('No LLM referrals detected in this period.')
    console.log('(Checking for: chatgpt, perplexity, claude, gemini, copilot, openai in session source)')
  }
}

async function runEvents(client, propertyId, options) {
  const days = Number(options.days || 7)
  const limit = Number(options.limit || 30)
  const range = dateRange(days)

  const response = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['eventName'],
    metrics: ['eventCount', 'totalUsers'],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit,
  })

  const rows = extractRows(response)
  console.log(`\n⚡ All Events  (${range.startDate} → ${range.endDate}, ${days}d)\n`)

  if (rows.length === 0) {
    console.log('No event data for this period.')
    return
  }

  printTable(
    ['Event Name', 'Count', 'Unique Users'],
    rows.map(row => [dimVal(row), fmt(metricVal(row, 0)), fmt(metricVal(row, 1))])
  )
}

async function runDaily(client, propertyId, options) {
  const days = Number(options.days || 30)
  const range = dateRange(days)

  const response = await queryReport(client, propertyId, {
    ...range,
    dimensions: ['date'],
    metrics: ['activeUsers', 'sessions', 'screenPageViews'],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
    limit: 366,
  })

  const rows = extractRows(response)
  console.log(`\n📅 Daily Trend  (${range.startDate} → ${range.endDate}, ${days}d)\n`)

  if (rows.length === 0) {
    console.log('No daily data for this period.')
    return
  }

  printTable(
    ['Date', 'Users', 'Sessions', 'Page Views'],
    rows.map(row => {
      const d = dimVal(row)
      const formatted = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`
      return [formatted, fmt(metricVal(row, 0)), fmt(metricVal(row, 1)), fmt(metricVal(row, 2))]
    })
  )
}

async function runFullReport(client, propertyId, options) {
  const days = Number(options.days || 30)
  const opts = { ...options, days: String(days) }

  console.log('═'.repeat(70))
  console.log(`  HONEYDEW GA4 FULL REPORT — Last ${days} Days`)
  console.log('═'.repeat(70))

  await runOverview(client, propertyId, opts)
  console.log('')

  // Period comparison for the same number of days
  await runWow(client, propertyId, opts)
  console.log('')

  await runConversions(client, propertyId, opts)
  console.log('')

  await runPages(client, propertyId, { ...opts, limit: '15' })
  console.log('')

  await runSources(client, propertyId, opts)
  console.log('')

  await runEvents(client, propertyId, { ...opts, limit: '20' })

  console.log('\n' + '═'.repeat(70))
  console.log('  END OF REPORT')
  console.log('═'.repeat(70))
}

// ─── Main ───────────────────────────────────────────────────

function printHelp() {
  console.log(`Honeydew GA4 Reporting CLI

Usage:
  node scripts/ga4-report.js <command> [options]

Commands:
  overview        Site-wide traffic summary (users, sessions, page views, bounce rate)
  wow             Period-over-period comparison (current vs previous N days)
  conversions     Conversion events breakdown (CTA clicks, app downloads, signups)
  pages           Top pages by views with engagement metrics
  sources         Traffic source/medium breakdown + LLM referral detection
  events          All events ranked by count
  daily           Daily trend (users, sessions, page views per day)
  full-report     Run ALL reports in one go

Options:
  --days=<number>       Number of days to report on (default: 30)
  --limit=<number>      Row limit for pages/events (default: 20)
  --credentials=<path>  Path to service account JSON
  --property=<id>       GA4 property ID (default: ${DEFAULT_PROPERTY_ID})

Examples:
  node scripts/ga4-report.js overview --days=7
  node scripts/ga4-report.js conversions --days=30
  node scripts/ga4-report.js full-report --days=30
  node scripts/ga4-report.js wow --days=7
  node scripts/ga4-report.js sources --days=90
  node scripts/ga4-report.js daily --days=14

Authentication:
  • Set GOOGLE_APPLICATION_CREDENTIALS to your service-account JSON path
  • Or pass --credentials=./gsc-service-account.json per invocation
  • The service account needs "Viewer" role in GA4 Admin → Property Access Management
`)
}

async function main() {
  const { command, options } = parseArgs(process.argv)

  if (!command || options.help) {
    printHelp()
    process.exit(0)
  }

  try {
    const client = getClient(options)
    const propertyId = options.property || DEFAULT_PROPERTY_ID

    switch (command) {
      case 'overview':
        await runOverview(client, propertyId, options)
        break
      case 'wow':
      case 'week-over-week':
        await runWow(client, propertyId, options)
        break
      case 'conversions':
        await runConversions(client, propertyId, options)
        break
      case 'pages':
        await runPages(client, propertyId, options)
        break
      case 'sources':
        await runSources(client, propertyId, options)
        break
      case 'events':
        await runEvents(client, propertyId, options)
        break
      case 'daily':
        await runDaily(client, propertyId, options)
        break
      case 'full-report':
      case 'full':
        await runFullReport(client, propertyId, options)
        break
      default:
        throw new Error(`Unknown command: ${command}. Run with --help for usage.`)
    }
  } catch (error) {
    console.error(`\n❌ ${error.message}`)
    if (options.debug) console.error(error)
    process.exit(1)
  }
}

main()
