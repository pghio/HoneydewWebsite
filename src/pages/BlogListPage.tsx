import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import DownloadCTA from '../components/DownloadCTA'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

interface Article {
  slug: string
  title: string
  description: string
  publishDate: string
  category: string
  featured?: boolean
  coverImage?: string
  image?: string
}

const CATEGORY_CLASSES: Record<string, { badge: string; fallback: string }> = {
  'Case Study': {
    badge: 'bg-[#92C5A7] text-white',
    fallback: 'from-[#92C5A7] via-[#dff5e8] to-white',
  },
  Comparison: {
    badge: 'bg-[#9DC3FF] text-gray-900',
    fallback: 'from-[#9DC3FF] via-[#dcecff] to-white',
  },
  Guide: {
    badge: 'bg-[#B794F6] text-white',
    fallback: 'from-[#B794F6] via-[#efe6ff] to-white',
  },
  Tutorial: {
    badge: 'bg-[#FFD166] text-gray-900',
    fallback: 'from-[#FFD166] via-[#fff2c9] to-white',
  },
  Article: {
    badge: 'bg-[#78E6AF] text-gray-900',
    fallback: 'from-[#78E6AF] via-[#d9fae8] to-white',
  },
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getCategoryClasses = (category: string) =>
  CATEGORY_CLASSES[category] ?? CATEGORY_CLASSES.Article

const getArticleCoverImage = (article: Article) =>
  article.coverImage || article.image || `/og/${article.slug}.png`

const BlogListPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: 'Honeydew Family App Blog – AI Organizer Guides & Playbooks',
    description:
      'Deep dives on the AI-first, no-hardware family OS. Voice-controlled family workflows, Honeydew Family App vs competitors, AI meal planning, co-parenting automation, and mobile command center guides.',
    canonical: '/blog',
    keywords:
      'voice-controlled family app, no hardware family calendar, AI meal planning for families, Honeydew Family App vs Skylight, Honeydew Family App vs Cozi, AI family organization tips, co-parenting automation, family OS blog',
    image: '/og-image-ai.jpg',
    type: 'website',
  })

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/blog-manifest.json')
        if (!response.ok) {
          throw new Error('Manifest not found')
        }

        const manifest = await response.json()
        const published = manifest.articles.filter((article: Article) => {
          if (!article.publishDate) return true
          return new Date(article.publishDate) <= new Date()
        })

        setArticles(published)
      } catch (error) {
        console.error('Error loading blog manifest:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    )
  }

  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <>
      <div className="min-h-screen bg-white">
        <header className="pt-24 pb-16 bg-gradient-to-b from-[#f8fbff] via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center bg-[#f4f2ff] text-[#6d5bb5] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#e7e0ff]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI family organization guides
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Honeydew <span className="text-[#92C5A7]">Blog</span>
              </h1>
              <p className="text-lg md:text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
                Comparison guides, practical workflows, and genuinely useful articles designed to earn trust before a family ever downloads the app.
              </p>
            </motion.div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-14 rounded-[28px] border border-[#e8edf4] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-[#8b7bd0] uppercase tracking-[0.2em]">Download-first content</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
                  Start with the app, then explore the details
                </h2>
                <p className="text-gray-700 mt-3">
                  The articles below are built to help families make a confident decision. When they are ready, every major CTA now points to the App Store first, with web as a lighter-weight fallback.
                </p>
              </div>
              <DownloadCTA
                source="blog_list"
                medium="blog_list"
                campaign="primary_cta"
                content="top_banner"
                storeCampaign="blog_list_primary"
                primaryLabel="Try Honeydew on the App Store"
                secondaryLabel="Or explore Honeydew on the web before you download."
                size="sm"
                layout="stacked"
                align="center"
                className="w-full lg:w-auto"
                buttonClassName="inline-flex items-center justify-center rounded-xl bg-[#92C5A7] px-6 py-3 font-semibold text-gray-900 hover:bg-[#86b89b] transition-colors min-h-12"
                secondaryClassName="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                badgesClassName="justify-center"
              />
            </div>
          </motion.div>

          {featuredArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-[#92C5A7]" />
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
                  <ArticleCard key={article.slug} article={article} index={index} featured />
                ))}
              </div>
            </motion.section>
          )}

          {regularArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article, index) => (
                  <ArticleCard key={article.slug} article={article} index={index} />
                ))}
              </div>
            </motion.section>
          )}

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No published articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

interface ArticleCardProps {
  article: Article
  index: number
  featured?: boolean
}

const ArticleCard = ({ article, index, featured = false }: ArticleCardProps) => {
  const categoryClasses = getCategoryClasses(article.category)
  const imageSrc = getArticleCoverImage(article)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/blog/${article.slug}`} className="block h-full">
        <div className={`h-full overflow-hidden rounded-[28px] border bg-white shadow-sm transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)] ${featured ? 'border-[#cfe8d8]' : 'border-[#edf1f5]'}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryClasses.fallback}`}></div>
            <img
              src={imageSrc}
              alt={article.title}
              loading="lazy"
              decoding="async"
              className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm ${categoryClasses.badge}`}>
                {article.category}
              </span>
              {featured && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur">
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 text-[#92C5A7]" />
              <span>{formatDate(article.publishDate)}</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#2F3C36] transition-colors line-clamp-3">
              {article.title}
            </h3>

            <p className="text-[#4A5568] mb-6 line-clamp-3 leading-relaxed">
              {article.description}
            </p>

            <div className="flex items-center gap-2 text-[#2F3C36] font-semibold group-hover:gap-3 transition-all">
              <span>Read Article</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogListPage

