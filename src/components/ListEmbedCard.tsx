import { useEffect, useRef, useState } from 'react'

/**
 * ListEmbedCard — Renders an interactive Honeydew list preview via iframe.
 *
 * The app side serves `/embed/lists/:slug` as a compact, self-contained
 * preview card with smart CTAs ("Copy This List Free" / "View Full List").
 *
 * Features:
 *  - Auto-resize via postMessage from the embed
 *  - GTM dataLayer forwarding for embed analytics
 *  - Loading skeleton with graceful fallback
 *  - Full UTM attribution tracking
 */

const EMBED_BASE_URL = 'https://app.gethoneydew.app/embed/lists'

type ListEmbedCardProps = {
  /** The list slug, e.g. "custody-exchange-checklist" */
  listSlug: string
  /** The blog article slug for UTM attribution */
  articleSlug?: string
  /** Optional display title for the iframe title attribute */
  title?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[] & { push?: (...args: any[]) => number }
  }
}

export default function ListEmbedCard({ listSlug, articleSlug, title }: ListEmbedCardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(480)
  const [loaded, setLoaded] = useState(false)

  // Build the embed URL with proper attribution params
  const embedUrl = (() => {
    const params = new URLSearchParams({
      ref: 'blog_embed',
      utm_source: 'blog',
      utm_medium: 'embed',
    })
    if (articleSlug) params.set('utm_content', articleSlug)
    return `${EMBED_BASE_URL}/${listSlug}?${params.toString()}`
  })()

  // Human-readable title for accessibility
  const iframeTitle = title || `${listSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} - Honeydew`

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data || typeof e.data !== 'object') return

      // Auto-resize
      if (e.data.type === 'honeydew_embed_resize' && e.data.slug === listSlug) {
        setHeight(e.data.height)
      }

      // Forward embed events to GTM dataLayer
      if (e.data.type === 'honeydew_embed_event' && window.dataLayer) {
        window.dataLayer.push({
          event: `honeydew_${e.data.event}`,
          honeydew_slug: e.data.data?.slug,
          honeydew_category: e.data.data?.category,
          honeydew_cta_type: e.data.data?.cta_type || null,
          honeydew_is_mobile: e.data.data?.is_mobile,
        })
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [listSlug])

  return (
    <div className="not-prose my-8 mx-auto max-w-[700px]">
      {/* Loading skeleton — shown until iframe loads */}
      {!loaded && (
        <div
          className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-[#92C5A7]/5 p-6 animate-pulse"
          style={{ height: `${height}px` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#92C5A7]/20" />
            <div>
              <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-gray-100" />
                <div className="h-3 rounded bg-gray-100" style={{ width: `${60 + Math.random() * 30}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <div className="h-10 w-40 rounded-xl bg-[#92C5A7]/20" />
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        loading="lazy"
        title={iframeTitle}
        allow="clipboard-write"
        onLoad={() => setLoaded(true)}
        className={`rounded-2xl border border-gray-200 transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0 absolute'
        }`}
        style={{
          maxWidth: '700px',
          ...(loaded ? {} : { position: 'absolute', left: '-9999px' }),
        }}
      />
    </div>
  )
}
