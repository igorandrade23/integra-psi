type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-3xl text-balance text-3xl font-black leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-7 text-neutral-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
