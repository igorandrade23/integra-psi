import { AppShell } from "@/shared/components/app-shell";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { getTeamMembers } from "@/modules/team/application/get-team-members";
import { HomeHero } from "@/app/home-hero";
import { HomeStaticSections } from "@/app/home-static-sections";

export default function Home() {
  const proposals = getProposals();
  const members = getTeamMembers();

  return (
    <AppShell>
      <section id="inicio" className="scroll-mt-24 px-4 pt-0 md:px-8 md:pt-0">
        <HomeHero />
      </section>

      <HomeStaticSections proposals={proposals} members={members} />
    </AppShell>
  );
}
