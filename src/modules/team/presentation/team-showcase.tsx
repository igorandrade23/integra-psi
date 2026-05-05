"use client";

import { ImageOff, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { TeamMember } from "@/modules/team/domain/team-member";
import { TeamCarousel } from "@/modules/team/presentation/team-carousel";

type TeamShowcaseProps = {
  members: TeamMember[];
};

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasModalImageError, setHasModalImageError] = useState(false);

  const selectedMember = members[selectedIndex];

  const initials = useMemo(
    () =>
      selectedMember.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join(""),
    [selectedMember.name],
  );

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
    setHasModalImageError(false);
  };

  const closeModal = () => setIsOpen(false);

  const goToPrevious = () => {
    setSelectedIndex((current) => (current - 1 + members.length) % members.length);
  };

  const goToNext = () => {
    setSelectedIndex((current) => (current + 1) % members.length);
  };

  useEffect(() => {
    setHasModalImageError(false);
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
      if (event.key === "ArrowLeft") {
        goToPrevious();
      }
      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="rounded-[2.25rem] border border-white/50 bg-[linear-gradient(135deg,rgba(244,241,232,0.78),rgba(255,255,255,0.62),rgba(111,163,75,0.14))] p-4 backdrop-blur-2xl md:p-6">
        <TeamCarousel members={members} onReadMore={openModal} />
      </div>

      {isOpen && selectedMember ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-green-dark/35 px-3 py-3 backdrop-blur-2xl md:px-4 md:py-8"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="relative flex h-[calc(100dvh-1.5rem)] w-full max-w-[42rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-[linear-gradient(135deg,rgba(244,241,232,0.82),rgba(255,255,255,0.68),rgba(111,163,75,0.18))] backdrop-blur-2xl md:h-[calc(100dvh-4rem)] md:max-w-5xl md:rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/50 bg-surface-strong/70 text-brand-green-dark shadow-[0_10px_25px_rgba(31,37,34,0.12)] backdrop-blur-md transition hover:bg-brand-green-light/80"
              aria-label="Fechar modal"
            >
              <X size={18} />
            </button>

            <div className="flex h-full min-h-0 flex-col overflow-hidden md:grid md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div className="relative h-[42dvh] min-h-72 shrink-0 overflow-hidden bg-brand-green-light/25 md:h-full md:min-h-0">
                {hasModalImageError || !selectedMember.photo ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,_rgba(111,163,75,0.18),_rgba(244,241,232,0.94)_55%,_rgba(255,255,255,1)_100%)] px-6 text-center">
                    <div className="grid size-28 place-items-center rounded-full border border-border-soft bg-white/85 text-3xl font-black tracking-[0.14em] text-brand-green-dark shadow-sm">
                      {initials}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green-dark">
                        Foto em breve
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-muted shadow-sm">
                        <ImageOff size={14} />
                        {selectedMember.name}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={selectedMember.photo}
                    alt={`Foto de ${selectedMember.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 44rem"
                    priority
                    onError={() => setHasModalImageError(true)}
                  />
                )}
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute bottom-4 left-4 z-10 grid size-11 place-items-center rounded-full border border-white/50 bg-surface-strong/70 text-brand-green-dark shadow-[0_10px_25px_rgba(31,37,34,0.12)] backdrop-blur-md transition hover:bg-brand-green-light/80"
                  aria-label="Ver membro anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute bottom-4 right-4 z-10 grid size-11 place-items-center rounded-full border border-white/50 bg-surface-strong/70 text-brand-green-dark shadow-[0_10px_25px_rgba(31,37,34,0.12)] backdrop-blur-md transition hover:bg-brand-green-light/80"
                  aria-label="Ver próximo membro"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col space-y-4 overflow-y-auto p-5 pt-4 md:space-y-5 md:p-8">
                <div className="space-y-2 pr-20 md:pr-24">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green-dark">
                    Integrante da chapa
                  </p>
                  <h2 id="team-modal-title" className="text-3xl font-black text-foreground md:text-4xl">
                    {selectedMember.name}
                  </h2>
                  <p className="text-base font-semibold text-brand-green-dark">
                    {selectedMember.role}
                  </p>
                </div>

                <div className="space-y-4 text-base leading-7 text-neutral-muted md:text-lg md:leading-8">
                  <p className="whitespace-pre-line">{selectedMember.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
