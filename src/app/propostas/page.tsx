import type { Metadata } from "next";
import { AppShell } from "@/shared/components/app-shell";
import { SectionHeading } from "@/shared/components/section-heading";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { ProposalsExplorer } from "@/modules/proposals/presentation/proposals-explorer";

export const metadata: Metadata = {
  title: "Propostas",
};

export default function ProposalsPage() {
  const proposals = getProposals();

  return (
    <AppShell>
      <section className="px-4 py-8 md:px-8 md:py-12">
        <SectionHeading
          eyebrow="Propostas"
          title="As ideias da chapa aparecem primeiro."
          description="Os textos abaixo são provisórios. Quando as propostas finais forem enviadas, cada card será substituído por uma proposta real, direta e fácil de compartilhar."
        />
        <div className="mt-8">
          <ProposalsExplorer proposals={proposals} />
        </div>
      </section>
    </AppShell>
  );
}
