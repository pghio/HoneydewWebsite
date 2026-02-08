#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

const CONFIG_PATH = path.join(repoRoot, 'scripts/website-manager-agent-config.json')
const STATE_PATH = path.join(repoRoot, 'scripts/website-manager-agent-state.json')

const readJson = (filePath, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    if (fallback !== undefined) return fallback
    throw error
  }
}

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8')
}

const getDateString = (override) => {
  if (override) return override
  return new Date().toISOString().split('T')[0]
}

const normalizeSlug = (value) => value.replace(/^\/+|\/+$/g, '')

const parseFrontmatter = (raw) => {
  const lines = raw.split(/\r?\n/)
  if (lines[0]?.trim() !== '---') {
    return { frontmatter: {}, body: raw, errors: ['missing_frontmatter'] }
  }
  let endIndex = -1
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIndex = i
      break
    }
  }
  if (endIndex === -1) {
    return { frontmatter: {}, body: raw, errors: ['unclosed_frontmatter'] }
  }
  const frontmatterLines = lines.slice(1, endIndex)
  const body = lines.slice(endIndex + 1).join('\n')
  const frontmatter = {}
  frontmatterLines.forEach((line) => {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (!match) return
    const key = match[1]
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (value === 'true') value = true
    if (value === 'false') value = false
    frontmatter[key] = value
  })
  return { frontmatter, body, errors: [] }
}

const wordCount = (text) => {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_|-]/g, ' ')
  const words = cleaned.match(/[a-zA-Z0-9]+/g)
  return words ? words.length : 0
}

const containsAny = (text, patterns) =>
  patterns.some((pattern) => text.toLowerCase().includes(pattern.toLowerCase()))

