export const en = {
  // Navbar
  navbar: {
    downloads: 'Downloads',
    docs: 'Docs',
    maven: 'Maven',
    github: 'GitHub',
    discord: 'Discord',
    donate: 'Donate',
  },
  
  // Hero Section
  hero: {
    title: 'High performance Minecraft server software',
    description: 'CanvasMC is a fork of the Folia Minecraft server software that fixes gameplay inconsistencies, bugs, and introduces further performance enhancements to the dedicated server',
    downloadButton: 'Download Canvas',
    documentationButton: 'Documentation',
  },
  
  // Features Section
  features: {
    title: 'What makes Canvas special?',
    subtitle: 'Find out what makes Canvas different from other Minecraft server software.',
    items: {
      scheduler: {
        title: 'Rewritten Scheduler',
        description: 'Canvas is primarily based on a rewritten scheduler for Folia, which makes Canvas one of the fastest Folia forks out there.',
      },
      chunkGeneration: {
        title: 'Optimized Chunk Generation',
        description: 'With fixed linear scaling by rewriting the chunk system executor, chunk performance is unparalleled compared to other forks.',
      },
      configuration: {
        title: 'Extensive Configuration',
        description: 'Fine-tune every aspect of your server with documented configuration options and performance settings.',
      },
      community: {
        title: 'Your Ideas, Our Code',
        description: 'Canvas grows with its community — share the features you\'d love to see, and we\'ll work to bring them to life.',
      },
      profiling: {
        title: 'Proper Region Profiling',
        description: 'Canvas introduces a genuine Spark profiler compatible with region threading, replacing the Folia profiling engine.',
      },
      performance: {
        title: 'Powerful and Optimized',
        description: 'Fixing multiple Folia bugs and crashes, Canvas is both fast and stable',
      },
    },
  },
  
  // Community Section
  community: {
    title: 'Join our community',
    subtitle: 'Connect with the Canvas community, contribute to development, and stay up to date.',
    items: {
      discord: {
        title: 'Discord',
        description: 'Join our Discord community to get support, share your experiences, and connect with other Canvas users.',
        buttonText: 'Join Discord',
      },
      github: {
        title: 'GitHub',
        description: 'Contribute to Canvas development, report issues, and explore our open source codebase on GitHub.',
        buttonText: 'View GitHub',
      },
      jenkins: {
        title: 'Jenkins',
        description: 'Access our latest builds, development versions, and track our continuous integration progress.',
        buttonText: 'Visit Jenkins',
      },
    },
  },
  
  // Language Selector
  language: {
    select: 'Language',
    english: 'English',
    turkish: 'Türkçe',
  },

  // Downloads Page
  downloads: {
    header: {
      title: 'Downloads',
      subtitle: 'Get the latest builds of CanvasMC for your Minecraft server.',
      sourceCode: 'Source Code',
      selectVersion: 'Select version',
      viewJavadocsTitle: 'View Javadocs',
      toggle: {
        showBuilds: 'Show Builds',
        showSculptor: 'Show Sculptor',
      },
      javadocsTarget: 'Javadocs',
    },
    status: {
      failed: 'Failed',
      cancelled: 'Cancelled',
      experimental: 'Experimental',
    },
    build: {
      noChanges: 'No changes',
      download: 'Download',
      unavailable: 'Unavailable',
    },
    relative: {
      justNow: 'just now',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      month: 'month',
      months: 'months',
      year: 'year',
      years: 'years',
      suffixAgo: 'ago',
    },
    sculptor: {
      title: 'Sculptor Launcher',
      description: 'Sculptor is the official auto-updating launcher for Canvas. It ensures you\'re always on the latest version without needing to manually download builds. This is Minecraft-version specific too, so it will only update to the Minecraft version you specify.',
      downloadButton: 'Download Sculptor',
      exampleUsage: 'Example Usage',
      argumentsExplained: 'Arguments Explained',
      args: {
        minecraftVersion: {
          requiredLabel: 'Required.',
          description: 'Specifies the Minecraft version Sculptor should download and manage builds for. Without this, Sculptor will fail to launch.',
        },
        includeExperimental: {
          optionalLabel: 'Optional.',
          description: 'Accepts true or false (default: false). If set to true, Sculptor will also include experimental Canvas builds instead of only stable ones.',
        },
        serverFileName: {
          optionalLabel: 'Optional.',
          description: 'Sets the name of the downloaded server jar file. Defaults to server.jar if not specified.',
        },
      },
    },
    list: {
      noBuilds: 'No builds available for this version.',
    },
    commit: {
      noMessage: 'No commit message',
      showDetails: 'Show details',
      hideDetails: 'Hide details',
    },
    jenkinsLink: 'Looking for older builds? Check out our Jenkins server →',
    loading: 'Loading builds...',
  },

  // Footer
  footer: {
    sections: {
      projectDevelopment: 'Project & Development',
      getInvolved: 'Get Involved',
      aboutCanvas: 'About Canvas',
    },
    links: {
      githubRepo: 'GitHub Repository',
      jenkins: 'Jenkins CI',
      downloads: 'Downloads',
      apiDocs: 'API Documentation',
      githubIssues: 'GitHub Issues',
      donate: 'Donate',
      license: 'License',
    },
    builtWithLovePrefix: 'Built with',
    builtWithLoveSuffix: 'by the',
    teamLabel: 'Team',
  },
} as const;