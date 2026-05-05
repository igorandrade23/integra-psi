import Link from "next/link";
import Image from "next/image";
import { Heart, UsersRound } from "lucide-react";
import { AppShell } from "@/shared/components/app-shell";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { getTeamMembers } from "@/modules/team/application/get-team-members";
import { TeamShowcase } from "@/modules/team/presentation/team-showcase";

export default function Home() {
  const proposals = getProposals();
  const members = getTeamMembers();

  return (
    <AppShell>
      <section id="inicio" className="paper-texture scroll-mt-24 px-4 py-8 md:px-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-strong px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green-dark">
              <Image
                src="/logo.jpeg"
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-full object-cover"
                aria-hidden="true"
              />
              CA Silvia Lane
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-black leading-[1.02] text-foreground md:text-6xl">
                Integra Psi
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-8 text-neutral-muted">
                Uma chapa para conectar escuta, cuidado e participação no
                cotidiano da Psicologia.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#propostas"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green-dark px-5 text-sm font-bold text-white shadow-sm shadow-brand-green/25 transition hover:bg-brand-green"
              >
                Veja as nossas propostas
              </Link>
              <Link
                href="#chapa"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border-soft bg-surface-strong px-5 text-sm font-bold text-brand-green-dark transition hover:border-brand-green/40"
              >
                Conhecer a nossa chapa
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/logo.jpeg"
              alt="Logo oficial da chapa Integra Psi"
              width={1024}
              height={1024}
              sizes="(max-width: 768px) 100vw, 520px"
              className="aspect-square w-full rounded-[2rem] border border-border-soft bg-surface-strong object-contain p-4 shadow-[0_24px_70px_rgba(31,37,34,0.14)]"
              priority
            />
          </div>
        </div>
      </section>

      <section id="propostas" className="scroll-mt-24 px-4 py-7 md:px-8 md:py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
              Nossas propostas
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {proposals.map((proposal) => (
            <article
              key={proposal.slug}
              className="rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm"
            >
              <h3 className="mt-3 text-lg font-black">{proposal.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-muted">
                {proposal.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-7 md:px-8 md:py-10">
        <div className="rounded-lg border border-brand-green/20 bg-gradient-to-br from-brand-green-dark to-brand-green p-5 text-white md:p-7">
          <h2 className="text-2xl font-black">Conte para gente quais propostas você mais gostou</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
            Queremos ouvir você! <br /><br />
            Clique no botão abaixo para abrir o match de propostas e nos contar quais 
            são as propostas que mais chamaram a sua atenção. <br /><br />Sua opinião é muito importante para nós!
          </p>
          <Link
            href="/match"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-brand-green-dark"
          >
            Abrir match de propostas
            <Heart size={18} />
          </Link>
        </div>
      </section>

      <section id="chapa" className="scroll-mt-24 px-4 pb-10 md:px-8">
        <div className="space-y-5">
          <div className="rounded-[2rem] border border-border-soft bg-surface-strong p-5 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
              Chapa
            </p>
            <h2 className="mt-3 flex items-center gap-3 text-2xl font-black md:text-3xl">
              <UsersRound className="text-brand-green" size={28} />
              Integra Psi
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-muted md:text-base">
              Conheça as pessoas que compõem a chapa para o CA Silvia Lane.
            </p>
          </div>

          <TeamShowcase members={members} />
        </div>
      </section>
    </AppShell>
  );
}
