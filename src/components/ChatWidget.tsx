import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
  links?: { text: string; url: string }[]
}

// Knowledge base for smart responses
const knowledgeBase = [
  {
    keywords: ['price', 'cost', 'pricing', 'subscription', 'free', 'pay', 'money', 'expensive', 'cheap', 'afford', 'premium', 'plan'],
    response: "Honeydew offers a **free tier** to get started! Our premium plan (Honeydew More) is **$7.99/month** and unlocks unlimited AI planning, advanced family coordination, and multi-family support. That's less than a coffee per week to save 3-5 hours of planning time!",
    links: [{ text: 'View Pricing', url: '/#pricing' }]
  },
  {
    keywords: ['download', 'install', 'app store', 'get app', 'where', 'find app', 'ios', 'android', 'iphone', 'phone'],
    response: "You can download Honeydew from the **App Store** (iOS) or access it via web at app.gethoneydew.app. We're working on Android too! The app works seamlessly across all your devices.",
    links: [
      { text: 'Download on App Store', url: 'https://apps.apple.com/us/app/honeydew-family-organizer/id1546892037' },
      { text: 'Open Web App', url: 'https://app.gethoneydew.app' }
    ]
  },
  {
    keywords: ['cozi', 'compare', 'vs', 'versus', 'difference', 'better', 'skylight', 'google calendar', 'timetree'],
    response: "Great question! Unlike Cozi or traditional calendars, Honeydew has an **AI agent with 27+ tools** that actually does the planning for you. Just say 'plan beach day' and get a complete list instantly—no manual entry. We also support multi-family coordination for divorced/blended families.",
    links: [
      { text: 'Honeydew vs Cozi', url: '/why-honeydew/vs-cozi' },
      { text: 'Honeydew vs Skylight', url: '/why-honeydew/vs-skylight' },
      { text: 'All Comparisons', url: '/compare' }
    ]
  },
  {
    keywords: ['calendar', 'sync', 'google', 'apple', 'import', 'connect', 'integration'],
    response: "Honeydew offers **two-way sync** with both Google Calendar and Apple Calendar (15-min sync intervals). Your events flow seamlessly between apps. You can even upload a photo of your paper calendar or whiteboard and our AI will extract all the events!",
    links: [{ text: 'Learn About Features', url: '/#features' }]
  },
  {
    keywords: ['voice', 'speak', 'talk', 'say', 'speech', 'whisper', 'hands-free'],
    response: "Yes! Honeydew uses **Whisper AI** for industry-leading voice recognition (>95% accuracy). Just tap the mic and say 'add soccer practice Thursday 5pm' or 'plan camping trip' and watch the magic happen. Perfect for busy parents on the go!",
    links: [{ text: 'See How It Works', url: '/#how-it-works' }]
  },
  {
    keywords: ['ai', 'artificial intelligence', 'smart', 'intelligent', 'machine learning', 'chatgpt', 'gpt'],
    response: "Honeydew's AI agent has **27+ specialized tools** for family organization. It understands natural language, learns your family's patterns (80% cache hit rate), and generates complete plans in seconds. Tell it 'beach day' and get sunscreen, towels, snacks—everything you'd forget!",
    links: [{ text: 'Explore AI Features', url: '/#features' }]
  },
  {
    keywords: ['family', 'share', 'member', 'spouse', 'partner', 'kids', 'children', 'husband', 'wife', 'multiple'],
    response: "Honeydew is built for **whole-family collaboration**! Everyone gets real-time updates across all devices (<50ms sync latency). We also uniquely support **multi-family architecture**—perfect for divorced/blended families coordinating across households.",
    links: [{ text: 'Multi-Family Features', url: '/hubs/co-parenting' }]
  },
  {
    keywords: ['secure', 'privacy', 'safe', 'data', 'private', 'encrypt', 'protection'],
    response: "Your family's data is **encrypted end-to-end** and never shared with third parties. Many AI features work locally on your device for extra privacy. We know family apps contain sensitive info—security is our top priority.",
    links: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Security Info', url: '/security' }
    ]
  },
  {
    keywords: ['not working', 'broken', 'bug', 'error', 'issue', 'problem', 'crash', 'stuck', 'help', 'trouble', 'wrong', "doesn't work", "won't", 'glitch'],
    response: "I'm sorry to hear you're having trouble! Here are some quick fixes:\n\n1. **Try refreshing** the app or logging out/in\n2. **Check your internet** connection\n3. **Update the app** to the latest version\n\nIf the issue persists, please email us at **support@gethoneydew.app** with details about what's happening. A real human (often a founder!) will respond within hours.",
    links: [
      { text: 'Visit Support Center', url: '/support' },
      { text: 'Email Support', url: 'mailto:support@gethoneydew.app' }
    ]
  },
  {
    keywords: ['cancel', 'unsubscribe', 'stop', 'end subscription', 'refund'],
    response: "You can manage your subscription through your App Store settings or your account page. If you need a refund or have billing questions, email **support@gethoneydew.app** and we'll help you right away. No hard feelings—we want you to be happy!",
    links: [{ text: 'Email Support', url: 'mailto:support@gethoneydew.app' }]
  },
  {
    keywords: ['fair play', 'mental load', 'division', 'chores', 'tasks', 'household'],
    response: "Honeydew works beautifully with the **Fair Play** framework! Fair Play gives you the cards, but Honeydew's AI handles the mental load for each one. The 'Groceries' card becomes: tell Honeydew 'plan this week's meals' and get recipes + shopping lists automatically.",
    links: [{ text: 'Fair Play Hub', url: '/hubs/fair-play' }]
  },
  {
    keywords: ['divorced', 'co-parent', 'custody', 'ex', 'split', 'two house', '2 house', 'blended'],
    response: "Honeydew uniquely supports **multi-family coordination** for divorced and blended families. Each household gets their own space while sharing what matters. Coordinate schedules, handoffs, and activities across homes without the awkward group texts!",
    links: [{ text: 'Co-Parenting Features', url: '/hubs/co-parenting' }]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    response: "Hi there! 👋 I'm Dew, your Honeydew assistant. I can help you with questions about:\n\n• **Features & pricing**\n• **How Honeydew works**\n• **Technical support**\n• **Comparisons** with other apps\n\nWhat would you like to know?",
    links: []
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect'],
    response: "You're welcome! 😊 If you have any other questions, I'm here to help. You can also reach a human at **support@gethoneydew.app** anytime. Happy organizing!",
    links: []
  },
  {
    keywords: ['human', 'person', 'real', 'talk to someone', 'contact', 'email', 'phone', 'call', 'speak to'],
    response: "Absolutely! You can reach our team directly at **support@gethoneydew.app**. A real human (often Pete, our founder!) will respond within hours. We read every message and genuinely want to help.",
    links: [
      { text: 'Email Support', url: 'mailto:support@gethoneydew.app' },
      { text: 'Support Page', url: '/support' }
    ]
  },
  {
    keywords: ['offline', 'no internet', 'airplane', 'connection'],
    response: "Yes, Honeydew works **offline**! Access your lists at the grocery store, update schedules on flights—wherever you are. Changes sync automatically when you're back online. Perfect for busy families on the go.",
    links: [{ text: 'Learn More', url: '/#features' }]
  },
  {
    keywords: ['account', 'login', 'sign in', 'password', 'forgot', 'reset'],
    response: "Having trouble logging in? Here's what to try:\n\n1. **Reset password** using the 'Forgot Password' link\n2. **Check your email** for the reset link (check spam too!)\n3. **Try a different browser** or clear cache\n\nStill stuck? Email **support@gethoneydew.app** and we'll help you regain access.",
    links: [
      { text: 'Open Web App', url: 'https://app.gethoneydew.app' },
      { text: 'Email Support', url: 'mailto:support@gethoneydew.app' }
    ]
  }
]

