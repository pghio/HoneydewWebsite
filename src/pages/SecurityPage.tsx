import { motion } from 'framer-motion'

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#0b3d2e' }}>
          Honeydew Security
        </h1>
        <p className="text-gray-600 mb-8">Last updated: October 16, 2025</p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <p className="leading-relaxed">
            At Honeydew, we take the security of your data seriously. This page outlines the security measures we 
            implement to protect your information and the steps we take to maintain a secure service. For questions, 
            contact us at{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Our Commitment to Security</h2>
          <p className="leading-relaxed">
            Security is fundamental to everything we do at Honeydew. We employ industry-standard security practices 
            and continuously monitor and update our security measures to protect your family's data from unauthorized 
            access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Data Encryption</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Encryption in Transit</strong>: All data transmitted between your device and our servers 
            is encrypted using industry-standard TLS (Transport Layer Security) protocols. This ensures that your 
            data cannot be intercepted or read by unauthorized parties during transmission.</li>
            <li><strong>Encryption at Rest</strong>: Your data is encrypted when stored on our servers using 
            strong encryption algorithms, providing an additional layer of protection for your information.</li>
            <li><strong>Secure Connections</strong>: We require HTTPS for all connections to our service, ensuring 
            that all communications are encrypted and secure.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Authentication & Access Control</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Secure Authentication</strong>: We support secure authentication methods, including 
            integration with trusted identity providers like Google.</li>
            <li><strong>Password Security</strong>: User passwords are hashed using industry-standard algorithms 
            and are never stored in plain text.</li>
            <li><strong>Session Management</strong>: We implement secure session management to protect your account 
            from unauthorized access. Sessions expire after periods of inactivity.</li>
            <li><strong>Access Controls</strong>: We implement strict access controls to ensure that only authorized 
            personnel can access our systems, and access is granted on a need-to-know basis.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Third-Party Integration Security</h2>
          <p className="leading-relaxed mb-4">
            When you connect third-party services like Google Calendar:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>OAuth 2.0</strong>: We use industry-standard OAuth 2.0 authentication protocols for 
            third-party integrations, ensuring secure authorization without exposing your credentials.</li>
            <li><strong>Minimal Permissions</strong>: We request only the minimum permissions necessary to provide 
            the features you've requested (e.g., read-only access to Google Calendar).</li>
            <li><strong>Secure Token Storage</strong>: Access tokens for third-party services are encrypted and 
            securely stored, and you can revoke access at any time through your account settings.</li>
            <li><strong>No Data Sharing</strong>: We do not sell or share your data from third-party integrations 
            with other parties. See our <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a> for details.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Infrastructure Security</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Secure Hosting</strong>: Our service is hosted on reputable cloud infrastructure providers 
            that implement robust physical and network security measures.</li>
            <li><strong>Network Security</strong>: We use firewalls, intrusion detection systems, and other security 
            technologies to protect our infrastructure from attacks.</li>
            <li><strong>Regular Updates</strong>: We keep our systems and dependencies up to date with the latest 
            security patches and updates.</li>
            <li><strong>Monitoring & Logging</strong>: We continuously monitor our systems for suspicious activity 
            and maintain detailed logs to detect and respond to security incidents.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Application Security</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Secure Development</strong>: We follow secure coding practices and conduct regular security 
            reviews of our code.</li>
            <li><strong>Input Validation</strong>: We validate and sanitize all user inputs to protect against 
            common vulnerabilities such as SQL injection and cross-site scripting (XSS).</li>
            <li><strong>Security Testing</strong>: We regularly test our application for security vulnerabilities 
            and address any issues promptly.</li>
            <li><strong>Dependency Management</strong>: We regularly review and update our software dependencies 
            to address known security vulnerabilities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Data Backup & Recovery</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Regular Backups</strong>: We perform regular backups of your data to protect against data 
            loss from hardware failure, natural disasters, or other catastrophic events.</li>
            <li><strong>Encrypted Backups</strong>: All backups are encrypted to ensure the security of your data.</li>
            <li><strong>Disaster Recovery</strong>: We have disaster recovery plans in place to restore service 
            quickly in the event of an outage or incident.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Privacy by Design</h2>
          <p className="leading-relaxed">
            We incorporate privacy and security considerations into every stage of product development. We collect 
            only the data necessary to provide our services, and we give you control over your data. You can delete 
            your account and data at any time through your account settings or by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Compliance & Standards</h2>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>GDPR Compliance</strong>: We comply with the General Data Protection Regulation (GDPR) 
            for users in the European Economic Area and UK.</li>
            <li><strong>CCPA/CPRA Compliance</strong>: We comply with the California Consumer Privacy Act (CCPA) 
            and California Privacy Rights Act (CPRA) for California residents.</li>
            <li><strong>Google API Services</strong>: Our use of Google API services adheres to the Google API 
            Services User Data Policy, including the Limited Use requirements.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Incident Response</h2>
          <p className="leading-relaxed">
            In the event of a security incident that affects your data, we will:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li>Investigate the incident promptly and take steps to contain and remediate it</li>
            <li>Notify affected users as required by law and as appropriate under the circumstances</li>
            <li>Cooperate with law enforcement and regulatory authorities as necessary</li>
            <li>Review and improve our security measures to prevent similar incidents in the future</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Your Role in Security</h2>
          <p className="leading-relaxed mb-4">
            You also play an important role in keeping your account secure:
          </p>
          <ul className="space-y-3 ml-5 list-disc">
            <li><strong>Strong Passwords</strong>: Use a strong, unique password for your Honeydew account</li>
            <li><strong>Keep Credentials Private</strong>: Never share your password or authentication credentials</li>
            <li><strong>Sign Out</strong>: Sign out of your account when using shared or public devices</li>
            <li><strong>Report Issues</strong>: If you notice any suspicious activity or potential security issues, 
            contact us immediately</li>
            <li><strong>Keep Software Updated</strong>: Keep your device's operating system and browser up to date 
            with the latest security patches</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Reporting Security Vulnerabilities</h2>
          <p className="leading-relaxed">
            If you discover a security vulnerability in Honeydew, we encourage you to report it to us responsibly. 
            Please email us at{' '}
            <a href="mailto:pete@gethoneydew.app" className="text-primary-600 hover:text-primary-700">
              pete@gethoneydew.app
            </a>{' '}
            with details of the vulnerability. We take all security reports seriously and will investigate and 
            respond promptly. Please do not publicly disclose the vulnerability until we have had a chance to 
            address it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0b3d2e' }}>Questions & Contact</h2>
          <p className="leading-relaxed">
            If you have questions about our security practices or would like more information, please contact us at:
          </p>
          <p className="leading-relaxed mt-4">
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

export default SecurityPage

