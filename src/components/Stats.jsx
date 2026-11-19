import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { stats } from '../data/content'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="font-feature-tnum">
      {display}
      <span className="text-circuit">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Chiffres clés" className="relative mx-auto max-w-6xl px-6 py-12 md:px-12">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-ink-900/90 p-6 md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-circuit/0 to-circuit/0 transition-colors duration-500 group-hover:from-circuit/10" />
            <div className="relative font-display text-4xl font-bold tracking-tight text-offwhite md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="relative mt-2 font-display text-sm font-semibold text-offwhite">{s.label}</div>
            <div className="relative mt-1 font-mono text-[11px] text-mute">{s.detail}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
