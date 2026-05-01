import type { Metadata } from "next";
import { AppShell } from "@/shared/components/app-shell";
import { SectionHeading } from "@/shared/components/section-heading";
import { getTeamMembers } from "@/modules/team/application/get-team-members";
import { TeamCard } from "@/modules/team/presentation/team-card";

export const metadata: Metadata = {
  title: "Chapa",
};

export default function TeamPage() {
  const members = getTeamMembers();

  return (
    <AppShell>
      <section className="px-4 py-8 md:px-8 md:py-12">
        <SectionHeading
          eyebrow="Conheça a chapa"
          title="Pessoas conectadas por um mesmo compromisso."
          description="A Integra Psi reúne estudantes em diferentes funções para organizar, comunicar e executar as ações da campanha."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
