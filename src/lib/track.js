/**
 * Lightweight analytics helper.
 * - Microsoft Clarity (session recordings, heatmaps, custom events) loads only
 *   when VITE_CLARITY_ID is set at build time.
 * - Vercel Web Analytics (page views, referrers, countries) is mounted in App.
 */
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID

export function initAnalytics() {
  if (!CLARITY_ID || typeof window === 'undefined' || window.clarity) return
  window.clarity = function () {
    ;(window.clarity.q = window.clarity.q || []).push(arguments)
  }
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(s)

  // Contact intent: one delegated listener covers every link on the page
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a) return
    const href = a.getAttribute('href')
    if (href.startsWith('mailto:')) track('click_email')
    else if (href.startsWith('tel:')) track('click_phone')
    else if (href.includes('linkedin.com')) track('click_linkedin')
    else if (href.includes('github.com')) track('click_github')
  })
}

/** Record a named event, with optional tags visible as filters in Clarity. */
export function track(event, tags = {}) {
  try {
    if (!window.clarity) return
    window.clarity('event', event)
    for (const [k, v] of Object.entries(tags)) {
      window.clarity('set', k, String(v).slice(0, 100))
    }
  } catch {
    /* analytics must never break the site */
  }
}
