#!/usr/bin/env node

import { BetaAnalyticsDataClient } from '@google-analytics/data'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadBlogArticles, splitArticlesByPublishDate } from './utils/blog-content.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const REPORT_DIR = path.join(ROOT_DIR, 'reports', 'content-performance')
const DEFAULT_PROPERTY_ID = '487238294'

function parseArgs(argv) {
  const options = {}
  argv.slice(2).forEach(arg => {
    if (!arg.startsWith('--')) return
    const [key, value = 'true'] = arg.slice(2).split('=')
    options[key] = value
  })
  return options
}

function resolveCredentialPath(inputPath) {
  if (!inputPath) return null
  if (inputPath.startsWith('~')) {
    return path.join(os.homedir(), inputPath.slice(1))
  }
  return path.resolve(process.cwd(), inputPath)
}

function getClient(options = {}) {
  const explicitPath = options.credentials || options.keyFile || options.keyfile
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const defaultPath = path.join(ROOT_DIR, 'gsc-service-account.json')
  const keyPath = resolveCredentialPath(explicitPath || envPath) || defaultPath

  if (!fs.existsSync(keyPath)) {
    throw new Error(`Credentials not found at ${keyPath}`)
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

function addDays(date, amount) {
  const next = new Date(date.getTime())
  next.setUTCDate(next.getUTCDate() + amount)
  return next
}

function dateRange(days) {
  const end = addDays(todayUtc(), -1)
  const start = addDays(end, -(days - 1))
  return { startDate: toIsoDate(start), endDate: toIsoDate(end) }
}

async function queryReport(client, propertyId, { startDate, endDate, dimensions = [], metrics = [], orderBys = [], limit = 100, dimensionFilter }) {
  return client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: dimensions.map(name => ({ name })),
    metrics: metrics.map(name => ({ name })),
    orderBys,
    limit,
    ...(dimensionFilter ? { dimensionFilter } : {}),
  })
}

function extractRows(response) {
  return response[0]?.rows || []
}

function metricVal(row, index = 0) {
  return Number(row.metricValues?.[index]?.value || 0)
}

function dimVal(row, index = 0) {
  return row.dimensionValues?.[index]?.value || ''
}

function buildPagePathFilter() {
  return {
    filter: {
      fieldName: 'pagePath',
      stringFilter: {
        matchType: 'BEGINS_WITH',
        value: '/blog/',
      },
    },
  }
}

function buildEventPathFilter(eventName) {
  return {
    andGroup: {
      expressions: [
        buildPagePathFilter(),
        {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'EXACT',
              value: eventName,
            },
          },
        },
      ],
    },
  }
}

function normalizeSlugFromPath(pagePath) {
  return pagePath.replace(/^\/blog\//, '').replace(/\/$/, '')
}

function buildFallbackResults(limit = 20) {
  const { published } = splitArticlesByPublishDate(loadBlogArticles())
  return published.slice(0, limit).map((article, index) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    coverImage: article.coverImage || article.image || `/og/${article.slug}.png`,
    pageViews: Math.max(limit - index, 1),
    avgSessionDuration: 0,
    scrollDepthEvents: 0,
    ctaClicks: 0,
    appStoreClicks: 0,
    ctaClickRate: 0,
    appStoreClickRate: 0,
    dataSource: 'fallback_manifest',
  }))
}

