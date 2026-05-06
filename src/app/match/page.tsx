import type { Metadata } from "next";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { ProposalMatchGame } from "@/modules/proposals/match/proposal-match-game";
import { AppShell } from "@/shared/components/app-shell";

export const metadata: Metadata = {
  title: "Match de Propostas",
  description:
    "Jogo de feedback da Integra Psi para curtir, rejeitar e sugerir propostas ao Centro Acadêmico.",
};

export default function MatchPage() {
  const proposals = getProposals();

  return (
    <AppShell>
      <ProposalMatchGame proposals={proposals} />
    </AppShell>
  );
}
