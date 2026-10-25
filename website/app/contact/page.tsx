import type { Metadata } from "next";
import { site } from "@/site.config";
import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { ContactForm } from "@/components/ContactForm";
import { MapIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.founder} on WhatsApp or phone about orders, bulk and gifting.`,
};

const faqs = [
  { q: "Do you deliver outside Himachal?", a: site.ordering.deliveryNote },
  { q: "Can I order in bulk or for gifting?", a: "Yes! For weddings, festivals and office gifting, message us with how many jars you need and we'll work it out together." },
  { q: "How long does a jar last?", a: "Keep it closed, cool and dry, and always use a dry spoon. The best-before date is printed on every jar." },
  { q: "Something's sold out. Will it come back?", a: "Most things are seasonal. Message us and we'll tell you when the next batch is ready." },
];

export default function Contact() {
  const a = site.contact.address;
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">Just message us, like you would family</h1>
        <p className="lede">{site.founderShort} reads every message herself. WhatsApp is the quickest; a phone call works too.</p>

        <div className="contact-grid">
          <div className="stack">
            <a className="contact-card contact-wa" href={waLink(generalEnquiry())} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={30} />
              <span>
                <strong>WhatsApp {site.founderShort}</strong>
                <span>{site.contact.phoneDisplay}</span>
              </span>
            </a>
            <a className="contact-card" href={`tel:${site.contact.phoneTel}`}>
              <PhoneIcon size={26} />
              <span>
                <strong>Call us</strong>
                <span>{site.contact.phoneDisplay} · {site.contact.hours}</span>
              </span>
            </a>
            <div className="contact-card as-div">
              <MapIcon size={26} />
              <span>
                <strong>Come and visit</strong>
                <address>
                  {a.line1}, {a.line2}, {a.district}, {a.state}
                  {a.pin && ` ${a.pin}`}
                </address>
                {site.contact.mapsUrl && (
                  <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps →</a>
                )}
              </span>
            </div>
            {site.contact.email && (
              <p>
                Or email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </p>
            )}
          </div>
          <div className="paper-card">
            <h2 className="h3">Write to us</h2>
            <ContactForm />
          </div>
        </div>

        <h2 className="faq-title">Things people often ask</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
