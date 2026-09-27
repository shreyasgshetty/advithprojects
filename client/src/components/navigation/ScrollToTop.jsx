import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — centralized scroll restoration for all internal route changes.
 *
 * HOW IT WORKS:
 *   Watches `pathname` from React Router's location. On every pathname change,
 *   scrolls the window to (0, 0) immediately — before the new page's entrance
 *   animations begin. This ensures the destination page always opens at the top.
 *   Also resets Lenis smooth scroll virtualizer if active.
 *
 * HASH / ANCHOR:
 *   If `location.hash` is present (e.g. navigating to /page#section), the
 *   browser's native hash scrolling handles it naturally. We do NOT scroll to top
 *   in that case, preserving intentional anchor behavior.
 *
 * BROWSER HISTORY:
 *   React Router's `useNavigate` / `Link` use the History API. Back/Forward
 *   popstate events still work normally — React Router handles location updates
 *   and this hook responds to the resulting pathname change exactly the same way.
 *
 * Returns null — no visual output.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If navigating to a hash anchor, let the browser handle it naturally.
    if (hash) return

    // Immediately reset Lenis scroll position if Lenis is initialized
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }

    // Immediately scroll to top natively — no smooth behavior here so the destination
    // page starts at the top BEFORE its entrance animations play.
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
