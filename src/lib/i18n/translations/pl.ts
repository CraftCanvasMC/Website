export default {
  nav: {
    home: "Strona główna",
    downloads: "Pobieranie",
    documentation: "Dokumentacja",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Wspomóż",
    menu: "menu",
  },
  hero: {
    title: "Wysokowydajne oprogramowanie serwera Minecraft",
    subtitle:
      "CanvasMC to fork oprogramowania serwera Minecraft Folia, który naprawia niespójności rozgrywki, błędy i wprowadza dalsze ulepszenia wydajności dedykowanego serwera",
    downloadCanvas: "Pobierz Canvas",
  },
  features: {
    heading: "Co czyni Canvas wyjątkowym?",
    subheading:
      "Dowiedz się, czym Canvas różni się od innego oprogramowania serwerowego Minecraft.",
    scheduler: {
      title: "Przepisany harmonogram",
      description:
        "Canvas jest oparty głównie na przepisanym harmonogramie dla Folia, co czyni Canvas jednym z najszybszych forków Folia.",
    },
    chunkGeneration: {
      title: "Zoptymalizowane generowanie chunków",
      description:
        "Dzięki naprawionemu skalowaniu liniowemu poprzez przepisanie executora systemu chunków, wydajność chunków jest niezrównana w porównaniu z innymi forkami.",
    },
    configuration: {
      title: "Obszerna konfiguracja",
      description:
        "Dostrajaj każdy aspekt swojego serwera dzięki udokumentowanym opcjom konfiguracji i ustawieniom wydajności.",
    },
    community: {
      title: "Twoje pomysły, nasz kod",
      description:
        "Canvas rośnie razem ze swoją społecznością — podziel się funkcjami, które chciałbyś zobaczyć, a my postaramy się je wcielić w życie.",
    },
    profiling: {
      title: "Właściwe profilowanie regionów",
      description:
        "Canvas wprowadza prawdziwy profiler Spark kompatybilny z wątkowanem regionów, zastępując silnik profilowania Folia.",
    },
    powerful: {
      title: "Potężny i zoptymalizowany",
      description:
        "Naprawiając wiele błędów i awarii Folia, Canvas jest szybki i stabilny",
    },
  },
  downloads: {
    title: "Pobieranie",
    subtitle:
      "Pobierz najnowsze kompilacje CanvasMC dla swojego serwera Minecraft.",
    downloadLatest: "Pobierz najnowszą kompilację",
    sourceCode: "Kod źródłowy",
    version: "Minecraft",
    build: "Kompilacja",
    latest: "Najnowsza",
    experimental: "Eksperymentalna",
    download: "Pobierz",
    unavailable: "Niedostępne",
    noChanges: "Brak zmian",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Pokaż nieudane kompilacje",
    hideFailedBuilds: "Ukryj nieudane kompilacje",
    showSculptor: "Pokaż Sculptor",
    showBuilds: "Pokaż kompilacje",
    olderBuilds: "Szukasz starszych kompilacji? Sprawdź nasz serwer Jenkins →",
    noBuilds: "Brak dostępnych kompilacji dla tej wersji.",
    downloadsUnavailable: "Pobieranie niedostępne",
    jenkinsUnreachable:
      "Nasz serwer Jenkins jest obecnie niedostępny. Spróbuj ponownie później.",
    jenkinsDown: {
      title: "Jenkins nie działa",
      message:
        "Pokazywanie zbuforowanych kompilacji. Pobieranie może być niedostępne.",
      noCache: "Nie można pobrać kompilacji w tym momencie.",
    },
    usingCache: {
      title: "Pokazywanie zbuforowanych kompilacji",
      message:
        "Jenkins jest obecnie w trakcie kompilacji. Pokazywanie ostatnich kompilacji z pamięci podręcznej. Pobieranie jest nadal dostępne.",
    },
    sculptor: {
      title: "Launcher Sculptor",
      description:
        "Sculptor to oficjalny launcher z automatyczną aktualizacją dla Canvas. Zapewnia, że zawsze masz najnowszą wersję bez konieczności ręcznego pobierania kompilacji. Jest to również specyficzne dla wersji Minecraft, więc będzie aktualizować tylko do wersji Minecraft, którą określisz.",
      downloadSculptor: "Pobierz Sculptor",
      exampleUsage: "Przykładowe użycie",
      argumentsExplained: "Wyjaśnienie argumentów",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Określa wersję Minecraft, dla której Sculptor powinien pobierać i zarządzać kompilacjami. Bez tego Sculptor nie uruchomi się.",
          required: "Wymagane.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Akceptuje true lub false (domyślnie: false). Jeśli ustawione na true, Sculptor będzie również uwzględniać eksperymentalne kompilacje Canvas zamiast tylko stabilnych.",
          required: "Opcjonalne.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Ustawia nazwę pobranego pliku jar serwera. Domyślnie server.jar, jeśli nie określono.",
          required: "Opcjonalne.",
        },
      },
    },
  },
  community: {
    heading: "Dołącz do naszej społeczności",
    subheading:
      "Połącz się ze społecznością Canvas, przyczyń się do rozwoju i bądź na bieżąco.",
    discord: {
      title: "Discord",
      description:
        "Dołącz do naszej społeczności Discord, aby uzyskać wsparcie, podzielić się swoimi doświadczeniami i połączyć się z innymi użytkownikami Canvas.",
      action: "Dołącz do Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Przyczyń się do rozwoju Canvas, zgłaszaj problemy i eksploruj naszą bazę kodu open source na GitHub.",
      action: "Zobacz GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Uzyskaj dostęp do naszych najnowszych kompilacji, wersji deweloperskich i śledź postęp naszej ciągłej integracji.",
      action: "Odwiedź Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Projekt i rozwój",
      getInvolved: "Zaangażuj się",
      aboutCanvas: "O Canvas",
    },
    links: {
      githubRepo: "Repozytorium GitHub",
      jenkins: "Jenkins CI",
      downloads: "Pobieranie",
      apiDocs: "Dokumentacja API",
      githubIssues: "GitHub Issues",
      donate: "Wspomóż",
      license: "Licencja",
    },
    disclaimer:
      "Ta strona nie jest oficjalną stroną Minecraft i nie jest powiązana z Mojang Studios ani Microsoft. Wszystkie nazwy produktów i firm są znakami towarowymi lub zastrzeżonymi znakami towarowymi ich odpowiednich właścicieli. Użycie tych nazw nie oznacza żadnej afiliacji lub poparcia z ich strony.",
    builtWith: "Zbudowane z",
    by: "przez",
    team: "Zespół",
  },
  notFound: {
    title: "404",
    heading: "Strona nie znaleziona",
    description:
      "Strona, której szukasz, nie istnieje lub została przeniesiona.",
    backHome: "Powrót do strony głównej",
    reportDiscord: "Zgłoś na Discord",
  },
  common: {
    loading: "Ładowanie...",
    error: "Błąd",
    success: "Sukces",
    close: "Zamknij",
    open: "Otwórz",
    save: "Zapisz",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    delete: "Usuń",
    edit: "Edytuj",
    create: "Utwórz",
    search: "Szukaj",
    filter: "Filtruj",
    sort: "Sortuj",
    more: "Więcej",
    less: "Mniej",
  },
  status: {
    success: "Sukces",
    failure: "Niepowodzenie",
    aborted: "Przerwano",
    unstable: "Niestabilny",
  },
  time: {
    justNow: "przed chwilą",
    minuteAgo: "minutę temu",
    minutesAgo: "minut temu",
    hourAgo: "godzinę temu",
    hoursAgo: "godzin temu",
    dayAgo: "dzień temu",
    daysAgo: "dni temu",
    monthAgo: "miesiąc temu",
    monthsAgo: "miesięcy temu",
    yearAgo: "rok temu",
    yearsAgo: "lat temu",
  },
} as const;
