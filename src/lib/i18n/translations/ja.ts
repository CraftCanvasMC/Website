export default {
  nav: {
    home: "ホーム",
    downloads: "ダウンロード",
    documentation: "ドキュメント",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "寄付",
    menu: "メニュー",
  },
  hero: {
    title: "高性能なMinecraftサーバーソフトウェア",
    subtitle:
      "CanvasMCは、Folia Minecraftサーバーソフトウェアのフォークで、ゲームプレイの不一致やバグを修正し、専用サーバーにさらなるパフォーマンス向上を導入します",
    downloadCanvas: "Canvasをダウンロード",
  },
  features: {
    heading: "Canvasの特別な点は？",
    subheading:
      "Canvasが他のMinecraftサーバーソフトウェアとどう違うのかご覧ください。",
    scheduler: {
      title: "書き直されたスケジューラー",
      description:
        "CanvasはFolia向けに書き直されたスケジューラーをベースにしており、Canvasを最速のFoliaフォークの一つにしています。",
    },
    chunkGeneration: {
      title: "最適化されたチャンク生成",
      description:
        "チャンクシステムエグゼキューターを書き直すことで線形スケーリングが修正され、チャンクパフォーマンスは他のフォークと比較して比類がありません。",
    },
    configuration: {
      title: "広範な設定",
      description:
        "文書化された設定オプションとパフォーマンス設定で、サーバーのあらゆる側面を微調整できます。",
    },
    community: {
      title: "あなたのアイデア、私たちのコード",
      description:
        "Canvasはコミュニティと共に成長します。見たい機能を共有してください。それを実現するために取り組みます。",
    },
    profiling: {
      title: "適切なリージョンプロファイリング",
      description:
        "Canvasは、Foliaプロファイリングエンジンに代わる、リージョンスレッディングと互換性のある本物のSparkプロファイラーを導入します。",
    },
    powerful: {
      title: "強力で最適化",
      description:
        "複数のFoliaのバグとクラッシュを修正し、Canvasは高速で安定しています",
    },
  },
  downloads: {
    title: "ダウンロード",
    subtitle: "MinecraftサーバーのCanvasMCの最新ビルドを入手してください。",
    downloadLatest: "最新ビルドをダウンロード",
    sourceCode: "ソースコード",
    version: "Minecraft",
    build: "ビルド",
    latest: "最新",
    experimental: "実験的",
    download: "ダウンロード",
    unavailable: "利用不可",
    noChanges: "変更なし",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "失敗したビルドを表示",
    hideFailedBuilds: "失敗したビルドを非表示",
    showSculptor: "Sculptorを表示",
    showBuilds: "ビルドを表示",
    olderBuilds: "古いビルドをお探しですか？Jenkinsサーバーをご覧ください →",
    noBuilds: "このバージョンで利用可能なビルドはありません。",
    downloadsUnavailable: "ダウンロード不可",
    jenkinsUnreachable:
      "Jenkinsサーバーに現在アクセスできません。後でもう一度お試しください。",
    jenkinsDown: {
      title: "Jenkinsがダウンしています",
      message:
        "キャッシュされたビルドを表示しています。ダウンロードは利用できない場合があります。",
      noCache: "現在ビルドを取得できません。",
    },
    usingCache: {
      title: "キャッシュされたビルドを表示中",
      message:
        "Jenkinsは現在ビルド中です。キャッシュから最近のビルドを表示しています。ダウンロードは引き続き利用可能です。",
    },
    sculptor: {
      title: "Sculptorランチャー",
      description:
        "SculptorはCanvasの公式自動更新ランチャーです。手動でビルドをダウンロードすることなく、常に最新バージョンを使用できます。これはMinecraftバージョン固有なので、指定したMinecraftバージョンにのみ更新されます。",
      downloadSculptor: "Sculptorをダウンロード",
      exampleUsage: "使用例",
      argumentsExplained: "引数の説明",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Sculptorがダウンロードおよび管理するMinecraftバージョンを指定します。これがないと、Sculptorは起動に失敗します。",
          required: "必須。",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "trueまたはfalseを受け入れます（デフォルト：false）。trueに設定すると、Sculptorは安定版のみでなく実験的なCanvasビルドも含めます。",
          required: "オプション。",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "ダウンロードされたサーバーjarファイルの名前を設定します。指定されていない場合はserver.jarがデフォルトです。",
          required: "オプション。",
        },
      },
    },
  },
  community: {
    heading: "コミュニティに参加",
    subheading:
      "Canvasコミュニティに接続し、開発に貢献し、最新情報を入手してください。",
    discord: {
      title: "Discord",
      description:
        "Discordコミュニティに参加して、サポートを受け、経験を共有し、他のCanvasユーザーと繋がりましょう。",
      action: "Discordに参加",
    },
    github: {
      title: "GitHub",
      description:
        "Canvas開発に貢献し、問題を報告し、GitHubでオープンソースコードベースを探索してください。",
      action: "GitHubを見る",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "最新のビルド、開発バージョンにアクセスし、継続的インテグレーションの進捗を追跡します。",
      action: "Jenkinsを訪問",
    },
  },
  footer: {
    sections: {
      projectDev: "プロジェクトと開発",
      getInvolved: "参加する",
      aboutCanvas: "Canvasについて",
    },
    links: {
      githubRepo: "GitHubリポジトリ",
      jenkins: "Jenkins CI",
      downloads: "ダウンロード",
      apiDocs: "APIドキュメント",
      githubIssues: "GitHub Issues",
      donate: "寄付",
      license: "ライセンス",
    },
    disclaimer:
      "このウェブサイトは公式のMinecraftウェブサイトではなく、Mojang StudiosやMicrosoftとは関連していません。すべての製品名と会社名は、それぞれの所有者の商標または登録商標です。これらの名前の使用は、それらによる提携または承認を意味するものではありません。",
    builtWith: "ビルド：",
    by: "by",
    team: "チーム",
  },
  notFound: {
    title: "404",
    heading: "ページが見つかりません",
    description: "お探しのページは存在しないか、移動されました。",
    backHome: "ホームに戻る",
    reportDiscord: "Discordで報告",
  },
  common: {
    loading: "読み込み中...",
    error: "エラー",
    success: "成功",
    close: "閉じる",
    open: "開く",
    save: "保存",
    cancel: "キャンセル",
    confirm: "確認",
    delete: "削除",
    edit: "編集",
    create: "作成",
    search: "検索",
    filter: "フィルター",
    sort: "並び替え",
    more: "もっと",
    less: "少なく",
  },
  status: {
    success: "成功",
    failure: "失敗",
    aborted: "中止",
    unstable: "不安定",
  },
  time: {
    justNow: "たった今",
    minuteAgo: "分前",
    minutesAgo: "分前",
    hourAgo: "時間前",
    hoursAgo: "時間前",
    dayAgo: "日前",
    daysAgo: "日前",
    monthAgo: "ヶ月前",
    monthsAgo: "ヶ月前",
    yearAgo: "年前",
    yearsAgo: "年前",
  },
} as const;
