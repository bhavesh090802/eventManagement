import { LuxuryButton } from "../../../shared/ui/luxury-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-gold)]/25 bg-[var(--color-alabaster)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:px-10">
        <div className="space-y-6 reveal-up">
          <p className="text-xs tracking-[0.24em] text-[var(--color-gold)] uppercase">
            Aura Events - Premium Event Management
          </p>
          <h1 className="font-serif text-5xl leading-tight text-[var(--color-charcoal)] md:text-6xl">
            A digital gateway for unforgettable celebrations.
          </h1>
          <p className="max-w-xl text-base leading-8 text-[var(--color-charcoal)]/80">
            From intimate family milestones to executive summits, every interaction is designed to feel
            effortless, polished, and unmistakably premium.
          </p>
          <div className="flex flex-wrap gap-4">
            <LuxuryButton>Start Event Builder</LuxuryButton>
            <LuxuryButton className="bg-transparent text-[var(--color-charcoal)]">
              Explore Portfolio
            </LuxuryButton>
          </div>
        </div>
        <div className="reveal-scale rounded-3xl border border-[var(--color-gold)]/35 bg-[var(--color-charcoal)] p-8 text-[var(--color-alabaster)] shadow-2xl">
          <p className="font-serif text-2xl">Luxury Service Promise</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-alabaster)]/85">
            <li>Initial load target under 2 seconds.</li>
            <li>Mobile-first layouts with uncluttered gold accents.</li>
            <li>Concierge-level response for every inquiry.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
