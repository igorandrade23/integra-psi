export type ProposalCategory =
  | "acolhimento"
  | "integração"
  | "formação"
  | "transparência";

export type ProposalStatus = "texto provisório" | "em construção";

export type Proposal = {
  slug: string;
  title: string;
  category: ProposalCategory;
  summary: string;
  matchTitle: string;
  problem: string;
  action: string;
  impact: string;
  why: string;
  image: string;
  status: ProposalStatus;
  accent: "green" | "blue" | "yellow" | "coral";
};
