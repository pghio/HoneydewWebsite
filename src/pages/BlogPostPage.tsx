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
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-blue-600 prose-h1:bg-clip-text prose-h1:text-transparent
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-purple-200 prose-h2:to-blue-200
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-gray-700 prose-h4:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-purple-700
              prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-50 prose-strong:px-1 prose-strong:rounded
              prose-em:text-gray-600 prose-em:italic
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
              prose-li::marker:text-purple-500 prose-li::marker:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg prose-blockquote:my-6
              prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:my-8
              prose-hr:border-gray-200 prose-hr:my-12
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8"
          >
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
                  <thead className="bg-gradient-to-r from-purple-500 to-blue-500" {...props} />
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
                h1: ({node, ...props}) => (
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 mt-8" {...props} />
                ),
                h2: ({node, ...props}) => (
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 pb-3 border-b-2 border-gray-200" {...props} />
                ),
                h3: ({node, ...props}) => (
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8" {...props} />
                ),
                
                // Beautiful blockquotes
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 pl-6 pr-6 py-4 italic text-gray-700 rounded-r-lg my-6 shadow-sm" {...props} />
                ),
                
                // Styled lists with better spacing
                ul: ({node, ...props}) => (
                  <ul className="space-y-3 my-6 ml-6" {...props} />
                ),
                ol: ({node, ...props}) => (
                  <ol className="space-y-3 my-6 ml-6" {...props} />
                ),
                li: ({node, ...props}) => (
                  <li className="text-gray-700 leading-relaxed text-lg pl-2" {...props} />
                ),
                
                // Enhanced paragraphs with emoji highlighting
                p: ({node, children, ...props}) => {
                  const content = String(children)
                  // Highlight special markers
                  if (content.includes('✅')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg my-4">
                        <span className="text-green-500 text-xl flex-shrink-0 mt-1">✅</span>
                        <p className="text-gray-700 flex-1 m-0" {...props}>{content.replace('✅', '').trim()}</p>
                      </div>
                    )
                  }
                  if (content.includes('❌')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg my-4">
                        <span className="text-red-500 text-xl flex-shrink-0 mt-1">❌</span>
                        <p className="text-gray-700 flex-1 m-0" {...props}>{content.replace('❌', '').trim()}</p>
                      </div>
                    )
                  }
                  if (content.includes('⚠️')) {
                    return (
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg my-4">
                        <span className="text-yellow-500 text-xl flex-shrink-0 mt-1">⚠️</span>
                        <p className="text-gray-700 flex-1 m-0" {...props}>{content.replace('⚠️', '').trim()}</p>
                      </div>
                    )
                  }
                  return <p className="text-gray-700 leading-relaxed mb-6 text-lg" {...props}>{children}</p>
                },
              }}
            >
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
