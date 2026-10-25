"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/site.config";
import { rupees } from "@/lib/format";
import type { Product } from "@/lib/products";
import { waLink } from "@/lib/whatsapp";
import { useBasket } from "./BasketProvider";
import { WhatsAppIcon } from "./Icons";

type Form = { name: string; phone: string; address: string; pin: string; note: string };
const empty: Form = { name: "", phone: "", address: "", pin: "", note: "" };

function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  const digits = f.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  if (digits.length !== 10) e.phone = "That phone number looks short. Please check it's 10 digits.";
  if (f.address.trim().length < 10) e.address = "Please add your full address so the jars reach you.";
  if (!/^\d{6}$/.test(f.pin.trim())) e.pin = "PIN code should be 6 digits.";
  return e;
}

export function BasketView({ products }: { products: Product[] }) {
  const { lines, ready, setQty, remove, clear } = useBasket();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const items = lines
    .map((l) => ({ ...l, p: products.find((p) => p.slug === l.slug) }))
    .filter((x): x is typeof x & { p: Product } => Boolean(x.p));
  const total = items.reduce((sum, i) => sum + (i.p.price ?? 0) * i.qty, 0);
  const unpriced = items.some((i) => i.p.price == null);

  function field(k: keyof Form) {
    return {
      value: form[k],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value })),
      "aria-invalid": Boolean(errors[k]),
      "aria-describedby": errors[k] ? `err-${k}` : undefined,
    };
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const clip = (s: string, n: number) => s.trim().slice(0, n);
    const list = items
      .map((i) => `• ${i.qty} × ${i.p.name}${i.p.price != null ? ` (${rupees(i.p.price)}) = ${rupees(i.p.price * i.qty)}` : " (price to confirm)"}`)
      .join("\n");
    const text = [
      `Namaste ${site.founderShort}! I'd like to order:`,
      "",
      list,
      "",
      `Items total: ${rupees(total)}${unpriced ? " + items to confirm" : ""} (plus delivery)`,
      "",
      `Name: ${clip(form.name, 80)}`,
      `Phone: ${clip(form.phone, 20)}`,
      `Address: ${clip(form.address, 300)}`,
      `PIN: ${clip(form.pin, 6)}`,
      form.note.trim() ? `Note: ${clip(form.note, 300)}` : "",
    ]
      .filter((x, i, arr) => x !== "" || arr[i - 1] !== "")
      .join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (!ready) return <p className="muted">Opening your basket…</p>;

  if (sent) {
    return (
      <div className="paper-card center stack">
        <h2>Thank you! We&apos;ll pack your jars this week.</h2>
        <p>
          Your order is ready in WhatsApp. Just press send there. {site.founderShort} will reply with the delivery charge and how to pay.
        </p>
        <p className="note">Didn&apos;t open? Message us on {site.contact.phoneDisplay}.</p>
        <p className="actions-center">
          <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>Back to basket</button>
          <button type="button" className="btn btn-primary" onClick={() => { clear(); setSent(false); setForm(empty); }}>
            Done, empty my basket
          </button>
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="paper-card center stack">
        <h2>Your basket&apos;s empty. The galgal is lonely.</h2>
        <p>
          <Link href="/shop" className="btn btn-primary">Browse the shelf</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="basket-grid">
      <div>
        <ul className="basket-lines">
          {items.map((i) => (
            <li key={i.slug}>
              <Image src={i.p.image} alt="" width={96} height={96} />
              <div className="bl-main">
                <Link href={`/shop/${i.slug}`} className="bl-name">{i.p.name}</Link>
                <span className="muted small">{i.p.size}</span>
                <button type="button" className="link-btn" onClick={() => remove(i.slug)}>Remove</button>
              </div>
              <div className="qty" role="group" aria-label={`Quantity of ${i.p.name}`}>
                <button type="button" onClick={() => setQty(i.slug, i.qty - 1)} aria-label="One less">−</button>
                <span>{i.qty}</span>
                <button type="button" onClick={() => setQty(i.slug, i.qty + 1)} aria-label="One more">+</button>
              </div>
              <span className="bl-price">{i.p.price != null ? rupees(i.p.price * i.qty) : "Ask"}</span>
            </li>
          ))}
        </ul>
        <p className="total">
          <span>Items total</span>
          <strong>{rupees(total)}</strong>
        </p>
        {unpriced && <p className="muted small">Some items don&apos;t have a price online yet. {site.founderShort} will confirm them on WhatsApp.</p>}
        <p className="muted small">{site.ordering.deliveryNote}</p>
      </div>

      <form className="form paper-card" onSubmit={send} noValidate>
        <h2 className="h3">Where should we send it?</h2>
        {(
          [
            ["name", "Your name", "name", "text"],
            ["phone", "Phone (10 digits)", "tel", "tel"],
          ] as const
        ).map(([k, label, ac, type]) => (
          <label key={k}>
            {label}
            <input type={type} autoComplete={ac} maxLength={k === "phone" ? 20 : 80} inputMode={k === "phone" ? "tel" : undefined} {...field(k)} />
            {errors[k] && <span id={`err-${k}`} className="form-error">{errors[k]}</span>}
          </label>
        ))}
        <label>
          Full address
          <textarea rows={3} autoComplete="street-address" maxLength={300} {...field("address")} />
          {errors.address && <span id="err-address" className="form-error">{errors.address}</span>}
        </label>
        <label>
          PIN code
          <input inputMode="numeric" autoComplete="postal-code" maxLength={6} {...field("pin")} />
          {errors.pin && <span id="err-pin" className="form-error">{errors.pin}</span>}
        </label>
        <label>
          Anything else? <span className="muted">(optional)</span>
          <textarea rows={2} maxLength={300} placeholder="Gift wrap, extra spicy, deliver after Diwali…" {...field("note")} />
        </label>
        <button type="submit" className="btn btn-wa btn-block">
          <WhatsAppIcon /> Send order on WhatsApp
        </button>
        <p className="muted small">Your details go straight into the WhatsApp message. This website doesn&apos;t store them.</p>
      </form>
    </div>
  );
}
