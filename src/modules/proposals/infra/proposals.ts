import type { Proposal } from "@/modules/proposals/domain/proposal";

export const proposals: Proposal[] = [
  {
    slug: "proposta-01",
    title: "Proposta 1",
    matchTitle: "Proposta 1",
    category: "acolhimento",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae magna sed justo tincidunt.",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus vitae justo posuere feugiat.",
    action:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.",
    why:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.",
    image: "/images/proposals/proposta-01.svg",
    status: "texto provisório",
    accent: "green",
  },
  {
    slug: "proposta-02",
    title: "Proposta 2",
    matchTitle: "Proposta 2",
    category: "integração",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis.",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.",
    action:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.",
    why:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod.",
    image: "/images/proposals/proposta-02.svg",
    status: "texto provisório",
    accent: "blue",
  },
  {
    slug: "proposta-03",
    title: "Proposta 3",
    matchTitle: "Proposta 3",
    category: "formação",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis.",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor.",
    action:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo.",
    why:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam pellentesque ornare.",
    image: "/images/proposals/proposta-03.svg",
    status: "em construção",
    accent: "yellow",
  },
  {
    slug: "proposta-04",
    title: "Proposta 4",
    matchTitle: "Proposta 4",
    category: "transparência",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus.",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui.",
    action:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis.",
    why:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna.",
    image: "/images/proposals/proposta-04.svg",
    status: "em construção",
    accent: "coral",
  },
  {
    slug: "proposta-05",
    title: "Proposta 5",
    matchTitle: "Proposta 5",
    category: "acolhimento",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue.",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod.",
    action:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit.",
    why:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.",
    image: "/images/conexao-psi.svg",
    status: "texto provisório",
    accent: "green",
  },
];
