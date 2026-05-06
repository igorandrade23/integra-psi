"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import type { TeamMember } from "@/modules/team/domain/team-member";
import { TeamCard } from "@/modules/team/presentation/team-card";

type TeamCarouselProps = {
  members: TeamMember[];
  onReadMore?: (index: number) => void;
};

export function TeamCarousel({ members, onReadMore }: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(members.length > 1 ? 1 : 0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);

  const slides = useMemo(() => {
    if (members.length <= 1) {
      return members;
    }

    return [members.at(-1)!, ...members, members[0]];
  }, [members]);

  const firstRealIndex = members.length > 1 ? 1 : 0;
  const lastRealIndex = members.length > 1 ? members.length : 0;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      setSlideWidth(track.clientWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrollByCards = (direction: -1 | 1) => {
    if (members.length <= 1) {
      return;
    }

    setIsTransitionEnabled(true);
    setActiveIndex((current) => current + direction);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];

    if (!start || !touch) {
      touchStartRef.current = null;
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const swipeThreshold = Math.max(48, Math.min(slideWidth * 0.14, 96));

    touchStartRef.current = null;

    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < swipeThreshold) {
      return;
    }

    if (deltaX < 0) {
      scrollByCards(1);
      return;
    }

    scrollByCards(-1);
  };

  const handleTransitionEnd = () => {
    if (members.length <= 1) {
      return;
    }

    if (activeIndex === 0) {
      setIsTransitionEnabled(false);
      setActiveIndex(lastRealIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
    }

    if (activeIndex === slides.length - 1) {
      setIsTransitionEnabled(false);
      setActiveIndex(firstRealIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
    }
  };

  return (
    <section className="relative isolate">
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
        className="overflow-hidden pb-3 md:pb-4"
        onTouchStart={handleTouchStart}
        onTouchMove={(event) => {
          const start = touchStartRef.current;
          const touch = event.touches[0];

          if (!start || !touch) {
            return;
          }

          const deltaX = Math.abs(touch.clientX - start.x);
          const deltaY = Math.abs(touch.clientY - start.y);

          if (deltaX > deltaY) {
            event.preventDefault();
          }
        }}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
          <div
          className={`flex will-change-transform ${
            isTransitionEnabled ? "transition-transform duration-500 ease-out" : ""
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{ transform: `translate3d(${-activeIndex * slideWidth}px, 0, 0)` }}
        >
          {slides.map((member, index) => {
            const originalIndex =
              members.length > 1
                ? index === 0
                  ? members.length - 1
                  : index === slides.length - 1
                    ? 0
                    : index - 1
                : index;

            return (
              <div
                key={`${member.id}-${index}`}
                data-team-slide
                className="w-full shrink-0 px-1 sm:px-2 md:px-3"
              >
                <div className="mx-auto w-full max-w-[22rem]">
                  <TeamCard
                    member={member}
                    onReadMore={onReadMore ? () => onReadMore(originalIndex) : undefined}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
