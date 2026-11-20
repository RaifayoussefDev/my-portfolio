import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, ArrowRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { experience, internship } from '../data/content'

function useHorizontalMode() {
  const query = '(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setOn(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return on
}

function IntroPanel() {
  const clientCount = experience.projects.filter((p) => p.client).length
  return (
    <div className="flex w-full shrink-0 flex-col justify-between rounded-2xl border border-circuit/25 bg-gradient-to-br from-circuit/[0.08] to-transparent p-8 md:w-[440px]">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-circuit/10 text-circuit">
          <Building2 size={20} />
        </div>
        <p className="mt-6 font-mono text-xs tracking-widest text-circuit">{experience.period.toUpperCase()}</p>
        <h3 className="mt-2 font-display text-4xl font-bold leading-tight text-offwhite md:text-5xl">
          {experience.company}
        </h3>
        <p className="mt-2 text-mute">
          {experience.role} — {experience.location}
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex gap-8">
          <div>
            <div className="font-display text-3xl font-bold text-offwhite">{experience.projects.length}</div>
            <div className="font-mono text-[11px] text-mute">projets livrés</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-offwhite">{clientCount}</div>
            <div className="font-mono text-[11px] text-mute">pour Banque Populaire</div>
          </div>
        </div>
        <p className="border-t border-ink-700 pt-4 font-mono text-[11px] text-mute">
          + {internship.role} · {internship.period}
        </p>
        <p className="hidden items-center gap-2 font-mono text-[11px] text-circuit md:flex">
          Continuez à scroller <ArrowRight size={13} />
        </p>
      </div>
    </div>
  )
}

function ProjectPanel({ project, index }) {
  return (
    <article className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-900/70 p-7 transition-colors duration-500 hover:border-circuit/50 md:w-[400px]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-circuit/0 blur-[70px] transition-colors duration-500 group-hover:bg-circuit/20" />
      <span className="text-outline pointer-events-none absolute -right-2 -top-5 select-none font-display text-[96px] opacity-70 font-bold leading-none transition-all duration-500 group-hover:[-webkit-text-stroke-color:rgba(0,194,255,0.6)]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        {project.client ? (
          <p className="font-mono text-[10px] tracking-widest text-circuit">CLIENT · {project.client.toUpperCase()}</p>
        ) : (
          <p className="font-mono text-[10px] tracking-widest text-mute">CAPITALSOFT</p>
        )}
        <h3 className="mt-2 max-w-[66%] font-display text-2xl font-semibold leading-tight text-offwhite">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mute">{project.summary}</p>
      </div>

      <ul className="relative mt-5 flex-1 space-y-2">
        {project.points.slice(0, 3).map((pt, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-mute/90">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-circuit/70" />
            {pt}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-ink-600 bg-ink-950/60 px-2 py-0.5 font-mono text-[10px] text-mute transition-colors group-hover:border-circuit/30 group-hover:text-circuit"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  )
}

function HorizontalExperience() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const [vh, setVh] = useState(() => window.innerHeight)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
      setVh(window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [current, setCurrent] = useState(1)
  useEffect(
    () =>
      scrollYProgress.on('change', (v) => {
        setCurrent(Math.min(experience.projects.length, Math.max(1, Math.round(v * experience.projects.length + 0.5))))
      }),
    [scrollYProgress]
  )

  return (
    <section id="experience" ref={sectionRef} className="relative" style={{ height: distance + vh }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-12">
          <SectionLabel command="cat experience.log | less" title="Expérience professionnelle" />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex h-[min(56vh,470px)] gap-6 pl-[max(3rem,calc((100vw_-_72rem)/2_+_3rem))]">
          <IntroPanel />
          {experience.projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
          {/* end spacer so the last card stops short of the edge */}
          <div aria-hidden className="w-[max(3rem,calc((100vw_-_72rem)/2_+_3rem))] shrink-0" />
        </motion.div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl items-center gap-5 px-12">
          <span className="font-mono text-xs text-circuit font-feature-tnum">
            {String(current).padStart(2, '0')} / {String(experience.projects.length).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-ink-600">
            <motion.div style={{ width: progress }} className="h-px bg-circuit shadow-glow" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StackedExperience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionLabel command="cat experience.log" title="Expérience professionnelle" />
      <div className="grid gap-5 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex">
          <IntroPanel />
        </motion.div>
        {experience.projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <ProjectPanel project={p} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Experience() {
  const horizontal = useHorizontalMode()
  return horizontal ? <HorizontalExperience /> : <StackedExperience />
}
