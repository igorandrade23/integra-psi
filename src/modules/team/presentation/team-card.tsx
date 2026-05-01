import type { TeamMember } from "@/modules/team/domain/team-member";

type TeamCardProps = {
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-green-light text-sm font-black text-brand-green-dark">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-foreground">{member.name}</h2>
          <p className="text-sm font-semibold text-brand-green">{member.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-muted">{member.bio}</p>
    </article>
  );
}
