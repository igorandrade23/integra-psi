"use client";

import { ArrowRight, ImageOff } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { TeamMember } from "@/modules/team/domain/team-member";

type TeamCardProps = {
  member: TeamMember;
  onReadMore?: () => void;
};

export function TeamCard({ member, onReadMore }: TeamCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const initials = useMemo(
    () =>
      member.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join(""),
    [member.name],
  );

  const showFallback = hasImageError || !member.photo;
  const shouldShowReadMore = Boolean(onReadMore) && member.description.length > 80;

  return (
    <article className="h-full overflow-hidden rounded-[2rem] border border-border-soft bg-surface-strong">
      <div className="relative aspect-[4/5] bg-brand-green-light/30">
        {showFallback ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,_rgba(111,163,75,0.22),_rgba(244,241,232,0.95)_55%,_rgba(255,255,255,1)_100%)] px-6 text-center">
            <div className="grid size-24 place-items-center rounded-full border border-border-soft bg-white/85 text-2xl font-black tracking-[0.14em] text-brand-green-dark shadow-sm">
              {initials}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green-dark">
                Foto em breve
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-muted shadow-sm">
                <ImageOff size={14} />
                {member.name}
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={member.photo}
            alt={`Foto de ${member.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 88vw, 22rem"
            onError={() => setHasImageError(true)}
          />
        )}
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-foreground">{member.name}</h2>
          <p className="text-sm font-semibold text-brand-green">{member.role}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-neutral-muted">
          {member.description}
        </p>
        {shouldShowReadMore ? (
          <button
            type="button"
            onClick={onReadMore}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark transition hover:text-brand-green"
          >
            Ler mais
            <ArrowRight size={16} />
          </button>
        ) : null}
      </div>
    </article>
  );
}
