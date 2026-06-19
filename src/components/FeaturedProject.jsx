import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bike, Smartphone, LayoutDashboard, Server, CreditCard, Database, ImageOff } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { featuredProject } from '../data/content'

const stackIcons = {
  Mobile: Smartphone,
  'Admin & Web': LayoutDashboard,
  Backend: Server,
  Paiement: CreditCard,
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

function DabAppBanner() {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-7 mt-7 overflow-hidden rounded-xl border border-circuit/20 md:mx-12 md:mt-12"
    >
      {!failed ? (
        <img
          src="/images/dabapp-mockup.png"
          alt="Aperçu de l'application DabApp — marketplace moto"
          onError={() => setFailed(true)}
          className="aspect-[21/9] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 bg-ink-950/60 font-mono text-xs text-circuit/50">
          <ImageOff size={22} className="text-circuit/30" />
          <span>/images/dabapp-mockup.png</span>
          <span className="text-mute/50">place ton image ici</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
    </motion.div>
  )
}

export default function FeaturedProject() {
  return (
    <section id="dabapp" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionLabel command="run --project dabapp --featured" title="Projet phare" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-circuit/25 bg-ink-900/70"
      >
        {/* Ambient glow specific to the featured card */}
        <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-circuit/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-circuit/10 blur-[100px]" />

        <DabAppBanner />

        <div className="relative grid gap-10 p-7 md:grid-cols-5 md:p-12">
          {/* Left: pitch */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-circuit/30 bg-circuit/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-circuit">
              <Bike size={12} /> {featuredProject.tag.toUpperCase()}
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-offwhite md:text-4xl">
              {featuredProject.name}
            </h3>
            <p className="mt-2 font-mono text-xs text-circuitDim">Marketplace moto — UAE / Arabie Saoudite</p>
            <p className="mt-5 text-sm leading-relaxed text-mute md:text-base">{featuredProject.pitch}</p>
            <p className="mt-4 text-sm leading-relaxed text-mute/90">{featuredProject.description}</p>

            {/* Stack chips */}
            <div className="mt-7 grid grid-cols-2 gap-2.5">
              {featuredProject.stack.map((s, i) => {
                const Icon = stackIcons[s.layer] || Database
                return (
                  <motion.div
                    key={s.layer}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(0,194,255,0.6)' }}
                    className="rounded-lg border border-ink-600 bg-ink-950/60 p-3"
                  >
                    <div className="flex items-center gap-1.5 text-circuit">
                      <Icon size={13} />
                      <span className="font-mono text-[10px] tracking-wide">{s.layer}</span>
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-offwhite">{s.tech}</div>
                    <p className="mt-1 text-[11px] leading-snug text-mute">{s.detail}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: highlights list, styled like an architecture/spec sheet */}
          <div className="md:col-span-3">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest text-mute">
              <span className="h-px flex-1 bg-ink-600" />
              <span>ARCHITECTURE &amp; MODULES</span>
              <span className="h-px flex-1 bg-ink-600" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredProject.highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  whileHover={{ y: -3, borderColor: 'rgba(0,194,255,0.45)', boxShadow: '0 0 28px rgba(0,194,255,0.12)' }}
                  className="group relative rounded-lg border border-ink-600 bg-ink-950/40 p-4 transition-all"
                >
                  <span className="absolute right-3 top-3 font-mono text-[10px] text-ink-600 group-hover:text-circuit/50 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="pr-6 font-display text-sm font-semibold text-offwhite">{h.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-mute">{h.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