export async function fetchTopBlogContent({
  days = 90,
  limit = 20,
  propertyId = DEFAULT_PROPERTY_ID,
  credentials,
} = {}) {
  const range = dateRange(days)
  const manifestArticles = loadBlogArticles()
  const articleMap = new Map(manifestArticles.map(article => [article.slug, article]))

  let client
  try {
    client = getClient({ credentials })
  } catch (error) {
    return {
      range,
      rows: buildFallbackResults(limit),
      dataSource: 'fallback_manifest',
      warning: error.message,
    }
  }

  try {
    const [pageViewsRes, appClicksRes, ctaClicksRes, scrollRes] = await Promise.all([
      queryReport(client, propertyId, {
        ...range,
        dimensions: ['pagePath'],
        metrics: ['screenPageViews', 'averageSessionDuration'],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 200,
        dimensionFilter: buildPagePathFilter(),
      }),
      queryReport(client, propertyId, {
        ...range,
        dimensions: ['pagePath'],
        metrics: ['eventCount'],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 200,
        dimensionFilter: buildEventPathFilter('app_store_click'),
      }),
      queryReport(client, propertyId, {
        ...range,
        dimensions: ['pagePath'],
        metrics: ['eventCount'],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 200,
        dimensionFilter: buildEventPathFilter('cta_click'),
      }),
      queryReport(client, propertyId, {
        ...range,
        dimensions: ['pagePath'],
        metrics: ['eventCount'],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 200,
        dimensionFilter: buildEventPathFilter('scroll_depth'),
      }),
    ])

    const rollup = new Map()

    extractRows(pageViewsRes).forEach(row => {
      const slug = normalizeSlugFromPath(dimVal(row))
      rollup.set(slug, {
        slug,
        pageViews: metricVal(row, 0),
        avgSessionDuration: metricVal(row, 1),
        scrollDepthEvents: 0,
        ctaClicks: 0,
        appStoreClicks: 0,
      })
    })

    const mergeEventCount = (rows, key) => {
      extractRows(rows).forEach(row => {
        const slug = normalizeSlugFromPath(dimVal(row))
        const existing = rollup.get(slug) || {
          slug,
          pageViews: 0,
          avgSessionDuration: 0,
          scrollDepthEvents: 0,
          ctaClicks: 0,
          appStoreClicks: 0,
        }
        existing[key] = metricVal(row, 0)
        rollup.set(slug, existing)
      })
    }

    mergeEventCount(appClicksRes, 'appStoreClicks')
    mergeEventCount(ctaClicksRes, 'ctaClicks')
    mergeEventCount(scrollRes, 'scrollDepthEvents')

    const rows = [...rollup.values()]
      .map(row => {
        const article = articleMap.get(row.slug)
        const pageViews = row.pageViews || 0
        return {
          slug: row.slug,
          title: article?.title || row.slug,
          category: article?.category || 'Article',
          coverImage: article?.coverImage || article?.image || `/og/${row.slug}.png`,
          pageViews,
          avgSessionDuration: row.avgSessionDuration,
          scrollDepthEvents: row.scrollDepthEvents,
          ctaClicks: row.ctaClicks,
          appStoreClicks: row.appStoreClicks,
          ctaClickRate: pageViews > 0 ? row.ctaClicks / pageViews : 0,
          appStoreClickRate: pageViews > 0 ? row.appStoreClicks / pageViews : 0,
          dataSource: 'ga4',
        }
      })
      .sort((a, b) => b.pageViews - a.pageViews)
      .slice(0, limit)

    return { range, rows, dataSource: 'ga4' }
  } catch (error) {
    return {
      range,
      rows: buildFallbackResults(limit),
      dataSource: 'fallback_manifest',
      warning: error.message,
    }
  }
}

function formatSeconds(seconds) {
  const total = Math.round(Number(seconds || 0))
  const minutes = Math.floor(total / 60)
  const remainder = total % 60
  return minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`
}

function toMarkdownReport({ range, rows, dataSource, warning }) {
  const lines = [
    '# Content Performance Report',
    '',
    `- Range: ${range.startDate} to ${range.endDate}`,
    `- Data source: ${dataSource}`,
  ]

  if (warning) {
    lines.push(`- Warning: ${warning}`)
  }

  lines.push('', '| Article | Views | Avg Time | Scroll Events | CTA CTR | App Store CTR |')
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: |')

  rows.forEach(row => {
    lines.push(`| ${row.title} | ${row.pageViews} | ${formatSeconds(row.avgSessionDuration)} | ${row.scrollDepthEvents} | ${formatPercent(row.ctaClickRate)} | ${formatPercent(row.appStoreClickRate)} |`)
  })

  return `${lines.join('\n')}\n`
}

export async function generateContentPerformanceReport(options = {}) {
  const result = await fetchTopBlogContent(options)
  fs.mkdirSync(REPORT_DIR, { recursive: true })

  const reportBase = `top-blog-content-${result.range.endDate}`
  const jsonPath = path.join(REPORT_DIR, `${reportBase}.json`)
  const mdPath = path.join(REPORT_DIR, `${reportBase}.md`)

  fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
  fs.writeFileSync(mdPath, toMarkdownReport(result), 'utf8')

  return { ...result, jsonPath, mdPath }
}

async function main() {
  const options = parseArgs(process.argv)
  const limit = Number(options.limit || 20)
  const days = Number(options.days || 90)
  const propertyId = options.propertyId || DEFAULT_PROPERTY_ID
  const report = await generateContentPerformanceReport({
    days,
    limit,
    propertyId,
    credentials: options.credentials,
  })

  console.log(`📈 Content performance report generated (${report.dataSource})`)
  console.log(`   Range: ${report.range.startDate} → ${report.range.endDate}`)
  console.log(`   JSON: ${report.jsonPath}`)
  console.log(`   Markdown: ${report.mdPath}`)
  if (report.warning) {
    console.log(`   Warning: ${report.warning}`)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch(error => {
    console.error('❌ Failed to generate content performance report:', error)
    process.exit(1)
  })
}
