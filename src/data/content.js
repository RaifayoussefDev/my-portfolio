export const profile = {
  name: 'Youssef Raifa',
  role: 'Ingénieur Logiciel — Full Stack',
  tagline: "4 ans d'expérience à concevoir et livrer des applications web et mobiles robustes, de l'architecture jusqu'à la mise en production.",
  location: 'Casablanca, Maroc',
  email: 'yucefr@gmail.com',
  phone: '+212 6 88 80 82 38',
  linkedin: 'Youssef Raifa',
  linkedinUrl: 'https://www.linkedin.com/in/youssef-raifa/',
  githubUrl: 'https://github.com/RaifayoussefDev',
}

export const about = {
  paragraphs: [
    "Développeur Full Stack spécialisé dans la conception et le développement d'applications web et mobiles robustes et scalables, avec une maîtrise confirmée de Java Spring Boot, Laravel, .NET, React JS, Angular, Flutter et SQL Server.",
    "Reconnu pour ma capacité à piloter des projets de bout en bout — de l'architecture technique et la modélisation des données jusqu'à la mise en production — tout en garantissant qualité du code, performance et expérience utilisateur.",
  ],
  pillars: [
    { label: 'Architecture', detail: 'Conception de bases de données, API REST sécurisées et services temps réel' },
    { label: 'Backend', detail: 'Spring Boot, Laravel, ASP.NET — logique métier, paiements, intégrations' },
    { label: 'Frontend & Mobile', detail: 'React, Angular, Flutter — interfaces interactives et responsives' },
    { label: 'Production', detail: "Déploiement, monitoring et maintenance d'applications en environnement réel" },
  ],
}

export const skills = {
  Backend: [
    { name: 'Java Spring Boot', emphasis: true },
    { name: 'Laravel', emphasis: true },
    { name: 'ASP.NET / VB.NET', emphasis: false },
    { name: 'API REST', emphasis: false },
    { name: 'PHP', emphasis: false },
  ],
  Frontend: [
    { name: 'React JS', emphasis: true },
    { name: 'Angular', emphasis: true },
    { name: 'Flutter', emphasis: true },
    { name: 'JavaScript ES6+', emphasis: false },
    { name: 'HTML5 / CSS3', emphasis: false },
  ],
  'Bases de données': [
    { name: 'SQL Server', emphasis: true },
    { name: 'MySQL', emphasis: false },
    { name: 'PostgreSQL', emphasis: false },
    { name: 'MongoDB', emphasis: false },
  ],
  'Outils & Plateformes': [
    { name: 'Git', emphasis: false },
    { name: 'Docker', emphasis: false },
    { name: 'Services Windows', emphasis: false },
    { name: 'UML & Merise', emphasis: false },
    { name: 'iVMS SDK / Contrôle d\u2019accès', emphasis: false },
    { name: 'WordPress', emphasis: false },
  ],
}

export const languages = [
  { name: 'Arabe', level: 'Langue maternelle', value: 100 },
  { name: 'Français', level: 'Courant', value: 90 },
  { name: 'Anglais', level: 'Intermédiaire', value: 60 },
]

