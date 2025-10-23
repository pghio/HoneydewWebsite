import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Footer from '../components/Footer'

const BlogPostPage = () => {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
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
              to="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {frontmatter.title}
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-table:w-full prose-table:border-collapse prose-table:my-6
              prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
              prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Family Organization?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of families using Honeydew's AI-powered coordination
            </p>
            <motion.a
              href="https://app.gethoneydew.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Honeydew Free
            </motion.a>
          </motion.div>
        </article>
      </motion.div>
      <Footer />
    </>
  )
}

export default BlogPostPage
