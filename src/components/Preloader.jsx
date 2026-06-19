import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
  'initializing system...',
  'loading modules: spring-boot, laravel, react, angular, flutter',
  'connecting to sql_server... OK',
  'welcome.',
]

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 260)
      return () => clearTimeout(t)
    }
    const exit = setTimeout(() => {
      setVisible(false)
      const cb = setTimeout(onDone, 700)
      return () => clearTimeout(cb)
    }, 450)
    return () => clearTimeout(exit)
  }, [lineIndex, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
        >
          <div className="w-full max-w-md px-6 font-mono text-xs text-circuit sm:text-sm">
            {lines.slice(0, lineIndex + 1).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-1.5 flex gap-2"
              >
                <span className="text-mute">$</span>
                <span className={i === lines.length - 1 ? 'text-offwhite' : ''}>{line}</span>
              </motion.div>
            ))}
            <motion.span
              className="mt-1 inline-block h-3.5 w-2 bg-circuit"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
