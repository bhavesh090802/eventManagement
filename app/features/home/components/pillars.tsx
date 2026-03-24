import { eventPillars } from "../../../core/constants/events";
import { SectionTitle } from "../../../shared/ui/section-title";

export function Pillars() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-6 py-20 md:px-10">
      <SectionTitle
        eyebrow="Scope of Events"
        title="Three Pillars. Three Signature Experiences."
        subtitle="Each pillar has a distinct sub-vibe while remaining visually anchored in Aura's gold and alabaster identity."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {eventPillars.map((pillar) => (
          <article
            key={pillar.id}
            className="group reveal-up rounded-2xl border border-[var(--color-gold)]/35 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
          >
            <p className="text-xs tracking-[0.18em] text-[var(--color-gold)] uppercase">{pillar.vibe}</p>
            <h3 className="mt-2 font-serif text-2xl text-[var(--color-charcoal)]">{pillar.label}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-charcoal)]/70">{pillar.designNote}</p>
            <ul className="mt-5 space-y-1.5 text-sm text-[var(--color-charcoal)]/85">
              {pillar.events.slice(0, 4).map((eventType) => (
                <li key={eventType}>- {eventType}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
