import type { TeamMember } from "@/modules/team/domain/team-member";

type TeamCardProps = {
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm">
      <div className="min-w-0">
        <h2 className="text-lg font-bold text-foreground">{member.name}</h2>
        <p className="text-sm font-semibold text-brand-green">{member.role}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-muted">{member.bio}</p>
    </article>
  );
}
