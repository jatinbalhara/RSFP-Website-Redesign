import type { Metadata } from "next";
import Link from "next/link";
import { categories, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description: "Pahadi pickles, sharbats and sweets, handmade in Sanet, Himachal. Add to basket and order on WhatsApp.",
};

export default async function Shop({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const active = categories.find((x) => x.slug === c);
  const products = await getProducts();
  const shown = active ? products.filter((p) => p.category === active.name) : products;

  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">The shelf</p>
        <h1 className="page-title">{active ? active.name : "Everything we make"}</h1>
        <p className="lede">{active ? active.blurb : "Every jar is made in small batches, so some things run out until next season. If you can't find something, just ask."}</p>

        <nav className="chips" aria-label="Filter by category">
          <Link href="/shop" className={!active ? "chip on" : "chip"} aria-current={!active ? "page" : undefined}>
            All <span>{products.length}</span>
          </Link>
          {categories.map((x) => (
            <Link key={x.slug} href={`/shop?c=${x.slug}`} className={active?.slug === x.slug ? "chip on" : "chip"} aria-current={active?.slug === x.slug ? "page" : undefined}>
              {x.name} <span>{products.filter((p) => p.category === x.name).length}</span>
            </Link>
          ))}
        </nav>

        <div className="grid-cards">
          {shown.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
