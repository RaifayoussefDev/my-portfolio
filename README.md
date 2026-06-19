# Youssef Raifa — Portfolio

Portfolio cinématique en React + Tailwind CSS + Framer Motion. Thème dark "circuit" (noir + bleu électrique), avec séquence de boot, animations au scroll, et un projet phare (DabApp) mis en avant.

## Stack

- **React 18** (Vite)
- **Tailwind CSS** — design tokens personnalisés (couleurs `ink` / `circuit`, glow, grid)
- **Framer Motion** — toutes les animations (entrée hero, reveal au scroll, hover magnétique)
- **lucide-react** — icônes

## Structure du projet

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # point d'entrée
    ├── App.jsx                # assemble toutes les sections
    ├── index.css              # styles globaux + variables
    ├── data/
    │   └── content.js          # TOUT le contenu texte (CV) — modifiable sans toucher au design
    └── components/
        ├── CircuitBackground.jsx   # fond animé (grid + glow + scanline)
        ├── Navbar.jsx              # nav sticky + barre de progression de scroll
        ├── Preloader.jsx           # séquence de "boot" au chargement
        ├── Hero.jsx                # hero avec effet machine à écrire
        ├── SectionLabel.jsx        # titre de section style "commande terminal"
        ├── About.jsx
        ├── FeaturedProject.jsx     # carte DabApp (projet phare)
        ├── Experience.jsx          # grille de projets CapitalSoft (cards dépliables)
        ├── Skills.jsx              # tags avec effet de hover magnétique
        ├── Education.jsx           # timeline verticale
        └── Contact.jsx
```

## Lancer en local

Prérequis : [Node.js](https://nodejs.org/) ≥ 18.

```bash
# 1. Aller dans le dossier du projet
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Le résultat est généré dans `dist/`. Pour prévisualiser le build localement :

```bash
npm run preview
```

## Déploiement

Le dossier `dist/` généré par `npm run build` est 100% statique — il peut être déployé n'importe où.

### Vercel (recommandé, gratuit)
```bash
npm install -g vercel
vercel
```
Ou directement depuis [vercel.com](https://vercel.com) en connectant le repo GitHub — Vercel détecte Vite automatiquement.

### Netlify
- Glisser-déposer le dossier `dist/` sur [app.netlify.com/drop](https://app.netlify.com/drop), ou
- Connecter le repo avec : Build command `npm run build`, Publish directory `dist`.

### GitHub Pages
```bash
npm run build
# puis publier le contenu de dist/ sur la branche gh-pages
```

## Modifier le contenu

Tout le texte (expériences, compétences, projet DabApp, formation, coordonnées) se trouve dans **`src/data/content.js`**. Il suffit de modifier ce fichier — aucune autre modification n'est nécessaire pour mettre à jour le contenu du site.

## Personnaliser les couleurs

Les couleurs sont définies comme tokens dans `tailwind.config.js` :
- `ink-950` → `ink-600` : dégradé de noirs (fond)
- `circuit` : bleu électrique (accent principal, `#00C2FF`)
- `offwhite` / `mute` : texte principal / texte secondaire

## SEO

Le fichier `index.html` contient déjà :
- Meta tags primaires (title, description, keywords, robots, canonical)
- Favicon (`/public/favicon.png`)
- Open Graph (Facebook, LinkedIn, WhatsApp) + Twitter Card
- Données structurées Schema.org `Person` (JSON-LD) — aide Google à comprendre que c'est un profil professionnel avec compétences, employeur, contact
- `public/robots.txt` et `public/sitemap.xml`

**⚠️ Avant de déployer**, remplace partout l'URL placeholder `https://raifa-youssef-portfolio.vercel.app/` par ton vrai domaine une fois que tu l'as (dans `index.html`, `robots.txt`, `sitemap.xml`). Cherche `raifa-youssef-portfolio.vercel.app` dans le projet et remplace-le.

**Images à fournir pour le SEO :**
- `public/favicon.png` — icône de l'onglet navigateur
- `public/images/og-cover.png` — **1200×630px**, l'aperçu qui s'affiche quand le lien du site est partagé sur LinkedIn/WhatsApp/Facebook
- `public/images/raifa-portrait.png` et `public/images/dabapp-mockup.png` — déjà câblés dans le site (voir composants `About.jsx` et `FeaturedProject.jsx`)

## Favicon

Place ton fichier `favicon.png` directement dans `public/favicon.png` (pas dans `public/images/`). Il est déjà lié dans `index.html` via :
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```



- **Animations respectueuses de l'accessibilité** : `prefers-reduced-motion` est géré globalement dans `index.css`.
- **Effet machine à écrire** : implémenté avec un hook custom (`useTypewriter`) dans `Hero.jsx`, sans dépendance externe.
- **Hover magnétique** : calculé en suivant la position de la souris relative au centre de l'élément (`Skills.jsx`).
- **IntersectionObserver** : utilisé dans `Navbar.jsx` pour mettre en surbrillance le lien de navigation actif pendant le scroll.
