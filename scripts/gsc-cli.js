#!/usr/bin/env node

// Google Search Console CLI helper
// Usage examples:
//   node scripts/gsc-cli.js search-analytics --property=https://www.honeydew.app --start=2025-10-01 --end=2025-10-26 --dimensions=query,page --limit=25
//   node scripts/gsc-cli.js sitemap-list --property=https://www.honeydew.app

import fs from 'fs'
import os from 'os'
import path from 'path'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/webmasters']

function parseArgs(argv) {
  const args = argv.slice(2)
  if (args.length === 0) {
    return { command: null, options: {} }
  }

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
  if (inputPath.startsWith('~')) {
    return path.join(os.homedir(), inputPath.slice(1))
  }
  return path.resolve(process.cwd(), inputPath)
}

async function getAuth(options) {
  if (process.env.GSC_KEY_JSON) {
    try {
      const credentials = JSON.parse(process.env.GSC_KEY_JSON)
      return new google.auth.GoogleAuth({ scopes: SCOPES, credentials })
    } catch (error) {
      throw new Error('Failed to parse GSC_KEY_JSON env variable. Ensure it contains valid JSON.')
    }
  }

  const explicitPath = options.credentials || options.keyFile || options.keyfile
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const keyPath = resolveCredentialPath(explicitPath || envPath)

  if (!keyPath) {
    throw new Error('No credentials found. Provide --credentials=/path/to/key.json, set GOOGLE_APPLICATION_CREDENTIALS, or set GSC_KEY_JSON.')
  }

  if (!fs.existsSync(keyPath)) {
    throw new Error(`Credential file not found at ${keyPath}`)
  }

  return new google.auth.GoogleAuth({ scopes: SCOPES, keyFile: keyPath })
}

async function runSearchAnalytics(searchconsole, options) {
  const property = options.property || options.site || options.siteUrl
  if (!property) {
    throw new Error('Missing required option: --property=https://www.honeydew.app')
  }

  const startDate = options.start || options.startDate
  const endDate = options.end || options.endDate
  if (!startDate || !endDate) {
    throw new Error('Missing required date range. Provide --start=YYYY-MM-DD and --end=YYYY-MM-DD')
  }

  const dimensions = options.dimensions ? options.dimensions.split(',').map(d => d.trim()).filter(Boolean) : []
  const rowLimit = options.limit ? Number(options.limit) : 10
  const startRow = options.offset ? Number(options.offset) : 0

  const requestBody = {
    startDate,
    endDate,
    startRow,
    rowLimit,
  }

  if (dimensions.length > 0) {
    requestBody.dimensions = dimensions
  }

  if (options.filter) {
    try {
      requestBody.dimensionFilterGroups = JSON.parse(options.filter)
    } catch (error) {
      throw new Error('Invalid JSON for --filter. Provide a valid JSON string for dimensionFilterGroups.')
    }
  }

  const { data } = await searchconsole.searchanalytics.query({
    siteUrl: property,
    requestBody,
  })

  if (!data.rows || data.rows.length === 0) {
    console.log('No rows returned for the given parameters.')
    return
  }

  const headers = [...(data.rows[0].keys || []), 'clicks', 'impressions', 'ctr', 'position']
  const rows = data.rows.map(row => {
    const keys = row.keys || []
    return [...keys, row.clicks ?? 0, row.impressions ?? 0, (row.ctr ?? 0).toFixed(4), (row.position ?? 0).toFixed(2)]
  })

  printTable(headers, rows)
}

function toIsoDateString(date) {
  // Always format as YYYY-MM-DD in UTC (GSC expects date-only strings).
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseIsoDate(iso) {
  // Treat YYYY-MM-DD as UTC midnight.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const d = new Date(Date.UTC(year, month, day))
  // Basic validation (Date will roll if invalid).
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month || d.getUTCDate() !== day) return null
  return d
}

function addUtcDays(date, days) {
  const d = new Date(date.getTime())
  d.setUTCDate(d.getUTCDate() + days)
  return d
}

function formatSignedNumber(n, digits = 0) {
  const num = Number(n || 0)
  const abs = Math.abs(num)
  const rounded = digits > 0 ? abs.toFixed(digits) : String(Math.round(abs))
  if (num > 0) return `+${rounded}`
  if (num < 0) return `-${rounded}`
  return rounded
}

function formatSignedPercent(pct, digits = 1) {
  const num = Number(pct || 0)
  const rounded = Math.abs(num).toFixed(digits)
  if (num > 0) return `+${rounded}%`
  if (num < 0) return `-${rounded}%`
  return `${rounded}%`
}

