#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { fetchTopBlogContent } from './content-performance.js'
import { loadBlogArticles, splitArticlesByPublishDate } from './utils/blog-content.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'blog-images', 'covers')
const WIDTH = 1600
const HEIGHT = 900

const CATEGORY_STYLES = {
  Comparison: { accent: '#7c5cff', bgStart: '#f5f3ff', bgEnd: '#eaf1ff' },
  Guide: { accent: '#14b8a6', bgStart: '#f0fdfa', bgEnd: '#e0f2fe' },
  Tutorial: { accent: '#f59e0b', bgStart: '#fffbeb', bgEnd: '#fff7ed' },
  'Case Study': { accent: '#16a34a', bgStart: '#f0fdf4', bgEnd: '#ecfccb' },
  Article: { accent: '#0f172a', bgStart: '#f8fafc', bgEnd: '#e2e8f0' },
}

function parseArgs(argv) {
  const options = {}
  argv.slice(2).forEach(arg => {
    if (!arg.startsWith('--')) return
    const [key, value = 'true'] = arg.slice(2).split('=')
    options[key] = value
  })
  return options
}

function wrapText(text, maxLineLength = 24) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  words.forEach(word => {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLineLength && current) {
      lines.push(current)
      current = word
      return
    }
    current = next
  })

  if (current) lines.push(current)
  return lines.slice(0, 4)
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSvg(article) {
  const style = CATEGORY_STYLES[article.category] || CATEGORY_STYLES.Article
  const titleLines = wrapText(article.title)
  const linesMarkup = titleLines
    .map((line, index) => `<text x="112" y="${280 + (index * 96)}" font-size="82" font-weight="700" fill="#0f172a" font-family="Inter, system-ui, sans-serif">${escapeXml(line)}</text>`)
    .join('\n')

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${style.bgStart}" />
        <stop offset="100%" stop-color="${style.bgEnd}" />
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${style.accent}" />
        <stop offset="100%" stop-color="#92C5A7" />
      </linearGradient>
    </defs>

    <rect width="${WIDTH}" height="${HEIGHT}" rx="48" fill="url(#bg)" />
    <rect x="56" y="56" width="${WIDTH - 112}" height="${HEIGHT - 112}" rx="40" fill="rgba(255,255,255,0.72)" />
    <rect x="56" y="56" width="${WIDTH - 112}" height="${HEIGHT - 112}" rx="40" fill="none" stroke="rgba(15,23,42,0.08)" />

    <rect x="112" y="112" width="220" height="58" rx="29" fill="${style.accent}" />
    <text x="222" y="149" text-anchor="middle" font-size="26" font-weight="700" fill="#ffffff" font-family="Inter, system-ui, sans-serif">${escapeXml(article.category || 'Article')}</text>

    ${linesMarkup}

    <text x="112" y="676" font-size="34" font-weight="500" fill="#475569" font-family="Inter, system-ui, sans-serif">Built for families who want a trustworthy first impression.</text>

    <g transform="translate(1028, 170)">
      <rect width="420" height="540" rx="42" fill="#ffffff" />
      <rect x="0" y="0" width="420" height="540" rx="42" fill="none" stroke="rgba(15,23,42,0.08)" />
      <rect x="44" y="54" width="188" height="28" rx="14" fill="url(#accent)" opacity="0.18" />
      <rect x="44" y="108" width="332" height="70" rx="24" fill="#f8fafc" />
      <rect x="44" y="196" width="332" height="116" rx="28" fill="url(#accent)" opacity="0.16" />
      <rect x="44" y="332" width="150" height="110" rx="26" fill="#f8fafc" />
      <rect x="212" y="332" width="164" height="110" rx="26" fill="#eff6ff" />
      <rect x="44" y="466" width="332" height="28" rx="14" fill="#e2e8f0" />
      <circle cx="76" cy="76" r="18" fill="url(#accent)" />
      <text x="104" y="84" font-size="24" font-weight="700" fill="#0f172a" font-family="Inter, system-ui, sans-serif">Honeydew</text>
      <text x="104" y="114" font-size="18" fill="#64748b" font-family="Inter, system-ui, sans-serif">App Store landing-ready article</text>
    </g>

    <text x="112" y="792" font-size="32" font-weight="700" fill="#0f172a" font-family="Inter, system-ui, sans-serif">Honeydew</text>
    <text x="284" y="792" font-size="28" fill="#64748b" font-family="Inter, system-ui, sans-serif">App Store-first content system</text>
  </svg>`
}

function getFallbackCandidates(limit) {
  const { published } = splitArticlesByPublishDate(loadBlogArticles())
  return published.slice(0, limit).map(article => ({
    slug: article.slug,
    title: article.title,
    category: article.category || 'Article',
  }))
}

export async function generateCoverImages({
  limit = 20,
  all = false,
  force = false,
  credentials,
} = {}) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const selection = all
    ? loadBlogArticles()
    : (await fetchTopBlogContent({ limit, credentials })).rows

  const articles = selection.length > 0 ? selection : getFallbackCandidates(limit)
  let generated = 0
  let skipped = 0

  for (const article of articles) {
    if (!article?.slug || !article?.title) continue
    const outputPath = path.join(OUTPUT_DIR, `${article.slug}.png`)
    if (!force && fs.existsSync(outputPath)) {
      skipped += 1
      continue
    }

    const svg = buildSvg(article)
    await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outputPath)
    generated += 1
  }

  return {
    generated,
    skipped,
    total: articles.length,
    outputDir: OUTPUT_DIR,
  }
}

async function main() {
  const options = parseArgs(process.argv)
  const result = await generateCoverImages({
    limit: Number(options.limit || 20),
    all: options.all === 'true',
    force: options.force === 'true',
    credentials: options.credentials,
  })

  console.log(`🖼️ Cover images generated: ${result.generated}`)
  console.log(`⏭️ Cover images skipped: ${result.skipped}`)
  console.log(`📁 Output: ${result.outputDir}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch(error => {
    console.error('❌ Failed to generate cover images:', error)
    process.exit(1)
  })
}
