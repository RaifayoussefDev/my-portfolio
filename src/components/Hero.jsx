import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, ArrowDown } from 'lucide-react'
import { profile } from '../data/content'

const NAME = profile.name

function useTypewriter(text, speed = 70, startDelay = 600) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    let timeout
    const start = setTimeout(() => {
      const tick = () => {
        i += 1
        setOut(text.slice(0, i))
        if (i < text.length) {
          timeout = setTimeout(tick, speed + Math.random() * 40)
        }
      }
      tick()
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearTimeout(timeout)
    }
  }, [text, speed, startDelay])
  return out
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

// Floating particle field — purely decorative, adds ambient "alive" motion
function ParticleField() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 2.2,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 14 + Math.random() * 14,
    drift: (Math.random() - 0.5) * 80,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: '110%', x: 0, opacity: 0 }}
          animate={{
            y: '-10%',
            x: [0, p.drift, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          className="absolute rounded-full bg-circuit shadow-glow"
        />
      ))}
    </div>
  )
}

function MagneticButton({ children, ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      {...props}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor-hover
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const typed = useTypewriter(NAME, 65, 500)
  const doneTyping = typed.length === NAME.length

  const { scrollYProgress } = useScroll()
  // Parallax: hero content drifts up + fades + scales slightly as user scrolls past it
  const heroY = useTransform(scrollYProgress, [0, 0.18], ['0%', '-18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center md:px-12"
    >
      <ParticleField />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative flex max-w-4xl flex-col items-center"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-circuit/25 bg-circuit/5 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-circuit"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-circuit" />
          </span>
          DISPONIBLE — INGÉNIEUR LOGICIEL
        </motion.div>

        {/* Name with typewriter */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl font-bold tracking-tight text-offwhite text-glow sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {typed}
          <span
            className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 bg-circuit align-middle ${
              doneTyping ? 'animate-blink' : 'opacity-100'
            }`}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl font-body text-base text-mute sm:text-lg md:text-xl"
        >
          <span className="text-offwhite">Full Stack</span> — Spring Boot · Laravel · React ·
          Angular · Flutter
          <br className="hidden sm:block" />
          <span className="mt-1 block text-sm text-mute/80 sm:text-base">{profile.tagline}</span>
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="#experience"
            whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(0,194,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="rounded-md bg-circuit px-7 py-3 font-display text-sm font-semibold tracking-wide text-ink-950 shadow-glow transition-shadow"
          >
            Voir les projets
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.04, borderColor: 'rgba(0,194,255,0.8)' }}
            whileTap={{ scale: 0.97 }}
            className="rounded-md border border-ink-600 px-7 py-3 font-display text-sm font-semibold tracking-wide text-offwhite transition-colors hover:bg-ink-800"
          >
            Me contacter
          </MagneticButton>
        </motion.div>

        {/* Contact strip */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-mono text-xs text-mute"
        >
          <a href={`mailto:${profile.email}`} data-cursor-hover className="flex items-center gap-2 transition-colors hover:text-circuit">
            <Mail size={14} /> {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} data-cursor-hover className="flex items-center gap-2 transition-colors hover:text-circuit">
            <Phone size={14} /> {profile.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={14} /> {profile.location}
          </span>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-2 transition-colors hover:text-circuit">
            <Linkedin size={14} /> {profile.linkedin}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-mute"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={16} className="text-circuit" />
        </motion.div>
      </motion.div>
    </section>
  )
}
