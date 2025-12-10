import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

const BlogPostPreviewPage = () => {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`/blog/${slug}.md`)
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/blog-preview"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Metadata */}
        {frontmatter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              {frontmatter.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{frontmatter.publishDate}</span>
                </div>
              )}
              {frontmatter.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {frontmatter.category}
                  </span>
                </div>
              )}
            </div>

            {frontmatter.title && (
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Honeydew Family App: {frontmatter.title}
              </h1>
            )}

            {frontmatter.description && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {frontmatter.description}
              </p>
            )}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
        >
          <div className="prose prose-lg prose-blue max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:text-gray-700 prose-li:mb-2
            prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-lg
            prose-table:w-full prose-table:border-collapse
            prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
            prose-td:p-3 prose-td:border-t prose-td:border-gray-200
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom rendering for specific elements
                h1: ({node, children, ...props}) => (
                  <h1 className="honeydew-text-gradient" {...props}>
                    Honeydew Family App: {children}
                  </h1>
                ),
                h2: ({node, ...props}) => <h2 className="text-gray-900 border-b-2 border-gray-100 pb-2" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-gray-200 rounded-lg" {...props} />
                  </div>
                ),
                // Style checkmarks and crosses
                p: ({node, children, ...props}) => {
                  const content = String(children)
                  if (content.includes('✅')) {
                    return <p className="flex items-start gap-2" {...props}><span className="text-green-500 flex-shrink-0">✅</span><span>{content.replace('✅', '').trim()}</span></p>
                  }
                  if (content.includes('❌')) {
                    return <p className="flex items-start gap-2" {...props}><span className="text-red-500 flex-shrink-0">❌</span><span>{content.replace('❌', '').trim()}</span></p>
                  }
                  if (content.includes('⚠️')) {
                    return <p className="flex items-start gap-2" {...props}><span className="text-yellow-500 flex-shrink-0">⚠️</span><span>{content.replace('⚠️', '').trim()}</span></p>
                  }
                  return <p {...props}>{children}</p>
                },
                
                // Images with proper alt text and lazy loading
                img: ({node, ...props}) => (
                  <img 
                    {...props} 
                    alt={props.alt || 'Blog image'} 
                    loading="lazy"
                    className="rounded-xl shadow-lg w-full"
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Feedback Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <h3 className="font-semibold text-blue-900 mb-2">💭 Review Feedback</h3>
          <p className="text-blue-800 text-sm mb-3">
            How does this look? Check styling, formatting, readability, and let me know what adjustments you'd like!
          </p>
          <div className="flex gap-3">
            <Link
              to="/blog-preview"
              className="px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              ← Back to List
            </Link>
            <a
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Main Site
            </a>
          </div>
        </motion.div>
      </article>
    </div>
  )
}

export default BlogPostPreviewPage

