export default {
  nav: {
    home: "首页",
    downloads: "下载",
    documentation: "文档",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "捐赠",
    menu: "菜单",
  },
  hero: {
    title: "高性能 Minecraft 服务器软件",
    subtitle:
      "CanvasMC 是 Folia Minecraft 服务器软件的分支，修复了游戏不一致性、错误，并为专用服务器引入了进一步的性能增强",
    downloadCanvas: "下载 Canvas",
  },
  features: {
    heading: "Canvas 有何特别之处？",
    subheading: "了解 Canvas 与其他 Minecraft 服务器软件的不同之处。",
    scheduler: {
      title: "重写的调度器",
      description:
        "Canvas 主要基于为 Folia 重写的调度器，这使得 Canvas 成为最快的 Folia 分支之一。",
    },
    chunkGeneration: {
      title: "优化的区块生成",
      description:
        "通过重写区块系统执行器实现固定线性扩展，区块性能与其他分支相比无与伦比。",
    },
    configuration: {
      title: "广泛的配置",
      description: "通过文档化的配置选项和性能设置，微调服务器的各个方面。",
    },
    community: {
      title: "您的想法，我们的代码",
      description:
        "Canvas 与其社区共同成长 — 分享您想看到的功能，我们将努力将其实现。",
    },
    profiling: {
      title: "正确的区域分析",
      description:
        "Canvas 引入了与区域线程兼容的真正 Spark 分析器，取代了 Folia 分析引擎。",
    },
    powerful: {
      title: "强大且优化",
      description: "修复了多个 Folia 错误和崩溃，Canvas 既快速又稳定",
    },
  },
  downloads: {
    title: "下载",
    subtitle: "获取 CanvasMC 的最新构建用于您的 Minecraft 服务器。",
    downloadLatest: "下载最新构建",
    sourceCode: "源代码",
    version: "Minecraft",
    build: "构建",
    latest: "最新",
    experimental: "实验性",
    download: "下载",
    unavailable: "不可用",
    noChanges: "无变更",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "显示失败的构建",
    hideFailedBuilds: "隐藏失败的构建",
    showSculptor: "显示 Sculptor",
    showBuilds: "显示构建",
    olderBuilds: "寻找旧版本？请查看我们的 Jenkins 服务器 →",
    noBuilds: "此版本没有可用的构建。",
    downloadsUnavailable: "下载不可用",
    jenkinsUnreachable: "我们的 Jenkins 服务器当前无法访问。请稍后再试。",
    jenkinsDown: {
      title: "Jenkins 已停机",
      message: "正在显示缓存的构建。下载可能不可用。",
      noCache: "目前无法获取构建。",
    },
    usingCache: {
      title: "显示缓存的构建",
      message: "Jenkins 正在构建中。显示缓存中的最新构建。下载仍然可用。",
    },
    sculptor: {
      title: "Sculptor 启动器",
      description:
        "Sculptor 是 Canvas 的官方自动更新启动器。它确保您始终使用最新版本，无需手动下载构建。这也是 Minecraft 版本特定的，因此只会更新到您指定的 Minecraft 版本。",
      downloadSculptor: "下载 Sculptor",
      exampleUsage: "使用示例",
      argumentsExplained: "参数说明",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "指定 Sculptor 应下载和管理构建的 Minecraft 版本。没有此参数，Sculptor 将无法启动。",
          required: "必需。",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "接受 true 或 false（默认值：false）。如果设置为 true，Sculptor 还将包括实验性 Canvas 构建，而不仅仅是稳定版本。",
          required: "可选。",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "设置下载的服务器 jar 文件的名称。如果未指定，默认为 server.jar。",
          required: "可选。",
        },
      },
    },
  },
  community: {
    heading: "加入我们的社区",
    subheading: "与 Canvas 社区联系，为开发做出贡献并保持更新。",
    discord: {
      title: "Discord",
      description:
        "加入我们的 Discord 社区以获得支持、分享您的经验并与其他 Canvas 用户联系。",
      action: "加入 Discord",
    },
    github: {
      title: "GitHub",
      description:
        "为 Canvas 开发做出贡献，报告问题并在 GitHub 上探索我们的开源代码库。",
      action: "查看 GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description: "访问我们的最新构建、开发版本并跟踪我们的持续集成进度。",
      action: "访问 Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "项目与开发",
      getInvolved: "参与其中",
      aboutCanvas: "关于 Canvas",
    },
    links: {
      githubRepo: "GitHub 仓库",
      jenkins: "Jenkins CI",
      downloads: "下载",
      apiDocs: "API 文档",
      githubIssues: "GitHub 问题",
      donate: "捐赠",
      license: "许可证",
    },
    disclaimer:
      "本网站不是官方的 Minecraft 网站，与 Mojang Studios 或 Microsoft 没有关联。所有产品和公司名称均为其各自所有者的商标或注册商标。使用这些名称并不意味着得到他们的任何关联或认可。",
    builtWith: "使用",
    by: "构建，由",
    team: "团队",
  },
  notFound: {
    title: "404",
    heading: "页面未找到",
    description: "您要查找的页面不存在或已被移动。",
    backHome: "返回首页",
    reportDiscord: "在 Discord 上报告",
  },
  common: {
    loading: "加载中...",
    error: "错误",
    success: "成功",
    close: "关闭",
    open: "打开",
    save: "保存",
    cancel: "取消",
    confirm: "确认",
    delete: "删除",
    edit: "编辑",
    create: "创建",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    more: "更多",
    less: "更少",
  },
  status: {
    success: "成功",
    failure: "失败",
    aborted: "已中止",
    unstable: "不稳定",
  },
  time: {
    justNow: "刚刚",
    minuteAgo: "1 分钟前",
    minutesAgo: "分钟前",
    hourAgo: "1 小时前",
    hoursAgo: "小时前",
    dayAgo: "1 天前",
    daysAgo: "天前",
    monthAgo: "1 个月前",
    monthsAgo: "个月前",
    yearAgo: "1 年前",
    yearsAgo: "年前",
  },
} as const;
