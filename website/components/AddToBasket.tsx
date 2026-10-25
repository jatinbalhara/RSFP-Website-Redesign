"use client";

import { useState } from "react";
import Link from "next/link";
import { useBasket } from "./BasketProvider";

export function AddToBasket({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { add, setQty: setLineQty, lines, ready } = useBasket();
  const [qty, setQty] = useState(1);
  const inBasket = ready ? (lines.find((l) => l.slug === slug)?.qty ?? 0) : 0;

  // On cards, once a jar is in the basket the button becomes a stepper tied to
  // the basket itself, so adding several products never needs a detour.
  if (compact) {
    if (inBasket === 0) {
      return (
        <button type="button" className="btn btn-primary btn-sm" onClick={() => add(slug)}>
          Add to basket
        </button>
      );
    }
    return (
      <div className="qty qty-sm" role="group" aria-label="Quantity in basket">
        <button type="button" onClick={() => setLineQty(slug, inBasket - 1)} aria-label={inBasket === 1 ? "Remove from basket" : "One less"}>
          −
        </button>
        <span aria-live="polite">{inBasket}</span>
        <button type="button" onClick={() => add(slug)} disabled={inBasket >= 20} aria-label="One more">
          +
        </button>
      </div>
    );
  }

  return (
    <div className="add-row">
      <div className="qty" role="group" aria-label="Quantity">
        <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One less">−</button>
        <span aria-live="polite">{qty}</span>
        <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="One more">+</button>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => add(slug, qty)}>
        Add to basket
      </button>
      <p className="added-msg" aria-live="polite">
        {inBasket > 0 && (
          <>
            {inBasket} in your basket. <Link href="/basket">See basket →</Link>
          </>
        )}
      </p>
    </div>
  );
}
