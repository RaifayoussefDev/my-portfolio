import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-28 md:px-12">
      <SectionLabel command="curl -X POST /contact" title="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-circuit/25 bg-ink-900/60 p-8 text-center md:p-14"
      >
        <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-circuit/15 blur-[90px]" />

        <h3 className="relative font-display text-2xl font-bold text-offwhite md:text-3xl">
          Un projet en tête ? <span className="text-circuit">Discutons-en.</span>
        </h3>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-mute">
          Disponible pour des missions freelance ou des opportunités full-time à Casablanca.
        </p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,194,255,0.45)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-md bg-circuit px-6 py-3 font-display text-sm font-semibold text-ink-950 shadow-glow"
          >
            <Mail size={16} /> Envoyer un email
          </motion.a>
          <motion.a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0,194,255,0.8)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-md border border-ink-600 px-6 py-3 font-display text-sm font-semibold text-offwhite hover:bg-ink-800"
          >
            <Linkedin size={16} /> LinkedIn
          </motion.a>
        </div>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-mute">
          <span className="flex items-center gap-1.5">
            <Phone size={13} /> {profile.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} /> {profile.location}
          </span>
        </div>
      </motion.div>

      <footer className="mt-16 flex flex-col items-center gap-2 border-t border-ink-700 pt-8 text-center font-mono text-[11px] text-mute/70">
        <span>© {new Date().getFullYear()} {profile.name} — Tous droits réservés.</span>
        <span className="text-mute/50">Conçu &amp; développé avec React, Tailwind CSS &amp; Framer Motion.</span>
      </footer>
    </section>
  )
}
