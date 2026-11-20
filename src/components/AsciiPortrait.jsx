import { useEffect, useRef, useState } from 'react'

/**
 * AsciiPortrait — the photo re-drawn live as animated ASCII code.
 * Characters decode in from noise, flicker and get swept by a scan band.
 * Hovering (or dragging on touch) opens a lens that reveals the real photo.
 */
const RAMP = " .,:;-=+*x#%&@"
const NOISE = '01<>/{}[];=+*#$&'
const LEVELS = 8

export default function AsciiPortrait({ src, alt }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [lens, setLens] = useState({ x: 0, y: 0, on: false })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = new Image()
    img.src = src

    let cells = []
    let cols = 0
    let rows = 0
    let cw = 0
    let ch = 0
    let w = 0
    let h = 0
    let raf = 0
    let visible = false
    let startTime = 0
    let last = 0

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = wrap.clientWidth
      h = wrap.clientHeight
      if (!w || !h) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cw = w < 360 ? 4 : 5
      ch = cw * 1.55
      cols = Math.floor(w / cw)
      rows = Math.floor(h / ch)

      // Sample the photo with object-fit: cover cropping
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const o = off.getContext('2d')
      const scale = Math.max(cols / img.width, (rows * (ch / cw)) / img.height)
      const sw = cols / scale
      const sh = (rows * (ch / cw)) / scale
      o.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, cols, rows)
      const data = o.getImageData(0, 0, cols, rows).data

      // Auto-levels: stretch between the 2nd and 99th luminance percentiles,
      // then a gamma lift so a dark photo still reads clearly as text
      const lums = new Float32Array(cols * rows)
      for (let k = 0; k < lums.length; k++) {
        lums[k] = (0.299 * data[k * 4] + 0.587 * data[k * 4 + 1] + 0.114 * data[k * 4 + 2]) / 255
      }
      const sorted = Float32Array.from(lums).sort()
      const lo = sorted[Math.floor(sorted.length * 0.02)]
      const hi = sorted[Math.floor(sorted.length * 0.99)] || 1

      cells = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let lum = (lums[y * cols + x] - lo) / Math.max(0.05, hi - lo)
          lum = Math.pow(Math.min(1, Math.max(0, lum)), 0.75)
          cells.push({
            x: x * cw,
            y: y * ch + ch * 0.8,
            char: RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))],
            level: Math.min(LEVELS - 1, Math.floor(lum * LEVELS)),
            reveal: reduced ? 0 : 200 + ((x / cols) * 0.4 + Math.random() * 0.6) * 1400,
          })
        }
      }
      startTime = performance.now()
    }

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (now - last < 33) return // ~30fps is plenty for text
      last = now
      const t = now - startTime
      ctx.fillStyle = '#030507'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${Math.round(ch * 0.95)}px "JetBrains Mono", monospace`

      const scanY = ((t / 4200) % 1) * (h + 120) - 60
      const buckets = Array.from({ length: LEVELS + 1 }, () => [])
      for (const c of cells) {
        if (c.char === ' ' && t > c.reveal) continue
        let char = c.char
        let level = c.level
        if (t < c.reveal) {
          char = NOISE[(Math.random() * NOISE.length) | 0]
          level = 1
        } else if (!reduced && Math.random() < 0.012) {
          char = NOISE[(Math.random() * NOISE.length) | 0]
        }
        if (!reduced && Math.abs(c.y - scanY) < 14 && level > 0) level = LEVELS // scan highlight
        buckets[level].push(c.x, c.y, char)
      }
      for (let l = 0; l <= LEVELS; l++) {
        const b = buckets[l]
        if (!b.length) continue
        ctx.fillStyle =
          l === LEVELS ? '#e6fbff' : `rgba(0, ${150 + l * 18}, 255, ${0.18 + (l / (LEVELS - 1)) * 0.82})`
        for (let i = 0; i < b.length; i += 3) ctx.fillText(b[i + 2], b[i], b[i + 1])
      }
      if (reduced) cancelAnimationFrame(raf)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was) start()
      if (!visible) cancelAnimationFrame(raf)
    })
    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) build()
    })

    img.onload = () => {
      document.fonts.ready.then(() => {
        build()
        io.observe(wrap)
        ro.observe(wrap)
      })
    }
    img.onerror = () => setFailed(true)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [src])

  const move = (e) => {
    const r = wrapRef.current.getBoundingClientRect()
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
  }

  const lensSize = 95
  const mask = lens.on
    ? `radial-gradient(circle ${lensSize}px at ${lens.x}px ${lens.y}px, #000 70%, transparent 100%)`
    : `radial-gradient(circle 0px at 50% 50%, #000, transparent)`

  if (failed) return null

  return (
    <div
      ref={wrapRef}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setLens((l) => ({ ...l, on: false }))}
      className="absolute inset-0 cursor-none touch-pan-y"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
      {/* Real photo, seen only through the lens */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-300"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
      {lens.on && (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-circuit/70 shadow-glow"
          style={{ width: lensSize * 1.6, height: lensSize * 1.6, left: lens.x - lensSize * 0.8, top: lens.y - lensSize * 0.8 }}
        />
      )}
    </div>
  )
}
