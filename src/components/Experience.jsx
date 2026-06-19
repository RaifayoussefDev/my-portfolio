import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Building2 } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { experience, internship } from '../data/content'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: 'rgba(0,194,255,0.45)' }}
      className="group flex flex-col rounded-xl border border-ink-600 bg-ink-900/50 p-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-offwhite">{project.name}</h3>
          {project.client && (
            <p className="mt-0.5 font-mono text-[10px] tracking-wide text-circuitDim">{project.client}</p>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-mute">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-ink-600 bg-ink-950/60 px-2 py-0.5 font-mono text-[10px] text-mute transition-colors group-hover:border-circuit/30 group-hover:text-circuit"
          >
            {s}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 flex items-center gap-1.5 self-start font-mono text-[11px] text-circuit/80 transition-colors hover:text-circuit"
      >
        {open ? 'Réduire' : 'Détails'}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 space-y-2 overflow-hidden border-t border-ink-700 pt-3"
          >
            {project.points.map((pt, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-mute">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-circuit/70" />
                {pt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12">
      <SectionLabel command="cat experience.log" title="Expérience professionnelle" />

      {/* Role header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-start justify-between gap-3 rounded-xl border border-circuit/20 bg-circuit/[0.04] p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-circuit/10 text-circuit">
            <Building2 size={18} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-offwhite">
              {experience.role} <span className="text-circuit">@ {experience.company}</span>
            </h3>
            <p className="font-mono text-xs text-mute">{experience.location}</p>
          </div>
        </div>
        <span className="rounded-full border border-circuit/30 px-3 py-1 font-mono text-xs text-circuit">
          {experience.period}
        </span>
      </motion.div>

      {/* Project grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experience.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Internship, quieter footnote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-ink-700 pt-6 sm:flex-row sm:items-center"
      >
        <div>
          <h4 className="font-display text-sm font-medium text-offwhite">
            {internship.role} <span className="text-mute">@ {internship.company}</span>
          </h4>
          <p className="mt-1 text-xs text-mute">{internship.points.join(' · ')}</p>
        </div>
        <span className="font-mono text-[11px] text-mute">{internship.period}</span>
      </motion.div>
    </section>
  )
}
