import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react'

const SUGGESTIONS = [
  'Quel est ton stack technique ?',
  'Tu es disponible en freelance ?',
  'Parle-moi de DabApp',
  'Comment te contacter ?',
]

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Bonjour 👋 Je suis l\'assistant IA de Youssef. Posez-moi vos questions !' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply || 'Désolé, une erreur est survenue.' }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Erreur de connexion, réessayez.' }])
    } finally {
      setLoading(false)
    }
  }

  const showSuggestions = messages.length === 1

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-glowLg"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-700 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-circuit" />
                <span className="font-display text-sm font-semibold text-offwhite">Assistant IA</span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-circuit" />
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="text-mute transition-colors hover:text-offwhite">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 font-body text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-circuit text-ink-950'
                        : 'border border-ink-700 bg-ink-800 text-offwhite'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-circuit/30 bg-circuit/5 px-3 py-1 font-mono text-[10px] text-circuit transition-colors hover:bg-circuit/15"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800 px-3 py-2">
                    <Loader2 size={13} className="animate-spin text-circuit" />
                    <span className="font-mono text-[11px] text-mute">En train de répondre…</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-ink-700 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800 px-3 py-2 focus-within:border-circuit/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Posez votre question…"
                  className="flex-1 bg-transparent font-body text-sm text-offwhite placeholder-mute outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="text-circuit transition-opacity disabled:opacity-30"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-circuit shadow-glow"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} className="text-ink-950" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={22} className="text-ink-950" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </>
  )
}
