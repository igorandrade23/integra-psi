# PRD - Integra Psi

Status: rascunho em andamento  
Última atualização: 2026-05-01

## 1. Visão Geral

O produto será um website com experiência de app, mobile first, para apresentar a chapa eleitoral Integra Psi, candidata ao Centro Acadêmico Silvia Lane da Univali.

O site deve comunicar de forma clara, bonita e acessível quem compõe a chapa, quais são seus valores, quais propostas defende e como estudantes podem acompanhar ou participar da campanha.

Também deve funcionar como projeto público de portfólio no GitHub, com código legível, arquitetura modular e decisões técnicas bem documentadas.

## 2. Identidade Do Projeto

- Centro acadêmico: CA Silvia Lane
- Chapa: Integra Psi
- Instituição: Univali
- Curso/contexto: Psicologia
- Cor principal: verde
- Plataforma-alvo: web responsiva com prioridade mobile
- Hospedagem preferencial: Vercel

## 3. Conceito Criativo

A identidade visual deve remeter à Psicologia, integração, escuta, coletividade e construção de vínculos.

A imagem de referência enviada pela chapa, com mãos conectadas por fios coloridos, será usada como inspiração conceitual. O app pode representar propostas, pessoas e valores como pontos de uma rede viva, conectados por linhas que simbolizam diálogo, troca, acolhimento e participação estudantil.

Direção visual inicial:

- verde como cor institucional principal;
- apoio com cores de fios, como azul, amarelo e coral;
- textura leve de papel ou fundo orgânico;
- linhas, nós e conexões como elementos recorrentes;
- visual acolhedor, mas ainda limpo e profissional;
- interface mobile com sensação de aplicativo.

## 4. Objetivos

### 4.1 Objetivo Principal

Criar uma experiência digital que apresente a Integra Psi de forma clara, memorável e confiável, ajudando estudantes a entenderem a chapa, explorarem suas propostas e se engajarem com a campanha.

### 4.2 Objetivos Secundários

- tornar as propostas bem visíveis e fáceis de navegar;
- usar gamificação leve para incentivar a exploração;
- apresentar integrantes da chapa com humanidade e organização;
- reforçar a identidade do CA Silvia Lane e da Psicologia;
- criar um projeto tecnicamente bem estruturado para GitHub público;
- permitir evolução futura sem reescrever a base.

## 5. Público-Alvo

Estudantes de Psicologia da Univali, especialmente pessoas que querem saber rapidamente:

- quem faz parte da chapa;
- quais são as propostas;
- quais problemas a chapa quer enfrentar;
- como a chapa pretende atuar no Centro Acadêmico;
- como entrar em contato, sugerir ideias ou acompanhar a campanha.

## 6. Integrantes Da Chapa

| Nome | Cargo |
| --- | --- |
| Luísa | Presidente |
| Manuela | Vice-presidente |
| Gabriela | Tesouraria |
| Ananda | Diretora de Comunicação |
| Ana Luísa | Diretora de Pesquisa e Extensão |
| Igor | Primeiro Secretário |
| Maria Cláudia | Segunda Secretária |
| Bárbara | Primeira Diretora de Eventos |
| Eduarda | Segunda Diretora de Eventos |

Observação: fotos, frases curtas, período/fase e redes sociais ainda serão definidos.

## 7. Funcionalidades

### 7.1 Home

A home deve ser a primeira tela forte do produto, com cara de app e foco em mobile.

Elementos previstos:

- nome da chapa: Integra Psi;
- menção ao CA Silvia Lane;
- frase curta da campanha;
- chamada para explorar propostas;
- acesso rápido para integrantes, manifesto e participação;
- composição visual inspirada em fios, mãos, rede ou conexões.

Possíveis frases:

- Conectar para transformar.
- Psicologia com presença, escuta e integração.
- Uma rede feita por estudantes, para estudantes.

### 7.2 Propostas

As propostas devem ser uma das áreas mais importantes do site. Elas precisam ficar muito visíveis, organizadas e atrativas.

