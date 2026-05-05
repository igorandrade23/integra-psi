import type { Proposal } from "@/modules/proposals/domain/proposal";

export const proposals: Proposal[] = [
  {
    slug: "micro-ondas-sala-convivencia",
    title: "Aquisição de um micro-ondas",
    matchTitle: "Micro-ondas na sala de convivência",
    category: "acolhimento",
    summary:
      "Disponibilizar um micro-ondas para aquecer lanches e refeições no cotidiano do curso.",
    problem:
      "Muitas vezes o intervalo entre aulas é curto e não existe um recurso simples para quem leva comida de casa.",
    action:
      "Solicitar a aquisição e instalação de um micro-ondas em um espaço de convivência acessível aos estudantes.",
    impact:
      "Mais conforto, autonomia e cuidado com a rotina de quem passa o dia na universidade.",
    why:
      "É uma solução pequena, mas muito concreta, que melhora a experiência diária de muita gente.",
    image: "/logo.jpeg",
    status: "texto provisório",
    accent: "green",
  },
  {
    slug: "eventos-online",
    title: "Palestras, workshops e dinâmicas online",
    matchTitle: "Eventos online de formação",
    category: "formação",
    summary:
      "Promover encontros online com temas relevantes, acessíveis e abertos aos estudantes.",
    problem:
      "Nem sempre os conteúdos extras acontecem em horários ou formatos que alcancem toda a turma.",
    action:
      "Organizar palestras online, workshops e dinâmicas com participação de pessoas convidadas e da comunidade acadêmica.",
    impact:
      "Mais acesso à formação complementar e à troca de experiências sem depender de presença física.",
    why:
      "Amplia o alcance das atividades e facilita a participação de quem tem rotina apertada.",
    image: "/logo.jpeg",
    status: "texto provisório",
    accent: "blue",
  },
  {
    slug: "eventos-semestrais",
    title: "Eventos maiores por semestre",
    matchTitle: "Eventos semestrais planejados",
    category: "integração",
    summary:
      "Planejar encontros maiores ao longo do semestre para fortalecer vínculos e ampliar vivências.",
    problem:
      "O curso também precisa de experiências coletivas que saiam da rotina da sala de aula.",
    action:
      "Reservar pelo menos um grande evento por semestre, com planejamento prévio e proposta formativa.",
    impact:
      "Mais integração entre turmas, experiências marcantes e memória afetiva para o curso.",
    why:
      "A organização semestral dá previsibilidade e permite preparar ações com mais qualidade.",
    image: "/logo.jpeg",
    status: "em construção",
    accent: "yellow",
  },
  {
    slug: "projetos-voluntarios",
    title: "Projetos voluntários e experiências práticas",
    matchTitle: "Voluntariado com prática",
    category: "formação",
    summary:
      "Criar oportunidades para experiências práticas e voluntárias com horas de extensão.",
    problem:
      "Muitos estudantes querem aplicar o que aprendem em ações reais, mas faltam caminhos estruturados.",
    action:
      "Articular projetos voluntários e experiências práticas que contem como horas de extensão.",
    impact:
      "Mais repertório, engajamento social e aprendizado conectado à realidade do território.",
    why:
      "Une formação, compromisso social e vivência prática em uma mesma proposta.",
    image: "/logo.jpeg",
    status: "em construção",
    accent: "coral",
  },
  {
    slug: "horas-complementares",
    title: "Valorização das horas complementares",
    matchTitle: "Horas complementares com mais valor",
    category: "transparência",
    summary:
      "Dar mais visibilidade às oportunidades que ajudam a compor as horas complementares.",
    problem:
      "Nem sempre as atividades disponíveis são divulgadas de forma clara e fácil de acompanhar.",
    action:
      "Organizar a comunicação de eventos e oportunidades que possam ser usadas para complementar a formação.",
    impact:
      "Mais segurança para planejar a trajetória acadêmica e menos perda de oportunidades úteis.",
    why:
      "Facilita a vida de quem precisa acompanhar prazos e cumprir exigências da graduação.",
    image: "/logo.jpeg",
    status: "texto provisório",
    accent: "green",
  },
  {
    slug: "sala-convivencia",
    title: "Sala de convivência",
    matchTitle: "Sala de convivência",
    category: "acolhimento",
    summary:
      "Criar um espaço para pausa, conversa e descanso entre as atividades do curso.",
    problem:
      "Falta um local pensado para convivência, descompressão e encontros informais.",
    action:
      "Propor um ambiente com uso coletivo, acolhedor e voltado ao bem-estar dos estudantes.",
    impact:
      "Mais pertencimento, cuidado e possibilidade de convivência entre colegas.",
    why:
      "Um espaço assim fortalece vínculo e ajuda a humanizar a rotina universitária.",
    image: "/logo.jpeg",
    status: "em construção",
    accent: "blue",
  },
  {
    slug: "grupo-leitura",
    title: "Grupo de leitura",
    matchTitle: "Grupo de leituras",
    category: "integração",
    summary:
      "Formar um grupo para leitura, debate e troca de ideias sobre temas da Psicologia.",
    problem:
      "Nem sempre há um espaço regular para leitura compartilhada e discussão fora da sala de aula.",
    action:
      "Criar encontros periódicos para leitura orientada e conversa entre estudantes.",
    impact:
      "Mais repertório teórico, vínculo entre colegas e continuidade de estudo coletiva.",
    why:
      "A leitura ganha mais sentido quando vira diálogo e construção conjunta.",
    image: "/logo.jpeg",
    status: "texto provisório",
    accent: "yellow",
  },
  {
    slug: "sugestoes-abertas",
    title: "Espaço aberto para sugestões",
    matchTitle: "Sugestões dos estudantes",
    category: "transparência",
    summary:
      "Manter uma escuta constante para que estudantes possam sugerir melhorias e ideias.",
    problem:
      "Sem um canal ativo de retorno, muitas demandas importantes podem se perder no caminho.",
    action:
      "Abrir espaços contínuos para sugestões, escuta e participação dos estudantes do curso.",
    impact:
      "Mais diálogo, mais proximidade com a base e decisões mais conectadas às necessidades reais.",
    why:
      "A chapa se fortalece quando a construção é coletiva e aberta à participação.",
    image: "/logo.jpeg",
    status: "texto provisório",
    accent: "coral",
  },
];
