import type { Metadata } from "next";
import { Camera, HandHeart, MessageCircle } from "lucide-react";
import { AppShell } from "@/shared/components/app-shell";
import { SectionHeading } from "@/shared/components/section-heading";

export const metadata: Metadata = {
  title: "Participar",
};

export default function ParticipatePage() {
  return (
    <AppShell>
      <section className="px-4 py-8 md:px-8 md:py-12">
        <SectionHeading
          eyebrow="Participação"
          title="A campanha também é um canal de escuta."
          description="Esta página receberá os links oficiais da chapa e o formulário de sugestões assim que os canais forem definidos."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <Camera className="text-brand-green" size={26} />
            <h2 className="mt-4 text-xl font-black">Instagram</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-muted">
              Link oficial pendente. Será o principal canal para acompanhar a campanha.
            </p>
          </article>
          <article className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <MessageCircle className="text-accent-blue" size={26} />
            <h2 className="mt-4 text-xl font-black">Contato direto</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-muted">
              WhatsApp ou formulário serão definidos conforme a estratégia da chapa.
            </p>
          </article>
          <article className="rounded-lg border border-border-soft bg-surface-strong p-5">
            <HandHeart className="text-accent-coral" size={26} />
            <h2 className="mt-4 text-xl font-black">Sugestões</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-muted">
              O formulário deve receber ideias, dúvidas e demandas de estudantes.
            </p>
          </article>
        </div>

        <form className="mt-6 rounded-lg border border-border-soft bg-surface-strong p-5 md:p-8">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-foreground">
              Nome
              <input
                className="h-12 rounded-md border border-border-soft bg-background px-3 font-normal outline-none transition focus:border-brand-green"
                disabled
                placeholder="Campo será ativado na próxima etapa"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-foreground">
              Sugestão
              <textarea
                className="min-h-32 rounded-md border border-border-soft bg-background px-3 py-3 font-normal outline-none transition focus:border-brand-green"
                disabled
                placeholder="As integrações do formulário ainda serão definidas"
              />
            </label>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
