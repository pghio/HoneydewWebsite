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
  console.log(`  sitemap-list       List submitted sitemaps`)
  console.log(`  sitemap-submit     Submit a sitemap URL`)
  console.log(`  site-list          List all accessible properties\n`)
  console.log(`Common options:`)
  console.log(`  --property=<url>   Property URL (e.g. https://www.honeydew.app)`)
  console.log(`  --start=<date>     Start date (YYYY-MM-DD)`)
  console.log(`  --end=<date>       End date (YYYY-MM-DD)`)
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