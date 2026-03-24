import { platformCapabilities } from "../../../core/constants/events";
import { SectionTitle } from "../../../shared/ui/section-title";

export function Capabilities() {
  return (
    <section className="border-y border-[var(--color-gold)]/25 bg-[#f8f8f8]">
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-20 md:px-10">
        <SectionTitle
          eyebrow="Functional Requirements"
          title="Built for premium orchestration"
          subtitle="The architecture is now organized by domain modules so each product capability can scale independently."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {platformCapabilities.map((item) => (
            <div
              key={item}
              className="reveal-scale rounded-xl border border-[var(--color-gold)]/35 bg-white px-5 py-4 text-sm text-[var(--color-charcoal)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
