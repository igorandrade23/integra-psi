"use client";

import Image from "next/image";
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
import { useEffect, useMemo, useRef, useState } from "react";
import type { Proposal } from "@/modules/proposals/domain/proposal";
import { appRoutes } from "@/shared/constants/routes";

type ProposalVote = "like" | "dislike";

type StoredMatchState = {
  sessionId: string;
  currentIndex: number;
  votes: Record<string, ProposalVote>;
  history: string[];
  suggestion: string;
};

type SubmitState = "idle" | "sending" | "sent" | "missing-endpoint" | "error";
type ActionEffect = ProposalVote | null;

const storageKey = "integra-psi:proposal-match";
const SWIPE_COMMIT_DELAY_MS = 260;
const SWIPE_EXIT_DISTANCE = 420;
const MIN_SWIPE_THRESHOLD = 92;

function createSessionId() {
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createInitialState(): StoredMatchState {
  return {
    sessionId: createSessionId(),
    currentIndex: 0,
    votes: {},
    history: [],
    suggestion: "",
  };
}

function getSwipeThreshold() {
  if (typeof window === "undefined") {
    return MIN_SWIPE_THRESHOLD;
  }

  const width = Math.min(window.innerWidth, 420);
  return Math.max(MIN_SWIPE_THRESHOLD, Math.min(Math.round(width * 0.22), 140));
}

type ProposalMatchGameProps = {
  proposals: Proposal[];
};

export function ProposalMatchGame({ proposals }: ProposalMatchGameProps) {
  const [state, setState] = useState<StoredMatchState>(() => createInitialState());
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [actionEffect, setActionEffect] = useState<ActionEffect>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitDirection, setExitDirection] = useState<ProposalVote | null>(null);

  const dragX = useMotionValue(0);
  const dragRotation = useTransform(dragX, [-260, 0, 260], [-9, 0, 9]);
  const likeOpacity = useTransform(dragX, [36, 118], [0, 1]);
  const dislikeOpacity = useTransform(dragX, [-118, -36], [1, 0]);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = window.localStorage.getItem(storageKey);

      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredMatchState>;
        const fallbackHistory = parsed.history ?? Object.keys(parsed.votes ?? {});
        const fallbackIndex = parsed.currentIndex ?? fallbackHistory.length;

        setState({
          sessionId: parsed.sessionId ?? createSessionId(),
          currentIndex: Math.min(Math.max(0, fallbackIndex), proposals.length),
          votes: parsed.votes ?? {},
          history: fallbackHistory,
          suggestion: parsed.suggestion ?? "",
        });
      }

      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [proposals.length]);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [isLoaded, state]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const currentProposal = proposals[state.currentIndex] ?? null;
  const liked = useMemo(
    () => proposals.filter((proposal) => state.votes[proposal.slug] === "like"),
    [proposals, state.votes],
  );
  const disliked = useMemo(
    () => proposals.filter((proposal) => state.votes[proposal.slug] === "dislike"),
    [proposals, state.votes],
  );
  const totalSteps = proposals.length + 1;
  const currentStep = Math.min(state.currentIndex + 1, totalSteps);
  const isFinished = !currentProposal;

  function clearTransitionTimer() {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }

  function commitVote(voteValue: ProposalVote) {
    if (!currentProposal) {
      return;
    }

    setSubmitState("idle");
    setIsTransitioning(false);
    setActionEffect(null);
    setExitDirection(voteValue);
    setState((current) => {
      const nextVotes = {
        ...current.votes,
        [currentProposal.slug]: voteValue,
      };

      const nextHistory = current.history.includes(currentProposal.slug)
        ? current.history
        : [...current.history, currentProposal.slug];

      return {
        ...current,
        currentIndex: Math.min(current.currentIndex + 1, proposals.length),
        votes: nextVotes,
        history: nextHistory,
      };
    });

    dragX.set(0);
  }

  function vote(voteValue: ProposalVote) {
    if (!currentProposal || isTransitioning) {
      return;
    }

    clearTransitionTimer();

    setSubmitState("idle");
    setIsTransitioning(true);
    setActionEffect(voteValue);
    setExitDirection(voteValue);

    const targetX = voteValue === "like" ? SWIPE_EXIT_DISTANCE : -SWIPE_EXIT_DISTANCE;

    animate(dragX, targetX, {
      type: "spring",
      stiffness: 320,
      damping: 30,
    });

    transitionTimerRef.current = window.setTimeout(() => {
      commitVote(voteValue);
      transitionTimerRef.current = null;
    }, SWIPE_COMMIT_DELAY_MS);
  }

  function undoLastVote() {
    if (isTransitioning) {
      return;
    }

    const lastSlug = state.history.at(-1);

    if (!lastSlug) {
      return;
    }

    clearTransitionTimer();
    setSubmitState("idle");
    setActionEffect(null);
    dragX.set(0);

    setState((current) => {
      const nextVotes = { ...current.votes };
      delete nextVotes[lastSlug];

      return {
        ...current,
        currentIndex: Math.max(current.currentIndex - 1, 0),
        votes: nextVotes,
        history: current.history.slice(0, -1),
      };
    });
  }

  function resetGame() {
    clearTransitionTimer();
    const nextState = createInitialState();
    setState(nextState);
    setSubmitState("idle");
    setActionEffect(null);
    setIsTransitioning(false);
    dragX.set(0);
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
    <div className="min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,#fbfaf4_0%,#e9f3d2_48%,#dce7ca_100%)] px-4 pb-[calc(env(safe-area-inset-bottom)+8rem)] pt-5 text-foreground md:px-8 md:pb-5">
      <div className="mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col">
        <header className="py-2">
          <p className="text-center text-sm font-semibold text-neutral-muted">
            {currentStep} de {totalSteps}
          </p>
        </header>

        <main className="relative flex flex-1 flex-col justify-center pb-8 pt-2 md:pb-40">
          {!isFinished && currentProposal ? (
            <div className="relative mx-auto w-full max-w-[28rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={currentProposal.slug}
                  drag="x"
                  dragElastic={0.1}
                  dragMomentum={false}
                  style={{ x: dragX, rotate: dragRotation, touchAction: "pan-y" }}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) < getSwipeThreshold()) {
                      animate(dragX, 0, {
                        type: "spring",
                        stiffness: 340,
                        damping: 26,
                      });
                      return;
                    }

                    vote(info.offset.x > 0 ? "like" : "dislike");
                  }}
                  initial={{
                    opacity: 0,
                    y: 18,
                    scale: 0.98,
                    x: exitDirection === "like" ? 48 : exitDirection === "dislike" ? -48 : 0,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: exitDirection === "like" ? 260 : exitDirection === "dislike" ? -260 : 0,
                    scale: 0.98,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative flex flex-col overflow-hidden rounded-[2rem] border border-border-soft bg-surface shadow-[0_28px_90px_rgba(31,37,34,0.24)] will-change-transform"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-brand-green-light">
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
                    className="pointer-events-none absolute left-4 top-4 rounded-xl border border-accent-coral bg-black/28 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-accent-coral backdrop-blur-md"
                  >
                    Não curti
                  </motion.div>
                  <motion.div
                    style={{ opacity: likeOpacity }}
                    className="pointer-events-none absolute right-4 top-4 rounded-xl border border-brand-green-light bg-black/28 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-brand-green-light backdrop-blur-md"
                  >
                    Curti
                  </motion.div>

                  <div className="p-5 pb-10 text-foreground md:p-6 md:pb-10">
                    <h1 className="text-balance text-4xl font-black leading-tight">
                      {currentProposal.matchTitle}
                    </h1>
                    <p className="mt-3 text-base font-medium leading-7 text-neutral-muted">
                      {currentProposal.summary}
                    </p>

                    <div className="mt-5 grid gap-3">
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green-dark">
                          Problema
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.problem}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green-dark">
                          Proposta
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.action}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border-soft bg-brand-green-light/35 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green-dark">
                          Impacto
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-muted">
                          {currentProposal.impact}
                        </p>
                      </div>
                      <p className="sr-only">{currentProposal.why}</p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

              <AnimatePresence>
                {isTransitioning ? (
                  <motion.div
                    key={`loading-${currentProposal.slug}`}
                    className="pointer-events-none absolute inset-x-0 top-1/2 z-20 grid -translate-y-1/2 place-items-center"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3 rounded-full border border-border-soft bg-surface-strong/95 px-4 py-3 text-sm font-bold text-brand-green-dark shadow-[0_16px_40px_rgba(31,37,34,0.14)] backdrop-blur-md">
                      <Loader2 className="animate-spin" size={18} />
                      Carregando próxima proposta
                    </div>
                  </motion.div>
                ) : null}

                {actionEffect ? (
                  <motion.div
                    key={`action-${currentProposal.slug}-${actionEffect}`}
                    className="pointer-events-none absolute inset-0 z-30 grid place-items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: actionEffect === "like" ? -8 : 8 }}
                      animate={{ scale: [0.5, 1.14, 0.92], rotate: 0, opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
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
          <footer className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+6.75rem)] z-40 mx-auto grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
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
              disabled={state.history.length === 0 || isTransitioning}
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
              <a
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
              </a>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
