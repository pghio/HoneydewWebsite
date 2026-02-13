import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, RefreshCcw, ArrowRight, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Footer from '../components/Footer'
import ListEmbedCard from '../components/ListEmbedCard'
import { trackLinkClick } from '../utils/analytics'
import { 
  createScrollTracker, 
  startTimeTracking, 
  buildBlogCTALink,
  trackAppStoreClick 
} from '../utils/funnelTracking'
import { buildRelatedComparisonLinks } from '../utils/comparisonLinks'

type TocItem = {
  id: string
  level: 2 | 3
  text: string
}

type ManifestArticle = {
  slug: string
  title: string
  description?: string
  publishDate?: string
  category?: string
  featured?: boolean
  keywords?: string
}

function stripFencedCodeBlocks(markdown: string) {
  // Best-effort removal of fenced code blocks so headings inside code fences don't appear in TOC.
  return markdown.replace(/```[\s\S]*?```/g, '')
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+={}\[\]|\\:;"'<>,.?/]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getPlainText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(getPlainText).join('')
  // ReactMarkdown children can include nested elements; keep a safe fallback.
  if (node && typeof node === 'object' && 'props' in (node as any)) {
    return getPlainText((node as any).props?.children)
  }
  return ''
}

function getWebpSource(src?: string): string | null {
  if (!src) return null
  const normalized = src.toLowerCase()
  if (!normalized.startsWith('/blog-images/')) return null
  if (normalized.endsWith('.webp')) return src
  if (/\.(jpg|jpeg|png)$/.test(normalized)) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }
  return null
}

