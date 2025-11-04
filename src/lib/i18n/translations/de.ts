export default {
  nav: {
    home: "Startseite",
    downloads: "Downloads",
    documentation: "Dokumentation",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Spenden",
    menu: "Menü",
  },
  hero: {
    title: "Hochleistungs-Minecraft-Serversoftware",
    subtitle:
      "CanvasMC ist ein Fork der Folia Minecraft-Serversoftware, der Gameplay-Inkonsistenzen und Fehler behebt und weitere Leistungsverbesserungen für den dedizierten Server einführt",
    downloadCanvas: "Canvas herunterladen",
  },
  features: {
    heading: "Was macht Canvas besonders?",
    subheading:
      "Erfahren Sie, was Canvas von anderer Minecraft-Serversoftware unterscheidet.",
    scheduler: {
      title: "Neu geschriebener Scheduler",
      description:
        "Canvas basiert hauptsächlich auf einem neu geschriebenen Scheduler für Folia, was Canvas zu einem der schnellsten Folia-Forks macht.",
    },
    chunkGeneration: {
      title: "Optimierte Chunk-Generierung",
      description:
        "Mit fester linearer Skalierung durch das Neuschreiben des Chunk-System-Executors ist die Chunk-Leistung im Vergleich zu anderen Forks unübertroffen.",
    },
    configuration: {
      title: "Umfangreiche Konfiguration",
      description:
        "Optimieren Sie jeden Aspekt Ihres Servers mit dokumentierten Konfigurationsoptionen und Leistungseinstellungen.",
    },
    community: {
      title: "Ihre Ideen, Unser Code",
      description:
        "Canvas wächst mit seiner Community – teilen Sie die Funktionen, die Sie sehen möchten, und wir werden daran arbeiten, sie zum Leben zu erwecken.",
    },
    profiling: {
      title: "Echtes Regions-Profiling",
      description:
        "Canvas führt einen echten Spark-Profiler ein, der mit Region-Threading kompatibel ist und die Folia-Profiling-Engine ersetzt.",
    },
    powerful: {
      title: "Leistungsstark und Optimiert",
      description:
        "Durch die Behebung mehrerer Folia-Fehler und Abstürze ist Canvas sowohl schnell als auch stabil",
    },
  },
  downloads: {
    title: "Downloads",
    subtitle:
      "Holen Sie sich die neuesten Builds von CanvasMC für Ihren Minecraft-Server.",
    downloadLatest: "Neuesten Build herunterladen",
    sourceCode: "Quellcode",
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
    noBuilds: "Keine Builds für diese Version verfügbar.",
    downloadsUnavailable: "Downloads nicht verfügbar",
    jenkinsUnreachable:
      "Unser Jenkins-Server ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut.",
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
    sculptor: {
      title: "Sculptor Launcher",
      description:
        "Sculptor ist der offizielle Auto-Update-Launcher für Canvas. Er stellt sicher, dass Sie immer die neueste Version haben, ohne manuell Builds herunterladen zu müssen. Dies ist auch Minecraft-versionsspezifisch, sodass nur auf die von Ihnen angegebene Minecraft-Version aktualisiert wird.",
      downloadSculptor: "Sculptor herunterladen",
      exampleUsage: "Beispielverwendung",
      argumentsExplained: "Argumente erklärt",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Gibt die Minecraft-Version an, für die Sculptor Builds herunterladen und verwalten soll. Ohne dies wird Sculptor nicht starten.",
          required: "Erforderlich.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Akzeptiert true oder false (Standard: false). Wenn auf true gesetzt, wird Sculptor auch experimentelle Canvas-Builds einschließen statt nur stabile.",
          required: "Optional.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Legt den Namen der heruntergeladenen Server-JAR-Datei fest. Standardmäßig server.jar, wenn nicht angegeben.",
          required: "Optional.",
        },
      },
    },
  },
  community: {
    heading: "Treten Sie unserer Community bei",
    subheading:
      "Vernetzen Sie sich mit der Canvas-Community, tragen Sie zur Entwicklung bei und bleiben Sie auf dem Laufenden.",
    discord: {
      title: "Discord",
      description:
        "Treten Sie unserer Discord-Community bei, um Support zu erhalten, Ihre Erfahrungen zu teilen und sich mit anderen Canvas-Benutzern zu vernetzen.",
      action: "Discord beitreten",
    },
    github: {
      title: "GitHub",
      description:
        "Tragen Sie zur Canvas-Entwicklung bei, melden Sie Probleme und erkunden Sie unsere Open-Source-Codebasis auf GitHub.",
      action: "GitHub ansehen",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Greifen Sie auf unsere neuesten Builds, Entwicklungsversionen zu und verfolgen Sie unseren kontinuierlichen Integrationsfortschritt.",
      action: "Jenkins besuchen",
    },
  },
  footer: {
    sections: {
      projectDev: "Projekt & Entwicklung",
      getInvolved: "Mitmachen",
      aboutCanvas: "Über Canvas",
    },
    links: {
      githubRepo: "GitHub-Repository",
      jenkins: "Jenkins CI",
      downloads: "Downloads",
      apiDocs: "API-Dokumentation",
      githubIssues: "GitHub-Probleme",
      donate: "Spenden",
      license: "Lizenz",
    },
    disclaimer:
      "Diese Website ist keine offizielle Minecraft-Website und steht nicht in Verbindung mit Mojang Studios oder Microsoft. Alle Produkt- und Firmennamen sind Marken oder eingetragene Marken ihrer jeweiligen Inhaber. Die Verwendung dieser Namen impliziert keine Zugehörigkeit oder Unterstützung durch sie.",
    builtWith: "Erstellt mit",
    by: "vom",
    team: "Team",
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
