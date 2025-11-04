export default {
  nav: {
    home: "Accueil",
    downloads: "Téléchargements",
    documentation: "Documentation",
    javadocs: "Javadocs",
  },
  hero: {
    title: "Canvas",
    subtitle: "Multithreading Puissant pour Minecraft",
    description:
      "Un logiciel de serveur Minecraft haute performance basé sur Folia, offrant un multithreading régionalisé transparent pour des mondes massifs.",
    getStarted: "Commencer",
    viewOnGithub: "Voir sur GitHub",
    joinDiscord: "Rejoindre Discord",
  },
  features: {
    title: "Pourquoi choisir Canvas?",
    performance: {
      title: "Performance Fulgurante",
      description:
        "Découvrez des performances serveur inégalées avec notre multithreading régionalisé avancé.",
    },
    compatibility: {
      title: "Compatible avec les Plugins",
      description:
        "Fonctionne avec la plupart des plugins compatibles Folia dès la sortie de la boîte.",
    },
    community: {
      title: "Communauté Active",
      description:
        "Rejoignez notre communauté florissante pour obtenir du support, des mises à jour et des contributions.",
    },
  },
  downloads: {
    title: "Téléchargements",
    version: "Minecraft",
    build: "Build",
    latest: "Dernière",
    experimental: "Expérimentale",
    download: "Télécharger",
    unavailable: "Indisponible",
    noChanges: "Aucun changement",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Afficher les Builds Échouées",
    hideFailedBuilds: "Masquer les Builds Échouées",
    showSculptor: "Afficher Sculptor",
    showBuilds: "Afficher les Builds",
    olderBuilds:
      "Vous cherchez des builds plus anciennes? Consultez notre serveur Jenkins →",
    jenkinsDown: {
      title: "Jenkins est en Panne",
      message:
        "Affichage des builds en cache. Les téléchargements peuvent être indisponibles.",
      noCache: "Impossible de récupérer les builds pour le moment.",
    },
    usingCache: {
      title: "Affichage des Builds en Cache",
      message:
        "Jenkins est en cours de compilation. Affichage des builds récentes depuis le cache. Les téléchargements sont toujours disponibles.",
    },
  },
  community: {
    title: "Rejoignez Notre Communauté",
    description:
      "Connectez-vous avec les développeurs, obtenez du support et restez à jour",
    discord: {
      title: "Discord",
      description:
        "Discutez avec la communauté et obtenez du support en temps réel",
      action: "Rejoindre Discord",
    },
    github: {
      title: "GitHub",
      description: "Contribuez au projet et signalez des problèmes",
      action: "Voir le Dépôt",
    },
  },
  footer: {
    madeWith: "Fait avec",
    by: "par",
    license: "Sous licence",
  },
  notFound: {
    title: "404",
    heading: "Page Non Trouvée",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'Accueil",
    reportDiscord: "Signaler sur Discord",
  },
  common: {
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    close: "Fermer",
    open: "Ouvrir",
    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",
    delete: "Supprimer",
    edit: "Modifier",
    create: "Créer",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    more: "Plus",
    less: "Moins",
  },
  status: {
    success: "Succès",
    failure: "Échec",
    aborted: "Abandonné",
    unstable: "Instable",
  },
  time: {
    justNow: "à l'instant",
    minuteAgo: "il y a une minute",
    minutesAgo: "il y a minutes",
    hourAgo: "il y a une heure",
    hoursAgo: "il y a heures",
    dayAgo: "il y a un jour",
    daysAgo: "il y a jours",
    monthAgo: "il y a un mois",
    monthsAgo: "il y a mois",
    yearAgo: "il y a un an",
    yearsAgo: "il y a ans",
  },
} as const;
