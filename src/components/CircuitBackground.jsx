import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

export default function CircuitBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.6 })

  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [195, 205, 185])

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x * 22)
      mouseY.set(y * 22)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Parallax grid layer — drifts opposite to scroll and mouse for depth */}
      <motion.div
        style={{ y: gridY, x: springX }}
        className="absolute inset-[-10%] bg-grid bg-[size:48px_48px] opacity-60"
      />

      {/* Slow counter-drifting secondary grid for parallax depth */}
      <motion.div
        style={{
          x: useTransform(springX, (v) => v * -0.6),
          y: useTransform(springY, (v) => v * -0.6),
        }}
        className="absolute inset-[-10%] bg-grid bg-[size:96px_96px] opacity-20"
      />

      {/* Mouse-reactive glow that follows cursor softly */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-circuit/[0.06] blur-[120px]"
      />

      {/* Radial vignette to keep edges dark, drifts gently with scroll */}
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,194,255,0.08),transparent_55%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,194,255,0.05),transparent_55%)]" />
      <div className="absolute inset-0 bg-noise" />

      {/* Soft vertical scan glow, perpetual cinematic sweep */}
      <div className="absolute inset-x-0 -top-1/2 h-[200%] animate-scan bg-gradient-to-b from-transparent via-circuit/[0.03] to-transparent" />

      {/* Corner readouts, purely decorative — like a HUD, ticks with scroll progress */}
      <div className="absolute left-4 top-4 hidden font-mono text-[10px] tracking-widest text-circuit/30 md:block">
        SYS.OK
      </div>
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.8]) }}
        className="absolute right-4 top-4 hidden font-mono text-[10px] tracking-widest text-circuit md:block"
      >
        <ScrollPercent progress={scrollYProgress} />
      </motion.div>
    </div>
  )
}

function ScrollPercent({ progress }) {
  const pct = useTransform(progress, (v) => `${Math.round(v * 100)}%`)
  return <motion.span>{pct}</motion.span>
}
