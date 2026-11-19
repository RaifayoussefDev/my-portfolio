import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { track } from '../lib/track'
import { profile, skills, experience, featuredProject, education } from '../data/content'

const PROMPT = 'visiteur@raifa:~$'

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const projects = [
  { slug: 'dabapp', name: featuredProject.name, summary: featuredProject.pitch, stack: featuredProject.stack.map((s) => s.tech) },
  ...experience.projects.map((p) => ({ slug: slug(p.name), name: p.name, summary: p.summary, stack: p.stack, client: p.client })),
]

// Output line helpers: [text, className]
const c = (text) => [text, 'text-circuit']
const m = (text) => [text, 'text-mute']
const w = (text) => [text, 'text-offwhite']
const ok = (text) => [text, 'text-emerald-400']
const err = (text) => [text, 'text-rose-400']

const COMMANDS = {
  help: () => [
    w('Commandes disponibles :'),
    ...[
      ['whoami', 'qui suis-je'],
      ['ls projets', 'liste de mes projets'],
      ['cat <projet>', 'détails d’un projet (ex: cat dabapp)'],
      ['skills', 'ma stack technique'],
      ['experience', 'mon parcours professionnel'],
      ['education', 'ma formation'],
      ['contact', 'me joindre'],
      ['sudo hire-me', '🙂'],
      ['clear', 'nettoyer l’écran'],
    ].map(([cmd, d]) => [`  ${cmd.padEnd(16)}${d}`, 'text-mute']),
    m('Astuce : Tab pour compléter, ↑ ↓ pour l’historique.'),
  ],
  whoami: () => [
    c(profile.name),
    w(profile.role),
    m(profile.tagline),
    m(`📍 ${profile.location}`),
  ],
  ls: (args) => {
    if (args[0] && !['projets', 'projects', '-la', '-l'].includes(args[0]))
      return [err(`ls: impossible d'accéder à '${args[0]}': Aucun fichier ou dossier de ce type`)]
    return [
      m(`total ${projects.length}`),
      ...projects.map((p) => [`drwxr-xr-x  ${p.slug}/`, p.slug === 'dabapp' ? 'text-circuit' : 'text-offwhite']),
      m('→ cat <nom> pour voir les détails'),
    ]
  },
  cat: (args) => {
    const q = (args[0] || '').replace(/\/$/, '')
    if (!q) return [err('cat: opérande manquant — essayez: cat dabapp')]
    if (q === 'about.md') return COMMANDS.whoami()
    const p = projects.find((x) => x.slug === q || x.slug.startsWith(q))
    if (!p) return [err(`cat: ${q}: projet introuvable — tapez 'ls projets'`)]
    return [
      c(`# ${p.name}${p.client ? `  (client: ${p.client})` : ''}`),
      w(p.summary),
      m(`stack: ${p.stack.join(' · ')}`),
    ]
  },
  skills: () =>
    Object.entries(skills).map(([cat, items]) => [
      `${cat.padEnd(20)}${items.map((i) => i.name).join(', ')}`,
      'text-offwhite',
    ]),
  experience: () => [
    c(`${experience.role} @ ${experience.company}`),
    m(`${experience.period} — ${experience.location}`),
    w(`${experience.projects.length} projets livrés en production, dont ${experience.projects.filter((p) => p.client).length} pour Banque Populaire.`),
    m("→ 'ls projets' pour la liste"),
  ],
  education: () => education.flatMap((e) => [w(`${e.period}  ${e.degree}`), m(`            ${e.school}`)]),
  contact: () => [
    w(`email     ${profile.email}`),
    w(`tél       ${profile.phone}`),
    w(`linkedin  ${profile.linkedinUrl}`),
    w(`github    ${profile.githubUrl}`),
  ],
  date: () => [w(new Date().toLocaleString('fr-FR'))],
  pwd: () => [w('/home/visiteur/portfolio-youssef-raifa')],
  echo: (args) => [w(args.join(' '))],
  sudo: (args) => {
    if (args.join(' ') === 'hire-me' || args.join(' ') === 'hire me') return 'HIRE'
    if (args[0] === 'rm') return [err('Bien essayé 😄 — ce portfolio est en lecture seule.')]
    return [err(`sudo: ${args[0] || ''}: commande introuvable — essayez 'sudo hire-me'`)]
  },
  rm: () => [err('Permission refusée — essayez plutôt de me contacter 😉')],
  exit: () => [m('Il n’y a pas d’issue… sauf un email : ' + profile.email)],
}
const ALIASES = { projets: 'ls', projects: 'ls', 'à-propos': 'whoami', about: 'whoami', stack: 'skills', mail: 'contact', cls: 'clear' }
const COMPLETIONS = ['help', 'whoami', 'ls projets', 'skills', 'experience', 'education', 'contact', 'sudo hire-me', 'clear', ...projects.map((p) => `cat ${p.slug}`)]

