import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'

interface Article {
  slug: string
  title: string
  description: string
  publishDate: string
  category: string
  featured?: boolean
}

const BlogListPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch articles from public/blog directory
    const fetchArticles = async () => {
      const articleSlugs = [
        'mental-load',
        'multi-generational',
        'meal-planning',
        'activity-coordination',
        'household-management',
        'best-ai-calendar-apps-for-families-2025',
        'best-voice-controlled-family-apps-2025',
        'honeydew-vs-cozi-comparison-2025',
        'best-family-organization-apps-2025',
        'best-apps-multi-family-coordination-2025',
        'how-ai-transforms-family-organization',
        'how-honeydew-ai-agent-works',
        'voice-input-whisper-ai-guide',
      ]

      const loadedArticles: Article[] = []

      for (const slug of articleSlugs) {
        try {
          const response = await fetch(`/blog/${slug}.md`)
          if (response.ok) {
            const text = await response.text()
            const match = text.match(/^---\n([\s\S]*?)\n---/)
            if (match) {
              const frontmatterText = match[1]
              const fm: any = {}
              frontmatterText.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':')
                if (key && valueParts.length) {
                  const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
                  fm[key.trim()] = value
                }
              })

              // Only include published articles (current or past date)
              if (!fm.publishDate || new Date(fm.publishDate) <= new Date()) {
                loadedArticles.push({
                  slug,
                  title: fm.title || slug,
                  description: fm.description || '',
                  publishDate: fm.publishDate || '',
                  category: fm.category || 'Article',
                  featured: fm.featured === 'true' || fm.featured === true,
                })
              }
            }
          }
        } catch (error) {
          console.error(`Error loading ${slug}:`, error)
        }
      }

      // Sort by date (newest first)
      loadedArticles.sort((a, b) => {
        const dateA = new Date(a.publishDate || 0)
        const dateB = new Date(b.publishDate || 0)
        return dateB.getTime() - dateA.getTime()
      })

      setArticles(loadedArticles)
      setLoading(false)
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

  const featuredArticles = articles.filter(a => a.featured)
  const regularArticles = articles.filter(a => !a.featured)

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <header className="pt-24 pb-16 bg-gradient-to-b from-[#92C5A7]/10 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center bg-[#92C5A7]/10 text-[#4A5568] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#92C5A7]/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#92C5A7]" />
                Insights on AI & Family Organization
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Honeydew <span className="text-[#92C5A7]">Blog</span>
              </h1>
              <p className="text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
                Real stories, practical guides, and deep dives into how AI is transforming family life
              </p>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <motion.div
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
            </motion.div>
          )}

          {/* All Articles */}
          {regularArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article, index) => (
                  <ArticleCard key={article.slug} article={article} index={index} />
                ))}
              </div>
            </motion.div>
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

const ArticleCard = ({ article, index, featured }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Category color mapping based on Honeydew brand guide
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Case Study': '#92C5A7', // Honeydew Green
      'Comparison': '#9DC3FF', // Light Blue
      'Guide': '#B794F6', // Purple
      'Article': '#78E6AF', // Light Mint Green
      'Tutorial': '#FFD166', // Yellow
    }
    return colors[category] || '#92C5A7'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link to={`/blog/${article.slug}`}>
        <div className={`h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${featured ? 'border-[#92C5A7]' : 'border-gray-100'}`}>
          {/* Category Badge */}
          <div 
            className="px-6 py-3"
            style={{ backgroundColor: getCategoryColor(article.category) }}
          >
            <span className="text-sm font-bold text-white uppercase tracking-wider">{article.category}</span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#92C5A7] transition-all line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-[#4A5568] mb-4 line-clamp-3 leading-relaxed">
              {article.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
              {article.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#92C5A7]" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
              )}
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-[#92C5A7] font-semibold group-hover:gap-4 transition-all">
              <span>Read Article</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogListPage

