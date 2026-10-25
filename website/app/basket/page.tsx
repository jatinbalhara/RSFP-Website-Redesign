import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { BasketView } from "@/components/BasketView";

export const metadata: Metadata = { title: "Your basket", robots: { index: false } };

export default async function Basket() {
  const products = await getProducts();
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Your basket</p>
        <h1 className="page-title">Almost on its way to you</h1>
        <BasketView products={products} />
      </div>
    </section>
  );
}
