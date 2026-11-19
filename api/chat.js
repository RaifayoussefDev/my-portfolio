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

Ne réponds qu'aux questions en rapport avec Youssef, ses compétences, son expérience ou la prise de contact. Pour tout autre sujet, redirige poliment vers l'essentiel.
Réponds en texte brut, sans Markdown (pas de **, #, ni tableaux), en 3 à 5 phrases maximum ou une courte liste avec des tirets.`

// OpenRouter retire régulièrement des modèles gratuits.
// `openrouter/free` route automatiquement vers un modèle gratuit disponible ;
// les autres servent de secours en parallèle.
const FREE_MODELS = [
  'openrouter/free',
  'baidu/ernie-5.5-flash-preview:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'google/gemma-4-31b-it:free',
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
      max_tokens: 800,
      temperature: 0.7,
    }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(`${model}: ${data.error?.message || response.status}`)
  const reply = data.choices?.[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .trim()
  if (!reply) throw new Error(`${model}: empty reply`)
  return reply
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message vide' })

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Clé API manquante' })

  try {
    const reply = await Promise.any(FREE_MODELS.map(model => tryModel(apiKey, model, message)))
    return res.json({ reply })
  } catch (err) {
    console.error('All models failed:', err.errors?.map((e) => e.message) ?? err)
    res.status(503).json({ error: 'Service temporairement indisponible, réessayez dans quelques instants.' })
  }
}
