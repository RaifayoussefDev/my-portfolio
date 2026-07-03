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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message vide' })

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Clé API manquante' })

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message.slice(0, 500) },
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content
    if (!reply) return res.status(502).json({ error: 'Réponse invalide' })

    res.json({ reply })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
