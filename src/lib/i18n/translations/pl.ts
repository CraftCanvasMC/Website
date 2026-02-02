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
    title: "Szybkie i wydajne oprogramowanie dla serwerów Minecraft",
    subtitle:
      "CanvasMC to fork Folii, oprogramowania serwerowego Minecraft, który naprawia niespójności w rozgrywce, błędy i wprowadza jeszcze więcej ulepszeń dla wydajności serwera",
    downloadCanvas: "Pobierz Canvas",
  },
  features: {
    heading: "Co czyni Canvas wyjątkowym?",
    subheading: "Dowiedz się, co odróżnia Canvas od reszty.",
    scheduler: {
      title: "Przerobiony scheduler",
      description:
        "Canvas jest oparty głównie na nowym schedulerze dla chunków, co czyni Canvas jednym z najszybszych forków Folii.",
    },
    chunkGeneration: {
      title: "Zoptymalizowane generowanie chunków",
      description:
        "Dzięki naprawionemu skalowaniu liniowemu, możliwym poprzez przerobienie executora systemu chunków, wydajność chunków jest niezrównanie lepsza w porównaniu z innymi forkami.",
    },
    configuration: {
      title: "Obszerna konfiguracja",
      description:
        "Modyfikuj każdy aspekt swojego serwera dzięki udokumentowanej konfiguracji i optymalizacjom",
    },
    community: {
      title: "Twoje pomysły, nasz kod",
      description:
        "Canvas rośnie razem ze swoją społecznością - podziel się funkcjami, które pragniesz zobaczyć, a my postaramy się je wcielić w życie.",
    },
    profiling: {
      title: "Prawdziwe profilowanie regionów",
      description:
        "Canvas posiada profiler Spark z prawdziwego zdarzenia, który jest kompatybilny z region threadingiem, tj. z regionami, zastępując wbudowany profiler Folii.",
    },
    powerful: {
      title: "Potężne i szybkie",
      description:
        "Naprawiając wiele błędów i crashów występujących w Folii, Canvas jest szybkie i stabilne",
    },
  },
  downloads: {
    title: "Pobieranie",
    subtitle:
      "Pobierz najnowsze buildy CanvasMC dla swojego serwera Minecraft.",
    selectTitle: "Wybierz oprogramowanie do pobrania",
    downloadLatest: "Pobierz najnowszy build",
    sourceCode: "Kod źródłowy",
    version: "Channel",
    build: "Build",
    latest: "Najnowszy",
    experimental: "Eksperymentalny",
    download: "Pobierz",
    unavailable: "Niedostępne",
    noChanges: "Bez zmian",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Pokaż nieudane buildy",
    hideFailedBuilds: "Ukryj nieudane buildy",
    showSculptor: "Pokaż launcher Sculptor",
    showBuilds: "Pokaż buildy",
    olderBuilds: "Szukasz starszych buildów? Odwiedź nasz serwer Jenkins →",
    noBuilds: "Brak buildów dla tej wersji.",
    downloadsUnavailable: "Pobieranie jest obecnie niedostępne",
    jenkinsUnreachable:
      "Nasz serwer Jenkins jest obecnie niedostępny. Spróbuj ponownie później.",
    jenkinsDown: {
      title: "Jenkins nie działa",
      message:
        "Pokazane są tylko buildy z pamięci. Pobieranie może być niedostępne.",
      noCache: "Nie można pobrać builda w tym momencie.",
    },
    usingCache: {
      title: "Pokazywanie buildów z pamięci",
      message:
        "Jenkins obecnie kompiluje nowy build. Pokazywane są tylko ostatnie buildy z pamięci. Wciąż można pobierać.",
    },
    sculptor: {
      title: "Launcher Sculptor",
      description:
        "Sculptor to oficjalny launcher, który automatycznie aktualizuje Canvas. Z nim możesz zawsze być na bieżąco z nowymi wersjami, bez konieczności pobierania ich samemu. Gwarantuje też, że nowe buildy będa pobierane tylko dla określonej przez Ciebie wersji Minecrafta",
      downloadSculptor: "Pobierz Sculptor",
      exampleUsage: "Przykładowe użycie",
      argumentsExplained: "Wyjaśnienie argumentów",
      args: {
        channelVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Określa wersję Minecraft, dla której Sculptor powinien pobierać nowe buildy i nimi zarządzać. Bez tego Sculptor nie uruchomi się.",
          required: "Wymagane.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Akceptuje tylko wartości true i false (domyślnie: false). Jeśli ustawiono true, Sculptor będzie również brać pod uwagę eksperymentalne buildy Canvas.",
          required: "Opcjonalne.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Ustawia nazwę pobranego pliku jar serwera. Domyślnie server.jar",
          required: "Opcjonalne.",
        },
      },
    },
    products: {
      canvas: {
        title: "Canvas",
        description:
          "Canvas to oprogramowanie serwerowe Minecraft skoncentrowane na wydajności i zaawansowanych funkcjach — odpowiednie do produkcyjnego uruchamiania serwerów.",
      },
      horizon: {
        title: "Horizon",
        description:
          "Horizon to wrapper Paper oparty na Mixin oraz platforma wtyczek, pozwalająca rozszerzać serwery Paper o dodatkowe funkcje podobne do moda.",
      },
    },
  },
  community: {
    heading: "Dołącz do naszej społeczności",
    subheading:
      "Zintegruj się ze społecznością Canvas, przyczyń się do rozwoju i bądź na bieżąco.",
    discord: {
      title: "Discord",
      description:
        "Dołącz do naszej społeczności na Discordzie, aby uzyskać wsparcie, podzielić się swoimi doświadczeniami i połączyć się z innymi użytkownikami Canvas.",
      action: "Dołącz na Discorda",
    },
    github: {
      title: "GitHub",
      description:
        "Dołóż się do rozwoju Canvas, zgłaszaj błędy i zwiedzaj nasz kod open source na GitHub'ie.",
      action: "Zobacz stronę GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Uzyskaj dostęp do naszych najnowszych buildów, wersji deweloperskich i śledź postęp naszego CI.",
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
      donate: "Wspomóż rozwój",
      license: "Licencja",
    },
    disclaimer:
      "Ta strona nie jest oficjalną stroną Minecraft i nie jest powiązana z Mojang Studios ani Microsoft. Wszystkie nazwy produktów i firm są znakami towarowymi lub zastrzeżonymi znakami towarowymi ich odpowiednich właścicieli. Użycie tych nazw nie oznacza żadnej afiliacji lub poparcia z ich strony.",
    builtWith: "Stworzone z",
    by: "przez zespół",
    team: "",
  },
  notFound: {
    title: "404",
    heading: "Nie udało się odnaleźć strony",
    description:
      "Strona, której szukasz, nie istnieje lub została przeniesiona.",
    backHome: "Powrót do strony głównej",
    reportDiscord: "Zgłoś na Discordzie",
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
    failed: "Nieudane",
    cancelled: "Anulowane",
    by: "przez",
  },
  status: {
    success: "Sukces",
    failure: "Niepowodzenie",
    aborted: "Anulowany",
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
