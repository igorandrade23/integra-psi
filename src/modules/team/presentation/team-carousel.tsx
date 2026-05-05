"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { TeamMember } from "@/modules/team/domain/team-member";
import { TeamCard } from "@/modules/team/presentation/team-card";

type TeamCarouselProps = {
  members: TeamMember[];
  onReadMore?: (index: number) => void;
};

export function TeamCarousel({ members, onReadMore }: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const slide = track.querySelector<HTMLElement>("[data-team-slide]");
    const slideWidth = slide?.offsetWidth ?? 320;
    track.scrollBy({ left: direction * (slideWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="relative">
      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        className="pointer-events-auto absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border-soft/80 bg-surface-strong/70 text-brand-green-dark shadow-[0_10px_25px_rgba(31,37,34,0.12)] backdrop-blur-md transition hover:bg-brand-green-light/80 md:left-4"
        aria-label="Ver membro anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        className="pointer-events-auto absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border-soft/80 bg-surface-strong/70 text-brand-green-dark shadow-[0_10px_25px_rgba(31,37,34,0.12)] backdrop-blur-md transition hover:bg-brand-green-light/80 md:right-4"
        aria-label="Ver próximo membro"
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto px-12 pb-3 [scrollbar-width:none] snap-x snap-mandatory md:px-14"
      >
        {members.map((member, index) => (
          <div
            key={member.id}
            data-team-slide
            className="w-[min(88vw,22rem)] shrink-0 snap-start md:w-[20rem] lg:w-[22rem]"
          >
            <TeamCard
              member={member}
              onReadMore={onReadMore ? () => onReadMore(index) : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