Ideias de apresentação:

- cards por categoria;
- mapa/rede de propostas;
- progresso de exploração;
- propostas desbloqueadas conforme o usuário visita;
- filtros por área de atuação;
- destaque para propostas prioritárias.

Status: aguardando envio das propostas.

### 7.3 Detalhe Da Proposta

Cada proposta deve ter uma página ou tela própria com linguagem objetiva.

Estrutura sugerida:

- título;
- categoria;
- problema identificado;
- proposta concreta;
- impacto esperado;
- nível de prioridade ou compromisso;
- botão de compartilhamento.

### 7.4 Gamificação

A gamificação deve ser leve e madura, sem exigir login.

Ideias:

- contador de propostas exploradas;
- nós da rede que acendem quando visitados;
- categorias como trilhas;
- badges discretos, como Escuta, Integração, Transparência e Participação;
- mensagem final quando todas as propostas forem exploradas.

O progresso pode ser salvo no navegador usando `localStorage`.

### 7.5 Conheça A Chapa

Página para apresentar os integrantes e seus cargos.

Campos previstos:

- nome;
- cargo;
- foto;
- frase curta;
- período/fase;
- redes sociais opcionais.

### 7.6 Manifesto

Página com texto político-institucional curto da Integra Psi.

Deve explicar:

- por que a chapa existe;
- qual visão possui para o CA Silvia Lane;
- quais princípios guiam a chapa;
- qual compromisso assume com estudantes.

### 7.7 Participação E Contato

Área para aproximar estudantes da chapa.

Possíveis recursos:

- link para Instagram;
- link para WhatsApp;
- formulário de sugestões;
- botão "Quero ajudar";
- botão "Tenho uma ideia para o CA".

Destino do formulário ainda a definir: Formspree, Google Forms, Supabase ou API própria futura.

### 7.8 FAQ

Perguntas frequentes para reduzir dúvidas.

Exemplos:

- Quando será a votação?
- Quem pode votar?
- Como conhecer melhor as propostas?
- Como enviar sugestões?
- O que o Centro Acadêmico faz?

## 8. Requisitos Técnicos

Stack preferencial:

- Next.js com App Router;
- TypeScript;
- Tailwind CSS;
- Vercel;
- Lucide React para ícones;
- Framer Motion para animações;
- Zod para validação de dados;
- React Hook Form se houver formulários;
- testes unitários para regras e casos de uso principais.

## 9. Arquitetura

O projeto deve ser modular e inspirado em DDD e Clean Architecture, mantendo pragmatismo para um produto front-end.

Domínios iniciais:

- `proposals`: propostas da chapa;
- `team`: integrantes;
- `campaign`: manifesto, datas e informações eleitorais;
- `engagement`: contato, sugestões e participação.

Estrutura sugerida:

```txt
src/
  app/
    page.tsx
    propostas/
      page.tsx
      [slug]/
        page.tsx
    chapa/
      page.tsx
    manifesto/
      page.tsx
    participar/
      page.tsx

  modules/
    proposals/
      domain/
      application/
      infra/
      presentation/
    team/
      domain/
      application/
      infra/
      presentation/
    campaign/
      domain/
      application/
      infra/
      presentation/
    engagement/
      domain/
      application/
      infra/
      presentation/

  shared/
    components/
    design-system/
    utils/
    constants/
```

## 10. Design System Inicial

Tokens sugeridos:

```ts
export const colors = {
  brand: {
    green: "#1F7A4D",
    greenDark: "#145C39",
    greenLight: "#DDF3E7",
  },
  accent: {
    blue: "#126C86",
    yellow: "#E3B23C",
    coral: "#D85C4A",
  },
  neutral: {
    paper: "#F7F3EA",
    ink: "#1F2522",
    muted: "#6B746F",
  },
};
```

Diretrizes:

- mobile first;
- navegação inferior estilo app;
- cards com raio discreto;
- botões claros e acessíveis;
- bom contraste;
- microinterações suaves;
- layout legível em telas pequenas;
- evitar visual monocromático baseado apenas em verde.

