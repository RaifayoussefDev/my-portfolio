import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const links = [
  { id: 'about', label: 'À propos' },
  { id: 'dabapp', label: 'DabApp' },
  { id: 'experience', label: 'Expérience' },
  { id: 'skills', label: 'Compétences' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-circuit shadow-glow"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'border-b border-ink-700 bg-ink-950/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
          <a href="#top" className="font-display text-sm font-bold tracking-wide text-offwhite">
            YR<span className="text-circuit">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-mono text-xs tracking-wide transition-colors ${
                  active === link.id ? 'text-circuit' : 'text-mute hover:text-offwhite'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`h-px w-6 bg-offwhite transition-transform ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-offwhite transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-offwhite transition-transform ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-ink-700 bg-ink-950/95 px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-mute transition-colors hover:text-circuit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>
    </>
  )
}
