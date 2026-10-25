"use client";

import Link from "next/link";
import { useBasket } from "./BasketProvider";
import { BasketIcon } from "./Icons";

export function BasketLink() {
  const { count, ready } = useBasket();
  return (
    <Link href="/basket" className="basket-link" aria-label={`Basket, ${count} item${count === 1 ? "" : "s"}`}>
      <BasketIcon />
      <span className="basket-label">Basket</span>
      {ready && count > 0 && <span className="basket-count">{count}</span>}
    </Link>
  );
}
