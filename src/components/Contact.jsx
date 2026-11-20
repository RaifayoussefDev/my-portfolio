import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Phone, Linkedin, Github, MapPin } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { profile } from '../data/content'

const RING_TEXT = 'ÉCRIRE UN EMAIL • DISPONIBLE • FREELANCE & CDI • '

function RingButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14 })
  const sy = useSpring(y, { stiffness: 180, damping: 14 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={`mailto:${profile.email}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      aria-label="Envoyer un email"
      className="group relative flex h-44 w-44 items-center justify-center md:h-52 md:w-52"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        <defs>
          <path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text className="fill-offwhite/70 font-mono text-[11.5px] tracking-[0.18em]">
          <textPath href="#ring" textLength="512" lengthAdjust="spacing">{RING_TEXT}</textPath>
        </text>
      </motion.svg>
      <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-circuit text-ink-950 shadow-glow transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28">
        <ArrowUpRight size={34} className="transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leftX = useTransform(scrollYProgress, [0, 1], ['10%', '-35%'])
  const rightX = useTransform(scrollYProgress, [0, 1], ['-35%', '5%'])

  return (
    <section id="contact" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionLabel command="curl -X POST /contact" title="Contact" />
      </div>

      {/* Giant kinetic type */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ x: leftX }}
          className="text-outline whitespace-nowrap font-display text-[17vw] font-bold leading-[0.9] tracking-tighter"
        >
          TRAVAILLONS — TRAVAILLONS
        </motion.div>
        <motion.div
          style={{ x: rightX }}
          className="whitespace-nowrap font-display text-[17vw] font-bold leading-[0.9] tracking-tighter text-offwhite"
        >
          ENSEMBLE<span className="text-circuit">.</span> ENSEMBLE<span className="text-circuit">.</span>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:justify-between md:px-12">
        <div className="max-w-md text-center md:text-left">
          <h3 className="font-display text-2xl font-bold text-offwhite md:text-3xl">
            Un projet en tête ? <span className="whitespace-nowrap text-circuit">Discutons-en.</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Disponible pour des missions freelance ou des opportunités full-time à Casablanca.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs text-mute md:justify-start">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 transition-colors hover:text-circuit">
              <Phone size={13} /> {profile.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {profile.location}
            </span>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-circuit">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-circuit">
              <Github size={13} /> GitHub
            </a>
          </div>
        </div>
        <RingButton />
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-ink-700 px-6 pt-8 font-mono text-[11px] text-mute/70 md:flex-row md:px-12">
        <span>© {new Date().getFullYear()} {profile.name} — Tous droits réservés.</span>
        <span className="text-mute/50">Conçu &amp; développé avec React, Tailwind CSS &amp; Framer Motion · Ctrl/⌘ + K</span>
      </footer>
    </section>
  )
}
