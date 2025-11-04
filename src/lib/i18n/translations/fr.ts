export default {
  nav: {
    home: "Accueil",
    downloads: "Téléchargements",
    documentation: "Documentation",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Faire un don",
    menu: "menu",
  },
  hero: {
    title: "Logiciel de serveur Minecraft haute performance",
    subtitle:
      "CanvasMC est un fork du logiciel de serveur Minecraft Folia qui corrige les incohérences de gameplay, les bugs et introduit des améliorations de performance supplémentaires au serveur dédié",
    downloadCanvas: "Télécharger Canvas",
  },
  features: {
    heading: "Qu'est-ce qui rend Canvas spécial?",
    subheading:
      "Découvrez ce qui différencie Canvas des autres logiciels de serveur Minecraft.",
    scheduler: {
      title: "Planificateur Réécrit",
      description:
        "Canvas est principalement basé sur un planificateur réécrit pour Folia, ce qui fait de Canvas l'un des forks de Folia les plus rapides.",
    },
    chunkGeneration: {
      title: "Génération de Chunks Optimisée",
      description:
        "Avec une mise à l'échelle linéaire fixe en réécrivant l'exécuteur du système de chunks, les performances des chunks sont inégalées par rapport aux autres forks.",
    },
    configuration: {
      title: "Configuration Extensive",
      description:
        "Ajustez chaque aspect de votre serveur avec des options de configuration documentées et des paramètres de performance.",
    },
    community: {
      title: "Vos Idées, Notre Code",
      description:
        "Canvas grandit avec sa communauté — partagez les fonctionnalités que vous aimeriez voir, et nous travaillerons pour les concrétiser.",
    },
    profiling: {
      title: "Profilage de Région Approprié",
      description:
        "Canvas introduit un véritable profileur Spark compatible avec le threading de région, remplaçant le moteur de profilage de Folia.",
    },
    powerful: {
      title: "Puissant et Optimisé",
      description:
        "En corrigeant plusieurs bugs et crashs de Folia, Canvas est à la fois rapide et stable",
    },
  },
  downloads: {
    title: "Téléchargements",
    subtitle:
      "Obtenez les dernières builds de CanvasMC pour votre serveur Minecraft.",
    downloadLatest: "Télécharger la Dernière Build",
    sourceCode: "Code Source",
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
    noBuilds: "Aucune build disponible pour cette version.",
    downloadsUnavailable: "Téléchargements Indisponibles",
    jenkinsUnreachable:
      "Notre serveur Jenkins est actuellement inaccessible. Veuillez réessayer plus tard.",
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
    sculptor: {
      title: "Lanceur Sculptor",
      description:
        "Sculptor est le lanceur officiel de mise à jour automatique pour Canvas. Il garantit que vous êtes toujours sur la dernière version sans avoir besoin de télécharger manuellement les builds. C'est aussi spécifique à la version de Minecraft, donc il ne se mettra à jour que vers la version de Minecraft que vous spécifiez.",
      downloadSculptor: "Télécharger Sculptor",
      exampleUsage: "Exemple d'Utilisation",
      argumentsExplained: "Arguments Expliqués",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Spécifie la version de Minecraft que Sculptor doit télécharger et gérer. Sans cela, Sculptor ne démarrera pas.",
          required: "Requis.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Accepte true ou false (par défaut: false). Si défini sur true, Sculptor inclura également les builds expérimentales de Canvas au lieu des seules stables.",
          required: "Optionnel.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Définit le nom du fichier jar du serveur téléchargé. Par défaut server.jar si non spécifié.",
          required: "Optionnel.",
        },
      },
    },
  },
  community: {
    heading: "Rejoignez notre communauté",
    subheading:
      "Connectez-vous avec la communauté Canvas, contribuez au développement et restez à jour.",
    discord: {
      title: "Discord",
      description:
        "Rejoignez notre communauté Discord pour obtenir du support, partager vos expériences et vous connecter avec d'autres utilisateurs de Canvas.",
      action: "Rejoindre Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Contribuez au développement de Canvas, signalez des problèmes et explorez notre base de code open source sur GitHub.",
      action: "Voir GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Accédez à nos dernières builds, versions de développement et suivez notre progression d'intégration continue.",
      action: "Visiter Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Projet & Développement",
      getInvolved: "S'impliquer",
      aboutCanvas: "À propos de Canvas",
    },
    links: {
      githubRepo: "Dépôt GitHub",
      jenkins: "Jenkins CI",
      downloads: "Téléchargements",
      apiDocs: "Documentation API",
      githubIssues: "Problèmes GitHub",
      donate: "Faire un don",
      license: "Licence",
    },
    disclaimer:
      "Ce site web n'est pas un site web officiel de Minecraft et n'est pas associé à Mojang Studios ou Microsoft. Tous les noms de produits et d'entreprises sont des marques commerciales ou des marques déposées de leurs détenteurs respectifs. L'utilisation de ces noms n'implique aucune affiliation ou approbation de leur part.",
    builtWith: "Fait avec",
    by: "par l'",
    team: "Équipe",
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
