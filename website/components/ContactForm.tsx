"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

const topics = ["A question about a pickle", "Bulk or gifting order", "Order I already placed", "Something else"];

/** No server involved: the form just writes a WhatsApp message for the person to send. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please write a line or two so Neelam ji knows how to help.");
      return;
    }
    setError("");
    const text = `Namaste ${site.founderShort}! ${name.trim() ? `This is ${name.trim().slice(0, 80)}. ` : ""}(${topic})\n\n${message.trim().slice(0, 1500)}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Your name
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} />
      </label>
      <label>
        What&apos;s it about?
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Your message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} maxLength={1500} aria-invalid={Boolean(error)} aria-describedby={error ? "contact-err" : undefined} />
      </label>
      {error && (
        <p id="contact-err" className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-wa">
        <WhatsAppIcon /> Send on WhatsApp
      </button>
      <p className="muted small">This opens WhatsApp with your message ready. Nothing is stored on this website.</p>
    </form>
  );
}
