#!/usr/bin/env node

import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
}

const log = (color, text) => console.log(`${color}${text}${colors.reset}`)
const header = (text) => console.log(`\n${colors.bright}${colors.cyan}=== ${text} ===${colors.reset}\n`)

const CREDENTIALS_FILE = 'gsc-service-account.json'
const SITE_URL = 'https://www.gethoneydew.app'

async function runCommand(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['scripts/gsc-cli.js', ...args], {
      stdio: 'inherit',
      shell: true
    })

    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Command failed with code ${code}`))
    })
  })
}

async function main() {
  console.clear()
  log(colors.bright, '🔍 Honeydew SEO Health Check')
  console.log('Running diagnostics...\n')

  if (!fs.existsSync(CREDENTIALS_FILE)) {
    log(colors.red, '❌ Credentials file not found!')
    console.log(`Please create ${CREDENTIALS_FILE} with your Google Service Account key.`)
    return
  }

  try {
    // 1. Check Sitemap
    header('1. Sitemap Status')
    await runCommand([
      'sitemap-list',
      `--credentials=${CREDENTIALS_FILE}`,
      `--property=${SITE_URL}`
    ])

    // 2. Check Recent Performance (Last 7 Days)
    header('2. Search Performance (Last 7 Days)')
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    await runCommand([
      'search-analytics',
      `--credentials=${CREDENTIALS_FILE}`,
      `--property=${SITE_URL}`,
      `--start=${startDate}`,
      `--end=${endDate}`,
      '--dimensions=query',
      '--limit=10'
    ])

    // 3. Check Top Pages
    header('3. Top Indexed Pages (Last 28 Days)')
    const startMonth = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    await runCommand([
      'search-analytics',
      `--credentials=${CREDENTIALS_FILE}`,
      `--property=${SITE_URL}`,
      `--start=${startMonth}`,
      `--end=${endDate}`,
      '--dimensions=page',
      '--limit=10'
    ])

    console.log('\n')
    log(colors.green, '✅ Health check complete.')
    console.log(`To run this again: ${colors.yellow}npm run seo-check${colors.reset}`)

  } catch (error) {
    log(colors.red, '\n❌ Diagnostics failed')
    console.error(error.message)
  }
}

main()











