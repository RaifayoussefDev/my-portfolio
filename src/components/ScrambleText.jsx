import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const GLYPHS = '!<>-_\/[]{}=+*^?#01ABCDEFXYZ$%&'

/**
 * Decrypts its text from random glyphs the first time it scrolls into view,
 * resolving left to right — a terminal "decode" for section titles.
 */
export default function ScrambleText({ text, className = '', duration = 900 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < revealed || ch === ' ') s += ch
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
