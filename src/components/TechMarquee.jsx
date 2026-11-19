import { skills } from '../data/content'

const all = Object.values(skills).flat().map((s) => s.name)
const rowA = all.slice(0, Math.ceil(all.length / 2))
const rowB = all.slice(Math.ceil(all.length / 2))

function Row({ items, reverse }) {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 ${reverse ? 'animate-marqueeReverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {loop.map((name, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-offwhite/25 transition-colors hover:text-circuit md:text-4xl">
            {name}
            <span className="h-1.5 w-1.5 rounded-full bg-circuit/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Technologies"
      className="relative space-y-4 overflow-hidden border-y border-ink-700/70 bg-ink-950/40 py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </section>
  )
}
