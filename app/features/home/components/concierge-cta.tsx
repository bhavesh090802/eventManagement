import { useState } from "react";
import { ContactQuoteModal } from "../../contact/components/contact-quote-modal";
import { LuxuryButton } from "../../../shared/ui/luxury-button";

export function ConciergeCta() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="reveal-up rounded-3xl border border-[var(--color-gold)]/40 bg-[var(--color-charcoal)] p-10 text-[var(--color-alabaster)]">
          <p className="text-xs tracking-[0.24em] text-[var(--color-gold)] uppercase">Concierge Experience</p>
          <h2 className="mt-3 font-serif text-4xl">Need a custom package?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-alabaster)]/82">
            Corporate events and bespoke milestones can route directly to a planner for tailored proposals,
            timelines, and gold-themed quote documents.
          </p>
          <div className="mt-8">
            <LuxuryButton
              onClick={() => setIsContactModalOpen(true)}
              ariaLabel="Open contact quote form"
            >
              Contact for Quote
            </LuxuryButton>
          </div>
        </div>
      </section>

      <ContactQuoteModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
