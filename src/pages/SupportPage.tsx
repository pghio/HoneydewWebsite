import { motion } from 'framer-motion'
import { ArrowLeft, Mail, MessageCircle, BookOpen, Users, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'

const SupportPage = () => {
  const location = useLocation()

  useSEO({
    title: 'Honeydew Family App Support – Get Help, Documentation, and AI Workflow Guidance',
    description:
      'Access Honeydew support resources: help center, step-by-step documentation, community tips, and direct email assistance for AI planning, calendar sync, and family coordination.',
    canonical: location.pathname,
    keywords:
      'honeydew support, honeydew help center, honeydew documentation, ai family planner support, honeydew contact',
    image: '/blog-images/honeydew-ai-agent.jpg',
    type: 'website',
  })

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Get Help',
      description: 'Browse our comprehensive help center for answers to common questions.',
      action: 'Visit Help Center',
      href: '/help'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Detailed guides and tutorials for getting the most out of Honeydew.',
      action: 'Read Docs',
      href: '/docs'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other Honeydew users and share tips and experiences.',
      action: 'Join Community',
      href: '/community'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Need personalized help? Send us an email and we\'ll get back to you.',
      action: 'Contact Us',
      href: 'mailto:pete@gethoneydew.app'
    }
  ]

  const commonQuestions = [
    {
      question: 'How do I get started with Honeydew?',
      answer: 'Simply sign up for a free account and start creating your first list. Our AI will guide you through the process and learn your preferences.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and follow privacy best practices. Your data is yours - we never sell or share it with third parties.'
    },
    {
      question: 'Can I use Honeydew offline?',
      answer: 'Yes! Core functionality works offline. When you reconnect, everything syncs automatically across your devices.'
    },
    {
      question: 'How does the AI learn my preferences?',
      answer: 'The AI learns from your usage patterns, requests, and feedback. It gets smarter with every interaction to provide better suggestions.'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Honeydew Family App Support
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              We're here to help you get the most out of Honeydew. Choose the support option that works best for you.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <option.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {option.description}
                </p>

                {option.href.startsWith('mailto:') ? (
                  <a
                    href={option.href}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <span>{option.action}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    to={option.href}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <span>{option.action}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Direct Support
            </h2>
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                For personalized assistance, feature requests, or technical issues, please contact our support team directly.
              </p>
              <a
                href="mailto:pete@gethoneydew.app"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span>Email Support: pete@gethoneydew.app</span>
              </a>
              <p className="text-sm text-gray-500 mt-4">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              {commonQuestions.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + (index * 0.1) }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}

export default SupportPage
