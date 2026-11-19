import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, ArrowDown } from 'lucide-react'
import { profile } from '../data/content'
import ParticleName from './ParticleName'

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

export default function Hero({ ready = true }) {

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.18], ['0%', '-18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center md:px-12"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative flex w-full max-w-6xl flex-col items-center"
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

        {/* Name — particle signature */}
        <h1 className="sr-only">{profile.name} — {profile.role}</h1>
        <motion.div variants={itemVariants} className="w-[min(92vw,1100px)]">
          <ParticleName text={profile.name.toUpperCase()} ready={ready} />
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="mt-1 hidden font-mono text-[10px] tracking-[0.3em] text-mute/50 md:block"
        >
          BOUGEZ LA SOURIS — CLIQUEZ POUR EXPLOSER
        </motion.p>

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
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-2 transition-colors hover:text-circuit">
            <Github size={14} /> GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 hidden flex-col items-center gap-2 text-mute md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={16} className="text-circuit" />
        </motion.div>
      </motion.div>
    </section>
  )
}
