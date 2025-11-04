export default {
  nav: {
    home: "Ana Sayfa",
    downloads: "İndirmeler",
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
      "CanvasMC, oynanış tutarsızlıklarını ve hataları düzelten ve özel sunucuya daha fazla performans iyileştirmesi getiren Folia Minecraft sunucu yazılımının bir çatalıdır",
    downloadCanvas: "Canvas'ı İndir",
  },
  features: {
    heading: "Canvas'ı özel yapan nedir?",
    subheading:
      "Canvas'ın diğer Minecraft sunucu yazılımlarından farkını keşfedin.",
    scheduler: {
      title: "Yeniden Yazılmış Zamanlayıcı",
      description:
        "Canvas, öncelikle Folia için yeniden yazılmış bir zamanlayıcıya dayanır ve bu da Canvas'ı en hızlı Folia çatallarından biri yapar.",
    },
    chunkGeneration: {
      title: "Optimize Edilmiş Chunk Üretimi",
      description:
        "Chunk sistem yürütücüsünü yeniden yazarak düzeltilen doğrusal ölçekleme ile chunk performansı diğer çatallara kıyasla benzersizdir.",
    },
    configuration: {
      title: "Kapsamlı Yapılandırma",
      description:
        "Belgelenmiş yapılandırma seçenekleri ve performans ayarları ile sunucunuzun her yönünü ince ayarlayın.",
    },
    community: {
      title: "Sizin Fikirleriniz, Bizim Kodumuz",
      description:
        "Canvas topluluğuyla birlikte büyür — görmek istediğiniz özellikleri paylaşın, biz de onları hayata geçirmek için çalışalım.",
    },
    profiling: {
      title: "Uygun Bölge Profilleme",
      description:
        "Canvas, Folia profilleme motorunun yerini alan, bölge iş parçacığıyla uyumlu gerçek bir Spark profilleyici sunar.",
    },
    powerful: {
      title: "Güçlü ve Optimize",
      description:
        "Birden fazla Folia hatasını ve çökmesini düzelten Canvas hem hızlı hem de kararlıdır",
    },
  },
  downloads: {
    title: "İndirmeler",
    subtitle: "Minecraft sunucunuz için CanvasMC'nin en son yapılarını edinin.",
    downloadLatest: "En Son Yapıyı İndir",
    sourceCode: "Kaynak Kodu",
    version: "Minecraft",
    build: "Yapı",
    latest: "En Son",
    experimental: "Deneysel",
    download: "İndir",
    unavailable: "Mevcut Değil",
    noChanges: "Değişiklik yok",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Başarısız Yapıları Göster",
    hideFailedBuilds: "Başarısız Yapıları Gizle",
    showSculptor: "Sculptor'u Göster",
    showBuilds: "Yapıları Göster",
    olderBuilds: "Eski yapıları mı arıyorsunuz? Jenkins sunucumuza göz atın →",
    noBuilds: "Bu sürüm için mevcut yapı yok.",
    downloadsUnavailable: "İndirmeler Mevcut Değil",
    jenkinsUnreachable:
      "Jenkins sunucumuz şu anda erişilemiyor. Lütfen daha sonra tekrar kontrol edin.",
    jenkinsDown: {
      title: "Jenkins Çalışmıyor",
      message:
        "Önbelleğe alınmış yapılar gösteriliyor. İndirmeler kullanılamayabilir.",
      noCache: "Şu anda yapılar alınamıyor.",
    },
    usingCache: {
      title: "Önbelleğe Alınmış Yapılar Gösteriliyor",
      message:
        "Jenkins şu anda derleme yapıyor. Önbellekten son yapılar gösteriliyor. İndirmeler hala mevcut.",
    },
    sculptor: {
      title: "Sculptor Başlatıcı",
      description:
        "Sculptor, Canvas için resmi otomatik güncelleme başlatıcısıdır. Yapıları manuel olarak indirmenize gerek kalmadan her zaman en son sürümde olmanızı sağlar. Bu aynı zamanda Minecraft sürümüne özeldir, bu nedenle yalnızca belirttiğiniz Minecraft sürümüne güncelleme yapar.",
      downloadSculptor: "Sculptor'u İndir",
      exampleUsage: "Örnek Kullanım",
      argumentsExplained: "Argümanlar Açıklaması",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Sculptor'un yapıları indirmesi ve yönetmesi gereken Minecraft sürümünü belirtir. Bu olmadan Sculptor başlatılamaz.",
          required: "Gerekli.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "true veya false kabul eder (varsayılan: false). true olarak ayarlanırsa, Sculptor yalnızca kararlı yapılar yerine deneysel Canvas yapılarını da içerecektir.",
          required: "İsteğe bağlı.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "İndirilen sunucu jar dosyasının adını ayarlar. Belirtilmezse varsayılan olarak server.jar'dır.",
          required: "İsteğe bağlı.",
        },
      },
    },
  },
  community: {
    heading: "Topluluğumuza katılın",
    subheading:
      "Canvas topluluğuyla bağlantı kurun, geliştirmeye katkıda bulunun ve güncel kalın.",
    discord: {
      title: "Discord",
      description:
        "Destek almak, deneyimlerinizi paylaşmak ve diğer Canvas kullanıcılarıyla bağlantı kurmak için Discord topluluğumuza katılın.",
      action: "Discord'a Katıl",
    },
    github: {
      title: "GitHub",
      description:
        "Canvas geliştirmesine katkıda bulunun, sorunları bildirin ve GitHub'da açık kaynak kod tabanımızı keşfedin.",
      action: "GitHub'ı Görüntüle",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "En son yapılarımıza, geliştirme sürümlerine erişin ve sürekli entegrasyon ilerlememizi takip edin.",
      action: "Jenkins'i Ziyaret Et",
    },
  },
  footer: {
    sections: {
      projectDev: "Proje ve Geliştirme",
      getInvolved: "Dahil Ol",
      aboutCanvas: "Canvas Hakkında",
    },
    links: {
      githubRepo: "GitHub Deposu",
      jenkins: "Jenkins CI",
      downloads: "İndirmeler",
      apiDocs: "API Dokümantasyonu",
      githubIssues: "GitHub Issues",
      donate: "Bağış Yap",
      license: "Lisans",
    },
    disclaimer:
      "Bu web sitesi resmi bir Minecraft web sitesi değildir ve Mojang Studios veya Microsoft ile ilişkili değildir. Tüm ürün ve şirket adları ilgili sahiplerinin ticari markaları veya tescilli ticari markalarıdır. Bu isimlerin kullanımı, onlar tarafından herhangi bir bağlantı veya onay anlamına gelmez.",
    builtWith: "Yapım:",
    by: "tarafından",
    team: "Ekibi",
  },
  notFound: {
    title: "404",
    heading: "Sayfa Bulunamadı",
    description: "Aradığınız sayfa mevcut değil veya taşınmış.",
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
  },
  status: {
    success: "Başarılı",
    failure: "Başarısız",
    aborted: "İptal Edildi",
    unstable: "Kararsız",
  },
  time: {
    justNow: "şimdi",
    minuteAgo: "dakika önce",
    minutesAgo: "dakika önce",
    hourAgo: "saat önce",
    hoursAgo: "saat önce",
    dayAgo: "gün önce",
    daysAgo: "gün önce",
    monthAgo: "ay önce",
    monthsAgo: "ay önce",
    yearAgo: "yıl önce",
    yearsAgo: "yıl önce",
  },
} as const;
