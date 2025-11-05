export default {
  nav: {
    home: "Ana Sayfa",
    downloads: "İndirilenler",
    documentation: "Dokümantasyon",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Bağış Yap",
    menu: "menü",
  },
  hero: {
    title: "Yüksek performanslı Minecraft sunucu yazılımı",
    subtitle:
      "CanvasMC, Folia Minecraft sunucu yazılımının bir çatallamasıdır; oynanış tutarsızlıklarını ve hataları düzeltir, ayrıca özel sunucular için performans iyileştirmeleri sunar.",
    downloadCanvas: "Canvas'ı İndir",
  },
  features: {
    heading: "Canvas'ı özel kılan nedir?",
    subheading:
      "Canvas’ı diğer Minecraft sunucu yazılımlarından ayıran özellikleri keşfedin.",
    scheduler: {
      title: "Yeniden Yazılmış Zamanlayıcı",
      description:
        "Canvas, esas olarak Folia için yeniden yazılmış bir zamanlayıcıya dayanır; bu da Canvas’ı en hızlı Folia çatallarından biri yapar.",
    },
    chunkGeneration: {
      title: "Optimize Edilmiş Parça (Chunk) Üretimi",
      description:
        "Parça sistemi yürütücüsünün yeniden yazılmasıyla sağlanan doğrusal ölçeklendirme, diğer çatallara kıyasla benzersiz bir parça performansı sunar.",
    },
    configuration: {
      title: "Genişletilmiş Yapılandırma",
      description:
        "Sunucunuzun her yönünü, belgelenmiş yapılandırma seçenekleri ve performans ayarlarıyla ince ayar yaparak kontrol edin.",
    },
    community: {
      title: "Fikirleriniz, Kodumuz",
      description:
        "Canvas topluluğuyla birlikte büyür — görmek istediğiniz özellikleri paylaşın, biz de onları hayata geçirelim.",
    },
    profiling: {
      title: "Doğru Bölge Profilleme",
      description:
        "Canvas, Folia profilleme motorunun yerini alan bölge iş parçacığıyla uyumlu gerçek bir Spark profilleyici sunar.",
    },
    powerful: {
      title: "Güçlü ve Optimize",
      description:
        "Birçok Folia hatası ve çökmesini düzelterek Canvas hem hızlı hem de kararlıdır.",
    },
  },
  downloads: {
    title: "İndirilenler",
    subtitle: "Minecraft sunucunuz için en son CanvasMC sürümlerini indirin.",
    downloadLatest: "En Son Sürümü İndir",
    sourceCode: "Kaynak Kodu",
    version: "Minecraft",
    build: "Yapı",
    latest: "En Son",
    experimental: "Deneysel",
    download: "İndir",
    unavailable: "Kullanılamıyor",
    noChanges: "Değişiklik yok",
    viewJavadocs: "Javadocs'u Görüntüle",
    showFailedBuilds: "Başarısız Yapıları Göster",
    hideFailedBuilds: "Başarısız Yapıları Gizle",
    showSculptor: "Sculptor'u Göster",
    showBuilds: "Yapıları Göster",
    olderBuilds:
      "Daha eski sürümleri mi arıyorsunuz? Jenkins sunucumuzu ziyaret edin →",
    noBuilds: "Bu sürüm için mevcut yapı yok.",
    downloadsUnavailable: "İndirilenler Kullanılamıyor",
    jenkinsUnreachable:
      "Jenkins sunucumuza şu anda erişilemiyor. Lütfen daha sonra tekrar deneyin.",
    jenkinsDown: {
      title: "Jenkins Kapalı",
      message:
        "Önbelleğe alınmış yapılar gösteriliyor. İndirmeler kullanılamayabilir.",
      noCache: "Şu anda yapılar getirilemiyor.",
    },
    usingCache: {
      title: "Önbelleğe Alınmış Yapılar Gösteriliyor",
      message:
        "Jenkins şu anda derleme yapıyor. En son yapılar önbellekten gösteriliyor. İndirmeler hâlâ kullanılabilir.",
    },
    sculptor: {
      title: "Sculptor Başlatıcısı",
      description:
        "Sculptor, Canvas için resmi otomatik güncelleyici başlatıcıdır. Manuel indirme yapmadan her zaman en güncel sürümde kalmanızı sağlar. Ayrıca Minecraft sürümüne özeldir, bu nedenle yalnızca belirttiğiniz sürüme günceller.",
      downloadSculptor: "Sculptor'u İndir",
      exampleUsage: "Kullanım Örneği",
      argumentsExplained: "Argümanların Açıklaması",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Sculptor’un hangi Minecraft sürümünü indirip yöneteceğini belirtir. Bu olmadan Sculptor başlatılamaz.",
          required: "Zorunlu.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "true veya false (varsayılan: false) kabul eder. true olarak ayarlanırsa Sculptor yalnızca kararlı sürümler yerine deneysel Canvas sürümlerini de içerir.",
          required: "İsteğe bağlı.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "İndirilen sunucu jar dosyasının adını ayarlar. Belirtilmezse varsayılan olarak server.jar kullanılır.",
          required: "İsteğe bağlı.",
        },
      },
    },
  },
  community: {
    heading: "Topluluğumuza Katılın",
    subheading:
      "Canvas topluluğuyla bağlantı kurun, geliştirmelere katkıda bulunun ve güncel kalın.",
    discord: {
      title: "Discord",
      description:
        "Destek almak, deneyimlerinizi paylaşmak ve diğer Canvas kullanıcılarıyla bağlantı kurmak için Discord topluluğumuza katılın.",
      action: "Discord’a Katıl",
    },
    github: {
      title: "GitHub",
      description:
        "Canvas geliştirmelerine katkıda bulunun, sorun bildirin ve açık kaynak kodumuzu keşfedin.",
      action: "GitHub’ı Görüntüle",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "En son yapılarımıza, geliştirme sürümlerimize erişin ve sürekli entegrasyon ilerlememizi takip edin.",
      action: "Jenkins’i Ziyaret Et",
    },
  },
  footer: {
    sections: {
      projectDev: "Proje ve Geliştirme",
      getInvolved: "Katılın",
      aboutCanvas: "Canvas Hakkında",
    },
    links: {
      githubRepo: "GitHub Deposu",
      jenkins: "Jenkins CI",
      downloads: "İndirilenler",
      apiDocs: "API Dokümantasyonu",
      githubIssues: "GitHub Sorunları",
      donate: "Bağış Yap",
      license: "Lisans",
    },
    disclaimer:
      "Bu web sitesi resmi bir Minecraft web sitesi değildir ve Mojang Studios veya Microsoft ile bağlantılı değildir. Tüm ürün ve şirket adları, ilgili sahiplerinin ticari markalarıdır. Bu adların kullanımı herhangi bir onay veya ilişki anlamına gelmez.",
    builtWith: "Şununla oluşturuldu:",
    by: "tarafından",
    team: "ekibi",
  },
  notFound: {
    title: "404",
    heading: "Sayfa Bulunamadı",
    description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    backHome: "Ana Sayfaya Dön",
    reportDiscord: "Discord'da Bildir",
  },
  common: {
    loading: "Yükleniyor...",
    error: "Hata",
    success: "Başarılı",
    close: "Kapat",
    open: "Aç",
    save: "Kaydet",
    cancel: "İptal",
    confirm: "Onayla",
    delete: "Sil",
    edit: "Düzenle",
    create: "Oluştur",
    search: "Ara",
    filter: "Filtrele",
    sort: "Sırala",
    more: "Daha Fazla",
    less: "Daha Az",
    failed: "Başarısız",
    cancelled: "İptal Edildi",
    by: "tarafından",
  },
  status: {
    success: "Başarılı",
    failure: "Başarısız",
    aborted: "İptal Edildi",
    unstable: "Kararsız",
  },
  time: {
    justNow: "şimdi",
    minuteAgo: "bir dakika önce",
    minutesAgo: "dakika önce",
    hourAgo: "bir saat önce",
    hoursAgo: "saat önce",
    dayAgo: "bir gün önce",
    daysAgo: "gün önce",
    monthAgo: "bir ay önce",
    monthsAgo: "ay önce",
    yearAgo: "bir yıl önce",
    yearsAgo: "yıl önce",
  },
} as const;
