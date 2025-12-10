import { motion } from 'framer-motion'
import useSEO from '../utils/useSEO'
import { useLocation } from 'react-router-dom'

const PrivacyPage = () => {
  const location = useLocation()

  useSEO({
    title: 'Honeydew Family App Privacy Policy – How We Protect Family Data',
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
          Honeydew Family App Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Effective date: November 11, 2025</p>

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
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Plain-Language AI Notice</h2>
          <p className="leading-relaxed mb-4">
            Honeydew uses OpenAI’s API to interpret your requests, orchestrate tools, and draft responses. While the assistant is designed to
            provide accurate, family-ready recommendations, AI outputs may be imperfect or require review. Our team and automated filters
            continuously moderate prompts and responses to keep conversations safe and aligned with our community standards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Information We Collect</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Account Information</strong>: Email, family name, and profile details you provide when creating or updating an account.</li>
            <li><strong>Family/Workspace Data</strong>: Household relationships, roles, lists, items, routines, preferences, reminders, files, and other content you create inside Honeydew.</li>
            <li><strong>AI Interaction Data</strong>: Prompts, chat transcripts, voice commands, generated responses, and attachments you share with Honeydew’s AI assistant.</li>
            <li><strong>Usage & Diagnostics</strong>: In-app interactions, device type, app version, logs, and crash reports used to maintain reliability, security, and performance.</li>
            <li><strong>Voice & Media Input (optional)</strong>: Audio captured for voice commands, transcripts produced by Whisper AI, and media you choose to upload (e.g., family photos or receipts).</li>
            <li><strong>Calendar Data (optional)</strong>: If you connect Google Calendar or Apple Calendar, we access read-only event data necessary to display schedules in Honeydew and associate items. This includes event metadata (IDs, etags, titles, start/end times, location, attendees if present) and sync tokens.</li>
            <li><strong>Contacts (optional)</strong>: Names and email addresses you choose to share so Honeydew can coordinate events or send invitations.</li>
            <li><strong>Analytics Logs</strong>: Aggregated metrics, page views, and feature usage captured through Google Analytics 4 (GA4) to understand product performance.</li>
            <li><strong>Support, Feedback & Deletion Requests</strong>: Information you provide when contacting support, submitting feedback, or using the in-app Delete My Data flow. We record deletion requests to document completion.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>How We Process AI Data</h2>
          <p className="leading-relaxed mb-4">
            Honeydew uses trusted infrastructure and third-party processors to power AI features. Prompts, transcripts, and related metadata are sent securely to{' '}
            <strong>OpenAI</strong> (text, image, and tool orchestration) and <strong>AWS</strong> (hosting, storage, and real-time sync). Voice inputs are transcribed using Whisper AI.
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li>AI responses are generated on external servers; no personal data is used to train foundation models.</li>
            <li>Conversation snippets are cached for up to <strong>30 days</strong> to provide context, after which they are automatically deleted unless you pin them.</li>
            <li>Moderation filters screen user inputs and AI outputs for unsafe or disallowed content before responses are delivered.</li>
            <li>We log minimal metadata (timestamp, request type, latency) to monitor quality and abuse.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Why We Process Data & Legal Bases</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Data Category</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 align-top">Account Information</td>
                  <td className="px-4 py-3 align-top">Create and secure your Honeydew account, synchronize data across devices, and send critical service communications.</td>
                  <td className="px-4 py-3 align-top">Contractual necessity; legitimate interests in security.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Family/Workspace Data</td>
                  <td className="px-4 py-3 align-top">Display shared lists, tasks, and family relationships; power shared household planning features.</td>
                  <td className="px-4 py-3 align-top">Contractual necessity; legitimate interests in collaboration features.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">AI Interaction Data</td>
                  <td className="px-4 py-3 align-top">Generate context-aware AI suggestions, automations, and summaries tailored to your family.</td>
                  <td className="px-4 py-3 align-top">Consent when you start an AI session; contractual necessity to deliver requested AI assistance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Calendar & Contacts Data</td>
                  <td className="px-4 py-3 align-top">Sync events, avoid double-booking, and share plans with the people you specify.</td>
                  <td className="px-4 py-3 align-top">Consent (opt-in integrations); contractual necessity for coordination features.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Voice & Media Input</td>
                  <td className="px-4 py-3 align-top">Transcribe reminders, parse receipts, and attach media to lists or plans.</td>
                  <td className="px-4 py-3 align-top">Consent provided when you initiate uploads or recordings.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Analytics Logs</td>
                  <td className="px-4 py-3 align-top">Measure performance, troubleshoot issues, and guide product improvements without building individual profiles.</td>
                  <td className="px-4 py-3 align-top">Legitimate interests in running and improving Honeydew; consent where required by law.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Support & Deletion Requests</td>
                  <td className="px-4 py-3 align-top">Respond to inquiries, fulfill deletion requests, and document compliance.</td>
                  <td className="px-4 py-3 align-top">Legitimate interests; legal obligations.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>How We Use Information</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li>Provide, operate, and improve Honeydew features and services.</li>
            <li>Generate AI-assisted summaries, plans, and recommendations based on the context you supply.</li>
            <li>Authenticate users, secure the service, prevent abuse, and detect, prevent, or address technical issues.</li>
            <li>Display and organize your content (e.g., lists, items, and calendar associations).</li>
            <li>Communicate with you about updates, security notices, support responses, and product education.</li>
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
            <li>We use Google Calendar data solely to provide user-facing features within Honeydew (displaying events, matching chores, and building schedules).</li>
            <li>We do not sell Google user data and do not use it for advertising.</li>
            <li>Access tokens are stored securely and used only to provide the requested functionality.</li>
            <li>You can disconnect Google Calendar at any time in Settings, which revokes tokens and stops synchronization.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Third-Party Processors & Integrations</h2>
          <p className="leading-relaxed mb-4">
            We work with trusted providers to deliver Honeydew. Each partner only receives the data needed to perform their services and is required to safeguard it:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>OpenAI</strong> (<a href="https://openai.com/policies/api-data-usage-policies" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Processes prompts and generates AI responses.</li>
            <li><strong>Amazon Web Services (AWS)</strong> (<a href="https://aws.amazon.com/compliance/data-privacy/" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Hosts our infrastructure and encrypted databases.</li>
            <li><strong>Firebase Authentication</strong> (<a href="https://firebase.google.com/support/privacy" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Manages secure account login and session tokens.</li>
            <li><strong>Google Calendar API</strong> (<a href="https://policies.google.com/privacy" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>) &amp; <strong>Apple Calendar/iCloud</strong> (<a href="https://www.apple.com/legal/privacy/" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Sync optional calendars you connect.</li>
            <li><strong>Google Workspace Email</strong> (<a href="https://policies.google.com/privacy" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Sends support and deletion confirmation emails.</li>
            <li><strong>Google Analytics 4</strong> (<a href="https://policies.google.com/privacy" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">policy</a>): Provides aggregated product analytics.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            We do not allow third parties to use your personal data for advertising or to train their own models.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Device Permissions</h2>
          <p className="leading-relaxed mb-4">
            Honeydew requests access to specific device features only when you choose to use them:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Microphone</strong>: Capture voice commands so Honeydew can transcribe reminders and tasks.</li>
            <li><strong>Photo Library</strong>: Attach family photos or receipts to shared lists.</li>
            <li><strong>Contacts</strong>: Share events and reminders with family members you select.</li>
            <li><strong>Calendars</strong>: Sync with your calendars to create and manage family schedules.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Permission prompts appear in context after you initiate an action. You can disable access at any time in iOS settings.
          </p>
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
          <p className="leading-relaxed mb-3">
            We retain personal information for as long as necessary to provide the service and for legitimate and essential business purposes, such as maintaining security logs and complying with legal obligations.
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li>AI interaction history and transcripts are stored for up to <strong>30 days</strong> by default, unless you pin or export a conversation.</li>
            <li>Lists, items, and events persist until you delete them or remove your account; household archives are purged within <strong>30 days</strong> after deletion.</li>
            <li>Calendar sync metadata and mappings are deleted when you disconnect Google or Apple Calendar or delete your account, subject to encrypted backup retention up to <strong>35 days</strong>.</li>
            <li>Uploaded media is deleted immediately when you remove it in-app and fully purged from backups within <strong>35 days</strong>.</li>
            <li>Analytics logs are aggregated and retained for <strong>14 months</strong> to observe seasonal trends.</li>
            <li>Support tickets and deletion requests are retained for <strong>12 months</strong> to demonstrate compliance.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            When you submit a deletion request, we remove active data within <strong>7 days</strong> and roll encrypted backups off our systems within <strong>35 days</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Deletion Workflow</h2>
          <p className="leading-relaxed mb-4">
            Honeydew offers self-serve deletion so you stay in control of your data:
          </p>
          <ol className="space-y-3 ml-5 list-decimal">
            <li><strong>Open Settings → Privacy → Delete My Data</strong> in the Honeydew app to start the request.</li>
            <li><strong>Confirm via email</strong>: We send a verification email to ensure the request is legitimate. Follow the link to finalize the deletion.</li>
            <li><strong>Removal window</strong>: We delete active records within <strong>7 days</strong> and confirm completion via email. Encrypted backups roll off within <strong>35 days</strong>.</li>
            <li><strong>Follow-up</strong>: If you do not receive confirmation, reply to the email or contact <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">pete@gethoneydew.app</a>. We log deletion requests to verify resolution.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Security</h2>
          <p className="leading-relaxed">
            We use industry-standard administrative, technical, and physical safeguards designed to protect personal information. This includes encrypted transport (TLS 1.2+), encryption at rest for stored data, and strict authentication controls via Firebase Authentication. Access to production systems is limited to trained personnel, and sensitive content is never used to train external models. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Your Rights and Choices</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Access/Update</strong>: Update your account information directly in the Honeydew app.</li>
            <li><strong>Disconnect Integrations</strong>: Revoke Google Calendar, Contacts, or other integrations in Settings.</li>
            <li><strong>Delete Data</strong>: Use the in-app <em>Delete My Data</em> option (Settings → Privacy) to remove your account, AI history, and associated records. You will receive a confirmation email; if you do not hear back within 7 days, contact <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">pete@gethoneydew.app</a> or submit the support form.</li>
            <li><strong>Appeal</strong>: If you believe a request was handled incorrectly, reply to the confirmation email to request a review.</li>
            <li><strong>California Residents</strong>: You may exercise CCPA/CPRA rights to know, access, delete, or correct personal information, and to opt out of certain disclosures by contacting us.</li>
            <li><strong>EEA/UK Residents</strong>: You may have GDPR rights, including access, correction, deletion, portability, objection, and restriction. You may lodge a complaint with your local data protection authority.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Data Protection Officer: Pete Ghiorse (<a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">pete@gethoneydew.app</a>).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>AI Safety & Moderation</h2>
          <p className="leading-relaxed">
            Honeydew applies automated and human-reviewed safeguards to prevent unsafe or abusive use of AI features. Inputs and outputs may be analyzed for moderation purposes consistent with our Terms of Service, and our team may review flagged content to improve safety. If you encounter harmful content, please report it via in-app feedback or email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Children & Shared Families</h2>
          <p className="leading-relaxed">
            Honeydew is designed for parents, guardians, and caregivers coordinating household responsibilities. Guardians control which family members are invited, what data is shared, and may create child profiles to view schedules without granting direct account access. We do not knowingly collect personal data from children under 13 without verifiable parental consent.
          </p>
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


