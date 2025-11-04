export default {
  nav: {
    home: "Inicio",
    downloads: "Descargas",
    documentation: "Documentación",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Donar",
    menu: "menú",
  },
  hero: {
    title: "Software de servidor de Minecraft de alto rendimiento",
    subtitle:
      "CanvasMC es un fork del software de servidor de Minecraft Folia que corrige inconsistencias de juego, errores e introduce mejoras de rendimiento adicionales al servidor dedicado",
    downloadCanvas: "Descargar Canvas",
  },
  features: {
    heading: "¿Qué hace especial a Canvas?",
    subheading:
      "Descubre qué hace diferente a Canvas de otros software de servidor de Minecraft.",
    scheduler: {
      title: "Planificador Reescrito",
      description:
        "Canvas se basa principalmente en un planificador reescrito para Folia, lo que hace que Canvas sea uno de los forks de Folia más rápidos que existen.",
    },
    chunkGeneration: {
      title: "Generación de Chunks Optimizada",
      description:
        "Con escalado lineal fijo al reescribir el ejecutor del sistema de chunks, el rendimiento de chunks no tiene comparación con otros forks.",
    },
    configuration: {
      title: "Configuración Extensa",
      description:
        "Ajusta cada aspecto de tu servidor con opciones de configuración documentadas y ajustes de rendimiento.",
    },
    community: {
      title: "Tus Ideas, Nuestro Código",
      description:
        "Canvas crece con su comunidad: comparte las características que te gustaría ver y trabajaremos para hacerlas realidad.",
    },
    profiling: {
      title: "Perfilado de Región Adecuado",
      description:
        "Canvas introduce un perfilador Spark genuino compatible con hilos de región, reemplazando el motor de perfilado de Folia.",
    },
    powerful: {
      title: "Potente y Optimizado",
      description:
        "Corrigiendo múltiples errores y caídas de Folia, Canvas es rápido y estable",
    },
  },
  downloads: {
    title: "Descargas",
    subtitle:
      "Obtén las últimas compilaciones de CanvasMC para tu servidor de Minecraft.",
    downloadLatest: "Descargar Última Compilación",
    sourceCode: "Código Fuente",
    version: "Minecraft",
    build: "Compilación",
    latest: "Última",
    experimental: "Experimental",
    download: "Descargar",
    unavailable: "No disponible",
    noChanges: "Sin cambios",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Mostrar Compilaciones Fallidas",
    hideFailedBuilds: "Ocultar Compilaciones Fallidas",
    showSculptor: "Mostrar Sculptor",
    showBuilds: "Mostrar Compilaciones",
    olderBuilds:
      "¿Buscas compilaciones más antiguas? Visita nuestro servidor Jenkins →",
    noBuilds: "No hay compilaciones disponibles para esta versión.",
    downloadsUnavailable: "Descargas No Disponibles",
    jenkinsUnreachable:
      "Nuestro servidor Jenkins no está accesible actualmente. Por favor, vuelve más tarde.",
    jenkinsDown: {
      title: "Jenkins está Caído",
      message:
        "Mostrando compilaciones en caché. Las descargas pueden no estar disponibles.",
      noCache: "No se pueden obtener compilaciones en este momento.",
    },
    usingCache: {
      title: "Mostrando Compilaciones en Caché",
      message:
        "Jenkins está compilando actualmente. Mostrando compilaciones recientes desde caché. Las descargas siguen disponibles.",
    },
    sculptor: {
      title: "Lanzador Sculptor",
      description:
        "Sculptor es el lanzador oficial de actualización automática para Canvas. Asegura que siempre estés en la última versión sin necesidad de descargar compilaciones manualmente. También es específico de la versión de Minecraft, por lo que solo actualizará a la versión de Minecraft que especifiques.",
      downloadSculptor: "Descargar Sculptor",
      exampleUsage: "Ejemplo de Uso",
      argumentsExplained: "Argumentos Explicados",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Especifica la versión de Minecraft que Sculptor debe descargar y gestionar. Sin esto, Sculptor no se iniciará.",
          required: "Requerido.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Acepta true o false (predeterminado: false). Si se establece en true, Sculptor también incluirá compilaciones experimentales de Canvas en lugar de solo las estables.",
          required: "Opcional.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Establece el nombre del archivo jar del servidor descargado. Predeterminado a server.jar si no se especifica.",
          required: "Opcional.",
        },
      },
    },
  },
  community: {
    heading: "Únete a nuestra comunidad",
    subheading:
      "Conéctate con la comunidad de Canvas, contribuye al desarrollo y mantente actualizado.",
    discord: {
      title: "Discord",
      description:
        "Únete a nuestra comunidad de Discord para obtener soporte, compartir tus experiencias y conectar con otros usuarios de Canvas.",
      action: "Unirse a Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Contribuye al desarrollo de Canvas, reporta problemas y explora nuestro código abierto en GitHub.",
      action: "Ver GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Accede a nuestras últimas compilaciones, versiones de desarrollo y rastrea nuestro progreso de integración continua.",
      action: "Visitar Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Proyecto y Desarrollo",
      getInvolved: "Participa",
      aboutCanvas: "Acerca de Canvas",
    },
    links: {
      githubRepo: "Repositorio de GitHub",
      jenkins: "Jenkins CI",
      downloads: "Descargas",
      apiDocs: "Documentación de API",
      githubIssues: "Problemas de GitHub",
      donate: "Donar",
      license: "Licencia",
    },
    disclaimer:
      "Este sitio web no es un sitio web oficial de Minecraft y no está asociado con Mojang Studios o Microsoft. Todos los nombres de productos y empresas son marcas comerciales o marcas registradas de sus respectivos propietarios. El uso de estos nombres no implica ninguna afiliación o respaldo por parte de ellos.",
    builtWith: "Construido con",
    by: "por el",
    team: "Equipo",
  },
  notFound: {
    title: "404",
    heading: "Página No Encontrada",
    description: "La página que buscas no existe o ha sido movida.",
    backHome: "Volver al Inicio",
    reportDiscord: "Reportar en Discord",
  },
  common: {
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    close: "Cerrar",
    open: "Abrir",
    save: "Guardar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    delete: "Eliminar",
    edit: "Editar",
    create: "Crear",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    more: "Más",
    less: "Menos",
  },
  status: {
    success: "Éxito",
    failure: "Fallo",
    aborted: "Abortado",
    unstable: "Inestable",
  },
  time: {
    justNow: "ahora mismo",
    minuteAgo: "hace un minuto",
    minutesAgo: "hace minutos",
    hourAgo: "hace una hora",
    hoursAgo: "hace horas",
    dayAgo: "hace un día",
    daysAgo: "hace días",
    monthAgo: "hace un mes",
    monthsAgo: "hace meses",
    yearAgo: "hace un año",
    yearsAgo: "hace años",
  },
} as const;
