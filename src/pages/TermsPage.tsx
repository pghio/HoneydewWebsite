import { motion } from 'framer-motion'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'

const TermsPage = () => {
  const location = useLocation()

  useSEO({
    title: 'Honeydew Family App Terms of Service – Usage, Responsibilities, and Rights',
    description:
      'Read the Honeydew Terms of Service covering account responsibilities, acceptable use, integrations, limitations of liability, and dispute resolution.',
    canonical: location.pathname,
    keywords:
      'honeydew terms of service, honeydew tos, honeydew legal terms, ai family planner terms, honeydew user agreement',
    image: '/blog-images/honeydew-ai-agent.jpg',
    type: 'website',
  })

  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#0b3d2e' }}>
          Honeydew Family App Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Effective date: September 20, 2025</p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <p className="leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of Honeydew (the "Service"). By using the Service,
            you agree to these Terms. If you do not agree, do not use the Service. For questions, contact{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Use of the Service</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li>You must be at least 13 years old to use the Service.</li>
            <li>You are responsible for maintaining the confidentiality of your account and for all activities under your account.</li>
            <li>You agree not to misuse the Service, interfere with its operation, or access it using a method other than the interface and instructions provided.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>User Content</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li>You retain ownership of content you submit, create, or store in the Service ("User Content").</li>
            <li>You grant Honeydew a limited, non-exclusive, worldwide, royalty-free license to host, store, display, and process User Content solely to provide and operate the Service.</li>
            <li>You are responsible for your User Content and for ensuring it does not violate law or others' rights.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Third-Party Services</h2>
          <p className="leading-relaxed mb-4">
            The Service may integrate with third-party services (e.g., Google Calendar). Your use of third-party services is governed by their terms and policies.
            If you connect Google Calendar, Honeydew will request read-only access to display events and create associations. See our{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a> for details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Acceptable Use</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li>No reverse engineering, decompiling, or attempt to derive source code except as permitted by law.</li>
            <li>No unauthorized access, scraping, or use of automated systems that impose unreasonable load.</li>
            <li>No use of the Service to violate law, infringe rights, or distribute harmful or illegal content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Intellectual Property</h2>
          <p className="leading-relaxed">
            The Service, including software, design, and content (excluding User Content), is owned by Honeydew and its licensors and is protected by law.
            These Terms do not grant you any right to use Honeydew's trademarks, logos, or branding.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Termination</h2>
          <p className="leading-relaxed">
            We may suspend or terminate access to the Service at any time for any reason, including violation of these Terms or risk/harm to others.
            You may stop using the Service at any time. Upon termination, rights granted to you under these Terms will end.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Disclaimers</h2>
          <p className="leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE
            WILL BE UNINTERRUPTED OR ERROR-FREE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Limitation of Liability</h2>
          <p className="leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, HONEYDEW AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
            WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM
            (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY; OR
            (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Indemnification</h2>
          <p className="leading-relaxed">
            You agree to defend, indemnify, and hold harmless Honeydew and its affiliates from any claims, liabilities, damages, losses,
            and expenses, including reasonable attorney fees, arising out of or related to your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Changes to the Service and Terms</h2>
          <p className="leading-relaxed">
            We may modify the Service or these Terms at any time. If we make material changes, we will provide notice as appropriate.
            Your continued use of the Service after changes become effective indicates your acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Governing Law; Dispute Resolution</h2>
          <p className="leading-relaxed">
            These Terms are governed by the laws of the State of Delaware and the United States, without regard to conflict of law principles.
            Any dispute arising under these Terms will be resolved in the state or federal courts located in Delaware, and you consent to jurisdiction there.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Contact</h2>
          <p className="leading-relaxed">
            Honeydew Support<br/>
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>
          </p>
        </section>
      </motion.div>
    </div>
  )
}

export default TermsPage


