import { useEffect, useRef } from 'react'

/**
 * ParticleName — the hero's signature moment.
 * The name is sampled from an offscreen canvas into thousands of particles
 * that fly in from the void, flee the cursor, and burst apart on click
 * before snapping back home on springs.
 */
const CYAN = [0, 194, 255]
const WHITE = [238, 241, 246]

export default function ParticleName({ text, ready = true, className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const readyRef = useRef(ready)
  const startRef = useRef(null)

  useEffect(() => {
    readyRef.current = ready
    if (ready) startRef.current?.()
  }, [ready])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = false
    let visible = true
    let started = false
    const mouse = { x: -9999, y: -9999, active: false }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      const twoLines = width < 640
      const lines = twoLines ? text.split(' ') : [text]

      // Fit the font to the available width
      const off = document.createElement('canvas')
      const octx = off.getContext('2d')
      const family = '"Space Grotesk", Inter, sans-serif'
      octx.font = `700 100px ${family}`
      const widest = Math.max(...lines.map((l) => octx.measureText(l).width))
      const fontSize = Math.min((width * 0.94 * 100) / widest, twoLines ? 120 : 150)
      const lineH = fontSize * 1.02
      height = Math.ceil(lineH * lines.length + fontSize * 0.25)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      off.width = width
      off.height = height
      octx.font = `700 ${fontSize}px ${family}`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#fff'
      lines.forEach((l, i) => {
        octx.fillText(l, width / 2, fontSize * 0.62 + i * lineH)
      })

      const gap = width < 640 ? 3 : 4
      const data = octx.getImageData(0, 0, width, height).data
      const prev = particles
      particles = []
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            const old = prev[particles.length]
            const angle = Math.random() * Math.PI * 2
            const dist = Math.max(width, height) * (0.6 + Math.random() * 0.8)
            particles.push({
              hx: x,
              hy: y,
              x: old ? old.x : started || reduced ? x : width / 2 + Math.cos(angle) * dist,
              y: old ? old.y : started || reduced ? y : height / 2 + Math.sin(angle) * dist,
              vx: 0,
              vy: 0,
              size: gap * (0.55 + Math.random() * 0.35),
              // stagger the intro so letters "condense" rather than snap
              delay: Math.random() * 40,
              heat: 0,
            })
          }
        }
      }
    }

    let frame = 0
    const tick = () => {
      frame += 1
      ctx.clearRect(0, 0, width, height)
      const radius = width < 640 ? 60 : 110
      const r2 = radius * radius

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (started && frame > p.delay) {
          // spring toward home
          p.vx += (p.hx - p.x) * 0.045
          p.vy += (p.hy - p.y) * 0.045
        }
        // cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (1 - d / radius) * 6
            p.vx += (dx / d) * force
            p.vy += (dy / d) * force
            p.heat = 1
          }
        }
        p.vx *= 0.82
        p.vy *= 0.82
        p.x += p.vx
        p.y += p.vy

        // colour: white at rest, cyan when disturbed or moving
        const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 6)
        p.heat = Math.max(p.heat * 0.96, speed)
        const t = p.heat
        const r = WHITE[0] + (CYAN[0] - WHITE[0]) * t
        const g = WHITE[1] + (CYAN[1] - WHITE[1]) * t
        const b = WHITE[2] + (CYAN[2] - WHITE[2]) * t
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      if (running) raf = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (running || !visible) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stopLoop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    startRef.current = () => {
      if (started) return
      started = true
      frame = 0
    }

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }
    const onMove = (e) => {
      const { x, y } = toLocal(e.clientX, e.clientY)
      mouse.x = x
      mouse.y = y
      mouse.active = x > -radiusPad && y > -radiusPad && x < width + radiusPad && y < height + radiusPad
    }
    const radiusPad = 120
    const onLeave = () => {
      mouse.active = false
    }
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) onMove(t)
    }
    const burst = (e) => {
      const { x, y } = toLocal(e.clientX, e.clientY)
      for (const p of particles) {
        const dx = p.x - x
        const dy = p.y - y
        const d = Math.sqrt(dx * dx + dy * dy) || 1
        const force = Math.max(0, 1 - d / (width * 0.6)) * 40
        p.vx += (dx / d) * force * (0.6 + Math.random() * 0.8)
        p.vy += (dy / d) * force * (0.6 + Math.random() * 0.8)
        p.heat = 1
      }
    }

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 150)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) startLoop()
      else stopLoop()
    })

    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      build()
      if (readyRef.current) startRef.current()
      startLoop()
      io.observe(wrap)
    })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)
    document.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', burst)
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      stopLoop()
      io.disconnect()
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
      document.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', burst)
      window.removeEventListener('resize', onResize)
    }
  }, [text])

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="mx-auto block cursor-crosshair"
        style={{ filter: 'drop-shadow(0 0 18px rgba(0,194,255,0.25))' }}
      />
    </div>
  )
}
