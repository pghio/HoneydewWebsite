import { useEffect, useMemo, useRef } from 'react'
import { PLATFORMS, type StorePlatformKey } from '../config/platforms'
import { trackLinkClick } from '../utils/analytics'
import { APP_LINKS, buildAppStoreLink, trackAppStoreClick, trackAppStoreView } from '../utils/funnelTracking'

type BadgeSize = 'sm' | 'md' | 'lg'

interface AppStoreBadgeProps {
  size?: BadgeSize
  source: string
  campaign?: string
  className?: string
  platform?: StorePlatformKey
}

const SIZE_MAP: Record<BadgeSize, { width: number; height: number }> = {
  sm: { width: 120, height: 40 },
  md: { width: 150, height: 50 },
  lg: { width: 180, height: 60 },
}

export default function AppStoreBadge({
  size = 'md',
  source,
  campaign = 'app_store_badge',
  className = '',
  platform = 'ios',
}: AppStoreBadgeProps) {
  const { width, height } = SIZE_MAP[size]
  const href = buildAppStoreLink({ campaignToken: `${source}_${campaign}`, platform })
  const ref = useRef<HTMLAnchorElement | null>(null)
  const gradientId = useMemo(() => `store-badge-${platform}-${source}-${campaign}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase(), [campaign, platform, source])

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return

    let hasTracked = false
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTracked) {
          hasTracked = true
          trackAppStoreView(source, campaign, platform)
          observer.disconnect()
        }
      })
    }, { threshold: 0.6 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [campaign, platform, source])

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
      onClick={() => {
        trackLinkClick({ href, source, medium: 'app_store_badge', campaign })
        trackAppStoreClick(source, campaign, platform)
      }}
      aria-label={PLATFORMS[platform].badgeAlt}
    >
      {platform === 'android' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 40"
          width={width}
          height={height}
          role="img"
          aria-hidden="true"
        >
          <title>Get it on Google Play</title>
          <rect width="120" height="40" rx="6" fill="#111827" stroke="#4b5563" strokeWidth=".5" />
          <text x="44" y="12" fill="#fff" fontSize="5.5" fontFamily="system-ui,-apple-system,sans-serif" letterSpacing=".04em">GET IT ON</text>
          <text x="44" y="27" fill="#fff" fontSize="10.5" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="600" letterSpacing="-.02em">Google Play</text>
          <g transform="translate(15, 8)">
            <path d="M0 0l11 12-11 12 17-12z" fill="#34d399" />
            <path d="M0 0l8 8 4-4z" fill="#60a5fa" />
            <path d="M0 24l8-8 4 4z" fill="#fbbf24" />
            <path d="M8 8l9 4-5 3-4-4z" fill="#f87171" />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 40"
          width={width}
          height={height}
          role="img"
          aria-hidden="true"
        >
          <title>Download on the App Store</title>
          <defs>
            <linearGradient id={gradientId} x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          <rect width="120" height="40" rx="6" fill={`url(#${gradientId})`} stroke="#a6a6a6" strokeWidth=".5" />
          <text x="42.5" y="12" fill="#fff" fontSize="5.5" fontFamily="system-ui,-apple-system,sans-serif" letterSpacing=".04em">Download on the</text>
          <text x="42.5" y="27" fill="#fff" fontSize="11" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="600" letterSpacing="-.02em">App Store</text>
          <g transform="translate(14, 7.5)" fill="#fff">
            <path d="M12.37 12.63c-.02 2.37 1.96 3.53 2.05 3.58-.02.06-.32 1.11-1.06 2.2-.64.94-1.3 1.87-2.35 1.89-1.03.02-1.36-.62-2.53-.62s-1.54.6-2.52.64c-1.01.04-1.78-1.02-2.43-1.96C2.21 16.35 1.25 13.1 2.6 10.88c.67-1.1 1.86-1.8 3.15-1.82 1-.02 1.93.68 2.54.68.61 0 1.75-.84 2.95-.72.5.02 1.91.21 2.82 1.55-.07.05-1.68 1-1.67 2.96m-1.94-5.78c.54-.66.9-1.57.8-2.48-.78.03-1.71.53-2.27 1.18-.5.58-.94 1.51-.82 2.4.86.07 1.74-.45 2.29-1.1" />
          </g>
        </svg>
      )}
    </a>
  )
}

/**
 * Minimal text-style link for tight spaces (e.g. sticky bars).
 */
export function AppStoreTextLink({
  source,
  campaign = 'app_store_text',
  className = '',
  platform = 'ios',
}: Omit<AppStoreBadgeProps, 'size'>) {
  const href = buildAppStoreLink({ campaignToken: `${source}_${campaign}`, platform })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors ${className}`}
      onClick={() => {
        trackLinkClick({ href, source, medium: 'app_store_text', campaign })
        trackAppStoreClick(source, campaign, platform)
      }}
    >
      {platform === 'android' ? <PlayIcon className="w-3 h-3" /> : <AppleIcon className="w-3 h-3" />}
      {platform === 'android' ? 'Available on Google Play' : 'Available on the App Store'}
    </a>
  )
}

function AppleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.37 12.63c-.02 2.37 1.96 3.53 2.05 3.58-.02.06-.32 1.11-1.06 2.2-.64.94-1.3 1.87-2.35 1.89-1.03.02-1.36-.62-2.53-.62s-1.54.6-2.52.64c-1.01.04-1.78-1.02-2.43-1.96C2.21 16.35 1.25 13.1 2.6 10.88c.67-1.1 1.86-1.8 3.15-1.82 1-.02 1.93.68 2.54.68.61 0 1.75-.84 2.95-.72.5.02 1.91.21 2.82 1.55-.07.05-1.68 1-1.67 2.96m-1.94-5.78c.54-.66.9-1.57.8-2.48-.78.03-1.71.53-2.27 1.18-.5.58-.94 1.51-.82 2.4.86.07 1.74-.45 2.29-1.1" transform="translate(-1.5,-4.37)" />
    </svg>
  )
}

function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.25 1.5L14.25 9L2.25 16.5L6 9L2.25 1.5Z" fill="currentColor" />
    </svg>
  )
}

export { APP_LINKS }
