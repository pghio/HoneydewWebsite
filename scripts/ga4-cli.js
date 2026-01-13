#!/usr/bin/env node

/**
 * Google Analytics 4 Admin CLI
 * 
 * Configure GA4 properties programmatically:
 * - Create custom dimensions
 * - Mark events as conversions
 * - Create audiences
 * 
 * Usage:
 *   node scripts/ga4-cli.js list-properties
 *   node scripts/ga4-cli.js list-conversions --property=properties/XXXXXXX
 *   node scripts/ga4-cli.js create-conversion --property=properties/XXXXXXX --event=cta_click
 *   node scripts/ga4-cli.js create-dimension --property=properties/XXXXXXX --name="Blog Slug" --param=blog_slug
 */

import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

// GA4 Property ID (from measurement ID G-4X6LYQ296G)
// You can find the property ID in GA4 Admin > Property Settings
const DEFAULT_PROPERTY = process.env.GA4_PROPERTY_ID || null

const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/analytics.edit'
]

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

async function getAuth() {
  // Try service account from environment or file
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                  path.join(process.cwd(), 'gsc-service-account.json')
  
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Credentials not found at ${keyPath}. Set GOOGLE_APPLICATION_CREDENTIALS.`)
  }
  
  return new google.auth.GoogleAuth({ 
    keyFile: keyPath, 
    scopes: SCOPES 
  })
}

// List all GA4 properties accessible to the service account
async function listProperties(analyticsAdmin) {
  try {
    const { data } = await analyticsAdmin.accountSummaries.list()
    
    if (!data.accountSummaries || data.accountSummaries.length === 0) {
      console.log('No GA4 accounts found.')
      console.log('\n⚠️  The service account may not have access to GA4.')
      console.log('   Add the service account email as a user in GA4 Admin → Account Access Management')
      console.log('   Email: search-console-reader@honeydew-458122.iam.gserviceaccount.com')
      return
    }
    
    console.log('GA4 Account Summaries:\n')
    data.accountSummaries.forEach(account => {
      console.log(`Account: ${account.displayName} (${account.account})`)
      if (account.propertySummaries) {
        account.propertySummaries.forEach(prop => {
          console.log(`  └─ Property: ${prop.displayName}`)
          console.log(`     ID: ${prop.property}`)
          console.log('')
        })
      }
    })
  } catch (error) {
    if (error.code === 403) {
      console.error('❌ Permission denied.')
      console.error('\nThe service account needs access to Google Analytics.')
      console.error('Steps to fix:')
      console.error('1. Go to GA4 Admin → Account Access Management')
      console.error('2. Click "+" to add user')
      console.error('3. Add: search-console-reader@honeydew-458122.iam.gserviceaccount.com')
      console.error('4. Grant "Editor" or "Administrator" role')
    } else {
      throw error
    }
  }
}

// List conversion events for a property
async function listConversions(analyticsAdmin, propertyId) {
  try {
    const { data } = await analyticsAdmin.properties.conversionEvents.list({
      parent: propertyId
    })
    
    if (!data.conversionEvents || data.conversionEvents.length === 0) {
      console.log('No conversion events configured.')
      return
    }
    
    console.log(`Conversion Events for ${propertyId}:\n`)
    data.conversionEvents.forEach(event => {
      console.log(`  • ${event.eventName}`)
      console.log(`    Created: ${event.createTime}`)
      console.log(`    Deletable: ${event.deletable}`)
      console.log('')
    })
  } catch (error) {
    handleApiError(error)
  }
}

// Create a conversion event
async function createConversion(analyticsAdmin, propertyId, eventName) {
  try {
    const { data } = await analyticsAdmin.properties.conversionEvents.create({
      parent: propertyId,
      requestBody: {
        eventName: eventName
      }
    })
    
    console.log(`✅ Conversion event created: ${eventName}`)
    console.log(`   Property: ${propertyId}`)
  } catch (error) {
    if (error.code === 409) {
      console.log(`⚠️  Conversion event "${eventName}" already exists.`)
    } else {
      handleApiError(error)
    }
  }
}

// List custom dimensions
async function listDimensions(analyticsAdmin, propertyId) {
  try {
    const { data } = await analyticsAdmin.properties.customDimensions.list({
      parent: propertyId
    })
    
    if (!data.customDimensions || data.customDimensions.length === 0) {
      console.log('No custom dimensions configured.')
      return
    }
    
    console.log(`Custom Dimensions for ${propertyId}:\n`)
    data.customDimensions.forEach(dim => {
      console.log(`  • ${dim.displayName}`)
      console.log(`    Parameter: ${dim.parameterName}`)
      console.log(`    Scope: ${dim.scope}`)
      console.log('')
    })
  } catch (error) {
    handleApiError(error)
  }
}

// Create a custom dimension
async function createDimension(analyticsAdmin, propertyId, displayName, parameterName, scope = 'EVENT') {
  try {
    const { data } = await analyticsAdmin.properties.customDimensions.create({
      parent: propertyId,
      requestBody: {
        displayName: displayName,
        parameterName: parameterName,
        scope: scope, // EVENT or USER
        description: `Custom dimension for ${parameterName}`
      }
    })
    
    console.log(`✅ Custom dimension created: ${displayName}`)
    console.log(`   Parameter: ${parameterName}`)
    console.log(`   Scope: ${scope}`)
  } catch (error) {
    if (error.code === 409) {
      console.log(`⚠️  Dimension "${displayName}" already exists.`)
    } else {
      handleApiError(error)
    }
  }
}

// List audiences
async function listAudiences(analyticsAdmin, propertyId) {
  try {
    const { data } = await analyticsAdmin.properties.audiences.list({
      parent: propertyId
    })
    
    if (!data.audiences || data.audiences.length === 0) {
      console.log('No audiences configured.')
      return
    }
    
    console.log(`Audiences for ${propertyId}:\n`)
    data.audiences.forEach(aud => {
      console.log(`  • ${aud.displayName}`)
      console.log(`    Description: ${aud.description || 'N/A'}`)
      console.log(`    Membership: ${aud.membershipDurationDays} days`)
      console.log('')
    })
  } catch (error) {
    handleApiError(error)
  }
}

function handleApiError(error) {
  if (error.code === 403) {
    console.error('❌ Permission denied. The service account needs Editor access in GA4.')
  } else if (error.code === 404) {
    console.error('❌ Property not found. Check the property ID.')
  } else {
    console.error(`❌ API Error: ${error.message}`)
  }
}

function printHelp() {
  console.log(`GA4 Admin CLI

Usage:
  node scripts/ga4-cli.js <command> [options]

Commands:
  list-properties           List all accessible GA4 properties
  list-conversions          List conversion events
  create-conversion         Mark an event as conversion
  list-dimensions           List custom dimensions
  create-dimension          Create a custom dimension
  list-audiences            List audiences
  setup-funnel              Run full funnel setup (conversions + dimensions)

Options:
  --property=<id>           GA4 property ID (e.g., properties/123456789)
  --event=<name>            Event name for conversion
  --name=<display>          Display name for dimension
  --param=<parameter>       Parameter name for dimension
  --scope=<EVENT|USER>      Dimension scope (default: EVENT)

Examples:
  node scripts/ga4-cli.js list-properties
  node scripts/ga4-cli.js create-conversion --property=properties/123456 --event=cta_click
  node scripts/ga4-cli.js create-dimension --property=properties/123456 --name="Blog Slug" --param=blog_slug
  node scripts/ga4-cli.js setup-funnel --property=properties/123456

First-time setup:
  1. Run 'list-properties' to check access
  2. If no properties shown, add the service account to GA4:
     - Go to GA4 Admin → Account Access Management
     - Add: search-console-reader@honeydew-458122.iam.gserviceaccount.com
     - Grant "Editor" role
`)
}

// Full funnel setup - create all conversions and dimensions
async function setupFunnel(analyticsAdmin, propertyId) {
  console.log(`\n🚀 Setting up funnel tracking for ${propertyId}\n`)
  
  // Conversions to create
  const conversions = ['cta_click', 'app_store_click']
  
  // Dimensions to create
  const dimensions = [
    { name: 'Blog Article Slug', param: 'blog_slug', scope: 'EVENT' },
    { name: 'CTA Click Source', param: 'click_source', scope: 'EVENT' },
    { name: 'Scroll Depth Percentage', param: 'depth_percentage', scope: 'EVENT' },
    { name: 'Campaign', param: 'campaign', scope: 'EVENT' },
  ]
  
  console.log('Creating conversion events...')
  for (const event of conversions) {
    await createConversion(analyticsAdmin, propertyId, event)
  }
  
  console.log('\nCreating custom dimensions...')
  for (const dim of dimensions) {
    await createDimension(analyticsAdmin, propertyId, dim.name, dim.param, dim.scope)
  }
  
  console.log('\n✅ Funnel setup complete!')
  console.log('\nNote: Audiences must be created manually in GA4 UI (API limitations).')
}

async function main() {
  const { command, options } = parseArgs(process.argv)
  
  if (!command || options.help) {
    printHelp()
    process.exit(0)
  }
  
  try {
    const auth = await getAuth()
    const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth })
    
    const propertyId = options.property || DEFAULT_PROPERTY
    
    switch (command) {
      case 'list-properties':
        await listProperties(analyticsAdmin)
        break
        
      case 'list-conversions':
        if (!propertyId) throw new Error('--property required')
        await listConversions(analyticsAdmin, propertyId)
        break
        
      case 'create-conversion':
        if (!propertyId) throw new Error('--property required')
        if (!options.event) throw new Error('--event required')
        await createConversion(analyticsAdmin, propertyId, options.event)
        break
        
      case 'list-dimensions':
        if (!propertyId) throw new Error('--property required')
        await listDimensions(analyticsAdmin, propertyId)
        break
        
      case 'create-dimension':
        if (!propertyId) throw new Error('--property required')
        if (!options.name) throw new Error('--name required')
        if (!options.param) throw new Error('--param required')
        await createDimension(analyticsAdmin, propertyId, options.name, options.param, options.scope || 'EVENT')
        break
        
      case 'list-audiences':
        if (!propertyId) throw new Error('--property required')
        await listAudiences(analyticsAdmin, propertyId)
        break
        
      case 'setup-funnel':
        if (!propertyId) throw new Error('--property required')
        await setupFunnel(analyticsAdmin, propertyId)
        break
        
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  } catch (error) {
    console.error(`\n❌ ${error.message}`)
    process.exit(1)
  }
}

main()






