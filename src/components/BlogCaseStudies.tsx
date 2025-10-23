import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Brain,
  Users,
  UtensilsCrossed,
  Calendar,
  Home,
  ArrowRight,
  Clock,
  TrendingDown,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  subtitle: string
  icon: any
  color: string
  gradient: string
  problem: string
  solution: string
  results: {
    metric: string
    before: string
    after: string
    improvement: string
  }[]
  keyInsight: string
  timeToRead: string
  slug: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'mental-load',
    title: 'Reducing Family Mental Load',
    subtitle: 'From chaos to coordination in seconds',
    icon: Brain,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    problem: 'Managing 70+ daily family decisions while juggling seven different apps led to decision fatigue, missed appointments, and constant stress.',
    solution: 'AI-powered coordination that understands context and relationships between tasks, replacing fragmented tools with unified intelligence.',
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
    keyInsight: 'The problem isn\'t managing tasks—it\'s managing context and relationships between tasks. AI handles the cognitive burden so you can focus on what matters.',
    timeToRead: '8 min read',
    slug: 'mental-load'
  },
  {
    id: 'multi-generational',
    title: 'Multi-Generational Care Coordination',
    subtitle: 'Bridging technology gaps across generations',
    icon: Users,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    problem: 'Coordinating care for aging parents while managing kids\' activities across seven communication channels led to missed appointments and family stress.',
    solution: 'Multimodal AI that lets each family member communicate naturally—voice, text, or images—while automatically coordinating everything in the background.',
    results: [
      {
        metric: 'Coordination Calls',
        before: '12-15 per week',
        after: '4-5 per week',
        improvement: '60% reduction'
      },
      {
        metric: 'Emergency Situations',
        before: '6-8 per month',
        after: '1-2 per month',
        improvement: '75% reduction'
      },
      {
        metric: 'Family Stress',
        before: 'High anxiety',
        after: 'Manageable',
        improvement: '62% reduction'
      }
    ],
    keyInsight: 'Multi-generational coordination fails when technology assumes everyone communicates the same way. AI that adapts to each person\'s natural style removes friction.',
    timeToRead: '9 min read',
    slug: 'multi-generational'
  },
  {
    id: 'meal-planning',
    title: 'AI-Powered Meal Planning',
    subtitle: 'From 90 minutes of planning to automated nutrition',
    icon: UtensilsCrossed,
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    problem: 'Spending 90 minutes weekly on meal planning while still wasting $100/month on food and missing nutritional goals.',
    solution: 'AI agent that understands dietary restrictions, learns preferences, and generates optimized meal plans with organized shopping lists in seconds.',
    results: [
      {
        metric: 'Planning Time',
        before: '90 min/week',
        after: '22 min/week',
        improvement: '76% reduction'
      },
      {
        metric: 'Food Waste',
        before: '$100/month',
        after: '$58/month',
        improvement: '42% reduction'
      },
      {
        metric: 'Nutritional Balance',
        before: '57% balanced meals',
        after: '86% balanced meals',
        improvement: '+51% improvement'
      }
    ],
    keyInsight: 'Meal planning isn\'t hard because of recipes—it\'s hard because of context integration. AI that understands your calendar, preferences, and inventory transforms the entire process.',
    timeToRead: '10 min read',
    slug: 'meal-planning'
  },
  {
    id: 'activity-coordination',
    title: 'Family Activity Scheduling',
    subtitle: 'Eliminating conflicts and triple-bookings',
    icon: Calendar,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    problem: 'Managing 50+ weekly coordination points across kids\' activities, work, and family time led to 6-8 conflicts per month and constant emergency backup requests.',
    solution: 'AI coordination that understands holistic family schedules, detects conflicts before they happen, and optimizes transportation logistics automatically.',
    results: [
      {
        metric: 'Schedule Conflicts',
        before: '6-8 per month',
        after: '0-1 per month',
        improvement: '85% reduction'
      },
      {
        metric: 'Emergency Requests',
        before: '10-12 per month',
        after: '2-3 per month',
        improvement: '77% reduction'
      },
      {
        metric: 'Schedule Management',
        before: '6-7 hours/week',
        after: '1.5 hours/week',
        improvement: '78% reduction'
      }
    ],
    keyInsight: 'Traditional calendars show what\'s scheduled but don\'t think about logistics. AI that understands travel time, conflicts, and family dynamics prevents problems before they occur.',
    timeToRead: '9 min read',
    slug: 'activity-coordination'
  },
  {
    id: 'household-management',
    title: 'Preventive Home Maintenance',
    subtitle: 'From reactive repairs to proactive care',
    icon: Home,
    color: 'text-red-600',
    gradient: 'from-red-500 to-red-600',
    problem: 'Reactive household management led to $2,400/year in emergency repairs, 3 AM crises, and constant low-level worry about what would break next.',
    solution: 'AI system that tracks maintenance schedules, predicts failures before they happen, and coordinates seasonal preparation automatically.',
    results: [
      {
        metric: 'Emergency Repairs',
        before: '$2,400/year',
        after: '$720/year',
        improvement: '70% reduction'
      },
      {
        metric: 'Task Completion',
        before: '45% on time',
        after: '92% on time',
        improvement: '+104% improvement'
      },
      {
        metric: '3 AM Emergencies',
        before: '4-6 per year',
        after: '1 per year',
        improvement: '83% reduction'
      }
    ],
    keyInsight: '70% of home repair costs are preventable with proper maintenance. AI that remembers what you\'d forget turns reactive crisis management into proactive care.',
    timeToRead: '10 min read',
    slug: 'household-management'
  }
]

const BlogCaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Real Families, Real Results
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Families Are Using{' '}
            <span className="honeydew-text-gradient">AI to Transform</span>
            {' '}Daily Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In-depth case studies showing exactly how AI-powered coordination solves real family organization challenges.
            No marketing fluff—just honest results, metrics, and lessons learned.
          </p>
        </motion.div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                setSelectedCase(selectedCase === index ? null : index)
                if (selectedCase !== index && typeof window !== 'undefined' && (window as any).trackCaseStudyExpand) {
                  (window as any).trackCaseStudyExpand(study.title)
                }
              }}
            >
              <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 h-full ${
                selectedCase === index 
                  ? `border-${study.color.split('-')[1]}-400 shadow-xl scale-105` 
                  : 'border-gray-100 hover:shadow-xl hover:scale-102'
              }`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${study.gradient} flex items-center justify-center mb-4`}>
                  <study.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold ${study.color} mb-2`}>
                  {study.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {study.subtitle}
                </p>

                {/* Time to Read */}
                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{study.timeToRead}</span>
                </div>

                {/* Problem Summary */}
                <div className="bg-red-50 rounded-lg p-3 mb-3">
                  <div className="text-red-900 font-semibold text-xs mb-1">THE PROBLEM</div>
                  <p className="text-red-700 text-sm leading-relaxed">{study.problem}</p>
                </div>

                {/* Results Highlight */}
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="text-green-900 font-semibold text-xs mb-2">KEY RESULT</div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-bold">{study.results[0].improvement}</span>
                  </div>
                  <p className="text-green-700 text-xs mt-1">{study.results[0].metric}</p>
                </div>

                {/* CTA */}
                <motion.div
                  className={`flex items-center space-x-2 ${study.color} font-semibold text-sm`}
                  whileHover={{ x: 5 }}
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>

                {/* Expanded View */}
                {selectedCase === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t-2 border-gray-100"
                  >
                    {/* All Results */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Complete Results:</h4>
                      <div className="space-y-3">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700">{result.metric}</span>
                              <span className="text-xs font-bold text-green-600">{result.improvement}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Before: {result.before}</span>
                              <span>→</span>
                              <span>After: {result.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Insight */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Key Insight:</h4>
                      <p className="text-blue-700 text-sm leading-relaxed italic">
                        {study.keyInsight}
                      </p>
                    </div>

                    {/* External Link */}
                    <motion.a
                      href={`/blog/${study.slug}`}
                      className={`inline-flex items-center space-x-2 bg-gradient-to-r ${study.gradient} text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Read Complete Case Study</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to See Similar Results in Your Family?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              These aren't curated success stories—they're real results from families who implemented AI-powered coordination.
              Your results may vary, but the principles work.
            </p>
            <motion.a
              href="https://app.gethoneydew.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).trackCTA) {
                  (window as any).trackCTA('Case Studies Bottom CTA')
                }
              }}
            >
              <span>Try Honeydew Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="mt-4 text-sm opacity-75">
              No credit card required • See results in your first week • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogCaseStudies




