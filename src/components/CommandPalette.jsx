import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search, Hash, Mail, Copy, Linkedin, Github, Phone, CornerDownLeft, ArrowUp,
} from 'lucide-react'
import { profile } from '../data/content'

const sections = [
  { id: 'top', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'dabapp', label: 'DabApp — projet phare' },
  { id: 'experience', label: 'Expérience' },
  { id: 'skills', label: 'Compétences' },
  { id: 'services', label: 'Services' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

export const openCommandPalette = () => window.dispatchEvent(new Event('open-command-palette'))

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  const commands = useMemo(
    () => [
      ...sections.map((s) => ({
        group: 'Navigation',
        label: s.label,
        icon: s.id === 'top' ? ArrowUp : Hash,
        run: () => {
          if (s.id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
          else document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
        },
      })),
      {
        group: 'Actions',
        label: 'Copier mon email',
        hint: profile.email,
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email)
            showToast('Email copié ✓')
          } catch {
            showToast(profile.email)
          }
        },
      },
      { group: 'Actions', label: 'Envoyer un email', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { group: 'Actions', label: 'Appeler', hint: profile.phone, icon: Phone, run: () => (window.location.href = `tel:${profile.phone.replace(/\s/g, '')}`) },
      { group: 'Liens', label: 'LinkedIn', icon: Linkedin, run: () => window.open(profile.linkedinUrl, '_blank', 'noopener') },
      { group: 'Liens', label: 'GitHub', icon: Github, run: () => window.open(profile.githubUrl, '_blank', 'noopener') },
    ],
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ''}`.toLowerCase().includes(q))
  }, [query, commands])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  const execute = (cmd) => {
    if (!cmd) return
    setOpen(false)
    setTimeout(() => cmd.run(), 80)
  }

  const onInputKey = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      execute(filtered[index])
    }
  }

  let lastGroup = null

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-950/70 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Palette de commandes"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-circuit/30 bg-ink-900/95 shadow-glowLg"
            >
              <div className="flex items-center gap-3 border-b border-ink-600 px-4 py-3">
                <Search size={16} className="text-circuit" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Tapez une commande ou une section…"
                  className="w-full bg-transparent font-mono text-sm text-offwhite placeholder:text-mute/60 focus:outline-none"
                />
                <kbd className="rounded border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] text-mute">ESC</kbd>
              </div>

              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center font-mono text-xs text-mute">
                    command not found: {query}
                  </li>
                )}
                {filtered.map((cmd, i) => {
                  const Icon = cmd.icon
                  const header = cmd.group !== lastGroup
                  lastGroup = cmd.group
                  return (
                    <li key={`${cmd.group}-${cmd.label}`}>
                      {header && (
                        <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-mute/60">
                          {cmd.group}
                        </div>
                      )}
                      <button
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => execute(cmd)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                          i === index ? 'bg-circuit/10 text-offwhite' : 'text-mute'
                        }`}
                      >
                        <Icon size={15} className={i === index ? 'text-circuit' : ''} />
                        <span className="flex-1">{cmd.label}</span>
                        {cmd.hint && <span className="hidden font-mono text-[11px] text-mute/60 sm:inline">{cmd.hint}</span>}
                        {i === index && <CornerDownLeft size={13} className="text-circuit" />}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-ink-600 px-4 py-2 font-mono text-[10px] text-mute/70">
                <span>↑↓ naviguer</span>
                <span>↵ exécuter</span>
                <span className="ml-auto">Ctrl / ⌘ + K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-0 bottom-6 z-[70] mx-auto w-fit rounded-md border border-circuit/40 bg-ink-900 px-4 py-2 font-mono text-xs text-circuit shadow-glow"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
