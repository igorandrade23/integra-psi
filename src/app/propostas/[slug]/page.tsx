import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import { AppShell } from "@/shared/components/app-shell";
import { getProposalBySlug } from "@/modules/proposals/application/get-proposal-by-slug";
import { getProposals } from "@/modules/proposals/application/get-proposals";
import { MarkProposalExplored } from "@/modules/proposals/presentation/mark-proposal-explored";

type ProposalDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProposals().map((proposal) => ({
    slug: proposal.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProposalDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);

  return {
    title: proposal?.title ?? "Proposta",
  };
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);

  if (!proposal) {
    notFound();
  }

  return (
    <AppShell>
      <MarkProposalExplored slug={proposal.slug} />
      <article className="px-4 py-6 md:px-8 md:py-10">
        <Link
          href="/propostas"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark"
        >
          <ArrowLeft size={18} />
          Voltar para propostas
        </Link>

        <header className="mt-6 rounded-lg border border-border-soft bg-surface-strong p-5 md:p-8">
          <span className="inline-flex rounded-full bg-brand-green-light px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-green-dark">
            {proposal.category}
          </span>
          <h1 className="mt-4 text-balance text-3xl font-black leading-tight md:text-5xl">
            {proposal.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-muted">
            {proposal.summary}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-border-soft px-3 py-2 text-sm font-semibold text-neutral-muted">
            Status: {proposal.status}
          </div>
        </header>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <section className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <h2 className="text-lg font-black">Problema</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-muted">{proposal.problem}</p>
          </section>
          <section className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <h2 className="text-lg font-black">O que propomos</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-muted">{proposal.action}</p>
          </section>
          <section className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <h2 className="text-lg font-black">Impacto esperado</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-muted">{proposal.impact}</p>
          </section>
        </div>

        <div className="mt-5 rounded-lg bg-brand-green-dark p-5 text-white">
          <div className="flex items-start gap-3">
            <Share2 className="mt-1 shrink-0 text-brand-green-light" size={20} />
            <div>
              <h2 className="font-black">Compartilhamento</h2>
              <p className="mt-1 text-sm leading-6 text-white/78">
                O botão de compartilhar será conectado quando os canais oficiais
                da campanha forem definidos.
              </p>
            </div>
          </div>
        </div>
      </article>
    </AppShell>
  );
}
