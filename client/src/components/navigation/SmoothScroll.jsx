import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll — Centralized Lenis smooth scroll provider.
 *
 * - Single instance across the application.
 * - Automatically registers RAF loop.
 * - Stores instance on `window.__lenis` for programmatic control (e.g. ScrollToTop).
 * - Cleans up gracefully on unmount.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      autoRaf: true,
    })

    window.__lenis = lenis

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return null
}
