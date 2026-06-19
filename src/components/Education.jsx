import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { education } from '../data/content'

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-4xl px-6 py-28 md:px-12">
      <SectionLabel command="git log --oneline ./formation" title="Formation" />

      <div className="relative pl-8">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-0 top-1 h-[calc(100%-8px)] w-px bg-gradient-to-b from-circuit via-ink-600 to-transparent"
        />

        <div className="space-y-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-circuit bg-ink-950 shadow-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-circuit" />
              </span>

              <motion.div
                whileHover={{ x: 4, borderColor: 'rgba(0,194,255,0.4)' }}
                className="rounded-lg border border-ink-600 bg-ink-900/50 p-5 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-circuit">
                    <GraduationCap size={15} />
                    <span className="font-mono text-[11px] tracking-wide">{edu.period}</span>
                  </div>
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-offwhite">{edu.degree}</h3>
                <p className="mt-1 text-sm text-mute">{edu.school}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