## 11. Tasks

### Fase 1 - Fundação

- [ ] Criar projeto Next.js com TypeScript e Tailwind CSS.
- [ ] Configurar ESLint e formatação.
- [ ] Configurar aliases de importação.
- [ ] Criar estrutura base de pastas.
- [ ] Configurar tema inicial de cores.
- [ ] Criar README inicial.

### Fase 2 - Arquitetura E Dados

- [ ] Criar módulo `team`.
- [ ] Modelar entidade `TeamMember`.
- [ ] Criar repositório estático dos integrantes.
- [ ] Criar módulo `proposals`.
- [ ] Modelar entidade `Proposal`.
- [ ] Criar repositório estático de propostas quando os dados forem enviados.
- [ ] Adicionar validação dos dados com Zod.

### Fase 3 - UI Base

- [ ] Criar `AppShell`.
- [ ] Criar navegação inferior mobile.
- [ ] Criar header compacto.
- [ ] Criar botões primário e secundário.
- [ ] Criar card base.
- [ ] Criar chips de categoria.
- [ ] Criar componentes de progresso.

### Fase 4 - Home

- [ ] Criar hero da Integra Psi.
- [ ] Adicionar CTA para propostas.
- [ ] Adicionar CTA para conhecer a chapa.
- [ ] Criar composição visual de rede/fios.
- [ ] Garantir responsividade mobile first.

### Fase 5 - Propostas

- [ ] Criar página de listagem.
- [ ] Criar filtros por categoria.
- [ ] Criar cards gamificados.
- [ ] Criar página individual de proposta.
- [ ] Salvar propostas exploradas em `localStorage`.
- [ ] Exibir contador de progresso.
- [ ] Criar estado visual para proposta já visitada.

### Fase 6 - Rede Interativa

- [ ] Criar componente `ProposalNetwork`.
- [ ] Representar propostas como nós.
- [ ] Conectar nós com linhas coloridas.
- [ ] Permitir toque/click em cada nó.
- [ ] Animar nós explorados.
- [ ] Criar fallback acessível em lista.

### Fase 7 - Chapa

- [ ] Criar página da chapa.
- [ ] Criar cards de integrantes.
- [ ] Exibir nome e cargo de cada integrante.
- [ ] Adicionar suporte futuro para fotos e redes sociais.
- [ ] Agrupar integrantes por função se fizer sentido.

### Fase 8 - Manifesto

- [ ] Criar página de manifesto.
- [ ] Estruturar texto em blocos curtos.
- [ ] Destacar princípios da chapa.
- [ ] Adicionar CTA para propostas.

### Fase 9 - Participação

- [ ] Criar página de participação.
- [ ] Adicionar links de contato.
- [ ] Criar formulário de sugestões.
- [ ] Validar formulário com Zod.
- [ ] Definir destino do formulário.
- [ ] Criar feedback visual de envio.

### Fase 10 - Qualidade E Deploy

- [ ] Revisar acessibilidade.
- [ ] Revisar contraste.
- [ ] Testar em mobile.
- [ ] Criar testes unitários para casos de uso.
- [ ] Rodar lint, typecheck e build.
- [ ] Configurar deploy na Vercel.
- [ ] Melhorar README com arquitetura e screenshots.

## 12. MVP

O MVP recomendado contém:

- home;
- página de propostas;
- detalhe de proposta;
- progresso gamificado simples;
- página da chapa;
- manifesto;
- participação/contato;
- deploy na Vercel.

## 13. Pendências

- [ ] Receber lista final de propostas.
- [ ] Definir categorias das propostas.
- [ ] Definir frase/slogan oficial da chapa.
- [ ] Definir datas da campanha e votação.
- [ ] Receber fotos dos integrantes.
- [ ] Definir canais oficiais de contato.
- [ ] Definir texto do manifesto.
- [ ] Definir se o formulário será externo ou API própria.
