import Lenis from 'lenis'

/**
 * Site-wide inertial scrolling. Skipped for reduced-motion users and on touch
 * devices (Lenis leaves native touch scrolling alone by default).
 * In-page anchor links are routed through Lenis so they glide too.
 */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
  window.lenis = lenis

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    const target = id === '#top' || id === '#' ? 0 : document.querySelector(id)
    if (target === null) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: target === 0 ? 0 : -60 })
  })

  return lenis
}

/** Scroll to a section id, through Lenis when it is active. */
export function scrollToId(id) {
  const el = id === 'top' ? 0 : document.getElementById(id)
  if (el === null) return
  if (window.lenis) window.lenis.scrollTo(el, { offset: el === 0 ? 0 : -60 })
  else if (el === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else el.scrollIntoView({ behavior: 'smooth' })
}
