import { site } from "@/site.config";

/** Builds a wa.me link with a prefilled message. Text is URL-encoded, never put into HTML. */
export function waLink(message: string): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(name: string): string {
  return `Namaste ${site.founderShort}! I'd like to order ${name}. Is it available right now?`;
}

export function generalEnquiry(): string {
  return `Namaste ${site.founderShort}! I saw your pickles on the website and had a question.`;
}
