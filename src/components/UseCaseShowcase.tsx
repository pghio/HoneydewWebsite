import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Users, 
  Plane, 
  Heart, 
  Home, 
  Briefcase,
  Gift
} from 'lucide-react'

interface UseCase {
  id: string
  title: string
  subtitle: string
  icon: any
  color: string
  gradient: string
  description: string
  features: string[]
  example: string
}

const useCases: UseCase[] = [
  {
    id: 'family',
    title: 'Family Life',
    subtitle: 'Bringing families together',
    icon: Users,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Transform daily chaos into organized harmony with smart family coordination.',
    features: ['Shared calendars', 'Chore assignments', 'Family goals', 'Real-time sync'],
    example: '"Plan our weekly family activities" → Automatically organizes dinner plans, sports practice, homework time, and family movie night.'
  },
  {
    id: 'friendship',
    title: 'Friendships',
    subtitle: 'Strengthening bonds',
    icon: Heart,
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-pink-600',
    description: 'Keep friendships thriving with effortless coordination and shared experiences.',
    features: ['Group events', 'Gift planning', 'Shared memories', 'Easy coordination'],
    example: '"Organize Sarah\'s surprise birthday" → Creates guest list, venue booking, gift ideas, decorations, and timeline coordination.'
  },
  {
    id: 'trips',
    title: 'Group Adventures',
    subtitle: 'Epic memories made easy',
    icon: Plane,
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    description: 'From weekend getaways to epic adventures, plan trips that everyone will remember.',
    features: ['Travel itineraries', 'Packing lists', 'Budget tracking', 'Group coordination'],
    example: '"Plan our ski weekend in Aspen" → Generates equipment checklist, accommodation booking, weather preparation, and group activity schedule.'
  },
  {
    id: 'productivity',
    title: 'Personal Growth',
    subtitle: 'Achieving your goals',
    icon: Briefcase,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    description: 'Turn aspirations into achievements with intelligent goal tracking and habit building.',
    features: ['Goal setting', 'Habit tracking', 'Progress monitoring', 'Smart reminders'],
    example: '"Start my morning wellness routine" → Creates meditation schedule, workout plans, healthy breakfast ideas, and gradual habit building.'
  },
  {
    id: 'home',
    title: 'Home Management',
    subtitle: 'Your sanctuary, organized',
    icon: Home,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    description: 'Create a harmonious living space with intelligent home organization and maintenance.',
    features: ['Maintenance schedules', 'Seasonal tasks', 'Home projects', 'Family coordination'],
    example: '"Prepare home for winter" → Organizes heating check, weatherproofing, seasonal decorating, and emergency supplies preparation.'
  },
  {
    id: 'events',
    title: 'Special Occasions',
    subtitle: 'Moments that matter',
    icon: Gift,
    color: 'text-red-600',
    gradient: 'from-red-500 to-red-600',
    description: 'Make every celebration unforgettable with comprehensive event planning and coordination.',
    features: ['Event planning', 'Guest management', 'Timeline creation', 'Vendor coordination'],
    example: '"Host the perfect dinner party" → Creates menu planning, guest coordination, table setting, entertainment, and timing checklist.'
  }
]

const UseCaseShowcase = () => {
  const [activeUseCase, setActiveUseCase] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Auto-rotate through use cases
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUseCase((prev) => (prev + 1) % useCases.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const currentUseCase = useCases[activeUseCase]

  return (
    <section id="use-cases" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your{' '}
            <motion.span
              key={activeUseCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`${currentUseCase.color} inline-block`}
            >
              {currentUseCase.title}
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Honeydew adapts to every aspect of your life, making organization effortless and coordination seamless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Use Case Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {useCases.map((useCase, index) => (
              <motion.button
                key={useCase.id}
                onClick={() => setActiveUseCase(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  index === activeUseCase
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-white hover:shadow-md'
                }`}
                whileHover={{ scale: index === activeUseCase ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${useCase.gradient} flex items-center justify-center`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${index === activeUseCase ? useCase.color : 'text-gray-900'}`}>
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{useCase.subtitle}</p>
                  </div>
                  {index === activeUseCase && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-current rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Use Case Details */}
          <motion.div
            key={activeUseCase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentUseCase.gradient} flex items-center justify-center mb-4`}>
                <currentUseCase.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${currentUseCase.color} mb-2`}>
                {currentUseCase.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentUseCase.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentUseCase.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentUseCase.gradient}`} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Example */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">AI in Action:</h4>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                {currentUseCase.example}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12 space-x-2"
        >
          {useCases.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveUseCase(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeUseCase ? currentUseCase.gradient.replace('from-', 'bg-').replace(' to-blue-600', '') : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default UseCaseShowcase