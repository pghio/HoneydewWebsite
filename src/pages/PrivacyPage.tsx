import { motion } from 'framer-motion'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'

const PrivacyPage = () => {
  const location = useLocation()

  useSEO({
    title: 'Honeydew Privacy Policy – How We Protect Family Data',
    description:
      'Review Honeydew’s privacy practices: data collection, Google Calendar permissions, security safeguards, retention policies, and how to exercise your rights.',
    canonical: location.pathname,
    keywords:
      'honeydew privacy policy, honeydew data protection, google calendar limited use, honeydew gdpr, honeydew ccpa',
    image: '/blog-images/honeydew-app-screenshot.jpg',
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
          Honeydew Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Effective date: September 20, 2025</p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <p className="leading-relaxed">
            Honeydew ("Honeydew", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy describes
            how we collect, use, disclose, and safeguard your information when you use Honeydew. If you have questions, contact us at{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Scope</h2>
          <p className="leading-relaxed mb-4">
            This Policy applies to information collected through the Honeydew application and related websites located at{' '}
            <a href="https://gethoneydew.app/" className="text-primary-600 hover:text-primary-700">gethoneydew.app</a>. 
            It does not apply to third-party websites or services that we do not control.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Information We Collect</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Account Information</strong>: Email and profile details you provide when creating an account.</li>
            <li><strong>Family/Workspace Data</strong>: Lists, items, events, preferences, and content you create in Honeydew.</li>
            <li><strong>Usage Information</strong>: In-app interactions, device information, and diagnostic logs to maintain reliability and security.</li>
            <li><strong>Google Calendar Data (optional)</strong>: If you connect Google Calendar, we access read-only calendar data
              necessary to display events in Honeydew and associate items. This includes event metadata (IDs, etags, titles,
              start/end times, location, attendees if present) and sync tokens.</li>
            <li><strong>Support Communications</strong>: Information you provide when contacting support.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>How We Use Information</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li>Provide, operate, and improve Honeydew features and services.</li>
            <li>Authenticate users, secure the service, prevent abuse, and detect, prevent, or address technical issues.</li>
            <li>Display and organize your content (e.g., lists, items, and calendar associations).</li>
            <li>Communicate with you about updates, security notices, and support responses.</li>
            <li>Comply with legal obligations and enforce our agreements.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Google API Services User Data Policy (Limited Use)</h2>
          <p className="leading-relaxed mb-4">
            Honeydew's use of information received from Google APIs adheres to the{' '}
            <a 
              href="https://developers.google.com/terms/api-services-user-data-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li>Scopes requested: <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://www.googleapis.com/auth/calendar.readonly</code> and <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://www.googleapis.com/auth/calendar.events.readonly</code> (read-only).</li>
            <li>We use Google Calendar data solely to provide user-facing features within Honeydew (displaying events and associations).</li>
            <li>We do not sell Google user data and do not use it for advertising.</li>
            <li>Access tokens are stored securely and used only to provide the requested functionality.</li>
            <li>You can disconnect Google Calendar at any time in Settings, which revokes tokens and stops synchronization.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Legal Bases (EEA/UK)</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Contract</strong>: To provide the service you request.</li>
            <li><strong>Legitimate Interests</strong>: To secure, maintain, and improve Honeydew.</li>
            <li><strong>Consent</strong>: For optional integrations like Google Calendar.</li>
            <li><strong>Legal Obligation</strong>: To comply with applicable laws.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>How We Share Information</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Service Providers</strong>: We may share information with vendors who process data on our behalf, under confidentiality obligations.</li>
            <li><strong>Legal</strong>: We may disclose information to comply with law, regulation, legal process, or governmental request.</li>
            <li><strong>Business Transfers</strong>: In connection with a merger, acquisition, or asset sale, subject to standard safeguards.</li>
            <li>We do not sell your personal information.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Data Retention</h2>
          <p className="leading-relaxed">
            We retain personal information for as long as necessary to provide the service and for legitimate and essential business
            purposes, such as maintaining performance logs and complying with legal obligations. Calendar sync metadata and mappings are
            deleted when you disconnect Google or delete your account, subject to reasonable backup retention.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Security</h2>
          <p className="leading-relaxed">
            We use industry-standard administrative, technical, and physical safeguards designed to protect personal information.
            No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Your Rights and Choices</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Access/Update</strong>: Update your account information in-app.</li>
            <li><strong>Disconnect Google</strong>: Revoke Google access in Settings → Google Calendar Sync.</li>
            <li><strong>Deletion</strong>: Request account deletion via in-app controls (if available) or by contacting support.</li>
            <li><strong>California</strong>: You may have rights under the CCPA/CPRA; contact us to exercise your rights.</li>
            <li><strong>EEA/UK</strong>: You may have rights under GDPR, including access, correction, deletion, portability, and objection.
              You may lodge a complaint with your local data protection authority.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>International Transfers</h2>
          <p className="leading-relaxed">
            We may process information in the United States and other countries where we or our providers operate.
            Where required, we use appropriate safeguards for cross-border transfers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Children's Privacy</h2>
          <p className="leading-relaxed">
            Honeydew is not directed to children under 13, and we do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Policy from time to time. If we make material changes, we will provide notice as appropriate.
            The "Effective date" above reflects the latest version.
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

export default PrivacyPage


