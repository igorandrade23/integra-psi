import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  CircleDotDashed,
  Heart,
  UsersRound,
} from "lucide-react";
import { AppShell } from "@/shared/components/app-shell";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { getTeamMembers } from "@/modules/team/application/get-team-members";

export default function Home() {
  const proposals = getProposals();
  const members = getTeamMembers();

  return (
    <AppShell>
      <section id="inicio" className="paper-texture scroll-mt-24 px-4 py-8 md:px-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-brand-green/20 bg-brand-green-light px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-green-dark">
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
                href="/match"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green-dark px-5 text-sm font-bold text-white shadow-sm shadow-brand-green/25 transition hover:bg-brand-green"
              >
                Jogar propostas
                <Heart size={18} />
              </Link>
              <Link
                href="#propostas"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green px-5 text-sm font-bold text-white shadow-sm shadow-brand-green/25 transition hover:bg-brand-green-dark"
              >
                Ver propostas
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#chapa"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border-soft bg-surface-strong px-5 text-sm font-bold text-brand-green-dark transition hover:border-brand-green/40"
              >
                Conhecer a chapa
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/conexao-psi.svg"
              alt="Mãos conectadas por fios coloridos, representando vínculo, escuta e integração."
              width={900}
              height={1100}
              className="aspect-[4/5] w-full rounded-lg border border-border-soft object-cover shadow-[0_24px_70px_rgba(31,37,34,0.14)]"
              priority
            />
          </div>
        </div>
      </section>

      <section id="propostas" className="scroll-mt-24 px-4 py-7 md:px-8 md:py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
              Propostas
            </p>
            <h2 className="mt-2 text-2xl font-black md:text-4xl">
              O que queremos construir
            </h2>
          </div>
          <Link
            href="/match"
            className="hidden text-sm font-bold text-brand-green-dark md:inline-flex"
          >
            Jogar propostas
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {proposals.map((proposal, index) => (
            <Link
              key={proposal.slug}
              href="/match"
              className="rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-brand-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CircleDotDashed className="text-brand-green" size={20} />
              </div>
              <h3 className="mt-5 text-xl font-black">{proposal.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-muted">
                {proposal.summary}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-brand-green/20 bg-gradient-to-br from-brand-green-dark to-brand-green p-5 text-white md:p-7">
          <h3 className="text-2xl font-black">Dê match nas propostas</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
            A leitura completa das propostas acontece em formato de jogo: veja
            uma proposta por vez, veja o resumo e diga o que faz sentido
            para você.
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
        <div className="rounded-lg border border-border-soft bg-surface-strong p-5 md:p-8">
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
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Acadêmicos da chapa
              </p>
              <h3 className="mt-2 text-2xl font-black text-foreground">
                {members.length} integrantes
              </h3>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {members.map((member, index) => (
              <article
                key={member.id}
                className="rounded-lg border border-border-soft bg-background p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-green-light text-sm font-black text-brand-green-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-lg font-black text-foreground">{member.name}</p>
                    <p className="mt-1 text-sm font-semibold text-brand-green">
                      {member.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="https://www.instagram.com/capsicobiguacu"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-green px-4 text-sm font-bold text-white transition hover:bg-brand-green-dark"
          >
            <Camera size={18} />
            @capsicobiguacu
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
