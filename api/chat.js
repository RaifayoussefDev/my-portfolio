const SYSTEM_PROMPT = `Tu es l'assistant IA du portfolio de Youssef Raifa.
Réponds aux questions des visiteurs de façon concise et professionnelle, en français ou en anglais selon la langue de la question.

Informations sur Youssef Raifa :
- Ingénieur Logiciel Full Stack, 4 ans d'expérience
- Basé à Casablanca, Maroc
- Actuellement chez CapitalSoft (2022 — aujourd'hui)
- Stack : Java Spring Boot, Laravel, ASP.NET, React JS, Angular, Flutter, SQL Server, MySQL, PostgreSQL, MongoDB
- Projet freelance : DabApp (marketplace moto pour le marché du Golfe — UAE / Arabie Saoudite)
- Formation : Licence Pro Administration BDD & Technologies Web — FST Settat (2022)
- Email : yucefr@gmail.com
- LinkedIn : https://www.linkedin.com/in/youssef-raifa/
- Portfolio : https://raifa-youssef.vercel.app
- Disponible pour missions freelance et CDI

Ne réponds qu'aux questions en rapport avec Youssef, ses compétences, son expérience ou la prise de contact. Pour tout autre sujet, redirige poliment vers l'essentiel.`

const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-4-31b-it:free',
  'qwen/qwen3-coder:free',
]

async function tryModel(apiKey, model, message) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://raifa-youssef.vercel.app',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message.slice(0, 500) },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || 'Erreur API')
  const reply = data.choices?.[0]?.message?.content
  if (!reply) throw new Error('Réponse vide')
  return reply
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message vide' })

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Clé API manquante' })

  for (const model of FREE_MODELS) {
    try {
      const reply = await tryModel(apiKey, model, message)
      return res.json({ reply })
    } catch {
      continue
    }
  }

  res.status(503).json({ error: 'Service temporairement indisponible, réessayez dans quelques instants.' })
}
