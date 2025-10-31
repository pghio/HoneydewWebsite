import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Heart, BookOpen, Lightbulb } from 'lucide-react'

const faqs = [
  {
    question: "Why did you create Honeydew?",
    answer: "My wife and I loved the Fair Play framework, but existing apps like Cozi still left us drowning in manual work. We built Honeydew to use AI to actually handle the mental load, not just digitize it.",
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    question: "How is Honeydew different from Cozi?",
    answer: "Cozi requires manual entry for everything. Honeydew's AI generates complete lists from one sentence. Tell it 'beach day' and get sunscreen, towels, snacks, toys—everything you'd forget. It also works with Apple Calendar (Cozi doesn't) and handles multiple family groups for divorced parents.",
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    question: "How does Honeydew compare to Skylight Calendar?",
    answer: "Skylight is a $300+ wall display that shows your calendar. Honeydew works on all your devices (phone, laptop, tablet) and actually helps you plan. Skylight shows 'Soccer Practice Thursday 5pm'—Honeydew reminds you to pack gear, fill water bottles, and check weather. Plus you can use it at the grocery store, not just at home.",
    icon: Lightbulb,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    question: "How does the AI actually work?",
    answer: "Tell Honeydew 'plan camping trip' in plain English and it generates a complete packing list in 3 seconds—tent, sleeping bags, food, first aid, everything. It learns your family's patterns over time. After a few uses, it remembers that 'soccer practice' means cleats, water bottle, and healthy snack.",
    icon: Lightbulb,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    question: "Does it work with Fair Play cards?",
    answer: "Yes! Fair Play gives you the framework, but managing all those cards is still exhausting. Honeydew's AI handles the mental load for each card. The 'Groceries' card becomes: tell Honeydew 'plan this week's meals' and it generates recipes, grocery lists, and shopping coordination automatically.",
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    question: "How fast can I get started?",
    answer: "Instantly. Download the app, say 'plan this week's meals' and get organized in 3 seconds. No setup, no manual entry. Most families are fully organized within 15 minutes of downloading.",
    icon: Heart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    question: "Can it plan vacations and parties?",
    answer: "Absolutely. Say 'plan ski weekend in Aspen' and get equipment lists, packing for cold weather, activity schedules, restaurant ideas, weather alerts—everything. For 'organize daughter's 8th birthday' you'll get guest lists, decorations, food ideas, activity timeline, and gift tracking. It's like having an event planner in your pocket.",
    icon: Lightbulb,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    question: "Is our family data secure?",
    answer: "Yes. Your data is encrypted end-to-end and never shared with third parties. Many AI features work locally on your device for extra privacy. We know family apps contain sensitive info about your kids and schedules—security is our top priority.",
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    question: "Does it work offline?",
    answer: "Yes! Access your lists at the grocery store, update schedules on flights, organize anywhere. Changes sync automatically when you're back online. Perfect for busy families on the go.",
    icon: BookOpen,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    question: "Can multiple family members use it?",
    answer: "Absolutely. Everyone in your family gets real-time updates across all devices. Mom adds milk to the list while dad's at the store—he sees it instantly. Perfect for Fair Play task distribution where multiple people need to coordinate.",
    icon: Heart,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    question: "How much does Honeydew cost?",
    answer: "Honeydew offers a free tier to get started. Honeydew More unlocks unlimited AI planning, advanced family coordination, and multi-family support for $7.99/month. That's less than the cost of a Skylight Calendar ($300+) or hiring someone to organize your life, and you get AI intelligence that actually saves you 3-5 hours per week. Honeydew All with advanced features is coming soon.",
    icon: Lightbulb,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // Open first question by default to show story
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="honeydew-text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Honeydew's AI-powered family organization and how we're different from Cozi, Skylight Calendar, and traditional Fair Play implementation
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'border-primary-300' : 'border-gray-100'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full px-6 py-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors ${
                    openIndex === index ? faq.bgColor : ''
                  }`}
                >
                  <div className="flex items-start space-x-4 flex-1 pr-4">
                    <div className={`w-10 h-10 rounded-xl ${faq.bgColor} flex items-center justify-center flex-shrink-0 mt-1`}>
                      <Icon className={`w-5 h-5 ${faq.color}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${openIndex === index ? faq.color : 'text-gray-900'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className={`w-5 h-5 ${faq.color} flex-shrink-0 mt-1`} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  )}
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 pb-6 ${faq.bgColor}`}>
                    <div className="pl-14">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA after FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to try AI-powered family organization?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join 2,400+ families who use Honeydew to save time and reduce stress every week.
            </p>
            <motion.a
              href="https://app.gethoneydew.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Honeydew Free
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ




