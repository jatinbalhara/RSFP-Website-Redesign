import { rupees } from "@/lib/format";
import type { Product } from "@/lib/products";

export function Price({ p, large = false }: { p: Product; large?: boolean }) {
  if (p.price == null) return <span className={large ? "price price-lg ask" : "price ask"}>Price on WhatsApp</span>;
  return (
    <span className={large ? "price price-lg" : "price"}>
      {rupees(p.price)}
      {p.mrp != null && p.mrp > p.price && (
        <s className="mrp" aria-label={`MRP ${rupees(p.mrp)}`}>
          {rupees(p.mrp)}
        </s>
      )}
    </span>
  );
}