function buildToc(markdown: string): TocItem[] {
  const text = stripFencedCodeBlocks(markdown || '')
  const lines = text.split('\n')
  const counts = new Map<string, number>()
  const items: TocItem[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    const match = /^(##|###)\s+(.+)$/.exec(line)
    if (!match) continue

    const level = match[1] === '##' ? 2 : 3
    const headingText = match[2].trim().replace(/\s+#\s*$/, '').trim()
    if (!headingText) continue

    const base = slugifyHeading(headingText) || 'section'
    const next = (counts.get(base) ?? 0) + 1
    counts.set(base, next)
    const id = next === 1 ? base : `${base}-${next}`

    items.push({ id, level, text: headingText })
  }

  return items
}

const BlogPostPage = () => {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState<ManifestArticle[]>([])
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [stickyDismissed, setStickyDismissed] = useState(false)

  const tocItems = useMemo(() => buildToc(content), [content])

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`/blog/${slug}.md`)
        if (!response.ok) {
          throw new Error('Article not found')
        }
        const text = await response.text()
        
        // Parse frontmatter
        const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/)
        if (match) {
          const frontmatterText = match[1]
          const contentText = match[2]
          
          // Parse frontmatter into object
          const fm: any = {}
          frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':')
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
              fm[key.trim()] = value
            }
          })
          
          setFrontmatter(fm)
          setContent(contentText)
        } else {
          setContent(text)
        }
      } catch (error) {
        console.error('Error loading article:', error)
        setContent('# Article not found\n\nThe requested article could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  // Sticky CTA: show after user scrolls a bit (dismissed per-article).
  useEffect(() => {
    if (!slug) return
    const key = `hd_blog_sticky_dismissed:${slug}`
    setStickyDismissed(typeof window !== 'undefined' ? window.sessionStorage.getItem(key) === '1' : false)

    const handleScroll = () => {
      if (typeof window === 'undefined') return
      setShowStickyCTA(window.scrollY > 520)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true } as any)
    return () => window.removeEventListener('scroll', handleScroll as any)
  }, [slug])

  // Related articles: load manifest and pick the most similar posts.
  useEffect(() => {
    if (!slug || !frontmatter) return

    const loadRelated = async () => {
      try {
        const res = await fetch('/blog-manifest.json')
        if (!res.ok) return
        const manifest = await res.json()
        const articles: ManifestArticle[] = Array.isArray(manifest?.articles) ? manifest.articles : []

        const now = new Date()
        const published = articles.filter(a => {
          if (!a?.slug || a.slug === slug) return false
          if (!a.publishDate) return true
          return new Date(a.publishDate) <= now
        })

        const currentCategory = String(frontmatter.category || '').trim().toLowerCase()
        const currentKeywords = String(frontmatter.keywords || '')
          .split(',')
          .map(k => k.trim().toLowerCase())
          .filter(Boolean)
        const currentKeywordSet = new Set(currentKeywords)

        const scored = published
          .map(a => {
            const kw = String(a.keywords || '')
              .split(',')
              .map(k => k.trim().toLowerCase())
              .filter(Boolean)
            let score = 0
            if (currentCategory && String(a.category || '').trim().toLowerCase() === currentCategory) score += 4
            for (const k of kw) if (currentKeywordSet.has(k)) score += 2
            if (a.featured) score += 1
            const dateValue = a.publishDate ? new Date(a.publishDate).getTime() : 0
            return { a, score, dateValue }
          })
          .sort((x, y) => (y.score - x.score) || (y.dateValue - x.dateValue))
          .slice(0, 6)
          .map(x => x.a)

        setRelatedArticles(scored)
      } catch {
        // Non-fatal
      }
    }

    loadRelated()
  }, [frontmatter, slug])

  // Add SEO meta tags when frontmatter loads
  useEffect(() => {
    if (!frontmatter || !slug) return

    const baseUrl = 'https://www.gethoneydew.app'
    const articleUrl = `${baseUrl}/blog/${slug}`
    const imageUrl = frontmatter.image 
      ? `${baseUrl}${frontmatter.image}` 
      : `${baseUrl}/og-image-ai.jpg`

    // Set document title
    if (frontmatter.title) {
      document.title = `${frontmatter.title} | Honeydew Family App Blog`
    }

    // Remove existing meta tags that we'll replace
    const removeMetaTags = ['description', 'keywords', 'author', 'og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'article:published_time', 'article:author', 'article:section']
    removeMetaTags.forEach(name => {
      const existing = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)
      if (existing) existing.remove()
    })

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) existingCanonical.remove()

    // Remove existing JSON-LD schemas
    const existingSchema = document.querySelector('script[type="application/ld+json"][data-article-schema]')
    if (existingSchema) existingSchema.remove()
    
    // Remove any existing FAQ schemas to prevent duplicates
    const existingFaq = document.querySelector('script[type="application/ld+json"][data-faq-schema]')
    if (existingFaq) existingFaq.remove()

    // Add canonical URL
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = articleUrl
    document.head.appendChild(canonical)

    // Add basic meta tags
    const metaTags = [
      { name: 'description', content: frontmatter.description || '' },
      { name: 'keywords', content: frontmatter.keywords || '' },
      { name: 'author', content: frontmatter.author || 'Honeydew Team' },
    ]

    metaTags.forEach(({ name, content }) => {
      if (content) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    })

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: frontmatter.title || '' },
      { property: 'og:description', content: frontmatter.description || '' },
      { property: 'og:url', content: articleUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'article:published_time', content: frontmatter.publishDate || '' },
      { property: 'article:author', content: frontmatter.author || 'Honeydew Team' },
      { property: 'article:section', content: frontmatter.category || 'Blog' },
    ]

    ogTags.forEach(({ property, content }) => {
      if (content) {
        const meta = document.createElement('meta')
        meta.setAttribute('property', property)
        meta.content = content
        document.head.appendChild(meta)
      }
    })

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: frontmatter.title || '' },
      { name: 'twitter:description', content: frontmatter.description || '' },
      { name: 'twitter:image', content: imageUrl },
    ]

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    })

    // Calculate word count and reading time from content
    const wordCount = frontmatter.wordCount 
      ? parseInt(frontmatter.wordCount) 
      : content.split(/\s+/).filter(w => w.length > 0).length
    const readingMinutes = Math.ceil(wordCount / 200) // Average reading speed
    const readingTime = frontmatter.readingTime || `PT${readingMinutes}M`

    // Add Article schema (JSON-LD) - Enhanced for LLM indexing
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: frontmatter.title || '',
      alternativeHeadline: frontmatter.description?.substring(0, 100) || '',
      description: frontmatter.description || '',
      image: imageUrl,
      datePublished: frontmatter.publishDate || new Date().toISOString().split('T')[0],
      dateModified: frontmatter.updatedOn || frontmatter.publishDate || new Date().toISOString().split('T')[0],
      author: {
        '@type': 'Person',
        name: frontmatter.author || 'Honeydew Team',
        url: `${baseUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Honeydew Family App',
        alternateName: 'Honeydew Organizer',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
        sameAs: [
          'https://apps.apple.com/app/honeydew-family-organizer/id6475768439',
          'https://play.google.com/store/apps/details?id=app.gethoneydew.honeydew'
        ]
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      keywords: frontmatter.keywords || '',
      articleSection: frontmatter.category || 'Blog',
      inLanguage: 'en-US',
      wordCount: wordCount,
      timeRequired: readingTime,
      isAccessibleForFree: true,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['article', '.prose']
      }
    }

    // Add about field for topic categorization (helps LLMs understand content)
    const topicKeywords = (frontmatter.keywords || '').toLowerCase()
    if (topicKeywords.includes('co-parenting') || topicKeywords.includes('divorced')) {
      schema.about = {
        '@type': 'Thing',
        name: 'Co-parenting Apps',
        description: 'Software applications designed to help divorced or separated parents coordinate child-related activities and communication'
      }
    } else if (topicKeywords.includes('family calendar') || topicKeywords.includes('family organization')) {
      schema.about = {
        '@type': 'Thing',
        name: 'Family Organization Apps',
        description: 'Software applications designed to help families coordinate schedules, tasks, and activities'
      }
    }

    // Add mentions for competitor apps (helps with comparison article visibility)
    const mentionedApps: string[] = []
    const appPatterns = [
      { name: 'Cozi', pattern: /\bcozi\b/i },
      { name: 'OurFamilyWizard', pattern: /\bourfamilywizard\b/i },
      { name: 'Skylight Calendar', pattern: /\bskylight\b/i },
      { name: 'TimeTree', pattern: /\btimetree\b/i },
      { name: 'Google Calendar', pattern: /\bgoogle calendar\b/i },
      { name: 'AppClose', pattern: /\bappclose\b/i },
      { name: 'Talking Parents', pattern: /\btalking parents\b/i },
      { name: '2houses', pattern: /\b2houses\b/i },
      { name: 'Todoist', pattern: /\btodoist\b/i },
      { name: 'Fantastical', pattern: /\bfantastical\b/i },
    ]
    appPatterns.forEach(({ name, pattern }) => {
      if (pattern.test(content) && !mentionedApps.includes(name)) {
        mentionedApps.push(name)
      }
    })
    if (mentionedApps.length > 0) {
      schema.mentions = mentionedApps.map(name => ({
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: 'LifestyleApplication'
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-article-schema', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    // Note: Review schema removed from comparison articles.
    // Google prohibits self-serving reviews (a business reviewing its own product).
    // The AggregateRating in index.html's SoftwareApplication schema handles star
    // ratings in search results. Blog articles use Article + FAQ + Breadcrumb schemas.

    // Cleanup function to restore default title and remove tags when unmounting
    return () => {
      document.title = 'Honeydew Family App – AI Organizer with 27+ Tools'
      const faqScript = document.querySelector('script[data-faq-schema]')
      if (faqScript) faqScript.remove()
      const howtoScript = document.querySelector('script[data-howto-schema]')
      if (howtoScript) howtoScript.remove()
      const breadcrumbScript = document.querySelector('script[data-breadcrumb-schema]')
      if (breadcrumbScript) breadcrumbScript.remove()
      const itemlistScript = document.querySelector('script[data-itemlist-schema]')
      if (itemlistScript) itemlistScript.remove()
      removeMetaTags.forEach(name => {
        const existing = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)
        if (existing) existing.remove()
      })
      const canonicalCleanup = document.querySelector('link[rel="canonical"]')
      if (canonicalCleanup) {
        // Reset to homepage canonical
        canonicalCleanup.setAttribute('href', 'https://www.gethoneydew.app/')
      }
      const schemaCleanup = document.querySelector('script[type="application/ld+json"][data-article-schema]')
      if (schemaCleanup) schemaCleanup.remove()
    }
  }, [frontmatter, slug])

  // Scroll depth and time tracking for funnel analytics
  useEffect(() => {
    if (!slug || loading) return
    
    // Start scroll tracking
    const cleanupScroll = createScrollTracker(slug, () => {
      // Milestone callback - tracking handled in createScrollTracker
    })
    
    // Start time tracking
    const cleanupTime = startTimeTracking(slug)
    
    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [slug, loading])

  // Add FAQ, HowTo, and Breadcrumb schemas when content loads
  useEffect(() => {
    if (!content || !frontmatter || !slug) return

    const baseUrl = 'https://www.gethoneydew.app'
    const articleUrl = `${baseUrl}/blog/${slug}`

    // Add FAQ schema if article contains FAQ section
    if (content.toLowerCase().includes('frequently asked questions') || content.toLowerCase().includes('## faq')) {
      // Parse FAQ questions from markdown - handles multiple formats:
      // 1. ### Q: Question text (H3 headers) - most common
      // 2. ### Question text? (H3 question headers in FAQ section)
      // 3. **Q: Question text** (bold format)
      const faqs: { question: string; answer: string }[] = []
      
      // Helper to clean up answer text
      const cleanAnswer = (text: string): string => {
        return text
          .replace(/^\*\*A:\*\*\s*/i, '') // Remove **A:** prefix
          .replace(/^A:\s*/i, '')          // Remove A: prefix
          .replace(/\n+/g, ' ')            // Collapse newlines
          .replace(/\s+/g, ' ')            // Collapse spaces
          .replace(/\*\*/g, '')            // Remove bold markers
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to plain text
          .trim()
          .substring(0, 500)
      }
      
      // Pattern 1: ### Q: Question format (most common in our articles)
      // Matches: ### Q: What is the best co-parenting app?
      const h3QPattern = /###\s*Q:\s*(.+?)\n\n?([\s\S]*?)(?=\n###\s*Q:|\n## |\n---|\n\*\*Q:|\z)/gi
      let match
      while ((match = h3QPattern.exec(content)) !== null) {
        const question = match[1].trim()
        const answer = cleanAnswer(match[2])
        if (question && answer && answer.length > 20) {
          faqs.push({ question, answer })
        }
      }
      
      // Pattern 2: H3 headers that are questions (end with ?)
      // Matches: ### Is OurFamilyWizard worth the cost?
      if (faqs.length === 0) {
        // Find the FAQ section first
        const faqSectionMatch = content.match(/##\s*(?:FAQ|Frequently Asked Questions)[^\n]*\n([\s\S]*?)(?=\n## [^#]|$)/i)
        if (faqSectionMatch) {
          const faqSection = faqSectionMatch[1]
          const h3QuestionPattern = /###\s*([^#\n]+\?)\s*\n\n?([\s\S]*?)(?=\n###|\n## |$)/gi
          while ((match = h3QuestionPattern.exec(faqSection)) !== null) {
            const question = match[1].trim()
            const answer = cleanAnswer(match[2])
            if (question && answer && answer.length > 20) {
              faqs.push({ question, answer })
            }
          }
        }
      }
      
      // Pattern 3: **Q:** format (legacy/fallback)
      if (faqs.length === 0) {
        const boldPattern = /\*\*Q:\s*([^*\n]+)\*\*\s*\n?\s*([\s\S]*?)(?=\*\*Q:|\n##|$)/gi
        while ((match = boldPattern.exec(content)) !== null) {
          const question = match[1].trim()
          const answer = cleanAnswer(match[2])
          if (question && answer && answer.length > 20) {
            faqs.push({ question, answer })
          }
        }
      }

      if (faqs.length > 0) {
        const faqSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.slice(0, 15).map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }

        const faqScript = document.createElement('script')
        faqScript.type = 'application/ld+json'
        faqScript.setAttribute('data-faq-schema', 'true')
        faqScript.textContent = JSON.stringify(faqSchema)
        document.head.appendChild(faqScript)
      }
    }
    
    // Add ItemList schema for "Best Of" articles (important for LLM indexing)
    if (frontmatter.title?.toLowerCase().includes('best ') || 
        frontmatter.category === 'Comparison' && frontmatter.title?.toLowerCase().includes('ranked')) {
      // Parse ranked items from content - looks for numbered rankings like "1.", "#1", "🥇"
      const items: { position: number; name: string; url?: string }[] = []
      
      // Pattern: numbered rankings with app names
      const rankingPatterns = [
        /(?:^|\n)(?:#{1,3}\s*)?(?:\*\*)?(?:#?\d+|🥇|🥈|🥉)\.?\s*\*?\*?\s*\[?([^\]\n*#]+?)(?:\]|\*\*|\s*[-–—])/gim,
        /\|\s*(?:🥇|🥈|🥉|[1-9])\s*\|\s*\*?\*?([^|*\n]+?)\*?\*?\s*\|/gi,
      ]
      
      rankingPatterns.forEach(pattern => {
        let match
        let pos = 1
        while ((match = pattern.exec(content)) !== null && pos <= 10) {
          const name = match[1].trim().replace(/^\*+|\*+$/g, '').trim()
          if (name && name.length > 2 && name.length < 100 && !items.find(i => i.name === name)) {
            items.push({ position: pos++, name })
          }
        }
      })
      
      if (items.length >= 3) {
        const itemListSchema = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: frontmatter.title || 'Best Apps Ranking',
          description: frontmatter.description || '',
          numberOfItems: items.length,
          itemListElement: items.map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: item.name.toLowerCase().includes('honeydew') 
              ? { '@type': 'SoftwareApplication', name: item.name, url: baseUrl }
              : { '@type': 'SoftwareApplication', name: item.name },
          })),
        }

        const itemListScript = document.createElement('script')
        itemListScript.type = 'application/ld+json'
        itemListScript.setAttribute('data-itemlist-schema', 'true')
        itemListScript.textContent = JSON.stringify(itemListSchema)
        document.head.appendChild(itemListScript)
      }
    }

    // Add HowTo schema for guide articles
    if (frontmatter.title?.toLowerCase().includes('guide') || 
        frontmatter.title?.toLowerCase().includes('how to') ||
        frontmatter.category === 'Guide' ||
        frontmatter.category === 'Tutorial') {
      
      const howtoSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: frontmatter.title || '',
        description: frontmatter.description || '',
        image: frontmatter.image ? `${baseUrl}${frontmatter.image}` : `${baseUrl}/og-image-ai.jpg`,
        totalTime: frontmatter.readingTime || 'PT15M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
      }

      const howtoScript = document.createElement('script')
      howtoScript.type = 'application/ld+json'
      howtoScript.setAttribute('data-howto-schema', 'true')
      howtoScript.textContent = JSON.stringify(howtoSchema)
      document.head.appendChild(howtoScript)
    }

    // Add Breadcrumb schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: frontmatter.title || 'Article',
          item: articleUrl,
        },
      ],
    }

    const breadcrumbScript = document.createElement('script')
    breadcrumbScript.type = 'application/ld+json'
    breadcrumbScript.setAttribute('data-breadcrumb-schema', 'true')
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema)
    document.head.appendChild(breadcrumbScript)

  }, [content, frontmatter, slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!frontmatter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Honeydew Family App Article Not Found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const blogCtaHref = buildBlogCTALink(slug ?? 'unknown', 'bottom')
  const midArticleCtaHref = buildBlogCTALink(slug ?? 'unknown', 'inline')
  const stickyCtaHref = buildBlogCTALink(slug ?? 'unknown', 'sticky')
  const relatedComparisonLinks = buildRelatedComparisonLinks('__none__', 4)

  const MidArticleCTA = () => (
    <div className="my-10 rounded-2xl border border-[#92C5A7]/30 bg-gradient-to-br from-[#92C5A7]/15 via-white to-[#78E6AF]/10 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2F3C36]">Want the “done-for-you” version of this?</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">
            Try Honeydew free and let AI build the plan
          </h3>
          <p className="text-gray-700 mt-2">
            Voice, text, or photo → lists + calendar in seconds. No hardware required.
          </p>
        </div>
        <a
          href={midArticleCtaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#92C5A7] px-5 py-3 font-semibold text-gray-900 hover:bg-[#86b89b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92C5A7]/50"
          onClick={() => {
            trackLinkClick({
              href: midArticleCtaHref,
              source: 'blog_post_mid',
              label: frontmatter.title ?? slug ?? 'blog_post',
              campaign: 'article_conversion_mid',
              additionalParams: {
                blog_slug: slug,
                article_category: frontmatter.category,
              },
            })
            trackAppStoreClick('blog_cta_mid', `article_${slug}`, 'web')
          }}
        >
          Try Honeydew Free
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Header */}
        <header className="bg-gradient-to-br from-[#92C5A7] to-[#78E6AF] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/blog"
              className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Honeydew Family App: {frontmatter.title}
              </h1>
              {frontmatter.description && (
                <p className="text-xl text-white/90 mb-6">
                  {frontmatter.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              {frontmatter.publishDate && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(frontmatter.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                  </>
                )}
              {frontmatter.updatedOn && (
                <>
                  <div className="flex items-center space-x-2">
                    <RefreshCcw className="w-4 h-4" />
                    <span>
                      Updated{' '}
                      {new Date(frontmatter.updatedOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span>•</span>
                </>
              )}
                {frontmatter.author && (
                  <>
                    <span>By {frontmatter.author}</span>
                    <span>•</span>
                  </>
                )}
                {frontmatter.category && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>{frontmatter.category}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Table of Contents (quick UX win + better engagement) */}
          {tocItems.length > 1 && (
            <div className="mb-10 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <p className="font-bold text-gray-900">On this page</p>
                <p className="text-sm text-gray-600 mt-1">Jump to the section you need.</p>
              </div>
              <div className="px-6 py-4">
                <ul className="space-y-2">
                  {tocItems.slice(0, 18).map(item => (
                    <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm font-medium text-gray-700 hover:text-[#2F3C36] hover:underline underline-offset-2"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/*
            Inject a mid-article CTA after the first H2.
            This addresses “CTA clarity mid-page” without requiring content edits per-post.
          */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-blue-600 prose-h1:bg-clip-text prose-h1:text-transparent
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-purple-200 prose-h2:to-blue-200
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-gray-700 prose-h4:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-[#92C5A7] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#78E6AF]
              prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-50 prose-strong:px-1 prose-strong:rounded
              prose-em:text-gray-600 prose-em:italic
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
              prose-li::marker:text-[#92C5A7] prose-li::marker:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-[#92C5A7] prose-blockquote:bg-[#92C5A7]/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg prose-blockquote:my-6
              prose-code:text-[#92C5A7] prose-code:bg-[#92C5A7]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:my-8
              prose-hr:border-gray-200 prose-hr:my-12
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8"
          >
            {(() => {
              let h2Count = 0
              const headingCounts = new Map<string, number>()
              const nextHeadingId = (headingText: string) => {
                const base = slugifyHeading(headingText) || 'section'
                const next = (headingCounts.get(base) ?? 0) + 1
                headingCounts.set(base, next)
                return next === 1 ? base : `${base}-${next}`
              }
              return (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Beautiful gradient tables
                table: ({node, ...props}) => (
                  <div className="my-8 overflow-hidden rounded-xl shadow-lg border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200" {...props} />
                    </div>
                  </div>
                ),
                thead: ({node, ...props}) => (
                  <thead className="bg-gradient-to-r from-[#92C5A7] to-[#78E6AF]" {...props} />
                ),
                th: ({node, ...props}) => (
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider" {...props} />
                ),
                tbody: ({node, ...props}) => (
                  <tbody className="bg-white divide-y divide-gray-100" {...props} />
                ),
                tr: ({node, ...props}) => (
                  <tr className="hover:bg-gray-50 transition-colors" {...props} />
                ),
                td: ({node, ...props}) => (
                  <td className="px-6 py-4 text-gray-700 text-base" {...props} />
                ),
                
                // Enhanced headings
                h1: ({node, children, ...props}) => (
                  <h1 className="text-4xl font-bold text-[#92C5A7] mb-6 mt-8" {...props}>
                    Honeydew Family App: {children}
                  </h1>
                ),
                h2: ({ node, children, ...props }) => {
                  h2Count += 1
                  const text = getPlainText(children)
                  const id = nextHeadingId(text)
                  if (h2Count === 1) {
                    return (
                      <>
                        <h2
                          className="text-3xl font-bold text-gray-900 mb-6 mt-12 pb-3 border-b-2 border-gray-200"
                          id={id}
                          {...props}
                        />
                        <MidArticleCTA />
                      </>
                    )
                  }
                  return (
                    <h2
                      className="text-3xl font-bold text-gray-900 mb-6 mt-12 pb-3 border-b-2 border-gray-200"
                      id={id}
                      {...props}
                    />
                  )
                },
                h3: ({ node, children, ...props }) => {
                  const text = getPlainText(children)
                  const id = nextHeadingId(text)
                  return <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8" id={id} {...props} />
                },
                
                // Beautiful blockquotes
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#92C5A7] bg-[#92C5A7]/5 pl-6 pr-6 py-4 italic text-gray-700 rounded-r-lg my-6 shadow-sm" {...props} />
                ),
                
                // Styled lists with better spacing
                ul: ({node, ...props}) => (
                  <ul className="list-disc space-y-3 my-6 pl-6 marker:text-[#92C5A7] marker:font-semibold" {...props} />
                ),
                ol: ({node, ...props}) => (
                  <ol className="list-decimal space-y-3 my-6 pl-6 marker:text-[#92C5A7] marker:font-semibold" {...props} />
                ),
                li: ({node, ...props}) => (
                  <li className="text-gray-700 leading-relaxed text-lg" {...props} />
                ),
                
                // Enhanced paragraphs with emoji highlighting
                p: ({node, children, ...props}) => {
                  // Detect Honeydew list embed markers: {{HONEYDEW_EMBED:slug}}
                  const rawText = typeof children === 'string' ? children.trim() :
                    (Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : '').join('').trim() : '')
                  const embedMatch = rawText.match(/^\{\{HONEYDEW_EMBED:([a-z0-9-]+)\}\}$/)
                  if (embedMatch) {
                    return <ListEmbedCard listSlug={embedMatch[1]} articleSlug={slug} />
                  }

                  // Only process simple text content, not complex React elements
                  const isSimpleText = typeof children === 'string' || 
                    (Array.isArray(children) && children.every(child => typeof child === 'string'))
                  
                  if (!isSimpleText) {
                    // Has complex children (links, bold, etc) - render normally
                    return <p className="text-gray-700 leading-relaxed mb-6 text-lg" {...props}>{children}</p>
                  }

                  const content = Array.isArray(children) ? children.join('') : String(children)
                  
                  // Highlight special markers
                  if (content.includes('✅')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg my-4">
                        <span className="text-green-500 text-xl flex-shrink-0 mt-1">✅</span>
                        <p className="text-gray-700 flex-1 m-0">{content.replace('✅', '').trim()}</p>
                      </div>
                    )
                  }
                  if (content.includes('❌')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg my-4">
                        <span className="text-red-500 text-xl flex-shrink-0 mt-1">❌</span>
                        <p className="text-gray-700 flex-1 m-0">{content.replace('❌', '').trim()}</p>
                      </div>
                    )
                  }
                  if (content.includes('⚠️')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg my-4">
                        <span className="text-yellow-500 text-xl flex-shrink-0 mt-1">⚠️</span>
                        <p className="text-gray-700 flex-1 m-0">{content.replace('⚠️', '').trim()}</p>
                      </div>
                    )
                  }
                  return <p className="text-gray-700 leading-relaxed mb-6 text-lg" {...props}>{children}</p>
                },
                
                // Images with proper alt text and lazy loading
                img: ({node, ...props}) => {
                  let originalSrc = typeof props.src === 'string' ? props.src : undefined
                  // Normalize relative image paths to /blog-images/ so they resolve correctly
                  if (originalSrc && !originalSrc.startsWith('/') && !originalSrc.startsWith('http')) {
                    originalSrc = `/blog-images/${originalSrc}`
                  }
                  const webpSrc = getWebpSource(originalSrc)
                  return (
                    <picture>
                      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
                      <img
                        {...props}
                        src={originalSrc}
                        alt={props.alt || 'Blog image'}
                        loading="lazy"
                        decoding="async"
                        className="rounded-xl shadow-2xl my-8 w-full"
                      />
                    </picture>
                  )
                },

                // Rich list preview cards for app.gethoneydew.app/lists/ links
                a: ({node, href, children, ...props}) => {
                  const isListLink = href && href.includes('app.gethoneydew.app/lists')
                  
                  if (!isListLink) {
                    // Default link rendering with existing green styling
                    const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
                    return (
                      <a
                        href={href}
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-[#92C5A7] font-medium no-underline hover:underline hover:text-[#78E6AF] transition-colors"
                        {...props}
                      >
                        {children}
                      </a>
                    )
                  }

                  // Build UTM-tracked deep link
                  const separator = href.includes('?') ? '&' : '?'
                  const utmParams = `utm_source=blog&utm_medium=embedded_list&utm_campaign=${encodeURIComponent(slug || 'blog_article')}`
                  const trackedHref = `${href}${separator}${utmParams}`
                  
                  const isBrowseAll = href.endsWith('/lists') || href.endsWith('/lists/')
                  const linkText = typeof children === 'string' ? children : 
                    Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : '').join('') : ''

                  if (isBrowseAll) {
                    // "Browse All" renders as a CTA button
                    return (
                      <a
                        href={trackedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="not-prose inline-flex items-center gap-2 rounded-xl bg-[#92C5A7] px-6 py-3 font-semibold text-gray-900 hover:bg-[#86b89b] transition-colors no-underline shadow-sm hover:shadow-md"
                        onClick={() => trackLinkClick({
                          href: trackedHref,
                          source: 'blog_post_list_browse_all',
                          label: 'Browse All Lists',
                          campaign: 'list_crosslink',
                          additionalParams: { blog_slug: slug }
                        })}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        {children}
                      </a>
                    )
                  }

                  // Individual list link → rich interactive card
                  return (
                    <a
                      href={trackedHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="not-prose group flex items-center gap-3 my-2 px-4 py-3 rounded-xl border border-[#92C5A7]/25 bg-gradient-to-r from-white to-[#92C5A7]/5 hover:border-[#92C5A7] hover:shadow-md transition-all no-underline cursor-pointer"
                      onClick={() => trackLinkClick({
                        href: trackedHref,
                        source: 'blog_post_list_crosslink',
                        label: linkText || 'list_link',
                        campaign: 'list_crosslink',
                        additionalParams: { blog_slug: slug }
                      })}
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#92C5A7]/15 flex items-center justify-center text-lg">📋</span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-gray-900 group-hover:text-[#2F3C36] text-base leading-tight">{children}</span>
                        <span className="block text-sm text-gray-500 mt-0.5">Free interactive checklist · Tap to customize</span>
                      </span>
                      <span className="flex-shrink-0 text-[#92C5A7] font-semibold text-sm hidden sm:block group-hover:translate-x-0.5 transition-transform">Use&nbsp;List&nbsp;→</span>
                    </a>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
              )
            })()}
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Related articles</h3>
              <p className="text-gray-600 mb-6">Keep reading (and keep the whole family system consistent).</p>
              <div className="grid gap-3">
                {relatedArticles.length > 0 ? (
                  relatedArticles.slice(0, 5).map(a => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 font-semibold hover:border-[#92C5A7] hover:text-[#2F3C36] transition-colors"
                    >
                      <span className="line-clamp-1">{a.title}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </Link>
                  ))
                ) : (
                  <Link
                    to="/blog"
                    className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 font-semibold hover:border-[#92C5A7] hover:text-[#2F3C36] transition-colors"
                  >
                    <span>Browse all articles</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compare Honeydew</h3>
              <p className="text-gray-600 mb-6">See how the AI-first, no-hardware family OS stacks up.</p>
              <div className="grid gap-3">
                <Link
                  to="/compare"
                  className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 font-semibold hover:border-[#92C5A7] hover:text-[#2F3C36] transition-colors"
                >
                  <span>All comparisons</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Link>
                {relatedComparisonLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 font-semibold hover:border-[#92C5A7] hover:text-[#2F3C36] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-br from-[#92C5A7] to-[#78E6AF] rounded-xl p-8 text-white text-center shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Family Organization?
            </h3>
            <p className="text-lg opacity-95 mb-6">
              Join thousands of families using the Honeydew Family App&#39;s AI-powered coordination
            </p>
            <motion.a
              href={blogCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#92C5A7] px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackLinkClick({
                  href: blogCtaHref,
                  source: 'blog_post_footer',
                  label: frontmatter.title ?? slug ?? 'blog_post',
                  campaign: 'article_conversion',
                  additionalParams: {
                    blog_slug: slug,
                    article_category: frontmatter.category,
                  },
                })
                trackAppStoreClick('blog_cta', `article_${slug}`, 'web')
              }}
            >
              Try Honeydew Free
            </motion.a>
          </motion.div>
        </article>
      </motion.div>
      <Footer />

      {/* Sticky CTA (conversion win without rewriting content) */}
      {showStickyCTA && !stickyDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-4 left-4 right-4 md:right-6 md:left-auto md:w-[420px] z-40 drop-shadow-2xl"
        >
          <div className="rounded-2xl bg-gradient-to-r from-[#92C5A7] to-[#78E6AF] text-gray-900 border border-white/30 backdrop-blur-md">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-900/70 mb-1">Try the “done-for-you” version</p>
                  <p className="text-lg font-semibold leading-snug">
                    Turn voice, text, or photos into lists + calendar events in seconds.
                  </p>
                </div>
                <button
                  className="rounded-lg p-2 text-gray-900/70 hover:text-gray-900 hover:bg-white/20 transition-colors"
                  aria-label="Dismiss"
                  onClick={() => {
                    if (typeof window !== 'undefined' && slug) {
                      window.sessionStorage.setItem(`hd_blog_sticky_dismissed:${slug}`, '1')
                    }
                    setStickyDismissed(true)
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <motion.a
                href={stickyCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-gray-900 font-semibold px-4 py-3 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  trackLinkClick({
                    href: stickyCtaHref,
                    source: 'blog_post_sticky',
                    label: frontmatter.title ?? slug ?? 'blog_post',
                    campaign: 'article_conversion_sticky',
                    additionalParams: {
                      blog_slug: slug,
                      article_category: frontmatter.category,
                    },
                  })
                  trackAppStoreClick('blog_cta_sticky', `article_${slug}`, 'web')
                }}
              >
                Try Honeydew Free
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default BlogPostPage
