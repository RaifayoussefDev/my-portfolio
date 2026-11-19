import { motion } from 'framer-motion'
import { Layers, Smartphone, Server, Cpu, ArrowRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { services, processSteps } from '../data/content'

const icons = { Layers, Smartphone, Server, Cpu }

function ServiceCard({ service, index }) {
  const Icon = icons[service.icon] ?? Layers

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-ink-600 bg-ink-900/50 p-6 transition-colors hover:border-circuit/40"
    >
      {/* Spotlight following the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(0,194,255,0.12), transparent 70%)',
        }}
      />
      <div className="relative">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-circuit/30 bg-circuit/10 text-circuit">
          <Icon size={18} />
        </div>
        <h3 className="font-display text-lg font-semibold text-offwhite">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">{service.detail}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border border-ink-600 bg-ink-950/60 px-3 py-1 font-mono text-[11px] text-mute"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionLabel command="./services --list" title="Ce que je peux faire pour vous" />

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>

      {/* Process */}
      <div className="mt-16">
        <h3 className="mb-8 flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-offwhite">
          <span className="h-1.5 w-1.5 rounded-full bg-circuit shadow-glow" />
          Ma méthode de travail
        </h3>

        <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
          {/* Connecting line (desktop) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-gradient-to-r from-circuit/60 via-circuit/30 to-transparent md:block"
          />
          {processSteps.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-circuit/50 bg-ink-950 font-mono text-xs text-circuit shadow-glow">
                {p.step}
              </div>
              <h4 className="mt-4 font-display text-base font-semibold text-offwhite">{p.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">{p.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.a
        href="#contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ x: 4 }}
        className="mt-12 inline-flex items-center gap-2 font-mono text-sm text-circuit hover:text-offwhite"
      >
        Démarrer un projet <ArrowRight size={15} />
      </motion.a>
    </section>
  )
}
