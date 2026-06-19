import { motion } from 'framer-motion'

/**
 * RevealWipe — wraps a section so it enters with a cinematic mask wipe
 * (a panel slides off to reveal content) instead of a plain fade.
 * Mimics a video-edit transition rather than a static "fade up".
 */
export default function RevealWipe({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Wipe panel */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        style={{ transformOrigin: 'bottom' }}
        className="pointer-events-none absolute inset-0 z-20 bg-ink-950"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        style={{ transformOrigin: 'bottom' }}
        className="pointer-events-none absolute inset-0 z-10 bg-circuit/10"
      />
    </div>
  )
}
