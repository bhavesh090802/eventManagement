import { Loader2, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getLeadErrorMessage, sendLeadEmail } from "../lib/send-lead-email";

type ContactQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const eventTypeOptions = [
  "Naming Ceremony",
  "Birthday Celebration",
  "Marriage / Reception",
  "Baby Shower",
  "Corporate Launch",
  "Annual Meeting / AGM",
  "Custom Event",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactQuoteModal({ isOpen, onClose }: ContactQuoteModalProps) {
  const fullNameId = useId();
  const emailId = useId();
  const eventTypeId = useId();
  const fromDateId = useId();
  const endDateId = useId();
  const messageId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState(eventTypeOptions[0]);
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailIsValid = useMemo(() => emailRegex.test(email.trim()), [email]);
  const dateRangeIsValid = useMemo(() => {
    if (!fromDate || !endDate) return false;
    return endDate >= fromDate;
  }, [fromDate, endDate]);
  const canSubmit =
    fullName.trim().length > 1 && emailIsValid && dateRangeIsValid && !isSubmitting;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");

    try {
      await sendLeadEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        eventType,
        fromDate,
        endDate,
        message: message.trim(),
      });
      setIsSubmitted(true);
    } catch (error) {
      setError(getLeadErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetFormState() {
    setFullName("");
    setEmail("");
    setEventType(eventTypeOptions[0]);
    setFromDate("");
    setEndDate("");
    setMessage("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    setError("");
  }

  function handleClose() {
    resetFormState();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={handleClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-2xl rounded-2xl border border-[var(--color-gold)]/35 bg-white p-6 shadow-2xl md:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id={titleId} className="font-serif text-3xl text-[var(--color-charcoal)]">
              Contact for Quote
            </h3>
            <p id={descriptionId} className="mt-2 text-sm text-[var(--color-charcoal)]/75">
              Share your event details and our concierge team will email you a premium quote.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close contact quote modal"
            onClick={handleClose}
            className="rounded-full border border-[var(--color-gold)]/40 p-2 text-[var(--color-charcoal)] transition hover:bg-[var(--color-gold)]/10"
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="mt-8 rounded-xl border border-emerald-600/35 bg-emerald-50 p-5 text-sm text-emerald-900">
            Thank you. We have received your requirements and sent a confirmation email.
          </div>
        ) : (
          <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--color-charcoal)]">Full Name *</span>
              <input
                id={fullNameId}
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="rounded-lg border border-[var(--color-charcoal)]/20 px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
              />
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--color-charcoal)]">Email Address *</span>
              <input
                id={emailId}
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={email.length > 0 && !emailIsValid}
                className="rounded-lg border border-[var(--color-charcoal)]/20 px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
              />
              {email.length > 0 && !emailIsValid && (
                <span className="text-xs text-red-600">Please enter a valid email address.</span>
              )}
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--color-charcoal)]">Event Type</span>
              <select
                id={eventTypeId}
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="rounded-lg border border-[var(--color-charcoal)]/20 bg-white px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
              >
                {eventTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-[var(--color-charcoal)]">From Date *</span>
                <input
                  id={fromDateId}
                  type="date"
                  required
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                  className="rounded-lg border border-[var(--color-charcoal)]/20 px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
                />
              </label>

              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-[var(--color-charcoal)]">End Date *</span>
                <input
                  id={endDateId}
                  type="date"
                  required
                  min={fromDate || undefined}
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="rounded-lg border border-[var(--color-charcoal)]/20 px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
                />
              </label>
            </div>
            {!dateRangeIsValid && (fromDate.length > 0 || endDate.length > 0) && (
              <p className="text-xs text-red-600">End date must be the same as or after from date.</p>
            )}

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--color-charcoal)]">Message / Requirements</span>
              <textarea
                id={messageId}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="resize-y rounded-lg border border-[var(--color-charcoal)]/20 px-3 py-2.5 outline-none transition focus:border-[var(--color-gold)]"
              />
            </label>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-charcoal)] px-5 py-3 text-sm tracking-[0.15em] text-[var(--color-alabaster)] uppercase transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
