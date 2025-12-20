#!/usr/bin/env node

/**
 * Honeydew Ads Autonomous Optimizer
 * 
 * Runs continuously to optimize Google Ads performance
 * - Monitors campaigns every 6 hours
 * - Pauses underperforming keywords
 * - Boosts winning keywords
 * - Sends daily reports
 * - Alerts on anomalies
 * 
 * Usage:
 *   node scripts/ads-optimizer.js run          # Single optimization cycle
 *   node scripts/ads-optimizer.js daemon       # Run continuously
 *   node scripts/ads-optimizer.js report       # Generate and send report
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load configuration
const configPath = path.join(__dirname, 'google-ads-config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

// State file for tracking optimization history
const statePath = path.join(__dirname, 'ads-optimizer-state.json')

// ===========================================
// Optimization State Management
// ===========================================

function loadState() {
  try {
    if (fs.existsSync(statePath)) {
      return JSON.parse(fs.readFileSync(statePath, 'utf-8'))
    }
  } catch (e) {
    console.error('Error loading state:', e.message)
  }
  return {
    lastRun: null,
    lastReport: null,
    optimizationHistory: [],
    pausedKeywords: [],
    boostedKeywords: [],
    alerts: [],
    metrics: {
      totalSpend: 0,
      totalConversions: 0,
      totalClicks: 0
    }
  }
}

function saveState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2))
}

// ===========================================
// Performance Analysis
// ===========================================

class PerformanceAnalyzer {
  constructor(config) {
    this.config = config
    this.thresholds = config.optimization
  }

  // Analyze keyword performance and return recommendations
  analyzeKeywords(keywords) {
    const recommendations = {
      pause: [],
      boost: [],
      reduce: [],
      monitor: []
    }

    for (const kw of keywords) {
      const analysis = this.analyzeKeyword(kw)
      recommendations[analysis.action].push({
        keyword: kw.keyword,
        reason: analysis.reason,
        metrics: {
          clicks: kw.clicks,
          cost: kw.cost,
          conversions: kw.conversions,
          ctr: kw.ctr,
          cpc: kw.cpc
        }
      })
    }

    return recommendations
  }

  analyzeKeyword(kw) {
    // Pause: High spend, no conversions
    if (kw.cost >= this.thresholds.pauseThreshold.spend && 
        kw.conversions <= this.thresholds.pauseThreshold.conversions) {
      return {
        action: 'pause',
        reason: `Spent $${kw.cost.toFixed(2)} with ${kw.conversions} conversions`
      }
    }

    // Boost: High CTR or conversions
    if (kw.ctr >= this.thresholds.boostThreshold.ctr || kw.conversions > 0) {
      return {
        action: 'boost',
        reason: kw.conversions > 0 
          ? `${kw.conversions} conversions at $${(kw.cost / kw.conversions).toFixed(2)} CPA`
          : `High CTR of ${(kw.ctr * 100).toFixed(1)}%`
      }
    }

    // Reduce: Low CTR, some spend
    if (kw.ctr < 0.01 && kw.cost > 1) {
      return {
        action: 'reduce',
        reason: `Low CTR of ${(kw.ctr * 100).toFixed(1)}%`
      }
    }

    // Monitor: Everything else
    return {
      action: 'monitor',
      reason: 'Needs more data'
    }
  }

  // Analyze ad group performance for budget reallocation
  analyzeAdGroups(adGroups) {
    const totalConversions = adGroups.reduce((sum, ag) => sum + ag.conversions, 0)
    const totalSpend = adGroups.reduce((sum, ag) => sum + ag.cost, 0)

    return adGroups.map(ag => {
      const convShare = totalConversions > 0 ? ag.conversions / totalConversions : 0
      const spendShare = totalSpend > 0 ? ag.cost / totalSpend : 0
      const efficiency = convShare - spendShare // Positive = underinvested

      return {
        name: ag.name,
        conversions: ag.conversions,
        cost: ag.cost,
        cpa: ag.conversions > 0 ? ag.cost / ag.conversions : null,
        conversionShare: convShare,
        spendShare: spendShare,
        efficiency: efficiency,
        recommendation: efficiency > 0.1 ? 'increase_budget' :
                       efficiency < -0.1 ? 'decrease_budget' : 'maintain'
      }
    })
  }

  // Detect anomalies that need alerts
  detectAnomalies(current, historical) {
    const alerts = []

    // No spend in 24h
    if (current.spend24h === 0) {
      alerts.push({
        type: 'no_spend',
        severity: 'high',
        message: 'Campaign has not spent any budget in 24 hours'
      })
    }

    // Budget nearly depleted
    const dailyBudget = this.config.campaign.dailyBudget
    if (current.spend24h > dailyBudget * 0.95) {
      alerts.push({
        type: 'budget_depleted',
        severity: 'medium',
        message: `Daily budget ${(current.spend24h / dailyBudget * 100).toFixed(0)}% spent`
      })
    }

    // CPA spike (> 2x target)
    const targetCpa = this.config.campaign.targetCPA
    if (current.cpa > targetCpa * 2) {
      alerts.push({
        type: 'cpa_spike',
        severity: 'high',
        message: `CPA of $${current.cpa.toFixed(2)} is ${(current.cpa / targetCpa).toFixed(1)}x target`
      })
    }

    // No conversions in 48h (if there's spend)
    if (current.spend48h > 10 && current.conversions48h === 0) {
      alerts.push({
        type: 'no_conversions',
        severity: 'high',
        message: 'No conversions in 48 hours despite $' + current.spend48h.toFixed(2) + ' spend'
      })
    }

    // CTR drop > 30%
    if (historical.avgCtr > 0 && current.ctr < historical.avgCtr * 0.7) {
      alerts.push({
        type: 'ctr_drop',
        severity: 'medium',
        message: `CTR dropped ${((1 - current.ctr / historical.avgCtr) * 100).toFixed(0)}% from average`
      })
    }

    return alerts
  }
}

// ===========================================
// Report Generator
// ===========================================

class ReportGenerator {
  constructor(config) {
    this.config = config
  }

  generateDailyReport(data) {
    const { campaigns, adGroups, keywords, conversions, recommendations, alerts } = data

    let report = `
╔══════════════════════════════════════════════════════════════════╗
║           HONEYDEW ADS DAILY REPORT - ${new Date().toLocaleDateString()}           ║
╚══════════════════════════════════════════════════════════════════╝

📊 CAMPAIGN OVERVIEW
─────────────────────────────────────────────────────────────────────
Campaign: ${campaigns[0]?.name || 'N/A'}
Status:   ${campaigns[0]?.status || 'N/A'}
Budget:   $${this.config.campaign.dailyBudget}/day

📈 PERFORMANCE (Last 7 Days)
─────────────────────────────────────────────────────────────────────
Impressions:    ${data.metrics.impressions.toLocaleString()}
Clicks:         ${data.metrics.clicks}
CTR:            ${(data.metrics.ctr * 100).toFixed(2)}%
Avg CPC:        $${data.metrics.cpc.toFixed(2)}
Total Spend:    $${data.metrics.cost.toFixed(2)}
Conversions:    ${data.metrics.conversions}
Cost/Conv:      ${data.metrics.conversions > 0 ? '$' + (data.metrics.cost / data.metrics.conversions).toFixed(2) : 'N/A'}

🎯 CONVERSION BREAKDOWN
─────────────────────────────────────────────────────────────────────
`
    for (const conv of conversions) {
      report += `${conv.name.padEnd(25)} ${conv.count} × $${(conv.value / Math.max(conv.count, 1)).toFixed(2)} = $${conv.value.toFixed(2)}\n`
    }

    report += `
📊 AD GROUP PERFORMANCE
─────────────────────────────────────────────────────────────────────
`
    for (const ag of adGroups) {
      const status = ag.conversions > 0 ? '✅' : '⚠️'
      report += `${status} ${ag.name.padEnd(35)} ${ag.clicks} clicks, ${ag.conversions} conv\n`
    }

    report += `
🔑 TOP KEYWORDS
─────────────────────────────────────────────────────────────────────
Keyword                              Clicks  Conv   Cost    CTR
`
    keywords.sort((a, b) => b.conversions - a.conversions || b.clicks - a.clicks)
    for (const kw of keywords.slice(0, 10)) {
      const name = kw.keyword.padEnd(35).substring(0, 35)
      const clicks = kw.clicks.toString().padStart(6)
      const conv = kw.conversions.toString().padStart(5)
      const cost = ('$' + kw.cost.toFixed(2)).padStart(7)
      const ctr = ((kw.ctr * 100).toFixed(1) + '%').padStart(6)
      report += `${name} ${clicks} ${conv} ${cost} ${ctr}\n`
    }

    report += `
⚡ OPTIMIZATION ACTIONS TAKEN
─────────────────────────────────────────────────────────────────────
`
    if (recommendations.pause.length > 0) {
      report += `Paused ${recommendations.pause.length} underperforming keyword(s):\n`
      for (const p of recommendations.pause.slice(0, 5)) {
        report += `  • "${p.keyword}" - ${p.reason}\n`
      }
    }
    if (recommendations.boost.length > 0) {
      report += `Boosted ${recommendations.boost.length} high-performing keyword(s):\n`
      for (const b of recommendations.boost.slice(0, 5)) {
        report += `  • "${b.keyword}" - ${b.reason}\n`
      }
    }
    if (recommendations.pause.length === 0 && recommendations.boost.length === 0) {
      report += `No optimization actions needed.\n`
    }

    if (alerts.length > 0) {
      report += `
🚨 ALERTS
─────────────────────────────────────────────────────────────────────
`
      for (const alert of alerts) {
        const icon = alert.severity === 'high' ? '🔴' : alert.severity === 'medium' ? '🟡' : '🟢'
        report += `${icon} ${alert.message}\n`
      }
    }

    report += `
💡 RECOMMENDATIONS
─────────────────────────────────────────────────────────────────────
`
    // Generate recommendations based on data
    if (data.metrics.ctr < 0.02) {
      report += `• Low CTR (${(data.metrics.ctr * 100).toFixed(1)}%) - Consider testing new ad copy\n`
    }
    if (data.metrics.conversions === 0 && data.metrics.clicks > 10) {
      report += `• No conversions - Verify tracking is working correctly\n`
    }
    const winningKws = keywords.filter(k => k.conversions > 0)
    if (winningKws.length > 0) {
      report += `• Double down on: ${winningKws.map(k => '"' + k.keyword + '"').join(', ')}\n`
    }
    const losingAgs = adGroups.filter(ag => ag.clicks > 5 && ag.conversions === 0)
    if (losingAgs.length > 0) {
      report += `• Review ad groups with no conversions: ${losingAgs.map(ag => ag.name).join(', ')}\n`
    }

    report += `
═══════════════════════════════════════════════════════════════════════
Generated: ${new Date().toISOString()}
Next optimization cycle: ${this.config.optimization.checkIntervalHours} hours
Report sent to: ${this.config.reporting.emailRecipients.join(', ')}
═══════════════════════════════════════════════════════════════════════
`

    return report
  }

  generateWeeklyReport(data) {
    // Extended report with week-over-week comparisons
    let report = this.generateDailyReport(data)
    
    report += `
📅 WEEKLY TRENDS
─────────────────────────────────────────────────────────────────────
This Week vs Last Week:
  Spend:       $${data.metrics.cost.toFixed(2)} vs $${(data.lastWeek?.cost || 0).toFixed(2)} (${this._percentChange(data.metrics.cost, data.lastWeek?.cost)})
  Clicks:      ${data.metrics.clicks} vs ${data.lastWeek?.clicks || 0} (${this._percentChange(data.metrics.clicks, data.lastWeek?.clicks)})
  Conversions: ${data.metrics.conversions} vs ${data.lastWeek?.conversions || 0} (${this._percentChange(data.metrics.conversions, data.lastWeek?.conversions)})
  CPA:         ${data.metrics.conversions > 0 ? '$' + (data.metrics.cost / data.metrics.conversions).toFixed(2) : 'N/A'} vs ${data.lastWeek?.conversions > 0 ? '$' + (data.lastWeek.cost / data.lastWeek.conversions).toFixed(2) : 'N/A'}

📊 CUMULATIVE METRICS
─────────────────────────────────────────────────────────────────────
Total Spend (All Time):       $${data.cumulative?.totalSpend?.toFixed(2) || 'N/A'}
Total Conversions (All Time): ${data.cumulative?.totalConversions || 'N/A'}
Average CPA (All Time):       ${data.cumulative?.totalConversions > 0 ? '$' + (data.cumulative.totalSpend / data.cumulative.totalConversions).toFixed(2) : 'N/A'}
`

    return report
  }

  _percentChange(current, previous) {
    if (!previous || previous === 0) return 'N/A'
    const change = ((current - previous) / previous) * 100
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(0)}%`
  }
}

// ===========================================
// Email Sender (Placeholder)
// ===========================================

async function sendEmail(to, subject, body) {
  // In production, implement with SendGrid, AWS SES, or similar
  console.log(`\n📧 EMAIL NOTIFICATION`)
  console.log(`   To: ${to.join(', ')}`)
  console.log(`   Subject: ${subject}`)
  console.log(`   Body: ${body.substring(0, 200)}...`)
  
  // Placeholder - implement actual email sending
  // await sendgrid.send({ to, from: 'ads@gethoneydew.app', subject, text: body })
  
  return true
}

// ===========================================
// Main Optimizer Class
// ===========================================

class AdsOptimizer {
  constructor() {
    this.config = config
    this.state = loadState()
    this.analyzer = new PerformanceAnalyzer(config)
    this.reporter = new ReportGenerator(config)
  }

  // Run a single optimization cycle
  async runCycle() {
    console.log(`\n⚙️  Running Optimization Cycle - ${new Date().toISOString()}\n`)
    
    // 1. Fetch current performance data
    console.log('📊 Fetching performance data...')
    const data = await this.fetchPerformanceData()
    
    // 2. Analyze keywords
    console.log('🔍 Analyzing keyword performance...')
    const recommendations = this.analyzer.analyzeKeywords(data.keywords)
    
    // 3. Apply optimizations
    console.log('⚡ Applying optimizations...')
    await this.applyOptimizations(recommendations)
    
    // 4. Detect anomalies
    console.log('🚨 Checking for anomalies...')
    const alerts = this.analyzer.detectAnomalies(data.current, data.historical)
    
    // 5. Handle alerts
    if (alerts.length > 0) {
      await this.handleAlerts(alerts)
    }
    
    // 6. Update state
    this.state.lastRun = new Date().toISOString()
    this.state.optimizationHistory.push({
      timestamp: this.state.lastRun,
      paused: recommendations.pause.length,
      boosted: recommendations.boost.length,
      alerts: alerts.length
    })
    
    // Keep last 30 days of history
    if (this.state.optimizationHistory.length > 120) {
      this.state.optimizationHistory = this.state.optimizationHistory.slice(-120)
    }
    
    saveState(this.state)
    
    // 7. Check if report is due
    await this.checkReportSchedule(data, recommendations, alerts)
    
    console.log('\n✅ Optimization cycle complete!')
    
    return { recommendations, alerts }
  }

  // Fetch performance data (simulation for now)
  async fetchPerformanceData() {
    // In production, this would call Google Ads API
    return {
      campaigns: [{
        name: 'Honeydew - Family Organization',
        status: 'ENABLED',
        budget: { daily: 5.00 }
      }],
      adGroups: [
        { name: 'Competitor - Cozi Alternative', clicks: 18, cost: 12.60, conversions: 2 },
        { name: 'Competitor - Skylight Alternative', clicks: 12, cost: 8.40, conversions: 1 },
        { name: 'Problem - Family Organization', clicks: 10, cost: 7.00, conversions: 0 },
        { name: 'AI Family App', clicks: 7, cost: 4.90, conversions: 0 }
      ],
      keywords: [
        { keyword: 'cozi alternative', clicks: 12, cost: 8.40, conversions: 2, ctr: 0.048, cpc: 0.70 },
        { keyword: 'skylight calendar alternative', clicks: 8, cost: 7.20, conversions: 1, ctr: 0.032, cpc: 0.90 },
        { keyword: 'family organization app', clicks: 6, cost: 4.80, conversions: 0, ctr: 0.024, cpc: 0.80 },
        { keyword: 'ai family app', clicks: 5, cost: 4.00, conversions: 0, ctr: 0.020, cpc: 0.80 },
        { keyword: 'organize family life', clicks: 4, cost: 3.60, conversions: 0, ctr: 0.016, cpc: 0.90 }
      ],
      conversions: [
        { name: 'signup_complete', count: 3, value: 6.00 },
        { name: 'family_created', count: 2, value: 2.00 },
        { name: 'first_ai_use', count: 1, value: 1.50 }
      ],
      metrics: {
        impressions: 1250,
        clicks: 47,
        cost: 32.90,
        conversions: 3,
        ctr: 0.0376,
        cpc: 0.70
      },
      current: {
        spend24h: 4.70,
        spend48h: 9.40,
        conversions48h: 1,
        ctr: 0.0376,
        cpa: 10.97
      },
      historical: {
        avgCtr: 0.035,
        avgCpa: 8.00
      }
    }
  }

  // Apply optimization recommendations
  async applyOptimizations(recommendations) {
    // Pause underperforming keywords
    for (const kw of recommendations.pause) {
      console.log(`   ⏸️  Pausing "${kw.keyword}" - ${kw.reason}`)
      // In production: await googleAdsClient.pauseKeyword(kw.keyword)
      this.state.pausedKeywords.push({
        keyword: kw.keyword,
        pausedAt: new Date().toISOString(),
        reason: kw.reason
      })
    }
    
    // Boost performing keywords
    const bidIncrease = this.config.optimization.bidAdjustments.increasePercent
    for (const kw of recommendations.boost) {
      console.log(`   📈 Boosting "${kw.keyword}" +${bidIncrease}% - ${kw.reason}`)
      // In production: await googleAdsClient.adjustBid(kw.keyword, 1 + bidIncrease/100)
      this.state.boostedKeywords.push({
        keyword: kw.keyword,
        boostedAt: new Date().toISOString(),
        reason: kw.reason
      })
    }
    
    // Log monitor keywords
    if (recommendations.monitor.length > 0) {
      console.log(`   👀 Monitoring ${recommendations.monitor.length} keyword(s)`)
    }
  }

  // Handle alerts
  async handleAlerts(alerts) {
    for (const alert of alerts) {
      console.log(`   🚨 Alert [${alert.severity}]: ${alert.message}`)
      this.state.alerts.push({
        ...alert,
        timestamp: new Date().toISOString()
      })
    }
    
    // Send high-priority alerts immediately
    const highPriorityAlerts = alerts.filter(a => a.severity === 'high')
    if (highPriorityAlerts.length > 0) {
      const subject = `🚨 Honeydew Ads Alert: ${highPriorityAlerts.length} high-priority issue(s)`
      const body = highPriorityAlerts.map(a => `• ${a.message}`).join('\n')
      await sendEmail(this.config.reporting.emailRecipients, subject, body)
    }
  }

  // Check if reports are due
  async checkReportSchedule(data, recommendations, alerts) {
    const now = new Date()
    const lastReport = this.state.lastReport ? new Date(this.state.lastReport) : null
    
    // Daily report at 8 AM
    if (this.config.reporting.dailyReport) {
      const hoursSinceReport = lastReport ? (now - lastReport) / (1000 * 60 * 60) : 999
      
      if (hoursSinceReport >= 24 && now.getHours() >= 8) {
        console.log('\n📧 Generating daily report...')
        const report = this.reporter.generateDailyReport({
          ...data,
          recommendations,
          alerts
        })
        
        console.log(report)
        
        await sendEmail(
          this.config.reporting.emailRecipients,
          `📊 Honeydew Ads Daily Report - ${now.toLocaleDateString()}`,
          report
        )
        
        this.state.lastReport = now.toISOString()
      }
    }
  }

  // Generate on-demand report
  async generateReport(type = 'daily') {
    const data = await this.fetchPerformanceData()
    const recommendations = this.analyzer.analyzeKeywords(data.keywords)
    const alerts = this.analyzer.detectAnomalies(data.current, data.historical)
    
    const report = type === 'weekly' 
      ? this.reporter.generateWeeklyReport({ ...data, recommendations, alerts })
      : this.reporter.generateDailyReport({ ...data, recommendations, alerts })
    
    return report
  }

  // Run as daemon (continuous optimization)
  async runDaemon() {
    console.log(`\n🤖 Starting Ads Optimizer Daemon`)
    console.log(`   Check interval: ${this.config.optimization.checkIntervalHours} hours`)
    console.log(`   Press Ctrl+C to stop\n`)
    
    const intervalMs = this.config.optimization.checkIntervalHours * 60 * 60 * 1000
    
    // Run immediately
    await this.runCycle()
    
    // Then run on interval
    setInterval(async () => {
      try {
        await this.runCycle()
      } catch (error) {
        console.error('Optimization cycle error:', error.message)
        await sendEmail(
          this.config.reporting.emailRecipients,
          '🚨 Honeydew Ads Optimizer Error',
          `Error during optimization cycle: ${error.message}`
        )
      }
    }, intervalMs)
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
Honeydew Ads Autonomous Optimizer

Usage:
  node scripts/ads-optimizer.js <command> [options]

Commands:
  run              Run single optimization cycle
  daemon           Run continuously (recommended for production)
  report           Generate and display performance report
  status           Show optimizer status
  help             Show this help

Options:
  --type=<daily|weekly>   Report type (default: daily)

Examples:
  node scripts/ads-optimizer.js run
  node scripts/ads-optimizer.js daemon
  node scripts/ads-optimizer.js report --type=weekly

Configuration:
  Edit scripts/google-ads-config.json to customize:
  - Optimization thresholds
  - Check intervals
  - Report settings
  - Email recipients
`)
}

async function main() {
  const { command, options } = parseArgs()
  const optimizer = new AdsOptimizer()
  
  switch (command) {
    case 'run':
      await optimizer.runCycle()
      break
    case 'daemon':
      await optimizer.runDaemon()
      break
    case 'report':
      const report = await optimizer.generateReport(options.type || 'daily')
      console.log(report)
      break
    case 'status':
      const state = loadState()
      console.log('\n📍 Optimizer Status\n')
      console.log(`Last run: ${state.lastRun || 'Never'}`)
      console.log(`Last report: ${state.lastReport || 'Never'}`)
      console.log(`Paused keywords: ${state.pausedKeywords.length}`)
      console.log(`Boosted keywords: ${state.boostedKeywords.length}`)
      console.log(`Active alerts: ${state.alerts.filter(a => !a.resolved).length}`)
      break
    case 'help':
    default:
      printHelp()
  }
}

main().catch(console.error)
