import Hero from '../components/Hero'
import MultimodalDemo from '../components/MultimodalDemo'
import UseCaseShowcase from '../components/UseCaseShowcase'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import BlogCaseStudies from '../components/BlogCaseStudies'
import HowItWorks from '../components/HowItWorks'
import CompetitorComparison from '../components/CompetitorComparison'
import FAQ from '../components/FAQ'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import useSEO from '../utils/useSEO'

const HomePage = () => {
  useSEO({
    title: 'Honeydew - AI-Powered Family Assistant | Natural Language Organization',
    description: '🤖 Your AI-powered family assistant with 27+ tools. Just tell Honeydew what you need - type it, say it, or photograph it. Natural language understanding, voice commands, image processing, and intelligent automation for modern families.',
    canonical: '/',
    keywords: 'AI family assistant, AI-powered family organizer, natural language family app, voice-controlled family planner, image processing family app, multimodal family assistant, smart family calendar, intelligent task management, AI agent for families, family coordination AI, better than Cozi, Skylight Calendar alternative, Fair Play AI',
    image: '/og-image-ai.jpg',
    type: 'website'
  })

  return (
    <>
      <Hero />
      <MultimodalDemo />
      <UseCaseShowcase />
      <Features />
      <Pricing />
      <BlogCaseStudies />
      <HowItWorks />
      <CompetitorComparison />
      <FAQ />
      <CallToAction />
      <Footer />
    </>
  )
}

export default HomePage
