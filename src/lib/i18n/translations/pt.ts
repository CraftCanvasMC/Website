export default {
  nav: {
    home: "Início",
    downloads: "Downloads",
    documentation: "Documentação",
    maven: "Maven",
    github: "GitHub",
    discord: "Discord",
    donate: "Doar",
    menu: "menu",
  },
  hero: {
    title: "Software de servidor Minecraft de alto desempenho",
    subtitle:
      "CanvasMC é um fork do software de servidor Minecraft Folia que corrige inconsistências de jogabilidade, bugs e introduz melhorias adicionais de desempenho ao servidor dedicado",
    downloadCanvas: "Baixar Canvas",
  },
  features: {
    heading: "O que torna o Canvas especial?",
    subheading:
      "Descubra o que torna o Canvas diferente de outros softwares de servidor Minecraft.",
    scheduler: {
      title: "Agendador Reescrito",
      description:
        "Canvas é baseado principalmente em um agendador reescrito para Folia, o que torna o Canvas um dos forks Folia mais rápidos por aí.",
    },
    chunkGeneration: {
      title: "Geração de Chunks Otimizada",
      description:
        "Com escala linear corrigida ao reescrever o executor do sistema de chunks, o desempenho de chunks é incomparável em comparação com outros forks.",
    },
    configuration: {
      title: "Configuração Extensiva",
      description:
        "Ajuste todos os aspectos do seu servidor com opções de configuração documentadas e configurações de desempenho.",
    },
    community: {
      title: "Suas Ideias, Nosso Código",
      description:
        "Canvas cresce com sua comunidade — compartilhe os recursos que você adoraria ver, e trabalharemos para trazê-los à vida.",
    },
    profiling: {
      title: "Perfilamento de Região Adequado",
      description:
        "Canvas introduz um perfilador Spark genuíno compatível com threading de região, substituindo o motor de perfilamento Folia.",
    },
    powerful: {
      title: "Poderoso e Otimizado",
      description:
        "Corrigindo múltiplos bugs e crashes do Folia, Canvas é rápido e estável",
    },
  },
  downloads: {
    title: "Downloads",
    subtitle:
      "Obtenha as versões mais recentes do CanvasMC para seu servidor Minecraft.",
    downloadLatest: "Baixar Versão Mais Recente",
    sourceCode: "Código Fonte",
    version: "Minecraft",
    build: "Build",
    latest: "Mais Recente",
    experimental: "Experimental",
    download: "Baixar",
    unavailable: "Indisponível",
    noChanges: "Sem alterações",
    viewJavadocs: "Javadocs",
    showFailedBuilds: "Mostrar Builds Falhadas",
    hideFailedBuilds: "Ocultar Builds Falhadas",
    showSculptor: "Mostrar Sculptor",
    showBuilds: "Mostrar Builds",
    olderBuilds:
      "Procurando builds mais antigas? Confira nosso servidor Jenkins →",
    noBuilds: "Nenhuma build disponível para esta versão.",
    downloadsUnavailable: "Downloads Indisponíveis",
    jenkinsUnreachable:
      "Nosso servidor Jenkins está atualmente inacessível. Por favor, volte mais tarde.",
    jenkinsDown: {
      title: "Jenkins está Fora do Ar",
      message:
        "Mostrando builds em cache. Downloads podem estar indisponíveis.",
      noCache: "Não é possível buscar builds no momento.",
    },
    usingCache: {
      title: "Mostrando Builds em Cache",
      message:
        "Jenkins está atualmente construindo. Mostrando builds recentes do cache. Downloads ainda estão disponíveis.",
    },
    sculptor: {
      title: "Lançador Sculptor",
      description:
        "Sculptor é o lançador oficial de atualização automática para Canvas. Ele garante que você esteja sempre na versão mais recente sem precisar baixar builds manualmente. Isso também é específico para a versão do Minecraft, então só atualizará para a versão do Minecraft que você especificar.",
      downloadSculptor: "Baixar Sculptor",
      exampleUsage: "Exemplo de Uso",
      argumentsExplained: "Argumentos Explicados",
      args: {
        minecraftVersion: {
          name: "-Dsculptor.minecraftVersion",
          description:
            "Especifica a versão do Minecraft que o Sculptor deve baixar e gerenciar builds. Sem isso, Sculptor falhará ao iniciar.",
          required: "Obrigatório.",
        },
        includeExperimental: {
          name: "-Dsculptor.includeExperimental",
          description:
            "Aceita true ou false (padrão: false). Se definido como true, Sculptor também incluirá builds experimentais do Canvas em vez de apenas os estáveis.",
          required: "Opcional.",
        },
        serverFileName: {
          name: "-Dsculptor.serverFileName",
          description:
            "Define o nome do arquivo jar do servidor baixado. Padrão é server.jar se não especificado.",
          required: "Opcional.",
        },
      },
    },
  },
  community: {
    heading: "Junte-se à nossa comunidade",
    subheading:
      "Conecte-se com a comunidade Canvas, contribua para o desenvolvimento e fique atualizado.",
    discord: {
      title: "Discord",
      description:
        "Junte-se à nossa comunidade no Discord para obter suporte, compartilhar suas experiências e conectar-se com outros usuários do Canvas.",
      action: "Entrar no Discord",
    },
    github: {
      title: "GitHub",
      description:
        "Contribua para o desenvolvimento do Canvas, relate problemas e explore nossa base de código open source no GitHub.",
      action: "Ver GitHub",
    },
    jenkins: {
      title: "Jenkins",
      description:
        "Acesse nossas builds mais recentes, versões de desenvolvimento e acompanhe nosso progresso de integração contínua.",
      action: "Visitar Jenkins",
    },
  },
  footer: {
    sections: {
      projectDev: "Projeto e Desenvolvimento",
      getInvolved: "Participe",
      aboutCanvas: "Sobre Canvas",
    },
    links: {
      githubRepo: "Repositório GitHub",
      jenkins: "Jenkins CI",
      downloads: "Downloads",
      apiDocs: "Documentação da API",
      githubIssues: "GitHub Issues",
      donate: "Doar",
      license: "Licença",
    },
    disclaimer:
      "Este site não é um site oficial do Minecraft e não está associado ao Mojang Studios ou Microsoft. Todos os nomes de produtos e empresas são marcas comerciais ou marcas registradas de seus respectivos detentores. O uso desses nomes não implica qualquer afiliação ou endosso por eles.",
    builtWith: "Construído com",
    by: "pela",
    team: "Equipe",
  },
  notFound: {
    title: "404",
    heading: "Página Não Encontrada",
    description: "A página que você está procurando não existe ou foi movida.",
    backHome: "Voltar ao Início",
    reportDiscord: "Reportar no Discord",
  },
  common: {
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    close: "Fechar",
    open: "Abrir",
    save: "Salvar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    delete: "Excluir",
    edit: "Editar",
    create: "Criar",
    search: "Pesquisar",
    filter: "Filtrar",
    sort: "Ordenar",
    more: "Mais",
    less: "Menos",
  },
  status: {
    success: "Sucesso",
    failure: "Falha",
    aborted: "Abortado",
    unstable: "Instável",
  },
  time: {
    justNow: "agora mesmo",
    minuteAgo: "minuto atrás",
    minutesAgo: "minutos atrás",
    hourAgo: "hora atrás",
    hoursAgo: "horas atrás",
    dayAgo: "dia atrás",
    daysAgo: "dias atrás",
    monthAgo: "mês atrás",
    monthsAgo: "meses atrás",
    yearAgo: "ano atrás",
    yearsAgo: "anos atrás",
  },
} as const;