// Find the best response based on keywords
function findResponse(input: string): { response: string; links?: { text: string; url: string }[] } {
  const normalizedInput = input.toLowerCase()
  
  let bestMatch = {
    score: 0,
    response: "I'm not sure I understand that question, but I'd love to help! You can:\n\n• Ask me about **features, pricing, or how Honeydew works**\n• Visit our **FAQ** section below\n• Email **support@gethoneydew.app** for personalized help\n\nWhat would you like to know?",
    links: [
      { text: 'View FAQ', url: '/#faq' },
      { text: 'Email Support', url: 'mailto:support@gethoneydew.app' }
    ]
  }
  
  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (normalizedInput.includes(keyword)) {
        score += keyword.length // Longer matches = more specific
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { score, response: entry.response, links: entry.links }
    }
  }
  
  return { response: bestMatch.response, links: bestMatch.links }
}

// Format response with markdown-style bold
function formatResponse(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-primary-700">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Dew, your Honeydew assistant. 👋\n\nI can help with questions about features, pricing, technical support, or how Honeydew compares to other apps.\n\nHow can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const { response, links } = findResponse(userMessage.text)
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date(),
        links
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(600px, calc(100vh - 6rem))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🍈</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Dew</h3>
                  <p className="text-white/80 text-xs">Honeydew Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.isUser
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.isUser ? message.text : formatResponse(message.text)}
                    </p>
                    {!message.isUser && message.links && message.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onClick={() => {
                              if (!link.url.startsWith('http') && !link.url.startsWith('mailto:')) {
                                setIsOpen(false)
                              }
                            }}
                            className="inline-flex items-center text-xs px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors font-medium"
                          >
                            {link.text} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Dew anything..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Need human help? <a href="mailto:support@gethoneydew.app" className="text-primary-500 hover:underline">support@gethoneydew.app</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
