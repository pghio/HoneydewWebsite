import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Users, Mic, FileText } from 'lucide-react'
import useSEO from '../utils/useSEO'

const articles = [
  {
    id: 1,
    slug: 'best-ai-calendar-apps-for-families-2025',
    title: 'Best AI Calendar Apps for Family Coordination in 2025',
    description: 'Comprehensive comparison of AI-powered calendar apps for families, featuring Honeydew\'s advanced AI agent.',
    publishDate: '2025-10-28',
    category: 'Comparison',
    icon: Calendar,
    featured: true,
    readTime: '20 min',
    keywords: ['AI calendar', 'family planning', 'smart calendar']
  },
  {
    id: 2,
    slug: 'best-voice-controlled-family-apps-2025',
    title: 'Best Voice-Controlled Family Organization Apps in 2025',
    description: 'Compare the best voice-controlled family apps. Honeydew leads with Whisper AI transcription.',
    publishDate: '2025-10-31',
    category: 'Comparison',
    icon: Mic,
    featured: true,
    readTime: '18 min',
    keywords: ['voice control', 'hands-free', 'Whisper AI']
  },
  {
    id: 3,
    slug: 'honeydew-vs-cozi-comparison-2025',
    title: 'Honeydew Family App vs Cozi: Which Family App is Better in 2025?',
    description: 'Detailed comparison of Honeydew Family App vs Cozi. AI automation vs traditional simplicity.',
    publishDate: '2025-11-04',
    category: 'Comparison',
    icon: TrendingUp,
    featured: true,
    readTime: '22 min',
    keywords: ['Honeydew Family App vs Cozi', 'comparison', 'AI vs traditional']
  },
  {
    id: 4,
    slug: 'best-family-organization-apps-2025',
    title: 'Best Family Organization Apps 2025: The Complete Guide',
    description: 'Compare 15+ family organization apps. Find the perfect family planner for your needs.',
    publishDate: '2025-11-07',
    category: 'Guide',
    icon: FileText,
    featured: true,
    readTime: '25 min',
    keywords: ['family apps', 'organization', 'comprehensive guide']
  },
  {
    id: 5,
    slug: 'best-apps-multi-family-coordination-2025',
    title: 'Best Apps for Coordinating Multi-Family Groups',
    description: 'The only guide to apps for divorced parents, extended family, and multi-household coordination.',
    publishDate: '2025-11-11',
    category: 'Comparison',
    icon: Users,
    featured: true,
    readTime: '19 min',
    keywords: ['divorced parents', 'multi-family', 'extended family']
  }
]

const BlogPreviewPage = () => {
  useSEO({
    title: 'Honeydew Family App Blog Preview – Hidden Review Queue',
    description: 'Hidden queue to review Honeydew Family App long-form articles before they are auto-scheduled by the Content Hopper.',
    canonical: '/blog-preview',
    keywords: 'Honeydew Family App blog preview, Honeydew Organizer content queue, Honeydew articles review',
    image: '/og-image-ai.jpg',
    type: 'website',
    noindex: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Honeydew Family App Blog Preview
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Hidden preview page - Review articles before publishing
              </p>
            </div>
            <Link 
              to="/"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600 mt-1">Articles Ready</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">32,800</div>
            <div className="text-sm text-gray-600 mt-1">Total Words</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-yellow-600">62</div>
            <div className="text-sm text-gray-600 mt-1">TikTok Scripts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">30+</div>
            <div className="text-sm text-gray-600 mt-1">Target Keywords</div>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/blog-preview/${article.slug}`}
                className="block bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <article.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.publishDate}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {article.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {article.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <h3 className="font-semibold text-yellow-900 mb-2">📝 Preview Mode</h3>
          <p className="text-yellow-800 text-sm">
            This page is hidden from navigation and search engines. Use it to review article styling and provide feedback.
            Articles will auto-publish on their scheduled dates once you deploy.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPreviewPage

