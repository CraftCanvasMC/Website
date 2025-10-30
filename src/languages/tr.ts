export const tr = {
  // Navbar
  navbar: {
    downloads: 'İndirmeler',
    docs: 'Dokümantasyon',
    maven: 'Maven',
    github: 'GitHub',
    discord: 'Discord',
    donate: 'Bağış Yap',
  },
  
  // Hero Section
  hero: {
    title: 'Yüksek performanslı Minecraft sunucu yazılımı',
    description: 'CanvasMC, oyun tutarsızlıklarını düzelten, hataları gideren ve özel sunucuya daha fazla performans geliştirmesi getiren Folia Minecraft sunucu yazılımının bir çatalıdır',
    downloadButton: 'Canvas İndir',
    documentationButton: 'Dokümantasyon',
  },
  
  // Features Section
  features: {
    title: 'Canvas\'ı özel kılan nedir?',
    subtitle: 'Canvas\'ı diğer Minecraft sunucu yazılımlarından farklı kılan özellikleri keşfedin.',
    items: {
      scheduler: {
        title: 'Yeniden Yazılmış Zamanlayıcı',
        description: 'Canvas öncelikle Folia için yeniden yazılmış bir zamanlayıcıya dayanır, bu da Canvas\'ı mevcut en hızlı Folia çatallarından biri yapar.',
      },
      chunkGeneration: {
        title: 'Optimize Edilmiş Chunk Üretimi',
        description: 'Chunk sistem yürütücüsünü yeniden yazarak düzeltilen doğrusal ölçeklendirme ile chunk performansı diğer çatallara kıyasla eşsizdir.',
      },
      configuration: {
        title: 'Kapsamlı Yapılandırma',
        description: 'Belgelenmiş yapılandırma seçenekleri ve performans ayarları ile sunucunuzun her yönünü ince ayarlayın.',
      },
      community: {
        title: 'Fikirleriniz, Bizim Kodumuz',
        description: 'Canvas topluluğu ile büyür — görmek istediğiniz özellikleri paylaşın, biz de onları hayata geçirmek için çalışalım.',
      },
      profiling: {
        title: 'Uygun Bölge Profilleme',
        description: 'Canvas, Folia profilleme motorunu değiştirerek bölge iş parçacığı ile uyumlu gerçek bir Spark profil oluşturucu sunar.',
      },
      performance: {
        title: 'Güçlü ve Optimize',
        description: 'Birden fazla Folia hatasını ve çökmesini düzelterek, Canvas hem hızlı hem de kararlıdır',
      },
    },
  },
  
  // Community Section
  community: {
    title: 'Topluluğumuza katılın',
    subtitle: 'Canvas topluluğu ile bağlantı kurun, geliştirmeye katkıda bulunun ve güncel kalın.',
    items: {
      discord: {
        title: 'Discord',
        description: 'Destek almak, deneyimlerinizi paylaşmak ve diğer Canvas kullanıcıları ile bağlantı kurmak için Discord topluluğumuza katılın.',
        buttonText: 'Discord\'a Katıl',
      },
      github: {
        title: 'GitHub',
        description: 'Canvas geliştirmeye katkıda bulunun, sorunları bildirin ve GitHub\'daki açık kaynak kod tabanımızı keşfedin.',
        buttonText: 'GitHub\'ı Görüntüle',
      },
      jenkins: {
        title: 'Jenkins',
        description: 'En son yapılarımıza, geliştirme sürümlerine erişin ve sürekli entegrasyon ilerlememizi takip edin.',
        buttonText: 'Jenkins\'i Ziyaret Et',
      },
    },
  },
  
  // Language Selector
  language: {
    select: 'Dil',
    english: 'English',
    turkish: 'Türkçe',
  },

  // Downloads Page
  downloads: {
    header: {
      title: 'İndirmeler',
      subtitle: 'Minecraft sunucunuz için CanvasMC\'nin en son derlemelerini edinin.',
      sourceCode: 'Kaynak Kod',
      selectVersion: 'Sürüm seç',
      viewJavadocsTitle: 'Javadocs\'u görüntüle',
      toggle: {
        showBuilds: 'Yapıları Göster',
        showSculptor: 'Sculptor\'ı Göster',
      },
      javadocsTarget: 'Javadocs',
    },
    status: {
      failed: 'Başarısız',
      cancelled: 'İptal edildi',
      experimental: 'Deneysel',
    },
    build: {
      noChanges: 'Değişiklik yok',
      download: 'İndir',
      unavailable: 'Kullanılamıyor',
    },
    relative: {
      justNow: 'az önce',
      minute: 'dakika',
      minutes: 'dakika',
      hour: 'saat',
      hours: 'saat',
      day: 'gün',
      days: 'gün',
      month: 'ay',
      months: 'ay',
      year: 'yıl',
      years: 'yıl',
      suffixAgo: 'önce',
    },
    sculptor: {
      title: 'Sculptor Başlatıcı',
      description: 'Sculptor, Canvas için resmi otomatik güncellenen başlatıcıdır. Elle derleme indirmeye gerek kalmadan her zaman en son sürümde olmanızı sağlar. Ayrıca Minecraft sürümüne özeldir; belirttiğiniz Minecraft sürümüne göre günceller.',
      downloadButton: 'Sculptor\'ı İndir',
      exampleUsage: 'Örnek Kullanım',
      argumentsExplained: 'Argümanların Açıklaması',
      args: {
        minecraftVersion: {
          requiredLabel: 'Zorunlu.',
          description: 'Sculptor\'un indirmesi ve derlemeleri yönetmesi gereken Minecraft sürümünü belirtir. Bu olmadan Sculptor başlatılamaz.',
        },
        includeExperimental: {
          optionalLabel: 'İsteğe bağlı.',
          description: 'true veya false değerlerini alır (varsayılan: false). true olarak ayarlanırsa Sculptor yalnızca kararlı olanlar yerine deneysel Canvas derlemelerini de dahil eder.',
        },
        serverFileName: {
          optionalLabel: 'İsteğe bağlı.',
          description: 'İndirilen sunucu jar dosyasının adını ayarlar. Belirtilmezse varsayılan olarak server.jar kullanılır.',
        },
      },
    },
    list: {
      noBuilds: 'Bu sürüm için kullanılabilir derleme yok.',
    },
    commit: {
      noMessage: 'Commit mesajı yok',
      showDetails: 'Detayları göster',
      hideDetails: 'Detayları gizle',
    },
    jenkinsLink: 'Daha eski derlemeleri mi arıyorsunuz? Jenkins sunucumuzu inceleyin →',
    loading: 'Derlemeler yükleniyor...',
  },

  // Footer
  footer: {
    sections: {
      projectDevelopment: 'Proje ve Geliştirme',
      getInvolved: 'Katıl',
      aboutCanvas: 'Canvas Hakkında',
    },
    links: {
      githubRepo: 'GitHub Deposu',
      jenkins: 'Jenkins CI',
      downloads: 'İndirmeler',
      apiDocs: 'API Dokümantasyonu',
      githubIssues: 'GitHub Sorunları',
      donate: 'Bağış Yap',
      license: 'Lisans',
    },
    builtWithLovePrefix: 'ile yapıldı',
    builtWithLoveSuffix: 'tarafından',
    teamLabel: 'Takımı',
  },
} as const;