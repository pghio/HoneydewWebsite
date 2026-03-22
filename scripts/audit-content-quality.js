#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const PUBLIC_BLOG_DIR = path.join(ROOT_DIR, 'public', 'blog')
const REPORT_DIR = path.join(ROOT_DIR, 'reports', 'content-quality')
const APP_STORE_URL = 'https://apps.apple.com/us/app/honeydew-family-calendar/id6752225362'

function hasStaleHoneydewPricing(text) {
  const patterns = [
    /Honeydew[^.\n]{0,80}\$99(?:\/yr|\/year|\b| per year)/i,
    /Honeydew[^.\n]{0,80}\$9\.99/i,
    /family ai[^.\n]{0,80}\$99(?:\/yr|\/year|\b| per year)/i,
    /family ai[^.\n]{0,80}\$9\.99/i,
    /\$99(?:\/yr|\/year|\b| per year)[^.\n]{0,80}(?:Honeydew|family ai)/i,
    /\$9\.99[^.\n]{0,80}(?:Honeydew|family ai)/i,
    /Honeydew only[^|\n]*\|\s*\$9\.99\b/i,
    /ROI vs \$99/i,
  ]

  return patterns.some(pattern => pattern.test(text))
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, body: raw }
  }

  const frontmatter = {}
  match[1].split('\n').forEach(line => {
    const frontmatterMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (!frontmatterMatch) return
    frontmatter[frontmatterMatch[1]] = frontmatterMatch[2].replace(/^["']|["']$/g, '')
  })

  return { frontmatter, body: match[2] }
}

function wordCount(text) {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_|-]/g, ' ')
  const words = cleaned.match(/[a-zA-Z0-9]+/g)
  return words ? words.length : 0
}

function getInternalLinks(text) {
  const links = []
  const regex = /\[[^\]]*\]\(([^)]+)\)/g
  let match

  while ((match = regex.exec(text)) !== null) {
    const href = match[1].split('#')[0]
    if (href.startsWith('/blog/')) {
      links.push(href.replace(/^\/blog\//, '').replace(/\/$/, ''))
    }
    if (href.startsWith('https://www.gethoneydew.app/blog/')) {
      links.push(href.replace('https://www.gethoneydew.app/blog/', '').replace(/\/$/, ''))
    }
  }

  return links
}

function hasFabricatedSignals(text) {
  const patterns = [
    /\b\d{1,2}% (?:reported|said|of users|of parents|of families)\b/i,
    />\s*"[^"]+"\s*—\s*(?:Testing family|Our testing team|Family law attorney|Testing team)/i,
    /we surveyed families who switched/i,
  ]

  return patterns.some(pattern => pattern.test(text))
}

function auditArticle(file, availableSlugs) {
  const raw = fs.readFileSync(path.join(PUBLIC_BLOG_DIR, file), 'utf8')
  const slug = file.replace(/\.md$/, '')
  const { frontmatter, body } = parseFrontmatter(raw)
  const issues = []
  const warnings = []

  if (!body.includes(APP_STORE_URL)) {
    issues.push('Missing App Store CTA link')
  }

  if (/Try Honeydew Free|Try Honeydew free|Start Your Free Trial|Start Free Trial/.test(body)) {
    issues.push('Contains stale free-trial CTA copy')
  }

  if (hasStaleHoneydewPricing(body)) {
    issues.push('Contains stale Honeydew pricing references')
  } else if (!/\$7\.99|\$79\.99/.test(body)) {
    warnings.push('Does not mention current Honeydew pricing')
  }

  if (!frontmatter.coverImage) {
    warnings.push('Missing coverImage frontmatter')
  }

  const words = wordCount(body)
  if (words < 2000) {
    warnings.push(`Thin content (${words} words)`)
  }

  if (!/frequently asked questions|## faq/i.test(body)) {
    issues.push('Missing FAQ section')
  }

  if (!frontmatter.schema && !frontmatter.faqSchema && !frontmatter.listSchema) {
    warnings.push('Missing structured schema frontmatter fields')
  }

  if (hasFabricatedSignals(body)) {
    warnings.push('Contains potential fabricated statistics or testimonial patterns')
  }

  const brokenInternalLinks = getInternalLinks(body).filter(linkSlug => !availableSlugs.has(linkSlug))
  if (brokenInternalLinks.length > 0) {
    issues.push(`Broken internal links: ${brokenInternalLinks.slice(0, 5).join(', ')}`)
  }

  return {
    slug,
    title: frontmatter.title || slug,
    category: frontmatter.category || 'Article',
    wordCount: words,
    issues,
    warnings,
    status: issues.length > 0 ? 'fail' : warnings.length > 0 ? 'warn' : 'pass',
  }
}

function buildMarkdownReport(results) {
  const failCount = results.filter(result => result.status === 'fail').length
  const warnCount = results.filter(result => result.status === 'warn').length
  const passCount = results.filter(result => result.status === 'pass').length

  const lines = [
    '# Content Quality Audit',
    '',
    `- Total articles: ${results.length}`,
    `- Passing: ${passCount}`,
    `- Warnings: ${warnCount}`,
    `- Failing: ${failCount}`,
    '',
  ]

  results.forEach(result => {
    lines.push(`## ${result.title}`)
    lines.push(`- Slug: ${result.slug}`)
    lines.push(`- Status: ${result.status}`)
    lines.push(`- Word count: ${result.wordCount}`)
    if (result.issues.length > 0) {
      lines.push('- Issues:')
      result.issues.forEach(issue => lines.push(`  - ${issue}`))
    }
    if (result.warnings.length > 0) {
      lines.push('- Warnings:')
      result.warnings.forEach(warning => lines.push(`  - ${warning}`))
    }
    lines.push('')
  })

  return `${lines.join('\n')}\n`
}

function main() {
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    throw new Error(`Missing directory: ${PUBLIC_BLOG_DIR}`)
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const files = fs.readdirSync(PUBLIC_BLOG_DIR).filter(file => file.endsWith('.md') && file !== 'CONTENT_STATUS.md')
  const availableSlugs = new Set(files.map(file => file.replace(/\.md$/, '')))
  const results = files.map(file => auditArticle(file, availableSlugs))
  const timestamp = new Date().toISOString().split('T')[0]
  const jsonPath = path.join(REPORT_DIR, `audit-${timestamp}.json`)
  const mdPath = path.join(REPORT_DIR, `audit-${timestamp}.md`)

  fs.writeFileSync(jsonPath, `${JSON.stringify(results, null, 2)}\n`, 'utf8')
  fs.writeFileSync(mdPath, buildMarkdownReport(results), 'utf8')

  const failCount = results.filter(result => result.status === 'fail').length
  const warnCount = results.filter(result => result.status === 'warn').length
  console.log(`🔎 Audited ${results.length} articles`)
  console.log(`   Pass: ${results.length - failCount - warnCount}`)
  console.log(`   Warn: ${warnCount}`)
  console.log(`   Fail: ${failCount}`)
  console.log(`   JSON: ${jsonPath}`)
  console.log(`   Markdown: ${mdPath}`)
}

main()