const getInternalBlogLinks = (text, host) => {
  const urls = []
  const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g
  let match
  while ((match = linkRegex.exec(text))) {
    urls.push(match[1])
  }
  const normalized = urls
    .map((url) => url.split('#')[0])
    .map((url) => url.replace(/\)$/, ''))
  return normalized
    .filter((url) => url.startsWith('/blog/') || url.startsWith(`${host}/blog/`))
    .map((url) => url.replace(host, '').replace(/^\/blog\//, ''))
    .map((slug) => normalizeSlug(slug))
}

const formatList = (items) => items.map((item) => `- ${item}`).join('\n')

const run = () => {
  const config = readJson(CONFIG_PATH)
  const state = readJson(STATE_PATH, {
    lastRunDate: null,
    runCount: 0,
    issueHistory: {},
    focusAreas: []
  })

  const dateArg = process.argv.find((arg) => arg.startsWith('--date='))
  const reportDate = getDateString(dateArg ? dateArg.split('=')[1] : null)

  const reportDir = path.join(repoRoot, config.directories.reports)
  fs.mkdirSync(reportDir, { recursive: true })
  const reportPath = path.join(reportDir, `${reportDate}.md`)

  const issues = []
  const warnings = []
  const opportunities = []
  const addIssue = (bucket, type, summary, details) => {
    bucket.push({ type, summary, details })
  }

  const publicBlogDir = path.join(repoRoot, config.directories.publicBlog)
  const scheduledBlogDir = path.join(repoRoot, config.directories.scheduledBlog)

  if (!fs.existsSync(publicBlogDir)) {
    addIssue(issues, 'missing_public_blog_dir', 'Missing public blog directory', publicBlogDir)
  }
  if (!fs.existsSync(scheduledBlogDir)) {
    addIssue(issues, 'missing_scheduled_blog_dir', 'Missing scheduled blog directory', scheduledBlogDir)
  }

  const publicFiles = fs.existsSync(publicBlogDir)
    ? fs.readdirSync(publicBlogDir).filter((file) => file.endsWith('.md'))
    : []
  const scheduledFiles = fs.existsSync(scheduledBlogDir)
    ? fs.readdirSync(scheduledBlogDir).filter((file) => file.endsWith('.md'))
    : []

  const publicSlugs = new Set(publicFiles.map((file) => file.replace(/\.md$/, '')))
  const scheduledSlugs = new Set(scheduledFiles.map((file) => file.replace(/\.md$/, '')))

  const missingPublic = [...scheduledSlugs].filter((slug) => !publicSlugs.has(slug))
  if (missingPublic.length > 0) {
    addIssue(
      issues,
      'scheduled_missing_public',
      'Scheduled posts missing from public blog',
      formatList(missingPublic.slice(0, 50))
    )
  }

  const sitemapPath = path.join(repoRoot, 'public/sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    addIssue(issues, 'missing_sitemap', 'Missing public sitemap.xml', sitemapPath)
  }

  const robotsPath = path.join(repoRoot, 'public/robots.txt')
  if (!fs.existsSync(robotsPath)) {
    addIssue(warnings, 'missing_robots', 'Missing public robots.txt', robotsPath)
  }

  const sitemapContent = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, 'utf-8')
    : ''

  publicFiles.forEach((file) => {
    const filePath = path.join(publicBlogDir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, body, errors } = parseFrontmatter(raw)
    const slug = file.replace(/\.md$/, '')

    if (errors.length > 0) {
      addIssue(
        issues,
        'frontmatter_error',
        `Frontmatter error in ${file}`,
        errors.join(', ')
      )
      return
    }

    const missingFields = config.blogChecks.requiredFrontmatter.filter(
      (field) => !(field in frontmatter)
    )
    if (missingFields.length > 0) {
      addIssue(
        issues,
        'missing_frontmatter_fields',
        `Missing frontmatter fields in ${file}`,
        formatList(missingFields)
      )
    }

    if (frontmatter.slug && frontmatter.slug !== slug) {
      addIssue(
        warnings,
        'slug_mismatch',
        `Slug mismatch in ${file}`,
        `frontmatter: ${frontmatter.slug}, filename: ${slug}`
      )
    }

    if (!sitemapContent.includes(`/blog/${slug}`)) {
      addIssue(
        warnings,
        'missing_sitemap_entry',
        `Blog post missing from sitemap: ${slug}`,
        'Run `npm run generate-sitemap` after content updates.'
      )
    }

    const lowerBody = body.toLowerCase()

    if (config.blogChecks.requireQuickAnswer) {
      const quickAnswerSection = body.slice(0, 800).toLowerCase()
      if (!containsAny(quickAnswerSection, config.blogChecks.quickAnswerPatterns)) {
        addIssue(
          opportunities,
          'missing_quick_answer',
          `Missing quick answer section: ${slug}`,
          'Add a short answer in the first 100 words.'
        )
      }
    }

    if (config.blogChecks.requireTable) {
      if (!body.includes('|') || !body.includes('---')) {
        addIssue(
          opportunities,
          'missing_table',
          `Missing comparison table: ${slug}`,
          'Add at least one markdown table.'
        )
      }
    }

    if (config.blogChecks.requireFAQ) {
      if (!containsAny(lowerBody, config.blogChecks.faqPatterns)) {
        addIssue(
          opportunities,
          'missing_faq',
          `Missing FAQ section: ${slug}`,
          'Add an FAQ section near the end.'
        )
      }
    }

    if (config.blogChecks.requireTikTokIdeas) {
      if (!containsAny(lowerBody, config.blogChecks.tiktokPatterns)) {
        addIssue(
          opportunities,
          'missing_tiktok',
          `Missing TikTok ideas section: ${slug}`,
          'Add TikTok script ideas at the end.'
        )
      }
    }

    if (config.blogChecks.requireCTA) {
      if (!containsAny(lowerBody, config.blogChecks.ctaPatterns)) {
        addIssue(
          opportunities,
          'missing_cta',
          `Missing app CTA link: ${slug}`,
          'Add app or store links to drive conversions.'
        )
      }
    }

    if (config.blogChecks.requireInternalLinks) {
      const internalLinks = getInternalBlogLinks(body, config.blogChecks.internalLinkHost)
      if (internalLinks.length === 0) {
        addIssue(
          opportunities,
          'missing_internal_links',
          `Missing internal blog links: ${slug}`,
          'Add links to related Honeydew articles.'
        )
      } else {
        internalLinks.forEach((linkSlug) => {
          if (!publicSlugs.has(linkSlug)) {
            addIssue(
              warnings,
              'broken_internal_blog_link',
              `Broken internal blog link in ${slug}`,
              `Missing target: ${linkSlug}`
            )
          }
        })
      }
    }

    const count = wordCount(body)
    if (count < config.blogChecks.minWordCount) {
      addIssue(
        opportunities,
        'low_word_count',
        `Low word count in ${slug}`,
        `${count} words (min ${config.blogChecks.minWordCount})`
      )
    }
  })

  config.pageCtaChecks.forEach((check) => {
    const filePath = path.join(repoRoot, check.path)
    if (!fs.existsSync(filePath)) {
      addIssue(issues, 'missing_cta_file', `Missing CTA file: ${check.path}`, check.path)
      return
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    const missingPatterns = check.requiredPatterns.filter((pattern) => !content.includes(pattern))
    if (missingPatterns.length > 0) {
      addIssue(
        warnings,
        'missing_cta_pattern',
        `Missing CTA patterns in ${check.path}`,
        formatList(missingPatterns)
      )
    }
  })

  const appLinks = config.appLinks || {}
  Object.entries(appLinks).forEach(([key, value]) => {
    if (!value || typeof value !== 'string' || !value.startsWith('http')) {
      addIssue(
        issues,
        'invalid_app_link',
        `Invalid app link for ${key}`,
        String(value || '')
      )
    }
  })

  const allIssues = [...issues, ...warnings, ...opportunities]
  const issueTypesSeen = new Set(allIssues.map((item) => item.type))
  const updatedHistory = { ...state.issueHistory }

  issueTypesSeen.forEach((type) => {
    const entry = updatedHistory[type] || { count: 0, lastSeen: null }
    updatedHistory[type] = {
      count: entry.count + 1,
      lastSeen: reportDate
    }
  })

  const focusAreas = [...state.focusAreas]
  const threshold = config.selfImprovement.issueCarryoverThreshold
  Object.entries(updatedHistory).forEach(([type, entry]) => {
    if (entry.count >= threshold && !focusAreas.find((area) => area.issueType === type)) {
      focusAreas.push({ issueType: type, priority: 1, lastUpdated: reportDate })
    }
  })

  const decayDays = config.selfImprovement.focusDecayDays
  const activeFocusAreas = focusAreas.filter((area) => {
    if (!area.lastUpdated) return false
    const last = new Date(area.lastUpdated)
    const now = new Date(reportDate)
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24))
    return diff <= decayDays
  })

  const updatedState = {
    lastRunDate: reportDate,
    runCount: state.runCount + 1,
    issueHistory: updatedHistory,
    focusAreas: activeFocusAreas
  }
  writeJson(STATE_PATH, updatedState)

  const reportLines = []
  reportLines.push(`# Website Manager Agent Report - ${reportDate}`)
  reportLines.push('')
  reportLines.push('## Overview')
  reportLines.push(
    `- ${issues.length} errors, ${warnings.length} warnings, ${opportunities.length} opportunities`
  )
  reportLines.push(`- Public blog posts: ${publicFiles.length}`)
  reportLines.push(`- Scheduled blog posts: ${scheduledFiles.length}`)
  reportLines.push(`- Focus areas: ${activeFocusAreas.length}`)
  reportLines.push('')

  const appendSection = (title, items) => {
    reportLines.push(`## ${title}`)
    if (items.length === 0) {
      reportLines.push('- None')
      reportLines.push('')
      return
    }
    items.forEach((item) => {
      reportLines.push(`- ${item.summary}`)
      if (item.details) {
        reportLines.push(`  ${item.details}`)
      }
    })
    reportLines.push('')
  }

  appendSection('Errors', issues)
  appendSection('Warnings', warnings)
  appendSection('Opportunities', opportunities)

  reportLines.push('## Self-Improvement Updates')
  if (activeFocusAreas.length === 0) {
    reportLines.push('- No active focus areas.')
  } else {
    activeFocusAreas.forEach((area) => {
      reportLines.push(`- Focus: ${area.issueType} (priority ${area.priority})`)
    })
  }
  reportLines.push('')

  reportLines.push('## Next Actions')
  reportLines.push(
    '- Fix errors first, then tackle repeated opportunities in focus areas.'
  )
  reportLines.push(
    '- Rerun after updates: `npm run website-manager`.'
  )
  reportLines.push('')

  fs.writeFileSync(reportPath, `${reportLines.join('\n')}\n`, 'utf-8')

  console.log(`Website Manager Agent report saved to ${reportPath}`)
}

run()