const HIRE_SEQUENCE = [
  m('[sudo] vérification des permissions...'),
  ok('✓ accès accordé'),
  m('compilation de la proposition... ████████████ 100%'),
  ok('✓ Youssef est prêt à rejoindre votre équipe.'),
  c('→ ouverture de votre client mail...'),
]

const BOOT = [m('Last login: ' + new Date().toDateString() + ' on ttys001'), m("Bienvenue ! Tapez 'help' pour commencer.")]

export default function Terminal() {
  const [lines, setLines] = useState(BOOT)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIndex, setHIndex] = useState(-1)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30%' })
  const demoRan = useRef(false)
  const demoRunning = useRef(false)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const push = (...newLines) => setLines((l) => [...l, ...newLines])

  const run = async (raw) => {
    const cmdLine = raw.trim()
    push([`${PROMPT} ${cmdLine}`, 'text-offwhite', true])
    if (!cmdLine) return
    setHistory((h) => [cmdLine, ...h].slice(0, 50))
    setHIndex(-1)

    let [name, ...args] = cmdLine.split(/\s+/)
    name = ALIASES[name.toLowerCase()] ?? name.toLowerCase()
    if (!demoRunning.current) track('terminal_command', { terminal_cmd: cmdLine })

    if (name === 'clear') return setLines([])
    if (name === 'history') return push(...history.slice().reverse().map((h, i) => m(`  ${i + 1}  ${h}`)))

    const fn = COMMANDS[name]
    if (!fn) return push(err(`${name}: commande introuvable. Tapez 'help'.`))
    const out = fn(args)
    if (out === 'HIRE') {
      track('terminal_hire_me')
      setBusy(true)
      for (const line of HIRE_SEQUENCE) {
        await new Promise((r) => setTimeout(r, 450))
        push(line)
      }
      await new Promise((r) => setTimeout(r, 500))
      setBusy(false)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Opportunité — via ton portfolio')}`
      return
    }
    push(...out)
  }

  // Auto-demo: type "whoami" the first time the terminal scrolls into view
  useEffect(() => {
    if (!inView || demoRan.current) return
    demoRan.current = true
    demoRunning.current = true
    const demo = 'whoami'
    let i = 0
    setBusy(true)
    const id = setInterval(() => {
      i += 1
      setInput(demo.slice(0, i))
      if (i === demo.length) {
        clearInterval(id)
        setTimeout(() => {
          setInput('')
          run(demo)
          demoRunning.current = false
          setBusy(false)
        }, 350)
      }
    }, 110)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const onKeyDown = (e) => {
    if (busy) return e.preventDefault()
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(hIndex + 1, history.length - 1)
      if (history[next] !== undefined) {
        setHIndex(next)
        setInput(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = hIndex - 1
      setHIndex(Math.max(next, -1))
      setInput(next >= 0 ? history[next] : '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = COMPLETIONS.filter((x) => x.startsWith(input.toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
      else if (matches.length > 1 && input) push([`${PROMPT} ${input}`, 'text-offwhite', true], m(matches.join('   ')))
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const quick = ['help', 'whoami', 'ls projets', 'cat dabapp', 'skills', 'sudo hire-me']

  return (
    <section ref={sectionRef} id="terminal" className="relative mx-auto max-w-5xl px-6 py-28 md:px-12">
      <SectionLabel command="ssh visiteur@raifa.dev" title="Explorez en ligne de commande" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="relative overflow-hidden rounded-xl border border-circuit/25 bg-ink-950/90 shadow-glowLg"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-900/90 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-mute">visiteur@raifa — zsh — 80×24</span>
        </div>

        {/* CRT scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)' }}
        />

        <div
          ref={bodyRef}
          className="h-[380px] overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed sm:text-[13px]"
          role="log"
          aria-live="polite"
        >
          {lines.map(([text, cls, isCmd], i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${cls}`}>
              {isCmd ? (
                <>
                  <span className="text-circuit">{PROMPT}</span>
                  {text.slice(PROMPT.length)}
                </>
              ) : (
                text
              )}
            </div>
          ))}
          <div className="flex items-center">
            <span className="shrink-0 text-circuit">{PROMPT}&nbsp;</span>
            <span className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => !busy && setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Saisir une commande"
                className="w-full bg-transparent text-offwhite caret-circuit outline-none"
              />
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-wrap gap-2">
        {quick.map((q) => (
          <button
            key={q}
            disabled={busy}
            onClick={() => run(q)}
            className="rounded-md border border-ink-600 bg-ink-900/60 px-3 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-circuit/50 hover:text-circuit disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </section>
  )
}
