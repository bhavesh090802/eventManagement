import emailjs from "@emailjs/browser";

export type LeadFormPayload = {
  fullName: string;
  email: string;
  eventType: string;
  fromDate: string;
  endDate: string;
  message: string;
};

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function extractEmailJsError(error: unknown) {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const maybeStatus = "status" in error ? String(error.status) : "";
    const maybeText = "text" in error ? String(error.text) : "";
    if (maybeStatus || maybeText) {
      return [maybeStatus ? `status ${maybeStatus}` : "", maybeText].filter(Boolean).join(": ");
    }
  }

  return "Unknown error";
}

export function getLeadErrorMessage(error: unknown) {
  const rawMessage = extractEmailJsError(error);

  if (rawMessage.includes("Missing EmailJS environment variables")) {
    return "Email is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.";
  }

  return `Submission failed (${rawMessage}). Please check your EmailJS service/template/public key settings.`;
}

export async function sendLeadEmail(payload: LeadFormPayload) {
  if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
    throw new Error("Email service is not configured. Missing EmailJS environment variables.");
  }

  try {
    await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      {
        full_name: payload.fullName,
        email: payload.email,
        event_type: payload.eventType,
        from_date: payload.fromDate,
        end_date: payload.endDate,
        message: payload.message || "No extra requirements provided.",
      },
      {
        publicKey: EMAIL_PUBLIC_KEY,
      }
    );
  } catch (error) {
    throw new Error(extractEmailJsError(error));
  }
}
