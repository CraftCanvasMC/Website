export default {
  nav: {
    home: "Home",
    downloads: "Downloads",
    converter: "Converter",
    stats: "Stats",
    documentation: "Documentation",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Donate",
    menu: "menu",
  },
  hero: {
    title: "High performance Minecraft server software",
    subtitle:
      "Canvas is a fork of Folia introducing over 80 fixes to region threading as of 26.2 including crashes, exploits, gameplay inconsistencies, and offering powerful optimizations bundled with it",
    downloadCanvas: "Download Canvas",
  },
  features: {
    heading: "What makes Canvas special?",
    subheading:
      "Find out what makes Canvas different from other Minecraft server software.",
    scheduler: {
      title: "Stability",
      description:
        "Folia has a ton of bugs, leaving most people to need to fork Folia to resolve crashes they may encounter. Canvas bundles over 80 fixes to just region threading alone to make sure your server runs consistently and with stability.",
    },
    chunkGeneration: {
      title: "Knowledgeable Team",
      description:
        "Our development team is comprised of skilled developers, some who have specifically dedicated hours and hours of time to study Folia to learn it's internals and inner-workings and understand it on a deeper level.",
    },
    community: {
      title: "Faster Updates",
      description:
        "Canvas is a fork of Folia, but upstreams from Paper, meaning we can update Minecraft before Folia even starts updating.",
    },
    configuration: {
      title: "Extensive Configuration",
      description:
        "Canvas has large configurations that are documented in the config files to help fine-tune all of Canvas' features and performance options to your liking.",
    },
    profiling: {
      title: "Proper Region Profiling",
      description:
        "Canvas introduces a modified Spark profiler that allows profiling specific regions via Spark, replacing the Folia region profiler.",
    },
    powerful: {
      title: "Powerful and Optimized",
      description:
        "Canvas not only fixes Folia bugs. We also introduce numerous performance optimizations to the server, ensuring the server runs smoothly in high player counts.",
    },
  },
  downloads: {
    title: "Downloads",
    subtitle:
      "Get the latest builds of our software for your Minecraft server.",
    selectTitle: "Select the software you want to download",
    downloadLatest: "Download Latest Build",
    sourceCode: "Source Code",
    version: "Channel",
    build: "Build",
    latest: "Latest",
    experimental: "Experimental",
    download: "Download",
    unavailable: "Unavailable",
    noChanges: "No changes",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Show Failed Builds",
    hideFailedBuilds: "Hide Failed Builds",
    showSculptor: "Show Sculptor",
    showBuilds: "Show Builds",
    olderBuilds: "Looking for older builds? Check out our Jenkins server →",
    noBuilds: "No builds available for this version.",
    downloadsUnavailable: "Downloads Unavailable",
    jenkinsUnreachable:
      "Our Jenkins server is currently unreachable. Please check back later.",
    jenkinsDown: {
      title: "Jenkins is Down",
      message: "Showing cached builds. Downloads may be unavailable.",
      noCache: "Unable to fetch builds at this time.",
    },
    usingCache: {
      title: "Showing Cached Builds",
      message:
        "Jenkins is currently building. Showing recent builds from cache. Downloads are still available.",
    },
    configMigrationWarning: {
      title: "Config migration required",
      messageBeforeLink:
        "The config system has changed. If you are updating from 1.21.11, please migrate your config using the ",
      linkText: "converter page",
      messageAfterLink: ".",
    },
    sculptor: {
      title: "Sculptor Launcher",
      description:
        "Sculptor is the official auto-updating launcher for Canvas. It ensures you're always on the latest version without needing to manually download builds. This is Minecraft-version specific too, so it will only update to the Minecraft version you specify.",
      downloadSculptor: "Download Sculptor",
      exampleUsage: "Example Usage",
      argumentsExplained: "Arguments Explained",
      args: {
        channelVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Specifies the Minecraft version Sculptor should download and manage builds for. Without this, Sculptor will fail to launch.",
          required: "Required.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Accepts true or false (default: false). If set to true, Sculptor will also include experimental Canvas builds instead of only stable ones.",
          required: "Optional.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Sets the name of the downloaded server jar file. Defaults to server.jar if not specified.",
          required: "Optional.",
        },
      },
    },
    products: {
      canvas: {
        title: "Canvas",
        description:
          "Canvas is a fork of the Folia server software that introduces numerous critical fixes and performance enhancements to the dedicated server.",
      },
      horizon: {
        title: "Horizon",
        description:
          "Horizon is a Paper MIXIN wrapper and plugin platform for extending Paper-based servers.",
      },
    },
  },
  stats: {
    heroTag: "Server Implementation",
    cards: {
      servers: "SERVERS",
      players: "PLAYERS",
      downloads: "DOWNLOADS",
      record: "RECORD",
      total: "TOTAL",
    },
    counterStartedOn: "Downloads counter started on {date}.",
    bstatsDataNote: "Everything except downloads data is pulled from bStats.",
    chartsTitle: "Charts",
    chartsMeta: "Data updates every 30 minutes, on the hour and half hour.",
    loadingLiveData: "Loading live bStats data...",
    loadFailed: "Failed to load bStats data.",
    retry: "Retry",
    since: "Since {date}",
    series: {
      servers: "Servers",
      players: "Players",
      downloads: "Downloads",
    },
    panels: {
      serversUsingCanvas: "Servers using Canvas",
      playersUsingCanvas: "Players using Canvas",
      downloadsByDate: "Downloads by Date",
      bstatsMinecraftVersionServerShare:
        "bStats Minecraft Version (Server Share)",
      downloadsByMinecraftVersion: "Downloads by Minecraft Version",
    },
  },
  community: {
    heading: "Join our community",
    subheading:
      "Connect with the Canvas community, contribute to development, and stay up to date.",
    discord: {
      title: "Discord",
      description:
        "Join our Discord community to get support, share your experiences, and connect with other Canvas users.",
      action: "Join Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Contribute to Canvas development, report issues, and explore our open source codebase on GitHub.",
      action: "View GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Access our latest builds, development versions, and track our continuous integration progress.",
      action: "Visit Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Project & Development",
      getInvolved: "Get Involved",
      aboutCanvas: "About Canvas",
    },
    links: {
      githubRepo: "GitHub Repository",
      jenkins: "Jenkins CI",
      downloads: "Downloads",
      apiDocs: "API Documentation",
      githubIssues: "GitHub Issues",
      donate: "Donate",
      license: "License",
    },
    disclaimer:
      "This website is not an official Minecraft website and is not associated with Mojang Studios or Microsoft. All product and company names are trademarks or registered trademarks of their respective holders. Use of these names does not imply any affiliation or endorsement by them.",
    builtWith: "Built with",
    by: "by the",
    team: "Team",
  },
  notFound: {
    title: "404",
    heading: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",
    reportDiscord: "Report on Discord",
  },
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    close: "Close",
    open: "Open",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    more: "More",
    less: "Less",
    failed: "Failed",
    cancelled: "Cancelled",
    by: "by",
  },
  status: {
    success: "Success",
    failure: "Failure",
    aborted: "Aborted",
    unstable: "Unstable",
  },
  time: {
    justNow: "just now",
    minuteAgo: "minute ago",
    minutesAgo: "minutes ago",
    hourAgo: "hour ago",
    hoursAgo: "hours ago",
    dayAgo: "day ago",
    daysAgo: "days ago",
    monthAgo: "month ago",
    monthsAgo: "months ago",
    yearAgo: "year ago",
    yearsAgo: "years ago",
  },
} as const;
