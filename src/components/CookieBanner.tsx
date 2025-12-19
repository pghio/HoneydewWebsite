import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'honeydew-cookie-consent'

const CookieBanner = ({ hide }: { hide?: boolean }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hide) return
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [hide])

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  if (hide || !visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[420px] z-50">
      <div className="rounded-2xl bg-gray-900 text-white shadow-2xl border border-white/10 backdrop-blur-lg">
        <div className="p-5 space-y-3">
          <p className="text-sm font-semibold">We use essential and analytics cookies</p>
          <p className="text-sm text-gray-200">
            Honeydew uses cookies to keep you signed in, protect your data, and understand how families use the site.
            See our <Link to="/cookies" className="underline text-primary-200 hover:text-primary-100">Cookie Policy</Link> for details.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={acceptCookies}
              className="w-full inline-flex items-center justify-center rounded-xl bg-white text-gray-900 font-semibold px-4 py-2.5 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Accept & Continue
            </button>
            <Link
              to="/privacy"
              className="w-full text-center rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner





