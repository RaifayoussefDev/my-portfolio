import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import SectionLabel from './SectionLabel'

const LEVELS = ['#0e0f12', '#003c49', '#006175', '#009ab3', '#00C2FF']

function getLevel(count) {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 10) return 3
  return 4
}

const QUERY = `query {
  user(login: "RaifayoussefDev") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        months { name totalWeeks }
        weeks { contributionDays { contributionCount date } }
      }
    }
  }
}`

export default function GitHubContributions() {
  const [cal, setCal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    if (!token) { setLoading(false); return }

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((r) => r.json())
      .then((json) => { setCal(json.data.user.contributionsCollection.contributionCalendar); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading || !cal) return null

  const { totalContributions, weeks, months } = cal

  return (
    <section id="contributions" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionLabel command="git log --graph --oneline" title="Contributions" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-ink-700 bg-ink-900 p-6 md:p-8"
        >
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-display text-4xl font-bold text-offwhite">
                  {totalContributions.toLocaleString()}
                </span>
                <span className="ml-2 font-mono text-sm text-mute">contributions this year</span>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-circuit/25 bg-circuit/5 px-3 py-1 font-mono text-[10px] tracking-widest text-circuit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-circuit" />
                </span>
                LIVE — GITHUB API
                <Github size={10} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-mute">
              <span>Less</span>
              {LEVELS.map((color, i) => (
                <span key={i} style={{ background: color, border: '1px solid rgba(255,255,255,0.06)' }}
                  className="h-3 w-3 rounded-[3px]" />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="mb-1 flex gap-[3px] pl-7">
              {months.map((m, i) => (
                <div key={i} className="overflow-hidden font-mono text-[10px] text-mute"
                  style={{ minWidth: `${m.totalWeeks * 13}px`, maxWidth: `${m.totalWeeks * 13}px` }}>
                  {m.name.slice(0, 3)}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px]">
              <div className="flex shrink-0 flex-col justify-around pr-2 font-mono text-[10px] text-mute"
                style={{ height: `${7 * 13 - 3}px` }}>
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, di) => (
                    <motion.div
                      key={di}
                      className="h-[10px] w-[10px] rounded-[3px]"
                      style={{ background: LEVELS[getLevel(day.contributionCount)], border: '1px solid rgba(255,255,255,0.04)' }}
                      title={`${day.date} — ${day.contributionCount} contributions`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: Math.min((wi * 7 + di) * 0.002, 0.8), ease: 'backOut' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
