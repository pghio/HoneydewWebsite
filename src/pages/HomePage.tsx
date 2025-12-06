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
    title: 'Honeydew – AI-First Family OS | Mobile Command Center (No Hardware)',
    description:
      'Honeydew is the AI-first, mobile-first family command center. Voice-controlled lists, two-way Google & Apple calendar sync, co-parenting hand-offs, AI meal planning, and multi-family workflows—no wall hardware required.',
    canonical: '/',
    keywords:
      'AI-first family OS, voice-controlled family app, no hardware family calendar, AI meal planning for families, co-parenting automation, multi-family coordination app, Honeydew vs Skylight, Honeydew vs Cozi, mobile family command center',
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
