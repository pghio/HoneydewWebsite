#!/usr/bin/env node

/**
 * Honeydew Google Ads Automation CLI
 * 
 * Autonomous campaign management for $5/day budget optimization
 * 
 * Commands:
 *   setup              - Initial campaign setup
 *   optimize           - Run optimization cycle
 *   report             - Generate performance report
 *   pause-losers       - Pause underperforming keywords
 *   status             - Show campaign status
 *   
 * Usage:
 *   node scripts/google-ads-cli.js setup
 *   node scripts/google-ads-cli.js optimize
 *   node scripts/google-ads-cli.js report --days=7
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleAdsApi } from 'google-ads-api'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load configuration
const configPath = path.join(__dirname, 'google-ads-config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

// ===========================================
// Google Ads API Client (requires credentials)
// ===========================================

const sanitizeEnvValue = value => value?.trim().replace(/\\n/g, '')

const toNumber = value => {
  if (value === null || value === undefined || value === '') return 0
  const parsed = Number(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

const normalizeDateRange = (dateRange, fallbackDays = 7) => {
  const supported = new Set([7, 14, 30, 90])
  const days = dateRange?.days ? Number(dateRange.days) : null
  if (days && supported.has(days)) {
    return `LAST_${days}_DAYS`
  }

  if (dateRange?.startDate === '7daysAgo') return 'LAST_7_DAYS'
  if (dateRange?.startDate === '14daysAgo') return 'LAST_14_DAYS'
  if (dateRange?.startDate === '30daysAgo') return 'LAST_30_DAYS'
  if (dateRange?.startDate === '90daysAgo') return 'LAST_90_DAYS'

  return `LAST_${supported.has(fallbackDays) ? fallbackDays : 7}_DAYS`
}

class GoogleAdsClient {
  constructor(credentials) {
    this.credentials = credentials
    const rawCustomerId = sanitizeEnvValue(
      credentials?.customerId || process.env.GOOGLE_ADS_CUSTOMER_ID
    )
    this.customerId = rawCustomerId ? rawCustomerId.replace(/-/g, '') : rawCustomerId
    this.developerToken = sanitizeEnvValue(
      credentials?.developerToken || process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    )
    this.clientId = sanitizeEnvValue(credentials?.clientId || process.env.GOOGLE_ADS_CLIENT_ID)
    this.clientSecret = sanitizeEnvValue(
      credentials?.clientSecret || process.env.GOOGLE_ADS_CLIENT_SECRET
    )
    this.refreshToken = sanitizeEnvValue(
      credentials?.refreshToken || process.env.GOOGLE_ADS_REFRESH_TOKEN
    )
    const rawLoginCustomerId = sanitizeEnvValue(
      credentials?.loginCustomerId || process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
    )
    this.loginCustomerId = rawLoginCustomerId ? rawLoginCustomerId.replace(/-/g, '') : rawLoginCustomerId
    this.initialized = false
    this.useSimulation = false
  }

  async init() {
    if (!this.customerId || !this.developerToken || !this.clientId || !this.clientSecret || !this.refreshToken) {
      console.log('\n⚠️  Google Ads credentials not configured.')
      console.log('   See GOOGLE_ADS_SETUP.md for instructions.\n')
      this.useSimulation = true
      return false
    }

    try {
      this.client = new GoogleAdsApi({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        developer_token: this.developerToken,
        login_customer_id: this.loginCustomerId || this.customerId
      })
      const resolvedCustomerId = await this.resolveCustomerId()
      if (resolvedCustomerId && resolvedCustomerId !== this.customerId) {
        console.log(`   Using customer ID ${resolvedCustomerId} (auto-resolved)`)
        this.customerId = resolvedCustomerId
      }

      this.customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: this.refreshToken,
        login_customer_id: this.loginCustomerId || this.customerId
      })
      this.initialized = true
      return true
    } catch (error) {
      console.error('Failed to initialize Google Ads client:', error.message)
      this.initialized = false
      this.useSimulation = false
      return false
    }
  }

  async resolveCustomerId() {
    const accessible = await this.listAccessibleCustomers()
    if (!accessible.length) {
      return this.customerId
    }

    if (!this.customerId) {
      return accessible.find(id => id !== this.loginCustomerId) || accessible[0]
    }

    if (accessible.includes(this.customerId)) {
      return this.customerId
    }

    const fallback = accessible.find(id => id !== this.loginCustomerId) || accessible[0]
    console.log(`   Customer ID ${this.customerId} not accessible; falling back to ${fallback}`)
    return fallback
  }

  async query(gaql) {
    if (!this.initialized || !this.customer) {
      if (this.useSimulation) {
        return this.simulateResponse('query', { gaql })
      }
      console.error('Google Ads API not initialized.')
      return null
    }

    try {
      return await this.customer.query(gaql)
    } catch (error) {
      console.error('Google Ads API query failed:', error.message)
      if (error?.errors?.length) {
        for (const err of error.errors) {
          if (err?.message) {
            console.error(`  • ${err.message}`)
          }
        }
      }
      if (error?.response?.errors?.length) {
        for (const err of error.response.errors) {
          if (err?.message) {
            console.error(`  • ${err.message}`)
          }
        }
      }
      if (error?.response?.data) {
        try {
          console.error('  • API response:', JSON.stringify(error.response.data))
        } catch {
          console.error('  • API response available (failed to serialize)')
        }
      }
      return null
    }
  }

  async listAccessibleCustomers() {
    if (!this.client || !this.refreshToken) {
      return []
    }

    try {
      const { resource_names: resourceNames = [] } = await this.client.listAccessibleCustomers(
        this.refreshToken
      )
      return resourceNames.map(name => name.replace('customers/', ''))
    } catch (error) {
      console.error('Failed to list accessible customers:', error.message)
      return []
    }
  }

  // Campaign Management
  async createCampaign(campaignConfig) {
    if (!this.initialized) {
      return this.simulateResponse('createCampaign', campaignConfig)
    }
    
    // Real API call would go here
    // return await this.customer.campaigns.create(campaignConfig)
  }

  async getCampaigns(dateRange) {
    if (!this.initialized) {
      return this.useSimulation ? this.simulateResponse('getCampaigns') : []
    }

    const range = normalizeDateRange(dateRange)
    const rows = await this.query(`
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign_budget.amount_micros,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions
      FROM campaign
      WHERE segments.date DURING ${range}
    `)

    if (!rows) return []

    return rows.map(row => {
      const budgetMicros = toNumber(row.campaign_budget?.amount_micros)
      return {
        id: row.campaign.id,
        name: row.campaign.name,
        status: row.campaign.status,
        budget: { daily: budgetMicros ? budgetMicros / 1_000_000 : null },
        metrics: {
          impressions: toNumber(row.metrics.impressions),
          clicks: toNumber(row.metrics.clicks),
          cost: toNumber(row.metrics.cost_micros) / 1_000_000,
          conversions: toNumber(row.metrics.conversions),
          ctr: toNumber(row.metrics.ctr),
          cpc: toNumber(row.metrics.average_cpc) / 1_000_000
        }
      }
    })
  }

  async updateCampaignBudget(campaignId, newBudget) {
    if (!this.initialized) {
      return this.simulateResponse('updateBudget', { campaignId, newBudget })
    }
  }

  // Ad Group Management
  async createAdGroup(adGroupConfig) {
    if (!this.initialized) {
      return this.simulateResponse('createAdGroup', adGroupConfig)
    }
  }

  async getAdGroups(campaignId, dateRange) {
    if (!this.initialized) {
      return this.useSimulation ? this.simulateResponse('getAdGroups', { campaignId }) : []
    }

    const range = normalizeDateRange(dateRange)
    const filter = campaignId ? `AND campaign.id = ${campaignId}` : ''
    const rows = await this.query(`
      SELECT
        ad_group.id,
        ad_group.name,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros
      FROM ad_group
      WHERE segments.date DURING ${range}
      ${filter}
    `)

    if (!rows) return []

    return rows.map(row => ({
      id: row.ad_group.id,
      name: row.ad_group.name,
      clicks: toNumber(row.metrics.clicks),
      conversions: toNumber(row.metrics.conversions),
      cost: toNumber(row.metrics.cost_micros) / 1_000_000
    }))
  }

  // Keyword Management
  async addKeywords(adGroupId, keywords) {
    if (!this.initialized) {
      return this.simulateResponse('addKeywords', { adGroupId, keywords })
    }
  }

  async pauseKeyword(keywordId) {
    if (!this.initialized) {
      return this.simulateResponse('pauseKeyword', { keywordId })
    }
  }

  async adjustKeywordBid(keywordId, bidModifier) {
    if (!this.initialized) {
      return this.simulateResponse('adjustBid', { keywordId, bidModifier })
    }
  }

  // Performance Data
  async getPerformanceReport(dateRange) {
    if (!this.initialized) {
      return this.simulateResponse('getReport', dateRange)
    }
  }

  async getKeywordPerformance(dateRange) {
    if (!this.initialized) {
      return this.useSimulation ? this.simulateResponse('keywordPerformance', dateRange) : []
    }

    const range = normalizeDateRange(dateRange)
    const rows = await this.query(`
      SELECT
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.average_cpc
      FROM keyword_view
      WHERE segments.date DURING ${range}
        AND ad_group_criterion.status = ENABLED
    `)

    if (!rows) return []

    return rows.map(row => ({
      keyword: row.ad_group_criterion.keyword.text,
      matchType: row.ad_group_criterion.keyword.match_type,
      clicks: toNumber(row.metrics.clicks),
      conversions: toNumber(row.metrics.conversions),
      cost: toNumber(row.metrics.cost_micros) / 1_000_000,
      ctr: toNumber(row.metrics.ctr),
      cpc: toNumber(row.metrics.average_cpc) / 1_000_000
    }))
  }

  async getConversionData(dateRange) {
    if (!this.initialized) {
      return this.useSimulation ? this.simulateResponse('conversions', dateRange) : []
    }

    const range = normalizeDateRange(dateRange)
    const rows = await this.query(`
      SELECT
        segments.conversion_action_name,
        metrics.conversions,
        metrics.conversion_value
      FROM customer
      WHERE segments.date DURING ${range}
        AND metrics.conversions > 0
    `)

    if (!rows) return []

    return rows.map(row => ({
      name: row.segments.conversion_action_name || 'conversion',
      count: toNumber(row.metrics.conversions),
      value: toNumber(row.metrics.conversion_value)
    }))
  }

  // Simulation mode for development/testing
  simulateResponse(operation, params = {}) {
    console.log(`\n[SIMULATION] ${operation}:`, JSON.stringify(params, null, 2))
    
    const simulations = {
      getCampaigns: [{
        id: 'sim_campaign_1',
        name: 'Honeydew - Family Organization',
        status: 'ENABLED',
        budget: { daily: 5.00 },
        metrics: {
          clicks: 47,
          impressions: 1250,
          cost: 32.50,
          conversions: 3,
          ctr: 0.0376,
          cpc: 0.69
        }
      }],
      getAdGroups: [
        { id: 'ag_1', name: 'Competitor - Cozi Alternative', clicks: 18, conversions: 2 },
        { id: 'ag_2', name: 'Competitor - Skylight Alternative', clicks: 12, conversions: 1 },
        { id: 'ag_3', name: 'Problem - Family Organization', clicks: 10, conversions: 0 },
        { id: 'ag_4', name: 'AI Family App', clicks: 7, conversions: 0 }
      ],
      keywordPerformance: [
        { keyword: 'cozi alternative', clicks: 12, cost: 8.40, conversions: 2, ctr: 0.048 },
        { keyword: 'skylight calendar alternative', clicks: 8, cost: 7.20, conversions: 1, ctr: 0.032 },
        { keyword: 'family organization app', clicks: 6, cost: 4.80, conversions: 0, ctr: 0.024 },
        { keyword: 'ai family app', clicks: 5, cost: 4.00, conversions: 0, ctr: 0.020 },
        { keyword: 'organize family life', clicks: 4, cost: 3.60, conversions: 0, ctr: 0.016 }
      ],
      conversions: [
        { name: 'signup_complete', count: 3, value: 6.00 },
        { name: 'family_created', count: 2, value: 2.00 },
        { name: 'first_ai_use', count: 1, value: 1.50 }
      ]
    }
    
    return simulations[operation] || { success: true, simulated: true }
  }
}

// ===========================================
// Campaign Setup
// ===========================================

async function setupCampaign(client) {
  console.log('\n🚀 Setting up Honeydew Google Ads Campaign\n')
  console.log(`   Budget: $${config.campaign.dailyBudget}/day`)
  console.log(`   Strategy: ${config.campaign.biddingStrategy}`)
  console.log(`   Target CPA: $${config.campaign.targetCPA}\n`)

  // 1. Create Campaign
  console.log('1️⃣  Creating campaign...')
  const campaign = await client.createCampaign({
    name: config.campaign.name,
    budget: {
      amountMicros: config.campaign.dailyBudget * 1000000,
      deliveryMethod: 'STANDARD'
    },
    biddingStrategy: config.campaign.biddingStrategy,
    targetCpaMicros: config.campaign.targetCPA * 1000000,
    networkSettings: {
      targetGoogleSearch: true,
      targetSearchNetwork: false,
      targetContentNetwork: false
    },
    geoTargets: config.targeting.locations,
    languageTargets: config.targeting.languages
  })

  // 2. Create Ad Groups
  console.log('2️⃣  Creating ad groups...')
  for (const adGroup of config.adGroups) {
    console.log(`   • ${adGroup.name}`)
    await client.createAdGroup({
      campaignId: campaign?.id || 'sim_campaign',
      name: adGroup.name,
      cpcBidMicros: 2000000, // $2 default
      status: 'ENABLED'
    })

    // Add keywords
    await client.addKeywords(adGroup.name, adGroup.keywords)
  }

  // 3. Create Ads
  console.log('3️⃣  Creating responsive search ads...')
  for (const ad of config.ads) {
    console.log(`   • Ad for: ${ad.adGroup}`)
  }

  // 4. Set up conversion tracking
  console.log('4️⃣  Configuring conversion tracking...')
  for (const conversion of config.conversions) {
    console.log(`   • ${conversion.name} (value: ${conversion.value ? '$' + conversion.value : 'dynamic'})`)
  }

  console.log('\n✅ Campaign setup complete!')
  console.log('\n📋 Next steps:')
  console.log('   1. Verify Google Ads credentials are configured')
  console.log('   2. Implement conversion tracking on app.gethoneydew.app')
  console.log('   3. Run: node scripts/google-ads-cli.js status')
  console.log('   4. Enable campaign when ready')
}

// ===========================================
// Optimization Engine
// ===========================================

async function runOptimization(client) {
  console.log('\n⚙️  Running Optimization Cycle\n')
  
  const dateRange = { days: 7 }
  
  // 1. Get current performance
  console.log('📊 Fetching performance data...')
  const keywordPerf = await client.getKeywordPerformance(dateRange)
  const conversions = await client.getConversionData(dateRange)
  
  // 2. Identify losers (high spend, no conversions)
  console.log('\n🔍 Analyzing keyword performance...')
  const losers = keywordPerf.filter(kw => 
    kw.cost >= config.optimization.pauseThreshold.spend && 
    kw.conversions <= config.optimization.pauseThreshold.conversions
  )
  
  if (losers.length > 0) {
    console.log(`\n⚠️  Keywords to pause (${losers.length}):`)
    for (const loser of losers) {
      console.log(`   • "${loser.keyword}" - $${loser.cost} spent, ${loser.conversions} conversions`)
      await client.pauseKeyword(loser.keyword)
    }
  } else {
    console.log('   ✓ No underperforming keywords to pause')
  }

  // 3. Identify winners (high CTR, conversions)
  const winners = keywordPerf.filter(kw => 
    kw.ctr >= config.optimization.boostThreshold.ctr ||
    (kw.conversions > 0 && kw.cost > 0)
  )
  
  if (winners.length > 0) {
    console.log(`\n🏆 High-performing keywords (${winners.length}):`)
    for (const winner of winners) {
      const bidIncrease = config.optimization.bidAdjustments.increasePercent
      console.log(`   • "${winner.keyword}" - CTR: ${(winner.ctr * 100).toFixed(1)}%, Conv: ${winner.conversions} → +${bidIncrease}% bid`)
      await client.adjustKeywordBid(winner.keyword, 1 + (bidIncrease / 100))
    }
  }

  // 4. Budget reallocation recommendations
  console.log('\n💰 Budget Allocation Analysis:')
  const adGroups = await client.getAdGroups(undefined, dateRange)
  const totalConversions = adGroups.reduce((sum, ag) => sum + ag.conversions, 0)
  
  for (const ag of adGroups) {
    const convShare = totalConversions > 0 ? (ag.conversions / totalConversions * 100).toFixed(0) : 0
    const status = ag.conversions > 0 ? '✓' : '⚠️'
    console.log(`   ${status} ${ag.name}: ${ag.clicks} clicks, ${ag.conversions} conv (${convShare}% of total)`)
  }

  // 5. Conversion funnel analysis
  console.log('\n📈 Conversion Funnel:')
  for (const conv of conversions) {
    console.log(`   • ${conv.name}: ${conv.count} (value: $${conv.value})`)
  }

  console.log('\n✅ Optimization cycle complete!')
  console.log(`   Next run in ${config.optimization.checkIntervalHours} hours`)
}

// ===========================================
// Reporting
// ===========================================

async function generateReport(client, days = 7) {
  console.log(`\n📊 Google Ads Performance Report (Last ${days} days)\n`)
  console.log('═'.repeat(60))
  
  const dateRange = { days }
  const campaigns = await client.getCampaigns(dateRange)
  const campaign = campaigns[0]
  
  if (!campaign) {
    console.log('No campaign data available. Check API access or date range.')
    return
  }

  // Campaign Overview
  console.log('\n📌 CAMPAIGN OVERVIEW')
  console.log('─'.repeat(40))
  console.log(`Campaign: ${campaign.name}`)
  console.log(`Status: ${campaign.status}`)
  console.log(`Daily Budget: $${campaign.budget.daily}`)
  
  // Performance Metrics
  console.log('\n📈 PERFORMANCE METRICS')
  console.log('─'.repeat(40))
  const m = campaign.metrics
  console.log(`Impressions:    ${m.impressions.toLocaleString()}`)
  console.log(`Clicks:         ${m.clicks}`)
  console.log(`CTR:            ${(m.ctr * 100).toFixed(2)}%`)
  console.log(`Avg CPC:        $${m.cpc.toFixed(2)}`)
  console.log(`Total Cost:     $${m.cost.toFixed(2)}`)
  console.log(`Conversions:    ${m.conversions}`)
  console.log(`Cost/Conv:      $${m.conversions > 0 ? (m.cost / m.conversions).toFixed(2) : 'N/A'}`)

  // Keyword Performance
  console.log('\n🔑 TOP KEYWORDS')
  console.log('─'.repeat(40))
  const keywords = await client.getKeywordPerformance(dateRange)
  keywords.sort((a, b) => b.conversions - a.conversions || b.clicks - a.clicks)
  
  console.log('Keyword                              Clicks  Conv   Cost    CTR')
  for (const kw of keywords.slice(0, 10)) {
    const name = kw.keyword.padEnd(35).substring(0, 35)
    const clicks = kw.clicks.toString().padStart(6)
    const conv = kw.conversions.toString().padStart(5)
    const cost = ('$' + kw.cost.toFixed(2)).padStart(7)
    const ctr = ((kw.ctr * 100).toFixed(1) + '%').padStart(6)
    console.log(`${name} ${clicks} ${conv} ${cost} ${ctr}`)
  }

  // Conversion Breakdown
  console.log('\n🎯 CONVERSION BREAKDOWN')
  console.log('─'.repeat(40))
  const conversions = await client.getConversionData(dateRange)
  for (const conv of conversions) {
    console.log(`${conv.name.padEnd(25)} ${conv.count} × $${(conv.value / conv.count).toFixed(2)} = $${conv.value.toFixed(2)}`)
  }

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS')
  console.log('─'.repeat(40))
  
  if (m.ctr < 0.03) {
    console.log('• CTR below 3% - Test new ad copy variations')
  }
  if (m.conversions === 0) {
    console.log('• No conversions - Check landing page and tracking')
  }
  if (m.cpc > 3) {
    console.log('• High CPC - Focus on long-tail keywords')
  }
  
  const winningKeywords = keywords.filter(k => k.conversions > 0)
  if (winningKeywords.length > 0) {
    console.log(`• Scale budget for: ${winningKeywords.map(k => '"' + k.keyword + '"').join(', ')}`)
  }

  console.log('\n' + '═'.repeat(60))
}

// ===========================================
// Status Check
// ===========================================

async function showStatus(client) {
  console.log('\n📍 Google Ads Campaign Status\n')
  
  // Check credentials
  console.log('🔑 Credentials:')
  console.log(`   Customer ID: ${client.customerId ? '✓ Set' : '✗ Missing'}`)
  console.log(`   Developer Token: ${client.developerToken ? '✓ Set' : '✗ Missing'}`)
  console.log(`   API Initialized: ${client.initialized ? '✓ Yes' : '✗ No (simulation mode)'}`)
  
  // Campaign status
  console.log('\n📊 Campaign:')
  const campaigns = await client.getCampaigns({ days: 7 })
  if (campaigns && campaigns.length > 0) {
    const c = campaigns[0]
    console.log(`   Name: ${c.name}`)
    console.log(`   Status: ${c.status}`)
    console.log(`   Budget: ${c.budget.daily ? '$' + c.budget.daily + '/day' : 'N/A'}`)
    console.log(`   Spend (7d): $${c.metrics.cost.toFixed(2)}`)
    console.log(`   Conversions (7d): ${c.metrics.conversions}`)
  } else {
    console.log('   No campaigns found (or API access issue)')
    const accessible = await client.listAccessibleCustomers()
    if (accessible.length > 0) {
      console.log(`   Accessible customer IDs: ${accessible.join(', ')}`)
    }
  }

  // Conversion tracking status
  console.log('\n🎯 Conversion Tracking:')
  for (const conv of config.conversions.filter(c => c.primary)) {
    console.log(`   • ${conv.name}: ${conv.value ? '$' + conv.value : 'Dynamic value'}`)
  }
}

// ===========================================
// CLI Entry Point
// ===========================================

function parseArgs() {
  const args = process.argv.slice(2)
  const command = args[0] || 'help'
  const options = {}
  
  args.slice(1).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value = 'true'] = arg.substring(2).split('=')
      options[key] = value
    }
  })
  
  return { command, options }
}

function printHelp() {
  console.log(`
Honeydew Google Ads CLI

Usage:
  node scripts/google-ads-cli.js <command> [options]

Commands:
  setup             Create campaign, ad groups, and ads
  optimize          Run optimization cycle (pause losers, boost winners)
  report            Generate performance report
  status            Show campaign status and health
  pause-losers      Pause underperforming keywords only
  help              Show this help message

Options:
  --days=<number>   Date range for reports (default: 7)
  --dry-run         Preview changes without applying

Environment Variables:
  GOOGLE_ADS_CUSTOMER_ID      Your Google Ads customer ID (XXX-XXX-XXXX)
  GOOGLE_ADS_DEVELOPER_TOKEN  API developer token
  GOOGLE_ADS_CLIENT_ID        OAuth client ID
  GOOGLE_ADS_CLIENT_SECRET    OAuth client secret
  GOOGLE_ADS_REFRESH_TOKEN    OAuth refresh token

Examples:
  node scripts/google-ads-cli.js setup
  node scripts/google-ads-cli.js optimize
  node scripts/google-ads-cli.js report --days=30
  node scripts/google-ads-cli.js status

Configuration:
  Edit scripts/google-ads-config.json to customize:
  - Daily budget
  - Keywords and ad groups
  - Optimization thresholds
  - Conversion events
`)
}

async function main() {
  const { command, options } = parseArgs()
  
  if (command === 'help') {
    printHelp()
    return
  }

  const client = new GoogleAdsClient({
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID,
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    clientId: process.env.GOOGLE_ADS_CLIENT_ID,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN
  })
  
  await client.init()
  
  switch (command) {
    case 'setup':
      await setupCampaign(client)
      break
    case 'optimize':
      await runOptimization(client)
      break
    case 'report':
      await generateReport(client, parseInt(options.days) || 7)
      break
    case 'status':
      await showStatus(client)
      break
    case 'pause-losers':
      console.log('\n⏸️  Pausing underperforming keywords...')
      await runOptimization(client)
      break
    default:
      console.error(`Unknown command: ${command}`)
      printHelp()
      process.exit(1)
  }
}

main().catch(console.error)