async function fetchTotals(searchconsole, { property, startDate, endDate, filterJson }) {
  const requestBody = {
    startDate,
    endDate,
    dimensions: ['date'],
    rowLimit: 1000,
  }

  if (filterJson) {
    try {
      requestBody.dimensionFilterGroups = JSON.parse(filterJson)
    } catch (error) {
      throw new Error('Invalid JSON for --filter. Provide a valid JSON string for dimensionFilterGroups.')
    }
  }

  const { data } = await searchconsole.searchanalytics.query({
    siteUrl: property,
    requestBody,
  })

  const rows = data.rows || []
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks ?? 0
      acc.impressions += row.impressions ?? 0
      return acc
    },
    { clicks: 0, impressions: 0 }
  )

  const ctr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0
  return { ...totals, ctr, daysReturned: rows.length }
}

async function runWeekOverWeek(searchconsole, options) {
  const property = options.property || options.site || options.siteUrl
  if (!property) {
    throw new Error('Missing required option: --property=https://www.honeydew.app')
  }

  const days = options.days ? Number(options.days) : 7
  if (!Number.isFinite(days) || days <= 0 || Math.floor(days) !== days) {
    throw new Error('Invalid --days value. Provide a positive integer, e.g. --days=7')
  }

  // Default end date: yesterday (UTC) so we avoid partial "today" data.
  const explicitEnd = options.end || options.endDate
  const endUtc =
    (explicitEnd ? parseIsoDate(explicitEnd) : null) ||
    addUtcDays(new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())), -1)

  if (!endUtc) {
    throw new Error('Invalid --end date. Provide --end=YYYY-MM-DD')
  }

  const currentStart = addUtcDays(endUtc, -(days - 1))
  const previousEnd = addUtcDays(currentStart, -1)
  const previousStart = addUtcDays(previousEnd, -(days - 1))

  const currentRange = {
    startDate: toIsoDateString(currentStart),
    endDate: toIsoDateString(endUtc),
  }
  const previousRange = {
    startDate: toIsoDateString(previousStart),
    endDate: toIsoDateString(previousEnd),
  }

  const filterJson = options.filter || null

  const current = await fetchTotals(searchconsole, {
    property,
    startDate: currentRange.startDate,
    endDate: currentRange.endDate,
    filterJson,
  })
  const previous = await fetchTotals(searchconsole, {
    property,
    startDate: previousRange.startDate,
    endDate: previousRange.endDate,
    filterJson,
  })

  const deltaClicks = current.clicks - previous.clicks
  const deltaImpressions = current.impressions - previous.impressions
  const deltaCtr = current.ctr - previous.ctr

  const pctClicks = previous.clicks > 0 ? (deltaClicks / previous.clicks) * 100 : current.clicks > 0 ? 100 : 0
  const pctImpressions =
    previous.impressions > 0 ? (deltaImpressions / previous.impressions) * 100 : current.impressions > 0 ? 100 : 0

  const headers = ['Period', 'Range', 'Clicks', 'Impressions', 'CTR']
  const rows = [
    [
      'Current',
      `${currentRange.startDate} → ${currentRange.endDate}`,
      Math.round(current.clicks),
      Math.round(current.impressions),
      `${(current.ctr * 100).toFixed(2)}%`,
    ],
    [
      'Previous',
      `${previousRange.startDate} → ${previousRange.endDate}`,
      Math.round(previous.clicks),
      Math.round(previous.impressions),
      `${(previous.ctr * 100).toFixed(2)}%`,
    ],
    [
      'Δ WoW',
      `${days}d vs prior ${days}d`,
      `${formatSignedNumber(deltaClicks)} (${formatSignedPercent(pctClicks)})`,
      `${formatSignedNumber(deltaImpressions)} (${formatSignedPercent(pctImpressions)})`,
      `${formatSignedPercent(deltaCtr * 100, 2)}`,
    ],
  ]

  console.log(`\n📈 Week-over-week (GSC)`)
  console.log(`Property: ${property}`)
  if (filterJson) console.log(`Filter: ${filterJson}`)
  console.log('')
  printTable(headers, rows)

  // Helpful warning if GSC didn't return full daily coverage (common for very new properties).
  if (options.debug) {
    console.log('')
    console.log(`Debug: current days returned=${current.daysReturned}, previous days returned=${previous.daysReturned}`)
  }
}

