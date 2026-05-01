import type { Metadata } from "next";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { ProposalMatchGame } from "@/modules/proposals/match/proposal-match-game";

export const metadata: Metadata = {
  title: "Match de Propostas",
  description:
    "Jogo de feedback da Integra Psi para curtir, rejeitar e sugerir propostas ao Centro Acadêmico.",
};

export default function MatchPage() {
  const proposals = getProposals();

  return <ProposalMatchGame proposals={proposals} />;
}
