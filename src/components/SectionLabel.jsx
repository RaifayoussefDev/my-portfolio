import { motion } from 'framer-motion'

/**
 * SectionLabel — the page's structural signature.
 * Every section opens with a terminal-style command, echoing the
 * subject's own world (a backend engineer who lives in logs and services)
 * instead of generic numbered markers.
 */
export default function SectionLabel({ command, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-center gap-2 font-mono text-xs text-circuit/70">
        <span className="text-mute">$</span>
        <span>{command}</span>
        <span className="inline-block h-3 w-[7px] translate-y-[1px] animate-blink bg-circuit/80" />
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-offwhite md:text-4xl">
        {title}
      </h2>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-circuit/40 via-ink-600 to-transparent" />
    </motion.div>
  )
}
