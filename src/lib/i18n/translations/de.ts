export default {
  nav: {
    home: "Startseite",
    downloads: "Downloads",
    documentation: "Dokumentation",
    javadocs: "Javadocs",
  },
  hero: {
    title: "Canvas",
    subtitle: "Leistungsstarkes Multithreading für Minecraft",
    description:
      "Eine hochleistungsfähige Minecraft-Serversoftware auf Basis von Folia, die nahtloses regionalisiertes Multithreading für massive Welten bietet.",
    getStarted: "Loslegen",
    viewOnGithub: "Auf GitHub ansehen",
    joinDiscord: "Discord beitreten",
  },
  features: {
    title: "Warum Canvas wählen?",
    performance: {
      title: "Blitzschnelle Leistung",
      description:
        "Erleben Sie unübertroffene Serverleistung mit unserem fortschrittlichen regionalisierten Multithreading.",
    },
    compatibility: {
      title: "Plugin-Kompatibel",
      description:
        "Funktioniert sofort mit den meisten Folia-kompatiblen Plugins.",
    },
    community: {
      title: "Aktive Community",
      description:
        "Treten Sie unserer blühenden Community bei, um Support, Updates und Beiträge zu erhalten.",
    },
  },
  downloads: {
    title: "Downloads",
    version: "Minecraft",
    build: "Build",
    latest: "Neueste",
    experimental: "Experimentell",
    download: "Herunterladen",
    unavailable: "Nicht verfügbar",
    noChanges: "Keine Änderungen",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Fehlgeschlagene Builds anzeigen",
    hideFailedBuilds: "Fehlgeschlagene Builds ausblenden",
    showSculptor: "Sculptor anzeigen",
    showBuilds: "Builds anzeigen",
    olderBuilds:
      "Suchen Sie nach älteren Builds? Schauen Sie sich unseren Jenkins-Server an →",
    jenkinsDown: {
      title: "Jenkins ist ausgefallen",
      message:
        "Zeige zwischengespeicherte Builds. Downloads sind möglicherweise nicht verfügbar.",
      noCache: "Builds können derzeit nicht abgerufen werden.",
    },
    usingCache: {
      title: "Zeige zwischengespeicherte Builds",
      message:
        "Jenkins erstellt derzeit Builds. Zeige aktuelle Builds aus dem Cache. Downloads sind weiterhin verfügbar.",
    },
  },
  community: {
    title: "Treten Sie unserer Community bei",
    description:
      "Vernetzen Sie sich mit Entwicklern, erhalten Sie Support und bleiben Sie auf dem Laufenden",
    discord: {
      title: "Discord",
      description:
        "Chatten Sie mit der Community und erhalten Sie Echtzeit-Support",
      action: "Discord beitreten",
    },
    github: {
      title: "GitHub",
      description: "Tragen Sie zum Projekt bei und melden Sie Probleme",
      action: "Repository ansehen",
    },
  },
  footer: {
    madeWith: "Erstellt mit",
    by: "von",
    license: "Lizenziert unter",
  },
  notFound: {
    title: "404",
    heading: "Seite nicht gefunden",
    description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    backHome: "Zurück zur Startseite",
    reportDiscord: "Auf Discord melden",
  },
  common: {
    loading: "Lädt...",
    error: "Fehler",
    success: "Erfolg",
    close: "Schließen",
    open: "Öffnen",
    save: "Speichern",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    delete: "Löschen",
    edit: "Bearbeiten",
    create: "Erstellen",
    search: "Suchen",
    filter: "Filtern",
    sort: "Sortieren",
    more: "Mehr",
    less: "Weniger",
  },
  status: {
    success: "Erfolg",
    failure: "Fehlgeschlagen",
    aborted: "Abgebrochen",
    unstable: "Instabil",
  },
  time: {
    justNow: "gerade eben",
    minuteAgo: "vor einer Minute",
    minutesAgo: "vor Minuten",
    hourAgo: "vor einer Stunde",
    hoursAgo: "vor Stunden",
    dayAgo: "vor einem Tag",
    daysAgo: "vor Tagen",
    monthAgo: "vor einem Monat",
    monthsAgo: "vor Monaten",
    yearAgo: "vor einem Jahr",
    yearsAgo: "vor Jahren",
  },
} as const;
