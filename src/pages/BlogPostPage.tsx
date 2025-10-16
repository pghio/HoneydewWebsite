import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, TrendingDown, ExternalLink } from 'lucide-react'
import Footer from '../components/Footer'

interface BlogPost {
  slug: string
  title: string
  subtitle: string
  timeToRead: string
  publishDate: string
  author: string
  content: string
  results: Array<{
    metric: string
    before: string
    after: string
    improvement: string
  }>
  keyTakeaways: string[]
  relatedPosts: string[]
}

// This would typically come from a CMS or API
const blogPosts: { [key: string]: BlogPost } = {
  'mental-load': {
    slug: 'mental-load',
    title: 'The Invisible Weight - Understanding and Solving Family Mental Load',
    subtitle: 'How we reduced family coordination time by 86% and eliminated missed appointments',
    timeToRead: '8 min read',
    publishDate: 'October 11, 2025',
    author: 'Pete Ghiorse',
    content: `
# The Invisible Weight: Understanding and Solving Family Mental Load

If you've ever woken up at 3 AM remembering that tomorrow is picture day at school and you forgot to iron the special outfit, or realized mid-meeting that you double-booked the dentist and the parent-teacher conference, you're experiencing what researchers call "mental load" - and trust me, I've been there more times than I care to admit.

## What Actually Is Mental Load? (And Why It's Exhausting You)

Mental load is the cognitive and emotional labor of managing a household and family - it's not just doing tasks, it's **remembering, planning, and orchestrating** everything that keeps a family functioning...

[Full article content would be inserted here - this is a template]
    `,
    results: [
      {
        metric: 'Coordination Time',
        before: '14 hours/week',
        after: '2 hours/week',
        improvement: '86% reduction'
      },
      {
        metric: 'Missed Appointments',
        before: '2-3 per month',
        after: '0 per month',
        improvement: '100% elimination'
      },
      {
        metric: 'Decision Fatigue',
        before: '4-5 episodes/week',
        after: '<1 per week',
        improvement: '80% reduction'
      }
    ],
    keyTakeaways: [
      'Mental load isn\'t about doing tasks - it\'s about managing context and relationships between tasks',
      'Traditional tools fragment coordination across multiple apps, increasing cognitive burden',
      'AI that understands family context reduces decision fatigue by 80%',
      'Time savings average 12 hours per week when AI handles coordination logistics'
    ],
    relatedPosts: ['multi-generational', 'activity-coordination']
  },
  // Additional posts would be added here
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? blogPosts[slug] : null

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/#case-studies"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.timeToRead}</span>
              </div>
              <span>•</span>
              <span>{post.publishDate}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            <span>Results at a Glance</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.results.map((result, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">{result.metric}</div>
                <div className="text-xs text-gray-500 mb-2">
                  {result.before} → {result.after}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {result.improvement}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="text-gray-700 leading-relaxed space-y-6">
            {/* Note: In production, this would use a markdown renderer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is a preview page. Full article content will be rendered from markdown files in production.
              </p>
            </div>
            
            <p className="text-xl text-gray-600 font-medium">
              {post.subtitle}
            </p>

            <p>
              Full article content would be rendered here using a markdown parser. 
              The complete articles have been written and are ready to be integrated 
              into your preferred content management system.
            </p>
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {post.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">✓</span>
                <span className="text-gray-700">{takeaway}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to See Similar Results?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Start using Honeydew's AI-powered coordination today
          </p>
          <motion.a
            href="https://app.gethoneydew.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Try Honeydew Free</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Related Posts */}
        {post.relatedPosts.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-12 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedSlug) => {
                const relatedPost = blogPosts[relatedSlug]
                if (!relatedPost) return null
                
                return (
                  <Link
                    key={relatedSlug}
                    to={`/blog/${relatedSlug}`}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedPost.subtitle}
                    </p>
                    <span className="text-primary-600 text-sm font-semibold">
                      Read Case Study →
                    </span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </article>

      <Footer />
    </motion.div>
  )
}

export default BlogPostPage