// Featured personal/freelance project — DabApp
export const featuredProject = {
  name: 'DabApp',
  tag: 'Projet Freelance',
  pitch: 'Marketplace & plateforme communautaire moto pour le marché du Golfe (UAE / Arabie Saoudite) — vente, enchères et services moto, du concept à l\u2019architecture complète.',
  description:
    "Conception et développement complet d'une plateforme moto multi-pays : application mobile pour les utilisateurs, panel d'administration et site web pour la gestion, avec un système d'enchères en temps réel, des paiements intégrés et une architecture de données pensée pour le scale multi-devises.",
  stack: [
    { layer: 'Mobile', tech: 'Flutter', detail: 'Application utilisateur — annonces, enchères, services, notifications push' },
    { layer: 'Admin & Web', tech: 'Angular', detail: 'Panel d\u2019administration et site web — gestion des annonces, utilisateurs, modération' },
    { layer: 'Backend', tech: 'Laravel 11', detail: 'API REST, authentification Sanctum/JWT, logique métier et permissions dynamiques' },
    { layer: 'Paiement', tech: 'PayTabs', detail: 'Abonnements récurrents (Basic / Business / Enterprise), essai 7 jours, configuration test/live' },
  ],
  highlights: [
    {
      title: 'Système d\u2019enchères SOOM',
      detail: 'Moteur d\u2019enchères en temps réel avec incréments dynamiques, machine à états (draft → live → closing → sold) et détection de surenchère.',
    },
    {
      title: 'Architecture base de données',
      detail: 'Modélisation complète multi-modules (annonces, enchères, paiements, services, notifications) avec plus de 30 tables et relations optimisées pour la performance.',
    },
    {
      title: 'Paiements & abonnements PayTabs',
      detail: 'Intégration de la facturation récurrente avec gestion des plans, essais gratuits et environnements test/production séparés.',
    },
    {
      title: 'Notifications & immatriculation',
      detail: 'Système de notifications push Firebase (8 tables, 30+ templates bilingues AR/EN) et génération automatique de plaques d\u2019immatriculation (KSA, Abu Dhabi, Dubaï) via Puppeteer.',
    },
    {
      title: 'Panel d\u2019administration Angular',
      detail: 'Interface de gestion complète avec système de rôles et permissions, menus dynamiques, et documentation Swagger séparée pour le web et l\u2019admin.',
    },
    {
      title: 'Géolocalisation & services',
      detail: 'Points d\u2019intérêt avec filtrage géospatial, routage Google Maps, et module de services (remorquage, transport, lavage, entretien, formation à la conduite).',
    },
  ],
}

