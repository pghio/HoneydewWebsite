import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Heart, BookOpen, Lightbulb } from 'lucide-react'

const faqs = [
  {
    question: "Why did you create Honeydew? What's the story behind it?",
    answer: "After reading Eve Rodsky's 'Fair Play' book, my wife and I had a breakthrough moment about the mental load of family management. The book brilliantly outlined how to distribute household tasks fairly, but we quickly realized that while Fair Play gave us the framework for equitable task distribution, existing family organization apps like Cozi and Skylight Calendar weren't sophisticated enough to truly solve the problem. Cozi felt like a glorified to-do list that still required constant manual updates, and Skylight Calendar was limited to a wall-mounted display that couldn't adapt to our dynamic family life. We tried every family planner app, household management tool, and smart calendar on the market, but nothing actually reduced the cognitive burden - they just digitized it. That's when we decided: if we're going to truly implement Fair Play's principles and reduce the mental load that overwhelms so many families, we needed to build something fundamentally different. Something with AI that could actually understand 'plan my ski trip' and generate comprehensive packing lists, coordinate schedules, and suggest what we'd forgotten - without us having to think through every detail. Honeydew was born from our frustration with existing solutions and our belief that AI-powered family organization could finally deliver on the promise of reducing mental load, not just redistributing it. We built Honeydew for families like ours who want Fair Play's equity combined with AI's intelligence.",
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    question: "How is Honeydew different from Cozi Family Organizer?",
    answer: "While Cozi is a solid basic family calendar and list app, it lacks the intelligence that modern families need. Cozi requires you to manually create every list item, calendar event, and reminder - it's essentially a digital version of the paper systems families used 20 years ago. Honeydew uses advanced AI to transform how families organize. Instead of manually typing 'sunscreen, beach towels, snacks, water bottles, first aid kit, beach toys...' into a Cozi list, you simply tell Honeydew 'plan our beach day' and the AI instantly generates a comprehensive list with smart suggestions you might have forgotten. Cozi's calendar is static - you input events manually. Honeydew's AI calendar learns your family's patterns, suggests optimal timing to avoid conflicts, and automatically coordinates with everyone's schedules. Cozi can't help you plan a family vacation, organize a birthday party, or coordinate a group trip - it just gives you blank lists and calendars. Honeydew's AI understands natural language requests like 'organize my daughter's 8th birthday party' and creates comprehensive plans with vendor coordination, guest management, timeline creation, and smart suggestions based on what successful parties include. For families implementing Fair Play's card system, Honeydew provides the intelligent automation that makes equitable task distribution actually sustainable, while Cozi leaves you managing the mental load manually.",
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    question: "How does Honeydew compare to Skylight Calendar?",
    answer: "Skylight Calendar is a beautifully designed wall-mounted touchscreen display that shows your family calendar - but that's essentially all it does. At $300+ for the hardware, Skylight is expensive and limited to wherever you mount it. You can't take it to the grocery store, you can't use it while planning your vacation on the couch, and you can't access it when you're coordinating schedules on the go. Honeydew works across all your devices - iPhone, Android, iPad, laptop, wherever you need it. While Skylight is limited to displaying calendar events (which you still have to create manually in Google Calendar or another service), Honeydew combines AI-powered calendar intelligence with smart list creation, natural language planning, and comprehensive family coordination. Skylight can show you that you have 'Soccer Practice' on Thursday at 5pm, but it can't help you prepare for it. Honeydew's AI understands 'prepare for soccer practice' and creates a checklist: pack soccer gear, fill water bottles, prepare healthy snack, check weather for appropriate clothing, set reminder to leave on time. Skylight is essentially a passive display for calendars you create elsewhere. Honeydew is an active AI assistant that reduces the mental load of family organization. For the price of one Skylight Calendar, you get a year of Honeydew premium across unlimited devices for your whole family, with AI that actually helps you organize, not just display what you've already organized.",
    icon: Lightbulb,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    question: "How does Honeydew's AI help organize family life?",
    answer: "Honeydew's AI is like having a personal family assistant that understands natural language and learns your family's patterns. Simply tell Honeydew what you need in conversational language - 'plan my ski trip,' 'organize our beach vacation,' 'prepare for back-to-school,' or 'help me host Thanksgiving dinner' - and the AI instantly transforms your request into comprehensive, organized plans. The AI generates smart lists with items you might forget, suggests optimal timing for activities, coordinates family schedules to prevent conflicts, and provides intelligent reminders based on your family's routines. Unlike basic family organization apps that require manual input for everything, Honeydew's AI learns from your family's patterns and preferences to provide increasingly personalized suggestions. It understands that 'family movie night' means different things for different families and adapts to your preferences. The AI handles the cognitive burden of remembering, planning, and coordinating so you can focus on enjoying family time instead of managing the logistics.",
    icon: Lightbulb,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    question: "Can Honeydew help us implement Fair Play's card system?",
    answer: "Absolutely! Many families discover Honeydew while trying to implement Eve Rodsky's Fair Play methodology. While Fair Play provides the brilliant framework for equitable household task distribution with its card system (Conception, Planning, Execution), most families struggle with the ongoing mental load of actually managing all those tasks. Honeydew brings AI intelligence to Fair Play implementation. Each Fair Play card represents significant cognitive work - the 'Groceries' card alone involves meal planning, inventory tracking, list creation, shopping, and restocking. Honeydew's AI reduces that mental load dramatically. Tell Honeydew 'plan this week's meals' and it suggests recipes, generates grocery lists, checks what you already have, and coordinates shopping schedules. The AI helps with the 'Conception' phase by suggesting what needs doing, the 'Planning' phase by organizing tasks intelligently, and the 'Execution' phase by providing smart reminders and coordination. For couples using Fair Play to distribute household responsibilities fairly, Honeydew ensures that whoever owns a card has AI support to manage it efficiently, making sustainable equity actually achievable instead of just aspirational.",
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    question: "How quickly can I start organizing my family's schedule?",
    answer: "You can start organizing immediately! Unlike Cozi, which requires you to manually set up every list and calendar event, or Skylight Calendar, which requires hardware installation, Honeydew works instantly. Simply download the app, tell Honeydew what you need in natural language - 'organize our beach vacation,' 'plan this week's meals,' or 'prepare for the birthday party' - and AI creates structured lists and schedules in seconds. There's no complex setup, no learning curve, and no manual data entry. The AI understands your requests immediately and starts providing intelligent suggestions from day one. Most families are fully organized within their first 15 minutes of using Honeydew.",
    icon: Heart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    question: "Can Honeydew help plan family vacations and events?",
    answer: "Yes! Honeydew excels at complex event and vacation planning - something Cozi and Skylight Calendar simply can't do. Say 'plan our ski weekend in Aspen' and Honeydew's AI generates comprehensive plans including: equipment rental coordination, packing lists for cold weather, activity schedules for different skill levels, restaurant reservations, weather monitoring, emergency supplies, and family coordination timelines. For birthday parties, tell Honeydew 'organize my daughter's 8th birthday' and get complete event planning: guest list management, invitation tracking, venue booking assistance, decoration ideas, food planning, activity coordination, gift tracking, and party timeline creation. This is the AI-powered family event planning that Fair Play talks about but no other family organization app delivers. The AI understands that a 'family vacation' involves dozens of interconnected tasks and handles the mental load of coordinating them all.",
    icon: Lightbulb,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    question: "Is Honeydew secure for family data?",
    answer: "Yes, Honeydew uses end-to-end encryption and privacy-focused AI processing to keep your family data secure. Unlike basic family apps that may share your data with third parties, we use enterprise-grade security with industry-leading protection. Your family information, schedules, and personal details are encrypted and never shared. We process AI suggestions with privacy-first technology, and many AI features work locally on your device when possible. We understand that family organization apps contain sensitive information about your household, children, schedules, and routines - that's why security is our top priority.",
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    question: "Does Honeydew work offline?",
    answer: "Yes! Honeydew features offline-first design, which is crucial for busy families on the go. Unlike Skylight Calendar, which requires constant WiFi connectivity, or Cozi, which needs internet for most features, Honeydew lets you continue organizing even without internet connection. Access your lists at the grocery store, update schedules during flights, and coordinate family activities anywhere. All changes sync automatically when you're connected, ensuring your family stays coordinated whether you're online or offline.",
    icon: BookOpen,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    question: "Can multiple family members use Honeydew together?",
    answer: "Definitely! Honeydew is built specifically for family coordination with real-time sync across all family members' devices. Unlike Skylight Calendar's single-screen limitation, or Cozi's basic sharing features, Honeydew provides seamless multi-user coordination. Multiple family members can access shared lists, calendars, and plans with instant updates and smart notifications to keep everyone in the loop. This makes implementing Fair Play's equitable task distribution actually practical - whoever owns a task card gets full AI support and automatic updates when other family members make changes. Everyone stays coordinated effortlessly.",
    icon: Heart,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
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
              Ready to experience the evolution beyond Cozi and Skylight?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join families who have transformed their lives with AI-powered organization that actually reduces mental load.
            </p>
            <motion.button
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Organizing Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ




