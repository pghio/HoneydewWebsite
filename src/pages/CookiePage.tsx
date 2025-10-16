import { motion } from 'framer-motion'

const CookiePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#0b3d2e' }}>
          Honeydew Cookie Policy
        </h1>
        <p className="text-gray-600 mb-8">Effective date: October 16, 2025</p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <p className="leading-relaxed">
            This Cookie Policy explains how Honeydew ("we", "us", or "our") uses cookies and similar technologies 
            when you use our application and website. For questions, contact us at{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>What Are Cookies?</h2>
          <p className="leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website or use an application. 
            They help websites and applications remember information about your visit, such as your preferred settings 
            and authentication status, making your next visit easier and the service more useful to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>How We Use Cookies</h2>
          <p className="leading-relaxed mb-4">
            We use cookies and similar technologies for the following purposes:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Essential Cookies</strong>: These cookies are necessary for the Service to function properly. 
            They enable core functionality such as authentication, security, and session management. Without these 
            cookies, the Service cannot function properly.</li>
            <li><strong>Performance Cookies</strong>: These cookies help us understand how users interact with our 
            Service by collecting and reporting information anonymously. This helps us improve the Service and fix issues.</li>
            <li><strong>Functionality Cookies</strong>: These cookies allow the Service to remember choices you make 
            (such as your preferences and settings) and provide enhanced, more personalized features.</li>
            <li><strong>Analytics</strong>: We may use cookies to help us analyze how users use the Service and to 
            monitor Service performance. This helps us improve the user experience.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Types of Cookies We Use</h2>
          <ul className="space-y-4 ml-5 list-disc">
            <li>
              <strong>Session Cookies</strong>: These are temporary cookies that expire when you close your browser 
              or app. They help us maintain your session while you're using the Service.
            </li>
            <li>
              <strong>Persistent Cookies</strong>: These cookies remain on your device for a set period or until you 
              delete them. They help us remember your preferences and settings for future visits.
            </li>
            <li>
              <strong>First-Party Cookies</strong>: These are cookies set by Honeydew directly.
            </li>
            <li>
              <strong>Third-Party Cookies</strong>: These are cookies set by third-party services we use, such as 
              authentication providers or analytics services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Third-Party Services</h2>
          <p className="leading-relaxed mb-4">
            We may use third-party services that also use cookies, including:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Google Authentication</strong>: When you sign in with Google or connect Google Calendar, 
            Google may set cookies in accordance with their privacy policy.</li>
            <li><strong>Analytics Services</strong>: We may use analytics services to understand how users interact 
            with our Service. These services may use cookies to collect information.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            These third parties have their own privacy and cookie policies, and we encourage you to review them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Your Choices</h2>
          <p className="leading-relaxed mb-4">
            You have several options for managing cookies:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Browser Settings</strong>: Most web browsers allow you to control cookies through their 
            settings. You can typically set your browser to refuse cookies or to alert you when cookies are being sent. 
            Note that if you disable essential cookies, some features of the Service may not function properly.</li>
            <li><strong>Mobile Devices</strong>: Mobile devices may offer settings to limit tracking or reset 
            advertising identifiers. Check your device settings for more information.</li>
            <li><strong>Opt-Out</strong>: For analytics cookies, you may be able to opt out through the respective 
            service's privacy settings.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Local Storage</h2>
          <p className="leading-relaxed">
            In addition to cookies, we may use local storage technologies (such as HTML5 local storage) to store 
            information locally on your device. This helps us provide a better user experience by caching certain 
            data and preferences. You can typically clear local storage through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Updates to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. The "Effective date" at the top of this page indicates 
            when this policy was last updated.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>More Information</h2>
          <p className="leading-relaxed">
            For more information about how we handle your personal information, please see our{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>. 
            If you have questions about our use of cookies, please contact us at{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>.
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

export default CookiePage

