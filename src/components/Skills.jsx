import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { skills, languages } from '../data/content'

function MagneticTag({ name, emphasis, index }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setPos({ x: relX * 0.25, y: relY * 0.25 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      animate={{ x: pos.x, y: pos.y }}
      style={{ transition: 'transform 0.15s ease-out' }}
      className={`inline-flex cursor-default select-none items-center rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide transition-colors ${
        emphasis
          ? 'border-circuit/50 bg-circuit/10 text-circuit hover:shadow-glow'
          : 'border-ink-600 bg-ink-900/60 text-mute hover:border-circuit/40 hover:text-offwhite'
      }`}
    >
      {name}
    </motion.span>
  )
}

export default function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionLabel command="ls -la ./competences" title="Compétences" />

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-ink-600 bg-ink-900/40 p-6"
          >
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-offwhite">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit shadow-glow" />
              {category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {items.map((item, i) => (
                <MagneticTag key={item.name} name={item.name} emphasis={item.emphasis} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 rounded-xl border border-ink-600 bg-ink-900/40 p-6"
      >
        <h3 className="mb-5 flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-offwhite">
          <span className="h-1.5 w-1.5 rounded-full bg-circuit shadow-glow" />
          Langues
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {languages.map((lang, i) => (
            <div key={lang.name}>
              <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                <span className="text-offwhite">{lang.name}</span>
                <span className="text-mute">{lang.level}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-circuit shadow-glow"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
