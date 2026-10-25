import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/site.config";
import { getProduct, getProducts } from "@/lib/products";
import { productEnquiry, waLink } from "@/lib/whatsapp";
import { AddToBasket } from "@/components/AddToBasket";
import { Price } from "@/components/Price";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppIcon } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { images: [p.imageLarge] } };
}

export default async function ProductPage({ params }: Params) {
  const p = await getProduct((await params).slug);
  if (!p) notFound();
  const related = (await getProducts()).filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const season = site.seasons.find((s) => s.slug === p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${site.url}${p.imageLarge}`,
    brand: { "@type": "Brand", name: site.brand },
    ...(p.price != null && {
      offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" },
    }),
  };

  return (
    <>
      <section className="section product">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/shop">Shop</Link> <span aria-hidden="true">/</span> {p.name}
          </nav>
          <div className="product-grid">
            <div className="product-photo">
              <Image src={p.imageLarge} alt={`${p.name} jar`} width={1200} height={1200} priority sizes="(max-width: 860px) 100vw, 520px" />
            </div>
            <div className="product-info stack">
              <p className="eyebrow">{p.category}</p>
              <h1 className="product-name">{p.name}</h1>
              <p className="product-hi" lang="hi">{p.nameHi}</p>
              <div className="price-row">
                <Price p={p} large />
                <span className="size">{p.size}</span>
              </div>
              <p className="product-desc">{p.description}</p>

              <dl className="facts">
                <div>
                  <dt>Tastes</dt>
                  <dd>{p.taste}</dd>
                </div>
                <div>
                  <dt>Eat it with</dt>
                  <dd>{p.pairsWith}</dd>
                </div>
                {season && (
                  <div>
                    <dt>Season</dt>
                    <dd>{season.note}</dd>
                  </div>
                )}
              </dl>

              <AddToBasket slug={p.slug} />
              <a className="btn btn-wa btn-block" href={waLink(productEnquiry(p.name))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Order this on WhatsApp
              </a>

              <aside className="batch-card" aria-label="Batch card">
                <p className="batch-title">{p.name}</p>
                <p><span>Made by</span> {site.founderShort} &amp; team, Sanet</p>
                <p><span>FSSAI</span> {site.fssai}</p>
                <p className="note">Every jar filled by hand ✿</p>
              </aside>
              <p className="muted small">
                Want to know who made it? <Link href="/our-story">Meet the makers →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-tint">
          <div className="wrap">
            <h2>You might also like</h2>
            <div className="grid-cards">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
