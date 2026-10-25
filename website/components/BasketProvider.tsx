"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type BasketLine = { slug: string; qty: number };

type BasketCtx = {
  lines: BasketLine[];
  count: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const KEY = "rsfp-basket-v1";
const MAX_QTY = 20;
const Ctx = createContext<BasketCtx | null>(null);

function sanitize(value: unknown): BasketLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((l): l is BasketLine => typeof l?.slug === "string" && /^[a-z0-9-]{1,60}$/.test(l.slug) && Number.isInteger(l?.qty))
    .map((l) => ({ slug: l.slug, qty: Math.min(Math.max(l.qty, 1), MAX_QTY) }))
    .slice(0, 50);
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [ready, setReady] = useState(false);

  // The basket lives only in this browser. Orders are sent over WhatsApp for now.
  useEffect(() => {
    try {
      setLines(sanitize(JSON.parse(localStorage.getItem(KEY) ?? "[]")));
    } catch {
      /* private mode or blocked storage: start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((cur) => {
      const found = cur.find((l) => l.slug === slug);
      if (found) return cur.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l));
      return [...cur, { slug, qty: Math.min(qty, MAX_QTY) }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((cur) =>
      qty < 1 ? cur.filter((l) => l.slug !== slug) : cur.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((cur) => cur.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, ready, count: lines.reduce((n, l) => n + l.qty, 0), add, setQty, remove, clear }),
    [lines, ready, add, setQty, remove, clear],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBasket() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBasket must be used inside BasketProvider");
  return ctx;
}
