export default {
  nav: {
    home: "Inicio",
    downloads: "Descargas",
    documentation: "Documentación",
    javadocs: "Javadocs",
  },
  hero: {
    title: "Canvas",
    subtitle: "Multihilo Potente para Minecraft",
    description:
      "Un software de servidor de Minecraft de alto rendimiento basado en Folia, que ofrece multihilo regionalizado sin problemas para mundos masivos.",
    getStarted: "Comenzar",
    viewOnGithub: "Ver en GitHub",
    joinDiscord: "Unirse a Discord",
  },
  features: {
    title: "¿Por qué elegir Canvas?",
    performance: {
      title: "Rendimiento Excepcional",
      description:
        "Experimenta un rendimiento de servidor sin igual con nuestro avanzado multihilo regionalizado.",
    },
    compatibility: {
      title: "Compatible con Plugins",
      description:
        "Funciona con la mayoría de los plugins compatibles con Folia de forma inmediata.",
    },
    community: {
      title: "Comunidad Activa",
      description:
        "Únete a nuestra próspera comunidad para obtener soporte, actualizaciones y contribuciones.",
    },
  },
  downloads: {
    title: "Descargas",
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
  },
  community: {
    title: "Únete a Nuestra Comunidad",
    description:
      "Conéctate con desarrolladores, obtén soporte y mantente actualizado",
    discord: {
      title: "Discord",
      description: "Chatea con la comunidad y obtén soporte en tiempo real",
      action: "Unirse a Discord",
    },
    github: {
      title: "GitHub",
      description: "Contribuye al proyecto e informa problemas",
      action: "Ver Repositorio",
    },
  },
  footer: {
    madeWith: "Hecho con",
    by: "por",
    license: "Licenciado bajo",
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