async function runSitemapList(searchconsole, options) {
  const property = options.property || options.site || options.siteUrl
  if (!property) {
    throw new Error('Missing required option: --property=https://www.honeydew.app')
  }

  const { data } = await searchconsole.sitemaps.list({ siteUrl: property })
  const sitemaps = data.sitemap || []

  if (sitemaps.length === 0) {
    console.log('No sitemaps registered for this property.')
    return
  }

  const headers = ['URL', 'Type', 'Last Submitted', 'Last Downloaded', 'Warnings', 'Errors']
  const rows = sitemaps.map(item => [
    item.path,
    item.type,
    item.lastSubmitted || '—',
    item.lastDownloaded || '—',
    item.warningCount ?? 0,
    item.errorCount ?? 0,
  ])

  printTable(headers, rows)
}

async function runSitemapSubmit(searchconsole, options) {
  const property = options.property || options.site || options.siteUrl
  if (!property) {
    throw new Error('Missing required option: --property=https://www.honeydew.app')
  }

  const path = options.path || options.url
  if (!path) {
    throw new Error('Missing required option: --path=https://www.honeydew.app/sitemap.xml')
  }

  await searchconsole.sitemaps.submit({
    siteUrl: property,
    feedpath: path,
  })

  console.log('✅ Sitemap submitted successfully:')
  console.log(`   Property: ${property}`)
  console.log(`   Sitemap: ${path}`)
  console.log('\n⏳ Check Search Console → Sitemaps for processing status.')
}

async function runSiteList(searchconsole) {
  const { data } = await searchconsole.sites.list()
  const sites = data.siteEntry || []

  if (sites.length === 0) {
    console.log('No sites found. Ensure the service account is added as a user in Search Console.')
    return
  }

  const headers = ['Site URL', 'Permission Level']
  const rows = sites.map(site => [
    site.siteUrl,
    site.permissionLevel
  ])

  printTable(headers, rows)
}

function printTable(headers, rows) {
  const columnWidths = headers.map((header, index) => {
    const maxCell = rows.reduce((max, row) => Math.max(max, String(row[index] ?? '').length), header.length)
    return maxCell + 2
  })

  const drawRow = row => row
    .map((cell, index) => String(cell ?? '').padEnd(columnWidths[index]))
    .join('| ')

  console.log(drawRow(headers))
  console.log('-'.repeat(columnWidths.reduce((sum, width) => sum + width, 0) + headers.length - 1))
  rows.forEach(row => console.log(drawRow(row)))
}

async function main() {
  const { command, options } = parseArgs(process.argv)

  if (!command || options.help) {
    printHelp()
    process.exit(0)
  }

  try {
    const auth = await getAuth(options)
    const searchconsole = google.searchconsole({ version: 'v1', auth })

    switch (command) {
      case 'search-analytics':
        await runSearchAnalytics(searchconsole, options)
        break
      case 'week-over-week':
      case 'wow':
        await runWeekOverWeek(searchconsole, options)
        break
      case 'sitemap-list':
        await runSitemapList(searchconsole, options)
        break
      case 'sitemap-submit':
        await runSitemapSubmit(searchconsole, options)
        break
      case 'site-list':
        await runSiteList(searchconsole)
        break
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  } catch (error) {
    console.error(`\n❌ ${error.message}`)
    if (options.debug) {
      console.error(error)
    }
    process.exit(1)
  }
}

function printHelp() {
  console.log(`Honeydew Search Console CLI\n`)
  console.log(`Usage:`)
  console.log(`  node scripts/gsc-cli.js <command> [options]\n`)
  console.log(`Commands:`)
  console.log(`  search-analytics   Query performance data for a property`)
  console.log(`  week-over-week     Week-over-week totals (clicks/impressions)`)
  console.log(`  sitemap-list       List submitted sitemaps`)
  console.log(`  sitemap-submit     Submit a sitemap URL`)
  console.log(`  site-list          List all accessible properties\n`)
  console.log(`Common options:`)
  console.log(`  --property=<url>   Property URL (e.g. https://www.honeydew.app)`)
  console.log(`  --start=<date>     Start date (YYYY-MM-DD)`)
  console.log(`  --end=<date>       End date (YYYY-MM-DD)`)
  console.log(`  --days=<number>    Days per period for week-over-week (default 7)`)
  console.log(`  --dimensions=a,b   Comma-separated dimensions (query,page,device,country)`)
  console.log(`  --limit=<number>   Row limit (default 10)`)
  console.log(`  --offset=<number>  Start row offset (default 0)`)
  console.log(`  --credentials=<path>  Optional path to service-account JSON`)
  console.log(`  --filter=<json>    Dimension filter groups JSON (advanced)`)
  console.log(`\nAuthentication:`)
  console.log(`  • Set GOOGLE_APPLICATION_CREDENTIALS to your service-account JSON path`)
  console.log(`  • Or set GSC_KEY_JSON with the raw JSON string (only for transient use)`)
  console.log(`  • Or pass --credentials=/path/to/key.json per invocation\n`)
}

main()