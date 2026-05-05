"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Heart,
  Loader2,
  RotateCcw,
  Send,
  Undo2,
  X,
} from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Proposal } from "@/modules/proposals/domain/proposal";
import { appRoutes } from "@/shared/constants/routes";

type ProposalVote = "like" | "dislike";

type StoredMatchState = {
  sessionId: string;
  votes: Record<string, ProposalVote>;
  history: string[];
  suggestion: string;
};

type SubmitState = "idle" | "sending" | "sent" | "missing-endpoint" | "error";
type ActionEffect = ProposalVote | null;

const storageKey = "integra-psi:proposal-match";

function createSessionId() {
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createInitialState(): StoredMatchState {
  return {
    sessionId: createSessionId(),
    votes: {},
    history: [],
    suggestion: "",
  };
}

type ProposalMatchGameProps = {
  proposals: Proposal[];
};

export function ProposalMatchGame({ proposals }: ProposalMatchGameProps) {
  const [state, setState] = useState<StoredMatchState>(() => createInitialState());
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [actionEffect, setActionEffect] = useState<ActionEffect>(null);
  const [exitDirection, setExitDirection] = useState<ProposalVote | null>(null);

  const dragX = useMotionValue(0);
  const dragRotation = useTransform(dragX, [-260, 0, 260], [-10, 0, 10]);
  const likeOpacity = useTransform(dragX, [36, 118], [0, 1]);
  const dislikeOpacity = useTransform(dragX, [-118, -36], [1, 0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = window.localStorage.getItem(storageKey);

      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredMatchState>;
        setState({
          sessionId: parsed.sessionId ?? createSessionId(),
          votes: parsed.votes ?? {},
          history: parsed.history ?? Object.keys(parsed.votes ?? {}),
          suggestion: parsed.suggestion ?? "",
        });
      }

      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [isLoaded, state]);

  const currentProposal = proposals.find((proposal) => !state.votes[proposal.slug]);
  const liked = useMemo(
    () => proposals.filter((proposal) => state.votes[proposal.slug] === "like"),
    [proposals, state.votes],
  );
  const disliked = useMemo(
    () => proposals.filter((proposal) => state.votes[proposal.slug] === "dislike"),
    [proposals, state.votes],
  );
  const answeredCount = liked.length + disliked.length;
  const isFinished = answeredCount === proposals.length;

  function registerVote(voteValue: ProposalVote) {
    if (!currentProposal) {
      return;
    }

    setSubmitState("idle");
    setState((current) => ({
      ...current,
      votes: {
        ...current.votes,
        [currentProposal.slug]: voteValue,
      },
      history: current.history.includes(currentProposal.slug)
        ? current.history
        : [...current.history, currentProposal.slug],
    }));
    setExitDirection(null);
    dragX.set(0);
  }

  function vote(voteValue: ProposalVote) {
    setExitDirection(voteValue);
    setActionEffect(voteValue);
    window.setTimeout(() => setActionEffect(null), 620);
    window.setTimeout(() => registerVote(voteValue), 240);
  }

  function undoLastVote() {
    const lastSlug = state.history.at(-1);

    if (!lastSlug) {
      return;
    }

    setSubmitState("idle");
    setState((current) => {
      const nextVotes = { ...current.votes };
      delete nextVotes[lastSlug];

      return {
        ...current,
        votes: nextVotes,
        history: current.history.slice(0, -1),
      };
    });
  }

  function resetGame() {
    const nextState = createInitialState();
    setState(nextState);
    setSubmitState("idle");
    window.localStorage.setItem(storageKey, JSON.stringify(nextState));
  }

  async function submitFeedback() {
    const endpoint = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT;

    if (!endpoint) {
      setSubmitState("missing-endpoint");
      return;
    }

    setSubmitState("sending");

    const payload = {
      sessionId: state.sessionId,
      createdAt: new Date().toISOString(),
      likes: liked.map((proposal) => proposal.title),
      dislikes: disliked.map((proposal) => proposal.title),
      suggestion: state.suggestion.trim(),
      votes: state.votes,
    };

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,#fbfaf4_0%,#e9f3d2_48%,#dce7ca_100%)] px-4 pb-[calc(env(safe-area-inset-bottom)+8rem)] pt-5 text-foreground md:px-8 md:pb-5">
      <div className="mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col">
        <header className="sticky top-0 z-30 rounded-[1.5rem] border border-border-soft bg-surface-strong/90 px-4 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Logo da chapa Integra Psi"
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full border border-border-soft object-cover"
              priority
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black uppercase tracking-[0.18em] text-brand-green-dark">
                Integra Psi
              </p>
              <p className="truncate text-xs text-neutral-muted">
                Match de propostas
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-border-soft px-3 py-2 text-xs font-bold text-brand-green-dark transition hover:bg-brand-green-light"
            >
              Início
            </Link>
          </div>

          <p className="mt-3 text-center text-xs text-neutral-muted">
            {answeredCount} de {proposals.length}
          </p>
        </header>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-green-light">
          <div
            className="h-full rounded-full bg-brand-green transition-all"
            style={{ width: `${(answeredCount / proposals.length) * 100}%` }}
          />
        </div>

        <main className="flex flex-1 flex-col justify-center py-4 pb-4">
          {!isFinished && currentProposal ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentProposal.slug}
                  drag="x"
                  dragConstraints={{ left: -260, right: 260 }}
                  dragElastic={0.12}
                  dragMomentum={false}
                  style={{ x: dragX, rotate: dragRotation }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 96) {
                      vote("like");
                      return;
                    }

                    if (info.offset.x < -96) {
                      vote("dislike");
                      return;
                    }

                    animate(dragX, 0, {
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    });
                  }}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    x: exitDirection === "like" ? 900 : exitDirection === "dislike" ? -900 : 0,
                    rotate: exitDirection === "like" ? 14 : exitDirection === "dislike" ? -14 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface pb-10 shadow-[0_28px_90px_rgba(31,37,34,0.24)] md:pb-5"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-green-light">
                    <Image
                      src={currentProposal.image}
                      alt={`Imagem placeholder da ${currentProposal.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 448px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <motion.div
                    style={{ opacity: dislikeOpacity }}
                    className="absolute left-5 top-16 rotate-[-10deg] rounded-xl border-2 border-accent-coral bg-black/28 px-5 py-2 text-lg font-black uppercase tracking-[0.2em] text-accent-coral backdrop-blur"
                  >
                    Não curti
                  </motion.div>
                  <motion.div
                    style={{ opacity: likeOpacity }}
                    className="absolute right-5 top-16 rotate-[10deg] rounded-xl border-2 border-brand-green-light bg-black/28 px-5 py-2 text-lg font-black uppercase tracking-[0.2em] text-brand-green-light backdrop-blur"
                  >
                    Curti
                  </motion.div>

                  <div className="p-4 pb-6 text-foreground md:p-5 md:pb-5">
                    <h1 className="text-balance text-4xl font-black leading-tight">
                      {currentProposal.matchTitle}
                    </h1>
                    <p className="mt-3 text-base font-medium leading-7 text-neutral-muted">
                      {currentProposal.summary}
                    </p>

                    <div className="mt-5 grid gap-3">
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.problem}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.action}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.impact}
                        </p>
                      </div>
                      <p className="sr-only">
                        {currentProposal.why}
                      </p>
                    </div>
                    <div className="h-8 md:h-0" aria-hidden="true" />
                  </div>
                </motion.article>
              </AnimatePresence>

              <AnimatePresence>
                {actionEffect ? (
                  <motion.div
                    key={actionEffect}
                    className="pointer-events-none fixed inset-0 z-50 grid place-items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0.45, rotate: actionEffect === "like" ? -10 : 10 }}
                      animate={{ scale: [0.45, 1.18, 0.9], rotate: 0, opacity: [0, 1, 0] }}
                      transition={{ duration: 0.62, ease: "easeOut" }}
                      className={`grid size-32 place-items-center rounded-full border backdrop-blur ${
                        actionEffect === "like"
                          ? "border-brand-green-light bg-brand-green/30 text-brand-green-light"
                          : "border-accent-coral bg-accent-coral/20 text-accent-coral"
                      }`}
                    >
                      {actionEffect === "like" ? <Heart size={58} /> : <X size={58} />}
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <section className="rounded-[2rem] border border-border-soft bg-surface-strong p-5 shadow-[0_24px_80px_rgba(31,37,34,0.12)]">
              <div className="grid size-14 place-items-center rounded-full bg-brand-green-light text-brand-green-dark">
                <Check size={28} />
              </div>
              <h1 className="mt-5 text-balance text-3xl font-black leading-tight">
                Seu mapa de propostas está pronto.
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-muted">
                Você pode enviar esse feedback para a chapa. A sugestão abaixo é opcional.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-lg bg-brand-green-light p-4">
                  <p className="text-sm font-black text-brand-green-dark">Você curtiu</p>
                  <p className="mt-2 text-sm leading-6 text-brand-green-dark/80">
                    {liked.length
                      ? liked.map((proposal) => proposal.title).join(", ")
                      : "Nenhuma proposta ainda."}
                  </p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm font-black text-foreground">Não curtiu tanto</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-muted">
                    {disliked.length
                      ? disliked.map((proposal) => proposal.title).join(", ")
                      : "Nenhuma proposta ainda."}
                  </p>
                </div>
              </div>

              <label className="mt-5 grid gap-2 text-sm font-black text-foreground">
                Sugira uma proposta para o Centro Acadêmico
                <span className="text-xs font-semibold text-neutral-muted">Opcional</span>
                <textarea
                  value={state.suggestion}
                  onChange={(event) => {
                    setSubmitState("idle");
                    setState((current) => ({
                      ...current,
                      suggestion: event.target.value,
                    }));
                  }}
                  className="min-h-32 rounded-lg border border-border-soft bg-background px-4 py-3 font-normal leading-6 outline-none transition focus:border-brand-green"
                  placeholder="Escreva uma ideia, demanda ou melhoria que você gostaria de ver no CA."
                />
              </label>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={submitFeedback}
                  disabled={submitState === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green-dark px-5 text-sm font-black text-white transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState === "sending" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  Enviar feedback
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border-soft bg-white px-5 text-sm font-black text-brand-green-dark"
                >
                  <RotateCcw size={18} />
                  Recomeçar
                </button>
              </div>

              {submitState === "sent" ? (
                <p className="mt-4 rounded-md bg-brand-green-light px-4 py-3 text-sm font-semibold text-brand-green-dark">
                  Feedback enviado. Obrigado por participar.
                </p>
              ) : null}
              {submitState === "missing-endpoint" ? (
                <p className="mt-4 rounded-md bg-accent-yellow/20 px-4 py-3 text-sm font-semibold text-foreground">
                  Não foi possível enviar agora. Tente novamente em outro dia.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="mt-4 rounded-md bg-accent-coral/15 px-4 py-3 text-sm font-semibold text-accent-coral">
                  Não foi possível enviar agora. Tente novamente em alguns instantes.
                </p>
              ) : null}
            </section>
          )}
        </main>

        {!isFinished ? (
          <footer className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-40 mx-auto grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
            <button
              type="button"
              onClick={() => vote("dislike")}
              className="grid h-14 place-items-center rounded-full border border-brand-green/20 bg-white text-brand-green-dark shadow-lg shadow-brand-green/10"
              aria-label="Não curti"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={undoLastVote}
              disabled={state.history.length === 0}
              className="grid size-12 place-items-center rounded-full border border-border-soft bg-surface-strong text-brand-green-dark shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Desfazer último voto"
            >
              <Undo2 size={20} />
            </button>
            <button
              type="button"
              onClick={() => vote("like")}
              className="grid h-14 place-items-center rounded-full bg-brand-green-dark text-white shadow-lg shadow-brand-green/20"
              aria-label="Curti"
            >
              <Heart size={28} />
            </button>
          </footer>
        ) : null}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border-soft bg-surface-strong/94 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-16px_40px_rgba(31,37,34,0.08)] backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {appRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = route.href === "/#propostas";

            return (
              <Link
                key={route.href}
                href={route.href}
                target={route.href.startsWith("http") ? "_blank" : undefined}
                rel={route.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[0.68rem] font-semibold transition ${
                  isActive
                    ? "bg-brand-green-light text-brand-green-dark"
                    : "text-neutral-muted hover:bg-brand-green-light/60 hover:text-brand-green-dark"
                }`}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
