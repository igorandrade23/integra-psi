import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/shared/components/app-shell";
import { SectionHeading } from "@/shared/components/section-heading";

export const metadata: Metadata = {
  title: "Manifesto",
};

const principles = ["Escuta", "Integração", "Transparência", "Participação"];

export default function ManifestoPage() {
  return (
    <AppShell>
      <section className="px-4 py-8 md:px-8 md:py-12">
        <SectionHeading
          eyebrow="Manifesto"
          title="Conectar para transformar o cotidiano estudantil."
          description="Este manifesto é um rascunho inicial para orientar o tom político e institucional da Integra Psi até a versão final da campanha."
        />

        <div className="mt-8 space-y-4 rounded-lg border border-border-soft bg-surface-strong p-5 text-base leading-8 text-neutral-muted md:p-8">
          <p>
            A Integra Psi nasce do desejo de aproximar estudantes, fortalecer
            vínculos e construir um Centro Acadêmico presente no dia a dia do
            curso de Psicologia.
          </p>
          <p>
            Queremos um CA que escute, comunique com clareza, valorize a
            participação coletiva e transforme propostas em ações possíveis.
          </p>
          <p>
            Nossa campanha parte da ideia de rede: cada pessoa, turma e demanda
            importa. Integrar é criar caminhos para que ninguém precise caminhar
            sozinho.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {principles.map((principle) => (
            <div
              key={principle}
              className="rounded-lg border border-border-soft bg-brand-green-light p-4 text-sm font-black text-brand-green-dark"
            >
              {principle}
            </div>
          ))}
        </div>

        <Link
          href="/propostas"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green px-5 text-sm font-bold text-white transition hover:bg-brand-green-dark"
        >
          Ver eixos de propostas
          <ArrowRight size={18} />
        </Link>
      </section>
    </AppShell>
  );
}
