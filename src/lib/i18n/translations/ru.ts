export default {
  nav: {
    home: "Главная",
    downloads: "Загрузки",
    documentation: "Документация",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Поддержать",
    menu: "меню",
  },
  hero: {
    title: "Высокопроизводительное серверное ПО для Minecraft",
    subtitle:
      "CanvasMC — это форк серверного ПО Minecraft Folia, который исправляет несоответствия геймплея, ошибки и добавляет дополнительные улучшения производительности для выделенного сервера",
    downloadCanvas: "Скачать Canvas",
  },
  features: {
    heading: "Что делает Canvas особенным?",
    subheading:
      "Узнайте, чем Canvas отличается от другого серверного ПО для Minecraft.",
    scheduler: {
      title: "Переписанный планировщик",
      description:
        "Canvas в основном основан на переписанном планировщике для Folia, что делает Canvas одним из самых быстрых форков Folia.",
    },
    chunkGeneration: {
      title: "Оптимизированная генерация чанков",
      description:
        "С исправленным линейным масштабированием путем переписывания исполнителя системы чанков, производительность чанков не имеет себе равных по сравнению с другими форками.",
    },
    configuration: {
      title: "Расширенная конфигурация",
      description:
        "Тонко настраивайте каждый аспект вашего сервера с документированными опциями конфигурации и настройками производительности.",
    },
    community: {
      title: "Ваши идеи, наш код",
      description:
        "Canvas растет вместе со своим сообществом — поделитесь функциями, которые вы хотели бы видеть, и мы поработаем над их реализацией.",
    },
    profiling: {
      title: "Правильное профилирование регионов",
      description:
        "Canvas представляет настоящий профилировщик Spark, совместимый с региональной многопоточностью, заменяющий движок профилирования Folia.",
    },
    powerful: {
      title: "Мощный и оптимизированный",
      description:
        "Исправляя множественные ошибки и сбои Folia, Canvas является быстрым и стабильным",
    },
  },
  downloads: {
    title: "Загрузки",
    subtitle:
      "Получите последние сборки CanvasMC для вашего сервера Minecraft.",
    downloadLatest: "Скачать последнюю сборку",
    sourceCode: "Исходный код",
    version: "Minecraft",
    build: "Сборка",
    latest: "Последняя",
    experimental: "Экспериментальная",
    download: "Скачать",
    unavailable: "Недоступно",
    noChanges: "Нет изменений",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Показать неудачные сборки",
    hideFailedBuilds: "Скрыть неудачные сборки",
    showSculptor: "Показать Sculptor",
    showBuilds: "Показать сборки",
    olderBuilds: "Ищете старые сборки? Посетите наш сервер Jenkins →",
    noBuilds: "Нет доступных сборок для этой версии.",
    downloadsUnavailable: "Загрузки недоступны",
    jenkinsUnreachable:
      "Наш сервер Jenkins в данный момент недоступен. Пожалуйста, попробуйте позже.",
    jenkinsDown: {
      title: "Jenkins не работает",
      message:
        "Показываются кэшированные сборки. Загрузки могут быть недоступны.",
      noCache: "Невозможно получить сборки в данный момент.",
    },
    usingCache: {
      title: "Показываются кэшированные сборки",
      message:
        "Jenkins в данный момент выполняет сборку. Показываются недавние сборки из кэша. Загрузки всё ещё доступны.",
    },
    sculptor: {
      title: "Лаунчер Sculptor",
      description:
        "Sculptor — это официальный лаунчер с автоматическим обновлением для Canvas. Он гарантирует, что вы всегда используете последнюю версию без необходимости вручную загружать сборки. Это также специфично для версии Minecraft, так что он будет обновляться только до указанной вами версии Minecraft.",
      downloadSculptor: "Скачать Sculptor",
      exampleUsage: "Пример использования",
      argumentsExplained: "Объяснение аргументов",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Указывает версию Minecraft, для которой Sculptor должен загружать и управлять сборками. Без этого Sculptor не запустится.",
          required: "Обязательно.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Принимает true или false (по умолчанию: false). Если установлено в true, Sculptor также будет включать экспериментальные сборки Canvas вместо только стабильных.",
          required: "Необязательно.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Устанавливает имя загруженного файла jar сервера. По умолчанию server.jar, если не указано.",
          required: "Необязательно.",
        },
      },
    },
  },
  community: {
    heading: "Присоединяйтесь к нашему сообществу",
    subheading:
      "Свяжитесь с сообществом Canvas, внесите вклад в разработку и оставайтесь в курсе.",
    discord: {
      title: "Discord",
      description:
        "Присоединяйтесь к нашему сообществу в Discord, чтобы получить поддержку, поделиться своим опытом и связаться с другими пользователями Canvas.",
      action: "Присоединиться к Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Внесите вклад в разработку Canvas, сообщите о проблемах и изучите нашу открытую кодовую базу на GitHub.",
      action: "Посмотреть GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Получите доступ к нашим последним сборкам, версиям для разработки и отслеживайте наш прогресс непрерывной интеграции.",
      action: "Посетить Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Проект и разработка",
      getInvolved: "Принять участие",
      aboutCanvas: "О Canvas",
    },
    links: {
      githubRepo: "Репозиторий GitHub",
      jenkins: "Jenkins CI",
      downloads: "Загрузки",
      apiDocs: "Документация API",
      githubIssues: "GitHub Issues",
      donate: "Поддержать",
      license: "Лицензия",
    },
    disclaimer:
      "Этот сайт не является официальным сайтом Minecraft и не связан с Mojang Studios или Microsoft. Все названия продуктов и компаний являются товарными знаками или зарегистрированными товарными знаками соответствующих владельцев. Использование этих названий не подразумевает какой-либо связи или одобрения с их стороны.",
    builtWith: "Создано с помощью",
    by: "командой",
    team: "Команда",
  },
  notFound: {
    title: "404",
    heading: "Страница не найдена",
    description:
      "Страница, которую вы ищете, не существует или была перемещена.",
    backHome: "Вернуться на главную",
    reportDiscord: "Сообщить в Discord",
  },
  common: {
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    close: "Закрыть",
    open: "Открыть",
    save: "Сохранить",
    cancel: "Отмена",
    confirm: "Подтвердить",
    delete: "Удалить",
    edit: "Редактировать",
    create: "Создать",
    search: "Поиск",
    filter: "Фильтр",
    sort: "Сортировка",
    more: "Больше",
    less: "Меньше",
  },
  status: {
    success: "Успешно",
    failure: "Неудача",
    aborted: "Прервано",
    unstable: "Нестабильно",
  },
  time: {
    justNow: "только что",
    minuteAgo: "минуту назад",
    minutesAgo: "минут назад",
    hourAgo: "час назад",
    hoursAgo: "часов назад",
    dayAgo: "день назад",
    daysAgo: "дней назад",
    monthAgo: "месяц назад",
    monthsAgo: "месяцев назад",
    yearAgo: "год назад",
    yearsAgo: "лет назад",
  },
} as const;
