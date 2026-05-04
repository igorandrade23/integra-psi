"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Proposal } from "@/modules/proposals/domain/proposal";

const storageKey = "integra-psi:explored-proposals";

type ProposalsExplorerProps = {
  proposals: Proposal[];
};

export function ProposalsExplorer({ proposals }: ProposalsExplorerProps) {
  const [explored, setExplored] = useState<string[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = window.localStorage.getItem(storageKey);
      setExplored(raw ? JSON.parse(raw) : []);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const exploredSet = useMemo(() => new Set(explored), [explored]);
  const progress = proposals.length ? Math.round((explored.length / proposals.length) * 100) : 0;

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-border-soft bg-surface-strong p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-brand-green-dark">Rede de leitura</p>
            <p className="text-sm text-neutral-muted">
              {explored.length} de {proposals.length} propostas abertas
            </p>
          </div>
          <div className="grid size-12 place-items-center rounded-full bg-brand-green-light text-sm font-black text-brand-green-dark">
            {progress}%
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-green-light">
          <div
            className="h-full rounded-full bg-brand-green transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {proposals.map((proposal) => {
          const isExplored = exploredSet.has(proposal.slug);

          return (
            <Link
              key={proposal.slug}
              href="/match"
              className="group rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-brand-green-light px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-green-dark">
                    {proposal.category}
                  </span>
                  <h2 className="text-xl font-black leading-tight text-foreground">
                    {proposal.title}
                  </h2>
                </div>
                {isExplored ? (
                  <CheckCircle2 className="shrink-0 text-brand-green" size={24} />
                ) : (
                  <Circle className="shrink-0 text-neutral-muted" size={24} />
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-neutral-muted">{proposal.summary}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark">
                <Sparkles size={16} />
                {isExplored ? "Proposta vista" : "Abrir no match"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
