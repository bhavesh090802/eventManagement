type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="space-y-3">
      <p className="text-xs tracking-[0.24em] text-[var(--color-gold)] uppercase">{eyebrow}</p>
      <h2 className="font-serif text-3xl text-[var(--color-charcoal)] md:text-4xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-7 text-[var(--color-charcoal)]/75 md:text-base">{subtitle}</p>
    </header>
  );
}
