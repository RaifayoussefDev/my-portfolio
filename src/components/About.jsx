import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Terminal } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { about } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

function PortraitCard() {
  const [imgFailed, setImgFailed] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 18 })
  const sy = useSpring(y, { stiffness: 150, damping: 18 })
  const rotateX = useTransform(sy, [-40, 40], [8, -8])
  const rotateY = useTransform(sx, [-40, 40], [-8, 8])

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
      className="mb-10"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-circuit/25 bg-ink-900/60 sm:max-w-sm md:mx-0"
      >
        <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-circuit/15 blur-[80px]" />

        {!imgFailed ? (
          <img
            src="/images/raifa-portrait.png"
            alt="Portrait de Youssef Raifa, Ingénieur Logiciel"
            onError={() => setImgFailed(true)}
            style={{ transform: 'translateZ(20px)' }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-950/60 font-mono text-xs text-circuit/60">
            <Terminal size={28} className="text-circuit/40" />
            <span>/images/raifa-portrait.png</span>
            <span className="text-mute/60">place ton image ici</span>
          </div>
        )}

        {/* Scanline sweep on hover */}
        <motion.div
          initial={{ y: '-100%' }}
          whileHover={{ y: '100%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-circuit/20 to-transparent"
        />

        {/* Bottom gradient + frame label */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/90 to-transparent" />
        <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-circuit/80">
          YR // FULL_STACK
        </div>
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-circuit shadow-glow" />
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-28 md:px-12">
      <SectionLabel command="cat about.md" title="À propos" />

      <div className="grid gap-12 md:grid-cols-5">
        <motion.div
          className="md:col-span-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <PortraitCard />
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              className="mb-5 text-base leading-relaxed text-mute md:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        <div className="md:col-span-2">
          <div className="space-y-3">
            {about.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                whileHover={{ x: 4, borderColor: 'rgba(0,194,255,0.5)' }}
                className="group rounded-lg border border-ink-600 bg-ink-900/60 p-4 transition-colors"
              >
                <div className="flex items-baseline gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-circuit shadow-glow" />
                  <h3 className="font-display text-sm font-semibold tracking-wide text-offwhite">
                    {pillar.label}
                  </h3>
                </div>
                <p className="mt-1.5 pl-3.5 text-xs leading-relaxed text-mute">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