export const experience = {
  company: 'CapitalSoft',
  role: 'Développeur Full Stack',
  period: '2022 — Aujourd\u2019hui',
  location: 'Casablanca, Maroc',
  projects: [
    {
      id: 'capital-time',
      name: 'Capital Time',
      summary: 'Application RH complète de gestion des collaborateurs : pointage, présence et absences.',
      stack: ['Backend interne', 'SQL Server', 'Dashboards'],
      points: [
        'Conception et développement d\u2019une application RH complète : pointage, présence, absences justifiées et non justifiées.',
        'Tableaux de bord et rapports interactifs pour le suivi des performances et du temps de travail.',
        'Workflow de validation des demandes par les managers, avec génération automatique de documents (contrats, attestations, feuilles de temps).',
        'Gestion des heures supplémentaires, salaires, congés et compteurs de jours de repos.',
        'Système d\u2019alertes automatiques pour absences et dépassements horaires.',
        'Maintenance et optimisation de la base de données via des scripts SQL.',
      ],
    },
    {
      id: 'rgpd-bp',
      name: 'Application RGPD',
      client: 'Banque Populaire',
      summary: 'Plateforme de conformité RGPD/CNDP avec traçabilité complète des traitements de données.',
      stack: ['Java Spring Boot', 'React JS', 'SQL Server'],
      points: [
        'Pilotage complet du cycle de vie du projet : analyse des besoins, mise en production, formation des utilisateurs.',
        'API REST sécurisée pour la gestion des traitements de données, conforme aux directives de la CNDP.',
        'Frontend moderne pour le suivi et l\u2019archivage des fiches de traitement, avec arbres de validation complexes.',
        'Système de traçabilité et d\u2019audit des actions (Logging / Audit Trail) pour la confidentialité des données sensibles.',
        'Moteur d\u2019alertes automatiques pour la non-conformité et génération dynamique de rapports réglementaires (Excel).',
      ],
    },
    {
      id: 'privilege',
      name: 'Club Sportif Privilège',
      summary: 'Application complète de gestion d\u2019un club sportif : adhérents, accès, abonnements.',
      stack: ['Laravel', 'React JS', 'Flutter', 'SQL Server'],
      points: [
        'Conception et développement complet de l\u2019application, de l\u2019analyse des besoins à la formation des utilisateurs.',
        'Application mobile Flutter pour les adhérents, coachs et responsables.',
        'Intégration avec les tourniquets de contrôle d\u2019accès et génération automatique de badges (SDK iVMS).',
        'Gestion des abonnements, contrats, factures et offres spécifiques.',
        'Suivi des accès en fonction de la validité des abonnements et gestion complète des adhérents.',
      ],
    },
    {
      id: 'sync-service',
      name: 'Service de synchronisation temps réel',
      summary: 'Service Windows en C# pour la synchronisation multi-sites des données de présence.',
      stack: ['C#', 'Services Windows', 'SQL Server'],
      points: [
        'Développement d\u2019un service Windows pour la synchronisation en temps réel de bases de données multi-sites.',
        'Affichage en temps réel du pointage des collaborateurs avec mise à jour automatique des données de présence.',
      ],
    },
    {
      id: 'visitor-mgmt',
      name: 'Gestion des visiteurs',
      summary: 'Modernisation frontend avec génération de QR codes et reporting centralisé.',
      stack: ['Frameworks modernes', 'QR Code', 'Email'],
      points: [
        'Modernisation du frontend avec intégration de frameworks modernes.',
        'Génération automatique de QR codes pour les visiteurs et envoi par e-mail.',
        'Gestion centralisée des visiteurs, historiques et rapports statistiques.',
      ],
    },
    {
      id: 'bp-visitors-capacity',
      name: 'Visiteurs & Taux de Capacité',
      client: 'Banque Populaire',
      summary: 'Suivi en temps réel des visiteurs et du taux de capacité par agence.',
      stack: ['Laravel', 'Next.js', 'SQL Server'],
      points: [
        'Conception de l\u2019architecture technique et développement complet de l\u2019application.',
        'Gestion des visiteurs en temps réel avec suivi et contrôle du taux de capacité par agence.',
        'API REST sécurisée et interface moderne et responsive.',
        'En cours de déploiement.',
      ],
    },
    {
      id: 'bp-art',
      name: 'Inventaire des Tableaux d\u2019Art',
      client: 'Banque Populaire',
      summary: 'Système digitalisé de suivi du patrimoine artistique à l\u2019échelle nationale.',
      stack: ['Laravel', 'React JS', 'SQL Server'],
      points: [
        'Système de suivi et d\u2019inventaire digitalisé pour l\u2019ensemble des tableaux d\u2019art à l\u2019échelle nationale.',
        'Gestion des emplacements et des activités liées aux œuvres dans une plateforme centralisée.',
        'Contribution à la valorisation et à la traçabilité du patrimoine artistique de l\u2019institution.',
      ],
    },
    {
      id: 'capitalsoft-site',
      name: 'Site web CapitalSoft.ma',
      summary: 'Site institutionnel développé de bout en bout avec design responsive.',
      stack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      points: [
        'Développement complet avec intégration de fonctionnalités dynamiques et responsive design.',
        'Optimisation UX/UI pour améliorer la navigation et l\u2019expérience utilisateur.',
        'Mise en place de formulaires interactifs, systèmes de notifications et gestion de contenus dynamiques.',
      ],
    },
  ],
}

export const internship = {
  company: 'CapitalSoft',
  role: 'Stage — Développement Frontend',
  period: '01/09/2021 — 31/12/2021',
  points: [
    'Développement frontend de l\u2019application de gestion des visiteurs.',
    'Développement frontend du site web CapitalSoft.',
  ],
}

export const education = [
  {
    degree: 'Licence Professionnelle — Administration de Bases de Données et Technologies Web',
    school: 'Faculté des Sciences et Techniques — Settat',
    period: '2021 — 2022',
  },
  {
    degree: 'Technicien Spécialisé en Développement Informatique',
    school: 'Centre de Formation Professionnelle Mixte Lalla Aicha',
    period: '2019 — 2021',
  },
  {
    degree: 'Baccalauréat Scientifique Expérimental',
    school: 'Lycée Taha Hossein',
    period: '2016 — 2017',
  },
]
