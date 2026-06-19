import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const [hoveringInteractive, setHoveringInteractive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const trailX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.7 })
  const trailY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.7 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFine)
    if (!isFine) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target
      setHoveringInteractive(!!target.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {/* Trailing soft glow */}
      <motion.div
        style={{ left: trailX, top: trailY }}
        animate={{ scale: hoveringInteractive ? 2.2 : 1, opacity: hoveringInteractive ? 0.5 : 0.25 }}
        transition={{ duration: 0.3 }}
        className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-circuit blur-xl"
      />
      {/* Sharp core dot */}
      <motion.div
        style={{ left: springX, top: springY }}
        animate={{ scale: hoveringInteractive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-circuit shadow-glow"
      />
      {/* Ring that expands on hover over interactive elements */}
      <motion.div
        style={{ left: springX, top: springY }}
        animate={{
          scale: hoveringInteractive ? 1 : 0,
          opacity: hoveringInteractive ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-circuit"
      />
    </div>
  )
}
