import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  MessageSquare,
  Mic,
  Camera,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DemoStep {
  id: string
  title: string
  subtitle: string
  icon: any
  color: string
  gradient: string
  input: string
  output: string[]
  time: string
}

const demoSteps: DemoStep[] = [
  {
    id: 'text',
    title: 'Type It',
    subtitle: 'Natural Language Understanding',
    icon: MessageSquare,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    input: '"Create a packing list for our camping trip next weekend and add it to the calendar"',
    output: [
      '✅ Created "Camping Trip Packing List" with 25+ items',
      '✅ Added "Camping Trip" event to calendar (June 15-17)',
      '✅ Linked packing list to calendar event',
      '✅ Shared with family members',
      '✅ Set smart reminders for 1 day before'
    ],
    time: '3 seconds'
  },
  {
    id: 'voice',
    title: 'Say It',
    subtitle: 'Voice Commands & Streaming',
    icon: Mic,
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    input: '"Add milk to the grocery list"',
    output: [
      '✅ Added "Milk (1 gallon)" to "Weekly Groceries"',
      '✅ Updated shopping list with current prices',
      '✅ Notified family members of the change',
      '✅ Voice confirmation: "Added to your list"'
    ],
    time: '2 seconds'
  },
  {
    id: 'image',
    title: 'Photograph It',
    subtitle: 'Image Processing & OCR',
    icon: Camera,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    input: '[Photo of handwritten recipe with ingredients]',
    output: [
      '✅ Extracted 12 ingredients using OCR technology',
      '✅ Created "Italian Pasta Recipe" shopping list',
      '✅ Organized by grocery store sections',
      '✅ Added quantities and estimated costs',
      '✅ Cross-referenced with existing meal plan'
    ],
    time: '5 seconds'
  }
]

const MultimodalDemo = () => {
  const [activeStep, setActiveStep] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentStep = demoSteps[activeStep]

  return (
    <section id="multimodal-demo" className="scroll-mt-24 py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
            <Sparkles className="w-4 h-4 mr-2" />
            Multimodal AI Intelligence
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Works However{' '}
            <motion.span
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`${currentStep.color} inline-block`}
            >
              You Do
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI assistant adapts to your natural communication style. Type a complex request,
            speak a quick command, or photograph a handwritten list - Honeydew handles it all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Input Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {demoSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  index === activeStep
                    ? 'bg-white shadow-lg scale-105 border-2'
                    : 'bg-gray-50 hover:bg-white hover:shadow-md'
                } ${index === activeStep ? `border-${step.color.split('-')[1]}-300` : ''}`}
                whileHover={{ scale: index === activeStep ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${index === activeStep ? step.color : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.subtitle}</p>
                  </div>
                  {index === activeStep && (
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

          {/* Demo Visualization */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentStep.gradient} flex items-center justify-center mb-4`}>
                <currentStep.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${currentStep.color} mb-2`}>
                {currentStep.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentStep.gradient} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">You</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Input</span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{currentStep.time}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-current">
                <div className={`text-sm font-medium mb-2 ${currentStep.color}`}>
                  {currentStep.title === 'Type It' ? 'Natural Language Request:' : currentStep.title === 'Say It' ? 'Voice Command:' : 'Photo Input:'}
                </div>
                <div className="text-gray-700 italic">
                  {currentStep.input}
                </div>
              </div>
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">AI Agent Response</span>
              </div>

              <div className="space-y-2">
                {currentStep.output.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 bg-green-50 rounded-lg p-3"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
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
          {demoSteps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? demoSteps[index].gradient.replace('from-', 'bg-').replace(' to-green-600', '') : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Experience the Power of Multimodal AI
            </h3>
            <p className="text-gray-600 mb-6">
              See how Honeydew's AI agent handles any input method with intelligent, contextual responses.
            </p>
            <motion.a
              href="https://app.gethoneydew.app/?utm_source=website&utm_medium=multimodal_demo&utm_campaign=secondary_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 mx-auto inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try All Input Methods</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MultimodalDemo



